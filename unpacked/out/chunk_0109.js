/* chunk:109 bytes:[2535484, 2569424) size:33940 source:unpacked-cli.js */
var XD = E((bQ5, CwA) => {
    var {
        defineProperty: qE1,
        getOwnPropertyDescriptor: CEQ,
        getOwnPropertyNames: KEQ
    } = Object, HEQ = Object.prototype.hasOwnProperty, x2 = (A, B) => qE1(A, "name", {
        value: B,
        configurable: !0
    }), zEQ = (A, B) => {
        for (var Q in B) qE1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, EEQ = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of KEQ(B))
                if (!HEQ.call(A, D) && D !== Q) qE1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = CEQ(B, D)) || Z.enumerable
                })
        }
        return A
    }, UEQ = (A) => EEQ(qE1({}, "__esModule", {
        value: !0
    }), A), oUA = {};
    zEQ(oUA, {
        Client: () => wEQ,
        Command: () => eUA,
        LazyJsonString: () => hh,
        NoOpLogger: () => HUQ,
        SENSITIVE_STRING: () => qEQ,
        ServiceException: () => QUQ,
        _json: () => Ne1,
        collectBody: () => ze1.collectBody,
        convertMap: () => zUQ,
        createAggregatedClient: () => NEQ,
        dateToUtcString: () => GwA,
        decorateServiceException: () => FwA,
        emitWarningIfUnsupportedVersion: () => FUQ,
        expectBoolean: () => MEQ,
        expectByte: () => qe1,
        expectFloat32: () => wE1,
        expectInt: () => OEQ,
        expectInt32: () => we1,
        expectLong: () => TQ1,
        expectNonNull: () => PEQ,
        expectNumber: () => OQ1,
        expectObject: () => AwA,
        expectShort: () => $e1,
        expectString: () => SEQ,
        expectUnion: () => jEQ,
        extendedEncodeURIComponent: () => ze1.extendedEncodeURIComponent,
        getArrayIfSingleItem: () => CUQ,
        getDefaultClientConfiguration: () => XUQ,
        getDefaultExtensionConfiguration: () => YwA,
        getValueFromTextNode: () => WwA,
        handleFloat: () => _EQ,
        isSerializableHeaderValue: () => KUQ,
        limitedParseDouble: () => Re1,
        limitedParseFloat: () => xEQ,
        limitedParseFloat32: () => vEQ,
        loadConfigsForDefaultMode: () => GUQ,
        logger: () => PQ1,
        map: () => Te1,
        parseBoolean: () => LEQ,
        parseEpochTimestamp: () => nEQ,
        parseRfc3339DateTime: () => uEQ,
        parseRfc3339DateTimeWithOffset: () => dEQ,
        parseRfc7231DateTime: () => iEQ,
        quoteHeader: () => XwA,
        resolveDefaultRuntimeConfig: () => VUQ,
        resolvedPath: () => ze1.resolvedPath,
        serializeDateTime: () => NUQ,
        serializeFloat: () => qUQ,
        splitEvery: () => VwA,
        splitHeader: () => LUQ,
        strictParseByte: () => DwA,
        strictParseDouble: () => Me1,
        strictParseFloat: () => kEQ,
        strictParseFloat32: () => BwA,
        strictParseInt: () => bEQ,
        strictParseInt32: () => fEQ,
        strictParseLong: () => ZwA,
        strictParseShort: () => ni,
        take: () => EUQ,
        throwDefaultError: () => IwA,
        withBaseException: () => ZUQ
    });
    CwA.exports = UEQ(oUA);
    var tUA = Vw(),
        wEQ = class {
            constructor(A) {
                this.config = A, this.middlewareStack = tUA.constructStack()
            }
            static {
                x2(this, "Client")
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
        ze1 = O6(),
        Ue1 = He1(),
        eUA = class {
            constructor() {
                this.middlewareStack = tUA.constructStack()
            }
            static {
                x2(this, "Command")
            }
            static classBuilder() {
                return new $EQ
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
                        [Ue1.SMITHY_CONTEXT_KEY]: {
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
        $EQ = class {
            constructor() {
                this._init = () => {}, this._ep = {}, this._middlewareFn = () => [], this._commandName = "", this._clientName = "", this._additionalContext = {}, this._smithyContext = {}, this._inputFilterSensitiveLog = (A) => A, this._outputFilterSensitiveLog = (A) => A, this._serializer = null, this._deserializer = null
            }
            static {
                x2(this, "ClassBuilder")
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
                return B = class extends eUA {
                    constructor(...[Q]) {
                        super();
                        this.serialize = A._serializer, this.deserialize = A._deserializer, this.input = Q ?? {}, A._init(this)
                    }
                    static {
                        x2(this, "CommandRef")
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
        qEQ = "***SensitiveInformation***",
        NEQ = x2((A, B) => {
            for (let Q of Object.keys(A)) {
                let Z = A[Q],
                    D = x2(async function(F, I, Y) {
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
        LEQ = x2((A) => {
            switch (A) {
                case "true":
                    return !0;
                case "false":
                    return !1;
                default:
                    throw new Error(`Unable to parse boolean value "${A}"`)
            }
        }, "parseBoolean"),
        MEQ = x2((A) => {
            if (A === null || A === void 0) return;
            if (typeof A === "number") {
                if (A === 0 || A === 1) PQ1.warn($E1(`Expected boolean, got ${typeof A}: ${A}`));
                if (A === 0) return !1;
                if (A === 1) return !0
            }
            if (typeof A === "string") {
                let B = A.toLowerCase();
                if (B === "false" || B === "true") PQ1.warn($E1(`Expected boolean, got ${typeof A}: ${A}`));
                if (B === "false") return !1;
                if (B === "true") return !0
            }
            if (typeof A === "boolean") return A;
            throw new TypeError(`Expected boolean, got ${typeof A}: ${A}`)
        }, "expectBoolean"),
        OQ1 = x2((A) => {
            if (A === null || A === void 0) return;
            if (typeof A === "string") {
                let B = parseFloat(A);
                if (!Number.isNaN(B)) {
                    if (String(B) !== String(A)) PQ1.warn($E1(`Expected number but observed string: ${A}`));
                    return B
                }
            }
            if (typeof A === "number") return A;
            throw new TypeError(`Expected number, got ${typeof A}: ${A}`)
        }, "expectNumber"),
        REQ = Math.ceil(340282346638528860000000000000000000000),
        wE1 = x2((A) => {
            let B = OQ1(A);
            if (B !== void 0 && !Number.isNaN(B) && B !== 1 / 0 && B !== -1 / 0) {
                if (Math.abs(B) > REQ) throw new TypeError(`Expected 32-bit float, got ${A}`)
            }
            return B
        }, "expectFloat32"),
        TQ1 = x2((A) => {
            if (A === null || A === void 0) return;
            if (Number.isInteger(A) && !Number.isNaN(A)) return A;
            throw new TypeError(`Expected integer, got ${typeof A}: ${A}`)
        }, "expectLong"),
        OEQ = TQ1,
        we1 = x2((A) => Le1(A, 32), "expectInt32"),
        $e1 = x2((A) => Le1(A, 16), "expectShort"),
        qe1 = x2((A) => Le1(A, 8), "expectByte"),
        Le1 = x2((A, B) => {
            let Q = TQ1(A);
            if (Q !== void 0 && TEQ(Q, B) !== Q) throw new TypeError(`Expected ${B}-bit integer, got ${A}`);
            return Q
        }, "expectSizedInt"),
        TEQ = x2((A, B) => {
            switch (B) {
                case 32:
                    return Int32Array.of(A)[0];
                case 16:
                    return Int16Array.of(A)[0];
                case 8:
                    return Int8Array.of(A)[0]
            }
        }, "castInt"),
        PEQ = x2((A, B) => {
            if (A === null || A === void 0) {
                if (B) throw new TypeError(`Expected a non-null value for ${B}`);
                throw new TypeError("Expected a non-null value")
            }
            return A
        }, "expectNonNull"),
        AwA = x2((A) => {
            if (A === null || A === void 0) return;
            if (typeof A === "object" && !Array.isArray(A)) return A;
            let B = Array.isArray(A) ? "array" : typeof A;
            throw new TypeError(`Expected object, got ${B}: ${A}`)
        }, "expectObject"),
        SEQ = x2((A) => {
            if (A === null || A === void 0) return;
            if (typeof A === "string") return A;
            if (["boolean", "number", "bigint"].includes(typeof A)) return PQ1.warn($E1(`Expected string, got ${typeof A}: ${A}`)), String(A);
            throw new TypeError(`Expected string, got ${typeof A}: ${A}`)
        }, "expectString"),
        jEQ = x2((A) => {
            if (A === null || A === void 0) return;
            let B = AwA(A),
                Q = Object.entries(B).filter(([, Z]) => Z != null).map(([Z]) => Z);
            if (Q.length === 0) throw new TypeError("Unions must have exactly one non-null member. None were found.");
            if (Q.length > 1) throw new TypeError(`Unions must have exactly one non-null member. Keys ${Q} were not null.`);
            return B
        }, "expectUnion"),
        Me1 = x2((A) => {
            if (typeof A == "string") return OQ1(si(A));
            return OQ1(A)
        }, "strictParseDouble"),
        kEQ = Me1,
        BwA = x2((A) => {
            if (typeof A == "string") return wE1(si(A));
            return wE1(A)
        }, "strictParseFloat32"),
        yEQ = /(-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?)|(-?Infinity)|(NaN)/g,
        si = x2((A) => {
            let B = A.match(yEQ);
            if (B === null || B[0].length !== A.length) throw new TypeError("Expected real number, got implicit NaN");
            return parseFloat(A)
        }, "parseNumber"),
        Re1 = x2((A) => {
            if (typeof A == "string") return QwA(A);
            return OQ1(A)
        }, "limitedParseDouble"),
        _EQ = Re1,
        xEQ = Re1,
        vEQ = x2((A) => {
            if (typeof A == "string") return QwA(A);
            return wE1(A)
        }, "limitedParseFloat32"),
        QwA = x2((A) => {
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
        ZwA = x2((A) => {
            if (typeof A === "string") return TQ1(si(A));
            return TQ1(A)
        }, "strictParseLong"),
        bEQ = ZwA,
        fEQ = x2((A) => {
            if (typeof A === "string") return we1(si(A));
            return we1(A)
        }, "strictParseInt32"),
        ni = x2((A) => {
            if (typeof A === "string") return $e1(si(A));
            return $e1(A)
        }, "strictParseShort"),
        DwA = x2((A) => {
            if (typeof A === "string") return qe1(si(A));
            return qe1(A)
        }, "strictParseByte"),
        $E1 = x2((A) => {
            return String(new TypeError(A).stack || A).split(`
`).slice(0, 5).filter((B) => !B.includes("stackTraceWarning")).join(`
`)
        }, "stackTraceWarning"),
        PQ1 = {
            warn: console.warn
        },
        hEQ = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        Oe1 = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    function GwA(A) {
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
        return `${hEQ[Z]}, ${Y} ${Oe1[Q]} ${B} ${W}:${J}:${X} GMT`
    }
    x2(GwA, "dateToUtcString");
    var gEQ = new RegExp(/^(\d{4})-(\d{2})-(\d{2})[tT](\d{2}):(\d{2}):(\d{2})(?:\.(\d+))?[zZ]$/),
        uEQ = x2((A) => {
            if (A === null || A === void 0) return;
            if (typeof A !== "string") throw new TypeError("RFC-3339 date-times must be expressed as strings");
            let B = gEQ.exec(A);
            if (!B) throw new TypeError("Invalid RFC-3339 date-time value");
            let [Q, Z, D, G, F, I, Y, W] = B, J = ni(ai(Z)), X = bN(D, "month", 1, 12), V = bN(G, "day", 1, 31);
            return RQ1(J, X, V, {
                hours: F,
                minutes: I,
                seconds: Y,
                fractionalMilliseconds: W
            })
        }, "parseRfc3339DateTime"),
        mEQ = new RegExp(/^(\d{4})-(\d{2})-(\d{2})[tT](\d{2}):(\d{2}):(\d{2})(?:\.(\d+))?(([-+]\d{2}\:\d{2})|[zZ])$/),
        dEQ = x2((A) => {
            if (A === null || A === void 0) return;
            if (typeof A !== "string") throw new TypeError("RFC-3339 date-times must be expressed as strings");
            let B = mEQ.exec(A);
            if (!B) throw new TypeError("Invalid RFC-3339 date-time value");
            let [Q, Z, D, G, F, I, Y, W, J] = B, X = ni(ai(Z)), V = bN(D, "month", 1, 12), C = bN(G, "day", 1, 31), K = RQ1(X, V, C, {
                hours: F,
                minutes: I,
                seconds: Y,
                fractionalMilliseconds: W
            });
            if (J.toUpperCase() != "Z") K.setTime(K.getTime() - BUQ(J));
            return K
        }, "parseRfc3339DateTimeWithOffset"),
        cEQ = new RegExp(/^(?:Mon|Tue|Wed|Thu|Fri|Sat|Sun), (\d{2}) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) (\d{4}) (\d{1,2}):(\d{2}):(\d{2})(?:\.(\d+))? GMT$/),
        lEQ = new RegExp(/^(?:Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday), (\d{2})-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)-(\d{2}) (\d{1,2}):(\d{2}):(\d{2})(?:\.(\d+))? GMT$/),
        pEQ = new RegExp(/^(?:Mon|Tue|Wed|Thu|Fri|Sat|Sun) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) ( [1-9]|\d{2}) (\d{1,2}):(\d{2}):(\d{2})(?:\.(\d+))? (\d{4})$/),
        iEQ = x2((A) => {
            if (A === null || A === void 0) return;
            if (typeof A !== "string") throw new TypeError("RFC-7231 date-times must be expressed as strings");
            let B = cEQ.exec(A);
            if (B) {
                let [Q, Z, D, G, F, I, Y, W] = B;
                return RQ1(ni(ai(G)), Ee1(D), bN(Z, "day", 1, 31), {
                    hours: F,
                    minutes: I,
                    seconds: Y,
                    fractionalMilliseconds: W
                })
            }
            if (B = lEQ.exec(A), B) {
                let [Q, Z, D, G, F, I, Y, W] = B;
                return rEQ(RQ1(aEQ(G), Ee1(D), bN(Z, "day", 1, 31), {
                    hours: F,
                    minutes: I,
                    seconds: Y,
                    fractionalMilliseconds: W
                }))
            }
            if (B = pEQ.exec(A), B) {
                let [Q, Z, D, G, F, I, Y, W] = B;
                return RQ1(ni(ai(W)), Ee1(Z), bN(D.trimLeft(), "day", 1, 31), {
                    hours: G,
                    minutes: F,
                    seconds: I,
                    fractionalMilliseconds: Y
                })
            }
            throw new TypeError("Invalid RFC-7231 date-time value")
        }, "parseRfc7231DateTime"),
        nEQ = x2((A) => {
            if (A === null || A === void 0) return;
            let B;
            if (typeof A === "number") B = A;
            else if (typeof A === "string") B = Me1(A);
            else if (typeof A === "object" && A.tag === 1) B = A.value;
            else throw new TypeError("Epoch timestamps must be expressed as floating point numbers or their string representation");
            if (Number.isNaN(B) || B === 1 / 0 || B === -1 / 0) throw new TypeError("Epoch timestamps must be valid, non-Infinite, non-NaN numerics");
            return new Date(Math.round(B * 1000))
        }, "parseEpochTimestamp"),
        RQ1 = x2((A, B, Q, Z) => {
            let D = B - 1;
            return tEQ(A, D, Q), new Date(Date.UTC(A, D, Q, bN(Z.hours, "hour", 0, 23), bN(Z.minutes, "minute", 0, 59), bN(Z.seconds, "seconds", 0, 60), AUQ(Z.fractionalMilliseconds)))
        }, "buildDate"),
        aEQ = x2((A) => {
            let B = new Date().getUTCFullYear(),
                Q = Math.floor(B / 100) * 100 + ni(ai(A));
            if (Q < B) return Q + 100;
            return Q
        }, "parseTwoDigitYear"),
        sEQ = 1576800000000,
        rEQ = x2((A) => {
            if (A.getTime() - new Date().getTime() > sEQ) return new Date(Date.UTC(A.getUTCFullYear() - 100, A.getUTCMonth(), A.getUTCDate(), A.getUTCHours(), A.getUTCMinutes(), A.getUTCSeconds(), A.getUTCMilliseconds()));
            return A
        }, "adjustRfc850Year"),
        Ee1 = x2((A) => {
            let B = Oe1.indexOf(A);
            if (B < 0) throw new TypeError(`Invalid month: ${A}`);
            return B + 1
        }, "parseMonthByShortName"),
        oEQ = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
        tEQ = x2((A, B, Q) => {
            let Z = oEQ[B];
            if (B === 1 && eEQ(A)) Z = 29;
            if (Q > Z) throw new TypeError(`Invalid day for ${Oe1[B]} in ${A}: ${Q}`)
        }, "validateDayOfMonth"),
        eEQ = x2((A) => {
            return A % 4 === 0 && (A % 100 !== 0 || A % 400 === 0)
        }, "isLeapYear"),
        bN = x2((A, B, Q, Z) => {
            let D = DwA(ai(A));
            if (D < Q || D > Z) throw new TypeError(`${B} must be between ${Q} and ${Z}, inclusive`);
            return D
        }, "parseDateValue"),
        AUQ = x2((A) => {
            if (A === null || A === void 0) return 0;
            return BwA("0." + A) * 1000
        }, "parseMilliseconds"),
        BUQ = x2((A) => {
            let B = A[0],
                Q = 1;
            if (B == "+") Q = 1;
            else if (B == "-") Q = -1;
            else throw new TypeError(`Offset direction, ${B}, must be "+" or "-"`);
            let Z = Number(A.substring(1, 3)),
                D = Number(A.substring(4, 6));
            return Q * (Z * 60 + D) * 60 * 1000
        }, "parseOffsetToMilliseconds"),
        ai = x2((A) => {
            let B = 0;
            while (B < A.length - 1 && A.charAt(B) === "0") B++;
            if (B === 0) return A;
            return A.slice(B)
        }, "stripLeadingZeroes"),
        QUQ = class A extends Error {
            static {
                x2(this, "ServiceException")
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
        FwA = x2((A, B = {}) => {
            Object.entries(B).filter(([, Z]) => Z !== void 0).forEach(([Z, D]) => {
                if (A[Z] == null || A[Z] === "") A[Z] = D
            });
            let Q = A.message || A.Message || "UnknownError";
            return A.message = Q, delete A.Message, A
        }, "decorateServiceException"),
        IwA = x2(({
            output: A,
            parsedBody: B,
            exceptionCtor: Q,
            errorCode: Z
        }) => {
            let D = DUQ(A),
                G = D.httpStatusCode ? D.httpStatusCode + "" : void 0,
                F = new Q({
                    name: B?.code || B?.Code || Z || G || "UnknownError",
                    $fault: "client",
                    $metadata: D
                });
            throw FwA(F, B)
        }, "throwDefaultError"),
        ZUQ = x2((A) => {
            return ({
                output: B,
                parsedBody: Q,
                errorCode: Z
            }) => {
                IwA({
                    output: B,
                    parsedBody: Q,
                    exceptionCtor: A,
                    errorCode: Z
                })
            }
        }, "withBaseException"),
        DUQ = x2((A) => ({
            httpStatusCode: A.statusCode,
            requestId: A.headers["x-amzn-requestid"] ?? A.headers["x-amzn-request-id"] ?? A.headers["x-amz-request-id"],
            extendedRequestId: A.headers["x-amz-id-2"],
            cfId: A.headers["x-amz-cf-id"]
        }), "deserializeMetadata"),
        GUQ = x2((A) => {
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
        rUA = !1,
        FUQ = x2((A) => {
            if (A && !rUA && parseInt(A.substring(1, A.indexOf("."))) < 16) rUA = !0
        }, "emitWarningIfUnsupportedVersion"),
        IUQ = x2((A) => {
            let B = [];
            for (let Q in Ue1.AlgorithmId) {
                let Z = Ue1.AlgorithmId[Q];
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
        YUQ = x2((A) => {
            let B = {};
            return A.checksumAlgorithms().forEach((Q) => {
                B[Q.algorithmId()] = Q.checksumConstructor()
            }), B
        }, "resolveChecksumRuntimeConfig"),
        WUQ = x2((A) => {
            return {
                setRetryStrategy(B) {
                    A.retryStrategy = B
                },
                retryStrategy() {
                    return A.retryStrategy
                }
            }
        }, "getRetryConfiguration"),
        JUQ = x2((A) => {
            let B = {};
            return B.retryStrategy = A.retryStrategy(), B
        }, "resolveRetryRuntimeConfig"),
        YwA = x2((A) => {
            return Object.assign(IUQ(A), WUQ(A))
        }, "getDefaultExtensionConfiguration"),
        XUQ = YwA,
        VUQ = x2((A) => {
            return Object.assign(YUQ(A), JUQ(A))
        }, "resolveDefaultRuntimeConfig"),
        CUQ = x2((A) => Array.isArray(A) ? A : [A], "getArrayIfSingleItem"),
        WwA = x2((A) => {
            for (let Q in A)
                if (A.hasOwnProperty(Q) && A[Q]["#text"] !== void 0) A[Q] = A[Q]["#text"];
                else if (typeof A[Q] === "object" && A[Q] !== null) A[Q] = WwA(A[Q]);
            return A
        }, "getValueFromTextNode"),
        KUQ = x2((A) => {
            return A != null
        }, "isSerializableHeaderValue"),
        hh = x2(function A(B) {
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
    hh.from = (A) => {
        if (A && typeof A === "object" && (A instanceof hh || ("deserializeJSON" in A))) return A;
        else if (typeof A === "string" || Object.getPrototypeOf(A) === String.prototype) return hh(String(A));
        return hh(JSON.stringify(A))
    };
    hh.fromObject = hh.from;
    var HUQ = class {
        static {
            x2(this, "NoOpLogger")
        }
        trace() {}
        debug() {}
        info() {}
        warn() {}
        error() {}
    };

    function Te1(A, B, Q) {
        let Z, D, G;
        if (typeof B === "undefined" && typeof Q === "undefined") Z = {}, G = A;
        else if (Z = A, typeof B === "function") return D = B, G = Q, UUQ(Z, D, G);
        else G = B;
        for (let F of Object.keys(G)) {
            if (!Array.isArray(G[F])) {
                Z[F] = G[F];
                continue
            }
            JwA(Z, null, G, F)
        }
        return Z
    }
    x2(Te1, "map");
    var zUQ = x2((A) => {
            let B = {};
            for (let [Q, Z] of Object.entries(A || {})) B[Q] = [, Z];
            return B
        }, "convertMap"),
        EUQ = x2((A, B) => {
            let Q = {};
            for (let Z in B) JwA(Q, A, B, Z);
            return Q
        }, "take"),
        UUQ = x2((A, B, Q) => {
            return Te1(A, Object.entries(Q).reduce((Z, [D, G]) => {
                if (Array.isArray(G)) Z[D] = G;
                else if (typeof G === "function") Z[D] = [B, G()];
                else Z[D] = [B, G];
                return Z
            }, {}))
        }, "mapWithFilter"),
        JwA = x2((A, B, Q, Z) => {
            if (B !== null) {
                let F = Q[Z];
                if (typeof F === "function") F = [, F];
                let [I = wUQ, Y = $UQ, W = Z] = F;
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
        wUQ = x2((A) => A != null, "nonNullish"),
        $UQ = x2((A) => A, "pass");

    function XwA(A) {
        if (A.includes(",") || A.includes('"')) A = `"${A.replace(/"/g,"\\\"")}"`;
        return A
    }
    x2(XwA, "quoteHeader");
    var qUQ = x2((A) => {
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
        NUQ = x2((A) => A.toISOString().replace(".000Z", "Z"), "serializeDateTime"),
        Ne1 = x2((A) => {
            if (A == null) return {};
            if (Array.isArray(A)) return A.filter((B) => B != null).map(Ne1);
            if (typeof A === "object") {
                let B = {};
                for (let Q of Object.keys(A)) {
                    if (A[Q] == null) continue;
                    B[Q] = Ne1(A[Q])
                }
                return B
            }
            return A
        }, "_json");

    function VwA(A, B, Q) {
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
    x2(VwA, "splitEvery");
    var LUQ = x2((A) => {
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