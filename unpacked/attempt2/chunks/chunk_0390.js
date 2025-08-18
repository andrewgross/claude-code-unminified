/* chunk:390 bytes:[9156822, 9174887) size:18065 source:unpacked-cli.js */
var zZB = E((d23, HZB) => {
    HZB.exports = function A(B, Q, Z) {
        var D = " ",
            G = B.level,
            F = B.dataLevel,
            I = B.schema[Q],
            Y = B.schemaPath + B.util.getProperty(Q),
            W = B.errSchemaPath + "/" + Q,
            J = !B.opts.allErrors,
            X, V = "data" + (F || ""),
            C = "valid" + G,
            K = "errs__" + G,
            H = B.opts.$data && I && I.$data,
            z;
        if (H) D += " var schema" + G + " = " + B.util.getData(I.$data, F, B.dataPathArr) + "; ", z = "schema" + G;
        else z = I;
        var $ = this,
            L = "definition" + G,
            N = $.definition,
            R = "",
            O, P, j, f, k;
        if (H && N.$data) {
            k = "keywordValidate" + G;
            var c = N.validateSchema;
            D += " var " + L + " = RULES.custom['" + Q + "'].definition; var " + k + " = " + L + ".validate;"
        } else {
            if (f = B.useCustomRule($, I, B.schema, B), !f) return;
            z = "validate.schema" + Y, k = f.code, O = N.compile, P = N.inline, j = N.macro
        }
        var u = k + ".errors",
            a = "i" + G,
            l = "ruleErr" + G,
            y = N.async;
        if (y && !B.async) throw new Error("async keyword in sync schema");
        if (!(P || j)) D += "" + u + " = null;";
        if (D += "var " + K + " = errors;var " + C + ";", H && N.$data) {
            if (R += "}", D += " if (" + z + " === undefined) { " + C + " = true; } else { ", c) R += "}", D += " " + C + " = " + L + ".validateSchema(" + z + "); if (" + C + ") { "
        }
        if (P)
            if (N.statements) D += " " + f.validate + " ";
            else D += " " + C + " = " + f.validate + "; ";
        else if (j) {
            var t = B.util.copy(B),
                R = "";
            t.level++;
            var E1 = "valid" + t.level;
            t.schema = f.validate, t.schemaPath = "";
            var C1 = B.compositeRule;
            B.compositeRule = t.compositeRule = !0;
            var _1 = B.validate(t).replace(/validate\.schema/g, k);
            B.compositeRule = t.compositeRule = C1, D += " " + _1
        } else {
            var F0 = F0 || [];
            if (F0.push(D), D = "", D += "  " + k + ".call( ", B.opts.passContext) D += "this";
            else D += "self";
            if (O || N.schema === !1) D += " , " + V + " ";
            else D += " , " + z + " , " + V + " , validate.schema" + B.schemaPath + " ";
            if (D += " , (dataPath || '')", B.errorPath != '""') D += " + " + B.errorPath;
            var W0 = F ? "data" + (F - 1 || "") : "parentData",
                g1 = F ? B.dataPathArr[F] : "parentDataProperty";
            D += " , " + W0 + " , " + g1 + " , rootData )  ";
            var w1 = D;
            if (D = F0.pop(), N.errors === !1) {
                if (D += " " + C + " = ", y) D += "await ";
                D += "" + w1 + "; "
            } else if (y) u = "customErrors" + G, D += " var " + u + " = null; try { " + C + " = await " + w1 + "; } catch (e) { " + C + " = false; if (e instanceof ValidationError) " + u + " = e.errors; else throw e; } ";
            else D += " " + u + " = null; " + C + " = " + w1 + "; "
        }
        if (N.modifying) D += " if (" + W0 + ") " + V + " = " + W0 + "[" + g1 + "];";
        if (D += "" + R, N.valid) {
            if (J) D += " if (true) { "
        } else {
            if (D += " if ( ", N.valid === void 0)
                if (D += " !", j) D += "" + E1;
                else D += "" + C;
            else D += " " + !N.valid + " ";
            D += ") { ", X = $.keyword;
            var F0 = F0 || [];
            F0.push(D), D = "";
            var F0 = F0 || [];
            if (F0.push(D), D = "", B.createErrors !== !1) {
                if (D += " { keyword: '" + (X || "custom") + "' , dataPath: (dataPath || '') + " + B.errorPath + " , schemaPath: " + B.util.toQuotedString(W) + " , params: { keyword: '" + $.keyword + "' } ", B.opts.messages !== !1) D += ` , message: 'should pass "` + $.keyword + `" keyword validation' `;
                if (B.opts.verbose) D += " , schema: validate.schema" + Y + " , parentSchema: validate.schema" + B.schemaPath + " , data: " + V + " ";
                D += " } "
            } else D += " {} ";
            var Q1 = D;
            if (D = F0.pop(), !B.compositeRule && J)
                if (B.async) D += " throw new ValidationError([" + Q1 + "]); ";
                else D += " validate.errors = [" + Q1 + "]; return false; ";
            else D += " var err = " + Q1 + ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ";
            var k1 = D;
            if (D = F0.pop(), P)
                if (N.errors) {
                    if (N.errors != "full") {
                        if (D += "  for (var " + a + "=" + K + "; " + a + "<errors; " + a + "++) { var " + l + " = vErrors[" + a + "]; if (" + l + ".dataPath === undefined) " + l + ".dataPath = (dataPath || '') + " + B.errorPath + "; if (" + l + ".schemaPath === undefined) { " + l + '.schemaPath = "' + W + '"; } ', B.opts.verbose) D += " " + l + ".schema = " + z + "; " + l + ".data = " + V + "; ";
                        D += " } "
                    }
                } else if (N.errors === !1) D += " " + k1 + " ";
            else {
                if (D += " if (" + K + " == errors) { " + k1 + " } else {  for (var " + a + "=" + K + "; " + a + "<errors; " + a + "++) { var " + l + " = vErrors[" + a + "]; if (" + l + ".dataPath === undefined) " + l + ".dataPath = (dataPath || '') + " + B.errorPath + "; if (" + l + ".schemaPath === undefined) { " + l + '.schemaPath = "' + W + '"; } ', B.opts.verbose) D += " " + l + ".schema = " + z + "; " + l + ".data = " + V + "; ";
                D += " } } "
            } else if (j) {
                if (D += "   var err =   ", B.createErrors !== !1) {
                    if (D += " { keyword: '" + (X || "custom") + "' , dataPath: (dataPath || '') + " + B.errorPath + " , schemaPath: " + B.util.toQuotedString(W) + " , params: { keyword: '" + $.keyword + "' } ", B.opts.messages !== !1) D += ` , message: 'should pass "` + $.keyword + `" keyword validation' `;
                    if (B.opts.verbose) D += " , schema: validate.schema" + Y + " , parentSchema: validate.schema" + B.schemaPath + " , data: " + V + " ";
                    D += " } "
                } else D += " {} ";
                if (D += ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ", !B.compositeRule && J)
                    if (B.async) D += " throw new ValidationError(vErrors); ";
                    else D += " validate.errors = vErrors; return false; "
            } else if (N.errors === !1) D += " " + k1 + " ";
            else {
                if (D += " if (Array.isArray(" + u + ")) { if (vErrors === null) vErrors = " + u + "; else vErrors = vErrors.concat(" + u + "); errors = vErrors.length;  for (var " + a + "=" + K + "; " + a + "<errors; " + a + "++) { var " + l + " = vErrors[" + a + "]; if (" + l + ".dataPath === undefined) " + l + ".dataPath = (dataPath || '') + " + B.errorPath + ";  " + l + '.schemaPath = "' + W + '";  ', B.opts.verbose) D += " " + l + ".schema = " + z + "; " + l + ".data = " + V + "; ";
                D += " } } else { " + k1 + " } "
            }
            if (D += " } ", J) D += " else { "
        }
        return D
    }
});
var uH0 = E((c23, J_6) => {
    J_6.exports = {
        $schema: "http://json-schema.org/draft-07/schema#",
        $id: "http://json-schema.org/draft-07/schema#",
        title: "Core schema meta-schema",
        definitions: {
            schemaArray: {
                type: "array",
                minItems: 1,
                items: {
                    $ref: "#"
                }
            },
            nonNegativeInteger: {
                type: "integer",
                minimum: 0
            },
            nonNegativeIntegerDefault0: {
                allOf: [{
                    $ref: "#/definitions/nonNegativeInteger"
                }, {
                    default: 0
                }]
            },
            simpleTypes: {
                enum: ["array", "boolean", "integer", "null", "number", "object", "string"]
            },
            stringArray: {
                type: "array",
                items: {
                    type: "string"
                },
                uniqueItems: !0,
                default: []
            }
        },
        type: ["object", "boolean"],
        properties: {
            $id: {
                type: "string",
                format: "uri-reference"
            },
            $schema: {
                type: "string",
                format: "uri"
            },
            $ref: {
                type: "string",
                format: "uri-reference"
            },
            $comment: {
                type: "string"
            },
            title: {
                type: "string"
            },
            description: {
                type: "string"
            },
            default: !0,
            readOnly: {
                type: "boolean",
                default: !1
            },
            examples: {
                type: "array",
                items: !0
            },
            multipleOf: {
                type: "number",
                exclusiveMinimum: 0
            },
            maximum: {
                type: "number"
            },
            exclusiveMaximum: {
                type: "number"
            },
            minimum: {
                type: "number"
            },
            exclusiveMinimum: {
                type: "number"
            },
            maxLength: {
                $ref: "#/definitions/nonNegativeInteger"
            },
            minLength: {
                $ref: "#/definitions/nonNegativeIntegerDefault0"
            },
            pattern: {
                type: "string",
                format: "regex"
            },
            additionalItems: {
                $ref: "#"
            },
            items: {
                anyOf: [{
                    $ref: "#"
                }, {
                    $ref: "#/definitions/schemaArray"
                }],
                default: !0
            },
            maxItems: {
                $ref: "#/definitions/nonNegativeInteger"
            },
            minItems: {
                $ref: "#/definitions/nonNegativeIntegerDefault0"
            },
            uniqueItems: {
                type: "boolean",
                default: !1
            },
            contains: {
                $ref: "#"
            },
            maxProperties: {
                $ref: "#/definitions/nonNegativeInteger"
            },
            minProperties: {
                $ref: "#/definitions/nonNegativeIntegerDefault0"
            },
            required: {
                $ref: "#/definitions/stringArray"
            },
            additionalProperties: {
                $ref: "#"
            },
            definitions: {
                type: "object",
                additionalProperties: {
                    $ref: "#"
                },
                default: {}
            },
            properties: {
                type: "object",
                additionalProperties: {
                    $ref: "#"
                },
                default: {}
            },
            patternProperties: {
                type: "object",
                additionalProperties: {
                    $ref: "#"
                },
                propertyNames: {
                    format: "regex"
                },
                default: {}
            },
            dependencies: {
                type: "object",
                additionalProperties: {
                    anyOf: [{
                        $ref: "#"
                    }, {
                        $ref: "#/definitions/stringArray"
                    }]
                }
            },
            propertyNames: {
                $ref: "#"
            },
            const: !0,
            enum: {
                type: "array",
                items: !0,
                minItems: 1,
                uniqueItems: !0
            },
            type: {
                anyOf: [{
                    $ref: "#/definitions/simpleTypes"
                }, {
                    type: "array",
                    items: {
                        $ref: "#/definitions/simpleTypes"
                    },
                    minItems: 1,
                    uniqueItems: !0
                }]
            },
            format: {
                type: "string"
            },
            contentMediaType: {
                type: "string"
            },
            contentEncoding: {
                type: "string"
            },
            if: {
                $ref: "#"
            },
            then: {
                $ref: "#"
            },
            else: {
                $ref: "#"
            },
            allOf: {
                $ref: "#/definitions/schemaArray"
            },
            anyOf: {
                $ref: "#/definitions/schemaArray"
            },
            oneOf: {
                $ref: "#/definitions/schemaArray"
            },
            not: {
                $ref: "#"
            }
        },
        default: !0
    }
});
var wZB = E((l23, UZB) => {
    var EZB = uH0();
    UZB.exports = {
        $id: "https://github.com/ajv-validator/ajv/blob/master/lib/definition_schema.js",
        definitions: {
            simpleTypes: EZB.definitions.simpleTypes
        },
        type: "object",
        dependencies: {
            schema: ["validate"],
            $data: ["validate"],
            statements: ["inline"],
            valid: {
                not: {
                    required: ["macro"]
                }
            }
        },
        properties: {
            type: EZB.properties.type,
            schema: {
                type: "boolean"
            },
            statements: {
                type: "boolean"
            },
            dependencies: {
                type: "array",
                items: {
                    type: "string"
                }
            },
            metaSchema: {
                type: "object"
            },
            modifying: {
                type: "boolean"
            },
            valid: {
                type: "boolean"
            },
            $data: {
                type: "boolean"
            },
            async: {
                type: "boolean"
            },
            errors: {
                anyOf: [{
                    type: "boolean"
                }, {
                    const: "full"
                }]
            }
        }
    }
});
var qZB = E((p23, $ZB) => {
    var X_6 = /^[a-z_$][a-z0-9_$-]*$/i,
        V_6 = zZB(),
        C_6 = wZB();
    $ZB.exports = {
        add: K_6,
        get: H_6,
        remove: z_6,
        validate: mH0
    };

    function K_6(A, B) {
        var Q = this.RULES;
        if (Q.keywords[A]) throw new Error("Keyword " + A + " is already defined");
        if (!X_6.test(A)) throw new Error("Keyword " + A + " is not a valid identifier");
        if (B) {
            this.validateKeyword(B, !0);
            var Z = B.type;
            if (Array.isArray(Z))
                for (var D = 0; D < Z.length; D++) F(A, Z[D], B);
            else F(A, Z, B);
            var G = B.metaSchema;
            if (G) {
                if (B.$data && this._opts.$data) G = {
                    anyOf: [G, {
                        $ref: "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#"
                    }]
                };
                B.validateSchema = this.compile(G, !0)
            }
        }
        Q.keywords[A] = Q.all[A] = !0;

        function F(I, Y, W) {
            var J;
            for (var X = 0; X < Q.length; X++) {
                var V = Q[X];
                if (V.type == Y) {
                    J = V;
                    break
                }
            }
            if (!J) J = {
                type: Y,
                rules: []
            }, Q.push(J);
            var C = {
                keyword: I,
                definition: W,
                custom: !0,
                code: V_6,
                implements: W.implements
            };
            J.rules.push(C), Q.custom[I] = C
        }
        return this
    }

    function H_6(A) {
        var B = this.RULES.custom[A];
        return B ? B.definition : this.RULES.keywords[A] || !1
    }

    function z_6(A) {
        var B = this.RULES;
        delete B.keywords[A], delete B.all[A], delete B.custom[A];
        for (var Q = 0; Q < B.length; Q++) {
            var Z = B[Q].rules;
            for (var D = 0; D < Z.length; D++)
                if (Z[D].keyword == A) {
                    Z.splice(D, 1);
                    break
                }
        }
        return this
    }

    function mH0(A, B) {
        mH0.errors = null;
        var Q = this._validateKeyword = this._validateKeyword || this.compile(C_6, !0);
        if (Q(A)) return !0;
        if (mH0.errors = Q.errors, B) throw new Error("custom keyword definition is invalid: " + this.errorsText(Q.errors));
        else return !1
    }
});
var NZB = E((i23, E_6) => {
    E_6.exports = {
        $schema: "http://json-schema.org/draft-07/schema#",
        $id: "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#",
        description: "Meta-schema for $data reference (JSON Schema extension proposal)",
        type: "object",
        required: ["$data"],
        properties: {
            $data: {
                type: "string",
                anyOf: [{
                    format: "relative-json-pointer"
                }, {
                    format: "json-pointer"
                }]
            }
        },
        additionalProperties: !1
    }
});