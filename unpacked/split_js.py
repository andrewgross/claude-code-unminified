#!/usr/bin/env -S uv run python
# /// script
# requires-python = ">=3.9,<3.13"
# dependencies = [
#   "tree-sitter",
#   "tree-sitter-javascript",
# ]
# ///
import argparse, json, os, shutil
from tree_sitter import Parser, Language

# --- Tree-sitter setup ---
def get_js_language():
    try:
        # Try the newer API first
        import tree_sitter_javascript
        return Language(tree_sitter_javascript.language(), 'javascript')
    except (ImportError, AttributeError, TypeError):
        try:
            # Fallback to older API
            from tree_sitter_javascript import get_language
            return get_language()
        except ImportError:
            # Final fallback - direct language access
            import tree_sitter_javascript
            return tree_sitter_javascript.language()

def make_parser(lang):
    parser = Parser()
    parser.set_language(lang)
    return parser

# --- IO helpers ---
def load_code(path):
    s = open(path, encoding="utf-8").read()
    if s.startswith("\ufeff"): s = s.lstrip("\ufeff")      # BOM
    if s.startswith("#!"):     s = "".join(s.splitlines(keepends=True)[1:])  # shebang
    return s

# --- Parsing & splitting ---
def ts_root(code):
    lang = get_js_language()
    parser = make_parser(lang)
    return parser.parse(code.encode("utf-8")).root_node

def unwrap_iife_if_any(root, treat_as_module: bool):
    kids = [c for c in root.children if c.is_named]
    if treat_as_module: return kids
    if len(kids) != 1 or kids[0].type != "expression_statement": return kids
    expr = kids[0].child_by_field_name("expression")
    if not expr or expr.type != "call_expression": return kids
    callee = expr.child_by_field_name("function") or expr.child_by_field_name("callee")
    if not callee: return kids
    body = callee.child_by_field_name("body")
    if body and body.type in ("statement_block", "block"):
        return [c for c in body.children if c.is_named]
    return kids

def split_by_statements(code, stmts, max_size):
    b = code.encode("utf-8")
    chunks, cur, cur_start, cur_size = [], [], None, 0
    def flush():
        nonlocal chunks, cur, cur_start, cur_size
        if not cur: return
        start, end = cur_start, cur[-1].end_byte
        chunks.append((start, end, b[start:end].decode("utf-8", "replace")))
        cur, cur_start, cur_size = [], None, 0
    for s in stmts:
        if not s.is_named: continue
        s0, s1 = s.start_byte, s.end_byte
        slen = s1 - s0
        if not cur:
            cur, cur_start, cur_size = [s], s0, slen
        elif cur_size + slen <= max_size:
            cur.append(s); cur_size += slen
        else:
            flush(); cur, cur_start, cur_size = [s], s0, slen
    flush(); return chunks

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("input")
    ap.add_argument("outdir")
    ap.add_argument("--max", type=int, default=40000, dest="max_size")
    ap.add_argument("--module", action="store_true", help="Treat input as ES module (skip IIFE unwrap)")
    args = ap.parse_args()

    code = load_code(args.input)
    root = ts_root(code)
    stmts = unwrap_iife_if_any(root, treat_as_module=args.module)

    out_dir = os.path.abspath(args.outdir)
    if os.path.isdir(out_dir): shutil.rmtree(out_dir)
    os.makedirs(out_dir, exist_ok=True)

    chunks = split_by_statements(code, stmts, args.max_size)
    manifest = []
    for i, (start, end, slice_) in enumerate(chunks, 1):
        name = f"chunk_{i:04d}.js"
        header = f"/* chunk:{i} bytes:[{start}, {end}) size:{end-start} source:{os.path.basename(args.input)} */\n"
        with open(os.path.join(out_dir, name), "w", encoding="utf-8") as f:
            f.write(header + slice_)
        manifest.append({"file": name, "start": start, "end": end, "size": end-start})

    with open(os.path.join(out_dir, "manifest.json"), "w", encoding="utf-8") as f:
        json.dump({"source": os.path.basename(args.input), "chunks": manifest}, f, indent=2)

    print(f"Wrote {len(chunks)} chunks to {out_dir}")

if __name__ == "__main__":
    main()
