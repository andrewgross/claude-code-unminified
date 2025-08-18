/* chunk:542 bytes:[12725769, 12745758) size:19989 source:unpacked-cli.js */
function m8B(A) {
    if (A.startsWith('"') && A.endsWith('"') || A.startsWith("'") && A.endsWith("'")) return A.slice(1, -1);
    return A
}

function d8B(A) {
    if (process.platform === "win32") return A;
    let Q = "__DOUBLE_BACKSLASH__";
    return A.replace(/\\\\/g, Q).replace(/\\(.)/g, "$1").replace(new RegExp(Q, "g"), "\\")
}

function CK0(A) {
    let B = m8B(A.trim()),
        Q = d8B(B);
    return g8B.test(Q)
}

function tS6(A) {
    let B = m8B(A.trim()),
        Q = d8B(B);
    if (g8B.test(Q)) return Q;
    return null
}
async function c8B(A) {
    let B = tS6(A);
    if (!B) return null;
    let Q = B,
        Z;
    try {
        if (sS6(Q)) Z = j1().readFileBytesSync(Q);
        else {
            let Y = oS6();
            if (Y && Q === nS6(Y)) Z = j1().readFileBytesSync(Y)
        }
    } catch (Y) {
        return R1(Y), null
    }
    if (!Z) return null;
    let D = aS6(Q).slice(1).toLowerCase() || "png",
        {
            buffer: G
        } = await WZ1(Z, Z.length, D),
        F = G.toString("base64"),
        I = u8B(F);
    return {
        path: Q,
        base64: F,
        mediaType: I
    }
}
import {
    randomBytes as t8B
} from "crypto";
import {
    EOL as ED,
    homedir as EK0,
    platform as dj1
} from "os";
import {
    dirname as Wj6,
    join as bx
} from "path";
var h3 = G1(z1(), 1);
import {
    join as eS6
} from "path";
import {
    homedir as Aj6
} from "os";
var gj1 = G1(z1(), 1);
var l8B = G1(KK0(), 1);

function p8B() {
    return i8B().filter(({
        isCompletable: A,
        isEnabled: B
    }) => A && B).every(({
        isComplete: A
    }) => A)
}

function Ne() {
    let A = UQ();
    if (p8B() && !A.hasCompletedProjectOnboarding) r5({
        ...A,
        hasCompletedProjectOnboarding: !0
    })
}

function i8B() {
    let A = j1().existsSync(eS6(t0(), "CLAUDE.md")),
        B = Q12(t0());
    return [{
        key: "workspace",
        text: h3.createElement(T, {
            color: "secondaryText"
        }, "Ask Claude to create a new app or clone a repository"),
        isComplete: !1,
        isCompletable: !0,
        isEnabled: B
    }, {
        key: "claudemd",
        text: h3.createElement(T, {
            color: "secondaryText"
        }, "Run /init to create a CLAUDE.md file with instructions for Claude"),
        isComplete: A,
        isCompletable: !0,
        isEnabled: !B
    }, {
        key: "terminal",
        text: h3.createElement(T, {
            color: "secondaryText"
        }, "Run /terminal-setup to set up terminal integration"),
        isComplete: Boolean(H0().shiftEnterKeyBindingInstalled || H0().optionAsMetaKeyInstalled),
        isCompletable: !0,
        isEnabled: TM.isEnabled()
    }, {
        key: "questions",
        text: h3.createElement(T, {
            color: "secondaryText"
        }, "Use Claude to help with file analysis, editing, bash commands and git"),
        isComplete: !1,
        isCompletable: !1,
        isEnabled: !0
    }, {
        key: "changes",
        text: h3.createElement(T, {
            color: "secondaryText"
        }, "Be as specific as you would with another engineer for the best results"),
        isComplete: !1,
        isCompletable: !1,
        isEnabled: !0
    }]
}
var hj1 = l8B.memoize(() => {
    if (p8B() || UQ().projectOnboardingSeenCount >= 4 || process.env.IS_DEMO) return !1;
    return !Ka("cc_simple_onboarding", "show_simplified_onboarding", !1)
});

function HK0() {
    let A = gj1.useMemo(i8B, []);
    if (gj1.useEffect(() => {
            if (!hj1()) return;
            let B = UQ();
            r5({
                ...B,
                projectOnboardingSeenCount: B.projectOnboardingSeenCount + 1
            })
        }, []), !hj1()) return null;
    return h3.createElement(v, {
        flexDirection: "column",
        gap: 1,
        paddingX: 1
    }, h3.createElement(T, {
        color: "secondaryText"
    }, "Tips for getting started:"), h3.createElement(s_, null, A.filter(({
        isEnabled: B
    }) => B).sort((B, Q) => Number(B.isComplete) - Number(Q.isComplete)).map(({
        key: B,
        text: Q,
        isComplete: Z
    }) => h3.createElement(s_.Item, {
        key: B
    }, h3.createElement(T, null, Z ? h3.createElement(T, {
        color: "success"
    }, s0.tick, " ") : "", Q)))), t0() === Aj6() && h3.createElement(T, {
        color: "warning"
    }, "Note: You have launched ", h3.createElement(T, {
        bold: !0
    }, "claude"), " in your home directory. For the best experience, launch it in a project directory instead."))
}
import {
    homedir as Bj6
} from "os";
import {
    join as Qj6
} from "path";

function Zj6(A) {
    let B = H0();
    B.appleTerminalSetupInProgress = !0, B.appleTerminalBackupPath = A, gA(B)
}

function VZ1() {
    let A = H0();
    A.appleTerminalSetupInProgress = !1, gA(A)
}

function Dj6() {
    let A = H0();
    return {
        inProgress: A.appleTerminalSetupInProgress ?? !1,
        backupPath: A.appleTerminalBackupPath || null
    }
}

function Le() {
    return Qj6(Bj6(), "Library", "Preferences", "com.apple.Terminal.plist")
}
async function n8B() {
    let A = Le(),
        B = `${A}.bak`;
    try {
        let {
            code: Q
        } = await F2("defaults", ["export", "com.apple.Terminal", A]);
        if (Q !== 0) return null;
        if (j1().existsSync(A)) return await F2("defaults", ["export", "com.apple.Terminal", B]), Zj6(B), B;
        return null
    } catch (Q) {
        return R1(Q instanceof Error ? Q : new Error(String(Q))), null
    }
}
async function uj1() {
    let {
        inProgress: A,
        backupPath: B
    } = Dj6();
    if (!A) return {
        status: "no_backup"
    };
    if (!B || !j1().existsSync(B)) return VZ1(), {
        status: "no_backup"
    };
    try {
        let {
            code: Q
        } = await F2("defaults", ["import", "com.apple.Terminal", B]);
        if (Q !== 0) return {
            status: "failed",
            backupPath: B
        };
        return await F2("killall", ["cfprefsd"]), VZ1(), {
            status: "restored"
        }
    } catch (Q) {
        return R1(new Error(`Failed to restore Terminal.app settings with: ${Q}`)), VZ1(), {
            status: "failed",
            backupPath: B
        }
    }
}
import {
    homedir as Gj6
} from "os";
import {
    join as Fj6
} from "path";

function Ij6(A) {
    let B = H0();
    B.iterm2SetupInProgress = !0, B.iterm2BackupPath = A, gA(B)
}

function Me() {
    let A = H0();
    A.iterm2SetupInProgress = !1, gA(A)
}

function Yj6() {
    let A = H0();
    return {
        inProgress: A.iterm2SetupInProgress ?? !1,
        backupPath: A.iterm2BackupPath || null
    }
}

function mj1() {
    return Fj6(Gj6(), "Library", "Preferences", "com.googlecode.iterm2.plist")
}
async function a8B() {
    let A = mj1(),
        B = `${A}.bak`;
    try {
        if (await F2("defaults", ["export", "com.googlecode.iterm2", A]), j1().existsSync(A)) return j1().copyFileSync(A, B), Ij6(B), B;
        return null
    } catch (Q) {
        return R1(Q instanceof Error ? Q : new Error(String(Q))), null
    }
}

function s8B() {
    let {
        inProgress: A,
        backupPath: B
    } = Yj6();
    if (!A) return {
        status: "no_backup"
    };
    if (!B || !j1().existsSync(B)) return Me(), {
        status: "no_backup"
    };
    try {
        return j1().copyFileSync(B, mj1()), Me(), {
            status: "restored"
        }
    } catch (Q) {
        return R1(new Error(`Failed to restore iTerm2 settings with: ${Q}`)), Me(), {
            status: "failed",
            backupPath: B
        }
    }
}
var Jj6 = {
    type: "local",
    name: "terminal-setup",
    userFacingName() {
        return "terminal-setup"
    },
    description: sA.terminal === "Apple_Terminal" ? "Enable Option+Enter key binding for newlines and visual bell" : "Install Shift+Enter key binding for newlines",
    isEnabled: () => CZ1(),
    isHidden: !1,
    async call(A, B) {
        return UK0(B.options.theme)
    }
};

function CZ1() {
    return dj1() === "darwin" && (sA.terminal === "iTerm.app" || sA.terminal === "Apple_Terminal") || sA.terminal === "vscode" || sA.terminal === "cursor" || sA.terminal === "windsurf" || sA.terminal === "ghostty"
}
async function UK0(A) {
    let B = "";
    switch (sA.terminal) {
        case "iTerm.app":
            B = await Vj6(A);
            break;
        case "Apple_Terminal":
            B = await Cj6(A);
            break;
        case "vscode":
            B = zK0("VSCode", A);
            break;
        case "cursor":
            B = zK0("Cursor", A);
            break;
        case "windsurf":
            B = zK0("Windsurf", A);
            break;
        case "ghostty":
            B = await Xj6(A);
            break;
        case null:
            break
    }
    let Q = H0();
    if (["iTerm.app", "vscode", "cursor", "windsurf", "ghostty"].includes(sA.terminal ?? "")) Q.shiftEnterKeyBindingInstalled = !0;
    else if (sA.terminal === "Apple_Terminal") Q.optionAsMetaKeyInstalled = !0;
    return gA(Q), Ne(), B
}

function e8B() {
    return H0().shiftEnterKeyBindingInstalled === !0
}

function A5B() {
    return H0().optionAsMetaKeyInstalled === !0
}

function B5B() {
    return H0().hasUsedBackslashReturn === !0
}

function Q5B() {
    let A = H0();
    if (!A.hasUsedBackslashReturn) gA({
        ...A,
        hasUsedBackslashReturn: !0
    })
}
async function Xj6(A) {
    let Q = [],
        Z = process.env.XDG_CONFIG_HOME;
    if (Z) Q.push(bx(Z, "ghostty", "config"));
    else Q.push(bx(EK0(), ".config", "ghostty", "config"));
    if (dj1() === "darwin") Q.push(bx(EK0(), "Library", "Application Support", "com.mitchellh.ghostty", "config"));
    let D = null,
        G = !1;
    for (let F of Q)
        if (j1().existsSync(F)) {
            D = F, G = !0;
            break
        } if (!D) D = Q[0] ?? null, G = !1;
    if (!D) throw new Error("No valid config path found for Ghostty");
    try {
        let F = "";
        if (G) {
            if (F = j1().readFileSync(D, {
                    encoding: "utf-8"
                }), F.includes("shift+enter")) return `${pB("warning",A)}(
          'Found existing Ghostty Shift+Enter key binding. Remove it to continue.',
        )}${ED}${e1.dim(`See ${D}`)}${ED}`;
            let Y = t8B(4).toString("hex"),
                W = `${D}.${Y}.bak`;
            try {
                j1().copyFileSync(D, W)
            } catch {
                return `${pB("warning",A)("Error backing up existing Ghostty config. Bailing out.")}${ED}${e1.dim(`See ${D}`)}${ED}${e1.dim(`Backup path: ${W}`)}${ED}`
            }
        } else {
            let Y = Wj6(D);
            if (!j1().existsSync(Y)) j1().mkdirSync(Y)
        }
        let I = F;
        if (F && !F.endsWith(`
`)) I += `
`;
        return I += `keybind = shift+enter=text:\\n
`, j1().writeFileSync(D, I, {
            encoding: "utf-8",
            flush: !1
        }), `${pB("success",A)("Installed Ghostty Shift+Enter key binding")}${ED}${pB("success",A)("You may need to restart Ghostty for changes to take effect")}${ED}${e1.dim(`See ${D}`)}${ED}`
    } catch (F) {
        throw R1(F instanceof Error ? F : new Error(String(F))), new Error("Failed to install Ghostty Shift+Enter key binding")
    }
}
async function Vj6(A) {
    let B = mj1();
    try {
        if (!await a8B()) throw new Error("Failed to create backup of iTerm2 preferences, bailing out");
        let {
            code: Z
        } = await F2("defaults", ["write", "com.googlecode.iterm2", "GlobalKeyMap", "-dict-add", "0xd-0x20000-0x24", `<dict>
        <key>Text</key>
        <string>\\n</string>
        <key>Action</key>
        <integer>12</integer>
        <key>Version</key>
        <integer>1</integer>
        <key>Keycode</key>
        <integer>13</integer>
        <key>Modifiers</key>
        <integer>131072</integer>
      </dict>`]);
        if (Z !== 0) throw new Error("Failed to install iTerm2 Shift+Enter key binding");
        return await F2("defaults", ["export", "com.googlecode.iterm2", B]), Me(), `${pB("success",A)("Installed iTerm2 Shift+Enter key binding")}${ED}${e1.dim("See iTerm2 → Preferences → Keys")}${ED}`
    } catch (Q) {
        R1(Q instanceof Error ? Q : new Error(String(Q)));
        let Z = H0().iterm2BackupPath,
            D = !1;
        if (Z && j1().existsSync(Z)) try {
            await F2("defaults", ["import", "com.googlecode.iterm2", Z]), D = !0, Me()
        } catch (G) {
            R1(new Error(`Failed to restore from backup: ${String(G)}`))
        }
        throw new Error(`Failed to install iTerm2 Shift+Enter key binding. ${D?"Your settings have been restored from backup.":Z&&j1().existsSync(Z)?`Restoring from backup failed, try manually with: defaults import com.googlecode.iterm2 ${Z}`:"No backup was available to restore from."}`)
    }
}

function zK0(A = "VSCode", B) {
    let Q = A === "VSCode" ? "Code" : A,
        Z = bx(EK0(), dj1() === "win32" ? bx("AppData", "Roaming", Q, "User") : dj1() === "darwin" ? bx("Library", "Application Support", Q, "User") : bx(".config", Q, "User")),
        D = bx(Z, "keybindings.json");
    try {
        let G = "[]",
            F = [];
        if (!j1().existsSync(Z)) j1().mkdirSync(Z);
        if (j1().existsSync(D)) {
            G = j1().readFileSync(D, {
                encoding: "utf-8"
            }), F = DeA(G) ?? [];
            let J = t8B(4).toString("hex"),
                X = `${D}.${J}.bak`;
            try {
                j1().copyFileSync(D, X)
            } catch {
                return `${pB("warning",B)(`Error backing up existing ${A} terminal keybindings. Bailing out.`)}${ED}${e1.dim(`See ${D}`)}${ED}${e1.dim(`Backup path: ${X}`)}${ED}`
            }
        }
        if (F.find((J) => J.key === "shift+enter" && J.command === "workbench.action.terminal.sendSequence" && J.when === "terminalFocus")) return `${pB("warning",B)(`Found existing ${A} terminal Shift+Enter key binding. Remove it to continue.`)}${ED}${e1.dim(`See ${D}`)}${ED}`;
        let W = GeA(G, {
            key: "shift+enter",
            command: "workbench.action.terminal.sendSequence",
            args: {
                text: `\\\r
`
            },
            when: "terminalFocus"
        });
        return j1().writeFileSync(D, W, {
            encoding: "utf-8",
            flush: !1
        }), `${pB("success",B)(`Installed ${A} terminal Shift+Enter key binding`)}${ED}${e1.dim(`See ${D}`)}${ED}`
    } catch (G) {
        throw R1(G instanceof Error ? G : new Error(String(G))), new Error(`Failed to install ${A} terminal Shift+Enter key binding`)
    }
}
async function r8B(A) {
    let {
        code: B
    } = await F2("/usr/libexec/PlistBuddy", ["-c", `Add :'Window Settings':'${A}':useOptionAsMetaKey bool true`, Le()]);
    if (B !== 0) {
        let {
            code: Q
        } = await F2("/usr/libexec/PlistBuddy", ["-c", `Set :'Window Settings':'${A}':useOptionAsMetaKey true`, Le()]);
        if (Q !== 0) return R1(new Error(`Failed to enable Option as Meta key for Terminal.app profile: ${A}`)), !1
    }
    return !0
}
async function o8B(A) {
    let {
        code: B
    } = await F2("/usr/libexec/PlistBuddy", ["-c", `Add :'Window Settings':'${A}':Bell bool false`, Le()]);
    if (B !== 0) {
        let {
            code: Q
        } = await F2("/usr/libexec/PlistBuddy", ["-c", `Set :'Window Settings':'${A}':Bell false`, Le()]);
        if (Q !== 0) return R1(new Error(`Failed to disable audio bell for Terminal.app profile: ${A}`)), !1
    }
    return !0
}
async function Cj6(A) {
    try {
        if (!await n8B()) throw new Error("Failed to create backup of Terminal.app preferences, bailing out");
        let {
            stdout: Q,
            code: Z
        } = await F2("defaults", ["read", "com.apple.Terminal", "Default Window Settings"]);
        if (Z !== 0 || !Q.trim()) throw new Error("Failed to read default Terminal.app profile");
        let {
            stdout: D,
            code: G
        } = await F2("defaults", ["read", "com.apple.Terminal", "Startup Window Settings"]);
        if (G !== 0 || !D.trim()) throw new Error("Failed to read startup Terminal.app profile");
        let F = !1,
            I = Q.trim(),
            Y = await r8B(I),
            W = await o8B(I);
        if (Y || W) F = !0;
        let J = D.trim();
        if (J !== I) {
            let X = await r8B(J),
                V = await o8B(J);
            if (X || V) F = !0
        }
        if (!F) throw new Error("Failed to enable Option as Meta key or disable audio bell for any Terminal.app profile");
        return await F2("killall", ["cfprefsd"]), VZ1(), `${pB("success",A)("Configured Terminal.app settings:")}${ED}${pB("success",A)('- Enabled "Use Option as Meta key"')}${ED}${pB("success",A)("- Switched to visual bell")}${ED}${e1.dim("Option+Enter will now enter a newline.")}${ED}${e1.dim("You must restart Terminal.app for changes to take effect.",A)}${ED}`
    } catch (B) {
        R1(B instanceof Error ? B : new Error(String(B)));
        let Q = await uj1(),
            Z = "Failed to enable Option as Meta key for Terminal.app.";
        if (Q.status === "restored") throw new Error(`${Z} Your settings have been restored from backup.`);
        else if (Q.status === "failed") throw new Error(`${Z} Restoring from backup failed, try manually with: defaults import com.apple.Terminal ${Q.backupPath}`);
        else throw new Error(`${Z} No backup was available to restore from.`)
    }
}
var TM = Jj6;
var Kj6 = 100;

function cj1(A) {
    return (A.match(/\r\n|\r|\n/g) || []).length
}

function $K0(A, B) {
    if (B === 0) return `[Pasted text #${A}]`;
    return `[Pasted text #${A} +${B} lines]`
}

function D5B(A) {
    return `[Image #${A}]`
}

function Hj6(A, B) {
    return `[...Truncated text #${A} +${B} lines...]`
}

function G5B(A) {
    let B = /\[(Pasted text|Image|\.\.\.Truncated text) #(\d+)(?: \+\d+ lines)?(\.)*\]/g;
    return [...A.matchAll(B)].map((Z) => ({
        id: parseInt(Z[2] || "0"),
        match: Z[0]
    })).filter((Z) => Z.id > 0)
}

function wK0(A) {
    return typeof A !== "string"
}

function zj6() {
    return UQ().history ?? []
}

function lj1() {
    let A = [];
    for (let B of zj6()) {
        if (!wK0(B)) {
            A.push({
                display: B,
                pastedContents: {}
            });
            continue
        }
        if (B.pastedText) {
            let Z = cj1(B.pastedText),
                D = /\[Pasted text \+([0-9]+) lines\]/g,
                G, F = !1;
            while ((G = D.exec(B.display)) !== null)
                if (Number(G[1]) === Z) {
                    let Y = B.display.replace(G[0], $K0(1, Z));
                    A.push({
                        display: Y,
                        pastedContents: {
                            [1]: {
                                id: 1,
                                type: "text",
                                content: B.pastedText
                            }
                        }
                    }), F = !0;
                    break
                } if (!F) A.push({
                display: B.display,
                pastedContents: {}
            });
            continue
        }
        let Q = {};
        if (B.pastedContents) Q = Object.fromEntries(Object.entries(B.pastedContents).map(([Z, D]) => [Number(Z), D]).filter(([Z]) => Z !== void 0 && Number(Z) > 0));
        A.push({
            display: B.display,
            pastedContents: Q
        })
    }
    return A
}

function Ej6(A, B) {
    if (!A || !B) return !A && !B;
    let Q = Object.keys(A).map(Number),
        Z = Object.keys(B).map(Number);
    if (Q.length !== Z.length) return !1;
    for (let D of Q) {
        let G = A[D],
            F = B[D];
        if (!G || !F || G.content !== F.content) return !1
    }
    return !0
}