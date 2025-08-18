/* chunk:597 bytes:[13759296, 13778536) size:19240 source:unpacked-cli.js */
function UyB(A, B = zyB) {
    mL0.useEffect(() => {
        pX8(), L21()
    }, []), mL0.useEffect(() => {
        let Q = !1,
            Z = setInterval(() => {
                if (lX8(B) && !Q) Q = !0, w01({
                    message: A
                })
            }, B);
        return () => clearTimeout(Z)
    }, [A, B])
}
var Td = G1(z1(), 1);
import {
    basename as aX8
} from "path";
var DH = G1(z1(), 1),
    Ff1 = G1(z1(), 1);
import {
    extname as iX8,
    relative as nX8
} from "path";

function wyB({
    file_path: A,
    content: B,
    verbose: Q
}) {
    let Z = Ff1.useMemo(() => j1().existsSync(A), [A]),
        D = Ff1.useMemo(() => {
            if (!Z) return "";
            let F = jY(A);
            return j1().readFileSync(A, {
                encoding: F
            })
        }, [A, Z]),
        G = Ff1.useMemo(() => {
            if (!Z) return null;
            return QU({
                filePath: A,
                fileContents: D,
                edits: [{
                    old_string: D,
                    new_string: B,
                    replace_all: !1
                }]
            })
        }, [Z, A, D, B]);
    return DH.createElement(v, {
        borderColor: "secondaryBorder",
        borderStyle: "round",
        flexDirection: "column",
        paddingX: 1
    }, DH.createElement(v, {
        paddingBottom: 1
    }, DH.createElement(T, {
        bold: !0
    }, Q ? A : nX8(t0(), A))), G ? WC(G.map((F) => DH.createElement(JC, {
        key: F.newStart,
        patch: F,
        dim: !1
    })), (F) => DH.createElement(T, {
        color: "secondaryText",
        key: `ellipsis-${F}`
    }, "...")) : DH.createElement(YC, {
        code: B || "(No content)",
        language: iX8(A).slice(1)
    }))
}

function $yB(A) {
    let B = (Y) => {
            return BH.inputSchema.parse(Y)
        },
        Q = (Y) => {
            let J = j1().existsSync(Y.file_path) ? AX(Y.file_path) : "";
            return Zf1(Y.file_path, J, Y.content, !1)
        },
        Z = B(A.toolUseConfirm.input),
        {
            file_path: D,
            content: G
        } = Z,
        F = Td.useMemo(() => j1().existsSync(D), [D]),
        I = F ? "overwrite" : "create";
    return Td.default.createElement(BR, {
        toolUseConfirm: A.toolUseConfirm,
        toolUseContext: A.toolUseContext,
        onDone: A.onDone,
        onReject: A.onReject,
        setToolPermissionContext: A.setToolPermissionContext,
        title: F ? "Overwrite file" : "Create file",
        question: Td.default.createElement(T, null, "Do you want to ", I, " ", Td.default.createElement(T, {
            bold: !0
        }, aX8(D)), "?"),
        content: Td.default.createElement(wyB, {
            file_path: D,
            content: G,
            verbose: A.verbose
        }),
        path: D,
        completionType: "write_file_single",
        languageName: B_(D),
        parseInput: B,
        getIDEDiffConfig: Q
    })
}
var kF1 = G1(z1(), 1);

function sX8(A) {
    let B = A.tool;
    if ("getPath" in B && typeof B.getPath === "function") try {
        return B.getPath(A.input)
    } catch {
        return null
    }
    return null
}

function qyB({
    toolUseConfirm: A,
    onDone: B,
    onReject: Q,
    verbose: Z,
    setToolPermissionContext: D,
    toolUseContext: G
}) {
    let [F] = fB(), I = sX8(A), Y = A.tool.userFacingName(A.input), X = `${A.tool.isReadOnly(A.input)?"Read":"Edit"} file`, V = (K) => K;
    if (!I) return kF1.default.createElement(Gf1, {
        setToolPermissionContext: D,
        toolUseConfirm: A,
        toolUseContext: G,
        onDone: B,
        onReject: Q,
        verbose: Z
    });
    let C = kF1.default.createElement(v, {
        flexDirection: "column",
        paddingX: 2,
        paddingY: 1
    }, kF1.default.createElement(T, null, Y, "(", A.tool.renderToolUseMessage(A.input, {
        theme: F,
        verbose: Z
    }), ")"));
    return kF1.default.createElement(BR, {
        toolUseConfirm: A,
        toolUseContext: G,
        onDone: B,
        onReject: Q,
        setToolPermissionContext: D,
        title: X,
        content: C,
        path: I,
        parseInput: V,
        completionType: "tool_use_single",
        languageName: "none"
    })
}
var b7 = G1(z1(), 1);
import {
    extname as oX8,
    isAbsolute as RyB,
    resolve as OyB
} from "path";
var dF = G1(z1(), 1);
import {
    relative as rX8
} from "path";

function NyB({
    notebook_path: A,
    cell_id: B,
    new_source: Q,
    cell_type: Z,
    edit_mode: D = "replace",
    verbose: G
}) {
    let F = D === "delete" ? "delete" : `${D} cell in`;
    return dF.createElement(OA, null, dF.createElement(v, {
        flexDirection: "column"
    }, dF.createElement(v, {
        flexDirection: "row"
    }, dF.createElement(T, {
        color: "error"
    }, "User rejected ", F, " "), dF.createElement(T, {
        bold: !0,
        color: "error"
    }, G ? A : rX8(t0(), A)), dF.createElement(T, {
        color: "error"
    }, " at cell ", B)), D !== "delete" && dF.createElement(v, {
        marginTop: 1,
        flexDirection: "column"
    }, dF.createElement(T, {
        dimColor: !0
    }, dF.createElement(YC, {
        code: Q,
        language: Z === "markdown" ? "markdown" : "python"
    })))))
}
var LyB = "Replace the contents of a specific cell in a Jupyter notebook.",
    MyB = "Completely replaces the contents of a specific cell in a Jupyter notebook (.ipynb file) with new source. Jupyter notebooks are interactive documents that combine code, text, and visualizations, commonly used for data analysis and scientific computing. The notebook_path parameter must be an absolute path, not a relative path. The cell_number is 0-indexed. Use edit_mode=insert to add a new cell at the index specified by cell_number. Use edit_mode=delete to delete the cell at the index specified by cell_number.";
var tX8 = h.strictObject({
        notebook_path: h.string().describe("The absolute path to the Jupyter notebook file to edit (must be absolute, not relative)"),
        cell_id: h.string().optional().describe("The ID of the cell to edit. When inserting a new cell, the new cell will be inserted after the cell with this ID, or at the beginning if not specified."),
        new_source: h.string().describe("The new source for the cell"),
        cell_type: h.enum(["code", "markdown"]).optional().describe("The type of the cell (code or markdown). If not specified, it defaults to the current cell type. If using edit_mode=insert, this is required."),
        edit_mode: h.enum(["replace", "insert", "delete"]).optional().describe("The type of edit to make (replace, insert, delete). Defaults to replace.")
    }),
    rM3 = h.object({
        new_source: h.string().describe("The new source code that was written to the cell"),
        cell_id: h.string().optional().describe("The ID of the cell that was edited"),
        cell_type: h.enum(["code", "markdown"]).describe("The type of the cell"),
        language: h.string().describe("The programming language of the notebook"),
        edit_mode: h.string().describe("The edit mode that was used"),
        error: h.string().optional().describe("Error message if the operation failed")
    }),
    QR = {
        name: Uv,
        async description() {
            return LyB
        },
        async prompt() {
            return MyB
        },
        userFacingName() {
            return "Edit Notebook"
        },
        isEnabled() {
            return !0
        },
        inputSchema: tX8,
        isConcurrencySafe() {
            return !1
        },
        isReadOnly() {
            return !1
        },
        getPath(A) {
            return A.notebook_path
        },
        async checkPermissions(A, B) {
            return vg(QR, A, B.getToolPermissionContext())
        },
        mapToolResultToToolResultBlockParam({
            cell_id: A,
            edit_mode: B,
            new_source: Q,
            error: Z
        }, D) {
            if (Z) return {
                tool_use_id: D,
                type: "tool_result",
                content: Z,
                is_error: !0
            };
            switch (B) {
                case "replace":
                    return {
                        tool_use_id: D, type: "tool_result", content: `Updated cell ${A} with ${Q}`
                    };
                case "insert":
                    return {
                        tool_use_id: D, type: "tool_result", content: `Inserted cell ${A} with ${Q}`
                    };
                case "delete":
                    return {
                        tool_use_id: D, type: "tool_result", content: `Deleted cell ${A}`
                    };
                default:
                    return {
                        tool_use_id: D, type: "tool_result", content: "Unknown edit mode"
                    }
            }
        },
        renderToolUseMessage({
            notebook_path: A,
            cell_id: B,
            new_source: Q,
            cell_type: Z,
            edit_mode: D
        }, {
            verbose: G
        }) {
            if (!A || !Q || !Z) return null;
            if (G) return `${A}@${B}, content: ${Q.slice(0,30)}…, cell_type: ${Z}, edit_mode: ${D??"replace"}`;
            return `${xV(A)}@${B}`
        },
        renderToolUseRejectedMessage(A, {
            verbose: B
        }) {
            return b7.createElement(NyB, {
                notebook_path: A.notebook_path,
                cell_id: A.cell_id,
                new_source: A.new_source,
                cell_type: A.cell_type,
                edit_mode: A.edit_mode,
                verbose: B
            })
        },
        renderToolUseErrorMessage(A, {
            verbose: B
        }) {
            if (!B && typeof A === "string" && l4(A, "tool_use_error")) return b7.createElement(OA, null, b7.createElement(T, {
                color: "error"
            }, "Error editing notebook"));
            return b7.createElement(f6, {
                result: A,
                verbose: B
            })
        },
        renderToolUseProgressMessage() {
            return null
        },
        renderToolResultMessage({
            cell_id: A,
            new_source: B,
            language: Q,
            error: Z
        }) {
            if (Z) return b7.createElement(OA, null, b7.createElement(T, {
                color: "error"
            }, Z));
            return b7.createElement(OA, null, b7.createElement(v, {
                flexDirection: "column"
            }, b7.createElement(T, null, "Updated cell ", b7.createElement(T, {
                bold: !0
            }, A), ":"), b7.createElement(v, {
                marginLeft: 2
            }, b7.createElement(YC, {
                code: B,
                language: Q
            }))))
        },
        async validateInput({
            notebook_path: A,
            cell_type: B,
            cell_id: Q,
            edit_mode: Z = "replace"
        }) {
            let D = RyB(A) ? A : OyB(t0(), A),
                G = j1();
            if (!G.existsSync(D)) return {
                result: !1,
                message: "Notebook file does not exist.",
                errorCode: 1
            };
            if (oX8(D) !== ".ipynb") return {
                result: !1,
                message: "File must be a Jupyter notebook (.ipynb file). For editing other file types, use the FileEdit tool.",
                errorCode: 2
            };
            if (Z !== "replace" && Z !== "insert" && Z !== "delete") return {
                result: !1,
                message: "Edit mode must be replace, insert, or delete.",
                errorCode: 4
            };
            if (Z === "insert" && !B) return {
                result: !1,
                message: "Cell type is required when using edit_mode=insert.",
                errorCode: 5
            };
            let F = jY(D),
                I = G.readFileSync(D, {
                    encoding: F
                }),
                Y = T7(I);
            if (!Y) return {
                result: !1,
                message: "Notebook is not valid JSON.",
                errorCode: 6
            };
            if (!Q) {
                if (Z !== "insert") return {
                    result: !1,
                    message: "Cell ID must be specified when not inserting a new cell.",
                    errorCode: 7
                }
            } else {
                let W = hG1(Q);
                if (W !== void 0) {
                    if (!Y.cells[W]) return {
                        result: !1,
                        message: `Cell with index ${W} does not exist in notebook.`,
                        errorCode: 7
                    }
                } else if (!Y.cells.find((J) => J.id === Q)) return {
                    result: !1,
                    message: `Cell with ID "${Q}" not found in notebook.`,
                    errorCode: 8
                }
            }
            return {
                result: !0
            }
        },
        async * call({
            notebook_path: A,
            new_source: B,
            cell_id: Q,
            cell_type: Z,
            edit_mode: D
        }) {
            let G = RyB(A) ? A : OyB(t0(), A);
            try {
                let F = jY(G),
                    I = j1().readFileSync(G, {
                        encoding: F
                    }),
                    Y = JSON.parse(I),
                    W;
                if (!Q) W = 0;
                else {
                    let H = hG1(Q);
                    if (H !== void 0) {
                        if (W = H, D === "insert") W += 1
                    } else if (W = Y.cells.findIndex((z) => z.id === Q), D === "insert") W += 1
                }
                let J = D;
                if (J === "replace" && W === Y.cells.length) {
                    if (J = "insert", !Z) Z = "code"
                }
                let X = Y.metadata.language_info?.name ?? "python",
                    V = void 0;
                if (Y.nbformat > 4 || Y.nbformat === 4 && Y.nbformat_minor >= 5) {
                    if (J === "insert") V = Math.random().toString(36).substring(2, 15);
                    else if (Q !== null) V = Q
                }
                if (J === "delete") Y.cells.splice(W, 1);
                else if (J === "insert") {
                    let H;
                    if (Z === "markdown") H = {
                        cell_type: "markdown",
                        id: V,
                        source: B,
                        metadata: {}
                    };
                    else H = {
                        cell_type: "code",
                        id: V,
                        source: B,
                        metadata: {},
                        execution_count: null,
                        outputs: []
                    };
                    Y.cells.splice(W, 0, H)
                } else {
                    let H = Y.cells[W];
                    if (H.source = B, H.cell_type === "code") H.execution_count = null, H.outputs = [];
                    if (Z && Z !== H.cell_type) H.cell_type = Z
                }
                let C = OT(G);
                ey(G, JSON.stringify(Y, null, 1), F, C), yield {
                    type: "result",
                    data: {
                        new_source: B,
                        cell_type: Z ?? "code",
                        language: X,
                        edit_mode: J ?? "replace",
                        cell_id: V || void 0,
                        error: ""
                    }
                }
            } catch (F) {
                if (F instanceof Error) {
                    yield {
                        type: "result",
                        data: {
                            new_source: B,
                            cell_type: Z ?? "code",
                            language: "python",
                            edit_mode: "replace",
                            error: F.message,
                            cell_id: Q
                        }
                    };
                    return
                }
                yield {
                    type: "result",
                    data: {
                        new_source: B,
                        cell_type: Z ?? "code",
                        language: "python",
                        edit_mode: "replace",
                        error: "Unknown error occurred while editing notebook",
                        cell_id: Q
                    }
                }
            }
        }
    };
var yF1 = G1(z1(), 1);
import {
    isAbsolute as AV8,
    relative as BV8,
    resolve as QV8
} from "path";
var ND = G1(z1(), 1);
var eX8 = h.strictObject({
        pattern: h.string().describe("The regular expression pattern to search for in file contents"),
        path: h.string().optional().describe("File or directory to search in (rg PATH). Defaults to current working directory."),
        glob: h.string().optional().describe('Glob pattern to filter files (e.g. "*.js", "*.{ts,tsx}") - maps to rg --glob'),
        output_mode: h.enum(["content", "files_with_matches", "count"]).optional().describe('Output mode: "content" shows matching lines (supports -A/-B/-C context, -n line numbers, head_limit), "files_with_matches" shows file paths (supports head_limit), "count" shows match counts (supports head_limit). Defaults to "files_with_matches".'),
        "-B": h.number().optional().describe('Number of lines to show before each match (rg -B). Requires output_mode: "content", ignored otherwise.'),
        "-A": h.number().optional().describe('Number of lines to show after each match (rg -A). Requires output_mode: "content", ignored otherwise.'),
        "-C": h.number().optional().describe('Number of lines to show before and after each match (rg -C). Requires output_mode: "content", ignored otherwise.'),
        "-n": h.boolean().optional().describe('Show line numbers in output (rg -n). Requires output_mode: "content", ignored otherwise.'),
        "-i": h.boolean().optional().describe("Case insensitive search (rg -i)"),
        type: h.string().optional().describe("File type to search (rg --type). Common types: js, py, rust, go, java, etc. More efficient than include for standard file types."),
        head_limit: h.number().optional().describe('Limit output to first N lines/entries, equivalent to "| head -N". Works across all output modes: content (limits output lines), files_with_matches (limits file paths), count (limits count entries). When unspecified, shows all results from ripgrep.'),
        multiline: h.boolean().optional().describe("Enable multiline mode where . matches newlines and patterns can span lines (rg -U --multiline-dotall). Default: false.")
    }),
    dL0 = 20000;

function cL0(A) {
    if (A.length <= dL0) return A;
    let B = A.slice(0, dL0),
        Z = A.slice(dL0).split(`
`).length;
    return `${B}

... [${Z} lines truncated] ...`
}

function lL0(A, B) {
    return B !== void 0 ? A.slice(0, B) : A
}