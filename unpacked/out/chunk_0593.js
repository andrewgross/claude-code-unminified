/* chunk:593 bytes:[13686915, 13706398) size:19483 source:unpacked-cli.js */
async function rb1(A, B, Q, Z, D = !1) {
    try {
        if (A.length === 0) throw new Error(MF1);
        let G = UJ(A),
            F = vkB(A),
            I = {};
        try {
            I = bkB(F)
        } catch (j) {
            SA("Failed to get context analysis metrics"), R1(j)
        }
        X1("tengu_compact", {
            preCompactTokenCount: G,
            ...I
        }), nb1(B.getToolPermissionContext(), "summary"), B.setSpinnerMessage?.("Running PreCompact hooks...");
        let Y = await pjB({
            trigger: D ? "auto" : "manual",
            customInstructions: Z ?? null,
            sessionId: B.agentId
        }, B.abortController.signal);
        if (Y.newCustomInstructions) Z = Z ? `${Z}

${Y.newCustomInstructions}` : Y.newCustomInstructions;
        let W = Y.userDisplayMessage;
        B.setStreamMode?.("requesting"), B.setResponseLength?.(() => 0), B.setSpinnerMessage?.("Compacting conversation");
        let J = UkB(Z),
            X = D2({
                content: J
            }),
            C = V01(AW([...A, X]), ["You are a helpful AI assistant tasked with summarizing conversations."], 0, [x8], B.abortController.signal, {
                getToolPermissionContext: B.getToolPermissionContext,
                model: AG(),
                prependCLISysprompt: !0,
                toolChoice: void 0,
                isNonInteractiveSession: B.options.isNonInteractiveSession,
                maxOutputTokensOverride: _kB,
                promptCategory: "compact"
            })[Symbol.asyncIterator](),
            K = await C.next(),
            H = !1,
            z;
        while (!K.done) {
            let j = K.value;
            if (!H && j.type === "stream_event" && j.event.type === "content_block_start" && j.event.content_block.type === "text") H = !0, B.setStreamMode?.("responding");
            if (j.type === "stream_event" && j.event.type === "content_block_delta" && j.event.delta.type === "text_delta") {
                let f = j.event.delta.text.length;
                B.setResponseLength?.((k) => k + f)
            }
            if (j.type === "assistant") z = j;
            K = await C.next()
        }
        if (!z) throw new Error("Failed to get summary response from streaming");
        let $ = cb1(z);
        if (!$) throw X1("tengu_compact_failed", {
            reason: "no_summary",
            preCompactTokenCount: G
        }), new Error("Failed to generate conversation summary - response did not contain valid text content");
        else if ($.startsWith(CJ)) throw X1("tengu_compact_failed", {
            reason: "api_error",
            preCompactTokenCount: G
        }), new Error($);
        else if ($.startsWith(oZ1)) throw X1("tengu_compact_failed", {
            reason: "prompt_too_long",
            preCompactTokenCount: G
        }), new Error(rJ8);
        let L = BPB(B.readFileState);
        B.readFileState.clear();
        let N = await tJ8(L, B, nJ8),
            R = eJ8(B.agentId);
        if (R) N.push(R);
        let O = [D2({
            content: wkB($, Q),
            isCompactSummary: !0
        }), ...N];
        B.setSpinnerMessage?.("Running SessionStart hooks...");
        let P = await WU("compact");
        if (P.length > 0) O.push(...P);
        if (B.setMessages) {
            if (B.setMessages(O), B.setMessageHistory) B.setMessageHistory((j) => [...j, ...A])
        }
        return B.setStreamMode?.("requesting"), B.setResponseLength?.(() => 0), B.setSpinnerMessage?.(null), {
            summaryMessage: z,
            messagesAfterCompacting: O,
            userDisplayMessage: W
        }
    } catch (G) {
        throw B.setStreamMode?.("requesting"), B.setResponseLength?.(() => 0), B.setSpinnerMessage?.(null), oJ8(G, B), G
    }
}

function oJ8(A, B) {
    if (x61(A, RF1) || x61(A, MF1)) B.addNotification?.({
        text: ""
    }, {
        timeoutMs: 0
    });
    else B.addNotification?.({
        text: "Error compacting conversation",
        color: "error"
    }, {
        timeoutMs: 2000
    })
}
async function tJ8(A, B, Q) {
    let Z = Object.entries(A).map(([F, I]) => ({
            filename: F,
            ...I
        })).filter((F) => !AX8(F.filename, B.agentId)).sort((F, I) => I.timestamp - F.timestamp).slice(0, Q),
        D = await Promise.all(Z.map(async (F) => {
            let I = await fL0(F.filename, {
                ...B,
                fileReadingLimits: {
                    maxTokens: sJ8
                }
            }, "tengu_post_compact_file_restore_success", "tengu_post_compact_file_restore_error");
            return I ? Rd(I) : null
        })),
        G = 0;
    return D.filter((F) => {
        if (F === null) return !1;
        let I = zJ(JSON.stringify(F));
        if (G + I <= aJ8) return G += I, !0;
        return !1
    })
}

function eJ8(A) {
    let B = sE(A);
    if (B.length === 0) return null;
    return Rd({
        type: "todo",
        content: B,
        itemCount: B.length,
        context: "post-compact"
    })
}

function AX8(A, B) {
    let Q = bg(A);
    try {
        let Z = bg($v(B));
        if (Q === Z) return !0
    } catch {}
    try {
        if (new Set(ykB.map((D) => bg(HE(D)))).has(Q)) return !0
    } catch {}
    return !1
}

function fkB({
    param: {
        text: A
    },
    addMargin: B,
    shouldShowDot: Q
}) {
    let {
        columns: Z
    } = r9(), [D] = fB();
    if (db1(A)) return null;
    if (A.startsWith(BH0)) {
        let G = Number(A.split("|")[1] ?? 0),
            F = c11(G, !0),
            I = B3.default.createElement(T, {
                dimColor: !0
            }, " • /upgrade to increase your usage limit.");
        return B3.default.createElement(OA, null, B3.default.createElement(v, {
            flexDirection: "column",
            gap: 1
        }, B3.default.createElement(T, {
            color: "error"
        }, "Claude usage limit reached.", G ? ` Your limit will reset at ${F}.` : ""), KB() && I))
    }
    switch (A) {
        case FF1:
            return null;
        case oZ1:
            return B3.default.createElement(OA, {
                height: 1
            }, B3.default.createElement(T, {
                color: "error"
            }, "Context low · Run /compact to compact & continue"));
        case AH0:
            return B3.default.createElement(OA, {
                height: 1
            }, B3.default.createElement(T, {
                color: "error"
            }, "Credit balance too low · Add funds: https://console.anthropic.com/settings/billing"));
        case wk1:
            return B3.default.createElement(OA, {
                height: 1
            }, B3.default.createElement(T, {
                color: "error"
            }, wk1));
        case $k1:
            return B3.default.createElement(OA, {
                height: 1
            }, B3.default.createElement(T, {
                color: "error"
            }, $k1));
        case qk1:
            return B3.default.createElement(OA, {
                height: 1
            }, B3.default.createElement(T, {
                color: "error"
            }, qk1));
        case QH0:
        case be:
            return B3.default.createElement(OA, null, B3.default.createElement(v, {
                flexDirection: "column",
                gap: 1
            }, B3.default.createElement(T, {
                color: "error"
            }, "We are experiencing high demand for Opus 4."), B3.default.createElement(T, null, "To continue immediately, use /model to switch to", " ", JT(Ey()), " and continue coding.")));
        case RF1:
            return B3.default.createElement(OA, {
                height: 1
            }, B3.default.createElement(q01, null));
        default:
            if (A.startsWith(CJ)) return B3.default.createElement(OA, null, B3.default.createElement(T, {
                color: "error"
            }, A === CJ ? `${CJ}: Please wait a moment and try again.` : A));
            return B3.default.createElement(v, {
                alignItems: "flex-start",
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: B ? 1 : 0,
                width: "100%"
            }, B3.default.createElement(v, {
                flexDirection: "row"
            }, Q && B3.default.createElement(v, {
                minWidth: 2
            }, B3.default.createElement(T, {
                color: "text"
            }, FU)), B3.default.createElement(v, {
                flexDirection: "column",
                width: Z - 6
            }, B3.default.createElement(T, null, ZW(A, D)))))
    }
}
var TS = G1(z1(), 1);

function ob1({
    param: {
        text: A
    },
    addMargin: B
}) {
    let Q = l4(A, "bash-input");
    if (!Q) return null;
    return TS.createElement(v, {
        flexDirection: "column",
        marginTop: B ? 1 : 0,
        width: "100%"
    }, TS.createElement(v, null, TS.createElement(T, {
        color: "bashBorder"
    }, "!"), TS.createElement(T, {
        color: "secondaryText"
    }, " ", Q)))
}
var OF1 = G1(z1(), 1);

function hkB({
    addMargin: A,
    param: {
        text: B
    }
}) {
    let Q = l4(B, "command-message"),
        Z = l4(B, "command-args");
    if (!Q) return null;
    return OF1.createElement(v, {
        flexDirection: "column",
        marginTop: A ? 1 : 0,
        width: "100%"
    }, OF1.createElement(T, {
        color: "secondaryText"
    }, "> /", Q, " ", Z))
}
var S01 = G1(z1(), 1);

function gkB({
    addMargin: A,
    param: {
        text: B
    }
}) {
    let {
        columns: Q
    } = r9();
    if (!B) return R1(new Error("No content found in user prompt message")), null;
    return S01.default.createElement(v, {
        flexDirection: "row",
        marginTop: A ? 1 : 0,
        width: "100%"
    }, S01.default.createElement(v, {
        minWidth: 2,
        width: 2
    }, S01.default.createElement(T, {
        color: "secondaryText"
    }, ">")), S01.default.createElement(v, {
        flexDirection: "column",
        width: Q - 4
    }, S01.default.createElement(T, {
        color: "secondaryText",
        wrap: "wrap"
    }, B.trim())))
}
var GW = G1(z1(), 1);
var eK = G1(z1(), 1);
var ukB = G1(KK0(), 1);

function BX8() {
    return ukB.sample(["Got it.", "Good to know.", "Noted."])
}

function mkB({
    param: {
        text: A
    },
    addMargin: B
}) {
    let Q = l4(A, "user-memory-input");
    if (!Q) return null;
    return eK.createElement(v, {
        flexDirection: "column",
        marginTop: B ? 1 : 0,
        width: "100%"
    }, eK.createElement(v, null, eK.createElement(T, {
        color: "remember"
    }, "#"), eK.createElement(T, {
        color: "remember"
    }, " ", Q)), eK.createElement(OA, {
        height: 1
    }, eK.createElement(T, {
        dimColor: !0
    }, BX8())))
}
var hL0 = G1(z1(), 1);

function dkB({
    content: A,
    verbose: B
}) {
    let Q = l4(A, "bash-stdout") ?? "",
        Z = l4(A, "bash-stderr") ?? "";
    return hL0.createElement(Kd, {
        content: {
            stdout: Q,
            stderr: Z
        },
        verbose: !!B
    })
}
var AH = G1(z1(), 1);

function ckB({
    content: A
}) {
    let B = l4(A, "local-command-stdout"),
        Q = l4(A, "local-command-stderr");
    if (!B && !Q) return AH.createElement(OA, null, AH.createElement(T, {
        color: "secondaryText"
    }, rV));
    let Z = [];
    if (B?.trim()) Z.push(AH.createElement(OA, {
        key: "stdout"
    }, AH.createElement(T, {
        color: "text"
    }, B.trim())));
    if (Q?.trim()) Z.push(AH.createElement(OA, {
        key: "stderr"
    }, AH.createElement(T, {
        color: "error"
    }, Q.trim())));
    return Z
}

function tb1({
    addMargin: A,
    param: B,
    verbose: Q
}) {
    if (B.text.trim() === rV) return null;
    if (B.text.startsWith("<bash-stdout") || B.text.startsWith("<bash-stderr")) return GW.createElement(dkB, {
        content: B.text,
        verbose: Q
    });
    if (B.text.startsWith("<local-command-stdout") || B.text.startsWith("<local-command-stderr")) return GW.createElement(ckB, {
        content: B.text
    });
    if (B.text === E01 || B.text === IU) return GW.createElement(OA, {
        height: 1
    }, GW.createElement(q01, null));
    if (B.text.includes("<bash-input>")) return GW.createElement(ob1, {
        addMargin: A,
        param: B
    });
    if (B.text.includes("<command-message>")) return GW.createElement(hkB, {
        addMargin: A,
        param: B
    });
    if (B.text.includes("<user-memory-input>")) return GW.createElement(mkB, {
        addMargin: A,
        param: B
    });
    return GW.createElement(gkB, {
        addMargin: A,
        param: B
    })
}
var TF1 = G1(z1(), 1);

function lkB({
    param: {
        thinking: A
    },
    addMargin: B = !1
}) {
    let [Q] = fB();
    if (!A) return null;
    return TF1.default.createElement(v, {
        flexDirection: "column",
        gap: 1,
        marginTop: B ? 1 : 0,
        width: "100%"
    }, TF1.default.createElement(T, {
        color: "secondaryText",
        italic: !0
    }, "✻ Thinking…"), TF1.default.createElement(v, {
        paddingLeft: 2
    }, TF1.default.createElement(T, {
        color: "secondaryText",
        italic: !0
    }, ZW(A, Q))))
}
var gL0 = G1(z1(), 1);

function pkB({
    addMargin: A = !1
}) {
    return gL0.default.createElement(v, {
        marginTop: A ? 1 : 0
    }, gL0.default.createElement(T, {
        color: "secondaryText",
        italic: !0
    }, "✻ Thinking…"))
}
var FW = G1(z1(), 1);
import {
    relative as PF1,
    sep as ZX8
} from "path";
var eM = G1(z1(), 1);
import {
    relative as QX8
} from "path";

function ikB({
    attachment: A,
    verbose: B
}) {
    if (A.files.length === 0) return null;
    let Q = A.files.reduce((D, G) => D + G.diagnostics.length, 0),
        Z = A.files.length;
    if (B) return eM.default.createElement(v, {
        flexDirection: "column"
    }, A.files.map((D, G) => eM.default.createElement(eM.default.Fragment, {
        key: G
    }, eM.default.createElement(OA, null, eM.default.createElement(T, {
        color: "secondaryText",
        wrap: "wrap"
    }, e1.bold(QX8(t0(), D.uri.replace("file://", "").replace("_claude_fs_right:", ""))), " ", e1.dim(D.uri.startsWith("file://") ? "(file://)" : D.uri.startsWith("_claude_fs_right:") ? "(claude_fs_right)" : `(${D.uri.split(":")[0]})`), ":")), D.diagnostics.map((F, I) => eM.default.createElement(OA, {
        key: I
    }, eM.default.createElement(T, {
        color: "secondaryText",
        wrap: "wrap"
    }, "  ", c$.getSeveritySymbol(F.severity), " [Line ", F.range.start.line + 1, ":", F.range.start.character + 1, "] ", F.message, F.code ? ` [${F.code}]` : "", F.source ? ` (${F.source})` : ""))))));
    else return eM.default.createElement(OA, null, eM.default.createElement(T, {
        color: "secondaryText",
        wrap: "wrap"
    }, `Found ${e1.bold(Q)} new diagnostic ${Q===1?"issue":"issues"} in ${Z} ${Z===1?"file":"files"} (ctrl-r to expand)`))
}

function nkB({
    attachment: A,
    addMargin: B,
    verbose: Q
}) {
    switch (A.type) {
        case "new_directory":
            return FW.default.createElement(JU, {
                text: `Listed directory ${e1.bold(PF1(t0(),A.path)+ZX8)}`
            });
        case "new_file":
            if (A.content.type === "notebook") return FW.default.createElement(JU, {
                text: `Read ${e1.bold(PF1(t0(),A.filename))} (${A.content.file.cells.length} cells)`
            });
            return FW.default.createElement(JU, {
                text: `Read ${e1.bold(PF1(t0(),A.filename))} (${A.content.type==="text"?`${A.content.file.numLines}${A.truncated?"+":""} lines`:`${e1.bold(yY(A.content.file.originalSize))}`})`
            });
        case "edited_text_file":
        case "edited_image_file":
            return null;
        case "selected_lines_in_ide":
            return FW.default.createElement(JU, {
                text: `⧉ Selected ${e1.bold(A.lineEnd-A.lineStart+1)} lines from ${e1.bold(PF1(t0(),A.filename))} in ${A.ideName}`
            });
        case "nested_memory":
            return FW.default.createElement(JU, {
                text: e1.bold(PF1(t0(), A.path))
            });
        case "queued_command": {
            let Z = typeof A.prompt === "string" ? A.prompt : YF1(A.prompt) || "";
            return FW.default.createElement(tb1, {
                addMargin: B,
                param: {
                    text: Z,
                    type: "text"
                },
                verbose: Q
            })
        }
        case "opened_file_in_ide":
        case "ultramemory":
        case "plan_mode":
        case "output_style":
            return null;
        case "todo":
            if (A.context === "post-compact") return FW.default.createElement(JU, {
                text: `Todo list read (${A.itemCount} ${A.itemCount===1?"item":"items"})`
            });
            return null;
        case "diagnostics":
            return FW.default.createElement(ikB, {
                attachment: A,
                verbose: Q
            });
        case "mcp_resource":
            return FW.default.createElement(JU, {
                text: `Read MCP resource ${e1.bold(A.name)} from ${A.server}`
            });
        case "command_permissions":
            if (Q) return FW.default.createElement(JU, {
                text: `Allowed ${e1.bold(A.allowedTools.length)} tools for this command: ${A.allowedTools.join(", ")}`
            });
            return FW.default.createElement(JU, {
                text: `Allowed ${e1.bold(A.allowedTools.length)} tools for this command`
            });
        case "autocheckpointing":
            if (!Q) return null;
            switch (A.status) {
                case "uninitialized":
                    return null;
                case "initializing":
                    return FW.default.createElement(JU, {
                        text: "Checkpointing is still initializing…"
                    });
                case "error":
                    return FW.default.createElement(JU, {
                        text: "Checkpointing is unavailable due to an init error"
                    });
                case "initialized":
                    if (A.checkpointId) return FW.default.createElement(JU, {
                        text: `✓ Saved checkpoint ${e1.bold(`[${A.checkpointId}]`)}`
                    });
                    return null
            }
            return null;
        case "todo_reminder":
            return null;
        case "agent_mention":
            return null;
        case "background_task_status":
            return null
    }
}

function JU({
    text: A
}) {
    return FW.default.createElement(OA, null, FW.default.createElement(T, {
        color: "secondaryText",
        wrap: "wrap"
    }, A.trim()))
}
var TX = G1(z1(), 1);

function akB({
    message: A,
    addMargin: B,
    verbose: Q
}) {
    if (!Q && A.level === "info") return null;
    let Z = A.content;
    return TX.createElement(v, {
        flexDirection: "row",
        marginTop: B && !Q ? 1 : 0,
        width: "100%"
    }, TX.createElement(DX8, {
        content: Z,
        addMargin: B,
        dot: A.level !== "info",
        color: A.level === "warning" ? "warning" : void 0,
        dimColor: A.level !== "warning"
    }))
}