/* chunk:369 bytes:[8642997, 8657781) size:14784 source:unpacked-cli.js */
var pC0 = E((dr5, K6B) => {
    var mO6 = xE(),
        dO6 = (A, B, Q) => mO6(A, B, Q) !== 0;
    K6B.exports = dO6
});
var AZ1 = E((cr5, H6B) => {
    var cO6 = xE(),
        lO6 = (A, B, Q) => cO6(A, B, Q) > 0;
    H6B.exports = lO6
});
var $j1 = E((lr5, z6B) => {
    var pO6 = xE(),
        iO6 = (A, B, Q) => pO6(A, B, Q) < 0;
    z6B.exports = iO6
});
var qj1 = E((pr5, E6B) => {
    var nO6 = xE(),
        aO6 = (A, B, Q) => nO6(A, B, Q) <= 0;
    E6B.exports = aO6
});
var iC0 = E((ir5, U6B) => {
    var sO6 = lC0(),
        rO6 = pC0(),
        oO6 = AZ1(),
        tO6 = e71(),
        eO6 = $j1(),
        AT6 = qj1(),
        BT6 = (A, B, Q, Z) => {
            switch (B) {
                case "===":
                    if (typeof A === "object") A = A.version;
                    if (typeof Q === "object") Q = Q.version;
                    return A === Q;
                case "!==":
                    if (typeof A === "object") A = A.version;
                    if (typeof Q === "object") Q = Q.version;
                    return A !== Q;
                case "":
                case "=":
                case "==":
                    return sO6(A, Q, Z);
                case "!=":
                    return rO6(A, Q, Z);
                case ">":
                    return oO6(A, Q, Z);
                case ">=":
                    return tO6(A, Q, Z);
                case "<":
                    return eO6(A, Q, Z);
                case "<=":
                    return AT6(A, Q, Z);
                default:
                    throw new TypeError(`Invalid operator: ${B}`)
            }
        };
    U6B.exports = BT6
});
var QZ1 = E((nr5, M6B) => {
    var BZ1 = Symbol("SemVer ANY");
    class Nj1 {
        static get ANY() {
            return BZ1
        }
        constructor(A, B) {
            if (B = w6B(B), A instanceof Nj1)
                if (A.loose === !!B.loose) return A;
                else A = A.value;
            if (A = A.trim().split(/\s+/).join(" "), aC0("comparator", A, B), this.options = B, this.loose = !!B.loose, this.parse(A), this.semver === BZ1) this.value = "";
            else this.value = this.operator + this.semver.version;
            aC0("comp", this)
        }
        parse(A) {
            let B = this.options.loose ? $6B[q6B.COMPARATORLOOSE] : $6B[q6B.COMPARATOR],
                Q = A.match(B);
            if (!Q) throw new TypeError(`Invalid comparator: ${A}`);
            if (this.operator = Q[1] !== void 0 ? Q[1] : "", this.operator === "=") this.operator = "";
            if (!Q[2]) this.semver = BZ1;
            else this.semver = new N6B(Q[2], this.options.loose)
        }
        toString() {
            return this.value
        }
        test(A) {
            if (aC0("Comparator.test", A, this.options.loose), this.semver === BZ1 || A === BZ1) return !0;
            if (typeof A === "string") try {
                A = new N6B(A, this.options)
            } catch (B) {
                return !1
            }
            return nC0(A, this.operator, this.semver, this.options)
        }
        intersects(A, B) {
            if (!(A instanceof Nj1)) throw new TypeError("a Comparator is required");
            if (this.operator === "") {
                if (this.value === "") return !0;
                return new L6B(A.value, B).test(this.value)
            } else if (A.operator === "") {
                if (A.value === "") return !0;
                return new L6B(this.value, B).test(A.semver)
            }
            if (B = w6B(B), B.includePrerelease && (this.value === "<0.0.0-0" || A.value === "<0.0.0-0")) return !1;
            if (!B.includePrerelease && (this.value.startsWith("<0.0.0") || A.value.startsWith("<0.0.0"))) return !1;
            if (this.operator.startsWith(">") && A.operator.startsWith(">")) return !0;
            if (this.operator.startsWith("<") && A.operator.startsWith("<")) return !0;
            if (this.semver.version === A.semver.version && this.operator.includes("=") && A.operator.includes("=")) return !0;
            if (nC0(this.semver, "<", A.semver, B) && this.operator.startsWith(">") && A.operator.startsWith("<")) return !0;
            if (nC0(this.semver, ">", A.semver, B) && this.operator.startsWith("<") && A.operator.startsWith(">")) return !0;
            return !1
        }
    }
    M6B.exports = Nj1;
    var w6B = Kj1(),
        {
            safeRe: $6B,
            t: q6B
        } = Ke(),
        nC0 = iC0(),
        aC0 = o71(),
        N6B = JJ(),
        L6B = vE()
});
var vE = E((ar5, P6B) => {
    var QT6 = /\s+/g;
    class ZZ1 {
        constructor(A, B) {
            if (B = DT6(B), A instanceof ZZ1)
                if (A.loose === !!B.loose && A.includePrerelease === !!B.includePrerelease) return A;
                else return new ZZ1(A.raw, B);
            if (A instanceof sC0) return this.raw = A.value, this.set = [
                [A]
            ], this.formatted = void 0, this;
            if (this.options = B, this.loose = !!B.loose, this.includePrerelease = !!B.includePrerelease, this.raw = A.trim().replace(QT6, " "), this.set = this.raw.split("||").map((Q) => this.parseRange(Q.trim())).filter((Q) => Q.length), !this.set.length) throw new TypeError(`Invalid SemVer Range: ${this.raw}`);
            if (this.set.length > 1) {
                let Q = this.set[0];
                if (this.set = this.set.filter((Z) => !O6B(Z[0])), this.set.length === 0) this.set = [Q];
                else if (this.set.length > 1) {
                    for (let Z of this.set)
                        if (Z.length === 1 && XT6(Z[0])) {
                            this.set = [Z];
                            break
                        }
                }
            }
            this.formatted = void 0
        }
        get range() {
            if (this.formatted === void 0) {
                this.formatted = "";
                for (let A = 0; A < this.set.length; A++) {
                    if (A > 0) this.formatted += "||";
                    let B = this.set[A];
                    for (let Q = 0; Q < B.length; Q++) {
                        if (Q > 0) this.formatted += " ";
                        this.formatted += B[Q].toString().trim()
                    }
                }
            }
            return this.formatted
        }
        format() {
            return this.range
        }
        toString() {
            return this.range
        }
        parseRange(A) {
            let Q = ((this.options.includePrerelease && WT6) | (this.options.loose && JT6)) + ":" + A,
                Z = R6B.get(Q);
            if (Z) return Z;
            let D = this.options.loose,
                G = D ? aV[IX.HYPHENRANGELOOSE] : aV[IX.HYPHENRANGE];
            A = A.replace(G, qT6(this.options.includePrerelease)), j7("hyphen replace", A), A = A.replace(aV[IX.COMPARATORTRIM], FT6), j7("comparator trim", A), A = A.replace(aV[IX.TILDETRIM], IT6), j7("tilde trim", A), A = A.replace(aV[IX.CARETTRIM], YT6), j7("caret trim", A);
            let F = A.split(" ").map((J) => VT6(J, this.options)).join(" ").split(/\s+/).map((J) => $T6(J, this.options));
            if (D) F = F.filter((J) => {
                return j7("loose invalid filter", J, this.options), !!J.match(aV[IX.COMPARATORLOOSE])
            });
            j7("range list", F);
            let I = new Map,
                Y = F.map((J) => new sC0(J, this.options));
            for (let J of Y) {
                if (O6B(J)) return [J];
                I.set(J.value, J)
            }
            if (I.size > 1 && I.has("")) I.delete("");
            let W = [...I.values()];
            return R6B.set(Q, W), W
        }
        intersects(A, B) {
            if (!(A instanceof ZZ1)) throw new TypeError("a Range is required");
            return this.set.some((Q) => {
                return T6B(Q, B) && A.set.some((Z) => {
                    return T6B(Z, B) && Q.every((D) => {
                        return Z.every((G) => {
                            return D.intersects(G, B)
                        })
                    })
                })
            })
        }
        test(A) {
            if (!A) return !1;
            if (typeof A === "string") try {
                A = new GT6(A, this.options)
            } catch (B) {
                return !1
            }
            for (let B = 0; B < this.set.length; B++)
                if (NT6(this.set[B], A, this.options)) return !0;
            return !1
        }
    }
    P6B.exports = ZZ1;
    var ZT6 = V6B(),
        R6B = new ZT6,
        DT6 = Kj1(),
        sC0 = QZ1(),
        j7 = o71(),
        GT6 = JJ(),
        {
            safeRe: aV,
            t: IX,
            comparatorTrimReplace: FT6,
            tildeTrimReplace: IT6,
            caretTrimReplace: YT6
        } = Ke(),
        {
            FLAG_INCLUDE_PRERELEASE: WT6,
            FLAG_LOOSE: JT6
        } = t71(),
        O6B = (A) => A.value === "<0.0.0-0",
        XT6 = (A) => A.value === "",
        T6B = (A, B) => {
            let Q = !0,
                Z = A.slice(),
                D = Z.pop();
            while (Q && Z.length) Q = Z.every((G) => {
                return D.intersects(G, B)
            }), D = Z.pop();
            return Q
        },
        VT6 = (A, B) => {
            return j7("comp", A, B), A = HT6(A, B), j7("caret", A), A = CT6(A, B), j7("tildes", A), A = ET6(A, B), j7("xrange", A), A = wT6(A, B), j7("stars", A), A
        },
        YX = (A) => !A || A.toLowerCase() === "x" || A === "*",
        CT6 = (A, B) => {
            return A.trim().split(/\s+/).map((Q) => KT6(Q, B)).join(" ")
        },
        KT6 = (A, B) => {
            let Q = B.loose ? aV[IX.TILDELOOSE] : aV[IX.TILDE];
            return A.replace(Q, (Z, D, G, F, I) => {
                j7("tilde", A, Z, D, G, F, I);
                let Y;
                if (YX(D)) Y = "";
                else if (YX(G)) Y = `>=${D}.0.0 <${+D+1}.0.0-0`;
                else if (YX(F)) Y = `>=${D}.${G}.0 <${D}.${+G+1}.0-0`;
                else if (I) j7("replaceTilde pr", I), Y = `>=${D}.${G}.${F}-${I} <${D}.${+G+1}.0-0`;
                else Y = `>=${D}.${G}.${F} <${D}.${+G+1}.0-0`;
                return j7("tilde return", Y), Y
            })
        },
        HT6 = (A, B) => {
            return A.trim().split(/\s+/).map((Q) => zT6(Q, B)).join(" ")
        },
        zT6 = (A, B) => {
            j7("caret", A, B);
            let Q = B.loose ? aV[IX.CARETLOOSE] : aV[IX.CARET],
                Z = B.includePrerelease ? "-0" : "";
            return A.replace(Q, (D, G, F, I, Y) => {
                j7("caret", A, D, G, F, I, Y);
                let W;
                if (YX(G)) W = "";
                else if (YX(F)) W = `>=${G}.0.0${Z} <${+G+1}.0.0-0`;
                else if (YX(I))
                    if (G === "0") W = `>=${G}.${F}.0${Z} <${G}.${+F+1}.0-0`;
                    else W = `>=${G}.${F}.0${Z} <${+G+1}.0.0-0`;
                else if (Y)
                    if (j7("replaceCaret pr", Y), G === "0")
                        if (F === "0") W = `>=${G}.${F}.${I}-${Y} <${G}.${F}.${+I+1}-0`;
                        else W = `>=${G}.${F}.${I}-${Y} <${G}.${+F+1}.0-0`;
                else W = `>=${G}.${F}.${I}-${Y} <${+G+1}.0.0-0`;
                else if (j7("no pr"), G === "0")
                    if (F === "0") W = `>=${G}.${F}.${I}${Z} <${G}.${F}.${+I+1}-0`;
                    else W = `>=${G}.${F}.${I}${Z} <${G}.${+F+1}.0-0`;
                else W = `>=${G}.${F}.${I} <${+G+1}.0.0-0`;
                return j7("caret return", W), W
            })
        },
        ET6 = (A, B) => {
            return j7("replaceXRanges", A, B), A.split(/\s+/).map((Q) => UT6(Q, B)).join(" ")
        },
        UT6 = (A, B) => {
            A = A.trim();
            let Q = B.loose ? aV[IX.XRANGELOOSE] : aV[IX.XRANGE];
            return A.replace(Q, (Z, D, G, F, I, Y) => {
                j7("xRange", A, Z, D, G, F, I, Y);
                let W = YX(G),
                    J = W || YX(F),
                    X = J || YX(I),
                    V = X;
                if (D === "=" && V) D = "";
                if (Y = B.includePrerelease ? "-0" : "", W)
                    if (D === ">" || D === "<") Z = "<0.0.0-0";
                    else Z = "*";
                else if (D && V) {
                    if (J) F = 0;
                    if (I = 0, D === ">")
                        if (D = ">=", J) G = +G + 1, F = 0, I = 0;
                        else F = +F + 1, I = 0;
                    else if (D === "<=")
                        if (D = "<", J) G = +G + 1;
                        else F = +F + 1;
                    if (D === "<") Y = "-0";
                    Z = `${D+G}.${F}.${I}${Y}`
                } else if (J) Z = `>=${G}.0.0${Y} <${+G+1}.0.0-0`;
                else if (X) Z = `>=${G}.${F}.0${Y} <${G}.${+F+1}.0-0`;
                return j7("xRange return", Z), Z
            })
        },
        wT6 = (A, B) => {
            return j7("replaceStars", A, B), A.trim().replace(aV[IX.STAR], "")
        },
        $T6 = (A, B) => {
            return j7("replaceGTE0", A, B), A.trim().replace(aV[B.includePrerelease ? IX.GTE0PRE : IX.GTE0], "")
        },
        qT6 = (A) => (B, Q, Z, D, G, F, I, Y, W, J, X, V) => {
            if (YX(Z)) Q = "";
            else if (YX(D)) Q = `>=${Z}.0.0${A?"-0":""}`;
            else if (YX(G)) Q = `>=${Z}.${D}.0${A?"-0":""}`;
            else if (F) Q = `>=${Q}`;
            else Q = `>=${Q}${A?"-0":""}`;
            if (YX(W)) Y = "";
            else if (YX(J)) Y = `<${+W+1}.0.0-0`;
            else if (YX(X)) Y = `<${W}.${+J+1}.0-0`;
            else if (V) Y = `<=${W}.${J}.${X}-${V}`;
            else if (A) Y = `<${W}.${J}.${+X+1}-0`;
            else Y = `<=${Y}`;
            return `${Q} ${Y}`.trim()
        },
        NT6 = (A, B, Q) => {
            for (let Z = 0; Z < A.length; Z++)
                if (!A[Z].test(B)) return !1;
            if (B.prerelease.length && !Q.includePrerelease) {
                for (let Z = 0; Z < A.length; Z++) {
                    if (j7(A[Z].semver), A[Z].semver === sC0.ANY) continue;
                    if (A[Z].semver.prerelease.length > 0) {
                        let D = A[Z].semver;
                        if (D.major === B.major && D.minor === B.minor && D.patch === B.patch) return !0
                    }
                }
                return !1
            }
            return !0
        }
});
var ze = E((sr5, S6B) => {
    var LT6 = vE(),
        MT6 = (A, B, Q) => {
            try {
                B = new LT6(B, Q)
            } catch (Z) {
                return !1
            }
            return B.test(A)
        };
    S6B.exports = MT6
});