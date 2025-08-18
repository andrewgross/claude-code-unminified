/* chunk:385 bytes:[9068117, 9086582) size:18465 source:unpacked-cli.js */
var E7B = E((H23, z7B) => {
    z7B.exports = function A(B, Q, Z) {
        var D = " ",
            G = B.level,
            F = B.dataLevel,
            I = B.schema[Q],
            Y = B.errSchemaPath + "/" + Q,
            W = !B.opts.allErrors,
            J = "data" + (F || ""),
            X = "valid" + G,
            V, C;
        if (I == "#" || I == "#/")
            if (B.isRoot) V = B.async, C = "validate";
            else V = B.root.schema.$async === !0, C = "root.refVal[0]";
        else {
            var K = B.resolveRef(B.baseId, I, B.isRoot);
            if (K === void 0) {
                var H = B.MissingRefError.message(B.baseId, I);
                if (B.opts.missingRefs == "fail") {
                    B.logger.error(H);
                    var z = z || [];
                    if (z.push(D), D = "", B.createErrors !== !1) {
                        if (D += " { keyword: '$ref' , dataPath: (dataPath || '') + " + B.errorPath + " , schemaPath: " + B.util.toQuotedString(Y) + " , params: { ref: '" + B.util.escapeQuotes(I) + "' } ", B.opts.messages !== !1) D += " , message: 'can\\'t resolve reference " + B.util.escapeQuotes(I) + "' ";
                        if (B.opts.verbose) D += " , schema: " + B.util.toQuotedString(I) + " , parentSchema: validate.schema" + B.schemaPath + " , data: " + J + " ";
                        D += " } "
                    } else D += " {} ";
                    var $ = D;
                    if (D = z.pop(), !B.compositeRule && W)
                        if (B.async) D += " throw new ValidationError([" + $ + "]); ";
                        else D += " validate.errors = [" + $ + "]; return false; ";
                    else D += " var err = " + $ + ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ";
                    if (W) D += " if (false) { "
                } else if (B.opts.missingRefs == "ignore") {
                    if (B.logger.warn(H), W) D += " if (true) { "
                } else throw new B.MissingRefError(B.baseId, I, H)
            } else if (K.inline) {
                var L = B.util.copy(B);
                L.level++;
                var N = "valid" + L.level;
                L.schema = K.schema, L.schemaPath = "", L.errSchemaPath = I;
                var R = B.validate(L).replace(/validate\.schema/g, K.code);
                if (D += " " + R + " ", W) D += " if (" + N + ") { "
            } else V = K.$async === !0 || B.async && K.$async !== !1, C = K.code
        }
        if (C) {
            var z = z || [];
            if (z.push(D), D = "", B.opts.passContext) D += " " + C + ".call(this, ";
            else D += " " + C + "( ";
            if (D += " " + J + ", (dataPath || '')", B.errorPath != '""') D += " + " + B.errorPath;
            var O = F ? "data" + (F - 1 || "") : "parentData",
                P = F ? B.dataPathArr[F] : "parentDataProperty";
            D += " , " + O + " , " + P + ", rootData)  ";
            var j = D;
            if (D = z.pop(), V) {
                if (!B.async) throw new Error("async schema referenced by sync schema");
                if (W) D += " var " + X + "; ";
                if (D += " try { await " + j + "; ", W) D += " " + X + " = true; ";
                if (D += " } catch (e) { if (!(e instanceof ValidationError)) throw e; if (vErrors === null) vErrors = e.errors; else vErrors = vErrors.concat(e.errors); errors = vErrors.length; ", W) D += " " + X + " = false; ";
                if (D += " } ", W) D += " if (" + X + ") { "
            } else if (D += " if (!" + j + ") { if (vErrors === null) vErrors = " + C + ".errors; else vErrors = vErrors.concat(" + C + ".errors); errors = vErrors.length; } ", W) D += " else { "
        }
        return D
    }
});
var w7B = E((z23, U7B) => {
    U7B.exports = function A(B, Q, Z) {
        var D = " ",
            G = B.schema[Q],
            F = B.schemaPath + B.util.getProperty(Q),
            I = B.errSchemaPath + "/" + Q,
            Y = !B.opts.allErrors,
            W = B.util.copy(B),
            J = "";
        W.level++;
        var X = "valid" + W.level,
            V = W.baseId,
            C = !0,
            K = G;
        if (K) {
            var H, z = -1,
                $ = K.length - 1;
            while (z < $)
                if (H = K[z += 1], B.opts.strictKeywords ? typeof H == "object" && Object.keys(H).length > 0 || H === !1 : B.util.schemaHasRules(H, B.RULES.all)) {
                    if (C = !1, W.schema = H, W.schemaPath = F + "[" + z + "]", W.errSchemaPath = I + "/" + z, D += "  " + B.validate(W) + " ", W.baseId = V, Y) D += " if (" + X + ") { ", J += "}"
                }
        }
        if (Y)
            if (C) D += " if (true) { ";
            else D += " " + J.slice(0, -1) + " ";
        return D
    }
});
var q7B = E((E23, $7B) => {
    $7B.exports = function A(B, Q, Z) {
        var D = " ",
            G = B.level,
            F = B.dataLevel,
            I = B.schema[Q],
            Y = B.schemaPath + B.util.getProperty(Q),
            W = B.errSchemaPath + "/" + Q,
            J = !B.opts.allErrors,
            X = "data" + (F || ""),
            V = "valid" + G,
            C = "errs__" + G,
            K = B.util.copy(B),
            H = "";
        K.level++;
        var z = "valid" + K.level,
            $ = I.every(function(f) {
                return B.opts.strictKeywords ? typeof f == "object" && Object.keys(f).length > 0 || f === !1 : B.util.schemaHasRules(f, B.RULES.all)
            });
        if ($) {
            var L = K.baseId;
            D += " var " + C + " = errors; var " + V + " = false;  ";
            var N = B.compositeRule;
            B.compositeRule = K.compositeRule = !0;
            var R = I;
            if (R) {
                var O, P = -1,
                    j = R.length - 1;
                while (P < j) O = R[P += 1], K.schema = O, K.schemaPath = Y + "[" + P + "]", K.errSchemaPath = W + "/" + P, D += "  " + B.validate(K) + " ", K.baseId = L, D += " " + V + " = " + V + " || " + z + "; if (!" + V + ") { ", H += "}"
            }
            if (B.compositeRule = K.compositeRule = N, D += " " + H + " if (!" + V + ") {   var err =   ", B.createErrors !== !1) {
                if (D += " { keyword: 'anyOf' , dataPath: (dataPath || '') + " + B.errorPath + " , schemaPath: " + B.util.toQuotedString(W) + " , params: {} ", B.opts.messages !== !1) D += " , message: 'should match some schema in anyOf' ";
                if (B.opts.verbose) D += " , schema: validate.schema" + Y + " , parentSchema: validate.schema" + B.schemaPath + " , data: " + X + " ";
                D += " } "
            } else D += " {} ";
            if (D += ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ", !B.compositeRule && J)
                if (B.async) D += " throw new ValidationError(vErrors); ";
                else D += " validate.errors = vErrors; return false; ";
            if (D += " } else {  errors = " + C + "; if (vErrors !== null) { if (" + C + ") vErrors.length = " + C + "; else vErrors = null; } ", B.opts.allErrors) D += " } "
        } else if (J) D += " if (true) { ";
        return D
    }
});
var L7B = E((U23, N7B) => {
    N7B.exports = function A(B, Q, Z) {
        var D = " ",
            G = B.schema[Q],
            F = B.errSchemaPath + "/" + Q,
            I = !B.opts.allErrors,
            Y = B.util.toQuotedString(G);
        if (B.opts.$comment === !0) D += " console.log(" + Y + ");";
        else if (typeof B.opts.$comment == "function") D += " self._opts.$comment(" + Y + ", " + B.util.toQuotedString(F) + ", validate.root.schema);";
        return D
    }
});
var R7B = E((w23, M7B) => {
    M7B.exports = function A(B, Q, Z) {
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
        if (!C) D += " var schema" + G + " = validate.schema" + Y + ";";
        D += "var " + V + " = equal(" + X + ", schema" + G + "); if (!" + V + ") {   ";
        var H = H || [];
        if (H.push(D), D = "", B.createErrors !== !1) {
            if (D += " { keyword: 'const' , dataPath: (dataPath || '') + " + B.errorPath + " , schemaPath: " + B.util.toQuotedString(W) + " , params: { allowedValue: schema" + G + " } ", B.opts.messages !== !1) D += " , message: 'should be equal to constant' ";
            if (B.opts.verbose) D += " , schema: validate.schema" + Y + " , parentSchema: validate.schema" + B.schemaPath + " , data: " + X + " ";
            D += " } "
        } else D += " {} ";
        var z = D;
        if (D = H.pop(), !B.compositeRule && J)
            if (B.async) D += " throw new ValidationError([" + z + "]); ";
            else D += " validate.errors = [" + z + "]; return false; ";
        else D += " var err = " + z + ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ";
        if (D += " }", J) D += " else { ";
        return D
    }
});
var T7B = E(($23, O7B) => {
    O7B.exports = function A(B, Q, Z) {
        var D = " ",
            G = B.level,
            F = B.dataLevel,
            I = B.schema[Q],
            Y = B.schemaPath + B.util.getProperty(Q),
            W = B.errSchemaPath + "/" + Q,
            J = !B.opts.allErrors,
            X = "data" + (F || ""),
            V = "valid" + G,
            C = "errs__" + G,
            K = B.util.copy(B),
            H = "";
        K.level++;
        var z = "valid" + K.level,
            $ = "i" + G,
            L = K.dataLevel = B.dataLevel + 1,
            N = "data" + L,
            R = B.baseId,
            O = B.opts.strictKeywords ? typeof I == "object" && Object.keys(I).length > 0 || I === !1 : B.util.schemaHasRules(I, B.RULES.all);
        if (D += "var " + C + " = errors;var " + V + ";", O) {
            var P = B.compositeRule;
            B.compositeRule = K.compositeRule = !0, K.schema = I, K.schemaPath = Y, K.errSchemaPath = W, D += " var " + z + " = false; for (var " + $ + " = 0; " + $ + " < " + X + ".length; " + $ + "++) { ", K.errorPath = B.util.getPathExpr(B.errorPath, $, B.opts.jsonPointers, !0);
            var j = X + "[" + $ + "]";
            K.dataPathArr[L] = $;
            var f = B.validate(K);
            if (K.baseId = R, B.util.varOccurences(f, N) < 2) D += " " + B.util.varReplace(f, N, j) + " ";
            else D += " var " + N + " = " + j + "; " + f + " ";
            D += " if (" + z + ") break; }  ", B.compositeRule = K.compositeRule = P, D += " " + H + " if (!" + z + ") {"
        } else D += " if (" + X + ".length == 0) {";
        var k = k || [];
        if (k.push(D), D = "", B.createErrors !== !1) {
            if (D += " { keyword: 'contains' , dataPath: (dataPath || '') + " + B.errorPath + " , schemaPath: " + B.util.toQuotedString(W) + " , params: {} ", B.opts.messages !== !1) D += " , message: 'should contain a valid item' ";
            if (B.opts.verbose) D += " , schema: validate.schema" + Y + " , parentSchema: validate.schema" + B.schemaPath + " , data: " + X + " ";
            D += " } "
        } else D += " {} ";
        var c = D;
        if (D = k.pop(), !B.compositeRule && J)
            if (B.async) D += " throw new ValidationError([" + c + "]); ";
            else D += " validate.errors = [" + c + "]; return false; ";
        else D += " var err = " + c + ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ";
        if (D += " } else { ", O) D += "  errors = " + C + "; if (vErrors !== null) { if (" + C + ") vErrors.length = " + C + "; else vErrors = null; } ";
        if (B.opts.allErrors) D += " } ";
        return D
    }
});
var S7B = E((q23, P7B) => {
    P7B.exports = function A(B, Q, Z) {
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
            z = {},
            $ = {},
            L = B.opts.ownProperties;
        for (P in I) {
            if (P == "__proto__") continue;
            var N = I[P],
                R = Array.isArray(N) ? $ : z;
            R[P] = N
        }
        D += "var " + V + " = errors;";
        var O = B.errorPath;
        D += "var missing" + G + ";";
        for (var P in $)
            if (R = $[P], R.length) {
                if (D += " if ( " + X + B.util.getProperty(P) + " !== undefined ", L) D += " && Object.prototype.hasOwnProperty.call(" + X + ", '" + B.util.escapeQuotes(P) + "') ";
                if (J) {
                    D += " && ( ";
                    var j = R;
                    if (j) {
                        var f, k = -1,
                            c = j.length - 1;
                        while (k < c) {
                            if (f = j[k += 1], k) D += " || ";
                            var u = B.util.getProperty(f),
                                a = X + u;
                            if (D += " ( ( " + a + " === undefined ", L) D += " || ! Object.prototype.hasOwnProperty.call(" + X + ", '" + B.util.escapeQuotes(f) + "') ";
                            D += ") && (missing" + G + " = " + B.util.toQuotedString(B.opts.jsonPointers ? f : u) + ") ) "
                        }
                    }
                    D += ")) {  ";
                    var l = "missing" + G,
                        y = "' + " + l + " + '";
                    if (B.opts._errorDataPathProperty) B.errorPath = B.opts.jsonPointers ? B.util.getPathExpr(O, l, !0) : O + " + " + l;
                    var t = t || [];
                    if (t.push(D), D = "", B.createErrors !== !1) {
                        if (D += " { keyword: 'dependencies' , dataPath: (dataPath || '') + " + B.errorPath + " , schemaPath: " + B.util.toQuotedString(W) + " , params: { property: '" + B.util.escapeQuotes(P) + "', missingProperty: '" + y + "', depsCount: " + R.length + ", deps: '" + B.util.escapeQuotes(R.length == 1 ? R[0] : R.join(", ")) + "' } ", B.opts.messages !== !1) {
                            if (D += " , message: 'should have ", R.length == 1) D += "property " + B.util.escapeQuotes(R[0]);
                            else D += "properties " + B.util.escapeQuotes(R.join(", "));
                            D += " when property " + B.util.escapeQuotes(P) + " is present' "
                        }
                        if (B.opts.verbose) D += " , schema: validate.schema" + Y + " , parentSchema: validate.schema" + B.schemaPath + " , data: " + X + " ";
                        D += " } "
                    } else D += " {} ";
                    var E1 = D;
                    if (D = t.pop(), !B.compositeRule && J)
                        if (B.async) D += " throw new ValidationError([" + E1 + "]); ";
                        else D += " validate.errors = [" + E1 + "]; return false; ";
                    else D += " var err = " + E1 + ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; "
                } else {
                    D += " ) { ";
                    var C1 = R;
                    if (C1) {
                        var f, _1 = -1,
                            F0 = C1.length - 1;
                        while (_1 < F0) {
                            f = C1[_1 += 1];
                            var u = B.util.getProperty(f),
                                y = B.util.escapeQuotes(f),
                                a = X + u;
                            if (B.opts._errorDataPathProperty) B.errorPath = B.util.getPath(O, f, B.opts.jsonPointers);
                            if (D += " if ( " + a + " === undefined ", L) D += " || ! Object.prototype.hasOwnProperty.call(" + X + ", '" + B.util.escapeQuotes(f) + "') ";
                            if (D += ") {  var err =   ", B.createErrors !== !1) {
                                if (D += " { keyword: 'dependencies' , dataPath: (dataPath || '') + " + B.errorPath + " , schemaPath: " + B.util.toQuotedString(W) + " , params: { property: '" + B.util.escapeQuotes(P) + "', missingProperty: '" + y + "', depsCount: " + R.length + ", deps: '" + B.util.escapeQuotes(R.length == 1 ? R[0] : R.join(", ")) + "' } ", B.opts.messages !== !1) {
                                    if (D += " , message: 'should have ", R.length == 1) D += "property " + B.util.escapeQuotes(R[0]);
                                    else D += "properties " + B.util.escapeQuotes(R.join(", "));
                                    D += " when property " + B.util.escapeQuotes(P) + " is present' "
                                }
                                if (B.opts.verbose) D += " , schema: validate.schema" + Y + " , parentSchema: validate.schema" + B.schemaPath + " , data: " + X + " ";
                                D += " } "
                            } else D += " {} ";
                            D += ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; } "
                        }
                    }
                }
                if (D += " }   ", J) K += "}", D += " else { "
            } B.errorPath = O;
        var W0 = C.baseId;
        for (var P in z) {
            var N = z[P];
            if (B.opts.strictKeywords ? typeof N == "object" && Object.keys(N).length > 0 || N === !1 : B.util.schemaHasRules(N, B.RULES.all)) {
                if (D += " " + H + " = true; if ( " + X + B.util.getProperty(P) + " !== undefined ", L) D += " && Object.prototype.hasOwnProperty.call(" + X + ", '" + B.util.escapeQuotes(P) + "') ";
                if (D += ") { ", C.schema = N, C.schemaPath = Y + B.util.getProperty(P), C.errSchemaPath = W + "/" + B.util.escapeFragment(P), D += "  " + B.validate(C) + " ", C.baseId = W0, D += " }  ", J) D += " if (" + H + ") { ", K += "}"
            }
        }
        if (J) D += "   " + K + " if (" + V + " == errors) {";
        return D
    }
});