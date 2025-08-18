#!/usr/bin/env -S uv run python
# /// script
# requires-python = ">=3.9"
# dependencies = ["esprima>=4.0.1"]
# ///
import argparse, json, os, shutil, esprima

def unwrap_iife(program):
    b = program.body
    if (len(b) == 1 and getattr(b[0], "type", "") == "ExpressionStatement" and
        getattr(getattr(b[0], "expression", None), "type", "") == "CallExpression"):
        callee = b[0].expression.callee
        if getattr(callee, "type", "") in ("FunctionExpression","ArrowFunctionExpression"):
            blk = getattr(getattr(callee, "body", None), "body", None)
            if isinstance(blk, list): return blk
    return b

def split_by_statements(code, stmts, max_size):
    chunks, cur, cur_start, cur_size = [], [], None, 0
    def flush():
        nonlocal chunks, cur, cur_start, cur_size
        if not cur: return
        start, end = cur_start, cur[-1].range[1]
        chunks.append((start, end, code[start:end]))
        cur, cur_start, cur_size = [], None, 0
    for s in stmts:
        s0, s1 = s.range
        slen = s1 - s0
        if not cur:
            cur, cur_start, cur_size = [s], s0, slen
        elif cur_size + slen <= max_size:
            cur.append(s); cur_size += slen
        else:
            flush(); cur, cur_start, cur_size = [s], s0, slen
    flush()
    return chunks

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("input")
    ap.add_argument("outdir")
    ap.add_argument("--max", type=int, default=40000, dest="max_size")
    ap.add_argument("--module", action="store_true")
    args = ap.parse_args()

    code = open(args.input, encoding="utf-8").read()
    program = esprima.parseModule(code, range=True) if args.module else esprima.parseScript(code, range=True)
    body = unwrap_iife(program)

    out_dir = os.path.abspath(args.outdir)
    if os.path.isdir(out_dir): shutil.rmtree(out_dir)
    os.makedirs(out_dir, exist_ok=True)

    chunks = split_by_statements(code, body, args.max_size)
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
