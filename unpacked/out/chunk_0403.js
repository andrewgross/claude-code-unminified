/* chunk:403 bytes:[9379033, 9411746) size:32713 source:unpacked-cli.js */
var fXB = E((oQ3, bXB) => {
    var {
        defineProperty: H_1,
        getOwnPropertyDescriptor: Ec6,
        getOwnPropertyNames: Uc6
    } = Object, wc6 = Object.prototype.hasOwnProperty, v2 = (A, B) => H_1(A, "name", {
        value: B,
        configurable: !0
    }), $c6 = (A, B) => {
        for (var Q in B) H_1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, qc6 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of Uc6(B))
                if (!wc6.call(A, D) && D !== Q) H_1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = Ec6(B, D)) || Z.enumerable
                })
        }
        return A
    }, Nc6 = (A) => qc6(H_1({}, "__esModule", {
        value: !0
    }), A), HXB = {};
    $c6(HXB, {
        Client: () => Mc6,
        Command: () => $XB,
        LazyJsonString: () => $l6,
        NoOpLogger: () => Lc6,
        SENSITIVE_STRING: () => Tc6,
        ServiceException: () => Yl6,
        StringWrapper: () => RD1,
        _json: () => TE0,
        collectBody: () => Rc6,
        convertMap: () => ql6,
        createAggregatedClient: () => Pc6,
        dateToUtcString: () => TXB,
        decorateServiceException: () => SXB,
        emitWarningIfUnsupportedVersion: () => Vl6,
        expectBoolean: () => jc6,
        expectByte: () => OE0,
        expectFloat32: () => V_1,
        expectInt: () => yc6,
        expectInt32: () => ME0,
        expectLong: () => LD1,
        expectNonNull: () => xc6,
        expectNumber: () => ND1,
        expectObject: () => NXB,
        expectShort: () => RE0,
        expectString: () => vc6,
        expectUnion: () => bc6,
        extendedEncodeURIComponent: () => K_1,
        getArrayIfSingleItem: () => wl6,
        getDefaultClientConfiguration: () => El6,
        getDefaultExtensionConfiguration: () => kXB,
        getValueFromTextNode: () => yXB,
        handleFloat: () => gc6,
        limitedParseDouble: () => jE0,
        limitedParseFloat: () => uc6,
        limitedParseFloat32: () => mc6,
        loadConfigsForDefaultMode: () => Xl6,
        logger: () => MD1,
        map: () => yE0,
        parseBoolean: () => Sc6,
        parseEpochTimestamp: () => ec6,
        parseRfc3339DateTime: () => ic6,
        parseRfc3339DateTimeWithOffset: () => ac6,
        parseRfc7231DateTime: () => tc6,
        resolveDefaultRuntimeConfig: () => Ul6,
        resolvedPath: () => Ol6,
        serializeFloat: () => Tl6,
        splitEvery: () => vXB,
        strictParseByte: () => OXB,
        strictParseDouble: () => SE0,
        strictParseFloat: () => fc6,
        strictParseFloat32: () => LXB,
        strictParseInt: () => dc6,
        strictParseInt32: () => cc6,
        strictParseLong: () => RXB,
        strictParseShort: () => A11,
        take: () => Nl6,
        throwDefaultError: () => jXB,
        withBaseException: () => Wl6
    });
    bXB.exports = Nc6(HXB);
    var zXB = class A {
        trace() {}
        debug() {}
        info() {}
        warn() {}
        error() {}
    };
    v2(zXB, "NoOpLogger");
    var Lc6 = zXB,
        EXB = UJB(),
        UXB = class A {
            constructor(B) {
                this.middlewareStack = EXB.constructStack(), this.config = B
            }
            send(B, Q, Z) {
                let D = typeof Q !== "function" ? Q : void 0,
                    G = typeof Q === "function" ? Q : Z,
                    F = B.resolveMiddleware(this.middlewareStack, this.config, D);
                if (G) F(B).then((I) => G(null, I.output), (I) => G(I)).catch(() => {});
                else return F(B).then((I) => I.output)
            }
            destroy() {
                if (this.config.requestHandler.destroy) this.config.requestHandler.destroy()
            }
        };
    v2(UXB, "Client");
    var Mc6 = UXB,
        qE0 = CXB(),
        Rc6 = v2(async (A = new Uint8Array, B) => {
            if (A instanceof Uint8Array) return qE0.Uint8ArrayBlobAdapter.mutate(A);
            if (!A) return qE0.Uint8ArrayBlobAdapter.mutate(new Uint8Array);
            let Q = B.streamCollector(A);
            return qE0.Uint8ArrayBlobAdapter.mutate(await Q)
        }, "collectBody"),
        LE0 = bz0(),
        wXB = class A {
            constructor() {
                this.middlewareStack = EXB.constructStack()
            }
            static classBuilder() {
                return new Oc6
            }
            resolveMiddlewareWithContext(B, Q, Z, {
                middlewareFn: D,
                clientName: G,
                commandName: F,
                inputFilterSensitiveLog: I,
                outputFilterSensitiveLog: Y,
                smithyContext: W,
                additionalContext: J,
                CommandCtor: X
            }) {
                for (let z of D.bind(this)(X, B, Q, Z)) this.middlewareStack.use(z);
                let V = B.concat(this.middlewareStack),
                    {
                        logger: C
                    } = Q,
                    K = {
                        logger: C,
                        clientName: G,
                        commandName: F,
                        inputFilterSensitiveLog: I,
                        outputFilterSensitiveLog: Y,
                        [LE0.SMITHY_CONTEXT_KEY]: {
                            ...W
                        },
                        ...J
                    },
                    {
                        requestHandler: H
                    } = Q;
                return V.resolve((z) => H.handle(z.request, Z || {}), K)
            }
        };
    v2(wXB, "Command");
    var $XB = wXB,
        qXB = class A {
            constructor() {
                this._init = () => {}, this._ep = {}, this._middlewareFn = () => [], this._commandName = "", this._clientName = "", this._additionalContext = {}, this._smithyContext = {}, this._inputFilterSensitiveLog = (B) => B, this._outputFilterSensitiveLog = (B) => B, this._serializer = null, this._deserializer = null
            }
            init(B) {
                this._init = B
            }
            ep(B) {
                return this._ep = B, this
            }
            m(B) {
                return this._middlewareFn = B, this
            }
            s(B, Q, Z = {}) {
                return this._smithyContext = {
                    service: B,
                    operation: Q,
                    ...Z
                }, this
            }
            c(B = {}) {
                return this._additionalContext = B, this
            }
            n(B, Q) {
                return this._clientName = B, this._commandName = Q, this
            }
            f(B = (Z) => Z, Q = (Z) => Z) {
                return this._inputFilterSensitiveLog = B, this._outputFilterSensitiveLog = Q, this
            }
            ser(B) {
                return this._serializer = B, this
            }
            de(B) {
                return this._deserializer = B, this
            }
            build() {
                var B;
                let Q = this,
                    Z;
                return Z = (B = class extends $XB {
                    constructor(...[D]) {
                        super();
                        this.serialize = Q._serializer, this.deserialize = Q._deserializer, this.input = D ?? {}, Q._init(this)
                    }
                    static getEndpointParameterInstructions() {
                        return Q._ep
                    }
                    resolveMiddleware(D, G, F) {
                        return this.resolveMiddlewareWithContext(D, G, F, {
                            CommandCtor: Z,
                            middlewareFn: Q._middlewareFn,
                            clientName: Q._clientName,
                            commandName: Q._commandName,
                            inputFilterSensitiveLog: Q._inputFilterSensitiveLog,
                            outputFilterSensitiveLog: Q._outputFilterSensitiveLog,
                            smithyContext: Q._smithyContext,
                            additionalContext: Q._additionalContext
                        })
                    }
                }, v2(B, "CommandRef"), B)
            }
        };
    v2(qXB, "ClassBuilder");
    var Oc6 = qXB,
        Tc6 = "***SensitiveInformation***",
        Pc6 = v2((A, B) => {
            for (let Q of Object.keys(A)) {
                let Z = A[Q],
                    D = v2(async function(F, I, Y) {
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
        Sc6 = v2((A) => {
            switch (A) {
                case "true":
                    return !0;
                case "false":
                    return !1;
                default:
                    throw new Error(`Unable to parse boolean value "${A}"`)
            }
        }, "parseBoolean"),
        jc6 = v2((A) => {
            if (A === null || A === void 0) return;
            if (typeof A === "number") {
                if (A === 0 || A === 1) MD1.warn(C_1(`Expected boolean, got ${typeof A}: ${A}`));
                if (A === 0) return !1;
                if (A === 1) return !0
            }
            if (typeof A === "string") {
                let B = A.toLowerCase();
                if (B === "false" || B === "true") MD1.warn(C_1(`Expected boolean, got ${typeof A}: ${A}`));
                if (B === "false") return !1;
                if (B === "true") return !0
            }
            if (typeof A === "boolean") return A;
            throw new TypeError(`Expected boolean, got ${typeof A}: ${A}`)
        }, "expectBoolean"),
        ND1 = v2((A) => {
            if (A === null || A === void 0) return;
            if (typeof A === "string") {
                let B = parseFloat(A);
                if (!Number.isNaN(B)) {
                    if (String(B) !== String(A)) MD1.warn(C_1(`Expected number but observed string: ${A}`));
                    return B
                }
            }
            if (typeof A === "number") return A;
            throw new TypeError(`Expected number, got ${typeof A}: ${A}`)
        }, "expectNumber"),
        kc6 = Math.ceil(340282346638528860000000000000000000000),
        V_1 = v2((A) => {
            let B = ND1(A);
            if (B !== void 0 && !Number.isNaN(B) && B !== 1 / 0 && B !== -1 / 0) {
                if (Math.abs(B) > kc6) throw new TypeError(`Expected 32-bit float, got ${A}`)
            }
            return B
        }, "expectFloat32"),
        LD1 = v2((A) => {
            if (A === null || A === void 0) return;
            if (Number.isInteger(A) && !Number.isNaN(A)) return A;
            throw new TypeError(`Expected integer, got ${typeof A}: ${A}`)
        }, "expectLong"),
        yc6 = LD1,
        ME0 = v2((A) => PE0(A, 32), "expectInt32"),
        RE0 = v2((A) => PE0(A, 16), "expectShort"),
        OE0 = v2((A) => PE0(A, 8), "expectByte"),
        PE0 = v2((A, B) => {
            let Q = LD1(A);
            if (Q !== void 0 && _c6(Q, B) !== Q) throw new TypeError(`Expected ${B}-bit integer, got ${A}`);
            return Q
        }, "expectSizedInt"),
        _c6 = v2((A, B) => {
            switch (B) {
                case 32:
                    return Int32Array.of(A)[0];
                case 16:
                    return Int16Array.of(A)[0];
                case 8:
                    return Int8Array.of(A)[0]
            }
        }, "castInt"),
        xc6 = v2((A, B) => {
            if (A === null || A === void 0) {
                if (B) throw new TypeError(`Expected a non-null value for ${B}`);
                throw new TypeError("Expected a non-null value")
            }
            return A
        }, "expectNonNull"),
        NXB = v2((A) => {
            if (A === null || A === void 0) return;
            if (typeof A === "object" && !Array.isArray(A)) return A;
            let B = Array.isArray(A) ? "array" : typeof A;
            throw new TypeError(`Expected object, got ${B}: ${A}`)
        }, "expectObject"),
        vc6 = v2((A) => {
            if (A === null || A === void 0) return;
            if (typeof A === "string") return A;
            if (["boolean", "number", "bigint"].includes(typeof A)) return MD1.warn(C_1(`Expected string, got ${typeof A}: ${A}`)), String(A);
            throw new TypeError(`Expected string, got ${typeof A}: ${A}`)
        }, "expectString"),
        bc6 = v2((A) => {
            if (A === null || A === void 0) return;
            let B = NXB(A),
                Q = Object.entries(B).filter(([, Z]) => Z != null).map(([Z]) => Z);
            if (Q.length === 0) throw new TypeError("Unions must have exactly one non-null member. None were found.");
            if (Q.length > 1) throw new TypeError(`Unions must have exactly one non-null member. Keys ${Q} were not null.`);
            return B
        }, "expectUnion"),
        SE0 = v2((A) => {
            if (typeof A == "string") return ND1(Q11(A));
            return ND1(A)
        }, "strictParseDouble"),
        fc6 = SE0,
        LXB = v2((A) => {
            if (typeof A == "string") return V_1(Q11(A));
            return V_1(A)
        }, "strictParseFloat32"),
        hc6 = /(-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?)|(-?Infinity)|(NaN)/g,
        Q11 = v2((A) => {
            let B = A.match(hc6);
            if (B === null || B[0].length !== A.length) throw new TypeError("Expected real number, got implicit NaN");
            return parseFloat(A)
        }, "parseNumber"),
        jE0 = v2((A) => {
            if (typeof A == "string") return MXB(A);
            return ND1(A)
        }, "limitedParseDouble"),
        gc6 = jE0,
        uc6 = jE0,
        mc6 = v2((A) => {
            if (typeof A == "string") return MXB(A);
            return V_1(A)
        }, "limitedParseFloat32"),
        MXB = v2((A) => {
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
        RXB = v2((A) => {
            if (typeof A === "string") return LD1(Q11(A));
            return LD1(A)
        }, "strictParseLong"),
        dc6 = RXB,
        cc6 = v2((A) => {
            if (typeof A === "string") return ME0(Q11(A));
            return ME0(A)
        }, "strictParseInt32"),
        A11 = v2((A) => {
            if (typeof A === "string") return RE0(Q11(A));
            return RE0(A)
        }, "strictParseShort"),
        OXB = v2((A) => {
            if (typeof A === "string") return OE0(Q11(A));
            return OE0(A)
        }, "strictParseByte"),
        C_1 = v2((A) => {
            return String(new TypeError(A).stack || A).split(`
`).slice(0, 5).filter((B) => !B.includes("stackTraceWarning")).join(`
`)
        }, "stackTraceWarning"),
        MD1 = {
            warn: console.warn
        },
        lc6 = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        kE0 = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    function TXB(A) {
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
        return `${lc6[Z]}, ${Y} ${kE0[Q]} ${B} ${W}:${J}:${X} GMT`
    }
    v2(TXB, "dateToUtcString");
    var pc6 = new RegExp(/^(\d{4})-(\d{2})-(\d{2})[tT](\d{2}):(\d{2}):(\d{2})(?:\.(\d+))?[zZ]$/),
        ic6 = v2((A) => {
            if (A === null || A === void 0) return;
            if (typeof A !== "string") throw new TypeError("RFC-3339 date-times must be expressed as strings");
            let B = pc6.exec(A);
            if (!B) throw new TypeError("Invalid RFC-3339 date-time value");
            let [Q, Z, D, G, F, I, Y, W] = B, J = A11(B11(Z)), X = _M(D, "month", 1, 12), V = _M(G, "day", 1, 31);
            return qD1(J, X, V, {
                hours: F,
                minutes: I,
                seconds: Y,
                fractionalMilliseconds: W
            })
        }, "parseRfc3339DateTime"),
        nc6 = new RegExp(/^(\d{4})-(\d{2})-(\d{2})[tT](\d{2}):(\d{2}):(\d{2})(?:\.(\d+))?(([-+]\d{2}\:\d{2})|[zZ])$/),
        ac6 = v2((A) => {
            if (A === null || A === void 0) return;
            if (typeof A !== "string") throw new TypeError("RFC-3339 date-times must be expressed as strings");
            let B = nc6.exec(A);
            if (!B) throw new TypeError("Invalid RFC-3339 date-time value");
            let [Q, Z, D, G, F, I, Y, W, J] = B, X = A11(B11(Z)), V = _M(D, "month", 1, 12), C = _M(G, "day", 1, 31), K = qD1(X, V, C, {
                hours: F,
                minutes: I,
                seconds: Y,
                fractionalMilliseconds: W
            });
            if (J.toUpperCase() != "Z") K.setTime(K.getTime() - Il6(J));
            return K
        }, "parseRfc3339DateTimeWithOffset"),
        sc6 = new RegExp(/^(?:Mon|Tue|Wed|Thu|Fri|Sat|Sun), (\d{2}) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) (\d{4}) (\d{1,2}):(\d{2}):(\d{2})(?:\.(\d+))? GMT$/),
        rc6 = new RegExp(/^(?:Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday), (\d{2})-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)-(\d{2}) (\d{1,2}):(\d{2}):(\d{2})(?:\.(\d+))? GMT$/),
        oc6 = new RegExp(/^(?:Mon|Tue|Wed|Thu|Fri|Sat|Sun) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) ( [1-9]|\d{2}) (\d{1,2}):(\d{2}):(\d{2})(?:\.(\d+))? (\d{4})$/),
        tc6 = v2((A) => {
            if (A === null || A === void 0) return;
            if (typeof A !== "string") throw new TypeError("RFC-7231 date-times must be expressed as strings");
            let B = sc6.exec(A);
            if (B) {
                let [Q, Z, D, G, F, I, Y, W] = B;
                return qD1(A11(B11(G)), NE0(D), _M(Z, "day", 1, 31), {
                    hours: F,
                    minutes: I,
                    seconds: Y,
                    fractionalMilliseconds: W
                })
            }
            if (B = rc6.exec(A), B) {
                let [Q, Z, D, G, F, I, Y, W] = B;
                return Ql6(qD1(Al6(G), NE0(D), _M(Z, "day", 1, 31), {
                    hours: F,
                    minutes: I,
                    seconds: Y,
                    fractionalMilliseconds: W
                }))
            }
            if (B = oc6.exec(A), B) {
                let [Q, Z, D, G, F, I, Y, W] = B;
                return qD1(A11(B11(W)), NE0(Z), _M(D.trimLeft(), "day", 1, 31), {
                    hours: G,
                    minutes: F,
                    seconds: I,
                    fractionalMilliseconds: Y
                })
            }
            throw new TypeError("Invalid RFC-7231 date-time value")
        }, "parseRfc7231DateTime"),
        ec6 = v2((A) => {
            if (A === null || A === void 0) return;
            let B;
            if (typeof A === "number") B = A;
            else if (typeof A === "string") B = SE0(A);
            else throw new TypeError("Epoch timestamps must be expressed as floating point numbers or their string representation");
            if (Number.isNaN(B) || B === 1 / 0 || B === -1 / 0) throw new TypeError("Epoch timestamps must be valid, non-Infinite, non-NaN numerics");
            return new Date(Math.round(B * 1000))
        }, "parseEpochTimestamp"),
        qD1 = v2((A, B, Q, Z) => {
            let D = B - 1;
            return Dl6(A, D, Q), new Date(Date.UTC(A, D, Q, _M(Z.hours, "hour", 0, 23), _M(Z.minutes, "minute", 0, 59), _M(Z.seconds, "seconds", 0, 60), Fl6(Z.fractionalMilliseconds)))
        }, "buildDate"),
        Al6 = v2((A) => {
            let B = new Date().getUTCFullYear(),
                Q = Math.floor(B / 100) * 100 + A11(B11(A));
            if (Q < B) return Q + 100;
            return Q
        }, "parseTwoDigitYear"),
        Bl6 = 1576800000000,
        Ql6 = v2((A) => {
            if (A.getTime() - new Date().getTime() > Bl6) return new Date(Date.UTC(A.getUTCFullYear() - 100, A.getUTCMonth(), A.getUTCDate(), A.getUTCHours(), A.getUTCMinutes(), A.getUTCSeconds(), A.getUTCMilliseconds()));
            return A
        }, "adjustRfc850Year"),
        NE0 = v2((A) => {
            let B = kE0.indexOf(A);
            if (B < 0) throw new TypeError(`Invalid month: ${A}`);
            return B + 1
        }, "parseMonthByShortName"),
        Zl6 = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
        Dl6 = v2((A, B, Q) => {
            let Z = Zl6[B];
            if (B === 1 && Gl6(A)) Z = 29;
            if (Q > Z) throw new TypeError(`Invalid day for ${kE0[B]} in ${A}: ${Q}`)
        }, "validateDayOfMonth"),
        Gl6 = v2((A) => {
            return A % 4 === 0 && (A % 100 !== 0 || A % 400 === 0)
        }, "isLeapYear"),
        _M = v2((A, B, Q, Z) => {
            let D = OXB(B11(A));
            if (D < Q || D > Z) throw new TypeError(`${B} must be between ${Q} and ${Z}, inclusive`);
            return D
        }, "parseDateValue"),
        Fl6 = v2((A) => {
            if (A === null || A === void 0) return 0;
            return LXB("0." + A) * 1000
        }, "parseMilliseconds"),
        Il6 = v2((A) => {
            let B = A[0],
                Q = 1;
            if (B == "+") Q = 1;
            else if (B == "-") Q = -1;
            else throw new TypeError(`Offset direction, ${B}, must be "+" or "-"`);
            let Z = Number(A.substring(1, 3)),
                D = Number(A.substring(4, 6));
            return Q * (Z * 60 + D) * 60 * 1000
        }, "parseOffsetToMilliseconds"),
        B11 = v2((A) => {
            let B = 0;
            while (B < A.length - 1 && A.charAt(B) === "0") B++;
            if (B === 0) return A;
            return A.slice(B)
        }, "stripLeadingZeroes"),
        PXB = class A extends Error {
            constructor(B) {
                super(B.message);
                Object.setPrototypeOf(this, A.prototype), this.name = B.name, this.$fault = B.$fault, this.$metadata = B.$metadata
            }
        };
    v2(PXB, "ServiceException");
    var Yl6 = PXB,
        SXB = v2((A, B = {}) => {
            Object.entries(B).filter(([, Z]) => Z !== void 0).forEach(([Z, D]) => {
                if (A[Z] == null || A[Z] === "") A[Z] = D
            });
            let Q = A.message || A.Message || "UnknownError";
            return A.message = Q, delete A.Message, A
        }, "decorateServiceException"),
        jXB = v2(({
            output: A,
            parsedBody: B,
            exceptionCtor: Q,
            errorCode: Z
        }) => {
            let D = Jl6(A),
                G = D.httpStatusCode ? D.httpStatusCode + "" : void 0,
                F = new Q({
                    name: (B == null ? void 0 : B.code) || (B == null ? void 0 : B.Code) || Z || G || "UnknownError",
                    $fault: "client",
                    $metadata: D
                });
            throw SXB(F, B)
        }, "throwDefaultError"),
        Wl6 = v2((A) => {
            return ({
                output: B,
                parsedBody: Q,
                errorCode: Z
            }) => {
                jXB({
                    output: B,
                    parsedBody: Q,
                    exceptionCtor: A,
                    errorCode: Z
                })
            }
        }, "withBaseException"),
        Jl6 = v2((A) => ({
            httpStatusCode: A.statusCode,
            requestId: A.headers["x-amzn-requestid"] ?? A.headers["x-amzn-request-id"] ?? A.headers["x-amz-request-id"],
            extendedRequestId: A.headers["x-amz-id-2"],
            cfId: A.headers["x-amz-cf-id"]
        }), "deserializeMetadata"),
        Xl6 = v2((A) => {
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
        KXB = !1,
        Vl6 = v2((A) => {
            if (A && !KXB && parseInt(A.substring(1, A.indexOf("."))) < 14) KXB = !0
        }, "emitWarningIfUnsupportedVersion"),
        Cl6 = v2((A) => {
            let B = [];
            for (let Q in LE0.AlgorithmId) {
                let Z = LE0.AlgorithmId[Q];
                if (A[Z] === void 0) continue;
                B.push({
                    algorithmId: () => Z,
                    checksumConstructor: () => A[Z]
                })
            }
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
        Kl6 = v2((A) => {
            let B = {};
            return A.checksumAlgorithms().forEach((Q) => {
                B[Q.algorithmId()] = Q.checksumConstructor()
            }), B
        }, "resolveChecksumRuntimeConfig"),
        Hl6 = v2((A) => {
            let B = A.retryStrategy;
            return {
                setRetryStrategy(Q) {
                    B = Q
                },
                retryStrategy() {
                    return B
                }
            }
        }, "getRetryConfiguration"),
        zl6 = v2((A) => {
            let B = {};
            return B.retryStrategy = A.retryStrategy(), B
        }, "resolveRetryRuntimeConfig"),
        kXB = v2((A) => {
            return {
                ...Cl6(A),
                ...Hl6(A)
            }
        }, "getDefaultExtensionConfiguration"),
        El6 = kXB,
        Ul6 = v2((A) => {
            return {
                ...Kl6(A),
                ...zl6(A)
            }
        }, "resolveDefaultRuntimeConfig");

    function K_1(A) {
        return encodeURIComponent(A).replace(/[!'()*]/g, function(B) {
            return "%" + B.charCodeAt(0).toString(16).toUpperCase()
        })
    }
    v2(K_1, "extendedEncodeURIComponent");
    var wl6 = v2((A) => Array.isArray(A) ? A : [A], "getArrayIfSingleItem"),
        yXB = v2((A) => {
            for (let Q in A)
                if (A.hasOwnProperty(Q) && A[Q]["#text"] !== void 0) A[Q] = A[Q]["#text"];
                else if (typeof A[Q] === "object" && A[Q] !== null) A[Q] = yXB(A[Q]);
            return A
        }, "getValueFromTextNode"),
        RD1 = v2(function() {
            let A = Object.getPrototypeOf(this).constructor,
                Q = new(Function.bind.apply(String, [null, ...arguments]));
            return Object.setPrototypeOf(Q, A.prototype), Q
        }, "StringWrapper");
    RD1.prototype = Object.create(String.prototype, {
        constructor: {
            value: RD1,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    });
    Object.setPrototypeOf(RD1, String);
    var _XB = class A extends RD1 {
        deserializeJSON() {
            return JSON.parse(super.toString())
        }
        toJSON() {
            return super.toString()
        }
        static fromObject(B) {
            if (B instanceof A) return B;
            else if (B instanceof String || typeof B === "string") return new A(B);
            return new A(JSON.stringify(B))
        }
    };
    v2(_XB, "LazyJsonString");
    var $l6 = _XB;

    function yE0(A, B, Q) {
        let Z, D, G;
        if (typeof B === "undefined" && typeof Q === "undefined") Z = {}, G = A;
        else if (Z = A, typeof B === "function") return D = B, G = Q, Ll6(Z, D, G);
        else G = B;
        for (let F of Object.keys(G)) {
            if (!Array.isArray(G[F])) {
                Z[F] = G[F];
                continue
            }
            xXB(Z, null, G, F)
        }
        return Z
    }
    v2(yE0, "map");
    var ql6 = v2((A) => {
            let B = {};
            for (let [Q, Z] of Object.entries(A || {})) B[Q] = [, Z];
            return B
        }, "convertMap"),
        Nl6 = v2((A, B) => {
            let Q = {};
            for (let Z in B) xXB(Q, A, B, Z);
            return Q
        }, "take"),
        Ll6 = v2((A, B, Q) => {
            return yE0(A, Object.entries(Q).reduce((Z, [D, G]) => {
                if (Array.isArray(G)) Z[D] = G;
                else if (typeof G === "function") Z[D] = [B, G()];
                else Z[D] = [B, G];
                return Z
            }, {}))
        }, "mapWithFilter"),
        xXB = v2((A, B, Q, Z) => {
            if (B !== null) {
                let F = Q[Z];
                if (typeof F === "function") F = [, F];
                let [I = Ml6, Y = Rl6, W = Z] = F;
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
        Ml6 = v2((A) => A != null, "nonNullish"),
        Rl6 = v2((A) => A, "pass"),
        Ol6 = v2((A, B, Q, Z, D, G) => {
            if (B != null && B[Q] !== void 0) {
                let F = Z();
                if (F.length <= 0) throw new Error("Empty value provided for input HTTP label: " + Q + ".");
                A = A.replace(D, G ? F.split("/").map((I) => K_1(I)).join("/") : K_1(F))
            } else throw new Error("No value provided for input HTTP label: " + Q + ".");
            return A
        }, "resolvedPath"),
        Tl6 = v2((A) => {
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
        TE0 = v2((A) => {
            if (A == null) return {};
            if (Array.isArray(A)) return A.filter((B) => B != null).map(TE0);
            if (typeof A === "object") {
                let B = {};
                for (let Q of Object.keys(A)) {
                    if (A[Q] == null) continue;
                    B[Q] = TE0(A[Q])
                }
                return B
            }
            return A
        }, "_json");

    function vXB(A, B, Q) {
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
    v2(vXB, "splitEvery")
});