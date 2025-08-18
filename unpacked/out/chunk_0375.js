/* chunk:375 bytes:[8736236, 8746887) size:10651 source:unpacked-cli.js */
var H8B = E((Xo5, K8B) => {
    var M9 = NM(),
        X8B = {
            center: 0,
            centre: 0,
            north: 1,
            east: 2,
            south: 3,
            west: 4,
            northeast: 5,
            southeast: 6,
            southwest: 7,
            northwest: 8
        },
        V8B = {
            top: 1,
            right: 2,
            bottom: 3,
            left: 4,
            "right top": 5,
            "right bottom": 6,
            "left bottom": 7,
            "left top": 8
        },
        J8B = {
            background: "background",
            copy: "copy",
            repeat: "repeat",
            mirror: "mirror"
        },
        C8B = {
            entropy: 16,
            attention: 17
        },
        IK0 = {
            nearest: "nearest",
            linear: "linear",
            cubic: "cubic",
            mitchell: "mitchell",
            lanczos2: "lanczos2",
            lanczos3: "lanczos3"
        },
        NP6 = {
            contain: "contain",
            cover: "cover",
            fill: "fill",
            inside: "inside",
            outside: "outside"
        },
        LP6 = {
            contain: "embed",
            cover: "crop",
            fill: "ignore_aspect",
            inside: "max",
            outside: "min"
        };

    function YK0(A) {
        return A.angle % 360 !== 0 || A.useExifOrientation === !0 || A.rotationAngle !== 0
    }

    function jj1(A) {
        return A.width !== -1 || A.height !== -1
    }

    function MP6(A, B, Q) {
        if (jj1(this.options)) this.options.debuglog("ignoring previous resize options");
        if (this.options.widthPost !== -1) this.options.debuglog("operation order will be: extract, resize, extract");
        if (M9.defined(A))
            if (M9.object(A) && !M9.defined(Q)) Q = A;
            else if (M9.integer(A) && A > 0) this.options.width = A;
        else throw M9.invalidParameterError("width", "positive integer", A);
        else this.options.width = -1;
        if (M9.defined(B))
            if (M9.integer(B) && B > 0) this.options.height = B;
            else throw M9.invalidParameterError("height", "positive integer", B);
        else this.options.height = -1;
        if (M9.object(Q)) {
            if (M9.defined(Q.width))
                if (M9.integer(Q.width) && Q.width > 0) this.options.width = Q.width;
                else throw M9.invalidParameterError("width", "positive integer", Q.width);
            if (M9.defined(Q.height))
                if (M9.integer(Q.height) && Q.height > 0) this.options.height = Q.height;
                else throw M9.invalidParameterError("height", "positive integer", Q.height);
            if (M9.defined(Q.fit)) {
                let Z = LP6[Q.fit];
                if (M9.string(Z)) this.options.canvas = Z;
                else throw M9.invalidParameterError("fit", "valid fit", Q.fit)
            }
            if (M9.defined(Q.position)) {
                let Z = M9.integer(Q.position) ? Q.position : C8B[Q.position] || V8B[Q.position] || X8B[Q.position];
                if (M9.integer(Z) && (M9.inRange(Z, 0, 8) || M9.inRange(Z, 16, 17))) this.options.position = Z;
                else throw M9.invalidParameterError("position", "valid position/gravity/strategy", Q.position)
            }
            if (this._setBackgroundColourOption("resizeBackground", Q.background), M9.defined(Q.kernel))
                if (M9.string(IK0[Q.kernel])) this.options.kernel = IK0[Q.kernel];
                else throw M9.invalidParameterError("kernel", "valid kernel name", Q.kernel);
            if (M9.defined(Q.withoutEnlargement)) this._setBooleanOption("withoutEnlargement", Q.withoutEnlargement);
            if (M9.defined(Q.withoutReduction)) this._setBooleanOption("withoutReduction", Q.withoutReduction);
            if (M9.defined(Q.fastShrinkOnLoad)) this._setBooleanOption("fastShrinkOnLoad", Q.fastShrinkOnLoad)
        }
        if (YK0(this.options) && jj1(this.options)) this.options.rotateBeforePreExtract = !0;
        return this
    }

    function RP6(A) {
        if (M9.integer(A) && A > 0) this.options.extendTop = A, this.options.extendBottom = A, this.options.extendLeft = A, this.options.extendRight = A;
        else if (M9.object(A)) {
            if (M9.defined(A.top))
                if (M9.integer(A.top) && A.top >= 0) this.options.extendTop = A.top;
                else throw M9.invalidParameterError("top", "positive integer", A.top);
            if (M9.defined(A.bottom))
                if (M9.integer(A.bottom) && A.bottom >= 0) this.options.extendBottom = A.bottom;
                else throw M9.invalidParameterError("bottom", "positive integer", A.bottom);
            if (M9.defined(A.left))
                if (M9.integer(A.left) && A.left >= 0) this.options.extendLeft = A.left;
                else throw M9.invalidParameterError("left", "positive integer", A.left);
            if (M9.defined(A.right))
                if (M9.integer(A.right) && A.right >= 0) this.options.extendRight = A.right;
                else throw M9.invalidParameterError("right", "positive integer", A.right);
            if (this._setBackgroundColourOption("extendBackground", A.background), M9.defined(A.extendWith))
                if (M9.string(J8B[A.extendWith])) this.options.extendWith = J8B[A.extendWith];
                else throw M9.invalidParameterError("extendWith", "one of: background, copy, repeat, mirror", A.extendWith)
        } else throw M9.invalidParameterError("extend", "integer or object", A);
        return this
    }

    function OP6(A) {
        let B = jj1(this.options) || this.options.widthPre !== -1 ? "Post" : "Pre";
        if (this.options[`width${B}`] !== -1) this.options.debuglog("ignoring previous extract options");
        if (["left", "top", "width", "height"].forEach(function(Q) {
                let Z = A[Q];
                if (M9.integer(Z) && Z >= 0) this.options[Q + (Q === "left" || Q === "top" ? "Offset" : "") + B] = Z;
                else throw M9.invalidParameterError(Q, "integer", Z)
            }, this), YK0(this.options) && !jj1(this.options)) {
            if (this.options.widthPre === -1 || this.options.widthPost === -1) this.options.rotateBeforePreExtract = !0
        }
        return this
    }

    function TP6(A) {
        if (this.options.trimThreshold = 10, M9.defined(A))
            if (M9.object(A)) {
                if (M9.defined(A.background)) this._setBackgroundColourOption("trimBackground", A.background);
                if (M9.defined(A.threshold))
                    if (M9.number(A.threshold) && A.threshold >= 0) this.options.trimThreshold = A.threshold;
                    else throw M9.invalidParameterError("threshold", "positive number", A.threshold);
                if (M9.defined(A.lineArt)) this._setBooleanOption("trimLineArt", A.lineArt)
            } else throw M9.invalidParameterError("trim", "object", A);
        if (YK0(this.options)) this.options.rotateBeforePreExtract = !0;
        return this
    }
    K8B.exports = function(A) {
        Object.assign(A.prototype, {
            resize: MP6,
            extend: RP6,
            extract: OP6,
            trim: TP6
        }), A.gravity = X8B, A.strategy = C8B, A.kernel = IK0, A.fit = NP6, A.position = V8B
    }
});
var E8B = E((Vo5, z8B) => {
    var K3 = NM(),
        WK0 = {
            clear: "clear",
            source: "source",
            over: "over",
            in: "in",
            out: "out",
            atop: "atop",
            dest: "dest",
            "dest-over": "dest-over",
            "dest-in": "dest-in",
            "dest-out": "dest-out",
            "dest-atop": "dest-atop",
            xor: "xor",
            add: "add",
            saturate: "saturate",
            multiply: "multiply",
            screen: "screen",
            overlay: "overlay",
            darken: "darken",
            lighten: "lighten",
            "colour-dodge": "colour-dodge",
            "color-dodge": "colour-dodge",
            "colour-burn": "colour-burn",
            "color-burn": "colour-burn",
            "hard-light": "hard-light",
            "soft-light": "soft-light",
            difference: "difference",
            exclusion: "exclusion"
        };

    function PP6(A) {
        if (!Array.isArray(A)) throw K3.invalidParameterError("images to composite", "array", A);
        return this.options.composite = A.map((B) => {
            if (!K3.object(B)) throw K3.invalidParameterError("image to composite", "object", B);
            let Q = this._inputOptionsFromObject(B),
                Z = {
                    input: this._createInputDescriptor(B.input, Q, {
                        allowStream: !1
                    }),
                    blend: "over",
                    tile: !1,
                    left: 0,
                    top: 0,
                    hasOffset: !1,
                    gravity: 0,
                    premultiplied: !1
                };
            if (K3.defined(B.blend))
                if (K3.string(WK0[B.blend])) Z.blend = WK0[B.blend];
                else throw K3.invalidParameterError("blend", "valid blend name", B.blend);
            if (K3.defined(B.tile))
                if (K3.bool(B.tile)) Z.tile = B.tile;
                else throw K3.invalidParameterError("tile", "boolean", B.tile);
            if (K3.defined(B.left))
                if (K3.integer(B.left)) Z.left = B.left;
                else throw K3.invalidParameterError("left", "integer", B.left);
            if (K3.defined(B.top))
                if (K3.integer(B.top)) Z.top = B.top;
                else throw K3.invalidParameterError("top", "integer", B.top);
            if (K3.defined(B.top) !== K3.defined(B.left)) throw new Error("Expected both left and top to be set");
            else Z.hasOffset = K3.integer(B.top) && K3.integer(B.left);
            if (K3.defined(B.gravity))
                if (K3.integer(B.gravity) && K3.inRange(B.gravity, 0, 8)) Z.gravity = B.gravity;
                else if (K3.string(B.gravity) && K3.integer(this.constructor.gravity[B.gravity])) Z.gravity = this.constructor.gravity[B.gravity];
            else throw K3.invalidParameterError("gravity", "valid gravity", B.gravity);
            if (K3.defined(B.premultiplied))
                if (K3.bool(B.premultiplied)) Z.premultiplied = B.premultiplied;
                else throw K3.invalidParameterError("premultiplied", "boolean", B.premultiplied);
            return Z
        }), this
    }
    z8B.exports = function(A) {
        A.prototype.composite = PP6, A.blend = WK0
    }
});