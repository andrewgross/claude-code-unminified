/* chunk:395 bytes:[9245946, 9265439) size:19493 source:unpacked-cli.js */
var bz0 = E((YQ3, KIB) => {
    var {
        defineProperty: Py1,
        getOwnPropertyDescriptor: if6,
        getOwnPropertyNames: nf6
    } = Object, af6 = Object.prototype.hasOwnProperty, Sy1 = (A, B) => Py1(A, "name", {
        value: B,
        configurable: !0
    }), sf6 = (A, B) => {
        for (var Q in B) Py1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, rf6 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of nf6(B))
                if (!af6.call(A, D) && D !== Q) Py1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = if6(B, D)) || Z.enumerable
                })
        }
        return A
    }, of6 = (A) => rf6(Py1({}, "__esModule", {
        value: !0
    }), A), FIB = {};
    sf6(FIB, {
        AlgorithmId: () => JIB,
        EndpointURLScheme: () => WIB,
        FieldPosition: () => XIB,
        HttpApiKeyAuthLocation: () => YIB,
        HttpAuthLocation: () => IIB,
        IniSectionType: () => VIB,
        RequestHandlerProtocol: () => CIB,
        SMITHY_CONTEXT_KEY: () => Qh6,
        getDefaultClientConfiguration: () => Ah6,
        resolveDefaultRuntimeConfig: () => Bh6
    });
    KIB.exports = of6(FIB);
    var IIB = ((A) => {
            return A.HEADER = "header", A.QUERY = "query", A
        })(IIB || {}),
        YIB = ((A) => {
            return A.HEADER = "header", A.QUERY = "query", A
        })(YIB || {}),
        WIB = ((A) => {
            return A.HTTP = "http", A.HTTPS = "https", A
        })(WIB || {}),
        JIB = ((A) => {
            return A.MD5 = "md5", A.CRC32 = "crc32", A.CRC32C = "crc32c", A.SHA1 = "sha1", A.SHA256 = "sha256", A
        })(JIB || {}),
        tf6 = Sy1((A) => {
            let B = [];
            if (A.sha256 !== void 0) B.push({
                algorithmId: () => "sha256",
                checksumConstructor: () => A.sha256
            });
            if (A.md5 != null) B.push({
                algorithmId: () => "md5",
                checksumConstructor: () => A.md5
            });
            return {
                _checksumAlgorithms: B,
                addChecksumAlgorithm(Q) {
                    this._checksumAlgorithms.push(Q)
                },
                checksumAlgorithms() {
                    return this._checksumAlgorithms
                }
            }
        }, "getChecksumConfiguration"),
        ef6 = Sy1((A) => {
            let B = {};
            return A.checksumAlgorithms().forEach((Q) => {
                B[Q.algorithmId()] = Q.checksumConstructor()
            }), B
        }, "resolveChecksumRuntimeConfig"),
        Ah6 = Sy1((A) => {
            return {
                ...tf6(A)
            }
        }, "getDefaultClientConfiguration"),
        Bh6 = Sy1((A) => {
            return {
                ...ef6(A)
            }
        }, "resolveDefaultRuntimeConfig"),
        XIB = ((A) => {
            return A[A.HEADER = 0] = "HEADER", A[A.TRAILER = 1] = "TRAILER", A
        })(XIB || {}),
        Qh6 = "__smithy_context",
        VIB = ((A) => {
            return A.PROFILE = "profile", A.SSO_SESSION = "sso-session", A.SERVICES = "services", A
        })(VIB || {}),
        CIB = ((A) => {
            return A.HTTP_0_9 = "http/0.9", A.HTTP_1_0 = "http/1.0", A.TDS_8_0 = "tds/8.0", A
        })(CIB || {})
});
var fz0 = E((WQ3, NIB) => {
    var {
        defineProperty: jy1,
        getOwnPropertyDescriptor: Zh6,
        getOwnPropertyNames: Dh6
    } = Object, Gh6 = Object.prototype.hasOwnProperty, rx = (A, B) => jy1(A, "name", {
        value: B,
        configurable: !0
    }), Fh6 = (A, B) => {
        for (var Q in B) jy1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, Ih6 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of Dh6(B))
                if (!Gh6.call(A, D) && D !== Q) jy1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = Zh6(B, D)) || Z.enumerable
                })
        }
        return A
    }, Yh6 = (A) => Ih6(jy1({}, "__esModule", {
        value: !0
    }), A), HIB = {};
    Fh6(HIB, {
        Field: () => Vh6,
        Fields: () => Ch6,
        HttpRequest: () => Kh6,
        HttpResponse: () => Hh6,
        getHttpHandlerExtensionConfiguration: () => Wh6,
        isValidHostname: () => qIB,
        resolveHttpHandlerRuntimeConfig: () => Jh6
    });
    NIB.exports = Yh6(HIB);
    var Wh6 = rx((A) => {
            let B = A.httpHandler;
            return {
                setHttpHandler(Q) {
                    B = Q
                },
                httpHandler() {
                    return B
                },
                updateHttpClientConfig(Q, Z) {
                    B.updateHttpClientConfig(Q, Z)
                },
                httpHandlerConfigs() {
                    return B.httpHandlerConfigs()
                }
            }
        }, "getHttpHandlerExtensionConfiguration"),
        Jh6 = rx((A) => {
            return {
                httpHandler: A.httpHandler()
            }
        }, "resolveHttpHandlerRuntimeConfig"),
        Xh6 = bz0(),
        zIB = class A {
            constructor({
                name: B,
                kind: Q = Xh6.FieldPosition.HEADER,
                values: Z = []
            }) {
                this.name = B, this.kind = Q, this.values = Z
            }
            add(B) {
                this.values.push(B)
            }
            set(B) {
                this.values = B
            }
            remove(B) {
                this.values = this.values.filter((Q) => Q !== B)
            }
            toString() {
                return this.values.map((B) => B.includes(",") || B.includes(" ") ? `"${B}"` : B).join(", ")
            }
            get() {
                return this.values
            }
        };
    rx(zIB, "Field");
    var Vh6 = zIB,
        EIB = class A {
            constructor({
                fields: B = [],
                encoding: Q = "utf-8"
            }) {
                this.entries = {}, B.forEach(this.setField.bind(this)), this.encoding = Q
            }
            setField(B) {
                this.entries[B.name.toLowerCase()] = B
            }
            getField(B) {
                return this.entries[B.toLowerCase()]
            }
            removeField(B) {
                delete this.entries[B.toLowerCase()]
            }
            getByType(B) {
                return Object.values(this.entries).filter((Q) => Q.kind === B)
            }
        };
    rx(EIB, "Fields");
    var Ch6 = EIB,
        UIB = class A {
            constructor(B) {
                this.method = B.method || "GET", this.hostname = B.hostname || "localhost", this.port = B.port, this.query = B.query || {}, this.headers = B.headers || {}, this.body = B.body, this.protocol = B.protocol ? B.protocol.slice(-1) !== ":" ? `${B.protocol}:` : B.protocol : "https:", this.path = B.path ? B.path.charAt(0) !== "/" ? `/${B.path}` : B.path : "/", this.username = B.username, this.password = B.password, this.fragment = B.fragment
            }
            static isInstance(B) {
                if (!B) return !1;
                let Q = B;
                return "method" in Q && "protocol" in Q && "hostname" in Q && "path" in Q && typeof Q.query === "object" && typeof Q.headers === "object"
            }
            clone() {
                let B = new A({
                    ...this,
                    headers: {
                        ...this.headers
                    }
                });
                if (B.query) B.query = wIB(B.query);
                return B
            }
        };
    rx(UIB, "HttpRequest");
    var Kh6 = UIB;

    function wIB(A) {
        return Object.keys(A).reduce((B, Q) => {
            let Z = A[Q];
            return {
                ...B,
                [Q]: Array.isArray(Z) ? [...Z] : Z
            }
        }, {})
    }
    rx(wIB, "cloneQuery");
    var $IB = class A {
        constructor(B) {
            this.statusCode = B.statusCode, this.reason = B.reason, this.headers = B.headers || {}, this.body = B.body
        }
        static isInstance(B) {
            if (!B) return !1;
            let Q = B;
            return typeof Q.statusCode === "number" && typeof Q.headers === "object"
        }
    };
    rx($IB, "HttpResponse");
    var Hh6 = $IB;

    function qIB(A) {
        return /^[a-z0-9][a-z0-9\.\-]*[a-z0-9]$/.test(A)
    }
    rx(qIB, "isValidHostname")
});
var yIB = E((JQ3, kIB) => {
    var {
        defineProperty: ky1,
        getOwnPropertyDescriptor: zh6,
        getOwnPropertyNames: Eh6
    } = Object, Uh6 = Object.prototype.hasOwnProperty, yy1 = (A, B) => ky1(A, "name", {
        value: B,
        configurable: !0
    }), wh6 = (A, B) => {
        for (var Q in B) ky1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, $h6 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of Eh6(B))
                if (!Uh6.call(A, D) && D !== Q) ky1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = zh6(B, D)) || Z.enumerable
                })
        }
        return A
    }, qh6 = (A) => $h6(ky1({}, "__esModule", {
        value: !0
    }), A), LIB = {};
    wh6(LIB, {
        AlgorithmId: () => TIB,
        EndpointURLScheme: () => OIB,
        FieldPosition: () => PIB,
        HttpApiKeyAuthLocation: () => RIB,
        HttpAuthLocation: () => MIB,
        IniSectionType: () => SIB,
        RequestHandlerProtocol: () => jIB,
        SMITHY_CONTEXT_KEY: () => Oh6,
        getDefaultClientConfiguration: () => Mh6,
        resolveDefaultRuntimeConfig: () => Rh6
    });
    kIB.exports = qh6(LIB);
    var MIB = ((A) => {
            return A.HEADER = "header", A.QUERY = "query", A
        })(MIB || {}),
        RIB = ((A) => {
            return A.HEADER = "header", A.QUERY = "query", A
        })(RIB || {}),
        OIB = ((A) => {
            return A.HTTP = "http", A.HTTPS = "https", A
        })(OIB || {}),
        TIB = ((A) => {
            return A.MD5 = "md5", A.CRC32 = "crc32", A.CRC32C = "crc32c", A.SHA1 = "sha1", A.SHA256 = "sha256", A
        })(TIB || {}),
        Nh6 = yy1((A) => {
            let B = [];
            if (A.sha256 !== void 0) B.push({
                algorithmId: () => "sha256",
                checksumConstructor: () => A.sha256
            });
            if (A.md5 != null) B.push({
                algorithmId: () => "md5",
                checksumConstructor: () => A.md5
            });
            return {
                _checksumAlgorithms: B,
                addChecksumAlgorithm(Q) {
                    this._checksumAlgorithms.push(Q)
                },
                checksumAlgorithms() {
                    return this._checksumAlgorithms
                }
            }
        }, "getChecksumConfiguration"),
        Lh6 = yy1((A) => {
            let B = {};
            return A.checksumAlgorithms().forEach((Q) => {
                B[Q.algorithmId()] = Q.checksumConstructor()
            }), B
        }, "resolveChecksumRuntimeConfig"),
        Mh6 = yy1((A) => {
            return {
                ...Nh6(A)
            }
        }, "getDefaultClientConfiguration"),
        Rh6 = yy1((A) => {
            return {
                ...Lh6(A)
            }
        }, "resolveDefaultRuntimeConfig"),
        PIB = ((A) => {
            return A[A.HEADER = 0] = "HEADER", A[A.TRAILER = 1] = "TRAILER", A
        })(PIB || {}),
        Oh6 = "__smithy_context",
        SIB = ((A) => {
            return A.PROFILE = "profile", A.SSO_SESSION = "sso-session", A.SERVICES = "services", A
        })(SIB || {}),
        jIB = ((A) => {
            return A.HTTP_0_9 = "http/0.9", A.HTTP_1_0 = "http/1.0", A.TDS_8_0 = "tds/8.0", A
        })(jIB || {})
});
var fIB = E((XQ3, bIB) => {
    var {
        defineProperty: _y1,
        getOwnPropertyDescriptor: Th6,
        getOwnPropertyNames: Ph6
    } = Object, Sh6 = Object.prototype.hasOwnProperty, xIB = (A, B) => _y1(A, "name", {
        value: B,
        configurable: !0
    }), jh6 = (A, B) => {
        for (var Q in B) _y1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, kh6 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of Ph6(B))
                if (!Sh6.call(A, D) && D !== Q) _y1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = Th6(B, D)) || Z.enumerable
                })
        }
        return A
    }, yh6 = (A) => kh6(_y1({}, "__esModule", {
        value: !0
    }), A), vIB = {};
    jh6(vIB, {
        getSmithyContext: () => _h6,
        normalizeProvider: () => xh6
    });
    bIB.exports = yh6(vIB);
    var _IB = yIB(),
        _h6 = xIB((A) => A[_IB.SMITHY_CONTEXT_KEY] || (A[_IB.SMITHY_CONTEXT_KEY] = {}), "getSmithyContext"),
        xh6 = xIB((A) => {
            if (typeof A === "function") return A;
            let B = Promise.resolve(A);
            return () => B
        }, "normalizeProvider")
});
var hz0 = E((VQ3, gIB) => {
    var {
        defineProperty: xy1,
        getOwnPropertyDescriptor: vh6,
        getOwnPropertyNames: bh6
    } = Object, fh6 = Object.prototype.hasOwnProperty, hh6 = (A, B) => xy1(A, "name", {
        value: B,
        configurable: !0
    }), gh6 = (A, B) => {
        for (var Q in B) xy1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, uh6 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of bh6(B))
                if (!fh6.call(A, D) && D !== Q) xy1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = vh6(B, D)) || Z.enumerable
                })
        }
        return A
    }, mh6 = (A) => uh6(xy1({}, "__esModule", {
        value: !0
    }), A), hIB = {};
    gh6(hIB, {
        isArrayBuffer: () => dh6
    });
    gIB.exports = mh6(hIB);
    var dh6 = hh6((A) => typeof ArrayBuffer === "function" && A instanceof ArrayBuffer || Object.prototype.toString.call(A) === "[object ArrayBuffer]", "isArrayBuffer")
});
var cIB = E((CQ3, dIB) => {
    var {
        defineProperty: vy1,
        getOwnPropertyDescriptor: ch6,
        getOwnPropertyNames: lh6
    } = Object, ph6 = Object.prototype.hasOwnProperty, uIB = (A, B) => vy1(A, "name", {
        value: B,
        configurable: !0
    }), ih6 = (A, B) => {
        for (var Q in B) vy1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, nh6 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of lh6(B))
                if (!ph6.call(A, D) && D !== Q) vy1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = ch6(B, D)) || Z.enumerable
                })
        }
        return A
    }, ah6 = (A) => nh6(vy1({}, "__esModule", {
        value: !0
    }), A), mIB = {};
    ih6(mIB, {
        fromArrayBuffer: () => rh6,
        fromString: () => oh6
    });
    dIB.exports = ah6(mIB);
    var sh6 = hz0(),
        gz0 = W1("buffer"),
        rh6 = uIB((A, B = 0, Q = A.byteLength - B) => {
            if (!sh6.isArrayBuffer(A)) throw new TypeError(`The "input" argument must be ArrayBuffer. Received type ${typeof A} (${A})`);
            return gz0.Buffer.from(A, B, Q)
        }, "fromArrayBuffer"),
        oh6 = uIB((A, B) => {
            if (typeof A !== "string") throw new TypeError(`The "input" argument must be of type string. Received type ${typeof A} (${A})`);
            return B ? gz0.Buffer.from(A, B) : gz0.Buffer.from(A)
        }, "fromString")
});
var ED1 = E((KQ3, nIB) => {
    var {
        defineProperty: by1,
        getOwnPropertyDescriptor: th6,
        getOwnPropertyNames: eh6
    } = Object, Ag6 = Object.prototype.hasOwnProperty, uz0 = (A, B) => by1(A, "name", {
        value: B,
        configurable: !0
    }), Bg6 = (A, B) => {
        for (var Q in B) by1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, Qg6 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of eh6(B))
                if (!Ag6.call(A, D) && D !== Q) by1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = th6(B, D)) || Z.enumerable
                })
        }
        return A
    }, Zg6 = (A) => Qg6(by1({}, "__esModule", {
        value: !0
    }), A), lIB = {};
    Bg6(lIB, {
        fromUtf8: () => iIB,
        toUint8Array: () => Dg6,
        toUtf8: () => Gg6
    });
    nIB.exports = Zg6(lIB);
    var pIB = cIB(),
        iIB = uz0((A) => {
            let B = pIB.fromString(A, "utf8");
            return new Uint8Array(B.buffer, B.byteOffset, B.byteLength / Uint8Array.BYTES_PER_ELEMENT)
        }, "fromUtf8"),
        Dg6 = uz0((A) => {
            if (typeof A === "string") return iIB(A);
            if (ArrayBuffer.isView(A)) return new Uint8Array(A.buffer, A.byteOffset, A.byteLength / Uint8Array.BYTES_PER_ELEMENT);
            return new Uint8Array(A)
        }, "toUint8Array"),
        Gg6 = uz0((A) => {
            if (typeof A === "string") return A;
            if (typeof A !== "object" || typeof A.byteOffset !== "number" || typeof A.byteLength !== "number") throw new Error("@smithy/util-utf8: toUtf8 encoder function only accepts string | Uint8Array.");
            return pIB.fromArrayBuffer(A.buffer, A.byteOffset, A.byteLength).toString("utf8")
        }, "toUtf8")
});
var AYB = E((HQ3, eIB) => {
    var {
        defineProperty: fy1,
        getOwnPropertyDescriptor: Fg6,
        getOwnPropertyNames: Ig6
    } = Object, Yg6 = Object.prototype.hasOwnProperty, aIB = (A, B) => fy1(A, "name", {
        value: B,
        configurable: !0
    }), Wg6 = (A, B) => {
        for (var Q in B) fy1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, Jg6 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of Ig6(B))
                if (!Yg6.call(A, D) && D !== Q) fy1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = Fg6(B, D)) || Z.enumerable
                })
        }
        return A
    }, Xg6 = (A) => Jg6(fy1({}, "__esModule", {
        value: !0
    }), A), sIB = {};
    Wg6(sIB, {
        fromHex: () => oIB,
        toHex: () => tIB
    });
    eIB.exports = Xg6(sIB);
    var rIB = {},
        mz0 = {};
    for (let A = 0; A < 256; A++) {
        let B = A.toString(16).toLowerCase();
        if (B.length === 1) B = `0${B}`;
        rIB[A] = B, mz0[B] = A
    }

    function oIB(A) {
        if (A.length % 2 !== 0) throw new Error("Hex encoded strings must have an even number length");
        let B = new Uint8Array(A.length / 2);
        for (let Q = 0; Q < A.length; Q += 2) {
            let Z = A.slice(Q, Q + 2).toLowerCase();
            if (Z in mz0) B[Q / 2] = mz0[Z];
            else throw new Error(`Cannot decode unrecognized sequence ${Z} as hexadecimal`)
        }
        return B
    }
    aIB(oIB, "fromHex");

    function tIB(A) {
        let B = "";
        for (let Q = 0; Q < A.byteLength; Q++) B += rIB[A[Q]];
        return B
    }
    aIB(tIB, "toHex")
});