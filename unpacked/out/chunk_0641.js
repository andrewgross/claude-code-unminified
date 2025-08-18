/* chunk:641 bytes:[14538933, 14553112) size:14179 source:unpacked-cli.js */
var acB = G1(ncB(), 1),
    {
        program: Q87,
        createCommand: Z87,
        createArgument: D87,
        createOption: G87,
        CommanderError: F87,
        InvalidArgumentError: I87,
        InvalidOptionArgumentError: Y87,
        Command: scB,
        Argument: W87,
        Option: PU,
        Help: J87
    } = acB.default;
var wW = G1(z1(), 1);

function rcB({
    servers: A,
    scope: B,
    onDone: Q
}) {
    let Z = Object.keys(A),
        D = wW.useMemo(() => gz(), []),
        G = Z.filter((J) => D[J] !== void 0);

    function F(J) {
        let X = 0;
        for (let V of J) {
            let C = A[V];
            if (C) {
                let K = V;
                if (D[K] !== void 0) {
                    let H = 1;
                    while (D[`${V}_${H}`] !== void 0) H++;
                    K = `${V}_${H}`
                }
                gg(K, C, B), X++
            }
        }
        W(X)
    }
    let I = U2();
    DA((J, X) => {
        if (X.escape) {
            W(0);
            return
        }
    });
    let [Y] = fB();

    function W(J) {
        if (J > 0) lD(`
${pB("success",Y)(`Successfully imported ${J} MCP server${J!==1?"s":""} to ${B} config.`)}
`);
        else console.log(`
No servers were imported.`);
        Q(), P4()
    }
    return wW.default.createElement(wW.default.Fragment, null, wW.default.createElement(v, {
        flexDirection: "column",
        gap: 1,
        padding: 1,
        borderStyle: "round",
        borderColor: "success"
    }, wW.default.createElement(T, {
        bold: !0,
        color: "success"
    }, "Import MCP Servers from Claude Desktop"), wW.default.createElement(T, null, "Found ", Z.length, " MCP server", Z.length !== 1 ? "s" : "", " in Claude Desktop."), G.length > 0 && wW.default.createElement(T, {
        color: "warning"
    }, "Note: Some servers already exist with the same name. If selected, they will be imported with a numbered suffix."), wW.default.createElement(T, null, "Please select the servers you want to import:"), wW.default.createElement(BT1, {
        options: Z.map((J) => ({
            label: `${J}${G.includes(J)?" (already exists)":""}`,
            value: J
        })),
        defaultValue: Z.filter((J) => !G.includes(J)),
        onSubmit: F
    })), wW.default.createElement(v, {
        marginLeft: 3
    }, wW.default.createElement(T, {
        dimColor: !0
    }, I.pending ? wW.default.createElement(wW.default.Fragment, null, "Press ", I.keyName, " again to exit") : wW.default.createElement(wW.default.Fragment, null, "Space to select · Enter to confirm · Esc to cancel"))))
}
import * as AP0 from "path";
import * as ocB from "os";

function vO8() {
    let A = L9();
    if (!In1.includes(A)) throw new Error(`Unsupported platform: ${A} - Claude Desktop integration only works on macOS and WSL.`);
    if (A === "macos") return AP0.join(ocB.homedir(), "Library", "Application Support", "Claude", "claude_desktop_config.json");
    let B = process.env.USERPROFILE ? process.env.USERPROFILE.replace(/\\/g, "/") : null;
    if (B) {
        let Z = `/mnt/c${B.replace(/^[A-Z]:/,"")}/AppData/Roaming/Claude/claude_desktop_config.json`;
        if (j1().existsSync(Z)) return Z
    }
    try {
        if (j1().existsSync("/mnt/c/Users")) {
            let Z = j1().readdirSync("/mnt/c/Users");
            for (let D of Z) {
                if (D.name === "Public" || D.name === "Default" || D.name === "Default User" || D.name === "All Users") continue;
                let G = AP0.join("/mnt/c/Users", D.name, "AppData", "Roaming", "Claude", "claude_desktop_config.json");
                if (j1().existsSync(G)) return G
            }
        }
    } catch (Q) {
        R1(Q instanceof Error ? Q : new Error(String(Q)))
    }
    throw new Error("Could not find Claude Desktop config file in Windows. Make sure Claude Desktop is installed on Windows.")
}

function tcB() {
    if (!In1.includes(L9())) throw new Error("Unsupported platform - Claude Desktop integration only works on macOS and WSL.");
    try {
        let A = vO8();
        if (!j1().existsSync(A)) return {};
        let B = j1().readFileSync(A, {
                encoding: "utf8"
            }),
            Q = T7(B);
        if (!Q || typeof Q !== "object") return {};
        let Z = Q.mcpServers;
        if (!Z || typeof Z !== "object") return {};
        let D = {};
        for (let [G, F] of Object.entries(Z)) {
            if (!F || typeof F !== "object") continue;
            let I = J40.safeParse(F);
            if (I.success) D[G] = I.data
        }
        return D
    } catch (A) {
        return R1(A instanceof Error ? A : new Error(String(A))), {}
    }
}
import {
    cwd as Ob
} from "process";
var k5 = G1(z1(), 1);
import {
    homedir as BlB
} from "os";

function BP0(A) {
    return A.some((B) => B.ruleBehavior === "allow" && (B.ruleValue.toolName === SZ || B.ruleValue.toolName.startsWith(SZ + "(")))
}

function ecB() {
    let A = py("projectSettings"),
        B = py("localSettings"),
        Q = [...A, ...B];
    return BP0(Q)
}

function AlB() {
    let A = [],
        B = py("projectSettings");
    if (BP0(B)) A.push("projectSettings");
    let Q = py("localSettings");
    if (BP0(Q)) A.push("localSettings");
    return A
}

function pg1(A, B) {
    if (A.length === 0) return "";
    let Q = B === 0 ? void 0 : B;
    if (!Q || A.length <= Q) {
        if (A.length === 1) return A[0];
        if (A.length === 2) return `${A[0]} and ${A[1]}`;
        let G = A[A.length - 1];
        return `${A.slice(0,-1).join(", ")}, and ${G}`
    }
    let Z = A.slice(0, Q),
        D = A.length - Q;
    if (Z.length === 1) return `${Z[0]} and ${D} more`;
    return `${Z.join(", ")}, and ${D} more`
}

function QlB({
    onDone: A,
    commands: B
}) {
    let {
        servers: Q
    } = ZG("project"), Z = Object.keys(Q).length > 0, G = ["projectSettings", "localSettings"].map((j) => ({
        source: j,
        settings: _Y(j)
    })), F = G.some(({
        settings: j
    }) => j?.statusLine !== void 0), I = G.filter(({
        settings: j
    }) => !!j?.hooks || j?.statusLine !== void 0).map(({
        source: j,
        settings: f
    }) => ({
        source: j,
        hooksConfig: f?.hooks,
        hasStatusLine: f?.statusLine !== void 0,
        hookCount: f?.hooks ? Object.values(f.hooks).reduce((k, c) => k + c.reduce((u, a) => u + a.hooks.length, 0), 0) : 0
    })), Y = I.filter(({
        hookCount: j
    }) => j > 0), W = !GB()?.disableAllHooks && (F || Y.length > 0), J = ecB(), X = B?.filter((j) => j.type === "prompt" && j.source === "projectSettings" && j.allowedTools?.some((f) => f === SZ || f.startsWith(SZ + "("))) ?? [], V = X.length > 0, C = X.map((j) => j.name), K = J || V, H = GN2(W || K), $ = [{
        name: "MCP servers",
        warning: "This project also contains MCP servers defined in .mcp.json that can execute code on your machine if enabled.",
        shouldShowWarning: () => Z,
        onChange: () => {
            let j = {
                enabledMcpjsonServers: Object.keys(Q),
                enableAllProjectMcpServers: !0
            };
            y6("localSettings", j)
        }
    }, {
        name: "hooks",
        warning: "This project also contains hooks, user-defined bash commands that execute automatically during Claude Code operation. With your permission, hooks configured in this project can execute arbitrary code on your machine. Only use hooks that you understand from trusted sources.",
        shouldShowWarning: () => W
    }, {
        name: "automatic bash execution",
        warning: "This project also allows Claude Code to automatically execute bash commands on your machine.",
        shouldShowWarning: () => K
    }].filter((j) => j.shouldShowWarning()), L = new Set($.map((j) => j.name));
    k5.default.useEffect(() => {
        let j = BlB() === t0();
        X1("tengu_trust_dialog_shown", {
            isHomeDir: j,
            hasMcpServers: Z,
            hasHooks: W,
            hasBashExecution: K
        })
    }, [Z, W, K]);

    function N(j) {
        let f = UQ();
        if (j === "exit") {
            O5(1);
            return
        }
        let k = BlB() === t0();
        if (X1("tengu_trust_dialog_accept", {
                isHomeDir: k,
                hasMcpServers: Z,
                hasHooks: W,
                hasBashExecution: K,
                enableMcp: !0
            }), !k) r5({
            ...f,
            hasTrustDialogAccepted: !0
        });
        $.forEach((c) => {
            if (c.onChange !== void 0) c.onChange()
        }), A()
    }
    let R = U2();
    DA((j, f) => {
        if (f.escape) {
            O5(0);
            return
        }
    });
    let O = () => {
            if (I.length === 0) return null;
            return k5.default.createElement(v, {
                flexDirection: "column",
                gap: 1
            }, I.map(({
                source: j,
                hookCount: f,
                hasStatusLine: k
            }) => {
                let c = [];
                if (f > 0) c.push(`${f} hook${f!==1?"s":""}`);
                if (k) c.push("statusLine");
                return k5.default.createElement(v, {
                    key: j,
                    flexDirection: "column",
                    paddingLeft: 2
                }, k5.default.createElement(T, {
                    dimColor: !0
                }, "• ", pg1(c), " from ", j))
            }))
        },
        P = () => {
            if (!J) return null;
            let j = AlB();
            return k5.default.createElement(v, {
                flexDirection: "column",
                gap: 1
            }, j.map((f) => k5.default.createElement(v, {
                key: f,
                flexDirection: "column",
                paddingLeft: 2
            }, k5.default.createElement(T, {
                dimColor: !0
            }, "• ", f))))
        };
    if (H) return setTimeout(A), null;
    return k5.default.createElement(k5.default.Fragment, null, k5.default.createElement(v, {
        flexDirection: "column",
        gap: 1,
        padding: 1,
        borderStyle: "round",
        borderColor: "warning"
    }, k5.default.createElement(T, {
        bold: !0,
        color: "warning"
    }, "Do you trust the files in this folder?"), k5.default.createElement(T, {
        bold: !0
    }, j1().cwd()), k5.default.createElement(v, {
        flexDirection: "column",
        gap: 1
    }, k5.default.createElement(T, null, "Claude Code may read files in this folder. Reading untrusted files may lead Claude Code to behave in unexpected ways."), k5.default.createElement(T, null, "With your permission Claude Code may execute files in this folder. Executing untrusted code is unsafe."), $.map((j) => k5.default.createElement(T, {
        key: `trust-warning-${j.name}`
    }, j.warning)), L.has("hooks") && k5.default.createElement(v, {
        flexDirection: "column",
        gap: 1
    }, k5.default.createElement(T, {
        dimColor: !0
    }, "The following hooks are configured to run in this project:"), O()), L.has("automatic bash execution") && k5.default.createElement(v, {
        flexDirection: "column",
        gap: 1
    }, k5.default.createElement(T, {
        dimColor: !0
    }, "The following setting sources allow bash execution:"), P(), V && k5.default.createElement(v, {
        paddingLeft: 2
    }, k5.default.createElement(T, {
        dimColor: !0
    }, "• slash commands (", pg1(C, 2), ")"))), k5.default.createElement(C3, {
        url: "https://docs.anthropic.com/s/claude-code-security"
    })), k5.default.createElement(uA, {
        options: (() => {
            let j = [];
            if ($.length > 0) {
                let f = pg1($.map((k) => k.name));
                j.push({
                    label: `Yes, proceed with ${f} enabled`,
                    value: "enable_all"
                })
            } else j.push({
                label: "Yes, proceed",
                value: "enable_all"
            });
            return j.push({
                label: "No, exit",
                value: "exit"
            }), j
        })(),
        onChange: (j) => N(j),
        onCancel: () => N("exit")
    })), k5.default.createElement(v, {
        marginLeft: 3
    }, k5.default.createElement(T, {
        dimColor: !0
    }, R.pending ? k5.default.createElement(k5.default.Fragment, null, "Press ", R.keyName, " again to exit") : k5.default.createElement(k5.default.Fragment, null, "Enter to confirm · Esc to exit"))))
}
var QP0 = G1(z1(), 1);
var iI1 = G1(z1(), 1);
var ig1 = G1(z1(), 1);

function ZlB({
    context: A,
    commands: B,
    logs: Q,
    initialTools: Z,
    mcpClients: D,
    dynamicMcpConfig: G,
    appState: F,
    onChangeAppState: I,
    debug: Y,
    strictMcpConfig: W = !1,
    appendSystemPrompt: J
}) {
    let {
        rows: X
    } = r9(), V = Q.filter((H) => !H.isSidechain);
    U2();

    function C() {
        process.exit(1)
    }
    async function K(H) {
        let z = Q[H];
        if (!z) return;
        try {
            A.unmount?.();
            let $ = await Rb(z, Z);
            if (!$) throw new Error("Failed to load conversation");
            let L = sE(CB());
            await V7(), S8(ig1.default.createElement(F7, {
                initialState: F,
                onChangeAppState: I
            }, ig1.default.createElement(_A1, {
                initialPrompt: "",
                debug: Y,
                commands: B,
                initialTools: Z,
                initialMessages: $.messages,
                initialTodos: L,
                initialCheckpoints: $.log.checkpoints,
                mcpClients: D,
                dynamicMcpConfig: G,
                strictMcpConfig: W,
                appendSystemPrompt: J
            })), {
                exitOnCtrlC: !1
            })
        } catch ($) {
            throw R1($), $
        }
    }
    return ig1.default.createElement(LI1, {
        logs: V,
        maxHeight: X,
        onCancel: C,
        onSelect: K
    })
}
var DlB = G1(cH0(), 1);