/* chunk:560 bytes:[13064686, 13083519) size:18833 source:unpacked-cli.js */
var l11 = G1(gw(), 1),
    a48 = [{
        patterns: [/^\s*(?:.*\/)?git\s+/],
        env: {
            GIT_TERMINAL_PROMPT: "0",
            GIT_OPTIONAL_LOCKS: "0"
        },
        configArgs: ["-c", "core.fsmonitor=false", "-c", "maintenance.auto=false", "-c", "credential.helper="]
    }, {
        patterns: [/\bnpm\b(?!-)/],
        env: {
            NPM_CONFIG_CACHE: "/dev/null",
            NPM_CONFIG_AUDIT: "false",
            NPM_CONFIG_UPDATE_NOTIFIER: "false",
            NPM_CONFIG_FUND: "false",
            NPM_CONFIG_PREFER_OFFLINE: "true",
            NPM_CONFIG_OFFLINE: "true",
            NPM_CONFIG_IGNORE_SCRIPTS: "true"
        }
    }, {
        patterns: [/\byarn\b/],
        env: {
            YARN_CACHE_FOLDER: "/dev/null",
            YARN_ENABLE_GLOBAL_CACHE: "false",
            YARN_ENABLE_MIRROR: "false",
            YARN_ENABLE_NETWORK: "false",
            YARN_ENABLE_OFFLINE_MODE: "true",
            YARN_ENABLE_HARDLINKS_IN_NODE_MODULES: "false",
            YARN_INSTALL_STATE_PATH: "/dev/null",
            YARN_ENABLE_TELEMETRY: "0",
            YARN_ENABLE_SCRIPTS: "false"
        }
    }, {
        patterns: [/\bpnpm\b/],
        env: {
            PNPM_OFFLINE: "true",
            PNPM_NO_UPDATE_NOTIFIER: "true",
            PNPM_IGNORE_SCRIPTS: "true"
        }
    }, {
        patterns: [/\bpip\b|\bpip3\b|\bpython\s+-m\s+pip\b|\bpython3\s+-m\s+pip\b/],
        env: {
            PIP_NO_CACHE_DIR: "1",
            PIP_DISABLE_PIP_VERSION_CHECK: "1",
            PYTHONDONTWRITEBYTECODE: "1"
        }
    }, {
        patterns: [/\bpipenv\b/],
        env: {
            PIPENV_CACHE_DIR: "/dev/null",
            PIPENV_VENV_IN_PROJECT: "false",
            PIPENV_VIRTUALENV: "false",
            PYTHONDONTWRITEBYTECODE: "1"
        }
    }, {
        patterns: [/\bpoetry\b/],
        env: {
            POETRY_CACHE_DIR: "/dev/null",
            POETRY_VIRTUALENVS_CREATE: "false",
            POETRY_VIRTUALENVS_IN_PROJECT: "false",
            POETRY_INSTALLER_PARALLEL: "false"
        }
    }, {
        patterns: [/\bcargo\s+(build|test|run|check|clippy|doc|bench|install|update|search|publish|clean)\b/],
        env: {
            CARGO_NET_OFFLINE: "true",
            CARGO_REGISTRIES_CRATES_IO_PROTOCOL: "sparse",
            RUST_BACKTRACE: "0"
        }
    }, {
        patterns: [/\bgo\b/],
        env: {
            GOCACHE: "off",
            GOPROXY: "off",
            GOSUMDB: "off",
            GOFLAGS: "-mod=readonly"
        }
    }, {
        patterns: [/\bbundle\b|\bgem\b/],
        env: {
            BUNDLE_CACHE_PATH: "/dev/null",
            BUNDLE_DISABLE_VERSION_CHECK: "true",
            GEM_SKIP_DOC_INSTALL: "true"
        }
    }, {
        patterns: [/\bsvn\b|\bhg\b|\bbzr\b/],
        env: {
            SVN_INTERACTIVE: "no",
            HGPLAIN: "1",
            BZR_LOG: "/dev/null"
        }
    }, {
        patterns: [/\bmake\b|\bcmake\b|\bgradle\b|\bmvn\b/],
        env: {
            MAKEFLAGS: "--no-print-directory",
            GRADLE_DAEMON: "false",
            MAVEN_OPTS: "-o"
        }
    }, {
        patterns: [/\bnode\b|\bnodemon\b|\bts-node\b/],
        env: {
            NODE_DISABLE_COLORS: "1",
            NO_UPDATE_NOTIFIER: "1",
            NODE_ENV: "production"
        }
    }, {
        patterns: [/\bpsql\b|\bmysql\b|\bmongo\b|\bredis-cli\b/],
        env: {
            PSQL_HISTORY: "/dev/null",
            MYSQL_HISTFILE: "/dev/null",
            REDISCLI_HISTFILE: "/dev/null"
        }
    }];

function Aq0(A) {
    let B = {},
        Q = [];
    if (/^\s*env\s+/.test(A)) return {
        env: {},
        configArgs: []
    };
    if (/^\s*RUN\s+/.test(A)) return {
        env: {},
        configArgs: []
    };
    if (/^\s*[`$(]|echo\s+[`$(]/.test(A)) return {
        env: {},
        configArgs: []
    };
    let Z = l11.parse(A),
        D = A,
        G = 0;
    for (let F = 0; F < Z.length; F++) {
        let I = Z[F];
        if (typeof I === "string") {
            if (I.includes("=") && F === G) {
                G = F + 1;
                continue
            }
            break
        }
    }
    if (G < Z.length) D = Z.slice(G).map((F) => {
        if (typeof F === "string") return l11.quote([F]);
        return F
    }).join(" ");
    for (let F of a48)
        if (F.patterns.some((I) => I.test(D))) {
            if (B = {
                    ...B,
                    ...F.env
                }, F.configArgs) Q = [...Q, ...F.configArgs]
        } return {
        env: B,
        configArgs: Q
    }
}

function KMB(A) {
    let B = l11.parse(A),
        Q = -1,
        Z = 0;
    for (let D = 0; D < B.length; D++) {
        let G = B[D];
        if (typeof G === "string") {
            if (G.includes("=") && D === Z) {
                Z++;
                continue
            }
            if (G === "git" || G.endsWith("/git")) {
                Q = D;
                break
            }
            break
        }
    }
    if (Q !== -1) {
        let {
            configArgs: D
        } = Aq0(A);
        if (D && D.length > 0) {
            let G = [...B.slice(0, Q + 1), ...D, ...B.slice(Q + 1)];
            return G.map((F, I) => {
                if (typeof F === "string") {
                    if (F.includes("=") && I < Q || F.startsWith("-c")) return F;
                    if (I > 0 && G[I - 1] === "-c" && F.includes("=")) return F;
                    return l11.quote([F])
                }
                return ""
            }).filter((F) => F !== "").join(" ")
        }
    }
    return A
}
var p11 = G1(gw(), 1);

function zMB(A) {
    if (A.includes("`")) return p11.default.quote([A, "<", "/dev/null"]);
    let B = p11.default.parse(A),
        Q = s48(B);
    if (Q <= 0) return p11.default.quote([A, "<", "/dev/null"]);
    let Z = [...HMB(B, 0, Q), "< /dev/null", ...HMB(B, Q, B.length)];
    return p11.default.quote([Z.join(" ")])
}

function s48(A) {
    for (let B = 0; B < A.length; B++) {
        let Q = A[B];
        if (Bq0(Q, "|")) return B
    }
    return -1
}

function HMB(A, B, Q) {
    let Z = [];
    for (let D = B; D < Q; D++) {
        let G = A[D];
        if (typeof G === "string" && /^[012]$/.test(G) && D + 2 < Q && Bq0(A[D + 1])) {
            let F = A[D + 1],
                I = A[D + 2];
            if (F.op === ">&" && typeof I === "string" && /^[012]$/.test(I)) {
                Z.push(`${G}>&${I}`), D += 2;
                continue
            }
            if (F.op === ">" && I === "/dev/null") {
                Z.push(`${G}>/dev/null`), D += 2;
                continue
            }
            if (F.op === ">" && typeof I === "string" && I.startsWith("&")) {
                let Y = I.slice(1);
                if (/^[012]$/.test(Y)) {
                    Z.push(`${G}>&${Y}`), D += 2;
                    continue
                }
            }
        }
        if (typeof G === "string") Z.push(p11.default.quote([G]));
        else if (Bq0(G)) Z.push(G.op)
    }
    return Z
}

function Bq0(A, B) {
    if (!A || typeof A !== "object" || !("op" in A)) return !1;
    return B ? A.op === B : !0
}
var WG1 = G1(gw(), 1);
import {
    existsSync as Qq0,
    statSync as r48,
    mkdirSync as o48
} from "node:fs";
import {
    execSync as t48,
    execFile as e48
} from "node:child_process";
import {
    join as Dq0
} from "node:path";
import * as EMB from "node:os";
var Zq0 = "\\",
    A68 = 1e4;

function B68() {
    let A = CQ0(),
        B = WG1.default.quote([A.rgPath]),
        Q = A.rgArgs.map((Z) => WG1.default.quote([Z]));
    return A.rgArgs.length > 0 ? `${B} ${Q.join(" ")}` : B
}

function UMB(A) {
    let B = A.includes("zsh") ? ".zshrc" : A.includes("bash") ? ".bashrc" : ".profile";
    return Dq0(EMB.homedir(), B)
}

function Q68(A) {
    let B = A.endsWith(".zshrc"),
        Q = "";
    if (B) Q += `
      echo "# Functions" >> "$SNAPSHOT_FILE"
      
      # Force autoload all functions first
      typeset -f > /dev/null 2>&1
      
      # Now get user function names - filter system ones and write directly to file
      typeset +f | grep -vE '^(_|__)' | while read func; do
        typeset -f "$func" >> "$SNAPSHOT_FILE"
      done
    `;
    else Q += `
      echo "# Functions" >> "$SNAPSHOT_FILE"
      
      # Force autoload all functions first
      declare -f > /dev/null 2>&1
      
      # Now get user function names - filter system ones and give the rest to eval in b64 encoding
      declare -F | cut -d' ' -f3 | grep -vE '^(_|__)' | while read func; do
        # Encode the function to base64, preserving all special characters
        encoded_func=$(declare -f "$func" | base64 )
        # Write the function definition to the snapshot
        echo "eval ${Zq0}"${Zq0}$(echo '$encoded_func' | base64 -d)${Zq0}" > /dev/null 2>&1" >> "$SNAPSHOT_FILE"
      done
    `;
    if (B) Q += `
      echo "# Shell Options" >> "$SNAPSHOT_FILE"
      setopt | sed 's/^/setopt /' | head -n 1000 >> "$SNAPSHOT_FILE"
    `;
    else Q += `
      echo "# Shell Options" >> "$SNAPSHOT_FILE"
      shopt -p | head -n 1000 >> "$SNAPSHOT_FILE"
      set -o | grep "on" | awk '{print "set -o " $1}' | head -n 1000 >> "$SNAPSHOT_FILE"
      echo "shopt -s expand_aliases" >> "$SNAPSHOT_FILE"
    `;
    return Q += `
      echo "# Aliases" >> "$SNAPSHOT_FILE"
      # Filter out winpty aliases on Windows to avoid "stdin is not a tty" errors
      # Git Bash automatically creates aliases like "alias node='winpty node.exe'" for
      # programs that need Win32 Console in mintty, but winpty fails when there's no TTY
      if [[ "$OSTYPE" == "msys" ]] || [[ "$OSTYPE" == "cygwin" ]]; then
        alias | grep -v "='winpty " | sed 's/^alias //g' | sed 's/^/alias -- /' | head -n 1000 >> "$SNAPSHOT_FILE"
      else
        alias | sed 's/^alias //g' | sed 's/^/alias -- /' | head -n 1000 >> "$SNAPSHOT_FILE"
      fi
  `, Q
}

function Z68() {
    let A = process.env.PATH;
    if (L9() === "windows") try {
        A = t48("echo $PATH", {
            encoding: "utf8"
        }).trim()
    } catch {}
    let B = B68(),
        Q = "";
    return Q += `
      # Check for rg availability
      echo "# Check for rg availability" >> "$SNAPSHOT_FILE"
      echo "if ! command -v rg >/dev/null 2>&1; then" >> "$SNAPSHOT_FILE"
      echo '  alias rg='"'${B.replace(/'/g,"'\\''")}'" >> "$SNAPSHOT_FILE"
      echo "fi" >> "$SNAPSHOT_FILE"
      
      # Add PATH to the file
      echo "export PATH=${WG1.default.quote([A||""])}" >> "$SNAPSHOT_FILE"
  `, Q
}

function D68(A, B, Q) {
    let Z = UMB(A),
        D = Z.endsWith(".zshrc"),
        G = Q ? Q68(Z) : !D ? 'echo "shopt -s expand_aliases" >> "$SNAPSHOT_FILE"' : "",
        F = Z68();
    return `SNAPSHOT_FILE=${WG1.default.quote([B])}
      ${Q?`source "${Z}" < /dev/null`:"# No user config file to source"}
      
      # First, create/clear the snapshot file
      echo "# Snapshot file" >| "$SNAPSHOT_FILE"
      
      # When this file is sourced, we first unalias to avoid conflicts
      # This is necessary because aliases get "frozen" inside function definitions at definition time,
      # which can cause unexpected behavior when functions use commands that conflict with aliases
      echo "# Unset all aliases to avoid conflicts with functions" >> "$SNAPSHOT_FILE"
      echo "unalias -a 2>/dev/null || true" >> "$SNAPSHOT_FILE"
      
      ${G}
      
      ${F}
    `
}
var wMB = async (A) => {
    let B = A.includes("zsh") ? "zsh" : A.includes("bash") ? "bash" : "sh";
    return n1(`Creating shell snapshot for ${B} (${A})`), new Promise(async (Q) => {
        try {
            let Z = UMB(A),
                D = Qq0(Z);
            if (!D) n1(`Shell config file not found: ${Z}, creating snapshot with Claude Code defaults only`);
            let G = Date.now(),
                F = Math.random().toString(36).substring(2, 8),
                I = Dq0(e9(), "shell-snapshots"),
                Y = Dq0(I, `snapshot-${B}-${G}-${F}.sh`);
            o48(I, {
                recursive: !0
            });
            let W = D68(A, Y, D);
            n1(`Creating snapshot at: ${Y}`), e48(A, ["-c", "-l", W], {
                env: {
                    ...process.env.CLAUDE_CODE_DONT_INHERIT_ENV ? {} : process.env,
                    SHELL: A,
                    GIT_EDITOR: "true",
                    CLAUDECODE: "1"
                },
                timeout: A68,
                maxBuffer: 1048576
            }, async (J, X, V) => {
                if (J) n1(`Shell snapshot creation failed: ${J.message}`), n1(`stderr: ${V}`), R1(new Error(`Failed to create shell snapshot: ${V}`)), X1("tengu_shell_snapshot_failed", {
                    stderr_length: V.length
                }), Q(void 0);
                else if (Qq0(Y)) {
                    let C = r48(Y).size;
                    n1(`Shell snapshot created successfully (${C} bytes)`), oL(async () => {
                        try {
                            if (Qq0(Y)) j1().unlinkSync(Y), n1(`Cleaned up session snapshot: ${Y}`)
                        } catch (K) {
                            n1(`Error cleaning up session snapshot: ${K}`)
                        }
                    }), Q(Y)
                } else n1(`Shell snapshot file not found after creation: ${Y}`), X1("tengu_shell_unknown_error", {}), Q(void 0)
            })
        } catch (Z) {
            n1(`Unexpected error during snapshot creation: ${Z}`), R1(Z instanceof Error ? Z : new Error(String(Z))), X1("tengu_shell_snapshot_error", {}), Q(void 0)
        }
    })
};
var X68 = 1800000;

function $MB(A) {
    try {
        return j1().accessSync(A, G68.X_OK), !0
    } catch (B) {
        try {
            return NMB(`${A} --version`, {
                timeout: 1000,
                stdio: "ignore"
            }), !0
        } catch {
            return !1
        }
    }
}

function V68() {
    let A = (J) => {
            try {
                return NMB(`which ${J}`, {
                    stdio: ["ignore", "pipe", "ignore"]
                }).toString().trim()
            } catch {
                return null
            }
        },
        B = process.env.SHELL,
        Q = B && (B.includes("bash") || B.includes("zsh")),
        Z = B?.includes("bash"),
        D = A("zsh"),
        G = A("bash"),
        F = ["/bin", "/usr/bin", "/usr/local/bin", "/opt/homebrew/bin"],
        Y = (Z ? ["bash", "zsh"] : ["zsh", "bash"]).flatMap((J) => F.map((X) => `${X}/${J}`));
    if (Z) {
        if (G) Y.unshift(G);
        if (D) Y.push(D)
    } else {
        if (D) Y.unshift(D);
        if (G) Y.push(G)
    }
    if (Q && $MB(B)) Y.unshift(B);
    let W = Y.find((J) => J && $MB(J));
    if (!W) {
        let J = "No suitable shell found. Claude CLI requires a Posix shell environment. Please ensure you have a valid shell installed and the SHELL environment variable set.";
        throw R1(new Error(J)), new Error(J)
    }
    return W
}
async function C68() {
    let A = V68(),
        B = await wMB(A);
    return {
        binShell: A,
        snapshotFilePath: B
    }
}
var JG1 = EA(C68);
async function K68(A, B, Q, Z = !1, D, G) {
    let F = Q || X68,
        {
            binShell: I,
            snapshotFilePath: Y
        } = await JG1();
    if (D) I = D, Y = void 0;
    let W = Math.floor(Math.random() * 65536).toString(16).padStart(4, "0"),
        J = LMB.tmpdir();
    if (L9() === "windows") J = Js(J);
    let X = `${J}/claude-${W}-cwd`,
        V = t$0(A, Uv1(A));
    if (I.includes("bash") && !Z && A.includes("|") && Uv1(A)) V = zMB(A);
    if (Z) A = KMB(A), V = t$0(A, Uv1(A));
    let C = () => {};
    if (Z) {
        let $ = iLB(V);
        V = $.finalCommand, C = $.cleanup
    }
    let K = [];
    if (Y) {
        if (!I68(Y)) n1(`Snapshot file missing, recreating: ${Y}`), JG1.cache?.clear?.(), Y = (await JG1()).snapshotFilePath;
        if (Y) {
            let $ = L9() === "windows" ? Js(Y) : Y;
            K.push(`source ${qMB.default.quote([$])}`)
        }
    }
    K.push(`eval ${V}`), K.push(`pwd -P >| ${X}`);
    let H = K.join(" && ");
    if (process.env.CLAUDE_CODE_SHELL_PREFIX) H = Wj1(process.env.CLAUDE_CODE_SHELL_PREFIX, H);
    let z = Fd1();
    if (B.aborted) return CMB();
    try {
        let $ = Aq0(A),
            L = Y68(I, ["-c", "-l", H], {
                env: {
                    ...process.env,
                    SHELL: I,
                    GIT_EDITOR: "true",
                    CLAUDECODE: "1",
                    ...{},
                    ...Z ? $.env : {}
                },
                cwd: z,
                detached: !0
            }),
            N = VMB(L, B, F, G);
        return N.result.then(async (R) => {
            if (R && !R.backgroundTaskId) try {
                rE(F68(X, {
                    encoding: "utf8"
                }).trim(), z)
            } catch {
                X1("tengu_shell_set_cwd", {
                    success: !1
                })
            }
        }).finally(() => C()), C = () => {}, N
    } catch ($) {
        return n1(`Shell exec error: ${$ instanceof Error?$.message:String($)}`), C(), {
            background: () => null,
            kill: () => {},
            result: Promise.resolve({
                code: 126,
                stdout: "",
                stderr: $ instanceof Error ? $.message : String($),
                interrupted: !1
            })
        }
    } finally {
        C()
    }
}

function rE(A, B) {
    let Q = W68(A) ? A : J68(B || j1().cwd(), A);
    if (!j1().existsSync(Q)) throw new Error(`Path "${Q}" does not exist`);
    let Z = j1().realpathSync(Q);
    Mk0(Z), X1("tengu_shell_set_cwd", {
        success: !0
    })
}
var H68 = K68;

function MMB() {
    return H68
}

function KS(A) {
    let B = A.split(`
`),
        Q = 0;
    while (Q < B.length && B[Q]?.trim() === "") Q++;
    let Z = B.length - 1;
    while (Z >= 0 && B[Z]?.trim() === "") Z--;
    if (Q > Z) return "";
    return B.slice(Q, Z + 1).join(`
`)
}

function iM(A) {
    let B = /^data:image\/[a-z0-9.+_-]+;base64,/i.test(A);
    if (B) return {
        totalLines: 1,
        truncatedContent: A,
        isImage: B
    };
    let Q = IG1();
    if (A.length <= Q) return {
        totalLines: A.split(`
`).length,
        truncatedContent: A,
        isImage: B
    };
    let Z = A.slice(0, Q),
        D = A.slice(Q).split(`
`).length,
        G = `${Z}

... [${D} lines truncated] ...`;
    return {
        totalLines: A.split(`
`).length,
        truncatedContent: G,
        isImage: B
    }
}
var Nv1 = (A) => `${A.trim()}
Shell cwd was reset to ${_9()}`;

function Lv1(A) {
    if (Dn1() || !EK(t0(), A)) {
        if (rE(_9()), !Dn1()) return X1("tengu_bash_tool_reset_to_original_dir", {}), !0
    }
    return !1
}