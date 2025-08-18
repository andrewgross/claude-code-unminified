/* chunk:376 bytes:[8746888, 8763486) size:16598 source:unpacked-cli.js */
var $8B = E((Co5, w8B) => {
    var SP6 = Sj1(),
        n0 = NM(),
        U8B = {
            integer: "integer",
            float: "float",
            approximate: "approximate"
        };

    function jP6(A, B) {
        if (this.options.useExifOrientation || this.options.angle || this.options.rotationAngle) this.options.debuglog("ignoring previous rotate options");
        if (!n0.defined(A)) this.options.useExifOrientation = !0;
        else if (n0.integer(A) && !(A % 90)) this.options.angle = A;
        else if (n0.number(A)) {
            if (this.options.rotationAngle = A, n0.object(B) && B.background) {
                let Q = SP6(B.background);
                this.options.rotationBackground = [Q.red(), Q.green(), Q.blue(), Math.round(Q.alpha() * 255)]
            }
        } else throw n0.invalidParameterError("angle", "numeric", A);
        return this
    }

    function kP6(A) {
        return this.options.flip = n0.bool(A) ? A : !0, this
    }

    function yP6(A) {
        return this.options.flop = n0.bool(A) ? A : !0, this
    }

    function _P6(A, B) {
        let Q = [].concat(...A);
        if (Q.length === 4 && Q.every(n0.number)) this.options.affineMatrix = Q;
        else throw n0.invalidParameterError("matrix", "1x4 or 2x2 array", A);
        if (n0.defined(B))
            if (n0.object(B)) {
                if (this._setBackgroundColourOption("affineBackground", B.background), n0.defined(B.idx))
                    if (n0.number(B.idx)) this.options.affineIdx = B.idx;
                    else throw n0.invalidParameterError("options.idx", "number", B.idx);
                if (n0.defined(B.idy))
                    if (n0.number(B.idy)) this.options.affineIdy = B.idy;
                    else throw n0.invalidParameterError("options.idy", "number", B.idy);
                if (n0.defined(B.odx))
                    if (n0.number(B.odx)) this.options.affineOdx = B.odx;
                    else throw n0.invalidParameterError("options.odx", "number", B.odx);
                if (n0.defined(B.ody))
                    if (n0.number(B.ody)) this.options.affineOdy = B.ody;
                    else throw n0.invalidParameterError("options.ody", "number", B.ody);
                if (n0.defined(B.interpolator))
                    if (n0.inArray(B.interpolator, Object.values(this.constructor.interpolators))) this.options.affineInterpolator = B.interpolator;
                    else throw n0.invalidParameterError("options.interpolator", "valid interpolator name", B.interpolator)
            } else throw n0.invalidParameterError("options", "object", B);
        return this
    }

    function xP6(A, B, Q) {
        if (!n0.defined(A)) this.options.sharpenSigma = -1;
        else if (n0.bool(A)) this.options.sharpenSigma = A ? -1 : 0;
        else if (n0.number(A) && n0.inRange(A, 0.01, 1e4)) {
            if (this.options.sharpenSigma = A, n0.defined(B))
                if (n0.number(B) && n0.inRange(B, 0, 1e4)) this.options.sharpenM1 = B;
                else throw n0.invalidParameterError("flat", "number between 0 and 10000", B);
            if (n0.defined(Q))
                if (n0.number(Q) && n0.inRange(Q, 0, 1e4)) this.options.sharpenM2 = Q;
                else throw n0.invalidParameterError("jagged", "number between 0 and 10000", Q)
        } else if (n0.plainObject(A)) {
            if (n0.number(A.sigma) && n0.inRange(A.sigma, 0.000001, 10)) this.options.sharpenSigma = A.sigma;
            else throw n0.invalidParameterError("options.sigma", "number between 0.000001 and 10", A.sigma);
            if (n0.defined(A.m1))
                if (n0.number(A.m1) && n0.inRange(A.m1, 0, 1e6)) this.options.sharpenM1 = A.m1;
                else throw n0.invalidParameterError("options.m1", "number between 0 and 1000000", A.m1);
            if (n0.defined(A.m2))
                if (n0.number(A.m2) && n0.inRange(A.m2, 0, 1e6)) this.options.sharpenM2 = A.m2;
                else throw n0.invalidParameterError("options.m2", "number between 0 and 1000000", A.m2);
            if (n0.defined(A.x1))
                if (n0.number(A.x1) && n0.inRange(A.x1, 0, 1e6)) this.options.sharpenX1 = A.x1;
                else throw n0.invalidParameterError("options.x1", "number between 0 and 1000000", A.x1);
            if (n0.defined(A.y2))
                if (n0.number(A.y2) && n0.inRange(A.y2, 0, 1e6)) this.options.sharpenY2 = A.y2;
                else throw n0.invalidParameterError("options.y2", "number between 0 and 1000000", A.y2);
            if (n0.defined(A.y3))
                if (n0.number(A.y3) && n0.inRange(A.y3, 0, 1e6)) this.options.sharpenY3 = A.y3;
                else throw n0.invalidParameterError("options.y3", "number between 0 and 1000000", A.y3)
        } else throw n0.invalidParameterError("sigma", "number between 0.01 and 10000", A);
        return this
    }

    function vP6(A) {
        if (!n0.defined(A)) this.options.medianSize = 3;
        else if (n0.integer(A) && n0.inRange(A, 1, 1000)) this.options.medianSize = A;
        else throw n0.invalidParameterError("size", "integer between 1 and 1000", A);
        return this
    }

    function bP6(A) {
        let B;
        if (n0.number(A)) B = A;
        else if (n0.plainObject(A)) {
            if (!n0.number(A.sigma)) throw n0.invalidParameterError("options.sigma", "number between 0.3 and 1000", B);
            if (B = A.sigma, "precision" in A)
                if (n0.string(U8B[A.precision])) this.options.precision = U8B[A.precision];
                else throw n0.invalidParameterError("precision", "one of: integer, float, approximate", A.precision);
            if ("minAmplitude" in A)
                if (n0.number(A.minAmplitude) && n0.inRange(A.minAmplitude, 0.001, 1)) this.options.minAmpl = A.minAmplitude;
                else throw n0.invalidParameterError("minAmplitude", "number between 0.001 and 1", A.minAmplitude)
        }
        if (!n0.defined(A)) this.options.blurSigma = -1;
        else if (n0.bool(A)) this.options.blurSigma = A ? -1 : 0;
        else if (n0.number(B) && n0.inRange(B, 0.3, 1000)) this.options.blurSigma = B;
        else throw n0.invalidParameterError("sigma", "number between 0.3 and 1000", B);
        return this
    }

    function fP6(A) {
        if (this.options.flatten = n0.bool(A) ? A : !0, n0.object(A)) this._setBackgroundColourOption("flattenBackground", A.background);
        return this
    }

    function hP6() {
        return this.options.unflatten = !0, this
    }

    function gP6(A, B) {
        if (!n0.defined(A)) this.options.gamma = 2.2;
        else if (n0.number(A) && n0.inRange(A, 1, 3)) this.options.gamma = A;
        else throw n0.invalidParameterError("gamma", "number between 1.0 and 3.0", A);
        if (!n0.defined(B)) this.options.gammaOut = this.options.gamma;
        else if (n0.number(B) && n0.inRange(B, 1, 3)) this.options.gammaOut = B;
        else throw n0.invalidParameterError("gammaOut", "number between 1.0 and 3.0", B);
        return this
    }

    function uP6(A) {
        if (this.options.negate = n0.bool(A) ? A : !0, n0.plainObject(A) && "alpha" in A)
            if (!n0.bool(A.alpha)) throw n0.invalidParameterError("alpha", "should be boolean value", A.alpha);
            else this.options.negateAlpha = A.alpha;
        return this
    }

    function mP6(A) {
        if (n0.plainObject(A)) {
            if (n0.defined(A.lower))
                if (n0.number(A.lower) && n0.inRange(A.lower, 0, 99)) this.options.normaliseLower = A.lower;
                else throw n0.invalidParameterError("lower", "number between 0 and 99", A.lower);
            if (n0.defined(A.upper))
                if (n0.number(A.upper) && n0.inRange(A.upper, 1, 100)) this.options.normaliseUpper = A.upper;
                else throw n0.invalidParameterError("upper", "number between 1 and 100", A.upper)
        }
        if (this.options.normaliseLower >= this.options.normaliseUpper) throw n0.invalidParameterError("range", "lower to be less than upper", `${this.options.normaliseLower} >= ${this.options.normaliseUpper}`);
        return this.options.normalise = !0, this
    }

    function dP6(A) {
        return this.normalise(A)
    }

    function cP6(A) {
        if (n0.plainObject(A)) {
            if (n0.integer(A.width) && A.width > 0) this.options.claheWidth = A.width;
            else throw n0.invalidParameterError("width", "integer greater than zero", A.width);
            if (n0.integer(A.height) && A.height > 0) this.options.claheHeight = A.height;
            else throw n0.invalidParameterError("height", "integer greater than zero", A.height);
            if (n0.defined(A.maxSlope))
                if (n0.integer(A.maxSlope) && n0.inRange(A.maxSlope, 0, 100)) this.options.claheMaxSlope = A.maxSlope;
                else throw n0.invalidParameterError("maxSlope", "integer between 0 and 100", A.maxSlope)
        } else throw n0.invalidParameterError("options", "plain object", A);
        return this
    }

    function lP6(A) {
        if (!n0.object(A) || !Array.isArray(A.kernel) || !n0.integer(A.width) || !n0.integer(A.height) || !n0.inRange(A.width, 3, 1001) || !n0.inRange(A.height, 3, 1001) || A.height * A.width !== A.kernel.length) throw new Error("Invalid convolution kernel");
        if (!n0.integer(A.scale)) A.scale = A.kernel.reduce(function(B, Q) {
            return B + Q
        }, 0);
        if (A.scale < 1) A.scale = 1;
        if (!n0.integer(A.offset)) A.offset = 0;
        return this.options.convKernel = A, this
    }

    function pP6(A, B) {
        if (!n0.defined(A)) this.options.threshold = 128;
        else if (n0.bool(A)) this.options.threshold = A ? 128 : 0;
        else if (n0.integer(A) && n0.inRange(A, 0, 255)) this.options.threshold = A;
        else throw n0.invalidParameterError("threshold", "integer between 0 and 255", A);
        if (!n0.object(B) || B.greyscale === !0 || B.grayscale === !0) this.options.thresholdGrayscale = !0;
        else this.options.thresholdGrayscale = !1;
        return this
    }

    function iP6(A, B, Q) {
        if (this.options.boolean = this._createInputDescriptor(A, Q), n0.string(B) && n0.inArray(B, ["and", "or", "eor"])) this.options.booleanOp = B;
        else throw n0.invalidParameterError("operator", "one of: and, or, eor", B);
        return this
    }

    function nP6(A, B) {
        if (!n0.defined(A) && n0.number(B)) A = 1;
        else if (n0.number(A) && !n0.defined(B)) B = 0;
        if (!n0.defined(A)) this.options.linearA = [];
        else if (n0.number(A)) this.options.linearA = [A];
        else if (Array.isArray(A) && A.length && A.every(n0.number)) this.options.linearA = A;
        else throw n0.invalidParameterError("a", "number or array of numbers", A);
        if (!n0.defined(B)) this.options.linearB = [];
        else if (n0.number(B)) this.options.linearB = [B];
        else if (Array.isArray(B) && B.length && B.every(n0.number)) this.options.linearB = B;
        else throw n0.invalidParameterError("b", "number or array of numbers", B);
        if (this.options.linearA.length !== this.options.linearB.length) throw new Error("Expected a and b to be arrays of the same length");
        return this
    }

    function aP6(A) {
        if (!Array.isArray(A)) throw n0.invalidParameterError("inputMatrix", "array", A);
        if (A.length !== 3 && A.length !== 4) throw n0.invalidParameterError("inputMatrix", "3x3 or 4x4 array", A.length);
        let B = A.flat().map(Number);
        if (B.length !== 9 && B.length !== 16) throw n0.invalidParameterError("inputMatrix", "cardinality of 9 or 16", B.length);
        return this.options.recombMatrix = B, this
    }

    function sP6(A) {
        if (!n0.plainObject(A)) throw n0.invalidParameterError("options", "plain object", A);
        if ("brightness" in A)
            if (n0.number(A.brightness) && A.brightness >= 0) this.options.brightness = A.brightness;
            else throw n0.invalidParameterError("brightness", "number above zero", A.brightness);
        if ("saturation" in A)
            if (n0.number(A.saturation) && A.saturation >= 0) this.options.saturation = A.saturation;
            else throw n0.invalidParameterError("saturation", "number above zero", A.saturation);
        if ("hue" in A)
            if (n0.integer(A.hue)) this.options.hue = A.hue % 360;
            else throw n0.invalidParameterError("hue", "number", A.hue);
        if ("lightness" in A)
            if (n0.number(A.lightness)) this.options.lightness = A.lightness;
            else throw n0.invalidParameterError("lightness", "number", A.lightness);
        return this
    }
    w8B.exports = function(A) {
        Object.assign(A.prototype, {
            rotate: jP6,
            flip: kP6,
            flop: yP6,
            affine: _P6,
            sharpen: xP6,
            median: vP6,
            blur: bP6,
            flatten: fP6,
            unflatten: hP6,
            gamma: gP6,
            negate: uP6,
            normalise: mP6,
            normalize: dP6,
            clahe: cP6,
            convolve: lP6,
            threshold: pP6,
            boolean: iP6,
            linear: nP6,
            recomb: aP6,
            modulate: sP6
        })
    }
});
var L8B = E((Ko5, N8B) => {
    var rP6 = Sj1(),
        hP = NM(),
        q8B = {
            multiband: "multiband",
            "b-w": "b-w",
            bw: "b-w",
            cmyk: "cmyk",
            srgb: "srgb"
        };

    function oP6(A) {
        return this._setBackgroundColourOption("tint", A), this
    }

    function tP6(A) {
        return this.options.greyscale = hP.bool(A) ? A : !0, this
    }

    function eP6(A) {
        return this.greyscale(A)
    }

    function AS6(A) {
        if (!hP.string(A)) throw hP.invalidParameterError("colourspace", "string", A);
        return this.options.colourspacePipeline = A, this
    }

    function BS6(A) {
        return this.pipelineColourspace(A)
    }

    function QS6(A) {
        if (!hP.string(A)) throw hP.invalidParameterError("colourspace", "string", A);
        return this.options.colourspace = A, this
    }

    function ZS6(A) {
        return this.toColourspace(A)
    }

    function DS6(A, B) {
        if (hP.defined(B))
            if (hP.object(B) || hP.string(B)) {
                let Q = rP6(B);
                this.options[A] = [Q.red(), Q.green(), Q.blue(), Math.round(Q.alpha() * 255)]
            } else throw hP.invalidParameterError("background", "object or string", B)
    }
    N8B.exports = function(A) {
        Object.assign(A.prototype, {
            tint: oP6,
            greyscale: tP6,
            grayscale: eP6,
            pipelineColourspace: AS6,
            pipelineColorspace: BS6,
            toColourspace: QS6,
            toColorspace: ZS6,
            _setBackgroundColourOption: DS6
        }), A.colourspace = q8B, A.colorspace = q8B
    }
});
var R8B = E((Ho5, M8B) => {
    var OM = NM(),
        GS6 = {
            and: "and",
            or: "or",
            eor: "eor"
        };

    function FS6() {
        return this.options.removeAlpha = !0, this
    }

    function IS6(A) {
        if (OM.defined(A))
            if (OM.number(A) && OM.inRange(A, 0, 1)) this.options.ensureAlpha = A;
            else throw OM.invalidParameterError("alpha", "number between 0 and 1", A);
        else this.options.ensureAlpha = 1;
        return this
    }

    function YS6(A) {
        let B = {
            red: 0,
            green: 1,
            blue: 2,
            alpha: 3
        };
        if (Object.keys(B).includes(A)) A = B[A];
        if (OM.integer(A) && OM.inRange(A, 0, 4)) this.options.extractChannel = A;
        else throw OM.invalidParameterError("channel", "integer or one of: red, green, blue, alpha", A);
        return this
    }

    function WS6(A, B) {
        if (Array.isArray(A)) A.forEach(function(Q) {
            this.options.joinChannelIn.push(this._createInputDescriptor(Q, B))
        }, this);
        else this.options.joinChannelIn.push(this._createInputDescriptor(A, B));
        return this
    }

    function JS6(A) {
        if (OM.string(A) && OM.inArray(A, ["and", "or", "eor"])) this.options.bandBoolOp = A;
        else throw OM.invalidParameterError("boolOp", "one of: and, or, eor", A);
        return this
    }
    M8B.exports = function(A) {
        Object.assign(A.prototype, {
            removeAlpha: FS6,
            ensureAlpha: IS6,
            extractChannel: YS6,
            joinChannel: WS6,
            bandbool: JS6
        }), A.bool = GS6
    }
});