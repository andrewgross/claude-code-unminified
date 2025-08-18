/* chunk:378 bytes:[8791344, 8794415) size:3071 source:unpacked-cli.js */
var v8B = E((Eo5, x8B) => {
    var hS6 = W1("node:events"),
        kj1 = Cj1(),
        bE = NM(),
        {
            runtimePlatformArch: gS6
        } = tC0(),
        WX = DZ1(),
        y8B = gS6(),
        XK0 = WX.libvipsVersion(),
        vx = WX.format();
    vx.heif.output.alias = ["avif", "heic"];
    vx.jpeg.output.alias = ["jpe", "jpg"];
    vx.tiff.output.alias = ["tif"];
    vx.jp2k.output.alias = ["j2c", "j2k", "jp2", "jpx"];
    var uS6 = {
            nearest: "nearest",
            bilinear: "bilinear",
            bicubic: "bicubic",
            locallyBoundedBicubic: "lbb",
            nohalo: "nohalo",
            vertexSplitQuadraticBasisSpline: "vsqbs"
        },
        qe = {
            vips: XK0.semver
        };
    if (!XK0.isGlobal)
        if (!XK0.isWasm) try {
            qe = W1(`@img/sharp-${y8B}/versions`)
        } catch (A) {
            try {
                qe = W1(`@img/sharp-libvips-${y8B}/versions`)
            } catch (B) {}
        } else try {
            qe = (() => {
                throw new Error("Cannot require module " + "@img/sharp-wasm32/versions");
            })()
        } catch (A) {}
    qe.sharp = rC0().version;
    if (qe.heif && vx.heif) vx.heif.input.fileSuffix = [".avif"], vx.heif.output.alias = ["avif"];

    function _8B(A) {
        if (bE.bool(A))
            if (A) return WX.cache(50, 20, 100);
            else return WX.cache(0, 0, 0);
        else if (bE.object(A)) return WX.cache(A.memory, A.files, A.items);
        else return WX.cache()
    }
    _8B(!0);

    function mS6(A) {
        return WX.concurrency(bE.integer(A) ? A : null)
    }
    if (kj1.familySync() === kj1.GLIBC && !WX._isUsingJemalloc()) WX.concurrency(1);
    else if (kj1.familySync() === kj1.MUSL && WX.concurrency() === 1024) WX.concurrency(W1("node:os").availableParallelism());
    var dS6 = new hS6.EventEmitter;

    function cS6() {
        return WX.counters()
    }

    function lS6(A) {
        return WX.simd(bE.bool(A) ? A : null)
    }

    function pS6(A) {
        if (bE.object(A))
            if (Array.isArray(A.operation) && A.operation.every(bE.string)) WX.block(A.operation, !0);
            else throw bE.invalidParameterError("operation", "Array<string>", A.operation);
        else throw bE.invalidParameterError("options", "object", A)
    }

    function iS6(A) {
        if (bE.object(A))
            if (Array.isArray(A.operation) && A.operation.every(bE.string)) WX.block(A.operation, !1);
            else throw bE.invalidParameterError("operation", "Array<string>", A.operation);
        else throw bE.invalidParameterError("options", "object", A)
    }
    x8B.exports = function(A) {
        A.cache = _8B, A.concurrency = mS6, A.counters = cS6, A.simd = lS6, A.format = vx, A.interpolators = uS6, A.versions = qe, A.queue = dS6, A.block = pS6, A.unblock = iS6
    }
});
var yj1 = E((wo5, b8B) => {
    var gP = c6B();
    W8B()(gP);
    H8B()(gP);
    E8B()(gP);
    $8B()(gP);
    L8B()(gP);
    R8B()(gP);
    k8B()(gP);
    v8B()(gP);
    b8B.exports = gP
});