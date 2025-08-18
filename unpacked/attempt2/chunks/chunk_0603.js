/* chunk:603 bytes:[13872468, 13891859) size:19391 source:unpacked-cli.js */
function Bh1({
    onDone: A
}) {
    MJ.default.useEffect(() => {
        X1("tengu_claude_md_includes_dialog_shown", {})
    }, []);

    function B(Z) {
        let D = UQ();
        if (Z === "no") X1("tengu_claude_md_external_includes_dialog_declined", {}), r5({
            ...D,
            hasClaudeMdExternalIncludesApproved: !1,
            hasClaudeMdExternalIncludesWarningShown: !0
        });
        else X1("tengu_claude_md_external_includes_dialog_accepted", {}), r5({
            ...D,
            hasClaudeMdExternalIncludesApproved: !0,
            hasClaudeMdExternalIncludesWarningShown: !0
        });
        A()
    }
    let Q = U2();
    return DA((Z, D) => {
        if (D.escape) {
            B("no");
            return
        }
    }), MJ.default.createElement(MJ.default.Fragment, null, MJ.default.createElement(v, {
        flexDirection: "column",
        gap: 1,
        padding: 1,
        borderStyle: "round",
        borderColor: "warning"
    }, MJ.default.createElement(T, {
        bold: !0,
        color: "warning"
    }, "Allow external CLAUDE.md file imports?"), MJ.default.createElement(T, null, "This project's CLAUDE.md imports files outside the current working directory. Never allow this for third-party repositories."), MJ.default.createElement(T, {
        dimColor: !0
    }, "Important: Only use Claude Code with files you trust. Accessing untrusted files may pose security risks", " ", MJ.default.createElement(C3, {
        url: "https://docs.anthropic.com/s/claude-code-security"
    }), " "), MJ.default.createElement(uA, {
        options: [{
            label: "Yes, allow external imports",
            value: "yes"
        }, {
            label: "No, disable external imports",
            value: "no"
        }],
        onChange: (Z) => B(Z),
        onCancel: () => B("no")
    })), MJ.default.createElement(v, {
        marginLeft: 3
    }, MJ.default.createElement(T, {
        dimColor: !0
    }, Q.pending ? MJ.default.createElement(MJ.default.Fragment, null, "Press ", Q.keyName, " again to exit") : MJ.default.createElement(MJ.default.Fragment, null, "Enter to confirm · Esc to disable external includes"))))
}
var IH = G1(z1(), 1);
var hd = G1(z1(), 1);
var r$ = G1(z1(), 1);

function Bb({
    title: A,
    children: B,
    onCancel: Q,
    borderColor: Z = "secondaryBorder"
}) {
    let D = U2();
    return DA((G, F) => {
        if (F.escape) {
            Q();
            return
        }
    }), r$.default.createElement(r$.default.Fragment, null, r$.default.createElement(v, {
        flexDirection: "column",
        paddingX: 1,
        paddingBottom: 1,
        borderStyle: "round",
        borderColor: Z,
        gap: 1
    }, r$.default.createElement(T, {
        bold: !0
    }, A), B), r$.default.createElement(v, {
        marginLeft: 3
    }, r$.default.createElement(T, {
        dimColor: !0
    }, D.pending ? r$.default.createElement(r$.default.Fragment, null, "Press ", D.keyName, " again to exit") : r$.default.createElement(r$.default.Fragment, null, "Enter to confirm · Esc to exit"))))
}
var LE8 = "Default",
    ME8 = "Claude completes coding tasks efficiently and provides concise responses";

function ubB(A) {
    return Object.entries(A).map(([B, Q]) => ({
        label: Q?.name ?? LE8,
        value: B,
        description: Q?.description ?? ME8
    }))
}

function Qh1({
    initialStyle: A,
    onComplete: B,
    onCancel: Q
}) {
    let [Z, D] = hd.useState([]), [G, F] = hd.useState(!0);
    hd.useEffect(() => {
        UZ1().then((Y) => {
            let W = ubB(Y);
            D(W), F(!1)
        }).catch(() => {
            let Y = ubB(km);
            D(Y), F(!1)
        })
    }, []);
    let I = hd.useCallback((Y) => {
        B(Y)
    }, [B]);
    return IH.createElement(Bb, {
        title: "Choose your preferred output style:",
        onCancel: Q
    }, IH.createElement(v, {
        flexDirection: "column",
        gap: 1
    }, IH.createElement(T, {
        dimColor: !0
    }, "This changes how Claude Code communicates with you"), IH.createElement(T, {
        dimColor: !0
    }, "Use /output-style:new to create custom output styles"), G ? IH.createElement(T, {
        dimColor: !0
    }, "Loading output styles…") : IH.createElement(uA, {
        options: Z,
        onChange: I,
        onCancel: Q,
        visibleOptionCount: 10,
        defaultValue: A
    })))
}

function mbB({
    onClose: A,
    isConnectedToIde: B,
    isAutocheckpointingAvailable: Q
}) {
    let [Z, D] = fB(), [G, F] = n01.useState(H0()), I = M2.useRef(H0()), Y = GB(), [W, J] = n01.useState(Y?.outputStyle || sV), X = M2.useRef(W), [V, C] = n01.useState(0), K = U2(), [{
        mainLoopModel: H,
        todoFeatureEnabled: z,
        verbose: $
    }, L] = tQ(), [N, R] = n01.useState({}), [O, P] = n01.useState(null), j = SL0();
    async function f(a) {
        X1("tengu_config_model_changed", {
            from_model: H,
            to_model: a
        }), L((y) => ({
            ...y,
            mainLoopModel: a
        })), R((y) => {
            let t = Vg(a);
            if ("model" in y) {
                let {
                    model: E1,
                    ...C1
                } = y;
                return {
                    ...C1,
                    model: t
                }
            }
            return {
                ...y,
                model: t
            }
        })
    }

    function k(a) {
        L((l) => ({
            ...l,
            verbose: a
        })), R((l) => {
            if ("verbose" in l) {
                let {
                    verbose: y,
                    ...t
                } = l;
                return t
            }
            return {
                ...l,
                verbose: a
            }
        })
    }

    function c(a) {
        L((l) => ({
            ...l,
            todoFeatureEnabled: a
        })), R((l) => {
            if ("Todo List Enabled" in l) {
                let {
                    "Todo List Enabled": y,
                    ...t
                } = l;
                return t
            }
            return {
                ...l,
                "Todo List Enabled": a
            }
        })
    }
    let u = [{
        id: "autoCompactEnabled",
        label: "Auto-compact",
        value: G.autoCompactEnabled,
        type: "boolean",
        onChange(a) {
            let l = {
                ...H0(),
                autoCompactEnabled: a
            };
            gA(l), F(l), X1("tengu_auto_compact_setting_changed", {
                enabled: a
            })
        }
    }, {
        id: "todoFeatureEnabled",
        label: "Use todo list",
        value: z,
        type: "boolean",
        onChange: c
    }, ...Q ? [{
        id: "autocheckpointingEnabled",
        label: "Auto-checkpointing",
        value: G.autocheckpointingEnabled,
        type: "boolean",
        onChange(a) {
            let l = {
                ...H0(),
                autocheckpointingEnabled: a
            };
            gA(l), F(l), X1("tengu_autocheckpointing_setting_changed", {
                enabled: a
            }), L((y) => ({
                ...y,
                checkpointing: {
                    ...y.checkpointing,
                    autocheckpointEnabled: Q && H0().autocheckpointingEnabled && !IQ(process.env.CLAUDE_CODE_DISABLE_AUTOCHECKPOINTING)
                }
            }))
        }
    }] : [], {
        id: "verbose",
        label: "Verbose output",
        value: $,
        type: "boolean",
        onChange: k
    }, {
        id: "autoUpdates",
        label: "Auto-updates",
        value: G.autoUpdates !== !1,
        type: "boolean",
        onChange(a) {
            let l = {
                ...H0(),
                autoUpdates: a
            };
            gA(l), F(l)
        }
    }, {
        id: "theme",
        label: "Theme",
        value: Z,
        type: "managedEnum",
        onChange: D
    }, {
        id: "notifChannel",
        label: "Notifications",
        value: G.preferredNotifChannel,
        options: ["auto", "iterm2", "terminal_bell", "iterm2_with_bell", "kitty", "ghostty", "notifications_disabled"],
        type: "enum",
        onChange(a) {
            let l = {
                ...H0(),
                preferredNotifChannel: a
            };
            gA(l), F(l)
        }
    }, {
        id: "outputStyle",
        label: "Output style",
        value: W,
        type: "managedEnum",
        onChange: () => {}
    }, {
        id: "editorMode",
        label: "Editor mode",
        value: G.editorMode === "emacs" ? "normal" : G.editorMode || "normal",
        options: ["normal", "vim"],
        type: "enum",
        onChange(a) {
            let l = {
                ...H0(),
                editorMode: a
            };
            gA(l), F(l), X1("tengu_editor_mode_changed", {
                mode: a,
                source: "config_panel"
            })
        }
    }, {
        id: "model",
        label: "Model",
        value: H === null ? "Default (recommended)" : H,
        type: "managedEnum",
        onChange: f
    }, ...B ? [{
        id: "diffTool",
        label: "Diff tool",
        value: G.diffTool ?? "auto",
        options: ["terminal", "auto"],
        type: "enum",
        onChange(a) {
            let l = {
                ...H0(),
                diffTool: a
            };
            gA(l), F(l), X1("tengu_diff_tool_changed", {
                tool: a,
                source: "config_panel"
            })
        }
    }] : [], ...!fF() ? [{
        id: "autoConnectIde",
        label: "Auto-connect to IDE (external terminal)",
        value: G.autoConnectIde ?? !1,
        type: "boolean",
        onChange(a) {
            let l = {
                ...H0(),
                autoConnectIde: a
            };
            gA(l), F(l), X1("tengu_auto_connect_ide_changed", {
                enabled: a,
                source: "config_panel"
            })
        }
    }] : [], ...fF() ? [{
        id: "autoInstallIdeExtension",
        label: "Auto-install IDE extension",
        value: G.autoInstallIdeExtension ?? !0,
        type: "boolean",
        onChange(a) {
            let l = {
                ...H0(),
                autoInstallIdeExtension: a
            };
            gA(l), F(l), X1("tengu_auto_install_ide_extension_changed", {
                enabled: a,
                source: "config_panel"
            })
        }
    }] : [], ...j ? [{
        id: "showExternalIncludesDialog",
        label: "External CLAUDE.md includes",
        value: (() => {
            if (UQ().hasClaudeMdExternalIncludesApproved) return "true";
            else return "false"
        })(),
        type: "managedEnum",
        onChange() {}
    }] : [], ...process.env.ANTHROPIC_API_KEY ? [{
        id: "apiKey",
        label: `Use custom API key: ${e1.bold(xK(process.env.ANTHROPIC_API_KEY))}`,
        value: Boolean(process.env.ANTHROPIC_API_KEY && G.customApiKeyResponses?.approved?.includes(xK(process.env.ANTHROPIC_API_KEY))),
        type: "boolean",
        onChange(a) {
            let l = {
                ...H0()
            };
            if (!l.customApiKeyResponses) l.customApiKeyResponses = {
                approved: [],
                rejected: []
            };
            if (!l.customApiKeyResponses.approved) l.customApiKeyResponses.approved = [];
            if (!l.customApiKeyResponses.rejected) l.customApiKeyResponses.rejected = [];
            if (process.env.ANTHROPIC_API_KEY) {
                let y = xK(process.env.ANTHROPIC_API_KEY);
                if (a) l.customApiKeyResponses.approved = [...l.customApiKeyResponses.approved.filter((t) => t !== y), y], l.customApiKeyResponses.rejected = l.customApiKeyResponses.rejected.filter((t) => t !== y);
                else l.customApiKeyResponses.approved = l.customApiKeyResponses.approved.filter((t) => t !== y), l.customApiKeyResponses.rejected = [...l.customApiKeyResponses.rejected.filter((t) => t !== y), y]
            }
            gA(l), F(l)
        }
    }] : [], ...[]];
    return DA((a, l) => {
        if (l.escape) {
            if (O !== null) {
                P(null);
                return
            }
            let t = Object.entries(N).map(([_1, F0]) => {
                    return X1("tengu_config_changed", {
                        key: _1,
                        value: F0
                    }), `Set ${_1} to ${e1.bold(F0)}`
                }),
                E1 = Boolean(process.env.ANTHROPIC_API_KEY && I.current.customApiKeyResponses?.approved?.includes(xK(process.env.ANTHROPIC_API_KEY))),
                C1 = Boolean(process.env.ANTHROPIC_API_KEY && G.customApiKeyResponses?.approved?.includes(xK(process.env.ANTHROPIC_API_KEY)));
            if (E1 !== C1) t.push(`${C1?"Enabled":"Disabled"} custom API key`), X1("tengu_config_changed", {
                key: "env.ANTHROPIC_API_KEY",
                value: C1
            });
            if (G.theme !== I.current.theme) t.push(`Set theme to ${e1.bold(G.theme)}`);
            if (G.preferredNotifChannel !== I.current.preferredNotifChannel) t.push(`Set notifications to ${e1.bold(G.preferredNotifChannel)}`);
            if (W !== X.current) t.push(`Set output style to ${e1.bold(W)}`);
            if (G.editorMode !== I.current.editorMode) t.push(`Set editor mode to ${e1.bold(G.editorMode||"emacs")}`);
            if (G.diffTool !== I.current.diffTool) t.push(`Set diff tool to ${e1.bold(G.diffTool)}`);
            if (G.autoConnectIde !== I.current.autoConnectIde) t.push(`${G.autoConnectIde?"Enabled":"Disabled"} auto-connect to IDE`);
            if (G.autoInstallIdeExtension !== I.current.autoInstallIdeExtension) t.push(`${G.autoInstallIdeExtension?"Enabled":"Disabled"} auto-install IDE extension`);
            if (G.autoCompactEnabled !== I.current.autoCompactEnabled) t.push(`${G.autoCompactEnabled?"Enabled":"Disabled"} auto-compact`);
            if (t.length > 0) A(t.join(`
`));
            else A();
            return
        }
        if (O !== null) return;

        function y() {
            let t = u[V];
            if (!t || !t.onChange) return;
            if (t.type === "boolean") {
                t.onChange(!t.value);
                return
            }
            if (t.id === "theme" && l.return) {
                P("theme");
                return
            }
            if (t.id === "model" && l.return) {
                P("model");
                return
            }
            if (t.id === "showExternalIncludesDialog" && l.return) {
                P("externalIncludes");
                return
            }
            if (t.id === "outputStyle" && l.return) {
                P("outputStyle");
                return
            }
            if (t.type === "enum") {
                let C1 = (t.options.indexOf(t.value) + 1) % t.options.length;
                t.onChange(t.options[C1]);
                return
            }
        }
        if (l.tab || l.return || a === " ") {
            y();
            return
        }
        if (l.upArrow) C((t) => Math.max(0, t - 1));
        if (l.downArrow) C((t) => Math.min(u.length - 1, t + 1))
    }), M2.createElement(M2.Fragment, null, O === "theme" ? M2.createElement(ef1, {
        initialTheme: Z,
        onThemeSelect: (a) => {
            D(a), P(null)
        },
        skipExitHandling: !0
    }) : O === "model" ? M2.createElement(Ah1, {
        initial: H,
        onSelect: (a) => {
            f(a), P(null)
        }
    }) : O === "externalIncludes" ? M2.createElement(Bh1, {
        onDone: () => {
            P(null)
        }
    }) : O === "outputStyle" ? M2.createElement(Qh1, {
        initialStyle: W,
        onComplete: (a) => {
            J(a ?? sV), P(null), y6("localSettings", {
                outputStyle: a
            }), X1("tengu_output_style_changed", {
                style: a ?? sV,
                source: "config_panel",
                settings_source: "localSettings"
            })
        },
        onCancel: () => P(null)
    }) : M2.createElement(M2.Fragment, null, M2.createElement(v, {
        flexDirection: "column",
        borderStyle: "round",
        borderColor: "secondaryBorder",
        paddingX: 1,
        marginTop: 1
    }, M2.createElement(v, {
        flexDirection: "column",
        minHeight: 2,
        marginBottom: 1
    }, M2.createElement(T, {
        bold: !0
    }, "Settings"), M2.createElement(T, {
        dimColor: !0
    }, "Configure Claude Code preferences")), u.map((a, l) => {
        let y = l === V;
        return M2.createElement(v, {
            key: a.id,
            height: 2,
            minHeight: 2
        }, M2.createElement(v, {
            width: 44
        }, M2.createElement(T, {
            color: y ? "suggestion" : void 0
        }, y ? s0.pointer : " ", " ", a.label)), M2.createElement(v, null, a.type === "boolean" ? M2.createElement(T, {
            color: y ? "suggestion" : void 0
        }, a.value.toString()) : a.id === "theme" ? M2.createElement(T, {
            color: y ? "suggestion" : void 0
        }, (() => {
            return {
                dark: "Dark mode",
                light: "Light mode",
                "dark-daltonized": "Dark mode (colorblind-friendly)",
                "light-daltonized": "Light mode (colorblind-friendly)",
                "dark-ansi": "Dark mode (ANSI colors only)",
                "light-ansi": "Light mode (ANSI colors only)"
            } [a.value.toString()] || a.value.toString()
        })()) : a.id === "notifChannel" ? M2.createElement(T, {
            color: y ? "suggestion" : void 0
        }, (() => {
            switch (a.value.toString()) {
                case "auto":
                    return "Auto";
                case "iterm2":
                    return M2.createElement(M2.Fragment, null, "iTerm2 ", M2.createElement(T, {
                        dimColor: !0
                    }, "(OSC 9)"));
                case "terminal_bell":
                    return M2.createElement(M2.Fragment, null, "Terminal Bell ", M2.createElement(T, {
                        dimColor: !0
                    }, "(\\a)"));
                case "kitty":
                    return M2.createElement(M2.Fragment, null, "Kitty ", M2.createElement(T, {
                        dimColor: !0
                    }, "(OSC 99)"));
                case "ghostty":
                    return M2.createElement(M2.Fragment, null, "Ghostty ", M2.createElement(T, {
                        dimColor: !0
                    }, "(OSC 777)"));
                case "iterm2_with_bell":
                    return "iTerm2 w/ Bell";
                case "notifications_disabled":
                    return "Disabled";
                default:
                    return a.value.toString()
            }
        })()) : M2.createElement(T, {
            color: y ? "suggestion" : void 0
        }, a.value.toString())))
    })), M2.createElement(v, {
        marginLeft: 3
    }, M2.createElement(T, {
        dimColor: !0
    }, K.pending ? M2.createElement(M2.Fragment, null, "Press ", K.keyName, " again to exit") : M2.createElement(M2.Fragment, null, "↑/↓ to select · Enter/Tab/Space to change · Esc to close")))))
}
var jR0 = G1(z1(), 1);