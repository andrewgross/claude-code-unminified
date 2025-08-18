/* chunk:387 bytes:[9106400, 9122525) size:16125 source:unpacked-cli.js */
var bH0 = E((T23, g7B) => {
    g7B.exports = function A(B, Q, Z) {
        var D = " ",
            G = B.level,
            F = B.dataLevel,
            I = B.schema[Q],
            Y = B.schemaPath + B.util.getProperty(Q),
            W = B.errSchemaPath + "/" + Q,
            J = !B.opts.allErrors,
            H, X = "data" + (F || ""),
            V = B.opts.$data && I && I.$data,
            C;
        if (V) D += " var schema" + G + " = " + B.util.getData(I.$data, F, B.dataPathArr) + "; ", C = "schema" + G;
        else C = I;
        if (!(V || typeof I == "number")) throw new Error(Q + " must be number");
        var K = Q == "maxItems" ? ">" : "<";
        if (D += "if ( ", V) D += " (" + C + " !== undefined && typeof " + C + " != 'number') || ";
        D += " " + X + ".length " + K + " " + C + ") { ";
        var H = Q,
            z = z || [];
        if (z.push(D), D = "", B.createErrors !== !1) {
            if (D += " { keyword: '" + (H || "_limitItems") + "' , dataPath: (dataPath || '') + " + B.errorPath + " , schemaPath: " + B.util.toQuotedString(W) + " , params: { limit: " + C + " } ", B.opts.messages !== !1) {
                if (D += " , message: 'should NOT have ", Q == "maxItems") D += "more";
                else D += "fewer";
                if (D += " than ", V) D += "' + " + C + " + '";
                else D += "" + I;
                D += " items' "
            }
            if (B.opts.verbose) {
                if (D += " , schema:  ", V) D += "validate.schema" + Y;
                else D += "" + I;
                D += "         , parentSchema: validate.schema" + B.schemaPath + " , data: " + X + " "
            }
            D += " } "
        } else D += " {} ";
        var $ = D;
        if (D = z.pop(), !B.compositeRule && J)
            if (B.async) D += " throw new ValidationError([" + $ + "]); ";
            else D += " validate.errors = [" + $ + "]; return false; ";
        else D += " var err = " + $ + ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ";
        if (D += "} ", J) D += " else { ";
        return D
    }
});
var fH0 = E((P23, u7B) => {
    u7B.exports = function A(B, Q, Z) {
        var D = " ",
            G = B.level,
            F = B.dataLevel,
            I = B.schema[Q],
            Y = B.schemaPath + B.util.getProperty(Q),
            W = B.errSchemaPath + "/" + Q,
            J = !B.opts.allErrors,
            H, X = "data" + (F || ""),
            V = B.opts.$data && I && I.$data,
            C;
        if (V) D += " var schema" + G + " = " + B.util.getData(I.$data, F, B.dataPathArr) + "; ", C = "schema" + G;
        else C = I;
        if (!(V || typeof I == "number")) throw new Error(Q + " must be number");
        var K = Q == "maxLength" ? ">" : "<";
        if (D += "if ( ", V) D += " (" + C + " !== undefined && typeof " + C + " != 'number') || ";
        if (B.opts.unicode === !1) D += " " + X + ".length ";
        else D += " ucs2length(" + X + ") ";
        D += " " + K + " " + C + ") { ";
        var H = Q,
            z = z || [];
        if (z.push(D), D = "", B.createErrors !== !1) {
            if (D += " { keyword: '" + (H || "_limitLength") + "' , dataPath: (dataPath || '') + " + B.errorPath + " , schemaPath: " + B.util.toQuotedString(W) + " , params: { limit: " + C + " } ", B.opts.messages !== !1) {
                if (D += " , message: 'should NOT be ", Q == "maxLength") D += "longer";
                else D += "shorter";
                if (D += " than ", V) D += "' + " + C + " + '";
                else D += "" + I;
                D += " characters' "
            }
            if (B.opts.verbose) {
                if (D += " , schema:  ", V) D += "validate.schema" + Y;
                else D += "" + I;
                D += "         , parentSchema: validate.schema" + B.schemaPath + " , data: " + X + " "
            }
            D += " } "
        } else D += " {} ";
        var $ = D;
        if (D = z.pop(), !B.compositeRule && J)
            if (B.async) D += " throw new ValidationError([" + $ + "]); ";
            else D += " validate.errors = [" + $ + "]; return false; ";
        else D += " var err = " + $ + ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ";
        if (D += "} ", J) D += " else { ";
        return D
    }
});
var hH0 = E((S23, m7B) => {
    m7B.exports = function A(B, Q, Z) {
        var D = " ",
            G = B.level,
            F = B.dataLevel,
            I = B.schema[Q],
            Y = B.schemaPath + B.util.getProperty(Q),
            W = B.errSchemaPath + "/" + Q,
            J = !B.opts.allErrors,
            H, X = "data" + (F || ""),
            V = B.opts.$data && I && I.$data,
            C;
        if (V) D += " var schema" + G + " = " + B.util.getData(I.$data, F, B.dataPathArr) + "; ", C = "schema" + G;
        else C = I;
        if (!(V || typeof I == "number")) throw new Error(Q + " must be number");
        var K = Q == "maxProperties" ? ">" : "<";
        if (D += "if ( ", V) D += " (" + C + " !== undefined && typeof " + C + " != 'number') || ";
        D += " Object.keys(" + X + ").length " + K + " " + C + ") { ";
        var H = Q,
            z = z || [];
        if (z.push(D), D = "", B.createErrors !== !1) {
            if (D += " { keyword: '" + (H || "_limitProperties") + "' , dataPath: (dataPath || '') + " + B.errorPath + " , schemaPath: " + B.util.toQuotedString(W) + " , params: { limit: " + C + " } ", B.opts.messages !== !1) {
                if (D += " , message: 'should NOT have ", Q == "maxProperties") D += "more";
                else D += "fewer";
                if (D += " than ", V) D += "' + " + C + " + '";
                else D += "" + I;
                D += " properties' "
            }
            if (B.opts.verbose) {
                if (D += " , schema:  ", V) D += "validate.schema" + Y;
                else D += "" + I;
                D += "         , parentSchema: validate.schema" + B.schemaPath + " , data: " + X + " "
            }
            D += " } "
        } else D += " {} ";
        var $ = D;
        if (D = z.pop(), !B.compositeRule && J)
            if (B.async) D += " throw new ValidationError([" + $ + "]); ";
            else D += " validate.errors = [" + $ + "]; return false; ";
        else D += " var err = " + $ + ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ";
        if (D += "} ", J) D += " else { ";
        return D
    }
});
var c7B = E((j23, d7B) => {
    d7B.exports = function A(B, Q, Z) {
        var D = " ",
            G = B.level,
            F = B.dataLevel,
            I = B.schema[Q],
            Y = B.schemaPath + B.util.getProperty(Q),
            W = B.errSchemaPath + "/" + Q,
            J = !B.opts.allErrors,
            X = "data" + (F || ""),
            V = B.opts.$data && I && I.$data,
            C;
        if (V) D += " var schema" + G + " = " + B.util.getData(I.$data, F, B.dataPathArr) + "; ", C = "schema" + G;
        else C = I;
        if (!(V || typeof I == "number")) throw new Error(Q + " must be number");
        if (D += "var division" + G + ";if (", V) D += " " + C + " !== undefined && ( typeof " + C + " != 'number' || ";
        if (D += " (division" + G + " = " + X + " / " + C + ", ", B.opts.multipleOfPrecision) D += " Math.abs(Math.round(division" + G + ") - division" + G + ") > 1e-" + B.opts.multipleOfPrecision + " ";
        else D += " division" + G + " !== parseInt(division" + G + ") ";
        if (D += " ) ", V) D += "  )  ";
        D += " ) {   ";
        var K = K || [];
        if (K.push(D), D = "", B.createErrors !== !1) {
            if (D += " { keyword: 'multipleOf' , dataPath: (dataPath || '') + " + B.errorPath + " , schemaPath: " + B.util.toQuotedString(W) + " , params: { multipleOf: " + C + " } ", B.opts.messages !== !1)
                if (D += " , message: 'should be multiple of ", V) D += "' + " + C;
                else D += "" + C + "'";
            if (B.opts.verbose) {
                if (D += " , schema:  ", V) D += "validate.schema" + Y;
                else D += "" + I;
                D += "         , parentSchema: validate.schema" + B.schemaPath + " , data: " + X + " "
            }
            D += " } "
        } else D += " {} ";
        var H = D;
        if (D = K.pop(), !B.compositeRule && J)
            if (B.async) D += " throw new ValidationError([" + H + "]); ";
            else D += " validate.errors = [" + H + "]; return false; ";
        else D += " var err = " + H + ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ";
        if (D += "} ", J) D += " else { ";
        return D
    }
});
var p7B = E((k23, l7B) => {
    l7B.exports = function A(B, Q, Z) {
        var D = " ",
            G = B.level,
            F = B.dataLevel,
            I = B.schema[Q],
            Y = B.schemaPath + B.util.getProperty(Q),
            W = B.errSchemaPath + "/" + Q,
            J = !B.opts.allErrors,
            X = "data" + (F || ""),
            V = "errs__" + G,
            C = B.util.copy(B);
        C.level++;
        var K = "valid" + C.level;
        if (B.opts.strictKeywords ? typeof I == "object" && Object.keys(I).length > 0 || I === !1 : B.util.schemaHasRules(I, B.RULES.all)) {
            C.schema = I, C.schemaPath = Y, C.errSchemaPath = W, D += " var " + V + " = errors;  ";
            var H = B.compositeRule;
            B.compositeRule = C.compositeRule = !0, C.createErrors = !1;
            var z;
            if (C.opts.allErrors) z = C.opts.allErrors, C.opts.allErrors = !1;
            if (D += " " + B.validate(C) + " ", C.createErrors = !0, z) C.opts.allErrors = z;
            B.compositeRule = C.compositeRule = H, D += " if (" + K + ") {   ";
            var $ = $ || [];
            if ($.push(D), D = "", B.createErrors !== !1) {
                if (D += " { keyword: 'not' , dataPath: (dataPath || '') + " + B.errorPath + " , schemaPath: " + B.util.toQuotedString(W) + " , params: {} ", B.opts.messages !== !1) D += " , message: 'should NOT be valid' ";
                if (B.opts.verbose) D += " , schema: validate.schema" + Y + " , parentSchema: validate.schema" + B.schemaPath + " , data: " + X + " ";
                D += " } "
            } else D += " {} ";
            var L = D;
            if (D = $.pop(), !B.compositeRule && J)
                if (B.async) D += " throw new ValidationError([" + L + "]); ";
                else D += " validate.errors = [" + L + "]; return false; ";
            else D += " var err = " + L + ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ";
            if (D += " } else {  errors = " + V + "; if (vErrors !== null) { if (" + V + ") vErrors.length = " + V + "; else vErrors = null; } ", B.opts.allErrors) D += " } "
        } else {
            if (D += "  var err =   ", B.createErrors !== !1) {
                if (D += " { keyword: 'not' , dataPath: (dataPath || '') + " + B.errorPath + " , schemaPath: " + B.util.toQuotedString(W) + " , params: {} ", B.opts.messages !== !1) D += " , message: 'should NOT be valid' ";
                if (B.opts.verbose) D += " , schema: validate.schema" + Y + " , parentSchema: validate.schema" + B.schemaPath + " , data: " + X + " ";
                D += " } "
            } else D += " {} ";
            if (D += ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ", J) D += " if (false) { "
        }
        return D
    }
});
var n7B = E((y23, i7B) => {
    i7B.exports = function A(B, Q, Z) {
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
            $ = K.baseId,
            L = "prevValid" + G,
            N = "passingSchemas" + G;
        D += "var " + C + " = errors , " + L + " = false , " + V + " = false , " + N + " = null; ";
        var R = B.compositeRule;
        B.compositeRule = K.compositeRule = !0;
        var O = I;
        if (O) {
            var P, j = -1,
                f = O.length - 1;
            while (j < f) {
                if (P = O[j += 1], B.opts.strictKeywords ? typeof P == "object" && Object.keys(P).length > 0 || P === !1 : B.util.schemaHasRules(P, B.RULES.all)) K.schema = P, K.schemaPath = Y + "[" + j + "]", K.errSchemaPath = W + "/" + j, D += "  " + B.validate(K) + " ", K.baseId = $;
                else D += " var " + z + " = true; ";
                if (j) D += " if (" + z + " && " + L + ") { " + V + " = false; " + N + " = [" + N + ", " + j + "]; } else { ", H += "}";
                D += " if (" + z + ") { " + V + " = " + L + " = true; " + N + " = " + j + "; }"
            }
        }
        if (B.compositeRule = K.compositeRule = R, D += "" + H + "if (!" + V + ") {   var err =   ", B.createErrors !== !1) {
            if (D += " { keyword: 'oneOf' , dataPath: (dataPath || '') + " + B.errorPath + " , schemaPath: " + B.util.toQuotedString(W) + " , params: { passingSchemas: " + N + " } ", B.opts.messages !== !1) D += " , message: 'should match exactly one schema in oneOf' ";
            if (B.opts.verbose) D += " , schema: validate.schema" + Y + " , parentSchema: validate.schema" + B.schemaPath + " , data: " + X + " ";
            D += " } "
        } else D += " {} ";
        if (D += ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ", !B.compositeRule && J)
            if (B.async) D += " throw new ValidationError(vErrors); ";
            else D += " validate.errors = vErrors; return false; ";
        if (D += "} else {  errors = " + C + "; if (vErrors !== null) { if (" + C + ") vErrors.length = " + C + "; else vErrors = null; }", B.opts.allErrors) D += " } ";
        return D
    }
});
var s7B = E((_23, a7B) => {
    a7B.exports = function A(B, Q, Z) {
        var D = " ",
            G = B.level,
            F = B.dataLevel,
            I = B.schema[Q],
            Y = B.schemaPath + B.util.getProperty(Q),
            W = B.errSchemaPath + "/" + Q,
            J = !B.opts.allErrors,
            X = "data" + (F || ""),
            V = B.opts.$data && I && I.$data,
            C;
        if (V) D += " var schema" + G + " = " + B.util.getData(I.$data, F, B.dataPathArr) + "; ", C = "schema" + G;
        else C = I;
        var K = V ? "(new RegExp(" + C + "))" : B.usePattern(I);
        if (D += "if ( ", V) D += " (" + C + " !== undefined && typeof " + C + " != 'string') || ";
        D += " !" + K + ".test(" + X + ") ) {   ";
        var H = H || [];
        if (H.push(D), D = "", B.createErrors !== !1) {
            if (D += " { keyword: 'pattern' , dataPath: (dataPath || '') + " + B.errorPath + " , schemaPath: " + B.util.toQuotedString(W) + " , params: { pattern:  ", V) D += "" + C;
            else D += "" + B.util.toQuotedString(I);
            if (D += "  } ", B.opts.messages !== !1) {
                if (D += ` , message: 'should match pattern "`, V) D += "' + " + C + " + '";
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
        var z = D;
        if (D = H.pop(), !B.compositeRule && J)
            if (B.async) D += " throw new ValidationError([" + z + "]); ";
            else D += " validate.errors = [" + z + "]; return false; ";
        else D += " var err = " + z + ";  if (vErrors === null) vErrors = [err]; else vErrors.push(err); errors++; ";
        if (D += "} ", J) D += " else { ";
        return D
    }
});