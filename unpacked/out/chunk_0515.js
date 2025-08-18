/* chunk:515 bytes:[12208756, 12220470) size:11714 source:unpacked-cli.js */
class m4 {
    get description() {
        return this._def.description
    }
    _getType(A) {
        return HL(A.data)
    }
    _getOrReturnCtx(A, B) {
        return B || {
            common: A.parent.common,
            data: A.data,
            parsedType: HL(A.data),
            schemaErrorMap: this._def.errorMap,
            path: A.path,
            parent: A.parent
        }
    }
    _processInputParams(A) {
        return {
            status: new xY,
            ctx: {
                common: A.parent.common,
                data: A.data,
                parsedType: HL(A.data),
                schemaErrorMap: this._def.errorMap,
                path: A.path,
                parent: A.parent
            }
        }
    }
    _parseSync(A) {
        let B = this._parse(A);
        if (zs(B)) throw new Error("Synchronous parse encountered promise.");
        return B
    }
    _parseAsync(A) {
        let B = this._parse(A);
        return Promise.resolve(B)
    }
    parse(A, B) {
        let Q = this.safeParse(A, B);
        if (Q.success) return Q.data;
        throw Q.error
    }
    safeParse(A, B) {
        let Q = {
                common: {
                    issues: [],
                    async: B?.async ?? !1,
                    contextualErrorMap: B?.errorMap
                },
                path: B?.path || [],
                schemaErrorMap: this._def.errorMap,
                parent: null,
                data: A,
                parsedType: HL(A)
            },
            Z = this._parseSync({
                data: A,
                path: Q.path,
                parent: Q
            });
        return SeA(Q, Z)
    }
    "~validate"(A) {
        let B = {
            common: {
                issues: [],
                async: !!this["~standard"].async
            },
            path: [],
            schemaErrorMap: this._def.errorMap,
            parent: null,
            data: A,
            parsedType: HL(A)
        };
        if (!this["~standard"].async) try {
            let Q = this._parseSync({
                data: A,
                path: [],
                parent: B
            });
            return iy(Q) ? {
                value: Q.value
            } : {
                issues: B.common.issues
            }
        } catch (Q) {
            if (Q?.message?.toLowerCase()?.includes("encountered")) this["~standard"].async = !0;
            B.common = {
                issues: [],
                async: !0
            }
        }
        return this._parseAsync({
            data: A,
            path: [],
            parent: B
        }).then((Q) => iy(Q) ? {
            value: Q.value
        } : {
            issues: B.common.issues
        })
    }
    async parseAsync(A, B) {
        let Q = await this.safeParseAsync(A, B);
        if (Q.success) return Q.data;
        throw Q.error
    }
    async safeParseAsync(A, B) {
        let Q = {
                common: {
                    issues: [],
                    contextualErrorMap: B?.errorMap,
                    async: !0
                },
                path: B?.path || [],
                schemaErrorMap: this._def.errorMap,
                parent: null,
                data: A,
                parsedType: HL(A)
            },
            Z = this._parse({
                data: A,
                path: Q.path,
                parent: Q
            }),
            D = await (zs(Z) ? Z : Promise.resolve(Z));
        return SeA(Q, D)
    }
    refine(A, B) {
        let Q = (Z) => {
            if (typeof B === "string" || typeof B === "undefined") return {
                message: B
            };
            else if (typeof B === "function") return B(Z);
            else return B
        };
        return this._refinement((Z, D) => {
            let G = A(Z),
                F = () => D.addIssue({
                    code: aA.custom,
                    ...Q(Z)
                });
            if (typeof Promise !== "undefined" && G instanceof Promise) return G.then((I) => {
                if (!I) return F(), !1;
                else return !0
            });
            if (!G) return F(), !1;
            else return !0
        })
    }
    refinement(A, B) {
        return this._refinement((Q, Z) => {
            if (!A(Q)) return Z.addIssue(typeof B === "function" ? B(Q, Z) : B), !1;
            else return !0
        })
    }
    _refinement(A) {
        return new lw({
            schema: this,
            typeName: A2.ZodEffects,
            effect: {
                type: "refinement",
                refinement: A
            }
        })
    }
    superRefine(A) {
        return this._refinement(A)
    }
    constructor(A) {
        this.spa = this.safeParseAsync, this._def = A, this.parse = this.parse.bind(this), this.safeParse = this.safeParse.bind(this), this.parseAsync = this.parseAsync.bind(this), this.safeParseAsync = this.safeParseAsync.bind(this), this.spa = this.spa.bind(this), this.refine = this.refine.bind(this), this.refinement = this.refinement.bind(this), this.superRefine = this.superRefine.bind(this), this.optional = this.optional.bind(this), this.nullable = this.nullable.bind(this), this.nullish = this.nullish.bind(this), this.array = this.array.bind(this), this.promise = this.promise.bind(this), this.or = this.or.bind(this), this.and = this.and.bind(this), this.transform = this.transform.bind(this), this.brand = this.brand.bind(this), this.default = this.default.bind(this), this.catch = this.catch.bind(this), this.describe = this.describe.bind(this), this.pipe = this.pipe.bind(this), this.readonly = this.readonly.bind(this), this.isNullable = this.isNullable.bind(this), this.isOptional = this.isOptional.bind(this), this["~standard"] = {
            version: 1,
            vendor: "zod",
            validate: (B) => this["~validate"](B)
        }
    }
    optional() {
        return KK.create(this, this._def)
    }
    nullable() {
        return LT.create(this, this._def)
    }
    nullish() {
        return this.nullable().optional()
    }
    array() {
        return dw.create(this)
    }
    promise() {
        return jg.create(this, this._def)
    }
    or(A) {
        return Ns.create([this, A], this._def)
    }
    and(A) {
        return Ls.create(this, A, this._def)
    }
    transform(A) {
        return new lw({
            ...W4(this._def),
            schema: this,
            typeName: A2.ZodEffects,
            effect: {
                type: "transform",
                transform: A
            }
        })
    }
    default (A) {
        let B = typeof A === "function" ? A : () => A;
        return new Ts({
            ...W4(this._def),
            innerType: this,
            defaultValue: B,
            typeName: A2.ZodDefault
        })
    }
    brand() {
        return new Cq1({
            typeName: A2.ZodBranded,
            type: this,
            ...W4(this._def)
        })
    } catch (A) {
        let B = typeof A === "function" ? A : () => A;
        return new Ps({
            ...W4(this._def),
            innerType: this,
            catchValue: B,
            typeName: A2.ZodCatch
        })
    }
    describe(A) {
        return new this.constructor({
            ...this._def,
            description: A
        })
    }
    pipe(A) {
        return d61.create(this, A)
    }
    readonly() {
        return Ss.create(this)
    }
    isOptional() {
        return this.safeParse(void 0).success
    }
    isNullable() {
        return this.safeParse(null).success
    }
}
var nZ4 = /^c[^\s-]{8,}$/i,
    aZ4 = /^[0-9a-z]+$/,
    sZ4 = /^[0-9A-HJKMNP-TV-Z]{26}$/i,
    rZ4 = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i,
    oZ4 = /^[a-z0-9_-]{21}$/i,
    tZ4 = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/,
    eZ4 = /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/,
    AD4 = /^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i,
    BD4 = "^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$",
    I40, QD4 = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/,
    ZD4 = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/(3[0-2]|[12]?[0-9])$/,
    DD4 = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/,
    GD4 = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/,
    FD4 = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/,
    ID4 = /^([0-9a-zA-Z-_]{4})*(([0-9a-zA-Z-_]{2}(==)?)|([0-9a-zA-Z-_]{3}(=)?))?$/,
    keA = "((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))",
    YD4 = new RegExp(`^${keA}$`);

function yeA(A) {
    let B = "[0-5]\\d";
    if (A.precision) B = `${B}\\.\\d{${A.precision}}`;
    else if (A.precision == null) B = `${B}(\\.\\d+)?`;
    let Q = A.precision ? "+" : "?";
    return `([01]\\d|2[0-3]):[0-5]\\d(:${B})${Q}`
}

function WD4(A) {
    return new RegExp(`^${yeA(A)}$`)
}

function _eA(A) {
    let B = `${keA}T${yeA(A)}`,
        Q = [];
    if (Q.push(A.local ? "Z?" : "Z"), A.offset) Q.push("([+-]\\d{2}:?\\d{2})");
    return B = `${B}(${Q.join("|")})`, new RegExp(`^${B}$`)
}

function JD4(A, B) {
    if ((B === "v4" || !B) && QD4.test(A)) return !0;
    if ((B === "v6" || !B) && DD4.test(A)) return !0;
    return !1
}

function XD4(A, B) {
    if (!tZ4.test(A)) return !1;
    try {
        let [Q] = A.split(".");
        if (!Q) return !1;
        let Z = Q.replace(/-/g, "+").replace(/_/g, "/").padEnd(Q.length + (4 - Q.length % 4) % 4, "="),
            D = JSON.parse(atob(Z));
        if (typeof D !== "object" || D === null) return !1;
        if ("typ" in D && D?.typ !== "JWT") return !1;
        if (!D.alg) return !1;
        if (B && D.alg !== B) return !1;
        return !0
    } catch {
        return !1
    }
}

function VD4(A, B) {
    if ((B === "v4" || !B) && ZD4.test(A)) return !0;
    if ((B === "v6" || !B) && GD4.test(A)) return !0;
    return !1
}