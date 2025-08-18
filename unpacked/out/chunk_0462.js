/* chunk:462 bytes:[10971010, 10973315) size:2305 source:unpacked-cli.js */
var aM0 = E((vK8) => {
    var yxB = f01(),
        kK8 = lM0(),
        yK8 = MD(),
        _K8 = Rf1(),
        xK8 = vK8.elements = {},
        _xB = Object.create(null);
    vK8.createElement = function(A, B, Q) {
        var Z = _xB[B] || nM0;
        return new Z(A, B, Q)
    };

    function iM0(A) {
        return kK8(A, nM0, xK8, _xB)
    }
    var nM0 = iM0({
        superclass: yxB,
        name: "SVGElement",
        ctor: function A(B, Q, Z) {
            yxB.call(this, B, Q, yK8.NAMESPACE.SVG, Z)
        },
        props: {
            style: {
                get: function() {
                    if (!this._style) this._style = new _K8(this);
                    return this._style
                }
            }
        }
    });
    iM0({
        name: "SVGSVGElement",
        ctor: function A(B, Q, Z) {
            nM0.call(this, B, Q, Z)
        },
        tag: "svg",
        props: {
            createSVGRect: {
                value: function() {
                    return vK8.createElement(this.ownerDocument, "rect", null)
                }
            }
        }
    });
    iM0({
        tags: ["a", "altGlyph", "altGlyphDef", "altGlyphItem", "animate", "animateColor", "animateMotion", "animateTransform", "circle", "clipPath", "color-profile", "cursor", "defs", "desc", "ellipse", "feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence", "filter", "font", "font-face", "font-face-format", "font-face-name", "font-face-src", "font-face-uri", "foreignObject", "g", "glyph", "glyphRef", "hkern", "image", "line", "linearGradient", "marker", "mask", "metadata", "missing-glyph", "mpath", "path", "pattern", "polygon", "polyline", "radialGradient", "rect", "script", "set", "stop", "style", "switch", "symbol", "text", "textPath", "title", "tref", "tspan", "use", "view", "vkern"]
    })
});
var bxB = E((EO3, vxB) => {
    vxB.exports = {
        VALUE: 1,
        ATTR: 2,
        REMOVE_ATTR: 3,
        REMOVE: 4,
        MOVE: 5,
        INSERT: 6
    }
});