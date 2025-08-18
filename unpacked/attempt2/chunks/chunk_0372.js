/* chunk:372 bytes:[8691889, 8711367) size:19478 source:unpacked-cli.js */
var QK0 = E((Fo5, B8B) => {
    var YZ1 = BK0(),
        A8B = {};
    for (let A of Object.keys(YZ1)) A8B[YZ1[A]] = A;
    var V9 = {
        rgb: {
            channels: 3,
            labels: "rgb"
        },
        hsl: {
            channels: 3,
            labels: "hsl"
        },
        hsv: {
            channels: 3,
            labels: "hsv"
        },
        hwb: {
            channels: 3,
            labels: "hwb"
        },
        cmyk: {
            channels: 4,
            labels: "cmyk"
        },
        xyz: {
            channels: 3,
            labels: "xyz"
        },
        lab: {
            channels: 3,
            labels: "lab"
        },
        lch: {
            channels: 3,
            labels: "lch"
        },
        hex: {
            channels: 1,
            labels: ["hex"]
        },
        keyword: {
            channels: 1,
            labels: ["keyword"]
        },
        ansi16: {
            channels: 1,
            labels: ["ansi16"]
        },
        ansi256: {
            channels: 1,
            labels: ["ansi256"]
        },
        hcg: {
            channels: 3,
            labels: ["h", "c", "g"]
        },
        apple: {
            channels: 3,
            labels: ["r16", "g16", "b16"]
        },
        gray: {
            channels: 1,
            labels: ["gray"]
        }
    };
    B8B.exports = V9;
    for (let A of Object.keys(V9)) {
        if (!("channels" in V9[A])) throw new Error("missing channels property: " + A);
        if (!("labels" in V9[A])) throw new Error("missing channel labels property: " + A);
        if (V9[A].labels.length !== V9[A].channels) throw new Error("channel and label counts mismatch: " + A);
        let {
            channels: B,
            labels: Q
        } = V9[A];
        delete V9[A].channels, delete V9[A].labels, Object.defineProperty(V9[A], "channels", {
            value: B
        }), Object.defineProperty(V9[A], "labels", {
            value: Q
        })
    }
    V9.rgb.hsl = function(A) {
        let B = A[0] / 255,
            Q = A[1] / 255,
            Z = A[2] / 255,
            D = Math.min(B, Q, Z),
            G = Math.max(B, Q, Z),
            F = G - D,
            I, Y;
        if (G === D) I = 0;
        else if (B === G) I = (Q - Z) / F;
        else if (Q === G) I = 2 + (Z - B) / F;
        else if (Z === G) I = 4 + (B - Q) / F;
        if (I = Math.min(I * 60, 360), I < 0) I += 360;
        let W = (D + G) / 2;
        if (G === D) Y = 0;
        else if (W <= 0.5) Y = F / (G + D);
        else Y = F / (2 - G - D);
        return [I, Y * 100, W * 100]
    };
    V9.rgb.hsv = function(A) {
        let B, Q, Z, D, G, F = A[0] / 255,
            I = A[1] / 255,
            Y = A[2] / 255,
            W = Math.max(F, I, Y),
            J = W - Math.min(F, I, Y),
            X = function(V) {
                return (W - V) / 6 / J + 0.5
            };
        if (J === 0) D = 0, G = 0;
        else {
            if (G = J / W, B = X(F), Q = X(I), Z = X(Y), F === W) D = Z - Q;
            else if (I === W) D = 0.3333333333333333 + B - Z;
            else if (Y === W) D = 0.6666666666666666 + Q - B;
            if (D < 0) D += 1;
            else if (D > 1) D -= 1
        }
        return [D * 360, G * 100, W * 100]
    };
    V9.rgb.hwb = function(A) {
        let B = A[0],
            Q = A[1],
            Z = A[2],
            D = V9.rgb.hsl(A)[0],
            G = 0.00392156862745098 * Math.min(B, Math.min(Q, Z));
        return Z = 1 - 0.00392156862745098 * Math.max(B, Math.max(Q, Z)), [D, G * 100, Z * 100]
    };
    V9.rgb.cmyk = function(A) {
        let B = A[0] / 255,
            Q = A[1] / 255,
            Z = A[2] / 255,
            D = Math.min(1 - B, 1 - Q, 1 - Z),
            G = (1 - B - D) / (1 - D) || 0,
            F = (1 - Q - D) / (1 - D) || 0,
            I = (1 - Z - D) / (1 - D) || 0;
        return [G * 100, F * 100, I * 100, D * 100]
    };

    function QP6(A, B) {
        return (A[0] - B[0]) ** 2 + (A[1] - B[1]) ** 2 + (A[2] - B[2]) ** 2
    }
    V9.rgb.keyword = function(A) {
        let B = A8B[A];
        if (B) return B;
        let Q = 1 / 0,
            Z;
        for (let D of Object.keys(YZ1)) {
            let G = YZ1[D],
                F = QP6(A, G);
            if (F < Q) Q = F, Z = D
        }
        return Z
    };
    V9.keyword.rgb = function(A) {
        return YZ1[A]
    };
    V9.rgb.xyz = function(A) {
        let B = A[0] / 255,
            Q = A[1] / 255,
            Z = A[2] / 255;
        B = B > 0.04045 ? ((B + 0.055) / 1.055) ** 2.4 : B / 12.92, Q = Q > 0.04045 ? ((Q + 0.055) / 1.055) ** 2.4 : Q / 12.92, Z = Z > 0.04045 ? ((Z + 0.055) / 1.055) ** 2.4 : Z / 12.92;
        let D = B * 0.4124 + Q * 0.3576 + Z * 0.1805,
            G = B * 0.2126 + Q * 0.7152 + Z * 0.0722,
            F = B * 0.0193 + Q * 0.1192 + Z * 0.9505;
        return [D * 100, G * 100, F * 100]
    };
    V9.rgb.lab = function(A) {
        let B = V9.rgb.xyz(A),
            Q = B[0],
            Z = B[1],
            D = B[2];
        Q /= 95.047, Z /= 100, D /= 108.883, Q = Q > 0.008856 ? Q ** 0.3333333333333333 : 7.787 * Q + 0.13793103448275862, Z = Z > 0.008856 ? Z ** 0.3333333333333333 : 7.787 * Z + 0.13793103448275862, D = D > 0.008856 ? D ** 0.3333333333333333 : 7.787 * D + 0.13793103448275862;
        let G = 116 * Z - 16,
            F = 500 * (Q - Z),
            I = 200 * (Z - D);
        return [G, F, I]
    };
    V9.hsl.rgb = function(A) {
        let B = A[0] / 360,
            Q = A[1] / 100,
            Z = A[2] / 100,
            D, G, F;
        if (Q === 0) return F = Z * 255, [F, F, F];
        if (Z < 0.5) D = Z * (1 + Q);
        else D = Z + Q - Z * Q;
        let I = 2 * Z - D,
            Y = [0, 0, 0];
        for (let W = 0; W < 3; W++) {
            if (G = B + 0.3333333333333333 * -(W - 1), G < 0) G++;
            if (G > 1) G--;
            if (6 * G < 1) F = I + (D - I) * 6 * G;
            else if (2 * G < 1) F = D;
            else if (3 * G < 2) F = I + (D - I) * (0.6666666666666666 - G) * 6;
            else F = I;
            Y[W] = F * 255
        }
        return Y
    };
    V9.hsl.hsv = function(A) {
        let B = A[0],
            Q = A[1] / 100,
            Z = A[2] / 100,
            D = Q,
            G = Math.max(Z, 0.01);
        Z *= 2, Q *= Z <= 1 ? Z : 2 - Z, D *= G <= 1 ? G : 2 - G;
        let F = (Z + Q) / 2,
            I = Z === 0 ? 2 * D / (G + D) : 2 * Q / (Z + Q);
        return [B, I * 100, F * 100]
    };
    V9.hsv.rgb = function(A) {
        let B = A[0] / 60,
            Q = A[1] / 100,
            Z = A[2] / 100,
            D = Math.floor(B) % 6,
            G = B - Math.floor(B),
            F = 255 * Z * (1 - Q),
            I = 255 * Z * (1 - Q * G),
            Y = 255 * Z * (1 - Q * (1 - G));
        switch (Z *= 255, D) {
            case 0:
                return [Z, Y, F];
            case 1:
                return [I, Z, F];
            case 2:
                return [F, Z, Y];
            case 3:
                return [F, I, Z];
            case 4:
                return [Y, F, Z];
            case 5:
                return [Z, F, I]
        }
    };
    V9.hsv.hsl = function(A) {
        let B = A[0],
            Q = A[1] / 100,
            Z = A[2] / 100,
            D = Math.max(Z, 0.01),
            G, F;
        F = (2 - Q) * Z;
        let I = (2 - Q) * D;
        return G = Q * D, G /= I <= 1 ? I : 2 - I, G = G || 0, F /= 2, [B, G * 100, F * 100]
    };
    V9.hwb.rgb = function(A) {
        let B = A[0] / 360,
            Q = A[1] / 100,
            Z = A[2] / 100,
            D = Q + Z,
            G;
        if (D > 1) Q /= D, Z /= D;
        let F = Math.floor(6 * B),
            I = 1 - Z;
        if (G = 6 * B - F, (F & 1) !== 0) G = 1 - G;
        let Y = Q + G * (I - Q),
            W, J, X;
        switch (F) {
            default:
            case 6:
            case 0:
                W = I, J = Y, X = Q;
                break;
            case 1:
                W = Y, J = I, X = Q;
                break;
            case 2:
                W = Q, J = I, X = Y;
                break;
            case 3:
                W = Q, J = Y, X = I;
                break;
            case 4:
                W = Y, J = Q, X = I;
                break;
            case 5:
                W = I, J = Q, X = Y;
                break
        }
        return [W * 255, J * 255, X * 255]
    };
    V9.cmyk.rgb = function(A) {
        let B = A[0] / 100,
            Q = A[1] / 100,
            Z = A[2] / 100,
            D = A[3] / 100,
            G = 1 - Math.min(1, B * (1 - D) + D),
            F = 1 - Math.min(1, Q * (1 - D) + D),
            I = 1 - Math.min(1, Z * (1 - D) + D);
        return [G * 255, F * 255, I * 255]
    };
    V9.xyz.rgb = function(A) {
        let B = A[0] / 100,
            Q = A[1] / 100,
            Z = A[2] / 100,
            D, G, F;
        return D = B * 3.2406 + Q * -1.5372 + Z * -0.4986, G = B * -0.9689 + Q * 1.8758 + Z * 0.0415, F = B * 0.0557 + Q * -0.204 + Z * 1.057, D = D > 0.0031308 ? 1.055 * D ** 0.4166666666666667 - 0.055 : D * 12.92, G = G > 0.0031308 ? 1.055 * G ** 0.4166666666666667 - 0.055 : G * 12.92, F = F > 0.0031308 ? 1.055 * F ** 0.4166666666666667 - 0.055 : F * 12.92, D = Math.min(Math.max(0, D), 1), G = Math.min(Math.max(0, G), 1), F = Math.min(Math.max(0, F), 1), [D * 255, G * 255, F * 255]
    };
    V9.xyz.lab = function(A) {
        let B = A[0],
            Q = A[1],
            Z = A[2];
        B /= 95.047, Q /= 100, Z /= 108.883, B = B > 0.008856 ? B ** 0.3333333333333333 : 7.787 * B + 0.13793103448275862, Q = Q > 0.008856 ? Q ** 0.3333333333333333 : 7.787 * Q + 0.13793103448275862, Z = Z > 0.008856 ? Z ** 0.3333333333333333 : 7.787 * Z + 0.13793103448275862;
        let D = 116 * Q - 16,
            G = 500 * (B - Q),
            F = 200 * (Q - Z);
        return [D, G, F]
    };
    V9.lab.xyz = function(A) {
        let B = A[0],
            Q = A[1],
            Z = A[2],
            D, G, F;
        G = (B + 16) / 116, D = Q / 500 + G, F = G - Z / 200;
        let I = G ** 3,
            Y = D ** 3,
            W = F ** 3;
        return G = I > 0.008856 ? I : (G - 0.13793103448275862) / 7.787, D = Y > 0.008856 ? Y : (D - 0.13793103448275862) / 7.787, F = W > 0.008856 ? W : (F - 0.13793103448275862) / 7.787, D *= 95.047, G *= 100, F *= 108.883, [D, G, F]
    };
    V9.lab.lch = function(A) {
        let B = A[0],
            Q = A[1],
            Z = A[2],
            D;
        if (D = Math.atan2(Z, Q) * 360 / 2 / Math.PI, D < 0) D += 360;
        let F = Math.sqrt(Q * Q + Z * Z);
        return [B, F, D]
    };
    V9.lch.lab = function(A) {
        let B = A[0],
            Q = A[1],
            D = A[2] / 360 * 2 * Math.PI,
            G = Q * Math.cos(D),
            F = Q * Math.sin(D);
        return [B, G, F]
    };
    V9.rgb.ansi16 = function(A, B = null) {
        let [Q, Z, D] = A, G = B === null ? V9.rgb.hsv(A)[2] : B;
        if (G = Math.round(G / 50), G === 0) return 30;
        let F = 30 + (Math.round(D / 255) << 2 | Math.round(Z / 255) << 1 | Math.round(Q / 255));
        if (G === 2) F += 60;
        return F
    };
    V9.hsv.ansi16 = function(A) {
        return V9.rgb.ansi16(V9.hsv.rgb(A), A[2])
    };
    V9.rgb.ansi256 = function(A) {
        let B = A[0],
            Q = A[1],
            Z = A[2];
        if (B === Q && Q === Z) {
            if (B < 8) return 16;
            if (B > 248) return 231;
            return Math.round((B - 8) / 247 * 24) + 232
        }
        return 16 + 36 * Math.round(B / 255 * 5) + 6 * Math.round(Q / 255 * 5) + Math.round(Z / 255 * 5)
    };
    V9.ansi16.rgb = function(A) {
        let B = A % 10;
        if (B === 0 || B === 7) {
            if (A > 50) B += 3.5;
            return B = B / 10.5 * 255, [B, B, B]
        }
        let Q = (~~(A > 50) + 1) * 0.5,
            Z = (B & 1) * Q * 255,
            D = (B >> 1 & 1) * Q * 255,
            G = (B >> 2 & 1) * Q * 255;
        return [Z, D, G]
    };
    V9.ansi256.rgb = function(A) {
        if (A >= 232) {
            let G = (A - 232) * 10 + 8;
            return [G, G, G]
        }
        A -= 16;
        let B, Q = Math.floor(A / 36) / 5 * 255,
            Z = Math.floor((B = A % 36) / 6) / 5 * 255,
            D = B % 6 / 5 * 255;
        return [Q, Z, D]
    };
    V9.rgb.hex = function(A) {
        let Q = (((Math.round(A[0]) & 255) << 16) + ((Math.round(A[1]) & 255) << 8) + (Math.round(A[2]) & 255)).toString(16).toUpperCase();
        return "000000".substring(Q.length) + Q
    };
    V9.hex.rgb = function(A) {
        let B = A.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);
        if (!B) return [0, 0, 0];
        let Q = B[0];
        if (B[0].length === 3) Q = Q.split("").map((I) => {
            return I + I
        }).join("");
        let Z = parseInt(Q, 16),
            D = Z >> 16 & 255,
            G = Z >> 8 & 255,
            F = Z & 255;
        return [D, G, F]
    };
    V9.rgb.hcg = function(A) {
        let B = A[0] / 255,
            Q = A[1] / 255,
            Z = A[2] / 255,
            D = Math.max(Math.max(B, Q), Z),
            G = Math.min(Math.min(B, Q), Z),
            F = D - G,
            I, Y;
        if (F < 1) I = G / (1 - F);
        else I = 0;
        if (F <= 0) Y = 0;
        else if (D === B) Y = (Q - Z) / F % 6;
        else if (D === Q) Y = 2 + (Z - B) / F;
        else Y = 4 + (B - Q) / F;
        return Y /= 6, Y %= 1, [Y * 360, F * 100, I * 100]
    };
    V9.hsl.hcg = function(A) {
        let B = A[1] / 100,
            Q = A[2] / 100,
            Z = Q < 0.5 ? 2 * B * Q : 2 * B * (1 - Q),
            D = 0;
        if (Z < 1) D = (Q - 0.5 * Z) / (1 - Z);
        return [A[0], Z * 100, D * 100]
    };
    V9.hsv.hcg = function(A) {
        let B = A[1] / 100,
            Q = A[2] / 100,
            Z = B * Q,
            D = 0;
        if (Z < 1) D = (Q - Z) / (1 - Z);
        return [A[0], Z * 100, D * 100]
    };
    V9.hcg.rgb = function(A) {
        let B = A[0] / 360,
            Q = A[1] / 100,
            Z = A[2] / 100;
        if (Q === 0) return [Z * 255, Z * 255, Z * 255];
        let D = [0, 0, 0],
            G = B % 1 * 6,
            F = G % 1,
            I = 1 - F,
            Y = 0;
        switch (Math.floor(G)) {
            case 0:
                D[0] = 1, D[1] = F, D[2] = 0;
                break;
            case 1:
                D[0] = I, D[1] = 1, D[2] = 0;
                break;
            case 2:
                D[0] = 0, D[1] = 1, D[2] = F;
                break;
            case 3:
                D[0] = 0, D[1] = I, D[2] = 1;
                break;
            case 4:
                D[0] = F, D[1] = 0, D[2] = 1;
                break;
            default:
                D[0] = 1, D[1] = 0, D[2] = I
        }
        return Y = (1 - Q) * Z, [(Q * D[0] + Y) * 255, (Q * D[1] + Y) * 255, (Q * D[2] + Y) * 255]
    };
    V9.hcg.hsv = function(A) {
        let B = A[1] / 100,
            Q = A[2] / 100,
            Z = B + Q * (1 - B),
            D = 0;
        if (Z > 0) D = B / Z;
        return [A[0], D * 100, Z * 100]
    };
    V9.hcg.hsl = function(A) {
        let B = A[1] / 100,
            Z = A[2] / 100 * (1 - B) + 0.5 * B,
            D = 0;
        if (Z > 0 && Z < 0.5) D = B / (2 * Z);
        else if (Z >= 0.5 && Z < 1) D = B / (2 * (1 - Z));
        return [A[0], D * 100, Z * 100]
    };
    V9.hcg.hwb = function(A) {
        let B = A[1] / 100,
            Q = A[2] / 100,
            Z = B + Q * (1 - B);
        return [A[0], (Z - B) * 100, (1 - Z) * 100]
    };
    V9.hwb.hcg = function(A) {
        let B = A[1] / 100,
            Z = 1 - A[2] / 100,
            D = Z - B,
            G = 0;
        if (D < 1) G = (Z - D) / (1 - D);
        return [A[0], D * 100, G * 100]
    };
    V9.apple.rgb = function(A) {
        return [A[0] / 65535 * 255, A[1] / 65535 * 255, A[2] / 65535 * 255]
    };
    V9.rgb.apple = function(A) {
        return [A[0] / 255 * 65535, A[1] / 255 * 65535, A[2] / 255 * 65535]
    };
    V9.gray.rgb = function(A) {
        return [A[0] / 100 * 255, A[0] / 100 * 255, A[0] / 100 * 255]
    };
    V9.gray.hsl = function(A) {
        return [0, 0, A[0]]
    };
    V9.gray.hsv = V9.gray.hsl;
    V9.gray.hwb = function(A) {
        return [0, 100, A[0]]
    };
    V9.gray.cmyk = function(A) {
        return [0, 0, 0, A[0]]
    };
    V9.gray.lab = function(A) {
        return [A[0], 0, 0]
    };
    V9.gray.hex = function(A) {
        let B = Math.round(A[0] / 100 * 255) & 255,
            Z = ((B << 16) + (B << 8) + B).toString(16).toUpperCase();
        return "000000".substring(Z.length) + Z
    };
    V9.rgb.gray = function(A) {
        return [(A[0] + A[1] + A[2]) / 3 / 255 * 100]
    }
});
var Z8B = E((Io5, Q8B) => {
    var Tj1 = QK0();

    function ZP6() {
        let A = {},
            B = Object.keys(Tj1);
        for (let Q = B.length, Z = 0; Z < Q; Z++) A[B[Z]] = {
            distance: -1,
            parent: null
        };
        return A
    }

    function DP6(A) {
        let B = ZP6(),
            Q = [A];
        B[A].distance = 0;
        while (Q.length) {
            let Z = Q.pop(),
                D = Object.keys(Tj1[Z]);
            for (let G = D.length, F = 0; F < G; F++) {
                let I = D[F],
                    Y = B[I];
                if (Y.distance === -1) Y.distance = B[Z].distance + 1, Y.parent = Z, Q.unshift(I)
            }
        }
        return B
    }

    function GP6(A, B) {
        return function(Q) {
            return B(A(Q))
        }
    }

    function FP6(A, B) {
        let Q = [B[A].parent, A],
            Z = Tj1[B[A].parent][A],
            D = B[A].parent;
        while (B[D].parent) Q.unshift(B[D].parent), Z = GP6(Tj1[B[D].parent][D], Z), D = B[D].parent;
        return Z.conversion = Q, Z
    }
    Q8B.exports = function(A) {
        let B = DP6(A),
            Q = {},
            Z = Object.keys(B);
        for (let D = Z.length, G = 0; G < D; G++) {
            let F = Z[G];
            if (B[F].parent === null) continue;
            Q[F] = FP6(F, B)
        }
        return Q
    }
});
var DK0 = E((Yo5, D8B) => {
    var ZK0 = QK0(),
        IP6 = Z8B(),
        Ue = {},
        YP6 = Object.keys(ZK0);

    function WP6(A) {
        let B = function(...Q) {
            let Z = Q[0];
            if (Z === void 0 || Z === null) return Z;
            if (Z.length > 1) Q = Z;
            return A(Q)
        };
        if ("conversion" in A) B.conversion = A.conversion;
        return B
    }

    function JP6(A) {
        let B = function(...Q) {
            let Z = Q[0];
            if (Z === void 0 || Z === null) return Z;
            if (Z.length > 1) Q = Z;
            let D = A(Q);
            if (typeof D === "object")
                for (let G = D.length, F = 0; F < G; F++) D[F] = Math.round(D[F]);
            return D
        };
        if ("conversion" in A) B.conversion = A.conversion;
        return B
    }
    YP6.forEach((A) => {
        Ue[A] = {}, Object.defineProperty(Ue[A], "channels", {
            value: ZK0[A].channels
        }), Object.defineProperty(Ue[A], "labels", {
            value: ZK0[A].labels
        });
        let B = IP6(A);
        Object.keys(B).forEach((Z) => {
            let D = B[Z];
            Ue[A][Z] = JP6(D), Ue[A][Z].raw = WP6(D)
        })
    });
    D8B.exports = Ue
});