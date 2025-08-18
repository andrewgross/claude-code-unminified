/* chunk:600 bytes:[13815213, 13834762) size:19549 source:unpacked-cli.js */
function FbB(A, B, Q, Z) {
    let [D, G] = zR0.useState(0), [F, I] = zR0.useState(void 0), Y = (K) => {
        if (K.startsWith("!")) return "bash";
        if (K.startsWith("#")) return "memory";
        return "prompt"
    }, W = (K, H, z, $ = !1) => {
        A(K, H, z), Z?.($ ? 0 : K.length)
    }, J = (K, H = !1) => {
        if (!K) return;
        let z = Y(K.display),
            $ = z === "bash" || z === "memory" ? K.display.slice(1) : K.display;
        W($, z, K.pastedContents, H)
    };

    function X() {
        let K = lj1();
        if (D >= K.length) return;
        if (D === 0) {
            let H = B.trim() !== "";
            I(H ? {
                display: B,
                pastedContents: Q
            } : void 0)
        }
        G(D + 1), J(K[D], !0)
    }

    function V() {
        if (D > 1) G(D - 1), J(lj1()[D - 2]);
        else if (D === 1)
            if (G(0), F) J(F);
            else W("", "prompt", {});
        return D <= 0
    }

    function C() {
        I(void 0), G(0)
    }
    return {
        historyIndex: D,
        setHistoryIndex: G,
        onHistoryUp: X,
        onHistoryDown: V,
        resetHistory: C
    }
}
var Dq = G1(z1(), 1);

function xS(A) {
    return !Array.isArray ? KbB(A) === "[object Array]" : Array.isArray(A)
}
var Nz8 = 1 / 0;

function Lz8(A) {
    if (typeof A == "string") return A;
    let B = A + "";
    return B == "0" && 1 / A == -Nz8 ? "-0" : B
}

function Mz8(A) {
    return A == null ? "" : Lz8(A)
}

function FR(A) {
    return typeof A === "string"
}

function VbB(A) {
    return typeof A === "number"
}

function Rz8(A) {
    return A === !0 || A === !1 || Oz8(A) && KbB(A) == "[object Boolean]"
}

function CbB(A) {
    return typeof A === "object"
}

function Oz8(A) {
    return CbB(A) && A !== null
}

function FH(A) {
    return A !== void 0 && A !== null
}

function ER0(A) {
    return !A.trim().length
}

function KbB(A) {
    return A == null ? A === void 0 ? "[object Undefined]" : "[object Null]" : Object.prototype.toString.call(A)
}
var Tz8 = "Incorrect 'index' type",
    Pz8 = (A) => `Invalid value for key ${A}`,
    Sz8 = (A) => `Pattern length exceeds max of ${A}.`,
    jz8 = (A) => `Missing ${A} property in key`,
    kz8 = (A) => `Property 'weight' in key '${A}' must be a positive integer`,
    IbB = Object.prototype.hasOwnProperty;
class HbB {
    constructor(A) {
        this._keys = [], this._keyMap = {};
        let B = 0;
        A.forEach((Q) => {
            let Z = zbB(Q);
            this._keys.push(Z), this._keyMap[Z.id] = Z, B += Z.weight
        }), this._keys.forEach((Q) => {
            Q.weight /= B
        })
    }
    get(A) {
        return this._keyMap[A]
    }
    keys() {
        return this._keys
    }
    toJSON() {
        return JSON.stringify(this._keys)
    }
}

function zbB(A) {
    let B = null,
        Q = null,
        Z = null,
        D = 1,
        G = null;
    if (FR(A) || xS(A)) Z = A, B = YbB(A), Q = UR0(A);
    else {
        if (!IbB.call(A, "name")) throw new Error(jz8("name"));
        let F = A.name;
        if (Z = F, IbB.call(A, "weight")) {
            if (D = A.weight, D <= 0) throw new Error(kz8(F))
        }
        B = YbB(F), Q = UR0(F), G = A.getFn
    }
    return {
        path: B,
        id: Q,
        weight: D,
        src: Z,
        getFn: G
    }
}

function YbB(A) {
    return xS(A) ? A : A.split(".")
}

function UR0(A) {
    return xS(A) ? A.join(".") : A
}

function yz8(A, B) {
    let Q = [],
        Z = !1,
        D = (G, F, I) => {
            if (!FH(G)) return;
            if (!F[I]) Q.push(G);
            else {
                let Y = F[I],
                    W = G[Y];
                if (!FH(W)) return;
                if (I === F.length - 1 && (FR(W) || VbB(W) || Rz8(W))) Q.push(Mz8(W));
                else if (xS(W)) {
                    Z = !0;
                    for (let J = 0, X = W.length; J < X; J += 1) D(W[J], F, I + 1)
                } else if (F.length) D(W, F, I + 1)
            }
        };
    return D(A, FR(B) ? B.split(".") : B, 0), Z ? Q : Q[0]
}
var _z8 = {
        includeMatches: !1,
        findAllMatches: !1,
        minMatchCharLength: 1
    },
    xz8 = {
        isCaseSensitive: !1,
        includeScore: !1,
        keys: [],
        shouldSort: !0,
        sortFn: (A, B) => A.score === B.score ? A.idx < B.idx ? -1 : 1 : A.score < B.score ? -1 : 1
    },
    vz8 = {
        location: 0,
        threshold: 0.6,
        distance: 100
    },
    bz8 = {
        useExtendedSearch: !1,
        getFn: yz8,
        ignoreLocation: !1,
        ignoreFieldNorm: !1,
        fieldNormWeight: 1
    },
    pQ = {
        ...xz8,
        ..._z8,
        ...vz8,
        ...bz8
    },
    fz8 = /[^ ]+/g;

function hz8(A = 1, B = 3) {
    let Q = new Map,
        Z = Math.pow(10, B);
    return {
        get(D) {
            let G = D.match(fz8).length;
            if (Q.has(G)) return Q.get(G);
            let F = 1 / Math.pow(G, 0.5 * A),
                I = parseFloat(Math.round(F * Z) / Z);
            return Q.set(G, I), I
        },
        clear() {
            Q.clear()
        }
    }
}
class nf1 {
    constructor({
        getFn: A = pQ.getFn,
        fieldNormWeight: B = pQ.fieldNormWeight
    } = {}) {
        this.norm = hz8(B, 3), this.getFn = A, this.isCreated = !1, this.setIndexRecords()
    }
    setSources(A = []) {
        this.docs = A
    }
    setIndexRecords(A = []) {
        this.records = A
    }
    setKeys(A = []) {
        this.keys = A, this._keysMap = {}, A.forEach((B, Q) => {
            this._keysMap[B.id] = Q
        })
    }
    create() {
        if (this.isCreated || !this.docs.length) return;
        if (this.isCreated = !0, FR(this.docs[0])) this.docs.forEach((A, B) => {
            this._addString(A, B)
        });
        else this.docs.forEach((A, B) => {
            this._addObject(A, B)
        });
        this.norm.clear()
    }
    add(A) {
        let B = this.size();
        if (FR(A)) this._addString(A, B);
        else this._addObject(A, B)
    }
    removeAt(A) {
        this.records.splice(A, 1);
        for (let B = A, Q = this.size(); B < Q; B += 1) this.records[B].i -= 1
    }
    getValueForItemAtKeyId(A, B) {
        return A[this._keysMap[B]]
    }
    size() {
        return this.records.length
    }
    _addString(A, B) {
        if (!FH(A) || ER0(A)) return;
        let Q = {
            v: A,
            i: B,
            n: this.norm.get(A)
        };
        this.records.push(Q)
    }
    _addObject(A, B) {
        let Q = {
            i: B,
            $: {}
        };
        this.keys.forEach((Z, D) => {
            let G = Z.getFn ? Z.getFn(A) : this.getFn(A, Z.path);
            if (!FH(G)) return;
            if (xS(G)) {
                let F = [],
                    I = [{
                        nestedArrIndex: -1,
                        value: G
                    }];
                while (I.length) {
                    let {
                        nestedArrIndex: Y,
                        value: W
                    } = I.pop();
                    if (!FH(W)) continue;
                    if (FR(W) && !ER0(W)) {
                        let J = {
                            v: W,
                            i: Y,
                            n: this.norm.get(W)
                        };
                        F.push(J)
                    } else if (xS(W)) W.forEach((J, X) => {
                        I.push({
                            nestedArrIndex: X,
                            value: J
                        })
                    })
                }
                Q.$[D] = F
            } else if (FR(G) && !ER0(G)) {
                let F = {
                    v: G,
                    n: this.norm.get(G)
                };
                Q.$[D] = F
            }
        }), this.records.push(Q)
    }
    toJSON() {
        return {
            keys: this.keys,
            records: this.records
        }
    }
}

function EbB(A, B, {
    getFn: Q = pQ.getFn,
    fieldNormWeight: Z = pQ.fieldNormWeight
} = {}) {
    let D = new nf1({
        getFn: Q,
        fieldNormWeight: Z
    });
    return D.setKeys(A.map(zbB)), D.setSources(B), D.create(), D
}

function gz8(A, {
    getFn: B = pQ.getFn,
    fieldNormWeight: Q = pQ.fieldNormWeight
} = {}) {
    let {
        keys: Z,
        records: D
    } = A, G = new nf1({
        getFn: B,
        fieldNormWeight: Q
    });
    return G.setKeys(Z), G.setIndexRecords(D), G
}

function pf1(A, {
    errors: B = 0,
    currentLocation: Q = 0,
    expectedLocation: Z = 0,
    distance: D = pQ.distance,
    ignoreLocation: G = pQ.ignoreLocation
} = {}) {
    let F = B / A.length;
    if (G) return F;
    let I = Math.abs(Z - Q);
    if (!D) return I ? 1 : F;
    return F + I / D
}

function uz8(A = [], B = pQ.minMatchCharLength) {
    let Q = [],
        Z = -1,
        D = -1,
        G = 0;
    for (let F = A.length; G < F; G += 1) {
        let I = A[G];
        if (I && Z === -1) Z = G;
        else if (!I && Z !== -1) {
            if (D = G - 1, D - Z + 1 >= B) Q.push([Z, D]);
            Z = -1
        }
    }
    if (A[G - 1] && G - Z >= B) Q.push([Z, G - 1]);
    return Q
}
var bd = 32;

function mz8(A, B, Q, {
    location: Z = pQ.location,
    distance: D = pQ.distance,
    threshold: G = pQ.threshold,
    findAllMatches: F = pQ.findAllMatches,
    minMatchCharLength: I = pQ.minMatchCharLength,
    includeMatches: Y = pQ.includeMatches,
    ignoreLocation: W = pQ.ignoreLocation
} = {}) {
    if (B.length > bd) throw new Error(Sz8(bd));
    let J = B.length,
        X = A.length,
        V = Math.max(0, Math.min(Z, X)),
        C = G,
        K = V,
        H = I > 1 || Y,
        z = H ? Array(X) : [],
        $;
    while (($ = A.indexOf(B, K)) > -1) {
        let j = pf1(B, {
            currentLocation: $,
            expectedLocation: V,
            distance: D,
            ignoreLocation: W
        });
        if (C = Math.min(j, C), K = $ + J, H) {
            let f = 0;
            while (f < J) z[$ + f] = 1, f += 1
        }
    }
    K = -1;
    let L = [],
        N = 1,
        R = J + X,
        O = 1 << J - 1;
    for (let j = 0; j < J; j += 1) {
        let f = 0,
            k = R;
        while (f < k) {
            if (pf1(B, {
                    errors: j,
                    currentLocation: V + k,
                    expectedLocation: V,
                    distance: D,
                    ignoreLocation: W
                }) <= C) f = k;
            else R = k;
            k = Math.floor((R - f) / 2 + f)
        }
        R = k;
        let c = Math.max(1, V - k + 1),
            u = F ? X : Math.min(V + k, X) + J,
            a = Array(u + 2);
        a[u + 1] = (1 << j) - 1;
        for (let y = u; y >= c; y -= 1) {
            let t = y - 1,
                E1 = Q[A.charAt(t)];
            if (H) z[t] = +!!E1;
            if (a[y] = (a[y + 1] << 1 | 1) & E1, j) a[y] |= (L[y + 1] | L[y]) << 1 | 1 | L[y + 1];
            if (a[y] & O) {
                if (N = pf1(B, {
                        errors: j,
                        currentLocation: t,
                        expectedLocation: V,
                        distance: D,
                        ignoreLocation: W
                    }), N <= C) {
                    if (C = N, K = t, K <= V) break;
                    c = Math.max(1, 2 * V - K)
                }
            }
        }
        if (pf1(B, {
                errors: j + 1,
                currentLocation: V,
                expectedLocation: V,
                distance: D,
                ignoreLocation: W
            }) > C) break;
        L = a
    }
    let P = {
        isMatch: K >= 0,
        score: Math.max(0.001, N)
    };
    if (H) {
        let j = uz8(z, I);
        if (!j.length) P.isMatch = !1;
        else if (Y) P.indices = j
    }
    return P
}

function dz8(A) {
    let B = {};
    for (let Q = 0, Z = A.length; Q < Z; Q += 1) {
        let D = A.charAt(Q);
        B[D] = (B[D] || 0) | 1 << Z - Q - 1
    }
    return B
}
class MR0 {
    constructor(A, {
        location: B = pQ.location,
        threshold: Q = pQ.threshold,
        distance: Z = pQ.distance,
        includeMatches: D = pQ.includeMatches,
        findAllMatches: G = pQ.findAllMatches,
        minMatchCharLength: F = pQ.minMatchCharLength,
        isCaseSensitive: I = pQ.isCaseSensitive,
        ignoreLocation: Y = pQ.ignoreLocation
    } = {}) {
        if (this.options = {
                location: B,
                threshold: Q,
                distance: Z,
                includeMatches: D,
                findAllMatches: G,
                minMatchCharLength: F,
                isCaseSensitive: I,
                ignoreLocation: Y
            }, this.pattern = I ? A : A.toLowerCase(), this.chunks = [], !this.pattern.length) return;
        let W = (X, V) => {
                this.chunks.push({
                    pattern: X,
                    alphabet: dz8(X),
                    startIndex: V
                })
            },
            J = this.pattern.length;
        if (J > bd) {
            let X = 0,
                V = J % bd,
                C = J - V;
            while (X < C) W(this.pattern.substr(X, bd), X), X += bd;
            if (V) {
                let K = J - bd;
                W(this.pattern.substr(K), K)
            }
        } else W(this.pattern, 0)
    }
    searchIn(A) {
        let {
            isCaseSensitive: B,
            includeMatches: Q
        } = this.options;
        if (!B) A = A.toLowerCase();
        if (this.pattern === A) {
            let C = {
                isMatch: !0,
                score: 0
            };
            if (Q) C.indices = [
                [0, A.length - 1]
            ];
            return C
        }
        let {
            location: Z,
            distance: D,
            threshold: G,
            findAllMatches: F,
            minMatchCharLength: I,
            ignoreLocation: Y
        } = this.options, W = [], J = 0, X = !1;
        this.chunks.forEach(({
            pattern: C,
            alphabet: K,
            startIndex: H
        }) => {
            let {
                isMatch: z,
                score: $,
                indices: L
            } = mz8(A, C, K, {
                location: Z + H,
                distance: D,
                threshold: G,
                findAllMatches: F,
                minMatchCharLength: I,
                includeMatches: Q,
                ignoreLocation: Y
            });
            if (z) X = !0;
            if (J += $, z && L) W = [...W, ...L]
        });
        let V = {
            isMatch: X,
            score: X ? J / this.chunks.length : 1
        };
        if (X && Q) V.indices = W;
        return V
    }
}
class vS {
    constructor(A) {
        this.pattern = A
    }
    static isMultiMatch(A) {
        return WbB(A, this.multiRegex)
    }
    static isSingleMatch(A) {
        return WbB(A, this.singleRegex)
    }
    search() {}
}

function WbB(A, B) {
    let Q = A.match(B);
    return Q ? Q[1] : null
}
class UbB extends vS {
    constructor(A) {
        super(A)
    }
    static get type() {
        return "exact"
    }
    static get multiRegex() {
        return /^="(.*)"$/
    }
    static get singleRegex() {
        return /^=(.*)$/
    }
    search(A) {
        let B = A === this.pattern;
        return {
            isMatch: B,
            score: B ? 0 : 1,
            indices: [0, this.pattern.length - 1]
        }
    }
}
class wbB extends vS {
    constructor(A) {
        super(A)
    }
    static get type() {
        return "inverse-exact"
    }
    static get multiRegex() {
        return /^!"(.*)"$/
    }
    static get singleRegex() {
        return /^!(.*)$/
    }
    search(A) {
        let Q = A.indexOf(this.pattern) === -1;
        return {
            isMatch: Q,
            score: Q ? 0 : 1,
            indices: [0, A.length - 1]
        }
    }
}
class $bB extends vS {
    constructor(A) {
        super(A)
    }
    static get type() {
        return "prefix-exact"
    }
    static get multiRegex() {
        return /^\^"(.*)"$/
    }
    static get singleRegex() {
        return /^\^(.*)$/
    }
    search(A) {
        let B = A.startsWith(this.pattern);
        return {
            isMatch: B,
            score: B ? 0 : 1,
            indices: [0, this.pattern.length - 1]
        }
    }
}
class qbB extends vS {
    constructor(A) {
        super(A)
    }
    static get type() {
        return "inverse-prefix-exact"
    }
    static get multiRegex() {
        return /^!\^"(.*)"$/
    }
    static get singleRegex() {
        return /^!\^(.*)$/
    }
    search(A) {
        let B = !A.startsWith(this.pattern);
        return {
            isMatch: B,
            score: B ? 0 : 1,
            indices: [0, A.length - 1]
        }
    }
}
class NbB extends vS {
    constructor(A) {
        super(A)
    }
    static get type() {
        return "suffix-exact"
    }
    static get multiRegex() {
        return /^"(.*)"\$$/
    }
    static get singleRegex() {
        return /^(.*)\$$/
    }
    search(A) {
        let B = A.endsWith(this.pattern);
        return {
            isMatch: B,
            score: B ? 0 : 1,
            indices: [A.length - this.pattern.length, A.length - 1]
        }
    }
}
class LbB extends vS {
    constructor(A) {
        super(A)
    }
    static get type() {
        return "inverse-suffix-exact"
    }
    static get multiRegex() {
        return /^!"(.*)"\$$/
    }
    static get singleRegex() {
        return /^!(.*)\$$/
    }
    search(A) {
        let B = !A.endsWith(this.pattern);
        return {
            isMatch: B,
            score: B ? 0 : 1,
            indices: [0, A.length - 1]
        }
    }
}
class RR0 extends vS {
    constructor(A, {
        location: B = pQ.location,
        threshold: Q = pQ.threshold,
        distance: Z = pQ.distance,
        includeMatches: D = pQ.includeMatches,
        findAllMatches: G = pQ.findAllMatches,
        minMatchCharLength: F = pQ.minMatchCharLength,
        isCaseSensitive: I = pQ.isCaseSensitive,
        ignoreLocation: Y = pQ.ignoreLocation
    } = {}) {
        super(A);
        this._bitapSearch = new MR0(A, {
            location: B,
            threshold: Q,
            distance: Z,
            includeMatches: D,
            findAllMatches: G,
            minMatchCharLength: F,
            isCaseSensitive: I,
            ignoreLocation: Y
        })
    }
    static get type() {
        return "fuzzy"
    }
    static get multiRegex() {
        return /^"(.*)"$/
    }
    static get singleRegex() {
        return /^(.*)$/
    }
    search(A) {
        return this._bitapSearch.searchIn(A)
    }
}
class OR0 extends vS {
    constructor(A) {
        super(A)
    }
    static get type() {
        return "include"
    }
    static get multiRegex() {
        return /^'"(.*)"$/
    }
    static get singleRegex() {
        return /^'(.*)$/
    }
    search(A) {
        let B = 0,
            Q, Z = [],
            D = this.pattern.length;
        while ((Q = A.indexOf(this.pattern, B)) > -1) B = Q + D, Z.push([Q, B - 1]);
        let G = !!Z.length;
        return {
            isMatch: G,
            score: G ? 0 : 1,
            indices: Z
        }
    }
}
var wR0 = [UbB, OR0, $bB, qbB, LbB, NbB, wbB, RR0],
    JbB = wR0.length,
    cz8 = / +(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)/,
    lz8 = "|";