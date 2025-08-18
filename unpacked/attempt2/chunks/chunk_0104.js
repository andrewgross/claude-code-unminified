/* chunk:104 bytes:[2457105, 2491046) size:33941 source:unpacked-cli.js */
var $Q1 = E((JQ5, KEA) => {
    var {
        defineProperty: GE1,
        getOwnPropertyDescriptor: JKQ,
        getOwnPropertyNames: XKQ
    } = Object, VKQ = Object.prototype.hasOwnProperty, _2 = (A, B) => GE1(A, "name", {
        value: B,
        configurable: !0
    }), CKQ = (A, B) => {
        for (var Q in B) GE1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, KKQ = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of XKQ(B))
                if (!VKQ.call(A, D) && D !== Q) GE1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = JKQ(B, D)) || Z.enumerable
                })
        }
        return A
    }, HKQ = (A) => KKQ(GE1({}, "__esModule", {
        value: !0
    }), A), tzA = {};
    CKQ(tzA, {
        Client: () => zKQ,
        Command: () => AEA,
        LazyJsonString: () => fh,
        NoOpLogger: () => VHQ,
        SENSITIVE_STRING: () => UKQ,
        ServiceException: () => eKQ,
        _json: () => Qe1,
        collectBody: () => rt1.collectBody,
        convertMap: () => CHQ,
        createAggregatedClient: () => wKQ,
        dateToUtcString: () => FEA,
        decorateServiceException: () => IEA,
        emitWarningIfUnsupportedVersion: () => ZHQ,
        expectBoolean: () => qKQ,
        expectByte: () => Be1,
        expectFloat32: () => ZE1,
        expectInt: () => LKQ,
        expectInt32: () => et1,
        expectLong: () => UQ1,
        expectNonNull: () => RKQ,
        expectNumber: () => EQ1,
        expectObject: () => BEA,
        expectShort: () => Ae1,
        expectString: () => OKQ,
        expectUnion: () => TKQ,
        extendedEncodeURIComponent: () => rt1.extendedEncodeURIComponent,
        getArrayIfSingleItem: () => JHQ,
        getDefaultClientConfiguration: () => YHQ,
        getDefaultExtensionConfiguration: () => WEA,
        getValueFromTextNode: () => JEA,
        handleFloat: () => jKQ,
        isSerializableHeaderValue: () => XHQ,
        limitedParseDouble: () => Ge1,
        limitedParseFloat: () => kKQ,
        limitedParseFloat32: () => yKQ,
        loadConfigsForDefaultMode: () => QHQ,
        logger: () => wQ1,
        map: () => Ie1,
        parseBoolean: () => $KQ,
        parseEpochTimestamp: () => lKQ,
        parseRfc3339DateTime: () => fKQ,
        parseRfc3339DateTimeWithOffset: () => gKQ,
        parseRfc7231DateTime: () => cKQ,
        quoteHeader: () => VEA,
        resolveDefaultRuntimeConfig: () => WHQ,
        resolvedPath: () => rt1.resolvedPath,
        serializeDateTime: () => wHQ,
        serializeFloat: () => UHQ,
        splitEvery: () => CEA,
        splitHeader: () => $HQ,
        strictParseByte: () => GEA,
        strictParseDouble: () => De1,
        strictParseFloat: () => PKQ,
        strictParseFloat32: () => QEA,
        strictParseInt: () => _KQ,
        strictParseInt32: () => xKQ,
        strictParseLong: () => DEA,
        strictParseShort: () => gi,
        take: () => KHQ,
        throwDefaultError: () => YEA,
        withBaseException: () => AHQ
    });
    KEA.exports = HKQ(tzA);
    var ezA = Vw(),
        zKQ = class {
            constructor(A) {
                this.config = A, this.middlewareStack = ezA.constructStack()
            }
            static {
                _2(this, "Client")
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
        rt1 = O6(),
        tt1 = st1(),
        AEA = class {
            constructor() {
                this.middlewareStack = ezA.constructStack()
            }
            static {
                _2(this, "Command")
            }
            static classBuilder() {
                return new EKQ
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
                        [tt1.SMITHY_CONTEXT_KEY]: {
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
        EKQ = class {
            constructor() {
                this._init = () => {}, this._ep = {}, this._middlewareFn = () => [], this._commandName = "", this._clientName = "", this._additionalContext = {}, this._smithyContext = {}, this._inputFilterSensitiveLog = (A) => A, this._outputFilterSensitiveLog = (A) => A, this._serializer = null, this._deserializer = null
            }
            static {
                _2(this, "ClassBuilder")
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
                return B = class extends AEA {
                    constructor(...[Q]) {
                        super();
                        this.serialize = A._serializer, this.deserialize = A._deserializer, this.input = Q ?? {}, A._init(this)
                    }
                    static {
                        _2(this, "CommandRef")
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
        UKQ = "***SensitiveInformation***",
        wKQ = _2((A, B) => {
            for (let Q of Object.keys(A)) {
                let Z = A[Q],
                    D = _2(async function(F, I, Y) {
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
        $KQ = _2((A) => {
            switch (A) {
                case "true":
                    return !0;
                case "false":
                    return !1;
                default:
                    throw new Error(`Unable to parse boolean value "${A}"`)
            }
        }, "parseBoolean"),
        qKQ = _2((A) => {
            if (A === null || A === void 0) return;
            if (typeof A === "number") {
                if (A === 0 || A === 1) wQ1.warn(DE1(`Expected boolean, got ${typeof A}: ${A}`));
                if (A === 0) return !1;
                if (A === 1) return !0
            }
            if (typeof A === "string") {
                let B = A.toLowerCase();
                if (B === "false" || B === "true") wQ1.warn(DE1(`Expected boolean, got ${typeof A}: ${A}`));
                if (B === "false") return !1;
                if (B === "true") return !0
            }
            if (typeof A === "boolean") return A;
            throw new TypeError(`Expected boolean, got ${typeof A}: ${A}`)
        }, "expectBoolean"),
        EQ1 = _2((A) => {
            if (A === null || A === void 0) return;
            if (typeof A === "string") {
                let B = parseFloat(A);
                if (!Number.isNaN(B)) {
                    if (String(B) !== String(A)) wQ1.warn(DE1(`Expected number but observed string: ${A}`));
                    return B
                }
            }
            if (typeof A === "number") return A;
            throw new TypeError(`Expected number, got ${typeof A}: ${A}`)
        }, "expectNumber"),
        NKQ = Math.ceil(340282346638528860000000000000000000000),
        ZE1 = _2((A) => {
            let B = EQ1(A);
            if (B !== void 0 && !Number.isNaN(B) && B !== 1 / 0 && B !== -1 / 0) {
                if (Math.abs(B) > NKQ) throw new TypeError(`Expected 32-bit float, got ${A}`)
            }
            return B
        }, "expectFloat32"),
        UQ1 = _2((A) => {
            if (A === null || A === void 0) return;
            if (Number.isInteger(A) && !Number.isNaN(A)) return A;
            throw new TypeError(`Expected integer, got ${typeof A}: ${A}`)
        }, "expectLong"),
        LKQ = UQ1,
        et1 = _2((A) => Ze1(A, 32), "expectInt32"),
        Ae1 = _2((A) => Ze1(A, 16), "expectShort"),
        Be1 = _2((A) => Ze1(A, 8), "expectByte"),
        Ze1 = _2((A, B) => {
            let Q = UQ1(A);
            if (Q !== void 0 && MKQ(Q, B) !== Q) throw new TypeError(`Expected ${B}-bit integer, got ${A}`);
            return Q
        }, "expectSizedInt"),
        MKQ = _2((A, B) => {
            switch (B) {
                case 32:
                    return Int32Array.of(A)[0];
                case 16:
                    return Int16Array.of(A)[0];
                case 8:
                    return Int8Array.of(A)[0]
            }
        }, "castInt"),
        RKQ = _2((A, B) => {
            if (A === null || A === void 0) {
                if (B) throw new TypeError(`Expected a non-null value for ${B}`);
                throw new TypeError("Expected a non-null value")
            }
            return A
        }, "expectNonNull"),
        BEA = _2((A) => {
            if (A === null || A === void 0) return;
            if (typeof A === "object" && !Array.isArray(A)) return A;
            let B = Array.isArray(A) ? "array" : typeof A;
            throw new TypeError(`Expected object, got ${B}: ${A}`)
        }, "expectObject"),
        OKQ = _2((A) => {
            if (A === null || A === void 0) return;
            if (typeof A === "string") return A;
            if (["boolean", "number", "bigint"].includes(typeof A)) return wQ1.warn(DE1(`Expected string, got ${typeof A}: ${A}`)), String(A);
            throw new TypeError(`Expected string, got ${typeof A}: ${A}`)
        }, "expectString"),
        TKQ = _2((A) => {
            if (A === null || A === void 0) return;
            let B = BEA(A),
                Q = Object.entries(B).filter(([, Z]) => Z != null).map(([Z]) => Z);
            if (Q.length === 0) throw new TypeError("Unions must have exactly one non-null member. None were found.");
            if (Q.length > 1) throw new TypeError(`Unions must have exactly one non-null member. Keys ${Q} were not null.`);
            return B
        }, "expectUnion"),
        De1 = _2((A) => {
            if (typeof A == "string") return EQ1(mi(A));
            return EQ1(A)
        }, "strictParseDouble"),
        PKQ = De1,
        QEA = _2((A) => {
            if (typeof A == "string") return ZE1(mi(A));
            return ZE1(A)
        }, "strictParseFloat32"),
        SKQ = /(-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?)|(-?Infinity)|(NaN)/g,
        mi = _2((A) => {
            let B = A.match(SKQ);
            if (B === null || B[0].length !== A.length) throw new TypeError("Expected real number, got implicit NaN");
            return parseFloat(A)
        }, "parseNumber"),
        Ge1 = _2((A) => {
            if (typeof A == "string") return ZEA(A);
            return EQ1(A)
        }, "limitedParseDouble"),
        jKQ = Ge1,
        kKQ = Ge1,
        yKQ = _2((A) => {
            if (typeof A == "string") return ZEA(A);
            return ZE1(A)
        }, "limitedParseFloat32"),
        ZEA = _2((A) => {
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
        DEA = _2((A) => {
            if (typeof A === "string") return UQ1(mi(A));
            return UQ1(A)
        }, "strictParseLong"),
        _KQ = DEA,
        xKQ = _2((A) => {
            if (typeof A === "string") return et1(mi(A));
            return et1(A)
        }, "strictParseInt32"),
        gi = _2((A) => {
            if (typeof A === "string") return Ae1(mi(A));
            return Ae1(A)
        }, "strictParseShort"),
        GEA = _2((A) => {
            if (typeof A === "string") return Be1(mi(A));
            return Be1(A)
        }, "strictParseByte"),
        DE1 = _2((A) => {
            return String(new TypeError(A).stack || A).split(`
`).slice(0, 5).filter((B) => !B.includes("stackTraceWarning")).join(`
`)
        }, "stackTraceWarning"),
        wQ1 = {
            warn: console.warn
        },
        vKQ = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        Fe1 = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    function FEA(A) {
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
        return `${vKQ[Z]}, ${Y} ${Fe1[Q]} ${B} ${W}:${J}:${X} GMT`
    }
    _2(FEA, "dateToUtcString");
    var bKQ = new RegExp(/^(\d{4})-(\d{2})-(\d{2})[tT](\d{2}):(\d{2}):(\d{2})(?:\.(\d+))?[zZ]$/),
        fKQ = _2((A) => {
            if (A === null || A === void 0) return;
            if (typeof A !== "string") throw new TypeError("RFC-3339 date-times must be expressed as strings");
            let B = bKQ.exec(A);
            if (!B) throw new TypeError("Invalid RFC-3339 date-time value");
            let [Q, Z, D, G, F, I, Y, W] = B, J = gi(ui(Z)), X = xN(D, "month", 1, 12), V = xN(G, "day", 1, 31);
            return zQ1(J, X, V, {
                hours: F,
                minutes: I,
                seconds: Y,
                fractionalMilliseconds: W
            })
        }, "parseRfc3339DateTime"),
        hKQ = new RegExp(/^(\d{4})-(\d{2})-(\d{2})[tT](\d{2}):(\d{2}):(\d{2})(?:\.(\d+))?(([-+]\d{2}\:\d{2})|[zZ])$/),
        gKQ = _2((A) => {
            if (A === null || A === void 0) return;
            if (typeof A !== "string") throw new TypeError("RFC-3339 date-times must be expressed as strings");
            let B = hKQ.exec(A);
            if (!B) throw new TypeError("Invalid RFC-3339 date-time value");
            let [Q, Z, D, G, F, I, Y, W, J] = B, X = gi(ui(Z)), V = xN(D, "month", 1, 12), C = xN(G, "day", 1, 31), K = zQ1(X, V, C, {
                hours: F,
                minutes: I,
                seconds: Y,
                fractionalMilliseconds: W
            });
            if (J.toUpperCase() != "Z") K.setTime(K.getTime() - tKQ(J));
            return K
        }, "parseRfc3339DateTimeWithOffset"),
        uKQ = new RegExp(/^(?:Mon|Tue|Wed|Thu|Fri|Sat|Sun), (\d{2}) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) (\d{4}) (\d{1,2}):(\d{2}):(\d{2})(?:\.(\d+))? GMT$/),
        mKQ = new RegExp(/^(?:Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday), (\d{2})-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)-(\d{2}) (\d{1,2}):(\d{2}):(\d{2})(?:\.(\d+))? GMT$/),
        dKQ = new RegExp(/^(?:Mon|Tue|Wed|Thu|Fri|Sat|Sun) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) ( [1-9]|\d{2}) (\d{1,2}):(\d{2}):(\d{2})(?:\.(\d+))? (\d{4})$/),
        cKQ = _2((A) => {
            if (A === null || A === void 0) return;
            if (typeof A !== "string") throw new TypeError("RFC-7231 date-times must be expressed as strings");
            let B = uKQ.exec(A);
            if (B) {
                let [Q, Z, D, G, F, I, Y, W] = B;
                return zQ1(gi(ui(G)), ot1(D), xN(Z, "day", 1, 31), {
                    hours: F,
                    minutes: I,
                    seconds: Y,
                    fractionalMilliseconds: W
                })
            }
            if (B = mKQ.exec(A), B) {
                let [Q, Z, D, G, F, I, Y, W] = B;
                return nKQ(zQ1(pKQ(G), ot1(D), xN(Z, "day", 1, 31), {
                    hours: F,
                    minutes: I,
                    seconds: Y,
                    fractionalMilliseconds: W
                }))
            }
            if (B = dKQ.exec(A), B) {
                let [Q, Z, D, G, F, I, Y, W] = B;
                return zQ1(gi(ui(W)), ot1(Z), xN(D.trimLeft(), "day", 1, 31), {
                    hours: G,
                    minutes: F,
                    seconds: I,
                    fractionalMilliseconds: Y
                })
            }
            throw new TypeError("Invalid RFC-7231 date-time value")
        }, "parseRfc7231DateTime"),
        lKQ = _2((A) => {
            if (A === null || A === void 0) return;
            let B;
            if (typeof A === "number") B = A;
            else if (typeof A === "string") B = De1(A);
            else if (typeof A === "object" && A.tag === 1) B = A.value;
            else throw new TypeError("Epoch timestamps must be expressed as floating point numbers or their string representation");
            if (Number.isNaN(B) || B === 1 / 0 || B === -1 / 0) throw new TypeError("Epoch timestamps must be valid, non-Infinite, non-NaN numerics");
            return new Date(Math.round(B * 1000))
        }, "parseEpochTimestamp"),
        zQ1 = _2((A, B, Q, Z) => {
            let D = B - 1;
            return sKQ(A, D, Q), new Date(Date.UTC(A, D, Q, xN(Z.hours, "hour", 0, 23), xN(Z.minutes, "minute", 0, 59), xN(Z.seconds, "seconds", 0, 60), oKQ(Z.fractionalMilliseconds)))
        }, "buildDate"),
        pKQ = _2((A) => {
            let B = new Date().getUTCFullYear(),
                Q = Math.floor(B / 100) * 100 + gi(ui(A));
            if (Q < B) return Q + 100;
            return Q
        }, "parseTwoDigitYear"),
        iKQ = 1576800000000,
        nKQ = _2((A) => {
            if (A.getTime() - new Date().getTime() > iKQ) return new Date(Date.UTC(A.getUTCFullYear() - 100, A.getUTCMonth(), A.getUTCDate(), A.getUTCHours(), A.getUTCMinutes(), A.getUTCSeconds(), A.getUTCMilliseconds()));
            return A
        }, "adjustRfc850Year"),
        ot1 = _2((A) => {
            let B = Fe1.indexOf(A);
            if (B < 0) throw new TypeError(`Invalid month: ${A}`);
            return B + 1
        }, "parseMonthByShortName"),
        aKQ = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
        sKQ = _2((A, B, Q) => {
            let Z = aKQ[B];
            if (B === 1 && rKQ(A)) Z = 29;
            if (Q > Z) throw new TypeError(`Invalid day for ${Fe1[B]} in ${A}: ${Q}`)
        }, "validateDayOfMonth"),
        rKQ = _2((A) => {
            return A % 4 === 0 && (A % 100 !== 0 || A % 400 === 0)
        }, "isLeapYear"),
        xN = _2((A, B, Q, Z) => {
            let D = GEA(ui(A));
            if (D < Q || D > Z) throw new TypeError(`${B} must be between ${Q} and ${Z}, inclusive`);
            return D
        }, "parseDateValue"),
        oKQ = _2((A) => {
            if (A === null || A === void 0) return 0;
            return QEA("0." + A) * 1000
        }, "parseMilliseconds"),
        tKQ = _2((A) => {
            let B = A[0],
                Q = 1;
            if (B == "+") Q = 1;
            else if (B == "-") Q = -1;
            else throw new TypeError(`Offset direction, ${B}, must be "+" or "-"`);
            let Z = Number(A.substring(1, 3)),
                D = Number(A.substring(4, 6));
            return Q * (Z * 60 + D) * 60 * 1000
        }, "parseOffsetToMilliseconds"),
        ui = _2((A) => {
            let B = 0;
            while (B < A.length - 1 && A.charAt(B) === "0") B++;
            if (B === 0) return A;
            return A.slice(B)
        }, "stripLeadingZeroes"),
        eKQ = class A extends Error {
            static {
                _2(this, "ServiceException")
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
        IEA = _2((A, B = {}) => {
            Object.entries(B).filter(([, Z]) => Z !== void 0).forEach(([Z, D]) => {
                if (A[Z] == null || A[Z] === "") A[Z] = D
            });
            let Q = A.message || A.Message || "UnknownError";
            return A.message = Q, delete A.Message, A
        }, "decorateServiceException"),
        YEA = _2(({
            output: A,
            parsedBody: B,
            exceptionCtor: Q,
            errorCode: Z
        }) => {
            let D = BHQ(A),
                G = D.httpStatusCode ? D.httpStatusCode + "" : void 0,
                F = new Q({
                    name: B?.code || B?.Code || Z || G || "UnknownError",
                    $fault: "client",
                    $metadata: D
                });
            throw IEA(F, B)
        }, "throwDefaultError"),
        AHQ = _2((A) => {
            return ({
                output: B,
                parsedBody: Q,
                errorCode: Z
            }) => {
                YEA({
                    output: B,
                    parsedBody: Q,
                    exceptionCtor: A,
                    errorCode: Z
                })
            }
        }, "withBaseException"),
        BHQ = _2((A) => ({
            httpStatusCode: A.statusCode,
            requestId: A.headers["x-amzn-requestid"] ?? A.headers["x-amzn-request-id"] ?? A.headers["x-amz-request-id"],
            extendedRequestId: A.headers["x-amz-id-2"],
            cfId: A.headers["x-amz-cf-id"]
        }), "deserializeMetadata"),
        QHQ = _2((A) => {
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
        ozA = !1,
        ZHQ = _2((A) => {
            if (A && !ozA && parseInt(A.substring(1, A.indexOf("."))) < 16) ozA = !0
        }, "emitWarningIfUnsupportedVersion"),
        DHQ = _2((A) => {
            let B = [];
            for (let Q in tt1.AlgorithmId) {
                let Z = tt1.AlgorithmId[Q];
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
        GHQ = _2((A) => {
            let B = {};
            return A.checksumAlgorithms().forEach((Q) => {
                B[Q.algorithmId()] = Q.checksumConstructor()
            }), B
        }, "resolveChecksumRuntimeConfig"),
        FHQ = _2((A) => {
            return {
                setRetryStrategy(B) {
                    A.retryStrategy = B
                },
                retryStrategy() {
                    return A.retryStrategy
                }
            }
        }, "getRetryConfiguration"),
        IHQ = _2((A) => {
            let B = {};
            return B.retryStrategy = A.retryStrategy(), B
        }, "resolveRetryRuntimeConfig"),
        WEA = _2((A) => {
            return Object.assign(DHQ(A), FHQ(A))
        }, "getDefaultExtensionConfiguration"),
        YHQ = WEA,
        WHQ = _2((A) => {
            return Object.assign(GHQ(A), IHQ(A))
        }, "resolveDefaultRuntimeConfig"),
        JHQ = _2((A) => Array.isArray(A) ? A : [A], "getArrayIfSingleItem"),
        JEA = _2((A) => {
            for (let Q in A)
                if (A.hasOwnProperty(Q) && A[Q]["#text"] !== void 0) A[Q] = A[Q]["#text"];
                else if (typeof A[Q] === "object" && A[Q] !== null) A[Q] = JEA(A[Q]);
            return A
        }, "getValueFromTextNode"),
        XHQ = _2((A) => {
            return A != null
        }, "isSerializableHeaderValue"),
        fh = _2(function A(B) {
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
    fh.from = (A) => {
        if (A && typeof A === "object" && (A instanceof fh || ("deserializeJSON" in A))) return A;
        else if (typeof A === "string" || Object.getPrototypeOf(A) === String.prototype) return fh(String(A));
        return fh(JSON.stringify(A))
    };
    fh.fromObject = fh.from;
    var VHQ = class {
        static {
            _2(this, "NoOpLogger")
        }
        trace() {}
        debug() {}
        info() {}
        warn() {}
        error() {}
    };

    function Ie1(A, B, Q) {
        let Z, D, G;
        if (typeof B === "undefined" && typeof Q === "undefined") Z = {}, G = A;
        else if (Z = A, typeof B === "function") return D = B, G = Q, HHQ(Z, D, G);
        else G = B;
        for (let F of Object.keys(G)) {
            if (!Array.isArray(G[F])) {
                Z[F] = G[F];
                continue
            }
            XEA(Z, null, G, F)
        }
        return Z
    }
    _2(Ie1, "map");
    var CHQ = _2((A) => {
            let B = {};
            for (let [Q, Z] of Object.entries(A || {})) B[Q] = [, Z];
            return B
        }, "convertMap"),
        KHQ = _2((A, B) => {
            let Q = {};
            for (let Z in B) XEA(Q, A, B, Z);
            return Q
        }, "take"),
        HHQ = _2((A, B, Q) => {
            return Ie1(A, Object.entries(Q).reduce((Z, [D, G]) => {
                if (Array.isArray(G)) Z[D] = G;
                else if (typeof G === "function") Z[D] = [B, G()];
                else Z[D] = [B, G];
                return Z
            }, {}))
        }, "mapWithFilter"),
        XEA = _2((A, B, Q, Z) => {
            if (B !== null) {
                let F = Q[Z];
                if (typeof F === "function") F = [, F];
                let [I = zHQ, Y = EHQ, W = Z] = F;
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
        zHQ = _2((A) => A != null, "nonNullish"),
        EHQ = _2((A) => A, "pass");

    function VEA(A) {
        if (A.includes(",") || A.includes('"')) A = `"${A.replace(/"/g,"\\\"")}"`;
        return A
    }
    _2(VEA, "quoteHeader");
    var UHQ = _2((A) => {
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
        wHQ = _2((A) => A.toISOString().replace(".000Z", "Z"), "serializeDateTime"),
        Qe1 = _2((A) => {
            if (A == null) return {};
            if (Array.isArray(A)) return A.filter((B) => B != null).map(Qe1);
            if (typeof A === "object") {
                let B = {};
                for (let Q of Object.keys(A)) {
                    if (A[Q] == null) continue;
                    B[Q] = Qe1(A[Q])
                }
                return B
            }
            return A
        }, "_json");

    function CEA(A, B, Q) {
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
    _2(CEA, "splitEvery");
    var $HQ = _2((A) => {
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