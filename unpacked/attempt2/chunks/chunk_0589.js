/* chunk:589 bytes:[13620982, 13631052) size:10070 source:unpacked-cli.js */
async function ejB(A) {
    try {
        let B = j1(),
            Q = $01(A, ".gitignore");
        if (B.existsSync(Q)) return B.readFileSync(Q, {
            encoding: "utf8"
        }).split(`
`).map((D) => D.trim()).filter((D) => D.length > 0 && !D.startsWith("#"))
    } catch (B) {}
    return []
}
async function nW8(A) {
    try {
        let {
            stdout: B,
            code: Q
        } = await s5("git", ["rev-parse", "--show-toplevel"], {
            cwd: A
        });
        if (Q === 0) return B.trim()
    } catch (B) {}
    return A
}
var aW8 = [".git/", ".parcel-cache/", ".pytest_cache/", ".nuxt/", ".sass-cache/", ".claude/", "__pycache__/", "node_modules/", "pycache/", "*.3gp", "*.avif", "*.gif", "*.png", "*.psd", "*.aac", "*.aiff", "*.asf", "*.avi", "*.bmp", "*.divx", "*.flac", "*.heic", "*.ico", "*.jpg", "*.jpeg", "*.m4a", "*.m4v", "*.mkv", "*.mov", "*.mp3", "*.mp4", "*.mpeg", "*.mpg", "*.ogg", "*.opus", "*.raw", "*.rm", "*.rmvb", "*.tiff", "*.tif", "*.vob", "*.wav", "*.webm", "*.webp", "*.wma", "*.wmv", "*.DS_Store", "*.cache", "*.crdownload", "*.dmp", "*.dump", "*.eslintcache", "*.pyc", "*.pyo", "*.swo", "*.swp", "*.Thumbs.db", "*.zip", "*.tar", "*.gz", "*.rar", "*.7z", "*.iso", "*.bin", "*.exe", "*.dll", "*.so", "*.dylib", "*.dat", "*.dmg", "*.msi", "*.arrow", "*.accdb", "*.aof", "*.avro", "*.bson", "*.db", "*.dbf", "*.dmp", "*.frm", "*.ibd", "*.mdb", "*.myd", "*.myi", "*.orc", "*.parquet", "*.pdb", "*.rdb", "*.sqlite", "*.shp", "*.shx", "*.sbn", "*.sbx", "*.gdb", "*.gpkg", "*.kmz", "*.dem", "*.img", "*.ecw", "*.las", "*.laz", "*.mxd", "*.qgs", "*.grd", "*.dwg", "*.dxf"];

function GkB(A, B, Q) {
    let Z = pb1.useRef(!1);
    pb1.useEffect(() => {
        return
    }, [B, A, Q])
}
var w2 = G1(z1(), 1),
    XU = G1(z1(), 1);
var v7 = G1(z1(), 1);
var MS = G1(z1(), 1);
var CF1 = G1(z1(), 1);

function FkB() {
    return CF1.createElement(OA, {
        height: 1
    }, CF1.createElement(T, {
        color: "error"
    }, "Interrupted by user"))
}
var LS = G1(z1(), 1);
var RL0 = G1(z1(), 1);

function q01() {
    return RL0.createElement(T, {
        color: "error"
    }, "Interrupted by user")
}

function IkB({
    progressMessagesForMessage: A,
    tool: B,
    tools: Q,
    param: Z,
    verbose: D
}) {
    let [G] = fB();
    if (typeof Z.content === "string" && Z.content.startsWith(IU)) return LS.createElement(OA, {
        height: 1
    }, LS.createElement(q01, null));
    if (typeof Z.content === "string" && Z.content.startsWith(GF1)) {
        let F = Z.content.substring(GF1.length);
        return LS.createElement(fb1, {
            plan: F,
            themeName: G
        })
    }
    if (!B) return LS.createElement(f6, {
        result: Z.content,
        verbose: D
    });
    return B.renderToolUseErrorMessage(Z.content, {
        progressMessagesForMessage: Dt(A),
        tools: Q,
        verbose: D
    })
}
var KF1 = G1(z1(), 1);

function YkB({
    input: A,
    progressMessagesForMessage: B,
    style: Q,
    tool: Z,
    tools: D,
    messages: G,
    verbose: F
}) {
    let {
        columns: I
    } = r9(), [Y] = fB();
    if (!Z) return KF1.createElement(P5, null);
    let W = Z.inputSchema.safeParse(A);
    if (!W.success) return KF1.createElement(P5, null);
    return Z.renderToolUseRejectedMessage(W.data, {
        columns: I,
        messages: G,
        tools: D,
        verbose: F,
        progressMessagesForMessage: Dt(B),
        style: Q,
        theme: Y
    })
}
var HF1 = G1(z1(), 1);
var WkB = "\x1B[0m\x1B(B";

function JkB({
    message: A,
    progressMessagesForMessage: B,
    style: Q,
    tool: Z,
    tools: D,
    verbose: G,
    width: F
}) {
    let [I] = fB();
    if (!A.toolUseResult || !Z) return null;
    return HF1.createElement(v, {
        flexDirection: "row",
        width: F
    }, Z.renderToolResultMessage(A.toolUseResult, Dt(B), {
        style: Q,
        theme: I,
        tools: D,
        verbose: G
    }), HF1.createElement(T, null, WkB))
}
var sW8 = G1(z1(), 1);
var XkB = G1(z1(), 1);

function rW8(A, B) {
    let Q = null;
    for (let Z of B) {
        if (Z.type !== "assistant" || !Array.isArray(Z.message.content)) continue;
        for (let D of Z.message.content)
            if (D.type === "tool_use" && D.id === A) Q = D
    }
    return Q
}

function VkB(A, B, Q) {
    return XkB.useMemo(() => {
        let Z = rW8(A, Q);
        if (!Z) return null;
        let D = B.find((G) => G.name === Z.name);
        if (!D) return null;
        return {
            tool: D,
            toolUse: Z
        }
    }, [A, Q, B])
}

function CkB({
    param: A,
    message: B,
    messages: Q,
    progressMessagesForMessage: Z,
    style: D,
    tools: G,
    verbose: F,
    width: I
}) {
    let Y = VkB(A.tool_use_id, G, Q);
    if (!Y) return null;
    if (A.content === lv) return MS.createElement(FkB, null);
    if (A.content === DF1 || A.content === IU) return MS.createElement(YkB, {
        input: Y.toolUse.input,
        progressMessagesForMessage: Z,
        tool: Y.tool,
        tools: G,
        messages: Q,
        style: D,
        verbose: F
    });
    if (A.is_error) return MS.createElement(IkB, {
        progressMessagesForMessage: Z,
        tool: Y.tool,
        tools: G,
        param: A,
        verbose: F
    });
    return MS.createElement(JkB, {
        message: B,
        progressMessagesForMessage: Z,
        style: D,
        tool: Y.tool,
        tools: G,
        verbose: F,
        width: I
    })
}
var wJ = G1(z1(), 1);
var OL0 = G1(z1(), 1);
var ib1 = G1(z1(), 1);
import {
    EventEmitter as oW8
} from "events";

function tW8() {
    let A = new oW8;
    A.setMaxListeners(100);
    let B = null,
        Q = !0;
    return {
        subscribe(Z) {
            if (A.on("blink", Z), A.listenerCount("blink") === 1) B = setInterval(() => {
                Q = !Q, A.emit("blink")
            }, 600);
            return Q
        },
        unsubscribe(Z) {
            if (A.off("blink", Z), A.listenerCount("blink") === 0 && B) clearInterval(B), B = null
        },
        getCurrentState() {
            return Q
        }
    }
}
var KkB = EA(tW8);

function HkB(A) {
    let B = KkB(),
        [Q, Z] = ib1.useState(B.getCurrentState());
    return ib1.useEffect(() => {
        if (!A) return;
        let D = KkB(),
            G = () => Z(D.getCurrentState()),
            F = D.subscribe(G);
        return Z(F), () => {
            D.unsubscribe(G)
        }
    }, [A]), A ? Q : !0
}

function zkB({
    isError: A,
    isUnresolved: B,
    shouldAnimate: Q
}) {
    let Z = HkB(Q);
    return OL0.default.createElement(v, {
        minWidth: 2
    }, OL0.default.createElement(T, {
        color: B ? "secondaryText" : A ? "error" : "success"
    }, Z ? FU : "  "))
}

function EkB({
    param: A,
    addMargin: B,
    tools: Q,
    verbose: Z,
    erroredToolUseIDs: D,
    inProgressToolUseIDs: G,
    resolvedToolUseIDs: F,
    progressMessagesForMessage: I,
    shouldAnimate: Y,
    shouldShowDot: W
}) {
    let [J] = fB(), X = Q.find((N) => N.name === A.name);
    if (!X) return R1(new Error(`Tool ${A.name} not found`)), null;
    let V = F.has(A.id),
        C = !G.has(A.id) && !V,
        K = C ? "secondaryText" : void 0,
        H = X.inputSchema.safeParse(A.input),
        z = X.userFacingName(H.success ? H.data : void 0),
        $ = X.userFacingNameBackgroundColor?.(H.success ? H.data : void 0);
    if (z === "") return null;
    let L = H.success ? eW8(X, H.data, {
        theme: J,
        verbose: Z
    }) : null;
    if (L === null) return null;
    return wJ.default.createElement(v, {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: B ? 1 : 0,
        width: "100%"
    }, wJ.default.createElement(v, {
        flexDirection: "column"
    }, wJ.default.createElement(v, {
        flexDirection: "row",
        flexWrap: "nowrap",
        minWidth: z.length + (W ? 2 : 0)
    }, W && (C ? wJ.default.createElement(v, {
        minWidth: 2
    }, wJ.default.createElement(T, {
        color: K
    }, FU)) : wJ.default.createElement(zkB, {
        shouldAnimate: Y,
        isUnresolved: !V,
        isError: D.has(A.id)
    })), wJ.default.createElement(v, {
        flexShrink: 0
    }, wJ.default.createElement(T, {
        bold: !0,
        wrap: "truncate-end",
        backgroundColor: $,
        color: $ ? "inverseText" : void 0
    }, z)), L !== "" && wJ.default.createElement(v, {
        flexWrap: "nowrap"
    }, wJ.default.createElement(T, null, "(", L, ")"))), !V && !C && BJ8(X, Q, I, {
        verbose: Z
    }), !V && C && QJ8(X)))
}

function eW8(A, B, {
    theme: Q,
    verbose: Z
}) {
    try {
        let D = A.inputSchema.safeParse(B);
        if (!D.success) return "";
        return A.renderToolUseMessage(D.data, {
            theme: Q,
            verbose: Z
        })
    } catch (D) {
        return R1(new Error(`Error rendering tool use message for ${A.name}: ${D}`)), ""
    }
}

function AJ8(A) {
    if (A.length === 0) return null;
    let B = A[A.length - 1];
    if (!B) return null;
    return wJ.default.createElement(OA, null, wJ.default.createElement(T, {
        dimColor: !0
    }, "Running hook ", wJ.default.createElement(T, {
        bold: !0
    }, B.data.hookName), "..."))
}

function BJ8(A, B, Q, {
    verbose: Z
}) {
    let D = Q.filter((F) => F.data?.type !== "running_hook"),
        G = Q.filter((F) => F.data?.type === "running_hook");
    try {
        let F = A.renderToolUseProgressMessage(D, {
                tools: B,
                verbose: Z
            }),
            I = AJ8(G);
        return wJ.default.createElement(wJ.default.Fragment, null, I, F)
    } catch (F) {
        return R1(new Error(`Error rendering tool use progress message for ${A.name}: ${F}`)), null
    }
}

function QJ8(A) {
    try {
        return A.renderToolUseQueuedMessage?.()
    } catch (B) {
        return R1(new Error(`Error rendering tool use queued message for ${A.name}: ${B}`)), null
    }
}
var B3 = G1(z1(), 1);