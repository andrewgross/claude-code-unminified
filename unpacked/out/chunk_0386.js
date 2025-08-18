/* chunk:386 bytes:[9086583, 9106399) size:19816 source:unpacked-cli.js */
var k7B = E((N23, j7B) => {
    j7B.exports = function A(B, Q, Z) {
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
        var H = "i" + G,
            z = "schema" + G;
        if (!C) D += " var " + z + " = validate.schema" + Y + ";";
        if (D += "var " + V + ";", C) D += " if (schema" + G + " === undefined) " + V + " = true; else if (!Array.isArray(schema" + G + ")) " + V + " = false; else {";
        if (D += "" + V + " = false;for (var " + H + "=0; " + H + "<" + z + ".length; " + H + "++) if (equal(" + X + ", " + z + "[" + H + "])) { " + V + " = true; break; }", C) D += "  }  ";
        D += " if (!" + V + ") {   ";
        var $ = $ || [];
        if ($.push(D), D = "", B.createErrors !== !1) {
            if (D += " { keyword: 'enum' , dataPath: (dataPath || '') + " + B.errorPath + " , schemaPath: " + B.util.toQuotedString(W) + " , params: { allowedValues: schema" + G + " } ", B.opts.messages !== !1) D += " , message: 'should be equal to one of the allowed values' ";
            if (B.opts.verbose) D += " , schema: validate.schema" + Y + " , parentSchema: validate.schema" + B.schemaPath + " , data: " + X + " ";
            D += " } "
        } else D += " {} ";
        var L = D;
        if (D = $.pop(), !B.compositeRule && J)
            if (B.async) D += " throw new ValidationError([" + L + "]); ";
            else D += " validate.errors = [" + L + "]; return false; ";
        else D += " var err = " + L + ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ";
        if (D += " }", J) D += " else { ";
        return D
    }
});
var _7B = E((L23, y7B) => {
    y7B.exports = function A(B, Q, Z) {
        var D = " ",
            G = B.level,
            F = B.dataLevel,
            I = B.schema[Q],
            Y = B.schemaPath + B.util.getProperty(Q),
            W = B.errSchemaPath + "/" + Q,
            J = !B.opts.allErrors,
            X = "data" + (F || "");
        if (B.opts.format === !1) {
            if (J) D += " if (true) { ";
            return D
        }
        var V = B.opts.$data && I && I.$data,
            C;
        if (V) D += " var schema" + G + " = " + B.util.getData(I.$data, F, B.dataPathArr) + "; ", C = "schema" + G;
        else C = I;
        var K = B.opts.unknownFormats,
            H = Array.isArray(K);
        if (V) {
            var z = "format" + G,
                $ = "isObject" + G,
                L = "formatType" + G;
            if (D += " var " + z + " = formats[" + C + "]; var " + $ + " = typeof " + z + " == 'object' && !(" + z + " instanceof RegExp) && " + z + ".validate; var " + L + " = " + $ + " && " + z + ".type || 'string'; if (" + $ + ") { ", B.async) D += " var async" + G + " = " + z + ".async; ";
            if (D += " " + z + " = " + z + ".validate; } if (  ", V) D += " (" + C + " !== undefined && typeof " + C + " != 'string') || ";
            if (D += " (", K != "ignore") {
                if (D += " (" + C + " && !" + z + " ", H) D += " && self._opts.unknownFormats.indexOf(" + C + ") == -1 ";
                D += ") || "
            }
            if (D += " (" + z + " && " + L + " == '" + Z + "' && !(typeof " + z + " == 'function' ? ", B.async) D += " (async" + G + " ? await " + z + "(" + X + ") : " + z + "(" + X + ")) ";
            else D += " " + z + "(" + X + ") ";
            D += " : " + z + ".test(" + X + "))))) {"
        } else {
            var z = B.formats[I];
            if (!z)
                if (K == "ignore") {
                    if (B.logger.warn('unknown format "' + I + '" ignored in schema at path "' + B.errSchemaPath + '"'), J) D += " if (true) { ";
                    return D
                } else if (H && K.indexOf(I) >= 0) {
                if (J) D += " if (true) { ";
                return D
            } else throw new Error('unknown format "' + I + '" is used in schema at path "' + B.errSchemaPath + '"');
            var $ = typeof z == "object" && !(z instanceof RegExp) && z.validate,
                L = $ && z.type || "string";
            if ($) {
                var N = z.async === !0;
                z = z.validate
            }
            if (L != Z) {
                if (J) D += " if (true) { ";
                return D
            }
            if (N) {
                if (!B.async) throw new Error("async format in sync schema");
                var R = "formats" + B.util.getProperty(I) + ".validate";
                D += " if (!(await " + R + "(" + X + "))) { "
            } else {
                D += " if (! ";
                var R = "formats" + B.util.getProperty(I);
                if ($) R += ".validate";
                if (typeof z == "function") D += " " + R + "(" + X + ") ";
                else D += " " + R + ".test(" + X + ") ";
                D += ") { "
            }
        }
        var O = O || [];
        if (O.push(D), D = "", B.createErrors !== !1) {
            if (D += " { keyword: 'format' , dataPath: (dataPath || '') + " + B.errorPath + " , schemaPath: " + B.util.toQuotedString(W) + " , params: { format:  ", V) D += "" + C;
            else D += "" + B.util.toQuotedString(I);
            if (D += "  } ", B.opts.messages !== !1) {
                if (D += ` , message: 'should match format "`, V) D += "' + " + C + " + '";
                else D += "" + B.util.escapeQuotes(I);
                D += `"' `
            }
            if (B.opts.verbose) {
                if (D += " , schema:  ", V) D += "validate.schema" + Y;
                else D += "" + B.util.toQuotedString(I);
                D += "         , parentSchema: validate.schema" + B.schemaPath + " , data: " + X + " "
            }
            D += " } "
        } else D += " {} ";
        var P = D;
        if (D = O.pop(), !B.compositeRule && J)
            if (B.async) D += " throw new ValidationError([" + P + "]); ";
            else D += " validate.errors = [" + P + "]; return false; ";
        else D += " var err = " + P + ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ";
        if (D += " } ", J) D += " else { ";
        return D
    }
});
var v7B = E((M23, x7B) => {
    x7B.exports = function A(B, Q, Z) {
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
            K = B.util.copy(B);
        K.level++;
        var H = "valid" + K.level,
            z = B.schema.then,
            $ = B.schema.else,
            L = z !== void 0 && (B.opts.strictKeywords ? typeof z == "object" && Object.keys(z).length > 0 || z === !1 : B.util.schemaHasRules(z, B.RULES.all)),
            N = $ !== void 0 && (B.opts.strictKeywords ? typeof $ == "object" && Object.keys($).length > 0 || $ === !1 : B.util.schemaHasRules($, B.RULES.all)),
            R = K.baseId;
        if (L || N) {
            var O;
            K.createErrors = !1, K.schema = I, K.schemaPath = Y, K.errSchemaPath = W, D += " var " + C + " = errors; var " + V + " = true;  ";
            var P = B.compositeRule;
            if (B.compositeRule = K.compositeRule = !0, D += "  " + B.validate(K) + " ", K.baseId = R, K.createErrors = !0, D += "  errors = " + C + "; if (vErrors !== null) { if (" + C + ") vErrors.length = " + C + "; else vErrors = null; }  ", B.compositeRule = K.compositeRule = P, L) {
                if (D += " if (" + H + ") {  ", K.schema = B.schema.then, K.schemaPath = B.schemaPath + ".then", K.errSchemaPath = B.errSchemaPath + "/then", D += "  " + B.validate(K) + " ", K.baseId = R, D += " " + V + " = " + H + "; ", L && N) O = "ifClause" + G, D += " var " + O + " = 'then'; ";
                else O = "'then'";
                if (D += " } ", N) D += " else { "
            } else D += " if (!" + H + ") { ";
            if (N) {
                if (K.schema = B.schema.else, K.schemaPath = B.schemaPath + ".else", K.errSchemaPath = B.errSchemaPath + "/else", D += "  " + B.validate(K) + " ", K.baseId = R, D += " " + V + " = " + H + "; ", L && N) O = "ifClause" + G, D += " var " + O + " = 'else'; ";
                else O = "'else'";
                D += " } "
            }
            if (D += " if (!" + V + ") {   var err =   ", B.createErrors !== !1) {
                if (D += " { keyword: 'if' , dataPath: (dataPath || '') + " + B.errorPath + " , schemaPath: " + B.util.toQuotedString(W) + " , params: { failingKeyword: " + O + " } ", B.opts.messages !== !1) D += ` , message: 'should match "' + ` + O + ` + '" schema' `;
                if (B.opts.verbose) D += " , schema: validate.schema" + Y + " , parentSchema: validate.schema" + B.schemaPath + " , data: " + X + " ";
                D += " } "
            } else D += " {} ";
            if (D += ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ", !B.compositeRule && J)
                if (B.async) D += " throw new ValidationError(vErrors); ";
                else D += " validate.errors = vErrors; return false; ";
            if (D += " }   ", J) D += " else { "
        } else if (J) D += " if (true) { ";
        return D
    }
});
var f7B = E((R23, b7B) => {
    b7B.exports = function A(B, Q, Z) {
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
            R = B.baseId;
        if (D += "var " + C + " = errors;var " + V + ";", Array.isArray(I)) {
            var O = B.schema.additionalItems;
            if (O === !1) {
                D += " " + V + " = " + X + ".length <= " + I.length + "; ";
                var P = W;
                W = B.errSchemaPath + "/additionalItems", D += "  if (!" + V + ") {   ";
                var j = j || [];
                if (j.push(D), D = "", B.createErrors !== !1) {
                    if (D += " { keyword: 'additionalItems' , dataPath: (dataPath || '') + " + B.errorPath + " , schemaPath: " + B.util.toQuotedString(W) + " , params: { limit: " + I.length + " } ", B.opts.messages !== !1) D += " , message: 'should NOT have more than " + I.length + " items' ";
                    if (B.opts.verbose) D += " , schema: false , parentSchema: validate.schema" + B.schemaPath + " , data: " + X + " ";
                    D += " } "
                } else D += " {} ";
                var f = D;
                if (D = j.pop(), !B.compositeRule && J)
                    if (B.async) D += " throw new ValidationError([" + f + "]); ";
                    else D += " validate.errors = [" + f + "]; return false; ";
                else D += " var err = " + f + ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ";
                if (D += " } ", W = P, J) H += "}", D += " else { "
            }
            var k = I;
            if (k) {
                var c, u = -1,
                    a = k.length - 1;
                while (u < a)
                    if (c = k[u += 1], B.opts.strictKeywords ? typeof c == "object" && Object.keys(c).length > 0 || c === !1 : B.util.schemaHasRules(c, B.RULES.all)) {
                        D += " " + z + " = true; if (" + X + ".length > " + u + ") { ";
                        var l = X + "[" + u + "]";
                        K.schema = c, K.schemaPath = Y + "[" + u + "]", K.errSchemaPath = W + "/" + u, K.errorPath = B.util.getPathExpr(B.errorPath, u, B.opts.jsonPointers, !0), K.dataPathArr[L] = u;
                        var y = B.validate(K);
                        if (K.baseId = R, B.util.varOccurences(y, N) < 2) D += " " + B.util.varReplace(y, N, l) + " ";
                        else D += " var " + N + " = " + l + "; " + y + " ";
                        if (D += " }  ", J) D += " if (" + z + ") { ", H += "}"
                    }
            }
            if (typeof O == "object" && (B.opts.strictKeywords ? typeof O == "object" && Object.keys(O).length > 0 || O === !1 : B.util.schemaHasRules(O, B.RULES.all))) {
                K.schema = O, K.schemaPath = B.schemaPath + ".additionalItems", K.errSchemaPath = B.errSchemaPath + "/additionalItems", D += " " + z + " = true; if (" + X + ".length > " + I.length + ") {  for (var " + $ + " = " + I.length + "; " + $ + " < " + X + ".length; " + $ + "++) { ", K.errorPath = B.util.getPathExpr(B.errorPath, $, B.opts.jsonPointers, !0);
                var l = X + "[" + $ + "]";
                K.dataPathArr[L] = $;
                var y = B.validate(K);
                if (K.baseId = R, B.util.varOccurences(y, N) < 2) D += " " + B.util.varReplace(y, N, l) + " ";
                else D += " var " + N + " = " + l + "; " + y + " ";
                if (J) D += " if (!" + z + ") break; ";
                if (D += " } }  ", J) D += " if (" + z + ") { ", H += "}"
            }
        } else if (B.opts.strictKeywords ? typeof I == "object" && Object.keys(I).length > 0 || I === !1 : B.util.schemaHasRules(I, B.RULES.all)) {
            K.schema = I, K.schemaPath = Y, K.errSchemaPath = W, D += "  for (var " + $ + " = 0; " + $ + " < " + X + ".length; " + $ + "++) { ", K.errorPath = B.util.getPathExpr(B.errorPath, $, B.opts.jsonPointers, !0);
            var l = X + "[" + $ + "]";
            K.dataPathArr[L] = $;
            var y = B.validate(K);
            if (K.baseId = R, B.util.varOccurences(y, N) < 2) D += " " + B.util.varReplace(y, N, l) + " ";
            else D += " var " + N + " = " + l + "; " + y + " ";
            if (J) D += " if (!" + z + ") break; ";
            D += " }"
        }
        if (J) D += " " + H + " if (" + C + " == errors) {";
        return D
    }
});
var vH0 = E((O23, h7B) => {
    h7B.exports = function A(B, Q, Z) {
        var D = " ",
            G = B.level,
            F = B.dataLevel,
            I = B.schema[Q],
            Y = B.schemaPath + B.util.getProperty(Q),
            W = B.errSchemaPath + "/" + Q,
            J = !B.opts.allErrors,
            R, X = "data" + (F || ""),
            V = B.opts.$data && I && I.$data,
            C;
        if (V) D += " var schema" + G + " = " + B.util.getData(I.$data, F, B.dataPathArr) + "; ", C = "schema" + G;
        else C = I;
        var K = Q == "maximum",
            H = K ? "exclusiveMaximum" : "exclusiveMinimum",
            z = B.schema[H],
            $ = B.opts.$data && z && z.$data,
            L = K ? "<" : ">",
            N = K ? ">" : "<",
            R = void 0;
        if (!(V || typeof I == "number" || I === void 0)) throw new Error(Q + " must be number");
        if (!($ || z === void 0 || typeof z == "number" || typeof z == "boolean")) throw new Error(H + " must be number or boolean");
        if ($) {
            var O = B.util.getData(z.$data, F, B.dataPathArr),
                P = "exclusive" + G,
                j = "exclType" + G,
                f = "exclIsNumber" + G,
                k = "op" + G,
                c = "' + " + k + " + '";
            D += " var schemaExcl" + G + " = " + O + "; ", O = "schemaExcl" + G, D += " var " + P + "; var " + j + " = typeof " + O + "; if (" + j + " != 'boolean' && " + j + " != 'undefined' && " + j + " != 'number') { ";
            var R = H,
                u = u || [];
            if (u.push(D), D = "", B.createErrors !== !1) {
                if (D += " { keyword: '" + (R || "_exclusiveLimit") + "' , dataPath: (dataPath || '') + " + B.errorPath + " , schemaPath: " + B.util.toQuotedString(W) + " , params: {} ", B.opts.messages !== !1) D += " , message: '" + H + " should be boolean' ";
                if (B.opts.verbose) D += " , schema: validate.schema" + Y + " , parentSchema: validate.schema" + B.schemaPath + " , data: " + X + " ";
                D += " } "
            } else D += " {} ";
            var a = D;
            if (D = u.pop(), !B.compositeRule && J)
                if (B.async) D += " throw new ValidationError([" + a + "]); ";
                else D += " validate.errors = [" + a + "]; return false; ";
            else D += " var err = " + a + ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ";
            if (D += " } else if ( ", V) D += " (" + C + " !== undefined && typeof " + C + " != 'number') || ";
            if (D += " " + j + " == 'number' ? ( (" + P + " = " + C + " === undefined || " + O + " " + L + "= " + C + ") ? " + X + " " + N + "= " + O + " : " + X + " " + N + " " + C + " ) : ( (" + P + " = " + O + " === true) ? " + X + " " + N + "= " + C + " : " + X + " " + N + " " + C + " ) || " + X + " !== " + X + ") { var op" + G + " = " + P + " ? '" + L + "' : '" + L + "='; ", I === void 0) R = H, W = B.errSchemaPath + "/" + H, C = O, V = $
        } else {
            var f = typeof z == "number",
                c = L;
            if (f && V) {
                var k = "'" + c + "'";
                if (D += " if ( ", V) D += " (" + C + " !== undefined && typeof " + C + " != 'number') || ";
                D += " ( " + C + " === undefined || " + z + " " + L + "= " + C + " ? " + X + " " + N + "= " + z + " : " + X + " " + N + " " + C + " ) || " + X + " !== " + X + ") { "
            } else {
                if (f && I === void 0) P = !0, R = H, W = B.errSchemaPath + "/" + H, C = z, N += "=";
                else {
                    if (f) C = Math[K ? "min" : "max"](z, I);
                    if (z === (f ? C : !0)) P = !0, R = H, W = B.errSchemaPath + "/" + H, N += "=";
                    else P = !1, c += "="
                }
                var k = "'" + c + "'";
                if (D += " if ( ", V) D += " (" + C + " !== undefined && typeof " + C + " != 'number') || ";
                D += " " + X + " " + N + " " + C + " || " + X + " !== " + X + ") { "
            }
        }
        R = R || Q;
        var u = u || [];
        if (u.push(D), D = "", B.createErrors !== !1) {
            if (D += " { keyword: '" + (R || "_limit") + "' , dataPath: (dataPath || '') + " + B.errorPath + " , schemaPath: " + B.util.toQuotedString(W) + " , params: { comparison: " + k + ", limit: " + C + ", exclusive: " + P + " } ", B.opts.messages !== !1)
                if (D += " , message: 'should be " + c + " ", V) D += "' + " + C;
                else D += "" + C + "'";
            if (B.opts.verbose) {
                if (D += " , schema:  ", V) D += "validate.schema" + Y;
                else D += "" + I;
                D += "         , parentSchema: validate.schema" + B.schemaPath + " , data: " + X + " "
            }
            D += " } "
        } else D += " {} ";
        var a = D;
        if (D = u.pop(), !B.compositeRule && J)
            if (B.async) D += " throw new ValidationError([" + a + "]); ";
            else D += " validate.errors = [" + a + "]; return false; ";
        else D += " var err = " + a + ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ";
        if (D += " } ", J) D += " else { ";
        return D
    }
});