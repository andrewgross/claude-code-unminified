/* chunk:127 bytes:[2940670, 2951832) size:11162 source:unpacked-cli.js */
var cQ1 = E((n45, yRA) => {
    var RRA = ["GET", "HEAD", "POST"],
        LRQ = new Set(RRA),
        MRQ = [101, 204, 205, 304],
        ORA = [301, 302, 303, 307, 308],
        RRQ = new Set(ORA),
        TRA = ["1", "7", "9", "11", "13", "15", "17", "19", "20", "21", "22", "23", "25", "37", "42", "43", "53", "69", "77", "79", "87", "95", "101", "102", "103", "104", "109", "110", "111", "113", "115", "117", "119", "123", "135", "137", "139", "143", "161", "179", "389", "427", "465", "512", "513", "514", "515", "526", "530", "531", "532", "540", "548", "554", "556", "563", "587", "601", "636", "989", "990", "993", "995", "1719", "1720", "1723", "2049", "3659", "4045", "4190", "5060", "5061", "6000", "6566", "6665", "6666", "6667", "6668", "6669", "6679", "6697", "10080"],
        ORQ = new Set(TRA),
        PRA = ["", "no-referrer", "no-referrer-when-downgrade", "same-origin", "origin", "strict-origin", "origin-when-cross-origin", "strict-origin-when-cross-origin", "unsafe-url"],
        TRQ = new Set(PRA),
        PRQ = ["follow", "manual", "error"],
        SRA = ["GET", "HEAD", "OPTIONS", "TRACE"],
        SRQ = new Set(SRA),
        jRQ = ["navigate", "same-origin", "no-cors", "cors"],
        kRQ = ["omit", "same-origin", "include"],
        yRQ = ["default", "no-store", "reload", "no-cache", "force-cache", "only-if-cached"],
        _RQ = ["content-encoding", "content-language", "content-location", "content-type", "content-length"],
        xRQ = ["half"],
        jRA = ["CONNECT", "TRACE", "TRACK"],
        vRQ = new Set(jRA),
        kRA = ["audio", "audioworklet", "font", "image", "manifest", "paintworklet", "script", "style", "track", "video", "xslt", ""],
        bRQ = new Set(kRA);
    yRA.exports = {
        subresource: kRA,
        forbiddenMethods: jRA,
        requestBodyHeader: _RQ,
        referrerPolicy: PRA,
        requestRedirect: PRQ,
        requestMode: jRQ,
        requestCredentials: kRQ,
        requestCache: yRQ,
        redirectStatus: ORA,
        corsSafeListedMethods: RRA,
        nullBodyStatus: MRQ,
        safeMethods: SRA,
        badPorts: TRA,
        requestDuplex: xRQ,
        subresourceSet: bRQ,
        badPortsSet: ORQ,
        redirectStatusSet: RRQ,
        corsSafeListedMethodsSet: LRQ,
        safeMethodsSet: SRQ,
        forbiddenMethodsSet: vRQ,
        referrerPolicySet: TRQ
    }
});
var H00 = E((a45, _RA) => {
    var K00 = Symbol.for("undici.globalOrigin.1");

    function fRQ() {
        return globalThis[K00]
    }

    function hRQ(A) {
        if (A === void 0) {
            Object.defineProperty(globalThis, K00, {
                value: void 0,
                writable: !0,
                enumerable: !1,
                configurable: !1
            });
            return
        }
        let B = new URL(A);
        if (B.protocol !== "http:" && B.protocol !== "https:") throw new TypeError(`Only http & https urls are allowed, received ${B.protocol}`);
        Object.defineProperty(globalThis, K00, {
            value: B,
            writable: !0,
            enumerable: !1,
            configurable: !1
        })
    }
    _RA.exports = {
        getGlobalOrigin: fRQ,
        setGlobalOrigin: hRQ
    }
});
var NV = E((s45, uRA) => {
    var tE1 = W1("node:assert"),
        gRQ = new TextEncoder,
        lQ1 = /^[!#$%&'*+\-.^_|~A-Za-z0-9]+$/,
        uRQ = /[\u000A\u000D\u0009\u0020]/,
        mRQ = /[\u0009\u000A\u000C\u000D\u0020]/g,
        dRQ = /^[\u0009\u0020-\u007E\u0080-\u00FF]+$/;

    function cRQ(A) {
        tE1(A.protocol === "data:");
        let B = bRA(A, !0);
        B = B.slice(5);
        let Q = {
                position: 0
            },
            Z = Ln(",", B, Q),
            D = Z.length;
        if (Z = sRQ(Z, !0, !0), Q.position >= B.length) return "failure";
        Q.position++;
        let G = B.slice(D + 1),
            F = fRA(G);
        if (/;(\u0020){0,}base64$/i.test(Z)) {
            let Y = gRA(F);
            if (F = pRQ(Y), F === "failure") return "failure";
            Z = Z.slice(0, -6), Z = Z.replace(/(\u0020)+$/, ""), Z = Z.slice(0, -1)
        }
        if (Z.startsWith(";")) Z = "text/plain" + Z;
        let I = z00(Z);
        if (I === "failure") I = z00("text/plain;charset=US-ASCII");
        return {
            mimeType: I,
            body: F
        }
    }

    function bRA(A, B = !1) {
        if (!B) return A.href;
        let Q = A.href,
            Z = A.hash.length,
            D = Z === 0 ? Q : Q.substring(0, Q.length - Z);
        if (!Z && Q.endsWith("#")) return D.slice(0, -1);
        return D
    }

    function eE1(A, B, Q) {
        let Z = "";
        while (Q.position < B.length && A(B[Q.position])) Z += B[Q.position], Q.position++;
        return Z
    }

    function Ln(A, B, Q) {
        let Z = B.indexOf(A, Q.position),
            D = Q.position;
        if (Z === -1) return Q.position = B.length, B.slice(D);
        return Q.position = Z, B.slice(D, Q.position)
    }

    function fRA(A) {
        let B = gRQ.encode(A);
        return lRQ(B)
    }

    function xRA(A) {
        return A >= 48 && A <= 57 || A >= 65 && A <= 70 || A >= 97 && A <= 102
    }

    function vRA(A) {
        return A >= 48 && A <= 57 ? A - 48 : (A & 223) - 55
    }

    function lRQ(A) {
        let B = A.length,
            Q = new Uint8Array(B),
            Z = 0;
        for (let D = 0; D < B; ++D) {
            let G = A[D];
            if (G !== 37) Q[Z++] = G;
            else if (G === 37 && !(xRA(A[D + 1]) && xRA(A[D + 2]))) Q[Z++] = 37;
            else Q[Z++] = vRA(A[D + 1]) << 4 | vRA(A[D + 2]), D += 2
        }
        return B === Z ? Q : Q.subarray(0, Z)
    }

    function z00(A) {
        A = oE1(A, !0, !0);
        let B = {
                position: 0
            },
            Q = Ln("/", A, B);
        if (Q.length === 0 || !lQ1.test(Q)) return "failure";
        if (B.position > A.length) return "failure";
        B.position++;
        let Z = Ln(";", A, B);
        if (Z = oE1(Z, !1, !0), Z.length === 0 || !lQ1.test(Z)) return "failure";
        let D = Q.toLowerCase(),
            G = Z.toLowerCase(),
            F = {
                type: D,
                subtype: G,
                parameters: new Map,
                essence: `${D}/${G}`
            };
        while (B.position < A.length) {
            B.position++, eE1((W) => uRQ.test(W), A, B);
            let I = eE1((W) => W !== ";" && W !== "=", A, B);
            if (I = I.toLowerCase(), B.position < A.length) {
                if (A[B.position] === ";") continue;
                B.position++
            }
            if (B.position > A.length) break;
            let Y = null;
            if (A[B.position] === '"') Y = hRA(A, B, !0), Ln(";", A, B);
            else if (Y = Ln(";", A, B), Y = oE1(Y, !1, !0), Y.length === 0) continue;
            if (I.length !== 0 && lQ1.test(I) && (Y.length === 0 || dRQ.test(Y)) && !F.parameters.has(I)) F.parameters.set(I, Y)
        }
        return F
    }

    function pRQ(A) {
        A = A.replace(mRQ, "");
        let B = A.length;
        if (B % 4 === 0) {
            if (A.charCodeAt(B - 1) === 61) {
                if (--B, A.charCodeAt(B - 1) === 61) --B
            }
        }
        if (B % 4 === 1) return "failure";
        if (/[^+/0-9A-Za-z]/.test(A.length === B ? A : A.substring(0, B))) return "failure";
        let Q = Buffer.from(A, "base64");
        return new Uint8Array(Q.buffer, Q.byteOffset, Q.byteLength)
    }

    function hRA(A, B, Q) {
        let Z = B.position,
            D = "";
        tE1(A[B.position] === '"'), B.position++;
        while (!0) {
            if (D += eE1((F) => F !== '"' && F !== "\\", A, B), B.position >= A.length) break;
            let G = A[B.position];
            if (B.position++, G === "\\") {
                if (B.position >= A.length) {
                    D += "\\";
                    break
                }
                D += A[B.position], B.position++
            } else {
                tE1(G === '"');
                break
            }
        }
        if (Q) return D;
        return A.slice(Z, B.position)
    }

    function iRQ(A) {
        tE1(A !== "failure");
        let {
            parameters: B,
            essence: Q
        } = A, Z = Q;
        for (let [D, G] of B.entries()) {
            if (Z += ";", Z += D, Z += "=", !lQ1.test(G)) G = G.replace(/(\\|")/g, "\\$1"), G = '"' + G, G += '"';
            Z += G
        }
        return Z
    }

    function nRQ(A) {
        return A === 13 || A === 10 || A === 9 || A === 32
    }

    function oE1(A, B = !0, Q = !0) {
        return E00(A, B, Q, nRQ)
    }

    function aRQ(A) {
        return A === 13 || A === 10 || A === 9 || A === 12 || A === 32
    }

    function sRQ(A, B = !0, Q = !0) {
        return E00(A, B, Q, aRQ)
    }

    function E00(A, B, Q, Z) {
        let D = 0,
            G = A.length - 1;
        if (B)
            while (D < A.length && Z(A.charCodeAt(D))) D++;
        if (Q)
            while (G > 0 && Z(A.charCodeAt(G))) G--;
        return D === 0 && G === A.length - 1 ? A : A.slice(D, G + 1)
    }

    function gRA(A) {
        let B = A.length;
        if (65535 > B) return String.fromCharCode.apply(null, A);
        let Q = "",
            Z = 0,
            D = 65535;
        while (Z < B) {
            if (Z + D > B) D = B - Z;
            Q += String.fromCharCode.apply(null, A.subarray(Z, Z += D))
        }
        return Q
    }

    function rRQ(A) {
        switch (A.essence) {
            case "application/ecmascript":
            case "application/javascript":
            case "application/x-ecmascript":
            case "application/x-javascript":
            case "text/ecmascript":
            case "text/javascript":
            case "text/javascript1.0":
            case "text/javascript1.1":
            case "text/javascript1.2":
            case "text/javascript1.3":
            case "text/javascript1.4":
            case "text/javascript1.5":
            case "text/jscript":
            case "text/livescript":
            case "text/x-ecmascript":
            case "text/x-javascript":
                return "text/javascript";
            case "application/json":
            case "text/json":
                return "application/json";
            case "image/svg+xml":
                return "image/svg+xml";
            case "text/xml":
            case "application/xml":
                return "application/xml"
        }
        if (A.subtype.endsWith("+json")) return "application/json";
        if (A.subtype.endsWith("+xml")) return "application/xml";
        return ""
    }
    uRA.exports = {
        dataURLProcessor: cRQ,
        URLSerializer: bRA,
        collectASequenceOfCodePoints: eE1,
        collectASequenceOfCodePointsFast: Ln,
        stringPercentDecode: fRA,
        parseMIMEType: z00,
        collectAnHTTPQuotedString: hRA,
        serializeAMimeType: iRQ,
        removeChars: E00,
        removeHTTPWhitespace: oE1,
        minimizeSupportedMimeType: rRQ,
        HTTP_TOKEN_CODEPOINTS: lQ1,
        isomorphicDecode: gRA
    }
});