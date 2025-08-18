/* chunk:517 bytes:[12235450, 12254100) size:18650 source:unpacked-cli.js */
class ay extends m4 {
    constructor() {
        super(...arguments);
        this.min = this.gte, this.max = this.lte, this.step = this.multipleOf
    }
    _parse(A) {
        if (this._def.coerce) A.data = Number(A.data);
        if (this._getType(A) !== E2.number) {
            let D = this._getOrReturnCtx(A);
            return u2(D, {
                code: aA.invalid_type,
                expected: E2.number,
                received: D.parsedType
            }), AQ
        }
        let Q = void 0,
            Z = new xY;
        for (let D of this._def.checks)
            if (D.kind === "int") {
                if (!C6.isInteger(A.data)) Q = this._getOrReturnCtx(A, Q), u2(Q, {
                    code: aA.invalid_type,
                    expected: "integer",
                    received: "float",
                    message: D.message
                }), Z.dirty()
            } else if (D.kind === "min") {
            if (D.inclusive ? A.data < D.value : A.data <= D.value) Q = this._getOrReturnCtx(A, Q), u2(Q, {
                code: aA.too_small,
                minimum: D.value,
                type: "number",
                inclusive: D.inclusive,
                exact: !1,
                message: D.message
            }), Z.dirty()
        } else if (D.kind === "max") {
            if (D.inclusive ? A.data > D.value : A.data >= D.value) Q = this._getOrReturnCtx(A, Q), u2(Q, {
                code: aA.too_big,
                maximum: D.value,
                type: "number",
                inclusive: D.inclusive,
                exact: !1,
                message: D.message
            }), Z.dirty()
        } else if (D.kind === "multipleOf") {
            if (CD4(A.data, D.value) !== 0) Q = this._getOrReturnCtx(A, Q), u2(Q, {
                code: aA.not_multiple_of,
                multipleOf: D.value,
                message: D.message
            }), Z.dirty()
        } else if (D.kind === "finite") {
            if (!Number.isFinite(A.data)) Q = this._getOrReturnCtx(A, Q), u2(Q, {
                code: aA.not_finite,
                message: D.message
            }), Z.dirty()
        } else C6.assertNever(D);
        return {
            status: Z.value,
            value: A.data
        }
    }
    gte(A, B) {
        return this.setLimit("min", A, !0, X9.toString(B))
    }
    gt(A, B) {
        return this.setLimit("min", A, !1, X9.toString(B))
    }
    lte(A, B) {
        return this.setLimit("max", A, !0, X9.toString(B))
    }
    lt(A, B) {
        return this.setLimit("max", A, !1, X9.toString(B))
    }
    setLimit(A, B, Q, Z) {
        return new ay({
            ...this._def,
            checks: [...this._def.checks, {
                kind: A,
                value: B,
                inclusive: Q,
                message: X9.toString(Z)
            }]
        })
    }
    _addCheck(A) {
        return new ay({
            ...this._def,
            checks: [...this._def.checks, A]
        })
    }
    int(A) {
        return this._addCheck({
            kind: "int",
            message: X9.toString(A)
        })
    }
    positive(A) {
        return this._addCheck({
            kind: "min",
            value: 0,
            inclusive: !1,
            message: X9.toString(A)
        })
    }
    negative(A) {
        return this._addCheck({
            kind: "max",
            value: 0,
            inclusive: !1,
            message: X9.toString(A)
        })
    }
    nonpositive(A) {
        return this._addCheck({
            kind: "max",
            value: 0,
            inclusive: !0,
            message: X9.toString(A)
        })
    }
    nonnegative(A) {
        return this._addCheck({
            kind: "min",
            value: 0,
            inclusive: !0,
            message: X9.toString(A)
        })
    }
    multipleOf(A, B) {
        return this._addCheck({
            kind: "multipleOf",
            value: A,
            message: X9.toString(B)
        })
    }
    finite(A) {
        return this._addCheck({
            kind: "finite",
            message: X9.toString(A)
        })
    }
    safe(A) {
        return this._addCheck({
            kind: "min",
            inclusive: !0,
            value: Number.MIN_SAFE_INTEGER,
            message: X9.toString(A)
        })._addCheck({
            kind: "max",
            inclusive: !0,
            value: Number.MAX_SAFE_INTEGER,
            message: X9.toString(A)
        })
    }
    get minValue() {
        let A = null;
        for (let B of this._def.checks)
            if (B.kind === "min") {
                if (A === null || B.value > A) A = B.value
            } return A
    }
    get maxValue() {
        let A = null;
        for (let B of this._def.checks)
            if (B.kind === "max") {
                if (A === null || B.value < A) A = B.value
            } return A
    }
    get isInt() {
        return !!this._def.checks.find((A) => A.kind === "int" || A.kind === "multipleOf" && C6.isInteger(A.value))
    }
    get isFinite() {
        let A = null,
            B = null;
        for (let Q of this._def.checks)
            if (Q.kind === "finite" || Q.kind === "int" || Q.kind === "multipleOf") return !0;
            else if (Q.kind === "min") {
            if (B === null || Q.value > B) B = Q.value
        } else if (Q.kind === "max") {
            if (A === null || Q.value < A) A = Q.value
        }
        return Number.isFinite(B) && Number.isFinite(A)
    }
}
ay.create = (A) => {
    return new ay({
        checks: [],
        typeName: A2.ZodNumber,
        coerce: A?.coerce || !1,
        ...W4(A)
    })
};
class sy extends m4 {
    constructor() {
        super(...arguments);
        this.min = this.gte, this.max = this.lte
    }
    _parse(A) {
        if (this._def.coerce) try {
            A.data = BigInt(A.data)
        } catch {
            return this._getInvalidInput(A)
        }
        if (this._getType(A) !== E2.bigint) return this._getInvalidInput(A);
        let Q = void 0,
            Z = new xY;
        for (let D of this._def.checks)
            if (D.kind === "min") {
                if (D.inclusive ? A.data < D.value : A.data <= D.value) Q = this._getOrReturnCtx(A, Q), u2(Q, {
                    code: aA.too_small,
                    type: "bigint",
                    minimum: D.value,
                    inclusive: D.inclusive,
                    message: D.message
                }), Z.dirty()
            } else if (D.kind === "max") {
            if (D.inclusive ? A.data > D.value : A.data >= D.value) Q = this._getOrReturnCtx(A, Q), u2(Q, {
                code: aA.too_big,
                type: "bigint",
                maximum: D.value,
                inclusive: D.inclusive,
                message: D.message
            }), Z.dirty()
        } else if (D.kind === "multipleOf") {
            if (A.data % D.value !== BigInt(0)) Q = this._getOrReturnCtx(A, Q), u2(Q, {
                code: aA.not_multiple_of,
                multipleOf: D.value,
                message: D.message
            }), Z.dirty()
        } else C6.assertNever(D);
        return {
            status: Z.value,
            value: A.data
        }
    }
    _getInvalidInput(A) {
        let B = this._getOrReturnCtx(A);
        return u2(B, {
            code: aA.invalid_type,
            expected: E2.bigint,
            received: B.parsedType
        }), AQ
    }
    gte(A, B) {
        return this.setLimit("min", A, !0, X9.toString(B))
    }
    gt(A, B) {
        return this.setLimit("min", A, !1, X9.toString(B))
    }
    lte(A, B) {
        return this.setLimit("max", A, !0, X9.toString(B))
    }
    lt(A, B) {
        return this.setLimit("max", A, !1, X9.toString(B))
    }
    setLimit(A, B, Q, Z) {
        return new sy({
            ...this._def,
            checks: [...this._def.checks, {
                kind: A,
                value: B,
                inclusive: Q,
                message: X9.toString(Z)
            }]
        })
    }
    _addCheck(A) {
        return new sy({
            ...this._def,
            checks: [...this._def.checks, A]
        })
    }
    positive(A) {
        return this._addCheck({
            kind: "min",
            value: BigInt(0),
            inclusive: !1,
            message: X9.toString(A)
        })
    }
    negative(A) {
        return this._addCheck({
            kind: "max",
            value: BigInt(0),
            inclusive: !1,
            message: X9.toString(A)
        })
    }
    nonpositive(A) {
        return this._addCheck({
            kind: "max",
            value: BigInt(0),
            inclusive: !0,
            message: X9.toString(A)
        })
    }
    nonnegative(A) {
        return this._addCheck({
            kind: "min",
            value: BigInt(0),
            inclusive: !0,
            message: X9.toString(A)
        })
    }
    multipleOf(A, B) {
        return this._addCheck({
            kind: "multipleOf",
            value: A,
            message: X9.toString(B)
        })
    }
    get minValue() {
        let A = null;
        for (let B of this._def.checks)
            if (B.kind === "min") {
                if (A === null || B.value > A) A = B.value
            } return A
    }
    get maxValue() {
        let A = null;
        for (let B of this._def.checks)
            if (B.kind === "max") {
                if (A === null || B.value < A) A = B.value
            } return A
    }
}
sy.create = (A) => {
    return new sy({
        checks: [],
        typeName: A2.ZodBigInt,
        coerce: A?.coerce ?? !1,
        ...W4(A)
    })
};
class ws extends m4 {
    _parse(A) {
        if (this._def.coerce) A.data = Boolean(A.data);
        if (this._getType(A) !== E2.boolean) {
            let Q = this._getOrReturnCtx(A);
            return u2(Q, {
                code: aA.invalid_type,
                expected: E2.boolean,
                received: Q.parsedType
            }), AQ
        }
        return oW(A.data)
    }
}
ws.create = (A) => {
    return new ws({
        typeName: A2.ZodBoolean,
        coerce: A?.coerce || !1,
        ...W4(A)
    })
};
class Tg extends m4 {
    _parse(A) {
        if (this._def.coerce) A.data = new Date(A.data);
        if (this._getType(A) !== E2.date) {
            let D = this._getOrReturnCtx(A);
            return u2(D, {
                code: aA.invalid_type,
                expected: E2.date,
                received: D.parsedType
            }), AQ
        }
        if (Number.isNaN(A.data.getTime())) {
            let D = this._getOrReturnCtx(A);
            return u2(D, {
                code: aA.invalid_date
            }), AQ
        }
        let Q = new xY,
            Z = void 0;
        for (let D of this._def.checks)
            if (D.kind === "min") {
                if (A.data.getTime() < D.value) Z = this._getOrReturnCtx(A, Z), u2(Z, {
                    code: aA.too_small,
                    message: D.message,
                    inclusive: !0,
                    exact: !1,
                    minimum: D.value,
                    type: "date"
                }), Q.dirty()
            } else if (D.kind === "max") {
            if (A.data.getTime() > D.value) Z = this._getOrReturnCtx(A, Z), u2(Z, {
                code: aA.too_big,
                message: D.message,
                inclusive: !0,
                exact: !1,
                maximum: D.value,
                type: "date"
            }), Q.dirty()
        } else C6.assertNever(D);
        return {
            status: Q.value,
            value: new Date(A.data.getTime())
        }
    }
    _addCheck(A) {
        return new Tg({
            ...this._def,
            checks: [...this._def.checks, A]
        })
    }
    min(A, B) {
        return this._addCheck({
            kind: "min",
            value: A.getTime(),
            message: X9.toString(B)
        })
    }
    max(A, B) {
        return this._addCheck({
            kind: "max",
            value: A.getTime(),
            message: X9.toString(B)
        })
    }
    get minDate() {
        let A = null;
        for (let B of this._def.checks)
            if (B.kind === "min") {
                if (A === null || B.value > A) A = B.value
            } return A != null ? new Date(A) : null
    }
    get maxDate() {
        let A = null;
        for (let B of this._def.checks)
            if (B.kind === "max") {
                if (A === null || B.value < A) A = B.value
            } return A != null ? new Date(A) : null
    }
}
Tg.create = (A) => {
    return new Tg({
        checks: [],
        coerce: A?.coerce || !1,
        typeName: A2.ZodDate,
        ...W4(A)
    })
};
class f61 extends m4 {
    _parse(A) {
        if (this._getType(A) !== E2.symbol) {
            let Q = this._getOrReturnCtx(A);
            return u2(Q, {
                code: aA.invalid_type,
                expected: E2.symbol,
                received: Q.parsedType
            }), AQ
        }
        return oW(A.data)
    }
}
f61.create = (A) => {
    return new f61({
        typeName: A2.ZodSymbol,
        ...W4(A)
    })
};
class $s extends m4 {
    _parse(A) {
        if (this._getType(A) !== E2.undefined) {
            let Q = this._getOrReturnCtx(A);
            return u2(Q, {
                code: aA.invalid_type,
                expected: E2.undefined,
                received: Q.parsedType
            }), AQ
        }
        return oW(A.data)
    }
}
$s.create = (A) => {
    return new $s({
        typeName: A2.ZodUndefined,
        ...W4(A)
    })
};
class qs extends m4 {
    _parse(A) {
        if (this._getType(A) !== E2.null) {
            let Q = this._getOrReturnCtx(A);
            return u2(Q, {
                code: aA.invalid_type,
                expected: E2.null,
                received: Q.parsedType
            }), AQ
        }
        return oW(A.data)
    }
}
qs.create = (A) => {
    return new qs({
        typeName: A2.ZodNull,
        ...W4(A)
    })
};
class Pg extends m4 {
    constructor() {
        super(...arguments);
        this._any = !0
    }
    _parse(A) {
        return oW(A.data)
    }
}
Pg.create = (A) => {
    return new Pg({
        typeName: A2.ZodAny,
        ...W4(A)
    })
};
class ny extends m4 {
    constructor() {
        super(...arguments);
        this._unknown = !0
    }
    _parse(A) {
        return oW(A.data)
    }
}
ny.create = (A) => {
    return new ny({
        typeName: A2.ZodUnknown,
        ...W4(A)
    })
};
class zL extends m4 {
    _parse(A) {
        let B = this._getOrReturnCtx(A);
        return u2(B, {
            code: aA.invalid_type,
            expected: E2.never,
            received: B.parsedType
        }), AQ
    }
}
zL.create = (A) => {
    return new zL({
        typeName: A2.ZodNever,
        ...W4(A)
    })
};
class h61 extends m4 {
    _parse(A) {
        if (this._getType(A) !== E2.undefined) {
            let Q = this._getOrReturnCtx(A);
            return u2(Q, {
                code: aA.invalid_type,
                expected: E2.void,
                received: Q.parsedType
            }), AQ
        }
        return oW(A.data)
    }
}
h61.create = (A) => {
    return new h61({
        typeName: A2.ZodVoid,
        ...W4(A)
    })
};
class dw extends m4 {
    _parse(A) {
        let {
            ctx: B,
            status: Q
        } = this._processInputParams(A), Z = this._def;
        if (B.parsedType !== E2.array) return u2(B, {
            code: aA.invalid_type,
            expected: E2.array,
            received: B.parsedType
        }), AQ;
        if (Z.exactLength !== null) {
            let G = B.data.length > Z.exactLength.value,
                F = B.data.length < Z.exactLength.value;
            if (G || F) u2(B, {
                code: G ? aA.too_big : aA.too_small,
                minimum: F ? Z.exactLength.value : void 0,
                maximum: G ? Z.exactLength.value : void 0,
                type: "array",
                inclusive: !0,
                exact: !0,
                message: Z.exactLength.message
            }), Q.dirty()
        }
        if (Z.minLength !== null) {
            if (B.data.length < Z.minLength.value) u2(B, {
                code: aA.too_small,
                minimum: Z.minLength.value,
                type: "array",
                inclusive: !0,
                exact: !1,
                message: Z.minLength.message
            }), Q.dirty()
        }
        if (Z.maxLength !== null) {
            if (B.data.length > Z.maxLength.value) u2(B, {
                code: aA.too_big,
                maximum: Z.maxLength.value,
                type: "array",
                inclusive: !0,
                exact: !1,
                message: Z.maxLength.message
            }), Q.dirty()
        }
        if (B.common.async) return Promise.all([...B.data].map((G, F) => {
            return Z.type._parseAsync(new cw(B, G, B.path, F))
        })).then((G) => {
            return xY.mergeArray(Q, G)
        });
        let D = [...B.data].map((G, F) => {
            return Z.type._parseSync(new cw(B, G, B.path, F))
        });
        return xY.mergeArray(Q, D)
    }
    get element() {
        return this._def.type
    }
    min(A, B) {
        return new dw({
            ...this._def,
            minLength: {
                value: A,
                message: X9.toString(B)
            }
        })
    }
    max(A, B) {
        return new dw({
            ...this._def,
            maxLength: {
                value: A,
                message: X9.toString(B)
            }
        })
    }
    length(A, B) {
        return new dw({
            ...this._def,
            exactLength: {
                value: A,
                message: X9.toString(B)
            }
        })
    }
    nonempty(A) {
        return this.min(1, A)
    }
}
dw.create = (A, B) => {
    return new dw({
        type: A,
        minLength: null,
        maxLength: null,
        exactLength: null,
        typeName: A2.ZodArray,
        ...W4(B)
    })
};

function Es(A) {
    if (A instanceof lZ) {
        let B = {};
        for (let Q in A.shape) {
            let Z = A.shape[Q];
            B[Q] = KK.create(Es(Z))
        }
        return new lZ({
            ...A._def,
            shape: () => B
        })
    } else if (A instanceof dw) return new dw({
        ...A._def,
        type: Es(A.element)
    });
    else if (A instanceof KK) return KK.create(Es(A.unwrap()));
    else if (A instanceof LT) return LT.create(Es(A.unwrap()));
    else if (A instanceof EL) return EL.create(A.items.map((B) => Es(B)));
    else return A
}