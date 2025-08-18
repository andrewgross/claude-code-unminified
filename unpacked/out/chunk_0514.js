/* chunk:514 bytes:[12189562, 12208755) size:19193 source:unpacked-cli.js */
function Wq1() {
    let A = [],
        B = UQ();
    for (let Q of B.allowedTools) A.push({
        source: "projectSettings",
        ruleBehavior: "allow",
        ruleValue: CK(Q)
    });
    for (let Q of uw) A.push(...py(Q));
    return A
}

function py(A) {
    let B = _Y(A);
    return gZ4(B, A)
}

function TeA(A) {
    let B = r8(A.ruleValue),
        Q = _Y(A.source);
    if (!Q || !Q.permissions) return !1;
    let Z = Q.permissions[A.ruleBehavior];
    if (!Z || !Z.includes(B)) return !1;
    try {
        let D = {
                ...Q,
                permissions: {
                    ...Q.permissions,
                    [A.ruleBehavior]: Z.filter((F) => F !== B)
                }
            },
            {
                error: G
            } = y6(A.source, D);
        if (G) return !1;
        return !0
    } catch (D) {
        return R1(D instanceof Error ? D : new Error(String(D))), !1
    }
}

function dZ4() {
    return {
        permissions: {
            allow: [],
            deny: [],
            ask: []
        }
    }
}

function Yq1({
    ruleValues: A,
    ruleBehavior: B
}, Q) {
    if (A.length < 1) return !0;
    let Z = A.map(r8),
        D = _Y(Q) || dZ4();
    try {
        let G = D.permissions || {},
            F = {
                ...D,
                permissions: {
                    ...G,
                    [B]: [...G[B] || [], ...Z]
                }
            };
        return y6(Q, F), !0
    } catch (G) {
        return R1(G instanceof Error ? G : new Error(String(G))), !1
    }
}
var h = {};
bj(h, {
    void: () => OD4,
    util: () => C6,
    unknown: () => MD4,
    union: () => Kq1,
    undefined: () => qD4,
    tuple: () => jD4,
    transformer: () => hD4,
    symbol: () => $D4,
    string: () => JQ,
    strictObject: () => TD4,
    setErrorMap: () => pZ4,
    set: () => yD4,
    record: () => js,
    quotelessJson: () => cZ4,
    promise: () => fD4,
    preprocess: () => mD4,
    pipeline: () => dD4,
    ostring: () => cD4,
    optional: () => gD4,
    onumber: () => lD4,
    oboolean: () => pD4,
    objectUtil: () => F40,
    object: () => HK,
    number: () => kg,
    nullable: () => uD4,
    null: () => ND4,
    never: () => RD4,
    nativeEnum: () => bD4,
    nan: () => ED4,
    map: () => kD4,
    makeIssue: () => b61,
    literal: () => vD4,
    lazy: () => xD4,
    late: () => HD4,
    isValid: () => iy,
    isDirty: () => Xq1,
    isAsync: () => zs,
    isAborted: () => Jq1,
    intersection: () => SD4,
    instanceof: () => zD4,
    getParsedType: () => HL,
    getErrorMap: () => Hs,
    function: () => _D4,
    enum: () => ks,
    effect: () => hD4,
    discriminatedUnion: () => PD4,
    defaultErrorMap: () => qT,
    datetimeRegex: () => _eA,
    date: () => wD4,
    custom: () => veA,
    coerce: () => iD4,
    boolean: () => UL,
    bigint: () => UD4,
    array: () => pw,
    any: () => LD4,
    addIssueToContext: () => u2,
    ZodVoid: () => h61,
    ZodUnknown: () => ny,
    ZodUnion: () => Ns,
    ZodUndefined: () => $s,
    ZodType: () => m4,
    ZodTuple: () => EL,
    ZodTransformer: () => lw,
    ZodSymbol: () => f61,
    ZodString: () => mw,
    ZodSet: () => Sg,
    ZodSchema: () => m4,
    ZodRecord: () => g61,
    ZodReadonly: () => Ss,
    ZodPromise: () => jg,
    ZodPipeline: () => d61,
    ZodParsedType: () => E2,
    ZodOptional: () => KK,
    ZodObject: () => lZ,
    ZodNumber: () => ay,
    ZodNullable: () => LT,
    ZodNull: () => qs,
    ZodNever: () => zL,
    ZodNativeEnum: () => Os,
    ZodNaN: () => m61,
    ZodMap: () => u61,
    ZodLiteral: () => Rs,
    ZodLazy: () => Ms,
    ZodIssueCode: () => aA,
    ZodIntersection: () => Ls,
    ZodFunction: () => Us,
    ZodFirstPartyTypeKind: () => A2,
    ZodError: () => kV,
    ZodEnum: () => ry,
    ZodEffects: () => lw,
    ZodDiscriminatedUnion: () => Vq1,
    ZodDefault: () => Ts,
    ZodDate: () => Tg,
    ZodCatch: () => Ps,
    ZodBranded: () => Cq1,
    ZodBoolean: () => ws,
    ZodBigInt: () => sy,
    ZodArray: () => dw,
    ZodAny: () => Pg,
    Schema: () => m4,
    ParseStatus: () => xY,
    OK: () => oW,
    NEVER: () => nD4,
    INVALID: () => AQ,
    EMPTY_PATH: () => iZ4,
    DIRTY: () => Og,
    BRAND: () => KD4
});
var C6;
(function(A) {
    A.assertEqual = (D) => {};

    function B(D) {}
    A.assertIs = B;

    function Q(D) {
        throw new Error
    }
    A.assertNever = Q, A.arrayToEnum = (D) => {
        let G = {};
        for (let F of D) G[F] = F;
        return G
    }, A.getValidEnumValues = (D) => {
        let G = A.objectKeys(D).filter((I) => typeof D[D[I]] !== "number"),
            F = {};
        for (let I of G) F[I] = D[I];
        return A.objectValues(F)
    }, A.objectValues = (D) => {
        return A.objectKeys(D).map(function(G) {
            return D[G]
        })
    }, A.objectKeys = typeof Object.keys === "function" ? (D) => Object.keys(D) : (D) => {
        let G = [];
        for (let F in D)
            if (Object.prototype.hasOwnProperty.call(D, F)) G.push(F);
        return G
    }, A.find = (D, G) => {
        for (let F of D)
            if (G(F)) return F;
        return
    }, A.isInteger = typeof Number.isInteger === "function" ? (D) => Number.isInteger(D) : (D) => typeof D === "number" && Number.isFinite(D) && Math.floor(D) === D;

    function Z(D, G = " | ") {
        return D.map((F) => typeof F === "string" ? `'${F}'` : F).join(G)
    }
    A.joinValues = Z, A.jsonStringifyReplacer = (D, G) => {
        if (typeof G === "bigint") return G.toString();
        return G
    }
})(C6 || (C6 = {}));
var F40;
(function(A) {
    A.mergeShapes = (B, Q) => {
        return {
            ...B,
            ...Q
        }
    }
})(F40 || (F40 = {}));
var E2 = C6.arrayToEnum(["string", "nan", "number", "integer", "float", "boolean", "date", "bigint", "symbol", "function", "undefined", "null", "array", "object", "unknown", "promise", "void", "never", "map", "set"]),
    HL = (A) => {
        switch (typeof A) {
            case "undefined":
                return E2.undefined;
            case "string":
                return E2.string;
            case "number":
                return Number.isNaN(A) ? E2.nan : E2.number;
            case "boolean":
                return E2.boolean;
            case "function":
                return E2.function;
            case "bigint":
                return E2.bigint;
            case "symbol":
                return E2.symbol;
            case "object":
                if (Array.isArray(A)) return E2.array;
                if (A === null) return E2.null;
                if (A.then && typeof A.then === "function" && A.catch && typeof A.catch === "function") return E2.promise;
                if (typeof Map !== "undefined" && A instanceof Map) return E2.map;
                if (typeof Set !== "undefined" && A instanceof Set) return E2.set;
                if (typeof Date !== "undefined" && A instanceof Date) return E2.date;
                return E2.object;
            default:
                return E2.unknown
        }
    };
var aA = C6.arrayToEnum(["invalid_type", "invalid_literal", "custom", "invalid_union", "invalid_union_discriminator", "invalid_enum_value", "unrecognized_keys", "invalid_arguments", "invalid_return_type", "invalid_date", "invalid_string", "too_small", "too_big", "invalid_intersection_types", "not_multiple_of", "not_finite"]),
    cZ4 = (A) => {
        return JSON.stringify(A, null, 2).replace(/"([^"]+)":/g, "$1:")
    };
class kV extends Error {
    get errors() {
        return this.issues
    }
    constructor(A) {
        super();
        this.issues = [], this.addIssue = (Q) => {
            this.issues = [...this.issues, Q]
        }, this.addIssues = (Q = []) => {
            this.issues = [...this.issues, ...Q]
        };
        let B = new.target.prototype;
        if (Object.setPrototypeOf) Object.setPrototypeOf(this, B);
        else this.__proto__ = B;
        this.name = "ZodError", this.issues = A
    }
    format(A) {
        let B = A || function(D) {
                return D.message
            },
            Q = {
                _errors: []
            },
            Z = (D) => {
                for (let G of D.issues)
                    if (G.code === "invalid_union") G.unionErrors.map(Z);
                    else if (G.code === "invalid_return_type") Z(G.returnTypeError);
                else if (G.code === "invalid_arguments") Z(G.argumentsError);
                else if (G.path.length === 0) Q._errors.push(B(G));
                else {
                    let F = Q,
                        I = 0;
                    while (I < G.path.length) {
                        let Y = G.path[I];
                        if (I !== G.path.length - 1) F[Y] = F[Y] || {
                            _errors: []
                        };
                        else F[Y] = F[Y] || {
                            _errors: []
                        }, F[Y]._errors.push(B(G));
                        F = F[Y], I++
                    }
                }
            };
        return Z(this), Q
    }
    static assert(A) {
        if (!(A instanceof kV)) throw new Error(`Not a ZodError: ${A}`)
    }
    toString() {
        return this.message
    }
    get message() {
        return JSON.stringify(this.issues, C6.jsonStringifyReplacer, 2)
    }
    get isEmpty() {
        return this.issues.length === 0
    }
    flatten(A = (B) => B.message) {
        let B = {},
            Q = [];
        for (let Z of this.issues)
            if (Z.path.length > 0) {
                let D = Z.path[0];
                B[D] = B[D] || [], B[D].push(A(Z))
            } else Q.push(A(Z));
        return {
            formErrors: Q,
            fieldErrors: B
        }
    }
    get formErrors() {
        return this.flatten()
    }
}
kV.create = (A) => {
    return new kV(A)
};
var lZ4 = (A, B) => {
        let Q;
        switch (A.code) {
            case aA.invalid_type:
                if (A.received === E2.undefined) Q = "Required";
                else Q = `Expected ${A.expected}, received ${A.received}`;
                break;
            case aA.invalid_literal:
                Q = `Invalid literal value, expected ${JSON.stringify(A.expected,C6.jsonStringifyReplacer)}`;
                break;
            case aA.unrecognized_keys:
                Q = `Unrecognized key(s) in object: ${C6.joinValues(A.keys,", ")}`;
                break;
            case aA.invalid_union:
                Q = "Invalid input";
                break;
            case aA.invalid_union_discriminator:
                Q = `Invalid discriminator value. Expected ${C6.joinValues(A.options)}`;
                break;
            case aA.invalid_enum_value:
                Q = `Invalid enum value. Expected ${C6.joinValues(A.options)}, received '${A.received}'`;
                break;
            case aA.invalid_arguments:
                Q = "Invalid function arguments";
                break;
            case aA.invalid_return_type:
                Q = "Invalid function return type";
                break;
            case aA.invalid_date:
                Q = "Invalid date";
                break;
            case aA.invalid_string:
                if (typeof A.validation === "object")
                    if ("includes" in A.validation) {
                        if (Q = `Invalid input: must include "${A.validation.includes}"`, typeof A.validation.position === "number") Q = `${Q} at one or more positions greater than or equal to ${A.validation.position}`
                    } else if ("startsWith" in A.validation) Q = `Invalid input: must start with "${A.validation.startsWith}"`;
                else if ("endsWith" in A.validation) Q = `Invalid input: must end with "${A.validation.endsWith}"`;
                else C6.assertNever(A.validation);
                else if (A.validation !== "regex") Q = `Invalid ${A.validation}`;
                else Q = "Invalid";
                break;
            case aA.too_small:
                if (A.type === "array") Q = `Array must contain ${A.exact?"exactly":A.inclusive?"at least":"more than"} ${A.minimum} element(s)`;
                else if (A.type === "string") Q = `String must contain ${A.exact?"exactly":A.inclusive?"at least":"over"} ${A.minimum} character(s)`;
                else if (A.type === "number") Q = `Number must be ${A.exact?"exactly equal to ":A.inclusive?"greater than or equal to ":"greater than "}${A.minimum}`;
                else if (A.type === "bigint") Q = `Number must be ${A.exact?"exactly equal to ":A.inclusive?"greater than or equal to ":"greater than "}${A.minimum}`;
                else if (A.type === "date") Q = `Date must be ${A.exact?"exactly equal to ":A.inclusive?"greater than or equal to ":"greater than "}${new Date(Number(A.minimum))}`;
                else Q = "Invalid input";
                break;
            case aA.too_big:
                if (A.type === "array") Q = `Array must contain ${A.exact?"exactly":A.inclusive?"at most":"less than"} ${A.maximum} element(s)`;
                else if (A.type === "string") Q = `String must contain ${A.exact?"exactly":A.inclusive?"at most":"under"} ${A.maximum} character(s)`;
                else if (A.type === "number") Q = `Number must be ${A.exact?"exactly":A.inclusive?"less than or equal to":"less than"} ${A.maximum}`;
                else if (A.type === "bigint") Q = `BigInt must be ${A.exact?"exactly":A.inclusive?"less than or equal to":"less than"} ${A.maximum}`;
                else if (A.type === "date") Q = `Date must be ${A.exact?"exactly":A.inclusive?"smaller than or equal to":"smaller than"} ${new Date(Number(A.maximum))}`;
                else Q = "Invalid input";
                break;
            case aA.custom:
                Q = "Invalid input";
                break;
            case aA.invalid_intersection_types:
                Q = "Intersection results could not be merged";
                break;
            case aA.not_multiple_of:
                Q = `Number must be a multiple of ${A.multipleOf}`;
                break;
            case aA.not_finite:
                Q = "Number must be finite";
                break;
            default:
                Q = B.defaultError, C6.assertNever(A)
        }
        return {
            message: Q
        }
    },
    qT = lZ4;
var PeA = qT;

function pZ4(A) {
    PeA = A
}

function Hs() {
    return PeA
}
var b61 = (A) => {
        let {
            data: B,
            path: Q,
            errorMaps: Z,
            issueData: D
        } = A, G = [...Q, ...D.path || []], F = {
            ...D,
            path: G
        };
        if (D.message !== void 0) return {
            ...D,
            path: G,
            message: D.message
        };
        let I = "",
            Y = Z.filter((W) => !!W).slice().reverse();
        for (let W of Y) I = W(F, {
            data: B,
            defaultError: I
        }).message;
        return {
            ...D,
            path: G,
            message: I
        }
    },
    iZ4 = [];

function u2(A, B) {
    let Q = Hs(),
        Z = b61({
            issueData: B,
            data: A.data,
            path: A.path,
            errorMaps: [A.common.contextualErrorMap, A.schemaErrorMap, Q, Q === qT ? void 0 : qT].filter((D) => !!D)
        });
    A.common.issues.push(Z)
}
class xY {
    constructor() {
        this.value = "valid"
    }
    dirty() {
        if (this.value === "valid") this.value = "dirty"
    }
    abort() {
        if (this.value !== "aborted") this.value = "aborted"
    }
    static mergeArray(A, B) {
        let Q = [];
        for (let Z of B) {
            if (Z.status === "aborted") return AQ;
            if (Z.status === "dirty") A.dirty();
            Q.push(Z.value)
        }
        return {
            status: A.value,
            value: Q
        }
    }
    static async mergeObjectAsync(A, B) {
        let Q = [];
        for (let Z of B) {
            let D = await Z.key,
                G = await Z.value;
            Q.push({
                key: D,
                value: G
            })
        }
        return xY.mergeObjectSync(A, Q)
    }
    static mergeObjectSync(A, B) {
        let Q = {};
        for (let Z of B) {
            let {
                key: D,
                value: G
            } = Z;
            if (D.status === "aborted") return AQ;
            if (G.status === "aborted") return AQ;
            if (D.status === "dirty") A.dirty();
            if (G.status === "dirty") A.dirty();
            if (D.value !== "__proto__" && (typeof G.value !== "undefined" || Z.alwaysSet)) Q[D.value] = G.value
        }
        return {
            status: A.value,
            value: Q
        }
    }
}
var AQ = Object.freeze({
        status: "aborted"
    }),
    Og = (A) => ({
        status: "dirty",
        value: A
    }),
    oW = (A) => ({
        status: "valid",
        value: A
    }),
    Jq1 = (A) => A.status === "aborted",
    Xq1 = (A) => A.status === "dirty",
    iy = (A) => A.status === "valid",
    zs = (A) => typeof Promise !== "undefined" && A instanceof Promise;
var X9;
(function(A) {
    A.errToObj = (B) => typeof B === "string" ? {
        message: B
    } : B || {}, A.toString = (B) => typeof B === "string" ? B : B?.message
})(X9 || (X9 = {}));
class cw {
    constructor(A, B, Q, Z) {
        this._cachedPath = [], this.parent = A, this.data = B, this._path = Q, this._key = Z
    }
    get path() {
        if (!this._cachedPath.length)
            if (Array.isArray(this._key)) this._cachedPath.push(...this._path, ...this._key);
            else this._cachedPath.push(...this._path, this._key);
        return this._cachedPath
    }
}
var SeA = (A, B) => {
    if (iy(B)) return {
        success: !0,
        data: B.value
    };
    else {
        if (!A.common.issues.length) throw new Error("Validation failed but no issues detected.");
        return {
            success: !1,
            get error() {
                if (this._error) return this._error;
                let Q = new kV(A.common.issues);
                return this._error = Q, this._error
            }
        }
    }
};

function W4(A) {
    if (!A) return {};
    let {
        errorMap: B,
        invalid_type_error: Q,
        required_error: Z,
        description: D
    } = A;
    if (B && (Q || Z)) throw new Error(`Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`);
    if (B) return {
        errorMap: B,
        description: D
    };
    return {
        errorMap: (F, I) => {
            let {
                message: Y
            } = A;
            if (F.code === "invalid_enum_value") return {
                message: Y ?? I.defaultError
            };
            if (typeof I.data === "undefined") return {
                message: Y ?? Z ?? I.defaultError
            };
            if (F.code !== "invalid_type") return {
                message: I.defaultError
            };
            return {
                message: Y ?? Q ?? I.defaultError
            }
        },
        description: D
    }
}