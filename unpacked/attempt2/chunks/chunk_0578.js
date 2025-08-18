/* chunk:578 bytes:[13424187, 13441449) size:17262 source:unpacked-cli.js */
function wS({
    filePath: A,
    fileContents: B,
    edits: Q
}) {
    let Z = B,
        D = [];
    if (!B && Q.length === 1 && Q[0] && Q[0].old_string === "" && Q[0].new_string === "") return {
        patch: QU({
            filePath: A,
            fileContents: B,
            edits: [{
                old_string: B,
                new_string: Z,
                replace_all: !1
            }]
        }),
        updatedFile: ""
    };
    for (let F of Q) {
        let I = F.old_string.replace(/\n+$/, "");
        for (let W of D)
            if (I !== "" && W.includes(I)) throw new Error("Cannot edit file: old_string is a substring of a new_string from a previous edit.");
        let Y = Z;
        if (Z = F.old_string === "" ? F.new_string : gPB(Z, F.old_string, F.new_string, F.replace_all), Z === Y) throw new Error("String not found in file. Failed to apply edit.");
        D.push(F.new_string)
    }
    if (Z === B) throw new Error("Original and edited file match exactly. Failed to apply edit.");
    return {
        patch: QU({
            filePath: A,
            fileContents: B,
            edits: [{
                old_string: B,
                new_string: Z,
                replace_all: !1
            }]
        }),
        updatedFile: Z
    }
}

function uPB(A, B) {
    return dG1("file.txt", "file.txt", A, B, void 0, void 0, {
        context: 8
    }).hunks.map((Z) => ({
        startLine: Z.oldStart,
        content: Z.lines.filter((D) => !D.startsWith("-")).map((D) => D.slice(1)).join(`
`)
    })).map(A_).join(`
...
`)
}

function mPB(A, B, Q, Z = 4) {
    let G = (A.split(B)[0] ?? "").split(/\r?\n/).length - 1,
        F = gPB(A, B, Q).split(/\r?\n/),
        I = Math.max(0, G - Z),
        Y = G + Z + Q.split(/\r?\n/).length;
    return {
        snippet: F.slice(I, Y).join(`
`),
        startLine: I + 1
    }
}

function dPB(A) {
    return A.map((B) => {
        let Q = [],
            Z = [],
            D = [];
        for (let G of B.lines)
            if (G.startsWith(" ")) Q.push(G.slice(1)), Z.push(G.slice(1)), D.push(G.slice(1));
            else if (G.startsWith("-")) Z.push(G.slice(1));
        else if (G.startsWith("+")) D.push(G.slice(1));
        return {
            old_string: Z.join(`
`),
            new_string: D.join(`
`),
            replace_all: !1
        }
    })
}
var fF8 = {
    "<fnr>": "<function_results>",
    "<n>": "<name>",
    "</n>": "</name>",
    "<o>": "<output>",
    "</o>": "</output>",
    "<e>": "<error>",
    "</e>": "</error>",
    "<s>": "<system>",
    "</s>": "</system>",
    "<r>": "<result>",
    "</r>": "</result>",
    "< META_START >": "<META_START>",
    "< META_END >": "<META_END>",
    "< EOT >": "<EOT>",
    "< META >": "<META>",
    "< SOS >": "<SOS>",
    "\n\nH:": `

Human:`,
    "\n\nA:": `

Assistant:`
};

function hF8(A) {
    let B = A,
        Q = [];
    for (let [Z, D] of Object.entries(fF8)) {
        let G = B;
        if (B = B.replaceAll(Z, D), G !== B) Q.push({
            from: Z,
            to: D
        })
    }
    return {
        result: B,
        appliedReplacements: Q
    }
}

function xN0({
    file_path: A,
    edits: B
}) {
    if (B.length === 0) return {
        file_path: A,
        edits: B
    };
    try {
        let Q = HD(A);
        if (!j1().existsSync(Q)) return {
            file_path: A,
            edits: B
        };
        let Z = O40(Q);
        return {
            file_path: A,
            edits: B.map(({
                old_string: D,
                new_string: G,
                replace_all: F
            }) => {
                if (Z.includes(D)) return {
                    old_string: D,
                    new_string: G,
                    replace_all: F
                };
                let {
                    result: I,
                    appliedReplacements: Y
                } = hF8(D);
                if (Z.includes(I)) {
                    let W = G;
                    for (let {
                            from: J,
                            to: X
                        }
                        of Y) W = W.replaceAll(J, X);
                    return {
                        old_string: I,
                        new_string: W,
                        replace_all: F
                    }
                }
                return {
                    old_string: D,
                    new_string: G,
                    replace_all: F
                }
            })
        }
    } catch (Q) {
        R1(Q)
    }
    return {
        file_path: A,
        edits: B
    }
}

function gF8(A, B, Q) {
    if (A.length === B.length && A.every((I, Y) => {
            let W = B[Y];
            return W !== void 0 && I.old_string === W.old_string && I.new_string === W.new_string && I.replace_all === W.replace_all
        })) return !0;
    let Z = null,
        D = null,
        G = null,
        F = null;
    try {
        Z = wS({
            filePath: "temp",
            fileContents: Q,
            edits: A
        })
    } catch (I) {
        D = I instanceof Error ? I.message : String(I)
    }
    try {
        G = wS({
            filePath: "temp",
            fileContents: Q,
            edits: B
        })
    } catch (I) {
        F = I instanceof Error ? I.message : String(I)
    }
    if (D !== null && F !== null) return D === F;
    if (D !== null || F !== null) return !1;
    return Z.updatedFile === G.updatedFile
}

function Hb1(A, B) {
    if (A.file_path !== B.file_path) return !1;
    if (A.edits.length === B.edits.length && A.edits.every((D, G) => {
            let F = B.edits[G];
            return F !== void 0 && D.old_string === F.old_string && D.new_string === F.new_string && D.replace_all === F.replace_all
        })) return !0;
    let Z = j1().existsSync(A.file_path) ? O40(A.file_path) : "";
    return gF8(A.edits, B.edits, Z)
}
var uF = G1(z1(), 1);
import {
    relative as uF8
} from "path";

function zb1({
    file_path: A,
    operation: B,
    patch: Q,
    style: Z,
    verbose: D
}) {
    let {
        columns: G
    } = r9(), F = uF.createElement(v, {
        flexDirection: "row"
    }, uF.createElement(T, {
        color: "error"
    }, "User rejected ", B, " to "), uF.createElement(T, {
        bold: !0,
        color: "error"
    }, D ? A : uF8(t0(), A)));
    if (Z === "condensed" && !D) return F;
    return uF.createElement(OA, null, uF.createElement(v, {
        flexDirection: "column"
    }, F, WC(Q.map((I) => uF.createElement(v, {
        flexDirection: "column",
        key: I.newStart
    }, uF.createElement(JC, {
        patch: I,
        dim: !0,
        width: G - 12
    }))), (I) => uF.createElement(v, {
        key: `ellipsis-${I}`
    }, uF.createElement(T, {
        color: "secondaryText"
    }, "...")))))
}
var cPB = h.strictObject({
        file_path: h.string().describe("The absolute path to the file to modify"),
        old_string: h.string().describe("The text to replace"),
        new_string: h.string().describe("The text to replace it with (must be different from old_string)"),
        replace_all: h.boolean().default(!1).optional().describe("Replace all occurences of old_string (default false)")
    }),
    pG1 = h.object({
        oldStart: h.number(),
        oldLines: h.number(),
        newStart: h.number(),
        newLines: h.number(),
        lines: h.array(h.string())
    }),
    IJ3 = h.object({
        filePath: h.string().describe("The file path that was edited"),
        oldString: h.string().describe("The original string that was replaced"),
        newString: h.string().describe("The new string that replaced it"),
        originalFile: h.string().describe("The original file contents before editing"),
        structuredPatch: h.array(pG1).describe("Diff patch showing the changes"),
        userModified: h.boolean().describe("Whether the user modified the proposed changes"),
        replaceAll: h.boolean().describe("Whether all occurrences were replaced")
    });

function Eb1(A, B, Q) {
    if (!q40(A)) return null;
    if (!b40(B).isValid) return null;
    let D = Q(),
        G = b40(D);
    if (!G.isValid) return {
        result: !1,
        message: `Claude Code settings.json validation failed after edit:
${G.error}

Full schema:
${G.fullSchema}
IMPORTANT: Do not update the env unless explicitly instructed to do so.`,
        errorCode: 10
    };
    return null
}
var FF = {
    name: eJ,
    async description() {
        return "A tool for editing files"
    },
    async prompt() {
        return fPB
    },
    userFacingName(A) {
        if (!A) return "Update";
        if (A.old_string === "") return "Create";
        return "Update"
    },
    isEnabled() {
        return !0
    },
    inputSchema: cPB,
    isConcurrencySafe() {
        return !1
    },
    isReadOnly() {
        return !1
    },
    getPath(A) {
        return A.file_path
    },
    async checkPermissions(A, B) {
        return vg(FF, A, B.getToolPermissionContext())
    },
    renderToolUseMessage({
        file_path: A
    }, {
        verbose: B
    }) {
        if (!A) return null;
        return B ? A : xV(A)
    },
    renderToolUseProgressMessage() {
        return null
    },
    renderToolResultMessage({
        filePath: A,
        structuredPatch: B
    }, Q, {
        style: Z,
        verbose: D
    }) {
        return LX.createElement(Kb1, {
            filePath: A,
            structuredPatch: B,
            style: Z,
            verbose: D
        })
    },
    renderToolUseRejectedMessage({
        file_path: A,
        old_string: B,
        new_string: Q,
        replace_all: Z = !1
    }, {
        style: D,
        verbose: G
    }) {
        try {
            let F = j1().existsSync(A) ? j1().readFileSync(A, {
                    encoding: "utf8"
                }) : "",
                I = J01(F, B) || B,
                {
                    patch: Y
                } = _N0({
                    filePath: A,
                    fileContents: F,
                    oldString: I,
                    newString: Q,
                    replaceAll: Z
                });
            return LX.createElement(zb1, {
                file_path: A,
                operation: B === "" ? "write" : "update",
                patch: Y,
                style: D,
                verbose: G
            })
        } catch (F) {
            return R1(F), LX.createElement(OA, {
                height: 1
            }, LX.createElement(T, null, "(No changes)"))
        }
    },
    async validateInput({
        file_path: A,
        old_string: B,
        new_string: Q,
        replace_all: Z = !1
    }, {
        readFileState: D
    }) {
        if (B === Q) return {
            result: !1,
            behavior: "ask",
            message: "No changes to make: old_string and new_string are exactly the same.",
            errorCode: 1
        };
        let G = Ub1(A) ? A : dF8(t0(), A);
        if (hz(G)) return {
            result: !1,
            behavior: "ask",
            message: "File is in a directory that is ignored by your project configuration.",
            errorCode: 2
        };
        let F = j1();
        if (F.existsSync(G) && B === "") {
            if (F.readFileSync(G, {
                    encoding: jY(G)
                }).replaceAll(`\r
`, `
`).trim() !== "") return {
                result: !1,
                behavior: "ask",
                message: "Cannot create new file - file already exists.",
                errorCode: 3
            };
            return {
                result: !0
            }
        }
        if (!F.existsSync(G) && B === "") return {
            result: !0
        };
        if (!F.existsSync(G)) {
            let K = Pq1(G),
                H = "File does not exist.",
                z = t0(),
                $ = _9();
            if (z !== $) H += ` Current working directory: ${z}`;
            if (K) H += ` Did you mean ${K}?`;
            return {
                result: !1,
                behavior: "ask",
                message: H,
                errorCode: 4
            }
        }
        if (G.endsWith(".ipynb")) return {
            result: !1,
            behavior: "ask",
            message: `File is a Jupyter Notebook. Use the ${Uv} to edit this file.`,
            errorCode: 5
        };
        let I = D.get(G);
        if (!I) return {
            result: !1,
            behavior: "ask",
            message: "File has not been read yet. Read it first before writing to it.",
            meta: {
                isFilePathAbsolute: String(Ub1(A))
            },
            errorCode: 6
        };
        if (F.statSync(G).mtimeMs > I.timestamp) return {
            result: !1,
            behavior: "ask",
            message: "File has been modified since read, either by the user or by a linter. Read it again before attempting to write it.",
            errorCode: 7
        };
        let J = F.readFileSync(G, {
                encoding: jY(G)
            }).replaceAll(`\r
`, `
`),
            X = J01(J, B);
        if (!X) return {
            result: !1,
            behavior: "ask",
            message: `String to replace not found in file.
String: ${B}`,
            meta: {
                isFilePathAbsolute: String(Ub1(A))
            },
            errorCode: 8
        };
        let V = J.split(X).length - 1;
        if (V > 1 && !Z) return {
            result: !1,
            behavior: "ask",
            message: `Found ${V} matches of the string to replace, but replace_all is false. To replace all occurrences, set replace_all to true. To replace only one occurrence, please provide more context to uniquely identify the instance.
String: ${B}`,
            meta: {
                isFilePathAbsolute: String(Ub1(A)),
                actualOldString: X
            },
            errorCode: 9
        };
        let C = Eb1(G, J, () => {
            return Z ? J.replaceAll(X, Q) : J.replace(X, Q)
        });
        if (C !== null) return C;
        return {
            result: !0,
            meta: {
                actualOldString: X
            }
        }
    },
    inputsEquivalent(A, B) {
        return Hb1({
            file_path: A.file_path,
            edits: [{
                old_string: A.old_string,
                new_string: A.new_string,
                replace_all: A.replace_all ?? !1
            }]
        }, {
            file_path: B.file_path,
            edits: [{
                old_string: B.old_string,
                new_string: B.new_string,
                replace_all: B.replace_all ?? !1
            }]
        })
    },
    async * call({
        file_path: A,
        old_string: B,
        new_string: Q,
        replace_all: Z = !1
    }, {
        readFileState: D,
        userModified: G
    }) {
        let F = j1(),
            I = HD(A),
            Y = F.existsSync(I) ? AX(I) : "";
        await u$.beforeFileEdited(I);
        let W = J01(Y, B) || B,
            {
                patch: J,
                updatedFile: X
            } = _N0({
                filePath: I,
                fileContents: Y,
                oldString: W,
                newString: Q,
                replaceAll: Z
            }),
            V = mF8(I);
        F.mkdirSync(V);
        let C = F.existsSync(I) ? OT(I) : "LF",
            K = F.existsSync(I) ? jY(I) : "utf8";
        if (ey(I, X, K, C), D.set(I, {
                content: X,
                timestamp: F.statSync(I).mtimeMs
            }), I.endsWith(`${cF8}CLAUDE.md`)) X1("tengu_write_claudemd", {});
        Hd(J), yield {
            type: "result",
            data: {
                filePath: A,
                oldString: W,
                newString: Q,
                originalFile: Y,
                structuredPatch: J,
                userModified: G ?? !1,
                replaceAll: Z
            }
        }
    },
    mapToolResultToToolResultBlockParam({
        filePath: A,
        originalFile: B,
        oldString: Q,
        newString: Z,
        userModified: D,
        replaceAll: G
    }, F) {
        let I = D ? ".  The user modified your proposed changes before accepting them. " : "";
        if (G) return {
            tool_use_id: F,
            type: "tool_result",
            content: `The file ${A} has been updated${I}. All occurrences of '${Q}' were successfully replaced with '${Z}'.`
        };
        let {
            snippet: Y,
            startLine: W
        } = mPB(B || "", Q, Z);
        return {
            tool_use_id: F,
            type: "tool_result",
            content: `The file ${A} has been updated${I}. Here's the result of running \`cat -n\` on a snippet of the edited file:
${A_({content:Y,startLine:W})}`
        }
    },
    renderToolUseErrorMessage(A, {
        verbose: B
    }) {
        if (!B && typeof A === "string" && l4(A, "tool_use_error")) return LX.createElement(OA, null, LX.createElement(T, {
            color: "error"
        }, "Error editing file"));
        return LX.createElement(f6, {
            result: A,
            verbose: B
        })
    }
};
var zd = G1(z1(), 1);
import {
    dirname as lF8,
    sep as pF8
} from "path";