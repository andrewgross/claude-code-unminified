/* chunk:383 bytes:[9032140, 9049969) size:17829 source:unpacked-cli.js */
var _H0 = E((X23, r3B) => {
    r3B.exports = function A(B, Q, Z) {
        var D = "",
            G = B.schema.$async === !0,
            F = B.util.schemaHasRulesExcept(B.schema, B.RULES.all, "$ref"),
            I = B.self._getId(B.schema);
        if (B.opts.strictKeywords) {
            var Y = B.util.schemaUnknownRules(B.schema, B.RULES.keywords);
            if (Y) {
                var W = "unknown keyword: " + Y;
                if (B.opts.strictKeywords === "log") B.logger.warn(W);
                else throw new Error(W)
            }
        }
        if (B.isTop) {
            if (D += " var validate = ", G) B.async = !0, D += "async ";
            if (D += "function(data, dataPath, parentData, parentDataProperty, rootData) { 'use strict'; ", I && (B.opts.sourceCode || B.opts.processCode)) D += " " + ("/*# sourceURL=" + I + " */") + " "
        }
        if (typeof B.schema == "boolean" || !(F || B.schema.$ref)) {
            var Q = "false schema",
                J = B.level,
                X = B.dataLevel,
                V = B.schema[Q],
                C = B.schemaPath + B.util.getProperty(Q),
                K = B.errSchemaPath + "/" + Q,
                O = !B.opts.allErrors,
                f, H = "data" + (X || ""),
                R = "valid" + J;
            if (B.schema === !1) {
                if (B.isTop) O = !0;
                else D += " var " + R + " = false; ";
                var z = z || [];
                if (z.push(D), D = "", B.createErrors !== !1) {
                    if (D += " { keyword: '" + (f || "false schema") + "' , dataPath: (dataPath || '') + " + B.errorPath + " , schemaPath: " + B.util.toQuotedString(K) + " , params: {} ", B.opts.messages !== !1) D += " , message: 'boolean schema is false' ";
                    if (B.opts.verbose) D += " , schema: false , parentSchema: validate.schema" + B.schemaPath + " , data: " + H + " ";
                    D += " } "
                } else D += " {} ";
                var $ = D;
                if (D = z.pop(), !B.compositeRule && O)
                    if (B.async) D += " throw new ValidationError([" + $ + "]); ";
                    else D += " validate.errors = [" + $ + "]; return false; ";
                else D += " var err = " + $ + ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; "
            } else if (B.isTop)
                if (G) D += " return data; ";
                else D += " validate.errors = null; return true; ";
            else D += " var " + R + " = true; ";
            if (B.isTop) D += " }; return validate; ";
            return D
        }
        if (B.isTop) {
            var L = B.isTop,
                J = B.level = 0,
                X = B.dataLevel = 0,
                H = "data";
            if (B.rootId = B.resolve.fullPath(B.self._getId(B.root.schema)), B.baseId = B.baseId || B.rootId, delete B.isTop, B.dataPathArr = [""], B.schema.default !== void 0 && B.opts.useDefaults && B.opts.strictDefaults) {
                var N = "default is ignored in the schema root";
                if (B.opts.strictDefaults === "log") B.logger.warn(N);
                else throw new Error(N)
            }
            D += " var vErrors = null; ", D += " var errors = 0;     ", D += " if (rootData === undefined) rootData = data; "
        } else {
            var {
                level: J,
                dataLevel: X
            } = B, H = "data" + (X || "");
            if (I) B.baseId = B.resolve.url(B.baseId, I);
            if (G && !B.async) throw new Error("async schema in sync schema");
            D += " var errs_" + J + " = errors;"
        }
        var R = "valid" + J,
            O = !B.opts.allErrors,
            P = "",
            j = "",
            f, k = B.schema.type,
            c = Array.isArray(k);
        if (k && B.opts.nullable && B.schema.nullable === !0) {
            if (c) {
                if (k.indexOf("null") == -1) k = k.concat("null")
            } else if (k != "null") k = [k, "null"], c = !0
        }
        if (c && k.length == 1) k = k[0], c = !1;
        if (B.schema.$ref && F) {
            if (B.opts.extendRefs == "fail") throw new Error('$ref: validation keywords used in schema at path "' + B.errSchemaPath + '" (see option extendRefs)');
            else if (B.opts.extendRefs !== !0) F = !1, B.logger.warn('$ref: keywords ignored in schema at path "' + B.errSchemaPath + '"')
        }
        if (B.schema.$comment && B.opts.$comment) D += " " + B.RULES.all.$comment.code(B, "$comment");
        if (k) {
            if (B.opts.coerceTypes) var u = B.util.coerceToTypes(B.opts.coerceTypes, k);
            var a = B.RULES.types[k];
            if (u || c || a === !0 || a && !K0(a)) {
                var C = B.schemaPath + ".type",
                    K = B.errSchemaPath + "/type",
                    C = B.schemaPath + ".type",
                    K = B.errSchemaPath + "/type",
                    l = c ? "checkDataTypes" : "checkDataType";
                if (D += " if (" + B.util[l](k, H, B.opts.strictNumbers, !0) + ") { ", u) {
                    var y = "dataType" + J,
                        t = "coerced" + J;
                    if (D += " var " + y + " = typeof " + H + "; var " + t + " = undefined; ", B.opts.coerceTypes == "array") D += " if (" + y + " == 'object' && Array.isArray(" + H + ") && " + H + ".length == 1) { " + H + " = " + H + "[0]; " + y + " = typeof " + H + "; if (" + B.util.checkDataType(B.schema.type, H, B.opts.strictNumbers) + ") " + t + " = " + H + "; } ";
                    D += " if (" + t + " !== undefined) ; ";
                    var E1 = u;
                    if (E1) {
                        var C1, _1 = -1,
                            F0 = E1.length - 1;
                        while (_1 < F0)
                            if (C1 = E1[_1 += 1], C1 == "string") D += " else if (" + y + " == 'number' || " + y + " == 'boolean') " + t + " = '' + " + H + "; else if (" + H + " === null) " + t + " = ''; ";
                            else if (C1 == "number" || C1 == "integer") {
                            if (D += " else if (" + y + " == 'boolean' || " + H + " === null || (" + y + " == 'string' && " + H + " && " + H + " == +" + H + " ", C1 == "integer") D += " && !(" + H + " % 1)";
                            D += ")) " + t + " = +" + H + "; "
                        } else if (C1 == "boolean") D += " else if (" + H + " === 'false' || " + H + " === 0 || " + H + " === null) " + t + " = false; else if (" + H + " === 'true' || " + H + " === 1) " + t + " = true; ";
                        else if (C1 == "null") D += " else if (" + H + " === '' || " + H + " === 0 || " + H + " === false) " + t + " = null; ";
                        else if (B.opts.coerceTypes == "array" && C1 == "array") D += " else if (" + y + " == 'string' || " + y + " == 'number' || " + y + " == 'boolean' || " + H + " == null) " + t + " = [" + H + "]; "
                    }
                    D += " else {   ";
                    var z = z || [];
                    if (z.push(D), D = "", B.createErrors !== !1) {
                        if (D += " { keyword: '" + (f || "type") + "' , dataPath: (dataPath || '') + " + B.errorPath + " , schemaPath: " + B.util.toQuotedString(K) + " , params: { type: '", c) D += "" + k.join(",");
                        else D += "" + k;
                        if (D += "' } ", B.opts.messages !== !1) {
                            if (D += " , message: 'should be ", c) D += "" + k.join(",");
                            else D += "" + k;
                            D += "' "
                        }
                        if (B.opts.verbose) D += " , schema: validate.schema" + C + " , parentSchema: validate.schema" + B.schemaPath + " , data: " + H + " ";
                        D += " } "
                    } else D += " {} ";
                    var $ = D;
                    if (D = z.pop(), !B.compositeRule && O)
                        if (B.async) D += " throw new ValidationError([" + $ + "]); ";
                        else D += " validate.errors = [" + $ + "]; return false; ";
                    else D += " var err = " + $ + ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ";
                    D += " } if (" + t + " !== undefined) {  ";
                    var W0 = X ? "data" + (X - 1 || "") : "parentData",
                        g1 = X ? B.dataPathArr[X] : "parentDataProperty";
                    if (D += " " + H + " = " + t + "; ", !X) D += "if (" + W0 + " !== undefined)";
                    D += " " + W0 + "[" + g1 + "] = " + t + "; } "
                } else {
                    var z = z || [];
                    if (z.push(D), D = "", B.createErrors !== !1) {
                        if (D += " { keyword: '" + (f || "type") + "' , dataPath: (dataPath || '') + " + B.errorPath + " , schemaPath: " + B.util.toQuotedString(K) + " , params: { type: '", c) D += "" + k.join(",");
                        else D += "" + k;
                        if (D += "' } ", B.opts.messages !== !1) {
                            if (D += " , message: 'should be ", c) D += "" + k.join(",");
                            else D += "" + k;
                            D += "' "
                        }
                        if (B.opts.verbose) D += " , schema: validate.schema" + C + " , parentSchema: validate.schema" + B.schemaPath + " , data: " + H + " ";
                        D += " } "
                    } else D += " {} ";
                    var $ = D;
                    if (D = z.pop(), !B.compositeRule && O)
                        if (B.async) D += " throw new ValidationError([" + $ + "]); ";
                        else D += " validate.errors = [" + $ + "]; return false; ";
                    else D += " var err = " + $ + ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; "
                }
                D += " } "
            }
        }
        if (B.schema.$ref && !F) {
            if (D += " " + B.RULES.all.$ref.code(B, "$ref") + " ", O) {
                if (D += " } if (errors === ", L) D += "0";
                else D += "errs_" + J;
                D += ") { ", j += "}"
            }
        } else {
            var w1 = B.RULES;
            if (w1) {
                var a, Q1 = -1,
                    k1 = w1.length - 1;
                while (Q1 < k1)
                    if (a = w1[Q1 += 1], K0(a)) {
                        if (a.type) D += " if (" + B.util.checkDataType(a.type, H, B.opts.strictNumbers) + ") { ";
                        if (B.opts.useDefaults) {
                            if (a.type == "object" && B.schema.properties) {
                                var V = B.schema.properties,
                                    H1 = Object.keys(V),
                                    A0 = H1;
                                if (A0) {
                                    var V0, o1 = -1,
                                        e = A0.length - 1;
                                    while (o1 < e) {
                                        V0 = A0[o1 += 1];
                                        var Z1 = V[V0];
                                        if (Z1.default !== void 0) {
                                            var I1 = H + B.util.getProperty(V0);
                                            if (B.compositeRule) {
                                                if (B.opts.strictDefaults) {
                                                    var N = "default is ignored for: " + I1;
                                                    if (B.opts.strictDefaults === "log") B.logger.warn(N);
                                                    else throw new Error(N)
                                                }
                                            } else {
                                                if (D += " if (" + I1 + " === undefined ", B.opts.useDefaults == "empty") D += " || " + I1 + " === null || " + I1 + " === '' ";
                                                if (D += " ) " + I1 + " = ", B.opts.useDefaults == "shared") D += " " + B.useDefault(Z1.default) + " ";
                                                else D += " " + JSON.stringify(Z1.default) + " ";
                                                D += "; "
                                            }
                                        }
                                    }
                                }
                            } else if (a.type == "array" && Array.isArray(B.schema.items)) {
                                var U1 = B.schema.items;
                                if (U1) {
                                    var Z1, _1 = -1,
                                        O1 = U1.length - 1;
                                    while (_1 < O1)
                                        if (Z1 = U1[_1 += 1], Z1.default !== void 0) {
                                            var I1 = H + "[" + _1 + "]";
                                            if (B.compositeRule) {
                                                if (B.opts.strictDefaults) {
                                                    var N = "default is ignored for: " + I1;
                                                    if (B.opts.strictDefaults === "log") B.logger.warn(N);
                                                    else throw new Error(N)
                                                }
                                            } else {
                                                if (D += " if (" + I1 + " === undefined ", B.opts.useDefaults == "empty") D += " || " + I1 + " === null || " + I1 + " === '' ";
                                                if (D += " ) " + I1 + " = ", B.opts.useDefaults == "shared") D += " " + B.useDefault(Z1.default) + " ";
                                                else D += " " + JSON.stringify(Z1.default) + " ";
                                                D += "; "
                                            }
                                        }
                                }
                            }
                        }
                        var B1 = a.rules;
                        if (B1) {
                            var x1, c1 = -1,
                                a1 = B1.length - 1;
                            while (c1 < a1)
                                if (x1 = B1[c1 += 1], R0(x1)) {
                                    var C0 = x1.code(B, x1.keyword, a.type);
                                    if (C0) {
                                        if (D += " " + C0 + " ", O) P += "}"
                                    }
                                }
                        }
                        if (O) D += " " + P + " ", P = "";
                        if (a.type) {
                            if (D += " } ", k && k === a.type && !u) {
                                D += " else { ";
                                var C = B.schemaPath + ".type",
                                    K = B.errSchemaPath + "/type",
                                    z = z || [];
                                if (z.push(D), D = "", B.createErrors !== !1) {
                                    if (D += " { keyword: '" + (f || "type") + "' , dataPath: (dataPath || '') + " + B.errorPath + " , schemaPath: " + B.util.toQuotedString(K) + " , params: { type: '", c) D += "" + k.join(",");
                                    else D += "" + k;
                                    if (D += "' } ", B.opts.messages !== !1) {
                                        if (D += " , message: 'should be ", c) D += "" + k.join(",");
                                        else D += "" + k;
                                        D += "' "
                                    }
                                    if (B.opts.verbose) D += " , schema: validate.schema" + C + " , parentSchema: validate.schema" + B.schemaPath + " , data: " + H + " ";
                                    D += " } "
                                } else D += " {} ";
                                var $ = D;
                                if (D = z.pop(), !B.compositeRule && O)
                                    if (B.async) D += " throw new ValidationError([" + $ + "]); ";
                                    else D += " validate.errors = [" + $ + "]; return false; ";
                                else D += " var err = " + $ + ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ";
                                D += " } "
                            }
                        }
                        if (O) {
                            if (D += " if (errors === ", L) D += "0";
                            else D += "errs_" + J;
                            D += ") { ", j += "}"
                        }
                    }
            }
        }
        if (O) D += " " + j + " ";
        if (L) {
            if (G) D += " if (errors === 0) return data;           ", D += " else throw new ValidationError(vErrors); ";
            else D += " validate.errors = vErrors; ", D += " return errors === 0;       ";
            D += " }; return validate;"
        } else D += " var " + R + " = errors === errs_" + J + ";";

        function K0(u0) {
            var TA = u0.rules;
            for (var dA = 0; dA < TA.length; dA++)
                if (R0(TA[dA])) return !0
        }

        function R0(u0) {
            return B.schema[u0.keyword] !== void 0 || u0.implements && wA(u0)
        }

        function wA(u0) {
            var TA = u0.implements;
            for (var dA = 0; dA < TA.length; dA++)
                if (B.schema[TA[dA]] !== void 0) return !0
        }
        return D
    }
});