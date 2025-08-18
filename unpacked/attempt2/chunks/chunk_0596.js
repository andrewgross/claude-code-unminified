/* chunk:596 bytes:[13739463, 13759294) size:19831 source:unpacked-cli.js */
function _X8(A) {
    return A.type === "result" && Array.isArray(A.data) && A.data[0]?.type === "text" && A.data[0].text === "FILE_SAVED" && typeof A.data[1].text === "string"
}
var IW = G1(z1(), 1);
import {
    basename as xX8
} from "path";

function YyB({
    onChange: A,
    options: B,
    input: Q,
    filePath: Z,
    ideName: D
}) {
    return IW.createElement(v, {
        flexDirection: "column",
        borderStyle: "round",
        borderColor: "permission",
        marginTop: 1,
        paddingLeft: 1,
        paddingRight: 1,
        paddingBottom: 1
    }, IW.createElement(v, {
        flexDirection: "column",
        padding: 1
    }, IW.createElement(T, {
        bold: !0,
        color: "permission"
    }, "Opened changes in ", D, " ⧉"), HD1() && IW.createElement(T, {
        dimColor: !0
    }, "Save file to continue…")), IW.createElement(v, {
        flexDirection: "column"
    }, IW.createElement(T, null, "Do you want to make this edit to", " ", IW.createElement(T, {
        bold: !0
    }, xX8(Z)), "?"), IW.createElement(uA, {
        options: B.map((G) => ({
            label: G.label,
            value: G.label
        })),
        onChange: (G) => {
            let F = B.find((I) => I.label === G);
            if (F) A(F.option, Q)
        },
        onCancel: () => A({
            type: "reject"
        }, Q)
    })))
}

function BR({
    toolUseConfirm: A,
    toolUseContext: B,
    onDone: Q,
    onReject: Z,
    setToolPermissionContext: D,
    title: G,
    question: F = "Do you want to proceed?",
    content: I,
    completionType: Y = "tool_use_single",
    languageName: W = "none",
    path: J,
    parseInput: X,
    getIDEDiffConfig: V
}) {
    let C = B.getToolPermissionContext();
    sv(A, {
        completion_type: Y,
        language_name: W
    });
    let K = GyB({
            filePath: J || "",
            completionType: Y,
            languageName: W,
            toolUseConfirm: A,
            toolPermissionContext: C,
            setToolPermissionContext: D,
            onDone: Q,
            onReject: Z,
            parseInput: X
        }),
        H = K.options,
        z = X(A.input),
        $ = V ? V(z) : null,
        L = $ ? {
            onChange: (j) => {
                K.onChange(j, z)
            },
            toolUseContext: B,
            filePath: $.filePath,
            edits: ($.edits || []).map((j) => ({
                old_string: j.old_string,
                new_string: j.new_string,
                replace_all: j.replace_all || !1
            })),
            editMode: $.editMode || "single"
        } : {
            onChange: () => {},
            toolUseContext: B,
            filePath: "",
            edits: [],
            editMode: "single"
        },
        {
            closeTabInIDE: N,
            showingDiffInIDE: R,
            ideName: O
        } = FyB(L),
        P = (j) => {
            j.type, N?.(), K.onChange(j, z)
        };
    if (R && $ && J) return Od.default.createElement(YyB, {
        onChange: (j) => P(j),
        options: H,
        filePath: J,
        input: z,
        ideName: O
    });
    return Od.default.createElement(v, {
        flexDirection: "column",
        borderStyle: "round",
        borderColor: "permission",
        marginTop: 1,
        paddingLeft: 1,
        paddingRight: 1,
        paddingBottom: 1
    }, Od.default.createElement(AR, {
        title: G
    }), I, Od.default.createElement(v, {
        flexDirection: "column"
    }, typeof F === "string" ? Od.default.createElement(T, null, F) : F, Od.default.createElement(uA, {
        options: H.map((j) => ({
            label: j.label,
            value: j.label
        })),
        onChange: (j) => {
            let f = H.find((k) => k.label === j);
            if (f) P(f.option)
        },
        onCancel: () => P({
            type: "reject"
        })
    })))
}

function Zf1(A, B, Q, Z) {
    return {
        filePath: A,
        edits: [{
            old_string: B,
            new_string: Q,
            replace_all: Z
        }],
        editMode: "single"
    }
}

function WyB(A, B) {
    return {
        filePath: A,
        edits: B,
        editMode: "multiple"
    }
}

function JyB(A) {
    let B = (Y) => {
            return FF.inputSchema.parse(Y)
        },
        Q = (Y) => Zf1(Y.file_path, Y.old_string, Y.new_string, Y.replace_all),
        Z = B(A.toolUseConfirm.input),
        {
            file_path: D,
            old_string: G,
            new_string: F,
            replace_all: I
        } = Z;
    return jF1.default.createElement(BR, {
        toolUseConfirm: A.toolUseConfirm,
        toolUseContext: A.toolUseContext,
        onDone: A.onDone,
        onReject: A.onReject,
        setToolPermissionContext: A.setToolPermissionContext,
        title: "Edit file",
        question: jF1.default.createElement(T, null, "Do you want to make this edit to", " ", jF1.default.createElement(T, {
            bold: !0
        }, vX8(D)), "?"),
        content: jF1.default.createElement(Bf1, {
            file_path: D,
            edits: [{
                old_string: G,
                new_string: F,
                replace_all: I || !1
            }],
            verbose: A.verbose
        }),
        path: D,
        completionType: "str_replace_single",
        languageName: B_(D),
        parseInput: B,
        getIDEDiffConfig: Q
    })
}
var kZ = G1(z1(), 1);
import * as XyB from "path";

function bX8(A) {
    switch (A.length) {
        case 0:
            return "";
        case 1:
            return e1.bold(A[0]);
        case 2:
            return e1.bold(A[0]) + " and " + e1.bold(A[1]);
        default:
            return e1.bold(A.slice(0, -1).join(", ")) + ", and " + e1.bold(A.slice(-1)[0])
    }
}

function fX8(A) {
    let B = bX8(A);
    if (B.length > 50) return "similar";
    else return B
}

function hX8(A) {
    return A.flatMap((B) => {
        if (!B.ruleContent) return [];
        return $N0(B.ruleContent) ?? B.ruleContent
    })
}

function VyB({
    toolUseConfirm: A,
    blockedPath: B
}) {
    let {
        permissionResult: Q
    } = A, Z = [], D = Q.behavior === "ask" ? Q.ruleSuggestions : void 0;
    if (D && D.length > 0) {
        let F = hX8(D);
        Z = [{
            label: `Yes, and don't ask again for ${fX8(F)} commands in ${e1.bold(_9())}`,
            value: "yes-dont-ask-again-prefix"
        }]
    }
    let G = [];
    if (B) {
        let F = jx(B),
            I = F.split("/").pop() || F;
        G = [{
            label: `Yes, and always allow access to ${e1.bold(I)}${XyB.sep} from this project`,
            value: "yes-allow-directory"
        }]
    }
    return [{
        label: "Yes",
        value: "yes"
    }, ...G, ...Z, {
        label: `No, and tell Claude what to do differently (${e1.bold.dim("esc")})`,
        value: "no"
    }]
}
var Q3 = G1(z1(), 1);

function gX8(A) {
    switch (A) {
        case "cliArg":
            return "CLI argument";
        case "command":
            return "command configuration";
        case "localSettings":
            return "local settings";
        case "projectSettings":
            return "project settings";
        case "policySettings":
            return "managed settings";
        case "userSettings":
            return "global settings";
        case "flagSettings":
            return "--settings flag"
    }
}

function CyB(A) {
    switch (A.type) {
        case "rule":
            return `${e1.bold(r8(A.rule.ruleValue))} rule from ${gX8(A.rule.source)}`;
        case "mode":
            return `${ys(A.mode)} mode`;
        case "other":
            return A.reason;
        case "permissionPromptTool":
            return `${e1.bold(A.permissionPromptToolName)} permission prompt tool`;
        case "hook":
            return A.reason ? `${e1.bold(A.hookName)} hook: ${A.reason}` : `${e1.bold(A.hookName)} hook`
    }
}

function uX8({
    title: A,
    decisionReason: B
}) {
    let [Q] = fB();

    function Z() {
        switch (B.type) {
            case "subcommandResults":
                return Q3.default.createElement(v, {
                    flexDirection: "column"
                }, Array.from(B.reasons.entries()).map(([D, G]) => {
                    let F = G.behavior === "allow" ? pB("success", Q)(s0.tick) : pB("error", Q)(s0.cross);
                    return Q3.default.createElement(v, {
                        flexDirection: "column",
                        key: D
                    }, Q3.default.createElement(T, null, F, " ", D), G.decisionReason !== void 0 && G.decisionReason.type !== "subcommandResults" && Q3.default.createElement(T, null, "  ", "⎿", "  ", CyB(G.decisionReason)), G.behavior === "ask" && G.ruleSuggestions && Q3.default.createElement(T, null, "  ", "⎿", "  ", "Suggested rules:", " ", G.ruleSuggestions.map((I) => e1.bold(r8(I))).join(", ")))
                }));
            default:
                return Q3.default.createElement(T, null, CyB(B))
        }
    }
    return Q3.default.createElement(v, {
        flexDirection: "column"
    }, A && Q3.default.createElement(T, null, A), Z())
}

function KyB({
    permissionResult: A
}) {
    let B = A.decisionReason,
        Q = "ruleSuggestions" in A ? A.ruleSuggestions : void 0,
        Z = 10;
    return Q3.default.createElement(v, {
        flexDirection: "column"
    }, Q3.default.createElement(v, {
        flexDirection: "row"
    }, Q3.default.createElement(v, {
        justifyContent: "flex-end",
        minWidth: 10
    }, Q3.default.createElement(T, {
        dimColor: !0
    }, "Behavior ")), Q3.default.createElement(T, null, A.behavior)), A.behavior !== "allow" && Q3.default.createElement(v, {
        flexDirection: "row"
    }, Q3.default.createElement(v, {
        justifyContent: "flex-end",
        minWidth: 10
    }, Q3.default.createElement(T, {
        dimColor: !0
    }, "Message ")), Q3.default.createElement(T, null, A.message)), Q3.default.createElement(v, {
        flexDirection: "row"
    }, Q3.default.createElement(v, {
        justifyContent: "flex-end",
        minWidth: 10
    }, Q3.default.createElement(T, {
        dimColor: !0
    }, "Reason ")), B === void 0 ? Q3.default.createElement(T, null, "undefined") : Q3.default.createElement(uX8, {
        decisionReason: B
    })), Q3.default.createElement(v, {
        flexDirection: "row"
    }, Q3.default.createElement(v, {
        flexDirection: "column",
        alignItems: "flex-end",
        minWidth: 10
    }, Q3.default.createElement(T, {
        dimColor: !0
    }, "Suggested "), Q3.default.createElement(T, {
        dimColor: !0
    }, "rules ")), Q === null || Q === void 0 || Q.length === 0 ? Q3.default.createElement(T, null, "None") : Q.map((D, G) => Q3.default.createElement(T, {
        key: G
    }, s0.bullet, " ", r8(D)))))
}
var Df1 = G1(z1(), 1);

function mX8(A, B) {
    if (!A) return null;
    switch (A.type) {
        case "rule":
            return {
                reasonString: `Permission rule ${e1.bold(r8(A.rule.ruleValue))} requires confirmation for this ${B}.`, configString: "/permissions to update rules"
            };
        case "hook": {
            let Q = A.reason ? `:
${A.reason}` : ".";
            return {
                reasonString: `Hook ${e1.bold(A.hookName)} requires confirmation for this ${B}${Q}`,
                configString: "/hooks to update"
            }
        }
        default:
            return null
    }
}

function rv({
    permissionResult: A,
    toolType: B
}) {
    let Q = mX8(A?.decisionReason, B);
    if (!Q) return null;
    return Df1.default.createElement(v, {
        marginBottom: 1,
        flexDirection: "column"
    }, Df1.default.createElement(T, null, Q.reasonString), Df1.default.createElement(T, {
        dimColor: !0
    }, Q.configString))
}

function HyB({
    setToolPermissionContext: A,
    toolUseConfirm: B,
    onDone: Q,
    onReject: Z
}) {
    let [D] = fB(), {
        command: G,
        description: F
    } = VQ.inputSchema.parse(B.input), [I, Y] = kZ.useState(!1), W = kZ.useMemo(() => ({
        completion_type: "tool_use_single",
        language_name: "none"
    }), []);
    sv(B, W);
    let J = kZ.useMemo(() => VyB({
        toolUseConfirm: B,
        blockedPath: B.permissionResult.behavior === "ask" ? B.permissionResult.blockedPath : void 0
    }), [B]);
    DA((V, C) => {
        if (C.ctrl && V === "d") Y((K) => !K)
    });

    function X(V) {
        switch (V) {
            case "yes":
                dP("tool_use_single", B, "accept"), B.onAllow("temporary", B.input), Q();
                break;
            case "yes-allow-directory": {
                dP("tool_use_single", B, "accept");
                let C = B.permissionResult.behavior === "ask" ? B.permissionResult.blockedPath : void 0;
                if (C) q5B(C, B.toolUseContext.getToolPermissionContext(), A, !0), B.onAllow("permanent", B.input);
                else B.onAllow("temporary", B.input);
                Q();
                break
            }
            case "yes-dont-ask-again-prefix": {
                dP("tool_use_single", B, "accept");
                let C = B.permissionResult.behavior === "ask" ? B.permissionResult.ruleSuggestions : void 0;
                if (C) n61({
                    ruleValues: C,
                    ruleBehavior: "allow",
                    destination: "localSettings",
                    initialContext: B.toolUseContext.getToolPermissionContext(),
                    setToolPermissionContext: A
                }).then(() => {
                    B.onAllow("permanent", B.input), Q()
                });
                else B.onAllow("temporary", B.input), Q();
                break
            }
            case "no":
                dP("tool_use_single", B, "reject"), B.onReject(), Z(), Q();
                break
        }
    }
    return kZ.default.createElement(v, {
        flexDirection: "column",
        borderStyle: "round",
        borderColor: "permission",
        marginTop: 1,
        paddingLeft: 1,
        paddingRight: 1
    }, kZ.default.createElement(AR, {
        title: "Bash command"
    }), kZ.default.createElement(v, {
        flexDirection: "column",
        paddingX: 2,
        paddingY: 1
    }, kZ.default.createElement(T, null, VQ.renderToolUseMessage({
        command: G,
        description: F
    }, {
        theme: D,
        verbose: !0
    })), kZ.default.createElement(T, {
        color: "secondaryText"
    }, B.description)), I ? kZ.default.createElement(kZ.default.Fragment, null, kZ.default.createElement(KyB, {
        permissionResult: B.permissionResult
    }), B.toolUseContext.options.debug && kZ.default.createElement(v, {
        justifyContent: "flex-end",
        marginTop: 1
    }, kZ.default.createElement(T, {
        dimColor: !0
    }, "Ctrl-D to hide debug info"))) : kZ.default.createElement(kZ.default.Fragment, null, kZ.default.createElement(v, {
        flexDirection: "column"
    }, kZ.default.createElement(rv, {
        permissionResult: B.permissionResult,
        toolType: "command"
    }), kZ.default.createElement(T, null, "Do you want to proceed?"), kZ.default.createElement(uA, {
        options: J,
        onChange: X,
        onCancel: () => X("no")
    })), B.toolUseContext.options.debug && kZ.default.createElement(v, {
        justifyContent: "flex-end"
    }, kZ.default.createElement(T, {
        dimColor: !0
    }, "Ctrl-D to show debug info"))))
}
var XC = G1(z1(), 1);

function Gf1({
    setToolPermissionContext: A,
    toolUseConfirm: B,
    onDone: Q,
    onReject: Z,
    verbose: D
}) {
    let [G] = fB(), F = B.tool.userFacingName(B.input), I = F.endsWith(" (MCP)") ? F.slice(0, -6) : F, Y = XC.useMemo(() => ({
        completion_type: "tool_use_single",
        language_name: "none"
    }), []);
    sv(B, Y);
    let W = (V) => {
            switch (V) {
                case "yes":
                    PM({
                        completion_type: "tool_use_single",
                        event: "accept",
                        metadata: {
                            language_name: "none",
                            message_id: B.assistantMessage.message.id,
                            platform: sA.platform
                        }
                    }), B.onAllow("temporary", B.input), Q();
                    break;
                case "yes-dont-ask-again":
                    PM({
                        completion_type: "tool_use_single",
                        event: "accept",
                        metadata: {
                            language_name: "none",
                            message_id: B.assistantMessage.message.id,
                            platform: sA.platform
                        }
                    }), Nq1({
                        rule: {
                            ruleBehavior: "allow",
                            ruleValue: {
                                toolName: B.tool.name
                            },
                            source: "localSettings"
                        },
                        initialContext: B.toolUseContext.getToolPermissionContext(),
                        setToolPermissionContext: A
                    }).then(() => {
                        B.onAllow("permanent", B.input), Q()
                    });
                    break;
                case "no":
                    PM({
                        completion_type: "tool_use_single",
                        event: "reject",
                        metadata: {
                            language_name: "none",
                            message_id: B.assistantMessage.message.id,
                            platform: sA.platform
                        }
                    }), B.onReject(), Z(), Q();
                    break
            }
        },
        J = _9(),
        X = XC.useMemo(() => {
            return [{
                label: "Yes",
                value: "yes"
            }, {
                label: `Yes, and don't ask again for ${e1.bold(I)} commands in ${e1.bold(J)}`,
                value: "yes-dont-ask-again"
            }, {
                label: `No, and tell Claude what to do differently (${e1.bold.dim("esc")})`,
                value: "no"
            }]
        }, [I, J]);
    return XC.default.createElement(v, {
        flexDirection: "column",
        borderStyle: "round",
        borderColor: "permission",
        marginTop: 1,
        paddingLeft: 1,
        paddingRight: 1,
        paddingBottom: 1
    }, XC.default.createElement(AR, {
        title: "Tool use"
    }), XC.default.createElement(v, {
        flexDirection: "column",
        paddingX: 2,
        paddingY: 1
    }, XC.default.createElement(T, null, I, "(", B.tool.renderToolUseMessage(B.input, {
        theme: G,
        verbose: D
    }), ")", F.endsWith(" (MCP)") ? XC.default.createElement(T, {
        color: "secondaryText"
    }, " (MCP)") : ""), XC.default.createElement(T, {
        color: "secondaryText"
    }, B.description)), XC.default.createElement(v, {
        flexDirection: "column"
    }, XC.default.createElement(rv, {
        permissionResult: B.permissionResult,
        toolType: "tool"
    }), XC.default.createElement(T, null, "Do you want to proceed?"), XC.default.createElement(uA, {
        options: X,
        onChange: W,
        onCancel: () => W("no")
    })))
}
var mL0 = G1(z1(), 1);
var zyB = 6000;

function EyB() {
    if (H0().messageIdleNotifThresholdMs !== fV.messageIdleNotifThresholdMs) return 0;
    return zyB
}

function dX8() {
    return Date.now() - mW1()
}

function cX8(A) {
    return dX8() < A
}

function lX8(A) {
    return !cX8(A)
}
var pX8 = EA(() => process.stdin.on("data", L21));