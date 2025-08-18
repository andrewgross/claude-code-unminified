/* chunk:575 bytes:[13367993, 13385750) size:17757 source:unpacked-cli.js */
function lG8(A) {
    let B = pG8(A),
        Q = cG8.get(B);
    return Q !== void 0 ? Q : dG8
}

function pG8(A) {
    return (A.split("|").pop()?.trim() || A).trim().split(/\s+/)[0] || ""
}

function XPB(A, B, Q, Z) {
    let G = lG8(A)(B, Q, Z);
    return {
        isError: G.isError,
        message: G.message
    }
}
var VPB = 2000,
    aG8 = 1000,
    sG8 = ["sleep"],
    HPB = h.strictObject({
        command: h.string().describe("The command to execute"),
        timeout: h.number().optional().describe(`Optional timeout in milliseconds (max ${Ev1()})`),
        description: h.string().optional().describe(` Clear, concise description of what this command does in 5-10 words. Examples:
Input: ls
Output: Lists files in current directory

Input: git status
Output: Shows working tree status

Input: npm install
Output: Installs package dependencies

Input: mkdir foo
Output: Creates directory 'foo'`),
        ...{
            run_in_background: h.boolean().optional().describe("Set to true to run this command in the background. Use BashOutput to read the output later.")
        }
    }),
    rG8 = HPB.extend({
        sandbox: h.boolean().optional().describe("whether to run this command in sandboxed mode: command run in this mode may not write to the filesystem or use the network, but they can read files, analyze data, and report back to you.  When possible, run commands (e.g. grep) in this mode to present a smoother experience for the human, who isn't prompted to approve commands run in sandbox mode. If you run a command in sandbox mode and it looks like it fails because it needs write access after all, try again in non-sandbox mode"),
        shellExecutable: h.string().optional().describe("Optional shell path to use instead of the default shell. The snapshot path will be set to undefined as well. Used primarily for testing.")
    }),
    oG8 = ["npm", "yarn", "pnpm", "node", "python", "python3", "go", "cargo", "make", "docker", "terraform", "webpack", "vite", "jest", "pytest", "curl", "wget", "build", "test", "serve", "watch", "dev"];

function CPB(A) {
    let B = aM(A);
    if (B.length === 0) return "other";
    for (let Q of B) {
        let Z = Q.split(" ")[0] || "";
        if (oG8.includes(Z)) return Z
    }
    return "other"
}
var oY3 = h.object({
        stdout: h.string().describe("The standard output of the command"),
        stderr: h.string().describe("The standard error output of the command"),
        summary: h.string().optional().describe("Summarized output when available"),
        rawOutputPath: h.string().optional().describe("Path to raw output file when summarized"),
        interrupted: h.boolean().describe("Whether the command was interrupted"),
        isImage: h.boolean().optional().describe("Flag to indicate if stdout contains image data"),
        backgroundTaskId: h.string().optional().describe("ID of the background task if command is running in background"),
        sandbox: h.boolean().optional().describe("Flag to indicate if the command was run in sandbox mode"),
        returnCodeInterpretation: h.string().optional().describe("Semantic interpretation for non-error exit codes with special meaning")
    }),
    KPB = 2,
    LN0 = 160;

function tG8({
    onBackground: A
}) {
    DA((Q, Z) => {
        if (Q === "b" && Z.ctrl) A()
    });
    let B = sA.terminal === "tmux" ? "ctrl+b ctrl+b to run in background" : "ctrl+b to run in background";
    return _7.createElement(v, {
        paddingLeft: 5
    }, _7.createElement(T, {
        color: "secondaryText"
    }, B))
}

function eG8(A) {
    return new RegExp(`^${A}(?:\\s|$)[^<>()$\`|{}&;\\n\\r]*$`)
}
var AF8 = ["date", "cal", "uptime", "head", "tail", "wc", "stat", "strings", "hexdump", "nl", "id", "uname", "free", "df", "du", "locale", "hostname", "arch", "groups", "nproc", "npm list", "docker ps", "docker images", "ip addr", "ifconfig", "info", "help", "basename", "dirname", "realpath", "base64", "cut", "tr", "column", "diff", "sleep", "which", "type"],
    BF8 = new Set([...AF8.map(eG8), /^echo(?:\s+(?:'[^']*'|"[^"$<>\n\r]*"|[^|;&`$(){}><#\\!"'\s]+))*\s*$/, /^claude -h$/, /^claude --help$/, /^git diff(?!\s+.*--ext-diff)(?!\s+.*--extcmd)(?!\s+.*--output)(?!\s+.*--textconv)[^<>()$`|{}&;\n\r]*$/, /^git log[^<>()$`|{}&;\n\r]*$/, /^git show(?!\s+.*--ext-diff)(?!\s+.*--extcmd)(?!\s+.*--output)(?!\s+.*--textconv)[^<>()$`|{}&;\n\r]*$/, /^git status[^<>()$`|{}&;\n\r]*$/, /^git blame[^<>()$`|{}&;\n\r]*$/, /^git reflog(?!\s+.*--updateref)(?!\s+.*--rewrite)[^<>()$`|{}&;\n\r]*$/, /^git stash list[^<>()$`|{}&;\n\r]*$/, /^git ls-files[^<>()$`|{}&;\n\r]*$/, /^git ls-remote(?:\s+[a-zA-Z0-9_-]+(?:\s+[^<>()$`|{}&;\n\r]+)?)?$/, /^git config --get[^<>()$`|{}&;\n\r]*$/, /^git remote -v$/, /^git remote show[^<>()$`|{}&;\n\r]*$/, /^git tag$/, /^git tag -l[^<>()$`|{}&;\n\r]*$/, /^git branch$/, /^git branch (?:-v|-vv|--verbose)$/, /^git branch (?:-a|--all)$/, /^git branch (?:-r|--remotes)$/, /^git branch (?:-l|--list)(?:\s+".*"|'[^']*')?$/, /^git branch (?:--color|--no-color|--column|--no-column)$/, /^pip list(?:\s|$)(?!.*--log)[^<>()$`|{}&;\n\r]*$/, /^file(?:\s|$)(?!.*-C)(?!.*--compile)[^<>()$`|{}&;\n\r]*$/, /^git branch --sort=\S+$/, /^git branch --show-current$/, /^git branch (?:--contains|--no-contains)\s+\S+$/, /^git branch (?:--merged|--no-merged)(?:\s+\S+)?$/, /^sort(?!\s+.*-o\b)(?!\s+.*--output)(?:\s|$)[^<>()$`|{}&;\n\r]*$/, /^uniq(?:\s+(?:-[a-zA-Z]+|--[a-zA-Z-]+(?:=\S+)?|-[fsw]\s+\d+))*(?:\s|$)\s*$/, /^grep\s+(?:(?:-[a-zA-Z]+|-[ABC](?:\s+)?\d+)\s+)*(?:'[^']*'|".*"|\S+)(?:\s+(?:-[a-zA-Z]+|-[ABC](?:\s+)?\d+))*\s*$/, /^rg\s+(?:(?:-[a-zA-Z]+|-[ABC](?:\s+)?\d+)\s+)*(?:'[^']*'|".*"|\S+)(?:\s+(?:-[a-zA-Z]+|-[ABC](?:\s+)?\d+))*\s*$/, /^sed(?!\s*-[^-\s]*i)(?!\s*--in-place)(?!\s*-[^-\s]*f)(?!\s*--file)(?!\s*--expression-file)(?:\s+(?:-[nzEr]+|-e\s+(?:'[^']*'|"[^"]*")))*(?:\s+(?:'[^']*'|"[^"]*"))?(?:\s+(?:-[nzEr]+|-e\s+(?:'[^']*'|"[^"]*")))*\s*$/, /^pwd$/, /^whoami$/, /^ps(?:\s|$)(?!.*-o)[^<>()$`|{}&;\n\r]*$/, /^node -v$/, /^npm -v$/, /^python --version$/, /^python3 --version$/, /^netstat(?!\s+.*-p)(?:\s|$)[^<>()$`|{}&;\n\r]*$/, /^man(?!\s+.*-P)(?!\s+.*--pager)(?!\s+.*-H)\b(?:\s|$)[^<>()$`|{}&;\n\r]*$/, /^tree$/, /^history(?!\s+.*-c)(?:\s|$)[^<>()$`|{}&;\n\r]*$/, /^alias$/, /^jq(?!\s+.*(?:-f\b|--from-file|--rawfile|--slurpfile|--run-tests))(?:\s+(?:-[a-zA-Z]+|--[a-zA-Z-]+(?:=\S+)?))*(?: +(?:'[^'`]*'|"[^"`]*"|[^-\s][^\s]*))?\s*$/, /^xargs(?:\s+(?:-[a-zA-Z0-9]+(?:\s+[^\s-][^\s]*)?|--[a-zA-Z-]+(?:=\S+)?))*?\s+(?:echo|printf|wc|grep|head|tail)(?:\s+[^<>()$`|&;\n\r]*)?$/, /^cd(?:\s+(?:'[^']*'|"[^"]*"|[^\s;|&`$(){}><#\\]+))?$/, /^ls(?:\s+[^<>()$`|{}&;\n\r]*)?$/, /^find(?:\s+(?:(?!-delete\b|-exec\b|-execdir\b|-ok\b|-okdir\b|-fprint0?\b|-fls\b|-fprintf\b)[^<>()$`|{}&;\n\r\s]|\\[()]|\s)+)?$/]);

function QF8(A, B) {
    if (B !== 0) return;
    if (A.match(/^\s*git\s+commit\b/)) X1("tengu_git_operation", {
        operation: "commit"
    }), hk0()?.add(1);
    else if (A.match(/^\s*gh\s+pr\s+create\b/)) X1("tengu_git_operation", {
        operation: "pr_create"
    }), fk0()?.add(1)
}

function ZF8(A) {
    let B = A;
    if (A.endsWith(" 2>&1")) B = A.slice(0, -5).trim();
    for (let Q of BF8)
        if (Q.test(B)) return !0;
    return !1
}

function DF8(A) {
    let B = aM(A);
    if (B.length === 0) return !0;
    let Q = B[0]?.trim();
    if (!Q) return !0;
    return !sG8.includes(Q)
}
var VQ = {
    name: SZ,
    async description({
        description: A
    }) {
        return A || "Run shell command"
    },
    async prompt() {
        return BMB()
    },
    isConcurrencySafe(A) {
        return this.isReadOnly(A)
    },
    isReadOnly(A) {
        let {
            command: B
        } = A;
        if ("sandbox" in A ? !!A.sandbox : !1) return !0;
        if (Tv(B).behavior !== "passthrough") return !1;
        return aM(B).every((Z) => {
            if (Tv(Z).behavior !== "passthrough") return !1;
            return ZF8(Z)
        })
    },
    inputSchema: Cv1() ? rG8 : HPB,
    userFacingName(A) {
        if (!A) return "Bash";
        return ("sandbox" in A ? !!A.sandbox : !1) ? "SandboxedBash" : "Bash"
    },
    isEnabled() {
        return !0
    },
    async checkPermissions(A, B) {
        if ("sandbox" in A ? !!A.sandbox : !1) return {
            behavior: "allow",
            updatedInput: A
        };
        return NN0(A, B)
    },
    renderToolUseMessage(A, {
        verbose: B
    }) {
        let {
            command: Q
        } = A;
        if (!Q) return null;
        let Z = Q;
        if (Q.includes(`"$(cat <<'EOF'`)) {
            let D = Q.match(/^(.*?)"?\$\(cat <<'EOF'\n([\s\S]*?)\n\s*EOF\n\s*\)"(.*)$/);
            if (D && D[1] && D[2]) {
                let G = D[1],
                    F = D[2],
                    I = D[3] || "";
                Z = `${G.trim()} "${F.trim()}"${I.trim()}`
            }
        }
        if (!B) {
            let D = Z.split(`
`),
                G = D.length > KPB,
                F = Z.length > LN0;
            if (G || F) {
                let I = Z;
                if (G) I = D.slice(0, KPB).join(`
`);
                if (I.length > LN0) I = I.slice(0, LN0);
                return _7.createElement(T, null, I.trim(), "…")
            }
        }
        return Z
    },
    renderToolUseRejectedMessage() {
        return _7.createElement(P5, null)
    },
    renderToolUseProgressMessage(A) {
        let B = A.at(-1);
        if (!B || !B.data || !B.data.output) return _7.createElement(OA, {
            height: 1
        }, _7.createElement(T, {
            color: "secondaryText"
        }, "Running…"));
        let Q = B.data;
        return _7.createElement(Ab1, {
            lastLines: Q.output,
            elapsedTimeSeconds: Q.elapsedTimeSeconds,
            totalLines: Q.totalLines
        })
    },
    renderToolUseQueuedMessage() {
        return _7.createElement(OA, {
            height: 1
        }, _7.createElement(T, {
            color: "secondaryText"
        }, "Waiting…"))
    },
    renderToolResultMessage(A, B, {
        verbose: Q
    }) {
        return _7.createElement(Kd, {
            content: A,
            verbose: Q
        })
    },
    mapToolResultToToolResultBlockParam({
        interrupted: A,
        stdout: B,
        stderr: Q,
        summary: Z,
        isImage: D,
        backgroundTaskId: G
    }, F) {
        if (D) {
            let J = B.trim().match(/^data:([^;]+);base64,(.+)$/);
            if (J) {
                let X = J[1],
                    V = J[2];
                return {
                    tool_use_id: F,
                    type: "tool_result",
                    content: [{
                        type: "image",
                        source: {
                            type: "base64",
                            media_type: X || "image/jpeg",
                            data: V || ""
                        }
                    }]
                }
            }
        }
        if (Z) return {
            tool_use_id: F,
            type: "tool_result",
            content: Z,
            is_error: A
        };
        let I = B;
        if (B) I = B.replace(/^(\s*\n)+/, ""), I = I.trimEnd();
        let Y = Q.trim();
        if (A) {
            if (Q) Y += Wb1;
            Y += "<error>Command was aborted before completion</error>"
        }
        let W = G ? `Command running in background with ID: ${G}` : "";
        return {
            tool_use_id: F,
            type: "tool_result",
            content: [I, Y, W].filter(Boolean).join(`
`),
            is_error: A
        }
    },
    async * call(A, B) {
        let {
            abortController: Q,
            getToolPermissionContext: Z,
            readFileState: D,
            options: {
                isNonInteractiveSession: G
            },
            setToolJSX: F,
            messages: I
        } = B, Y = "", W = "", J, X = 0, V = !1, C;
        try {
            let P = FF8({
                    input: A,
                    abortController: Q,
                    setToolJSX: F
                }),
                j;
            do
                if (j = await P.next(), !j.done) {
                    let f = j.value;
                    yield {
                        type: "progress",
                        toolUseID: `bash-progress-${X++}`,
                        data: {
                            type: "bash_progress",
                            output: f.output,
                            elapsedTimeSeconds: f.elapsedTimeSeconds,
                            totalLines: f.totalLines
                        }
                    }
                } while (!j.done);
            if (C = j.value, QF8(A.command, C.code), Y += (C.stdout || "").trimEnd() + Wb1, J = XPB(A.command, C.code, C.stdout || "", C.stderr || ""), J.isError) {
                if (W += (C.stderr || "").trimEnd() + Wb1, C.code !== 0) W += `Exit code ${C.code}`
            } else Y += (C.stderr || "").trimEnd() + Wb1;
            if (Lv1(Z())) W = Nv1(W);
            if (J.isError) throw new KL(C.stdout, C.stderr, C.code, C.interrupted);
            V = C.interrupted
        } finally {
            if (F) F(null)
        }
        RMB(A.command, Y, G).then(async (P) => {
            for (let j of P) {
                let f = iG8(j) ? j : nG8(t0(), j);
                try {
                    if (!(await x8.validateInput({
                            file_path: f
                        })).result) {
                        D.delete(f);
                        continue
                    }
                    await tM(x8.call({
                        file_path: f
                    }, B))
                } catch (k) {
                    D.delete(f), R1(k)
                }
            }
            X1("tengu_bash_tool_haiku_file_paths_read", {
                filePathsExtracted: P.length,
                readFileStateSize: D.size,
                readFileStateValuesCharLength: hv(D).reduce((j, f) => {
                    let k = D.get(f);
                    return j + (k?.content.length || 0)
                }, 0)
            })
        });
        let K = await GF8(Y, W, A.command, I || []),
            H = K?.shouldSummarize === !0,
            z = K?.modelReason,
            $ = A.command.split(" ")[0];
        X1("tengu_bash_tool_command_executed", {
            command_type: $,
            stdout_length: Y.length,
            stderr_length: W.length,
            exit_code: C.code,
            interrupted: V,
            summarization_attempted: K !== null,
            summarization_succeeded: H,
            summarization_duration_ms: K?.queryDurationMs,
            summarization_reason: !H && K ? K.reason : void 0,
            model_summarization_reason: z,
            summary_length: K?.shouldSummarize && K.summary ? K.summary.length : void 0
        });
        let {
            truncatedContent: L,
            isImage: N
        } = iM(KS(Y)), {
            truncatedContent: R
        } = iM(KS(W));
        yield {
            type: "result",
            data: {
                stdout: L,
                stderr: R,
                summary: H ? K?.summary : void 0,
                rawOutputPath: H ? K?.rawOutputPath : void 0,
                interrupted: V,
                isImage: N,
                returnCodeInterpretation: J?.message,
                backgroundTaskId: C.backgroundTaskId
            }
        }
    },
    renderToolUseErrorMessage(A, {
        verbose: B
    }) {
        return _7.createElement(f6, {
            result: A,
            verbose: B
        })
    }
};
async function GF8(A, B, Q, Z) {
    return null
}
async function* FF8({
    input: A,
    abortController: B,
    setToolJSX: Q
}) {
    let {
        command: Z,
        timeout: D,
        shellExecutable: G,
        run_in_background: F
    } = A, I = D || d11(), Y = MMB(), W = "", J = 0, X = !1, V, C = (N, R) => {
        W = N, J = R
    }, K = await Y(Z, B.signal, I, A.sandbox || !1, G, C), H;
    if (Q) H = () => {
        if (V = CN0(Z, K), X = !0, Q) Q(null);
        let N = CPB(Z);
        X1("tengu_bash_command_backgrounded", {
            command_type: N
        })
    };
    let z = K.result;
    if (F === !0 && DF8(Z)) {
        V = CN0(Z, K);
        let N = CPB(Z);
        return X1("tengu_bash_command_auto_backgrounded", {
            command_type: N
        }), {
            stdout: "",
            stderr: "",
            code: 0,
            interrupted: !1,
            backgroundTaskId: V
        }
    }
    let $ = Date.now(),
        L = $ + VPB;
    while (!0) {
        let N = Date.now(),
            R = Math.max(0, L - N),
            O = await Promise.race([z, new Promise((f) => setTimeout(() => f(null), R))]);
        if (O !== null) return O;
        if (X && V) return {
            stdout: "",
            stderr: "",
            code: 0,
            interrupted: !1,
            backgroundTaskId: V
        };
        let P = Date.now() - $,
            j = Math.floor(P / 1000);
        if (H && !X && j >= VPB / 1000 && Q) Q({
            jsx: _7.createElement(tG8, {
                onBackground: H
            }),
            shouldHidePromptInput: !1,
            shouldContinueAnimation: !0,
            showSpinner: !0
        });
        yield {
            type: "progress",
            output: W,
            elapsedTimeSeconds: j,
            totalLines: J
        }, L = Date.now() + aG8
    }
}
var LX = G1(z1(), 1);
import {
    dirname as mF8,
    isAbsolute as Ub1,
    resolve as dF8,
    sep as cF8
} from "path";
var S4 = G1(z1(), 1);

function WC(A, B) {
    return A.flatMap((Q, Z) => Z ? [B(Z), Q] : [Q])
}
var rB = G1(z1(), 1);

function g$() {}