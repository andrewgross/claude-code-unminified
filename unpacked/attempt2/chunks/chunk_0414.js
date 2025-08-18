/* chunk:414 bytes:[9672010, 9687790) size:15780 source:unpacked-cli.js */
var bU0 = E((c63, OEB) => {
    var Ex1 = Object.prototype.hasOwnProperty,
        REB = Object.prototype.toString,
        wEB = Object.defineProperty,
        $EB = Object.getOwnPropertyDescriptor,
        qEB = function A(B) {
            if (typeof Array.isArray === "function") return Array.isArray(B);
            return REB.call(B) === "[object Array]"
        },
        NEB = function A(B) {
            if (!B || REB.call(B) !== "[object Object]") return !1;
            var Q = Ex1.call(B, "constructor"),
                Z = B.constructor && B.constructor.prototype && Ex1.call(B.constructor.prototype, "isPrototypeOf");
            if (B.constructor && !Q && !Z) return !1;
            var D;
            for (D in B);
            return typeof D === "undefined" || Ex1.call(B, D)
        },
        LEB = function A(B, Q) {
            if (wEB && Q.name === "__proto__") wEB(B, Q.name, {
                enumerable: !0,
                configurable: !0,
                value: Q.newValue,
                writable: !0
            });
            else B[Q.name] = Q.newValue
        },
        MEB = function A(B, Q) {
            if (Q === "__proto__") {
                if (!Ex1.call(B, Q)) return;
                else if ($EB) return $EB(B, Q).value
            }
            return B[Q]
        };
    OEB.exports = function A() {
        var B, Q, Z, D, G, F, I = arguments[0],
            Y = 1,
            W = arguments.length,
            J = !1;
        if (typeof I === "boolean") J = I, I = arguments[1] || {}, Y = 2;
        if (I == null || typeof I !== "object" && typeof I !== "function") I = {};
        for (; Y < W; ++Y)
            if (B = arguments[Y], B != null) {
                for (Q in B)
                    if (Z = MEB(I, Q), D = MEB(B, Q), I !== D) {
                        if (J && D && (NEB(D) || (G = qEB(D)))) {
                            if (G) G = !1, F = Z && qEB(Z) ? Z : [];
                            else F = Z && NEB(Z) ? Z : {};
                            LEB(I, {
                                name: Q,
                                newValue: A(J, F, D)
                            })
                        } else if (typeof D !== "undefined") LEB(I, {
                            name: Q,
                            newValue: D
                        })
                    }
            } return I
    }
});
var wx1 = E((jEB) => {
    function z3(A, B, Q) {
        if (Q.globals) A = Q.globals[A.name];
        return new A(`${Q.context?Q.context:"Value"} ${B}.`)
    }

    function H11(A, B) {
        if (typeof A === "bigint") throw z3(TypeError, "is a BigInt which cannot be converted to a number", B);
        if (!B.globals) return Number(A);
        return B.globals.Number(A)
    }

    function PEB(A) {
        if (A > 0 && A % 1 === 0.5 && (A & 1) === 0 || A < 0 && A % 1 === -0.5 && (A & 1) === 1) return fD1(Math.floor(A));
        return fD1(Math.round(A))
    }

    function Ux1(A) {
        return fD1(Math.trunc(A))
    }

    function TEB(A) {
        return A < 0 ? -1 : 1
    }

    function ut6(A, B) {
        let Q = A % B;
        if (TEB(B) !== TEB(Q)) return Q + B;
        return Q
    }

    function fD1(A) {
        return A === 0 ? 0 : A
    }

    function z11(A, {
        unsigned: B
    }) {
        let Q, Z;
        if (B) Q = 0, Z = 2 ** A - 1;
        else Q = -(2 ** (A - 1)), Z = 2 ** (A - 1) - 1;
        let D = 2 ** A,
            G = 2 ** (A - 1);
        return (F, I = {}) => {
            let Y = H11(F, I);
            if (Y = fD1(Y), I.enforceRange) {
                if (!Number.isFinite(Y)) throw z3(TypeError, "is not a finite number", I);
                if (Y = Ux1(Y), Y < Q || Y > Z) throw z3(TypeError, `is outside the accepted range of ${Q} to ${Z}, inclusive`, I);
                return Y
            }
            if (!Number.isNaN(Y) && I.clamp) return Y = Math.min(Math.max(Y, Q), Z), Y = PEB(Y), Y;
            if (!Number.isFinite(Y) || Y === 0) return 0;
            if (Y = Ux1(Y), Y >= Q && Y <= Z) return Y;
            if (Y = ut6(Y, D), !B && Y >= G) return Y - D;
            return Y
        }
    }

    function SEB(A, {
        unsigned: B
    }) {
        let Q = Number.MAX_SAFE_INTEGER,
            Z = B ? 0 : Number.MIN_SAFE_INTEGER,
            D = B ? BigInt.asUintN : BigInt.asIntN;
        return (G, F = {}) => {
            let I = H11(G, F);
            if (I = fD1(I), F.enforceRange) {
                if (!Number.isFinite(I)) throw z3(TypeError, "is not a finite number", F);
                if (I = Ux1(I), I < Z || I > Q) throw z3(TypeError, `is outside the accepted range of ${Z} to ${Q}, inclusive`, F);
                return I
            }
            if (!Number.isNaN(I) && F.clamp) return I = Math.min(Math.max(I, Z), Q), I = PEB(I), I;
            if (!Number.isFinite(I) || I === 0) return 0;
            let Y = BigInt(Ux1(I));
            return Y = D(A, Y), Number(Y)
        }
    }
    jEB.any = (A) => {
        return A
    };
    jEB.undefined = () => {
        return
    };
    jEB.boolean = (A) => {
        return Boolean(A)
    };
    jEB.byte = z11(8, {
        unsigned: !1
    });
    jEB.octet = z11(8, {
        unsigned: !0
    });
    jEB.short = z11(16, {
        unsigned: !1
    });
    jEB["unsigned short"] = z11(16, {
        unsigned: !0
    });
    jEB.long = z11(32, {
        unsigned: !1
    });
    jEB["unsigned long"] = z11(32, {
        unsigned: !0
    });
    jEB["long long"] = SEB(64, {
        unsigned: !1
    });
    jEB["unsigned long long"] = SEB(64, {
        unsigned: !0
    });
    jEB.double = (A, B = {}) => {
        let Q = H11(A, B);
        if (!Number.isFinite(Q)) throw z3(TypeError, "is not a finite floating-point value", B);
        return Q
    };
    jEB["unrestricted double"] = (A, B = {}) => {
        return H11(A, B)
    };
    jEB.float = (A, B = {}) => {
        let Q = H11(A, B);
        if (!Number.isFinite(Q)) throw z3(TypeError, "is not a finite floating-point value", B);
        if (Object.is(Q, -0)) return Q;
        let Z = Math.fround(Q);
        if (!Number.isFinite(Z)) throw z3(TypeError, "is outside the range of a single-precision floating-point value", B);
        return Z
    };
    jEB["unrestricted float"] = (A, B = {}) => {
        let Q = H11(A, B);
        if (isNaN(Q)) return Q;
        if (Object.is(Q, -0)) return Q;
        return Math.fround(Q)
    };
    jEB.DOMString = (A, B = {}) => {
        if (B.treatNullAsEmptyString && A === null) return "";
        if (typeof A === "symbol") throw z3(TypeError, "is a symbol, which cannot be converted to a string", B);
        return (B.globals ? B.globals.String : String)(A)
    };
    jEB.ByteString = (A, B = {}) => {
        let Q = jEB.DOMString(A, B),
            Z;
        for (let D = 0;
            (Z = Q.codePointAt(D)) !== void 0; ++D)
            if (Z > 255) throw z3(TypeError, "is not a valid ByteString", B);
        return Q
    };
    jEB.USVString = (A, B = {}) => {
        let Q = jEB.DOMString(A, B),
            Z = Q.length,
            D = [];
        for (let G = 0; G < Z; ++G) {
            let F = Q.charCodeAt(G);
            if (F < 55296 || F > 57343) D.push(String.fromCodePoint(F));
            else if (56320 <= F && F <= 57343) D.push(String.fromCodePoint(65533));
            else if (G === Z - 1) D.push(String.fromCodePoint(65533));
            else {
                let I = Q.charCodeAt(G + 1);
                if (56320 <= I && I <= 57343) {
                    let Y = F & 1023,
                        W = I & 1023;
                    D.push(String.fromCodePoint(65536 + 1024 * Y + W)), ++G
                } else D.push(String.fromCodePoint(65533))
            }
        }
        return D.join("")
    };
    jEB.object = (A, B = {}) => {
        if (A === null || typeof A !== "object" && typeof A !== "function") throw z3(TypeError, "is not an object", B);
        return A
    };
    var mt6 = Object.getOwnPropertyDescriptor(ArrayBuffer.prototype, "byteLength").get,
        dt6 = typeof SharedArrayBuffer === "function" ? Object.getOwnPropertyDescriptor(SharedArrayBuffer.prototype, "byteLength").get : null;

    function fU0(A) {
        try {
            return mt6.call(A), !0
        } catch {
            return !1
        }
    }

    function C11(A) {
        try {
            return dt6.call(A), !0
        } catch {
            return !1
        }
    }

    function K11(A) {
        try {
            return new Uint8Array(A), !1
        } catch {
            return !0
        }
    }
    jEB.ArrayBuffer = (A, B = {}) => {
        if (!fU0(A)) {
            if (B.allowShared && !C11(A)) throw z3(TypeError, "is not an ArrayBuffer or SharedArrayBuffer", B);
            throw z3(TypeError, "is not an ArrayBuffer", B)
        }
        if (K11(A)) throw z3(TypeError, "is a detached ArrayBuffer", B);
        return A
    };
    var ct6 = Object.getOwnPropertyDescriptor(DataView.prototype, "byteLength").get;
    jEB.DataView = (A, B = {}) => {
        try {
            ct6.call(A)
        } catch (Q) {
            throw z3(TypeError, "is not a DataView", B)
        }
        if (!B.allowShared && C11(A.buffer)) throw z3(TypeError, "is backed by a SharedArrayBuffer, which is not allowed", B);
        if (K11(A.buffer)) throw z3(TypeError, "is backed by a detached ArrayBuffer", B);
        return A
    };
    var lt6 = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(Uint8Array).prototype, Symbol.toStringTag).get;
    [Int8Array, Int16Array, Int32Array, Uint8Array, Uint16Array, Uint32Array, Uint8ClampedArray, Float32Array, Float64Array].forEach((A) => {
        let {
            name: B
        } = A, Q = /^[AEIOU]/u.test(B) ? "an" : "a";
        jEB[B] = (Z, D = {}) => {
            if (!ArrayBuffer.isView(Z) || lt6.call(Z) !== B) throw z3(TypeError, `is not ${Q} ${B} object`, D);
            if (!D.allowShared && C11(Z.buffer)) throw z3(TypeError, "is a view on a SharedArrayBuffer, which is not allowed", D);
            if (K11(Z.buffer)) throw z3(TypeError, "is a view on a detached ArrayBuffer", D);
            return Z
        }
    });
    jEB.ArrayBufferView = (A, B = {}) => {
        if (!ArrayBuffer.isView(A)) throw z3(TypeError, "is not a view on an ArrayBuffer or SharedArrayBuffer", B);
        if (!B.allowShared && C11(A.buffer)) throw z3(TypeError, "is a view on a SharedArrayBuffer, which is not allowed", B);
        if (K11(A.buffer)) throw z3(TypeError, "is a view on a detached ArrayBuffer", B);
        return A
    };
    jEB.BufferSource = (A, B = {}) => {
        if (ArrayBuffer.isView(A)) {
            if (!B.allowShared && C11(A.buffer)) throw z3(TypeError, "is a view on a SharedArrayBuffer, which is not allowed", B);
            if (K11(A.buffer)) throw z3(TypeError, "is a view on a detached ArrayBuffer", B);
            return A
        }
        if (!B.allowShared && !fU0(A)) throw z3(TypeError, "is not an ArrayBuffer or a view on one", B);
        if (B.allowShared && !C11(A) && !fU0(A)) throw z3(TypeError, "is not an ArrayBuffer, SharedArrayBuffer, or a view on one", B);
        if (K11(A)) throw z3(TypeError, "is a detached ArrayBuffer", B);
        return A
    };
    jEB.DOMTimeStamp = jEB["unsigned long long"]
});
var qx1 = E((hEB, gEB) => {
    function Ce6(A) {
        return typeof A === "object" && A !== null || typeof A === "function"
    }
    var yEB = Function.prototype.call.bind(Object.prototype.hasOwnProperty);

    function Ke6(A, B) {
        for (let Q of Reflect.ownKeys(B)) {
            let Z = Reflect.getOwnPropertyDescriptor(B, Q);
            if (Z && !Reflect.defineProperty(A, Q, Z)) throw new TypeError(`Cannot redefine property: ${String(Q)}`)
        }
    }

    function He6(A, B) {
        let Q = vEB(A);
        return Object.defineProperties(Object.create(Q["%Object.prototype%"]), Object.getOwnPropertyDescriptors(B))
    }
    var _EB = Symbol("wrapper"),
        xEB = Symbol("impl"),
        E11 = Symbol("SameObject caches"),
        $x1 = Symbol.for("[webidl2js] constructor registry"),
        ze6 = Object.getPrototypeOf(Object.getPrototypeOf(async function*() {}).prototype);

    function vEB(A) {
        if (yEB(A, $x1)) return A[$x1];
        let B = Object.create(null);
        B["%Object.prototype%"] = A.Object.prototype, B["%IteratorPrototype%"] = Object.getPrototypeOf(Object.getPrototypeOf(new A.Array()[Symbol.iterator]()));
        try {
            B["%AsyncIteratorPrototype%"] = Object.getPrototypeOf(Object.getPrototypeOf(A.eval("(async function* () {})").prototype))
        } catch {
            B["%AsyncIteratorPrototype%"] = ze6
        }
        return A[$x1] = B, B
    }

    function Ee6(A, B, Q) {
        if (!A[E11]) A[E11] = Object.create(null);
        if (B in A[E11]) return A[E11][B];
        return A[E11][B] = Q(), A[E11][B]
    }

    function bEB(A) {
        return A ? A[_EB] : null
    }

    function fEB(A) {
        return A ? A[xEB] : null
    }

    function Ue6(A) {
        let B = bEB(A);
        return B ? B : A
    }

    function we6(A) {
        let B = fEB(A);
        return B ? B : A
    }
    var $e6 = Symbol("internal");

    function qe6(A) {
        if (typeof A !== "string") return !1;
        let B = A >>> 0;
        if (B === 4294967295) return !1;
        let Q = `${B}`;
        if (A !== Q) return !1;
        return !0
    }
    var Ne6 = Object.getOwnPropertyDescriptor(ArrayBuffer.prototype, "byteLength").get;

    function Le6(A) {
        try {
            return Ne6.call(A), !0
        } catch (B) {
            return !1
        }
    }

    function Me6([A, B], Q) {
        let Z;
        switch (Q) {
            case "key":
                Z = A;
                break;
            case "value":
                Z = B;
                break;
            case "key+value":
                Z = [A, B];
                break
        }
        return {
            value: Z,
            done: !1
        }
    }
    var Re6 = Symbol("supports property index"),
        Oe6 = Symbol("supported property indices"),
        Te6 = Symbol("supports property name"),
        Pe6 = Symbol("supported property names"),
        Se6 = Symbol("indexed property get"),
        je6 = Symbol("indexed property set new"),
        ke6 = Symbol("indexed property set existing"),
        ye6 = Symbol("named property get"),
        _e6 = Symbol("named property set new"),
        xe6 = Symbol("named property set existing"),
        ve6 = Symbol("named property delete"),
        be6 = Symbol("async iterator get the next iteration result"),
        fe6 = Symbol("async iterator return steps"),
        he6 = Symbol("async iterator initialization steps"),
        ge6 = Symbol("async iterator end of iteration");
    gEB.exports = hEB = {
        isObject: Ce6,
        hasOwn: yEB,
        define: Ke6,
        newObjectInRealm: He6,
        wrapperSymbol: _EB,
        implSymbol: xEB,
        getSameObject: Ee6,
        ctorRegistrySymbol: $x1,
        initCtorRegistry: vEB,
        wrapperForImpl: bEB,
        implForWrapper: fEB,
        tryWrapperForImpl: Ue6,
        tryImplForWrapper: we6,
        iterInternalSymbol: $e6,
        isArrayBuffer: Le6,
        isArrayIndexPropName: qe6,
        supportsPropertyIndex: Re6,
        supportedPropertyIndices: Oe6,
        supportsPropertyName: Te6,
        supportedPropertyNames: Pe6,
        indexedGet: Se6,
        indexedSetNew: je6,
        indexedSetExisting: ke6,
        namedGet: ye6,
        namedSetNew: _e6,
        namedSetExisting: xe6,
        namedDelete: ve6,
        asyncIteratorNext: be6,
        asyncIteratorReturn: fe6,
        asyncIteratorInit: he6,
        asyncIteratorEOI: ge6,
        iteratorResult: Me6
    }
});