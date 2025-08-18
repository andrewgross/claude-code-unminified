/* chunk:140 bytes:[3164375, 3175844) size:11469 source:unpacked-cli.js */
var Bg = E((u65, WjA) => {
    var {
        kConstruct: SyQ
    } = VZ(), {
        kEnumerableProperty: nn
    } = e4(), {
        iteratorMixin: jyQ,
        isValidHeaderName: q41,
        isValidHeaderValue: DjA
    } = AK(), {
        webidl: I8
    } = NY(), xA0 = W1("node:assert"), gU1 = W1("node:util"), iG = Symbol("headers map"), ZK = Symbol("headers map sorted");

    function ZjA(A) {
        return A === 10 || A === 13 || A === 9 || A === 32
    }

    function GjA(A) {
        let B = 0,
            Q = A.length;
        while (Q > B && ZjA(A.charCodeAt(Q - 1))) --Q;
        while (Q > B && ZjA(A.charCodeAt(B))) ++B;
        return B === 0 && Q === A.length ? A : A.substring(B, Q)
    }

    function FjA(A, B) {
        if (Array.isArray(B))
            for (let Q = 0; Q < B.length; ++Q) {
                let Z = B[Q];
                if (Z.length !== 2) throw I8.errors.exception({
                    header: "Headers constructor",
                    message: `expected name/value pair to be length 2, found ${Z.length}.`
                });
                vA0(A, Z[0], Z[1])
            } else if (typeof B === "object" && B !== null) {
                let Q = Object.keys(B);
                for (let Z = 0; Z < Q.length; ++Z) vA0(A, Q[Z], B[Q[Z]])
            } else throw I8.errors.conversionFailed({
                prefix: "Headers constructor",
                argument: "Argument 1",
                types: ["sequence<sequence<ByteString>>", "record<ByteString, ByteString>"]
            })
    }

    function vA0(A, B, Q) {
        if (Q = GjA(Q), !q41(B)) throw I8.errors.invalidArgument({
            prefix: "Headers.append",
            value: B,
            type: "header name"
        });
        else if (!DjA(Q)) throw I8.errors.invalidArgument({
            prefix: "Headers.append",
            value: Q,
            type: "header value"
        });
        if (YjA(A) === "immutable") throw new TypeError("immutable");
        return bA0(A).append(B, Q, !1)
    }

    function IjA(A, B) {
        return A[0] < B[0] ? -1 : 1
    }
    class uU1 {
        cookies = null;
        constructor(A) {
            if (A instanceof uU1) this[iG] = new Map(A[iG]), this[ZK] = A[ZK], this.cookies = A.cookies === null ? null : [...A.cookies];
            else this[iG] = new Map(A), this[ZK] = null
        }
        contains(A, B) {
            return this[iG].has(B ? A : A.toLowerCase())
        }
        clear() {
            this[iG].clear(), this[ZK] = null, this.cookies = null
        }
        append(A, B, Q) {
            this[ZK] = null;
            let Z = Q ? A : A.toLowerCase(),
                D = this[iG].get(Z);
            if (D) {
                let G = Z === "cookie" ? "; " : ", ";
                this[iG].set(Z, {
                    name: D.name,
                    value: `${D.value}${G}${B}`
                })
            } else this[iG].set(Z, {
                name: A,
                value: B
            });
            if (Z === "set-cookie")(this.cookies ??= []).push(B)
        }
        set(A, B, Q) {
            this[ZK] = null;
            let Z = Q ? A : A.toLowerCase();
            if (Z === "set-cookie") this.cookies = [B];
            this[iG].set(Z, {
                name: A,
                value: B
            })
        }
        delete(A, B) {
            if (this[ZK] = null, !B) A = A.toLowerCase();
            if (A === "set-cookie") this.cookies = null;
            this[iG].delete(A)
        }
        get(A, B) {
            return this[iG].get(B ? A : A.toLowerCase())?.value ?? null
        }*[Symbol.iterator]() {
            for (let {
                    0: A,
                    1: {
                        value: B
                    }
                }
                of this[iG]) yield [A, B]
        }
        get entries() {
            let A = {};
            if (this[iG].size !== 0)
                for (let {
                        name: B,
                        value: Q
                    }
                    of this[iG].values()) A[B] = Q;
            return A
        }
        rawValues() {
            return this[iG].values()
        }
        get entriesList() {
            let A = [];
            if (this[iG].size !== 0)
                for (let {
                        0: B,
                        1: {
                            name: Q,
                            value: Z
                        }
                    }
                    of this[iG])
                    if (B === "set-cookie")
                        for (let D of this.cookies) A.push([Q, D]);
                    else A.push([Q, Z]);
            return A
        }
        toSortedArray() {
            let A = this[iG].size,
                B = new Array(A);
            if (A <= 32) {
                if (A === 0) return B;
                let Q = this[iG][Symbol.iterator](),
                    Z = Q.next().value;
                B[0] = [Z[0], Z[1].value], xA0(Z[1].value !== null);
                for (let D = 1, G = 0, F = 0, I = 0, Y = 0, W, J; D < A; ++D) {
                    J = Q.next().value, W = B[D] = [J[0], J[1].value], xA0(W[1] !== null), I = 0, F = D;
                    while (I < F)
                        if (Y = I + (F - I >> 1), B[Y][0] <= W[0]) I = Y + 1;
                        else F = Y;
                    if (D !== Y) {
                        G = D;
                        while (G > I) B[G] = B[--G];
                        B[I] = W
                    }
                }
                if (!Q.next().done) throw new TypeError("Unreachable");
                return B
            } else {
                let Q = 0;
                for (let {
                        0: Z,
                        1: {
                            value: D
                        }
                    }
                    of this[iG]) B[Q++] = [Z, D], xA0(D !== null);
                return B.sort(IjA)
            }
        }
    }
    class nW {
        #A;
        #B;
        constructor(A = void 0) {
            if (I8.util.markAsUncloneable(this), A === SyQ) return;
            if (this.#B = new uU1, this.#A = "none", A !== void 0) A = I8.converters.HeadersInit(A, "Headers contructor", "init"), FjA(this, A)
        }
        append(A, B) {
            I8.brandCheck(this, nW), I8.argumentLengthCheck(arguments, 2, "Headers.append");
            let Q = "Headers.append";
            return A = I8.converters.ByteString(A, Q, "name"), B = I8.converters.ByteString(B, Q, "value"), vA0(this, A, B)
        }
        delete(A) {
            I8.brandCheck(this, nW), I8.argumentLengthCheck(arguments, 1, "Headers.delete");
            let B = "Headers.delete";
            if (A = I8.converters.ByteString(A, B, "name"), !q41(A)) throw I8.errors.invalidArgument({
                prefix: "Headers.delete",
                value: A,
                type: "header name"
            });
            if (this.#A === "immutable") throw new TypeError("immutable");
            if (!this.#B.contains(A, !1)) return;
            this.#B.delete(A, !1)
        }
        get(A) {
            I8.brandCheck(this, nW), I8.argumentLengthCheck(arguments, 1, "Headers.get");
            let B = "Headers.get";
            if (A = I8.converters.ByteString(A, B, "name"), !q41(A)) throw I8.errors.invalidArgument({
                prefix: B,
                value: A,
                type: "header name"
            });
            return this.#B.get(A, !1)
        }
        has(A) {
            I8.brandCheck(this, nW), I8.argumentLengthCheck(arguments, 1, "Headers.has");
            let B = "Headers.has";
            if (A = I8.converters.ByteString(A, B, "name"), !q41(A)) throw I8.errors.invalidArgument({
                prefix: B,
                value: A,
                type: "header name"
            });
            return this.#B.contains(A, !1)
        }
        set(A, B) {
            I8.brandCheck(this, nW), I8.argumentLengthCheck(arguments, 2, "Headers.set");
            let Q = "Headers.set";
            if (A = I8.converters.ByteString(A, Q, "name"), B = I8.converters.ByteString(B, Q, "value"), B = GjA(B), !q41(A)) throw I8.errors.invalidArgument({
                prefix: Q,
                value: A,
                type: "header name"
            });
            else if (!DjA(B)) throw I8.errors.invalidArgument({
                prefix: Q,
                value: B,
                type: "header value"
            });
            if (this.#A === "immutable") throw new TypeError("immutable");
            this.#B.set(A, B, !1)
        }
        getSetCookie() {
            I8.brandCheck(this, nW);
            let A = this.#B.cookies;
            if (A) return [...A];
            return []
        }
        get[ZK]() {
            if (this.#B[ZK]) return this.#B[ZK];
            let A = [],
                B = this.#B.toSortedArray(),
                Q = this.#B.cookies;
            if (Q === null || Q.length === 1) return this.#B[ZK] = B;
            for (let Z = 0; Z < B.length; ++Z) {
                let {
                    0: D,
                    1: G
                } = B[Z];
                if (D === "set-cookie")
                    for (let F = 0; F < Q.length; ++F) A.push([D, Q[F]]);
                else A.push([D, G])
            }
            return this.#B[ZK] = A
        } [gU1.inspect.custom](A, B) {
            return B.depth ??= A, `Headers ${gU1.formatWithOptions(B,this.#B.entries)}`
        }
        static getHeadersGuard(A) {
            return A.#A
        }
        static setHeadersGuard(A, B) {
            A.#A = B
        }
        static getHeadersList(A) {
            return A.#B
        }
        static setHeadersList(A, B) {
            A.#B = B
        }
    }
    var {
        getHeadersGuard: YjA,
        setHeadersGuard: kyQ,
        getHeadersList: bA0,
        setHeadersList: yyQ
    } = nW;
    Reflect.deleteProperty(nW, "getHeadersGuard");
    Reflect.deleteProperty(nW, "setHeadersGuard");
    Reflect.deleteProperty(nW, "getHeadersList");
    Reflect.deleteProperty(nW, "setHeadersList");
    jyQ("Headers", nW, ZK, 0, 1);
    Object.defineProperties(nW.prototype, {
        append: nn,
        delete: nn,
        get: nn,
        has: nn,
        set: nn,
        getSetCookie: nn,
        [Symbol.toStringTag]: {
            value: "Headers",
            configurable: !0
        },
        [gU1.inspect.custom]: {
            enumerable: !1
        }
    });
    I8.converters.HeadersInit = function(A, B, Q) {
        if (I8.util.Type(A) === "Object") {
            let Z = Reflect.get(A, Symbol.iterator);
            if (!gU1.types.isProxy(A) && Z === nW.prototype.entries) try {
                return bA0(A).entriesList
            } catch {}
            if (typeof Z === "function") return I8.converters["sequence<sequence<ByteString>>"](A, B, Q, Z.bind(A));
            return I8.converters["record<ByteString, ByteString>"](A, B, Q)
        }
        throw I8.errors.conversionFailed({
            prefix: "Headers constructor",
            argument: "Argument 1",
            types: ["sequence<sequence<ByteString>>", "record<ByteString, ByteString>"]
        })
    };
    WjA.exports = {
        fill: FjA,
        compareHeaderName: IjA,
        Headers: nW,
        HeadersList: uU1,
        getHeadersGuard: YjA,
        setHeadersGuard: kyQ,
        setHeadersList: yyQ,
        getHeadersList: bA0
    }
});