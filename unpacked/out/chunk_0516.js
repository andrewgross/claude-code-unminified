/* chunk:516 bytes:[12220471, 12235449) size:14978 source:unpacked-cli.js */
class mw extends m4 {
    _parse(A) {
        if (this._def.coerce) A.data = String(A.data);
        if (this._getType(A) !== E2.string) {
            let D = this._getOrReturnCtx(A);
            return u2(D, {
                code: aA.invalid_type,
                expected: E2.string,
                received: D.parsedType
            }), AQ
        }
        let Q = new xY,
            Z = void 0;
        for (let D of this._def.checks)
            if (D.kind === "min") {
                if (A.data.length < D.value) Z = this._getOrReturnCtx(A, Z), u2(Z, {
                    code: aA.too_small,
                    minimum: D.value,
                    type: "string",
                    inclusive: !0,
                    exact: !1,
                    message: D.message
                }), Q.dirty()
            } else if (D.kind === "max") {
            if (A.data.length > D.value) Z = this._getOrReturnCtx(A, Z), u2(Z, {
                code: aA.too_big,
                maximum: D.value,
                type: "string",
                inclusive: !0,
                exact: !1,
                message: D.message
            }), Q.dirty()
        } else if (D.kind === "length") {
            let G = A.data.length > D.value,
                F = A.data.length < D.value;
            if (G || F) {
                if (Z = this._getOrReturnCtx(A, Z), G) u2(Z, {
                    code: aA.too_big,
                    maximum: D.value,
                    type: "string",
                    inclusive: !0,
                    exact: !0,
                    message: D.message
                });
                else if (F) u2(Z, {
                    code: aA.too_small,
                    minimum: D.value,
                    type: "string",
                    inclusive: !0,
                    exact: !0,
                    message: D.message
                });
                Q.dirty()
            }
        } else if (D.kind === "email") {
            if (!AD4.test(A.data)) Z = this._getOrReturnCtx(A, Z), u2(Z, {
                validation: "email",
                code: aA.invalid_string,
                message: D.message
            }), Q.dirty()
        } else if (D.kind === "emoji") {
            if (!I40) I40 = new RegExp(BD4, "u");
            if (!I40.test(A.data)) Z = this._getOrReturnCtx(A, Z), u2(Z, {
                validation: "emoji",
                code: aA.invalid_string,
                message: D.message
            }), Q.dirty()
        } else if (D.kind === "uuid") {
            if (!rZ4.test(A.data)) Z = this._getOrReturnCtx(A, Z), u2(Z, {
                validation: "uuid",
                code: aA.invalid_string,
                message: D.message
            }), Q.dirty()
        } else if (D.kind === "nanoid") {
            if (!oZ4.test(A.data)) Z = this._getOrReturnCtx(A, Z), u2(Z, {
                validation: "nanoid",
                code: aA.invalid_string,
                message: D.message
            }), Q.dirty()
        } else if (D.kind === "cuid") {
            if (!nZ4.test(A.data)) Z = this._getOrReturnCtx(A, Z), u2(Z, {
                validation: "cuid",
                code: aA.invalid_string,
                message: D.message
            }), Q.dirty()
        } else if (D.kind === "cuid2") {
            if (!aZ4.test(A.data)) Z = this._getOrReturnCtx(A, Z), u2(Z, {
                validation: "cuid2",
                code: aA.invalid_string,
                message: D.message
            }), Q.dirty()
        } else if (D.kind === "ulid") {
            if (!sZ4.test(A.data)) Z = this._getOrReturnCtx(A, Z), u2(Z, {
                validation: "ulid",
                code: aA.invalid_string,
                message: D.message
            }), Q.dirty()
        } else if (D.kind === "url") try {
            new URL(A.data)
        } catch {
            Z = this._getOrReturnCtx(A, Z), u2(Z, {
                validation: "url",
                code: aA.invalid_string,
                message: D.message
            }), Q.dirty()
        } else if (D.kind === "regex") {
            if (D.regex.lastIndex = 0, !D.regex.test(A.data)) Z = this._getOrReturnCtx(A, Z), u2(Z, {
                validation: "regex",
                code: aA.invalid_string,
                message: D.message
            }), Q.dirty()
        } else if (D.kind === "trim") A.data = A.data.trim();
        else if (D.kind === "includes") {
            if (!A.data.includes(D.value, D.position)) Z = this._getOrReturnCtx(A, Z), u2(Z, {
                code: aA.invalid_string,
                validation: {
                    includes: D.value,
                    position: D.position
                },
                message: D.message
            }), Q.dirty()
        } else if (D.kind === "toLowerCase") A.data = A.data.toLowerCase();
        else if (D.kind === "toUpperCase") A.data = A.data.toUpperCase();
        else if (D.kind === "startsWith") {
            if (!A.data.startsWith(D.value)) Z = this._getOrReturnCtx(A, Z), u2(Z, {
                code: aA.invalid_string,
                validation: {
                    startsWith: D.value
                },
                message: D.message
            }), Q.dirty()
        } else if (D.kind === "endsWith") {
            if (!A.data.endsWith(D.value)) Z = this._getOrReturnCtx(A, Z), u2(Z, {
                code: aA.invalid_string,
                validation: {
                    endsWith: D.value
                },
                message: D.message
            }), Q.dirty()
        } else if (D.kind === "datetime") {
            if (!_eA(D).test(A.data)) Z = this._getOrReturnCtx(A, Z), u2(Z, {
                code: aA.invalid_string,
                validation: "datetime",
                message: D.message
            }), Q.dirty()
        } else if (D.kind === "date") {
            if (!YD4.test(A.data)) Z = this._getOrReturnCtx(A, Z), u2(Z, {
                code: aA.invalid_string,
                validation: "date",
                message: D.message
            }), Q.dirty()
        } else if (D.kind === "time") {
            if (!WD4(D).test(A.data)) Z = this._getOrReturnCtx(A, Z), u2(Z, {
                code: aA.invalid_string,
                validation: "time",
                message: D.message
            }), Q.dirty()
        } else if (D.kind === "duration") {
            if (!eZ4.test(A.data)) Z = this._getOrReturnCtx(A, Z), u2(Z, {
                validation: "duration",
                code: aA.invalid_string,
                message: D.message
            }), Q.dirty()
        } else if (D.kind === "ip") {
            if (!JD4(A.data, D.version)) Z = this._getOrReturnCtx(A, Z), u2(Z, {
                validation: "ip",
                code: aA.invalid_string,
                message: D.message
            }), Q.dirty()
        } else if (D.kind === "jwt") {
            if (!XD4(A.data, D.alg)) Z = this._getOrReturnCtx(A, Z), u2(Z, {
                validation: "jwt",
                code: aA.invalid_string,
                message: D.message
            }), Q.dirty()
        } else if (D.kind === "cidr") {
            if (!VD4(A.data, D.version)) Z = this._getOrReturnCtx(A, Z), u2(Z, {
                validation: "cidr",
                code: aA.invalid_string,
                message: D.message
            }), Q.dirty()
        } else if (D.kind === "base64") {
            if (!FD4.test(A.data)) Z = this._getOrReturnCtx(A, Z), u2(Z, {
                validation: "base64",
                code: aA.invalid_string,
                message: D.message
            }), Q.dirty()
        } else if (D.kind === "base64url") {
            if (!ID4.test(A.data)) Z = this._getOrReturnCtx(A, Z), u2(Z, {
                validation: "base64url",
                code: aA.invalid_string,
                message: D.message
            }), Q.dirty()
        } else C6.assertNever(D);
        return {
            status: Q.value,
            value: A.data
        }
    }
    _regex(A, B, Q) {
        return this.refinement((Z) => A.test(Z), {
            validation: B,
            code: aA.invalid_string,
            ...X9.errToObj(Q)
        })
    }
    _addCheck(A) {
        return new mw({
            ...this._def,
            checks: [...this._def.checks, A]
        })
    }
    email(A) {
        return this._addCheck({
            kind: "email",
            ...X9.errToObj(A)
        })
    }
    url(A) {
        return this._addCheck({
            kind: "url",
            ...X9.errToObj(A)
        })
    }
    emoji(A) {
        return this._addCheck({
            kind: "emoji",
            ...X9.errToObj(A)
        })
    }
    uuid(A) {
        return this._addCheck({
            kind: "uuid",
            ...X9.errToObj(A)
        })
    }
    nanoid(A) {
        return this._addCheck({
            kind: "nanoid",
            ...X9.errToObj(A)
        })
    }
    cuid(A) {
        return this._addCheck({
            kind: "cuid",
            ...X9.errToObj(A)
        })
    }
    cuid2(A) {
        return this._addCheck({
            kind: "cuid2",
            ...X9.errToObj(A)
        })
    }
    ulid(A) {
        return this._addCheck({
            kind: "ulid",
            ...X9.errToObj(A)
        })
    }
    base64(A) {
        return this._addCheck({
            kind: "base64",
            ...X9.errToObj(A)
        })
    }
    base64url(A) {
        return this._addCheck({
            kind: "base64url",
            ...X9.errToObj(A)
        })
    }
    jwt(A) {
        return this._addCheck({
            kind: "jwt",
            ...X9.errToObj(A)
        })
    }
    ip(A) {
        return this._addCheck({
            kind: "ip",
            ...X9.errToObj(A)
        })
    }
    cidr(A) {
        return this._addCheck({
            kind: "cidr",
            ...X9.errToObj(A)
        })
    }
    datetime(A) {
        if (typeof A === "string") return this._addCheck({
            kind: "datetime",
            precision: null,
            offset: !1,
            local: !1,
            message: A
        });
        return this._addCheck({
            kind: "datetime",
            precision: typeof A?.precision === "undefined" ? null : A?.precision,
            offset: A?.offset ?? !1,
            local: A?.local ?? !1,
            ...X9.errToObj(A?.message)
        })
    }
    date(A) {
        return this._addCheck({
            kind: "date",
            message: A
        })
    }
    time(A) {
        if (typeof A === "string") return this._addCheck({
            kind: "time",
            precision: null,
            message: A
        });
        return this._addCheck({
            kind: "time",
            precision: typeof A?.precision === "undefined" ? null : A?.precision,
            ...X9.errToObj(A?.message)
        })
    }
    duration(A) {
        return this._addCheck({
            kind: "duration",
            ...X9.errToObj(A)
        })
    }
    regex(A, B) {
        return this._addCheck({
            kind: "regex",
            regex: A,
            ...X9.errToObj(B)
        })
    }
    includes(A, B) {
        return this._addCheck({
            kind: "includes",
            value: A,
            position: B?.position,
            ...X9.errToObj(B?.message)
        })
    }
    startsWith(A, B) {
        return this._addCheck({
            kind: "startsWith",
            value: A,
            ...X9.errToObj(B)
        })
    }
    endsWith(A, B) {
        return this._addCheck({
            kind: "endsWith",
            value: A,
            ...X9.errToObj(B)
        })
    }
    min(A, B) {
        return this._addCheck({
            kind: "min",
            value: A,
            ...X9.errToObj(B)
        })
    }
    max(A, B) {
        return this._addCheck({
            kind: "max",
            value: A,
            ...X9.errToObj(B)
        })
    }
    length(A, B) {
        return this._addCheck({
            kind: "length",
            value: A,
            ...X9.errToObj(B)
        })
    }
    nonempty(A) {
        return this.min(1, X9.errToObj(A))
    }
    trim() {
        return new mw({
            ...this._def,
            checks: [...this._def.checks, {
                kind: "trim"
            }]
        })
    }
    toLowerCase() {
        return new mw({
            ...this._def,
            checks: [...this._def.checks, {
                kind: "toLowerCase"
            }]
        })
    }
    toUpperCase() {
        return new mw({
            ...this._def,
            checks: [...this._def.checks, {
                kind: "toUpperCase"
            }]
        })
    }
    get isDatetime() {
        return !!this._def.checks.find((A) => A.kind === "datetime")
    }
    get isDate() {
        return !!this._def.checks.find((A) => A.kind === "date")
    }
    get isTime() {
        return !!this._def.checks.find((A) => A.kind === "time")
    }
    get isDuration() {
        return !!this._def.checks.find((A) => A.kind === "duration")
    }
    get isEmail() {
        return !!this._def.checks.find((A) => A.kind === "email")
    }
    get isURL() {
        return !!this._def.checks.find((A) => A.kind === "url")
    }
    get isEmoji() {
        return !!this._def.checks.find((A) => A.kind === "emoji")
    }
    get isUUID() {
        return !!this._def.checks.find((A) => A.kind === "uuid")
    }
    get isNANOID() {
        return !!this._def.checks.find((A) => A.kind === "nanoid")
    }
    get isCUID() {
        return !!this._def.checks.find((A) => A.kind === "cuid")
    }
    get isCUID2() {
        return !!this._def.checks.find((A) => A.kind === "cuid2")
    }
    get isULID() {
        return !!this._def.checks.find((A) => A.kind === "ulid")
    }
    get isIP() {
        return !!this._def.checks.find((A) => A.kind === "ip")
    }
    get isCIDR() {
        return !!this._def.checks.find((A) => A.kind === "cidr")
    }
    get isBase64() {
        return !!this._def.checks.find((A) => A.kind === "base64")
    }
    get isBase64url() {
        return !!this._def.checks.find((A) => A.kind === "base64url")
    }
    get minLength() {
        let A = null;
        for (let B of this._def.checks)
            if (B.kind === "min") {
                if (A === null || B.value > A) A = B.value
            } return A
    }
    get maxLength() {
        let A = null;
        for (let B of this._def.checks)
            if (B.kind === "max") {
                if (A === null || B.value < A) A = B.value
            } return A
    }
}
mw.create = (A) => {
    return new mw({
        checks: [],
        typeName: A2.ZodString,
        coerce: A?.coerce ?? !1,
        ...W4(A)
    })
};

function CD4(A, B) {
    let Q = (A.toString().split(".")[1] || "").length,
        Z = (B.toString().split(".")[1] || "").length,
        D = Q > Z ? Q : Z,
        G = Number.parseInt(A.toFixed(D).replace(".", "")),
        F = Number.parseInt(B.toFixed(D).replace(".", ""));
    return G % F / 10 ** D
}