/* chunk:100 bytes:[2377382, 2411323) size:33941 source:unpacked-cli.js */
var pz1 = E((r95, hHA) => {
    var {
        defineProperty: lz1,
        getOwnPropertyDescriptor: pXQ,
        getOwnPropertyNames: iXQ
    } = Object, nXQ = Object.prototype.hasOwnProperty, y2 = (A, B) => lz1(A, "name", {
        value: B,
        configurable: !0
    }), aXQ = (A, B) => {
        for (var Q in B) lz1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, sXQ = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of iXQ(B))
                if (!nXQ.call(A, D) && D !== Q) lz1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = pXQ(B, D)) || Z.enumerable
                })
        }
        return A
    }, rXQ = (A) => sXQ(lz1({}, "__esModule", {
        value: !0
    }), A), NHA = {};
    aXQ(NHA, {
        Client: () => oXQ,
        Command: () => MHA,
        LazyJsonString: () => bh,
        NoOpLogger: () => nVQ,
        SENSITIVE_STRING: () => eXQ,
        ServiceException: () => xVQ,
        _json: () => bt1,
        collectBody: () => jt1.collectBody,
        convertMap: () => aVQ,
        createAggregatedClient: () => AVQ,
        dateToUtcString: () => jHA,
        decorateServiceException: () => kHA,
        emitWarningIfUnsupportedVersion: () => hVQ,
        expectBoolean: () => QVQ,
        expectByte: () => vt1,
        expectFloat32: () => dz1,
        expectInt: () => DVQ,
        expectInt32: () => _t1,
        expectLong: () => VQ1,
        expectNonNull: () => FVQ,
        expectNumber: () => XQ1,
        expectObject: () => RHA,
        expectShort: () => xt1,
        expectString: () => IVQ,
        expectUnion: () => YVQ,
        extendedEncodeURIComponent: () => jt1.extendedEncodeURIComponent,
        getArrayIfSingleItem: () => pVQ,
        getDefaultClientConfiguration: () => cVQ,
        getDefaultExtensionConfiguration: () => _HA,
        getValueFromTextNode: () => xHA,
        handleFloat: () => XVQ,
        isSerializableHeaderValue: () => iVQ,
        limitedParseDouble: () => gt1,
        limitedParseFloat: () => VVQ,
        limitedParseFloat32: () => CVQ,
        loadConfigsForDefaultMode: () => fVQ,
        logger: () => CQ1,
        map: () => mt1,
        parseBoolean: () => BVQ,
        parseEpochTimestamp: () => RVQ,
        parseRfc3339DateTime: () => UVQ,
        parseRfc3339DateTimeWithOffset: () => $VQ,
        parseRfc7231DateTime: () => MVQ,
        quoteHeader: () => bHA,
        resolveDefaultRuntimeConfig: () => lVQ,
        resolvedPath: () => jt1.resolvedPath,
        serializeDateTime: () => ACQ,
        serializeFloat: () => eVQ,
        splitEvery: () => fHA,
        splitHeader: () => BCQ,
        strictParseByte: () => SHA,
        strictParseDouble: () => ht1,
        strictParseFloat: () => WVQ,
        strictParseFloat32: () => OHA,
        strictParseInt: () => KVQ,
        strictParseInt32: () => HVQ,
        strictParseLong: () => PHA,
        strictParseShort: () => xi,
        take: () => sVQ,
        throwDefaultError: () => yHA,
        withBaseException: () => vVQ
    });
    hHA.exports = rXQ(NHA);
    var LHA = Vw(),
        oXQ = class {
            constructor(A) {
                this.config = A, this.middlewareStack = LHA.constructStack()
            }
            static {
                y2(this, "Client")
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
        jt1 = O6(),
        yt1 = zt1(),
        MHA = class {
            constructor() {
                this.middlewareStack = LHA.constructStack()
            }
            static {
                y2(this, "Command")
            }
            static classBuilder() {
                return new tXQ
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
                        [yt1.SMITHY_CONTEXT_KEY]: {
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
        tXQ = class {
            constructor() {
                this._init = () => {}, this._ep = {}, this._middlewareFn = () => [], this._commandName = "", this._clientName = "", this._additionalContext = {}, this._smithyContext = {}, this._inputFilterSensitiveLog = (A) => A, this._outputFilterSensitiveLog = (A) => A, this._serializer = null, this._deserializer = null
            }
            static {
                y2(this, "ClassBuilder")
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
                return B = class extends MHA {
                    constructor(...[Q]) {
                        super();
                        this.serialize = A._serializer, this.deserialize = A._deserializer, this.input = Q ?? {}, A._init(this)
                    }
                    static {
                        y2(this, "CommandRef")
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
        eXQ = "***SensitiveInformation***",
        AVQ = y2((A, B) => {
            for (let Q of Object.keys(A)) {
                let Z = A[Q],
                    D = y2(async function(F, I, Y) {
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
        BVQ = y2((A) => {
            switch (A) {
                case "true":
                    return !0;
                case "false":
                    return !1;
                default:
                    throw new Error(`Unable to parse boolean value "${A}"`)
            }
        }, "parseBoolean"),
        QVQ = y2((A) => {
            if (A === null || A === void 0) return;
            if (typeof A === "number") {
                if (A === 0 || A === 1) CQ1.warn(cz1(`Expected boolean, got ${typeof A}: ${A}`));
                if (A === 0) return !1;
                if (A === 1) return !0
            }
            if (typeof A === "string") {
                let B = A.toLowerCase();
                if (B === "false" || B === "true") CQ1.warn(cz1(`Expected boolean, got ${typeof A}: ${A}`));
                if (B === "false") return !1;
                if (B === "true") return !0
            }
            if (typeof A === "boolean") return A;
            throw new TypeError(`Expected boolean, got ${typeof A}: ${A}`)
        }, "expectBoolean"),
        XQ1 = y2((A) => {
            if (A === null || A === void 0) return;
            if (typeof A === "string") {
                let B = parseFloat(A);
                if (!Number.isNaN(B)) {
                    if (String(B) !== String(A)) CQ1.warn(cz1(`Expected number but observed string: ${A}`));
                    return B
                }
            }
            if (typeof A === "number") return A;
            throw new TypeError(`Expected number, got ${typeof A}: ${A}`)
        }, "expectNumber"),
        ZVQ = Math.ceil(340282346638528860000000000000000000000),
        dz1 = y2((A) => {
            let B = XQ1(A);
            if (B !== void 0 && !Number.isNaN(B) && B !== 1 / 0 && B !== -1 / 0) {
                if (Math.abs(B) > ZVQ) throw new TypeError(`Expected 32-bit float, got ${A}`)
            }
            return B
        }, "expectFloat32"),
        VQ1 = y2((A) => {
            if (A === null || A === void 0) return;
            if (Number.isInteger(A) && !Number.isNaN(A)) return A;
            throw new TypeError(`Expected integer, got ${typeof A}: ${A}`)
        }, "expectLong"),
        DVQ = VQ1,
        _t1 = y2((A) => ft1(A, 32), "expectInt32"),
        xt1 = y2((A) => ft1(A, 16), "expectShort"),
        vt1 = y2((A) => ft1(A, 8), "expectByte"),
        ft1 = y2((A, B) => {
            let Q = VQ1(A);
            if (Q !== void 0 && GVQ(Q, B) !== Q) throw new TypeError(`Expected ${B}-bit integer, got ${A}`);
            return Q
        }, "expectSizedInt"),
        GVQ = y2((A, B) => {
            switch (B) {
                case 32:
                    return Int32Array.of(A)[0];
                case 16:
                    return Int16Array.of(A)[0];
                case 8:
                    return Int8Array.of(A)[0]
            }
        }, "castInt"),
        FVQ = y2((A, B) => {
            if (A === null || A === void 0) {
                if (B) throw new TypeError(`Expected a non-null value for ${B}`);
                throw new TypeError("Expected a non-null value")
            }
            return A
        }, "expectNonNull"),
        RHA = y2((A) => {
            if (A === null || A === void 0) return;
            if (typeof A === "object" && !Array.isArray(A)) return A;
            let B = Array.isArray(A) ? "array" : typeof A;
            throw new TypeError(`Expected object, got ${B}: ${A}`)
        }, "expectObject"),
        IVQ = y2((A) => {
            if (A === null || A === void 0) return;
            if (typeof A === "string") return A;
            if (["boolean", "number", "bigint"].includes(typeof A)) return CQ1.warn(cz1(`Expected string, got ${typeof A}: ${A}`)), String(A);
            throw new TypeError(`Expected string, got ${typeof A}: ${A}`)
        }, "expectString"),
        YVQ = y2((A) => {
            if (A === null || A === void 0) return;
            let B = RHA(A),
                Q = Object.entries(B).filter(([, Z]) => Z != null).map(([Z]) => Z);
            if (Q.length === 0) throw new TypeError("Unions must have exactly one non-null member. None were found.");
            if (Q.length > 1) throw new TypeError(`Unions must have exactly one non-null member. Keys ${Q} were not null.`);
            return B
        }, "expectUnion"),
        ht1 = y2((A) => {
            if (typeof A == "string") return XQ1(bi(A));
            return XQ1(A)
        }, "strictParseDouble"),
        WVQ = ht1,
        OHA = y2((A) => {
            if (typeof A == "string") return dz1(bi(A));
            return dz1(A)
        }, "strictParseFloat32"),
        JVQ = /(-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?)|(-?Infinity)|(NaN)/g,
        bi = y2((A) => {
            let B = A.match(JVQ);
            if (B === null || B[0].length !== A.length) throw new TypeError("Expected real number, got implicit NaN");
            return parseFloat(A)
        }, "parseNumber"),
        gt1 = y2((A) => {
            if (typeof A == "string") return THA(A);
            return XQ1(A)
        }, "limitedParseDouble"),
        XVQ = gt1,
        VVQ = gt1,
        CVQ = y2((A) => {
            if (typeof A == "string") return THA(A);
            return dz1(A)
        }, "limitedParseFloat32"),
        THA = y2((A) => {
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
        PHA = y2((A) => {
            if (typeof A === "string") return VQ1(bi(A));
            return VQ1(A)
        }, "strictParseLong"),
        KVQ = PHA,
        HVQ = y2((A) => {
            if (typeof A === "string") return _t1(bi(A));
            return _t1(A)
        }, "strictParseInt32"),
        xi = y2((A) => {
            if (typeof A === "string") return xt1(bi(A));
            return xt1(A)
        }, "strictParseShort"),
        SHA = y2((A) => {
            if (typeof A === "string") return vt1(bi(A));
            return vt1(A)
        }, "strictParseByte"),
        cz1 = y2((A) => {
            return String(new TypeError(A).stack || A).split(`
`).slice(0, 5).filter((B) => !B.includes("stackTraceWarning")).join(`
`)
        }, "stackTraceWarning"),
        CQ1 = {
            warn: console.warn
        },
        zVQ = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        ut1 = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    function jHA(A) {
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
        return `${zVQ[Z]}, ${Y} ${ut1[Q]} ${B} ${W}:${J}:${X} GMT`
    }
    y2(jHA, "dateToUtcString");
    var EVQ = new RegExp(/^(\d{4})-(\d{2})-(\d{2})[tT](\d{2}):(\d{2}):(\d{2})(?:\.(\d+))?[zZ]$/),
        UVQ = y2((A) => {
            if (A === null || A === void 0) return;
            if (typeof A !== "string") throw new TypeError("RFC-3339 date-times must be expressed as strings");
            let B = EVQ.exec(A);
            if (!B) throw new TypeError("Invalid RFC-3339 date-time value");
            let [Q, Z, D, G, F, I, Y, W] = B, J = xi(vi(Z)), X = yN(D, "month", 1, 12), V = yN(G, "day", 1, 31);
            return JQ1(J, X, V, {
                hours: F,
                minutes: I,
                seconds: Y,
                fractionalMilliseconds: W
            })
        }, "parseRfc3339DateTime"),
        wVQ = new RegExp(/^(\d{4})-(\d{2})-(\d{2})[tT](\d{2}):(\d{2}):(\d{2})(?:\.(\d+))?(([-+]\d{2}\:\d{2})|[zZ])$/),
        $VQ = y2((A) => {
            if (A === null || A === void 0) return;
            if (typeof A !== "string") throw new TypeError("RFC-3339 date-times must be expressed as strings");
            let B = wVQ.exec(A);
            if (!B) throw new TypeError("Invalid RFC-3339 date-time value");
            let [Q, Z, D, G, F, I, Y, W, J] = B, X = xi(vi(Z)), V = yN(D, "month", 1, 12), C = yN(G, "day", 1, 31), K = JQ1(X, V, C, {
                hours: F,
                minutes: I,
                seconds: Y,
                fractionalMilliseconds: W
            });
            if (J.toUpperCase() != "Z") K.setTime(K.getTime() - _VQ(J));
            return K
        }, "parseRfc3339DateTimeWithOffset"),
        qVQ = new RegExp(/^(?:Mon|Tue|Wed|Thu|Fri|Sat|Sun), (\d{2}) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) (\d{4}) (\d{1,2}):(\d{2}):(\d{2})(?:\.(\d+))? GMT$/),
        NVQ = new RegExp(/^(?:Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday), (\d{2})-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)-(\d{2}) (\d{1,2}):(\d{2}):(\d{2})(?:\.(\d+))? GMT$/),
        LVQ = new RegExp(/^(?:Mon|Tue|Wed|Thu|Fri|Sat|Sun) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) ( [1-9]|\d{2}) (\d{1,2}):(\d{2}):(\d{2})(?:\.(\d+))? (\d{4})$/),
        MVQ = y2((A) => {
            if (A === null || A === void 0) return;
            if (typeof A !== "string") throw new TypeError("RFC-7231 date-times must be expressed as strings");
            let B = qVQ.exec(A);
            if (B) {
                let [Q, Z, D, G, F, I, Y, W] = B;
                return JQ1(xi(vi(G)), kt1(D), yN(Z, "day", 1, 31), {
                    hours: F,
                    minutes: I,
                    seconds: Y,
                    fractionalMilliseconds: W
                })
            }
            if (B = NVQ.exec(A), B) {
                let [Q, Z, D, G, F, I, Y, W] = B;
                return PVQ(JQ1(OVQ(G), kt1(D), yN(Z, "day", 1, 31), {
                    hours: F,
                    minutes: I,
                    seconds: Y,
                    fractionalMilliseconds: W
                }))
            }
            if (B = LVQ.exec(A), B) {
                let [Q, Z, D, G, F, I, Y, W] = B;
                return JQ1(xi(vi(W)), kt1(Z), yN(D.trimLeft(), "day", 1, 31), {
                    hours: G,
                    minutes: F,
                    seconds: I,
                    fractionalMilliseconds: Y
                })
            }
            throw new TypeError("Invalid RFC-7231 date-time value")
        }, "parseRfc7231DateTime"),
        RVQ = y2((A) => {
            if (A === null || A === void 0) return;
            let B;
            if (typeof A === "number") B = A;
            else if (typeof A === "string") B = ht1(A);
            else if (typeof A === "object" && A.tag === 1) B = A.value;
            else throw new TypeError("Epoch timestamps must be expressed as floating point numbers or their string representation");
            if (Number.isNaN(B) || B === 1 / 0 || B === -1 / 0) throw new TypeError("Epoch timestamps must be valid, non-Infinite, non-NaN numerics");
            return new Date(Math.round(B * 1000))
        }, "parseEpochTimestamp"),
        JQ1 = y2((A, B, Q, Z) => {
            let D = B - 1;
            return jVQ(A, D, Q), new Date(Date.UTC(A, D, Q, yN(Z.hours, "hour", 0, 23), yN(Z.minutes, "minute", 0, 59), yN(Z.seconds, "seconds", 0, 60), yVQ(Z.fractionalMilliseconds)))
        }, "buildDate"),
        OVQ = y2((A) => {
            let B = new Date().getUTCFullYear(),
                Q = Math.floor(B / 100) * 100 + xi(vi(A));
            if (Q < B) return Q + 100;
            return Q
        }, "parseTwoDigitYear"),
        TVQ = 1576800000000,
        PVQ = y2((A) => {
            if (A.getTime() - new Date().getTime() > TVQ) return new Date(Date.UTC(A.getUTCFullYear() - 100, A.getUTCMonth(), A.getUTCDate(), A.getUTCHours(), A.getUTCMinutes(), A.getUTCSeconds(), A.getUTCMilliseconds()));
            return A
        }, "adjustRfc850Year"),
        kt1 = y2((A) => {
            let B = ut1.indexOf(A);
            if (B < 0) throw new TypeError(`Invalid month: ${A}`);
            return B + 1
        }, "parseMonthByShortName"),
        SVQ = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
        jVQ = y2((A, B, Q) => {
            let Z = SVQ[B];
            if (B === 1 && kVQ(A)) Z = 29;
            if (Q > Z) throw new TypeError(`Invalid day for ${ut1[B]} in ${A}: ${Q}`)
        }, "validateDayOfMonth"),
        kVQ = y2((A) => {
            return A % 4 === 0 && (A % 100 !== 0 || A % 400 === 0)
        }, "isLeapYear"),
        yN = y2((A, B, Q, Z) => {
            let D = SHA(vi(A));
            if (D < Q || D > Z) throw new TypeError(`${B} must be between ${Q} and ${Z}, inclusive`);
            return D
        }, "parseDateValue"),
        yVQ = y2((A) => {
            if (A === null || A === void 0) return 0;
            return OHA("0." + A) * 1000
        }, "parseMilliseconds"),
        _VQ = y2((A) => {
            let B = A[0],
                Q = 1;
            if (B == "+") Q = 1;
            else if (B == "-") Q = -1;
            else throw new TypeError(`Offset direction, ${B}, must be "+" or "-"`);
            let Z = Number(A.substring(1, 3)),
                D = Number(A.substring(4, 6));
            return Q * (Z * 60 + D) * 60 * 1000
        }, "parseOffsetToMilliseconds"),
        vi = y2((A) => {
            let B = 0;
            while (B < A.length - 1 && A.charAt(B) === "0") B++;
            if (B === 0) return A;
            return A.slice(B)
        }, "stripLeadingZeroes"),
        xVQ = class A extends Error {
            static {
                y2(this, "ServiceException")
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
        kHA = y2((A, B = {}) => {
            Object.entries(B).filter(([, Z]) => Z !== void 0).forEach(([Z, D]) => {
                if (A[Z] == null || A[Z] === "") A[Z] = D
            });
            let Q = A.message || A.Message || "UnknownError";
            return A.message = Q, delete A.Message, A
        }, "decorateServiceException"),
        yHA = y2(({
            output: A,
            parsedBody: B,
            exceptionCtor: Q,
            errorCode: Z
        }) => {
            let D = bVQ(A),
                G = D.httpStatusCode ? D.httpStatusCode + "" : void 0,
                F = new Q({
                    name: B?.code || B?.Code || Z || G || "UnknownError",
                    $fault: "client",
                    $metadata: D
                });
            throw kHA(F, B)
        }, "throwDefaultError"),
        vVQ = y2((A) => {
            return ({
                output: B,
                parsedBody: Q,
                errorCode: Z
            }) => {
                yHA({
                    output: B,
                    parsedBody: Q,
                    exceptionCtor: A,
                    errorCode: Z
                })
            }
        }, "withBaseException"),
        bVQ = y2((A) => ({
            httpStatusCode: A.statusCode,
            requestId: A.headers["x-amzn-requestid"] ?? A.headers["x-amzn-request-id"] ?? A.headers["x-amz-request-id"],
            extendedRequestId: A.headers["x-amz-id-2"],
            cfId: A.headers["x-amz-cf-id"]
        }), "deserializeMetadata"),
        fVQ = y2((A) => {
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
        qHA = !1,
        hVQ = y2((A) => {
            if (A && !qHA && parseInt(A.substring(1, A.indexOf("."))) < 16) qHA = !0
        }, "emitWarningIfUnsupportedVersion"),
        gVQ = y2((A) => {
            let B = [];
            for (let Q in yt1.AlgorithmId) {
                let Z = yt1.AlgorithmId[Q];
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
        uVQ = y2((A) => {
            let B = {};
            return A.checksumAlgorithms().forEach((Q) => {
                B[Q.algorithmId()] = Q.checksumConstructor()
            }), B
        }, "resolveChecksumRuntimeConfig"),
        mVQ = y2((A) => {
            return {
                setRetryStrategy(B) {
                    A.retryStrategy = B
                },
                retryStrategy() {
                    return A.retryStrategy
                }
            }
        }, "getRetryConfiguration"),
        dVQ = y2((A) => {
            let B = {};
            return B.retryStrategy = A.retryStrategy(), B
        }, "resolveRetryRuntimeConfig"),
        _HA = y2((A) => {
            return Object.assign(gVQ(A), mVQ(A))
        }, "getDefaultExtensionConfiguration"),
        cVQ = _HA,
        lVQ = y2((A) => {
            return Object.assign(uVQ(A), dVQ(A))
        }, "resolveDefaultRuntimeConfig"),
        pVQ = y2((A) => Array.isArray(A) ? A : [A], "getArrayIfSingleItem"),
        xHA = y2((A) => {
            for (let Q in A)
                if (A.hasOwnProperty(Q) && A[Q]["#text"] !== void 0) A[Q] = A[Q]["#text"];
                else if (typeof A[Q] === "object" && A[Q] !== null) A[Q] = xHA(A[Q]);
            return A
        }, "getValueFromTextNode"),
        iVQ = y2((A) => {
            return A != null
        }, "isSerializableHeaderValue"),
        bh = y2(function A(B) {
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
    bh.from = (A) => {
        if (A && typeof A === "object" && (A instanceof bh || ("deserializeJSON" in A))) return A;
        else if (typeof A === "string" || Object.getPrototypeOf(A) === String.prototype) return bh(String(A));
        return bh(JSON.stringify(A))
    };
    bh.fromObject = bh.from;
    var nVQ = class {
        static {
            y2(this, "NoOpLogger")
        }
        trace() {}
        debug() {}
        info() {}
        warn() {}
        error() {}
    };

    function mt1(A, B, Q) {
        let Z, D, G;
        if (typeof B === "undefined" && typeof Q === "undefined") Z = {}, G = A;
        else if (Z = A, typeof B === "function") return D = B, G = Q, rVQ(Z, D, G);
        else G = B;
        for (let F of Object.keys(G)) {
            if (!Array.isArray(G[F])) {
                Z[F] = G[F];
                continue
            }
            vHA(Z, null, G, F)
        }
        return Z
    }
    y2(mt1, "map");
    var aVQ = y2((A) => {
            let B = {};
            for (let [Q, Z] of Object.entries(A || {})) B[Q] = [, Z];
            return B
        }, "convertMap"),
        sVQ = y2((A, B) => {
            let Q = {};
            for (let Z in B) vHA(Q, A, B, Z);
            return Q
        }, "take"),
        rVQ = y2((A, B, Q) => {
            return mt1(A, Object.entries(Q).reduce((Z, [D, G]) => {
                if (Array.isArray(G)) Z[D] = G;
                else if (typeof G === "function") Z[D] = [B, G()];
                else Z[D] = [B, G];
                return Z
            }, {}))
        }, "mapWithFilter"),
        vHA = y2((A, B, Q, Z) => {
            if (B !== null) {
                let F = Q[Z];
                if (typeof F === "function") F = [, F];
                let [I = oVQ, Y = tVQ, W = Z] = F;
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
        oVQ = y2((A) => A != null, "nonNullish"),
        tVQ = y2((A) => A, "pass");

    function bHA(A) {
        if (A.includes(",") || A.includes('"')) A = `"${A.replace(/"/g,"\\\"")}"`;
        return A
    }
    y2(bHA, "quoteHeader");
    var eVQ = y2((A) => {
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
        ACQ = y2((A) => A.toISOString().replace(".000Z", "Z"), "serializeDateTime"),
        bt1 = y2((A) => {
            if (A == null) return {};
            if (Array.isArray(A)) return A.filter((B) => B != null).map(bt1);
            if (typeof A === "object") {
                let B = {};
                for (let Q of Object.keys(A)) {
                    if (A[Q] == null) continue;
                    B[Q] = bt1(A[Q])
                }
                return B
            }
            return A
        }, "_json");

    function fHA(A, B, Q) {
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
    y2(fHA, "splitEvery");
    var BCQ = y2((A) => {
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