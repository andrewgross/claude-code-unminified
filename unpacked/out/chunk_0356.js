/* chunk:356 bytes:[8382538, 8388458) size:5920 source:unpacked-cli.js */
var vBB = E((Ks5, xBB) => {
    var IM6 = W1("os"),
        _BB = W1("tty"),
        yE = uB1(),
        {
            env: LI
        } = process,
        Lx;
    if (yE("no-color") || yE("no-colors") || yE("color=false") || yE("color=never")) Lx = 0;
    else if (yE("color") || yE("colors") || yE("color=true") || yE("color=always")) Lx = 1;
    if ("FORCE_COLOR" in LI)
        if (LI.FORCE_COLOR === "true") Lx = 1;
        else if (LI.FORCE_COLOR === "false") Lx = 0;
    else Lx = LI.FORCE_COLOR.length === 0 ? 1 : Math.min(parseInt(LI.FORCE_COLOR, 10), 3);

    function FC0(A) {
        if (A === 0) return !1;
        return {
            level: A,
            hasBasic: !0,
            has256: A >= 2,
            has16m: A >= 3
        }
    }

    function IC0(A, B) {
        if (Lx === 0) return 0;
        if (yE("color=16m") || yE("color=full") || yE("color=truecolor")) return 3;
        if (yE("color=256")) return 2;
        if (A && !B && Lx === void 0) return 0;
        let Q = Lx || 0;
        if (LI.TERM === "dumb") return Q;
        if (process.platform === "win32") {
            let Z = IM6.release().split(".");
            if (Number(Z[0]) >= 10 && Number(Z[2]) >= 10586) return Number(Z[2]) >= 14931 ? 3 : 2;
            return 1
        }
        if ("CI" in LI) {
            if (["TRAVIS", "CIRCLECI", "APPVEYOR", "GITLAB_CI", "GITHUB_ACTIONS", "BUILDKITE"].some((Z) => (Z in LI)) || LI.CI_NAME === "codeship") return 1;
            return Q
        }
        if ("TEAMCITY_VERSION" in LI) return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(LI.TEAMCITY_VERSION) ? 1 : 0;
        if (LI.COLORTERM === "truecolor") return 3;
        if ("TERM_PROGRAM" in LI) {
            let Z = parseInt((LI.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
            switch (LI.TERM_PROGRAM) {
                case "iTerm.app":
                    return Z >= 3 ? 3 : 2;
                case "Apple_Terminal":
                    return 2
            }
        }
        if (/-256(color)?$/i.test(LI.TERM)) return 2;
        if (/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(LI.TERM)) return 1;
        if ("COLORTERM" in LI) return 1;
        return Q
    }

    function YM6(A) {
        let B = IC0(A, A && A.isTTY);
        return FC0(B)
    }
    xBB.exports = {
        supportsColor: YM6,
        stdout: FC0(IC0(!0, _BB.isatty(1))),
        stderr: FC0(IC0(!0, _BB.isatty(2)))
    }
});
var hBB = E((Hs5, fBB) => {
    var WM6 = vBB(),
        Qe = uB1();

    function bBB(A) {
        if (/^\d{3,4}$/.test(A)) {
            let Q = /(\d{1,2})(\d{2})/.exec(A);
            return {
                major: 0,
                minor: parseInt(Q[1], 10),
                patch: parseInt(Q[2], 10)
            }
        }
        let B = (A || "").split(".").map((Q) => parseInt(Q, 10));
        return {
            major: B[0],
            minor: B[1],
            patch: B[2]
        }
    }

    function YC0(A) {
        let {
            env: B
        } = process;
        if ("FORCE_HYPERLINK" in B) return !(B.FORCE_HYPERLINK.length > 0 && parseInt(B.FORCE_HYPERLINK, 10) === 0);
        if (Qe("no-hyperlink") || Qe("no-hyperlinks") || Qe("hyperlink=false") || Qe("hyperlink=never")) return !1;
        if (Qe("hyperlink=true") || Qe("hyperlink=always")) return !0;
        if ("NETLIFY" in B) return !0;
        if (!WM6.supportsColor(A)) return !1;
        if (A && !A.isTTY) return !1;
        if (process.platform === "win32") return !1;
        if ("CI" in B) return !1;
        if ("TEAMCITY_VERSION" in B) return !1;
        if ("TERM_PROGRAM" in B) {
            let Q = bBB(B.TERM_PROGRAM_VERSION);
            switch (B.TERM_PROGRAM) {
                case "iTerm.app":
                    if (Q.major === 3) return Q.minor >= 1;
                    return Q.major > 3;
                case "WezTerm":
                    return Q.major >= 20200620;
                case "vscode":
                    return Q.major > 1 || Q.major === 1 && Q.minor >= 72
            }
        }
        if ("VTE_VERSION" in B) {
            if (B.VTE_VERSION === "0.50.0") return !1;
            let Q = bBB(B.VTE_VERSION);
            return Q.major > 0 || Q.minor >= 50
        }
        return !1
    }
    fBB.exports = {
        supportsHyperlink: YC0,
        stdout: YC0(process.stdout),
        stderr: YC0(process.stderr)
    }
});
var f71 = E((CM6) => {
    function XM6(A, B, Q) {
        if (Q === void 0) Q = Array.prototype;
        if (A && typeof Q.find === "function") return Q.find.call(A, B);
        for (var Z = 0; Z < A.length; Z++)
            if (Object.prototype.hasOwnProperty.call(A, Z)) {
                var D = A[Z];
                if (B.call(void 0, D, Z, A)) return D
            }
    }

    function JC0(A, B) {
        if (B === void 0) B = Object;
        return B && typeof B.freeze === "function" ? B.freeze(A) : A
    }

    function VM6(A, B) {
        if (A === null || typeof A !== "object") throw new TypeError("target is not an object");
        for (var Q in B)
            if (Object.prototype.hasOwnProperty.call(B, Q)) A[Q] = B[Q];
        return A
    }
    var dBB = JC0({
            HTML: "text/html",
            isHTML: function(A) {
                return A === dBB.HTML
            },
            XML_APPLICATION: "application/xml",
            XML_TEXT: "text/xml",
            XML_XHTML_APPLICATION: "application/xhtml+xml",
            XML_SVG_IMAGE: "image/svg+xml"
        }),
        cBB = JC0({
            HTML: "http://www.w3.org/1999/xhtml",
            isHTML: function(A) {
                return A === cBB.HTML
            },
            SVG: "http://www.w3.org/2000/svg",
            XML: "http://www.w3.org/XML/1998/namespace",
            XMLNS: "http://www.w3.org/2000/xmlns/"
        });
    CM6.assign = VM6;
    CM6.find = XM6;
    CM6.freeze = JC0;
    CM6.MIME_TYPE = dBB;
    CM6.NAMESPACE = cBB
});