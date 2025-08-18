/* chunk:539 bytes:[12669728, 12689519) size:19791 source:unpacked-cli.js */
var no4 = (A, B) => {
        switch (B.type) {
            case "focus-next-option": {
                if (!A.focusedValue) return A;
                let Q = A.optionMap.get(A.focusedValue);
                if (!Q) return A;
                let Z = Q.next;
                if (!Z) return A;
                if (!(Z.index >= A.visibleToIndex)) return {
                    ...A,
                    focusedValue: Z.value
                };
                let G = Math.min(A.optionMap.size, A.visibleToIndex + 1),
                    F = G - A.visibleOptionCount;
                return {
                    ...A,
                    focusedValue: Z.value,
                    visibleFromIndex: F,
                    visibleToIndex: G
                }
            }
            case "focus-previous-option": {
                if (!A.focusedValue) return A;
                let Q = A.optionMap.get(A.focusedValue);
                if (!Q) return A;
                let Z = Q.previous;
                if (!Z) return A;
                if (!(Z.index <= A.visibleFromIndex)) return {
                    ...A,
                    focusedValue: Z.value
                };
                let G = Math.max(0, A.visibleFromIndex - 1),
                    F = G + A.visibleOptionCount;
                return {
                    ...A,
                    focusedValue: Z.value,
                    visibleFromIndex: G,
                    visibleToIndex: F
                }
            }
            case "select-focused-option":
                return {
                    ...A, value: A.focusedValue
                };
            case "reset":
                return B.state;
            case "set-focus":
                return {
                    ...A, focusedValue: B.value
                }
        }
    },
    cO2 = ({
        visibleOptionCount: A,
        defaultValue: B,
        options: Q,
        initialFocusValue: Z
    }) => {
        let D = typeof A === "number" ? Math.min(A, Q.length) : Q.length,
            G = new FT1(Q);
        return {
            optionMap: G,
            visibleOptionCount: D,
            focusedValue: Z || G.first?.value,
            visibleFromIndex: 0,
            visibleToIndex: D,
            value: B
        }
    },
    lO2 = ({
        visibleOptionCount: A = 5,
        options: B,
        defaultValue: Q,
        onChange: Z,
        onCancel: D,
        onFocus: G,
        focusValue: F
    }) => {
        let [I, Y] = fK.useReducer(no4, {
            visibleOptionCount: A,
            defaultValue: Q,
            options: B,
            initialFocusValue: F
        }, cO2), [W, J] = fK.useState(B);
        if (B !== W && !io4(B, W)) Y({
            type: "reset",
            state: cO2({
                visibleOptionCount: A,
                defaultValue: I.value || Q,
                options: B,
                initialFocusValue: I.focusedValue || F
            })
        }), J(B);
        let X = fK.useCallback(() => {
                Y({
                    type: "focus-next-option"
                })
            }, []),
            V = fK.useCallback(() => {
                Y({
                    type: "focus-previous-option"
                })
            }, []),
            C = fK.useCallback(() => {
                Y({
                    type: "select-focused-option"
                })
            }, []),
            K = fK.useMemo(() => {
                return B.map((H, z) => ({
                    ...H,
                    index: z
                })).slice(I.visibleFromIndex, I.visibleToIndex)
            }, [B, I.visibleFromIndex, I.visibleToIndex]);
        return fK.useEffect(() => {
            if (I.focusedValue) G?.(I.focusedValue)
        }, [I.focusedValue, G]), fK.useEffect(() => {
            if (F) Y({
                type: "set-focus",
                value: F
            })
        }, [F]), {
            focusedValue: I.focusedValue,
            visibleFromIndex: I.visibleFromIndex,
            visibleToIndex: I.visibleToIndex,
            value: I.value,
            visibleOptions: K,
            focusNextOption: X,
            focusPreviousOption: V,
            selectFocusedOption: C,
            onChange: Z,
            onCancel: D,
            options: B
        }
    };
var pO2 = ({
    isDisabled: A = !1,
    state: B
}) => {
    DA((Q, Z) => {
        if (Z.downArrow || Z.ctrl && Q === "n" || !Z.ctrl && !Z.shift && Q === "j") B.focusNextOption();
        if (Z.upArrow || Z.ctrl && Q === "p" || !Z.ctrl && !Z.shift && Q === "k") B.focusPreviousOption();
        if (Z.return && B.focusedValue) B.selectFocusedOption?.(), B.onChange?.(B.focusedValue);
        if (/^[0-9]+$/.test(Q)) {
            let D = parseInt(Q) - 1;
            if (D >= 0 && D < B.options.length) {
                B.onChange?.(B.options[D].value);
                return
            }
        }
        if (Z.escape) B.onCancel?.()
    }, {
        isActive: !A
    })
};

function uA({
    isDisabled: A = !1,
    visibleOptionCount: B = 5,
    highlightText: Q,
    options: Z,
    defaultValue: D,
    onCancel: G,
    onChange: F,
    onFocus: I,
    focusValue: Y
}) {
    let W = lO2({
        visibleOptionCount: B,
        options: Z,
        defaultValue: D,
        onChange: F,
        onCancel: G,
        onFocus: I,
        focusValue: Y
    });
    pO2({
        isDisabled: A,
        state: W
    });
    let {
        styles: J
    } = o5("Select"), X = W.options.length.toString().length, V = Math.max(...W.options.map((C) => {
        return `${(W.options.findIndex((z)=>z.value===C.value)+1).toString()}.`.padEnd(X).length + C.label.length
    }));
    return fu.default.createElement(v, {
        ...J.container()
    }, W.visibleOptions.map((C, K) => {
        let H = C.label,
            z = H;
        if (Q && H.includes(Q)) {
            let c = H.indexOf(Q);
            z = fu.default.createElement(fu.default.Fragment, null, H.slice(0, c), fu.default.createElement(T, {
                ...J.highlightedText()
            }, Q), H.slice(c + Q.length))
        }
        let $ = C.index === W.visibleFromIndex,
            L = C.index === W.visibleToIndex - 1,
            N = W.visibleToIndex < Z.length,
            R = W.visibleFromIndex > 0,
            P = `${W.visibleFromIndex+K+1}.`.padEnd(X),
            j = P.length + H.length,
            f = V + 2 - j,
            k = Math.max(2, f);
        return fu.default.createElement(dO2, {
            key: C.value,
            isFocused: !A && W.focusedValue === C.value,
            isSelected: W.value === C.value,
            shouldShowDownArrow: N && L,
            shouldShowUpArrow: R && $
        }, e1.dim(P), " ", z, C.description && fu.default.createElement(T, {
            dimColor: C.dimDescription !== !1
        }, "  ".padEnd(k), C.description))
    }))
}
var VI0 = G1(z1(), 1),
    iO2 = 800;

function UP(A, B, Q) {
    let Z = VI0.useRef(0),
        D = VI0.useRef();
    return () => {
        let G = Date.now();
        if (G - Z.current <= iO2 && D.current) {
            if (D.current) clearTimeout(D.current), D.current = void 0;
            B(), A(!1)
        } else Q?.(), A(!0), D.current = setTimeout(() => A(!1), iO2);
        Z.current = G
    }
}
var aO2 = G1(z1(), 1);

function ao4() {
    try {
        if (process.stdin.isTTY && typeof process.stdin.setRawMode === "function") process.stdin.setRawMode(!1), process.stdin.unref()
    } catch {}
}
var CI0 = new Set;

function oL(A) {
    return CI0.add(A), () => CI0.delete(A)
}
var nO2 = EA(() => {
    process.on("SIGINT", () => {
        P4(0)
    }), process.on("SIGTERM", () => {
        P4(143)
    })
});

function O5(A = 0) {
    P4(A).catch((B) => {
        SA(`Graceful shutdown failed: ${B}`), process.exit(A)
    })
}
async function P4(A = 0) {
    process.exitCode = A, ao4();
    try {
        let B = (async () => {
            try {
                await Promise.all(Array.from(CI0).map((Q) => Q()))
            } catch {}
        })();
        await Promise.race([B, new Promise((Q, Z) => setTimeout(() => Z(new Error("Cleanup timeout")), 2000))]), process.exit(A)
    } catch {
        process.exit(A)
    }
}

function U2(A) {
    let [B, Q] = aO2.useState({
        pending: !1,
        keyName: null
    }), Z = UP((G) => Q({
        pending: G,
        keyName: "Ctrl-C"
    }), A ? A : async () => {
        await P4(0)
    }), D = UP((G) => Q({
        pending: G,
        keyName: "Ctrl-D"
    }), A ? A : async () => {
        await P4(0)
    });
    return DA((G, F) => {
        if (F.ctrl && G === "c") Z();
        if (F.ctrl && G === "d") D()
    }), B
}
var sY = G1(z1(), 1);
var hV = () => ({
    mode: "default",
    additionalWorkingDirectories: new Map,
    alwaysAllowRules: {},
    alwaysDenyRules: {},
    alwaysAskRules: {},
    isBypassPermissionsModeAvailable: !1
});

function Dt(A) {
    return A.filter((B) => B.data?.type !== "running_hook")
}
var IT1 = G1(z1(), 1);

function YT1(A) {
    let B = IT1.useCallback((Q) => {
        F81();
        let Z = GB();
        A(Q, Z)
    }, [A]);
    IT1.useEffect(() => mq1.subscribe(B), [B])
}

function so4() {
    return {
        verbose: !1,
        mainLoopModel: null,
        maxRateLimitFallbackActive: !1,
        statusLineText: void 0,
        todoFeatureEnabled: !1,
        toolPermissionContext: hV(),
        checkpointing: {
            status: "uninitialized",
            saving: !1,
            checkpoints: {},
            shadowRepoPath: void 0,
            autocheckpointEnabled: !1
        },
        mcp: {
            clients: [],
            tools: [],
            commands: [],
            resources: {}
        },
        plugins: {
            enabled: [],
            disabled: [],
            commands: [],
            agents: []
        }
    }
}
var rO2 = sY.default.createContext([{}, (A) => A]),
    sO2 = sY.default.createContext(!1);

function F7({
    children: A,
    initialState: B,
    onChangeAppState: Q
}) {
    if (sY.useContext(sO2)) throw new Error("AppStateProvider can not be nested within another AppStateProvider");
    let [D, G] = sY.useState({
        currentState: B ?? so4(),
        previousState: null
    }), F = sY.useCallback((Y) => G(({
        currentState: W
    }) => ({
        currentState: Y(W),
        previousState: W
    })), []), I = sY.useMemo(() => {
        let Y = [D.currentState, F];
        return Y.__IS_INITIALIZED__ = !0, Y
    }, [D.currentState, F]);
    return sY.useEffect(() => {
        Q?.({
            newState: D.currentState,
            oldState: D.previousState
        })
    }, [Q, D]), YT1(sY.useCallback(() => {
        let Y = Wq1();
        F((W) => {
            return {
                ...W,
                toolPermissionContext: Lq1(W.toolPermissionContext, Y)
            }
        })
    }, [F])), sY.default.createElement(sO2.Provider, {
        value: !0
    }, sY.default.createElement(rO2.Provider, {
        value: I
    }, A))
}

function tQ() {
    let A = sY.useContext(rO2);
    if (!A.__IS_INITIALIZED__) throw new ReferenceError("useAppState cannot be called outside of an <AppStateProvider />");
    return A
}

function ro4({
    filePath: A,
    errorDescription: B,
    onExit: Q,
    onReset: Z
}) {
    DA((F, I) => {
        if (I.escape) Q()
    });
    let D = U2();
    return FJ.default.createElement(FJ.default.Fragment, null, FJ.default.createElement(v, {
        flexDirection: "column",
        borderColor: "error",
        borderStyle: "round",
        padding: 1,
        width: 70,
        gap: 1
    }, FJ.default.createElement(T, {
        bold: !0
    }, "Configuration Error"), FJ.default.createElement(v, {
        flexDirection: "column",
        gap: 1
    }, FJ.default.createElement(T, null, "The configuration file at ", FJ.default.createElement(T, {
        bold: !0
    }, A), " contains invalid JSON."), FJ.default.createElement(T, null, B)), FJ.default.createElement(v, {
        flexDirection: "column"
    }, FJ.default.createElement(T, {
        bold: !0
    }, "Choose an option:"), FJ.default.createElement(uA, {
        options: [{
            label: "Exit and fix manually",
            value: "exit"
        }, {
            label: "Reset with default configuration",
            value: "reset"
        }],
        onChange: (F) => {
            if (F === "exit") Q();
            else Z()
        },
        onCancel: Q
    }))), D.pending ? FJ.default.createElement(T, {
        dimColor: !0
    }, "Press ", D.keyName, " again to exit") : FJ.default.createElement(S7, null))
}
var oo4 = "dark";
async function oO2({
    error: A
}) {
    let B = {
        exitOnCtrlC: !1,
        theme: oo4
    };
    await new Promise((Q) => {
        let {
            unmount: Z
        } = S8(FJ.default.createElement(F7, null, FJ.default.createElement(ro4, {
            filePath: A.filePath,
            errorDescription: A.message,
            onExit: () => {
                Z(), Q(), process.exit(1)
            },
            onReset: () => {
                j1().writeFileSync(A.filePath, JSON.stringify(A.defaultConfig, null, 2), {
                    flush: !1,
                    encoding: "utf8"
                }), Z(), Q(), process.exit(0)
            }
        })), B)
    })
}
var xS1 = G1(XQ(), 1),
    ZC0 = G1(HY0(), 1),
    vS1 = G1(Bx(), 1),
    CBB = G1(ca2(), 1),
    KBB = G1(SAB(), 1),
    HBB = G1(YP1(), 1),
    zBB = G1(hAB(), 1),
    DC0 = G1(Bx(), 1),
    Be = G1(b2B(), 1),
    EBB = G1(n2B(), 1),
    UBB = G1(e2B(), 1),
    wBB = G1(JBB(), 1),
    C$ = G1(dT1(), 1),
    Nx = G1(qP(), 1);
class AC0 {
    error(A, ...B) {
        R1(new Error(A))
    }
    warn(A, ...B) {
        R1(new Error(A))
    }
    info(A, ...B) {
        return
    }
    debug(A, ...B) {
        return
    }
    verbose(A, ...B) {
        return
    }
}
var BC0 = G1(Bx(), 1),
    Nm = G1(f3(), 1);
var uL6 = 3600000;
async function mL6() {
    let A = AL();
    if (A.error) throw n1(`Metrics opt-out check failed: ${A.error}`), new Error(`Auth error: ${A.error}`);
    let B = {
        "Content-Type": "application/json",
        "User-Agent": Ky(),
        ...A.headers
    };
    try {
        let Z = await J9.get("https://api.anthropic.com/api/claude_code/organizations/metrics_enabled", {
            headers: B,
            timeout: 5000
        });
        return n1(`Metrics opt-out API response: enabled=${Z.data.metrics_logging_enabled}`), {
            enabled: Z.data.metrics_logging_enabled,
            hasError: !1
        }
    } catch (Q) {
        return n1(`Failed to check metrics opt-out status: ${Q instanceof Error?Q.message:String(Q)}`), R1(Q), {
            enabled: !1,
            hasError: !0
        }
    }
}
var dL6 = Ow1(mL6, uL6);
async function XBB() {
    try {
        return await dL6()
    } catch (A) {
        return n1("Metrics check failed, defaulting to disabled"), {
            enabled: !1,
            hasError: !0
        }
    }
}
class QC0 {
    endpoint;
    timeout;
    pendingExports = [];
    isShutdown = !1;
    constructor(A = {}) {
        this.endpoint = "https://api.anthropic.com/api/claude_code/metrics", this.timeout = A.timeout || 5000
    }
    async export (A, B) {
        if (this.isShutdown) {
            B({
                code: Nm.ExportResultCode.FAILED,
                error: new Error("Exporter has been shutdown")
            });
            return
        }
        let Q = this.doExport(A, B);
        this.pendingExports.push(Q), Q.finally(() => {
            let Z = this.pendingExports.indexOf(Q);
            if (Z > -1) this.pendingExports.splice(Z, 1)
        })
    }
    async doExport(A, B) {
        try {
            if (!await MY("tengu_metrics_exporter_enabled")) {
                B({
                    code: Nm.ExportResultCode.SUCCESS
                });
                return
            }
            if (!(await XBB()).enabled) {
                n1("Metrics export disabled by organization setting"), B({
                    code: Nm.ExportResultCode.SUCCESS
                });
                return
            }
            let D = this.transformMetricsForInternal(A),
                G = AL();
            if (G.error) {
                n1(`Metrics export failed: ${G.error}`), B({
                    code: Nm.ExportResultCode.FAILED,
                    error: new Error(G.error)
                });
                return
            }
            let F = {
                    "Content-Type": "application/json",
                    "User-Agent": Ky(),
                    ...G.headers
                },
                I = await J9.post(this.endpoint, D, {
                    timeout: this.timeout,
                    headers: F
                });
            n1("BigQuery metrics exported successfully"), n1(`API Response: ${JSON.stringify(I.data,null,2)}`), B({
                code: Nm.ExportResultCode.SUCCESS
            })
        } catch (Q) {
            n1(`BigQuery metrics export failed: ${Q instanceof Error?Q.message:String(Q)}`), R1(Q), B({
                code: Nm.ExportResultCode.FAILED,
                error: Q instanceof Error ? Q : new Error("Unknown export error")
            })
        }
    }
    transformMetricsForInternal(A) {
        let B = A.resource.attributes,
            Q = {
                "service.name": B["service.name"] || "claude-code",
                "service.version": B["service.version"] || "unknown",
                "os.type": B["os.type"] || "unknown",
                "os.version": B["os.version"] || "unknown",
                "host.arch": B["host.arch"] || "unknown",
                "aggregation.temporality": this.selectAggregationTemporality() === BC0.AggregationTemporality.DELTA ? "delta" : "cumulative"
            };
        if (B["wsl.version"]) Q["wsl.version"] = B["wsl.version"];
        if (KB()) {
            Q["user.customer_type"] = "claude_ai";
            let D = __();
            if (D) Q["user.subscription_type"] = D
        } else Q["user.customer_type"] = "api";
        return {
            resource_attributes: Q,
            metrics: A.scopeMetrics.flatMap((D) => D.metrics.map((G) => ({
                name: G.descriptor.name,
                description: G.descriptor.description,
                unit: G.descriptor.unit,
                data_points: this.extractDataPoints(G)
            })))
        }
    }
    extractDataPoints(A) {
        return (A.dataPoints || []).filter((Q) => typeof Q.value === "number").map((Q) => ({
            attributes: this.convertAttributes(Q.attributes),
            value: Q.value,
            timestamp: this.hrTimeToISOString(Q.endTime || Q.startTime || [Date.now() / 1000, 0])
        }))
    }
    async shutdown() {
        this.isShutdown = !0, await this.forceFlush(), n1("BigQuery metrics exporter shutdown complete")
    }
    async forceFlush() {
        await Promise.all(this.pendingExports), n1("BigQuery metrics exporter flush complete")
    }
    convertAttributes(A) {
        let B = {};
        if (A) {
            for (let [Q, Z] of Object.entries(A))
                if (Z !== void 0 && Z !== null) B[Q] = String(Z)
        }
        return B
    }
    hrTimeToISOString(A) {
        let [B, Q] = A;
        return new Date(B * 1000 + Q / 1e6).toISOString()
    }
    selectAggregationTemporality() {
        return BC0.AggregationTemporality.DELTA
    }
}
var cL6 = 60000,
    lL6 = 5000;

function pL6() {
    if (GB()?.otelHeadersHelper) process.env.OTEL_EXPORTER_OTLP_HEADERS = Object.entries(nq2()).map(([B, Q]) => `${B}=${Q}`).join(",");
    if (!process.env.OTEL_EXPORTER_OTLP_METRICS_TEMPORALITY_PREFERENCE) process.env.OTEL_EXPORTER_OTLP_METRICS_TEMPORALITY_PREFERENCE = "delta"
}