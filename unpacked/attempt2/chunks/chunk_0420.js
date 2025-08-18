/* chunk:420 bytes:[10084034, 10089298) size:5264 source:unpacked-cli.js */
var tU0 = E((t63, xUB) => {
    var {
        utf8Encode: U08,
        utf8DecodeWithoutBOM: PUB
    } = Nx1(), {
        percentDecodeBytes: SUB,
        utf8PercentEncodeString: jUB,
        isURLEncodedPercentEncode: kUB
    } = Lx1();

    function yUB(A) {
        return A.codePointAt(0)
    }

    function w08(A) {
        let B = N08(A, yUB("&")),
            Q = [];
        for (let Z of B) {
            if (Z.length === 0) continue;
            let D, G, F = Z.indexOf(yUB("="));
            if (F >= 0) D = Z.slice(0, F), G = Z.slice(F + 1);
            else D = Z, G = new Uint8Array(0);
            D = _UB(D, 43, 32), G = _UB(G, 43, 32);
            let I = PUB(SUB(D)),
                Y = PUB(SUB(G));
            Q.push([I, Y])
        }
        return Q
    }

    function $08(A) {
        return w08(U08(A))
    }

    function q08(A) {
        let B = "";
        for (let [Q, Z] of A.entries()) {
            let D = jUB(Z[0], kUB, !0),
                G = jUB(Z[1], kUB, !0);
            if (Q !== 0) B += "&";
            B += `${D}=${G}`
        }
        return B
    }

    function N08(A, B) {
        let Q = [],
            Z = 0,
            D = A.indexOf(B);
        while (D >= 0) Q.push(A.slice(Z, D)), Z = D + 1, D = A.indexOf(B, Z);
        if (Z !== A.length) Q.push(A.slice(Z));
        return Q
    }

    function _UB(A, B, Q) {
        let Z = A.indexOf(B);
        while (Z >= 0) A[Z] = Q, Z = A.indexOf(B, Z + 1);
        return A
    }
    xUB.exports = {
        parseUrlencodedString: $08,
        serializeUrlencoded: q08
    }
});
var bUB = E((L08) => {
    var vUB = wx1(),
        Tx1 = qx1();
    L08.convert = (A, B, {
        context: Q = "The provided value"
    } = {}) => {
        if (typeof B !== "function") throw new A.TypeError(Q + " is not a function");

        function Z(...D) {
            let G = Tx1.tryWrapperForImpl(this),
                F;
            for (let I = 0; I < D.length; I++) D[I] = Tx1.tryWrapperForImpl(D[I]);
            return F = Reflect.apply(B, G, D), F = vUB.any(F, {
                context: Q,
                globals: A
            }), F
        }
        return Z.construct = (...D) => {
            for (let F = 0; F < D.length; F++) D[F] = Tx1.tryWrapperForImpl(D[F]);
            let G = Reflect.construct(B, D);
            return G = vUB.any(G, {
                context: Q,
                globals: A
            }), G
        }, Z[Tx1.wrapperSymbol] = B, Z.objectReference = B, Z
    }
});
var fUB = E((R08) => {
    var eU0 = tU0();
    R08.implementation = class A {
        constructor(B, Q, {
            doNotStripQMark: Z = !1
        }) {
            let D = Q[0];
            if (this._list = [], this._url = null, !Z && typeof D === "string" && D[0] === "?") D = D.slice(1);
            if (Array.isArray(D))
                for (let G of D) {
                    if (G.length !== 2) throw new TypeError("Failed to construct 'URLSearchParams': parameter 1 sequence's element does not contain exactly two elements.");
                    this._list.push([G[0], G[1]])
                } else if (typeof D === "object" && Object.getPrototypeOf(D) === null)
                    for (let G of Object.keys(D)) {
                        let F = D[G];
                        this._list.push([G, F])
                    } else this._list = eU0.parseUrlencodedString(D)
        }
        _updateSteps() {
            if (this._url !== null) {
                let B = eU0.serializeUrlencoded(this._list);
                if (B === "") B = null;
                this._url._url.query = B
            }
        }
        get size() {
            return this._list.length
        }
        append(B, Q) {
            this._list.push([B, Q]), this._updateSteps()
        }
        delete(B, Q) {
            let Z = 0;
            while (Z < this._list.length)
                if (this._list[Z][0] === B && (Q === void 0 || this._list[Z][1] === Q)) this._list.splice(Z, 1);
                else Z++;
            this._updateSteps()
        }
        get(B) {
            for (let Q of this._list)
                if (Q[0] === B) return Q[1];
            return null
        }
        getAll(B) {
            let Q = [];
            for (let Z of this._list)
                if (Z[0] === B) Q.push(Z[1]);
            return Q
        }
        has(B, Q) {
            for (let Z of this._list)
                if (Z[0] === B && (Q === void 0 || Z[1] === Q)) return !0;
            return !1
        }
        set(B, Q) {
            let Z = !1,
                D = 0;
            while (D < this._list.length)
                if (this._list[D][0] === B)
                    if (Z) this._list.splice(D, 1);
                    else Z = !0, this._list[D][1] = Q, D++;
            else D++;
            if (!Z) this._list.push([B, Q]);
            this._updateSteps()
        }
        sort() {
            this._list.sort((B, Q) => {
                if (B[0] < Q[0]) return -1;
                if (B[0] > Q[0]) return 1;
                return 0
            }), this._updateSteps()
        } [Symbol.iterator]() {
            return this._list[Symbol.iterator]()
        }
        toString() {
            return eU0.serializeUrlencoded(this._list)
        }
    }
});