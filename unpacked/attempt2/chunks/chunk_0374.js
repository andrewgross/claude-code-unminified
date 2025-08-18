/* chunk:374 bytes:[8721298, 8736235) size:14937 source:unpacked-cli.js */
var W8B = E((Jo5, Y8B) => {
    var KP6 = Sj1(),
        IA = NM(),
        xx = DZ1(),
        HP6 = {
            left: "low",
            center: "centre",
            centre: "centre",
            right: "high"
        };

    function I8B(A) {
        let {
            raw: B,
            density: Q,
            limitInputPixels: Z,
            ignoreIcc: D,
            unlimited: G,
            sequentialRead: F,
            failOn: I,
            failOnError: Y,
            animated: W,
            page: J,
            pages: X,
            subifd: V
        } = A;
        return [B, Q, Z, D, G, F, I, Y, W, J, X, V].some(IA.defined) ? {
            raw: B,
            density: Q,
            limitInputPixels: Z,
            ignoreIcc: D,
            unlimited: G,
            sequentialRead: F,
            failOn: I,
            failOnError: Y,
            animated: W,
            page: J,
            pages: X,
            subifd: V
        } : void 0
    }

    function zP6(A, B, Q) {
        let Z = {
            failOn: "warning",
            limitInputPixels: Math.pow(16383, 2),
            ignoreIcc: !1,
            unlimited: !1,
            sequentialRead: !0
        };
        if (IA.string(A)) Z.file = A;
        else if (IA.buffer(A)) {
            if (A.length === 0) throw Error("Input Buffer is empty");
            Z.buffer = A
        } else if (IA.arrayBuffer(A)) {
            if (A.byteLength === 0) throw Error("Input bit Array is empty");
            Z.buffer = Buffer.from(A, 0, A.byteLength)
        } else if (IA.typedArray(A)) {
            if (A.length === 0) throw Error("Input Bit Array is empty");
            Z.buffer = Buffer.from(A.buffer, A.byteOffset, A.byteLength)
        } else if (IA.plainObject(A) && !IA.defined(B)) {
            if (B = A, I8B(B)) Z.buffer = []
        } else if (!IA.defined(A) && !IA.defined(B) && IA.object(Q) && Q.allowStream) Z.buffer = [];
        else throw new Error(`Unsupported input '${A}' of type ${typeof A}${IA.defined(B)?` when also providing options of type ${typeof B}`:""}`);
        if (IA.object(B)) {
            if (IA.defined(B.failOnError))
                if (IA.bool(B.failOnError)) Z.failOn = B.failOnError ? "warning" : "none";
                else throw IA.invalidParameterError("failOnError", "boolean", B.failOnError);
            if (IA.defined(B.failOn))
                if (IA.string(B.failOn) && IA.inArray(B.failOn, ["none", "truncated", "error", "warning"])) Z.failOn = B.failOn;
                else throw IA.invalidParameterError("failOn", "one of: none, truncated, error, warning", B.failOn);
            if (IA.defined(B.density))
                if (IA.inRange(B.density, 1, 1e5)) Z.density = B.density;
                else throw IA.invalidParameterError("density", "number between 1 and 100000", B.density);
            if (IA.defined(B.ignoreIcc))
                if (IA.bool(B.ignoreIcc)) Z.ignoreIcc = B.ignoreIcc;
                else throw IA.invalidParameterError("ignoreIcc", "boolean", B.ignoreIcc);
            if (IA.defined(B.limitInputPixels))
                if (IA.bool(B.limitInputPixels)) Z.limitInputPixels = B.limitInputPixels ? Math.pow(16383, 2) : 0;
                else if (IA.integer(B.limitInputPixels) && IA.inRange(B.limitInputPixels, 0, Number.MAX_SAFE_INTEGER)) Z.limitInputPixels = B.limitInputPixels;
            else throw IA.invalidParameterError("limitInputPixels", "positive integer", B.limitInputPixels);
            if (IA.defined(B.unlimited))
                if (IA.bool(B.unlimited)) Z.unlimited = B.unlimited;
                else throw IA.invalidParameterError("unlimited", "boolean", B.unlimited);
            if (IA.defined(B.sequentialRead))
                if (IA.bool(B.sequentialRead)) Z.sequentialRead = B.sequentialRead;
                else throw IA.invalidParameterError("sequentialRead", "boolean", B.sequentialRead);
            if (IA.defined(B.raw))
                if (IA.object(B.raw) && IA.integer(B.raw.width) && B.raw.width > 0 && IA.integer(B.raw.height) && B.raw.height > 0 && IA.integer(B.raw.channels) && IA.inRange(B.raw.channels, 1, 4)) switch (Z.rawWidth = B.raw.width, Z.rawHeight = B.raw.height, Z.rawChannels = B.raw.channels, Z.rawPremultiplied = !!B.raw.premultiplied, A.constructor) {
                    case Uint8Array:
                    case Uint8ClampedArray:
                        Z.rawDepth = "uchar";
                        break;
                    case Int8Array:
                        Z.rawDepth = "char";
                        break;
                    case Uint16Array:
                        Z.rawDepth = "ushort";
                        break;
                    case Int16Array:
                        Z.rawDepth = "short";
                        break;
                    case Uint32Array:
                        Z.rawDepth = "uint";
                        break;
                    case Int32Array:
                        Z.rawDepth = "int";
                        break;
                    case Float32Array:
                        Z.rawDepth = "float";
                        break;
                    case Float64Array:
                        Z.rawDepth = "double";
                        break;
                    default:
                        Z.rawDepth = "uchar";
                        break
                } else throw new Error("Expected width, height and channels for raw pixel input");
            if (IA.defined(B.animated))
                if (IA.bool(B.animated)) Z.pages = B.animated ? -1 : 1;
                else throw IA.invalidParameterError("animated", "boolean", B.animated);
            if (IA.defined(B.pages))
                if (IA.integer(B.pages) && IA.inRange(B.pages, -1, 1e5)) Z.pages = B.pages;
                else throw IA.invalidParameterError("pages", "integer between -1 and 100000", B.pages);
            if (IA.defined(B.page))
                if (IA.integer(B.page) && IA.inRange(B.page, 0, 1e5)) Z.page = B.page;
                else throw IA.invalidParameterError("page", "integer between 0 and 100000", B.page);
            if (IA.defined(B.level))
                if (IA.integer(B.level) && IA.inRange(B.level, 0, 256)) Z.level = B.level;
                else throw IA.invalidParameterError("level", "integer between 0 and 256", B.level);
            if (IA.defined(B.subifd))
                if (IA.integer(B.subifd) && IA.inRange(B.subifd, -1, 1e5)) Z.subifd = B.subifd;
                else throw IA.invalidParameterError("subifd", "integer between -1 and 100000", B.subifd);
            if (IA.defined(B.create))
                if (IA.object(B.create) && IA.integer(B.create.width) && B.create.width > 0 && IA.integer(B.create.height) && B.create.height > 0 && IA.integer(B.create.channels)) {
                    if (Z.createWidth = B.create.width, Z.createHeight = B.create.height, Z.createChannels = B.create.channels, IA.defined(B.create.noise)) {
                        if (!IA.object(B.create.noise)) throw new Error("Expected noise to be an object");
                        if (!IA.inArray(B.create.noise.type, ["gaussian"])) throw new Error("Only gaussian noise is supported at the moment");
                        if (!IA.inRange(B.create.channels, 1, 4)) throw IA.invalidParameterError("create.channels", "number between 1 and 4", B.create.channels);
                        if (Z.createNoiseType = B.create.noise.type, IA.number(B.create.noise.mean) && IA.inRange(B.create.noise.mean, 0, 1e4)) Z.createNoiseMean = B.create.noise.mean;
                        else throw IA.invalidParameterError("create.noise.mean", "number between 0 and 10000", B.create.noise.mean);
                        if (IA.number(B.create.noise.sigma) && IA.inRange(B.create.noise.sigma, 0, 1e4)) Z.createNoiseSigma = B.create.noise.sigma;
                        else throw IA.invalidParameterError("create.noise.sigma", "number between 0 and 10000", B.create.noise.sigma)
                    } else if (IA.defined(B.create.background)) {
                        if (!IA.inRange(B.create.channels, 3, 4)) throw IA.invalidParameterError("create.channels", "number between 3 and 4", B.create.channels);
                        let D = KP6(B.create.background);
                        Z.createBackground = [D.red(), D.green(), D.blue(), Math.round(D.alpha() * 255)]
                    } else throw new Error("Expected valid noise or background to create a new input image");
                    delete Z.buffer
                } else throw new Error("Expected valid width, height and channels to create a new input image");
            if (IA.defined(B.text))
                if (IA.object(B.text) && IA.string(B.text.text)) {
                    if (Z.textValue = B.text.text, IA.defined(B.text.height) && IA.defined(B.text.dpi)) throw new Error("Expected only one of dpi or height");
                    if (IA.defined(B.text.font))
                        if (IA.string(B.text.font)) Z.textFont = B.text.font;
                        else throw IA.invalidParameterError("text.font", "string", B.text.font);
                    if (IA.defined(B.text.fontfile))
                        if (IA.string(B.text.fontfile)) Z.textFontfile = B.text.fontfile;
                        else throw IA.invalidParameterError("text.fontfile", "string", B.text.fontfile);
                    if (IA.defined(B.text.width))
                        if (IA.integer(B.text.width) && B.text.width > 0) Z.textWidth = B.text.width;
                        else throw IA.invalidParameterError("text.width", "positive integer", B.text.width);
                    if (IA.defined(B.text.height))
                        if (IA.integer(B.text.height) && B.text.height > 0) Z.textHeight = B.text.height;
                        else throw IA.invalidParameterError("text.height", "positive integer", B.text.height);
                    if (IA.defined(B.text.align))
                        if (IA.string(B.text.align) && IA.string(this.constructor.align[B.text.align])) Z.textAlign = this.constructor.align[B.text.align];
                        else throw IA.invalidParameterError("text.align", "valid alignment", B.text.align);
                    if (IA.defined(B.text.justify))
                        if (IA.bool(B.text.justify)) Z.textJustify = B.text.justify;
                        else throw IA.invalidParameterError("text.justify", "boolean", B.text.justify);
                    if (IA.defined(B.text.dpi))
                        if (IA.integer(B.text.dpi) && IA.inRange(B.text.dpi, 1, 1e6)) Z.textDpi = B.text.dpi;
                        else throw IA.invalidParameterError("text.dpi", "integer between 1 and 1000000", B.text.dpi);
                    if (IA.defined(B.text.rgba))
                        if (IA.bool(B.text.rgba)) Z.textRgba = B.text.rgba;
                        else throw IA.invalidParameterError("text.rgba", "bool", B.text.rgba);
                    if (IA.defined(B.text.spacing))
                        if (IA.integer(B.text.spacing) && IA.inRange(B.text.spacing, -1e6, 1e6)) Z.textSpacing = B.text.spacing;
                        else throw IA.invalidParameterError("text.spacing", "integer between -1000000 and 1000000", B.text.spacing);
                    if (IA.defined(B.text.wrap))
                        if (IA.string(B.text.wrap) && IA.inArray(B.text.wrap, ["word", "char", "word-char", "none"])) Z.textWrap = B.text.wrap;
                        else throw IA.invalidParameterError("text.wrap", "one of: word, char, word-char, none", B.text.wrap);
                    delete Z.buffer
                } else throw new Error("Expected a valid string to create an image with text.")
        } else if (IA.defined(B)) throw new Error("Invalid input options " + B);
        return Z
    }

    function EP6(A, B, Q) {
        if (Array.isArray(this.options.input.buffer))
            if (IA.buffer(A)) {
                if (this.options.input.buffer.length === 0) this.on("finish", () => {
                    this.streamInFinished = !0
                });
                this.options.input.buffer.push(A), Q()
            } else Q(new Error("Non-Buffer data on Writable Stream"));
        else Q(new Error("Unexpected data on Writable Stream"))
    }

    function UP6() {
        if (this._isStreamInput()) this.options.input.buffer = Buffer.concat(this.options.input.buffer)
    }

    function wP6() {
        return Array.isArray(this.options.input.buffer)
    }

    function $P6(A) {
        let B = Error();
        if (IA.fn(A)) {
            if (this._isStreamInput()) this.on("finish", () => {
                this._flattenBufferIn(), xx.metadata(this.options, (Q, Z) => {
                    if (Q) A(IA.nativeError(Q, B));
                    else A(null, Z)
                })
            });
            else xx.metadata(this.options, (Q, Z) => {
                if (Q) A(IA.nativeError(Q, B));
                else A(null, Z)
            });
            return this
        } else if (this._isStreamInput()) return new Promise((Q, Z) => {
            let D = () => {
                this._flattenBufferIn(), xx.metadata(this.options, (G, F) => {
                    if (G) Z(IA.nativeError(G, B));
                    else Q(F)
                })
            };
            if (this.writableFinished) D();
            else this.once("finish", D)
        });
        else return new Promise((Q, Z) => {
            xx.metadata(this.options, (D, G) => {
                if (D) Z(IA.nativeError(D, B));
                else Q(G)
            })
        })
    }

    function qP6(A) {
        let B = Error();
        if (IA.fn(A)) {
            if (this._isStreamInput()) this.on("finish", () => {
                this._flattenBufferIn(), xx.stats(this.options, (Q, Z) => {
                    if (Q) A(IA.nativeError(Q, B));
                    else A(null, Z)
                })
            });
            else xx.stats(this.options, (Q, Z) => {
                if (Q) A(IA.nativeError(Q, B));
                else A(null, Z)
            });
            return this
        } else if (this._isStreamInput()) return new Promise((Q, Z) => {
            this.on("finish", function() {
                this._flattenBufferIn(), xx.stats(this.options, (D, G) => {
                    if (D) Z(IA.nativeError(D, B));
                    else Q(G)
                })
            })
        });
        else return new Promise((Q, Z) => {
            xx.stats(this.options, (D, G) => {
                if (D) Z(IA.nativeError(D, B));
                else Q(G)
            })
        })
    }
    Y8B.exports = function(A) {
        Object.assign(A.prototype, {
            _inputOptionsFromObject: I8B,
            _createInputDescriptor: zP6,
            _write: EP6,
            _flattenBufferIn: UP6,
            _isStreamInput: wP6,
            metadata: $P6,
            stats: qP6
        }), A.align = HP6
    }
});