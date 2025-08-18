/* chunk:377 bytes:[8763487, 8791343) size:27856 source:unpacked-cli.js */
var k8B = E((zo5, j8B) => {
    var JK0 = W1("node:path"),
        p1 = NM(),
        $e = DZ1(),
        O8B = new Map([
            ["heic", "heif"],
            ["heif", "heif"],
            ["avif", "avif"],
            ["jpeg", "jpeg"],
            ["jpg", "jpeg"],
            ["jpe", "jpeg"],
            ["tile", "tile"],
            ["dz", "tile"],
            ["png", "png"],
            ["raw", "raw"],
            ["tiff", "tiff"],
            ["tif", "tiff"],
            ["webp", "webp"],
            ["gif", "gif"],
            ["jp2", "jp2"],
            ["jpx", "jp2"],
            ["j2k", "jp2"],
            ["j2c", "jp2"],
            ["jxl", "jxl"]
        ]),
        XS6 = /\.(jp[2x]|j2[kc])$/i,
        T8B = () => new Error("JP2 output requires libvips with support for OpenJPEG"),
        P8B = (A) => 1 << 31 - Math.clz32(Math.ceil(Math.log2(A)));

    function VS6(A, B) {
        let Q;
        if (!p1.string(A)) Q = new Error("Missing output file path");
        else if (p1.string(this.options.input.file) && JK0.resolve(this.options.input.file) === JK0.resolve(A)) Q = new Error("Cannot use same file for input and output");
        else if (XS6.test(JK0.extname(A)) && !this.constructor.format.jp2k.output.file) Q = T8B();
        if (Q)
            if (p1.fn(B)) B(Q);
            else return Promise.reject(Q);
        else {
            this.options.fileOut = A;
            let Z = Error();
            return this._pipeline(B, Z)
        }
        return this
    }

    function CS6(A, B) {
        if (p1.object(A)) this._setBooleanOption("resolveWithObject", A.resolveWithObject);
        else if (this.options.resolveWithObject) this.options.resolveWithObject = !1;
        this.options.fileOut = "";
        let Q = Error();
        return this._pipeline(p1.fn(A) ? A : B, Q)
    }

    function KS6() {
        return this.options.keepMetadata |= 1, this
    }

    function HS6(A) {
        if (p1.object(A))
            for (let [B, Q] of Object.entries(A))
                if (p1.object(Q))
                    for (let [Z, D] of Object.entries(Q))
                        if (p1.string(D)) this.options.withExif[`exif-${B.toLowerCase()}-${Z}`] = D;
                        else throw p1.invalidParameterError(`${B}.${Z}`, "string", D);
        else throw p1.invalidParameterError(B, "object", Q);
        else throw p1.invalidParameterError("exif", "object", A);
        return this.options.withExifMerge = !1, this.keepExif()
    }

    function zS6(A) {
        return this.withExif(A), this.options.withExifMerge = !0, this
    }

    function ES6() {
        return this.options.keepMetadata |= 8, this
    }

    function US6(A, B) {
        if (p1.string(A)) this.options.withIccProfile = A;
        else throw p1.invalidParameterError("icc", "string", A);
        if (this.keepIccProfile(), p1.object(B)) {
            if (p1.defined(B.attach))
                if (p1.bool(B.attach)) {
                    if (!B.attach) this.options.keepMetadata &= -9
                } else throw p1.invalidParameterError("attach", "boolean", B.attach)
        }
        return this
    }

    function wS6() {
        return this.options.keepMetadata = 31, this
    }

    function $S6(A) {
        if (this.keepMetadata(), this.withIccProfile("srgb"), p1.object(A)) {
            if (p1.defined(A.orientation))
                if (p1.integer(A.orientation) && p1.inRange(A.orientation, 1, 8)) this.options.withMetadataOrientation = A.orientation;
                else throw p1.invalidParameterError("orientation", "integer between 1 and 8", A.orientation);
            if (p1.defined(A.density))
                if (p1.number(A.density) && A.density > 0) this.options.withMetadataDensity = A.density;
                else throw p1.invalidParameterError("density", "positive number", A.density);
            if (p1.defined(A.icc)) this.withIccProfile(A.icc);
            if (p1.defined(A.exif)) this.withExifMerge(A.exif)
        }
        return this
    }

    function qS6(A, B) {
        let Q = O8B.get((p1.object(A) && p1.string(A.id) ? A.id : A).toLowerCase());
        if (!Q) throw p1.invalidParameterError("format", `one of: ${[...O8B.keys()].join(", ")}`, A);
        return this[Q](B)
    }

    function NS6(A) {
        if (p1.object(A)) {
            if (p1.defined(A.quality))
                if (p1.integer(A.quality) && p1.inRange(A.quality, 1, 100)) this.options.jpegQuality = A.quality;
                else throw p1.invalidParameterError("quality", "integer between 1 and 100", A.quality);
            if (p1.defined(A.progressive)) this._setBooleanOption("jpegProgressive", A.progressive);
            if (p1.defined(A.chromaSubsampling))
                if (p1.string(A.chromaSubsampling) && p1.inArray(A.chromaSubsampling, ["4:2:0", "4:4:4"])) this.options.jpegChromaSubsampling = A.chromaSubsampling;
                else throw p1.invalidParameterError("chromaSubsampling", "one of: 4:2:0, 4:4:4", A.chromaSubsampling);
            let B = p1.bool(A.optimizeCoding) ? A.optimizeCoding : A.optimiseCoding;
            if (p1.defined(B)) this._setBooleanOption("jpegOptimiseCoding", B);
            if (p1.defined(A.mozjpeg))
                if (p1.bool(A.mozjpeg)) {
                    if (A.mozjpeg) this.options.jpegTrellisQuantisation = !0, this.options.jpegOvershootDeringing = !0, this.options.jpegOptimiseScans = !0, this.options.jpegProgressive = !0, this.options.jpegQuantisationTable = 3
                } else throw p1.invalidParameterError("mozjpeg", "boolean", A.mozjpeg);
            let Q = p1.bool(A.trellisQuantization) ? A.trellisQuantization : A.trellisQuantisation;
            if (p1.defined(Q)) this._setBooleanOption("jpegTrellisQuantisation", Q);
            if (p1.defined(A.overshootDeringing)) this._setBooleanOption("jpegOvershootDeringing", A.overshootDeringing);
            let Z = p1.bool(A.optimizeScans) ? A.optimizeScans : A.optimiseScans;
            if (p1.defined(Z)) {
                if (this._setBooleanOption("jpegOptimiseScans", Z), Z) this.options.jpegProgressive = !0
            }
            let D = p1.number(A.quantizationTable) ? A.quantizationTable : A.quantisationTable;
            if (p1.defined(D))
                if (p1.integer(D) && p1.inRange(D, 0, 8)) this.options.jpegQuantisationTable = D;
                else throw p1.invalidParameterError("quantisationTable", "integer between 0 and 8", D)
        }
        return this._updateFormatOut("jpeg", A)
    }

    function LS6(A) {
        if (p1.object(A)) {
            if (p1.defined(A.progressive)) this._setBooleanOption("pngProgressive", A.progressive);
            if (p1.defined(A.compressionLevel))
                if (p1.integer(A.compressionLevel) && p1.inRange(A.compressionLevel, 0, 9)) this.options.pngCompressionLevel = A.compressionLevel;
                else throw p1.invalidParameterError("compressionLevel", "integer between 0 and 9", A.compressionLevel);
            if (p1.defined(A.adaptiveFiltering)) this._setBooleanOption("pngAdaptiveFiltering", A.adaptiveFiltering);
            let B = A.colours || A.colors;
            if (p1.defined(B))
                if (p1.integer(B) && p1.inRange(B, 2, 256)) this.options.pngBitdepth = P8B(B);
                else throw p1.invalidParameterError("colours", "integer between 2 and 256", B);
            if (p1.defined(A.palette)) this._setBooleanOption("pngPalette", A.palette);
            else if ([A.quality, A.effort, A.colours, A.colors, A.dither].some(p1.defined)) this._setBooleanOption("pngPalette", !0);
            if (this.options.pngPalette) {
                if (p1.defined(A.quality))
                    if (p1.integer(A.quality) && p1.inRange(A.quality, 0, 100)) this.options.pngQuality = A.quality;
                    else throw p1.invalidParameterError("quality", "integer between 0 and 100", A.quality);
                if (p1.defined(A.effort))
                    if (p1.integer(A.effort) && p1.inRange(A.effort, 1, 10)) this.options.pngEffort = A.effort;
                    else throw p1.invalidParameterError("effort", "integer between 1 and 10", A.effort);
                if (p1.defined(A.dither))
                    if (p1.number(A.dither) && p1.inRange(A.dither, 0, 1)) this.options.pngDither = A.dither;
                    else throw p1.invalidParameterError("dither", "number between 0.0 and 1.0", A.dither)
            }
        }
        return this._updateFormatOut("png", A)
    }

    function MS6(A) {
        if (p1.object(A)) {
            if (p1.defined(A.quality))
                if (p1.integer(A.quality) && p1.inRange(A.quality, 1, 100)) this.options.webpQuality = A.quality;
                else throw p1.invalidParameterError("quality", "integer between 1 and 100", A.quality);
            if (p1.defined(A.alphaQuality))
                if (p1.integer(A.alphaQuality) && p1.inRange(A.alphaQuality, 0, 100)) this.options.webpAlphaQuality = A.alphaQuality;
                else throw p1.invalidParameterError("alphaQuality", "integer between 0 and 100", A.alphaQuality);
            if (p1.defined(A.lossless)) this._setBooleanOption("webpLossless", A.lossless);
            if (p1.defined(A.nearLossless)) this._setBooleanOption("webpNearLossless", A.nearLossless);
            if (p1.defined(A.smartSubsample)) this._setBooleanOption("webpSmartSubsample", A.smartSubsample);
            if (p1.defined(A.preset))
                if (p1.string(A.preset) && p1.inArray(A.preset, ["default", "photo", "picture", "drawing", "icon", "text"])) this.options.webpPreset = A.preset;
                else throw p1.invalidParameterError("preset", "one of: default, photo, picture, drawing, icon, text", A.preset);
            if (p1.defined(A.effort))
                if (p1.integer(A.effort) && p1.inRange(A.effort, 0, 6)) this.options.webpEffort = A.effort;
                else throw p1.invalidParameterError("effort", "integer between 0 and 6", A.effort);
            if (p1.defined(A.minSize)) this._setBooleanOption("webpMinSize", A.minSize);
            if (p1.defined(A.mixed)) this._setBooleanOption("webpMixed", A.mixed)
        }
        return S8B(A, this.options), this._updateFormatOut("webp", A)
    }

    function RS6(A) {
        if (p1.object(A)) {
            if (p1.defined(A.reuse)) this._setBooleanOption("gifReuse", A.reuse);
            if (p1.defined(A.progressive)) this._setBooleanOption("gifProgressive", A.progressive);
            let B = A.colours || A.colors;
            if (p1.defined(B))
                if (p1.integer(B) && p1.inRange(B, 2, 256)) this.options.gifBitdepth = P8B(B);
                else throw p1.invalidParameterError("colours", "integer between 2 and 256", B);
            if (p1.defined(A.effort))
                if (p1.number(A.effort) && p1.inRange(A.effort, 1, 10)) this.options.gifEffort = A.effort;
                else throw p1.invalidParameterError("effort", "integer between 1 and 10", A.effort);
            if (p1.defined(A.dither))
                if (p1.number(A.dither) && p1.inRange(A.dither, 0, 1)) this.options.gifDither = A.dither;
                else throw p1.invalidParameterError("dither", "number between 0.0 and 1.0", A.dither);
            if (p1.defined(A.interFrameMaxError))
                if (p1.number(A.interFrameMaxError) && p1.inRange(A.interFrameMaxError, 0, 32)) this.options.gifInterFrameMaxError = A.interFrameMaxError;
                else throw p1.invalidParameterError("interFrameMaxError", "number between 0.0 and 32.0", A.interFrameMaxError);
            if (p1.defined(A.interPaletteMaxError))
                if (p1.number(A.interPaletteMaxError) && p1.inRange(A.interPaletteMaxError, 0, 256)) this.options.gifInterPaletteMaxError = A.interPaletteMaxError;
                else throw p1.invalidParameterError("interPaletteMaxError", "number between 0.0 and 256.0", A.interPaletteMaxError)
        }
        return S8B(A, this.options), this._updateFormatOut("gif", A)
    }

    function OS6(A) {
        if (!this.constructor.format.jp2k.output.buffer) throw T8B();
        if (p1.object(A)) {
            if (p1.defined(A.quality))
                if (p1.integer(A.quality) && p1.inRange(A.quality, 1, 100)) this.options.jp2Quality = A.quality;
                else throw p1.invalidParameterError("quality", "integer between 1 and 100", A.quality);
            if (p1.defined(A.lossless))
                if (p1.bool(A.lossless)) this.options.jp2Lossless = A.lossless;
                else throw p1.invalidParameterError("lossless", "boolean", A.lossless);
            if (p1.defined(A.tileWidth))
                if (p1.integer(A.tileWidth) && p1.inRange(A.tileWidth, 1, 32768)) this.options.jp2TileWidth = A.tileWidth;
                else throw p1.invalidParameterError("tileWidth", "integer between 1 and 32768", A.tileWidth);
            if (p1.defined(A.tileHeight))
                if (p1.integer(A.tileHeight) && p1.inRange(A.tileHeight, 1, 32768)) this.options.jp2TileHeight = A.tileHeight;
                else throw p1.invalidParameterError("tileHeight", "integer between 1 and 32768", A.tileHeight);
            if (p1.defined(A.chromaSubsampling))
                if (p1.string(A.chromaSubsampling) && p1.inArray(A.chromaSubsampling, ["4:2:0", "4:4:4"])) this.options.jp2ChromaSubsampling = A.chromaSubsampling;
                else throw p1.invalidParameterError("chromaSubsampling", "one of: 4:2:0, 4:4:4", A.chromaSubsampling)
        }
        return this._updateFormatOut("jp2", A)
    }

    function S8B(A, B) {
        if (p1.object(A) && p1.defined(A.loop))
            if (p1.integer(A.loop) && p1.inRange(A.loop, 0, 65535)) B.loop = A.loop;
            else throw p1.invalidParameterError("loop", "integer between 0 and 65535", A.loop);
        if (p1.object(A) && p1.defined(A.delay))
            if (p1.integer(A.delay) && p1.inRange(A.delay, 0, 65535)) B.delay = [A.delay];
            else if (Array.isArray(A.delay) && A.delay.every(p1.integer) && A.delay.every((Q) => p1.inRange(Q, 0, 65535))) B.delay = A.delay;
        else throw p1.invalidParameterError("delay", "integer or an array of integers between 0 and 65535", A.delay)
    }

    function TS6(A) {
        if (p1.object(A)) {
            if (p1.defined(A.quality))
                if (p1.integer(A.quality) && p1.inRange(A.quality, 1, 100)) this.options.tiffQuality = A.quality;
                else throw p1.invalidParameterError("quality", "integer between 1 and 100", A.quality);
            if (p1.defined(A.bitdepth))
                if (p1.integer(A.bitdepth) && p1.inArray(A.bitdepth, [1, 2, 4, 8])) this.options.tiffBitdepth = A.bitdepth;
                else throw p1.invalidParameterError("bitdepth", "1, 2, 4 or 8", A.bitdepth);
            if (p1.defined(A.tile)) this._setBooleanOption("tiffTile", A.tile);
            if (p1.defined(A.tileWidth))
                if (p1.integer(A.tileWidth) && A.tileWidth > 0) this.options.tiffTileWidth = A.tileWidth;
                else throw p1.invalidParameterError("tileWidth", "integer greater than zero", A.tileWidth);
            if (p1.defined(A.tileHeight))
                if (p1.integer(A.tileHeight) && A.tileHeight > 0) this.options.tiffTileHeight = A.tileHeight;
                else throw p1.invalidParameterError("tileHeight", "integer greater than zero", A.tileHeight);
            if (p1.defined(A.miniswhite)) this._setBooleanOption("tiffMiniswhite", A.miniswhite);
            if (p1.defined(A.pyramid)) this._setBooleanOption("tiffPyramid", A.pyramid);
            if (p1.defined(A.xres))
                if (p1.number(A.xres) && A.xres > 0) this.options.tiffXres = A.xres;
                else throw p1.invalidParameterError("xres", "number greater than zero", A.xres);
            if (p1.defined(A.yres))
                if (p1.number(A.yres) && A.yres > 0) this.options.tiffYres = A.yres;
                else throw p1.invalidParameterError("yres", "number greater than zero", A.yres);
            if (p1.defined(A.compression))
                if (p1.string(A.compression) && p1.inArray(A.compression, ["none", "jpeg", "deflate", "packbits", "ccittfax4", "lzw", "webp", "zstd", "jp2k"])) this.options.tiffCompression = A.compression;
                else throw p1.invalidParameterError("compression", "one of: none, jpeg, deflate, packbits, ccittfax4, lzw, webp, zstd, jp2k", A.compression);
            if (p1.defined(A.predictor))
                if (p1.string(A.predictor) && p1.inArray(A.predictor, ["none", "horizontal", "float"])) this.options.tiffPredictor = A.predictor;
                else throw p1.invalidParameterError("predictor", "one of: none, horizontal, float", A.predictor);
            if (p1.defined(A.resolutionUnit))
                if (p1.string(A.resolutionUnit) && p1.inArray(A.resolutionUnit, ["inch", "cm"])) this.options.tiffResolutionUnit = A.resolutionUnit;
                else throw p1.invalidParameterError("resolutionUnit", "one of: inch, cm", A.resolutionUnit)
        }
        return this._updateFormatOut("tiff", A)
    }

    function PS6(A) {
        return this.heif({
            ...A,
            compression: "av1"
        })
    }

    function SS6(A) {
        if (p1.object(A)) {
            if (p1.string(A.compression) && p1.inArray(A.compression, ["av1", "hevc"])) this.options.heifCompression = A.compression;
            else throw p1.invalidParameterError("compression", "one of: av1, hevc", A.compression);
            if (p1.defined(A.quality))
                if (p1.integer(A.quality) && p1.inRange(A.quality, 1, 100)) this.options.heifQuality = A.quality;
                else throw p1.invalidParameterError("quality", "integer between 1 and 100", A.quality);
            if (p1.defined(A.lossless))
                if (p1.bool(A.lossless)) this.options.heifLossless = A.lossless;
                else throw p1.invalidParameterError("lossless", "boolean", A.lossless);
            if (p1.defined(A.effort))
                if (p1.integer(A.effort) && p1.inRange(A.effort, 0, 9)) this.options.heifEffort = A.effort;
                else throw p1.invalidParameterError("effort", "integer between 0 and 9", A.effort);
            if (p1.defined(A.chromaSubsampling))
                if (p1.string(A.chromaSubsampling) && p1.inArray(A.chromaSubsampling, ["4:2:0", "4:4:4"])) this.options.heifChromaSubsampling = A.chromaSubsampling;
                else throw p1.invalidParameterError("chromaSubsampling", "one of: 4:2:0, 4:4:4", A.chromaSubsampling);
            if (p1.defined(A.bitdepth))
                if (p1.integer(A.bitdepth) && p1.inArray(A.bitdepth, [8, 10, 12])) {
                    if (A.bitdepth !== 8 && this.constructor.versions.heif) throw p1.invalidParameterError("bitdepth when using prebuilt binaries", 8, A.bitdepth);
                    this.options.heifBitdepth = A.bitdepth
                } else throw p1.invalidParameterError("bitdepth", "8, 10 or 12", A.bitdepth)
        } else throw p1.invalidParameterError("options", "Object", A);
        return this._updateFormatOut("heif", A)
    }

    function jS6(A) {
        if (p1.object(A)) {
            if (p1.defined(A.quality))
                if (p1.integer(A.quality) && p1.inRange(A.quality, 1, 100)) this.options.jxlDistance = A.quality >= 30 ? 0.1 + (100 - A.quality) * 0.09 : 0.017666666666666667 * A.quality * A.quality - 1.15 * A.quality + 25;
                else throw p1.invalidParameterError("quality", "integer between 1 and 100", A.quality);
            else if (p1.defined(A.distance))
                if (p1.number(A.distance) && p1.inRange(A.distance, 0, 15)) this.options.jxlDistance = A.distance;
                else throw p1.invalidParameterError("distance", "number between 0.0 and 15.0", A.distance);
            if (p1.defined(A.decodingTier))
                if (p1.integer(A.decodingTier) && p1.inRange(A.decodingTier, 0, 4)) this.options.jxlDecodingTier = A.decodingTier;
                else throw p1.invalidParameterError("decodingTier", "integer between 0 and 4", A.decodingTier);
            if (p1.defined(A.lossless))
                if (p1.bool(A.lossless)) this.options.jxlLossless = A.lossless;
                else throw p1.invalidParameterError("lossless", "boolean", A.lossless);
            if (p1.defined(A.effort))
                if (p1.integer(A.effort) && p1.inRange(A.effort, 3, 9)) this.options.jxlEffort = A.effort;
                else throw p1.invalidParameterError("effort", "integer between 3 and 9", A.effort)
        }
        return this._updateFormatOut("jxl", A)
    }

    function kS6(A) {
        if (p1.object(A)) {
            if (p1.defined(A.depth))
                if (p1.string(A.depth) && p1.inArray(A.depth, ["char", "uchar", "short", "ushort", "int", "uint", "float", "complex", "double", "dpcomplex"])) this.options.rawDepth = A.depth;
                else throw p1.invalidParameterError("depth", "one of: char, uchar, short, ushort, int, uint, float, complex, double, dpcomplex", A.depth)
        }
        return this._updateFormatOut("raw")
    }

    function yS6(A) {
        if (p1.object(A)) {
            if (p1.defined(A.size))
                if (p1.integer(A.size) && p1.inRange(A.size, 1, 8192)) this.options.tileSize = A.size;
                else throw p1.invalidParameterError("size", "integer between 1 and 8192", A.size);
            if (p1.defined(A.overlap))
                if (p1.integer(A.overlap) && p1.inRange(A.overlap, 0, 8192)) {
                    if (A.overlap > this.options.tileSize) throw p1.invalidParameterError("overlap", `<= size (${this.options.tileSize})`, A.overlap);
                    this.options.tileOverlap = A.overlap
                } else throw p1.invalidParameterError("overlap", "integer between 0 and 8192", A.overlap);
            if (p1.defined(A.container))
                if (p1.string(A.container) && p1.inArray(A.container, ["fs", "zip"])) this.options.tileContainer = A.container;
                else throw p1.invalidParameterError("container", "one of: fs, zip", A.container);
            if (p1.defined(A.layout))
                if (p1.string(A.layout) && p1.inArray(A.layout, ["dz", "google", "iiif", "iiif3", "zoomify"])) this.options.tileLayout = A.layout;
                else throw p1.invalidParameterError("layout", "one of: dz, google, iiif, iiif3, zoomify", A.layout);
            if (p1.defined(A.angle))
                if (p1.integer(A.angle) && !(A.angle % 90)) this.options.tileAngle = A.angle;
                else throw p1.invalidParameterError("angle", "positive/negative multiple of 90", A.angle);
            if (this._setBackgroundColourOption("tileBackground", A.background), p1.defined(A.depth))
                if (p1.string(A.depth) && p1.inArray(A.depth, ["onepixel", "onetile", "one"])) this.options.tileDepth = A.depth;
                else throw p1.invalidParameterError("depth", "one of: onepixel, onetile, one", A.depth);
            if (p1.defined(A.skipBlanks))
                if (p1.integer(A.skipBlanks) && p1.inRange(A.skipBlanks, -1, 65535)) this.options.tileSkipBlanks = A.skipBlanks;
                else throw p1.invalidParameterError("skipBlanks", "integer between -1 and 255/65535", A.skipBlanks);
            else if (p1.defined(A.layout) && A.layout === "google") this.options.tileSkipBlanks = 5;
            let B = p1.bool(A.center) ? A.center : A.centre;
            if (p1.defined(B)) this._setBooleanOption("tileCentre", B);
            if (p1.defined(A.id))
                if (p1.string(A.id)) this.options.tileId = A.id;
                else throw p1.invalidParameterError("id", "string", A.id);
            if (p1.defined(A.basename))
                if (p1.string(A.basename)) this.options.tileBasename = A.basename;
                else throw p1.invalidParameterError("basename", "string", A.basename)
        }
        if (p1.inArray(this.options.formatOut, ["jpeg", "png", "webp"])) this.options.tileFormat = this.options.formatOut;
        else if (this.options.formatOut !== "input") throw p1.invalidParameterError("format", "one of: jpeg, png, webp", this.options.formatOut);
        return this._updateFormatOut("dz")
    }

    function _S6(A) {
        if (!p1.plainObject(A)) throw p1.invalidParameterError("options", "object", A);
        if (p1.integer(A.seconds) && p1.inRange(A.seconds, 0, 3600)) this.options.timeoutSeconds = A.seconds;
        else throw p1.invalidParameterError("seconds", "integer between 0 and 3600", A.seconds);
        return this
    }

    function xS6(A, B) {
        if (!(p1.object(B) && B.force === !1)) this.options.formatOut = A;
        return this
    }

    function vS6(A, B) {
        if (p1.bool(B)) this.options[A] = B;
        else throw p1.invalidParameterError(A, "boolean", B)
    }

    function bS6() {
        if (!this.options.streamOut) {
            this.options.streamOut = !0;
            let A = Error();
            this._pipeline(void 0, A)
        }
    }

    function fS6(A, B) {
        if (typeof A === "function") {
            if (this._isStreamInput()) this.on("finish", () => {
                this._flattenBufferIn(), $e.pipeline(this.options, (Q, Z, D) => {
                    if (Q) A(p1.nativeError(Q, B));
                    else A(null, Z, D)
                })
            });
            else $e.pipeline(this.options, (Q, Z, D) => {
                if (Q) A(p1.nativeError(Q, B));
                else A(null, Z, D)
            });
            return this
        } else if (this.options.streamOut) {
            if (this._isStreamInput()) {
                if (this.once("finish", () => {
                        this._flattenBufferIn(), $e.pipeline(this.options, (Q, Z, D) => {
                            if (Q) this.emit("error", p1.nativeError(Q, B));
                            else this.emit("info", D), this.push(Z);
                            this.push(null), this.on("end", () => this.emit("close"))
                        })
                    }), this.streamInFinished) this.emit("finish")
            } else $e.pipeline(this.options, (Q, Z, D) => {
                if (Q) this.emit("error", p1.nativeError(Q, B));
                else this.emit("info", D), this.push(Z);
                this.push(null), this.on("end", () => this.emit("close"))
            });
            return this
        } else if (this._isStreamInput()) return new Promise((Q, Z) => {
            this.once("finish", () => {
                this._flattenBufferIn(), $e.pipeline(this.options, (D, G, F) => {
                    if (D) Z(p1.nativeError(D, B));
                    else if (this.options.resolveWithObject) Q({
                        data: G,
                        info: F
                    });
                    else Q(G)
                })
            })
        });
        else return new Promise((Q, Z) => {
            $e.pipeline(this.options, (D, G, F) => {
                if (D) Z(p1.nativeError(D, B));
                else if (this.options.resolveWithObject) Q({
                    data: G,
                    info: F
                });
                else Q(G)
            })
        })
    }
    j8B.exports = function(A) {
        Object.assign(A.prototype, {
            toFile: VS6,
            toBuffer: CS6,
            keepExif: KS6,
            withExif: HS6,
            withExifMerge: zS6,
            keepIccProfile: ES6,
            withIccProfile: US6,
            keepMetadata: wS6,
            withMetadata: $S6,
            toFormat: qS6,
            jpeg: NS6,
            jp2: OS6,
            png: LS6,
            webp: MS6,
            tiff: TS6,
            avif: PS6,
            heif: SS6,
            jxl: jS6,
            gif: RS6,
            raw: kS6,
            tile: yS6,
            timeout: _S6,
            _updateFormatOut: xS6,
            _setBooleanOption: vS6,
            _read: bS6,
            _pipeline: fS6
        })
    }
});