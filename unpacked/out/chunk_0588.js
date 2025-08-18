/* chunk:588 bytes:[13601206, 13620981) size:19775 source:unpacked-cli.js */
function _jB(A, B) {
    try {
        let Z = uW8()?.[A] ?? [],
            D = void 0;
        switch (B.hook_event_name) {
            case "PreToolUse":
            case "PostToolUse":
                D = B.tool_name;
                break;
            case "SessionStart":
                D = B.source;
                break;
            case "PreCompact":
                D = B.trigger;
                break;
            default:
                break
        }
        n1(`Getting matching hook commands for ${A} with query: ${D}`), n1(`Found ${Z.length} hook matchers in settings`);
        let G;
        if (!D) G = Z.flatMap((W) => W.hooks);
        else G = Z.filter((W) => !W.matcher || gW8(D, W.matcher)).flatMap((W) => W.hooks);
        let F = Array.from(new Map(G.filter((W) => W.type === "command").map((W) => [W.command, W])).values()),
            I = G.filter((W) => W.type === "callback"),
            Y = [...F, ...I];
        return n1(`Matched ${Y.length} unique hooks for query "${D||"no match query"}" (${G.length} before deduplication)`), Y
    } catch {
        return []
    }
}

function xjB(A, B) {
    let Q = B.map((Z) => `- ${Z.blockingError}`).join(`
`);
    return `${A} operation blocked by hook:
${Q}`
}

function vjB(A, B) {
    let Q = B.map((Z) => `- ${Z.blockingError}`).join(`
`);
    return `${A} operation feedback:
${Q}`
}

function bjB(A) {
    return `Stop hook feedback:
${A.map((Q)=>`- ${Q.blockingError}`).join(`
`)}`
}

function fjB(A) {
    return `UserPromptSubmit operation blocked by hook:
${A.map((Q)=>`- ${Q.blockingError}`).join(`
`)}`
}

function $L0(A, B) {
    let Q = h4(),
        Z = () => {
            Q.abort()
        };
    A.addEventListener("abort", Z), B.addEventListener("abort", Z);
    let D = () => {
        A.removeEventListener("abort", Z), B.removeEventListener("abort", Z)
    };
    return {
        signal: Q.signal,
        cleanup: D
    }
}
async function* VF1(A, B, Q, Z, D = qS, G = !1) {
    let F = A.hook_event_name,
        I = Q ? `${F}:${Q}` : F;
    if (GB().disableAllHooks) {
        n1(`Skipping hooks for ${I} due to 'disableAllHooks' setting`);
        return
    }
    n1(`Executing hooks for ${I}`);
    let Y = _jB(F, A).filter((N) => N.type === "command" || N.type === "callback");
    if (n1(`Found ${Y.length} hook commands to execute`), Y.length === 0) return;
    if (Z?.aborted) return;
    let W;
    try {
        W = JSON.stringify(A)
    } catch (N) {
        R1(Error(`Failed to stringify hook ${I} input`, {
            cause: N
        })), yield {
            message: q3(`Failed to prepare hook input: ${N instanceof Error?N.message:String(N)}`, "warning", B)
        };
        return
    }
    X1("tengu_run_hook", {
        hookName: I,
        numCommands: Y.length
    });
    let J = [];
    for (let N of Y) yield {
        message: {
            type: "progress",
            data: {
                type: "running_hook",
                hookName: I,
                command: N.type === "command" ? N.command : "callback"
            },
            parentToolUseID: B,
            toolUseID: `hook-${XF1()}`,
            timestamp: new Date().toISOString(),
            uuid: XF1()
        }
    };
    let X = Y.map(async (N) => {
            if (N.type === "callback") {
                let j, f;
                if (Z) {
                    let k = $L0(Z, AbortSignal.timeout(D));
                    j = k.signal, f = k.cleanup
                } else j = AbortSignal.timeout(D);
                return mW8(B, N, A, j).finally(f)
            }
            let R = N.timeout ? N.timeout * 1000 : D,
                O, P;
            if (Z) {
                let j = $L0(Z, AbortSignal.timeout(R));
                O = j.signal, P = j.cleanup
            } else O = AbortSignal.timeout(R);
            try {
                n1(`Executing hook command: ${N.command} with timeout ${R}ms`);
                let j = await qL0(N.command, W, O);
                if (P?.(), n1(`Hook command completed with status ${j.status}: ${N.command}`), j.stdout) n1(`Hook stdout: ${j.stdout.substring(0,200)}...`);
                if (j.stderr) n1(`Hook stderr: ${j.stderr}`);
                if (j.aborted) return {
                    message: q3(`${e1.bold(I)} [${N.command}] ${e1.yellow("cancelled")}`, "info", B),
                    outcome: "cancelled"
                };
                let {
                    json: f,
                    plainText: k,
                    validationError: c
                } = hW8(j.stdout);
                if (c) return {
                    message: q3(`${e1.bold(I)} [${N.command}] ${e1.yellow("JSON validation failed")}:
${c}`, "warning", B),
                    outcome: "non_blocking_error"
                };
                if (f) {
                    n1(`Parsed JSON output from hook: ${JSON.stringify(f)}`);
                    let u = yjB(f, N.command, F);
                    if (n1(`Processed hook result: ${JSON.stringify(u)}`), !f.suppressOutput && k && j.status === 0) {
                        let a = `${e1.bold(I)} [${N.command}] completed successfully`;
                        return {
                            ...u,
                            message: u.message || q3(a, "info", B),
                            outcome: "success"
                        }
                    }
                    return {
                        ...u,
                        outcome: "success"
                    }
                }
                if (j.status === 0) {
                    let u = `${e1.bold(I)} [${N.command}] completed successfully`;
                    if (j.stdout.trim()) u += `: ${j.stdout.trim()}`;
                    return {
                        message: q3(u, "info", B),
                        outcome: "success",
                        ...G && j.stdout ? {
                            additionalContext: j.stdout.trim()
                        } : {}
                    }
                }
                if (j.status === 2) return {
                    blockingError: {
                        blockingError: `[${N.command}]: ${j.stderr||"No stderr output"}`,
                        command: N.command
                    },
                    outcome: "blocking"
                };
                return {
                    message: q3(`${e1.bold(I)} [${N.command}] failed with non-blocking status code ${j.status}: ${j.stderr||"No stderr output"}`, "warning", B),
                    outcome: "non_blocking_error"
                }
            } catch (j) {
                P?.();
                let f = j instanceof Error ? j.message : String(j);
                return {
                    message: q3(`${e1.bold(I)} [${N.command}] failed to run: ${f}`, "warning", B),
                    outcome: "non_blocking_error"
                }
            }
        }),
        V = await Promise.all(X),
        C = {
            success: 0,
            blocking: 0,
            non_blocking_error: 0,
            cancelled: 0
        },
        K = !1,
        H, z, $, L = [];
    for (let N of V) {
        if (!N) continue;
        if (N.outcome) C[N.outcome]++;
        if (N.preventContinuation) {
            if (K = !0, N.stopReason) H = N.stopReason
        }
        if (N.blockingError) J.push(N.blockingError);
        if (N.message) yield {
            message: N.message
        };
        if (N.systemMessage) yield {
            message: N.systemMessage
        };
        if (N.additionalContext) L.push(N.additionalContext);
        if (N.permissionBehavior) switch (N.permissionBehavior) {
            case "deny":
                $ = "deny";
                break;
            case "ask":
                if ($ !== "deny") $ = "ask";
                break;
            case "allow":
                if (!$) $ = "allow";
                break;
            case "passthrough":
                break
        }
        if (N.hookPermissionDecisionReason) z = N.hookPermissionDecisionReason
    }
    if (X1("tengu_repl_hook_finished", {
            hookName: I,
            numCommands: Y.length,
            numSuccess: C.success,
            numBlocking: C.blocking,
            numNonBlockingError: C.non_blocking_error,
            numCancelled: C.cancelled
        }), yield {
            blockingErrors: J
        }, $ !== void 0) yield {
        permissionBehavior: $,
        hookPermissionDecisionReason: z
    };
    if (L.length > 0) yield {
        additionalContexts: L
    };
    if (K) yield {
        preventContinuation: !0,
        stopReason: H
    }
}
async function hjB(A, B, Q, Z = qS) {
    let D = A.hook_event_name,
        G = B ? `${D}:${B}` : D;
    if (GB().disableAllHooks) return n1(`Skipping hooks for ${G} due to 'disableAllHooks' setting`), [];
    let F = _jB(D, A).filter((J) => J.type === "command");
    if (F.length === 0) return [];
    if (Q?.aborted) return [];
    X1("tengu_run_hook", {
        hookName: G,
        numCommands: F.length
    });
    let I;
    try {
        I = JSON.stringify(A)
    } catch (J) {
        return R1(J instanceof Error ? J : new Error(String(J))), []
    }
    let Y = F.map(async (J) => {
        let X, V, C = J.timeout ? J.timeout * 1000 : Z;
        if (Q) {
            let K = $L0(Q, AbortSignal.timeout(C));
            X = K.signal, V = K.cleanup
        } else X = AbortSignal.timeout(C);
        try {
            let K = await qL0(J.command, I, X);
            if (V?.(), K.aborted) return n1(`${G} [${J.command}] cancelled`), {
                command: J.command,
                succeeded: !1,
                output: "Hook cancelled"
            };
            n1(`${G} [${J.command}] completed with status ${K.status}`);
            let H = K.status === 0 ? K.stdout || "" : K.stderr || "";
            return {
                command: J.command,
                succeeded: K.status === 0,
                output: H
            }
        } catch (K) {
            V?.();
            let H = K instanceof Error ? K.message : String(K);
            return SA(`${G} [${J.command}] failed to run: ${H}`), {
                command: J.command,
                succeeded: !1,
                output: H
            }
        }
    });
    return await Promise.all(Y)
}
async function* gjB(A, B, Q, Z, D = qS) {
    n1(`executePreToolHooks called for tool: ${A}`);
    let G = {
        ...NS(),
        hook_event_name: "PreToolUse",
        tool_name: A,
        tool_input: Q
    };
    yield* VF1(G, B, A, Z, D)
}
async function* ujB(A, B, Q, Z, D, G = qS) {
    let F = {
            ...NS(),
            hook_event_name: "PostToolUse",
            tool_name: A,
            tool_input: Q,
            tool_response: Z
        },
        I = VF1(F, B, A, D, G, !1),
        Y = !1;
    for await (let W of I) {
        let J = W.message;
        if (J === void 0 || J.type !== "progress") {
            yield W;
            continue
        }
        if (J.data.type === "running_hook" && !Y) yield {
            message: q3(`Running ${e1.bold(J.data.hookName)}...`, "info", B)
        }, Y = !0
    }
}
async function mjB(A, B = qS) {
    let Q = {
        ...NS(),
        hook_event_name: "Notification",
        message: A.message,
        title: A.title
    };
    await hjB(Q, void 0, void 0, B)
}
async function* djB(A, B = qS, Q = !1, Z = !1) {
    let D = {
        ...NS(),
        hook_event_name: Z ? "SubagentStop" : "Stop",
        stop_hook_active: Q
    };
    yield* VF1(D, XF1(), void 0, A, B)
}
async function* cjB(A, B, Q = qS) {
    let Z = {
        ...NS(),
        hook_event_name: "UserPromptSubmit",
        prompt: A
    };
    yield* VF1(Z, XF1(), void 0, B, Q, !0)
}
async function* ljB(A, B, Q = qS) {
    let Z = {
        ...NS(),
        hook_event_name: "SessionStart",
        source: A
    };
    yield* VF1(Z, XF1(), A, B, Q, !0)
}
async function pjB(A, B, Q = qS) {
    let Z = {
            ...NS(),
            hook_event_name: "PreCompact",
            trigger: A.trigger,
            custom_instructions: A.customInstructions
        },
        D = await hjB(Z, A.trigger, B, Q);
    if (D.length === 0) return {};
    let G = D.filter((I) => I.succeeded && I.output.trim().length > 0).map((I) => I.output.trim()),
        F = [];
    for (let I of D)
        if (I.succeeded)
            if (I.output.trim()) F.push(`PreCompact [${I.command}] completed successfully: ${I.output.trim()}`);
            else F.push(`PreCompact [${I.command}] completed successfully`);
    else if (I.output.trim()) F.push(`PreCompact [${I.command}] failed: ${I.output.trim()}`);
    else F.push(`PreCompact [${I.command}] failed`);
    return {
        newCustomInstructions: G.length > 0 ? G.join(`

`) : void 0,
        userDisplayMessage: F.length > 0 ? F.join(`
`) : void 0
    }
}
async function ijB(A, B, Q = 5000) {
    let Z = GB(),
        D = Z?.statusLine;
    if (Z?.disableAllHooks === !0) return;
    if (!D || D.type !== "command") return;
    let G = B || AbortSignal.timeout(Q);
    try {
        let F = JSON.stringify(A),
            I = await qL0(D.command, F, G);
        if (I.aborted) return;
        if (I.status === 0) {
            let Y = I.stdout.trim().split(`
`).flatMap((W) => W.trim() || []).join(`
`);
            if (Y) return Y
        }
        return
    } catch (F) {
        SA(`Status hook failed: ${F}`);
        return
    }
}
async function mW8(A, B, Q, Z) {
    let D = await B.callback(Q, A, Z);
    return {
        ...yjB(D, "callback"),
        outcome: "success"
    }
}

function NL0({
    message: A,
    title: B
}) {
    let Q = B ? `${B}:
${A}` : A;
    try {
        process.stdout.write(`\x1B]9;

${Q}\x07`)
    } catch {}
}

function njB({
    message: A,
    title: B
}) {
    try {
        let Q = Math.floor(Math.random() * 1e4);
        process.stdout.write(`\x1B]99;i=${Q}:d=0:p=title;${B||"Claude Code"}\x1B\\`), process.stdout.write(`\x1B]99;i=${Q}:p=body;${A}\x1B\\`), process.stdout.write(`\x1B]99;i=${Q}:d=1:a=focus;\x1B\\`)
    } catch {}
}

function dW8({
    message: A,
    title: B
}) {
    try {
        let Q = B || "Claude Code";
        process.stdout.write(`\x1B]777;notify;${Q};${A}\x07`)
    } catch {}
}

function LL0() {
    process.stdout.write("\x07")
}
async function cW8(A, B) {
    return
}
async function lW8() {
    try {
        if (sA.terminal !== "Apple_Terminal") return !1;
        let B = (await F2("osascript", ["-e", 'tell application "Terminal" to name of current settings of front window'])).stdout.trim();
        if (!B) return !1;
        let Q = await F2("defaults", ["export", "com.apple.Terminal", "-"]);
        if (Q.code !== 0) return !1;
        let G = ajB.default.parse(Q.stdout)?.["Window Settings"]?.[B];
        if (!G) return !1;
        return G.Bell === !1
    } catch (A) {
        return R1(A instanceof Error ? A : new Error(String(A))), !1
    }
}
async function w01(A) {
    let B = H0(),
        Q = B.preferredNotifChannel,
        Z = "none";
    if (B.customNotifyCommand) await cW8(A, B.customNotifyCommand);
    switch (await mjB(A), Q) {
        case "auto":
            if (sA.terminal === "Apple_Terminal")
                if (await lW8()) LL0(), Z = "terminal_bell";
                else Z = "no_method_available";
            else if (sA.terminal === "iTerm.app") NL0(A), Z = "iterm2";
            else if (sA.terminal === "kitty") njB(A), Z = "kitty";
            else if (sA.terminal === "ghostty") dW8(A), Z = "ghostty";
            else Z = "no_method_available";
            break;
        case "iterm2":
            NL0(A), Z = "iterm2";
            break;
        case "terminal_bell":
            LL0(), Z = "terminal_bell";
            break;
        case "iterm2_with_bell":
            NL0(A), LL0(), Z = "iterm2_with_bell";
            break;
        case "kitty":
            njB(A), Z = "kitty";
            break;
        case "notifications_disabled":
            Z = "disabled";
            break
    }
    X1("tengu_notification_method_used", {
        configured_channel: Q,
        method_used: Z,
        term: sA.terminal
    })
}
var sjB = G1(z1(), 1);

function rjB(A, B = !1) {
    sjB.useEffect(() => {
        if (!B) Gq1(A)
    }, [A, B])
}
var pb1 = G1(z1(), 1);
import {
    join as $01
} from "path";
import {
    createHash as pW8
} from "crypto";
async function lb1(A, B, Q, Z) {
    return
}
async function AkB(A, B, Q) {
    return
}
async function BkB(A, B, Q, Z) {
    if (Q.status !== "initialized" || !Q.shadowRepoPath) throw new Error("Checkpointing not initialized");
    return QkB(A, B, Q, Z)
}
async function QkB(A, B, Q, Z) {
    throw new Error("Not enabled")
}
async function ojB(A, B, Q) {
    if (B.saving) {
        let D = new Error("Failed to save checkpoint; another save is in progress");
        throw R1(D), SA(D.message), D
    }
    Q({
        ...B,
        saving: !0
    });
    let Z = Date.now();
    try {
        let D = void 0,
            {
                stdout: G,
                code: F
            } = await s5("git", ["status", "--porcelain", t0()], {
                cwd: B.shadowRepoPath
            });
        if (F === 0 && G.trim() === "") {
            let {
                stdout: Y,
                code: W
            } = await s5("git", ["rev-parse", "HEAD"], {
                cwd: B.shadowRepoPath
            });
            if (W === 0) D = Y.trim()
        }
        if (!D) {
            await s5("git", ["add", "--ignore-errors", t0()], {
                cwd: B.shadowRepoPath
            });
            let {
                code: Y
            } = await s5("git", ["commit", "-m", A.label, "--allow-empty"], {
                cwd: B.shadowRepoPath
            });
            if (Y !== 0) throw new Error("Failed to save checkpoint (commit)");
            let {
                stdout: W,
                code: J
            } = await s5("git", ["rev-parse", "HEAD"], {
                cwd: B.shadowRepoPath
            });
            if (J !== 0) throw new Error("Failed to save checkpoint (no new commit hash)");
            D = W.trim()
        }
        if (!D) throw new Error("Failed to save checkpoint (no commit hash)");
        A.commit = D, Q({
            ...B,
            saving: !1,
            checkpoints: {
                ...B.checkpoints,
                [A.id]: A
            }
        }), Z40(A).catch((Y) => {});
        let I = Date.now() - Z;
        X1("tengu_checkpoint_save_success", {
            duration: I
        })
    } catch (D) {
        Q({
            ...B,
            saving: !1
        }), R1(D), SA(`${D}`);
        let G = Date.now() - Z;
        throw X1("tengu_checkpoint_save_failed", {
            duration: G
        }), D
    }
}
async function ZkB(A, B, Q) {
    throw new Error("Not enabled")
}

function ML0(A, B) {
    return
}

function DkB(A) {
    let B = A.checkpoints;
    if (B)
        for (let Q of B) Z40(Q).catch((Z) => {})
}
async function iW8(A, B) {
    let Q = await tjB(B),
        Z = await ejB(B),
        D = await nW8(B),
        G = D !== B ? await tjB(D) : [],
        F = D !== B ? await ejB(D) : [],
        I = Array.from(new Set(aW8.concat(G, F, Q, Z))),
        Y = j1(),
        W = $01(A, "info"),
        J = $01(A, "info", "exclude");
    if (!Y.existsSync(W)) Y.mkdirSync(W);
    Y.writeFileSync(J, I.join(`
`), {
        encoding: "utf8",
        flush: !0
    })
}
async function tjB(A) {
    try {
        let B = j1(),
            Q = $01(A, ".gitattributes");
        if (B.existsSync(Q)) return B.readFileSync(Q, {
            encoding: "utf8"
        }).split(`
`).filter((D) => D.includes("filter=lfs")).map((D) => D.split(" ")[0]?.trim() || "").filter((D) => D.length > 0)
    } catch (B) {}
    return []
}