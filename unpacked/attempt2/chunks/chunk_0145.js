/* chunk:145 bytes:[3250398, 3256851) size:6453 source:unpacked-cli.js */
var UkA = E((s65, EkA) => {
    var {
        staticPropertyDescriptors: on,
        readOperation: Qw1,
        fireAProgressEvent: HkA
    } = KkA(), {
        kState: Dg,
        kError: zkA,
        kResult: Zw1,
        kEvents: q5,
        kAborted: PxQ
    } = oA0(), {
        webidl: Y3
    } = NY(), {
        kEnumerableProperty: RV
    } = e4();
    class n5 extends EventTarget {
        constructor() {
            super();
            this[Dg] = "empty", this[Zw1] = null, this[zkA] = null, this[q5] = {
                loadend: null,
                error: null,
                abort: null,
                load: null,
                progress: null,
                loadstart: null
            }
        }
        readAsArrayBuffer(A) {
            Y3.brandCheck(this, n5), Y3.argumentLengthCheck(arguments, 1, "FileReader.readAsArrayBuffer"), A = Y3.converters.Blob(A, {
                strict: !1
            }), Qw1(this, A, "ArrayBuffer")
        }
        readAsBinaryString(A) {
            Y3.brandCheck(this, n5), Y3.argumentLengthCheck(arguments, 1, "FileReader.readAsBinaryString"), A = Y3.converters.Blob(A, {
                strict: !1
            }), Qw1(this, A, "BinaryString")
        }
        readAsText(A, B = void 0) {
            if (Y3.brandCheck(this, n5), Y3.argumentLengthCheck(arguments, 1, "FileReader.readAsText"), A = Y3.converters.Blob(A, {
                    strict: !1
                }), B !== void 0) B = Y3.converters.DOMString(B, "FileReader.readAsText", "encoding");
            Qw1(this, A, "Text", B)
        }
        readAsDataURL(A) {
            Y3.brandCheck(this, n5), Y3.argumentLengthCheck(arguments, 1, "FileReader.readAsDataURL"), A = Y3.converters.Blob(A, {
                strict: !1
            }), Qw1(this, A, "DataURL")
        }
        abort() {
            if (this[Dg] === "empty" || this[Dg] === "done") {
                this[Zw1] = null;
                return
            }
            if (this[Dg] === "loading") this[Dg] = "done", this[Zw1] = null;
            if (this[PxQ] = !0, HkA("abort", this), this[Dg] !== "loading") HkA("loadend", this)
        }
        get readyState() {
            switch (Y3.brandCheck(this, n5), this[Dg]) {
                case "empty":
                    return this.EMPTY;
                case "loading":
                    return this.LOADING;
                case "done":
                    return this.DONE
            }
        }
        get result() {
            return Y3.brandCheck(this, n5), this[Zw1]
        }
        get error() {
            return Y3.brandCheck(this, n5), this[zkA]
        }
        get onloadend() {
            return Y3.brandCheck(this, n5), this[q5].loadend
        }
        set onloadend(A) {
            if (Y3.brandCheck(this, n5), this[q5].loadend) this.removeEventListener("loadend", this[q5].loadend);
            if (typeof A === "function") this[q5].loadend = A, this.addEventListener("loadend", A);
            else this[q5].loadend = null
        }
        get onerror() {
            return Y3.brandCheck(this, n5), this[q5].error
        }
        set onerror(A) {
            if (Y3.brandCheck(this, n5), this[q5].error) this.removeEventListener("error", this[q5].error);
            if (typeof A === "function") this[q5].error = A, this.addEventListener("error", A);
            else this[q5].error = null
        }
        get onloadstart() {
            return Y3.brandCheck(this, n5), this[q5].loadstart
        }
        set onloadstart(A) {
            if (Y3.brandCheck(this, n5), this[q5].loadstart) this.removeEventListener("loadstart", this[q5].loadstart);
            if (typeof A === "function") this[q5].loadstart = A, this.addEventListener("loadstart", A);
            else this[q5].loadstart = null
        }
        get onprogress() {
            return Y3.brandCheck(this, n5), this[q5].progress
        }
        set onprogress(A) {
            if (Y3.brandCheck(this, n5), this[q5].progress) this.removeEventListener("progress", this[q5].progress);
            if (typeof A === "function") this[q5].progress = A, this.addEventListener("progress", A);
            else this[q5].progress = null
        }
        get onload() {
            return Y3.brandCheck(this, n5), this[q5].load
        }
        set onload(A) {
            if (Y3.brandCheck(this, n5), this[q5].load) this.removeEventListener("load", this[q5].load);
            if (typeof A === "function") this[q5].load = A, this.addEventListener("load", A);
            else this[q5].load = null
        }
        get onabort() {
            return Y3.brandCheck(this, n5), this[q5].abort
        }
        set onabort(A) {
            if (Y3.brandCheck(this, n5), this[q5].abort) this.removeEventListener("abort", this[q5].abort);
            if (typeof A === "function") this[q5].abort = A, this.addEventListener("abort", A);
            else this[q5].abort = null
        }
    }
    n5.EMPTY = n5.prototype.EMPTY = 0;
    n5.LOADING = n5.prototype.LOADING = 1;
    n5.DONE = n5.prototype.DONE = 2;
    Object.defineProperties(n5.prototype, {
        EMPTY: on,
        LOADING: on,
        DONE: on,
        readAsArrayBuffer: RV,
        readAsBinaryString: RV,
        readAsText: RV,
        readAsDataURL: RV,
        abort: RV,
        readyState: RV,
        result: RV,
        error: RV,
        onloadstart: RV,
        onprogress: RV,
        onload: RV,
        onabort: RV,
        onerror: RV,
        onloadend: RV,
        [Symbol.toStringTag]: {
            value: "FileReader",
            writable: !1,
            enumerable: !1,
            configurable: !0
        }
    });
    Object.defineProperties(n5, {
        EMPTY: on,
        LOADING: on,
        DONE: on
    });
    EkA.exports = {
        FileReader: n5
    }
});
var Dw1 = E((r65, wkA) => {
    wkA.exports = {
        kConstruct: VZ().kConstruct
    }
});
var NkA = E((o65, qkA) => {
    var SxQ = W1("node:assert"),
        {
            URLSerializer: $kA
        } = NV(),
        {
            isValidHeaderName: jxQ
        } = AK();

    function kxQ(A, B, Q = !1) {
        let Z = $kA(A, Q),
            D = $kA(B, Q);
        return Z === D
    }

    function yxQ(A) {
        SxQ(A !== null);
        let B = [];
        for (let Q of A.split(","))
            if (Q = Q.trim(), jxQ(Q)) B.push(Q);
        return B
    }
    qkA.exports = {
        urlEquals: kxQ,
        getFieldValues: yxQ
    }
});