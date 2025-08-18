/* chunk:635 bytes:[14446268, 14464890) size:18622 source:unpacked-cli.js */
function fT0(A) {
    let [B] = fB(), Q = TdB({
        value: A.value,
        onChange: A.onChange,
        onSubmit: A.onSubmit,
        onExit: A.onExit,
        onExitMessage: A.onExitMessage,
        onMessage: A.onMessage,
        onHistoryReset: A.onHistoryReset,
        onHistoryUp: A.onHistoryUp,
        onHistoryDown: A.onHistoryDown,
        focus: A.focus,
        mask: A.mask,
        multiline: A.multiline,
        cursorChar: A.showCursor ? " " : "",
        highlightPastedText: A.highlightPastedText,
        invert: e1.inverse,
        themeText: pB("text", B),
        columns: A.columns,
        onImagePaste: A.onImagePaste,
        disableCursorMovementForUpDownKeys: A.disableCursorMovementForUpDownKeys,
        externalOffset: A.cursorOffset,
        onOffsetChange: A.onChangeCursorOffset,
        onModeChange: A.onModeChange,
        isMessageLoading: A.isLoading,
        onUndo: A.onUndo
    }), {
        mode: Z,
        setMode: D
    } = Q;
    return yg1.default.useEffect(() => {
        if (A.initialMode && A.initialMode !== Z) D(A.initialMode)
    }, [A.initialMode, Z, D]), yg1.default.createElement(v, {
        flexDirection: "column"
    }, yg1.default.createElement(ij1, {
        inputState: Q,
        terminalFocus: !0,
        ...A
    }))
}

function SA1() {
    return H0().editorMode === "vim"
}

function PdB() {
    if (TM.isEnabled() && sA.terminal === "Apple_Terminal" && A5B()) return "option + ⏎ for newline";
    if (TM.isEnabled() && e8B()) return "shift + ⏎ for newline";
    return B5B() ? "\\⏎ for newline" : "backslash (\\) + return (⏎) for newline"
}
var eZ = G1(z1(), 1);

function SdB(A) {
    switch (A.mode) {
        case "default":
            return "acceptEdits";
        case "acceptEdits":
            return "plan";
        case "plan":
            return A.isBypassPermissionsModeAvailable ? "bypassPermissions" : "default";
        case "bypassPermissions":
            return "default"
    }
}
var uB = G1(z1(), 1),
    tdB = G1(z1(), 1);
var t9 = G1(z1(), 1);

function kdB({
    exitMessage: A,
    vimMode: B,
    mode: Q,
    notification: Z,
    toolPermissionContext: D,
    suppressHint: G,
    shellsSelected: F,
    isPasting: I
}) {
    if (A.show) return t9.createElement(T, {
        dimColor: !0,
        key: "exit-message"
    }, "Press ", A.key, " again to exit");
    if (I) return t9.createElement(T, {
        dimColor: !0,
        key: "pasting-message"
    }, "Pasting text…");
    if (Z.show && Z.content)
        if ("jsx" in Z.content) return t9.createElement(v, {
            key: "notification-content",
            flexGrow: 1
        }, Z.content.jsx);
        else return t9.createElement(T, {
            color: Z.content.color,
            dimColor: !Z.content.color,
            key: "notification"
        }, Z.content.text);
    let Y = SA1() && B === "INSERT";
    return t9.createElement(v, {
        justifyContent: "flex-start",
        gap: 1
    }, Y ? t9.createElement(T, {
        dimColor: !0,
        key: "vim-insert"
    }, "-- INSERT --") : null, t9.createElement(CR8, {
        mode: Q,
        toolPermissionContext: D,
        showHint: !G && !Y,
        shellsSelected: F
    }))
}

function jdB({
    runningShellCount: A,
    shellsSelected: B,
    showHint: Q,
    hasSeenShellsHint: Z = !1
}) {
    return t9.createElement(t9.Fragment, null, t9.createElement(T, {
        color: B ? "text" : "permission",
        inverse: B,
        bold: B
    }, B ? " " : "", A, " ", A === 1 ? "bash" : "bashes", " ", "running", B ? " " : ""), Q && t9.createElement(t9.Fragment, null, t9.createElement(T, {
        dimColor: !0
    }, "·"), t9.createElement(T, {
        dimColor: !0
    }, B ? "Enter to view shells" : !Z ? "↓ to view" : "? for shortcuts")))
}

function CR8({
    mode: A,
    toolPermissionContext: B,
    showHint: Q,
    shellsSelected: Z = !1
}) {
    let {
        shells: D
    } = $A1(), G = D.filter((W) => W.status === "running").length;
    if (A === "memory") return t9.createElement(T, {
        color: "remember"
    }, "# to memorize");
    if (A === "bash") return t9.createElement(T, {
        color: "bashBorder"
    }, "! for bash mode");
    let F = B?.mode,
        I = !K40(F),
        Y = G > 0;
    if (I && Y) {
        let W = H0().hasSeenTasksHint;
        return t9.createElement(v, {
            gap: 1
        }, F && t9.createElement(T, {
            color: p61(F),
            key: "mode-indicator"
        }, H40(F), " ", ceA(F).toLowerCase()), t9.createElement(T, {
            dimColor: !0
        }, "·"), t9.createElement(jdB, {
            runningShellCount: G,
            shellsSelected: Z,
            showHint: Q,
            hasSeenShellsHint: W
        }))
    }
    if (F && !K40(F)) return t9.createElement(T, {
        color: p61(F),
        key: "mode-active"
    }, H40(F), " ", ys(F).toLowerCase(), " on", t9.createElement(T, {
        color: "secondaryText",
        dimColor: !0
    }, " ", "(", ZH.displayText, " to cycle)"));
    if (Y) {
        let W = H0().hasSeenTasksHint;
        return t9.createElement(v, {
            gap: 1
        }, t9.createElement(jdB, {
            runningShellCount: G,
            shellsSelected: Z,
            showHint: Q,
            hasSeenShellsHint: W
        }))
    }
    if (!Q) return null;
    return t9.createElement(T, {
        dimColor: !0
    }, "? for shortcuts")
}
var Z4 = G1(z1(), 1);
var Zc = G1(z1(), 1);
var U8 = G1(z1(), 1),
    xdB = G1(ax(), 1),
    xg1 = G1(z1(), 1);
var _dB = G1(z1(), 1),
    jA1 = G1(ax(), 1);

function ydB(A) {
    return `${jA1.major(A,{loose:!0})}.${jA1.minor(A,{loose:!0})}.${jA1.patch(A,{loose:!0})}`
}

function _g1(A, B = {
    ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
    PACKAGE_URL: "@anthropic-ai/claude-code",
    README_URL: "https://docs.anthropic.com/s/claude-code",
    VERSION: "1.0.83"
}.VERSION) {
    let [Q, Z] = _dB.useState(() => ydB(B));
    if (!A) return null;
    let D = ydB(A);
    if (D !== Q) return Z(D), D;
    return null
}

function vdB({
    isUpdating: A,
    onChangeIsUpdating: B,
    onAutoUpdaterResult: Q,
    autoUpdaterResult: Z,
    showSuccessMessage: D,
    verbose: G
}) {
    let [F, I] = xg1.useState({}), Y = _g1(Z?.version), W = U8.useCallback(async () => {
        let J = H0();
        if (A) return;
        let X = {
                ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
                PACKAGE_URL: "@anthropic-ai/claude-code",
                README_URL: "https://docs.anthropic.com/s/claude-code",
                VERSION: "1.0.83"
            }.VERSION,
            V = await Tv1(),
            C = xo();
        if (I({
                global: X,
                latest: V
            }), !C && X && V && !xdB.gte(X, V, {
                loose: !0
            })) {
            let K = Date.now();
            B(!0), Dg1();
            let H = await zG1();
            if (n1(`AutoUpdater: Detected installation type: ${H}`), H === "development") {
                n1("AutoUpdater: Cannot auto-update development build"), B(!1);
                return
            }
            let z, $;
            if (H === "npm-local") n1("AutoUpdater: Using local update method"), $ = "local", z = await Qd();
            else if (H === "npm-global") n1("AutoUpdater: Using global update method"), $ = "global", z = await HG1();
            else if (H === "native") {
                n1("AutoUpdater: Unexpected native installation in non-native updater"), B(!1);
                return
            } else {
                n1("AutoUpdater: Unknown installation type, falling back to config");
                let L = J.installMethod === "local";
                if ($ = L ? "local" : "global", L) z = await Qd();
                else z = await HG1()
            }
            if (B(!1), z === "success") X1("tengu_auto_updater_success", {
                fromVersion: X,
                toVersion: V,
                durationMs: Date.now() - K,
                wasMigrated: $ === "local",
                installationType: H
            });
            else X1("tengu_auto_updater_fail", {
                fromVersion: X,
                attemptedVersion: V,
                status: z,
                durationMs: Date.now() - K,
                wasMigrated: $ === "local",
                installationType: H
            });
            Q({
                version: V,
                status: z
            })
        }
    }, [Q]);
    if (xg1.useEffect(() => {
            W()
        }, [W]), cK(W, 1800000), !Z?.version && (!F.global || !F.latest)) return null;
    if (!Z?.version && !A) return null;
    return U8.createElement(v, {
        flexDirection: "row",
        gap: 1
    }, G && U8.createElement(T, {
        dimColor: !0
    }, "globalVersion: ", F.global, " · latestVersion:", " ", F.latest), A ? U8.createElement(U8.Fragment, null, U8.createElement(v, null, U8.createElement(T, {
        color: "text",
        dimColor: !0,
        wrap: "end"
    }, "Auto-updating…"))) : Z?.status === "success" && D && Y && U8.createElement(T, {
        color: "success"
    }, "✓ Update installed · Restart to apply"), (Z?.status === "install_failed" || Z?.status === "no_permissions") && U8.createElement(T, {
        color: "error"
    }, "✗ Auto-update failed · Try ", U8.createElement(T, {
        bold: !0
    }, "claude doctor"), !Rv() && U8.createElement(U8.Fragment, null, " ", "or ", U8.createElement(T, {
        bold: !0
    }, "npm i -g ", {
        ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
        PACKAGE_URL: "@anthropic-ai/claude-code",
        README_URL: "https://docs.anthropic.com/s/claude-code",
        VERSION: "1.0.83"
    }.PACKAGE_URL)), Rv() && U8.createElement(U8.Fragment, null, " ", "or", " ", U8.createElement(T, {
        bold: !0
    }, "cd ~/.claude/local && npm update ", {
        ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
        PACKAGE_URL: "@anthropic-ai/claude-code",
        README_URL: "https://docs.anthropic.com/s/claude-code",
        VERSION: "1.0.83"
    }.PACKAGE_URL))))
}
var aF = G1(z1(), 1),
    vg1 = G1(z1(), 1);

function bdB({
    isUpdating: A,
    onChangeIsUpdating: B,
    onAutoUpdaterResult: Q,
    autoUpdaterResult: Z,
    showSuccessMessage: D,
    verbose: G
}) {
    let [F, I] = vg1.useState({}), Y = _g1(Z?.version), W = aF.useRef(!1), J = aF.useCallback(async () => {
        if (A || xo()) return;
        B(!0);
        try {
            let X = await UA1(),
                V = {
                    ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
                    PACKAGE_URL: "@anthropic-ai/claude-code",
                    README_URL: "https://docs.anthropic.com/s/claude-code",
                    VERSION: "1.0.83"
                }.VERSION;
            if (I({
                    current: V,
                    latest: X.latestVersion
                }), X.wasUpdated) X1("tengu_native_auto_updater_success", {}), Q({
                version: X.latestVersion,
                status: "success"
            })
        } catch (X) {
            R1(X instanceof Error ? X : new Error(String(X))), X1("tengu_native_auto_updater_fail", {}), Q({
                version: null,
                status: "install_failed"
            })
        } finally {
            B(!1)
        }
    }, [A, B, Q]);
    if (vg1.useEffect(() => {
            if (!W.current) W.current = !0, J()
        }), cK(J, 1800000), !Z?.version && (!F.current || !F.latest)) return null;
    if (!Z?.version && !A) return null;
    return aF.createElement(v, {
        flexDirection: "row",
        gap: 1
    }, G && aF.createElement(T, {
        dimColor: !0
    }, "current: ", F.current, " · latest: ", F.latest), A ? aF.createElement(v, null, aF.createElement(T, {
        color: "secondaryText",
        dimColor: !0,
        wrap: "end"
    }, "Checking for updates")) : Z?.status === "success" && D && Y && aF.createElement(T, {
        color: "success"
    }, "✓ Update installed · Restart to update"), Z?.status === "install_failed" && aF.createElement(T, {
        color: "error"
    }, "✗ Auto-update failed · Try ", aF.createElement(T, {
        bold: !0
    }, "/status")))
}

function fdB({
    isUpdating: A,
    onChangeIsUpdating: B,
    onAutoUpdaterResult: Q,
    autoUpdaterResult: Z,
    showSuccessMessage: D,
    verbose: G
}) {
    let [F, I] = Zc.useState(null);
    if (Zc.useEffect(() => {
            zG1().then((W) => {
                let J = W === "native";
                n1(`AutoUpdaterWrapper: Installation type: ${W}, using native: ${J}`), I(J)
            })
        }, [I]), F === null) return null;
    return Zc.createElement(F ? bdB : vdB, {
        verbose: G,
        onAutoUpdaterResult: Q,
        autoUpdaterResult: Z,
        isUpdating: A,
        onChangeIsUpdating: B,
        showSuccessMessage: D
    })
}
var hdB = G1(z1(), 1);
class hT0 extends hdB.Component {
    constructor(A) {
        super(A);
        this.state = {
            hasError: !1
        }
    }
    static getDerivedStateFromError() {
        return {
            hasError: !0
        }
    }
    componentDidCatch(A) {
        MR1(A)
    }
    render() {
        if (this.state.hasError) return null;
        return this.props.children
    }
}
var wC = G1(z1(), 1);

function gdB({
    tokenUsage: A
}) {
    let {
        percentLeft: B,
        isAboveWarningThreshold: Q,
        isAboveErrorThreshold: Z
    } = fS(A), D = fbB();
    if (!Q || D) return null;
    let G = fd();
    return wC.createElement(v, {
        flexDirection: "row"
    }, wC.createElement(T, {
        color: H0().autoCompactEnabled ? "secondaryText" : Z ? "error" : "warning"
    }, G ? wC.createElement(wC.Fragment, null, "Context left until auto-compact: ", B, "%") : wC.createElement(wC.Fragment, null, "Context low (", B, "% remaining) · Run /compact to compact & continue")))
}

function udB(A) {
    return fS(A).isAboveWarningThreshold
}
var M3 = G1(z1(), 1),
    Mb = G1(z1(), 1);
import {
    basename as KR8
} from "path";
var mdB = G1(z1(), 1);

function bg1(A) {
    return mdB.useMemo(() => {
        let B = A?.find((Q) => Q.name === "ide");
        if (!B) return null;
        return B.type === "connected" ? "connected" : "disconnected"
    }, [A])
}
var ddB = !1;

function cdB({
    ideSelection: A,
    mcpClients: B,
    ideInstallationStatus: Q
}) {
    let Z = bg1(B),
        [D, G] = Mb.useState(!0),
        [F, I] = Mb.useState(void 0);
    Mb.useEffect(() => {
        if (Z === "connected") {
            let H = setTimeout(() => {
                G(!1)
            }, 1000);
            return () => clearTimeout(H)
        } else if (Z === "disconnected") G(!0)
    }, [Z]);
    let [Y, W] = Mb.useState(!1), J = Q ? mE(Q?.ideType) : !1;
    Mb.useEffect(() => {
        if (Q?.error || J) {
            W(!0);
            let H = setTimeout(() => {
                W(!1)
            }, 5000);
            return () => clearTimeout(H)
        }
    }, [Q?.error, J]);
    let X = Z === "connected" && (A?.filePath || A?.text && A.lineCount > 0),
        V = Z === "connected" && !X,
        C = Y && !J && !V && !X,
        K = Y && J && !V && !X;
    return Mb.useEffect(() => {
        if (!fF() && Z === null && !ddB) {
            let H;
            return zD1(!0).then((z) => {
                if (z.length > 0) {
                    let $ = z[0]?.name;
                    I(HR8($)), H = setTimeout(() => {
                        I(void 0)
                    }, 3000), ddB = !0
                }
            }), () => H && clearTimeout(H)
        }
    }, [Z]), Z !== null ? M3.createElement(M3.Fragment, null, !C && Z === "disconnected" && M3.createElement(T, {
        color: "error",
        key: "ide-status"
    }, s0.circle, " IDE disconnected"), V && M3.createElement(T, {
        color: "ide",
        key: "ide-status"
    }, s0.circle, D && " IDE connected"), C && M3.createElement(T, {
        color: "error"
    }, "IDE extension install failed (see /status for info)"), K && M3.createElement(T, {
        color: "secondaryText"
    }, "IDE plugin not connected (see /status for info)"), X && A?.text && A.lineCount > 0 ? M3.createElement(T, {
        color: "ide",
        key: "selection-indicator"
    }, "⧉ ", A.lineCount, " ", A.lineCount === 1 ? "line" : "lines", " selected") : X && A?.filePath ? M3.createElement(T, {
        color: "ide",
        key: "selection-indicator"
    }, "⧉ In ", KR8(A.filePath)) : null) : M3.createElement(M3.Fragment, null, F && !K && M3.createElement(T, {
        color: "text",
        key: "ide-command-hint"
    }, s0.circle, " /ide for ", M3.createElement(T, {
        color: "ide"
    }, F)), K && M3.createElement(T, {
        color: "secondaryText"
    }, "IDE plugin not connected (see /status for info)"))
}

function HR8(A) {
    if (A === "Visual Studio Code") return "VS Code";
    return A
}
import {
    basename as wR8
} from "path";
var fI1 = G1(z1(), 1);
var ldB = G1(z1(), 1);
var zR8 = 2147483648,
    ER8 = 2684354560;

function pdB() {
    let [A, B] = ldB.useState(null);

    function Q() {
        return
    }
    return cK(Q, 1e4), A
}

function idB() {
    let A = pdB();
    return null
}
var Gq = G1(z1(), 1),
    fg1 = G1(z1(), 1),
    UR8 = 5000;

function ndB({
    mcpClients: A = []
}) {
    let [B, Q] = fg1.useState(!0), Z = A.filter((F) => F.type === "failed" && F.config.type !== "sse-ide" && F.config.type !== "ws-ide"), D = A.filter((F) => F.type === "needs-auth"), G = Z.length > 0 || D.length > 0;
    if (fg1.useEffect(() => {
            if (G) {
                Q(!0);
                let F = setTimeout(() => {
                    Q(!1)
                }, UR8);
                return () => clearTimeout(F)
            } else Q(!1)
        }, [G]), !G || !B) return null;
    return Gq.createElement(v, {
        gap: 1
    }, Z.length > 0 && Gq.createElement(T, {
        color: "error"
    }, Z.length, " MCP", " ", Z.length === 1 ? "server" : "servers", " failed ·", " ", Gq.createElement(T, {
        dimColor: !0
    }, "/mcp for info")), D.length > 0 && Z.length === 0 && Gq.createElement(T, {
        color: "warning"
    }, D.length, " MCP", " ", D.length === 1 ? "server needs" : "servers need", " ", "auth · ", Gq.createElement(T, {
        dimColor: !0
    }, "/mcp for info")))
}
var adB = G1(z1(), 1);