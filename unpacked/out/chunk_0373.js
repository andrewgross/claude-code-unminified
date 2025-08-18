/* chunk:373 bytes:[8711368, 8721297) size:9929 source:unpacked-cli.js */
var Sj1 = E((Wo5, F8B) => {
    var we = e6B(),
        dK = DK0(),
        G8B = ["keyword", "gray", "hex"],
        GK0 = {};
    for (let A of Object.keys(dK)) GK0[[...dK[A].labels].sort().join("")] = A;
    var Pj1 = {};

    function RI(A, B) {
        if (!(this instanceof RI)) return new RI(A, B);
        if (B && B in G8B) B = null;
        if (B && !(B in dK)) throw new Error("Unknown model: " + B);
        let Q, Z;
        if (A == null) this.model = "rgb", this.color = [0, 0, 0], this.valpha = 1;
        else if (A instanceof RI) this.model = A.model, this.color = [...A.color], this.valpha = A.valpha;
        else if (typeof A === "string") {
            let D = we.get(A);
            if (D === null) throw new Error("Unable to parse color from string: " + A);
            this.model = D.model, Z = dK[this.model].channels, this.color = D.value.slice(0, Z), this.valpha = typeof D.value[Z] === "number" ? D.value[Z] : 1
        } else if (A.length > 0) {
            this.model = B || "rgb", Z = dK[this.model].channels;
            let D = Array.prototype.slice.call(A, 0, Z);
            this.color = FK0(D, Z), this.valpha = typeof A[Z] === "number" ? A[Z] : 1
        } else if (typeof A === "number") this.model = "rgb", this.color = [A >> 16 & 255, A >> 8 & 255, A & 255], this.valpha = 1;
        else {
            this.valpha = 1;
            let D = Object.keys(A);
            if ("alpha" in A) D.splice(D.indexOf("alpha"), 1), this.valpha = typeof A.alpha === "number" ? A.alpha : 0;
            let G = D.sort().join("");
            if (!(G in GK0)) throw new Error("Unable to parse color from object: " + JSON.stringify(A));
            this.model = GK0[G];
            let {
                labels: F
            } = dK[this.model], I = [];
            for (Q = 0; Q < F.length; Q++) I.push(A[F[Q]]);
            this.color = FK0(I)
        }
        if (Pj1[this.model]) {
            Z = dK[this.model].channels;
            for (Q = 0; Q < Z; Q++) {
                let D = Pj1[this.model][Q];
                if (D) this.color[Q] = D(this.color[Q])
            }
        }
        if (this.valpha = Math.max(0, Math.min(1, this.valpha)), Object.freeze) Object.freeze(this)
    }
    RI.prototype = {
        toString() {
            return this.string()
        },
        toJSON() {
            return this[this.model]()
        },
        string(A) {
            let B = this.model in we.to ? this : this.rgb();
            B = B.round(typeof A === "number" ? A : 1);
            let Q = B.valpha === 1 ? B.color : [...B.color, this.valpha];
            return we.to[B.model](Q)
        },
        percentString(A) {
            let B = this.rgb().round(typeof A === "number" ? A : 1),
                Q = B.valpha === 1 ? B.color : [...B.color, this.valpha];
            return we.to.rgb.percent(Q)
        },
        array() {
            return this.valpha === 1 ? [...this.color] : [...this.color, this.valpha]
        },
        object() {
            let A = {},
                {
                    channels: B
                } = dK[this.model],
                {
                    labels: Q
                } = dK[this.model];
            for (let Z = 0; Z < B; Z++) A[Q[Z]] = this.color[Z];
            if (this.valpha !== 1) A.alpha = this.valpha;
            return A
        },
        unitArray() {
            let A = this.rgb().color;
            if (A[0] /= 255, A[1] /= 255, A[2] /= 255, this.valpha !== 1) A.push(this.valpha);
            return A
        },
        unitObject() {
            let A = this.rgb().object();
            if (A.r /= 255, A.g /= 255, A.b /= 255, this.valpha !== 1) A.alpha = this.valpha;
            return A
        },
        round(A) {
            return A = Math.max(A || 0, 0), new RI([...this.color.map(VP6(A)), this.valpha], this.model)
        },
        alpha(A) {
            if (A !== void 0) return new RI([...this.color, Math.max(0, Math.min(1, A))], this.model);
            return this.valpha
        },
        red: zD("rgb", 0, _F(255)),
        green: zD("rgb", 1, _F(255)),
        blue: zD("rgb", 2, _F(255)),
        hue: zD(["hsl", "hsv", "hsl", "hwb", "hcg"], 0, (A) => (A % 360 + 360) % 360),
        saturationl: zD("hsl", 1, _F(100)),
        lightness: zD("hsl", 2, _F(100)),
        saturationv: zD("hsv", 1, _F(100)),
        value: zD("hsv", 2, _F(100)),
        chroma: zD("hcg", 1, _F(100)),
        gray: zD("hcg", 2, _F(100)),
        white: zD("hwb", 1, _F(100)),
        wblack: zD("hwb", 2, _F(100)),
        cyan: zD("cmyk", 0, _F(100)),
        magenta: zD("cmyk", 1, _F(100)),
        yellow: zD("cmyk", 2, _F(100)),
        black: zD("cmyk", 3, _F(100)),
        x: zD("xyz", 0, _F(95.047)),
        y: zD("xyz", 1, _F(100)),
        z: zD("xyz", 2, _F(108.833)),
        l: zD("lab", 0, _F(100)),
        a: zD("lab", 1),
        b: zD("lab", 2),
        keyword(A) {
            if (A !== void 0) return new RI(A);
            return dK[this.model].keyword(this.color)
        },
        hex(A) {
            if (A !== void 0) return new RI(A);
            return we.to.hex(this.rgb().round().color)
        },
        hexa(A) {
            if (A !== void 0) return new RI(A);
            let B = this.rgb().round().color,
                Q = Math.round(this.valpha * 255).toString(16).toUpperCase();
            if (Q.length === 1) Q = "0" + Q;
            return we.to.hex(B) + Q
        },
        rgbNumber() {
            let A = this.rgb().color;
            return (A[0] & 255) << 16 | (A[1] & 255) << 8 | A[2] & 255
        },
        luminosity() {
            let A = this.rgb().color,
                B = [];
            for (let [Q, Z] of A.entries()) {
                let D = Z / 255;
                B[Q] = D <= 0.04045 ? D / 12.92 : ((D + 0.055) / 1.055) ** 2.4
            }
            return 0.2126 * B[0] + 0.7152 * B[1] + 0.0722 * B[2]
        },
        contrast(A) {
            let B = this.luminosity(),
                Q = A.luminosity();
            if (B > Q) return (B + 0.05) / (Q + 0.05);
            return (Q + 0.05) / (B + 0.05)
        },
        level(A) {
            let B = this.contrast(A);
            if (B >= 7) return "AAA";
            return B >= 4.5 ? "AA" : ""
        },
        isDark() {
            let A = this.rgb().color;
            return (A[0] * 2126 + A[1] * 7152 + A[2] * 722) / 1e4 < 128
        },
        isLight() {
            return !this.isDark()
        },
        negate() {
            let A = this.rgb();
            for (let B = 0; B < 3; B++) A.color[B] = 255 - A.color[B];
            return A
        },
        lighten(A) {
            let B = this.hsl();
            return B.color[2] += B.color[2] * A, B
        },
        darken(A) {
            let B = this.hsl();
            return B.color[2] -= B.color[2] * A, B
        },
        saturate(A) {
            let B = this.hsl();
            return B.color[1] += B.color[1] * A, B
        },
        desaturate(A) {
            let B = this.hsl();
            return B.color[1] -= B.color[1] * A, B
        },
        whiten(A) {
            let B = this.hwb();
            return B.color[1] += B.color[1] * A, B
        },
        blacken(A) {
            let B = this.hwb();
            return B.color[2] += B.color[2] * A, B
        },
        grayscale() {
            let A = this.rgb().color,
                B = A[0] * 0.3 + A[1] * 0.59 + A[2] * 0.11;
            return RI.rgb(B, B, B)
        },
        fade(A) {
            return this.alpha(this.valpha - this.valpha * A)
        },
        opaquer(A) {
            return this.alpha(this.valpha + this.valpha * A)
        },
        rotate(A) {
            let B = this.hsl(),
                Q = B.color[0];
            return Q = (Q + A) % 360, Q = Q < 0 ? 360 + Q : Q, B.color[0] = Q, B
        },
        mix(A, B) {
            if (!A || !A.rgb) throw new Error('Argument to "mix" was not a Color instance, but rather an instance of ' + typeof A);
            let Q = A.rgb(),
                Z = this.rgb(),
                D = B === void 0 ? 0.5 : B,
                G = 2 * D - 1,
                F = Q.alpha() - Z.alpha(),
                I = ((G * F === -1 ? G : (G + F) / (1 + G * F)) + 1) / 2,
                Y = 1 - I;
            return RI.rgb(I * Q.red() + Y * Z.red(), I * Q.green() + Y * Z.green(), I * Q.blue() + Y * Z.blue(), Q.alpha() * D + Z.alpha() * (1 - D))
        }
    };
    for (let A of Object.keys(dK)) {
        if (G8B.includes(A)) continue;
        let {
            channels: B
        } = dK[A];
        RI.prototype[A] = function(...Q) {
            if (this.model === A) return new RI(this);
            if (Q.length > 0) return new RI(Q, A);
            return new RI([...CP6(dK[this.model][A].raw(this.color)), this.valpha], A)
        }, RI[A] = function(...Q) {
            let Z = Q[0];
            if (typeof Z === "number") Z = FK0(Q, B);
            return new RI(Z, A)
        }
    }

    function XP6(A, B) {
        return Number(A.toFixed(B))
    }

    function VP6(A) {
        return function(B) {
            return XP6(B, A)
        }
    }

    function zD(A, B, Q) {
        A = Array.isArray(A) ? A : [A];
        for (let Z of A)(Pj1[Z] || (Pj1[Z] = []))[B] = Q;
        return A = A[0],
            function(Z) {
                let D;
                if (Z !== void 0) {
                    if (Q) Z = Q(Z);
                    return D = this[A](), D.color[B] = Z, D
                }
                if (D = this[A]().color[B], Q) D = Q(D);
                return D
            }
    }

    function _F(A) {
        return function(B) {
            return Math.max(0, Math.min(A, B))
        }
    }

    function CP6(A) {
        return Array.isArray(A) ? A : [A]
    }

    function FK0(A, B) {
        for (let Q = 0; Q < B; Q++)
            if (typeof A[Q] !== "number") A[Q] = 0;
        return A
    }
    F8B.exports = RI
});