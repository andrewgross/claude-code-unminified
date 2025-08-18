/* chunk:59 bytes:[1440289, 1448373) size:8084 source:unpacked-cli.js */
var Xw = E((L15, B9A) => {
    var {
        defineProperty: EK1,
        getOwnPropertyDescriptor: Il9,
        getOwnPropertyNames: Yl9
    } = Object, Wl9 = Object.prototype.hasOwnProperty, UK1 = (A, B) => EK1(A, "name", {
        value: B,
        configurable: !0
    }), Jl9 = (A, B) => {
        for (var Q in B) EK1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, Xl9 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of Yl9(B))
                if (!Wl9.call(A, D) && D !== Q) EK1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = Il9(B, D)) || Z.enumerable
                })
        }
        return A
    }, Vl9 = (A) => Xl9(EK1({}, "__esModule", {
        value: !0
    }), A), oBA = {};
    Jl9(oBA, {
        emitWarningIfUnsupportedVersion: () => Cl9,
        setCredentialFeature: () => tBA,
        setFeature: () => eBA,
        setTokenFeature: () => A9A,
        state: () => Ya1
    });
    B9A.exports = Vl9(oBA);
    var Ya1 = {
            warningEmitted: !1
        },
        Cl9 = UK1((A) => {
            if (A && !Ya1.warningEmitted && parseInt(A.substring(1, A.indexOf("."))) < 18) Ya1.warningEmitted = !0, process.emitWarning(`NodeDeprecationWarning: The AWS SDK for JavaScript (v3) will
no longer support Node.js 16.x on January 6, 2025.

To continue receiving updates to AWS services, bug fixes, and security
updates please upgrade to a supported Node.js LTS version.

More information can be found at: https://a.co/74kJMmI`)
        }, "emitWarningIfUnsupportedVersion");

    function tBA(A, B, Q) {
        if (!A.$source) A.$source = {};
        return A.$source[B] = Q, A
    }
    UK1(tBA, "setCredentialFeature");

    function eBA(A, B, Q) {
        if (!A.__aws_sdk_context) A.__aws_sdk_context = {
            features: {}
        };
        else if (!A.__aws_sdk_context.features) A.__aws_sdk_context.features = {};
        A.__aws_sdk_context.features[B] = Q
    }
    UK1(eBA, "setFeature");

    function A9A(A, B, Q) {
        if (!A.$source) A.$source = {};
        return A.$source[B] = Q, A
    }
    UK1(A9A, "setTokenFeature")
});
var A9 = E((M15, Z9A) => {
    var {
        defineProperty: wK1,
        getOwnPropertyDescriptor: Kl9,
        getOwnPropertyNames: Hl9
    } = Object, zl9 = Object.prototype.hasOwnProperty, $h = (A, B) => wK1(A, "name", {
        value: B,
        configurable: !0
    }), El9 = (A, B) => {
        for (var Q in B) wK1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, Ul9 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of Hl9(B))
                if (!zl9.call(A, D) && D !== Q) wK1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = Kl9(B, D)) || Z.enumerable
                })
        }
        return A
    }, wl9 = (A) => Ul9(wK1({}, "__esModule", {
        value: !0
    }), A), Q9A = {};
    El9(Q9A, {
        CredentialsProviderError: () => $l9,
        ProviderError: () => $K1,
        TokenProviderError: () => ql9,
        chain: () => Nl9,
        fromStatic: () => Ll9,
        memoize: () => Ml9
    });
    Z9A.exports = wl9(Q9A);
    var $K1 = class A extends Error {
            constructor(B, Q = !0) {
                let Z, D = !0;
                if (typeof Q === "boolean") Z = void 0, D = Q;
                else if (Q != null && typeof Q === "object") Z = Q.logger, D = Q.tryNextLink ?? !0;
                super(B);
                this.name = "ProviderError", this.tryNextLink = D, Object.setPrototypeOf(this, A.prototype), Z?.debug?.(`@smithy/property-provider ${D?"->":"(!)"} ${B}`)
            }
            static {
                $h(this, "ProviderError")
            }
            static from(B, Q = !0) {
                return Object.assign(new this(B.message, Q), B)
            }
        },
        $l9 = class A extends $K1 {
            constructor(B, Q = !0) {
                super(B, Q);
                this.name = "CredentialsProviderError", Object.setPrototypeOf(this, A.prototype)
            }
            static {
                $h(this, "CredentialsProviderError")
            }
        },
        ql9 = class A extends $K1 {
            constructor(B, Q = !0) {
                super(B, Q);
                this.name = "TokenProviderError", Object.setPrototypeOf(this, A.prototype)
            }
            static {
                $h(this, "TokenProviderError")
            }
        },
        Nl9 = $h((...A) => async () => {
            if (A.length === 0) throw new $K1("No providers in chain");
            let B;
            for (let Q of A) try {
                return await Q()
            } catch (Z) {
                if (B = Z, Z?.tryNextLink) continue;
                throw Z
            }
            throw B
        }, "chain"),
        Ll9 = $h((A) => () => Promise.resolve(A), "fromStatic"),
        Ml9 = $h((A, B, Q) => {
            let Z, D, G, F = !1,
                I = $h(async () => {
                    if (!D) D = A();
                    try {
                        Z = await D, G = !0, F = !1
                    } finally {
                        D = void 0
                    }
                    return Z
                }, "coalesceProvider");
            if (B === void 0) return async (Y) => {
                if (!G || Y?.forceRefresh) Z = await I();
                return Z
            };
            return async (Y) => {
                if (!G || Y?.forceRefresh) Z = await I();
                if (F) return Z;
                if (Q && !Q(Z)) return F = !0, Z;
                if (B(Z)) return await I(), Z;
                return Z
            }
        }, "memoize")
});
var F9A = E((R15, G9A) => {
    var {
        defineProperty: qK1,
        getOwnPropertyDescriptor: Rl9,
        getOwnPropertyNames: Ol9
    } = Object, Tl9 = Object.prototype.hasOwnProperty, Pl9 = (A, B) => qK1(A, "name", {
        value: B,
        configurable: !0
    }), Sl9 = (A, B) => {
        for (var Q in B) qK1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, jl9 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of Ol9(B))
                if (!Tl9.call(A, D) && D !== Q) qK1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = Rl9(B, D)) || Z.enumerable
                })
        }
        return A
    }, kl9 = (A) => jl9(qK1({}, "__esModule", {
        value: !0
    }), A), D9A = {};
    Sl9(D9A, {
        isArrayBuffer: () => yl9
    });
    G9A.exports = kl9(D9A);
    var yl9 = Pl9((A) => typeof ArrayBuffer === "function" && A instanceof ArrayBuffer || Object.prototype.toString.call(A) === "[object ArrayBuffer]", "isArrayBuffer")
});
var J9A = E((O15, W9A) => {
    var {
        defineProperty: NK1,
        getOwnPropertyDescriptor: _l9,
        getOwnPropertyNames: xl9
    } = Object, vl9 = Object.prototype.hasOwnProperty, Wa1 = (A, B) => NK1(A, "name", {
        value: B,
        configurable: !0
    }), bl9 = (A, B) => {
        for (var Q in B) NK1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, fl9 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of xl9(B))
                if (!vl9.call(A, D) && D !== Q) NK1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = _l9(B, D)) || Z.enumerable
                })
        }
        return A
    }, hl9 = (A) => fl9(NK1({}, "__esModule", {
        value: !0
    }), A), I9A = {};
    bl9(I9A, {
        escapeUri: () => Y9A,
        escapeUriPath: () => ul9
    });
    W9A.exports = hl9(I9A);
    var Y9A = Wa1((A) => encodeURIComponent(A).replace(/[!'()*]/g, gl9), "escapeUri"),
        gl9 = Wa1((A) => `%${A.charCodeAt(0).toString(16).toUpperCase()}`, "hexEncode"),
        ul9 = Wa1((A) => A.split("/").map(Y9A).join("/"), "escapeUriPath")
});