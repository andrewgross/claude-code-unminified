/* chunk:612 bytes:[14042986, 14059083) size:16097 source:unpacked-cli.js */
function KA1() {
    let [A, B] = _B.useState("intro"), [Q, Z] = _B.useState(""), [D, G] = _B.useState("");
    if (U2(() => {
            Ov("canceled", "user_exit"), O5(1)
        }), _B.useEffect(() => {
            Ov("start")
        }, []), _B.useEffect(() => {
            let F = async () => {
                try {
                    if (!Cq0()) Z("Local package creation failed"), B("error"), Ov("failure", "environement_setup");
                    switch (await Qd()) {
                        case "success": {
                            B("success"), Ov("success");
                            break
                        }
                        case "in_progress":
                            Z("Update already in progress"), B("error"), Ov("failure", "in_progress");
                            break;
                        case "install_failed":
                            Z(`Install of ${{ISSUES_EXPLAINER:"report the issue at https://github.com/anthropics/claude-code/issues",PACKAGE_URL:"@anthropic-ai/claude-code",README_URL:"https://docs.anthropic.com/s/claude-code",VERSION:"1.0.83"}.PACKAGE_URL} failed`), B("error"), Ov("failure", "other_failure");
                            break
                    }
                } catch (W) {
                    Z(String(W)), B("error"), Ov("failure", "unexpected_error")
                }
            }, I = async () => {
                try {
                    let W = await aMB();
                    G(W), B("setup")
                } catch (W) {
                    Z(String(W)), B("error")
                }
            }, Y = async () => {
                try {
                    if (await sMB()) B("uninstall-success");
                    else B("uninstall-failed")
                } catch (W) {
                    Z(String(W)), B("uninstall-failed")
                }
            };
            switch (A) {
                case "installing":
                    F();
                    break;
                case "setup-alias":
                    I();
                    break;
                case "uninstall":
                    Y();
                    break;
                default:
                    break
            }
        }, [A]), A === "intro") return _B.default.createElement(v, {
        flexDirection: "column",
        marginY: 1
    }, _B.default.createElement(T, {
        bold: !0
    }, "Claude Code Local Installer"), _B.default.createElement(v, {
        flexDirection: "column"
    }, _B.default.createElement(T, {
        color: "secondaryText"
    }, "This will install Claude Code to ~/.claude/local"), _B.default.createElement(T, {
        color: "secondaryText"
    }, "instead of using a global npm installation.")), _B.default.createElement(CA1, {
        onPress: () => B("installing")
    }));
    if (A === "installing") return _B.default.createElement(v, {
        flexDirection: "column",
        marginY: 1
    }, _B.default.createElement(T, {
        bold: !0
    }, "Installing Claude Code locally..."), _B.default.createElement(v, {
        marginY: 1
    }, _B.default.createElement(g6, null), _B.default.createElement(T, null, " Installing to ", s11)));
    if (A === "success") return _B.default.createElement(v, {
        flexDirection: "column",
        marginY: 1
    }, _B.default.createElement(T, {
        bold: !0,
        color: "success"
    }, "✓ Local installation successful!"), _B.default.createElement(v, {
        marginY: 1
    }, _B.default.createElement(T, null, "Next, let's add an alias for `claude`")), _B.default.createElement(CA1, {
        onPress: () => B("setup-alias")
    }));
    if (A === "setup-alias") return _B.default.createElement(v, {
        flexDirection: "column",
        marginY: 1
    }, _B.default.createElement(T, {
        bold: !0
    }, "Setting up alias for claude..."), _B.default.createElement(v, {
        marginY: 1
    }, _B.default.createElement(g6, null), _B.default.createElement(T, null, " Configuring shell environment")));
    if (A === "setup") return _B.default.createElement(v, {
        flexDirection: "column",
        marginY: 1
    }, _B.default.createElement(T, {
        bold: !0
    }, "Alias setup complete"), _B.default.createElement(v, {
        flexDirection: "column",
        marginY: 1
    }, _B.default.createElement(T, null, D), _B.default.createElement(v, {
        marginY: 1
    }, _B.default.createElement(T, null, "Next, we'll remove the globally installed npm package"))), _B.default.createElement(CA1, {
        onPress: () => B("uninstall")
    }));
    if (A === "uninstall") return _B.default.createElement(v, {
        flexDirection: "column",
        marginY: 1
    }, _B.default.createElement(T, {
        bold: !0
    }, "Uninstalling global Claude Code..."), _B.default.createElement(v, {
        marginY: 1
    }, _B.default.createElement(g6, null), _B.default.createElement(T, null, " Removing global npm installation")));
    if (A === "uninstall-success") return _B.default.createElement(v, {
        flexDirection: "column",
        marginY: 1
    }, _B.default.createElement(T, {
        bold: !0,
        color: "success"
    }, "✓ Global installation removed successfully!"), _B.default.createElement(v, {
        flexDirection: "column",
        marginY: 1
    }, _B.default.createElement(T, null, "Claude Code is now installed locally."), _B.default.createElement(T, null, "Please restart your shell, then run", " ", _B.default.createElement(T, {
        color: "claude"
    }, e1.bold("claude")), "."), _B.default.createElement(v, {
        flexDirection: "row",
        marginY: 1
    }, _B.default.createElement(g6, null), _B.default.createElement(T, null, " Happy Clauding!"))), _B.default.createElement(CA1, {
        onPress: () => O5(0)
    }));
    if (A === "uninstall-failed") return _B.default.createElement(v, {
        flexDirection: "column",
        marginY: 1
    }, _B.default.createElement(T, {
        bold: !0,
        color: "warning"
    }, "! Could not remove global installation"), _B.default.createElement(v, {
        marginY: 1
    }, _B.default.createElement(T, null, "The local installation is installed, but we couldn't remove the global npm package automatically.")), _B.default.createElement(v, {
        marginY: 1
    }, _B.default.createElement(T, null, "You can remove it manually later with:", `
`, e1.bold(`npm uninstall -g --force ${{ISSUES_EXPLAINER:"report the issue at https://github.com/anthropics/claude-code/issues",PACKAGE_URL:"@anthropic-ai/claude-code",README_URL:"https://docs.anthropic.com/s/claude-code",VERSION:"1.0.83"}.PACKAGE_URL}`))), _B.default.createElement(CA1, {
        onPress: () => O5(0)
    }));
    return _B.default.createElement(v, {
        flexDirection: "column",
        marginY: 1
    }, _B.default.createElement(T, {
        bold: !0,
        color: "error"
    }, "✗ Installation failed"), _B.default.createElement(v, {
        marginY: 1
    }, _B.default.createElement(T, null, Q || "An unexpected error occurred during installation.")), _B.default.createElement(CA1, {
        onPress: () => O5(1)
    }))
}
var YN8 = {
        type: "local",
        name: "migrate-installer",
        description: "Migrate from global npm installation to local installation",
        isEnabled: () => !process.env.DISABLE_MIGRATE_INSTALLER_COMMAND && !Mv(),
        isHidden: !1,
        async call() {
            let {
                waitUntilExit: A
            } = S8(IuB.default.createElement(KA1, null));
            return await A(), ""
        },
        userFacingName() {
            return "migrate-installer"
        }
    },
    YuB = YN8;
var DT0 = G1(z1(), 1);
var MU = G1(z1(), 1);
var vZ = G1(z1(), 1);

function oO0({
    servers: A,
    onSelectServer: B,
    onComplete: Q
}) {
    let [Z] = fB(), D = U2();
    if (A.length === 0) return null;
    let G = GV1(),
        F = A.some((Y) => Y.client.type === "failed"),
        I = A.map((Y) => {
            let W = "",
                J = "",
                X = "";
            if (Y.client.type === "connected") J = pB("success", Z)(s0.tick), W = "connected · Enter to view details", X = `${J} ${W}`;
            else if (Y.client.type === "pending") J = pB("secondaryText", Z)(s0.radioOff), W = "connecting...", X = `${J} ${W}`;
            else if (Y.client.type === "needs-auth") J = pB("warning", Z)(s0.triangleUpOutline), W = "disconnected · Enter to login", X = `${J} ${W}`;
            else if (Y.client.type === "failed") J = pB("error", Z)(s0.cross), W = "failed · Enter to view details", X = `${J} ${W}`;
            else J = pB("error", Z)(s0.cross), W = "failed", X = `${J} ${W}`;
            return {
                label: e1.bold(Y.name),
                value: Y.name,
                description: X,
                dimDescription: !1
            }
        });
    return vZ.default.createElement(v, {
        flexDirection: "column"
    }, vZ.default.createElement(Zh1, null), vZ.default.createElement(v, {
        flexDirection: "column",
        paddingX: 1,
        borderStyle: "round",
        borderColor: "secondaryBorder"
    }, vZ.default.createElement(v, {
        marginBottom: 1
    }, vZ.default.createElement(T, {
        bold: !0
    }, "Manage MCP servers")), vZ.default.createElement(uA, {
        options: I,
        onChange: (Y) => {
            let W = A.find((J) => J.name === Y);
            if (W) B(W)
        },
        onCancel: () => Q()
    }), F && vZ.default.createElement(v, {
        marginTop: 1
    }, vZ.default.createElement(T, {
        dimColor: !0
    }, "※ Tip:", " ", G ? `Error logs will be shown inline. Log files are also saved in
  ${$L.baseLogs()}` : `Run claude --debug to see logs inline, or view log files in
  ${$L.baseLogs()}`)), vZ.default.createElement(v, {
        flexDirection: "column",
        marginTop: 1
    }, vZ.default.createElement(T, {
        dimColor: !0
    }, "MCP Config locations (by scope):"), ["user", "project", "local"].map((Y) => vZ.default.createElement(v, {
        key: Y,
        flexDirection: "column",
        marginLeft: 1
    }, vZ.default.createElement(T, {
        dimColor: !0
    }, "• ", yg(Y), ":"), vZ.default.createElement(v, {
        marginLeft: 2
    }, vZ.default.createElement(T, {
        dimColor: !0
    }, "• ", zK(Y)))))), vZ.default.createElement(v, {
        marginTop: 1,
        marginLeft: 0
    }, vZ.default.createElement(T, {
        dimColor: !0
    }, "For help configuring MCP servers, see:", " ", vZ.default.createElement(C3, {
        url: "https://docs.anthropic.com/en/docs/claude-code/mcp"
    }, "https://docs.anthropic.com/en/docs/claude-code/mcp")))), vZ.default.createElement(v, {
        marginLeft: 3
    }, vZ.default.createElement(T, {
        dimColor: !0
    }, D.pending ? vZ.default.createElement(vZ.default.Fragment, null, "Press ", D.keyName, " again to exit") : vZ.default.createElement(vZ.default.Fragment, null, "Esc to exit"))))
}
var X4 = G1(z1(), 1);
var sh1 = G1(z1(), 1);

function rh1({
    serverToolsCount: A,
    serverPromptsCount: B,
    serverResourcesCount: Q
}) {
    let Z = [];
    if (A > 0) Z.push("tools");
    if (Q > 0) Z.push("resources");
    if (B > 0) Z.push("prompts");
    return sh1.default.createElement(v, null, sh1.default.createElement(T, {
        bold: !0
    }, "Capabilities: "), sh1.default.createElement(T, {
        color: "text"
    }, Z.length > 0 ? Z.join(" · ") : "none"))
}
var zb = G1(z1(), 1);
var cS = G1(z1(), 1);

function WuB(A, B = !1) {
    let [Q, Z] = tQ(), D = cS.useMemo(() => {
        return {
            ...B ? {} : gz(),
            ...A
        }
    }, [B, A]);
    cS.useEffect(() => {
        Z((Y) => ({
            ...Y,
            mcp: {
                ...Y.mcp,
                clients: Object.entries(D).map(([W, J]) => ({
                    name: W,
                    type: "pending",
                    config: J
                })),
                tools: [],
                commands: [],
                resources: {}
            }
        }))
    }, [D, Z]);
    let G = cS.useCallback((Y, W = [], J = [], X) => {
            Z((V) => {
                let C = ueA(Y.name);
                return {
                    ...V,
                    mcp: {
                        ...V.mcp,
                        clients: V.mcp.clients.map((K) => K.name === Y.name ? Y : K),
                        tools: [...fW1(V.mcp.tools, (K) => K.name?.startsWith(C)), ...W],
                        commands: [...fW1(V.mcp.commands, (K) => K.name?.startsWith(C)), ...J],
                        resources: {
                            ...V.mcp.resources,
                            ...X && X.length > 0 ? {
                                [Y.name]: X
                            } : Vm1(V.mcp.resources, Y.name)
                        }
                    }
                }
            })
        }, [Z]),
        F = cS.useCallback(({
            client: Y,
            tools: W,
            commands: J,
            resources: X
        }) => {
            switch (G(Y, W, J, X), Y.type) {
                case "connected": {
                    Y.client.onclose = () => {
                        if (eG1(Y.name, Y.config).catch(() => {
                                n1(`Failed to invalidate the server cache: ${Y.name}`)
                            }), Y.config.type === "sse" || Y.config.type === "sse-ide") IB(Y.name, "SSE transport closed, attempting to reconnectMcpServer"), G({
                            ...Y,
                            type: "pending"
                        }), JL0(Y.name, Y.config).then(F).catch((V) => {
                            XG(Y.name, `Reconnection failed: ${V}`), G({
                                ...Y,
                                type: "failed"
                            })
                        });
                        else G({
                            ...Y,
                            type: "failed"
                        })
                    }, Y.client.onerror = (V) => {
                        XG(Y.name, `Transport error: ${V}`)
                    };
                    break
                }
                case "needs-auth":
                case "failed":
                case "pending":
                    break
            }
        }, [G]);
    return cS.useEffect(() => {
        AF1(F, D).catch((Y) => {
            XG("useManageMcpConnections", `Failed to get MCP resources: ${Y instanceof Error?Y.message:String(Y)}`)
        })
    }, [D, F]), {
        reconnectMcpServer: cS.useCallback(async (Y) => {
            let W = Q.mcp.clients.find((X) => X.name === Y);
            if (!W) throw new Error(`MCP server ${Y} not found`);
            let J = await JL0(Y, W.config);
            return F(J), J
        }, [Q.mcp.clients, F])
    }
}
var JuB = zb.createContext(null);

function HA1() {
    let A = zb.useContext(JuB);
    if (!A) throw new Error("useMcpReconnect must be used within MCPConnectionManager");
    return A.reconnectMcpServer
}

function XuB({
    children: A,
    dynamicMcpConfig: B,
    isStrictMcpConfig: Q
}) {
    let {
        reconnectMcpServer: Z
    } = WuB(B, Q), D = zb.useMemo(() => ({
        reconnectMcpServer: Z
    }), [Z]);
    return zb.default.createElement(JuB.Provider, {
        value: D
    }, A)
}

function oh1(A, B) {
    switch (A.client.type) {
        case "connected":
            return {
                message: `Reconnected to ${B}.`, success: !0
            };
        case "needs-auth":
            return {
                message: `${B} requires authentication. Use the 'Authenticate' option.`, success: !1
            };
        case "failed":
            return {
                message: `Failed to reconnect to ${B}.`, success: !1
            };
        default:
            return {
                message: `Unknown result when reconnecting to ${B}.`, success: !1
            }
    }
}

function th1(A, B) {
    let Q = A instanceof Error ? A.message : String(A);
    return `Error reconnecting to ${B}: ${Q}`
}