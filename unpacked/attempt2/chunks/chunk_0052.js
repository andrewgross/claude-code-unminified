/* chunk:52 bytes:[1326482, 1346292) size:19810 source:unpacked-cli.js */
var X6 = E((te8, K2A) => {
    var {
        defineProperty: mn1,
        getOwnPropertyDescriptor: Rm9,
        getOwnPropertyNames: Om9
    } = Object, Tm9 = Object.prototype.hasOwnProperty, Pm9 = (A, B) => {
        for (var Q in B) mn1(A, Q, {
            get: B[Q],
            enumerable: !0
        })
    }, Sm9 = (A, B, Q, Z) => {
        if (B && typeof B === "object" || typeof B === "function") {
            for (let D of Om9(B))
                if (!Tm9.call(A, D) && D !== Q) mn1(A, D, {
                    get: () => B[D],
                    enumerable: !(Z = Rm9(B, D)) || Z.enumerable
                })
        }
        return A
    }, jm9 = (A) => Sm9(mn1({}, "__esModule", {
        value: !0
    }), A), I2A = {};
    Pm9(I2A, {
        LazyJsonString: () => Uh,
        NumericValue: () => C2A,
        copyDocumentWithTransform: () => K91,
        dateToUtcString: () => am9,
        expectBoolean: () => _m9,
        expectByte: () => un1,
        expectFloat32: () => BK1,
        expectInt: () => vm9,
        expectInt32: () => hn1,
        expectLong: () => E91,
        expectNonNull: () => fm9,
        expectNumber: () => z91,
        expectObject: () => Y2A,
        expectShort: () => gn1,
        expectString: () => hm9,
        expectUnion: () => gm9,
        handleFloat: () => dm9,
        limitedParseDouble: () => ln1,
        limitedParseFloat: () => cm9,
        limitedParseFloat32: () => lm9,
        logger: () => U91,
        nv: () => Hd9,
        parseBoolean: () => ym9,
        parseEpochTimestamp: () => Zd9,
        parseRfc3339DateTime: () => rm9,
        parseRfc3339DateTimeWithOffset: () => tm9,
        parseRfc7231DateTime: () => Qd9,
        quoteHeader: () => Vd9,
        splitEvery: () => Cd9,
        splitHeader: () => Kd9,
        strictParseByte: () => V2A,
        strictParseDouble: () => cn1,
        strictParseFloat: () => um9,
        strictParseFloat32: () => W2A,
        strictParseInt: () => pm9,
        strictParseInt32: () => im9,
        strictParseLong: () => X2A,
        strictParseShort: () => cp
    });
    K2A.exports = jm9(I2A);
    var km9 = gQ(),
        K91 = (A, B, Q = (Z) => Z) => {
            let Z = km9.NormalizedSchema.of(B);
            switch (typeof A) {
                case "undefined":
                case "boolean":
                case "number":
                case "string":
                case "bigint":
                case "symbol":
                    return Q(A, Z);
                case "function":
                case "object":
                    if (A === null) return Q(null, Z);
                    if (Array.isArray(A)) {
                        let G = new Array(A.length),
                            F = 0;
                        for (let I of A) G[F++] = K91(I, Z.getValueSchema(), Q);
                        return Q(G, Z)
                    }
                    if ("byteLength" in A) {
                        let G = new Uint8Array(A.byteLength);
                        return G.set(A, 0), Q(G, Z)
                    }
                    if (A instanceof Date) return Q(A, Z);
                    let D = {};
                    if (Z.isMapSchema())
                        for (let G of Object.keys(A)) D[G] = K91(A[G], Z.getValueSchema(), Q);
                    else if (Z.isStructSchema())
                        for (let [G, F] of Z.structIterator()) D[G] = K91(A[G], F, Q);
                    else if (Z.isDocumentSchema())
                        for (let G of Object.keys(A)) D[G] = K91(A[G], Z.getValueSchema(), Q);
                    return Q(D, Z);
                default:
                    return Q(A, Z)
            }
        },
        ym9 = (A) => {
            switch (A) {
                case "true":
                    return !0;
                case "false":
                    return !1;
                default:
                    throw new Error(`Unable to parse boolean value "${A}"`)
            }
        },
        _m9 = (A) => {
            if (A === null || A === void 0) return;
            if (typeof A === "number") {
                if (A === 0 || A === 1) U91.warn(QK1(`Expected boolean, got ${typeof A}: ${A}`));
                if (A === 0) return !1;
                if (A === 1) return !0
            }
            if (typeof A === "string") {
                let B = A.toLowerCase();
                if (B === "false" || B === "true") U91.warn(QK1(`Expected boolean, got ${typeof A}: ${A}`));
                if (B === "false") return !1;
                if (B === "true") return !0
            }
            if (typeof A === "boolean") return A;
            throw new TypeError(`Expected boolean, got ${typeof A}: ${A}`)
        },
        z91 = (A) => {
            if (A === null || A === void 0) return;
            if (typeof A === "string") {
                let B = parseFloat(A);
                if (!Number.isNaN(B)) {
                    if (String(B) !== String(A)) U91.warn(QK1(`Expected number but observed string: ${A}`));
                    return B
                }
            }
            if (typeof A === "number") return A;
            throw new TypeError(`Expected number, got ${typeof A}: ${A}`)
        },
        xm9 = Math.ceil(340282346638528860000000000000000000000),
        BK1 = (A) => {
            let B = z91(A);
            if (B !== void 0 && !Number.isNaN(B) && B !== 1 / 0 && B !== -1 / 0) {
                if (Math.abs(B) > xm9) throw new TypeError(`Expected 32-bit float, got ${A}`)
            }
            return B
        },
        E91 = (A) => {
            if (A === null || A === void 0) return;
            if (Number.isInteger(A) && !Number.isNaN(A)) return A;
            throw new TypeError(`Expected integer, got ${typeof A}: ${A}`)
        },
        vm9 = E91,
        hn1 = (A) => dn1(A, 32),
        gn1 = (A) => dn1(A, 16),
        un1 = (A) => dn1(A, 8),
        dn1 = (A, B) => {
            let Q = E91(A);
            if (Q !== void 0 && bm9(Q, B) !== Q) throw new TypeError(`Expected ${B}-bit integer, got ${A}`);
            return Q
        },
        bm9 = (A, B) => {
            switch (B) {
                case 32:
                    return Int32Array.of(A)[0];
                case 16:
                    return Int16Array.of(A)[0];
                case 8:
                    return Int8Array.of(A)[0]
            }
        },
        fm9 = (A, B) => {
            if (A === null || A === void 0) {
                if (B) throw new TypeError(`Expected a non-null value for ${B}`);
                throw new TypeError("Expected a non-null value")
            }
            return A
        },
        Y2A = (A) => {
            if (A === null || A === void 0) return;
            if (typeof A === "object" && !Array.isArray(A)) return A;
            let B = Array.isArray(A) ? "array" : typeof A;
            throw new TypeError(`Expected object, got ${B}: ${A}`)
        },
        hm9 = (A) => {
            if (A === null || A === void 0) return;
            if (typeof A === "string") return A;
            if (["boolean", "number", "bigint"].includes(typeof A)) return U91.warn(QK1(`Expected string, got ${typeof A}: ${A}`)), String(A);
            throw new TypeError(`Expected string, got ${typeof A}: ${A}`)
        },
        gm9 = (A) => {
            if (A === null || A === void 0) return;
            let B = Y2A(A),
                Q = Object.entries(B).filter(([, Z]) => Z != null).map(([Z]) => Z);
            if (Q.length === 0) throw new TypeError("Unions must have exactly one non-null member. None were found.");
            if (Q.length > 1) throw new TypeError(`Unions must have exactly one non-null member. Keys ${Q} were not null.`);
            return B
        },
        cn1 = (A) => {
            if (typeof A == "string") return z91(pp(A));
            return z91(A)
        },
        um9 = cn1,
        W2A = (A) => {
            if (typeof A == "string") return BK1(pp(A));
            return BK1(A)
        },
        mm9 = /(-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?)|(-?Infinity)|(NaN)/g,
        pp = (A) => {
            let B = A.match(mm9);
            if (B === null || B[0].length !== A.length) throw new TypeError("Expected real number, got implicit NaN");
            return parseFloat(A)
        },
        ln1 = (A) => {
            if (typeof A == "string") return J2A(A);
            return z91(A)
        },
        dm9 = ln1,
        cm9 = ln1,
        lm9 = (A) => {
            if (typeof A == "string") return J2A(A);
            return BK1(A)
        },
        J2A = (A) => {
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
        },
        X2A = (A) => {
            if (typeof A === "string") return E91(pp(A));
            return E91(A)
        },
        pm9 = X2A,
        im9 = (A) => {
            if (typeof A === "string") return hn1(pp(A));
            return hn1(A)
        },
        cp = (A) => {
            if (typeof A === "string") return gn1(pp(A));
            return gn1(A)
        },
        V2A = (A) => {
            if (typeof A === "string") return un1(pp(A));
            return un1(A)
        },
        QK1 = (A) => {
            return String(new TypeError(A).stack || A).split(`
`).slice(0, 5).filter((B) => !B.includes("stackTraceWarning")).join(`
`)
        },
        U91 = {
            warn: console.warn
        },
        nm9 = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        pn1 = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    function am9(A) {
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
        return `${nm9[Z]}, ${Y} ${pn1[Q]} ${B} ${W}:${J}:${X} GMT`
    }
    var sm9 = new RegExp(/^(\d{4})-(\d{2})-(\d{2})[tT](\d{2}):(\d{2}):(\d{2})(?:\.(\d+))?[zZ]$/),
        rm9 = (A) => {
            if (A === null || A === void 0) return;
            if (typeof A !== "string") throw new TypeError("RFC-3339 date-times must be expressed as strings");
            let B = sm9.exec(A);
            if (!B) throw new TypeError("Invalid RFC-3339 date-time value");
            let [Q, Z, D, G, F, I, Y, W] = B, J = cp(lp(Z)), X = wN(D, "month", 1, 12), V = wN(G, "day", 1, 31);
            return H91(J, X, V, {
                hours: F,
                minutes: I,
                seconds: Y,
                fractionalMilliseconds: W
            })
        },
        om9 = new RegExp(/^(\d{4})-(\d{2})-(\d{2})[tT](\d{2}):(\d{2}):(\d{2})(?:\.(\d+))?(([-+]\d{2}\:\d{2})|[zZ])$/),
        tm9 = (A) => {
            if (A === null || A === void 0) return;
            if (typeof A !== "string") throw new TypeError("RFC-3339 date-times must be expressed as strings");
            let B = om9.exec(A);
            if (!B) throw new TypeError("Invalid RFC-3339 date-time value");
            let [Q, Z, D, G, F, I, Y, W, J] = B, X = cp(lp(Z)), V = wN(D, "month", 1, 12), C = wN(G, "day", 1, 31), K = H91(X, V, C, {
                hours: F,
                minutes: I,
                seconds: Y,
                fractionalMilliseconds: W
            });
            if (J.toUpperCase() != "Z") K.setTime(K.getTime() - Xd9(J));
            return K
        },
        em9 = new RegExp(/^(?:Mon|Tue|Wed|Thu|Fri|Sat|Sun), (\d{2}) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) (\d{4}) (\d{1,2}):(\d{2}):(\d{2})(?:\.(\d+))? GMT$/),
        Ad9 = new RegExp(/^(?:Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday), (\d{2})-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)-(\d{2}) (\d{1,2}):(\d{2}):(\d{2})(?:\.(\d+))? GMT$/),
        Bd9 = new RegExp(/^(?:Mon|Tue|Wed|Thu|Fri|Sat|Sun) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) ( [1-9]|\d{2}) (\d{1,2}):(\d{2}):(\d{2})(?:\.(\d+))? (\d{4})$/),
        Qd9 = (A) => {
            if (A === null || A === void 0) return;
            if (typeof A !== "string") throw new TypeError("RFC-7231 date-times must be expressed as strings");
            let B = em9.exec(A);
            if (B) {
                let [Q, Z, D, G, F, I, Y, W] = B;
                return H91(cp(lp(G)), fn1(D), wN(Z, "day", 1, 31), {
                    hours: F,
                    minutes: I,
                    seconds: Y,
                    fractionalMilliseconds: W
                })
            }
            if (B = Ad9.exec(A), B) {
                let [Q, Z, D, G, F, I, Y, W] = B;
                return Fd9(H91(Dd9(G), fn1(D), wN(Z, "day", 1, 31), {
                    hours: F,
                    minutes: I,
                    seconds: Y,
                    fractionalMilliseconds: W
                }))
            }
            if (B = Bd9.exec(A), B) {
                let [Q, Z, D, G, F, I, Y, W] = B;
                return H91(cp(lp(W)), fn1(Z), wN(D.trimLeft(), "day", 1, 31), {
                    hours: G,
                    minutes: F,
                    seconds: I,
                    fractionalMilliseconds: Y
                })
            }
            throw new TypeError("Invalid RFC-7231 date-time value")
        },
        Zd9 = (A) => {
            if (A === null || A === void 0) return;
            let B;
            if (typeof A === "number") B = A;
            else if (typeof A === "string") B = cn1(A);
            else if (typeof A === "object" && A.tag === 1) B = A.value;
            else throw new TypeError("Epoch timestamps must be expressed as floating point numbers or their string representation");
            if (Number.isNaN(B) || B === 1 / 0 || B === -1 / 0) throw new TypeError("Epoch timestamps must be valid, non-Infinite, non-NaN numerics");
            return new Date(Math.round(B * 1000))
        },
        H91 = (A, B, Q, Z) => {
            let D = B - 1;
            return Yd9(A, D, Q), new Date(Date.UTC(A, D, Q, wN(Z.hours, "hour", 0, 23), wN(Z.minutes, "minute", 0, 59), wN(Z.seconds, "seconds", 0, 60), Jd9(Z.fractionalMilliseconds)))
        },
        Dd9 = (A) => {
            let B = new Date().getUTCFullYear(),
                Q = Math.floor(B / 100) * 100 + cp(lp(A));
            if (Q < B) return Q + 100;
            return Q
        },
        Gd9 = 1576800000000,
        Fd9 = (A) => {
            if (A.getTime() - new Date().getTime() > Gd9) return new Date(Date.UTC(A.getUTCFullYear() - 100, A.getUTCMonth(), A.getUTCDate(), A.getUTCHours(), A.getUTCMinutes(), A.getUTCSeconds(), A.getUTCMilliseconds()));
            return A
        },
        fn1 = (A) => {
            let B = pn1.indexOf(A);
            if (B < 0) throw new TypeError(`Invalid month: ${A}`);
            return B + 1
        },
        Id9 = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
        Yd9 = (A, B, Q) => {
            let Z = Id9[B];
            if (B === 1 && Wd9(A)) Z = 29;
            if (Q > Z) throw new TypeError(`Invalid day for ${pn1[B]} in ${A}: ${Q}`)
        },
        Wd9 = (A) => {
            return A % 4 === 0 && (A % 100 !== 0 || A % 400 === 0)
        },
        wN = (A, B, Q, Z) => {
            let D = V2A(lp(A));
            if (D < Q || D > Z) throw new TypeError(`${B} must be between ${Q} and ${Z}, inclusive`);
            return D
        },
        Jd9 = (A) => {
            if (A === null || A === void 0) return 0;
            return W2A("0." + A) * 1000
        },
        Xd9 = (A) => {
            let B = A[0],
                Q = 1;
            if (B == "+") Q = 1;
            else if (B == "-") Q = -1;
            else throw new TypeError(`Offset direction, ${B}, must be "+" or "-"`);
            let Z = Number(A.substring(1, 3)),
                D = Number(A.substring(4, 6));
            return Q * (Z * 60 + D) * 60 * 1000
        },
        lp = (A) => {
            let B = 0;
            while (B < A.length - 1 && A.charAt(B) === "0") B++;
            if (B === 0) return A;
            return A.slice(B)
        },
        Uh = function A(B) {
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
        };
    Uh.from = (A) => {
        if (A && typeof A === "object" && (A instanceof Uh || ("deserializeJSON" in A))) return A;
        else if (typeof A === "string" || Object.getPrototypeOf(A) === String.prototype) return Uh(String(A));
        return Uh(JSON.stringify(A))
    };
    Uh.fromObject = Uh.from;

    function Vd9(A) {
        if (A.includes(",") || A.includes('"')) A = `"${A.replace(/"/g,"\\\"")}"`;
        return A
    }

    function Cd9(A, B, Q) {
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
    var Kd9 = (A) => {
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
        },
        C2A = class {
            constructor(A, B) {
                this.string = A, this.type = B;
                let Q = 0;
                for (let Z = 0; Z < A.length; ++Z) {
                    let D = A.charCodeAt(Z);
                    if (Z === 0 && D === 45) continue;
                    if (D === 46) {
                        if (Q) throw new Error("@smithy/core/serde - NumericValue must contain at most one decimal point.");
                        Q = 1;
                        continue
                    }
                    if (D < 48 || D > 57) throw new Error('@smithy/core/serde - NumericValue must only contain [0-9], at most one decimal point ".", and an optional negation prefix "-".')
                }
            }
            toString() {
                return this.string
            } [Symbol.hasInstance](A) {
                if (!A || typeof A !== "object") return !1;
                let B = A;
                if (typeof B.string === "string" && typeof B.type === "string" && B.constructor?.name === "NumericValue") return !0;
                return !1
            }
        };

    function Hd9(A) {
        return new C2A(String(A), "bigDecimal")
    }
});