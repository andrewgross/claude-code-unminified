/* chunk:613 bytes:[14059085, 14077245) size:18160 source:unpacked-cli.js */
function tO0({
    server: A,
    serverToolsCount: B,
    onViewTools: Q,
    onCancel: Z,
    onComplete: D
}) {
    let [G] = fB(), F = U2(), [I] = tQ(), Y = HA1(), [W, J] = X4.useState(!1), X = String(A.name).charAt(0).toUpperCase() + String(A.name).slice(1), V = zq1(I.mcp.commands, A.name).length, C = [];
    if (A.client.type === "connected" && B > 0) C.push({
        label: "View tools",
        value: "tools"
    });
    if (C.push({
            label: "Reconnect",
            value: "reconnectMcpServer"
        }), C.length === 0) C.push({
        label: "Back",
        value: "back"
    });
    if (W) return X4.default.createElement(v, {
        flexDirection: "column",
        gap: 1,
        padding: 1
    }, X4.default.createElement(T, {
        color: "text"
    }, "Reconnecting to ", X4.default.createElement(T, {
        bold: !0
    }, A.name)), X4.default.createElement(v, null, X4.default.createElement(g6, null), X4.default.createElement(T, null, " Restarting MCP server process")), X4.default.createElement(T, {
        dimColor: !0
    }, "This may take a few moments."));
    return X4.default.createElement(X4.default.Fragment, null, X4.default.createElement(v, {
        flexDirection: "column",
        paddingX: 1,
        borderStyle: "round"
    }, X4.default.createElement(v, {
        marginBottom: 1
    }, X4.default.createElement(T, {
        bold: !0
    }, X, " MCP Server")), X4.default.createElement(v, {
        flexDirection: "column",
        gap: 0
    }, X4.default.createElement(v, null, X4.default.createElement(T, {
        bold: !0
    }, "Status: "), A.client.type === "connected" ? X4.default.createElement(T, null, pB("success", G)(s0.tick), " connected") : A.client.type === "pending" ? X4.default.createElement(T, null, pB("secondaryText", G)(s0.radioOff), " connecting…") : X4.default.createElement(T, null, pB("error", G)(s0.cross), " failed")), X4.default.createElement(v, null, X4.default.createElement(T, {
        bold: !0
    }, "Command: "), X4.default.createElement(T, {
        color: "secondaryText"
    }, A.config.command)), A.config.args && A.config.args.length > 0 && X4.default.createElement(v, null, X4.default.createElement(T, {
        bold: !0
    }, "Args: "), X4.default.createElement(T, {
        color: "secondaryText"
    }, A.config.args.join(" "))), X4.default.createElement(v, null, X4.default.createElement(T, {
        bold: !0
    }, "Config location: "), X4.default.createElement(T, {
        color: "secondaryText"
    }, zK(ds(A.name)?.scope ?? "dynamic"))), A.client.type === "connected" && X4.default.createElement(rh1, {
        serverToolsCount: B,
        serverPromptsCount: V,
        serverResourcesCount: I.mcp.resources[A.name]?.length || 0
    }), A.client.type === "connected" && B > 0 && X4.default.createElement(v, null, X4.default.createElement(T, {
        bold: !0
    }, "Tools: "), X4.default.createElement(T, {
        color: "secondaryText"
    }, B, " tools"))), C.length > 0 && X4.default.createElement(v, {
        marginTop: 1
    }, X4.default.createElement(uA, {
        options: C,
        onChange: async (K) => {
            if (K === "tools") Q();
            else if (K === "reconnectMcpServer") {
                J(!0);
                try {
                    let H = await Y(A.name),
                        {
                            message: z
                        } = oh1(H, A.name);
                    D?.(z)
                } catch (H) {
                    D?.(th1(H, A.name))
                } finally {
                    J(!1)
                }
            } else if (K === "back") Z()
        },
        onCancel: Z
    }))), X4.default.createElement(v, {
        marginLeft: 3
    }, X4.default.createElement(T, {
        dimColor: !0
    }, F.pending ? X4.default.createElement(X4.default.Fragment, null, "Press ", F.keyName, " again to exit") : X4.default.createElement(X4.default.Fragment, null, "Esc to go back"))))
}
var z9 = G1(z1(), 1);

function eO0({
    server: A,
    serverToolsCount: B,
    onViewTools: Q,
    onCancel: Z,
    onComplete: D
}) {
    let [G] = fB(), F = U2(), [I, Y] = z9.default.useState(!1), [W, J] = z9.default.useState(null), [X, V] = tQ(), [C, K] = z9.default.useState(null), [H, z] = z9.useState(!1), [$, L] = z9.useState(null);
    DA((k, c) => {
        if (c.escape && I) {
            if ($) $.abort();
            Y(!1), K(null), L(null)
        }
    });
    let N = String(A.name).charAt(0).toUpperCase() + String(A.name).slice(1),
        R = zq1(X.mcp.commands, A.name).length,
        O = HA1(),
        P = z9.default.useCallback(async () => {
            Y(!0), J(null);
            let k = new AbortController;
            L(k);
            try {
                if (A.isAuthenticated && A.config) await WL0(A.name, A.config);
                if (A.config) {
                    await YjB(A.name, A.config, K, k.signal), X1("tengu_mcp_auth_config_authenticate", {
                        wasAuthenticated: A.isAuthenticated
                    });
                    let c = await O(A.name);
                    if (c.client.type === "connected") {
                        let u = A.isAuthenticated ? `Authentication successful. Reconnected to ${A.name}.` : `Authentication successful. Connected to ${A.name}.`;
                        D?.(u)
                    } else if (c.client.type === "needs-auth") D?.("Authentication successful, but server still requires authentication. You may need to manually restart Claude Code.");
                    else IB(A.name, "Reconnection failed after authentication"), D?.("Authentication successful, but server reconnection failed. You may need to manually restart Claude Code for the changes to take effect.")
                }
            } catch (c) {
                if (c instanceof Error && !(c instanceof bb1)) J(c.message)
            } finally {
                Y(!1), L(null)
            }
        }, [A.isAuthenticated, A.config, A.name, D, O, K]),
        j = async () => {
            if (A.config) await WL0(A.name, A.config), X1("tengu_mcp_auth_config_clear", {}), await eG1(A.name, {
                ...A.config,
                scope: A.scope
            }), V((k) => {
                let c = k.mcp.clients.map((y) => y.name === A.name ? {
                        ...y,
                        type: "failed"
                    } : y),
                    u = feA(k.mcp.tools, A.name),
                    a = heA(k.mcp.commands, A.name),
                    l = geA(k.mcp.resources, A.name);
                return {
                    ...k,
                    mcp: {
                        clients: c,
                        tools: u,
                        commands: a,
                        resources: l
                    }
                }
            }), D?.(`Authentication cleared for ${A.name}.`)
        };
    if (I) return z9.default.createElement(v, {
        flexDirection: "column",
        gap: 1,
        padding: 1
    }, z9.default.createElement(T, {
        color: "claude"
    }, "Authenticating with ", A.name, "…"), z9.default.createElement(v, null, z9.default.createElement(g6, null), z9.default.createElement(T, null, " A browser window will open for authentication")), C && z9.default.createElement(v, {
        flexDirection: "column"
    }, z9.default.createElement(T, {
        dimColor: !0
    }, "If your browser doesn't open automatically, copy this URL manually:"), z9.default.createElement(C3, {
        url: C
    })), z9.default.createElement(v, {
        marginLeft: 3
    }, z9.default.createElement(T, {
        dimColor: !0
    }, "Return here after authenticating in your browser. Press Esc to go back.")));
    if (H) return z9.default.createElement(v, {
        flexDirection: "column",
        gap: 1,
        padding: 1
    }, z9.default.createElement(T, {
        color: "text"
    }, "Reconnecting to ", z9.default.createElement(T, {
        bold: !0
    }, A.name), "…"), z9.default.createElement(v, null, z9.default.createElement(g6, null), z9.default.createElement(T, null, " Establishing connection to MCP server")), z9.default.createElement(T, {
        dimColor: !0
    }, "This may take a few moments."));
    let f = [];
    if (A.client.type === "connected" && B > 0) f.push({
        label: "View tools",
        value: "tools"
    });
    if (A.isAuthenticated) f.push({
        label: "Re-authenticate",
        value: "reauth"
    }), f.push({
        label: "Clear authentication",
        value: "clear-auth"
    });
    if (!A.isAuthenticated) f.push({
        label: "Authenticate",
        value: "auth"
    });
    if (A.client.type !== "needs-auth") f.push({
        label: "Reconnect",
        value: "reconnectMcpServer"
    });
    if (f.length === 0) f.push({
        label: "Back",
        value: "back"
    });
    return z9.default.createElement(z9.default.Fragment, null, z9.default.createElement(v, {
        flexDirection: "column",
        paddingX: 1,
        borderStyle: "round"
    }, z9.default.createElement(v, {
        marginBottom: 1
    }, z9.default.createElement(T, {
        bold: !0
    }, N, " MCP Server")), z9.default.createElement(v, {
        flexDirection: "column",
        gap: 0
    }, z9.default.createElement(v, null, z9.default.createElement(T, {
        bold: !0
    }, "Status: "), A.client.type === "connected" ? z9.default.createElement(z9.default.Fragment, null, z9.default.createElement(T, null, pB("success", G)(s0.tick), " connected"), A.isAuthenticated && z9.default.createElement(T, null, "  ", pB("success", G)(s0.tick), " authenticated")) : A.client.type === "pending" ? z9.default.createElement(T, null, pB("secondaryText", G)(s0.radioOff), " connecting…") : A.client.type === "needs-auth" ? z9.default.createElement(T, null, pB("warning", G)(s0.triangleUpOutline), " needs authentication") : z9.default.createElement(T, null, pB("error", G)(s0.cross), " failed")), z9.default.createElement(v, null, z9.default.createElement(T, {
        bold: !0
    }, "URL: "), z9.default.createElement(T, {
        color: "secondaryText"
    }, A.config.url)), z9.default.createElement(v, null, z9.default.createElement(T, {
        bold: !0
    }, "Config location: "), z9.default.createElement(T, {
        color: "secondaryText"
    }, zK(ds(A.name)?.scope ?? "dynamic"))), A.client.type === "connected" && z9.default.createElement(rh1, {
        serverToolsCount: B,
        serverPromptsCount: R,
        serverResourcesCount: X.mcp.resources[A.name]?.length || 0
    }), A.client.type === "connected" && B > 0 && z9.default.createElement(v, null, z9.default.createElement(T, {
        bold: !0
    }, "Tools: "), z9.default.createElement(T, {
        color: "secondaryText"
    }, B, " tools"))), W && z9.default.createElement(v, {
        marginTop: 1
    }, z9.default.createElement(T, {
        color: "error"
    }, "Error: ", W)), f.length > 0 && z9.default.createElement(v, {
        marginTop: 1
    }, z9.default.createElement(uA, {
        options: f,
        onChange: async (k) => {
            switch (k) {
                case "tools":
                    Q();
                    break;
                case "auth":
                case "reauth":
                    await P();
                    break;
                case "clear-auth":
                    await j();
                    break;
                case "reconnectMcpServer":
                    z(!0);
                    try {
                        let c = await O(A.name),
                            {
                                message: u
                            } = oh1(c, A.name);
                        D?.(u)
                    } catch (c) {
                        D?.(th1(c, A.name))
                    } finally {
                        z(!1)
                    }
                    break;
                case "back":
                    Z();
                    break
            }
        },
        onCancel: Z
    }))), z9.default.createElement(v, {
        marginLeft: 3
    }, z9.default.createElement(T, {
        dimColor: !0
    }, F.pending ? z9.default.createElement(z9.default.Fragment, null, "Press ", F.keyName, " again to exit") : z9.default.createElement(z9.default.Fragment, null, "Esc to go back"))))
}
var xX = G1(z1(), 1);

function AT0({
    server: A,
    onSelectTool: B,
    onBack: Q
}) {
    let Z = U2(),
        [D] = tQ(),
        G = xX.default.useMemo(() => {
            if (A.client.type !== "connected") return [];
            return c61(D.mcp.tools, A.name)
        }, [A, D.mcp.tools]),
        F = G.map((I, Y) => {
            let W = Eq1(I.name, A.name),
                J = I.userFacingName ? I.userFacingName({}) : W,
                X = Uq1(J),
                V = I.isReadOnly?.({}) ?? !1,
                C = I.isDestructive?.({}) ?? !1,
                K = I.isOpenWorld?.({}) ?? !1,
                H = [];
            if (V) H.push("read-only");
            if (C) H.push("destructive");
            if (K) H.push("open-world");
            return {
                label: X,
                value: Y.toString(),
                description: H.length > 0 ? H.join(", ") : void 0,
                descriptionColor: C ? "error" : V ? "success" : void 0
            }
        });
    return xX.default.createElement(v, {
        flexDirection: "column"
    }, xX.default.createElement(v, {
        flexDirection: "column",
        paddingX: 1,
        borderStyle: "round"
    }, xX.default.createElement(v, {
        marginBottom: 1
    }, xX.default.createElement(T, {
        bold: !0
    }, "Tools for ", A.name), xX.default.createElement(T, {
        color: "secondaryText"
    }, " (", G.length, " tools)")), G.length === 0 ? xX.default.createElement(T, {
        color: "secondaryText"
    }, "No tools available") : xX.default.createElement(uA, {
        options: F,
        onChange: (I) => {
            let Y = parseInt(I),
                W = G[Y];
            if (W) B(W, Y)
        },
        onCancel: Q
    })), xX.default.createElement(v, {
        marginLeft: 3
    }, xX.default.createElement(T, {
        dimColor: !0
    }, Z.pending ? xX.default.createElement(xX.default.Fragment, null, "Press ", Z.keyName, " again to exit") : xX.default.createElement(xX.default.Fragment, null, "Esc to go back"))))
}
var E8 = G1(z1(), 1);

function BT0({
    tool: A,
    server: B,
    onBack: Q
}) {
    let Z = U2(),
        [D, G] = E8.default.useState("");
    DA((V, C) => {
        if (C.escape) Q()
    });
    let F = Eq1(A.name, B.name),
        I = A.userFacingName ? A.userFacingName({}) : F,
        Y = Uq1(I),
        W = A.isReadOnly?.({}) ?? !1,
        J = A.isDestructive?.({}) ?? !1,
        X = A.isOpenWorld?.({}) ?? !1;
    return E8.default.useEffect(() => {
        async function V() {
            try {
                let C = await A.description({}, {
                    isNonInteractiveSession: !1,
                    getToolPermissionContext: () => ({
                        mode: "default",
                        additionalWorkingDirectories: new Map,
                        alwaysAllowRules: {},
                        alwaysDenyRules: {},
                        alwaysAskRules: {},
                        isBypassPermissionsModeAvailable: !1
                    }),
                    tools: []
                });
                G(C)
            } catch {
                G("Failed to load description")
            }
        }
        V()
    }, [A]), E8.default.createElement(v, {
        flexDirection: "column"
    }, E8.default.createElement(v, {
        flexDirection: "column",
        paddingX: 1,
        borderStyle: "round"
    }, E8.default.createElement(v, {
        marginBottom: 1
    }, E8.default.createElement(T, {
        bold: !0
    }, Y, E8.default.createElement(T, {
        color: "secondaryText"
    }, " (", B.name, ")"), W && E8.default.createElement(T, {
        color: "success"
    }, " [read-only]"), J && E8.default.createElement(T, {
        color: "error"
    }, " [destructive]"), X && E8.default.createElement(T, {
        color: "secondaryText"
    }, " [open-world]"))), E8.default.createElement(v, {
        flexDirection: "column"
    }, E8.default.createElement(v, null, E8.default.createElement(T, {
        bold: !0
    }, "Tool name: "), E8.default.createElement(T, {
        color: "secondaryText"
    }, F)), E8.default.createElement(v, null, E8.default.createElement(T, {
        bold: !0
    }, "Full name: "), E8.default.createElement(T, {
        color: "secondaryText"
    }, A.name)), D && E8.default.createElement(v, {
        flexDirection: "column",
        marginTop: 1
    }, E8.default.createElement(T, {
        bold: !0
    }, "Description:"), E8.default.createElement(T, {
        wrap: "wrap"
    }, D)), A.inputJSONSchema && A.inputJSONSchema.properties && Object.keys(A.inputJSONSchema.properties).length > 0 && E8.default.createElement(v, {
        flexDirection: "column",
        marginTop: 1
    }, E8.default.createElement(T, {
        bold: !0
    }, "Parameters:"), E8.default.createElement(v, {
        marginLeft: 2,
        flexDirection: "column"
    }, Object.entries(A.inputJSONSchema.properties).map(([V, C]) => {
        let H = A.inputJSONSchema?.required?.includes(V);
        return E8.default.createElement(T, {
            key: V
        }, "• ", V, H && E8.default.createElement(T, {
            color: "secondaryText"
        }, " (required)"), ":", " ", E8.default.createElement(T, {
            color: "secondaryText"
        }, typeof C === "object" && C && "type" in C ? String(C.type) : "unknown"), typeof C === "object" && C && "description" in C && E8.default.createElement(T, {
            color: "secondaryText"
        }, " ", "- ", String(C.description)))
    }))))), E8.default.createElement(v, {
        marginLeft: 3
    }, E8.default.createElement(T, {
        dimColor: !0
    }, Z.pending ? E8.default.createElement(E8.default.Fragment, null, "Press ", Z.keyName, " again to exit") : E8.default.createElement(E8.default.Fragment, null, "Esc to go back"))))
}