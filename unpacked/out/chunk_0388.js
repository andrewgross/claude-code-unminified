/* chunk:388 bytes:[9122526, 9137901) size:15375 source:unpacked-cli.js */
var o7B = E((x23, r7B) => {
    r7B.exports = function A(B, Q, Z) {
        var D = " ",
            G = B.level,
            F = B.dataLevel,
            I = B.schema[Q],
            Y = B.schemaPath + B.util.getProperty(Q),
            W = B.errSchemaPath + "/" + Q,
            J = !B.opts.allErrors,
            X = "data" + (F || ""),
            V = "errs__" + G,
            C = B.util.copy(B),
            K = "";
        C.level++;
        var H = "valid" + C.level,
            z = "key" + G,
            $ = "idx" + G,
            L = C.dataLevel = B.dataLevel + 1,
            N = "data" + L,
            R = "dataProperties" + G,
            O = Object.keys(I || {}).filter(_1),
            P = B.schema.patternProperties || {},
            j = Object.keys(P).filter(_1),
            f = B.schema.additionalProperties,
            k = O.length || j.length,
            c = f === !1,
            u = typeof f == "object" && Object.keys(f).length,
            a = B.opts.removeAdditional,
            l = c || u || a,
            y = B.opts.ownProperties,
            t = B.baseId,
            E1 = B.schema.required;
        if (E1 && !(B.opts.$data && E1.$data) && E1.length < B.opts.loopRequired) var C1 = B.util.toHash(E1);

        function _1(N2) {
            return N2 !== "__proto__"
        }
        if (D += "var " + V + " = errors;var " + H + " = true;", y) D += " var " + R + " = undefined;";
        if (l) {
            if (y) D += " " + R + " = " + R + " || Object.keys(" + X + "); for (var " + $ + "=0; " + $ + "<" + R + ".length; " + $ + "++) { var " + z + " = " + R + "[" + $ + "]; ";
            else D += " for (var " + z + " in " + X + ") { ";
            if (k) {
                if (D += " var isAdditional" + G + " = !(false ", O.length)
                    if (O.length > 8) D += " || validate.schema" + Y + ".hasOwnProperty(" + z + ") ";
                    else {
                        var F0 = O;
                        if (F0) {
                            var W0, g1 = -1,
                                w1 = F0.length - 1;
                            while (g1 < w1) W0 = F0[g1 += 1], D += " || " + z + " == " + B.util.toQuotedString(W0) + " "
                        }
                    } if (j.length) {
                    var Q1 = j;
                    if (Q1) {
                        var k1, H1 = -1,
                            A0 = Q1.length - 1;
                        while (H1 < A0) k1 = Q1[H1 += 1], D += " || " + B.usePattern(k1) + ".test(" + z + ") "
                    }
                }
                D += " ); if (isAdditional" + G + ") { "
            }
            if (a == "all") D += " delete " + X + "[" + z + "]; ";
            else {
                var V0 = B.errorPath,
                    o1 = "' + " + z + " + '";
                if (B.opts._errorDataPathProperty) B.errorPath = B.util.getPathExpr(B.errorPath, z, B.opts.jsonPointers);
                if (c)
                    if (a) D += " delete " + X + "[" + z + "]; ";
                    else {
                        D += " " + H + " = false; ";
                        var e = W;
                        W = B.errSchemaPath + "/additionalProperties";
                        var Z1 = Z1 || [];
                        if (Z1.push(D), D = "", B.createErrors !== !1) {
                            if (D += " { keyword: 'additionalProperties' , dataPath: (dataPath || '') + " + B.errorPath + " , schemaPath: " + B.util.toQuotedString(W) + " , params: { additionalProperty: '" + o1 + "' } ", B.opts.messages !== !1) {
                                if (D += " , message: '", B.opts._errorDataPathProperty) D += "is an invalid additional property";
                                else D += "should NOT have additional properties";
                                D += "' "
                            }
                            if (B.opts.verbose) D += " , schema: false , parentSchema: validate.schema" + B.schemaPath + " , data: " + X + " ";
                            D += " } "
                        } else D += " {} ";
                        var I1 = D;
                        if (D = Z1.pop(), !B.compositeRule && J)
                            if (B.async) D += " throw new ValidationError([" + I1 + "]); ";
                            else D += " validate.errors = [" + I1 + "]; return false; ";
                        else D += " var err = " + I1 + ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ";
                        if (W = e, J) D += " break; "
                    }
                else if (u)
                    if (a == "failing") {
                        D += " var " + V + " = errors;  ";
                        var U1 = B.compositeRule;
                        B.compositeRule = C.compositeRule = !0, C.schema = f, C.schemaPath = B.schemaPath + ".additionalProperties", C.errSchemaPath = B.errSchemaPath + "/additionalProperties", C.errorPath = B.opts._errorDataPathProperty ? B.errorPath : B.util.getPathExpr(B.errorPath, z, B.opts.jsonPointers);
                        var O1 = X + "[" + z + "]";
                        C.dataPathArr[L] = z;
                        var B1 = B.validate(C);
                        if (C.baseId = t, B.util.varOccurences(B1, N) < 2) D += " " + B.util.varReplace(B1, N, O1) + " ";
                        else D += " var " + N + " = " + O1 + "; " + B1 + " ";
                        D += " if (!" + H + ") { errors = " + V + "; if (validate.errors !== null) { if (errors) validate.errors.length = errors; else validate.errors = null; } delete " + X + "[" + z + "]; }  ", B.compositeRule = C.compositeRule = U1
                    } else {
                        C.schema = f, C.schemaPath = B.schemaPath + ".additionalProperties", C.errSchemaPath = B.errSchemaPath + "/additionalProperties", C.errorPath = B.opts._errorDataPathProperty ? B.errorPath : B.util.getPathExpr(B.errorPath, z, B.opts.jsonPointers);
                        var O1 = X + "[" + z + "]";
                        C.dataPathArr[L] = z;
                        var B1 = B.validate(C);
                        if (C.baseId = t, B.util.varOccurences(B1, N) < 2) D += " " + B.util.varReplace(B1, N, O1) + " ";
                        else D += " var " + N + " = " + O1 + "; " + B1 + " ";
                        if (J) D += " if (!" + H + ") break; "
                    } B.errorPath = V0
            }
            if (k) D += " } ";
            if (D += " }  ", J) D += " if (" + H + ") { ", K += "}"
        }
        var x1 = B.opts.useDefaults && !B.compositeRule;
        if (O.length) {
            var c1 = O;
            if (c1) {
                var W0, a1 = -1,
                    C0 = c1.length - 1;
                while (a1 < C0) {
                    W0 = c1[a1 += 1];
                    var K0 = I[W0];
                    if (B.opts.strictKeywords ? typeof K0 == "object" && Object.keys(K0).length > 0 || K0 === !1 : B.util.schemaHasRules(K0, B.RULES.all)) {
                        var R0 = B.util.getProperty(W0),
                            O1 = X + R0,
                            wA = x1 && K0.default !== void 0;
                        C.schema = K0, C.schemaPath = Y + R0, C.errSchemaPath = W + "/" + B.util.escapeFragment(W0), C.errorPath = B.util.getPath(B.errorPath, W0, B.opts.jsonPointers), C.dataPathArr[L] = B.util.toQuotedString(W0);
                        var B1 = B.validate(C);
                        if (C.baseId = t, B.util.varOccurences(B1, N) < 2) {
                            B1 = B.util.varReplace(B1, N, O1);
                            var u0 = O1
                        } else {
                            var u0 = N;
                            D += " var " + N + " = " + O1 + "; "
                        }
                        if (wA) D += " " + B1 + " ";
                        else {
                            if (C1 && C1[W0]) {
                                if (D += " if ( " + u0 + " === undefined ", y) D += " || ! Object.prototype.hasOwnProperty.call(" + X + ", '" + B.util.escapeQuotes(W0) + "') ";
                                D += ") { " + H + " = false; ";
                                var V0 = B.errorPath,
                                    e = W,
                                    TA = B.util.escapeQuotes(W0);
                                if (B.opts._errorDataPathProperty) B.errorPath = B.util.getPath(V0, W0, B.opts.jsonPointers);
                                W = B.errSchemaPath + "/required";
                                var Z1 = Z1 || [];
                                if (Z1.push(D), D = "", B.createErrors !== !1) {
                                    if (D += " { keyword: 'required' , dataPath: (dataPath || '') + " + B.errorPath + " , schemaPath: " + B.util.toQuotedString(W) + " , params: { missingProperty: '" + TA + "' } ", B.opts.messages !== !1) {
                                        if (D += " , message: '", B.opts._errorDataPathProperty) D += "is a required property";
                                        else D += "should have required property \\'" + TA + "\\'";
                                        D += "' "
                                    }
                                    if (B.opts.verbose) D += " , schema: validate.schema" + Y + " , parentSchema: validate.schema" + B.schemaPath + " , data: " + X + " ";
                                    D += " } "
                                } else D += " {} ";
                                var I1 = D;
                                if (D = Z1.pop(), !B.compositeRule && J)
                                    if (B.async) D += " throw new ValidationError([" + I1 + "]); ";
                                    else D += " validate.errors = [" + I1 + "]; return false; ";
                                else D += " var err = " + I1 + ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ";
                                W = e, B.errorPath = V0, D += " } else { "
                            } else if (J) {
                                if (D += " if ( " + u0 + " === undefined ", y) D += " || ! Object.prototype.hasOwnProperty.call(" + X + ", '" + B.util.escapeQuotes(W0) + "') ";
                                D += ") { " + H + " = true; } else { "
                            } else {
                                if (D += " if (" + u0 + " !== undefined ", y) D += " &&   Object.prototype.hasOwnProperty.call(" + X + ", '" + B.util.escapeQuotes(W0) + "') ";
                                D += " ) { "
                            }
                            D += " " + B1 + " } "
                        }
                    }
                    if (J) D += " if (" + H + ") { ", K += "}"
                }
            }
        }
        if (j.length) {
            var dA = j;
            if (dA) {
                var k1, J2 = -1,
                    s2 = dA.length - 1;
                while (J2 < s2) {
                    k1 = dA[J2 += 1];
                    var K0 = P[k1];
                    if (B.opts.strictKeywords ? typeof K0 == "object" && Object.keys(K0).length > 0 || K0 === !1 : B.util.schemaHasRules(K0, B.RULES.all)) {
                        if (C.schema = K0, C.schemaPath = B.schemaPath + ".patternProperties" + B.util.getProperty(k1), C.errSchemaPath = B.errSchemaPath + "/patternProperties/" + B.util.escapeFragment(k1), y) D += " " + R + " = " + R + " || Object.keys(" + X + "); for (var " + $ + "=0; " + $ + "<" + R + ".length; " + $ + "++) { var " + z + " = " + R + "[" + $ + "]; ";
                        else D += " for (var " + z + " in " + X + ") { ";
                        D += " if (" + B.usePattern(k1) + ".test(" + z + ")) { ", C.errorPath = B.util.getPathExpr(B.errorPath, z, B.opts.jsonPointers);
                        var O1 = X + "[" + z + "]";
                        C.dataPathArr[L] = z;
                        var B1 = B.validate(C);
                        if (C.baseId = t, B.util.varOccurences(B1, N) < 2) D += " " + B.util.varReplace(B1, N, O1) + " ";
                        else D += " var " + N + " = " + O1 + "; " + B1 + " ";
                        if (J) D += " if (!" + H + ") break; ";
                        if (D += " } ", J) D += " else " + H + " = true; ";
                        if (D += " }  ", J) D += " if (" + H + ") { ", K += "}"
                    }
                }
            }
        }
        if (J) D += " " + K + " if (" + V + " == errors) {";
        return D
    }
});
var e7B = E((v23, t7B) => {
    t7B.exports = function A(B, Q, Z) {
        var D = " ",
            G = B.level,
            F = B.dataLevel,
            I = B.schema[Q],
            Y = B.schemaPath + B.util.getProperty(Q),
            W = B.errSchemaPath + "/" + Q,
            J = !B.opts.allErrors,
            X = "data" + (F || ""),
            V = "errs__" + G,
            C = B.util.copy(B),
            K = "";
        C.level++;
        var H = "valid" + C.level;
        if (D += "var " + V + " = errors;", B.opts.strictKeywords ? typeof I == "object" && Object.keys(I).length > 0 || I === !1 : B.util.schemaHasRules(I, B.RULES.all)) {
            C.schema = I, C.schemaPath = Y, C.errSchemaPath = W;
            var z = "key" + G,
                $ = "idx" + G,
                L = "i" + G,
                N = "' + " + z + " + '",
                R = C.dataLevel = B.dataLevel + 1,
                O = "data" + R,
                P = "dataProperties" + G,
                j = B.opts.ownProperties,
                f = B.baseId;
            if (j) D += " var " + P + " = undefined; ";
            if (j) D += " " + P + " = " + P + " || Object.keys(" + X + "); for (var " + $ + "=0; " + $ + "<" + P + ".length; " + $ + "++) { var " + z + " = " + P + "[" + $ + "]; ";
            else D += " for (var " + z + " in " + X + ") { ";
            D += " var startErrs" + G + " = errors; ";
            var k = z,
                c = B.compositeRule;
            B.compositeRule = C.compositeRule = !0;
            var u = B.validate(C);
            if (C.baseId = f, B.util.varOccurences(u, O) < 2) D += " " + B.util.varReplace(u, O, k) + " ";
            else D += " var " + O + " = " + k + "; " + u + " ";
            if (B.compositeRule = C.compositeRule = c, D += " if (!" + H + ") { for (var " + L + "=startErrs" + G + "; " + L + "<errors; " + L + "++) { vErrors[" + L + "].propertyName = " + z + "; }   var err =   ", B.createErrors !== !1) {
                if (D += " { keyword: 'propertyNames' , dataPath: (dataPath || '') + " + B.errorPath + " , schemaPath: " + B.util.toQuotedString(W) + " , params: { propertyName: '" + N + "' } ", B.opts.messages !== !1) D += " , message: 'property name \\'" + N + "\\' is invalid' ";
                if (B.opts.verbose) D += " , schema: validate.schema" + Y + " , parentSchema: validate.schema" + B.schemaPath + " , data: " + X + " ";
                D += " } "
            } else D += " {} ";
            if (D += ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ", !B.compositeRule && J)
                if (B.async) D += " throw new ValidationError(vErrors); ";
                else D += " validate.errors = vErrors; return false; ";
            if (J) D += " break; ";
            D += " } }"
        }
        if (J) D += " " + K + " if (" + V + " == errors) {";
        return D
    }
});