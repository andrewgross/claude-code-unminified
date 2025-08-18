/* chunk:633 bytes:[14413526, 14427157) size:13631 source:unpacked-cli.js */
var Sg1 = [],
    yT0 = null,
    _T0 = 0,
    ZR8 = 60000;

function DR8(A) {
    let B = new Set;
    return A.forEach((Q) => {
        let D = pI.dirname(Q);
        while (D !== "." && D !== pI.parse(D).root) B.add(D), D = pI.dirname(D)
    }), [...B].map((Q) => Q + pI.sep)
}
async function $dB() {
    let A = h4(),
        B = (await cy(["--files", "--follow", "--hidden"], ".", A.signal)).map((Z) => pI.relative(_9(), Z));
    return [...DR8(B), ...B]
}

function GR8(A, B) {
    let Q = Math.min(A.length, B.length),
        Z = 0;
    while (Z < Q && A[Z] === B[Z]) Z++;
    return A.substring(0, Z)
}

function qdB(A) {
    if (A.length === 0) return "";
    let B = A.map((Z) => Z.displayText),
        Q = B[0];
    for (let Z = 1; Z < B.length; Z++) {
        let D = B[Z];
        if (Q = GR8(Q, D), Q === "") return ""
    }
    return Q
}

function xT0(A) {
    return {
        id: `file-${A}`,
        displayText: A
    }
}
var jg1 = 15;

function FR8(A, B) {
    if (!B) {
        let F = new Set;
        for (let I of A) {
            let Y = I.split(pI.sep)[0];
            if (Y) {
                if (F.add(Y), F.size >= jg1) break
            }
        }
        return [...F].sort().map(xT0)
    }
    let Q = A.map((F) => {
            return {
                path: F,
                filename: pI.basename(F),
                testPenalty: F.includes("test") ? 1 : 0
            }
        }),
        Z = B.lastIndexOf(pI.sep);
    if (Z > 2) Q = Q.filter((F) => {
        return F.path.substring(0, Z).startsWith(B.substring(0, Z))
    });
    let G = new HU(Q, {
        includeScore: !0,
        threshold: 0.5,
        keys: [{
            name: "path",
            weight: 1
        }, {
            name: "filename",
            weight: 2
        }]
    }).search(B, {
        limit: jg1
    });
    return G = G.sort((F, I) => {
        if (F.score === void 0 || I.score === void 0) return 0;
        if (Math.abs(F.score - I.score) > 0.05) return F.score - I.score;
        return F.item.testPenalty - I.item.testPenalty
    }), G.map((F) => F.item.path).slice(0, jg1).map(xT0)
}

function wdB() {
    if (!yT0) yT0 = $dB().then((A) => {
        return Sg1 = A, _T0 = Date.now(), yT0 = null, A
    })
}
async function IR8() {
    let A = j1(),
        B = t0();
    try {
        return A.readdirSync(B).map((Z) => {
            let D = pI.join(B, Z.name),
                G = pI.relative(B, D);
            return Z.isDirectory() ? G + pI.sep : G
        })
    } catch (Q) {
        return R1(Q), []
    }
}
async function NdB(A, B = !1) {
    if (!A && !B) return [];
    if (A === "" || A === "." || A === "./") {
        let Q = await IR8();
        return wdB(), Q.slice(0, jg1).map(xT0)
    }
    try {
        let Q = Date.now(),
            Z = Q - _T0 > ZR8;
        if (Sg1.length === 0) Sg1 = await $dB(), _T0 = Q;
        else if (Z) wdB();
        let D = A,
            G = "." + pI.sep;
        if (A.startsWith(G)) D = A.substring(2);
        return FR8(Sg1, D)
    } catch (Q) {
        return R1(Q), []
    }
}

function kg1(A, B, Q, Z, D, G) {
    let F = typeof A === "string" ? A : A.displayText,
        I = B.substring(0, Z) + F + B.substring(Z + Q.length);
    D(I);
    let Y = Z + F.length;
    G(Y)
}
import * as RdB from "path";

function LdB(A) {
    switch (A.type) {
        case "file":
            return {
                id: `file-${A.path}`, displayText: A.displayText, description: A.description
            };
        case "mcp_resource":
            return {
                id: `mcp-resource-${A.server}__${A.uri}`, displayText: A.displayText, description: A.description
            };
        case "agent":
            return {
                id: `agent-${A.agentType}`, displayText: A.displayText, description: A.description, color: A.color
            }
    }
}
var vT0 = 15,
    MdB = 60;

function YR8(A) {
    if (A.length <= MdB) return A;
    return A.substring(0, MdB - 3) + "..."
}
async function WR8(A, B = !1) {
    if (!A && !B) return [];
    try {
        let Z = (await OS()).map((G) => ({
            type: "agent",
            displayText: `agent-${G.agentType}`,
            description: `Agent: ${YR8(G.whenToUse)}`,
            agentType: G.agentType,
            color: M01(G.agentType)
        }));
        if (!A) return Z;
        let D = A.toLowerCase();
        return Z.filter((G) => G.agentType.toLowerCase().includes(D) || G.displayText.toLowerCase().includes(D))
    } catch (Q) {
        return R1(Q), []
    }
}
async function bT0(A, B, Q = !1) {
    if (!A && !Q) return [];
    let [Z, D] = await Promise.all([NdB(A, Q), WR8(A, Q)]), G = Z.map((J) => ({
        type: "file",
        displayText: J.displayText,
        description: J.description,
        path: J.displayText,
        filename: RdB.basename(J.displayText)
    })), F = Object.values(B).flat().map((J) => ({
        type: "mcp_resource",
        displayText: `${J.server}:${J.uri}`,
        description: J.name + (J.description ? ` - ${J.description}` : ""),
        server: J.server,
        uri: J.uri,
        name: J.name || J.uri
    })), I = [...G, ...F, ...D];
    if (I.length === 0) return [];
    if (!A) return I.slice(0, vT0).map(LdB);
    return new HU(I, {
        includeScore: !0,
        threshold: 0.4,
        keys: [{
            name: "displayText",
            weight: 2
        }, {
            name: "name",
            weight: 3
        }, {
            name: "server",
            weight: 1
        }, {
            name: "description",
            weight: 1
        }, {
            name: "path",
            weight: 2
        }, {
            name: "filename",
            weight: 2
        }, {
            name: "agentType",
            weight: 3
        }]
    }).search(A, {
        limit: vT0
    }).map((J) => J.item).slice(0, vT0).map(LdB)
}

function bI1(A, B, Q = !1) {
    if (!A) return null;
    let Z = A.substring(0, B),
        D = Q ? /(@[a-zA-Z0-9_\-./\\]*|[a-zA-Z0-9_\-./\\]+)$/ : /[a-zA-Z0-9_\-./\\]+$/,
        G = Z.match(D);
    if (!G || G.index === void 0) return null;
    return {
        token: G[0],
        startPos: G.index
    }
}

function JR8(A) {
    if (PA1(A)) {
        let B = A.indexOf(" ");
        if (B === -1) return {
            commandName: A.slice(1),
            args: ""
        };
        return {
            commandName: A.slice(1, B),
            args: A.slice(B + 1)
        }
    }
    return null
}

function XR8(A, B) {
    return !A && B.includes(" ") && !B.endsWith(" ")
}

function OdB({
    commands: A,
    onInputChange: B,
    onSubmit: Q,
    setCursorOffset: Z,
    input: D,
    cursorOffset: G,
    mode: F,
    setSuggestionsState: I,
    suggestionsState: {
        suggestions: Y,
        selectedSuggestion: W,
        commandArgumentHint: J
    }
}) {
    let [X, V] = Dq.useState("none"), [C, K] = Dq.useState(void 0), [H] = tQ(), z = Dq.useCallback(() => {
        I(() => ({
            commandArgumentHint: void 0,
            suggestions: [],
            selectedSuggestion: -1
        })), V("none"), K(void 0)
    }, [I]), $ = Dq.useCallback(async (P, j = !1) => {
        let f = await bT0(P, H.mcp.resources, j);
        if (f.length === 0) {
            z();
            return
        }
        I(() => ({
            commandArgumentHint: void 0,
            suggestions: f,
            selectedSuggestion: f.length > 0 ? 0 : -1
        })), V(f.length > 0 ? "file" : "none"), K(void 0)
    }, [H.mcp.resources, z, I]), L = Re($, 200), N = Dq.useCallback(async (P, j = G) => {
        let f = P.substring(0, j).match(/(^|\s)@[a-zA-Z0-9_\-./\\]*$/),
            k = j === P.length && j > 0 && P.length > 0 && P[j - 1] === " ";
        if (F === "prompt" && PA1(P) && j > 0) {
            let c = JR8(P);
            if (c && c.commandName === "add-dir" && c.args) {
                let {
                    args: u
                } = c;
                if (u.match(/\s+$/)) {
                    z();
                    return
                }
                let a = await UdB(u);
                if (a.length > 0) {
                    I(() => ({
                        suggestions: a,
                        selectedSuggestion: 0,
                        commandArgumentHint: void 0
                    })), V("directory");
                    return
                }
                z();
                return
            }
        }
        if (F === "prompt" && PA1(P) && j > 0 && !XR8(k, P)) {
            let c = KdB(P, A),
                u = void 0;
            if (P.length > 1) {
                let a = P.endsWith(" ") ? P.slice(1, -1) : P.slice(1),
                    l = A.find((y) => y.userFacingName() === a && y.argumentHint);
                if (l?.argumentHint) u = l.argumentHint
            }
            if (I(() => ({
                    commandArgumentHint: u,
                    suggestions: c,
                    selectedSuggestion: c.length > 0 ? 0 : -1
                })), V(c.length > 0 ? "command" : "none"), c.length > 0) {
                let a = Math.max(...c.map((l) => l.displayText.length));
                K(a + 5)
            }
            return
        }
        if (X === "command") z();
        if (f) {
            let c = bI1(P, j, !0);
            if (c && c.token.startsWith("@")) {
                let u = c.token.substring(1);
                L(u, !0);
                return
            }
        }
        if (X === "file") {
            let c = bI1(P, j, !0);
            if (c) {
                let u = c.token.startsWith("@") ? c.token.substring(1) : c.token;
                L(u, !1)
            } else z()
        }
    }, [G, X, A, I, z, L, F]);
    Dq.useEffect(() => {
        N(D)
    }, [D, N]);
    let R = Dq.useCallback(async () => {
            if (Y.length > 0) {
                let P = W === -1 ? 0 : W;
                if (X === "command" && P < Y.length) {
                    let j = Y[P];
                    if (j) kT0(j, !1, A, B, Z, Q), z()
                } else if (X === "directory" && Y.length > 0) {
                    let j = Y[P];
                    if (j) {
                        let f = D.indexOf(" "),
                            c = D.slice(0, f + 1) + j.id + "/";
                        B(c), Z(c.length), I((u) => ({
                            ...u,
                            commandArgumentHint: void 0
                        })), N(c, c.length)
                    }
                } else if (X === "file" && Y.length > 0) {
                    let j = bI1(D, G, !0);
                    if (!j) {
                        z();
                        return
                    }
                    let f = qdB(Y),
                        k = j.token.startsWith("@"),
                        c = k ? j.token.length - 1 : j.token.length;
                    if (f.length > c) {
                        let u = k ? F === "bash" ? f : `@${f}` : f;
                        kg1(u, D, j.token, j.startPos, B, Z), N(D.replace(j.token, u), G)
                    } else if (P < Y.length) {
                        let u = Y[P];
                        if (u) {
                            let a = k ? F === "bash" ? `${u.displayText} ` : `@${u.displayText} ` : u.displayText;
                            kg1(a, D, j.token, j.startPos, B, Z), z()
                        }
                    }
                }
            } else if (D.trim() !== "") {
                let P = bI1(D, G, !0);
                if (P) {
                    let j = P.token.startsWith("@"),
                        f = j ? P.token.substring(1) : P.token,
                        k = await bT0(f, H.mcp.resources, j);
                    if (k.length > 0) I(() => ({
                        commandArgumentHint: void 0,
                        suggestions: k,
                        selectedSuggestion: 0
                    })), V("file"), K(void 0)
                }
            }
        }, [Y, W, D, X, A, F, B, Z, Q, z, G, N, H.mcp.resources, I]),
        O = Dq.useCallback(() => {
            if (W < 0 || Y.length === 0) return;
            if (X === "command" && W < Y.length) {
                let P = Y[W];
                if (P) kT0(P, !0, A, B, Z, Q), z()
            } else if (X === "file" && W < Y.length) {
                let P = bI1(D, G, !0);
                if (P) {
                    let j = Y[W];
                    if (j) {
                        let k = P.token.startsWith("@") ? F === "bash" ? `${j.displayText} ` : `@${j.displayText} ` : j.displayText;
                        kg1(k, D, P.token, P.startPos, B, Z), z()
                    }
                }
            }
        }, [Y, W, X, A, D, G, F, B, Z, Q, z]);
    return DA((P, j) => {
        if (j.tab && !j.shift) {
            R();
            return
        }
        if (Y.length === 0) return;
        if (j.downArrow || j.ctrl && P === "n") {
            I((f) => ({
                ...f,
                selectedSuggestion: f.selectedSuggestion >= Y.length - 1 ? 0 : f.selectedSuggestion + 1
            }));
            return
        }
        if (j.upArrow || j.ctrl && P === "p") {
            I((f) => ({
                ...f,
                selectedSuggestion: f.selectedSuggestion <= 0 ? Y.length - 1 : f.selectedSuggestion - 1
            }));
            return
        }
        if (j.return) O();
        if (j.escape) z()
    }), {
        suggestions: Y,
        selectedSuggestion: W,
        suggestionType: X,
        maxColumnWidth: C,
        commandArgumentHint: J
    }
}
var yg1 = G1(z1(), 1);
var Lb = G1(z1(), 1);
var VR8 = 1e4;