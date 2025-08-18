/* chunk:643 bytes:[14572660, 14590162) size:17502 source:unpacked-cli.js */
function HlB({
    serverNames: A,
    onDone: B
}) {
    function Q(D) {
        let G = GB() || {},
            F = G.enabledMcpjsonServers || [],
            I = G.disabledMcpjsonServers || [],
            [Y, W] = Cm1(A, (J) => D.includes(J));
        if (X1("tengu_mcp_multidialog_choice", {
                approved: Y.length,
                rejected: W.length
            }), Y.length > 0) {
            let J = [...new Set([...F, ...Y])];
            y6("localSettings", {
                enabledMcpjsonServers: J
            })
        }
        if (W.length > 0) {
            let J = [...new Set([...I, ...W])];
            y6("localSettings", {
                disabledMcpjsonServers: J
            })
        }
        B()
    }
    let Z = U2();
    return DA((D, G) => {
        if (G.escape) {
            let I = (GB() || {}).disabledMcpjsonServers || [],
                Y = [...new Set([...I, ...A])];
            y6("localSettings", {
                disabledMcpjsonServers: Y
            }), B();
            return
        }
    }), $C.default.createElement($C.default.Fragment, null, $C.default.createElement(v, {
        flexDirection: "column",
        gap: 1,
        padding: 1,
        borderStyle: "round",
        borderColor: "warning"
    }, $C.default.createElement(T, {
        bold: !0,
        color: "warning"
    }, A.length, " new MCP servers found in .mcp.json"), $C.default.createElement(T, null, "Select any you wish to enable."), $C.default.createElement(ng1, null), $C.default.createElement(BT1, {
        options: A.map((D) => ({
            label: D,
            value: D
        })),
        defaultValue: A,
        onSubmit: Q
    })), $C.default.createElement(v, {
        marginLeft: 3
    }, $C.default.createElement(T, {
        dimColor: !0
    }, Z.pending ? $C.default.createElement($C.default.Fragment, null, "Press ", Z.keyName, " again to exit") : $C.default.createElement($C.default.Fragment, null, "Space to select · Enter to confirm · Esc to reject all"))))
}
var CH = G1(z1(), 1);

function zlB({
    serverName: A,
    onDone: B
}) {
    function Q(D) {
        switch (X1("tengu_mcp_dialog_choice", {
                choice: D
            }), D) {
            case "yes":
            case "yes_all": {
                let F = (GB() || {}).enabledMcpjsonServers || [];
                if (!F.includes(A)) y6("localSettings", {
                    enabledMcpjsonServers: [...F, A]
                });
                if (D === "yes_all") y6("localSettings", {
                    enableAllProjectMcpServers: !0
                });
                B();
                break
            }
            case "no": {
                let F = (GB() || {}).disabledMcpjsonServers || [];
                if (!F.includes(A)) y6("localSettings", {
                    disabledMcpjsonServers: [...F, A]
                });
                B();
                break
            }
        }
    }
    let Z = U2();
    return DA((D, G) => {
        if (G.escape) {
            B();
            return
        }
    }), CH.default.createElement(CH.default.Fragment, null, CH.default.createElement(v, {
        flexDirection: "column",
        gap: 1,
        padding: 1,
        borderStyle: "round",
        borderColor: "warning"
    }, CH.default.createElement(T, {
        bold: !0,
        color: "warning"
    }, "New MCP server found in .mcp.json: ", A), CH.default.createElement(ng1, null), CH.default.createElement(uA, {
        options: [{
            label: "Use this and all future MCP servers in this project",
            value: "yes_all"
        }, {
            label: "Use this MCP server",
            value: "yes"
        }, {
            label: "Continue without using this MCP server",
            value: "no"
        }],
        onChange: (D) => Q(D),
        onCancel: () => Q("no")
    })), CH.default.createElement(v, {
        marginLeft: 3
    }, CH.default.createElement(T, {
        dimColor: !0
    }, Z.pending ? CH.default.createElement(CH.default.Fragment, null, "Press ", Z.keyName, " again to exit") : CH.default.createElement(CH.default.Fragment, null, "Enter to confirm · Esc to reject"))))
}
async function ElB() {
    let {
        servers: A
    } = ZG("project"), B = Object.keys(A).filter((Q) => wq1(Q) === "pending");
    if (B.length === 0) return;
    await new Promise((Q) => {
        let Z = () => {
            process.stdout.write("\x1B[2J\x1B[3J\x1B[H", () => {
                Q()
            })
        };
        if (B.length === 1 && B[0] !== void 0) {
            let D = S8(nI1.default.createElement(F7, null, nI1.default.createElement(zlB, {
                serverName: B[0],
                onDone: () => {
                    D.unmount?.(), Z()
                }
            })), {
                exitOnCtrlC: !1
            })
        } else {
            let D = S8(nI1.default.createElement(F7, null, nI1.default.createElement(HlB, {
                serverNames: B,
                onDone: () => {
                    D.unmount?.(), Z()
                }
            })), {
                exitOnCtrlC: !1
            })
        }
    })
}
var nI = G1(z1(), 1);

function UlB({
    onAccept: A
}) {
    nI.default.useEffect(() => {
        X1("tengu_bypass_permissions_mode_dialog_shown", {})
    }, []);

    function B(Z) {
        let D = H0();
        switch (Z) {
            case "accept": {
                X1("tengu_bypass_permissions_mode_dialog_accept", {}), gA({
                    ...D,
                    bypassPermissionsModeAccepted: !0
                }), A();
                break
            }
            case "decline": {
                O5(1);
                break
            }
        }
    }
    let Q = U2();
    return DA((Z, D) => {
        if (D.escape) {
            O5(0);
            return
        }
    }), nI.default.createElement(nI.default.Fragment, null, nI.default.createElement(v, {
        flexDirection: "column",
        gap: 1,
        padding: 1,
        borderStyle: "round",
        borderColor: "error"
    }, nI.default.createElement(T, {
        bold: !0,
        color: "error"
    }, "WARNING: Claude Code running in Bypass Permissions mode"), nI.default.createElement(v, {
        flexDirection: "column",
        gap: 1
    }, nI.default.createElement(T, null, "In Bypass Permissions mode, Claude Code will not ask for your approval before running potentially dangerous commands.", nI.default.createElement(S7, null), "This mode should only be used in a sandboxed container/VM that has restricted internet access and can easily be restored if damaged."), nI.default.createElement(T, null, "By proceeding, you accept all responsibility for actions taken while running in Bypass Permissions mode."), nI.default.createElement(C3, {
        url: "https://docs.anthropic.com/s/claude-code-security"
    })), nI.default.createElement(uA, {
        options: [{
            label: "No, exit",
            value: "decline"
        }, {
            label: "Yes, I accept",
            value: "accept"
        }],
        onChange: (Z) => B(Z),
        onCancel: () => B("decline")
    })), nI.default.createElement(v, {
        marginLeft: 3
    }, nI.default.createElement(T, {
        dimColor: !0
    }, Q.pending ? nI.default.createElement(nI.default.Fragment, null, "Press ", Q.keyName, " again to exit") : nI.default.createElement(nI.default.Fragment, null, "Enter to confirm · Esc to exit"))))
}

function Gc({
    newState: A,
    oldState: B
}) {
    if (B !== null && A.mainLoopModel !== B.mainLoopModel && A.mainLoopModel === null) y6("userSettings", {
        model: void 0
    }), R21(null);
    if (B !== null && A.mainLoopModel !== B.mainLoopModel && A.mainLoopModel !== null) y6("userSettings", {
        model: A.mainLoopModel
    }), R21(A.mainLoopModel);
    if (A.maxRateLimitFallbackActive !== $l()) _k0(A.maxRateLimitFallbackActive);
    if (B !== null && A.todoFeatureEnabled !== B.todoFeatureEnabled && H0().todoFeatureEnabled !== A.todoFeatureEnabled) gA({
        ...H0(),
        todoFeatureEnabled: A.todoFeatureEnabled
    });
    if (B !== null && A.verbose !== B.verbose && H0().verbose !== A.verbose) gA({
        ...H0(),
        verbose: A.verbose
    });
    if (A.toolPermissionContext !== B?.toolPermissionContext) ug1(A.toolPermissionContext)
}

function wlB() {
    let A = H0();
    if (!A.apiKeyHelper) return;
    try {
        y6("userSettings", {
            apiKeyHelper: A.apiKeyHelper
        }), gA({
            ...H0(),
            apiKeyHelper: void 0
        }), X1("tengu_migrate_apikeyhelper_success", {})
    } catch {
        X1("tengu_migrate_apikeyhelper_error", {})
    }
}

function $lB() {
    let A = H0();
    if (!A.env || Object.keys(A.env).length === 0) return;
    try {
        let B = _Y("userSettings"),
            Q = B?.env || {},
            Z = {
                ...A.env,
                ...Q
            };
        y6("userSettings", {
            ...B,
            env: Z
        }), gA({
            ...H0(),
            env: {}
        }), X1("tengu_migrate_globalconfig_env_success", {
            numEnvVars: Object.keys(A.env).length
        })
    } catch {
        X1("tengu_migrate_globalconfig_env_error", {})
    }
}
var aI1 = G1(z1(), 1);
async function qlB() {
    if (!(await MY("force_local_installation_migration") && !Mv() && !print && !IQ(!1) && !0 && !rd())) return;
    console.log(e1.yellow("⚠️ Migrating Claude CLI to local installation...")), console.log("This improves auto-updates and removes dependency on global npm permissions."), console.log("Your existing configuration and history will be preserved.");
    try {
        X1("tengu_forced_migration_start", {
            gateControlled: !0
        }), await new Promise((B) => {
            let {
                waitUntilExit: Q
            } = S8(aI1.createElement(F7, null, aI1.createElement(KA1, null)));
            Q().then(() => {
                B()
            })
        }), X1("tengu_forced_migration_success", {
            gateControlled: !0
        }), console.log(e1.green("✅ Migration complete!")), console.log("Please restart Claude CLI to use the new installation."), process.exit(0)
    } catch (B) {
        let Q = B instanceof Error ? B : new Error(String(B));
        R1(Q), X1("tengu_forced_migration_failure", {
            gateControlled: !0
        }), console.log(e1.red("⚠️ Migration encountered an error, continuing with global installation."))
    }
}

function NlB() {
    let A = UQ(),
        B = A.enableAllProjectMcpServers !== void 0,
        Q = A.enabledMcpjsonServers && A.enabledMcpjsonServers.length > 0,
        Z = A.disabledMcpjsonServers && A.disabledMcpjsonServers.length > 0;
    if (!B && !Q && !Z) return;
    try {
        let D = _Y("localSettings") || {},
            G = {},
            F = [];
        if (B && D.enableAllProjectMcpServers === void 0) G.enableAllProjectMcpServers = A.enableAllProjectMcpServers, F.push("enableAllProjectMcpServers");
        else if (B) F.push("enableAllProjectMcpServers");
        if (Q && A.enabledMcpjsonServers) {
            let I = D.enabledMcpjsonServers || [];
            G.enabledMcpjsonServers = [...new Set([...I, ...A.enabledMcpjsonServers])], F.push("enabledMcpjsonServers")
        }
        if (Z && A.disabledMcpjsonServers) {
            let I = D.disabledMcpjsonServers || [];
            G.disabledMcpjsonServers = [...new Set([...I, ...A.disabledMcpjsonServers])], F.push("disabledMcpjsonServers")
        }
        if (Object.keys(G).length > 0) y6("localSettings", G);
        if (F.length > 0) {
            let I = UQ(),
                {
                    enableAllProjectMcpServers: Y,
                    enabledMcpjsonServers: W,
                    disabledMcpjsonServers: J,
                    ...X
                } = I;
            if (F.includes("enableAllProjectMcpServers") || F.includes("enabledMcpjsonServers") || F.includes("disabledMcpjsonServers")) r5(X)
        }
        X1("tengu_migrate_mcp_approval_fields_success", {
            migratedCount: F.length
        })
    } catch {
        X1("tengu_migrate_mcp_approval_fields_error", {})
    }
}
import {
    randomUUID as eO8
} from "crypto";
var X77 = yV.object({
        tool_name: yV.string().describe("The name of the tool requesting permission"),
        input: yV.record(yV.unknown()).describe("The input for the tool"),
        tool_use_id: yV.string().optional().describe("The unique tool use request ID")
    }),
    oO8 = yV.object({
        behavior: yV.literal("allow"),
        updatedInput: yV.record(yV.unknown())
    }),
    tO8 = yV.object({
        behavior: yV.literal("deny"),
        message: yV.string()
    }),
    ag1 = yV.union([oO8, tO8]);

function Fc(A, B) {
    let Q = {
        type: "permissionPromptTool",
        permissionPromptToolName: B,
        toolResult: A
    };
    switch (A.behavior) {
        case "allow":
            return {
                ...A, decisionReason: Q
            };
        case "deny":
            return {
                ...A, decisionReason: Q
            }
    }
}
class sI1 {
    input;
    structuredInput;
    pendingRequests = new Map;
    inputClosed = !1;
    constructor(A) {
        this.input = A;
        this.input = A, this.structuredInput = this.read()
    }
    async * read() {
        let A = "";
        for await (let B of this.input) {
            A += B;
            let Q;
            while ((Q = A.indexOf(`
`)) !== -1) {
                let Z = A.slice(0, Q);
                A = A.slice(Q + 1);
                let D = this.processLine(Z);
                if (D) yield D
            }
        }
        if (A) {
            let B = this.processLine(A);
            if (B) yield B
        }
        this.inputClosed = !0;
        for (let B of this.pendingRequests.values()) B.reject(new Error("Tool permission stream closed before response received"))
    }
    processLine(A) {
        try {
            let B = JSON.parse(A);
            if (B.type === "control_response") {
                let Q = this.pendingRequests.get(B.response.request_id);
                if (!Q) {
                    console.error(`No pending request for ID: ${B.response.request_id}`);
                    return
                }
                if (this.pendingRequests.delete(B.response.request_id), B.response.subtype === "error") {
                    Q.reject(new Error(B.response.error));
                    return
                }
                let Z = B.response.response;
                if (Q.schema) try {
                    Q.resolve(Q.schema.parse(Z))
                } catch (D) {
                    Q.reject(D)
                } else Q.resolve({});
                return
            }
            if (B.type !== "user" && B.type !== "control_request") FP0(`Error: Expected message type 'user' or 'control', got '${B.type}'`);
            if (B.type === "control_request") {
                if (!B.request) FP0("Error: Missing request on control_request");
                return B
            }
            if (B.message.role !== "user") FP0(`Error: Expected message role 'user', got '${B.message.role}'`);
            return B
        } catch (B) {
            console.error(`Error parsing streaming input line: ${A}: ${B}`), process.exit(1)
        }
    }
    write(A) {
        lD(JSON.stringify(A) + `
`)
    }
    createCanUseTool() {
        return async (A, B, Q, Z, D) => {
            let G = await iw(A, B, Q, Z, D);
            if (G.behavior === "allow" || G.behavior === "deny") return G;
            let F = eO8(),
                I = {
                    type: "control_request",
                    request_id: F,
                    request: {
                        subtype: "can_use_tool",
                        tool_name: A.name,
                        input: B
                    }
                };
            if (this.inputClosed) return Fc({
                behavior: "deny",
                message: "Tool permission stream closed before permission prompt could be sent"
            }, A.name);
            if (Q.abortController.signal.aborted) return Fc({
                behavior: "deny",
                message: "Tool permission request was aborted"
            }, A.name);
            this.write(I);
            let Y = () => {
                this.write({
                    type: "control_cancel_request",
                    request_id: F
                })
            };
            return Q.abortController.signal.addEventListener("abort", Y, {
                once: !0
            }), new Promise((W, J) => {
                this.pendingRequests.set(F, {
                    resolve: (X) => {
                        W(X)
                    },
                    reject: J,
                    schema: ag1
                })
            }).then((W) => {
                return Fc(W, A.name)
            }).catch((W) => {
                return Fc({
                    behavior: "deny",
                    message: String(W)
                }, A.name)
            }).finally(() => {
                Q.abortController.signal.removeEventListener("abort", Y), this.pendingRequests.delete(F)
            })
        }
    }
}

function FP0(A) {
    console.error(A), process.exit(1)
}
import {
    URL as ZT8
} from "url";
import {
    PassThrough as DT8
} from "stream";
F31();
var AT8 = 1000,
    LlB = 5,
    BT8 = 1000,
    QT8 = 30000;