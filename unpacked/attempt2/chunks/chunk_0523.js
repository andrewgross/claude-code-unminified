/* chunk:523 bytes:[12348085, 12366595) size:18510 source:unpacked-cli.js */
function yq1(A, B) {
    let Q = {
        type: "string"
    };
    if (A.checks)
        for (let Z of A.checks) switch (Z.kind) {
            case "min":
                n6(Q, "minLength", typeof Q.minLength === "number" ? Math.max(Q.minLength, Z.value) : Z.value, Z.message, B);
                break;
            case "max":
                n6(Q, "maxLength", typeof Q.maxLength === "number" ? Math.min(Q.maxLength, Z.value) : Z.value, Z.message, B);
                break;
            case "email":
                switch (B.emailStrategy) {
                    case "format:email":
                        aw(Q, "email", Z.message, B);
                        break;
                    case "format:idn-email":
                        aw(Q, "idn-email", Z.message, B);
                        break;
                    case "pattern:zod":
                        BX(Q, nw.email, Z.message, B);
                        break
                }
                break;
            case "url":
                aw(Q, "uri", Z.message, B);
                break;
            case "uuid":
                aw(Q, "uuid", Z.message, B);
                break;
            case "regex":
                BX(Q, Z.regex, Z.message, B);
                break;
            case "cuid":
                BX(Q, nw.cuid, Z.message, B);
                break;
            case "cuid2":
                BX(Q, nw.cuid2, Z.message, B);
                break;
            case "startsWith":
                BX(Q, RegExp(`^${_40(Z.value,B)}`), Z.message, B);
                break;
            case "endsWith":
                BX(Q, RegExp(`${_40(Z.value,B)}$`), Z.message, B);
                break;
            case "datetime":
                aw(Q, "date-time", Z.message, B);
                break;
            case "date":
                aw(Q, "date", Z.message, B);
                break;
            case "time":
                aw(Q, "time", Z.message, B);
                break;
            case "duration":
                aw(Q, "duration", Z.message, B);
                break;
            case "length":
                n6(Q, "minLength", typeof Q.minLength === "number" ? Math.max(Q.minLength, Z.value) : Z.value, Z.message, B), n6(Q, "maxLength", typeof Q.maxLength === "number" ? Math.min(Q.maxLength, Z.value) : Z.value, Z.message, B);
                break;
            case "includes": {
                BX(Q, RegExp(_40(Z.value, B)), Z.message, B);
                break
            }
            case "ip": {
                if (Z.version !== "v6") aw(Q, "ipv4", Z.message, B);
                if (Z.version !== "v4") aw(Q, "ipv6", Z.message, B);
                break
            }
            case "base64url":
                BX(Q, nw.base64url, Z.message, B);
                break;
            case "jwt":
                BX(Q, nw.jwt, Z.message, B);
                break;
            case "cidr": {
                if (Z.version !== "v6") BX(Q, nw.ipv4Cidr, Z.message, B);
                if (Z.version !== "v4") BX(Q, nw.ipv6Cidr, Z.message, B);
                break
            }
            case "emoji":
                BX(Q, nw.emoji(), Z.message, B);
                break;
            case "ulid": {
                BX(Q, nw.ulid, Z.message, B);
                break
            }
            case "base64": {
                switch (B.base64Strategy) {
                    case "format:binary": {
                        aw(Q, "binary", Z.message, B);
                        break
                    }
                    case "contentEncoding:base64": {
                        n6(Q, "contentEncoding", "base64", Z.message, B);
                        break
                    }
                    case "pattern:zod": {
                        BX(Q, nw.base64, Z.message, B);
                        break
                    }
                }
                break
            }
            case "nanoid":
                BX(Q, nw.nanoid, Z.message, B);
            case "toLowerCase":
            case "toUpperCase":
            case "trim":
                break;
            default:
                ((D) => {})(Z)
        }
    return Q
}

function _40(A, B) {
    return B.patternStrategy === "escape" ? OG4(A) : A
}
var RG4 = new Set("ABCDEFGHIJKLMNOPQRSTUVXYZabcdefghijklmnopqrstuvxyz0123456789");

function OG4(A) {
    let B = "";
    for (let Q = 0; Q < A.length; Q++) {
        if (!RG4.has(A[Q])) B += "\\";
        B += A[Q]
    }
    return B
}

function aw(A, B, Q, Z) {
    if (A.format || A.anyOf?.some((D) => D.format)) {
        if (!A.anyOf) A.anyOf = [];
        if (A.format) {
            if (A.anyOf.push({
                    format: A.format,
                    ...A.errorMessage && Z.errorMessages && {
                        errorMessage: {
                            format: A.errorMessage.format
                        }
                    }
                }), delete A.format, A.errorMessage) {
                if (delete A.errorMessage.format, Object.keys(A.errorMessage).length === 0) delete A.errorMessage
            }
        }
        A.anyOf.push({
            format: B,
            ...Q && Z.errorMessages && {
                errorMessage: {
                    format: Q
                }
            }
        })
    } else n6(A, "format", B, Q, Z)
}

function BX(A, B, Q, Z) {
    if (A.pattern || A.allOf?.some((D) => D.pattern)) {
        if (!A.allOf) A.allOf = [];
        if (A.pattern) {
            if (A.allOf.push({
                    pattern: A.pattern,
                    ...A.errorMessage && Z.errorMessages && {
                        errorMessage: {
                            pattern: A.errorMessage.pattern
                        }
                    }
                }), delete A.pattern, A.errorMessage) {
                if (delete A.errorMessage.pattern, Object.keys(A.errorMessage).length === 0) delete A.errorMessage
            }
        }
        A.allOf.push({
            pattern: O12(B, Z),
            ...Q && Z.errorMessages && {
                errorMessage: {
                    pattern: Q
                }
            }
        })
    } else n6(A, "pattern", O12(B, Z), Q, Z)
}

function O12(A, B) {
    if (!B.applyRegexFlags || !A.flags) return A.source;
    let Q = {
            i: A.flags.includes("i"),
            m: A.flags.includes("m"),
            s: A.flags.includes("s")
        },
        Z = Q.i ? A.source.toLowerCase() : A.source,
        D = "",
        G = !1,
        F = !1,
        I = !1;
    for (let Y = 0; Y < Z.length; Y++) {
        if (G) {
            D += Z[Y], G = !1;
            continue
        }
        if (Q.i) {
            if (F) {
                if (Z[Y].match(/[a-z]/)) {
                    if (I) D += Z[Y], D += `${Z[Y-2]}-${Z[Y]}`.toUpperCase(), I = !1;
                    else if (Z[Y + 1] === "-" && Z[Y + 2]?.match(/[a-z]/)) D += Z[Y], I = !0;
                    else D += `${Z[Y]}${Z[Y].toUpperCase()}`;
                    continue
                }
            } else if (Z[Y].match(/[a-z]/)) {
                D += `[${Z[Y]}${Z[Y].toUpperCase()}]`;
                continue
            }
        }
        if (Q.m) {
            if (Z[Y] === "^") {
                D += `(^|(?<=[\r
]))`;
                continue
            } else if (Z[Y] === "$") {
                D += `($|(?=[\r
]))`;
                continue
            }
        }
        if (Q.s && Z[Y] === ".") {
            D += F ? `${Z[Y]}\r
` : `[${Z[Y]}\r
]`;
            continue
        }
        if (D += Z[Y], Z[Y] === "\\") G = !0;
        else if (F && Z[Y] === "]") F = !1;
        else if (!F && Z[Y] === "[") F = !0
    }
    try {
        new RegExp(D)
    } catch {
        return console.warn(`Could not convert regex pattern at ${B.currentPath.join("/")} to a flag-independent form! Falling back to the flag-ignorant source`), A.source
    }
    return D
}

function _q1(A, B) {
    if (B.target === "openAi") console.warn("Warning: OpenAI may not support records in schemas! Try an array of key-value pairs instead.");
    if (B.target === "openApi3" && A.keyType?._def.typeName === A2.ZodEnum) return {
        type: "object",
        required: A.keyType._def.values,
        properties: A.keyType._def.values.reduce((Z, D) => ({
            ...Z,
            [D]: wQ(A.valueType._def, {
                ...B,
                currentPath: [...B.currentPath, "properties", D]
            }) ?? {}
        }), {}),
        additionalProperties: B.rejectedAdditionalProperties
    };
    let Q = {
        type: "object",
        additionalProperties: wQ(A.valueType._def, {
            ...B,
            currentPath: [...B.currentPath, "additionalProperties"]
        }) ?? B.allowedAdditionalProperties
    };
    if (B.target === "openApi3") return Q;
    if (A.keyType?._def.typeName === A2.ZodString && A.keyType._def.checks?.length) {
        let {
            type: Z,
            ...D
        } = yq1(A.keyType._def, B);
        return {
            ...Q,
            propertyNames: D
        }
    } else if (A.keyType?._def.typeName === A2.ZodEnum) return {
        ...Q,
        propertyNames: {
            enum: A.keyType._def.values
        }
    };
    else if (A.keyType?._def.typeName === A2.ZodBranded && A.keyType._def.type._def.typeName === A2.ZodString && A.keyType._def.type._def.checks?.length) {
        let {
            type: Z,
            ...D
        } = kq1(A.keyType._def, B);
        return {
            ...Q,
            propertyNames: D
        }
    }
    return Q
}

function T12(A, B) {
    if (B.mapStrategy === "record") return _q1(A, B);
    let Q = wQ(A.keyType._def, {
            ...B,
            currentPath: [...B.currentPath, "items", "items", "0"]
        }) || {},
        Z = wQ(A.valueType._def, {
            ...B,
            currentPath: [...B.currentPath, "items", "items", "1"]
        }) || {};
    return {
        type: "array",
        maxItems: 125,
        items: {
            type: "array",
            items: [Q, Z],
            minItems: 2,
            maxItems: 2
        }
    }
}

function P12(A) {
    let B = A.values,
        Z = Object.keys(A.values).filter((G) => {
            return typeof B[B[G]] !== "number"
        }).map((G) => B[G]),
        D = Array.from(new Set(Z.map((G) => typeof G)));
    return {
        type: D.length === 1 ? D[0] === "string" ? "string" : "number" : ["string", "number"],
        enum: Z
    }
}

function S12() {
    return {
        not: {}
    }
}

function j12(A) {
    return A.target === "openApi3" ? {
        enum: ["null"],
        nullable: !0
    } : {
        type: "null"
    }
}
var o61 = {
    ZodString: "string",
    ZodNumber: "number",
    ZodBigInt: "integer",
    ZodBoolean: "boolean",
    ZodNull: "null"
};

function y12(A, B) {
    if (B.target === "openApi3") return k12(A, B);
    let Q = A.options instanceof Map ? Array.from(A.options.values()) : A.options;
    if (Q.every((Z) => (Z._def.typeName in o61) && (!Z._def.checks || !Z._def.checks.length))) {
        let Z = Q.reduce((D, G) => {
            let F = o61[G._def.typeName];
            return F && !D.includes(F) ? [...D, F] : D
        }, []);
        return {
            type: Z.length > 1 ? Z : Z[0]
        }
    } else if (Q.every((Z) => Z._def.typeName === "ZodLiteral" && !Z.description)) {
        let Z = Q.reduce((D, G) => {
            let F = typeof G._def.value;
            switch (F) {
                case "string":
                case "number":
                case "boolean":
                    return [...D, F];
                case "bigint":
                    return [...D, "integer"];
                case "object":
                    if (G._def.value === null) return [...D, "null"];
                case "symbol":
                case "undefined":
                case "function":
                default:
                    return D
            }
        }, []);
        if (Z.length === Q.length) {
            let D = Z.filter((G, F, I) => I.indexOf(G) === F);
            return {
                type: D.length > 1 ? D : D[0],
                enum: Q.reduce((G, F) => {
                    return G.includes(F._def.value) ? G : [...G, F._def.value]
                }, [])
            }
        }
    } else if (Q.every((Z) => Z._def.typeName === "ZodEnum")) return {
        type: "string",
        enum: Q.reduce((Z, D) => [...Z, ...D._def.values.filter((G) => !Z.includes(G))], [])
    };
    return k12(A, B)
}
var k12 = (A, B) => {
    let Q = (A.options instanceof Map ? Array.from(A.options.values()) : A.options).map((Z, D) => wQ(Z._def, {
        ...B,
        currentPath: [...B.currentPath, "anyOf", `${D}`]
    })).filter((Z) => !!Z && (!B.strictUnions || typeof Z === "object" && Object.keys(Z).length > 0));
    return Q.length ? {
        anyOf: Q
    } : void 0
};

function _12(A, B) {
    if (["ZodString", "ZodNumber", "ZodBigInt", "ZodBoolean", "ZodNull"].includes(A.innerType._def.typeName) && (!A.innerType._def.checks || !A.innerType._def.checks.length)) {
        if (B.target === "openApi3") return {
            type: o61[A.innerType._def.typeName],
            nullable: !0
        };
        return {
            type: [o61[A.innerType._def.typeName], "null"]
        }
    }
    if (B.target === "openApi3") {
        let Z = wQ(A.innerType._def, {
            ...B,
            currentPath: [...B.currentPath]
        });
        if (Z && "$ref" in Z) return {
            allOf: [Z],
            nullable: !0
        };
        return Z && {
            ...Z,
            nullable: !0
        }
    }
    let Q = wQ(A.innerType._def, {
        ...B,
        currentPath: [...B.currentPath, "anyOf", "0"]
    });
    return Q && {
        anyOf: [Q, {
            type: "null"
        }]
    }
}

function x12(A, B) {
    let Q = {
        type: "number"
    };
    if (!A.checks) return Q;
    for (let Z of A.checks) switch (Z.kind) {
        case "int":
            Q.type = "integer", j40(Q, "type", Z.message, B);
            break;
        case "min":
            if (B.target === "jsonSchema7")
                if (Z.inclusive) n6(Q, "minimum", Z.value, Z.message, B);
                else n6(Q, "exclusiveMinimum", Z.value, Z.message, B);
            else {
                if (!Z.inclusive) Q.exclusiveMinimum = !0;
                n6(Q, "minimum", Z.value, Z.message, B)
            }
            break;
        case "max":
            if (B.target === "jsonSchema7")
                if (Z.inclusive) n6(Q, "maximum", Z.value, Z.message, B);
                else n6(Q, "exclusiveMaximum", Z.value, Z.message, B);
            else {
                if (!Z.inclusive) Q.exclusiveMaximum = !0;
                n6(Q, "maximum", Z.value, Z.message, B)
            }
            break;
        case "multipleOf":
            n6(Q, "multipleOf", Z.value, Z.message, B);
            break
    }
    return Q
}

function v12(A, B) {
    let Q = B.target === "openAi",
        Z = {
            type: "object",
            properties: {}
        },
        D = [],
        G = A.shape();
    for (let I in G) {
        let Y = G[I];
        if (Y === void 0 || Y._def === void 0) continue;
        let W = PG4(Y);
        if (W && Q) {
            if (Y instanceof KK) Y = Y._def.innerType;
            if (!Y.isNullable()) Y = Y.nullable();
            W = !1
        }
        let J = wQ(Y._def, {
            ...B,
            currentPath: [...B.currentPath, "properties", I],
            propertyPath: [...B.currentPath, "properties", I]
        });
        if (J === void 0) continue;
        if (Z.properties[I] = J, !W) D.push(I)
    }
    if (D.length) Z.required = D;
    let F = TG4(A, B);
    if (F !== void 0) Z.additionalProperties = F;
    return Z
}

function TG4(A, B) {
    if (A.catchall._def.typeName !== "ZodNever") return wQ(A.catchall._def, {
        ...B,
        currentPath: [...B.currentPath, "additionalProperties"]
    });
    switch (A.unknownKeys) {
        case "passthrough":
            return B.allowedAdditionalProperties;
        case "strict":
            return B.rejectedAdditionalProperties;
        case "strip":
            return B.removeAdditionalStrategy === "strict" ? B.allowedAdditionalProperties : B.rejectedAdditionalProperties
    }
}

function PG4(A) {
    try {
        return A.isOptional()
    } catch {
        return !0
    }
}
var b12 = (A, B) => {
    if (B.currentPath.toString() === B.propertyPath?.toString()) return wQ(A.innerType._def, B);
    let Q = wQ(A.innerType._def, {
        ...B,
        currentPath: [...B.currentPath, "anyOf", "1"]
    });
    return Q ? {
        anyOf: [{
            not: {}
        }, Q]
    } : {}
};
var f12 = (A, B) => {
    if (B.pipeStrategy === "input") return wQ(A.in._def, B);
    else if (B.pipeStrategy === "output") return wQ(A.out._def, B);
    let Q = wQ(A.in._def, {
            ...B,
            currentPath: [...B.currentPath, "allOf", "0"]
        }),
        Z = wQ(A.out._def, {
            ...B,
            currentPath: [...B.currentPath, "allOf", Q ? "1" : "0"]
        });
    return {
        allOf: [Q, Z].filter((D) => D !== void 0)
    }
};

function h12(A, B) {
    return wQ(A.type._def, B)
}

function g12(A, B) {
    let Z = {
        type: "array",
        uniqueItems: !0,
        items: wQ(A.valueType._def, {
            ...B,
            currentPath: [...B.currentPath, "items"]
        })
    };
    if (A.minSize) n6(Z, "minItems", A.minSize.value, A.minSize.message, B);
    if (A.maxSize) n6(Z, "maxItems", A.maxSize.value, A.maxSize.message, B);
    return Z
}

function u12(A, B) {
    if (A.rest) return {
        type: "array",
        minItems: A.items.length,
        items: A.items.map((Q, Z) => wQ(Q._def, {
            ...B,
            currentPath: [...B.currentPath, "items", `${Z}`]
        })).reduce((Q, Z) => Z === void 0 ? Q : [...Q, Z], []),
        additionalItems: wQ(A.rest._def, {
            ...B,
            currentPath: [...B.currentPath, "additionalItems"]
        })
    };
    else return {
        type: "array",
        minItems: A.items.length,
        maxItems: A.items.length,
        items: A.items.map((Q, Z) => wQ(Q._def, {
            ...B,
            currentPath: [...B.currentPath, "items", `${Z}`]
        })).reduce((Q, Z) => Z === void 0 ? Q : [...Q, Z], [])
    }
}

function m12() {
    return {
        not: {}
    }
}

function d12() {
    return {}
}
var c12 = (A, B) => {
    return wQ(A.innerType._def, B)
};