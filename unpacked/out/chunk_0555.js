/* chunk:555 bytes:[12969754, 12989608) size:19854 source:unpacked-cli.js */
function Zb6(A) {
    if (!JGB(A)) return !1;
    if (!fF()) return !0;
    try {
        let B = process.ppid;
        for (let Q = 0; Q < 10; Q++) {
            if (B === A) return !0;
            if (B === 0 || B === 1) break;
            let Z = OR1(B),
                D = Z ? parseInt(Z) : null;
            if (!D || D === B) break;
            B = D
        }
        return !1
    } catch (B) {
        return !1
    }
}
var pe = {
    cursor: {
        ideKind: "vscode",
        displayName: "Cursor",
        processKeywordsMac: ["Cursor Helper", "Cursor.app"],
        processKeywordsWindows: ["cursor.exe"],
        processKeywordsLinux: ["cursor"]
    },
    windsurf: {
        ideKind: "vscode",
        displayName: "Windsurf",
        processKeywordsMac: ["Windsurf Helper", "Windsurf.app"],
        processKeywordsWindows: ["windsurf.exe"],
        processKeywordsLinux: ["windsurf"]
    },
    vscode: {
        ideKind: "vscode",
        displayName: "VS Code",
        processKeywordsMac: ["Visual Studio Code", "Code Helper"],
        processKeywordsWindows: ["code.exe"],
        processKeywordsLinux: ["code"]
    },
    intellij: {
        ideKind: "jetbrains",
        displayName: "IntelliJ IDEA",
        processKeywordsMac: ["IntelliJ IDEA"],
        processKeywordsWindows: ["idea64.exe"],
        processKeywordsLinux: ["idea", "intellij"]
    },
    pycharm: {
        ideKind: "jetbrains",
        displayName: "PyCharm",
        processKeywordsMac: ["PyCharm"],
        processKeywordsWindows: ["pycharm64.exe"],
        processKeywordsLinux: ["pycharm"]
    },
    webstorm: {
        ideKind: "jetbrains",
        displayName: "WebStorm",
        processKeywordsMac: ["WebStorm"],
        processKeywordsWindows: ["webstorm64.exe"],
        processKeywordsLinux: ["webstorm"]
    },
    phpstorm: {
        ideKind: "jetbrains",
        displayName: "PhpStorm",
        processKeywordsMac: ["PhpStorm"],
        processKeywordsWindows: ["phpstorm64.exe"],
        processKeywordsLinux: ["phpstorm"]
    },
    rubymine: {
        ideKind: "jetbrains",
        displayName: "RubyMine",
        processKeywordsMac: ["RubyMine"],
        processKeywordsWindows: ["rubymine64.exe"],
        processKeywordsLinux: ["rubymine"]
    },
    clion: {
        ideKind: "jetbrains",
        displayName: "CLion",
        processKeywordsMac: ["CLion"],
        processKeywordsWindows: ["clion64.exe"],
        processKeywordsLinux: ["clion"]
    },
    goland: {
        ideKind: "jetbrains",
        displayName: "GoLand",
        processKeywordsMac: ["GoLand"],
        processKeywordsWindows: ["goland64.exe"],
        processKeywordsLinux: ["goland"]
    },
    rider: {
        ideKind: "jetbrains",
        displayName: "Rider",
        processKeywordsMac: ["Rider"],
        processKeywordsWindows: ["rider64.exe"],
        processKeywordsLinux: ["rider"]
    },
    datagrip: {
        ideKind: "jetbrains",
        displayName: "DataGrip",
        processKeywordsMac: ["DataGrip"],
        processKeywordsWindows: ["datagrip64.exe"],
        processKeywordsLinux: ["datagrip"]
    },
    appcode: {
        ideKind: "jetbrains",
        displayName: "AppCode",
        processKeywordsMac: ["AppCode"],
        processKeywordsWindows: ["appcode.exe"],
        processKeywordsLinux: ["appcode"]
    },
    dataspell: {
        ideKind: "jetbrains",
        displayName: "DataSpell",
        processKeywordsMac: ["DataSpell"],
        processKeywordsWindows: ["dataspell64.exe"],
        processKeywordsLinux: ["dataspell"]
    },
    aqua: {
        ideKind: "jetbrains",
        displayName: "Aqua",
        processKeywordsMac: [],
        processKeywordsWindows: ["aqua64.exe"],
        processKeywordsLinux: []
    },
    gateway: {
        ideKind: "jetbrains",
        displayName: "Gateway",
        processKeywordsMac: [],
        processKeywordsWindows: ["gateway64.exe"],
        processKeywordsLinux: []
    },
    fleet: {
        ideKind: "jetbrains",
        displayName: "Fleet",
        processKeywordsMac: [],
        processKeywordsWindows: ["fleet.exe"],
        processKeywordsLinux: []
    },
    androidstudio: {
        ideKind: "jetbrains",
        displayName: "Android Studio",
        processKeywordsMac: ["Android Studio"],
        processKeywordsWindows: ["studio64.exe"],
        processKeywordsLinux: ["android-studio"]
    }
};

function wz0(A) {
    if (!A) return !1;
    let B = pe[A];
    return B && B.ideKind === "vscode"
}

function mE(A) {
    if (!A) return !1;
    let B = pe[A];
    return B && B.ideKind === "jetbrains"
}
var HD1 = EA(() => {
        return wz0(sA.terminal)
    }),
    $z0 = EA(() => {
        return mE(sA.terminal)
    }),
    fF = EA(() => {
        return HD1() || $z0() || Boolean(process.env.FORCE_CODE_TERMINAL)
    });

function qz0() {
    if (!fF()) return null;
    return sA.terminal
}

function Vy1() {
    try {
        return Db6().flatMap((Q) => {
            try {
                return j1().readdirSync(Q).filter((Z) => Z.name.endsWith(".lock")).map((Z) => {
                    let D = KD1(Q, Z.name);
                    return {
                        path: D,
                        mtime: j1().statSync(D).mtime
                    }
                })
            } catch (Z) {
                return R1(Z), []
            }
        }).sort((Q, Z) => Z.mtime.getTime() - Q.mtime.getTime()).map((Q) => Q.path)
    } catch (A) {
        return R1(A), []
    }
}

function XGB(A) {
    try {
        let B = j1().readFileSync(A, {
                encoding: "utf-8"
            }),
            Q = [],
            Z, D, G = !1,
            F = !1,
            I;
        try {
            let J = JSON.parse(B);
            if (J.workspaceFolders) Q = J.workspaceFolders;
            Z = J.pid, D = J.ideName, G = J.transport === "ws", F = J.runningInWindows === !0, I = J.authToken
        } catch (J) {
            Q = B.split(`
`).map((X) => X.trim())
        }
        let Y = A.split(Jy1).pop();
        if (!Y) return null;
        let W = Y.replace(".lock", "");
        return {
            workspaceFolders: Q,
            port: parseInt(W),
            pid: Z,
            ideName: D,
            useWebSocket: G,
            runningInWindows: F,
            authToken: I
        }
    } catch (B) {
        return R1(B), null
    }
}
async function Uz0(A, B, Q = 500) {
    try {
        return new Promise((Z) => {
            let D = Qb6({
                host: A,
                port: B,
                timeout: Q
            });
            D.on("connect", () => {
                D.destroy(), Z(!0)
            }), D.on("error", () => {
                Z(!1)
            }), D.on("timeout", () => {
                D.destroy(), Z(!1)
            })
        })
    } catch (Z) {
        return !1
    }
}

function Db6() {
    let A = [],
        B = j1(),
        Q = L9(),
        Z = KD1(e9(), "ide");
    if (B.existsSync(Z)) A.push(Z);
    if (Q !== "wsl") return A;
    let D = process.env.USERPROFILE;
    if (!D) try {
        let G = zZ("powershell.exe -Command '$env:USERPROFILE'");
        if (G) D = G.trim()
    } catch {
        n1("Unable to get Windows USERPROFILE via PowerShell - IDE detection may be incomplete")
    }
    if (D) {
        let F = new le(process.env.WSL_DISTRO_NAME).toLocalPath(D),
            I = ie(F, ".claude", "ide");
        if (B.existsSync(I)) A.push(I)
    }
    try {
        if (B.existsSync("/mnt/c/Users")) {
            let F = B.readdirSync("/mnt/c/Users");
            for (let I of F) {
                if (I.name === "Public" || I.name === "Default" || I.name === "Default User" || I.name === "All Users") continue;
                let Y = KD1("/mnt/c/Users", I.name, ".claude", "ide");
                if (B.existsSync(Y)) A.push(Y)
            }
        }
    } catch (G) {
        R1(G instanceof Error ? G : new Error(String(G)))
    }
    return A
}
async function Gb6() {
    try {
        let A = Vy1();
        for (let B of A) {
            let Q = XGB(B);
            if (!Q) {
                try {
                    j1().unlinkSync(B)
                } catch (G) {
                    R1(G)
                }
                continue
            }
            let Z = await $GB(Q.runningInWindows, Q.port),
                D = !1;
            if (Q.pid) {
                if (!JGB(Q.pid)) {
                    if (L9() !== "wsl") D = !0;
                    else if (!await Uz0(Z, Q.port)) D = !0
                }
            } else if (!await Uz0(Z, Q.port)) D = !0;
            if (D) try {
                j1().unlinkSync(B)
            } catch (G) {
                R1(G)
            }
        }
    } catch (A) {
        R1(A)
    }
}
var Fb6 = Bb6(import.meta.url),
    VGB = ie(Fb6, "../");
async function Ib6(A) {
    if (!vz()) return [() => {}, ie(VGB, "vendor", A)];
    let B = global.Bun,
        Q = `vendor_${A.replace(/\//g,"_")}`,
        Z = B?.embeddedFiles?.find((W) => W.name === Q);
    if (!Z) throw new Error(`Embedded vendor file not found: ${Q}`);
    let D = KD1(e9(), ".anthropic", "claude-code", "vendor-temp"),
        G = j1();
    if (!G.existsSync(D)) G.mkdirSync(D);
    let F = KD1(D, A),
        I = await Z.arrayBuffer();
    return G.writeFileSync(F, Buffer.from(I).toString("base64"), {
        encoding: "base64",
        flush: !1
    }), [() => {
        try {
            if (G.existsSync(F)) G.unlinkSync(F)
        } catch (W) {
            R1(W instanceof Error ? W : new Error(String(W)))
        }
    }, F]
}
async function Yb6(A) {
    try {
        let B = await Jb6(A);
        X1("tengu_ext_installed", {});
        let Q = H0();
        if (!Q.diffTool) gA({
            ...Q,
            diffTool: "auto"
        });
        return {
            installed: !0,
            error: null,
            installedVersion: B,
            ideType: A
        }
    } catch (B) {
        X1("tengu_ext_install_error", {});
        let Q = B instanceof Error ? B.message : String(B);
        return R1(B), {
            installed: !1,
            error: Q,
            installedVersion: null,
            ideType: A
        }
    }
}
var Wy1 = null;
async function YGB() {
    if (Wy1) Wy1.abort();
    Wy1 = h4();
    let A = Wy1.signal;
    await Gb6();
    let B = Date.now();
    while (Date.now() - B < 30000 && !A.aborted) {
        let Q = await zD1(!1);
        if (A.aborted) return null;
        if (Q.length === 1) return Q[0];
        await new Promise((Z) => setTimeout(Z, 1000))
    }
    return null
}
async function zD1(A) {
    let B = [];
    try {
        let Q = process.env.CLAUDE_CODE_SSE_PORT,
            Z = Q ? parseInt(Q) : null,
            D = _9(),
            G = Vy1();
        for (let F of G) {
            let I = XGB(F);
            if (!I) continue;
            if (L9() !== "wsl" && fF() && (!I.pid || !Zb6(I.pid))) continue;
            let Y = !1;
            if (process.env.CLAUDE_CODE_IDE_SKIP_VALID_CHECK === "true") Y = !0;
            else if (I.port === Z) Y = !0;
            else Y = I.workspaceFolders.some((V) => {
                if (!V) return !1;
                let C = V;
                if (L9() === "wsl" && I.runningInWindows && process.env.WSL_DISTRO_NAME) {
                    if (!IGB(V, process.env.WSL_DISTRO_NAME)) return !1;
                    let H = ie(C);
                    if (D === H || D.startsWith(H + Jy1)) return !0;
                    C = new le(process.env.WSL_DISTRO_NAME).toLocalPath(V)
                }
                let K = ie(C);
                if (L9() === "windows") {
                    let H = D.replace(/^[a-zA-Z]:/, ($) => $.toUpperCase()),
                        z = K.replace(/^[a-zA-Z]:/, ($) => $.toUpperCase());
                    return H === z || H.startsWith(z + Jy1)
                }
                return D === K || D.startsWith(K + Jy1)
            });
            if (!Y && !A) continue;
            let W = I.ideName ?? (fF() ? kM(sA.terminal) : "IDE"),
                J = await $GB(I.runningInWindows, I.port),
                X;
            if (I.useWebSocket) X = `ws://${J}:${I.port}`;
            else X = `http://${J}:${I.port}/sse`;
            B.push({
                url: X,
                name: W,
                workspaceFolders: I.workspaceFolders,
                port: I.port,
                isValid: Y,
                authToken: I.authToken,
                ideRunningInWindows: I.runningInWindows
            })
        }
        if (!A && Z) {
            let F = B.filter((I) => I.isValid && I.port === Z);
            if (F.length === 1) return F
        }
    } catch (Q) {
        R1(Q)
    }
    return B
}
async function CGB(A) {
    await A.notification({
        method: "ide_connected",
        params: {
            pid: process.pid
        }
    })
}

function Cy1(A) {
    return A.some((B) => B.type === "connected" && B.name === "ide")
}
var Wb6 = "anthropic.claude-code";
async function Nz0(A) {
    if (wz0(A)) {
        let B = KGB(A);
        if (B) try {
            if ((await s5(B, ["--list-extensions"], {
                    env: Xy1()
                })).stdout?.includes(Wb6)) return !0
        } catch {}
    } else if (mE(A)) return DGB(A);
    return !1
}
async function Jb6(A) {
    if (wz0(A)) {
        let B = KGB(A);
        if (B)
            if ((await yw("tengu-ext-vscode-install-from-marketplace", void 0))?.fromMarketplace) {
                let Z = await Xb6(B);
                if (!Z || WGB.lt(Z, Ez0())) {
                    await new Promise((G) => {
                        setTimeout(G, 500)
                    });
                    let D = await s5(B, ["--force", "--install-extension", "anthropic.claude-code"], {
                        env: Xy1()
                    });
                    if (D.code !== 0) throw new Error(`${D.code}: ${D.error} ${D.stderr}`);
                    Z = Ez0()
                }
                return Z
            } else {
                let [Z, D] = await Ib6("claude-code.vsix");
                try {
                    let G = await s5(B, ["--force", "--install-extension", D], {
                        env: Xy1()
                    });
                    if (G.code !== 0) throw new Error(`${G.code}: ${G.error} ${G.stderr}`);
                    return Ez0()
                } finally {
                    Z()
                }
            }
    } else if (mE(A) && L9() !== "wsl") return await ZGB(A, ie(VGB, "vendor", "claude-code-jetbrains-plugin"));
    return null
}

function Xy1() {
    if (L9() === "linux") return {
        ...process.env,
        DISPLAY: ""
    };
    return
}

function Ez0() {
    return {
        ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
        PACKAGE_URL: "@anthropic-ai/claude-code",
        README_URL: "https://docs.anthropic.com/s/claude-code",
        VERSION: "1.0.83"
    }.VERSION
}
async function Xb6(A) {
    let {
        stdout: B
    } = await F2(A, ["--list-extensions", "--show-versions"], {
        env: Xy1()
    }), Q = B?.split(`
`) || [];
    for (let Z of Q) {
        let [D, G] = Z.split("@");
        if (D === "anthropic.claude-code" && G) return G
    }
    return null
}

function Vb6() {
    try {
        if (L9() !== "macos") return null;
        let B = process.ppid;
        for (let Q = 0; Q < 10; Q++) {
            if (!B || B === 0 || B === 1) break;
            let Z = zZ(`ps -o command= -p ${B}`)?.trim();
            if (Z) {
                let G = {
                        "Visual Studio Code.app": "code",
                        "Cursor.app": "cursor",
                        "Windsurf.app": "windsurf",
                        "Visual Studio Code - Insiders.app": "code",
                        "VSCodium.app": "codium"
                    },
                    F = "/Contents/MacOS/Electron";
                for (let [I, Y] of Object.entries(G)) {
                    let W = Z.indexOf(I + "/Contents/MacOS/Electron");
                    if (W !== -1) {
                        let J = W + I.length;
                        return Z.substring(0, J) + "/Contents/Resources/app/bin/" + Y
                    }
                }
            }
            let D = zZ(`ps -o ppid= -p ${B}`)?.trim();
            if (!D) break;
            B = parseInt(D.trim())
        }
        return null
    } catch {
        return null
    }
}

function KGB(A) {
    let B = Vb6();
    if (B) {
        if (j1().existsSync(B)) return B
    }
    switch (A) {
        case "vscode":
            return "code";
        case "cursor":
            return "cursor";
        case "windsurf":
            return "windsurf";
        default:
            break
    }
    return null
}
var HGB = EA(() => {
        try {
            return zZ("cursor --version"), !0
        } catch {
            return !1
        }
    }),
    zGB = EA(() => {
        try {
            return zZ("windsurf --version"), !0
        } catch {
            return !1
        }
    }),
    EGB = EA(() => {
        try {
            let A = zZ("code --help");
            return Boolean(A && A.includes("Visual Studio Code"))
        } catch {
            return !1
        }
    });

function Ky1() {
    let A = [];
    try {
        let B = L9();
        if (B === "macos") {
            let Q = zZ('ps aux | grep -E "Visual Studio Code|Code Helper|Cursor Helper|Windsurf Helper|IntelliJ IDEA|PyCharm|WebStorm|PhpStorm|RubyMine|CLion|GoLand|Rider|DataGrip|AppCode|DataSpell|Aqua|Gateway|Fleet|Android Studio" | grep -v grep') ?? "";
            for (let [Z, D] of Object.entries(pe))
                for (let G of D.processKeywordsMac)
                    if (Q.includes(G)) {
                        A.push(Z);
                        break
                    }
        } else if (B === "windows") {
            let Z = (zZ('tasklist | findstr /I "Code.exe Cursor.exe Windsurf.exe idea64.exe pycharm64.exe webstorm64.exe phpstorm64.exe rubymine64.exe clion64.exe goland64.exe rider64.exe datagrip64.exe appcode.exe dataspell64.exe aqua64.exe gateway64.exe fleet.exe studio64.exe"') ?? "").toLowerCase();
            for (let [D, G] of Object.entries(pe))
                for (let F of G.processKeywordsWindows)
                    if (Z.includes(F.toLowerCase())) {
                        A.push(D);
                        break
                    }
        } else if (B === "linux") {
            let Z = (zZ('ps aux | grep -E "code|cursor|windsurf|idea|pycharm|webstorm|phpstorm|rubymine|clion|goland|rider|datagrip|dataspell|aqua|gateway|fleet|android-studio" | grep -v grep') ?? "").toLowerCase();
            for (let [D, G] of Object.entries(pe))
                for (let F of G.processKeywordsLinux)
                    if (Z.includes(F)) {
                        if (D !== "vscode") {
                            A.push(D);
                            break
                        } else if (!Z.includes("cursor") && !Z.includes("appcode")) {
                            A.push(D);
                            break
                        }
                    }
        }
    } catch (B) {
        R1(B)
    }
    return A
}

function Hy1(A) {
    let B = A.find((Q) => Q.type === "connected" && Q.name === "ide");
    return Lz0(B)
}

function Lz0(A) {
    let B = A?.config;
    return B?.type === "sse-ide" || B?.type === "ws-ide" ? B.ideName : fF() ? kM(sA.terminal) : null
}

function kM(A) {
    if (!A) return "IDE";
    let B = pe[A];
    if (B) return B.displayName;
    return E21(A)
}

function eV(A) {
    if (!A) return;
    let B = A.find((Q) => Q.type === "connected" && Q.name === "ide");
    return B?.type === "connected" ? B : void 0
}
async function UGB(A) {
    try {
        await tP("closeAllDiffTabs", {}, A, !1)
    } catch (B) {}
}