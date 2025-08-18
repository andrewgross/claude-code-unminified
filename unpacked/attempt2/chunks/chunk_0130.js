/* chunk:130 bytes:[2986107, 2998918) size:12811 source:unpacked-cli.js */
var sk = E((t45, GOA) => {
    GOA.exports = {
        kUrl: Symbol("url"),
        kHeaders: Symbol("headers"),
        kSignal: Symbol("signal"),
        kState: Symbol("state"),
        kDispatcher: Symbol("dispatcher")
    }
});
var $00 = E((e45, FOA) => {
    var {
        Blob: BTQ,
        File: QTQ
    } = W1("node:buffer"), {
        kState: eO
    } = sk(), {
        webidl: dN
    } = NY();
    class cN {
        constructor(A, B, Q = {}) {
            let Z = B,
                D = Q.type,
                G = Q.lastModified ?? Date.now();
            this[eO] = {
                blobLike: A,
                name: Z,
                type: D,
                lastModified: G
            }
        }
        stream(...A) {
            return dN.brandCheck(this, cN), this[eO].blobLike.stream(...A)
        }
        arrayBuffer(...A) {
            return dN.brandCheck(this, cN), this[eO].blobLike.arrayBuffer(...A)
        }
        slice(...A) {
            return dN.brandCheck(this, cN), this[eO].blobLike.slice(...A)
        }
        text(...A) {
            return dN.brandCheck(this, cN), this[eO].blobLike.text(...A)
        }
        get size() {
            return dN.brandCheck(this, cN), this[eO].blobLike.size
        }
        get type() {
            return dN.brandCheck(this, cN), this[eO].blobLike.type
        }
        get name() {
            return dN.brandCheck(this, cN), this[eO].name
        }
        get lastModified() {
            return dN.brandCheck(this, cN), this[eO].lastModified
        }
        get[Symbol.toStringTag]() {
            return "File"
        }
    }
    dN.converters.Blob = dN.interfaceConverter(BTQ);

    function ZTQ(A) {
        return A instanceof QTQ || A && (typeof A.stream === "function" || typeof A.arrayBuffer === "function") && A[Symbol.toStringTag] === "File"
    }
    FOA.exports = {
        FileLike: cN,
        isFileLike: ZTQ
    }
});
var aQ1 = E((A65, XOA) => {
    var {
        isBlobLike: ZU1,
        iteratorMixin: DTQ
    } = AK(), {
        kState: iJ
    } = sk(), {
        kEnumerableProperty: Rn
    } = e4(), {
        FileLike: IOA,
        isFileLike: GTQ
    } = $00(), {
        webidl: Q7
    } = NY(), {
        File: JOA
    } = W1("node:buffer"), YOA = W1("node:util"), WOA = globalThis.File ?? JOA;
    class lN {
        constructor(A) {
            if (Q7.util.markAsUncloneable(this), A !== void 0) throw Q7.errors.conversionFailed({
                prefix: "FormData constructor",
                argument: "Argument 1",
                types: ["undefined"]
            });
            this[iJ] = []
        }
        append(A, B, Q = void 0) {
            Q7.brandCheck(this, lN);
            let Z = "FormData.append";
            if (Q7.argumentLengthCheck(arguments, 2, Z), arguments.length === 3 && !ZU1(B)) throw new TypeError("Failed to execute 'append' on 'FormData': parameter 2 is not of type 'Blob'");
            A = Q7.converters.USVString(A, Z, "name"), B = ZU1(B) ? Q7.converters.Blob(B, Z, "value", {
                strict: !1
            }) : Q7.converters.USVString(B, Z, "value"), Q = arguments.length === 3 ? Q7.converters.USVString(Q, Z, "filename") : void 0;
            let D = q00(A, B, Q);
            this[iJ].push(D)
        }
        delete(A) {
            Q7.brandCheck(this, lN);
            let B = "FormData.delete";
            Q7.argumentLengthCheck(arguments, 1, B), A = Q7.converters.USVString(A, B, "name"), this[iJ] = this[iJ].filter((Q) => Q.name !== A)
        }
        get(A) {
            Q7.brandCheck(this, lN);
            let B = "FormData.get";
            Q7.argumentLengthCheck(arguments, 1, B), A = Q7.converters.USVString(A, B, "name");
            let Q = this[iJ].findIndex((Z) => Z.name === A);
            if (Q === -1) return null;
            return this[iJ][Q].value
        }
        getAll(A) {
            Q7.brandCheck(this, lN);
            let B = "FormData.getAll";
            return Q7.argumentLengthCheck(arguments, 1, B), A = Q7.converters.USVString(A, B, "name"), this[iJ].filter((Q) => Q.name === A).map((Q) => Q.value)
        }
        has(A) {
            Q7.brandCheck(this, lN);
            let B = "FormData.has";
            return Q7.argumentLengthCheck(arguments, 1, B), A = Q7.converters.USVString(A, B, "name"), this[iJ].findIndex((Q) => Q.name === A) !== -1
        }
        set(A, B, Q = void 0) {
            Q7.brandCheck(this, lN);
            let Z = "FormData.set";
            if (Q7.argumentLengthCheck(arguments, 2, Z), arguments.length === 3 && !ZU1(B)) throw new TypeError("Failed to execute 'set' on 'FormData': parameter 2 is not of type 'Blob'");
            A = Q7.converters.USVString(A, Z, "name"), B = ZU1(B) ? Q7.converters.Blob(B, Z, "name", {
                strict: !1
            }) : Q7.converters.USVString(B, Z, "name"), Q = arguments.length === 3 ? Q7.converters.USVString(Q, Z, "name") : void 0;
            let D = q00(A, B, Q),
                G = this[iJ].findIndex((F) => F.name === A);
            if (G !== -1) this[iJ] = [...this[iJ].slice(0, G), D, ...this[iJ].slice(G + 1).filter((F) => F.name !== A)];
            else this[iJ].push(D)
        } [YOA.inspect.custom](A, B) {
            let Q = this[iJ].reduce((D, G) => {
                if (D[G.name])
                    if (Array.isArray(D[G.name])) D[G.name].push(G.value);
                    else D[G.name] = [D[G.name], G.value];
                else D[G.name] = G.value;
                return D
            }, {
                __proto__: null
            });
            B.depth ??= A, B.colors ??= !0;
            let Z = YOA.formatWithOptions(B, Q);
            return `FormData ${Z.slice(Z.indexOf("]")+2)}`
        }
    }
    DTQ("FormData", lN, iJ, "name", "value");
    Object.defineProperties(lN.prototype, {
        append: Rn,
        delete: Rn,
        get: Rn,
        getAll: Rn,
        has: Rn,
        set: Rn,
        [Symbol.toStringTag]: {
            value: "FormData",
            configurable: !0
        }
    });

    function q00(A, B, Q) {
        if (typeof B === "string");
        else {
            if (!GTQ(B)) B = B instanceof Blob ? new WOA([B], "blob", {
                type: B.type
            }) : new IOA(B, "blob", {
                type: B.type
            });
            if (Q !== void 0) {
                let Z = {
                    type: B.type,
                    lastModified: B.lastModified
                };
                B = B instanceof JOA ? new WOA([B], Q, Z) : new IOA(B, Q, Z)
            }
        }
        return {
            name: A,
            value: B
        }
    }
    XOA.exports = {
        FormData: lN,
        makeEntry: q00
    }
});
var EOA = E((B65, zOA) => {
    var {
        isUSVString: VOA,
        bufferToLowerCasedHeaderName: FTQ
    } = e4(), {
        utf8DecodeBytes: ITQ
    } = AK(), {
        HTTP_TOKEN_CODEPOINTS: YTQ,
        isomorphicDecode: COA
    } = NV(), {
        isFileLike: WTQ
    } = $00(), {
        makeEntry: JTQ
    } = aQ1(), DU1 = W1("node:assert"), {
        File: XTQ
    } = W1("node:buffer"), VTQ = globalThis.File ?? XTQ, CTQ = Buffer.from('form-data; name="'), KOA = Buffer.from("; filename"), KTQ = Buffer.from("--"), HTQ = Buffer.from(`--\r
`);

    function zTQ(A) {
        for (let B = 0; B < A.length; ++B)
            if ((A.charCodeAt(B) & -128) !== 0) return !1;
        return !0
    }

    function ETQ(A) {
        let B = A.length;
        if (B < 27 || B > 70) return !1;
        for (let Q = 0; Q < B; ++Q) {
            let Z = A.charCodeAt(Q);
            if (!(Z >= 48 && Z <= 57 || Z >= 65 && Z <= 90 || Z >= 97 && Z <= 122 || Z === 39 || Z === 45 || Z === 95)) return !1
        }
        return !0
    }

    function UTQ(A, B) {
        DU1(B !== "failure" && B.essence === "multipart/form-data");
        let Q = B.parameters.get("boundary");
        if (Q === void 0) return "failure";
        let Z = Buffer.from(`--${Q}`, "utf8"),
            D = [],
            G = {
                position: 0
            };
        while (A[G.position] === 13 && A[G.position + 1] === 10) G.position += 2;
        let F = A.length;
        while (A[F - 1] === 10 && A[F - 2] === 13) F -= 2;
        if (F !== A.length) A = A.subarray(0, F);
        while (!0) {
            if (A.subarray(G.position, G.position + Z.length).equals(Z)) G.position += Z.length;
            else return "failure";
            if (G.position === A.length - 2 && GU1(A, KTQ, G) || G.position === A.length - 4 && GU1(A, HTQ, G)) return D;
            if (A[G.position] !== 13 || A[G.position + 1] !== 10) return "failure";
            G.position += 2;
            let I = wTQ(A, G);
            if (I === "failure") return "failure";
            let {
                name: Y,
                filename: W,
                contentType: J,
                encoding: X
            } = I;
            G.position += 2;
            let V;
            {
                let K = A.indexOf(Z.subarray(2), G.position);
                if (K === -1) return "failure";
                if (V = A.subarray(G.position, K - 4), G.position += V.length, X === "base64") V = Buffer.from(V.toString(), "base64")
            }
            if (A[G.position] !== 13 || A[G.position + 1] !== 10) return "failure";
            else G.position += 2;
            let C;
            if (W !== null) {
                if (J ??= "text/plain", !zTQ(J)) J = "";
                C = new VTQ([V], W, {
                    type: J
                })
            } else C = ITQ(Buffer.from(V));
            DU1(VOA(Y)), DU1(typeof C === "string" && VOA(C) || WTQ(C)), D.push(JTQ(Y, C, W))
        }
    }

    function wTQ(A, B) {
        let Q = null,
            Z = null,
            D = null,
            G = null;
        while (!0) {
            if (A[B.position] === 13 && A[B.position + 1] === 10) {
                if (Q === null) return "failure";
                return {
                    name: Q,
                    filename: Z,
                    contentType: D,
                    encoding: G
                }
            }
            let F = On((I) => I !== 10 && I !== 13 && I !== 58, A, B);
            if (F = N00(F, !0, !0, (I) => I === 9 || I === 32), !YTQ.test(F.toString())) return "failure";
            if (A[B.position] !== 58) return "failure";
            switch (B.position++, On((I) => I === 32 || I === 9, A, B), FTQ(F)) {
                case "content-disposition": {
                    if (Q = Z = null, !GU1(A, CTQ, B)) return "failure";
                    if (B.position += 17, Q = HOA(A, B), Q === null) return "failure";
                    if (GU1(A, KOA, B)) {
                        let I = B.position + KOA.length;
                        if (A[I] === 42) B.position += 1, I += 1;
                        if (A[I] !== 61 || A[I + 1] !== 34) return "failure";
                        if (B.position += 12, Z = HOA(A, B), Z === null) return "failure"
                    }
                    break
                }
                case "content-type": {
                    let I = On((Y) => Y !== 10 && Y !== 13, A, B);
                    I = N00(I, !1, !0, (Y) => Y === 9 || Y === 32), D = COA(I);
                    break
                }
                case "content-transfer-encoding": {
                    let I = On((Y) => Y !== 10 && Y !== 13, A, B);
                    I = N00(I, !1, !0, (Y) => Y === 9 || Y === 32), G = COA(I);
                    break
                }
                default:
                    On((I) => I !== 10 && I !== 13, A, B)
            }
            if (A[B.position] !== 13 && A[B.position + 1] !== 10) return "failure";
            else B.position += 2
        }
    }

    function HOA(A, B) {
        DU1(A[B.position - 1] === 34);
        let Q = On((Z) => Z !== 10 && Z !== 13 && Z !== 34, A, B);
        if (A[B.position] !== 34) return null;
        else B.position++;
        return Q = new TextDecoder().decode(Q).replace(/%0A/ig, `
`).replace(/%0D/ig, "\r").replace(/%22/g, '"'), Q
    }

    function On(A, B, Q) {
        let Z = Q.position;
        while (Z < B.length && A(B[Z])) ++Z;
        return B.subarray(Q.position, Q.position = Z)
    }

    function N00(A, B, Q, Z) {
        let D = 0,
            G = A.length - 1;
        if (B)
            while (D < A.length && Z(A[D])) D++;
        if (Q)
            while (G > 0 && Z(A[G])) G--;
        return D === 0 && G === A.length - 1 ? A : A.subarray(D, G + 1)
    }

    function GU1(A, B, Q) {
        if (A.length < B.length) return !1;
        for (let Z = 0; Z < B.length; Z++)
            if (B[Z] !== A[Q.position + Z]) return !1;
        return !0
    }
    zOA.exports = {
        multipartFormDataParser: UTQ,
        validateBoundary: ETQ
    }
});