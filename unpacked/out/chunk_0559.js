/* chunk:559 bytes:[13045497, 13064685) size:19188 source:unpacked-cli.js */
function BMB() {
    return `Executes a given bash command in a persistent shell session with optional timeout, ensuring proper handling and security measures.

Before executing the command, please follow these steps:

1. Directory Verification:
   - If the command will create new directories or files, first use the LS tool to verify the parent directory exists and is the correct location
   - For example, before running "mkdir foo/bar", first use LS to check that "foo" exists and is the intended parent directory

2. Command Execution:
   - Always quote file paths that contain spaces with double quotes (e.g., cd "path with spaces/file.txt")
   - Examples of proper quoting:
     - cd "/Users/name/My Documents" (correct)
     - cd /Users/name/My Documents (incorrect - will fail)
     - python "/path/with spaces/script.py" (correct)
     - python /path/with spaces/script.py (incorrect - will fail)
   - After ensuring proper quoting, execute the command.
   - Capture the output of the command.

Usage notes:
  - The command argument is required.
  - You can specify an optional timeout in milliseconds (up to ${Ev1()}ms / ${Ev1()/60000} minutes). If not specified, commands will timeout after ${d11()}ms (${d11()/60000} minutes).
  - It is very helpful if you write a clear, concise description of what this command does in 5-10 words.
  - If the output exceeds ${IG1()} characters, output will be truncated before being returned to you.${`
  - You can use the \`run_in_background\` parameter to run the command in the background, which allows you to continue working while the command runs. You can monitor the output using the ${SZ} tool as it becomes available. Never use \`run_in_background\` to run 'sleep' as it will return immediately. You do not need to use '&' at the end of the command when using this parameter.`}
  - VERY IMPORTANT: You MUST avoid using search commands like \`find\` and \`grep\`. Instead use ${pM}, ${zv}, or ${k7} to search. ${`You MUST avoid read tools like \`cat\`, \`head\`, \`tail\`, and \`ls\`, and use ${QG} and ${Ev} to read files.`}
 - If you _still_ need to run \`grep\`, STOP. ALWAYS USE ripgrep at \`rg\` first, which all Claude Code users have pre-installed.
  - When issuing multiple commands, use the ';' or '&&' operator to separate them. DO NOT use newlines (newlines are ok in quoted strings).
  - Try to maintain your current working directory throughout the session by using absolute paths and avoiding usage of \`cd\`. You may use \`cd\` if the User explicitly requests it.
    <good-example>
    pytest /foo/bar/tests
    </good-example>
    <bad-example>
    cd /foo/bar && pytest tests
    </bad-example>

${Cv1()?`# Using sandbox mode for commands

You have a special option in BashTool: the sandbox parameter. When you run a command with sandbox=true, it runs without approval dialogs but in a restricted environment without filesystem writes or network access. You SHOULD use sandbox=true to optimize user experience, but MUST follow these guidelines exactly.

## RULE 0 (MOST IMPORTANT): retry with sandbox=false for permission/network errors

    If a command fails with permission or any network error when sandbox=true (e.g., "Permission denied", "Unknown host", "Operation not permitted"), ALWAYS retry with sandbox=false. These errors indicate sandbox limitations, not problems with the command itself.

Non-permission errors (e.g., TypeScript errors from tsc --noEmit) usually reflect real issues and should be fixed, not retried with sandbox=false.

## RULE 1: NOTES ON SPECIFIC BUILD SYSTEMS AND UTILITIES

### Build systems

Build systems like npm run build almost always need write access. Test suites also usually need write access. NEVER run build or test commands in sandbox, even if just checking types.

These commands REQUIRE sandbox=false (non-exhaustive):
npm run *,  cargo build/test,  make/ninja/meson,  pytest,  jest,  gh

## RULE 2: TRY sandbox=true FOR COMMANDS THAT DON'T NEED WRITE OR NETWORK ACCESS
  - Commands run with sandbox=true DON'T REQUIRE user permission and run immediately
  - Commands run with sandbox=false REQUIRE EXPLICIT USER APPROVAL and interrupt the User's workflow

Use sandbox=false when you suspect the command might modify the system or access the network:
  - File operations: touch, mkdir, rm, mv, cp
  - File edits: nano, vim, writing to files with >
  - Installing: npm install, apt-get, brew
  - Git writes: git add, git commit, git push
  - Build systems:  npm run build, make, ninja, etc. (see below)
  - Test suites: npm run test, pytest, cargo test, make check, ert, etc. (see below)
  - Network programs: gh, ping, coo, ssh, scp, etc.

Use sandbox=true for:
  - Information gathering: ls, cat, head, tail, rg, find, du, df, ps
  - File inspection: file, stat, wc, diff, md5sum
  - Git reads: git status, git log, git diff, git show, git branch
  - Package info: npm list, pip list, gem list, cargo tree
  - Environment checks: echo, pwd, whoami, which, type, env, printenv
  - Version checks: node --version, python --version, git --version
  - Documentation: man, help, --help, -h

Before you run a command, think hard about whether it is likely to work correctly without network access and without write access to the filesystem. Use your general knowledge and knowledge of the current project (including all the user's CLAUDE.md files) as inputs to your decision. Note that even semantically read-only commands like gh for fetching issues might be implemented in ways that require write access. ERR ON THE SIDE OF RUNNING WITH sandbox=false.

Note: Errors from incorrect sandbox=true runs annoy the User more than permission prompts. If any part of a command needs write access (e.g. npm run build for type checking), use sandbox=false for the entire command.

### EXAMPLES

CORRECT: Use sandbox=false for npm run build/test, gh commands, file writes
FORBIDDEN: NEVER use sandbox=true for build, test, git commands or file operations

## REWARDS

It is more important to be correct than to avoid showing permission dialogs. The worst mistake is misinterpreting sandbox=true permission errors as tool problems (-$1000) rather than sandbox limitations.

## CONCLUSION

Use sandbox=true to improve UX, but ONLY per the rules above. WHEN IN DOUBT, USE sandbox=false.
`:""}
${l48()}`
}

function l48() {
    let {
        commit: B,
        pr: Q
    } = c48();
    return `# Committing changes with git

When the user asks you to create a new git commit, follow these steps carefully:

1. You have the capability to call multiple tools in a single response. When multiple independent pieces of information are requested, batch your tool calls together for optimal performance. ALWAYS run the following bash commands in parallel, each using the ${SZ} tool:
  - Run a git status command to see all untracked files.
  - Run a git diff command to see both staged and unstaged changes that will be committed.
  - Run a git log command to see recent commit messages, so that you can follow this repository's commit message style.
2. Analyze all staged changes (both previously staged and newly added) and draft a commit message:
  - Summarize the nature of the changes (eg. new feature, enhancement to an existing feature, bug fix, refactoring, test, docs, etc.). Ensure the message accurately reflects the changes and their purpose (i.e. "add" means a wholly new feature, "update" means an enhancement to an existing feature, "fix" means a bug fix, etc.).
  - Check for any sensitive information that shouldn't be committed
  - Draft a concise (1-2 sentences) commit message that focuses on the "why" rather than the "what"
  - Ensure it accurately reflects the changes and their purpose
3. You have the capability to call multiple tools in a single response. When multiple independent pieces of information are requested, batch your tool calls together for optimal performance. ALWAYS run the following commands in parallel:
   - Add relevant untracked files to the staging area.
   - Create the commit with a message${B?` ending with:
   ${B}`:"."}
   - Run git status to make sure the commit succeeded.
4. If the commit fails due to pre-commit hook changes, retry the commit ONCE to include these automated changes. If it fails again, it usually means a pre-commit hook is preventing the commit. If the commit succeeds but you notice that files were modified by the pre-commit hook, you MUST amend your commit to include them.

Important notes:
- NEVER update the git config
- NEVER run additional commands to read or explore code, besides git bash commands
- NEVER use the ${hF.name} or ${k7} tools
- DO NOT push to the remote repository unless the user explicitly asks you to do so
- IMPORTANT: Never use git commands with the -i flag (like git rebase -i or git add -i) since they require interactive input which is not supported.
- If there are no changes to commit (i.e., no untracked files and no modifications), do not create an empty commit
- In order to ensure good formatting, ALWAYS pass the commit message via a HEREDOC, a la this example:
<example>
git commit -m "$(cat <<'EOF'
   Commit message here.${B?`

   ${B}`:""}
   EOF
   )"
</example>

# Creating pull requests
Use the gh command via the Bash tool for ALL GitHub-related tasks including working with issues, pull requests, checks, and releases. If given a Github URL use the gh command to get the information needed.

IMPORTANT: When the user asks you to create a pull request, follow these steps carefully:

1. You have the capability to call multiple tools in a single response. When multiple independent pieces of information are requested, batch your tool calls together for optimal performance. ALWAYS run the following bash commands in parallel using the ${SZ} tool, in order to understand the current state of the branch since it diverged from the main branch:
   - Run a git status command to see all untracked files
   - Run a git diff command to see both staged and unstaged changes that will be committed
   - Check if the current branch tracks a remote branch and is up to date with the remote, so you know if you need to push to the remote
   - Run a git log command and \`git diff [base-branch]...HEAD\` to understand the full commit history for the current branch (from the time it diverged from the base branch)
2. Analyze all changes that will be included in the pull request, making sure to look at all relevant commits (NOT just the latest commit, but ALL commits that will be included in the pull request!!!), and draft a pull request summary
3. You have the capability to call multiple tools in a single response. When multiple independent pieces of information are requested, batch your tool calls together for optimal performance. ALWAYS run the following commands in parallel:
   - Create new branch if needed
   - Push to remote with -u flag if needed
   - Create PR using gh pr create with the format below. Use a HEREDOC to pass the body to ensure correct formatting.
<example>
gh pr create --title "the pr title" --body "$(cat <<'EOF'
## Summary
<1-3 bullet points>

## Test plan
[Checklist of TODOs for testing the pull request...]${Q?`

${Q}`:""}
EOF
)"
</example>

Important:
- NEVER update the git config
- DO NOT use the ${hF.name} or ${k7} tools
- Return the PR URL when you're done, so the user can see it

# Other common operations
- View comments on a Github PR: gh api repos/foo/bar/pulls/123/comments`
}
var qMB = G1(gw(), 1);
import {
    constants as G68,
    readFileSync as F68,
    existsSync as I68
} from "node:fs";
var r$0 = G1(gw(), 1);

function o$0(A) {
    if (/\d\s*<<\s*\d/.test(A) || /\[\[\s*\d+\s*<<\s*\d+\s*\]\]/.test(A) || /\$\(\(.*<<.*\)\)/.test(A)) return !1;
    return /<<-?\s*(?:(['"]?)(\w+)\1|\\(\w+))/.test(A)
}

function p48(A) {
    let B = /'(?:[^'\\]|\\.)*\n(?:[^'\\]|\\.)*'/,
        Q = /"(?:[^"\\]|\\.)*\n(?:[^"\\]|\\.)*"/;
    return B.test(A) || Q.test(A)
}

function t$0(A, B = !0) {
    if (o$0(A) || p48(A)) {
        let Z = `'${A.replace(/'/g,`'"'"'`)}'`;
        if (o$0(A)) return Z;
        return B ? `${Z} < /dev/null` : Z
    }
    if (B) return r$0.default.quote([A, "<", "/dev/null"]);
    return r$0.default.quote([A])
}

function Uv1(A) {
    if (o$0(A)) return !1;
    return !0
}
import {
    execSync as NMB,
    spawn as Y68
} from "node:child_process";
import {
    isAbsolute as W68,
    resolve as J68
} from "node:path";
import * as LMB from "node:os";
import {
    PassThrough as n48
} from "stream";

function $v1(A, B, Q = !1) {
    let Z = A;
    if (Q) {
        let D = A.indexOf(`
`);
        if (D !== -1) {
            if (Z = A.substring(0, D), Z.length + 1 > B) return `${Z.substring(0,B-1)}…`;
            return `${Z}…`
        }
    }
    if (Z.length <= B) return Z;
    return `${Z.substring(0,B-1)}…`
}

function tm(A) {
    if (A < 60000) {
        let D = (A / 1000).toFixed(1);
        return `${D.endsWith(".0")?D.slice(0,-2):D}s`
    }
    let B = Math.floor(A / 3600000),
        Q = Math.floor(A % 3600000 / 60000),
        Z = (A % 60000 / 1000).toFixed(1);
    if (B > 0) return `${B}h ${Q}m ${Z}s`;
    if (Q > 0) return `${Q}m ${Z}s`;
    return `${Z}s`
}

function SI(A) {
    let B = A >= 1000;
    return new Intl.NumberFormat("en", {
        notation: "compact",
        minimumFractionDigits: B ? 1 : 0,
        maximumFractionDigits: 1
    }).format(A).toLowerCase()
}

function wv1(A, B = {}) {
    let {
        style: Q = "narrow",
        numeric: Z = "always",
        now: D = new Date
    } = B, G = A.getTime() - D.getTime(), F = Math.trunc(G / 1000), I = [{
        unit: "year",
        seconds: 31536000,
        shortUnit: "y"
    }, {
        unit: "month",
        seconds: 2592000,
        shortUnit: "mo"
    }, {
        unit: "week",
        seconds: 604800,
        shortUnit: "w"
    }, {
        unit: "day",
        seconds: 86400,
        shortUnit: "d"
    }, {
        unit: "hour",
        seconds: 3600,
        shortUnit: "h"
    }, {
        unit: "minute",
        seconds: 60,
        shortUnit: "m"
    }, {
        unit: "second",
        seconds: 1,
        shortUnit: "s"
    }];
    for (let {
            unit: W,
            seconds: J,
            shortUnit: X
        }
        of I)
        if (Math.abs(F) >= J) {
            let V = Math.trunc(F / J);
            if (Q === "narrow" && J < 86400) return F < 0 ? `${Math.abs(V)}${X} ago` : `in ${V}${X}`;
            return new Intl.RelativeTimeFormat("en", {
                style: "long",
                numeric: Z
            }).format(V, W)
        } if (Q === "narrow") return F <= 0 ? "0s ago" : "in 0s";
    return new Intl.RelativeTimeFormat("en", {
        style: Q,
        numeric: Z
    }).format(0, "second")
}

function qv1(A, B = {}) {
    let {
        now: Q = new Date,
        ...Z
    } = B;
    if (A > Q) return wv1(A, {
        ...Z,
        now: Q
    });
    return wv1(A, {
        ...Z,
        numeric: "always",
        now: Q
    })
}

function c11(A, B = !1) {
    if (!A) return;
    let Q = new Date(A * 1000),
        Z = Q.getMinutes(),
        D = Q.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: Z === 0 ? void 0 : "2-digit",
            hour12: !0
        }),
        G = Intl.DateTimeFormat().resolvedOptions().timeZone;
    return D.replace(/ ([AP]M)/i, (F, I) => I.toLowerCase()) + (B ? ` (${G})` : "")
}
var XMB = G1(IMB(), 1);
class YG1 {
    capacity;
    buffer;
    head = 0;
    size = 0;
    constructor(A) {
        this.capacity = A;
        this.buffer = new Array(A)
    }
    add(A) {
        if (this.buffer[this.head] = A, this.head = (this.head + 1) % this.capacity, this.size < this.capacity) this.size++
    }
    addAll(A) {
        for (let B of A) this.add(B)
    }
    getRecent(A) {
        let B = [],
            Q = this.size < this.capacity ? 0 : this.head,
            Z = Math.min(A, this.size);
        for (let D = 0; D < Z; D++) {
            let G = (Q + this.size - Z + D) % this.capacity;
            B.push(this.buffer[G])
        }
        return B
    }
    toArray() {
        if (this.size === 0) return [];
        let A = [],
            B = this.size < this.capacity ? 0 : this.head;
        for (let Q = 0; Q < this.size; Q++) {
            let Z = (B + Q) % this.capacity;
            A.push(this.buffer[Z])
        }
        return A
    }
    clear() {
        this.head = 0, this.size = 0
    }
    length() {
        return this.size
    }
}
var YMB = 137,
    WMB = 143;

function JMB(A) {
    let B = null,
        Q = "";
    A.on("data", (D) => {
        if (B) B.write(D);
        else Q += D
    });
    let Z = () => Q;
    return {
        get: Z,
        asStream() {
            return B = new n48({
                highWaterMark: 10485760
            }), B.write(Z()), Q = "", B
        }
    }
}

function VMB(A, B, Q, Z) {
    let D = "running",
        G, F = JMB(A.stdout),
        I = JMB(A.stderr);
    if (Z) {
        let V = new YG1(10),
            C = 0,
            K = (H) => {
                let $ = H.toString().split(`
`).filter((N) => N.trim());
                V.addAll($), C += $.length;
                let L = V.getRecent(5);
                if (L.length > 0) Z(L.join(`
`), C)
            };
        A.stdout.on("data", K), A.stderr.on("data", K)
    }
    let Y = (V) => {
            if (D = "killed", A.pid) XMB.default(A.pid, "SIGKILL")
        },
        W = null,
        J, X = new Promise((V) => {
            let C = () => Y();
            J = () => {
                if (W) clearTimeout(W), W = null;
                B.removeEventListener("abort", C)
            }, B.addEventListener("abort", C, {
                once: !0
            }), new Promise((K) => {
                let H = Y;
                Y = (z) => {
                    H(), K(z || YMB)
                }, W = setTimeout(() => {
                    Y(WMB)
                }, Q), A.on("close", (z, $) => {
                    K(z !== null && z !== void 0 ? z : $ === "SIGTERM" ? 144 : 1)
                }), A.on("error", () => K(1))
            }).then((K) => {
                if (J(), D === "running") D = "completed";
                let H = {
                    code: K,
                    stdout: F.get(),
                    stderr: I.get(),
                    interrupted: K === YMB,
                    backgroundTaskId: G
                };
                if (K === WMB) H.stderr = [`Command timed out after ${tm(Q)}`, H.stderr].filter(Boolean).join(" ");
                V(H)
            })
        });
    return {
        background: (V) => {
            if (D === "running") return G = V, D = "backgrounded", J(), {
                stdoutStream: F.asStream(),
                stderrStream: I.asStream()
            };
            else return null
        },
        kill: () => Y(),
        result: X
    }
}

function CMB(A) {
    return {
        background: () => null,
        kill: () => {},
        result: Promise.resolve({
            code: 145,
            stdout: "",
            stderr: "Command aborted before execution",
            interrupted: !0,
            backgroundTaskId: A
        })
    }
}