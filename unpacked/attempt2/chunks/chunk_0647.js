/* chunk:647 bytes:[14645982, 14665405) size:19423 source:unpacked-cli.js */
async function mlB() {
    X1("tengu_update_check", {}), console.log(`Current version: ${{ISSUES_EXPLAINER:"report the issue at https://github.com/anthropics/claude-code/issues",PACKAGE_URL:"@anthropic-ai/claude-code",README_URL:"https://docs.anthropic.com/s/claude-code",VERSION:"1.0.83"}.VERSION}`), console.log("Checking for updates..."), n1("update: Starting update check"), n1("update: Running diagnostic");
    let A = await o11();
    if (n1(`update: Installation type: ${A.installationType}`), n1(`update: Config install method: ${A.configInstallMethod}`), A.multipleInstallations.length > 1) {
        console.log(""), console.log(e1.yellow("Warning: Multiple installations found"));
        for (let I of A.multipleInstallations) {
            let Y = A.installationType === I.type ? " (currently running)" : "";
            console.log(`- ${I.type} at ${I.path}${Y}`)
        }
    }
    if (A.warnings.length > 0) {
        lD(`
`);
        for (let I of A.warnings) n1(`update: Warning detected: ${I.issue}`), n1(`update: Showing warning: ${I.issue}`), lD(e1.yellow(`Warning: ${I.issue}
`)), lD(e1.bold(`Fix: ${I.fix}
`))
    }
    let B = H0();
    if (!B.installMethod) {
        console.log(""), console.log("Updating configuration to track installation method...");
        let I = "unknown";
        switch (A.installationType) {
            case "npm-local":
                I = "local";
                break;
            case "native":
                I = "native";
                break;
            case "npm-global":
                I = "global";
                break;
            default:
                I = "unknown"
        }
        gA({
            ...B,
            installMethod: I
        }), console.log(`Installation method set to: ${I}`)
    }
    if (A.installationType === "development") console.log(""), console.log(e1.yellow("Warning: Cannot update development build")), await P4(1);
    if (B.installMethod && A.configInstallMethod !== "not set") {
        let {
            installationType: I,
            configInstallMethod: Y
        } = A, J = {
            "npm-local": "local",
            "npm-global": "global",
            native: "native",
            development: "development",
            unknown: "unknown"
        } [I] || I;
        if (J !== Y && Y !== "unknown") console.log(""), console.log(e1.yellow("Warning: Configuration mismatch")), console.log(`Config expects: ${Y} installation`), console.log(`Currently running: ${I}`), console.log(e1.yellow(`Updating the ${I} installation you are currently using`)), gA({
            ...B,
            installMethod: J
        }), console.log(`Config updated to reflect current installation method: ${J}`)
    }
    if (A.installationType === "native") {
        n1("update: Detected native installation, using native updater");
        try {
            let I = await UA1();
            if (!I.latestVersion) console.error("Failed to check for updates"), await P4(1);
            if (I.latestVersion === {
                    ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
                    PACKAGE_URL: "@anthropic-ai/claude-code",
                    README_URL: "https://docs.anthropic.com/s/claude-code",
                    VERSION: "1.0.83"
                }.VERSION) console.log(e1.green(`Claude Code is up to date (${{ISSUES_EXPLAINER:"report the issue at https://github.com/anthropics/claude-code/issues",PACKAGE_URL:"@anthropic-ai/claude-code",README_URL:"https://docs.anthropic.com/s/claude-code",VERSION:"1.0.83"}.VERSION})`));
            else if (I.wasUpdated) console.log(e1.green(`Successfully updated from ${{ISSUES_EXPLAINER:"report the issue at https://github.com/anthropics/claude-code/issues",PACKAGE_URL:"@anthropic-ai/claude-code",README_URL:"https://docs.anthropic.com/s/claude-code",VERSION:"1.0.83"}.VERSION} to version ${I.latestVersion}`));
            else console.log(e1.green(`Claude Code is up to date (${{ISSUES_EXPLAINER:"report the issue at https://github.com/anthropics/claude-code/issues",PACKAGE_URL:"@anthropic-ai/claude-code",README_URL:"https://docs.anthropic.com/s/claude-code",VERSION:"1.0.83"}.VERSION})`));
            await P4(0)
        } catch (I) {
            console.error("Error: Failed to install native update"), console.error(String(I)), console.error('Try running "claude doctor" for diagnostics'), await P4(1)
        }
    }
    Dg1(), n1("update: Checking npm registry for latest version"), n1(`update: Package URL: ${{ISSUES_EXPLAINER:"report the issue at https://github.com/anthropics/claude-code/issues",PACKAGE_URL:"@anthropic-ai/claude-code",README_URL:"https://docs.anthropic.com/s/claude-code",VERSION:"1.0.83"}.PACKAGE_URL}`);
    let Q = `npm view ${{ISSUES_EXPLAINER:"report the issue at https://github.com/anthropics/claude-code/issues",PACKAGE_URL:"@anthropic-ai/claude-code",README_URL:"https://docs.anthropic.com/s/claude-code",VERSION:"1.0.83"}.PACKAGE_URL}@latest version`;
    n1(`update: Running: ${Q}`);
    let Z = await Tv1();
    if (n1(`update: Latest version from npm: ${Z||"FAILED"}`), !Z) {
        if (n1("update: Failed to get latest version from npm registry"), console.error(e1.red("Failed to check for updates")), console.error("Unable to fetch latest version from npm registry"), console.error(""), console.error("Possible causes:"), console.error("  • Network connectivity issues"), console.error("  • npm registry is unreachable"), console.error("  • Corporate proxy/firewall blocking npm"), {
                ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
                PACKAGE_URL: "@anthropic-ai/claude-code",
                README_URL: "https://docs.anthropic.com/s/claude-code",
                VERSION: "1.0.83"
            }.PACKAGE_URL && !{
                ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
                PACKAGE_URL: "@anthropic-ai/claude-code",
                README_URL: "https://docs.anthropic.com/s/claude-code",
                VERSION: "1.0.83"
            }.PACKAGE_URL.startsWith("@anthropic")) console.error("  • Internal/development build not published to npm");
        console.error(""), console.error("Try:"), console.error("  • Check your internet connection"), console.error("  • Run with --debug flag for more details"), console.error(`  • Manually check: npm view ${{ISSUES_EXPLAINER:"report the issue at https://github.com/anthropics/claude-code/issues",PACKAGE_URL:"@anthropic-ai/claude-code",README_URL:"https://docs.anthropic.com/s/claude-code",VERSION:"1.0.83"}.PACKAGE_URL||"@anthropic-ai/claude-cli"} version`), console.error("  • Check if you need to login: npm whoami"), await P4(1)
    }
    if (Z === {
            ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
            PACKAGE_URL: "@anthropic-ai/claude-code",
            README_URL: "https://docs.anthropic.com/s/claude-code",
            VERSION: "1.0.83"
        }.VERSION) console.log(e1.green(`Claude Code is up to date (${{ISSUES_EXPLAINER:"report the issue at https://github.com/anthropics/claude-code/issues",PACKAGE_URL:"@anthropic-ai/claude-code",README_URL:"https://docs.anthropic.com/s/claude-code",VERSION:"1.0.83"}.VERSION})`)), await P4(0);
    console.log(`New version available: ${Z} (current: ${{ISSUES_EXPLAINER:"report the issue at https://github.com/anthropics/claude-code/issues",PACKAGE_URL:"@anthropic-ai/claude-code",README_URL:"https://docs.anthropic.com/s/claude-code",VERSION:"1.0.83"}.VERSION})`), console.log("Installing update...");
    let D = !1,
        G = "";
    switch (A.installationType) {
        case "npm-local":
            D = !0, G = "local";
            break;
        case "npm-global":
            D = !1, G = "global";
            break;
        case "unknown": {
            let I = Rv();
            D = I, G = I ? "local" : "global", console.log(e1.yellow("Warning: Could not determine installation type")), console.log(`Attempting ${G} update based on file detection...`);
            break
        }
        default:
            console.error(`Error: Cannot update ${A.installationType} installation`), await P4(1)
    }
    console.log(`Using ${G} installation update method...`), n1(`update: Update method determined: ${G}`), n1(`update: useLocalUpdate: ${D}`);
    let F;
    if (D) n1("update: Calling installOrUpdateClaudePackage() for local update"), F = await Qd();
    else n1("update: Calling installGlobalPackage() for global update"), F = await HG1();
    switch (n1(`update: Installation status: ${F}`), F) {
        case "success":
            console.log(e1.green(`Successfully updated from ${{ISSUES_EXPLAINER:"report the issue at https://github.com/anthropics/claude-code/issues",PACKAGE_URL:"@anthropic-ai/claude-code",README_URL:"https://docs.anthropic.com/s/claude-code",VERSION:"1.0.83"}.VERSION} to version ${Z}`));
            break;
        case "no_permissions":
            if (console.error("Error: Insufficient permissions to install update"), D) console.error("Try manually updating with:"), console.error(`  cd ~/.claude/local && npm update ${{ISSUES_EXPLAINER:"report the issue at https://github.com/anthropics/claude-code/issues",PACKAGE_URL:"@anthropic-ai/claude-code",README_URL:"https://docs.anthropic.com/s/claude-code",VERSION:"1.0.83"}.PACKAGE_URL}`);
            else console.error("Try running with sudo or fix npm permissions"), console.error("Or consider migrating to a local installation with:"), console.error("  claude migrate-installer");
            await P4(1);
            break;
        case "install_failed":
            if (console.error("Error: Failed to install update"), D) console.error("Try manually updating with:"), console.error(`  cd ~/.claude/local && npm update ${{ISSUES_EXPLAINER:"report the issue at https://github.com/anthropics/claude-code/issues",PACKAGE_URL:"@anthropic-ai/claude-code",README_URL:"https://docs.anthropic.com/s/claude-code",VERSION:"1.0.83"}.PACKAGE_URL}`);
            else console.error("Or consider migrating to a local installation with:"), console.error("  claude migrate-installer");
            await P4(1);
            break;
        case "in_progress":
            console.error("Error: Another instance is currently performing an update"), console.error("Please wait and try again later"), await P4(1);
            break
    }
    await P4(0)
}
var V4 = G1(z1(), 1);
import {
    homedir as clB
} from "node:os";
import {
    join as llB
} from "node:path";

function OT8() {
    let A = sA.platform === "win32",
        B = clB();
    if (A) return llB(B, ".local", "bin", "claude.exe").replace(/\//g, "\\");
    return "~/.local/bin/claude"
}
async function TT8() {
    let A = [],
        B = 0;
    n1("Attempting to remove global npm installation of @anthropic/claude-code");
    let {
        code: Q,
        stderr: Z
    } = await s5("npm", ["uninstall", "-g", "@anthropic/claude-code"], {
        cwd: j1().cwd()
    });
    if (Q === 0) B++, n1("Removed global npm installation");
    else if (Z && !Z.includes("npm ERR! code E404")) A.push("Failed to remove global npm installation"), SA(`Failed to uninstall global npm package: ${Z}`);
    let D = j1(),
        G = llB(clB(), ".claude", "local");
    if (D.existsSync(G)) try {
        D.rmSync(G, {
            recursive: !0,
            force: !0
        }), B++, n1(`Removed local installation at ${G}`)
    } catch (F) {
        A.push(`Failed to remove ${G}: ${F}`), SA(`Failed to remove local installation: ${F}`)
    }
    return await PT8(), {
        removed: B,
        errors: A
    }
}
async function PT8() {
    let {
        stdout: A
    } = await s5("which", ["-a", "claude"], {
        cwd: j1().cwd()
    });
    if (!A) return;
    let B = A.trim().split(`
`).filter(Boolean),
        Q = j1();
    for (let Z of B)
        if (Z.includes("node_modules") || Z.includes("npm")) try {
            Q.unlinkSync(Z), n1(`Removed stale npm claude command at ${Z}`)
        } catch {}
}

function dlB({
    messages: A
}) {
    if (A.length === 0) return null;
    return V4.default.createElement(v, {
        flexDirection: "column",
        gap: 0,
        marginBottom: 1
    }, V4.default.createElement(v, null, V4.default.createElement(T, {
        color: "warning"
    }, s0.warning, " Setup notes:")), A.map((B, Q) => V4.default.createElement(v, {
        key: Q,
        marginLeft: 2
    }, V4.default.createElement(T, {
        color: "secondaryText"
    }, "• ", B))))
}

function ST8({
    onDone: A,
    force: B,
    target: Q
}) {
    let [Z, D] = V4.useState({
        type: "checking"
    });
    return V4.useEffect(() => {
        async function G() {
            try {
                n1(`Install: Starting installation process (force=${B}, target=${Q})`), D({
                    type: "cleaning-npm"
                });
                let {
                    removed: F,
                    errors: I
                } = await TT8();
                if (F > 0) n1(`Cleaned up ${F} npm installation(s)`);
                if (I.length > 0) n1(`Cleanup warnings: ${I.join(", ")}`);
                let Y = TuB();
                if (Y.length > 0) n1(`Shell alias cleanup: ${Y.join("; ")}`);
                D({
                    type: "installing",
                    version: Q || "stable"
                }), n1(`Install: Calling installLatest(force=true, target=${Q}, forceReinstall=${B})`);
                let J = await UA1(!0, Q, B);
                if (n1(`Install: installLatest returned version=${J.latestVersion}, wasUpdated=${J.wasUpdated}`), !J.latestVersion) SA("Install: Failed to retrieve version information during install");
                if (!J.wasUpdated) n1("Install: Already up to date");
                D({
                    type: "setting-up"
                });
                let X = await EA1(!0);
                if (n1(`Install: Setup launcher completed with ${X.length} messages`), X.length > 0) X.forEach((V) => n1(`Install: Setup message: ${V}`));
                if (X1("tengu_claude_install_command", {
                        has_version: J.latestVersion ? 1 : 0,
                        forced: B ? 1 : 0
                    }), X.length > 0) D({
                    type: "set-up",
                    messages: X
                }), setTimeout(() => {
                    D({
                        type: "success",
                        version: J.latestVersion || "current",
                        setupMessages: X
                    })
                }, 2000);
                else n1("Install: Shell PATH already configured"), D({
                    type: "success",
                    version: J.latestVersion || "current"
                })
            } catch (F) {
                SA(`Install command failed: ${F}`), D({
                    type: "error",
                    message: F instanceof Error ? F.message : String(F)
                })
            }
        }
        G()
    }, [B, Q]), V4.useEffect(() => {
        if (Z.type === "success") setTimeout(() => {
            A()
        }, 2000);
        else if (Z.type === "error") setTimeout(() => {
            A()
        }, 3000)
    }, [Z, A]), V4.default.createElement(v, {
        flexDirection: "column",
        marginTop: 1
    }, Z.type === "checking" && V4.default.createElement(T, {
        color: "claude"
    }, "Checking installation status..."), Z.type === "cleaning-npm" && V4.default.createElement(T, {
        color: "warning"
    }, "Cleaning up old npm installations..."), Z.type === "installing" && V4.default.createElement(T, {
        color: "claude"
    }, "Installing Claude Code native build ", Z.version, "..."), Z.type === "setting-up" && V4.default.createElement(T, {
        color: "claude"
    }, "Setting up launcher and shell integration..."), Z.type === "set-up" && V4.default.createElement(dlB, {
        messages: Z.messages
    }), Z.type === "success" && V4.default.createElement(v, {
        flexDirection: "column",
        gap: 1
    }, Z.setupMessages && V4.default.createElement(dlB, {
        messages: Z.setupMessages
    }), V4.default.createElement(v, null, V4.default.createElement(T, {
        color: "success"
    }, s0.tick, " "), V4.default.createElement(T, {
        color: "success",
        bold: !0
    }, "Claude Code successfully installed!")), V4.default.createElement(v, {
        marginLeft: 2,
        flexDirection: "column",
        gap: 1
    }, Z.version !== "current" && V4.default.createElement(v, null, V4.default.createElement(T, {
        color: "secondaryText"
    }, "Version: "), V4.default.createElement(T, {
        color: "claude"
    }, Z.version)), V4.default.createElement(v, null, V4.default.createElement(T, {
        color: "secondaryText"
    }, "Location: "), V4.default.createElement(T, {
        color: "text"
    }, OT8()))), V4.default.createElement(v, {
        marginLeft: 2,
        flexDirection: "column",
        gap: 1
    }, V4.default.createElement(v, {
        marginTop: 1
    }, V4.default.createElement(T, {
        color: "secondaryText"
    }, "Next: Run "), V4.default.createElement(T, {
        color: "claude",
        bold: !0
    }, "claude --help"), V4.default.createElement(T, {
        color: "secondaryText"
    }, " to get started")))), Z.type === "error" && V4.default.createElement(v, {
        flexDirection: "column",
        gap: 1
    }, V4.default.createElement(v, null, V4.default.createElement(T, {
        color: "error"
    }, s0.cross, " "), V4.default.createElement(T, {
        color: "error"
    }, "Installation failed")), V4.default.createElement(T, {
        color: "error"
    }, Z.message), V4.default.createElement(v, {
        marginTop: 1
    }, V4.default.createElement(T, {
        color: "secondaryText"
    }, "Try running with --force to override checks"))))
}
var plB = {
    type: "local-jsx",
    name: "install",
    description: "Install Claude Code native build",
    argumentHint: "[options]",
    async call(A, B, Q) {
        let Z = Q.includes("--force"),
            G = Q.filter((I) => !I.startsWith("--"))[0],
            {
                unmount: F
            } = S8(V4.default.createElement(ST8, {
                onDone: () => {
                    F(), A()
                },
                force: Z,
                target: G
            }))
    }
};
process.env.COREPACK_ENABLE_AUTO_PIN = "0";

function jT8() {
    let A = !!process.versions.bun,
        B = process.execArgv.some((Z) => {
            if (A) return /--inspect(-brk)?/.test(Z);
            else return /--inspect(-brk)?|--debug(-brk)?/.test(Z)
        }),
        Q = process.env.NODE_OPTIONS && /--inspect(-brk)?|--debug(-brk)?/.test(process.env.NODE_OPTIONS);
    try {
        return !!global.require("inspector").url() || B || Q
    } catch {
        return B || Q
    }
}
if (jT8()) process.exit(1);

function xT8() {
    let A = H0();
    gA({
        ...A,
        hasCompletedOnboarding: !0,
        lastOnboardingVersion: {
            ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
            PACKAGE_URL: "@anthropic-ai/claude-code",
            README_URL: "https://docs.anthropic.com/s/claude-code",
            VERSION: "1.0.83"
        }.VERSION
    })
}