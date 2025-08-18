/* chunk:595 bytes:[13719462, 13739461) size:19999 source:unpacked-cli.js */
var ekB = 10,
    AyB = 16000,
    EX8 = "<response clipped><NOTE>To save on context only part of this file has been shown to you. You should retry this tool after you have searched inside the file with Grep in order to find the line numbers of what you are looking for.</NOTE>",
    UX8 = h.strictObject({
        file_path: h.string().describe("The absolute path to the file to write (must be absolute, not relative)"),
        content: h.string().describe("The content to write to the file")
    }),
    iq3 = h.object({
        type: h.enum(["create", "update"]).describe("Whether a new file was created or an existing file was updated"),
        filePath: h.string().describe("The path to the file that was written"),
        content: h.string().describe("The content that was written to the file"),
        structuredPatch: h.array(pG1).describe("Diff patch showing the changes")
    }),
    BH = {
        name: wv,
        async description() {
            return "Write a file to the local filesystem."
        },
        userFacingName() {
            return "Write"
        },
        async prompt() {
            return yLB
        },
        isEnabled() {
            return !0
        },
        renderToolUseMessage(A, {
            verbose: B
        }) {
            if (!A.file_path) return null;
            return B ? A.file_path : xV(A.file_path)
        },
        inputSchema: UX8,
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
            return vg(BH, A, B.getToolPermissionContext())
        },
        renderToolUseRejectedMessage({
            file_path: A,
            content: B
        }, {
            columns: Q,
            style: Z,
            verbose: D
        }) {
            try {
                let G = j1(),
                    F = KX8(A) ? A : HX8(t0(), A),
                    I = G.existsSync(F),
                    Y = I ? jY(F) : "utf-8",
                    W = I ? G.readFileSync(F, {
                        encoding: Y
                    }) : null,
                    J = W ? "update" : "create",
                    X = QU({
                        filePath: A,
                        fileContents: W ?? "",
                        edits: [{
                            old_string: W ?? "",
                            new_string: B,
                            replace_all: !1
                        }]
                    }),
                    V = NQ.createElement(v, {
                        flexDirection: "row"
                    }, NQ.createElement(T, {
                        color: "error"
                    }, "User rejected ", J === "update" ? "update" : "write", " to", " "), NQ.createElement(T, {
                        bold: !0,
                        color: "error"
                    }, D ? A : tkB(t0(), A)));
                if (Z === "condensed" && !D) return V;
                return NQ.createElement(OA, null, NQ.createElement(v, {
                    flexDirection: "column"
                }, V, WC(X.map((C) => NQ.createElement(v, {
                    flexDirection: "column",
                    key: C.newStart
                }, NQ.createElement(JC, {
                    patch: C,
                    dim: !0,
                    width: Q - 12
                }))), (C) => NQ.createElement(v, {
                    key: `ellipsis-${C}`
                }, NQ.createElement(T, {
                    color: "secondaryText"
                }, "...")))))
            } catch (G) {
                return R1(G), NQ.createElement(v, {
                    flexDirection: "column"
                }, NQ.createElement(T, null, "  ", "⎿ (No changes)"))
            }
        },
        renderToolUseErrorMessage(A, {
            verbose: B
        }) {
            if (!B && typeof A === "string" && l4(A, "tool_use_error")) return NQ.createElement(OA, null, NQ.createElement(T, {
                color: "error"
            }, "Error writing file"));
            return NQ.createElement(f6, {
                result: A,
                verbose: B
            })
        },
        renderToolUseProgressMessage() {
            return null
        },
        renderToolResultMessage({
            filePath: A,
            content: B,
            structuredPatch: Q,
            type: Z
        }, D, {
            style: G,
            verbose: F
        }) {
            switch (Z) {
                case "create": {
                    let I = B || "(No content)",
                        Y = B.split(XX8).length,
                        W = Y - ekB,
                        J = NQ.createElement(T, null, "Wrote ", NQ.createElement(T, {
                            bold: !0
                        }, Y), " lines to", " ", NQ.createElement(T, {
                            bold: !0
                        }, F ? A : tkB(t0(), A)));
                    if (G === "condensed" && !F) return J;
                    return NQ.createElement(OA, null, NQ.createElement(v, {
                        flexDirection: "column"
                    }, J, NQ.createElement(v, {
                        flexDirection: "column"
                    }, NQ.createElement(YC, {
                        code: F ? I : I.split(`
`).slice(0, ekB).filter((X) => X.trim() !== "").join(`
`),
                        language: CX8(A).slice(1)
                    }), !F && W > 0 && NQ.createElement(T, {
                        color: "secondaryText"
                    }, "… +", W, " ", W === 1 ? "line" : "lines", " ", Y > 0 && NQ.createElement(bv, null)))))
                }
                case "update":
                    return NQ.createElement(Kb1, {
                        filePath: A,
                        structuredPatch: Q,
                        verbose: F
                    })
            }
        },
        async validateInput({
            file_path: A
        }, {
            readFileState: B
        }) {
            let Q = HD(A);
            if (hz(Q)) return {
                result: !1,
                message: "File is in a directory that is ignored by your project configuration.",
                errorCode: 1
            };
            let Z = j1();
            if (!Z.existsSync(Q)) return {
                result: !0
            };
            let D = B.get(Q);
            if (!D) return {
                result: !1,
                message: "File has not been read yet. Read it first before writing to it.",
                errorCode: 2
            };
            if (Z.statSync(Q).mtimeMs > D.timestamp) return {
                result: !1,
                message: "File has been modified since read, either by the user or by a linter. Read it again before attempting to write it.",
                errorCode: 3
            };
            return {
                result: !0
            }
        },
        async * call({
            file_path: A,
            content: B
        }, {
            readFileState: Q
        }) {
            let Z = HD(A),
                D = VX8(Z),
                G = j1(),
                F = G.existsSync(Z),
                I = F ? jY(Z) : "utf-8",
                Y = F ? G.readFileSync(Z, {
                    encoding: I
                }) : null;
            await u$.beforeFileEdited(Z);
            let W = F ? OT(Z) : await B12();
            if (G.mkdirSync(D), ey(Z, B, I, W), Q.set(Z, {
                    content: B,
                    timestamp: G.statSync(Z).mtimeMs
                }), Z.endsWith(`${zX8}CLAUDE.md`)) X1("tengu_write_claudemd", {});
            if (Y) {
                let X = QU({
                        filePath: A,
                        fileContents: Y,
                        edits: [{
                            old_string: Y,
                            new_string: B,
                            replace_all: !1
                        }]
                    }),
                    V = {
                        type: "update",
                        filePath: A,
                        content: B,
                        structuredPatch: X
                    };
                Hd(X), yield {
                    type: "result",
                    data: V
                };
                return
            }
            let J = {
                type: "create",
                filePath: A,
                content: B,
                structuredPatch: []
            };
            Hd([], B), yield {
                type: "result",
                data: J
            }
        },
        mapToolResultToToolResultBlockParam({
            filePath: A,
            content: B,
            type: Q
        }, Z) {
            switch (Q) {
                case "create":
                    return {
                        tool_use_id: Z, type: "tool_result", content: `File created successfully at: ${A}`
                    };
                case "update":
                    return {
                        tool_use_id: Z, type: "tool_result", content: `The file ${A} has been updated. Here's the result of running \`cat -n\` on a snippet of the edited file:
${A_({content:B.split(/\r?\n/).length>AyB?B.split(/\r?\n/).slice(0,AyB).join(`
`)+EX8:B,startLine:1})}`
                    }
            }
        }
    };
var jF1 = G1(z1(), 1);
import {
    basename as vX8
} from "path";
var QH = G1(z1(), 1),
    Af1 = G1(z1(), 1);
import {
    relative as wX8
} from "path";

function Bf1({
    file_path: A,
    edits: B,
    verbose: Q,
    useBorder: Z = !0
}) {
    let D = Af1.useMemo(() => j1().existsSync(A) ? AX(A) : "", [A]),
        G = Af1.useMemo(() => B.map((I) => {
            let Y = J01(D, I.old_string) || I.old_string;
            return {
                ...I,
                old_string: Y
            }
        }), [D, B]),
        F = Af1.useMemo(() => QU({
            filePath: A,
            fileContents: D,
            edits: G
        }), [A, D, G]);
    return QH.createElement(v, {
        flexDirection: "column"
    }, QH.createElement(v, {
        borderColor: "secondaryBorder",
        borderStyle: Z ? "round" : void 0,
        flexDirection: "column",
        paddingX: 1
    }, QH.createElement(v, {
        paddingBottom: 1
    }, QH.createElement(T, {
        bold: !0
    }, Q ? A : wX8(t0(), A))), WC(F.map((I) => QH.createElement(JC, {
        key: I.newStart,
        patch: I,
        dim: !1
    })), (I) => QH.createElement(T, {
        color: "secondaryText",
        key: `ellipsis-${I}`
    }, "..."))))
}
var Od = G1(z1(), 1);
var SF1 = G1(z1(), 1);

function AR({
    title: A
}) {
    return SF1.createElement(v, {
        flexDirection: "column"
    }, SF1.createElement(T, {
        bold: !0,
        color: "permission"
    }, A))
}
var ByB = G1(z1(), 1);

function sv(A, B) {
    ByB.useEffect(() => {
        X1("tengu_tool_use_show_permission_request", {
            messageID: A.assistantMessage.message.id,
            toolName: A.tool.name,
            isMcp: A.tool.isMcp ?? !1,
            decisionReasonType: A.permissionResult.decisionReason?.type
        }), Promise.resolve(B.language_name).then((Z) => {
            PM({
                completion_type: B.completion_type,
                event: "response",
                metadata: {
                    language_name: Z,
                    message_id: A.assistantMessage.message.id,
                    platform: sA.platform
                }
            })
        })
    }, [A, B])
}
var Qf1 = G1(z1(), 1);
var QyB = G1(ax(), 1),
    $X8 = L9() !== "windows" || !process.versions.bun && QyB.default.satisfies(process.versions.node, ">=22.17.0 <23.0.0 || >=24.2.0"),
    ZH = !$X8 ? {
        displayText: "alt+m",
        check: (A, B) => B.meta && (A === "m" || A === "M")
    } : {
        displayText: "shift+tab",
        check: (A, B) => B.tab && B.shift
    };
import {
    basename as qX8
} from "path";

function ZyB({
    filePath: A,
    toolPermissionContext: B
}) {
    let Q = [{
        label: "Yes",
        option: {
            type: "accept-once"
        }
    }];
    if (EK(A, B)) Q.push({
        label: `Yes, for this session only (${e1.bold.dim(ZH.displayText)})`,
        option: {
            type: "accept-session"
        }
    });
    else {
        let D = jx(A),
            G = qX8(D) || "this directory";
        Q.push({
            label: `Yes, allow ${e1.bold(G)} for this session only (${e1.bold.dim(ZH.displayText)})`,
            option: {
                type: "accept-session"
            }
        })
    }
    return Q.push({
        label: `No, and tell Claude what to do differently (${e1.bold.dim("esc")})`,
        option: {
            type: "reject"
        }
    }), Q
}
var NX8 = G1(z1(), 1);

function uL0(A, B, Q, Z) {
    PM({
        completion_type: B,
        event: A,
        metadata: {
            language_name: Q,
            message_id: Z,
            platform: sA.platform
        }
    })
}

function LX8(A, B) {
    return {
        ...A,
        mode: B
    }
}

function MX8(A) {
    let {
        messageId: B,
        toolUseConfirm: Q,
        onDone: Z,
        completionType: D,
        languageName: G
    } = A;
    uL0("accept", D, G, B), Z(), Q.onAllow("temporary", Q.input)
}

function RX8(A) {
    let {
        messageId: B,
        path: Q,
        toolUseConfirm: Z,
        toolPermissionContext: D,
        setToolPermissionContext: G,
        onDone: F,
        completionType: I,
        languageName: Y
    } = A;
    if (uL0("accept", I, Y, B), Q) {
        let W = jx(Q),
            J = EZ1(D, W, "session");
        J = LX8(J, "acceptEdits"), G(J)
    }
    F(), Z.onAllow("permanent", Z.input)
}

function OX8(A) {
    let {
        messageId: B,
        toolUseConfirm: Q,
        onDone: Z,
        onReject: D,
        completionType: G,
        languageName: F
    } = A;
    uL0("reject", G, F, B), Z(), D(), Q.onReject()
}
var DyB = {
    "accept-once": MX8,
    "accept-session": RX8,
    reject: OX8
};

function GyB({
    filePath: A,
    completionType: B,
    languageName: Q,
    toolUseConfirm: Z,
    toolPermissionContext: D,
    setToolPermissionContext: G,
    onDone: F,
    onReject: I,
    parseInput: Y
}) {
    let W = Qf1.useMemo(() => ZyB({
            filePath: A,
            toolPermissionContext: D
        }), [A, D]),
        J = Qf1.useCallback((X, V) => {
            let C = DyB[X.type];
            if (!C) return;
            let K = {
                    messageId: Z.assistantMessage.message.id,
                    path: A,
                    toolUseConfirm: Z,
                    toolPermissionContext: D,
                    setToolPermissionContext: G,
                    onDone: F,
                    onReject: I,
                    completionType: B,
                    languageName: Q
                },
                H = Z.onAllow;
            Z.onAllow = (z, $) => {
                H(z, V)
            }, C(K)
        }, [A, B, Q, Z, D, G, F, I]);
    return DA((X, V) => {
        if (ZH.check(X, V)) {
            let C = W.find((K) => K.option.type === "accept-session");
            if (C) {
                let K = Y(Z.input);
                J(C.option, K)
            }
        }
    }), {
        options: W,
        onChange: J
    }
}
var SS = G1(z1(), 1);
import {
    randomUUID as TX8
} from "crypto";
import {
    basename as PX8
} from "path";

function FyB({
    onChange: A,
    toolUseContext: B,
    filePath: Q,
    edits: Z,
    editMode: D
}) {
    let G = SS.useRef(!1),
        [F, I] = SS.useState(!1),
        Y = SS.useMemo(() => TX8().slice(0, 6), []),
        W = SS.useMemo(() => `✻ [Claude Code] ${PX8(Q)} (${Y}) ⧉`, [Q, Y]),
        J = Cy1(B.options.mcpClients) && H0().diffTool === "auto" && !Q.endsWith(".ipynb"),
        X = Hy1(B.options.mcpClients) ?? "IDE";
    async function V() {
        if (!J) return;
        try {
            X1("tengu_ext_will_show_diff", {});
            let {
                oldContent: C,
                newContent: K
            } = await jX8(Q, Z, B, W);
            if (G.current) return;
            X1("tengu_ext_diff_accepted", {});
            let H = SX8(Q, C, K, D);
            if (H.length === 0) {
                X1("tengu_ext_diff_rejected", {});
                let z = eV(B.options.mcpClients);
                A({
                    type: "reject"
                }, {
                    file_path: Q,
                    edits: Z
                });
                return
            }
            A({
                type: "accept-once"
            }, {
                file_path: Q,
                edits: H
            })
        } catch (C) {
            R1(C), I(!0)
        }
    }
    return SS.useEffect(() => {
        return V(), () => {
            G.current = !0
        }
    }, []), {
        closeTabInIDE() {
            let C = eV(B.options.mcpClients);
            if (!C) return Promise.resolve();
            return IyB(W, B, C)
        },
        showingDiffInIDE: J && !F,
        ideName: X,
        hasError: F
    }
}

function SX8(A, B, Q, Z) {
    let D = Z === "single",
        G = bPB({
            filePath: A,
            oldContent: B,
            newContent: Q,
            singleHunk: D
        });
    if (G.length === 0) return [];
    if (D && G.length > 1) R1(new Error(`Unexpected number of hunks: ${G.length}. Expected 1 hunk.`));
    return dPB(G)
}
async function jX8(A, B, Q, Z) {
    let D = !1,
        G = j1(),
        F = HD(A),
        I = G.existsSync(F) ? AX(F) : "";
    async function Y() {
        if (D) return;
        D = !0;
        try {
            await IyB(Z, Q, W)
        } catch (J) {
            R1(J)
        }
        process.off("beforeExit", Y), Q.abortController.signal.removeEventListener("abort", Y)
    }
    Q.abortController.signal.addEventListener("abort", Y), process.on("beforeExit", Y);
    let W = eV(Q.options.mcpClients);
    try {
        let {
            updatedFile: J
        } = wS({
            filePath: F,
            fileContents: I,
            edits: B
        });
        if (!W || W.type !== "connected") throw new Error("IDE client not available");
        let X = F,
            V = W.config.ideRunningInWindows === !0;
        if (L9() === "wsl" && V && process.env.WSL_DISTRO_NAME) X = new le(process.env.WSL_DISTRO_NAME).toIDEPath(F);
        let C = await tP("openDiff", {
                old_file_path: X,
                new_file_path: X,
                new_file_contents: J,
                tab_name: Z
            }, W, Q.options.isNonInteractiveSession),
            K = {
                type: "result",
                data: Array.isArray(C) ? C : [C]
            };
        if (_X8(K)) return Y(), {
            oldContent: I,
            newContent: K.data[1].text
        };
        else if (kX8(K)) return Y(), {
            oldContent: I,
            newContent: J
        };
        else if (yX8(K)) return Y(), {
            oldContent: I,
            newContent: I
        };
        throw new Error("Not accepted")
    } catch (J) {
        throw R1(J), Y(), J
    }
}
async function IyB(A, B, Q) {
    try {
        if (!Q || Q.type !== "connected") throw new Error("IDE client not available");
        await tP("close_tab", {
            tab_name: A
        }, Q, B.options.isNonInteractiveSession)
    } catch (Z) {
        R1(Z)
    }
}

function kX8(A) {
    return A.type === "result" && Array.isArray(A.data) && typeof A.data[0] === "object" && A.data[0] !== null && "type" in A.data[0] && A.data[0].type === "text" && "text" in A.data[0] && A.data[0].text === "TAB_CLOSED"
}

function yX8(A) {
    return A.type === "result" && Array.isArray(A.data) && typeof A.data[0] === "object" && A.data[0] !== null && "type" in A.data[0] && A.data[0].type === "text" && "text" in A.data[0] && A.data[0].text === "DIFF_REJECTED"
}