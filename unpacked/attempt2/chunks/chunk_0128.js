/* chunk:128 bytes:[2951833, 2964292) size:12459 source:unpacked-cli.js */
var NY = E((r45, mRA) => {
    var {
        types: mN,
        inspect: oRQ
    } = W1("node:util"), {
        markAsUncloneable: tRQ
    } = W1("node:worker_threads"), {
        toUSVString: eRQ
    } = e4(), Z2 = {};
    Z2.converters = {};
    Z2.util = {};
    Z2.errors = {};
    Z2.errors.exception = function(A) {
        return new TypeError(`${A.header}: ${A.message}`)
    };
    Z2.errors.conversionFailed = function(A) {
        let B = A.types.length === 1 ? "" : " one of",
            Q = `${A.argument} could not be converted to${B}: ${A.types.join(", ")}.`;
        return Z2.errors.exception({
            header: A.prefix,
            message: Q
        })
    };
    Z2.errors.invalidArgument = function(A) {
        return Z2.errors.exception({
            header: A.prefix,
            message: `"${A.value}" is an invalid ${A.type}.`
        })
    };
    Z2.brandCheck = function(A, B, Q) {
        if (Q?.strict !== !1) {
            if (!(A instanceof B)) {
                let Z = new TypeError("Illegal invocation");
                throw Z.code = "ERR_INVALID_THIS", Z
            }
        } else if (A?.[Symbol.toStringTag] !== B.prototype[Symbol.toStringTag]) {
            let Z = new TypeError("Illegal invocation");
            throw Z.code = "ERR_INVALID_THIS", Z
        }
    };
    Z2.argumentLengthCheck = function({
        length: A
    }, B, Q) {
        if (A < B) throw Z2.errors.exception({
            message: `${B} argument${B!==1?"s":""} required, but${A?" only":""} ${A} found.`,
            header: Q
        })
    };
    Z2.illegalConstructor = function() {
        throw Z2.errors.exception({
            header: "TypeError",
            message: "Illegal constructor"
        })
    };
    Z2.util.Type = function(A) {
        switch (typeof A) {
            case "undefined":
                return "Undefined";
            case "boolean":
                return "Boolean";
            case "string":
                return "String";
            case "symbol":
                return "Symbol";
            case "number":
                return "Number";
            case "bigint":
                return "BigInt";
            case "function":
            case "object": {
                if (A === null) return "Null";
                return "Object"
            }
        }
    };
    Z2.util.markAsUncloneable = tRQ || (() => {});
    Z2.util.ConvertToInt = function(A, B, Q, Z) {
        let D, G;
        if (B === 64)
            if (D = Math.pow(2, 53) - 1, Q === "unsigned") G = 0;
            else G = Math.pow(-2, 53) + 1;
        else if (Q === "unsigned") G = 0, D = Math.pow(2, B) - 1;
        else G = Math.pow(-2, B) - 1, D = Math.pow(2, B - 1) - 1;
        let F = Number(A);
        if (F === 0) F = 0;
        if (Z?.enforceRange === !0) {
            if (Number.isNaN(F) || F === Number.POSITIVE_INFINITY || F === Number.NEGATIVE_INFINITY) throw Z2.errors.exception({
                header: "Integer conversion",
                message: `Could not convert ${Z2.util.Stringify(A)} to an integer.`
            });
            if (F = Z2.util.IntegerPart(F), F < G || F > D) throw Z2.errors.exception({
                header: "Integer conversion",
                message: `Value must be between ${G}-${D}, got ${F}.`
            });
            return F
        }
        if (!Number.isNaN(F) && Z?.clamp === !0) {
            if (F = Math.min(Math.max(F, G), D), Math.floor(F) % 2 === 0) F = Math.floor(F);
            else F = Math.ceil(F);
            return F
        }
        if (Number.isNaN(F) || F === 0 && Object.is(0, F) || F === Number.POSITIVE_INFINITY || F === Number.NEGATIVE_INFINITY) return 0;
        if (F = Z2.util.IntegerPart(F), F = F % Math.pow(2, B), Q === "signed" && F >= Math.pow(2, B) - 1) return F - Math.pow(2, B);
        return F
    };
    Z2.util.IntegerPart = function(A) {
        let B = Math.floor(Math.abs(A));
        if (A < 0) return -1 * B;
        return B
    };
    Z2.util.Stringify = function(A) {
        switch (Z2.util.Type(A)) {
            case "Symbol":
                return `Symbol(${A.description})`;
            case "Object":
                return oRQ(A);
            case "String":
                return `"${A}"`;
            default:
                return `${A}`
        }
    };
    Z2.sequenceConverter = function(A) {
        return (B, Q, Z, D) => {
            if (Z2.util.Type(B) !== "Object") throw Z2.errors.exception({
                header: Q,
                message: `${Z} (${Z2.util.Stringify(B)}) is not iterable.`
            });
            let G = typeof D === "function" ? D() : B?.[Symbol.iterator]?.(),
                F = [],
                I = 0;
            if (G === void 0 || typeof G.next !== "function") throw Z2.errors.exception({
                header: Q,
                message: `${Z} is not iterable.`
            });
            while (!0) {
                let {
                    done: Y,
                    value: W
                } = G.next();
                if (Y) break;
                F.push(A(W, Q, `${Z}[${I++}]`))
            }
            return F
        }
    };
    Z2.recordConverter = function(A, B) {
        return (Q, Z, D) => {
            if (Z2.util.Type(Q) !== "Object") throw Z2.errors.exception({
                header: Z,
                message: `${D} ("${Z2.util.Type(Q)}") is not an Object.`
            });
            let G = {};
            if (!mN.isProxy(Q)) {
                let I = [...Object.getOwnPropertyNames(Q), ...Object.getOwnPropertySymbols(Q)];
                for (let Y of I) {
                    let W = A(Y, Z, D),
                        J = B(Q[Y], Z, D);
                    G[W] = J
                }
                return G
            }
            let F = Reflect.ownKeys(Q);
            for (let I of F)
                if (Reflect.getOwnPropertyDescriptor(Q, I)?.enumerable) {
                    let W = A(I, Z, D),
                        J = B(Q[I], Z, D);
                    G[W] = J
                } return G
        }
    };
    Z2.interfaceConverter = function(A) {
        return (B, Q, Z, D) => {
            if (D?.strict !== !1 && !(B instanceof A)) throw Z2.errors.exception({
                header: Q,
                message: `Expected ${Z} ("${Z2.util.Stringify(B)}") to be an instance of ${A.name}.`
            });
            return B
        }
    };
    Z2.dictionaryConverter = function(A) {
        return (B, Q, Z) => {
            let D = Z2.util.Type(B),
                G = {};
            if (D === "Null" || D === "Undefined") return G;
            else if (D !== "Object") throw Z2.errors.exception({
                header: Q,
                message: `Expected ${B} to be one of: Null, Undefined, Object.`
            });
            for (let F of A) {
                let {
                    key: I,
                    defaultValue: Y,
                    required: W,
                    converter: J
                } = F;
                if (W === !0) {
                    if (!Object.hasOwn(B, I)) throw Z2.errors.exception({
                        header: Q,
                        message: `Missing required key "${I}".`
                    })
                }
                let X = B[I],
                    V = Object.hasOwn(F, "defaultValue");
                if (V && X !== null) X ??= Y();
                if (W || V || X !== void 0) {
                    if (X = J(X, Q, `${Z}.${I}`), F.allowedValues && !F.allowedValues.includes(X)) throw Z2.errors.exception({
                        header: Q,
                        message: `${X} is not an accepted type. Expected one of ${F.allowedValues.join(", ")}.`
                    });
                    G[I] = X
                }
            }
            return G
        }
    };
    Z2.nullableConverter = function(A) {
        return (B, Q, Z) => {
            if (B === null) return B;
            return A(B, Q, Z)
        }
    };
    Z2.converters.DOMString = function(A, B, Q, Z) {
        if (A === null && Z?.legacyNullToEmptyString) return "";
        if (typeof A === "symbol") throw Z2.errors.exception({
            header: B,
            message: `${Q} is a symbol, which cannot be converted to a DOMString.`
        });
        return String(A)
    };
    Z2.converters.ByteString = function(A, B, Q) {
        let Z = Z2.converters.DOMString(A, B, Q);
        for (let D = 0; D < Z.length; D++)
            if (Z.charCodeAt(D) > 255) throw new TypeError(`Cannot convert argument to a ByteString because the character at index ${D} has a value of ${Z.charCodeAt(D)} which is greater than 255.`);
        return Z
    };
    Z2.converters.USVString = eRQ;
    Z2.converters.boolean = function(A) {
        return Boolean(A)
    };
    Z2.converters.any = function(A) {
        return A
    };
    Z2.converters["long long"] = function(A, B, Q) {
        return Z2.util.ConvertToInt(A, 64, "signed", void 0, B, Q)
    };
    Z2.converters["unsigned long long"] = function(A, B, Q) {
        return Z2.util.ConvertToInt(A, 64, "unsigned", void 0, B, Q)
    };
    Z2.converters["unsigned long"] = function(A, B, Q) {
        return Z2.util.ConvertToInt(A, 32, "unsigned", void 0, B, Q)
    };
    Z2.converters["unsigned short"] = function(A, B, Q, Z) {
        return Z2.util.ConvertToInt(A, 16, "unsigned", Z, B, Q)
    };
    Z2.converters.ArrayBuffer = function(A, B, Q, Z) {
        if (Z2.util.Type(A) !== "Object" || !mN.isAnyArrayBuffer(A)) throw Z2.errors.conversionFailed({
            prefix: B,
            argument: `${Q} ("${Z2.util.Stringify(A)}")`,
            types: ["ArrayBuffer"]
        });
        if (Z?.allowShared === !1 && mN.isSharedArrayBuffer(A)) throw Z2.errors.exception({
            header: "ArrayBuffer",
            message: "SharedArrayBuffer is not allowed."
        });
        if (A.resizable || A.growable) throw Z2.errors.exception({
            header: "ArrayBuffer",
            message: "Received a resizable ArrayBuffer."
        });
        return A
    };
    Z2.converters.TypedArray = function(A, B, Q, Z, D) {
        if (Z2.util.Type(A) !== "Object" || !mN.isTypedArray(A) || A.constructor.name !== B.name) throw Z2.errors.conversionFailed({
            prefix: Q,
            argument: `${Z} ("${Z2.util.Stringify(A)}")`,
            types: [B.name]
        });
        if (D?.allowShared === !1 && mN.isSharedArrayBuffer(A.buffer)) throw Z2.errors.exception({
            header: "ArrayBuffer",
            message: "SharedArrayBuffer is not allowed."
        });
        if (A.buffer.resizable || A.buffer.growable) throw Z2.errors.exception({
            header: "ArrayBuffer",
            message: "Received a resizable ArrayBuffer."
        });
        return A
    };
    Z2.converters.DataView = function(A, B, Q, Z) {
        if (Z2.util.Type(A) !== "Object" || !mN.isDataView(A)) throw Z2.errors.exception({
            header: B,
            message: `${Q} is not a DataView.`
        });
        if (Z?.allowShared === !1 && mN.isSharedArrayBuffer(A.buffer)) throw Z2.errors.exception({
            header: "ArrayBuffer",
            message: "SharedArrayBuffer is not allowed."
        });
        if (A.buffer.resizable || A.buffer.growable) throw Z2.errors.exception({
            header: "ArrayBuffer",
            message: "Received a resizable ArrayBuffer."
        });
        return A
    };
    Z2.converters.BufferSource = function(A, B, Q, Z) {
        if (mN.isAnyArrayBuffer(A)) return Z2.converters.ArrayBuffer(A, B, Q, {
            ...Z,
            allowShared: !1
        });
        if (mN.isTypedArray(A)) return Z2.converters.TypedArray(A, A.constructor, B, Q, {
            ...Z,
            allowShared: !1
        });
        if (mN.isDataView(A)) return Z2.converters.DataView(A, B, Q, {
            ...Z,
            allowShared: !1
        });
        throw Z2.errors.conversionFailed({
            prefix: B,
            argument: `${Q} ("${Z2.util.Stringify(A)}")`,
            types: ["BufferSource"]
        })
    };
    Z2.converters["sequence<ByteString>"] = Z2.sequenceConverter(Z2.converters.ByteString);
    Z2.converters["sequence<sequence<ByteString>>"] = Z2.sequenceConverter(Z2.converters["sequence<ByteString>"]);
    Z2.converters["record<ByteString, ByteString>"] = Z2.recordConverter(Z2.converters.ByteString, Z2.converters.ByteString);
    mRA.exports = {
        webidl: Z2
    }
});