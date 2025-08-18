/* chunk:619 bytes:[14160887, 14180856) size:19969 source:unpacked-cli.js */
function uuB({
    onCancel: A,
    onSubmit: B,
    ruleBehavior: Q
}) {
    let [Z, D] = guB.useState(""), G = U2();
    DA((W, J) => {
        if (J.escape) A()
    });
    let {
        columns: F
    } = r9(), I = F - 6, Y = (W) => {
        let J = W.trim();
        if (J.length === 0) return;
        let X = CK(J);
        B(X, Q)
    };
    return W5.createElement(W5.Fragment, null, W5.createElement(v, {
        flexDirection: "column",
        gap: 1,
        borderStyle: "round",
        paddingLeft: 1,
        paddingRight: 1,
        borderColor: "permission"
    }, W5.createElement(T, {
        bold: !0,
        color: "permission"
    }, "Add ", Q, " permission rule"), W5.createElement(v, {
        flexDirection: "column"
    }, W5.createElement(T, null, "Permission rules are a tool name, optionally followed by a specifier in parentheses.", W5.createElement(S7, null), "e.g.,", " ", W5.createElement(T, {
        bold: !0
    }, r8({
        toolName: vI.name
    })), W5.createElement(T, {
        bold: !1
    }, " or "), W5.createElement(T, {
        bold: !0
    }, r8({
        toolName: VQ.name,
        ruleContent: "ls:*"
    }))), W5.createElement(v, {
        borderColor: "secondaryBorder",
        borderDimColor: !0,
        borderStyle: "round",
        marginY: 1,
        paddingLeft: 1
    }, W5.createElement(y8, {
        showCursor: !0,
        value: Z,
        onChange: D,
        onSubmit: Y,
        placeholder: `Enter permission rule${s0.ellipsis}`,
        columns: I,
        cursorOffset: Z.length,
        onChangeCursorOffset: () => {}
    })))), W5.createElement(v, {
        marginLeft: 3
    }, G.pending ? W5.createElement(T, {
        dimColor: !0
    }, "Press ", G.keyName, " again to exit") : W5.createElement(T, {
        dimColor: !0
    }, "Enter to submit · Esc to cancel")))
}
var UC = G1(z1(), 1);
var muB = G1(z1(), 1);

function duB({
    onExit: A,
    getToolPermissionContext: B,
    onRequestAddDirectory: Q,
    onRequestRemoveDirectory: Z
}) {
    let D = B(),
        G = UC.useMemo(() => {
            return Array.from(D.additionalWorkingDirectories.keys()).map((Y) => ({
                path: Y,
                isCurrent: !1,
                isDeletable: !0
            }))
        }, [D.additionalWorkingDirectories]),
        F = muB.useCallback((Y) => {
            if (Y === "add-directory") {
                Q();
                return
            }
            let W = G.find((J) => J.path === Y);
            if (W && W.isDeletable) Z(W.path)
        }, [G, Q, Z]),
        I = UC.useMemo(() => {
            let Y = G.map((W) => ({
                label: W.path,
                value: W.path
            }));
            return Y.push({
                label: `Add directory${s0.ellipsis}`,
                value: "add-directory"
            }), Y
        }, [G]);
    return UC.createElement(v, {
        flexDirection: "column",
        marginBottom: 1
    }, UC.createElement(v, {
        flexDirection: "row",
        marginTop: 1,
        marginLeft: 2,
        gap: 1
    }, UC.createElement(T, null, `-  ${_9()}`), UC.createElement(T, {
        dimColor: !0
    }, "(Original working directory)")), UC.createElement(uA, {
        options: I,
        onChange: F,
        onCancel: () => A(),
        visibleOptionCount: Math.min(10, I.length)
    }))
}
var od = G1(z1(), 1);
var OJ = ["allow", "ask", "deny", "workspace"];

function BL8(A) {
    switch (A) {
        case "allow":
            return "Allow";
        case "deny":
            return "Deny";
        case "ask":
            return "Ask";
        case "workspace":
            return "Workspace"
    }
}

function QL8(A) {
    switch (A) {
        case "allow":
            return "Claude Code won't ask before using allowed tools.";
        case "deny":
            return "Claude Code will always reject requests to use denied tools.";
        case "ask":
            return "Claude Code will always ask for confirmation before using these tools.";
        case "workspace":
            return "Claude Code can read files in the workspace, and make edits when auto-accept edits is on."
    }
}

function cuB({
    selectedTab: A
}) {
    return od.default.createElement(od.default.Fragment, null, od.default.createElement(v, {
        flexDirection: "row",
        gap: 1,
        marginBottom: 1
    }, od.default.createElement(T, {
        bold: !0,
        color: "permission"
    }, "Permissions:"), OJ.map((B) => od.default.createElement(T, {
        key: B,
        backgroundColor: A === B ? "permission" : void 0,
        color: A === B ? "inverseText" : void 0,
        bold: A === B
    }, ` ${BL8(B)} `))), od.default.createElement(T, null, QL8(A)))
}
var E7 = G1(z1(), 1);
var CT0 = G1(z1(), 1);

function luB({
    directoryPath: A,
    onRemove: B,
    onCancel: Q,
    permissionContext: Z,
    setPermissionContext: D
}) {
    let G = U2();
    DA((Y, W) => {
        if (W.escape) Q()
    });
    let F = CT0.useCallback(() => {
            let Y = new Map(Z.additionalWorkingDirectories);
            Y.delete(A);
            let W = {
                ...Z,
                additionalWorkingDirectories: Y
            };
            D(W), B()
        }, [A, Z, D, B]),
        I = CT0.useCallback((Y) => {
            if (Y === "yes") F();
            else Q()
        }, [F, Q]);
    return E7.createElement(E7.Fragment, null, E7.createElement(v, {
        flexDirection: "column",
        borderStyle: "round",
        paddingLeft: 1,
        paddingRight: 1,
        borderColor: "error"
    }, E7.createElement(T, {
        bold: !0,
        color: "error"
    }, "Remove directory from workspace?"), E7.createElement(v, {
        marginY: 1,
        marginX: 2,
        flexDirection: "column"
    }, E7.createElement(T, {
        bold: !0
    }, A)), E7.createElement(T, null, "Claude Code will no longer have access to files in this directory."), E7.createElement(v, {
        marginY: 1
    }, E7.createElement(uA, {
        onChange: I,
        onCancel: Q,
        options: [{
            label: "Yes",
            value: "yes"
        }, {
            label: "No",
            value: "no"
        }]
    }))), E7.createElement(v, {
        marginLeft: 3
    }, G.pending ? E7.createElement(T, {
        dimColor: !0
    }, "Press ", G.keyName, " again to exit") : E7.createElement(T, {
        dimColor: !0
    }, "↑/↓ to select · Enter to confirm · Esc to cancel")))
}

function ZL8({
    rule: A
}) {
    return JB.createElement(T, {
        color: "secondaryText"
    }, `From ${i61(A.source)}`)
}

function DL8(A) {
    switch (A) {
        case "allow":
            return "allowed";
        case "deny":
            return "denied";
        case "ask":
            return "ask"
    }
}

function GL8({
    rule: A,
    onDelete: B,
    onCancel: Q
}) {
    let Z = U2();
    DA((F, I) => {
        if (I.escape) Q()
    });
    let D = JB.createElement(v, {
            flexDirection: "column",
            marginX: 2
        }, JB.createElement(T, {
            bold: !0
        }, r8(A.ruleValue)), JB.createElement(Ig1, {
            ruleValue: A.ruleValue
        }), JB.createElement(ZL8, {
            rule: A
        })),
        G = JB.createElement(v, {
            marginLeft: 3
        }, Z.pending ? JB.createElement(T, {
            dimColor: !0
        }, "Press ", Z.keyName, " again to exit") : JB.createElement(T, {
            dimColor: !0
        }, "Esc to cancel"));
    if (A.source === "policySettings") return JB.createElement(JB.Fragment, null, JB.createElement(v, {
        flexDirection: "column",
        gap: 1,
        borderStyle: "round",
        paddingLeft: 1,
        paddingRight: 1,
        borderColor: "permission"
    }, JB.createElement(T, {
        bold: !0,
        color: "permission"
    }, "Rule details"), D, JB.createElement(T, {
        italic: !0
    }, "This rule is configured by managed settings and cannot be modified.", `
`, "Contact your system administrator for more information.")), G);
    return JB.createElement(JB.Fragment, null, JB.createElement(v, {
        flexDirection: "column",
        gap: 1,
        borderStyle: "round",
        paddingLeft: 1,
        paddingRight: 1,
        borderColor: "error"
    }, JB.createElement(T, {
        bold: !0,
        color: "error"
    }, "Delete ", DL8(A.ruleBehavior), " tool?"), D, JB.createElement(T, null, "Are you sure you want to delete this permission rule?"), JB.createElement(uA, {
        onChange: (F) => F === "yes" ? B() : Q(),
        onCancel: Q,
        options: [{
            label: "Yes",
            value: "yes"
        }, {
            label: "No",
            value: "no"
        }]
    })), G)
}

function puB({
    onExit: A,
    getToolPermissionContext: B,
    setToolPermissionContext: Q
}) {
    let [Z, D] = LG.useState([]), [G, F] = LG.useState(B()), I = LG.useCallback((C1) => {
        F(C1), Q(C1)
    }, [Q, F]), [Y, W] = LG.useState("allow"), [J, X] = LG.useState(), [V, C] = LG.useState(!1), [K, H] = LG.useState(null), [z, $] = LG.useState(!1), [L, N] = LG.useState(null), R = LG.useMemo(() => {
        let C1 = new Map;
        return _g(G).forEach((_1) => {
            C1.set(JSON.stringify(_1), _1)
        }), C1
    }, [G]), O = LG.useMemo(() => {
        let C1 = new Map;
        return _s(G).forEach((_1) => {
            C1.set(JSON.stringify(_1), _1)
        }), C1
    }, [G]), P = LG.useMemo(() => {
        let C1 = new Map;
        return qq1(G).forEach((_1) => {
            C1.set(JSON.stringify(_1), _1)
        }), C1
    }, [G]), j = (() => {
        switch (Y) {
            case "allow":
                return R;
            case "deny":
                return O;
            case "ask":
                return P;
            case "workspace":
                return new Map
        }
    })(), f = LG.useMemo(() => {
        let C1 = [];
        if (Y !== "workspace") C1.push({
            label: `Add a new rule${s0.ellipsis}`,
            value: "add-new-rule"
        });
        let _1 = Array.from(j.keys()).sort((F0, W0) => {
            let g1 = j.get(F0),
                w1 = j.get(W0);
            if (g1 && w1) {
                let Q1 = r8(g1.ruleValue).toLowerCase(),
                    k1 = r8(w1.ruleValue).toLowerCase();
                return Q1.localeCompare(k1)
            }
            return 0
        });
        for (let F0 of _1) {
            let W0 = j.get(F0);
            if (W0) C1.push({
                label: r8(W0.ruleValue),
                value: F0
            })
        }
        return C1
    }, [j, Y]), k = U2();
    DA((C1, _1) => {
        if (J || V || K || z || L) return;
        if (_1.tab && !_1.shift) W((F0) => {
            let g1 = (OJ.indexOf(F0) + 1) % OJ.length;
            return OJ[g1]
        });
        else if (_1.tab && _1.shift || _1.leftArrow) W((F0) => {
            let g1 = (OJ.indexOf(F0) - 1 + OJ.length) % OJ.length;
            return OJ[g1]
        });
        else if (_1.rightArrow) W((F0) => {
            let g1 = (OJ.indexOf(F0) + 1) % OJ.length;
            return OJ[g1]
        })
    });
    let c = LG.useCallback((C1) => {
            if (C1 === "add-new-rule") {
                C(!0);
                return
            } else {
                X(j.get(C1));
                return
            }
        }, [X, j]),
        u = LG.useCallback(() => {
            C(!1)
        }, []),
        a = LG.useCallback((C1, _1) => {
            H({
                ruleValue: C1,
                ruleBehavior: _1
            }), C(!1)
        }, []),
        l = LG.useCallback((C1) => {
            H(null);
            for (let _1 of C1) D((F0) => [...F0, `Added ${_1.ruleBehavior} rule ${e1.bold(r8(_1.ruleValue))}`])
        }, []),
        y = LG.useCallback(() => {
            H(null)
        }, []),
        t = () => {
            if (!J) return;
            peA({
                rule: J,
                initialContext: G,
                setToolPermissionContext: I
            }), D((C1) => [...C1, `Deleted ${J.ruleBehavior} rule ${e1.bold(r8(J.ruleValue))}`]), X(void 0)
        };
    if (J) return JB.createElement(GL8, {
        rule: J,
        onDelete: t,
        onCancel: () => X(void 0)
    });
    if (V && Y !== "workspace") return JB.createElement(uuB, {
        onCancel: u,
        onSubmit: a,
        ruleBehavior: Y
    });
    if (K) return JB.createElement(huB, {
        onAddRules: l,
        onCancel: y,
        ruleValues: [K.ruleValue],
        ruleBehavior: K.ruleBehavior,
        initialContext: G,
        setToolPermissionContext: I
    });
    if (z) return JB.createElement(nj1, {
        onAddDirectory: (C1) => {
            D((_1) => [..._1, `Added directory ${e1.bold(C1)} to workspace`]), $(!1)
        },
        onCancel: () => $(!1),
        permissionContext: G,
        setPermissionContext: I
    });
    if (L) return JB.createElement(luB, {
        directoryPath: L,
        onRemove: () => {
            D((C1) => [...C1, `Removed directory ${e1.bold(L)} from workspace`]), N(null)
        },
        onCancel: () => N(null),
        permissionContext: G,
        setPermissionContext: I
    });

    function E1() {
        if (Y === "workspace") return JB.createElement(duB, {
            onExit: A,
            getToolPermissionContext: () => G,
            onRequestAddDirectory: () => $(!0),
            onRequestRemoveDirectory: (C1) => N(C1)
        });
        return JB.createElement(v, {
            marginY: 1
        }, JB.createElement(uA, {
            options: f,
            onChange: c,
            onCancel: () => {
                if (Z.length > 0) A(Z.join(`
`));
                else A()
            },
            visibleOptionCount: Math.min(10, f.length)
        }))
    }
    return JB.createElement(JB.Fragment, null, JB.createElement(v, {
        flexDirection: "column",
        borderStyle: "round",
        paddingLeft: 1,
        paddingRight: 1,
        borderColor: "permission"
    }, JB.createElement(cuB, {
        selectedTab: Y
    }), E1()), JB.createElement(v, {
        marginLeft: 3
    }, k.pending ? JB.createElement(T, {
        dimColor: !0
    }, "Press ", k.keyName, " again to exit") : JB.createElement(T, {
        dimColor: !0
    }, "Tab to select tab · Enter to confirm · Esc to cancel")))
}
var FL8 = {
        type: "local-jsx",
        name: "permissions",
        aliases: ["allowed-tools"],
        description: "Manage allow & deny tool permission rules",
        isEnabled: () => !0,
        isHidden: !1,
        async call(A, B) {
            return KT0.createElement(puB, {
                onExit: A,
                getToolPermissionContext: B.getToolPermissionContext,
                setToolPermissionContext: B.setToolPermissionContext
            })
        },
        userFacingName() {
            return "permissions"
        }
    },
    iuB = FL8;
var NT0 = G1(z1(), 1);
var c9 = G1(z1(), 1);
var lI = G1(z1(), 1);

function nuB() {
    let A = [],
        B = ["userSettings", "projectSettings", "localSettings"];
    for (let Q of B) {
        let Z = _Y(Q);
        if (!Z?.hooks) continue;
        for (let [D, G] of Object.entries(Z.hooks))
            for (let F of G)
                for (let I of F.hooks) A.push({
                    event: D,
                    config: I,
                    matcher: F.matcher,
                    source: Q
                })
    }
    return A
}
async function auB(A, B, Q = "", Z = "userSettings") {
    let G = (_Y(Z) ?? {}).hooks ?? {},
        F = G[A] ?? [],
        I = F.findIndex((X) => X.matcher === Q),
        Y;
    if (I >= 0) {
        Y = [...F];
        let X = Y[I];
        Y[I] = {
            matcher: X.matcher,
            hooks: [...X.hooks, B]
        }
    } else Y = [...F, {
        matcher: Q,
        hooks: [B]
    }];
    let W = {
            ...G,
            [A]: Y
        },
        {
            error: J
        } = y6(Z, {
            hooks: W
        });
    if (J) throw new Error(J.message);
    JF1()
}
async function suB(A) {
    let Q = (_Y(A.source) ?? {}).hooks ?? {},
        D = (Q[A.event] ?? []).map((F) => {
            if (F.matcher === A.matcher) {
                let I = F.hooks.filter((Y) => Y.command !== A.config.command);
                return I.length > 0 ? {
                    ...F,
                    hooks: I
                } : null
            }
            return F
        }).filter((F) => F !== null),
        G = {
            ...Q,
            [A.event]: D
        };
    if (G[A.event]?.length === 0) delete G[A.event];
    y6(A.source, {
        hooks: Object.keys(G).length > 0 ? G : void 0
    }), JF1()
}

function ruB(A) {
    switch (A) {
        case "userSettings":
            return "User settings (~/.claude/settings.json)";
        case "projectSettings":
            return "Project settings (.claude/settings.json)";
        case "localSettings":
            return "Local settings (.claude/settings.local.json)"
    }
}

function ouB(A) {
    switch (A) {
        case "userSettings":
            return "User Settings";
        case "projectSettings":
            return "Project Settings";
        case "localSettings":
            return "Local Settings"
    }
}

function tuB(A) {
    switch (A) {
        case "userSettings":
            return "User";
        case "projectSettings":
            return "Project";
        case "localSettings":
            return "Local"
    }
}

function euB(A, B, Q) {
    let Z = LA1.reduce((D, G, F) => {
        return D[G] = F, D
    }, {});
    return [...A].sort((D, G) => {
        let F = B[Q]?.[D] || [],
            I = B[Q]?.[G] || [],
            Y = Array.from(new Set(F.map((V) => V.source))),
            W = Array.from(new Set(I.map((V) => V.source))),
            J = Math.min(...Y.map((V) => Z[V])),
            X = Math.min(...W.map((V) => Z[V]));
        if (J !== X) return J - X;
        return D.localeCompare(G)
    })
}
var g8 = G1(z1(), 1);
var HT0 = G1(z1(), 1);

function AmB({
    event: A,
    eventSummary: B,
    config: Q,
    matcher: Z,
    onSuccess: D,
    onCancel: G
}) {
    let [F, I] = HT0.useState(!1), [Y, W] = HT0.useState(null), J = LA1.map(VT0), X = async (V) => {
        I(!0), W(null);
        try {
            await auB(A, Q, Z, V), D()
        } catch (C) {
            W(C instanceof Error ? C.message : "Failed to add hook"), I(!1)
        }
    };
    if (F) return g8.createElement(v, {
        flexDirection: "column",
        gap: 1
    }, g8.createElement(v, {
        flexDirection: "row",
        gap: 1
    }, g8.createElement(g6, null), g8.createElement(T, null, "Adding hook configuration...")));
    if (Y) return g8.createElement(v, {
        flexDirection: "column",
        gap: 1,
        borderStyle: "round",
        paddingLeft: 1,
        paddingRight: 1,
        borderColor: "error"
    }, g8.createElement(T, {
        bold: !0,
        color: "error"
    }, "Failed to add hook"), g8.createElement(T, null, Y), g8.createElement(uA, {
        options: [{
            label: "OK",
            value: "ok"
        }],
        onChange: G,
        onCancel: G
    }));
    return g8.createElement(v, {
        flexDirection: "column",
        gap: 1,
        borderStyle: "round",
        paddingLeft: 1,
        paddingRight: 1,
        borderColor: "success"
    }, g8.createElement(T, {
        bold: !0,
        color: "success"
    }, "Save hook configuration"), g8.createElement(v, {
        flexDirection: "column",
        marginX: 2
    }, g8.createElement(T, null, "Event: ", A, " - ", B), g8.createElement(T, null, "Matcher: ", Z), g8.createElement(T, null, "Command: ", Q.command)), g8.createElement(T, null, "Where should this hook be saved?"), g8.createElement(uA, {
        options: J,
        onChange: (V) => X(V),
        onCancel: G,
        visibleOptionCount: 3
    }))
}
var m2 = G1(z1(), 1);