/* chunk:528 bytes:[12445577, 12465592) size:20015 source:unpacked-cli.js */
async function Po(A = 0) {
    let Q = CZ();
    if (!Q?.refreshToken || !cq1(Q.expiresAt)) return !1;
    if (CZ.cache?.clear?.(), Q = CZ(), !Q?.refreshToken || !cq1(Q.expiresAt)) return !1;
    let Z = e9();
    j1().mkdirSync(Z);
    let G;
    try {
        G = await hq2.lock(Z)
    } catch (F) {
        if (F.code === "ELOCKED") {
            if (A < 5) return await new Promise((I) => setTimeout(I, 1000 + Math.random() * 1000)), Po(A + 1);
            return !1
        }
        return R1(F), !1
    }
    try {
        if (CZ.cache?.clear?.(), Q = CZ(), !Q?.refreshToken || !cq1(Q.expiresAt)) return !1;
        let F = await k02(Q.refreshToken);
        return S51({
            ...F,
            scopes: Q.scopes
        }), CZ.cache?.clear?.(), !0
    } catch (F) {
        return R1(F instanceof Error ? F : new Error(String(F))), !1
    } finally {
        await G()
    }
}

function KB() {
    if (!KE()) return !1;
    return TT(CZ()?.scopes)
}

function pq2() {
    if (IQ(process.env.CLAUDE_CODE_USE_BEDROCK) || IQ(process.env.CLAUDE_CODE_USE_VERTEX)) return !1;
    if (KB()) return !1;
    return !0
}

function aG() {
    let A = __();
    return A === "max" || A === "enterprise" || A === "team"
}

function iq2() {
    return aG()
}

function __() {
    if (!KE()) return null;
    let A = CZ();
    if (!A) return null;
    return A.subscriptionType ?? null
}

function LR1() {
    switch (__()) {
        case "enterprise":
            return "Claude Enterprise";
        case "team":
            return "Claude Team";
        case "max":
            return "Claude Max";
        case "pro":
            return "Claude Pro";
        default:
            return "Claude API"
    }
}

function So() {
    return !!(process.env.CLAUDE_CODE_USE_BEDROCK || process.env.CLAUDE_CODE_USE_VERTEX)
}

function nq2() {
    let B = GB()?.otelHeadersHelper;
    if (!B) return {};
    try {
        let Q = zZ(B)?.toString().trim();
        if (!Q) throw new Error("otelHeadersHelper did not return a valid value");
        let Z = JSON.parse(Q);
        if (typeof Z !== "object" || Z === null || Array.isArray(Z)) throw new Error("otelHeadersHelper must return a JSON object with string key-value pairs");
        for (let [D, G] of Object.entries(Z))
            if (typeof G !== "string") throw new Error(`otelHeadersHelper returned non-string value for key "${D}": ${typeof G}`);
        return Z
    } catch (Q) {
        throw R1(new Error(`Error getting OpenTelemetry headers from otelHeadersHelper (in settings): ${Q instanceof Error?Q.message:String(Q)}`)), Q
    }
}
var Ha = EA((A) => {
    let B = jo(),
        Q = H0(),
        Z = "",
        D = 0;
    if (A) {
        if (Z = __() ?? "", Z !== "" && Q.claudeCodeFirstTokenDate) {
            let G = new Date(Q.claudeCodeFirstTokenDate).getTime();
            if (!isNaN(G)) D = G
        }
    }
    return {
        customIDs: {
            sessionId: CB(),
            organizationUUID: Q.oauthAccount?.organizationUuid
        },
        userID: B,
        appVersion: {
            ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
            PACKAGE_URL: "@anthropic-ai/claude-code",
            README_URL: "https://docs.anthropic.com/s/claude-code",
            VERSION: "1.0.83"
        }.VERSION,
        email: Ci4(),
        custom: {
            userType: "external",
            organizationUuid: Q.oauthAccount?.organizationUuid,
            accountUuid: Q.oauthAccount?.accountUuid,
            subscriptionType: Z,
            firstTokenTime: D,
            ...process.env.GITHUB_ACTIONS === "true" && {
                githubActor: process.env.GITHUB_ACTOR,
                githubActorId: process.env.GITHUB_ACTOR_ID,
                githubRepositoryId: process.env.GITHUB_REPOSITORY_ID,
                githubRepositoryOwner: process.env.GITHUB_REPOSITORY_OWNER,
                githubRepositoryOwnerId: process.env.GITHUB_REPOSITORY_OWNER_ID
            }
        }
    }
});

function Ci4() {
    return
}

function aq2() {
    dL.init({
        dsn: yt0,
        environment: "external",
        release: {
            ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
            PACKAGE_URL: "@anthropic-ai/claude-code",
            README_URL: "https://docs.anthropic.com/s/claude-code",
            VERSION: "1.0.83"
        }.VERSION,
        defaultIntegrations: !1,
        tracesSampleRate: 1,
        tracePropagationTargets: ["localhost"]
    })
}

function MR1(A) {
    try {
        let B = Ha();
        dL.setTags({
            platform: sA.platform,
            terminal: sA.terminal,
            userType: "external",
            ...y_A()
        }), dL.setExtras({
            sessionId: CB(),
            isCI: sA.isCI,
            isTest: !1,
            packageVersion: {
                ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
                PACKAGE_URL: "@anthropic-ai/claude-code",
                README_URL: "https://docs.anthropic.com/s/claude-code",
                VERSION: "1.0.83"
            }.VERSION
        }), dL.setUser({
            id: B.userID,
            email: B.email
        }), dL.captureException(A)
    } catch {}
}
var RR1 = [],
    Hi4 = 100;

function zi4(A) {
    return A.toISOString().replace(/[:.]/g, "-")
}
var fG0 = zi4(new Date);

function Ei4() {
    return bG0($L.errors(), fG0 + ".txt")
}
var vG0 = !1;

function R1(A) {
    if (vG0) return;
    vG0 = !0;
    try {
        if (process.env.CLAUDE_CODE_USE_BEDROCK || process.env.CLAUDE_CODE_USE_VERTEX || process.env.DISABLE_ERROR_REPORTING || process.env.CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC) return;
        if (IQ(!1)) console.error(A);
        let B = A.stack || A.message,
            Q = {
                error: B,
                timestamp: new Date().toISOString()
            };
        if (RR1.length >= Hi4) RR1.shift();
        RR1.push(Q), Ui4(Ei4(), {
            error: B
        })
    } catch {} finally {
        vG0 = !1
    }
    MR1(A)
}

function sq2() {
    return [...RR1]
}

function hG0(A) {
    if (!j1().existsSync(A)) return [];
    try {
        return JSON.parse(j1().readFileSync(A, {
            encoding: "utf8"
        }))
    } catch {
        return []
    }
}

function Ui4(A, B) {
    return
}
async function ko() {
    let A = await EeA();
    return wi4(A.filter((B) => B.messages.length)).map((B, Q) => ({
        ...B,
        value: Q
    }))
}
async function rq2(A) {
    return await weA(A)
}
async function oq2(A) {
    return (await ko())[A] || null
}

function wi4(A) {
    return A.sort((B, Q) => {
        if (B.isBookmarked && !Q.isBookmarked) return -1;
        if (!B.isBookmarked && Q.isBookmarked) return 1;
        let Z = Q.modified.getTime() - B.modified.getTime();
        if (Z !== 0) return Z;
        let D = Q.created.getTime() - B.created.getTime();
        if (D !== 0) return D;
        return B.created.getTime() - Q.created.getTime()
    })
}

function XG(A, B) {
    if (SA(e1.red(`MCP server "${A}" ${B}`)), (GB() || {}).cleanupPeriodDays === 0) return;
    try {
        let Z = $L.mcpLogs(A),
            D = B instanceof Error ? B.stack || B.message : String(B),
            G = new Date().toISOString(),
            F = bG0(Z, fG0 + ".txt");
        if (!j1().existsSync(Z)) j1().mkdirSync(Z);
        if (!j1().existsSync(F)) j1().writeFileSync(F, "[]", {
            encoding: "utf8",
            flush: !1
        });
        let I = {
                error: D,
                timestamp: G,
                sessionId: CB(),
                cwd: j1().cwd()
            },
            Y = hG0(F);
        Y.push(I), j1().writeFileSync(F, JSON.stringify(Y, null, 2), {
            encoding: "utf8",
            flush: !1
        })
    } catch {}
}

function IB(A, B) {
    n1(`MCP server "${A}": ${B}`);
    try {
        let Q = $L.mcpLogs(A),
            Z = new Date().toISOString(),
            D = bG0(Q, fG0 + ".txt");
        if (!j1().existsSync(Q)) j1().mkdirSync(Q);
        if (!j1().existsSync(D)) j1().writeFileSync(D, "[]", {
            encoding: "utf8",
            flush: !1
        });
        let G = {
                debug: B,
                timestamp: Z,
                sessionId: CB(),
                cwd: j1().cwd()
            },
            F = hG0(D);
        F.push(G), j1().writeFileSync(D, JSON.stringify(F, null, 2), {
            encoding: "utf8",
            flush: !1
        })
    } catch {}
}
var j51 = 1000,
    k51 = 60;

function F2(A, B, Q = {
    timeout: 10 * k51 * j51,
    preserveOutputOnError: !0,
    useCwd: !0
}) {
    return s5(A, B, {
        abortSignal: Q.abortSignal,
        timeout: Q.timeout,
        preserveOutputOnError: Q.preserveOutputOnError,
        cwd: Q.useCwd ? t0() : void 0,
        env: Q.env
    })
}

function s5(A, B, Q = {
    timeout: 10 * k51 * j51,
    preserveOutputOnError: !0,
    maxBuffer: 1e6
}) {
    let {
        abortSignal: Z,
        timeout: D = 10 * k51 * j51,
        preserveOutputOnError: G = !0,
        cwd: F,
        env: I
    } = Q;
    return new Promise((Y) => {
        Dd1(A, B, {
            maxBuffer: Q.maxBuffer,
            signal: Z,
            timeout: D,
            cwd: F,
            env: I,
            reject: !1
        }).then((W) => {
            if (W.failed)
                if (G) {
                    let J = W.exitCode ?? 1;
                    Y({
                        stdout: W.stdout || "",
                        stderr: W.stderr || "",
                        code: J,
                        error: typeof W.signal === "string" ? W.signal : String(J)
                    })
                } else Y({
                    stdout: "",
                    stderr: "",
                    code: W.exitCode ?? 1
                });
            else Y({
                stdout: W.stdout,
                stderr: W.stderr,
                code: 0
            })
        }).catch((W) => {
            R1(W), Y({
                stdout: "",
                stderr: "",
                code: 1
            })
        })
    })
}

function zZ(A, B, Q = 10 * k51 * j51) {
    let Z;
    if (B === void 0) Z = {};
    else if (B instanceof AbortSignal) Z = {
        abortSignal: B,
        timeout: Q
    };
    else Z = B;
    let {
        abortSignal: D,
        timeout: G = 10 * k51 * j51
    } = Z;
    D?.throwIfAborted();
    try {
        let F = Gd1(A, {
            env: process.env,
            maxBuffer: 1e6,
            timeout: G,
            cwd: t0(),
            stdio: ["ignore", "pipe", "pipe"],
            shell: !0,
            reject: !1
        });
        if (!F.stdout) return null;
        return F.stdout.trim() || null
    } catch {
        return null
    }
}

function OR1(A) {
    try {
        let B = String(A),
            Q = process.platform === "win32" ? `powershell.exe -NoProfile -Command "(Get-CimInstance Win32_Process -Filter \\"ProcessId=${B}\\").ParentProcessId"` : `ps -o ppid= -p ${B}`,
            Z = zZ(Q, {
                timeout: 1000
            });
        return Z ? Z.trim() : null
    } catch {
        return null
    }
}

function tq2(A) {
    try {
        let B = String(A),
            Q = process.platform === "win32" ? `powershell.exe -NoProfile -Command "(Get-CimInstance Win32_Process -Filter \\"ProcessId=${B}\\").CommandLine"` : `ps -o command= -p ${B}`,
            Z = zZ(Q, {
                timeout: 1000
            });
        return Z ? Z.trim() : null
    } catch {
        return null
    }
}
import {
    join as gG0
} from "path";
import {
    homedir as $i4
} from "os";
var uG0 = G1(VQ0(), 1);
import {
    constants as eq2
} from "fs";

function vY() {
    if (j1().existsSync(gG0(e9(), ".config.json"))) return gG0(e9(), ".config.json");
    return gG0(process.env.CLAUDE_CONFIG_DIR || $i4(), ".claude.json")
}
var qi4 = EA(async () => {
        let {
            code: A
        } = await F2("test", ["-f", "/.dockerenv"]);
        if (A !== 0) return !1;
        return process.platform === "linux"
    }),
    Ni4 = EA(async () => {
        try {
            let A = h4(),
                B = setTimeout(() => A.abort(), 1000);
            return await J9.head("http://1.1.1.1", {
                signal: A.signal
            }), clearTimeout(B), !0
        } catch {
            return !1
        }
    });
async function yo(A) {
    try {
        let {
            cmd: B
        } = uG0.findActualExecutable(A, []);
        try {
            return j1().accessSync(B, eq2.F_OK | eq2.X_OK), !0
        } catch {
            return !1
        }
    } catch {
        return !1
    }
}
var Li4 = EA(async () => {
        let A = [];
        if (await yo("npm")) A.push("npm");
        if (await yo("yarn")) A.push("yarn");
        if (await yo("pnpm")) A.push("pnpm");
        return A
    }),
    Mi4 = EA(async () => {
        let A = [];
        if (await yo("bun")) A.push("bun");
        if (await yo("deno")) A.push("deno");
        if (await yo("node")) A.push("node");
        return A
    }),
    Ri4 = EA(() => {
        if (process.versions.bun !== void 0 || process.env.BUN_INSTALL !== void 0) return !0;
        return !1
    }),
    AN2 = EA(() => {
        try {
            return j1().existsSync("/proc/sys/fs/binfmt_misc/WSLInterop")
        } catch (A) {
            return !1
        }
    }),
    Oi4 = EA(() => {
        try {
            if (!AN2()) return !1;
            let {
                cmd: A
            } = uG0.findActualExecutable("npm", []);
            return A.startsWith("/mnt/c/")
        } catch (A) {
            return !1
        }
    }),
    BN2 = ["pycharm", "intellij", "webstorm", "phpstorm", "rubymine", "clion", "goland", "rider", "datagrip", "appcode", "dataspell", "aqua", "gateway", "fleet", "jetbrains", "androidstudio"],
    Ti4 = EA(() => {
        if (process.platform === "darwin") return null;
        try {
            let B = process.pid.toString();
            for (let Q = 0; Q < 10; Q++) {
                let Z = tq2(B);
                if (Z) {
                    let G = Z.toLowerCase();
                    for (let F of BN2)
                        if (G.includes(F)) return F
                }
                let D = OR1(B);
                if (!D || D === "0" || D === B) break;
                B = D
            }
        } catch {}
        return null
    });

function Pi4() {
    if (process.env.CURSOR_TRACE_ID) return "cursor";
    if (process.env.VSCODE_GIT_ASKPASS_MAIN?.includes("/.cursor-server/")) return "cursor";
    if (process.env.VSCODE_GIT_ASKPASS_MAIN?.includes("/.windsurf-server/")) return "windsurf";
    let A = process.env.__CFBundleIdentifier?.toLowerCase();
    if (A?.includes("vscodium")) return "codium";
    if (A?.includes("windsurf")) return "windsurf";
    if (A?.includes("com.google.android.studio")) return "androidstudio";
    if (A) {
        for (let B of BN2)
            if (A.includes(B)) return B
    }
    if (process.env.VisualStudioVersion) return "visualstudio";
    if (process.env.TERMINAL_EMULATOR === "JetBrains-JediTerm") {
        if (process.platform === "darwin") return "pycharm";
        return Ti4() || "pycharm"
    }
    if (process.env.TERM === "xterm-ghostty") return "ghostty";
    if (process.env.TERM?.includes("kitty")) return "kitty";
    if (process.env.TERM_PROGRAM) return process.env.TERM_PROGRAM;
    if (process.env.STY) return "screen";
    if (process.env.KONSOLE_VERSION) return "konsole";
    if (process.env.GNOME_TERMINAL_SERVICE) return "gnome-terminal";
    if (process.env.XTERM_VERSION) return "xterm";
    if (process.env.VTE_VERSION) return "vte-based";
    if (process.env.TERMINATOR_UUID) return "terminator";
    if (process.env.KITTY_WINDOW_ID) return "kitty";
    if (process.env.ALACRITTY_LOG) return "alacritty";
    if (process.env.TILIX_ID) return "tilix";
    if (process.env.WT_SESSION) return "windows-terminal";
    if (process.env.SESSIONNAME && process.env.TERM === "cygwin") return "cygwin";
    if (process.env.MSYSTEM) return process.env.MSYSTEM.toLowerCase();
    if (process.env.ConEmuTask) return "conemu";
    if (process.env.WSL_DISTRO_NAME) return `wsl-${process.env.WSL_DISTRO_NAME}`;
    if (process.env.SSH_CONNECTION || process.env.SSH_CLIENT || process.env.SSH_TTY) return "ssh-session";
    if (process.env.TERM) {
        let B = process.env.TERM;
        if (B.includes("alacritty")) return "alacritty";
        if (B.includes("rxvt")) return "rxvt";
        if (B.includes("termite")) return "termite";
        return process.env.TERM
    }
    if (!process.stdout.isTTY) return "non-interactive";
    return null
}
var sA = {
    getIsDocker: qi4,
    hasInternetAccess: Ni4,
    isCI: IQ(!1),
    platform: ["win32", "darwin"].includes(process.platform) ? process.platform : "linux",
    nodeVersion: process.version,
    terminal: Pi4(),
    getPackageManagers: Li4,
    getRuntimes: Mi4,
    isRunningWithBun: Ri4,
    isWslEnvironment: AN2,
    isNpmFromWindowsPath: Oi4
};
import {
    randomBytes as ji4
} from "crypto";
var DN2 = G1(QN1(), 1);
import {
    execSync as ki4
} from "child_process";
var CP = {
        allowedTools: [],
        history: [],
        mcpContextUris: [],
        mcpServers: {},
        enabledMcpjsonServers: [],
        disabledMcpjsonServers: [],
        hasTrustDialogAccepted: !1,
        ignorePatterns: [],
        projectOnboardingSeenCount: 0,
        hasClaudeMdExternalIncludesApproved: !1,
        hasClaudeMdExternalIncludesWarningShown: !1
    },
    fV = {
        numStartups: 0,
        installMethod: void 0,
        autoUpdates: void 0,
        theme: "dark",
        preferredNotifChannel: "auto",
        verbose: !1,
        editorMode: "normal",
        autoCompactEnabled: !0,
        hasSeenTasksHint: !1,
        queuedCommandUpHintCount: 0,
        diffTool: "auto",
        customApiKeyResponses: {
            approved: [],
            rejected: []
        },
        env: {},
        tipsHistory: {},
        memoryUsageCount: 0,
        promptQueueUseCount: 0,
        todoFeatureEnabled: !0,
        messageIdleNotifThresholdMs: 60000,
        autoConnectIde: !1,
        autoInstallIdeExtension: !0,
        autocheckpointingEnabled: !0,
        cachedStatsigGates: {}
    },
    _51 = ["apiKeyHelper", "installMethod", "autoUpdates", "theme", "verbose", "preferredNotifChannel", "shiftEnterKeyBindingInstalled", "editorMode", "hasUsedBackslashReturn", "supervisorMode", "autoCompactEnabled", "diffTool", "env", "tipsHistory", "todoFeatureEnabled", "messageIdleNotifThresholdMs", "autoConnectIde", "autoInstallIdeExtension", "autocheckpointingEnabled"];

function cG0(A) {
    return _51.includes(A)
}
var x51 = ["allowedTools", "hasTrustDialogAccepted", "hasCompletedProjectOnboarding", "ignorePatterns"];

function GN2(A) {
    let B = t0(),
        Q = x_(vY(), fV);
    while (!0) {
        if (Q.projects?.[B]?.hasTrustDialogAccepted) return !0;
        if (A) return !1;
        let D = QN2(B, "..");
        if (D === B) break;
        B = D
    }
    return !1
}
var TT5 = {
        ...fV,
        autoUpdates: !1
    },
    PT5 = {
        ...CP
    };

function lG0(A) {
    return x51.includes(A)
}

function _o(A, B) {
    if (B) {
        let Q = H0();
        return A in Q && Array.isArray(Q[A])
    } else {
        let Q = CP[A];
        return A in CP && Array.isArray(Q)
    }
}

function yi4(A, B) {
    if (_o(A, B)) return !1;
    if (B) {
        let Q = H0();
        return A in Q && typeof Q[A] === "object"
    } else {
        let Q = CP[A];
        return A in CP && typeof Q === "object"
    }
}

function _i4(A, B) {
    let Q = Array.from(new Set(B));
    switch (A) {
        case "allowedTools":
            return Q.length > 0 ? Q : ["git diff:*"];
        case "ignorePatterns":
            return Q.length > 0 ? Q.map((Z) => `Read(${Z})`) : ["Read(secrets.env)"]
    }
}