/* chunk:303 bytes:[7077043, 7082022) size:4979 source:unpacked-cli.js */
var _k2 = E((kk2) => {
    Object.defineProperty(kk2, "__esModule", {
        value: !0
    });
    kk2.isAttributeValue = kk2.isAttributeKey = kk2.sanitizeAttributes = void 0;
    var Tk2 = XQ();

    function AA6(A) {
        let B = {};
        if (typeof A !== "object" || A == null) return B;
        for (let [Q, Z] of Object.entries(A)) {
            if (!Pk2(Q)) {
                Tk2.diag.warn(`Invalid attribute key: ${Q}`);
                continue
            }
            if (!Sk2(Z)) {
                Tk2.diag.warn(`Invalid attribute value set for key: ${Q}`);
                continue
            }
            if (Array.isArray(Z)) B[Q] = Z.slice();
            else B[Q] = Z
        }
        return B
    }
    kk2.sanitizeAttributes = AA6;

    function Pk2(A) {
        return typeof A === "string" && A.length > 0
    }
    kk2.isAttributeKey = Pk2;

    function Sk2(A) {
        if (A == null) return !0;
        if (Array.isArray(A)) return BA6(A);
        return jk2(A)
    }
    kk2.isAttributeValue = Sk2;

    function BA6(A) {
        let B;
        for (let Q of A) {
            if (Q == null) continue;
            if (!B) {
                if (jk2(Q)) {
                    B = typeof Q;
                    continue
                }
                return !1
            }
            if (typeof Q === B) continue;
            return !1
        }
        return !0
    }

    function jk2(A) {
        switch (typeof A) {
            case "number":
            case "boolean":
            case "string":
                return !0
        }
        return !1
    }
});
var SY0 = E((xk2) => {
    Object.defineProperty(xk2, "__esModule", {
        value: !0
    });
    xk2.loggingErrorHandler = void 0;
    var DA6 = XQ();

    function GA6() {
        return (A) => {
            DA6.diag.error(FA6(A))
        }
    }
    xk2.loggingErrorHandler = GA6;

    function FA6(A) {
        if (typeof A === "string") return A;
        else return JSON.stringify(IA6(A))
    }

    function IA6(A) {
        let B = {},
            Q = A;
        while (Q !== null) Object.getOwnPropertyNames(Q).forEach((Z) => {
            if (B[Z]) return;
            let D = Q[Z];
            if (D) B[Z] = String(D)
        }), Q = Object.getPrototypeOf(Q);
        return B
    }
});
var gk2 = E((fk2) => {
    Object.defineProperty(fk2, "__esModule", {
        value: !0
    });
    fk2.globalErrorHandler = fk2.setGlobalErrorHandler = void 0;
    var YA6 = SY0(),
        bk2 = YA6.loggingErrorHandler();

    function WA6(A) {
        bk2 = A
    }
    fk2.setGlobalErrorHandler = WA6;

    function JA6(A) {
        try {
            bk2(A)
        } catch {}
    }
    fk2.globalErrorHandler = JA6
});
var pk2 = E((ck2) => {
    Object.defineProperty(ck2, "__esModule", {
        value: !0
    });
    ck2.getStringListFromEnv = ck2.getBooleanFromEnv = ck2.getStringFromEnv = ck2.getNumberFromEnv = void 0;
    var uk2 = XQ(),
        mk2 = W1("util");

    function VA6(A) {
        let B = process.env[A];
        if (B == null || B.trim() === "") return;
        let Q = Number(B);
        if (isNaN(Q)) {
            uk2.diag.warn(`Unknown value ${mk2.inspect(B)} for ${A}, expected a number, using defaults`);
            return
        }
        return Q
    }
    ck2.getNumberFromEnv = VA6;

    function dk2(A) {
        let B = process.env[A];
        if (B == null || B.trim() === "") return;
        return B
    }
    ck2.getStringFromEnv = dk2;

    function CA6(A) {
        let B = process.env[A]?.trim().toLowerCase();
        if (B == null || B === "") return !1;
        if (B === "true") return !0;
        else if (B === "false") return !1;
        else return uk2.diag.warn(`Unknown value ${mk2.inspect(B)} for ${A}, expected 'true' or 'false', falling back to 'false' (default)`), !1
    }
    ck2.getBooleanFromEnv = CA6;

    function KA6(A) {
        return dk2(A)?.split(",").map((B) => B.trim()).filter((B) => B !== "")
    }
    ck2.getStringListFromEnv = KA6
});
var ak2 = E((ik2) => {
    Object.defineProperty(ik2, "__esModule", {
        value: !0
    });
    ik2._globalThis = void 0;
    ik2._globalThis = typeof globalThis === "object" ? globalThis : global
});
var ok2 = E((sk2) => {
    Object.defineProperty(sk2, "__esModule", {
        value: !0
    });
    sk2.otperformance = void 0;
    var UA6 = W1("perf_hooks");
    sk2.otperformance = UA6.performance
});
var Ay2 = E((tk2) => {
    Object.defineProperty(tk2, "__esModule", {
        value: !0
    });
    tk2.VERSION = void 0;
    tk2.VERSION = "2.0.0"
});
var jY0 = E((By2) => {
    Object.defineProperty(By2, "__esModule", {
        value: !0
    });
    By2.createConstMap = void 0;

    function wA6(A) {
        let B = {},
            Q = A.length;
        for (let Z = 0; Z < Q; Z++) {
            let D = A[Z];
            if (D) B[String(D).toUpperCase().replace(/[-.]/g, "_")] = D
        }
        return B
    }
    By2.createConstMap = wA6
});