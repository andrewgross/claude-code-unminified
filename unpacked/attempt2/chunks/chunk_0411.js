/* chunk:411 bytes:[9514581, 9548543) size:33962 source:unpacked-cli.js */
var yD1 = E((h43, mKB) => {
    var {
        defineProperty: d_1,
        getOwnPropertyDescriptor: Un6,
        getOwnPropertyNames: wn6
    } = Object, $n6 = Object.prototype.hasOwnProperty, b2 = (A, B) => d_1(A, "name", {
        value: B,
        configurable: !0
    }), qn6 = (A, B) => {
        for (var Q in B) d_1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, Nn6 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of wn6(B))
                if (!$n6.call(A, D) && D !== Q) d_1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = Un6(B, D)) || Z.enumerable
                })
        }
        return A
    }, Ln6 = (A) => Nn6(d_1({}, "__esModule", {
        value: !0
    }), A), RKB = {};
    qn6(RKB, {
        Client: () => Mn6,
        Command: () => TKB,
        LazyJsonString: () => cm,
        NoOpLogger: () => $a6,
        SENSITIVE_STRING: () => On6,
        ServiceException: () => Ia6,
        _json: () => eE0,
        collectBody: () => nE0.collectBody,
        convertMap: () => qa6,
        createAggregatedClient: () => Tn6,
        dateToUtcString: () => _KB,
        decorateServiceException: () => xKB,
        emitWarningIfUnsupportedVersion: () => Xa6,
        expectBoolean: () => Sn6,
        expectByte: () => tE0,
        expectFloat32: () => u_1,
        expectInt: () => kn6,
        expectInt32: () => rE0,
        expectLong: () => jD1,
        expectNonNull: () => _n6,
        expectNumber: () => SD1,
        expectObject: () => PKB,
        expectShort: () => oE0,
        expectString: () => xn6,
        expectUnion: () => vn6,
        extendedEncodeURIComponent: () => nE0.extendedEncodeURIComponent,
        getArrayIfSingleItem: () => Ua6,
        getDefaultClientConfiguration: () => za6,
        getDefaultExtensionConfiguration: () => bKB,
        getValueFromTextNode: () => fKB,
        handleFloat: () => hn6,
        isSerializableHeaderValue: () => wa6,
        limitedParseDouble: () => QU0,
        limitedParseFloat: () => gn6,
        limitedParseFloat32: () => un6,
        loadConfigsForDefaultMode: () => Ja6,
        logger: () => kD1,
        map: () => DU0,
        parseBoolean: () => Pn6,
        parseEpochTimestamp: () => tn6,
        parseRfc3339DateTime: () => pn6,
        parseRfc3339DateTimeWithOffset: () => nn6,
        parseRfc7231DateTime: () => on6,
        quoteHeader: () => gKB,
        resolveDefaultRuntimeConfig: () => Ea6,
        resolvedPath: () => nE0.resolvedPath,
        serializeDateTime: () => Ta6,
        serializeFloat: () => Oa6,
        splitEvery: () => uKB,
        splitHeader: () => Pa6,
        strictParseByte: () => yKB,
        strictParseDouble: () => BU0,
        strictParseFloat: () => bn6,
        strictParseFloat32: () => SKB,
        strictParseInt: () => mn6,
        strictParseInt32: () => dn6,
        strictParseLong: () => kKB,
        strictParseShort: () => I11,
        take: () => Na6,
        throwDefaultError: () => vKB,
        withBaseException: () => Ya6
    });
    mKB.exports = Ln6(RKB);
    var OKB = Vw(),
        Mn6 = class {
            constructor(A) {
                this.config = A, this.middlewareStack = OKB.constructStack()
            }
            static {
                b2(this, "Client")
            }
            send(A, B, Q) {
                let Z = typeof B !== "function" ? B : void 0,
                    D = typeof B === "function" ? B : Q,
                    G = Z === void 0 && this.config.cacheMiddleware === !0,
                    F;
                if (G) {
                    if (!this.handlers) this.handlers = new WeakMap;
                    let I = this.handlers;
                    if (I.has(A.constructor)) F = I.get(A.constructor);
                    else F = A.resolveMiddleware(this.middlewareStack, this.config, Z), I.set(A.constructor, F)
                } else delete this.handlers, F = A.resolveMiddleware(this.middlewareStack, this.config, Z);
                if (D) F(A).then((I) => D(null, I.output), (I) => D(I)).catch(() => {});
                else return F(A).then((I) => I.output)
            }
            destroy() {
                this.config?.requestHandler?.destroy?.(), delete this.handlers
            }
        },
        nE0 = O6(),
        sE0 = iE0(),
        TKB = class {
            constructor() {
                this.middlewareStack = OKB.constructStack()
            }
            static {
                b2(this, "Command")
            }
            static classBuilder() {
                return new Rn6
            }
            resolveMiddlewareWithContext(A, B, Q, {
                middlewareFn: Z,
                clientName: D,
                commandName: G,
                inputFilterSensitiveLog: F,
                outputFilterSensitiveLog: I,
                smithyContext: Y,
                additionalContext: W,
                CommandCtor: J
            }) {
                for (let H of Z.bind(this)(J, A, B, Q)) this.middlewareStack.use(H);
                let X = A.concat(this.middlewareStack),
                    {
                        logger: V
                    } = B,
                    C = {
                        logger: V,
                        clientName: D,
                        commandName: G,
                        inputFilterSensitiveLog: F,
                        outputFilterSensitiveLog: I,
                        [sE0.SMITHY_CONTEXT_KEY]: {
                            commandInstance: this,
                            ...Y
                        },
                        ...W
                    },
                    {
                        requestHandler: K
                    } = B;
                return X.resolve((H) => K.handle(H.request, Q || {}), C)
            }
        },
        Rn6 = class {
            constructor() {
                this._init = () => {}, this._ep = {}, this._middlewareFn = () => [], this._commandName = "", this._clientName = "", this._additionalContext = {}, this._smithyContext = {}, this._inputFilterSensitiveLog = (A) => A, this._outputFilterSensitiveLog = (A) => A, this._serializer = null, this._deserializer = null
            }
            static {
                b2(this, "ClassBuilder")
            }
            init(A) {
                this._init = A
            }
            ep(A) {
                return this._ep = A, this
            }
            m(A) {
                return this._middlewareFn = A, this
            }
            s(A, B, Q = {}) {
                return this._smithyContext = {
                    service: A,
                    operation: B,
                    ...Q
                }, this
            }
            c(A = {}) {
                return this._additionalContext = A, this
            }
            n(A, B) {
                return this._clientName = A, this._commandName = B, this
            }
            f(A = (Q) => Q, B = (Q) => Q) {
                return this._inputFilterSensitiveLog = A, this._outputFilterSensitiveLog = B, this
            }
            ser(A) {
                return this._serializer = A, this
            }
            de(A) {
                return this._deserializer = A, this
            }
            build() {
                let A = this,
                    B;
                return B = class extends TKB {
                    constructor(...[Q]) {
                        super();
                        this.serialize = A._serializer, this.deserialize = A._deserializer, this.input = Q ?? {}, A._init(this)
                    }
                    static {
                        b2(this, "CommandRef")
                    }
                    static getEndpointParameterInstructions() {
                        return A._ep
                    }
                    resolveMiddleware(Q, Z, D) {
                        return this.resolveMiddlewareWithContext(Q, Z, D, {
                            CommandCtor: B,
                            middlewareFn: A._middlewareFn,
                            clientName: A._clientName,
                            commandName: A._commandName,
                            inputFilterSensitiveLog: A._inputFilterSensitiveLog,
                            outputFilterSensitiveLog: A._outputFilterSensitiveLog,
                            smithyContext: A._smithyContext,
                            additionalContext: A._additionalContext
                        })
                    }
                }
            }
        },
        On6 = "***SensitiveInformation***",
        Tn6 = b2((A, B) => {
            for (let Q of Object.keys(A)) {
                let Z = A[Q],
                    D = b2(async function(F, I, Y) {
                        let W = new Z(F);
                        if (typeof I === "function") this.send(W, I);
                        else if (typeof Y === "function") {
                            if (typeof I !== "object") throw new Error(`Expected http options but got ${typeof I}`);
                            this.send(W, I || {}, Y)
                        } else return this.send(W, I)
                    }, "methodImpl"),
                    G = (Q[0].toLowerCase() + Q.slice(1)).replace(/Command$/, "");
                B.prototype[G] = D
            }
        }, "createAggregatedClient"),
        Pn6 = b2((A) => {
            switch (A) {
                case "true":
                    return !0;
                case "false":
                    return !1;
                default:
                    throw new Error(`Unable to parse boolean value "${A}"`)
            }
        }, "parseBoolean"),
        Sn6 = b2((A) => {
            if (A === null || A === void 0) return;
            if (typeof A === "number") {
                if (A === 0 || A === 1) kD1.warn(m_1(`Expected boolean, got ${typeof A}: ${A}`));
                if (A === 0) return !1;
                if (A === 1) return !0
            }
            if (typeof A === "string") {
                let B = A.toLowerCase();
                if (B === "false" || B === "true") kD1.warn(m_1(`Expected boolean, got ${typeof A}: ${A}`));
                if (B === "false") return !1;
                if (B === "true") return !0
            }
            if (typeof A === "boolean") return A;
            throw new TypeError(`Expected boolean, got ${typeof A}: ${A}`)
        }, "expectBoolean"),
        SD1 = b2((A) => {
            if (A === null || A === void 0) return;
            if (typeof A === "string") {
                let B = parseFloat(A);
                if (!Number.isNaN(B)) {
                    if (String(B) !== String(A)) kD1.warn(m_1(`Expected number but observed string: ${A}`));
                    return B
                }
            }
            if (typeof A === "number") return A;
            throw new TypeError(`Expected number, got ${typeof A}: ${A}`)
        }, "expectNumber"),
        jn6 = Math.ceil(340282346638528860000000000000000000000),
        u_1 = b2((A) => {
            let B = SD1(A);
            if (B !== void 0 && !Number.isNaN(B) && B !== 1 / 0 && B !== -1 / 0) {
                if (Math.abs(B) > jn6) throw new TypeError(`Expected 32-bit float, got ${A}`)
            }
            return B
        }, "expectFloat32"),
        jD1 = b2((A) => {
            if (A === null || A === void 0) return;
            if (Number.isInteger(A) && !Number.isNaN(A)) return A;
            throw new TypeError(`Expected integer, got ${typeof A}: ${A}`)
        }, "expectLong"),
        kn6 = jD1,
        rE0 = b2((A) => AU0(A, 32), "expectInt32"),
        oE0 = b2((A) => AU0(A, 16), "expectShort"),
        tE0 = b2((A) => AU0(A, 8), "expectByte"),
        AU0 = b2((A, B) => {
            let Q = jD1(A);
            if (Q !== void 0 && yn6(Q, B) !== Q) throw new TypeError(`Expected ${B}-bit integer, got ${A}`);
            return Q
        }, "expectSizedInt"),
        yn6 = b2((A, B) => {
            switch (B) {
                case 32:
                    return Int32Array.of(A)[0];
                case 16:
                    return Int16Array.of(A)[0];
                case 8:
                    return Int8Array.of(A)[0]
            }
        }, "castInt"),
        _n6 = b2((A, B) => {
            if (A === null || A === void 0) {
                if (B) throw new TypeError(`Expected a non-null value for ${B}`);
                throw new TypeError("Expected a non-null value")
            }
            return A
        }, "expectNonNull"),
        PKB = b2((A) => {
            if (A === null || A === void 0) return;
            if (typeof A === "object" && !Array.isArray(A)) return A;
            let B = Array.isArray(A) ? "array" : typeof A;
            throw new TypeError(`Expected object, got ${B}: ${A}`)
        }, "expectObject"),
        xn6 = b2((A) => {
            if (A === null || A === void 0) return;
            if (typeof A === "string") return A;
            if (["boolean", "number", "bigint"].includes(typeof A)) return kD1.warn(m_1(`Expected string, got ${typeof A}: ${A}`)), String(A);
            throw new TypeError(`Expected string, got ${typeof A}: ${A}`)
        }, "expectString"),
        vn6 = b2((A) => {
            if (A === null || A === void 0) return;
            let B = PKB(A),
                Q = Object.entries(B).filter(([, Z]) => Z != null).map(([Z]) => Z);
            if (Q.length === 0) throw new TypeError("Unions must have exactly one non-null member. None were found.");
            if (Q.length > 1) throw new TypeError(`Unions must have exactly one non-null member. Keys ${Q} were not null.`);
            return B
        }, "expectUnion"),
        BU0 = b2((A) => {
            if (typeof A == "string") return SD1(W11(A));
            return SD1(A)
        }, "strictParseDouble"),
        bn6 = BU0,
        SKB = b2((A) => {
            if (typeof A == "string") return u_1(W11(A));
            return u_1(A)
        }, "strictParseFloat32"),
        fn6 = /(-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?)|(-?Infinity)|(NaN)/g,
        W11 = b2((A) => {
            let B = A.match(fn6);
            if (B === null || B[0].length !== A.length) throw new TypeError("Expected real number, got implicit NaN");
            return parseFloat(A)
        }, "parseNumber"),
        QU0 = b2((A) => {
            if (typeof A == "string") return jKB(A);
            return SD1(A)
        }, "limitedParseDouble"),
        hn6 = QU0,
        gn6 = QU0,
        un6 = b2((A) => {
            if (typeof A == "string") return jKB(A);
            return u_1(A)
        }, "limitedParseFloat32"),
        jKB = b2((A) => {
            switch (A) {
                case "NaN":
                    return NaN;
                case "Infinity":
                    return 1 / 0;
                case "-Infinity":
                    return -1 / 0;
                default:
                    throw new Error(`Unable to parse float value: ${A}`)
            }
        }, "parseFloatString"),
        kKB = b2((A) => {
            if (typeof A === "string") return jD1(W11(A));
            return jD1(A)
        }, "strictParseLong"),
        mn6 = kKB,
        dn6 = b2((A) => {
            if (typeof A === "string") return rE0(W11(A));
            return rE0(A)
        }, "strictParseInt32"),
        I11 = b2((A) => {
            if (typeof A === "string") return oE0(W11(A));
            return oE0(A)
        }, "strictParseShort"),
        yKB = b2((A) => {
            if (typeof A === "string") return tE0(W11(A));
            return tE0(A)
        }, "strictParseByte"),
        m_1 = b2((A) => {
            return String(new TypeError(A).stack || A).split(`
`).slice(0, 5).filter((B) => !B.includes("stackTraceWarning")).join(`
`)
        }, "stackTraceWarning"),
        kD1 = {
            warn: console.warn
        },
        cn6 = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        ZU0 = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    function _KB(A) {
        let B = A.getUTCFullYear(),
            Q = A.getUTCMonth(),
            Z = A.getUTCDay(),
            D = A.getUTCDate(),
            G = A.getUTCHours(),
            F = A.getUTCMinutes(),
            I = A.getUTCSeconds(),
            Y = D < 10 ? `0${D}` : `${D}`,
            W = G < 10 ? `0${G}` : `${G}`,
            J = F < 10 ? `0${F}` : `${F}`,
            X = I < 10 ? `0${I}` : `${I}`;
        return `${cn6[Z]}, ${Y} ${ZU0[Q]} ${B} ${W}:${J}:${X} GMT`
    }
    b2(_KB, "dateToUtcString");
    var ln6 = new RegExp(/^(\d{4})-(\d{2})-(\d{2})[tT](\d{2}):(\d{2}):(\d{2})(?:\.(\d+))?[zZ]$/),
        pn6 = b2((A) => {
            if (A === null || A === void 0) return;
            if (typeof A !== "string") throw new TypeError("RFC-3339 date-times must be expressed as strings");
            let B = ln6.exec(A);
            if (!B) throw new TypeError("Invalid RFC-3339 date-time value");
            let [Q, Z, D, G, F, I, Y, W] = B, J = I11(Y11(Z)), X = xM(D, "month", 1, 12), V = xM(G, "day", 1, 31);
            return PD1(J, X, V, {
                hours: F,
                minutes: I,
                seconds: Y,
                fractionalMilliseconds: W
            })
        }, "parseRfc3339DateTime"),
        in6 = new RegExp(/^(\d{4})-(\d{2})-(\d{2})[tT](\d{2}):(\d{2}):(\d{2})(?:\.(\d+))?(([-+]\d{2}\:\d{2})|[zZ])$/),
        nn6 = b2((A) => {
            if (A === null || A === void 0) return;
            if (typeof A !== "string") throw new TypeError("RFC-3339 date-times must be expressed as strings");
            let B = in6.exec(A);
            if (!B) throw new TypeError("Invalid RFC-3339 date-time value");
            let [Q, Z, D, G, F, I, Y, W, J] = B, X = I11(Y11(Z)), V = xM(D, "month", 1, 12), C = xM(G, "day", 1, 31), K = PD1(X, V, C, {
                hours: F,
                minutes: I,
                seconds: Y,
                fractionalMilliseconds: W
            });
            if (J.toUpperCase() != "Z") K.setTime(K.getTime() - Fa6(J));
            return K
        }, "parseRfc3339DateTimeWithOffset"),
        an6 = new RegExp(/^(?:Mon|Tue|Wed|Thu|Fri|Sat|Sun), (\d{2}) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) (\d{4}) (\d{1,2}):(\d{2}):(\d{2})(?:\.(\d+))? GMT$/),
        sn6 = new RegExp(/^(?:Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday), (\d{2})-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)-(\d{2}) (\d{1,2}):(\d{2}):(\d{2})(?:\.(\d+))? GMT$/),
        rn6 = new RegExp(/^(?:Mon|Tue|Wed|Thu|Fri|Sat|Sun) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) ( [1-9]|\d{2}) (\d{1,2}):(\d{2}):(\d{2})(?:\.(\d+))? (\d{4})$/),
        on6 = b2((A) => {
            if (A === null || A === void 0) return;
            if (typeof A !== "string") throw new TypeError("RFC-7231 date-times must be expressed as strings");
            let B = an6.exec(A);
            if (B) {
                let [Q, Z, D, G, F, I, Y, W] = B;
                return PD1(I11(Y11(G)), aE0(D), xM(Z, "day", 1, 31), {
                    hours: F,
                    minutes: I,
                    seconds: Y,
                    fractionalMilliseconds: W
                })
            }
            if (B = sn6.exec(A), B) {
                let [Q, Z, D, G, F, I, Y, W] = B;
                return Ba6(PD1(en6(G), aE0(D), xM(Z, "day", 1, 31), {
                    hours: F,
                    minutes: I,
                    seconds: Y,
                    fractionalMilliseconds: W
                }))
            }
            if (B = rn6.exec(A), B) {
                let [Q, Z, D, G, F, I, Y, W] = B;
                return PD1(I11(Y11(W)), aE0(Z), xM(D.trimLeft(), "day", 1, 31), {
                    hours: G,
                    minutes: F,
                    seconds: I,
                    fractionalMilliseconds: Y
                })
            }
            throw new TypeError("Invalid RFC-7231 date-time value")
        }, "parseRfc7231DateTime"),
        tn6 = b2((A) => {
            if (A === null || A === void 0) return;
            let B;
            if (typeof A === "number") B = A;
            else if (typeof A === "string") B = BU0(A);
            else if (typeof A === "object" && A.tag === 1) B = A.value;
            else throw new TypeError("Epoch timestamps must be expressed as floating point numbers or their string representation");
            if (Number.isNaN(B) || B === 1 / 0 || B === -1 / 0) throw new TypeError("Epoch timestamps must be valid, non-Infinite, non-NaN numerics");
            return new Date(Math.round(B * 1000))
        }, "parseEpochTimestamp"),
        PD1 = b2((A, B, Q, Z) => {
            let D = B - 1;
            return Za6(A, D, Q), new Date(Date.UTC(A, D, Q, xM(Z.hours, "hour", 0, 23), xM(Z.minutes, "minute", 0, 59), xM(Z.seconds, "seconds", 0, 60), Ga6(Z.fractionalMilliseconds)))
        }, "buildDate"),
        en6 = b2((A) => {
            let B = new Date().getUTCFullYear(),
                Q = Math.floor(B / 100) * 100 + I11(Y11(A));
            if (Q < B) return Q + 100;
            return Q
        }, "parseTwoDigitYear"),
        Aa6 = 1576800000000,
        Ba6 = b2((A) => {
            if (A.getTime() - new Date().getTime() > Aa6) return new Date(Date.UTC(A.getUTCFullYear() - 100, A.getUTCMonth(), A.getUTCDate(), A.getUTCHours(), A.getUTCMinutes(), A.getUTCSeconds(), A.getUTCMilliseconds()));
            return A
        }, "adjustRfc850Year"),
        aE0 = b2((A) => {
            let B = ZU0.indexOf(A);
            if (B < 0) throw new TypeError(`Invalid month: ${A}`);
            return B + 1
        }, "parseMonthByShortName"),
        Qa6 = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
        Za6 = b2((A, B, Q) => {
            let Z = Qa6[B];
            if (B === 1 && Da6(A)) Z = 29;
            if (Q > Z) throw new TypeError(`Invalid day for ${ZU0[B]} in ${A}: ${Q}`)
        }, "validateDayOfMonth"),
        Da6 = b2((A) => {
            return A % 4 === 0 && (A % 100 !== 0 || A % 400 === 0)
        }, "isLeapYear"),
        xM = b2((A, B, Q, Z) => {
            let D = yKB(Y11(A));
            if (D < Q || D > Z) throw new TypeError(`${B} must be between ${Q} and ${Z}, inclusive`);
            return D
        }, "parseDateValue"),
        Ga6 = b2((A) => {
            if (A === null || A === void 0) return 0;
            return SKB("0." + A) * 1000
        }, "parseMilliseconds"),
        Fa6 = b2((A) => {
            let B = A[0],
                Q = 1;
            if (B == "+") Q = 1;
            else if (B == "-") Q = -1;
            else throw new TypeError(`Offset direction, ${B}, must be "+" or "-"`);
            let Z = Number(A.substring(1, 3)),
                D = Number(A.substring(4, 6));
            return Q * (Z * 60 + D) * 60 * 1000
        }, "parseOffsetToMilliseconds"),
        Y11 = b2((A) => {
            let B = 0;
            while (B < A.length - 1 && A.charAt(B) === "0") B++;
            if (B === 0) return A;
            return A.slice(B)
        }, "stripLeadingZeroes"),
        Ia6 = class A extends Error {
            static {
                b2(this, "ServiceException")
            }
            constructor(B) {
                super(B.message);
                Object.setPrototypeOf(this, Object.getPrototypeOf(this).constructor.prototype), this.name = B.name, this.$fault = B.$fault, this.$metadata = B.$metadata
            }
            static isInstance(B) {
                if (!B) return !1;
                let Q = B;
                return A.prototype.isPrototypeOf(Q) || Boolean(Q.$fault) && Boolean(Q.$metadata) && (Q.$fault === "client" || Q.$fault === "server")
            }
            static[Symbol.hasInstance](B) {
                if (!B) return !1;
                let Q = B;
                if (this === A) return A.isInstance(B);
                if (A.isInstance(B)) {
                    if (Q.name && this.name) return this.prototype.isPrototypeOf(B) || Q.name === this.name;
                    return this.prototype.isPrototypeOf(B)
                }
                return !1
            }
        },
        xKB = b2((A, B = {}) => {
            Object.entries(B).filter(([, Z]) => Z !== void 0).forEach(([Z, D]) => {
                if (A[Z] == null || A[Z] === "") A[Z] = D
            });
            let Q = A.message || A.Message || "UnknownError";
            return A.message = Q, delete A.Message, A
        }, "decorateServiceException"),
        vKB = b2(({
            output: A,
            parsedBody: B,
            exceptionCtor: Q,
            errorCode: Z
        }) => {
            let D = Wa6(A),
                G = D.httpStatusCode ? D.httpStatusCode + "" : void 0,
                F = new Q({
                    name: B?.code || B?.Code || Z || G || "UnknownError",
                    $fault: "client",
                    $metadata: D
                });
            throw xKB(F, B)
        }, "throwDefaultError"),
        Ya6 = b2((A) => {
            return ({
                output: B,
                parsedBody: Q,
                errorCode: Z
            }) => {
                vKB({
                    output: B,
                    parsedBody: Q,
                    exceptionCtor: A,
                    errorCode: Z
                })
            }
        }, "withBaseException"),
        Wa6 = b2((A) => ({
            httpStatusCode: A.statusCode,
            requestId: A.headers["x-amzn-requestid"] ?? A.headers["x-amzn-request-id"] ?? A.headers["x-amz-request-id"],
            extendedRequestId: A.headers["x-amz-id-2"],
            cfId: A.headers["x-amz-cf-id"]
        }), "deserializeMetadata"),
        Ja6 = b2((A) => {
            switch (A) {
                case "standard":
                    return {
                        retryMode: "standard", connectionTimeout: 3100
                    };
                case "in-region":
                    return {
                        retryMode: "standard", connectionTimeout: 1100
                    };
                case "cross-region":
                    return {
                        retryMode: "standard", connectionTimeout: 3100
                    };
                case "mobile":
                    return {
                        retryMode: "standard", connectionTimeout: 30000
                    };
                default:
                    return {}
            }
        }, "loadConfigsForDefaultMode"),
        MKB = !1,
        Xa6 = b2((A) => {
            if (A && !MKB && parseInt(A.substring(1, A.indexOf("."))) < 16) MKB = !0
        }, "emitWarningIfUnsupportedVersion"),
        Va6 = b2((A) => {
            let B = [];
            for (let Q in sE0.AlgorithmId) {
                let Z = sE0.AlgorithmId[Q];
                if (A[Z] === void 0) continue;
                B.push({
                    algorithmId: () => Z,
                    checksumConstructor: () => A[Z]
                })
            }
            return {
                addChecksumAlgorithm(Q) {
                    B.push(Q)
                },
                checksumAlgorithms() {
                    return B
                }
            }
        }, "getChecksumConfiguration"),
        Ca6 = b2((A) => {
            let B = {};
            return A.checksumAlgorithms().forEach((Q) => {
                B[Q.algorithmId()] = Q.checksumConstructor()
            }), B
        }, "resolveChecksumRuntimeConfig"),
        Ka6 = b2((A) => {
            return {
                setRetryStrategy(B) {
                    A.retryStrategy = B
                },
                retryStrategy() {
                    return A.retryStrategy
                }
            }
        }, "getRetryConfiguration"),
        Ha6 = b2((A) => {
            let B = {};
            return B.retryStrategy = A.retryStrategy(), B
        }, "resolveRetryRuntimeConfig"),
        bKB = b2((A) => {
            return Object.assign(Va6(A), Ka6(A))
        }, "getDefaultExtensionConfiguration"),
        za6 = bKB,
        Ea6 = b2((A) => {
            return Object.assign(Ca6(A), Ha6(A))
        }, "resolveDefaultRuntimeConfig"),
        Ua6 = b2((A) => Array.isArray(A) ? A : [A], "getArrayIfSingleItem"),
        fKB = b2((A) => {
            for (let Q in A)
                if (A.hasOwnProperty(Q) && A[Q]["#text"] !== void 0) A[Q] = A[Q]["#text"];
                else if (typeof A[Q] === "object" && A[Q] !== null) A[Q] = fKB(A[Q]);
            return A
        }, "getValueFromTextNode"),
        wa6 = b2((A) => {
            return A != null
        }, "isSerializableHeaderValue"),
        cm = b2(function A(B) {
            return Object.assign(new String(B), {
                deserializeJSON() {
                    return JSON.parse(String(B))
                },
                toString() {
                    return String(B)
                },
                toJSON() {
                    return String(B)
                }
            })
        }, "LazyJsonString");
    cm.from = (A) => {
        if (A && typeof A === "object" && (A instanceof cm || ("deserializeJSON" in A))) return A;
        else if (typeof A === "string" || Object.getPrototypeOf(A) === String.prototype) return cm(String(A));
        return cm(JSON.stringify(A))
    };
    cm.fromObject = cm.from;
    var $a6 = class {
        static {
            b2(this, "NoOpLogger")
        }
        trace() {}
        debug() {}
        info() {}
        warn() {}
        error() {}
    };

    function DU0(A, B, Q) {
        let Z, D, G;
        if (typeof B === "undefined" && typeof Q === "undefined") Z = {}, G = A;
        else if (Z = A, typeof B === "function") return D = B, G = Q, La6(Z, D, G);
        else G = B;
        for (let F of Object.keys(G)) {
            if (!Array.isArray(G[F])) {
                Z[F] = G[F];
                continue
            }
            hKB(Z, null, G, F)
        }
        return Z
    }
    b2(DU0, "map");
    var qa6 = b2((A) => {
            let B = {};
            for (let [Q, Z] of Object.entries(A || {})) B[Q] = [, Z];
            return B
        }, "convertMap"),
        Na6 = b2((A, B) => {
            let Q = {};
            for (let Z in B) hKB(Q, A, B, Z);
            return Q
        }, "take"),
        La6 = b2((A, B, Q) => {
            return DU0(A, Object.entries(Q).reduce((Z, [D, G]) => {
                if (Array.isArray(G)) Z[D] = G;
                else if (typeof G === "function") Z[D] = [B, G()];
                else Z[D] = [B, G];
                return Z
            }, {}))
        }, "mapWithFilter"),
        hKB = b2((A, B, Q, Z) => {
            if (B !== null) {
                let F = Q[Z];
                if (typeof F === "function") F = [, F];
                let [I = Ma6, Y = Ra6, W = Z] = F;
                if (typeof I === "function" && I(B[W]) || typeof I !== "function" && !!I) A[Z] = Y(B[W]);
                return
            }
            let [D, G] = Q[Z];
            if (typeof G === "function") {
                let F, I = D === void 0 && (F = G()) != null,
                    Y = typeof D === "function" && !!D(void 0) || typeof D !== "function" && !!D;
                if (I) A[Z] = F;
                else if (Y) A[Z] = G()
            } else {
                let F = D === void 0 && G != null,
                    I = typeof D === "function" && !!D(G) || typeof D !== "function" && !!D;
                if (F || I) A[Z] = G
            }
        }, "applyInstruction"),
        Ma6 = b2((A) => A != null, "nonNullish"),
        Ra6 = b2((A) => A, "pass");

    function gKB(A) {
        if (A.includes(",") || A.includes('"')) A = `"${A.replace(/"/g,"\\\"")}"`;
        return A
    }
    b2(gKB, "quoteHeader");
    var Oa6 = b2((A) => {
            if (A !== A) return "NaN";
            switch (A) {
                case 1 / 0:
                    return "Infinity";
                case -1 / 0:
                    return "-Infinity";
                default:
                    return A
            }
        }, "serializeFloat"),
        Ta6 = b2((A) => A.toISOString().replace(".000Z", "Z"), "serializeDateTime"),
        eE0 = b2((A) => {
            if (A == null) return {};
            if (Array.isArray(A)) return A.filter((B) => B != null).map(eE0);
            if (typeof A === "object") {
                let B = {};
                for (let Q of Object.keys(A)) {
                    if (A[Q] == null) continue;
                    B[Q] = eE0(A[Q])
                }
                return B
            }
            return A
        }, "_json");

    function uKB(A, B, Q) {
        if (Q <= 0 || !Number.isInteger(Q)) throw new Error("Invalid number of delimiters (" + Q + ") for splitEvery.");
        let Z = A.split(B);
        if (Q === 1) return Z;
        let D = [],
            G = "";
        for (let F = 0; F < Z.length; F++) {
            if (G === "") G = Z[F];
            else G += B + Z[F];
            if ((F + 1) % Q === 0) D.push(G), G = ""
        }
        if (G !== "") D.push(G);
        return D
    }
    b2(uKB, "splitEvery");
    var Pa6 = b2((A) => {
        let B = A.length,
            Q = [],
            Z = !1,
            D = void 0,
            G = 0;
        for (let F = 0; F < B; ++F) {
            let I = A[F];
            switch (I) {
                case '"':
                    if (D !== "\\") Z = !Z;
                    break;
                case ",":
                    if (!Z) Q.push(A.slice(G, F)), G = F + 1;
                    break;
                default:
            }
            D = I
        }
        return Q.push(A.slice(G)), Q.map((F) => {
            F = F.trim();
            let I = F.length;
            if (I < 2) return F;
            if (F[0] === '"' && F[I - 1] === '"') F = F.slice(1, I - 1);
            return F.replace(/\\"/g, '"')
        })
    }, "splitHeader")
});