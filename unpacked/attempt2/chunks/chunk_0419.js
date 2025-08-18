/* chunk:419 bytes:[10058372, 10084033) size:25661 source:unpacked-cli.js */
var oU0 = E((Y08, zX) => {
    var b18 = ZUB(),
        oY = cU0(),
        {
            utf8DecodeWithoutBOM: f18
        } = Nx1(),
        {
            percentDecodeString: h18,
            utf8PercentEncodeCodePoint: Rx1,
            utf8PercentEncodeString: Ox1,
            isC0ControlPercentEncode: UUB,
            isFragmentPercentEncode: g18,
            isQueryPercentEncode: u18,
            isSpecialQueryPercentEncode: m18,
            isPathPercentEncode: d18,
            isUserinfoPercentEncode: aU0
        } = Lx1();

    function B2(A) {
        return A.codePointAt(0)
    }
    var wUB = {
            ftp: 21,
            file: null,
            http: 80,
            https: 443,
            ws: 80,
            wss: 443
        },
        A4 = Symbol("failure");

    function KUB(A) {
        return [...A].length
    }

    function HUB(A, B) {
        let Q = A[B];
        return isNaN(Q) ? void 0 : String.fromCodePoint(Q)
    }

    function zUB(A) {
        return A === "." || A.toLowerCase() === "%2e"
    }

    function c18(A) {
        return A = A.toLowerCase(), A === ".." || A === "%2e." || A === ".%2e" || A === "%2e%2e"
    }

    function l18(A, B) {
        return oY.isASCIIAlpha(A) && (B === B2(":") || B === B2("|"))
    }

    function $UB(A) {
        return A.length === 2 && oY.isASCIIAlpha(A.codePointAt(0)) && (A[1] === ":" || A[1] === "|")
    }

    function p18(A) {
        return A.length === 2 && oY.isASCIIAlpha(A.codePointAt(0)) && A[1] === ":"
    }

    function qUB(A) {
        return A.search(/\u0000|\u0009|\u000A|\u000D|\u0020|#|\/|:|<|>|\?|@|\[|\\|\]|\^|\|/u) !== -1
    }

    function i18(A) {
        return qUB(A) || A.search(/[\u0000-\u001F]|%|\u007F/u) !== -1
    }

    function Mx1(A) {
        return wUB[A] !== void 0
    }

    function rY(A) {
        return Mx1(A.scheme)
    }

    function iU0(A) {
        return !Mx1(A.scheme)
    }

    function NUB(A) {
        return wUB[A]
    }

    function LUB(A) {
        if (A === "") return A4;
        let B = 10;
        if (A.length >= 2 && A.charAt(0) === "0" && A.charAt(1).toLowerCase() === "x") A = A.substring(2), B = 16;
        else if (A.length >= 2 && A.charAt(0) === "0") A = A.substring(1), B = 8;
        if (A === "") return 0;
        let Q = /[^0-7]/u;
        if (B === 10) Q = /[^0-9]/u;
        if (B === 16) Q = /[^0-9A-Fa-f]/u;
        if (Q.test(A)) return A4;
        return parseInt(A, B)
    }

    function n18(A) {
        let B = A.split(".");
        if (B[B.length - 1] === "") {
            if (B.length > 1) B.pop()
        }
        if (B.length > 4) return A4;
        let Q = [];
        for (let G of B) {
            let F = LUB(G);
            if (F === A4) return A4;
            Q.push(F)
        }
        for (let G = 0; G < Q.length - 1; ++G)
            if (Q[G] > 255) return A4;
        if (Q[Q.length - 1] >= 256 ** (5 - Q.length)) return A4;
        let Z = Q.pop(),
            D = 0;
        for (let G of Q) Z += G * 256 ** (3 - D), ++D;
        return Z
    }

    function a18(A) {
        let B = "",
            Q = A;
        for (let Z = 1; Z <= 4; ++Z) {
            if (B = String(Q % 256) + B, Z !== 4) B = `.${B}`;
            Q = Math.floor(Q / 256)
        }
        return B
    }

    function s18(A) {
        let B = [0, 0, 0, 0, 0, 0, 0, 0],
            Q = 0,
            Z = null,
            D = 0;
        if (A = Array.from(A, (G) => G.codePointAt(0)), A[D] === B2(":")) {
            if (A[D + 1] !== B2(":")) return A4;
            D += 2, ++Q, Z = Q
        }
        while (D < A.length) {
            if (Q === 8) return A4;
            if (A[D] === B2(":")) {
                if (Z !== null) return A4;
                ++D, ++Q, Z = Q;
                continue
            }
            let G = 0,
                F = 0;
            while (F < 4 && oY.isASCIIHex(A[D])) G = G * 16 + parseInt(HUB(A, D), 16), ++D, ++F;
            if (A[D] === B2(".")) {
                if (F === 0) return A4;
                if (D -= F, Q > 6) return A4;
                let I = 0;
                while (A[D] !== void 0) {
                    let Y = null;
                    if (I > 0)
                        if (A[D] === B2(".") && I < 4) ++D;
                        else return A4;
                    if (!oY.isASCIIDigit(A[D])) return A4;
                    while (oY.isASCIIDigit(A[D])) {
                        let W = parseInt(HUB(A, D));
                        if (Y === null) Y = W;
                        else if (Y === 0) return A4;
                        else Y = Y * 10 + W;
                        if (Y > 255) return A4;
                        ++D
                    }
                    if (B[Q] = B[Q] * 256 + Y, ++I, I === 2 || I === 4) ++Q
                }
                if (I !== 4) return A4;
                break
            } else if (A[D] === B2(":")) {
                if (++D, A[D] === void 0) return A4
            } else if (A[D] !== void 0) return A4;
            B[Q] = G, ++Q
        }
        if (Z !== null) {
            let G = Q - Z;
            Q = 7;
            while (Q !== 0 && G > 0) {
                let F = B[Z + G - 1];
                B[Z + G - 1] = B[Q], B[Q] = F, --Q, --G
            }
        } else if (Z === null && Q !== 8) return A4;
        return B
    }

    function r18(A) {
        let B = "",
            Q = e18(A),
            Z = !1;
        for (let D = 0; D <= 7; ++D) {
            if (Z && A[D] === 0) continue;
            else if (Z) Z = !1;
            if (Q === D) {
                B += D === 0 ? "::" : ":", Z = !0;
                continue
            }
            if (B += A[D].toString(16), D !== 7) B += ":"
        }
        return B
    }

    function nU0(A, B = !1) {
        if (A[0] === "[") {
            if (A[A.length - 1] !== "]") return A4;
            return s18(A.substring(1, A.length - 1))
        }
        if (B) return t18(A);
        let Q = f18(h18(A)),
            Z = A08(Q);
        if (Z === A4) return A4;
        if (o18(Z)) return n18(Z);
        return Z
    }

    function o18(A) {
        let B = A.split(".");
        if (B[B.length - 1] === "") {
            if (B.length === 1) return !1;
            B.pop()
        }
        let Q = B[B.length - 1];
        if (LUB(Q) !== A4) return !0;
        if (/^[0-9]+$/u.test(Q)) return !0;
        return !1
    }

    function t18(A) {
        if (qUB(A)) return A4;
        return Ox1(A, UUB)
    }

    function e18(A) {
        let B = null,
            Q = 1,
            Z = null,
            D = 0;
        for (let G = 0; G < A.length; ++G)
            if (A[G] !== 0) {
                if (D > Q) B = Z, Q = D;
                Z = null, D = 0
            } else {
                if (Z === null) Z = G;
                ++D
            } if (D > Q) return Z;
        return B
    }

    function sU0(A) {
        if (typeof A === "number") return a18(A);
        if (A instanceof Array) return `[${r18(A)}]`;
        return A
    }

    function A08(A, B = !1) {
        let Q = b18.toASCII(A, {
            checkHyphens: B,
            checkBidi: !0,
            checkJoiners: !0,
            useSTD3ASCIIRules: B,
            transitionalProcessing: !1,
            verifyDNSLength: B,
            ignoreInvalidPunycode: !1
        });
        if (Q === null) return A4;
        if (!B) {
            if (Q === "") return A4;
            if (i18(Q)) return A4
        }
        return Q
    }

    function B08(A) {
        let B = 0,
            Q = A.length;
        for (; B < Q; ++B)
            if (A.charCodeAt(B) > 32) break;
        for (; Q > B; --Q)
            if (A.charCodeAt(Q - 1) > 32) break;
        return A.substring(B, Q)
    }

    function Q08(A) {
        return A.replace(/\u0009|\u000A|\u000D/ug, "")
    }

    function MUB(A) {
        let {
            path: B
        } = A;
        if (B.length === 0) return;
        if (A.scheme === "file" && B.length === 1 && D08(B[0])) return;
        B.pop()
    }

    function RUB(A) {
        return A.username !== "" || A.password !== ""
    }

    function Z08(A) {
        return A.host === null || A.host === "" || A.scheme === "file"
    }

    function hD1(A) {
        return typeof A.path === "string"
    }

    function D08(A) {
        return /^[A-Za-z]:$/u.test(A)
    }

    function wD(A, B, Q, Z, D) {
        if (this.pointer = 0, this.input = A, this.base = B || null, this.encodingOverride = Q || "utf-8", this.stateOverride = D, this.url = Z, this.failure = !1, this.parseError = !1, !this.url) {
            this.url = {
                scheme: "",
                username: "",
                password: "",
                host: null,
                port: null,
                path: [],
                query: null,
                fragment: null
            };
            let F = B08(this.input);
            if (F !== this.input) this.parseError = !0;
            this.input = F
        }
        let G = Q08(this.input);
        if (G !== this.input) this.parseError = !0;
        this.input = G, this.state = D || "scheme start", this.buffer = "", this.atFlag = !1, this.arrFlag = !1, this.passwordTokenSeenFlag = !1, this.input = Array.from(this.input, (F) => F.codePointAt(0));
        for (; this.pointer <= this.input.length; ++this.pointer) {
            let F = this.input[this.pointer],
                I = isNaN(F) ? void 0 : String.fromCodePoint(F),
                Y = this[`parse ${this.state}`](F, I);
            if (!Y) break;
            else if (Y === A4) {
                this.failure = !0;
                break
            }
        }
    }
    wD.prototype["parse scheme start"] = function A(B, Q) {
        if (oY.isASCIIAlpha(B)) this.buffer += Q.toLowerCase(), this.state = "scheme";
        else if (!this.stateOverride) this.state = "no scheme", --this.pointer;
        else return this.parseError = !0, A4;
        return !0
    };
    wD.prototype["parse scheme"] = function A(B, Q) {
        if (oY.isASCIIAlphanumeric(B) || B === B2("+") || B === B2("-") || B === B2(".")) this.buffer += Q.toLowerCase();
        else if (B === B2(":")) {
            if (this.stateOverride) {
                if (rY(this.url) && !Mx1(this.buffer)) return !1;
                if (!rY(this.url) && Mx1(this.buffer)) return !1;
                if ((RUB(this.url) || this.url.port !== null) && this.buffer === "file") return !1;
                if (this.url.scheme === "file" && this.url.host === "") return !1
            }
            if (this.url.scheme = this.buffer, this.stateOverride) {
                if (this.url.port === NUB(this.url.scheme)) this.url.port = null;
                return !1
            }
            if (this.buffer = "", this.url.scheme === "file") {
                if (this.input[this.pointer + 1] !== B2("/") || this.input[this.pointer + 2] !== B2("/")) this.parseError = !0;
                this.state = "file"
            } else if (rY(this.url) && this.base !== null && this.base.scheme === this.url.scheme) this.state = "special relative or authority";
            else if (rY(this.url)) this.state = "special authority slashes";
            else if (this.input[this.pointer + 1] === B2("/")) this.state = "path or authority", ++this.pointer;
            else this.url.path = "", this.state = "opaque path"
        } else if (!this.stateOverride) this.buffer = "", this.state = "no scheme", this.pointer = -1;
        else return this.parseError = !0, A4;
        return !0
    };
    wD.prototype["parse no scheme"] = function A(B) {
        if (this.base === null || hD1(this.base) && B !== B2("#")) return A4;
        else if (hD1(this.base) && B === B2("#")) this.url.scheme = this.base.scheme, this.url.path = this.base.path, this.url.query = this.base.query, this.url.fragment = "", this.state = "fragment";
        else if (this.base.scheme === "file") this.state = "file", --this.pointer;
        else this.state = "relative", --this.pointer;
        return !0
    };
    wD.prototype["parse special relative or authority"] = function A(B) {
        if (B === B2("/") && this.input[this.pointer + 1] === B2("/")) this.state = "special authority ignore slashes", ++this.pointer;
        else this.parseError = !0, this.state = "relative", --this.pointer;
        return !0
    };
    wD.prototype["parse path or authority"] = function A(B) {
        if (B === B2("/")) this.state = "authority";
        else this.state = "path", --this.pointer;
        return !0
    };
    wD.prototype["parse relative"] = function A(B) {
        if (this.url.scheme = this.base.scheme, B === B2("/")) this.state = "relative slash";
        else if (rY(this.url) && B === B2("\\")) this.parseError = !0, this.state = "relative slash";
        else if (this.url.username = this.base.username, this.url.password = this.base.password, this.url.host = this.base.host, this.url.port = this.base.port, this.url.path = this.base.path.slice(), this.url.query = this.base.query, B === B2("?")) this.url.query = "", this.state = "query";
        else if (B === B2("#")) this.url.fragment = "", this.state = "fragment";
        else if (!isNaN(B)) this.url.query = null, this.url.path.pop(), this.state = "path", --this.pointer;
        return !0
    };
    wD.prototype["parse relative slash"] = function A(B) {
        if (rY(this.url) && (B === B2("/") || B === B2("\\"))) {
            if (B === B2("\\")) this.parseError = !0;
            this.state = "special authority ignore slashes"
        } else if (B === B2("/")) this.state = "authority";
        else this.url.username = this.base.username, this.url.password = this.base.password, this.url.host = this.base.host, this.url.port = this.base.port, this.state = "path", --this.pointer;
        return !0
    };
    wD.prototype["parse special authority slashes"] = function A(B) {
        if (B === B2("/") && this.input[this.pointer + 1] === B2("/")) this.state = "special authority ignore slashes", ++this.pointer;
        else this.parseError = !0, this.state = "special authority ignore slashes", --this.pointer;
        return !0
    };
    wD.prototype["parse special authority ignore slashes"] = function A(B) {
        if (B !== B2("/") && B !== B2("\\")) this.state = "authority", --this.pointer;
        else this.parseError = !0;
        return !0
    };
    wD.prototype["parse authority"] = function A(B, Q) {
        if (B === B2("@")) {
            if (this.parseError = !0, this.atFlag) this.buffer = `%40${this.buffer}`;
            this.atFlag = !0;
            let Z = KUB(this.buffer);
            for (let D = 0; D < Z; ++D) {
                let G = this.buffer.codePointAt(D);
                if (G === B2(":") && !this.passwordTokenSeenFlag) {
                    this.passwordTokenSeenFlag = !0;
                    continue
                }
                let F = Rx1(G, aU0);
                if (this.passwordTokenSeenFlag) this.url.password += F;
                else this.url.username += F
            }
            this.buffer = ""
        } else if (isNaN(B) || B === B2("/") || B === B2("?") || B === B2("#") || rY(this.url) && B === B2("\\")) {
            if (this.atFlag && this.buffer === "") return this.parseError = !0, A4;
            this.pointer -= KUB(this.buffer) + 1, this.buffer = "", this.state = "host"
        } else this.buffer += Q;
        return !0
    };
    wD.prototype["parse hostname"] = wD.prototype["parse host"] = function A(B, Q) {
        if (this.stateOverride && this.url.scheme === "file") --this.pointer, this.state = "file host";
        else if (B === B2(":") && !this.arrFlag) {
            if (this.buffer === "") return this.parseError = !0, A4;
            if (this.stateOverride === "hostname") return !1;
            let Z = nU0(this.buffer, iU0(this.url));
            if (Z === A4) return A4;
            this.url.host = Z, this.buffer = "", this.state = "port"
        } else if (isNaN(B) || B === B2("/") || B === B2("?") || B === B2("#") || rY(this.url) && B === B2("\\")) {
            if (--this.pointer, rY(this.url) && this.buffer === "") return this.parseError = !0, A4;
            else if (this.stateOverride && this.buffer === "" && (RUB(this.url) || this.url.port !== null)) return this.parseError = !0, !1;
            let Z = nU0(this.buffer, iU0(this.url));
            if (Z === A4) return A4;
            if (this.url.host = Z, this.buffer = "", this.state = "path start", this.stateOverride) return !1
        } else {
            if (B === B2("[")) this.arrFlag = !0;
            else if (B === B2("]")) this.arrFlag = !1;
            this.buffer += Q
        }
        return !0
    };
    wD.prototype["parse port"] = function A(B, Q) {
        if (oY.isASCIIDigit(B)) this.buffer += Q;
        else if (isNaN(B) || B === B2("/") || B === B2("?") || B === B2("#") || rY(this.url) && B === B2("\\") || this.stateOverride) {
            if (this.buffer !== "") {
                let Z = parseInt(this.buffer);
                if (Z > 65535) return this.parseError = !0, A4;
                this.url.port = Z === NUB(this.url.scheme) ? null : Z, this.buffer = ""
            }
            if (this.stateOverride) return !1;
            this.state = "path start", --this.pointer
        } else return this.parseError = !0, A4;
        return !0
    };
    var G08 = new Set([B2("/"), B2("\\"), B2("?"), B2("#")]);

    function OUB(A, B) {
        let Q = A.length - B;
        return Q >= 2 && l18(A[B], A[B + 1]) && (Q === 2 || G08.has(A[B + 2]))
    }
    wD.prototype["parse file"] = function A(B) {
        if (this.url.scheme = "file", this.url.host = "", B === B2("/") || B === B2("\\")) {
            if (B === B2("\\")) this.parseError = !0;
            this.state = "file slash"
        } else if (this.base !== null && this.base.scheme === "file") {
            if (this.url.host = this.base.host, this.url.path = this.base.path.slice(), this.url.query = this.base.query, B === B2("?")) this.url.query = "", this.state = "query";
            else if (B === B2("#")) this.url.fragment = "", this.state = "fragment";
            else if (!isNaN(B)) {
                if (this.url.query = null, !OUB(this.input, this.pointer)) MUB(this.url);
                else this.parseError = !0, this.url.path = [];
                this.state = "path", --this.pointer
            }
        } else this.state = "path", --this.pointer;
        return !0
    };
    wD.prototype["parse file slash"] = function A(B) {
        if (B === B2("/") || B === B2("\\")) {
            if (B === B2("\\")) this.parseError = !0;
            this.state = "file host"
        } else {
            if (this.base !== null && this.base.scheme === "file") {
                if (!OUB(this.input, this.pointer) && p18(this.base.path[0])) this.url.path.push(this.base.path[0]);
                this.url.host = this.base.host
            }
            this.state = "path", --this.pointer
        }
        return !0
    };
    wD.prototype["parse file host"] = function A(B, Q) {
        if (isNaN(B) || B === B2("/") || B === B2("\\") || B === B2("?") || B === B2("#"))
            if (--this.pointer, !this.stateOverride && $UB(this.buffer)) this.parseError = !0, this.state = "path";
            else if (this.buffer === "") {
            if (this.url.host = "", this.stateOverride) return !1;
            this.state = "path start"
        } else {
            let Z = nU0(this.buffer, iU0(this.url));
            if (Z === A4) return A4;
            if (Z === "localhost") Z = "";
            if (this.url.host = Z, this.stateOverride) return !1;
            this.buffer = "", this.state = "path start"
        } else this.buffer += Q;
        return !0
    };
    wD.prototype["parse path start"] = function A(B) {
        if (rY(this.url)) {
            if (B === B2("\\")) this.parseError = !0;
            if (this.state = "path", B !== B2("/") && B !== B2("\\")) --this.pointer
        } else if (!this.stateOverride && B === B2("?")) this.url.query = "", this.state = "query";
        else if (!this.stateOverride && B === B2("#")) this.url.fragment = "", this.state = "fragment";
        else if (B !== void 0) {
            if (this.state = "path", B !== B2("/")) --this.pointer
        } else if (this.stateOverride && this.url.host === null) this.url.path.push("");
        return !0
    };
    wD.prototype["parse path"] = function A(B) {
        if (isNaN(B) || B === B2("/") || rY(this.url) && B === B2("\\") || !this.stateOverride && (B === B2("?") || B === B2("#"))) {
            if (rY(this.url) && B === B2("\\")) this.parseError = !0;
            if (c18(this.buffer)) {
                if (MUB(this.url), B !== B2("/") && !(rY(this.url) && B === B2("\\"))) this.url.path.push("")
            } else if (zUB(this.buffer) && B !== B2("/") && !(rY(this.url) && B === B2("\\"))) this.url.path.push("");
            else if (!zUB(this.buffer)) {
                if (this.url.scheme === "file" && this.url.path.length === 0 && $UB(this.buffer)) this.buffer = `${this.buffer[0]}:`;
                this.url.path.push(this.buffer)
            }
            if (this.buffer = "", B === B2("?")) this.url.query = "", this.state = "query";
            if (B === B2("#")) this.url.fragment = "", this.state = "fragment"
        } else {
            if (B === B2("%") && (!oY.isASCIIHex(this.input[this.pointer + 1]) || !oY.isASCIIHex(this.input[this.pointer + 2]))) this.parseError = !0;
            this.buffer += Rx1(B, d18)
        }
        return !0
    };
    wD.prototype["parse opaque path"] = function A(B) {
        if (B === B2("?")) this.url.query = "", this.state = "query";
        else if (B === B2("#")) this.url.fragment = "", this.state = "fragment";
        else if (B === B2(" ")) {
            let Q = this.input[this.pointer + 1];
            if (Q === B2("?") || Q === B2("#")) this.url.path += "%20";
            else this.url.path += " "
        } else {
            if (!isNaN(B) && B !== B2("%")) this.parseError = !0;
            if (B === B2("%") && (!oY.isASCIIHex(this.input[this.pointer + 1]) || !oY.isASCIIHex(this.input[this.pointer + 2]))) this.parseError = !0;
            if (!isNaN(B)) this.url.path += Rx1(B, UUB)
        }
        return !0
    };
    wD.prototype["parse query"] = function A(B, Q) {
        if (!rY(this.url) || this.url.scheme === "ws" || this.url.scheme === "wss") this.encodingOverride = "utf-8";
        if (!this.stateOverride && B === B2("#") || isNaN(B)) {
            let Z = rY(this.url) ? m18 : u18;
            if (this.url.query += Ox1(this.buffer, Z), this.buffer = "", B === B2("#")) this.url.fragment = "", this.state = "fragment"
        } else if (!isNaN(B)) {
            if (B === B2("%") && (!oY.isASCIIHex(this.input[this.pointer + 1]) || !oY.isASCIIHex(this.input[this.pointer + 2]))) this.parseError = !0;
            this.buffer += Q
        }
        return !0
    };
    wD.prototype["parse fragment"] = function A(B) {
        if (!isNaN(B)) {
            if (B === B2("%") && (!oY.isASCIIHex(this.input[this.pointer + 1]) || !oY.isASCIIHex(this.input[this.pointer + 2]))) this.parseError = !0;
            this.url.fragment += Rx1(B, g18)
        }
        return !0
    };

    function F08(A, B) {
        let Q = `${A.scheme}:`;
        if (A.host !== null) {
            if (Q += "//", A.username !== "" || A.password !== "") {
                if (Q += A.username, A.password !== "") Q += `:${A.password}`;
                Q += "@"
            }
            if (Q += sU0(A.host), A.port !== null) Q += `:${A.port}`
        }
        if (A.host === null && !hD1(A) && A.path.length > 1 && A.path[0] === "") Q += "/.";
        if (Q += rU0(A), A.query !== null) Q += `?${A.query}`;
        if (!B && A.fragment !== null) Q += `#${A.fragment}`;
        return Q
    }

    function I08(A) {
        let B = `${A.scheme}://`;
        if (B += sU0(A.host), A.port !== null) B += `:${A.port}`;
        return B
    }

    function rU0(A) {
        if (hD1(A)) return A.path;
        let B = "";
        for (let Q of A.path) B += `/${Q}`;
        return B
    }
    Y08.serializeURL = F08;
    Y08.serializePath = rU0;
    Y08.serializeURLOrigin = function(A) {
        switch (A.scheme) {
            case "blob": {
                let B = Y08.parseURL(rU0(A));
                if (B === null) return "null";
                if (B.scheme !== "http" && B.scheme !== "https") return "null";
                return Y08.serializeURLOrigin(B)
            }
            case "ftp":
            case "http":
            case "https":
            case "ws":
            case "wss":
                return I08({
                    scheme: A.scheme,
                    host: A.host,
                    port: A.port
                });
            case "file":
                return "null";
            default:
                return "null"
        }
    };
    Y08.basicURLParse = function(A, B) {
        if (B === void 0) B = {};
        let Q = new wD(A, B.baseURL, B.encodingOverride, B.url, B.stateOverride);
        if (Q.failure) return null;
        return Q.url
    };
    Y08.setTheUsername = function(A, B) {
        A.username = Ox1(B, aU0)
    };
    Y08.setThePassword = function(A, B) {
        A.password = Ox1(B, aU0)
    };
    Y08.serializeHost = sU0;
    Y08.cannotHaveAUsernamePasswordPort = Z08;
    Y08.hasAnOpaquePath = hD1;
    Y08.serializeInteger = function(A) {
        return String(A)
    };
    Y08.parseURL = function(A, B) {
        if (B === void 0) B = {};
        return Y08.basicURLParse(A, {
            baseURL: B.baseURL,
            encodingOverride: B.encodingOverride
        })
    }
});