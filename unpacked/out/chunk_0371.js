/* chunk:371 bytes:[8673285, 8691888) size:18603 source:unpacked-cli.js */
var c6B = E((Bo5, d6B) => {
    var sT6 = W1("node:util"),
        AK0 = W1("node:stream"),
        rT6 = NM();
    DZ1();
    var oT6 = sT6.debuglog("sharp"),
        Sm = function(A, B) {
            if (arguments.length === 1 && !rT6.defined(A)) throw new Error("Invalid input");
            if (!(this instanceof Sm)) return new Sm(A, B);
            return AK0.Duplex.call(this), this.options = {
                topOffsetPre: -1,
                leftOffsetPre: -1,
                widthPre: -1,
                heightPre: -1,
                topOffsetPost: -1,
                leftOffsetPost: -1,
                widthPost: -1,
                heightPost: -1,
                width: -1,
                height: -1,
                canvas: "crop",
                position: 0,
                resizeBackground: [0, 0, 0, 255],
                useExifOrientation: !1,
                angle: 0,
                rotationAngle: 0,
                rotationBackground: [0, 0, 0, 255],
                rotateBeforePreExtract: !1,
                flip: !1,
                flop: !1,
                extendTop: 0,
                extendBottom: 0,
                extendLeft: 0,
                extendRight: 0,
                extendBackground: [0, 0, 0, 255],
                extendWith: "background",
                withoutEnlargement: !1,
                withoutReduction: !1,
                affineMatrix: [],
                affineBackground: [0, 0, 0, 255],
                affineIdx: 0,
                affineIdy: 0,
                affineOdx: 0,
                affineOdy: 0,
                affineInterpolator: this.constructor.interpolators.bilinear,
                kernel: "lanczos3",
                fastShrinkOnLoad: !0,
                tint: [-1, 0, 0, 0],
                flatten: !1,
                flattenBackground: [0, 0, 0],
                unflatten: !1,
                negate: !1,
                negateAlpha: !0,
                medianSize: 0,
                blurSigma: 0,
                precision: "integer",
                minAmpl: 0.2,
                sharpenSigma: 0,
                sharpenM1: 1,
                sharpenM2: 2,
                sharpenX1: 2,
                sharpenY2: 10,
                sharpenY3: 20,
                threshold: 0,
                thresholdGrayscale: !0,
                trimBackground: [],
                trimThreshold: -1,
                trimLineArt: !1,
                gamma: 0,
                gammaOut: 0,
                greyscale: !1,
                normalise: !1,
                normaliseLower: 1,
                normaliseUpper: 99,
                claheWidth: 0,
                claheHeight: 0,
                claheMaxSlope: 3,
                brightness: 1,
                saturation: 1,
                hue: 0,
                lightness: 0,
                booleanBufferIn: null,
                booleanFileIn: "",
                joinChannelIn: [],
                extractChannel: -1,
                removeAlpha: !1,
                ensureAlpha: -1,
                colourspace: "srgb",
                colourspacePipeline: "last",
                composite: [],
                fileOut: "",
                formatOut: "input",
                streamOut: !1,
                keepMetadata: 0,
                withMetadataOrientation: -1,
                withMetadataDensity: 0,
                withIccProfile: "",
                withExif: {},
                withExifMerge: !0,
                resolveWithObject: !1,
                jpegQuality: 80,
                jpegProgressive: !1,
                jpegChromaSubsampling: "4:2:0",
                jpegTrellisQuantisation: !1,
                jpegOvershootDeringing: !1,
                jpegOptimiseScans: !1,
                jpegOptimiseCoding: !0,
                jpegQuantisationTable: 0,
                pngProgressive: !1,
                pngCompressionLevel: 6,
                pngAdaptiveFiltering: !1,
                pngPalette: !1,
                pngQuality: 100,
                pngEffort: 7,
                pngBitdepth: 8,
                pngDither: 1,
                jp2Quality: 80,
                jp2TileHeight: 512,
                jp2TileWidth: 512,
                jp2Lossless: !1,
                jp2ChromaSubsampling: "4:4:4",
                webpQuality: 80,
                webpAlphaQuality: 100,
                webpLossless: !1,
                webpNearLossless: !1,
                webpSmartSubsample: !1,
                webpPreset: "default",
                webpEffort: 4,
                webpMinSize: !1,
                webpMixed: !1,
                gifBitdepth: 8,
                gifEffort: 7,
                gifDither: 1,
                gifInterFrameMaxError: 0,
                gifInterPaletteMaxError: 3,
                gifReuse: !0,
                gifProgressive: !1,
                tiffQuality: 80,
                tiffCompression: "jpeg",
                tiffPredictor: "horizontal",
                tiffPyramid: !1,
                tiffMiniswhite: !1,
                tiffBitdepth: 8,
                tiffTile: !1,
                tiffTileHeight: 256,
                tiffTileWidth: 256,
                tiffXres: 1,
                tiffYres: 1,
                tiffResolutionUnit: "inch",
                heifQuality: 50,
                heifLossless: !1,
                heifCompression: "av1",
                heifEffort: 4,
                heifChromaSubsampling: "4:4:4",
                heifBitdepth: 8,
                jxlDistance: 1,
                jxlDecodingTier: 0,
                jxlEffort: 7,
                jxlLossless: !1,
                rawDepth: "uchar",
                tileSize: 256,
                tileOverlap: 0,
                tileContainer: "fs",
                tileLayout: "dz",
                tileFormat: "last",
                tileDepth: "last",
                tileAngle: 0,
                tileSkipBlanks: -1,
                tileBackground: [255, 255, 255, 255],
                tileCentre: !1,
                tileId: "https://example.com/iiif",
                tileBasename: "",
                timeoutSeconds: 0,
                linearA: [],
                linearB: [],
                debuglog: (Q) => {
                    this.emit("warning", Q), oT6(Q)
                },
                queueListener: function(Q) {
                    Sm.queue.emit("change", Q)
                }
            }, this.options.input = this._createInputDescriptor(A, B, {
                allowStream: !0
            }), this
        };
    Object.setPrototypeOf(Sm.prototype, AK0.Duplex.prototype);
    Object.setPrototypeOf(Sm, AK0.Duplex);

    function tT6() {
        let A = this.constructor.call(),
            {
                debuglog: B,
                queueListener: Q,
                ...Z
            } = this.options;
        if (A.options = structuredClone(Z), A.options.debuglog = B, A.options.queueListener = Q, this._isStreamInput()) this.on("finish", () => {
            this._flattenBufferIn(), A.options.input.buffer = this.options.input.buffer, A.emit("finish")
        });
        return A
    }
    Object.assign(Sm.prototype, {
        clone: tT6
    });
    d6B.exports = Sm
});
var BK0 = E((Qo5, l6B) => {
    l6B.exports = {
        aliceblue: [240, 248, 255],
        antiquewhite: [250, 235, 215],
        aqua: [0, 255, 255],
        aquamarine: [127, 255, 212],
        azure: [240, 255, 255],
        beige: [245, 245, 220],
        bisque: [255, 228, 196],
        black: [0, 0, 0],
        blanchedalmond: [255, 235, 205],
        blue: [0, 0, 255],
        blueviolet: [138, 43, 226],
        brown: [165, 42, 42],
        burlywood: [222, 184, 135],
        cadetblue: [95, 158, 160],
        chartreuse: [127, 255, 0],
        chocolate: [210, 105, 30],
        coral: [255, 127, 80],
        cornflowerblue: [100, 149, 237],
        cornsilk: [255, 248, 220],
        crimson: [220, 20, 60],
        cyan: [0, 255, 255],
        darkblue: [0, 0, 139],
        darkcyan: [0, 139, 139],
        darkgoldenrod: [184, 134, 11],
        darkgray: [169, 169, 169],
        darkgreen: [0, 100, 0],
        darkgrey: [169, 169, 169],
        darkkhaki: [189, 183, 107],
        darkmagenta: [139, 0, 139],
        darkolivegreen: [85, 107, 47],
        darkorange: [255, 140, 0],
        darkorchid: [153, 50, 204],
        darkred: [139, 0, 0],
        darksalmon: [233, 150, 122],
        darkseagreen: [143, 188, 143],
        darkslateblue: [72, 61, 139],
        darkslategray: [47, 79, 79],
        darkslategrey: [47, 79, 79],
        darkturquoise: [0, 206, 209],
        darkviolet: [148, 0, 211],
        deeppink: [255, 20, 147],
        deepskyblue: [0, 191, 255],
        dimgray: [105, 105, 105],
        dimgrey: [105, 105, 105],
        dodgerblue: [30, 144, 255],
        firebrick: [178, 34, 34],
        floralwhite: [255, 250, 240],
        forestgreen: [34, 139, 34],
        fuchsia: [255, 0, 255],
        gainsboro: [220, 220, 220],
        ghostwhite: [248, 248, 255],
        gold: [255, 215, 0],
        goldenrod: [218, 165, 32],
        gray: [128, 128, 128],
        green: [0, 128, 0],
        greenyellow: [173, 255, 47],
        grey: [128, 128, 128],
        honeydew: [240, 255, 240],
        hotpink: [255, 105, 180],
        indianred: [205, 92, 92],
        indigo: [75, 0, 130],
        ivory: [255, 255, 240],
        khaki: [240, 230, 140],
        lavender: [230, 230, 250],
        lavenderblush: [255, 240, 245],
        lawngreen: [124, 252, 0],
        lemonchiffon: [255, 250, 205],
        lightblue: [173, 216, 230],
        lightcoral: [240, 128, 128],
        lightcyan: [224, 255, 255],
        lightgoldenrodyellow: [250, 250, 210],
        lightgray: [211, 211, 211],
        lightgreen: [144, 238, 144],
        lightgrey: [211, 211, 211],
        lightpink: [255, 182, 193],
        lightsalmon: [255, 160, 122],
        lightseagreen: [32, 178, 170],
        lightskyblue: [135, 206, 250],
        lightslategray: [119, 136, 153],
        lightslategrey: [119, 136, 153],
        lightsteelblue: [176, 196, 222],
        lightyellow: [255, 255, 224],
        lime: [0, 255, 0],
        limegreen: [50, 205, 50],
        linen: [250, 240, 230],
        magenta: [255, 0, 255],
        maroon: [128, 0, 0],
        mediumaquamarine: [102, 205, 170],
        mediumblue: [0, 0, 205],
        mediumorchid: [186, 85, 211],
        mediumpurple: [147, 112, 219],
        mediumseagreen: [60, 179, 113],
        mediumslateblue: [123, 104, 238],
        mediumspringgreen: [0, 250, 154],
        mediumturquoise: [72, 209, 204],
        mediumvioletred: [199, 21, 133],
        midnightblue: [25, 25, 112],
        mintcream: [245, 255, 250],
        mistyrose: [255, 228, 225],
        moccasin: [255, 228, 181],
        navajowhite: [255, 222, 173],
        navy: [0, 0, 128],
        oldlace: [253, 245, 230],
        olive: [128, 128, 0],
        olivedrab: [107, 142, 35],
        orange: [255, 165, 0],
        orangered: [255, 69, 0],
        orchid: [218, 112, 214],
        palegoldenrod: [238, 232, 170],
        palegreen: [152, 251, 152],
        paleturquoise: [175, 238, 238],
        palevioletred: [219, 112, 147],
        papayawhip: [255, 239, 213],
        peachpuff: [255, 218, 185],
        peru: [205, 133, 63],
        pink: [255, 192, 203],
        plum: [221, 160, 221],
        powderblue: [176, 224, 230],
        purple: [128, 0, 128],
        rebeccapurple: [102, 51, 153],
        red: [255, 0, 0],
        rosybrown: [188, 143, 143],
        royalblue: [65, 105, 225],
        saddlebrown: [139, 69, 19],
        salmon: [250, 128, 114],
        sandybrown: [244, 164, 96],
        seagreen: [46, 139, 87],
        seashell: [255, 245, 238],
        sienna: [160, 82, 45],
        silver: [192, 192, 192],
        skyblue: [135, 206, 235],
        slateblue: [106, 90, 205],
        slategray: [112, 128, 144],
        slategrey: [112, 128, 144],
        snow: [255, 250, 250],
        springgreen: [0, 255, 127],
        steelblue: [70, 130, 180],
        tan: [210, 180, 140],
        teal: [0, 128, 128],
        thistle: [216, 191, 216],
        tomato: [255, 99, 71],
        turquoise: [64, 224, 208],
        violet: [238, 130, 238],
        wheat: [245, 222, 179],
        white: [255, 255, 255],
        whitesmoke: [245, 245, 245],
        yellow: [255, 255, 0],
        yellowgreen: [154, 205, 50]
    }
});
var i6B = E((Zo5, p6B) => {
    p6B.exports = function A(B) {
        if (!B || typeof B === "string") return !1;
        return B instanceof Array || Array.isArray(B) || B.length >= 0 && (B.splice instanceof Function || Object.getOwnPropertyDescriptor(B, B.length - 1) && B.constructor.name !== "String")
    }
});
var s6B = E((Do5, a6B) => {
    var eT6 = i6B(),
        AP6 = Array.prototype.concat,
        BP6 = Array.prototype.slice,
        n6B = a6B.exports = function A(B) {
            var Q = [];
            for (var Z = 0, D = B.length; Z < D; Z++) {
                var G = B[Z];
                if (eT6(G)) Q = AP6.call(Q, BP6.call(G));
                else Q.push(G)
            }
            return Q
        };
    n6B.wrap = function(A) {
        return function() {
            return A(n6B(arguments))
        }
    }
});
var e6B = E((Go5, t6B) => {
    var FZ1 = BK0(),
        IZ1 = s6B(),
        r6B = Object.hasOwnProperty,
        o6B = Object.create(null);
    for (GZ1 in FZ1)
        if (r6B.call(FZ1, GZ1)) o6B[FZ1[GZ1]] = GZ1;
    var GZ1, mK = t6B.exports = {
        to: {},
        get: {}
    };
    mK.get = function(A) {
        var B = A.substring(0, 3).toLowerCase(),
            Q, Z;
        switch (B) {
            case "hsl":
                Q = mK.get.hsl(A), Z = "hsl";
                break;
            case "hwb":
                Q = mK.get.hwb(A), Z = "hwb";
                break;
            default:
                Q = mK.get.rgb(A), Z = "rgb";
                break
        }
        if (!Q) return null;
        return {
            model: Z,
            value: Q
        }
    };
    mK.get.rgb = function(A) {
        if (!A) return null;
        var B = /^#([a-f0-9]{3,4})$/i,
            Q = /^#([a-f0-9]{6})([a-f0-9]{2})?$/i,
            Z = /^rgba?\(\s*([+-]?\d+)(?=[\s,])\s*(?:,\s*)?([+-]?\d+)(?=[\s,])\s*(?:,\s*)?([+-]?\d+)\s*(?:[,|\/]\s*([+-]?[\d\.]+)(%?)\s*)?\)$/,
            D = /^rgba?\(\s*([+-]?[\d\.]+)\%\s*,?\s*([+-]?[\d\.]+)\%\s*,?\s*([+-]?[\d\.]+)\%\s*(?:[,|\/]\s*([+-]?[\d\.]+)(%?)\s*)?\)$/,
            G = /^(\w+)$/,
            F = [0, 0, 0, 1],
            I, Y, W;
        if (I = A.match(Q)) {
            W = I[2], I = I[1];
            for (Y = 0; Y < 3; Y++) {
                var J = Y * 2;
                F[Y] = parseInt(I.slice(J, J + 2), 16)
            }
            if (W) F[3] = parseInt(W, 16) / 255
        } else if (I = A.match(B)) {
            I = I[1], W = I[3];
            for (Y = 0; Y < 3; Y++) F[Y] = parseInt(I[Y] + I[Y], 16);
            if (W) F[3] = parseInt(W + W, 16) / 255
        } else if (I = A.match(Z)) {
            for (Y = 0; Y < 3; Y++) F[Y] = parseInt(I[Y + 1], 0);
            if (I[4])
                if (I[5]) F[3] = parseFloat(I[4]) * 0.01;
                else F[3] = parseFloat(I[4])
        } else if (I = A.match(D)) {
            for (Y = 0; Y < 3; Y++) F[Y] = Math.round(parseFloat(I[Y + 1]) * 2.55);
            if (I[4])
                if (I[5]) F[3] = parseFloat(I[4]) * 0.01;
                else F[3] = parseFloat(I[4])
        } else if (I = A.match(G)) {
            if (I[1] === "transparent") return [0, 0, 0, 0];
            if (!r6B.call(FZ1, I[1])) return null;
            return F = FZ1[I[1]], F[3] = 1, F
        } else return null;
        for (Y = 0; Y < 3; Y++) F[Y] = _x(F[Y], 0, 255);
        return F[3] = _x(F[3], 0, 1), F
    };
    mK.get.hsl = function(A) {
        if (!A) return null;
        var B = /^hsla?\(\s*([+-]?(?:\d{0,3}\.)?\d+)(?:deg)?\s*,?\s*([+-]?[\d\.]+)%\s*,?\s*([+-]?[\d\.]+)%\s*(?:[,|\/]\s*([+-]?(?=\.\d|\d)(?:0|[1-9]\d*)?(?:\.\d*)?(?:[eE][+-]?\d+)?)\s*)?\)$/,
            Q = A.match(B);
        if (Q) {
            var Z = parseFloat(Q[4]),
                D = (parseFloat(Q[1]) % 360 + 360) % 360,
                G = _x(parseFloat(Q[2]), 0, 100),
                F = _x(parseFloat(Q[3]), 0, 100),
                I = _x(isNaN(Z) ? 1 : Z, 0, 1);
            return [D, G, F, I]
        }
        return null
    };
    mK.get.hwb = function(A) {
        if (!A) return null;
        var B = /^hwb\(\s*([+-]?\d{0,3}(?:\.\d+)?)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?(?=\.\d|\d)(?:0|[1-9]\d*)?(?:\.\d*)?(?:[eE][+-]?\d+)?)\s*)?\)$/,
            Q = A.match(B);
        if (Q) {
            var Z = parseFloat(Q[4]),
                D = (parseFloat(Q[1]) % 360 + 360) % 360,
                G = _x(parseFloat(Q[2]), 0, 100),
                F = _x(parseFloat(Q[3]), 0, 100),
                I = _x(isNaN(Z) ? 1 : Z, 0, 1);
            return [D, G, F, I]
        }
        return null
    };
    mK.to.hex = function() {
        var A = IZ1(arguments);
        return "#" + Oj1(A[0]) + Oj1(A[1]) + Oj1(A[2]) + (A[3] < 1 ? Oj1(Math.round(A[3] * 255)) : "")
    };
    mK.to.rgb = function() {
        var A = IZ1(arguments);
        return A.length < 4 || A[3] === 1 ? "rgb(" + Math.round(A[0]) + ", " + Math.round(A[1]) + ", " + Math.round(A[2]) + ")" : "rgba(" + Math.round(A[0]) + ", " + Math.round(A[1]) + ", " + Math.round(A[2]) + ", " + A[3] + ")"
    };
    mK.to.rgb.percent = function() {
        var A = IZ1(arguments),
            B = Math.round(A[0] / 255 * 100),
            Q = Math.round(A[1] / 255 * 100),
            Z = Math.round(A[2] / 255 * 100);
        return A.length < 4 || A[3] === 1 ? "rgb(" + B + "%, " + Q + "%, " + Z + "%)" : "rgba(" + B + "%, " + Q + "%, " + Z + "%, " + A[3] + ")"
    };
    mK.to.hsl = function() {
        var A = IZ1(arguments);
        return A.length < 4 || A[3] === 1 ? "hsl(" + A[0] + ", " + A[1] + "%, " + A[2] + "%)" : "hsla(" + A[0] + ", " + A[1] + "%, " + A[2] + "%, " + A[3] + ")"
    };
    mK.to.hwb = function() {
        var A = IZ1(arguments),
            B = "";
        if (A.length >= 4 && A[3] !== 1) B = ", " + A[3];
        return "hwb(" + A[0] + ", " + A[1] + "%, " + A[2] + "%" + B + ")"
    };
    mK.to.keyword = function(A) {
        return o6B[A.slice(0, 3)]
    };

    function _x(A, B, Q) {
        return Math.min(Math.max(B, A), Q)
    }

    function Oj1(A) {
        var B = Math.round(A).toString(16).toUpperCase();
        return B.length < 2 ? "0" + B : B
    }
});