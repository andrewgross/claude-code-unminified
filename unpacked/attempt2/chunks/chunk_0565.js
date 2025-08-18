/* chunk:565 bytes:[13206427, 13226354) size:19927 source:unpacked-cli.js */
async function cMB(A) {
    if (!Mv1) Mv1 = await f68(A);
    return Mv1
}
i0(cMB, "initializeBinding");

function lMB() {
    return !!Mv1
}
i0(lMB, "checkModule");
var hB, Fq0, Iq0, h68 = class {
    static {
        i0(this, "Parser")
    } [0] = 0;
    [1] = 0;
    logCallback = null;
    language = null;
    static async init(A) {
        yMB(await cMB(A)), hB = s1._ts_init(), Fq0 = s1.getValue(hB, "i32"), Iq0 = s1.getValue(hB + C9, "i32")
    }
    constructor() {
        this.initialize()
    }
    initialize() {
        if (!lMB()) throw new Error("cannot construct a Parser before calling `init()`");
        s1._ts_parser_new_wasm(), this[0] = s1.getValue(hB, "i32"), this[1] = s1.getValue(hB + C9, "i32")
    }
    delete() {
        s1._ts_parser_delete(this[0]), s1._free(this[1]), this[0] = 0, this[1] = 0
    }
    setLanguage(A) {
        let B;
        if (!A) B = 0, this.language = null;
        else if (A.constructor === dMB) {
            B = A[0];
            let Q = s1._ts_language_version(B);
            if (Q < Iq0 || Fq0 < Q) throw new Error(`Incompatible language version ${Q}. Compatibility range ${Iq0} through ${Fq0}.`);
            this.language = A
        } else throw new Error("Argument must be a Language");
        return s1._ts_parser_set_language(this[0], B), this
    }
    parse(A, B, Q) {
        if (typeof A === "string") s1.currentParseCallback = (I) => A.slice(I);
        else if (typeof A === "function") s1.currentParseCallback = A;
        else throw new Error("Argument must be a string or a function");
        if (Q?.progressCallback) s1.currentProgressCallback = Q.progressCallback;
        else s1.currentProgressCallback = null;
        if (this.logCallback) s1.currentLogCallback = this.logCallback, s1._ts_parser_enable_logger_wasm(this[0], 1);
        else s1.currentLogCallback = null, s1._ts_parser_enable_logger_wasm(this[0], 0);
        let Z = 0,
            D = 0;
        if (Q?.includedRanges) {
            Z = Q.includedRanges.length, D = s1._calloc(Z, CG1);
            let I = D;
            for (let Y = 0; Y < Z; Y++) _MB(I, Q.includedRanges[Y]), I += CG1
        }
        let G = s1._ts_parser_parse_wasm(this[0], this[1], B ? B[0] : 0, D, Z);
        if (!G) return s1.currentParseCallback = null, s1.currentLogCallback = null, s1.currentProgressCallback = null, null;
        if (!this.language) throw new Error("Parser must have a language to parse");
        let F = new P68(Nv, G, this.language, s1.currentParseCallback);
        return s1.currentParseCallback = null, s1.currentLogCallback = null, s1.currentProgressCallback = null, F
    }
    reset() {
        s1._ts_parser_reset(this[0])
    }
    getIncludedRanges() {
        s1._ts_parser_included_ranges_wasm(this[0]);
        let A = s1.getValue(hB, "i32"),
            B = s1.getValue(hB + C9, "i32"),
            Q = new Array(A);
        if (A > 0) {
            let Z = B;
            for (let D = 0; D < A; D++) Q[D] = Rv1(Z), Z += CG1;
            s1._free(B)
        }
        return Q
    }
    getTimeoutMicros() {
        return s1._ts_parser_timeout_micros(this[0])
    }
    setTimeoutMicros(A) {
        s1._ts_parser_set_timeout_micros(this[0], 0, A)
    }
    setLogger(A) {
        if (!A) this.logCallback = null;
        else if (typeof A !== "function") throw new Error("Logger callback must be a function");
        else this.logCallback = A;
        return this
    }
    getLogger() {
        return this.logCallback
    }
};
import {
    homedir as r11
} from "os";
import {
    join as Dd,
    posix as Pv1,
    win32 as Sv1,
    delimiter as n68
} from "path";
import {
    join as KG1
} from "path";
import {
    homedir as Ov1
} from "os";
import {
    join as Xq0
} from "path";
var pMB = /^\s*alias\s+claude=/;

function Ad() {
    let A = process.env.ZDOTDIR || Ov1();
    return {
        zsh: Xq0(A, ".zshrc"),
        bash: Xq0(Ov1(), ".bashrc"),
        fish: Xq0(Ov1(), ".config/fish/config.fish")
    }
}

function n11(A) {
    let B = !1;
    return {
        filtered: A.filter((Z) => {
            if (pMB.test(Z)) return B = !0, !1;
            return !0
        }),
        hadAlias: B
    }
}

function Bd(A) {
    let B = j1();
    try {
        if (!B.existsSync(A)) return null;
        return B.readFileSync(A, {
            encoding: "utf8"
        }).split(`
`)
    } catch {
        return null
    }
}

function a11(A, B) {
    j1().writeFileSync(A, B.join(`
`), {
        encoding: "utf8",
        flush: !0
    })
}

function Vq0() {
    let A = Ad();
    for (let B of Object.values(A)) {
        let Q = Bd(B);
        if (!Q) continue;
        for (let Z of Q)
            if (pMB.test(Z)) {
                let D = Z.match(/alias\s+claude=["']?([^"'\s]+)/);
                if (D && D[1]) return D[1]
            }
    }
    return null
}

function iMB() {
    let A = Vq0();
    if (!A) return null;
    let B = j1(),
        Q = A.startsWith("~") ? A.replace("~", Ov1()) : A;
    try {
        if (B.existsSync(Q)) {
            let Z = B.statSync(Q);
            if (Z.isFile() || Z.isSymbolicLink()) return A
        }
    } catch {}
    return null
}
var Lv = KG1(e9(), "local"),
    nMB = KG1(Lv, "package.json"),
    s11 = KG1(Lv, "claude");

function Mv() {
    return (process.argv[1] || "").includes("/.claude/local/node_modules/")
}
async function Cq0() {
    try {
        if (!j1().existsSync(Lv)) j1().mkdirSync(Lv);
        if (!j1().existsSync(nMB)) {
            let B = {
                name: "claude-local",
                version: "0.0.1",
                private: !0
            };
            j1().writeFileSync(nMB, JSON.stringify(B, null, 2), {
                encoding: "utf8",
                flush: !1
            })
        }
        let A = KG1(Lv, "claude");
        if (!j1().existsSync(A)) {
            let B = `#!/bin/bash
exec "${Lv}/node_modules/.bin/claude" "$@"`;
            j1().writeFileSync(A, B, {
                encoding: "utf8",
                flush: !1
            }), await F2("chmod", ["+x", A])
        }
        return !0
    } catch (A) {
        return R1(A instanceof Error ? A : new Error(String(A))), !1
    }
}
async function Qd(A = "latest") {
    try {
        if (!await Cq0()) return "install_failed";
        let B = await s5("npm", ["install", `${{ISSUES_EXPLAINER:"report the issue at https://github.com/anthropics/claude-code/issues",PACKAGE_URL:"@anthropic-ai/claude-code",README_URL:"https://docs.anthropic.com/s/claude-code",VERSION:"1.0.83"}.PACKAGE_URL}@${A}`], {
            cwd: Lv,
            maxBuffer: 1e6
        });
        if (B.code !== 0) return R1(new Error(`Failed to install Claude CLI package: ${B.stderr}`)), B.code === 190 ? "in_progress" : "install_failed";
        let Q = H0();
        return gA({
            ...Q,
            installMethod: "local"
        }), "success"
    } catch (B) {
        return R1(B instanceof Error ? B : new Error(String(B))), "install_failed"
    }
}

function Rv() {
    return j1().existsSync(KG1(Lv, "node_modules", ".bin", "claude"))
}

function g68() {
    let A = process.env.SHELL || "";
    if (A.includes("zsh")) return "zsh";
    if (A.includes("bash")) return "bash";
    if (A.includes("fish")) return "fish";
    return "unknown"
}
async function aMB() {
    let A = g68(),
        B = Ad(),
        Q = "",
        Z = A in B ? B[A] : null,
        D = `alias claude="${s11}"`;
    try {
        if (Z) {
            let G = Bd(Z);
            if (G)
                if (G.some((I) => I === D)) Q += `✓ Alias already exists in ${Z}

`;
                else {
                    let {
                        filtered: I,
                        hadAlias: Y
                    } = n11(G);
                    if (a11(Z, [...I, D, ""]), Y) Q += `✓ Replaced old claude alias in ${Z}
`;
                    else Q += `✓ Added alias to ${Z}
`;
                    Q += `To use it right away, run: source ${Z}

`
                }
            else Q += `To configure claude, add this line to your ${Z}:
`, Q += `  ${D}
`, Q += `
Then run: source ${Z}

`
        } else Q += `To configure claude, add this line to your shell config file:
`, Q += `  ${D}
`, Q += `
Then run: source <your-config-file>

`
    } catch {
        if (Z) Q += `To add it to your PATH, add this line to your ${Z}:
`, Q += `  alias claude="${s11}"
`, Q += `
Then run: source ${Z}

`;
        else Q += `Could not identify startup file
`, Q += `  alias claude="${s11}"

`
    }
    if (!Q) Q += `To create an alias, add this line to your shell configuration file:
`, Q += `  ${D}

`, Q += `or create a symlink:
`, Q += `  mkdir -p ~/bin
`, Q += `  ln -sf ${s11} ~/bin/claude
`, Q += `  # Make sure ~/bin is in your PATH
`;
    return Q
}
async function sMB() {
    try {
        let A = ["uninstall", "-g", "--force", {
                ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
                PACKAGE_URL: "@anthropic-ai/claude-code",
                README_URL: "https://docs.anthropic.com/s/claude-code",
                VERSION: "1.0.83"
            }.PACKAGE_URL],
            B = await F2("npm", A);
        if (B.code !== 0) return R1(new Error(`Failed to uninstall global version: ${B.stderr}`)), !1;
        return !0
    } catch (A) {
        return R1(A instanceof Error ? A : new Error(String(A))), !1
    }
}

function Ov(A, B) {
    X1("tengu_local_install_migration", {
        result: A,
        reason: B
    })
}
import {
    join as u68
} from "path";
import {
    constants as m68
} from "fs";
var rMB = G1(ax(), 1);
async function oMB() {
    try {
        let A = await yw("tengu_version_config", {
            minVersion: "0.0.0"
        });
        if (A.minVersion && rMB.lt({
                ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
                PACKAGE_URL: "@anthropic-ai/claude-code",
                README_URL: "https://docs.anthropic.com/s/claude-code",
                VERSION: "1.0.83"
            }.VERSION, A.minVersion)) console.error(`
It looks like your version of Claude Code (${{ISSUES_EXPLAINER:"report the issue at https://github.com/anthropics/claude-code/issues",PACKAGE_URL:"@anthropic-ai/claude-code",README_URL:"https://docs.anthropic.com/s/claude-code",VERSION:"1.0.83"}.VERSION}) needs an update.
A newer version (${A.minVersion} or higher) is required to continue.

To update, please run:
    claude update

This will ensure you have access to the latest features and improvements.
`), O5(1)
    } catch (A) {
        R1(A)
    }
}
var d68 = 300000;

function Zd() {
    return u68(e9(), ".update.lock")
}

function c68() {
    try {
        if (!j1().existsSync(e9())) j1().mkdirSync(e9());
        if (j1().existsSync(Zd())) {
            let A = j1().statSync(Zd());
            if (Date.now() - A.mtimeMs < d68) return !1;
            try {
                j1().unlinkSync(Zd())
            } catch (Q) {
                return R1(Q), !1
            }
        }
        return j1().writeFileSync(Zd(), `${process.pid}`, {
            encoding: "utf8",
            flush: !1
        }), !0
    } catch (A) {
        return R1(A), !1
    }
}

function l68() {
    try {
        if (j1().existsSync(Zd())) {
            if (j1().readFileSync(Zd(), {
                    encoding: "utf8"
                }) === `${process.pid}`) j1().unlinkSync(Zd())
        }
    } catch (A) {
        R1(A)
    }
}
async function p68() {
    let A = sA.isRunningWithBun(),
        B = null;
    if (A) B = await F2("bun", ["pm", "bin", "-g"]);
    else B = await F2("npm", ["-g", "config", "get", "prefix"]);
    if (B.code !== 0) return R1(new Error(`Failed to check ${A?"bun":"npm"} permissions`)), null;
    return B.stdout.trim()
}
async function Kq0() {
    try {
        let A = await p68();
        if (!A) return {
            hasPermissions: !1,
            npmPrefix: null
        };
        let B = !1;
        try {
            j1().accessSync(A, m68.W_OK), B = !0
        } catch {
            B = !1
        }
        if (B) return {
            hasPermissions: !0,
            npmPrefix: A
        };
        return R1(new Error("Insufficient permissions for global npm install.")), {
            hasPermissions: !1,
            npmPrefix: A
        }
    } catch (A) {
        return R1(A), {
            hasPermissions: !1,
            npmPrefix: null
        }
    }
}
async function Tv1() {
    let A = h4();
    setTimeout(() => A.abort(), 5000);
    let B = await F2("npm", ["view", `${{ISSUES_EXPLAINER:"report the issue at https://github.com/anthropics/claude-code/issues",PACKAGE_URL:"@anthropic-ai/claude-code",README_URL:"https://docs.anthropic.com/s/claude-code",VERSION:"1.0.83"}.PACKAGE_URL}@latest`, "version"], {
        abortSignal: A.signal
    });
    if (B.code !== 0) {
        if (n1(`npm view failed with code ${B.code}`), B.stderr) n1(`npm stderr: ${B.stderr.trim()}`);
        else n1("npm stderr: (empty)");
        if (B.stdout) n1(`npm stdout: ${B.stdout.trim()}`);
        return null
    }
    return B.stdout.trim()
}
async function HG1() {
    if (!c68()) return R1(new Error("Another process is currently installing an update")), X1("tengu_auto_updater_lock_contention", {
        pid: process.pid,
        currentVersion: {
            ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
            PACKAGE_URL: "@anthropic-ai/claude-code",
            README_URL: "https://docs.anthropic.com/s/claude-code",
            VERSION: "1.0.83"
        }.VERSION
    }), "in_progress";
    try {
        if (i68(), !sA.isRunningWithBun() && sA.isNpmFromWindowsPath()) return R1(new Error("Windows NPM detected in WSL environment")), X1("tengu_auto_updater_windows_npm_in_wsl", {
            currentVersion: {
                ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
                PACKAGE_URL: "@anthropic-ai/claude-code",
                README_URL: "https://docs.anthropic.com/s/claude-code",
                VERSION: "1.0.83"
            }.VERSION
        }), console.error(`
Error: Windows NPM detected in WSL

You're running Claude Code in WSL but using the Windows NPM installation from /mnt/c/.
This configuration is not supported for updates.

To fix this issue:
  1. Install Node.js within your Linux distribution: e.g. sudo apt install nodejs npm
  2. Make sure Linux NPM is in your PATH before the Windows version
  3. Try updating again with 'claude update'
`), "install_failed";
        let {
            hasPermissions: A
        } = await Kq0();
        if (!A) return "no_permissions";
        let B = sA.isRunningWithBun() ? "bun" : "npm",
            Q = await F2(B, ["install", "-g", {
                ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
                PACKAGE_URL: "@anthropic-ai/claude-code",
                README_URL: "https://docs.anthropic.com/s/claude-code",
                VERSION: "1.0.83"
            }.PACKAGE_URL]);
        if (Q.code !== 0) return R1(new Error(`Failed to install new version of claude: ${Q.stdout} ${Q.stderr}`)), "install_failed";
        return "success"
    } finally {
        l68()
    }
}

function i68() {
    let A = Ad();
    for (let [, B] of Object.entries(A)) try {
        let Q = Bd(B);
        if (!Q) continue;
        let {
            filtered: Z,
            hadAlias: D
        } = n11(Q);
        if (D) a11(B, Z), n1(`Removed claude alias from ${B}`)
    } catch (Q) {
        SA(`Failed to remove alias from ${B}: ${Q}`)
    }
}
async function zG1() {
    let A = process.argv[1] || "";
    if (L9() === "windows") A = A.split(Sv1.sep).join(Pv1.sep);
    if (A.includes("/build-ant/") || A.includes("/build-external/")) return "development";
    if (vz()) return "native";
    if (A.includes("/.local/bin/claude")) return "native";
    if (Mv()) return "npm-local";
    if (["/usr/local/lib/node_modules", "/usr/lib/node_modules", "/opt/homebrew/lib/node_modules", "/opt/homebrew/bin", "/usr/local/bin", "/.nvm/versions/node/"].some((Q) => A.includes(Q))) return "npm-global";
    if (A.includes("/npm/") || A.includes("/nvm/")) return "npm-global";
    return "unknown"
}
async function a68() {
    if (vz()) {
        let A = await F2("which", ["claude"]);
        if (A.code === 0 && A.stdout) return A.stdout.trim();
        if (j1().existsSync(Dd(r11(), ".local/bin/claude"))) return Dd(r11(), ".local/bin/claude");
        return "native"
    }
    try {
        return process.argv[0] || "unknown"
    } catch {
        return "unknown"
    }
}

function tMB() {
    try {
        if (vz()) return process.execPath || "unknown";
        return process.argv[1] || "unknown"
    } catch {
        return "unknown"
    }
}
async function s68() {
    let A = [],
        B = Dd(r11(), ".claude", "local");
    if (Rv()) A.push({
        type: "npm-local",
        path: B
    });
    let Q = await F2("npm", ["-g", "config", "get", "prefix"]);
    if (Q.code === 0 && Q.stdout) {
        let F = Q.stdout.trim(),
            I = Dd(F, "bin", "claude");
        if (j1().existsSync(I)) A.push({
            type: "npm-global",
            path: I
        })
    }
    let Z = j1(),
        D = Dd(r11(), ".local", "bin", "claude");
    if (Z.existsSync(D)) A.push({
        type: "native",
        path: D
    });
    if (H0().installMethod === "native") {
        let F = Dd(r11(), ".local", "share", "claude");
        if (Z.existsSync(F) && !A.some((I) => I.type === "native")) A.push({
            type: "native",
            path: F
        })
    }
    return A
}

function r68(A) {
    let B = [],
        Q = H0();
    if (A === "development") return B;
    if (A === "native") {
        let F = (process.env.PATH || "").split(n68),
            I = r11(),
            Y = Dd(I, ".local", "bin"),
            W = Y;
        if (L9() === "windows") W = Y.split(Sv1.sep).join(Pv1.sep);
        if (!F.some((X) => {
                let V = X;
                if (L9() === "windows") V = X.split(Sv1.sep).join(Pv1.sep);
                return V === W || X === "~/.local/bin" || X === "$HOME/.local/bin"
            }))
            if (L9() === "windows") {
                let V = Y.split(Pv1.sep).join(Sv1.sep);
                B.push({
                    issue: `${V} is not in your PATH`,
                    fix: `Add it by running: setx PATH "%PATH%;${V}" or add it through System Properties > Environment Variables`
                })
            } else B.push({
                issue: "~/.local/bin is not in your PATH",
                fix: 'Add export PATH="$HOME/.local/bin:$PATH" to your shell configuration file (e.g., ~/.bashrc, ~/.zshrc)'
            })
    }
    if (A === "npm-local" && Q.installMethod !== "local") B.push({
        issue: `Running from local installation but config install method is '${Q.installMethod}'`,
        fix: "Run claude migrate-installer to fix configuration"
    });
    if (A === "native" && Q.installMethod !== "native") B.push({
        issue: `Running native installation but config install method is '${Q.installMethod}'`,
        fix: "Run claude install to update configuration"
    });
    if (A === "npm-global" && Rv()) B.push({
        issue: "Local installation exists but not being used",
        fix: "Consider using local installation: claude migrate-installer"
    });
    let Z = Vq0(),
        D = iMB();
    if (A === "npm-local") {
        if (Z && !D) B.push({
            issue: "Local installation not accessible",
            fix: `Alias exists but points to invalid target: ${Z}. Update alias: alias claude="~/.claude/local/claude"`
        });
        else if (!Z) B.push({
            issue: "Local installation not accessible",
            fix: 'Create alias: alias claude="~/.claude/local/claude"'
        })
    }
    return B
}