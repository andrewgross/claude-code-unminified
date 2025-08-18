/* chunk:529 bytes:[12465594, 12485422) size:19828 source:unpacked-cli.js */
function xi4(A, B) {
    let Q = _i4(A, B);
    switch (A) {
        case "allowedTools":
            return {
                permissions: {
                    allow: Q
                }
            };
        case "ignorePatterns":
            return {
                permissions: {
                    deny: Q
                }
            }
    }
}

function vi4(A, B) {
    if (A !== "allowedTools" && A !== "ignorePatterns") return;
    console.warn(`Warning: "claude config add ${A}" has been migrated to settings.json and will be removed in a future version.

Instead, add rules to .claude/settings.json:
${JSON.stringify(xi4(A,B),null,2)}
See https://docs.anthropic.com/en/docs/claude-code/settings for more information on settings.json.
`)
}

function TR1(A, B, Q, Z = !0) {
    if (!_o(A, Q)) {
        if (Q) console.error(`Error: '${A}' is not a valid array config key in global config`);
        else console.error(`Error: '${A}' is not a valid array config key in project config`);
        if (Z) process.exit(1);
        else return
    }
    if (Q) {
        let D = H0(),
            G = A,
            F = D[G] || [],
            I = new Set(F),
            Y = I.size;
        for (let W of B) I.add(W);
        if (I.size > Y) {
            let W = Array.from(I).sort();
            gA({
                ...D,
                [G]: W
            })
        }
    } else {
        let D = A;
        vi4(D, B);
        let G = UQ(),
            F = G[D] || [],
            I = new Set(F),
            Y = I.size;
        for (let W of B) I.add(W);
        if (I.size > Y) {
            let W = Array.from(I).sort();
            r5({
                ...G,
                [D]: W
            })
        }
    }
    if (Z) process.exit(0)
}

function FN2(A, B, Q, Z = !0) {
    if (Q) {
        let D = H0();
        if (!(A in D) || !Array.isArray(D[A]))
            if (console.error(`Error: '${A}' is not a valid array config key in global config`), Z) process.exit(1);
            else return;
        let G = A,
            F = D[G];
        if (!F) F = [];
        let I = new Set(B),
            Y = F.filter((W) => !I.has(W));
        if (F.length !== Y.length) gA({
            ...D,
            [G]: Y.sort()
        })
    } else {
        let D = UQ(),
            G = CP[A];
        if (!(A in CP) || !Array.isArray(G))
            if (console.error(`Error: '${A}' is not a valid array config key in project config`), Z) process.exit(1);
            else return;
        let F = A,
            I = D[F];
        if (!I) I = [];
        let Y = new Set(B),
            W = I.filter((J) => !Y.has(J));
        if (I.length !== W.length) r5({
            ...D,
            [F]: W.sort()
        })
    }
    if (Z) process.exit(0)
}

function gA(A) {
    try {
        YN2(vY(), fV, (B) => ({
            ...A,
            projects: B.projects
        })), VP.config = null, VP.mtime = 0
    } catch (B) {
        SA(`Failed to save config with lock: ${B}`), IN2(vY(), {
            ...A,
            projects: x_(vY(), fV).projects
        }, fV), VP.config = null, VP.mtime = 0
    }
}
var VP = {
    config: null,
    mtime: 0
};

function mG0(A) {
    if (A.installMethod !== void 0) return A;
    let B = "unknown",
        Q = A.autoUpdates ?? !0;
    switch (A.autoUpdaterStatus) {
        case "migrated":
            B = "local";
            break;
        case "installed":
            B = "native";
            break;
        case "disabled":
            Q = !1;
            break;
        case "enabled":
        case "no_permissions":
        case "not_configured":
            B = "global";
            break;
        case void 0:
            break
    }
    return {
        ...A,
        installMethod: B,
        autoUpdates: Q
    }
}

function H0() {
    try {
        let A = j1().existsSync(vY()) ? j1().statSync(vY()) : null;
        if (VP.config && A) {
            if (A.mtimeMs <= VP.mtime) return VP.config
        }
        let B = mG0(x_(vY(), fV));
        if (A) VP = {
            config: B,
            mtime: A.mtimeMs
        };
        else VP = {
            config: B,
            mtime: Date.now()
        };
        return mG0(B)
    } catch {
        return mG0(x_(vY(), fV))
    }
}

function PR1(A) {
    let B = H0();
    if (B.customApiKeyResponses?.approved?.includes(A)) return "approved";
    if (B.customApiKeyResponses?.rejected?.includes(A)) return "rejected";
    return "new"
}

function IN2(A, B, Q) {
    let Z = ZN2(A),
        D = j1();
    if (!D.existsSync(Z)) D.mkdirSync(Z);
    let G = Object.fromEntries(Object.entries(B).filter(([F, I]) => JSON.stringify(I) !== JSON.stringify(Q[F])));
    wL(A, JSON.stringify(G, null, 2))
}

function YN2(A, B, Q) {
    let Z = ZN2(A),
        D = j1();
    if (!D.existsSync(Z)) D.mkdirSync(Z);
    let G;
    try {
        let F = `${A}.lock`,
            I = Date.now();
        if (G = DN2.lockSync(A, {
                lockfilePath: F
            }), Date.now() - I > 100) n1("Lock acquisition took longer than expected - another Claude instance may be running");
        let W = x_(A, B),
            J = Q(W),
            X = Object.fromEntries(Object.entries(J).filter(([V, C]) => JSON.stringify(C) !== JSON.stringify(B[V])));
        if (D.existsSync(A)) try {
            let V = `${A}.backup`;
            D.copyFileSync(A, V)
        } catch (V) {
            SA(`Failed to backup config: ${V}`)
        }
        wL(A, JSON.stringify(X, null, 2))
    } finally {
        if (G) G()
    }
}
var dG0 = !1;

function WN2() {
    if (dG0) return;
    dG0 = !0, x_(vY(), fV, !0)
}

function x_(A, B, Q) {
    if (!dG0) throw new Error("Config accessed before allowed.");
    let Z = j1();
    if (!Z.existsSync(A)) {
        let D = `${A}.backup`;
        if (Z.existsSync(D)) process.stdout.write(`
Claude configuration file not found at: ${A}
A backup file exists at: ${D}
You can manually restore it by running: cp "${D}" "${A}"

`);
        return $21(B)
    }
    try {
        let D = Z.readFileSync(A, {
            encoding: "utf-8"
        });
        try {
            let G = JSON.parse(D);
            return {
                ...$21(B),
                ...G
            }
        } catch (G) {
            let F = G instanceof Error ? G.message : String(G);
            throw new Rg(F, A, B)
        }
    } catch (D) {
        if (D instanceof Rg && Q) throw D;
        if (D instanceof Rg) {
            SA(`Config file corrupted, resetting to defaults: ${D.message}`), R1(D), process.stdout.write(`
Claude configuration file at ${A} is corrupted: ${D.message}
`);
            let G = `${A}.corrupted.${Date.now()}`;
            try {
                Z.copyFileSync(A, G), SA(`Corrupted config backed up to: ${G}`)
            } catch {}
            let F = `${A}.backup`;
            if (process.stdout.write(`
Claude configuration file at ${A} is corrupted
The corrupted file has been backed up to: ${G}
`), Z.existsSync(F)) process.stdout.write(`A backup file exists at: ${F}
You can manually restore it by running: cp "${F}" "${A}"

`);
            else process.stdout.write(`
`)
        }
        return $21(B)
    }
}
var jq1 = EA(() => {
    let A = _9();
    try {
        return Si4(ki4("git rev-parse --show-toplevel", {
            cwd: A,
            encoding: "utf8",
            stdio: ["pipe", "pipe", "ignore"]
        }).trim())
    } catch {
        return QN2(A)
    }
});

function UQ() {
    let A = jq1(),
        B = x_(vY(), fV);
    if (!B.projects) return CP;
    let Q = B.projects[A] ?? CP;
    if (typeof Q.allowedTools === "string") Q.allowedTools = T7(Q.allowedTools) ?? [];
    return Q
}

function r5(A) {
    let B = jq1();
    try {
        YN2(vY(), fV, (Q) => ({
            ...Q,
            projects: {
                ...Q.projects,
                [B]: A
            }
        }))
    } catch (Q) {
        SA(`Failed to save config with lock: ${Q}`);
        let Z = x_(vY(), fV);
        IN2(vY(), {
            ...Z,
            projects: {
                ...Z.projects,
                [B]: A
            }
        }, fV)
    }
}

function xo() {
    let A = H0();
    return !!(process.env.DISABLE_AUTOUPDATER || process.env.CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC || A.autoUpdates === !1)
}

function SR1() {
    if (IQ(process.env.DISABLE_COST_WARNINGS)) return !1;
    if (KB()) return !1;
    let B = H0(),
        Q = B.oauthAccount?.organizationRole,
        Z = B.oauthAccount?.workspaceRole;
    if (!Q || !Z) return !0;
    return ["admin", "billing"].includes(Q) || ["workspace_admin", "workspace_billing"].includes(Z)
}

function jo() {
    let A = H0();
    if (A.userID) return A.userID;
    let B = ji4(32).toString("hex");
    return gA({
        ...A,
        userID: B
    }), B
}

function JN2() {
    let A = H0();
    if (!A.firstStartTime) gA({
        ...A,
        firstStartTime: new Date().toISOString()
    })
}

function XN2(A, B) {
    if (B) {
        if (!cG0(A)) console.error(`Error: '${A}' is not a valid config key. Valid keys are: ${_51.join(", ")}`), process.exit(1);
        return H0()[A]
    } else {
        if (!lG0(A)) console.error(`Error: '${A}' is not a valid config key. Valid keys are: ${x51.join(", ")}`), process.exit(1);
        return UQ()[A]
    }
}

function VN2(A, B, Q) {
    if (Q) {
        if (!cG0(A)) console.error(`Error: Cannot set '${A}'. Only these keys can be modified: ${_51.join(", ")}`), process.exit(1);
        if (yi4(A, Q) && typeof B === "string") try {
            let D = JSON.parse(B);
            if (typeof D !== "object" || D === null || Array.isArray(D)) console.error("Error: 'env' must be a valid JSON object"), process.exit(1);
            let G = H0();
            gA({
                ...G,
                [A]: D
            }), process.exit(0)
        } catch (D) {
            console.error(`Error: Failed to parse JSON for 'env': ${D instanceof Error?D.message:String(D)}`), process.exit(1)
        }
        if (_o(A, Q) && typeof B === "string") {
            console.warn(e1.yellow(`Warning: '${A}' is an array type. Automatically using 'config add' instead of 'config set'.`));
            let D = B.split(",").map((G) => G.trim()).filter((G) => G.length > 0);
            TR1(A, D, Q);
            return
        }
        let Z = H0();
        gA({
            ...Z,
            [A]: B
        })
    } else {
        if (!lG0(A)) console.error(`Error: Cannot set '${A}'. Only these keys can be modified: ${x51.join(", ")}. Did you mean --global?`), process.exit(1);
        if (_o(A, Q) && typeof B === "string") {
            console.warn(e1.yellow(`Warning: '${A}' is an array type. Automatically using 'config add' instead of 'config set'.`));
            let D = B.split(",").map((G) => G.trim()).filter((G) => G.length > 0);
            TR1(A, D, Q);
            return
        }
        let Z = UQ();
        r5({
            ...Z,
            [A]: B
        })
    }
    process.exit(0)
}

function CN2(A, B) {
    if (B) {
        if (!cG0(A)) console.error(`Error: Cannot delete '${A}'. Only these keys can be modified: ${_51.join(", ")}`), process.exit(1);
        let Q = H0();
        delete Q[A], gA(Q)
    } else {
        if (!lG0(A)) console.error(`Error: Cannot delete '${A}'. Only these keys can be modified: ${x51.join(", ")}. Did you mean --global?`), process.exit(1);
        let Q = UQ();
        delete Q[A], r5(Q)
    }
}

function KN2(A) {
    if (A) return bW1(H0(), _51);
    else return bW1(UQ(), x51)
}

function HE(A) {
    let B = _9();
    if (A === "ExperimentalUltraClaudeMd") return HE("User");
    switch (A) {
        case "User":
            return y51(e9(), "CLAUDE.md");
        case "Local":
            return y51(B, "CLAUDE.local.md");
        case "Project":
            return y51(B, "CLAUDE.md");
        case "Managed":
            return y51(mg(), "CLAUDE.md");
        case "ExperimentalUltraClaudeMd":
            return y51(e9(), "ULTRACLAUDE.md")
    }
}

function HN2() {
    let A = GB() || {};
    Object.assign(process.env, H0().env), Object.assign(process.env, A.env)
}
var FJ = G1(z1(), 1);
import {
    Stream as fr4
} from "node:stream";
var oR2 = G1(z1(), 1);

function zN2(A, B, {
    signal: Q,
    edges: Z
} = {}) {
    let D = void 0,
        G = null,
        F = Z != null && Z.includes("leading"),
        I = Z == null || Z.includes("trailing"),
        Y = () => {
            if (G !== null) A.apply(D, G), D = void 0, G = null
        },
        W = () => {
            if (I) Y();
            C()
        },
        J = null,
        X = () => {
            if (J != null) clearTimeout(J);
            J = setTimeout(() => {
                J = null, W()
            }, B)
        },
        V = () => {
            if (J !== null) clearTimeout(J), J = null
        },
        C = () => {
            V(), D = void 0, G = null
        },
        K = () => {
            V(), Y()
        },
        H = function(...z) {
            if (Q?.aborted) return;
            D = this, G = z;
            let $ = J == null;
            if (X(), F && $) Y()
        };
    return H.schedule = X, H.cancel = C, H.flush = K, Q?.addEventListener("abort", C, {
        once: !0
    }), H
}

function EN2(A, B = 0, Q = {}) {
    if (typeof Q !== "object") Q = {};
    let {
        signal: Z,
        leading: D = !1,
        trailing: G = !0,
        maxWait: F
    } = Q, I = Array(2);
    if (D) I[0] = "leading";
    if (G) I[1] = "trailing";
    let Y = void 0,
        W = null,
        J = zN2(function(...C) {
            Y = A.apply(this, C), W = null
        }, B, {
            signal: Z,
            edges: I
        }),
        X = function(...C) {
            if (F != null) {
                if (W === null) W = Date.now();
                else if (Date.now() - W >= F) return Y = A.apply(this, C), W = Date.now(), J.cancel(), J.schedule(), Y
            }
            return J.apply(this, C), Y
        },
        V = () => {
            return J.flush(), Y
        };
    return X.cancel = J.cancel, X.flush = V, X
}

function jR1(A, B = 0, Q = {}) {
    if (typeof Q !== "object") Q = {};
    let {
        leading: Z = !0,
        trailing: D = !0,
        signal: G
    } = Q;
    return EN2(A, B, {
        leading: Z,
        trailing: D,
        signal: G,
        maxWait: B
    })
}
var v_ = {};
bj(v_, {
    scrollUp: () => An4,
    scrollDown: () => Bn4,
    link: () => In4,
    image: () => Yn4,
    iTerm: () => Wn4,
    exitAlternativeScreen: () => Gn4,
    eraseUp: () => ei4,
    eraseStartLine: () => oi4,
    eraseScreen: () => pG0,
    eraseLines: () => si4,
    eraseLine: () => qN2,
    eraseEndLine: () => ri4,
    eraseDown: () => ti4,
    enterAlternativeScreen: () => Dn4,
    cursorUp: () => wN2,
    cursorTo: () => hi4,
    cursorShow: () => nG0,
    cursorSavePosition: () => ci4,
    cursorRestorePosition: () => li4,
    cursorPrevLine: () => ni4,
    cursorNextLine: () => ii4,
    cursorMove: () => gi4,
    cursorLeft: () => $N2,
    cursorHide: () => ai4,
    cursorGetPosition: () => pi4,
    cursorForward: () => mi4,
    cursorDown: () => ui4,
    cursorBackward: () => di4,
    clearTerminal: () => Zn4,
    clearScreen: () => Qn4,
    beep: () => Fn4
});
import iG0 from "node:process";
var kR1 = globalThis.window?.document !== void 0,
    uT5 = globalThis.process?.versions?.node !== void 0,
    mT5 = globalThis.process?.versions?.bun !== void 0,
    dT5 = globalThis.Deno?.version?.deno !== void 0,
    cT5 = globalThis.process?.versions?.electron !== void 0,
    lT5 = globalThis.navigator?.userAgent?.includes("jsdom") === !0,
    pT5 = typeof WorkerGlobalScope !== "undefined" && globalThis instanceof WorkerGlobalScope,
    iT5 = typeof DedicatedWorkerGlobalScope !== "undefined" && globalThis instanceof DedicatedWorkerGlobalScope,
    nT5 = typeof SharedWorkerGlobalScope !== "undefined" && globalThis instanceof SharedWorkerGlobalScope,
    aT5 = typeof ServiceWorkerGlobalScope !== "undefined" && globalThis instanceof ServiceWorkerGlobalScope,
    v51 = globalThis.navigator?.userAgentData?.platform,
    sT5 = v51 === "macOS" || globalThis.navigator?.platform === "MacIntel" || globalThis.navigator?.userAgent?.includes(" Mac ") === !0 || globalThis.process?.platform === "darwin",
    rT5 = v51 === "Windows" || globalThis.navigator?.platform === "Win32" || globalThis.process?.platform === "win32",
    oT5 = v51 === "Linux" || globalThis.navigator?.platform?.startsWith("Linux") === !0 || globalThis.navigator?.userAgent?.includes(" Linux ") === !0 || globalThis.process?.platform === "linux",
    tT5 = v51 === "iOS" || globalThis.navigator?.platform === "MacIntel" && globalThis.navigator?.maxTouchPoints > 1 || /iPad|iPhone|iPod/.test(globalThis.navigator?.platform),
    eT5 = v51 === "Android" || globalThis.navigator?.platform === "Android" || globalThis.navigator?.userAgent?.includes(" Android ") === !0 || globalThis.process?.platform === "android";
var R5 = "\x1B[",
    f51 = "\x1B]",
    vo = "\x07",
    b51 = ";",
    UN2 = !kR1 && iG0.env.TERM_PROGRAM === "Apple_Terminal",
    bi4 = !kR1 && iG0.platform === "win32",
    fi4 = kR1 ? () => {
        throw new Error("`process.cwd()` only works in Node.js, not the browser.")
    } : iG0.cwd,
    hi4 = (A, B) => {
        if (typeof A !== "number") throw new TypeError("The `x` argument is required");
        if (typeof B !== "number") return R5 + (A + 1) + "G";
        return R5 + (B + 1) + b51 + (A + 1) + "H"
    },
    gi4 = (A, B) => {
        if (typeof A !== "number") throw new TypeError("The `x` argument is required");
        let Q = "";
        if (A < 0) Q += R5 + -A + "D";
        else if (A > 0) Q += R5 + A + "C";
        if (B < 0) Q += R5 + -B + "A";
        else if (B > 0) Q += R5 + B + "B";
        return Q
    },
    wN2 = (A = 1) => R5 + A + "A",
    ui4 = (A = 1) => R5 + A + "B",
    mi4 = (A = 1) => R5 + A + "C",
    di4 = (A = 1) => R5 + A + "D",
    $N2 = R5 + "G",
    ci4 = UN2 ? "\x1B7" : R5 + "s",
    li4 = UN2 ? "\x1B8" : R5 + "u",
    pi4 = R5 + "6n",
    ii4 = R5 + "E",
    ni4 = R5 + "F",
    ai4 = R5 + "?25l",
    nG0 = R5 + "?25h",
    si4 = (A) => {
        let B = "";
        for (let Q = 0; Q < A; Q++) B += qN2 + (Q < A - 1 ? wN2() : "");
        if (A) B += $N2;
        return B
    },
    ri4 = R5 + "K",
    oi4 = R5 + "1K",
    qN2 = R5 + "2K",
    ti4 = R5 + "J",
    ei4 = R5 + "1J",
    pG0 = R5 + "2J",
    An4 = R5 + "S",
    Bn4 = R5 + "T",
    Qn4 = "\x1Bc",
    Zn4 = bi4 ? `${pG0}${R5}0f` : `${pG0}${R5}3J${R5}H`,
    Dn4 = R5 + "?1049h",
    Gn4 = R5 + "?1049l",
    Fn4 = vo,
    In4 = (A, B) => [f51, "8", b51, b51, B, vo, A, f51, "8", b51, b51, vo].join(""),
    Yn4 = (A, B = {}) => {
        let Q = `${f51}1337;File=inline=1`;
        if (B.width) Q += `;width=${B.width}`;
        if (B.height) Q += `;height=${B.height}`;
        if (B.preserveAspectRatio === !1) Q += ";preserveAspectRatio=0";
        return Q + ":" + Buffer.from(A).toString("base64") + vo
    },
    Wn4 = {
        setCwd: (A = fi4()) => `${f51}50;CurrentDir=${A}${vo}`,
        annotation(A, B = {}) {
            let Q = `${f51}1337;`,
                Z = B.x !== void 0,
                D = B.y !== void 0;
            if ((Z || D) && !(Z && D && B.length !== void 0)) throw new Error("`x`, `y` and `length` must be defined when `x` or `y` is defined");
            if (A = A.replaceAll("|", ""), Q += B.isHidden ? "AddHiddenAnnotation=" : "AddAnnotation=", B.length > 0) Q += (Z ? [A, B.length, B.x, B.y] : [B.length, A]).join("|");
            else Q += A;
            return Q + vo
        }
    };
var Jn4 = (A) => {
    let B = new Set;
    do
        for (let Q of Reflect.ownKeys(A)) B.add([A, Q]); while ((A = Reflect.getPrototypeOf(A)) && A !== Object.prototype);
    return B
};