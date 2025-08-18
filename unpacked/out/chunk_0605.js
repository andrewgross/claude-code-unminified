/* chunk:605 bytes:[13910882, 13930933) size:20051 source:unpacked-cli.js */
class a01 {
    activeOperations = new Set;
    lastUserActivityTime = 0;
    lastCLIRecordedTime = Date.now();
    isCLIActive = !1;
    USER_ACTIVITY_TIMEOUT_MS = 5000;
    static instance = null;
    static getInstance() {
        if (!a01.instance) a01.instance = new a01;
        return a01.instance
    }
    recordUserActivity() {
        if (!this.isCLIActive && this.lastUserActivityTime !== 0) {
            let B = (Date.now() - this.lastUserActivityTime) / 1000;
            if (B > 0) {
                let Q = qm1();
                if (Q) {
                    let Z = this.USER_ACTIVITY_TIMEOUT_MS / 1000;
                    if (B < Z) Q.add(B, {
                        type: "user"
                    })
                }
            }
        }
        this.lastUserActivityTime = Date.now()
    }
    startCLIActivity(A) {
        if (this.activeOperations.has(A)) this.endCLIActivity(A);
        let B = this.activeOperations.size === 0;
        if (this.activeOperations.add(A), B) this.isCLIActive = !0, this.lastCLIRecordedTime = Date.now()
    }
    endCLIActivity(A) {
        if (this.activeOperations.delete(A), this.activeOperations.size === 0) {
            let B = Date.now(),
                Q = (B - this.lastCLIRecordedTime) / 1000;
            if (Q > 0) {
                let Z = qm1();
                if (Z) Z.add(Q, {
                    type: "cli"
                })
            }
            this.lastCLIRecordedTime = B, this.isCLIActive = !1
        }
    }
    async trackOperation(A, B) {
        this.startCLIActivity(A);
        try {
            return await B()
        } finally {
            this.endCLIActivity(A)
        }
    }
    getActivityStates() {
        return {
            isUserActive: (Date.now() - this.lastUserActivityTime) / 1000 < this.USER_ACTIVITY_TIMEOUT_MS / 1000,
            isCLIActive: this.isCLIActive,
            activeOperationCount: this.activeOperations.size
        }
    }
}
var ZI1 = a01.getInstance();

function yE8() {
    if (process.env.TERM === "xterm-ghostty") return ["·", "✢", "✳", "✶", "✻", "*"];
    return process.platform === "darwin" ? ["·", "✢", "✳", "✶", "✻", "✽"] : ["·", "✢", "*", "✶", "✻", "✽"]
}
var sbB = yE8(),
    Fh1 = [...sbB, ...[...sbB].reverse()],
    rbB = ["Accomplishing", "Actioning", "Actualizing", "Baking", "Booping", "Brewing", "Calculating", "Cerebrating", "Channelling", "Churning", "Clauding", "Coalescing", "Cogitating", "Computing", "Combobulating", "Concocting", "Conjuring", "Considering", "Contemplating", "Cooking", "Crafting", "Creating", "Crunching", "Deciphering", "Deliberating", "Determining", "Discombobulating", "Divining", "Doing", "Effecting", "Elucidating", "Enchanting", "Envisioning", "Finagling", "Flibbertigibbeting", "Forging", "Forming", "Frolicking", "Generating", "Germinating", "Hatching", "Herding", "Honking", "Ideating", "Imagining", "Incubating", "Inferring", "Manifesting", "Marinating", "Meandering", "Moseying", "Mulling", "Mustering", "Musing", "Noodling", "Percolating", "Perusing", "Philosophising", "Pontificating", "Pondering", "Processing", "Puttering", "Puzzling", "Reticulating", "Ruminating", "Scheming", "Schlepping", "Shimmying", "Simmering", "Smooshing", "Spelunking", "Spinning", "Stewing", "Sussing", "Synthesizing", "Thinking", "Tinkering", "Transmuting", "Unfurling", "Unravelling", "Vibing", "Wandering", "Whirring", "Wibbling", "Wizarding", "Working", "Wrangling"];

function obB({
    mode: A,
    spinnerVerbs: B,
    spinnerTip: Q,
    currentResponseLength: Z,
    overrideMessage: D,
    verbose: G
}) {
    let [F, I] = cF.useState(0), [Y, W] = cF.useState(0), [J, X] = cF.useState(0), [V, C] = cF.useState(-1), [K, H] = cF.useState(0), {
        isConnected: z
    } = yR0(), $ = cF.useMemo(() => qf(B), [B]), L = (D || $) + "…", N = cF.useRef(Date.now()), R = cF.useRef(Z), O = cF.useRef(Z), P = cF.useRef(Date.now());
    cF.useEffect(() => {
        let l = "spinner-" + A;
        return ZI1.startCLIActivity(l), () => {
            ZI1.endCLIActivity(l)
        }
    }, [A]), cF.useEffect(() => {
        R.current = Z;
        let l = Date.now(),
            y = (l - P.current) / 1000;
        if (y > 0.1) {
            let E1 = (Z - O.current) / 4 / y;
            H(Math.max(0, E1)), O.current = Z, P.current = l
        }
    }, [Z]), cK(() => {
        if (!z) {
            I(4);
            return
        }
        I((l) => l + 1)
    }, 120);
    let j = cF.useMemo(() => {
        if (A === "requesting") return 50;
        if (K > 100) return 30;
        if (K > 50) return 40;
        if (K > 20) return 50;
        if (K > 5) return 65;
        return 200
    }, [K, A]);
    cK(() => {
        if (z === !1) return;
        C((l) => {
            let y = L.length;
            if (l >= y + 10) return -1;
            return l + 1
        })
    }, j), cK(() => {
        X((l) => {
            let y = R.current - l;
            if (y <= 0) return l;
            let t;
            if (y < 70) t = 1;
            else if (y < 200) t = Math.max(2, Math.ceil(y * 0.08));
            else t = 18;
            return Math.min(l + t, R.current)
        })
    }, 10), cK(() => {
        W(Math.floor((Date.now() - N.current) / 1000))
    }, 10);
    let f = [...G ? [O2.createElement(T, {
        dimColor: !0,
        key: "elapsedTime"
    }, Y, "s"), O2.createElement(v, {
        flexDirection: "row",
        key: "tokens"
    }, O2.createElement(_E8, {
        mode: A,
        key: "spinnerMode"
    }), O2.createElement(T, {
        dimColor: !0
    }, SI(Math.round(J / 4)), " tokens"))] : [], O2.createElement(v, {
        key: "esc"
    }, O2.createElement(T, {
        dimColor: !0,
        bold: !0
    }, "esc", " "), O2.createElement(T, {
        dimColor: !0
    }, "to interrupt"))];
    if (z === !1) f.push(O2.createElement(v, {
        key: "offline"
    }, O2.createElement(T, {
        color: "error",
        bold: !0
    }, "offline")));
    let k = z === !1 ? "secondaryText" : "claude",
        c = O2.createElement(O2.Fragment, null, O2.createElement(T, {
            dimColor: !0
        }, "("), WC(f, (l) => O2.createElement(T, {
            dimColor: !0,
            key: `separator-${l}`
        }, " ", "·", " ")), O2.createElement(T, {
            dimColor: !0
        }, ")")),
        u = O2.createElement(v, {
            flexWrap: "wrap",
            height: 1,
            width: 2
        }, O2.createElement(T, {
            color: k,
            dimColor: V === -1
        }, Fh1[F % Fh1.length]));
    return O2.createElement(v, {
        flexDirection: "column",
        width: "100%",
        alignItems: "flex-start"
    }, O2.createElement(v, {
        flexDirection: "row",
        flexWrap: "wrap",
        marginTop: 1,
        width: "100%"
    }, u, (() => {
        if (!L) return null;
        if (z === !1) return O2.createElement(T, {
            color: k
        }, L, " ");
        return O2.createElement(O2.Fragment, null, L.split("").map((l, y) => {
            let t = y === V,
                E1 = Math.abs(y - V) === 1;
            return O2.createElement(T, {
                key: y,
                color: t || E1 ? "claudeShimmer" : k
            }, l)
        }), O2.createElement(T, {
            color: k
        }, " "))
    })(), c), Q && O2.createElement(v, {
        width: "100%"
    }, O2.createElement(OA, null, O2.createElement(T, {
        dimColor: !0
    }, "Tip: ", Q))))
}

function _E8({
    mode: A
}) {
    switch (A) {
        case "tool-input":
            return O2.createElement(xE8, null);
        case "tool-use":
            return O2.createElement(v, {
                flexWrap: "wrap",
                flexGrow: 0,
                height: 1,
                width: 2
            }, O2.createElement(T, {
                dimColor: !0
            }, "⚒"));
        case "responding":
            return O2.createElement(v, {
                width: 2
            }, O2.createElement(T, {
                dimColor: !0
            }, s0.arrowDown));
        case "thinking":
            return O2.createElement(v, {
                width: 2
            }, O2.createElement(T, {
                dimColor: !0
            }, s0.arrowDown));
        case "requesting":
            return O2.createElement(v, {
                width: 2
            }, O2.createElement(T, {
                dimColor: !0
            }, s0.arrowUp))
    }
}

function xE8() {
    let [A, B] = cF.useState(!0);
    return cK(() => {
        B((Q) => !Q)
    }, 500), O2.createElement(v, {
        flexWrap: "wrap",
        flexGrow: 0,
        height: 1,
        width: 2
    }, O2.createElement(T, {
        dimColor: !0
    }, A ? "⚒" : " "))
}

function g6() {
    let [A, B] = cF.useState(0), {
        isConnected: Q
    } = yR0();
    return cK(() => {
        B((D) => (D + 1) % Fh1.length)
    }, 120), O2.createElement(v, {
        flexWrap: "wrap",
        height: 1,
        width: 2
    }, O2.createElement(T, {
        color: Q === !1 ? "secondaryText" : "text"
    }, Fh1[A]))
}
var vE8 = {
    words: rbB
};

function tbB() {
    let A = fw1("tengu_spinner_words", vE8);
    return Array.isArray(A?.words) ? A.words : rbB
}
var bE8 = G1(q61(), 1);
var ebB = HK({
        command: JQ(),
        args: pw(JQ()).optional(),
        env: js(JQ(), JQ()).optional()
    }),
    fE8 = HK({
        name: JQ(),
        email: JQ().email().optional(),
        url: JQ().url().optional()
    }),
    hE8 = HK({
        type: JQ(),
        url: JQ().url()
    }),
    gE8 = ebB.partial(),
    uE8 = ebB.extend({
        platform_overrides: js(JQ(), gE8).optional()
    }),
    mE8 = HK({
        type: ks(["python", "node", "binary"]),
        entry_point: JQ(),
        mcp_config: uE8
    }),
    dE8 = HK({
        claude_desktop: JQ().optional(),
        platforms: pw(ks(["darwin", "win32", "linux"])).optional(),
        runtimes: HK({
            python: JQ().optional(),
            node: JQ().optional()
        }).optional()
    }).passthrough(),
    cE8 = HK({
        name: JQ(),
        description: JQ().optional()
    }),
    lE8 = HK({
        name: JQ(),
        description: JQ().optional(),
        arguments: pw(JQ()).optional(),
        text: JQ()
    }),
    pE8 = HK({
        type: ks(["string", "number", "boolean", "directory", "file"]),
        title: JQ(),
        description: JQ(),
        required: UL().optional(),
        default: Kq1([JQ(), kg(), UL(), pw(JQ())]).optional(),
        multiple: UL().optional(),
        sensitive: UL().optional(),
        min: kg().optional(),
        max: kg().optional()
    }),
    Tk3 = js(JQ(), Kq1([JQ(), kg(), UL(), pw(JQ())])),
    _R0 = HK({
        $schema: JQ().optional(),
        dxt_version: JQ(),
        name: JQ(),
        display_name: JQ().optional(),
        version: JQ(),
        description: JQ(),
        long_description: JQ().optional(),
        author: fE8,
        repository: hE8.optional(),
        homepage: JQ().url().optional(),
        documentation: JQ().url().optional(),
        support: JQ().url().optional(),
        icon: JQ().optional(),
        screenshots: pw(JQ()).optional(),
        server: mE8,
        tools: pw(cE8).optional(),
        tools_generated: UL().optional(),
        prompts: pw(lE8).optional(),
        prompts_generated: UL().optional(),
        keywords: pw(JQ()).optional(),
        license: JQ().optional(),
        compatibility: dE8.optional(),
        user_config: js(JQ(), pE8).optional()
    }),
    Pk3 = HK({
        status: ks(["signed", "unsigned", "self-signed"]),
        publisher: JQ().optional(),
        issuer: JQ().optional(),
        valid_from: JQ().optional(),
        valid_to: JQ().optional(),
        fingerprint: JQ().optional()
    });
import {
    execFile as yq8
} from "child_process";
var _q8 = G1(XgB(), 1);
import {
    promisify as xq8
} from "util";
var _y3 = xq8(yq8);
var uh1 = G1(z1(), 1);
var gq8 = G1(z1(), 1);
var VgB = G1(z1(), 1);
var hO0 = G1(z1(), 1);
import {
    dirname as uq8
} from "path";
import {
    execFileSync as mq8
} from "child_process";

function mh1(A) {
    if (!j1().existsSync(A)) return "";
    return j1().readFileSync(A, {
        encoding: "utf-8"
    })
}

function CgB(A) {
    try {
        mq8("git", ["rev-parse", "--is-inside-work-tree"], {
            cwd: A,
            stdio: "ignore"
        })
    } catch (B) {
        return !1
    }
    return !0
}
async function dh1(A) {
    let B = uq8(A);
    await ms("CLAUDE.local.md", B)
}
import {
    execSync as dq8
} from "child_process";
async function KgB() {
    if (process.env.VISUAL) return process.env.VISUAL;
    if (process.env.EDITOR) return process.env.EDITOR;
    if (process.platform === "darwin") return "open -t";
    else if (process.platform === "win32") return "notepad";
    else return "nano"
}
async function XA1(A) {
    let B = await KgB();
    dq8(`${B} "${A}"`, {
        stdio: "inherit"
    })
}
var Y5 = G1(z1(), 1);
var H7 = G1(z1(), 1),
    zgB = G1(z1(), 1);
var HgB = "Project";

function ch1({
    onSelect: A,
    onCancel: B,
    title: Q,
    renderDetails: Z
}) {
    let [D, G] = zgB.useState(HgB), F = CgB(_9()), I = [{
        label: "Project memory",
        value: "Project",
        description: `${F?"Checked in at":"Saved in"} ./CLAUDE.md`
    }, ...F ? [{
        label: "Project memory (local)",
        value: "Local",
        description: "Gitignored in ./CLAUDE.local.md"
    }] : [], {
        label: "User memory",
        value: "User",
        description: "Saved in ~/.claude/CLAUDE.md"
    }, ...[]];
    return U2(), DA((Y, W) => {
        if (W.escape) B()
    }), H7.createElement(v, {
        flexDirection: "column",
        borderStyle: "round",
        borderColor: "remember",
        padding: 1,
        width: "100%"
    }, H7.createElement(v, {
        marginBottom: 1,
        flexDirection: "row",
        justifyContent: "space-between"
    }, H7.createElement(T, {
        color: "remember",
        bold: !0
    }, Q || "Where should this memory be saved?")), H7.createElement(v, {
        flexDirection: "column",
        paddingX: 1
    }, H7.createElement(uA, {
        focusValue: D,
        options: I,
        onFocus: (Y) => G(Y),
        onChange: (Y) => {
            HgB = Y, A(Y)
        },
        onCancel: B
    })), H7.createElement(v, {
        marginTop: 1,
        flexDirection: "column"
    }, Z ? Z(D) : H7.createElement(cq8, {
        type: D
    })))
}

function cq8({
    type: A
}) {
    return H7.createElement(H7.Fragment, null, A === "Project" && H7.createElement(T, {
        dimColor: !0
    }, "Example project memory: “Run lint with the following command after major edits: npm run lint”"), A === "Local" && H7.createElement(T, {
        dimColor: !0
    }, "Example local memory: “Use my sandbox URL for testing: https://myapp.local”"), A === "User" && H7.createElement(T, {
        dimColor: !0
    }, "Example user memory: “Don't add new comments when editing code”"), A === "ExperimentalUltraClaudeMd" && !1)
}
var uO0 = G1(z1(), 1);
import {
    homedir as lq8
} from "os";
import {
    relative as pq8
} from "path";

function lh1(A) {
    let B = lq8(),
        Q = t0(),
        Z = A.startsWith(B) ? "~" + A.slice(B.length) : null,
        D = A.startsWith(Q) ? "./" + pq8(Q, A) : null;
    if (Z && D) return Z.length <= D.length ? Z : D;
    return Z || D || A
}

function EgB({
    memoryType: A,
    memoryPath: B
}) {
    let Q = lh1(B);
    return uO0.default.createElement(v, {
        flexDirection: "column",
        flexGrow: 1
    }, uO0.default.createElement(T, {
        color: "text"
    }, sb1(A), " updated in ", Q, " · /memory to edit"))
}
var Aq = G1(z1(), 1);

function ph1({
    context: A
} = {}) {
    let B = DW(),
        Q = [];
    if (A?.readFileState) hv(A.readFileState).forEach((G) => {
        let F = A.readFileState.get(G);
        if (F && G.endsWith("/CLAUDE.md") && !B.some((I) => I.path === G)) Q.push({
            path: G,
            content: F.content,
            type: "Project",
            isNested: !0
        })
    });
    let Z = [...B, ...Q];
    if (Z.length === 0) return null;
    let D = new Map;
    return Aq.createElement(v, {
        flexDirection: "column"
    }, Z.map((G, F) => {
        let I = xV(G.path),
            Y = G.isNested ? "nested: " : `${ab1(G.type)}: `,
            W = G.parent ? (D.get(G.parent) ?? 0) + 1 : 0;
        if (D.set(G.path, W), W === 0) return Aq.createElement(T, {
            key: F
        }, Aq.createElement(T, {
            color: "secondaryText"
        }, " L "), `${Y}${I}`);
        else {
            let J = "  ".repeat(W - 1);
            return Aq.createElement(T, {
                key: F
            }, " ".repeat(Y.length + 2), J, Aq.createElement(T, {
                color: "secondaryText"
            }, " L "), I)
        }
    }))
}
var iq8 = {
    type: "local-jsx",
    name: "memory",
    description: "Edit Claude memory files",
    isEnabled: () => !0,
    isHidden: !1,
    async call(A, B) {
        return Y5.createElement(v, {
            flexDirection: "column"
        }, Y5.createElement(v, {
            flexDirection: "column",
            marginTop: 1,
            marginBottom: 1
        }, Y5.createElement(T, {
            bold: !0
        }, "Memory Files"), Y5.createElement(ph1, {
            context: B
        }), Y5.createElement(v, {
            marginTop: 1
        }, Y5.createElement(T, {
            dimColor: !0
        }, "Learn more:", " ", Y5.createElement(C3, {
            url: "https://docs.anthropic.com/en/docs/claude-code/memory"
        })))), Y5.createElement(ch1, {
            title: "Select memory to edit:",
            onSelect: async (D) => {
                try {
                    let G = HE(D),
                        F = D === "User" ? e9() : t0();
                    if (!j1().existsSync(F)) j1().mkdirSync(F);
                    if (!j1().existsSync(G)) {
                        if (j1().writeFileSync(G, "", {
                                encoding: "utf8",
                                flush: !0
                            }), D === "Local") await dh1(G)
                    }
                    await XA1(G);
                    let I = "default",
                        Y = "";
                    if (process.env.VISUAL) I = "$VISUAL", Y = process.env.VISUAL;
                    else if (process.env.EDITOR) I = "$EDITOR", Y = process.env.EDITOR;
                    let W = I !== "default" ? `Using ${I}="${Y}".` : "",
                        J = W ? `> ${W} To change editor, set $EDITOR or $VISUAL environment variable.` : "> To use a different editor, set the $EDITOR or $VISUAL environment variable.";
                    A(`Opened ${sb1(D).toLowerCase()} at ${lh1(G)}

${J}`)
                } catch (G) {
                    R1(G instanceof Error ? G : new Error(String(G))), A(`Error opening memory file: ${G}`)
                }
            },
            onCancel: () => {
                A("Cancelled memory editing")
            },
            renderDetails: (D) => Y5.createElement(nq8, {
                memoryType: D
            })
        }))
    },
    userFacingName() {
        return this.name
    }
};

function nq8({
    memoryType: A
}) {
    let B = HE(A);
    if (!j1().existsSync(B)) {
        let I = {
            User: "~/.claude/CLAUDE.md",
            Project: "./CLAUDE.md",
            Local: "./CLAUDE.local.md + add to .gitignore"
        } [A];
        return Y5.createElement(Y5.Fragment, null, Y5.createElement(T, {
            dimColor: !0
        }, "Memory file does not exist yet. [Enter] to create ", I, "."))
    }
    let G = mh1(B).split(`
`).filter((F) => F.trim().startsWith("-") || F.trim().startsWith("*") || /^\s*\d+\./.test(F.trim())).length;
    return Y5.createElement(Y5.Fragment, null, Y5.createElement(T, {
        color: "remember"
    }, G, " ", G === 1 ? "memory" : "memories", " in", " ", lh1(B)))
}
var UgB = iq8;