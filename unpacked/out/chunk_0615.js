/* chunk:615 bytes:[14095912, 14115143) size:19231 source:unpacked-cli.js */
function wuB({
    sections: A,
    version: B,
    onClose: Q
}) {
    DA((Y, W) => {
        if (W.return || W.escape) Q()
    });
    let Z = U2(Q),
        [{
            mainLoopModel: D,
            maxRateLimitFallbackActive: G
        }] = tQ(),
        F = X01(),
        I = zN8(D, G, F.resetsAt);
    return A = [...A, {
        title: "Model",
        command: "/model",
        items: [{
            label: I,
            type: "info"
        }]
    }], bQ.createElement(v, {
        flexDirection: "column",
        width: "100%",
        padding: 1
    }, bQ.createElement(v, {
        flexDirection: "column",
        gap: 1
    }, bQ.createElement(v, {
        flexDirection: "column"
    }, bQ.createElement(v, null, bQ.createElement(T, {
        bold: !0
    }, "Claude Code "), bQ.createElement(T, {
        color: "secondaryText"
    }, "v", B)), bQ.createElement(v, null, bQ.createElement(T, {
        color: "secondaryText"
    }, " L "), bQ.createElement(T, null, "Session ID: ", CB()))), A.map((Y, W) => (Y.items && Y.items.length > 0 || Y.content) && bQ.createElement(v, {
        key: W,
        flexDirection: "column",
        gap: 0
    }, bQ.createElement(v, null, bQ.createElement(T, {
        bold: !0
    }, Y.title, " "), Y.command && bQ.createElement(T, {
        color: "secondaryText"
    }, "• ", Y.command)), Y.items?.map((J, X) => bQ.createElement(UN8, {
        key: X,
        item: J
    })), Y.content)), bQ.createElement(v, {
        marginTop: 1
    }, Z.pending ? bQ.createElement(T, {
        dimColor: !0
    }, "Press ", Z.keyName, " again to exit") : bQ.createElement(Qb, null))))
}
var LuB = G1(QN1(), 1);
import {
    join as cI,
    dirname as wb,
    resolve as Ub,
    delimiter as wN8,
    basename as $N8
} from "node:path";
import {
    homedir as Bg1
} from "os";
import {
    join as Qg1
} from "path";

function MI1() {
    return process.env.XDG_STATE_HOME ?? Qg1(Bg1(), ".local", "state")
}

function $uB() {
    return process.env.XDG_CACHE_HOME ?? Qg1(Bg1(), ".cache")
}

function quB() {
    return process.env.XDG_DATA_HOME ?? Qg1(Bg1(), ".local", "share")
}

function NuB() {
    return Qg1(Bg1(), ".local", "bin")
}
import {
    createHash as qN8
} from "node:crypto";
var NN8 = 2,
    IT0 = "https://storage.googleapis.com/claude-code-dist-86c565f3-f756-42ad-8dfa-d59b1c096819/claude-code-releases";

function RI1() {
    let A = sA.platform,
        B = process.arch === "x64" ? "x64" : process.arch === "arm64" ? "arm64" : null;
    if (!B) {
        let Q = new Error(`Unsupported architecture: ${process.arch}`);
        throw SA(`Native installer does not support architecture: ${process.arch}`), Q
    }
    return `${A}-${B}`
}
async function YT0() {
    return
}

function sd() {
    let Q = RI1().startsWith("win32") ? "claude.exe" : "claude";
    return {
        versions: cI(quB(), "claude", "versions"),
        staging: cI($uB(), "claude", "staging"),
        locks: cI(MI1(), "claude", "locks"),
        executable: cI(NuB(), Q)
    }
}

function LN8() {
    return {
        versions: cI(e9(), "versions"),
        locks: cI(e9(), "locks"),
        staging: cI(e9(), "staging")
    }
}

function zA1(A) {
    let B = j1();
    if (!B.existsSync(A)) return !1;
    let Q = B.statSync(A);
    return Q.isFile() && Q.size > 10485760
}

function Zg1(A) {
    let B = sd(),
        Q = j1();
    [B.versions, B.staging, B.locks].forEach((F) => {
        if (!Q.existsSync(F)) Q.mkdirSync(F)
    });
    let D = wb(B.executable);
    if (!Q.existsSync(D)) Q.mkdirSync(D);
    let G = cI(B.versions, A);
    if (!Q.existsSync(G)) Q.writeFileSync(G, "", {
        flush: !0,
        encoding: "utf8"
    });
    return {
        stagingPath: cI(B.staging, A),
        installPath: G
    }
}
async function MuB(A, B, Q = 0) {
    let Z = sd(),
        D = j1(),
        G = $N8(A),
        F = cI(Z.locks, `${G}.lock`);
    if (!D.existsSync(Z.locks)) D.mkdirSync(Z.locks);
    let I = null;
    try {
        return I = await LuB.default.lock(A, {
            stale: 60000,
            retries: {
                retries: Q,
                minTimeout: Q > 0 ? 1000 : 100,
                maxTimeout: Q > 0 ? 5000 : 500
            },
            lockfilePath: F
        }), await B(), !0
    } catch (Y) {
        return R1(Y instanceof Error ? Y : new Error(String(Y))), SA(`Failed to execute version lock callback: ${Y}`), !1
    } finally {
        if (I) await I()
    }
}
async function MN8(A = "stable") {
    try {
        return (await J9.get(`${IT0}/${A}`, {
            timeout: 1e4,
            responseType: "text"
        })).data.trim()
    } catch (B) {
        throw new Error(`Failed to fetch version from GCS ${A}: ${B}`)
    }
}
async function RuB(A) {
    if (A && /^v?\d+\.\d+\.\d+(-\S+)?$/.test(A)) return A.startsWith("v") ? A.slice(1) : A;
    let B = A || "stable";
    if (B !== "stable" && B !== "latest") throw new Error(`Invalid channel: ${A}. Use 'stable' or 'latest'`);
    return MN8(B)
}
async function RN8(A, B) {
    let Q = j1();
    if (Q.existsSync(B)) Q.rmSync(B, {
        recursive: !0,
        force: !0
    });
    let Z = RI1(),
        F = (await J9.get(`${IT0}/${A}/manifest.json`, {
            timeout: 1e4,
            responseType: "json"
        })).data.platforms[Z];
    if (!F) throw new Error(`Platform ${Z} not found in manifest for version ${A}`);
    let I = F.checksum,
        Y = Z.startsWith("win32") ? "claude.exe" : "claude",
        W = `${IT0}/${A}/${Z}/${Y}`,
        J = await J9.get(W, {
            timeout: 300000,
            responseType: "arraybuffer"
        }),
        X = qN8("sha256");
    X.update(J.data);
    let V = X.digest("hex");
    if (V !== I) throw new Error(`Checksum mismatch for version ${A}: expected ${I}, got ${V}`);
    Q.mkdirSync(B);
    let C = cI(B, Y);
    (await import("fs")).writeFileSync(C, Buffer.from(J.data)), Q.chmodSync(C, 493)
}
async function ON8(A) {
    let {
        stagingPath: B
    } = Zg1(A);
    return RN8(A, B)
}

function TN8(A, B) {
    let Q = j1();
    if (!Q.existsSync(wb(B))) Q.mkdirSync(wb(B));
    let D = RI1().startsWith("win32") ? "claude.exe" : "claude",
        G = cI(A, D);
    if (!Q.existsSync(G)) throw new Error(`Staged binary not found at ${G}`);
    Q.copyFileSync(G, B), Q.chmodSync(B, 493), Q.rmSync(A, {
        recursive: !0,
        force: !0
    })
}

function PN8(A) {
    let {
        stagingPath: B,
        installPath: Q
    } = Zg1(A);
    TN8(B, Q)
}

function SN8(A) {
    let {
        installPath: B
    } = Zg1(A);
    return zA1(B)
}
async function jN8(A, B = !1) {
    let Q = await RuB(A),
        {
            installPath: Z
        } = Zg1(Q);
    if (n1(`Checking for native installer update to version ${Q}`), !await MuB(Z, async () => {
            if (!SN8(Q) || B) n1(B ? `Force reinstalling native installer version ${Q}` : `Downloading native installer version ${Q}`), await ON8(Q), PN8(Q);
            else n1(`Version ${Q} already installed, updating symlink`);
            let G = sd();
            kN8(G.executable, Z)
        }, 3)) return !1;
    return n1(`Successfully updated to version ${Q}`), !0
}

function kN8(A, B) {
    let Q = j1();
    if (RI1().startsWith("win32")) try {
        let F = wb(A);
        if (!Q.existsSync(F)) Q.mkdirSync(F);
        if (Q.existsSync(A)) {
            try {
                let I = Q.statSync(A),
                    Y = Q.statSync(B);
                if (I.size === Y.size) return !1
            } catch {}
            Q.unlinkSync(A)
        }
        if (!Q.existsSync(B)) throw new Error(`Source file does not exist: ${B}`);
        return Q.copyFileSync(B, A), !0
    } catch (F) {
        return R1(new Error(`Failed to copy executable from ${B} to ${A}: ${F}`)), !1
    }
    try {
        if (Q.existsSync(A)) {
            try {
                let F = Q.readlinkSync(A),
                    I = Ub(wb(A), F),
                    Y = Ub(B);
                if (I === Y) return !1
            } catch {}
            Q.unlinkSync(A)
        }
    } catch (F) {
        R1(new Error(`Failed to check/remove existing symlink: ${F}`))
    }
    let G = `${A}.tmp.${process.pid}.${Date.now()}`;
    try {
        return Q.symlinkSync(B, G), Q.renameSync(G, A), !0
    } catch (F) {
        try {
            if (Q.existsSync(G)) Q.unlinkSync(G)
        } catch {}
        return R1(new Error(`Failed to create symlink from ${A} to ${B}: ${F}`)), !1
    }
}
async function rd() {
    if (H0().installMethod === "native") return !0;
    return await MY("tengu_native_installation")
}
async function EA1(A = !1) {
    if (!A && !await rd()) return [];
    await YT0();
    let B = j1(),
        Q = sd(),
        Z = [],
        D = wb(Q.executable),
        G = Ub(D),
        I = RI1().startsWith("win32");
    if (!B.existsSync(D)) Z.push(`Directory ${D} does not exist`);
    if (!B.existsSync(Q.executable)) Z.push(`Claude command not found at ${Q.executable}`);
    else if (!I) try {
        let W = B.readlinkSync(Q.executable),
            J = Ub(wb(Q.executable), W);
        if (!B.existsSync(J)) Z.push(`Claude symlink points to non-existent file: ${W}`);
        else if (!zA1(J)) Z.push(`Claude symlink points to invalid binary: ${W}`)
    } catch {
        if (!zA1(Q.executable)) Z.push(`${Q.executable} exists but is not a valid Claude binary`)
    } else if (!zA1(Q.executable)) Z.push(`${Q.executable} exists but is not a valid Claude binary`);
    if (!(process.env.PATH || "").split(wN8).some((W) => {
            try {
                return Ub(W) === G
            } catch {
                return !1
            }
        }))
        if (I) {
            let W = D.replace(/\//g, "\\");
            Z.push(`${W} is not in your PATH`, `Add it by running: setx PATH "%PATH%;${W}"`, "Or add it through System Properties > Environment Variables")
        } else Z.push("~/.local/bin is not in your PATH", 'Add it by running: export PATH="~/.local/bin:$PATH"');
    return Z
}
async function UA1(A = !1, B, Q = !1) {
    if (!A && !await rd()) return {
        latestVersion: null,
        wasUpdated: !1
    };
    await YT0();
    try {
        let Z = await RuB(B),
            D = await jN8(B, Q);
        if (Z || D) {
            let G = H0();
            if (G.installMethod !== "native") gA({
                ...G,
                installMethod: "native"
            }), n1('Native installer: Set installMethod to "native"')
        }
        return {
            latestVersion: Z,
            wasUpdated: D
        }
    } catch (Z) {
        return R1(new Error(`Failed to check/install latest version: ${Z}`)), SA(`Auto-update check failed: ${Z}`), {
            latestVersion: null,
            wasUpdated: !1
        }
    }
}

function yN8(A) {
    let B = j1();
    try {
        if (B.existsSync(A)) {
            let Q = B.readlinkSync(A),
                Z = Ub(wb(A), Q);
            if (B.existsSync(Z) && zA1(Z)) return Z
        }
    } catch {}
    return null
}
async function OuB() {
    if (await Promise.resolve(), !await rd()) return;
    await YT0();
    let A = j1(),
        B = sd();
    if (!A.existsSync(B.versions)) return;
    try {
        let Q = A.readdirStringSync(B.versions).filter((J) => {
                let X = cI(B.versions, J);
                try {
                    let V = A.statSync(X);
                    return V.isFile() && (V.size === 0 || zA1(X))
                } catch {
                    return !1
                }
            }),
            Z = process.execPath,
            D = Z && Z.includes(B.versions) ? Ub(Z) : null,
            G = new Set([...D ? [D] : []]),
            F = yN8(B.executable);
        if (F) G.add(F);
        let I = Q.map((J) => {
                let X = Ub(B.versions, J);
                return {
                    name: J,
                    path: X,
                    mtime: A.statSync(X).mtime
                }
            }).filter((J) => !G.has(J.path)).sort((J, X) => X.mtime.getTime() - J.mtime.getTime()),
            Y = I.slice(NN8);
        if (Y.length === 0) return;
        let W = 0;
        for (let J of Y) try {
            if (await MuB(J.path, () => {
                    A.unlinkSync(J.path)
                })) W++
        } catch (X) {
            R1(new Error(`Failed to delete version ${J.name}: ${X}`))
        }
        if (W > 0) X1("tengu_native_version_cleanup", {
            deleted_count: W,
            protected_count: G.size,
            retained_count: I.length - W
        })
    } catch (Q) {
        R1(new Error(`Version cleanup failed: ${Q}`))
    }
}

function Dg1() {
    let A = j1(),
        B = sd();
    try {
        if (A.existsSync(B.executable)) A.unlinkSync(B.executable), n1(`Removed claude symlink at ${B.executable}`)
    } catch (Q) {
        R1(new Error(`Failed to remove claude symlink: ${Q}`))
    }
}

function TuB() {
    let A = [],
        B = Ad();
    for (let [Q, Z] of Object.entries(B)) try {
        let D = Bd(Z);
        if (!D) continue;
        let {
            filtered: G,
            hadAlias: F
        } = n11(D);
        if (F) a11(Z, G), A.push(`Removed old claude alias from ${Z}`), n1(`Cleaned up claude alias from ${Q} config`)
    } catch (D) {
        R1(D instanceof Error ? D : new Error(String(D))), A.push(`Failed to clean up ${Z}: ${D}`)
    }
    return A
}

function _N8(A, B = null) {
    let Q = [],
        Z = A?.find((D) => D.name === "ide");
    if (Z) {
        let D = Lz0(Z) ?? "IDE";
        if (Z.type === "connected") Q.push({
            label: `Connected to ${D} extension`,
            type: "check"
        });
        else Q.push({
            label: `Not connected to ${D}`,
            type: "error"
        })
    }
    if (B) {
        let D = kM(B.ideType);
        if (B.installed)
            if (Z && Z.type === "connected" && B.installedVersion !== Z.serverInfo?.version) Q.push({
                label: `Installed ${D} extension version ${B.installedVersion} (server version: ${Z.serverInfo?.version})`,
                type: "info"
            });
            else if (mE(B.ideType) && Z?.type !== "connected") Q.push({
            label: `Installed ${D} plugin but connection is not established.
Please restart your IDE or try installing from https://docs.anthropic.com/s/claude-code-jetbrains`,
            type: "info"
        });
        else Q.push({
            label: `Installed ${D} extension`,
            type: "check"
        });
        if (B.error)
            if (mE(B.ideType)) Q.push({
                label: `Error installing ${D} plugin: ${B.error}
Please restart your IDE or try installing from https://docs.anthropic.com/s/claude-code-jetbrains`,
                type: "error"
            });
            else Q.push({
                label: `Error installing ${D} extension: ${B.error}
Please restart your IDE and try again.`,
                type: "error"
            })
    }
    return {
        title: "IDE Integration",
        command: "/config",
        items: Q
    }
}

function xN8(A = []) {
    let B = [];
    if (A.filter((Z) => Z.name !== "ide").forEach((Z) => {
            B.push({
                label: Z.name,
                type: Z.type === "failed" ? "error" : Z.type === "pending" ? "info" : "check"
            })
        }), B.length === 0) return null;
    return {
        title: "MCP servers",
        command: "/mcp",
        items: B
    }
}

function vN8(A) {
    let B = EF1(),
        Q = DW(),
        Z = RS();
    if (Q.length === 0 && B.length === 0 && !Z) return null;
    let D = [];
    if (B.forEach((G) => {
            let F = xV(G.path);
            D.push({
                label: `Large ${F} will impact performance (${SI(G.content.length)} chars > ${SI(zF1)})`,
                type: "error"
            })
        }), Z && Z.content.length > L01) D.push({
        label: `ULTRACLAUDE.md file exceeds ${SI(L01)} characters (${SI(Z.content.length)} chars)`,
        type: "error"
    });
    return {
        title: "Memory",
        command: "/memory",
        items: D,
        content: Bq.createElement(ph1, {
            context: A
        })
    }
}

function bN8() {
    let A = [],
        B = t0();
    return A.push({
        label: B,
        type: "info"
    }), {
        title: "Working Directory",
        command: "",
        items: A
    }
}
async function fN8() {
    let A = await EA1();
    if (A.length === 0) return null;
    return {
        title: "Installation",
        command: "",
        items: A.map((Q) => ({
            label: Q,
            type: "info"
        }))
    }
}
async function hN8() {
    let A = await o11(),
        B = [],
        {
            errors: Q
        } = qL();
    if (Q.length > 0) {
        let D = Array.from(new Set(Q.map((G) => G.file))).join(", ");
        B.push({
            label: `Found invalid settings files: ${D}. They will be ignored.`,
            type: "error"
        })
    }
    if (A.multipleInstallations.length > 1) B.push({
        label: `Multiple installations detected (${A.multipleInstallations.length} found)`,
        type: "error"
    });
    if (A.warnings.forEach((Z) => {
            B.push({
                label: Z.issue,
                type: "error"
            })
        }), A.hasUpdatePermissions === !1) B.push({
        label: "No write permissions for auto-updates (requires sudo)",
        type: "error"
    });
    if (A.configInstallMethod !== "not set") {
        let D = {
            "npm-local": "local",
            "npm-global": "global",
            native: "native",
            development: "development",
            unknown: "unknown"
        } [A.installationType];
        if (D && D !== A.configInstallMethod) B.push({
            label: `Config mismatch: running ${A.installationType} but config says ${A.configInstallMethod}`,
            type: "error"
        })
    }
    if (B.length === 0) return null;
    return {
        title: "System Diagnostics",
        command: "/doctor",
        items: B
    }
}

function gN8() {
    if (DZ() !== "firstParty") return null;
    let B = [],
        {
            source: Q
        } = Lu();
    if (KB()) B.push({
        label: `Login Method: ${LR1()} Account`,
        type: "info"
    });
    else B.push({
        label: `Auth Token: ${Q}`,
        type: "info"
    });
    let {
        key: Z,
        source: D
    } = DX(!1);
    if (Z) B.push({
        label: `API Key: ${D}`,
        type: "info"
    });
    if (Q === "claude.ai" || D === "/login managed key") {
        let F = H0().oauthAccount?.organizationName;
        if (F) B.push({
            label: `Organization: ${F}`,
            type: "info"
        })
    }
    if (Q !== "claude.ai") {
        if (Ed()) B.push({
            label: "Development Partner Program • sharing session with Anthropic",
            type: "info"
        })
    }
    let G = H0().oauthAccount?.emailAddress;
    if ((Q === "claude.ai" || D === "/login managed key") && G) B.push({
        label: `Email: ${G}`,
        type: "info"
    });
    return {
        title: "Account",
        command: Q === "claude.ai" || D === "/login managed key" ? "/login" : "",
        items: B
    }
}