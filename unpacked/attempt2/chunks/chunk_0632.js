/* chunk:632 bytes:[14393480, 14413525) size:20045 source:unpacked-cli.js */
function GdB({
    content: A,
    defaultFilename: B,
    onDone: Q
}) {
    let [, Z] = p3.useState(null), [D, G] = p3.useState(B), [F, I] = p3.useState(B.length), [Y, W] = p3.useState(!1), J = U2();
    return DA((K, H) => {
        if (H.escape)
            if (Y) W(!1), Z(null);
            else Q({
                success: !1,
                message: "Export cancelled"
            })
    }), p3.default.createElement(v, {
        width: "100%",
        flexDirection: "column"
    }, p3.default.createElement(v, {
        borderStyle: "round",
        borderColor: "permission",
        flexDirection: "column",
        padding: 1,
        width: "100%"
    }, p3.default.createElement(v, null, p3.default.createElement(T, {
        color: "permission",
        bold: !0
    }, "Export Conversation")), !Y ? p3.default.createElement(p3.default.Fragment, null, p3.default.createElement(v, {
        marginTop: 1
    }, p3.default.createElement(T, {
        dimColor: !0
    }, "Select export method:")), p3.default.createElement(v, {
        flexDirection: "column",
        marginTop: 1
    }, p3.default.createElement(uA, {
        options: [{
            label: "Copy to clipboard",
            value: "clipboard",
            description: "Copy the conversation to your system clipboard"
        }, {
            label: "Save to file",
            value: "file",
            description: "Save the conversation to a file in the current directory"
        }],
        onChange: (K) => {
            if (K === "clipboard")
                if (ZdB(A)) Q({
                    success: !0,
                    message: "Conversation copied to clipboard"
                });
                else Q({
                    success: !1,
                    message: DdB()
                });
            else if (K === "file") Z("file"), W(!0)
        },
        onCancel: () => Q({
            success: !1,
            message: "Export cancelled"
        })
    }))) : p3.default.createElement(v, {
        flexDirection: "column",
        marginTop: 1
    }, p3.default.createElement(T, null, "Enter filename:"), p3.default.createElement(v, {
        flexDirection: "row",
        gap: 1,
        marginTop: 1
    }, p3.default.createElement(T, null, ">"), p3.default.createElement(y8, {
        value: D,
        onChange: G,
        onSubmit: () => {
            let K = D.endsWith(".txt") ? D : D.replace(/\.[^.]+$/, "") + ".txt",
                H = PM8(t0(), K);
            try {
                j1().writeFileSync(H, A, {
                    encoding: "utf-8",
                    flush: !0
                }), Q({
                    success: !0,
                    message: `Conversation exported to: ${K}`
                })
            } catch (z) {
                Q({
                    success: !1,
                    message: `Failed to export conversation: ${z instanceof Error?z.message:"Unknown error"}`
                })
            }
        },
        focus: !0,
        showCursor: !0,
        columns: process.stdout.columns || 80,
        cursorOffset: F,
        onChangeCursorOffset: I
    })))), p3.default.createElement(v, {
        marginLeft: 2
    }, Y ? p3.default.createElement(T, {
        dimColor: !0
    }, "Enter to save · Esc to go back") : p3.default.createElement(p3.default.Fragment, null, J.pending ? p3.default.createElement(T, {
        dimColor: !0
    }, "Press ", J.keyName, " again to exit") : p3.default.createElement(T, {
        dimColor: !0
    }, "Esc to cancel"))))
}

function SM8(A) {
    let B = A.getFullYear(),
        Q = String(A.getMonth() + 1).padStart(2, "0"),
        Z = String(A.getDate()).padStart(2, "0"),
        D = String(A.getHours()).padStart(2, "0"),
        G = String(A.getMinutes()).padStart(2, "0"),
        F = String(A.getSeconds()).padStart(2, "0");
    return `${B}-${Q}-${Z}-${D}${G}${F}`
}

function jM8(A) {
    let B = A.find((D) => D.type === "user");
    if (!B || B.type !== "user") return "";
    let Q = B.message?.content,
        Z = "";
    if (typeof Q === "string") Z = Q.trim();
    else if (Array.isArray(Q)) {
        let D = Q.find((G) => G.type === "text");
        if (D && "text" in D) Z = D.text.trim()
    }
    if (Z = Z.split(`
`)[0] || "", Z.length > 50) Z = Z.substring(0, 50) + "...";
    return Z
}

function kM8(A) {
    return A.toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "")
}
async function yM8(A) {
    let B = A.options.tools || [],
        Z = await sO0(xI1.default.createElement(() => xI1.default.createElement(F7, null, xI1.default.createElement(_I1, {
            messages: A.messages,
            normalizedMessageHistory: [],
            tools: B,
            verbose: !1,
            toolJSX: null,
            toolUseConfirmQueue: [],
            inProgressToolUseIDs: new Set,
            isMessageSelectorVisible: !1,
            conversationId: "export",
            screen: "prompt",
            screenToggleId: 0,
            streamingToolUses: [],
            showAllInTranscript: !0
        })), null));
    return eG(Z)
}
var _M8 = {
        type: "local-jsx",
        name: "export",
        description: "Export the current conversation to a file or clipboard",
        isEnabled: () => !0,
        isHidden: !1,
        argumentHint: "[filename]",
        async call(A, B, Q) {
            let Z;
            if (!Q.trim()) {
                let G = jM8(B.messages),
                    F = SM8(new Date);
                if (G) {
                    let I = kM8(G);
                    Z = I ? `${F.substring(0,10)}-${I}.txt` : `conversation-${F}.txt`
                } else Z = `conversation-${F}.txt`
            } else Z = Q.trim();
            let D = await yM8(B);
            return xI1.default.createElement(GdB, {
                content: D,
                defaultFilename: Z,
                onDone: (G) => {
                    A(G.message)
                }
            })
        },
        userFacingName() {
            return "export"
        }
    },
    FdB = _M8;
var iS = G1(z1(), 1);
var Og1 = ["help", "-h", "--help"],
    Tg1 = ["list", "show", "display", "current", "view", "get", "check", "describe", "print", "version", "about", "status", "?"];

function xM8({
    onDone: A
}) {
    let [{
        mainLoopModel: B
    }, Q] = tQ();
    return DA((Z, D) => {
        if (D.escape) {
            X1("tengu_model_command_menu", {
                action: "cancel"
            });
            let G = B ?? Jg().label;
            A(`Kept model as ${e1.bold(G)}`);
            return
        }
    }), iS.createElement(Ah1, {
        initial: B,
        onSelect: (Z) => {
            X1("tengu_model_command_menu", {
                action: Z,
                from_model: B,
                to_model: Z
            }), Q((D) => ({
                ...D,
                mainLoopModel: Z
            })), A(`Set model to ${e1.bold(Vg(Z))}`)
        }
    })
}

function vM8({
    args: A,
    onDone: B
}) {
    let [Q, Z] = tQ(), D = A === "default" ? null : A;
    if (KB() && !aG() && D !== null && D.toLowerCase().includes("opus")) return B("Invalid model. Claude Pro users are not currently able to use Opus in Claude Code. The current model is now Sonnet."), null;
    return setTimeout(() => {
        Z((G) => ({
            ...G,
            mainLoopModel: D
        })), B(`Set model to ${e1.bold(Vg(D))}`)
    }, 0), null
}

function bM8({
    onDone: A
}) {
    let [{
        mainLoopModel: B
    }] = tQ(), Q = B ?? Jg().label;
    return A(`Current model: ${Q}`), null
}
var IdB = {
    type: "local-jsx",
    name: "model",
    userFacingName() {
        return "model"
    },
    description: "Set the AI model for Claude Code",
    isEnabled: () => !0,
    isHidden: !1,
    argumentHint: "[model]",
    async call(A, B, Q) {
        if (Q = Q?.trim() || "", Tg1.includes(Q)) return X1("tengu_model_command_inline_help", {
            args: Q
        }), iS.createElement(bM8, {
            onDone: A
        });
        if (Og1.includes(Q)) {
            A("Run /model to open the model selection menu, or /model [modelName] to set the model.");
            return
        }
        if (Q) return X1("tengu_model_command_inline", {
            args: Q
        }), iS.createElement(vM8, {
            args: Q,
            onDone: A
        });
        return iS.createElement(xM8, {
            onDone: A
        })
    }
};
var nS = G1(z1(), 1);

function fM8({
    onDone: A
}) {
    let Q = GB().outputStyle ?? sV;
    return DA((Z, D) => {
        if (D.escape) {
            X1("tengu_output_style_command_menu", {
                action: "cancel"
            }), A(`Kept output style as ${e1.bold(Q)}`);
            return
        }
    }), nS.createElement(Qh1, {
        initialStyle: Q,
        onComplete: (Z) => {
            X1("tengu_output_style_command_menu", {
                action: Z,
                from_style: Q,
                to_style: Z
            }), y6("localSettings", {
                outputStyle: Z
            }), A(`Set output style to ${e1.bold(Z)}`)
        },
        onCancel: () => {
            A(`Kept output style as ${e1.bold(Q)}`)
        }
    })
}

function hM8(A, B) {
    if (A in B) return A;
    let Q = A.toLowerCase();
    for (let Z of Object.keys(B))
        if (Z.toLowerCase() === Q) return Z;
    return null
}

function gM8({
    args: A,
    onDone: B
}) {
    return UZ1().then((Q) => {
        let Z = hM8(A, Q);
        if (!Z) {
            B(`Invalid output style: ${A}`);
            return
        }
        y6("localSettings", {
            outputStyle: Z
        }), B(`Set output style to ${e1.bold(Z)}`)
    }), null
}

function uM8({
    onDone: A
}) {
    let B = GB();
    return A(`Current output style: ${B.outputStyle??sV}`), null
}
var YdB = {
    type: "local-jsx",
    name: "output-style",
    userFacingName() {
        return "output-style"
    },
    description: "Set the output style directly or from a selection menu",
    isEnabled: () => !0,
    isHidden: !1,
    argumentHint: "[style]",
    async call(A, B, Q) {
        if (Q = Q?.trim() || "", Tg1.includes(Q)) return X1("tengu_output_style_command_inline_help", {
            args: Q
        }), nS.createElement(uM8, {
            onDone: A
        });
        if (Og1.includes(Q)) {
            A("Run /output-style to open the output style selection menu, or /output-style [styleName] to set the output style.");
            return
        }
        if (Q) return X1("tengu_output_style_command_inline", {
            args: Q
        }), nS.createElement(gM8, {
            args: Q,
            onDone: A
        });
        return nS.createElement(fM8, {
            onDone: A
        })
    }
};
var mM8 = {
        type: "prompt",
        description: "Create a custom output style",
        aliases: [],
        isEnabled: () => !0,
        isHidden: !1,
        name: "output-style:new",
        source: "builtin",
        progressMessage: "creating output style",
        allowedTools: [k7, `${QG}(~/.claude/output-styles/*.md)`, `${wv}(~/.claude/output-styles/*.md)`, `${eJ}(~/.claude/output-styles/*.md)`],
        async getPromptForCommand(A) {
            let B = A.trim() || "Create a new output style based on user preferences";
            return [{
                type: "text",
                text: `Create a ${k7} with subagent_type "output-style-setup" and the prompt "${B}"`
            }]
        },
        userFacingName() {
            return "output-style:new"
        }
    },
    WdB = mM8;
var vI1 = G1(z1(), 1);
var dM8 = {
        type: "local-jsx",
        name: "upgrade",
        description: "Upgrade to Max for higher rate limits and more Opus",
        isEnabled: () => !process.env.DISABLE_UPGRADE_COMMAND && !So(),
        isHidden: !1,
        async call(A, B) {
            try {
                if (KB()) {
                    let Z = CZ();
                    if (Z?.accessToken) {
                        let D = await Y81(Z.accessToken);
                        if (D?.organization?.organization_type === "claude_max" && D?.organization?.rate_limit_tier === "default_claude_max_20x") return setTimeout(() => {
                            A("You are already on the highest Max subscription plan. For additional usage, run /login to switch to an API usage-billed account.")
                        }, 0), null
                    }
                }
                return await ZU("https://claude.ai/upgrade/max"), vI1.createElement(rO0, {
                    startingMessage: "Starting new login following /upgrade. Exit with Ctrl-C to use existing account.",
                    onDone: (Z, D) => {
                        $I1(vI1.createElement(VA1, {
                            model: D
                        })), B.onChangeAPIKey(), A(Z ? "Login successful" : "Login interrupted")
                    }
                })
            } catch (Q) {
                R1(Q), setTimeout(() => {
                    A("Failed to open browser. Please visit https://claude.ai/upgrade/max to upgrade.")
                }, 0)
            }
            return null
        },
        userFacingName() {
            return "upgrade"
        }
    },
    JdB = dM8;
var cM8 = {
        type: "prompt",
        description: "Set up Claude Code's status line UI",
        aliases: [],
        isEnabled: () => !0,
        isHidden: !1,
        name: "statusline",
        progressMessage: "setting up statusLine",
        allowedTools: ["Task", "Read(~/**)", "Edit(~/.claude/settings.json)"],
        source: "builtin",
        async getPromptForCommand(A) {
            return [{
                type: "text",
                text: `Create a Task with subagent_type "statusline-setup" and the prompt "${A.trim()||"Configure my statusLine from my shell PS1 configuration"}"`
            }]
        },
        userFacingName() {
            return "statusline"
        }
    },
    XdB = cM8;
var VdB = EA(() => [N5B, pmB, _bB, hbB, dbB, cbB, abB, Rg1, TmB, $gB, RgB, OgB, FuB, VuB, UgB, YuB, IdB, YdB, WdB, CuB, EuB, UuB, PuB, XdB, jbB, Ag1, yuB, TM, JdB, buB, iuB, OmB, FdB, ...!So() ? [ygB, ugB()] : [], juB]),
    qmB = EA(() => new Set(VdB().map((A) => A.name))),
    Pg1 = EA(async () => {
        return [...await rmB(), ...VdB()].filter((B) => B.isEnabled())
    });
var Fg1 = EA(async () => {
    return (await Pg1()).filter((B) => B.type === "prompt")
});

function Hg1(A, B) {
    return B.some((Q) => Q.userFacingName() === A || Q.aliases?.includes(A))
}

function zg1(A, B) {
    let Q = B.find((Z) => Z.userFacingName() === A || Z.aliases?.includes(A));
    if (!Q) throw ReferenceError(`Command ${A} not found. Available commands: ${B.map((Z)=>{let D=Z.userFacingName();return Z.aliases?`${D} (aliases: ${Z.aliases.join(", ")})`:D}).sort((Z,D)=>Z.localeCompare(D)).join(", ")}`);
    return Q
}
var lM8 = /[:_-]/g;

function PA1(A) {
    return A.startsWith("/")
}

function pM8(A) {
    if (!PA1(A)) return !1;
    if (!A.includes(" ")) return !1;
    if (A.endsWith(" ")) return !1;
    return !0
}

function iM8(A) {
    return `/${A} `
}

function CdB(A) {
    let B = A.userFacingName(),
        Q = A.aliases && A.aliases.length > 0 ? ` (${A.aliases.join(", ")})` : "";
    return {
        id: B,
        displayText: `/${B}${Q}`,
        description: A.description + (A.type === "prompt" && A.argNames?.length ? ` (arguments: ${A.argNames.join(", ")})` : ""),
        metadata: A
    }
}

function KdB(A, B) {
    if (!PA1(A)) return [];
    if (pM8(A)) return [];
    let Q = A.slice(1).toLowerCase();
    if (Q.trim() === "") {
        let I = B.filter((C) => !C.isHidden),
            Y = [],
            W = [],
            J = [],
            X = [];
        I.forEach((C) => {
            if (C.type === "prompt" && C.source === "localSettings") Y.push(C);
            else if (C.type === "prompt" && C.source === "projectSettings") W.push(C);
            else if (C.type === "prompt" && C.source === "policySettings") J.push(C);
            else X.push(C)
        });
        let V = (C, K) => C.userFacingName().localeCompare(K.userFacingName());
        return Y.sort(V), W.sort(V), J.sort(V), X.sort(V), [...Y, ...W, ...J, ...X].map(CdB)
    }
    let Z = B.filter((I) => !I.isHidden).flatMap((I) => {
            let Y = I.userFacingName(),
                W = [];
            if (W.push({
                    nameKey: Y,
                    commandName: I.userFacingName(),
                    command: I
                }), Y.split(lM8).filter(Boolean).forEach((X) => {
                    W.push({
                        partKey: X,
                        commandName: I.userFacingName(),
                        command: I
                    })
                }), I.aliases) I.aliases.forEach((X) => {
                W.push({
                    aliasKey: X,
                    commandName: I.userFacingName(),
                    command: I
                })
            });
            return I.description.split(" ").forEach((X) => {
                let V = X.toLowerCase().replace(/[^a-z0-9]/g, "");
                if (V) W.push({
                    descriptionKey: V,
                    commandName: I.userFacingName(),
                    command: I
                })
            }), W
        }),
        G = new HU(Z, {
            includeScore: !0,
            threshold: 0.3,
            location: 0,
            distance: 100,
            keys: [{
                name: "nameKey",
                weight: 2
            }, {
                name: "partKey",
                weight: 2
            }, {
                name: "aliasKey",
                weight: 2
            }, {
                name: "descriptionKey",
                weight: 0.5
            }]
        }).search(Q),
        F = new Map;
    return G.forEach((I) => {
        let {
            commandName: Y,
            command: W
        } = I.item;
        if (!F.has(Y)) F.set(Y, W)
    }), Array.from(F.entries()).map(([I, Y]) => CdB(Y))
}

function kT0(A, B, Q, Z, D, G) {
    let F = typeof A === "string" ? A : A.id,
        I = iM8(F);
    if (Z(I), D(I.length), B) {
        let Y = typeof A === "string" ? zg1(F, Q) : A.metadata;
        if (Y.type !== "prompt" || (Y.argNames ?? []).length === 0) G(I, !0)
    }
}
import {
    homedir as HdB
} from "os";
import {
    dirname as nM8,
    basename as aM8,
    isAbsolute as sM8,
    join as EdB,
    resolve as rM8,
    sep as oM8
} from "path";
var tM8 = 500,
    eM8 = 300000,
    zdB = new jw({
        max: tM8,
        ttl: eM8
    });

function AR8(A, B = t0()) {
    if (!A) return B;
    if (A === "~") return HdB();
    if (A.startsWith("~/")) return EdB(HdB(), A.substring(2));
    if (sM8(A)) return A;
    return rM8(B, A)
}

function BR8(A, B) {
    if (!A) return {
        directory: B || t0(),
        prefix: ""
    };
    let Q = AR8(A, B);
    if (A.endsWith("/") || A.endsWith(oM8)) return {
        directory: Q,
        prefix: ""
    };
    let Z = nM8(Q),
        D = aM8(A);
    return {
        directory: Z,
        prefix: D
    }
}

function QR8(A) {
    let B = zdB.get(A);
    if (B) return B;
    try {
        let D = j1().readdirSync(A).filter((G) => G.isDirectory() && !G.name.startsWith(".")).map((G) => ({
            name: G.name,
            path: EdB(A, G.name),
            type: "directory"
        })).slice(0, 100);
        return zdB.set(A, D), D
    } catch (Q) {
        return R1(Q instanceof Error ? Q : new Error(String(Q))), []
    }
}
async function UdB(A, B = {}) {
    let {
        basePath: Q = t0(),
        maxResults: Z = 10
    } = B, {
        directory: D,
        prefix: G
    } = BR8(A, Q), F = QR8(D), I = G.toLowerCase();
    return F.filter((W) => W.name.toLowerCase().startsWith(I)).slice(0, Z).map((W) => ({
        id: W.path,
        displayText: W.name + "/",
        description: "directory",
        type: "directory"
    }))
}
import * as pI from "path";