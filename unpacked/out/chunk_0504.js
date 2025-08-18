/* chunk:504 bytes:[12006019, 12024926) size:18907 source:unpacked-cli.js */
function C20(A, B = 300000) {
    let Q = new Map,
        Z = (...D) => {
            let G = JSON.stringify(D),
                F = Q.get(G),
                I = Date.now();
            if (!F) Q.set(G, {
                value: A(...D),
                timestamp: I,
                refreshing: !1
            });
            if (F && I - F.timestamp > B && !F.refreshing) return F.refreshing = !0, Promise.resolve().then(() => {
                let Y = A(...D);
                Q.set(G, {
                    value: Y,
                    timestamp: Date.now(),
                    refreshing: !1
                })
            }).catch((Y) => {
                R1(Y instanceof Error ? Y : new Error(String(Y)));
                let W = Q.get(G);
                if (W) W.refreshing = !1
            }), F.value;
            return Q.get(G).value
        };
    return Z.cache = {
        clear: () => Q.clear()
    }, Z
}

function Ow1(A, B = 300000) {
    let Q = new Map,
        Z = async (...D) => {
            let G = JSON.stringify(D),
                F = Q.get(G),
                I = Date.now();
            if (!F) {
                let Y = await A(...D);
                return Q.set(G, {
                    value: Y,
                    timestamp: I,
                    refreshing: !1
                }), Y
            }
            if (F && I - F.timestamp > B && !F.refreshing) return F.refreshing = !0, A(...D).then((Y) => {
                Q.set(G, {
                    value: Y,
                    timestamp: Date.now(),
                    refreshing: !1
                })
            }).catch((Y) => {
                R1(Y instanceof Error ? Y : new Error(String(Y)));
                let W = Q.get(G);
                if (W) W.refreshing = !1
            }), F.value;
            return Q.get(G).value
        };
    return Z.cache = {
        clear: () => Q.clear()
    }, Z
}

function Tw1(A, B) {
    let Q = new jw({
            max: 1000
        }),
        Z = (...D) => {
            let G = B(...D),
                F = Q.get(G);
            if (F !== void 0) return F;
            let I = A(...D);
            return Q.set(G, I), I
        };
    return Z.cache = {
        clear: () => Q.clear(),
        size: () => Q.size
    }, Z
}
var qhQ = 3600000;
async function NhQ() {
    let B = H0().oauthAccount?.organizationUuid;
    if (!B) throw new Error("No organization ID available");
    let Q = AL();
    if (Q.error) throw new Error(`Auth error: ${Q.error}`);
    let Z = {
        "Content-Type": "application/json",
        "User-Agent": Ky(),
        ...Q.headers
    };
    try {
        let D = `https://api.anthropic.com/api/organization/${B}/claude_code_sonnet_1m_access`;
        return {
            hasAccess: (await J9.get(D, {
                headers: Z,
                timeout: 5000
            })).data.has_access,
            hasError: !1
        }
    } catch (D) {
        return R1(D), {
            hasAccess: !1,
            hasError: !0
        }
    }
}
var LhQ = Ow1(NhQ, qhQ);
async function MhQ() {
    try {
        return await LhQ()
    } catch (A) {
        return n1("Sonnet-1M access check failed, defaulting to no access"), {
            hasAccess: !1,
            hasError: !0
        }
    }
}
var RhQ = 3600000;

function Xa() {
    let A = H0(),
        B = A.oauthAccount?.organizationUuid;
    if (!B) return {
        hasAccess: !1,
        needsRefresh: !1
    };
    let Q = A.s1mAccessCache?.[B],
        Z = Date.now();
    if (!Q) return {
        hasAccess: !1,
        needsRefresh: !0
    };
    let {
        hasAccess: D,
        timestamp: G
    } = Q, F = Z - G > RhQ;
    return {
        hasAccess: D,
        needsRefresh: F
    }
}
async function z_A() {
    let {
        needsRefresh: A
    } = Xa();
    if (A) OhQ()
}
async function OhQ() {
    let A = H0(),
        B = A.oauthAccount?.organizationUuid;
    if (!B) return;
    try {
        let {
            hasAccess: Q
        } = await MhQ(), Z = {
            ...A.s1mAccessCache,
            [B]: {
                hasAccess: Q,
                timestamp: Date.now()
            }
        };
        gA({
            ...A,
            s1mAccessCache: Z
        })
    } catch (Q) {
        n1("Failed to fetch and cache Sonnet-1M access"), R1(Q)
    }
}
var E_A = ["sonnet", "opus", "haiku", "sonnet[1m]", "opusplan"],
    ThQ = jO,
    U_A = ThQ.firstParty,
    l41 = [...E_A, "inherit"],
    H20 = "sonnet";

function WT() {
    return process.env.ANTHROPIC_SMALL_FAST_MODEL || eD().haiku35
}

function Ca(A) {
    return A === eD().opus40 || A === eD().opus41
}

function Pw1() {
    let A, B = M21();
    if (B !== void 0) A = B;
    else {
        let Q = GB() || {};
        A = process.env.ANTHROPIC_MODEL || Q.model || void 0
    }
    if (KB() && !aG() && A?.includes("opus")) return;
    return A
}

function Sw1(A = {}) {
    let B = Pw1();
    if (B !== null && B !== void 0) return B;
    let {
        forDisplay: Q = !1
    } = A;
    return $_A(Q)
}

function AG() {
    let A = Sw1();
    if (A !== void 0 && A !== null) return BL(A);
    return yw1()
}

function w_A() {
    if (DZ() === "bedrock") return eD().sonnet37;
    return eD().sonnet40
}

function jw1(A) {
    let {
        permissionMode: B,
        mainLoopModel: Q
    } = A;
    if (Sw1() === "opusplan" && B !== "plan") return Ey();
    return Q
}
var U55 = EA(() => {
    return null
});

function PhQ() {
    let A = Ka("new_max_user_default_model", "tengu_external_model_override", null) ?? S_A("tengu_external_model_override", null);
    if (A === null) return null;
    if (A.earliestFirstToken === void 0) return A;
    let Q = H0().claudeCodeFirstTokenDate;
    if (!Q) return null;
    let Z = new Date(Q).getTime(),
        D = new Date(A.earliestFirstToken).getTime();
    if (isNaN(D)) return R1(new Error(`Invalid earliestRequiredTime in Statsig config tengu_default_model_override: ${A.earliestFirstToken}`)), null;
    if (isNaN(Z) || Z < D) return null;
    return A
}

function $_A(A) {
    let B = PhQ();
    if (B !== null && B.name) return A ? B.displayName ?? B.name : B.name;
    if (aG()) {
        let {
            hasAccess: Q
        } = Xa();
        if (Q) return zy.value
    }
    return
}

function kw1(A = {}) {
    return z20($l(), A)
}

function z20(A, B = {}) {
    let {
        forDisplay: Q = !1
    } = B, Z = $_A(Q);
    if (Z !== void 0) return Z;
    if (A) return Ey();
    if (aG()) return eD().opus41;
    return w_A()
}

function yw1(A = {}) {
    return BL(kw1(A))
}

function Ey() {
    return w_A()
}

function kw(A) {
    if (A.includes("claude-opus-4-1")) return "claude-opus-4-1";
    if (A.includes("claude-opus-4")) return "claude-opus-4";
    let B = A.match(/(claude-(\d+-\d+-)?\w+)/);
    if (B && B[1]) return B[1];
    return A
}
async function q_A() {
    try {
        let A = H0();
        if (A.claudeCodeFirstTokenDate !== void 0) return;
        let B = AL();
        if (B.error) {
            R1(new Error(`Failed to get auth headers: ${B.error}`));
            return
        }
        let Z = `${p8().BASE_API_URL}/api/organization/claude_code_first_token_date`,
            G = (await J9.get(Z, {
                headers: {
                    ...B.headers,
                    "User-Agent": Ky()
                }
            })).data?.first_token_date ?? null;
        if (G !== null) {
            let F = new Date(G).getTime();
            if (isNaN(F)) {
                R1(new Error(`Received invalid first_token_date from API: ${G}`));
                return
            }
        }
        gA({
            ...A,
            claudeCodeFirstTokenDate: G
        })
    } catch (A) {
        R1(A instanceof Error ? A : new Error(String(A)))
    }
}

function _w1() {
    if (KB() && !aG()) return Xg.description;
    switch (kw1()) {
        case Va.value:
            return Va.description;
        case Xg.value:
            return Xg.description;
        case zy.value:
            return zy.description
    }
    let B = H0().fallbackAvailableWarningThreshold;
    if (B === void 0) return "Use Opus 4.1 or Sonnet 4 based on Max usage limits";
    return `Opus 4.1 for up to ${(B*100).toFixed(0)}% of usage limits, then use Sonnet 4`
}

function ShQ(A) {
    if (A === "opusplan") return "Opus 4.1 in plan mode, else Sonnet 4";
    return JT(BL(A))
}

function JT(A) {
    if (A === eD().opus41) return "Opus 4.1";
    if (A === eD().opus40) return "Opus 4";
    if (A === eD().sonnet40) return "Sonnet 4";
    if (A === eD().sonnet40 + "[1m]") return "Sonnet 4 (with 1M token context)";
    if (A === eD().sonnet37) return "Sonnet 3.7";
    if (A === eD().sonnet35) return "Sonnet 3.5";
    if (A === eD().haiku35) return "Haiku 3.5";
    return A
}

function Jg() {
    if (KB() && !aG()) return {
        value: null,
        label: "Sonnet",
        description: Xg.description
    };
    if (aG()) return {
        value: null,
        label: "Default (recommended)",
        description: _w1()
    };
    return {
        value: null,
        label: "Default (recommended)",
        description: `Use the default model (currently ${ShQ(kw1({forDisplay:!0}))}) · $3/$15 per Mtok`
    }
}
var N_A = {
        value: "sonnet",
        label: "Sonnet",
        description: "Sonnet 4 for daily use · $3/$15 per Mtok"
    },
    L_A = {
        value: "sonnet[1m]",
        label: "Sonnet (1M context)",
        description: "Sonnet 4 for long sessions · $6/$22.50 per Mtok"
    },
    Va = {
        value: "opusplan",
        label: "Opus Plan Mode",
        description: "Use Opus 4.1 in plan mode, Sonnet 4 otherwise"
    },
    K20 = {
        value: "opus",
        label: "Opus",
        description: "Opus 4.1 for complex tasks · $15/$75 per Mtok"
    },
    jhQ = {
        value: "opus",
        label: "Opus",
        description: "Opus 4.1 for complex tasks · Reaches usage limits faster"
    },
    Xg = {
        value: "sonnet",
        label: "Sonnet",
        description: "Sonnet 4 for daily use"
    },
    zy = {
        value: "sonnet[1m]",
        label: "Sonnet (1M context)",
        description: "Sonnet 4 with 1M context · Uses rate limits faster"
    };

function khQ() {
    if (KB() && !aG()) return [Jg()];
    if (aG()) {
        let A = [Jg(), jhQ],
            B = kw1();
        if (B !== Xg.value) A.push(Xg);
        if (Xa().hasAccess && B !== zy.value) A.push(zy);
        if (B !== Va.value) A.push(Va);
        return A
    }
    if (DZ() === "bedrock") return [Jg(), N_A, K20, Va];
    return [Jg(), K20, Va]
}

function M_A() {
    let A = khQ(),
        B = null,
        Q = Pw1(),
        Z = dW1();
    if (Q !== void 0 && Q !== null) B = Q;
    else if (Z !== null) B = Z;
    if (B === null || A.some((D) => D.value === B)) return A;
    if (R_A(B)) A.push(B === "sonnet" ? N_A : K20);
    else A.push({
        value: B,
        label: B,
        description: "Custom model"
    });
    return A
}

function R_A(A) {
    return E_A.includes(A)
}

function BL(A) {
    let B = A.toLowerCase().trim();
    if (R_A(B)) switch (B) {
        case "sonnet[1m]":
            return eD().sonnet40 + "[1m]";
        case "sonnet":
            return eD().sonnet40;
        case "opusplan":
            return eD().opus41;
        case "opus":
            return eD().opus41;
        case "haiku":
            return eD().haiku35
    }
    return B
}

function Vg(A) {
    if (A === null) {
        if (KB() && !aG()) return `Sonnet (${Xg.description})`;
        else if (KB()) return `Default (${_w1()})`;
        return `Default (${yw1({forDisplay:!0})})`
    }
    let B = BL(A);
    return A === B ? B : `${A} (${B})`
}

function O_A(A) {
    return A
}

function T_A(A, B) {
    if (process.env.CLAUDE_CODE_SUBAGENT_MODEL) return process.env.CLAUDE_CODE_SUBAGENT_MODEL;
    if (!A) return BL(H20);
    return A === "inherit" ? B : BL(A)
}

function xw1(A) {
    if (!A) return "Sonnet (default)";
    if (A === "inherit") return "Inherit from parent";
    return A.charAt(0).toUpperCase() + A.slice(1)
}

function P_A() {
    let A = [{
        value: "sonnet",
        label: "Sonnet",
        description: "Balanced performance - best for most agents"
    }];
    if (!(KB() && !aG())) A.push({
        value: "opus",
        label: "Opus",
        description: "Most capable for complex reasoning tasks"
    });
    return A.push({
        value: "haiku",
        label: "Haiku",
        description: "Fast and efficient for simple tasks"
    }, {
        value: "inherit",
        label: "Inherit from parent",
        description: "Use the same model as the main conversation"
    }), A
}
var j_A = {},
    Cg = null,
    bw1 = EA(() => {
        if (process.env.CLAUDE_CODE_USE_BEDROCK || process.env.CLAUDE_CODE_USE_VERTEX || process.env.DISABLE_TELEMETRY || process.env.CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC) return null;
        let A = Ha(!0),
            B = {
                networkConfig: {
                    api: "https://statsig.anthropic.com/v1/"
                },
                environment: {
                    tier: ["test", "dev"].includes("production") ? "development" : "production"
                },
                includeCurrentPageUrlWithEvents: !1,
                logLevel: vw1.LogLevel.None,
                storageProvider: new Gn1,
                customUserCacheKeyFunc: (Z, D) => {
                    return yhQ("sha1").update(Z).update(D.userID || "").digest("hex").slice(0, 10)
                }
            };
        Cg = new vw1.StatsigClient(_t0, A, B), Cg.on("error", () => {
            J9.head("https://api.anthropic.com/api/hello").catch(() => {})
        });
        let Q = Cg.initializeAsync().then(() => {});
        return process.on("beforeExit", async () => {
            await Cg?.flush()
        }), process.on("exit", () => {
            Cg?.flush()
        }), {
            client: Cg,
            initialized: Q
        }
    }),
    Kg = EA(async () => {
        let A = bw1();
        if (!A) return null;
        return await A.initialized, A.client
    });

function k_A() {
    Cg = null, bw1.cache?.clear?.(), Kg.cache?.clear?.(), xhQ.cache?.clear?.(), MY.cache?.clear?.()
}
async function _hQ(A, B) {
    if (process.env.CLAUDE_CODE_USE_BEDROCK || process.env.CLAUDE_CODE_USE_VERTEX || process.env.DISABLE_TELEMETRY || process.env.CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC) return;
    try {
        let Q = B.model ? String(B.model) : AG(),
            Z = VV(Q),
            [D, G, F] = await Promise.all([Kg(), sA.getPackageManagers(), sA.getRuntimes()]);
        if (!D) return;
        let I = {
                ...B,
                model: Q,
                sessionId: CB(),
                userType: "external",
                ...Z.length > 0 ? {
                    betas: Z.join(",")
                } : {},
                env: JSON.stringify({
                    platform: sA.platform,
                    nodeVersion: sA.nodeVersion,
                    terminal: sA.terminal,
                    packageManagers: G.join(","),
                    runtimes: F.join(","),
                    isRunningWithBun: sA.isRunningWithBun(),
                    isCi: IQ(!1),
                    isClaubbit: process.env.CLAUBBIT === "true",
                    isGithubAction: process.env.GITHUB_ACTIONS === "true",
                    isClaudeCodeAction: process.env.CLAUDE_CODE_ACTION === "1" || process.env.CLAUDE_CODE_ACTION === "true",
                    isClaudeAiAuth: KB(),
                    version: {
                        ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
                        PACKAGE_URL: "@anthropic-ai/claude-code",
                        README_URL: "https://docs.anthropic.com/s/claude-code",
                        VERSION: "1.0.83"
                    }.VERSION,
                    ...process.env.GITHUB_ACTIONS === "true" && {
                        githubEventName: process.env.GITHUB_EVENT_NAME,
                        githubActionsRunnerEnvironment: process.env.RUNNER_ENVIRONMENT,
                        githubActionsRunnerOs: process.env.RUNNER_OS
                    },
                    ...I91() && {
                        wslVersion: I91()
                    }
                }),
                entrypoint: process.env.CLAUDE_CODE_ENTRYPOINT,
                isInteractive: String(pk0()),
                clientType: nk0(),
                ...void 0,
                sweBenchRunId: process.env.SWE_BENCH_RUN_ID || "",
                sweBenchInstanceId: process.env.SWE_BENCH_INSTANCE_ID || "",
                sweBenchTaskId: process.env.SWE_BENCH_TASK_ID || ""
            },
            Y = {
                eventName: A,
                metadata: I
            };
        D.logEvent(Y), await D.flush()
    } catch (Q) {}
}

function X1(A, B) {
    _hQ(A, B)
}
var MY = EA(async (A) => {
    if (process.env.CLAUDE_CODE_USE_BEDROCK || process.env.CLAUDE_CODE_USE_VERTEX || process.env.DISABLE_TELEMETRY || process.env.CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC) return !1;
    let B = await Kg();
    if (!B) return !1;
    let Q = B.checkGate(A);
    return j_A[A] = Q, Q
});
var fw1 = (A, B) => {
    let [Q, Z] = E20.default.useState(B);
    return E20.default.useEffect(() => {
        yw(A, B).then(Z)
    }, [A, B]), Q
};

function y_A() {
    return {
        ...j_A
    }
}
var xhQ = EA(async (A, B) => {
    if (process.env.CLAUDE_CODE_USE_BEDROCK || process.env.CLAUDE_CODE_USE_VERTEX || process.env.DISABLE_TELEMETRY || process.env.CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC) return B;
    let Q = await Kg();
    if (!Q) return B;
    let Z = Q.getExperiment(A);
    if (Object.keys(Z.value).length === 0) return B;
    return Z.value
});
async function yw(A, B) {
    if (process.env.CLAUDE_CODE_USE_BEDROCK || process.env.CLAUDE_CODE_USE_VERTEX || process.env.DISABLE_TELEMETRY || process.env.CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC) return B;
    let Q = await Kg();
    if (!Q) return B;
    let Z = Q.getDynamicConfig(A);
    if (Object.keys(Z.value).length === 0) return B;
    return Z.value
}
var f55 = EA(yw);

function Ka(A, B, Q) {
    let Z = bw1();
    if (!Z) return Q;
    let D = Z.client.getExperiment(A);
    if (!D) return Q;
    return D.get(B, Q)
}

function S_A(A, B) {
    let Q = bw1();
    if (!Q) return B;
    let Z = Q.client.getDynamicConfig(A);
    if (!Z || Object.keys(Z.value).length === 0) return B;
    return Z.value
}
var h55 = EA(async (A) => {
    let B = await MY(A);
    H0().cachedStatsigGates[A] = B
});
import {
    isAbsolute as s61,
    resolve as r61,
    resolve as FK5,
    relative as seA,
    sep as VG4,
    basename as N40,
    dirname as M40,
    extname as L40,
    join as hs
} from "path";
import cZ from "node:path";
import __A from "node:os";
import U20 from "node:process";