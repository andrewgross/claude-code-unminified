/* chunk:648 bytes:[14665406, 14673302) size:7896 source:unpacked-cli.js */
async function vT8(A, B) {
    if (IQ(!1) || process.env.IS_DEMO) return !1;
    let Q = H0(),
        Z = !1;
    if (!Q.theme || !Q.hasCompletedOnboarding) Z = !0, await V7(), await new Promise((D) => {
        let {
            unmount: G
        } = S8(m7.default.createElement(F7, {
            onChangeAppState: Gc
        }, m7.default.createElement(fgB, {
            onDone: async () => {
                xT8(), await V7(), G(), D()
            }
        })), {
            exitOnCtrlC: !1
        })
    });
    if (process.env.ANTHROPIC_API_KEY) {
        let D = xK(process.env.ANTHROPIC_API_KEY);
        if (PR1(D) === "new") await new Promise((F) => {
            let {
                unmount: I
            } = S8(m7.default.createElement(F7, {
                onChangeAppState: Gc
            }, m7.default.createElement(ih1, {
                customApiKeyTruncated: D,
                onDone: () => {
                    I(), F()
                }
            })), {
                exitOnCtrlC: !1
            })
        })
    }
    if (A !== "bypassPermissions" && process.env.CLAUBBIT !== "true") {
        await new Promise((G) => {
            let {
                unmount: F
            } = S8(m7.default.createElement(F7, null, m7.default.createElement(QlB, {
                commands: B,
                onDone: () => {
                    F(), G()
                }
            })), {
                exitOnCtrlC: !1
            })
        });
        let {
            errors: D
        } = qL();
        if (D.length === 0) await ElB();
        if (await RkB()) await new Promise((G) => {
            let {
                unmount: F
            } = S8(m7.default.createElement(F7, null, m7.default.createElement(Bh1, {
                onDone: () => {
                    F(), G()
                }
            })), {
                exitOnCtrlC: !1
            })
        })
    }
    if (A === "bypassPermissions" && !H0().bypassPermissionsModeAccepted) await new Promise((D) => {
        let {
            unmount: G
        } = S8(m7.default.createElement(F7, null, m7.default.createElement(UlB, {
            onAccept: () => {
                G(), D()
            }
        })))
    });
    return Z
}
async function nlB(A, B) {
    try {
        let Q = await z01(A, B);
        if (Q.type === "connected") return "✓ Connected";
        else if (Q.type === "needs-auth") return "⚠ Needs authentication";
        else return "✗ Failed to connect"
    } catch (Q) {
        return "✗ Connection error"
    }
}

function bT8() {
    let A = H0();
    gA({
        ...A,
        numStartups: (A.numStartups ?? 0) + 1
    }), fT8(), bk0()?.add(1)
}
async function fT8() {
    let [A, B] = await Promise.all([XL(), k61()]);
    X1("tengu_startup_telemetry", {
        is_git: A,
        worktree_count: B
    })
}

function hT8() {
    wlB(), $lB(), qlB(), NlB(), OeA()
}
async function Tb(A, B, Q, Z, D) {
    let G = process.version.match(/^v(\d+)\./)?.[1];
    if (!G || parseInt(G) < 18) console.error(e1.bold.red("Error: Claude Code requires Node.js version 18 or higher.")), process.exit(1);
    if (D) Nk0(D);
    if (wL0(), IQ(!1)) console.warn("Running in CI environment - interactive features are limited");
    let F = s8B();
    if (F.status === "restored") console.log(e1.yellow("Detected an interrupted iTerm2 setup. Your original settings have been restored. You may need to restart iTerm2 for the changes to take effect."));
    else if (F.status === "failed") console.error(e1.red(`Failed to restore iTerm2 settings. Please manually restore your original settings with: defaults import com.googlecode.iterm2 ${F.backupPath}.`));
    try {
        let J = await uj1();
        if (J.status === "restored") console.log(e1.yellow("Detected an interrupted Terminal.app setup. Your original settings have been restored. You may need to restart Terminal.app for the changes to take effect."));
        else if (J.status === "failed") console.error(e1.red(`Failed to restore Terminal.app settings. Please manually restore your original settings with: defaults import com.apple.Terminal ${J.backupPath}.`))
    } catch (J) {
        R1(J instanceof Error ? J : new Error(String(J)))
    }
    let I = Q ?? !1;
    rE(A), eD(), XlB(), KlB(), OuB(), aq2(), Pg1(), lf1(I), PX(), bS(), Kg(), Mu(), JG1().catch(R1), Hv1([], CB()), OPB(), z_A(), sPB().catch(R1), H5B();
    let Y = h4();
    if (setTimeout(() => Y.abort(), 3000), v$1(t0(), Y.signal, []), B === "bypassPermissions") {
        if (process.platform !== "win32" && typeof process.getuid === "function" && process.getuid() === 0 && !process.env.IS_SANDBOX) console.error("--dangerously-skip-permissions cannot be used with root/sudo privileges for security reasons"), process.exit(1)
    }
    let W = UQ();
    if (W.lastCost !== void 0 && W.lastDuration !== void 0) X1("tengu_exit", {
        last_session_cost: W.lastCost,
        last_session_api_duration: W.lastAPIDuration,
        last_session_duration: W.lastDuration,
        last_session_lines_added: W.lastLinesAdded,
        last_session_lines_removed: W.lastLinesRemoved,
        last_session_total_input_tokens: W.lastTotalInputTokens,
        last_session_total_output_tokens: W.lastTotalOutputTokens,
        last_session_total_cache_creation_input_tokens: W.lastTotalCacheCreationInputTokens,
        last_session_total_cache_read_input_tokens: W.lastTotalCacheReadInputTokens,
        last_session_id: W.lastSessionId
    }), r5({
        ...W,
        lastCost: void 0,
        lastAPIDuration: void 0,
        lastDuration: void 0,
        lastLinesAdded: void 0,
        lastLinesRemoved: void 0,
        lastTotalInputTokens: void 0,
        lastTotalOutputTokens: void 0,
        lastTotalCacheCreationInputTokens: void 0,
        lastTotalCacheReadInputTokens: void 0,
        lastSessionId: void 0
    })
}
async function gT8() {
    if (process.argv[2] === "--ripgrep") {
        let I = process.argv.slice(3);
        process.exit(NBB(I))
    }
    if (!process.env.CLAUDE_CODE_ENTRYPOINT) process.env.CLAUDE_CODE_ENTRYPOINT = "cli";
    process.on("exit", () => {
        cT8()
    }), process.on("SIGINT", () => {
        process.exit(0)
    });
    let A = process.argv.slice(2),
        B = A.includes("-p") || A.includes("--print"),
        Q = A.some((I) => I.startsWith("--sdk-url")),
        Z = B || Q || !process.stdout.isTTY;
    lk0(Z), ik0(!Z);
    let G = (() => {
        if (process.env.GITHUB_ACTIONS === "true") return "github-action";
        if (process.env.CLAUDE_CODE_ENTRYPOINT === "sdk-ts") return "sdk-typescript";
        if (process.env.CLAUDE_CODE_ENTRYPOINT === "sdk-py") return "sdk-python";
        if (process.env.CLAUDE_CODE_ENTRYPOINT === "sdk-cli") return "sdk-cli";
        return "cli"
    })();
    ak0(G);
    let F = qBB();
    if (F instanceof Promise) await F;
    process.title = "claude", await dT8()
}

function uT8(A) {
    let B = {
        exitOnCtrlC: A,
        onFlicker: (Q, Z) => {
            X1("tengu_flicker", {
                desiredHeight: Q,
                actualHeight: Z
            })
        }
    };
    if (!process.stdin.isTTY && !IQ(!1) && !process.argv.includes("mcp")) {
        if (process.platform !== "win32") try {
            let Q = yT8("/dev/tty", "r");
            B = {
                ...B,
                stdin: new kT8(Q)
            }
        } catch (Q) {
            R1(Q)
        }
    }
    return B
}
async function mT8(A, B) {
    if (!process.stdin.isTTY && !process.argv.includes("mcp")) {
        if (B === "stream-json") return process.stdin;
        process.stdin.setEncoding("utf8");
        let Q = "";
        return process.stdin.on("data", (Z) => {
            Q += Z
        }), await new Promise((Z) => {
            process.stdin.on("end", Z)
        }), [A, Q].filter(Boolean).join(`
`)
    }
    return A
}