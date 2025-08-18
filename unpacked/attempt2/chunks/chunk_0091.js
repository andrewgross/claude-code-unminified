/* chunk:91 bytes:[2227185, 2261126) size:33941 source:unpacked-cli.js */
var VVA = E((F95, XVA) => {
    var {
        defineProperty: Jz1,
        getOwnPropertyDescriptor: nFQ,
        getOwnPropertyNames: aFQ
    } = Object, sFQ = Object.prototype.hasOwnProperty, k2 = (A, B) => Jz1(A, "name", {
        value: B,
        configurable: !0
    }), rFQ = (A, B) => {
        for (var Q in B) Jz1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, oFQ = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of aFQ(B))
                if (!sFQ.call(A, D) && D !== Q) Jz1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = nFQ(B, D)) || Z.enumerable
                })
        }
        return A
    }, tFQ = (A) => oFQ(Jz1({}, "__esModule", {
        value: !0
    }), A), sXA = {};
    rFQ(sXA, {
        Client: () => eFQ,
        Command: () => oXA,
        LazyJsonString: () => xh,
        NoOpLogger: () => sIQ,
        SENSITIVE_STRING: () => BIQ,
        ServiceException: () => bIQ,
        _json: () => Dt1,
        collectBody: () => to1.collectBody,
        convertMap: () => rIQ,
        createAggregatedClient: () => QIQ,
        dateToUtcString: () => ZVA,
        decorateServiceException: () => DVA,
        emitWarningIfUnsupportedVersion: () => uIQ,
        expectBoolean: () => DIQ,
        expectByte: () => Zt1,
        expectFloat32: () => Yz1,
        expectInt: () => FIQ,
        expectInt32: () => Bt1,
        expectLong: () => ZQ1,
        expectNonNull: () => YIQ,
        expectNumber: () => QQ1,
        expectObject: () => tXA,
        expectShort: () => Qt1,
        expectString: () => WIQ,
        expectUnion: () => JIQ,
        extendedEncodeURIComponent: () => to1.extendedEncodeURIComponent,
        getArrayIfSingleItem: () => nIQ,
        getDefaultClientConfiguration: () => pIQ,
        getDefaultExtensionConfiguration: () => FVA,
        getValueFromTextNode: () => IVA,
        handleFloat: () => CIQ,
        isSerializableHeaderValue: () => aIQ,
        limitedParseDouble: () => It1,
        limitedParseFloat: () => KIQ,
        limitedParseFloat32: () => HIQ,
        loadConfigsForDefaultMode: () => gIQ,
        logger: () => DQ1,
        map: () => Wt1,
        parseBoolean: () => ZIQ,
        parseEpochTimestamp: () => TIQ,
        parseRfc3339DateTime: () => $IQ,
        parseRfc3339DateTimeWithOffset: () => NIQ,
        parseRfc7231DateTime: () => OIQ,
        quoteHeader: () => WVA,
        resolveDefaultRuntimeConfig: () => iIQ,
        resolvedPath: () => to1.resolvedPath,
        serializeDateTime: () => QYQ,
        serializeFloat: () => BYQ,
        splitEvery: () => JVA,
        splitHeader: () => ZYQ,
        strictParseByte: () => QVA,
        strictParseDouble: () => Ft1,
        strictParseFloat: () => XIQ,
        strictParseFloat32: () => eXA,
        strictParseInt: () => zIQ,
        strictParseInt32: () => EIQ,
        strictParseLong: () => BVA,
        strictParseShort: () => Ti,
        take: () => oIQ,
        throwDefaultError: () => GVA,
        withBaseException: () => fIQ
    });
    XVA.exports = tFQ(sXA);
    var rXA = Vw(),
        eFQ = class {
            constructor(A) {
                this.config = A, this.middlewareStack = rXA.constructStack()
            }
            static {
                k2(this, "Client")
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
        to1 = O6(),
        At1 = oo1(),
        oXA = class {
            constructor() {
                this.middlewareStack = rXA.constructStack()
            }
            static {
                k2(this, "Command")
            }
            static classBuilder() {
                return new AIQ
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
                        [At1.SMITHY_CONTEXT_KEY]: {
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
        AIQ = class {
            constructor() {
                this._init = () => {}, this._ep = {}, this._middlewareFn = () => [], this._commandName = "", this._clientName = "", this._additionalContext = {}, this._smithyContext = {}, this._inputFilterSensitiveLog = (A) => A, this._outputFilterSensitiveLog = (A) => A, this._serializer = null, this._deserializer = null
            }
            static {
                k2(this, "ClassBuilder")
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
                return B = class extends oXA {
                    constructor(...[Q]) {
                        super();
                        this.serialize = A._serializer, this.deserialize = A._deserializer, this.input = Q ?? {}, A._init(this)
                    }
                    static {
                        k2(this, "CommandRef")
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
        BIQ = "***SensitiveInformation***",
        QIQ = k2((A, B) => {
            for (let Q of Object.keys(A)) {
                let Z = A[Q],
                    D = k2(async function(F, I, Y) {
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
        ZIQ = k2((A) => {
            switch (A) {
                case "true":
                    return !0;
                case "false":
                    return !1;
                default:
                    throw new Error(`Unable to parse boolean value "${A}"`)
            }
        }, "parseBoolean"),
        DIQ = k2((A) => {
            if (A === null || A === void 0) return;
            if (typeof A === "number") {
                if (A === 0 || A === 1) DQ1.warn(Wz1(`Expected boolean, got ${typeof A}: ${A}`));
                if (A === 0) return !1;
                if (A === 1) return !0
            }
            if (typeof A === "string") {
                let B = A.toLowerCase();
                if (B === "false" || B === "true") DQ1.warn(Wz1(`Expected boolean, got ${typeof A}: ${A}`));
                if (B === "false") return !1;
                if (B === "true") return !0
            }
            if (typeof A === "boolean") return A;
            throw new TypeError(`Expected boolean, got ${typeof A}: ${A}`)
        }, "expectBoolean"),
        QQ1 = k2((A) => {
            if (A === null || A === void 0) return;
            if (typeof A === "string") {
                let B = parseFloat(A);
                if (!Number.isNaN(B)) {
                    if (String(B) !== String(A)) DQ1.warn(Wz1(`Expected number but observed string: ${A}`));
                    return B
                }
            }
            if (typeof A === "number") return A;
            throw new TypeError(`Expected number, got ${typeof A}: ${A}`)
        }, "expectNumber"),
        GIQ = Math.ceil(340282346638528860000000000000000000000),
        Yz1 = k2((A) => {
            let B = QQ1(A);
            if (B !== void 0 && !Number.isNaN(B) && B !== 1 / 0 && B !== -1 / 0) {
                if (Math.abs(B) > GIQ) throw new TypeError(`Expected 32-bit float, got ${A}`)
            }
            return B
        }, "expectFloat32"),
        ZQ1 = k2((A) => {
            if (A === null || A === void 0) return;
            if (Number.isInteger(A) && !Number.isNaN(A)) return A;
            throw new TypeError(`Expected integer, got ${typeof A}: ${A}`)
        }, "expectLong"),
        FIQ = ZQ1,
        Bt1 = k2((A) => Gt1(A, 32), "expectInt32"),
        Qt1 = k2((A) => Gt1(A, 16), "expectShort"),
        Zt1 = k2((A) => Gt1(A, 8), "expectByte"),
        Gt1 = k2((A, B) => {
            let Q = ZQ1(A);
            if (Q !== void 0 && IIQ(Q, B) !== Q) throw new TypeError(`Expected ${B}-bit integer, got ${A}`);
            return Q
        }, "expectSizedInt"),
        IIQ = k2((A, B) => {
            switch (B) {
                case 32:
                    return Int32Array.of(A)[0];
                case 16:
                    return Int16Array.of(A)[0];
                case 8:
                    return Int8Array.of(A)[0]
            }
        }, "castInt"),
        YIQ = k2((A, B) => {
            if (A === null || A === void 0) {
                if (B) throw new TypeError(`Expected a non-null value for ${B}`);
                throw new TypeError("Expected a non-null value")
            }
            return A
        }, "expectNonNull"),
        tXA = k2((A) => {
            if (A === null || A === void 0) return;
            if (typeof A === "object" && !Array.isArray(A)) return A;
            let B = Array.isArray(A) ? "array" : typeof A;
            throw new TypeError(`Expected object, got ${B}: ${A}`)
        }, "expectObject"),
        WIQ = k2((A) => {
            if (A === null || A === void 0) return;
            if (typeof A === "string") return A;
            if (["boolean", "number", "bigint"].includes(typeof A)) return DQ1.warn(Wz1(`Expected string, got ${typeof A}: ${A}`)), String(A);
            throw new TypeError(`Expected string, got ${typeof A}: ${A}`)
        }, "expectString"),
        JIQ = k2((A) => {
            if (A === null || A === void 0) return;
            let B = tXA(A),
                Q = Object.entries(B).filter(([, Z]) => Z != null).map(([Z]) => Z);
            if (Q.length === 0) throw new TypeError("Unions must have exactly one non-null member. None were found.");
            if (Q.length > 1) throw new TypeError(`Unions must have exactly one non-null member. Keys ${Q} were not null.`);
            return B
        }, "expectUnion"),
        Ft1 = k2((A) => {
            if (typeof A == "string") return QQ1(Si(A));
            return QQ1(A)
        }, "strictParseDouble"),
        XIQ = Ft1,
        eXA = k2((A) => {
            if (typeof A == "string") return Yz1(Si(A));
            return Yz1(A)
        }, "strictParseFloat32"),
        VIQ = /(-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?)|(-?Infinity)|(NaN)/g,
        Si = k2((A) => {
            let B = A.match(VIQ);
            if (B === null || B[0].length !== A.length) throw new TypeError("Expected real number, got implicit NaN");
            return parseFloat(A)
        }, "parseNumber"),
        It1 = k2((A) => {
            if (typeof A == "string") return AVA(A);
            return QQ1(A)
        }, "limitedParseDouble"),
        CIQ = It1,
        KIQ = It1,
        HIQ = k2((A) => {
            if (typeof A == "string") return AVA(A);
            return Yz1(A)
        }, "limitedParseFloat32"),
        AVA = k2((A) => {
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
        BVA = k2((A) => {
            if (typeof A === "string") return ZQ1(Si(A));
            return ZQ1(A)
        }, "strictParseLong"),
        zIQ = BVA,
        EIQ = k2((A) => {
            if (typeof A === "string") return Bt1(Si(A));
            return Bt1(A)
        }, "strictParseInt32"),
        Ti = k2((A) => {
            if (typeof A === "string") return Qt1(Si(A));
            return Qt1(A)
        }, "strictParseShort"),
        QVA = k2((A) => {
            if (typeof A === "string") return Zt1(Si(A));
            return Zt1(A)
        }, "strictParseByte"),
        Wz1 = k2((A) => {
            return String(new TypeError(A).stack || A).split(`
`).slice(0, 5).filter((B) => !B.includes("stackTraceWarning")).join(`
`)
        }, "stackTraceWarning"),
        DQ1 = {
            warn: console.warn
        },
        UIQ = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        Yt1 = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    function ZVA(A) {
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
        return `${UIQ[Z]}, ${Y} ${Yt1[Q]} ${B} ${W}:${J}:${X} GMT`
    }
    k2(ZVA, "dateToUtcString");
    var wIQ = new RegExp(/^(\d{4})-(\d{2})-(\d{2})[tT](\d{2}):(\d{2}):(\d{2})(?:\.(\d+))?[zZ]$/),
        $IQ = k2((A) => {
            if (A === null || A === void 0) return;
            if (typeof A !== "string") throw new TypeError("RFC-3339 date-times must be expressed as strings");
            let B = wIQ.exec(A);
            if (!B) throw new TypeError("Invalid RFC-3339 date-time value");
            let [Q, Z, D, G, F, I, Y, W] = B, J = Ti(Pi(Z)), X = kN(D, "month", 1, 12), V = kN(G, "day", 1, 31);
            return BQ1(J, X, V, {
                hours: F,
                minutes: I,
                seconds: Y,
                fractionalMilliseconds: W
            })
        }, "parseRfc3339DateTime"),
        qIQ = new RegExp(/^(\d{4})-(\d{2})-(\d{2})[tT](\d{2}):(\d{2}):(\d{2})(?:\.(\d+))?(([-+]\d{2}\:\d{2})|[zZ])$/),
        NIQ = k2((A) => {
            if (A === null || A === void 0) return;
            if (typeof A !== "string") throw new TypeError("RFC-3339 date-times must be expressed as strings");
            let B = qIQ.exec(A);
            if (!B) throw new TypeError("Invalid RFC-3339 date-time value");
            let [Q, Z, D, G, F, I, Y, W, J] = B, X = Ti(Pi(Z)), V = kN(D, "month", 1, 12), C = kN(G, "day", 1, 31), K = BQ1(X, V, C, {
                hours: F,
                minutes: I,
                seconds: Y,
                fractionalMilliseconds: W
            });
            if (J.toUpperCase() != "Z") K.setTime(K.getTime() - vIQ(J));
            return K
        }, "parseRfc3339DateTimeWithOffset"),
        LIQ = new RegExp(/^(?:Mon|Tue|Wed|Thu|Fri|Sat|Sun), (\d{2}) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) (\d{4}) (\d{1,2}):(\d{2}):(\d{2})(?:\.(\d+))? GMT$/),
        MIQ = new RegExp(/^(?:Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday), (\d{2})-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)-(\d{2}) (\d{1,2}):(\d{2}):(\d{2})(?:\.(\d+))? GMT$/),
        RIQ = new RegExp(/^(?:Mon|Tue|Wed|Thu|Fri|Sat|Sun) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) ( [1-9]|\d{2}) (\d{1,2}):(\d{2}):(\d{2})(?:\.(\d+))? (\d{4})$/),
        OIQ = k2((A) => {
            if (A === null || A === void 0) return;
            if (typeof A !== "string") throw new TypeError("RFC-7231 date-times must be expressed as strings");
            let B = LIQ.exec(A);
            if (B) {
                let [Q, Z, D, G, F, I, Y, W] = B;
                return BQ1(Ti(Pi(G)), eo1(D), kN(Z, "day", 1, 31), {
                    hours: F,
                    minutes: I,
                    seconds: Y,
                    fractionalMilliseconds: W
                })
            }
            if (B = MIQ.exec(A), B) {
                let [Q, Z, D, G, F, I, Y, W] = B;
                return jIQ(BQ1(PIQ(G), eo1(D), kN(Z, "day", 1, 31), {
                    hours: F,
                    minutes: I,
                    seconds: Y,
                    fractionalMilliseconds: W
                }))
            }
            if (B = RIQ.exec(A), B) {
                let [Q, Z, D, G, F, I, Y, W] = B;
                return BQ1(Ti(Pi(W)), eo1(Z), kN(D.trimLeft(), "day", 1, 31), {
                    hours: G,
                    minutes: F,
                    seconds: I,
                    fractionalMilliseconds: Y
                })
            }
            throw new TypeError("Invalid RFC-7231 date-time value")
        }, "parseRfc7231DateTime"),
        TIQ = k2((A) => {
            if (A === null || A === void 0) return;
            let B;
            if (typeof A === "number") B = A;
            else if (typeof A === "string") B = Ft1(A);
            else if (typeof A === "object" && A.tag === 1) B = A.value;
            else throw new TypeError("Epoch timestamps must be expressed as floating point numbers or their string representation");
            if (Number.isNaN(B) || B === 1 / 0 || B === -1 / 0) throw new TypeError("Epoch timestamps must be valid, non-Infinite, non-NaN numerics");
            return new Date(Math.round(B * 1000))
        }, "parseEpochTimestamp"),
        BQ1 = k2((A, B, Q, Z) => {
            let D = B - 1;
            return yIQ(A, D, Q), new Date(Date.UTC(A, D, Q, kN(Z.hours, "hour", 0, 23), kN(Z.minutes, "minute", 0, 59), kN(Z.seconds, "seconds", 0, 60), xIQ(Z.fractionalMilliseconds)))
        }, "buildDate"),
        PIQ = k2((A) => {
            let B = new Date().getUTCFullYear(),
                Q = Math.floor(B / 100) * 100 + Ti(Pi(A));
            if (Q < B) return Q + 100;
            return Q
        }, "parseTwoDigitYear"),
        SIQ = 1576800000000,
        jIQ = k2((A) => {
            if (A.getTime() - new Date().getTime() > SIQ) return new Date(Date.UTC(A.getUTCFullYear() - 100, A.getUTCMonth(), A.getUTCDate(), A.getUTCHours(), A.getUTCMinutes(), A.getUTCSeconds(), A.getUTCMilliseconds()));
            return A
        }, "adjustRfc850Year"),
        eo1 = k2((A) => {
            let B = Yt1.indexOf(A);
            if (B < 0) throw new TypeError(`Invalid month: ${A}`);
            return B + 1
        }, "parseMonthByShortName"),
        kIQ = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
        yIQ = k2((A, B, Q) => {
            let Z = kIQ[B];
            if (B === 1 && _IQ(A)) Z = 29;
            if (Q > Z) throw new TypeError(`Invalid day for ${Yt1[B]} in ${A}: ${Q}`)
        }, "validateDayOfMonth"),
        _IQ = k2((A) => {
            return A % 4 === 0 && (A % 100 !== 0 || A % 400 === 0)
        }, "isLeapYear"),
        kN = k2((A, B, Q, Z) => {
            let D = QVA(Pi(A));
            if (D < Q || D > Z) throw new TypeError(`${B} must be between ${Q} and ${Z}, inclusive`);
            return D
        }, "parseDateValue"),
        xIQ = k2((A) => {
            if (A === null || A === void 0) return 0;
            return eXA("0." + A) * 1000
        }, "parseMilliseconds"),
        vIQ = k2((A) => {
            let B = A[0],
                Q = 1;
            if (B == "+") Q = 1;
            else if (B == "-") Q = -1;
            else throw new TypeError(`Offset direction, ${B}, must be "+" or "-"`);
            let Z = Number(A.substring(1, 3)),
                D = Number(A.substring(4, 6));
            return Q * (Z * 60 + D) * 60 * 1000
        }, "parseOffsetToMilliseconds"),
        Pi = k2((A) => {
            let B = 0;
            while (B < A.length - 1 && A.charAt(B) === "0") B++;
            if (B === 0) return A;
            return A.slice(B)
        }, "stripLeadingZeroes"),
        bIQ = class A extends Error {
            static {
                k2(this, "ServiceException")
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
        DVA = k2((A, B = {}) => {
            Object.entries(B).filter(([, Z]) => Z !== void 0).forEach(([Z, D]) => {
                if (A[Z] == null || A[Z] === "") A[Z] = D
            });
            let Q = A.message || A.Message || "UnknownError";
            return A.message = Q, delete A.Message, A
        }, "decorateServiceException"),
        GVA = k2(({
            output: A,
            parsedBody: B,
            exceptionCtor: Q,
            errorCode: Z
        }) => {
            let D = hIQ(A),
                G = D.httpStatusCode ? D.httpStatusCode + "" : void 0,
                F = new Q({
                    name: B?.code || B?.Code || Z || G || "UnknownError",
                    $fault: "client",
                    $metadata: D
                });
            throw DVA(F, B)
        }, "throwDefaultError"),
        fIQ = k2((A) => {
            return ({
                output: B,
                parsedBody: Q,
                errorCode: Z
            }) => {
                GVA({
                    output: B,
                    parsedBody: Q,
                    exceptionCtor: A,
                    errorCode: Z
                })
            }
        }, "withBaseException"),
        hIQ = k2((A) => ({
            httpStatusCode: A.statusCode,
            requestId: A.headers["x-amzn-requestid"] ?? A.headers["x-amzn-request-id"] ?? A.headers["x-amz-request-id"],
            extendedRequestId: A.headers["x-amz-id-2"],
            cfId: A.headers["x-amz-cf-id"]
        }), "deserializeMetadata"),
        gIQ = k2((A) => {
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
        aXA = !1,
        uIQ = k2((A) => {
            if (A && !aXA && parseInt(A.substring(1, A.indexOf("."))) < 16) aXA = !0
        }, "emitWarningIfUnsupportedVersion"),
        mIQ = k2((A) => {
            let B = [];
            for (let Q in At1.AlgorithmId) {
                let Z = At1.AlgorithmId[Q];
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
        dIQ = k2((A) => {
            let B = {};
            return A.checksumAlgorithms().forEach((Q) => {
                B[Q.algorithmId()] = Q.checksumConstructor()
            }), B
        }, "resolveChecksumRuntimeConfig"),
        cIQ = k2((A) => {
            return {
                setRetryStrategy(B) {
                    A.retryStrategy = B
                },
                retryStrategy() {
                    return A.retryStrategy
                }
            }
        }, "getRetryConfiguration"),
        lIQ = k2((A) => {
            let B = {};
            return B.retryStrategy = A.retryStrategy(), B
        }, "resolveRetryRuntimeConfig"),
        FVA = k2((A) => {
            return Object.assign(mIQ(A), cIQ(A))
        }, "getDefaultExtensionConfiguration"),
        pIQ = FVA,
        iIQ = k2((A) => {
            return Object.assign(dIQ(A), lIQ(A))
        }, "resolveDefaultRuntimeConfig"),
        nIQ = k2((A) => Array.isArray(A) ? A : [A], "getArrayIfSingleItem"),
        IVA = k2((A) => {
            for (let Q in A)
                if (A.hasOwnProperty(Q) && A[Q]["#text"] !== void 0) A[Q] = A[Q]["#text"];
                else if (typeof A[Q] === "object" && A[Q] !== null) A[Q] = IVA(A[Q]);
            return A
        }, "getValueFromTextNode"),
        aIQ = k2((A) => {
            return A != null
        }, "isSerializableHeaderValue"),
        xh = k2(function A(B) {
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
    xh.from = (A) => {
        if (A && typeof A === "object" && (A instanceof xh || ("deserializeJSON" in A))) return A;
        else if (typeof A === "string" || Object.getPrototypeOf(A) === String.prototype) return xh(String(A));
        return xh(JSON.stringify(A))
    };
    xh.fromObject = xh.from;
    var sIQ = class {
        static {
            k2(this, "NoOpLogger")
        }
        trace() {}
        debug() {}
        info() {}
        warn() {}
        error() {}
    };

    function Wt1(A, B, Q) {
        let Z, D, G;
        if (typeof B === "undefined" && typeof Q === "undefined") Z = {}, G = A;
        else if (Z = A, typeof B === "function") return D = B, G = Q, tIQ(Z, D, G);
        else G = B;
        for (let F of Object.keys(G)) {
            if (!Array.isArray(G[F])) {
                Z[F] = G[F];
                continue
            }
            YVA(Z, null, G, F)
        }
        return Z
    }
    k2(Wt1, "map");
    var rIQ = k2((A) => {
            let B = {};
            for (let [Q, Z] of Object.entries(A || {})) B[Q] = [, Z];
            return B
        }, "convertMap"),
        oIQ = k2((A, B) => {
            let Q = {};
            for (let Z in B) YVA(Q, A, B, Z);
            return Q
        }, "take"),
        tIQ = k2((A, B, Q) => {
            return Wt1(A, Object.entries(Q).reduce((Z, [D, G]) => {
                if (Array.isArray(G)) Z[D] = G;
                else if (typeof G === "function") Z[D] = [B, G()];
                else Z[D] = [B, G];
                return Z
            }, {}))
        }, "mapWithFilter"),
        YVA = k2((A, B, Q, Z) => {
            if (B !== null) {
                let F = Q[Z];
                if (typeof F === "function") F = [, F];
                let [I = eIQ, Y = AYQ, W = Z] = F;
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
        eIQ = k2((A) => A != null, "nonNullish"),
        AYQ = k2((A) => A, "pass");

    function WVA(A) {
        if (A.includes(",") || A.includes('"')) A = `"${A.replace(/"/g,"\\\"")}"`;
        return A
    }
    k2(WVA, "quoteHeader");
    var BYQ = k2((A) => {
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
        QYQ = k2((A) => A.toISOString().replace(".000Z", "Z"), "serializeDateTime"),
        Dt1 = k2((A) => {
            if (A == null) return {};
            if (Array.isArray(A)) return A.filter((B) => B != null).map(Dt1);
            if (typeof A === "object") {
                let B = {};
                for (let Q of Object.keys(A)) {
                    if (A[Q] == null) continue;
                    B[Q] = Dt1(A[Q])
                }
                return B
            }
            return A
        }, "_json");

    function JVA(A, B, Q) {
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
    k2(JVA, "splitEvery");
    var ZYQ = k2((A) => {
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