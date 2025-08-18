/* chunk:540 bytes:[12689521, 12705855) size:16334 source:unpacked-cli.js */
function iL6() {
    let A = (process.env.OTEL_METRICS_EXPORTER || "").trim().split(",").filter(Boolean),
        B = parseInt(process.env.OTEL_METRIC_EXPORT_INTERVAL || cL6.toString()),
        Q = [];
    for (let Z of A)
        if (Z === "console") {
            let D = new vS1.ConsoleMetricExporter,
                G = D.export.bind(D);
            D.export = (F, I) => {
                if (F.resource && F.resource.attributes) console.log(`
=== Resource Attributes ===`), console.log(F.resource.attributes), console.log(`===========================
`);
                return G(F, I)
            }, Q.push(D)
        } else if (Z === "otlp") {
        let D = process.env.OTEL_EXPORTER_OTLP_METRICS_PROTOCOL?.trim() || process.env.OTEL_EXPORTER_OTLP_PROTOCOL?.trim();
        switch (D) {
            case "grpc":
                Q.push(new KBB.OTLPMetricExporter);
                break;
            case "http/json":
                Q.push(new HBB.OTLPMetricExporter);
                break;
            case "http/protobuf":
                Q.push(new CBB.OTLPMetricExporter);
                break;
            default:
                throw new Error(`Unknown protocol set in OTEL_EXPORTER_OTLP_METRICS_PROTOCOL or OTEL_EXPORTER_OTLP_PROTOCOL env var: ${D}`)
        }
    } else if (Z === "prometheus") Q.push(new zBB.PrometheusExporter);
    else throw new Error(`Unknown exporter type set in OTEL_EXPORTER_OTLP_METRICS_PROTOCOL or OTEL_EXPORTER_OTLP_PROTOCOL env var: ${Z}`);
    return Q.map((Z) => {
        if ("export" in Z) return new DC0.PeriodicExportingMetricReader({
            exporter: Z,
            exportIntervalMillis: B
        });
        return Z
    })
}

function nL6() {
    let A = (process.env.OTEL_LOGS_EXPORTER || "").trim().split(",").filter(Boolean),
        B = [];
    for (let Q of A)
        if (Q === "console") B.push(new Be.ConsoleLogRecordExporter);
        else if (Q === "otlp") {
        let Z = process.env.OTEL_EXPORTER_OTLP_LOGS_PROTOCOL?.trim() || process.env.OTEL_EXPORTER_OTLP_PROTOCOL?.trim();
        switch (Z) {
            case "grpc":
                B.push(new UBB.OTLPLogExporter);
                break;
            case "http/json":
                B.push(new wBB.OTLPLogExporter);
                break;
            case "http/protobuf":
                B.push(new EBB.OTLPLogExporter);
                break;
            default:
                throw new Error(`Unknown protocol set in OTEL_EXPORTER_OTLP_LOGS_PROTOCOL or OTEL_EXPORTER_OTLP_PROTOCOL env var: ${Z}`)
        }
    } else throw new Error(`Unknown exporter type set in OTEL_LOGS_EXPORTER env var: ${Q}`);
    return B
}

function VBB() {
    return Boolean(process.env.CLAUDE_CODE_ENABLE_TELEMETRY)
}

function aL6() {
    let A = new QC0;
    return new DC0.PeriodicExportingMetricReader({
        exporter: A,
        exportIntervalMillis: 300000
    })
}

function sL6() {
    let A = __(),
        B = KB() && (A === "enterprise" || A === "team");
    return pq2() || B
}

function $BB() {
    pL6(), xS1.diag.setLogger(new AC0, xS1.DiagLogLevel.ERROR);
    let A = [];
    if (VBB()) A.push(...iL6());
    if (sL6()) A.push(aL6());
    let B = L9(),
        Q = {
            [Nx.ATTR_SERVICE_NAME]: "claude-code",
            [Nx.ATTR_SERVICE_VERSION]: {
                ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
                PACKAGE_URL: "@anthropic-ai/claude-code",
                README_URL: "https://docs.anthropic.com/s/claude-code",
                VERSION: "1.0.83"
            }.VERSION
        };
    if (B === "wsl") {
        let V = I91();
        if (V) Q["wsl.version"] = V
    }
    let Z = C$.resourceFromAttributes(Q),
        D = C$.resourceFromAttributes(C$.osDetector.detect().attributes || {}),
        G = C$.hostDetector.detect(),
        F = G.attributes?.[Nx.SEMRESATTRS_HOST_ARCH] ? {
            [Nx.SEMRESATTRS_HOST_ARCH]: G.attributes[Nx.SEMRESATTRS_HOST_ARCH]
        } : {},
        I = C$.resourceFromAttributes(F),
        Y = C$.resourceFromAttributes(C$.envDetector.detect().attributes || {}),
        W = Z.merge(D).merge(I).merge(Y),
        J = new vS1.MeterProvider({
            resource: W,
            views: [],
            readers: A
        });
    if (VBB()) {
        let V = nL6();
        if (V.length > 0) {
            let C = new Be.LoggerProvider({
                resource: W
            });
            for (let H of V) C.addLogRecordProcessor(new Be.BatchLogRecordProcessor(H, {
                scheduledDelayMillis: parseInt(process.env.OTEL_LOGS_EXPORT_INTERVAL || lL6.toString())
            }));
            ZC0.logs.setGlobalLoggerProvider(C), mk0(C);
            let K = ZC0.logs.getLogger("com.anthropic.claude_code.events", {
                ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
                PACKAGE_URL: "@anthropic-ai/claude-code",
                README_URL: "https://docs.anthropic.com/s/claude-code",
                VERSION: "1.0.83"
            }.VERSION);
            ck0(K)
        }
    }
    return oL(async () => {
        let V = parseInt(process.env.CLAUDE_CODE_OTEL_SHUTDOWN_TIMEOUT_MS || "1000");
        try {
            let C = [J.shutdown()],
                K = uk0();
            if (K) C.push(K.shutdown());
            await Promise.race([Promise.all(C), new Promise((H, z) => setTimeout(() => z(new Error("OpenTelemetry shutdown timeout")), V))])
        } catch (C) {
            if (C instanceof Error && C.message.includes("timeout")) SA(`
OpenTelemetry telemetry flush timed out after ${V}ms

To resolve this issue, you can:
1. Increase the timeout by setting CLAUDE_CODE_OTEL_SHUTDOWN_TIMEOUT_MS env var (e.g., 5000 for 5 seconds)
2. Check if your OpenTelemetry backend is experiencing scalability issues
3. Disable OpenTelemetry by unsetting CLAUDE_CODE_ENABLE_TELEMETRY env var

Current timeout: ${V}ms
`);
            throw C
        }
    }), J.getMeter("com.anthropic.claude_code", {
        ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
        PACKAGE_URL: "@anthropic-ai/claude-code",
        README_URL: "https://docs.anthropic.com/s/claude-code",
        VERSION: "1.0.83"
    }.VERSION)
}
var rL6 = {
    OTEL_METRICS_INCLUDE_SESSION_ID: !0,
    OTEL_METRICS_INCLUDE_VERSION: !1,
    OTEL_METRICS_INCLUDE_ACCOUNT_UUID: !0
};

function GC0(A) {
    let B = rL6[A],
        Q = process.env[A];
    if (Q === void 0) return B;
    return Q === "true"
}

function bS1() {
    let A = jo(),
        B = CB(),
        Q = H0(),
        Z = Q.oauthAccount?.organizationUuid,
        D = Q.oauthAccount?.emailAddress,
        G = Q.oauthAccount?.accountUuid,
        F = {
            "user.id": A
        };
    if (GC0("OTEL_METRICS_INCLUDE_SESSION_ID")) F["session.id"] = B;
    if (GC0("OTEL_METRICS_INCLUDE_VERSION")) F["app.version"] = {
        ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
        PACKAGE_URL: "@anthropic-ai/claude-code",
        README_URL: "https://docs.anthropic.com/s/claude-code",
        VERSION: "1.0.83"
    }.VERSION;
    if (Z) F["organization.id"] = Z;
    if (D) F["user.email"] = D;
    if (G && GC0("OTEL_METRICS_INCLUDE_ACCOUNT_UUID")) F["user.account_uuid"] = G;
    if (sA.terminal) F["terminal.type"] = sA.terminal;
    return F
}
var qBB = EA(() => {
    try {
        WN2(), HN2(), nO2(), oL6(), JN2(), D_A(), W_A(), ntA()
    } catch (A) {
        if (A instanceof Rg) return oO2({
            error: A
        });
        else throw A
    }
});

function oL6() {
    let A = $BB();
    if (A) vk0(A, (Q, Z) => {
        let D = A?.createCounter(Q, Z);
        return {
            add(G, F = {}) {
                let Y = {
                    ...bS1(),
                    ...F
                };
                D?.add(G, Y)
            }
        }
    })
}
import {
    createRequire as tL6
} from "module";
import {
    fileURLToPath as eL6
} from "url";
import {
    dirname as AM6,
    join as BM6
} from "path";
var QM6 = tL6(import.meta.url);

function NBB(A) {
    let B;
    if (typeof Bun !== "undefined" && Bun.embeddedFiles?.length > 0) B = "./ripgrep.node";
    else B = BM6(AM6(eL6(import.meta.url)), "ripgrep.node");
    let {
        ripgrepMain: Q
    } = QM6(B);
    return Q(A)
}
var m7 = G1(z1(), 1);
import {
    ReadStream as kT8
} from "tty";
import {
    openSync as yT8,
    existsSync as EP0,
    readFileSync as _T8
} from "fs";
var Mx = G1(z1(), 1);
var WC0 = G1(z1(), 1);
var Mm = G1(jBB(), 1);
var kBB = process.env.TERM_PROGRAM === "Apple_Terminal",
    a6 = {};
a6.cursorTo = (A, B) => {
    if (typeof A !== "number") throw new TypeError("The `x` argument is required");
    if (typeof B !== "number") return "\x1B[" + (A + 1) + "G";
    return "\x1B[" + (B + 1) + ";" + (A + 1) + "H"
};
a6.cursorMove = (A, B) => {
    if (typeof A !== "number") throw new TypeError("The `x` argument is required");
    let Q = "";
    if (A < 0) Q += "\x1B[" + -A + "D";
    else if (A > 0) Q += "\x1B[" + A + "C";
    if (B < 0) Q += "\x1B[" + -B + "A";
    else if (B > 0) Q += "\x1B[" + B + "B";
    return Q
};
a6.cursorUp = (A = 1) => "\x1B[" + A + "A";
a6.cursorDown = (A = 1) => "\x1B[" + A + "B";
a6.cursorForward = (A = 1) => "\x1B[" + A + "C";
a6.cursorBackward = (A = 1) => "\x1B[" + A + "D";
a6.cursorLeft = "\x1B[G";
a6.cursorSavePosition = kBB ? "\x1B7" : "\x1B[s";
a6.cursorRestorePosition = kBB ? "\x1B8" : "\x1B[u";
a6.cursorGetPosition = "\x1B[6n";
a6.cursorNextLine = "\x1B[E";
a6.cursorPrevLine = "\x1B[F";
a6.cursorHide = "\x1B[?25l";
a6.cursorShow = "\x1B[?25h";
a6.eraseLines = (A) => {
    let B = "";
    for (let Q = 0; Q < A; Q++) B += a6.eraseLine + (Q < A - 1 ? a6.cursorUp() : "");
    if (A) B += a6.cursorLeft;
    return B
};
a6.eraseEndLine = "\x1B[K";
a6.eraseStartLine = "\x1B[1K";
a6.eraseLine = "\x1B[2K";
a6.eraseDown = "\x1B[J";
a6.eraseUp = "\x1B[1J";
a6.eraseScreen = "\x1B[2J";
a6.scrollUp = "\x1B[S";
a6.scrollDown = "\x1B[T";
a6.clearScreen = "\x1Bc";
a6.clearTerminal = process.platform === "win32" ? `${a6.eraseScreen}\x1B[0f` : `${a6.eraseScreen}\x1B[3J\x1B[H`;
a6.beep = "\x07";
a6.link = (A, B) => {
    return ["\x1B]", "8", ";", ";", B, "\x07", A, "\x1B]", "8", ";", ";", "\x07"].join("")
};
a6.image = (A, B = {}) => {
    let Q = "\x1B]1337;File=inline=1";
    if (B.width) Q += `;width=${B.width}`;
    if (B.height) Q += `;height=${B.height}`;
    if (B.preserveAspectRatio === !1) Q += ";preserveAspectRatio=0";
    return Q + ":" + A.toString("base64") + "\x07"
};
a6.iTerm = {
    setCwd: (A = process.cwd()) => `\x1B]50;CurrentDir=${A}\x07`,
    annotation: (A, B = {}) => {
        let Q = "\x1B]1337;",
            Z = typeof B.x !== "undefined",
            D = typeof B.y !== "undefined";
        if ((Z || D) && !(Z && D && typeof B.length !== "undefined")) throw new Error("`x`, `y` and `length` must be defined when `x` or `y` is defined");
        if (A = A.replace(/\|/g, ""), Q += B.isHidden ? "AddHiddenAnnotation=" : "AddAnnotation=", B.length > 0) Q += (Z ? [A, B.length, B.x, B.y] : [B.length, A]).join("|");
        else Q += A;
        return Q + "\x07"
    }
};
var yBB = a6;
var fS1 = G1(hBB(), 1);

function Lm(A, B, {
    target: Q = "stdout",
    ...Z
} = {}) {
    if (!fS1.default[Q]) {
        if (Z.fallback === !1) return A;
        return typeof Z.fallback === "function" ? Z.fallback(A, B) : `${A} (​${B}​)`
    }
    return yBB.link(A, B)
}
Lm.isSupported = fS1.default.stdout;
Lm.stderr = (A, B, Q = {}) => Lm(A, B, {
    target: "stderr",
    ...Q
});
Lm.stderr.isSupported = fS1.default.stderr;
var gBB = ({
    children: A,
    url: B,
    fallback: Q = !0
}) => WC0.default.createElement(tO1, {
    transform: (Z) => Lm(Z, B, {
        fallback: Q
    })
}, WC0.default.createElement(T, null, A));
gBB.propTypes = {
    children: Mm.default.oneOfType([Mm.default.arrayOf(Mm.default.node), Mm.default.node]).isRequired,
    url: Mm.default.string.isRequired,
    fallback: Mm.default.bool
};
var hS1 = gBB;
var gS1 = G1(z1(), 1);
var JM6 = ["iTerm.app", "WezTerm", "Hyper", "VSCode"];

function C3({
    url: A,
    children: B
}) {
    let Q = JM6.includes(sA.terminal ?? ""),
        Z = B || A;
    if (Q || Z !== A) return gS1.default.createElement(hS1, {
        url: A
    }, gS1.default.createElement(T, null, Z));
    else return gS1.default.createElement(T, {
        underline: !0
    }, Z)
}

function uBB({
    onDone: A
}) {
    return DA((B, Q) => {
        if (Q.ctrl && (B === "c" || B === "d") || Q.escape) A()
    }), Mx.default.createElement(v, {
        flexDirection: "column",
        borderStyle: "round",
        padding: 1,
        borderColor: "secondaryBorder"
    }, Mx.default.createElement(v, {
        marginBottom: 1,
        flexDirection: "column"
    }, Mx.default.createElement(T, {
        bold: !0
    }, "You've spent $5 on the Anthropic API this session."), Mx.default.createElement(T, null, "Learn more about how to monitor your spending:"), Mx.default.createElement(C3, {
        url: "https://docs.anthropic.com/s/claude-code-cost"
    })), Mx.default.createElement(v, null, Mx.default.createElement(uA, {
        options: [{
            value: "ok",
            label: "Got it, thanks!"
        }],
        onChange: A,
        onCancel: A
    })))
}
var k4 = G1(z1(), 1),
    iB = G1(z1(), 1);
var b71 = G1(z1(), 1);

function mBB() {
    let [A, B] = b71.useState(0), [Q, Z] = b71.useState({
        show: !1
    }), D = b71.useCallback((G, F = {}) => {
        let {
            timeoutMs: I = 8000
        } = F;
        B((Y) => {
            let W = Y + 1;
            return Z({
                show: !0,
                content: G
            }), setTimeout(() => {
                B((J) => {
                    if (W === J) Z({
                        show: !1
                    });
                    return J
                })
            }, I), W
        })
    }, []);
    return {
        notification: Q,
        addNotification: D
    }
}
var ajB = G1(W4B(), 1);
import {
    spawn as fW8
} from "node:child_process";
import {
    randomUUID as XF1
} from "crypto";
var r71 = G1(gw(), 1);

function Wj1(A, B) {
    let Q = A.lastIndexOf(" -");
    if (Q > 0) {
        let Z = A.substring(0, Q),
            D = A.substring(Q + 1);
        return `${r71.quote([Z])} ${D} ${r71.quote([B])}`
    } else return `${r71.quote([A])} ${r71.quote([B])}`
}
import {
    randomUUID as cv
} from "crypto";
import {
    basename as rj6
} from "path";

function Sx(A) {
    let B = /^---\s*\n([\s\S]*?)---\s*\n?/,
        Q = A.match(B);
    if (!Q) return {
        frontmatter: {},
        content: A
    };
    let Z = Q[1] || "",
        D = A.slice(Q[0].length),
        G = {},
        F = Z.split(`
`);
    for (let I of F) {
        let Y = I.indexOf(":");
        if (Y > 0) {
            let W = I.slice(0, Y).trim(),
                J = I.slice(Y + 1).trim();
            if (W) {
                let X = J.replace(/^["']|["']$/g, "");
                G[W] = X
            }
        }
    }
    return {
        frontmatter: G,
        content: D
    }
}
import {
    dirname as pj6
} from "path";
var cP = G1(z1(), 1);
import {
    homedir as J4B
} from "os";
import {
    isAbsolute as vR6,
    join as bR6,
    resolve as fR6,
    normalize as X4B,
    dirname as hR6
} from "path";

function bC0(A, B) {
    let Q = B ?? t0() ?? j1().cwd();
    if (typeof A !== "string") throw new TypeError(`Path must be a string, received ${typeof A}`);
    if (typeof Q !== "string") throw new TypeError(`Base directory must be a string, received ${typeof Q}`);
    if (A.includes("\x00") || Q.includes("\x00")) throw new Error("Path contains null bytes");
    let Z = A.trim();
    if (!Z) return X4B(Q);
    if (Z === "~") return J4B();
    if (Z.startsWith("~/")) return bR6(J4B(), Z.slice(2));
    if (vR6(Z)) return X4B(Z);
    return fR6(Q, Z)
}

function jx(A) {
    let B = HD(A);
    try {
        if (j1().statSync(B).isDirectory()) return B
    } catch {}
    return hR6(B)
}
var uQ = G1(z1(), 1);
var mP = G1(z1(), 1);
var E5B = G1(z1(), 1);
var Y5B = G1(z1(), 1);
var qM = G1(q4B(), 1),
    gC0 = new Intl.Segmenter(void 0, {
        granularity: "grapheme"
    });