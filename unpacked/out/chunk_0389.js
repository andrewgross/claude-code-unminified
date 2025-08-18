/* chunk:389 bytes:[9137902, 9156821) size:18919 source:unpacked-cli.js */
var BZB = E((b23, AZB) => {
    AZB.exports = function A(B, Q, Z) {
        var D = " ",
            G = B.level,
            F = B.dataLevel,
            I = B.schema[Q],
            Y = B.schemaPath + B.util.getProperty(Q),
            W = B.errSchemaPath + "/" + Q,
            J = !B.opts.allErrors,
            X = "data" + (F || ""),
            V = "valid" + G,
            C = B.opts.$data && I && I.$data,
            K;
        if (C) D += " var schema" + G + " = " + B.util.getData(I.$data, F, B.dataPathArr) + "; ", K = "schema" + G;
        else K = I;
        var H = "schema" + G;
        if (!C)
            if (I.length < B.opts.loopRequired && B.schema.properties && Object.keys(B.schema.properties).length) {
                var z = [],
                    $ = I;
                if ($) {
                    var L, N = -1,
                        R = $.length - 1;
                    while (N < R) {
                        L = $[N += 1];
                        var O = B.schema.properties[L];
                        if (!(O && (B.opts.strictKeywords ? typeof O == "object" && Object.keys(O).length > 0 || O === !1 : B.util.schemaHasRules(O, B.RULES.all)))) z[z.length] = L
                    }
                }
            } else var z = I;
        if (C || z.length) {
            var P = B.errorPath,
                j = C || z.length >= B.opts.loopRequired,
                f = B.opts.ownProperties;
            if (J)
                if (D += " var missing" + G + "; ", j) {
                    if (!C) D += " var " + H + " = validate.schema" + Y + "; ";
                    var k = "i" + G,
                        c = "schema" + G + "[" + k + "]",
                        u = "' + " + c + " + '";
                    if (B.opts._errorDataPathProperty) B.errorPath = B.util.getPathExpr(P, c, B.opts.jsonPointers);
                    if (D += " var " + V + " = true; ", C) D += " if (schema" + G + " === undefined) " + V + " = true; else if (!Array.isArray(schema" + G + ")) " + V + " = false; else {";
                    if (D += " for (var " + k + " = 0; " + k + " < " + H + ".length; " + k + "++) { " + V + " = " + X + "[" + H + "[" + k + "]] !== undefined ", f) D += " &&   Object.prototype.hasOwnProperty.call(" + X + ", " + H + "[" + k + "]) ";
                    if (D += "; if (!" + V + ") break; } ", C) D += "  }  ";
                    D += "  if (!" + V + ") {   ";
                    var a = a || [];
                    if (a.push(D), D = "", B.createErrors !== !1) {
                        if (D += " { keyword: 'required' , dataPath: (dataPath || '') + " + B.errorPath + " , schemaPath: " + B.util.toQuotedString(W) + " , params: { missingProperty: '" + u + "' } ", B.opts.messages !== !1) {
                            if (D += " , message: '", B.opts._errorDataPathProperty) D += "is a required property";
                            else D += "should have required property \\'" + u + "\\'";
                            D += "' "
                        }
                        if (B.opts.verbose) D += " , schema: validate.schema" + Y + " , parentSchema: validate.schema" + B.schemaPath + " , data: " + X + " ";
                        D += " } "
                    } else D += " {} ";
                    var l = D;
                    if (D = a.pop(), !B.compositeRule && J)
                        if (B.async) D += " throw new ValidationError([" + l + "]); ";
                        else D += " validate.errors = [" + l + "]; return false; ";
                    else D += " var err = " + l + ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ";
                    D += " } else { "
                } else {
                    D += " if ( ";
                    var y = z;
                    if (y) {
                        var t, k = -1,
                            E1 = y.length - 1;
                        while (k < E1) {
                            if (t = y[k += 1], k) D += " || ";
                            var C1 = B.util.getProperty(t),
                                _1 = X + C1;
                            if (D += " ( ( " + _1 + " === undefined ", f) D += " || ! Object.prototype.hasOwnProperty.call(" + X + ", '" + B.util.escapeQuotes(t) + "') ";
                            D += ") && (missing" + G + " = " + B.util.toQuotedString(B.opts.jsonPointers ? t : C1) + ") ) "
                        }
                    }
                    D += ") {  ";
                    var c = "missing" + G,
                        u = "' + " + c + " + '";
                    if (B.opts._errorDataPathProperty) B.errorPath = B.opts.jsonPointers ? B.util.getPathExpr(P, c, !0) : P + " + " + c;
                    var a = a || [];
                    if (a.push(D), D = "", B.createErrors !== !1) {
                        if (D += " { keyword: 'required' , dataPath: (dataPath || '') + " + B.errorPath + " , schemaPath: " + B.util.toQuotedString(W) + " , params: { missingProperty: '" + u + "' } ", B.opts.messages !== !1) {
                            if (D += " , message: '", B.opts._errorDataPathProperty) D += "is a required property";
                            else D += "should have required property \\'" + u + "\\'";
                            D += "' "
                        }
                        if (B.opts.verbose) D += " , schema: validate.schema" + Y + " , parentSchema: validate.schema" + B.schemaPath + " , data: " + X + " ";
                        D += " } "
                    } else D += " {} ";
                    var l = D;
                    if (D = a.pop(), !B.compositeRule && J)
                        if (B.async) D += " throw new ValidationError([" + l + "]); ";
                        else D += " validate.errors = [" + l + "]; return false; ";
                    else D += " var err = " + l + ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ";
                    D += " } else { "
                }
            else if (j) {
                if (!C) D += " var " + H + " = validate.schema" + Y + "; ";
                var k = "i" + G,
                    c = "schema" + G + "[" + k + "]",
                    u = "' + " + c + " + '";
                if (B.opts._errorDataPathProperty) B.errorPath = B.util.getPathExpr(P, c, B.opts.jsonPointers);
                if (C) {
                    if (D += " if (" + H + " && !Array.isArray(" + H + ")) {  var err =   ", B.createErrors !== !1) {
                        if (D += " { keyword: 'required' , dataPath: (dataPath || '') + " + B.errorPath + " , schemaPath: " + B.util.toQuotedString(W) + " , params: { missingProperty: '" + u + "' } ", B.opts.messages !== !1) {
                            if (D += " , message: '", B.opts._errorDataPathProperty) D += "is a required property";
                            else D += "should have required property \\'" + u + "\\'";
                            D += "' "
                        }
                        if (B.opts.verbose) D += " , schema: validate.schema" + Y + " , parentSchema: validate.schema" + B.schemaPath + " , data: " + X + " ";
                        D += " } "
                    } else D += " {} ";
                    D += ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; } else if (" + H + " !== undefined) { "
                }
                if (D += " for (var " + k + " = 0; " + k + " < " + H + ".length; " + k + "++) { if (" + X + "[" + H + "[" + k + "]] === undefined ", f) D += " || ! Object.prototype.hasOwnProperty.call(" + X + ", " + H + "[" + k + "]) ";
                if (D += ") {  var err =   ", B.createErrors !== !1) {
                    if (D += " { keyword: 'required' , dataPath: (dataPath || '') + " + B.errorPath + " , schemaPath: " + B.util.toQuotedString(W) + " , params: { missingProperty: '" + u + "' } ", B.opts.messages !== !1) {
                        if (D += " , message: '", B.opts._errorDataPathProperty) D += "is a required property";
                        else D += "should have required property \\'" + u + "\\'";
                        D += "' "
                    }
                    if (B.opts.verbose) D += " , schema: validate.schema" + Y + " , parentSchema: validate.schema" + B.schemaPath + " , data: " + X + " ";
                    D += " } "
                } else D += " {} ";
                if (D += ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; } } ", C) D += "  }  "
            } else {
                var F0 = z;
                if (F0) {
                    var t, W0 = -1,
                        g1 = F0.length - 1;
                    while (W0 < g1) {
                        t = F0[W0 += 1];
                        var C1 = B.util.getProperty(t),
                            u = B.util.escapeQuotes(t),
                            _1 = X + C1;
                        if (B.opts._errorDataPathProperty) B.errorPath = B.util.getPath(P, t, B.opts.jsonPointers);
                        if (D += " if ( " + _1 + " === undefined ", f) D += " || ! Object.prototype.hasOwnProperty.call(" + X + ", '" + B.util.escapeQuotes(t) + "') ";
                        if (D += ") {  var err =   ", B.createErrors !== !1) {
                            if (D += " { keyword: 'required' , dataPath: (dataPath || '') + " + B.errorPath + " , schemaPath: " + B.util.toQuotedString(W) + " , params: { missingProperty: '" + u + "' } ", B.opts.messages !== !1) {
                                if (D += " , message: '", B.opts._errorDataPathProperty) D += "is a required property";
                                else D += "should have required property \\'" + u + "\\'";
                                D += "' "
                            }
                            if (B.opts.verbose) D += " , schema: validate.schema" + Y + " , parentSchema: validate.schema" + B.schemaPath + " , data: " + X + " ";
                            D += " } "
                        } else D += " {} ";
                        D += ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; } "
                    }
                }
            }
            B.errorPath = P
        } else if (J) D += " if (true) {";
        return D
    }
});
var ZZB = E((f23, QZB) => {
    QZB.exports = function A(B, Q, Z) {
        var D = " ",
            G = B.level,
            F = B.dataLevel,
            I = B.schema[Q],
            Y = B.schemaPath + B.util.getProperty(Q),
            W = B.errSchemaPath + "/" + Q,
            J = !B.opts.allErrors,
            X = "data" + (F || ""),
            V = "valid" + G,
            C = B.opts.$data && I && I.$data,
            K;
        if (C) D += " var schema" + G + " = " + B.util.getData(I.$data, F, B.dataPathArr) + "; ", K = "schema" + G;
        else K = I;
        if ((I || C) && B.opts.uniqueItems !== !1) {
            if (C) D += " var " + V + "; if (" + K + " === false || " + K + " === undefined) " + V + " = true; else if (typeof " + K + " != 'boolean') " + V + " = false; else { ";
            D += " var i = " + X + ".length , " + V + " = true , j; if (i > 1) { ";
            var H = B.schema.items && B.schema.items.type,
                z = Array.isArray(H);
            if (!H || H == "object" || H == "array" || z && (H.indexOf("object") >= 0 || H.indexOf("array") >= 0)) D += " outer: for (;i--;) { for (j = i; j--;) { if (equal(" + X + "[i], " + X + "[j])) { " + V + " = false; break outer; } } } ";
            else {
                D += " var itemIndices = {}, item; for (;i--;) { var item = " + X + "[i]; ";
                var $ = "checkDataType" + (z ? "s" : "");
                if (D += " if (" + B.util[$](H, "item", B.opts.strictNumbers, !0) + ") continue; ", z) D += ` if (typeof item == 'string') item = '"' + item; `;
                D += " if (typeof itemIndices[item] == 'number') { " + V + " = false; j = itemIndices[item]; break; } itemIndices[item] = i; } "
            }
            if (D += " } ", C) D += "  }  ";
            D += " if (!" + V + ") {   ";
            var L = L || [];
            if (L.push(D), D = "", B.createErrors !== !1) {
                if (D += " { keyword: 'uniqueItems' , dataPath: (dataPath || '') + " + B.errorPath + " , schemaPath: " + B.util.toQuotedString(W) + " , params: { i: i, j: j } ", B.opts.messages !== !1) D += " , message: 'should NOT have duplicate items (items ## ' + j + ' and ' + i + ' are identical)' ";
                if (B.opts.verbose) {
                    if (D += " , schema:  ", C) D += "validate.schema" + Y;
                    else D += "" + I;
                    D += "         , parentSchema: validate.schema" + B.schemaPath + " , data: " + X + " "
                }
                D += " } "
            } else D += " {} ";
            var N = D;
            if (D = L.pop(), !B.compositeRule && J)
                if (B.async) D += " throw new ValidationError([" + N + "]); ";
                else D += " validate.errors = [" + N + "]; return false; ";
            else D += " var err = " + N + ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ";
            if (D += " } ", J) D += " else { "
        } else if (J) D += " if (true) { ";
        return D
    }
});
var GZB = E((h23, DZB) => {
    DZB.exports = {
        $ref: E7B(),
        allOf: w7B(),
        anyOf: q7B(),
        $comment: L7B(),
        const: R7B(),
        contains: T7B(),
        dependencies: S7B(),
        enum: k7B(),
        format: _7B(),
        if: v7B(),
        items: f7B(),
        maximum: vH0(),
        minimum: vH0(),
        maxItems: bH0(),
        minItems: bH0(),
        maxLength: fH0(),
        minLength: fH0(),
        maxProperties: hH0(),
        minProperties: hH0(),
        multipleOf: c7B(),
        not: p7B(),
        oneOf: n7B(),
        pattern: s7B(),
        properties: o7B(),
        propertyNames: e7B(),
        required: BZB(),
        uniqueItems: ZZB(),
        validate: _H0()
    }
});
var YZB = E((g23, IZB) => {
    var FZB = GZB(),
        gH0 = vm().toHash;
    IZB.exports = function A() {
        var B = [{
                type: "number",
                rules: [{
                    maximum: ["exclusiveMaximum"]
                }, {
                    minimum: ["exclusiveMinimum"]
                }, "multipleOf", "format"]
            }, {
                type: "string",
                rules: ["maxLength", "minLength", "pattern", "format"]
            }, {
                type: "array",
                rules: ["maxItems", "minItems", "items", "contains", "uniqueItems"]
            }, {
                type: "object",
                rules: ["maxProperties", "minProperties", "required", "dependencies", "propertyNames", {
                    properties: ["additionalProperties", "patternProperties"]
                }]
            }, {
                rules: ["$ref", "const", "enum", "not", "anyOf", "oneOf", "allOf", "if"]
            }],
            Q = ["type", "$comment"],
            Z = ["$schema", "$id", "id", "$data", "$async", "title", "description", "default", "definitions", "examples", "readOnly", "writeOnly", "contentMediaType", "contentEncoding", "additionalItems", "then", "else"],
            D = ["number", "integer", "string", "array", "object", "boolean", "null"];
        return B.all = gH0(Q), B.types = gH0(D), B.forEach(function(G) {
            if (G.rules = G.rules.map(function(F) {
                    var I;
                    if (typeof F == "object") {
                        var Y = Object.keys(F)[0];
                        I = F[Y], F = Y, I.forEach(function(J) {
                            Q.push(J), B.all[J] = !0
                        })
                    }
                    Q.push(F);
                    var W = B.all[F] = {
                        keyword: F,
                        code: FZB[F],
                        implements: I
                    };
                    return W
                }), B.all.$comment = {
                    keyword: "$comment",
                    code: FZB.$comment
                }, G.type) B.types[G.type] = G
        }), B.keywords = gH0(Q.concat(Z)), B.custom = {}, B
    }
});
var XZB = E((u23, JZB) => {
    var WZB = ["multipleOf", "maximum", "exclusiveMaximum", "minimum", "exclusiveMinimum", "maxLength", "minLength", "pattern", "additionalItems", "maxItems", "minItems", "uniqueItems", "maxProperties", "minProperties", "required", "additionalProperties", "enum", "format", "const"];
    JZB.exports = function(A, B) {
        for (var Q = 0; Q < B.length; Q++) {
            A = JSON.parse(JSON.stringify(A));
            var Z = B[Q].split("/"),
                D = A,
                G;
            for (G = 1; G < Z.length; G++) D = D[Z[G]];
            for (G = 0; G < WZB.length; G++) {
                var F = WZB[G],
                    I = D[F];
                if (I) D[F] = {
                    anyOf: [I, {
                        $ref: "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#"
                    }]
                }
            }
        }
        return A
    }
});
var KZB = E((m23, CZB) => {
    var W_6 = ck1().MissingRef;
    CZB.exports = VZB;

    function VZB(A, B, Q) {
        var Z = this;
        if (typeof this._opts.loadSchema != "function") throw new Error("options.loadSchema should be a function");
        if (typeof B == "function") Q = B, B = void 0;
        var D = G(A).then(function() {
            var I = Z._addSchema(A, void 0, B);
            return I.validate || F(I)
        });
        if (Q) D.then(function(I) {
            Q(null, I)
        }, Q);
        return D;

        function G(I) {
            var Y = I.$schema;
            return Y && !Z.getSchema(Y) ? VZB.call(Z, {
                $ref: Y
            }, !0) : Promise.resolve()
        }

        function F(I) {
            try {
                return Z._compile(I)
            } catch (W) {
                if (W instanceof W_6) return Y(W);
                throw W
            }

            function Y(W) {
                var J = W.missingSchema;
                if (C(J)) throw new Error("Schema " + J + " is loaded but " + W.missingRef + " cannot be resolved");
                var X = Z._loadingSchemas[J];
                if (!X) X = Z._loadingSchemas[J] = Z._opts.loadSchema(J), X.then(V, V);
                return X.then(function(K) {
                    if (!C(J)) return G(K).then(function() {
                        if (!C(J)) Z.addSchema(K, J, void 0, B)
                    })
                }).then(function() {
                    return F(I)
                });

                function V() {
                    delete Z._loadingSchemas[J]
                }

                function C(K) {
                    return Z._refs[K] || Z._schemas[K]
                }
            }
        }
    }
});