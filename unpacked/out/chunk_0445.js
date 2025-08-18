/* chunk:445 bytes:[10621388, 10634279) size:12891 source:unpacked-cli.js */
var dq0 = E((E38) => {
    var {
        DOCUMENT_MODE: A01
    } = jv(), qOB = ["+//silmaril//dtd html pro v0r11 19970101//", "-//as//dtd html 3.0 aswedit + extensions//", "-//advasoft ltd//dtd html 3.0 aswedit + extensions//", "-//ietf//dtd html 2.0 level 1//", "-//ietf//dtd html 2.0 level 2//", "-//ietf//dtd html 2.0 strict level 1//", "-//ietf//dtd html 2.0 strict level 2//", "-//ietf//dtd html 2.0 strict//", "-//ietf//dtd html 2.0//", "-//ietf//dtd html 2.1e//", "-//ietf//dtd html 3.0//", "-//ietf//dtd html 3.2 final//", "-//ietf//dtd html 3.2//", "-//ietf//dtd html 3//", "-//ietf//dtd html level 0//", "-//ietf//dtd html level 1//", "-//ietf//dtd html level 2//", "-//ietf//dtd html level 3//", "-//ietf//dtd html strict level 0//", "-//ietf//dtd html strict level 1//", "-//ietf//dtd html strict level 2//", "-//ietf//dtd html strict level 3//", "-//ietf//dtd html strict//", "-//ietf//dtd html//", "-//metrius//dtd metrius presentational//", "-//microsoft//dtd internet explorer 2.0 html strict//", "-//microsoft//dtd internet explorer 2.0 html//", "-//microsoft//dtd internet explorer 2.0 tables//", "-//microsoft//dtd internet explorer 3.0 html strict//", "-//microsoft//dtd internet explorer 3.0 html//", "-//microsoft//dtd internet explorer 3.0 tables//", "-//netscape comm. corp.//dtd html//", "-//netscape comm. corp.//dtd strict html//", "-//o'reilly and associates//dtd html 2.0//", "-//o'reilly and associates//dtd html extended 1.0//", "-//o'reilly and associates//dtd html extended relaxed 1.0//", "-//sq//dtd html 2.0 hotmetal + extensions//", "-//softquad software//dtd hotmetal pro 6.0::19990601::extensions to html 4.0//", "-//softquad//dtd hotmetal pro 4.0::19971010::extensions to html 4.0//", "-//spyglass//dtd html 2.0 extended//", "-//sun microsystems corp.//dtd hotjava html//", "-//sun microsystems corp.//dtd hotjava strict html//", "-//w3c//dtd html 3 1995-03-24//", "-//w3c//dtd html 3.2 draft//", "-//w3c//dtd html 3.2 final//", "-//w3c//dtd html 3.2//", "-//w3c//dtd html 3.2s draft//", "-//w3c//dtd html 4.0 frameset//", "-//w3c//dtd html 4.0 transitional//", "-//w3c//dtd html experimental 19960712//", "-//w3c//dtd html experimental 970421//", "-//w3c//dtd w3 html//", "-//w3o//dtd w3 html 3.0//", "-//webtechs//dtd mozilla html 2.0//", "-//webtechs//dtd mozilla html//"], K38 = qOB.concat(["-//w3c//dtd html 4.01 frameset//", "-//w3c//dtd html 4.01 transitional//"]), H38 = ["-//w3o//dtd w3 html strict 3.0//en//", "-/w3c/dtd html 4.0 transitional/en", "html"], NOB = ["-//w3c//dtd xhtml 1.0 frameset//", "-//w3c//dtd xhtml 1.0 transitional//"], z38 = NOB.concat(["-//w3c//dtd html 4.01 frameset//", "-//w3c//dtd html 4.01 transitional//"]);

    function wOB(A) {
        let B = A.indexOf('"') !== -1 ? "'" : '"';
        return B + A + B
    }

    function $OB(A, B) {
        for (let Q = 0; Q < B.length; Q++)
            if (A.indexOf(B[Q]) === 0) return !0;
        return !1
    }
    E38.isConforming = function(A) {
        return A.name === "html" && A.publicId === null && (A.systemId === null || A.systemId === "about:legacy-compat")
    };
    E38.getDocumentMode = function(A) {
        if (A.name !== "html") return A01.QUIRKS;
        let B = A.systemId;
        if (B && B.toLowerCase() === "http://www.ibm.com/data/dtd/v11/ibmxhtml1-transitional.dtd") return A01.QUIRKS;
        let Q = A.publicId;
        if (Q !== null) {
            if (Q = Q.toLowerCase(), H38.indexOf(Q) > -1) return A01.QUIRKS;
            let Z = B === null ? K38 : qOB;
            if ($OB(Q, Z)) return A01.QUIRKS;
            if (Z = B === null ? NOB : z38, $OB(Q, Z)) return A01.LIMITED_QUIRKS
        }
        return A01.NO_QUIRKS
    };
    E38.serializeContent = function(A, B, Q) {
        let Z = "!DOCTYPE ";
        if (A) Z += A;
        if (B) Z += " PUBLIC " + wOB(B);
        else if (Q) Z += " SYSTEM";
        if (Q !== null) Z += " " + wOB(Q);
        return Z
    }
});
var MOB = E((T38) => {
    var cq0 = RG1(),
        lq0 = jv(),
        u9 = lq0.TAG_NAMES,
        BW = lq0.NAMESPACES,
        uv1 = lq0.ATTRS,
        LOB = {
            TEXT_HTML: "text/html",
            APPLICATION_XML: "application/xhtml+xml"
        },
        q38 = {
            attributename: "attributeName",
            attributetype: "attributeType",
            basefrequency: "baseFrequency",
            baseprofile: "baseProfile",
            calcmode: "calcMode",
            clippathunits: "clipPathUnits",
            diffuseconstant: "diffuseConstant",
            edgemode: "edgeMode",
            filterunits: "filterUnits",
            glyphref: "glyphRef",
            gradienttransform: "gradientTransform",
            gradientunits: "gradientUnits",
            kernelmatrix: "kernelMatrix",
            kernelunitlength: "kernelUnitLength",
            keypoints: "keyPoints",
            keysplines: "keySplines",
            keytimes: "keyTimes",
            lengthadjust: "lengthAdjust",
            limitingconeangle: "limitingConeAngle",
            markerheight: "markerHeight",
            markerunits: "markerUnits",
            markerwidth: "markerWidth",
            maskcontentunits: "maskContentUnits",
            maskunits: "maskUnits",
            numoctaves: "numOctaves",
            pathlength: "pathLength",
            patterncontentunits: "patternContentUnits",
            patterntransform: "patternTransform",
            patternunits: "patternUnits",
            pointsatx: "pointsAtX",
            pointsaty: "pointsAtY",
            pointsatz: "pointsAtZ",
            preservealpha: "preserveAlpha",
            preserveaspectratio: "preserveAspectRatio",
            primitiveunits: "primitiveUnits",
            refx: "refX",
            refy: "refY",
            repeatcount: "repeatCount",
            repeatdur: "repeatDur",
            requiredextensions: "requiredExtensions",
            requiredfeatures: "requiredFeatures",
            specularconstant: "specularConstant",
            specularexponent: "specularExponent",
            spreadmethod: "spreadMethod",
            startoffset: "startOffset",
            stddeviation: "stdDeviation",
            stitchtiles: "stitchTiles",
            surfacescale: "surfaceScale",
            systemlanguage: "systemLanguage",
            tablevalues: "tableValues",
            targetx: "targetX",
            targety: "targetY",
            textlength: "textLength",
            viewbox: "viewBox",
            viewtarget: "viewTarget",
            xchannelselector: "xChannelSelector",
            ychannelselector: "yChannelSelector",
            zoomandpan: "zoomAndPan"
        },
        N38 = {
            "xlink:actuate": {
                prefix: "xlink",
                name: "actuate",
                namespace: BW.XLINK
            },
            "xlink:arcrole": {
                prefix: "xlink",
                name: "arcrole",
                namespace: BW.XLINK
            },
            "xlink:href": {
                prefix: "xlink",
                name: "href",
                namespace: BW.XLINK
            },
            "xlink:role": {
                prefix: "xlink",
                name: "role",
                namespace: BW.XLINK
            },
            "xlink:show": {
                prefix: "xlink",
                name: "show",
                namespace: BW.XLINK
            },
            "xlink:title": {
                prefix: "xlink",
                name: "title",
                namespace: BW.XLINK
            },
            "xlink:type": {
                prefix: "xlink",
                name: "type",
                namespace: BW.XLINK
            },
            "xml:base": {
                prefix: "xml",
                name: "base",
                namespace: BW.XML
            },
            "xml:lang": {
                prefix: "xml",
                name: "lang",
                namespace: BW.XML
            },
            "xml:space": {
                prefix: "xml",
                name: "space",
                namespace: BW.XML
            },
            xmlns: {
                prefix: "",
                name: "xmlns",
                namespace: BW.XMLNS
            },
            "xmlns:xlink": {
                prefix: "xmlns",
                name: "xlink",
                namespace: BW.XMLNS
            }
        },
        L38 = T38.SVG_TAG_NAMES_ADJUSTMENT_MAP = {
            altglyph: "altGlyph",
            altglyphdef: "altGlyphDef",
            altglyphitem: "altGlyphItem",
            animatecolor: "animateColor",
            animatemotion: "animateMotion",
            animatetransform: "animateTransform",
            clippath: "clipPath",
            feblend: "feBlend",
            fecolormatrix: "feColorMatrix",
            fecomponenttransfer: "feComponentTransfer",
            fecomposite: "feComposite",
            feconvolvematrix: "feConvolveMatrix",
            fediffuselighting: "feDiffuseLighting",
            fedisplacementmap: "feDisplacementMap",
            fedistantlight: "feDistantLight",
            feflood: "feFlood",
            fefunca: "feFuncA",
            fefuncb: "feFuncB",
            fefuncg: "feFuncG",
            fefuncr: "feFuncR",
            fegaussianblur: "feGaussianBlur",
            feimage: "feImage",
            femerge: "feMerge",
            femergenode: "feMergeNode",
            femorphology: "feMorphology",
            feoffset: "feOffset",
            fepointlight: "fePointLight",
            fespecularlighting: "feSpecularLighting",
            fespotlight: "feSpotLight",
            fetile: "feTile",
            feturbulence: "feTurbulence",
            foreignobject: "foreignObject",
            glyphref: "glyphRef",
            lineargradient: "linearGradient",
            radialgradient: "radialGradient",
            textpath: "textPath"
        },
        M38 = {
            [u9.B]: !0,
            [u9.BIG]: !0,
            [u9.BLOCKQUOTE]: !0,
            [u9.BODY]: !0,
            [u9.BR]: !0,
            [u9.CENTER]: !0,
            [u9.CODE]: !0,
            [u9.DD]: !0,
            [u9.DIV]: !0,
            [u9.DL]: !0,
            [u9.DT]: !0,
            [u9.EM]: !0,
            [u9.EMBED]: !0,
            [u9.H1]: !0,
            [u9.H2]: !0,
            [u9.H3]: !0,
            [u9.H4]: !0,
            [u9.H5]: !0,
            [u9.H6]: !0,
            [u9.HEAD]: !0,
            [u9.HR]: !0,
            [u9.I]: !0,
            [u9.IMG]: !0,
            [u9.LI]: !0,
            [u9.LISTING]: !0,
            [u9.MENU]: !0,
            [u9.META]: !0,
            [u9.NOBR]: !0,
            [u9.OL]: !0,
            [u9.P]: !0,
            [u9.PRE]: !0,
            [u9.RUBY]: !0,
            [u9.S]: !0,
            [u9.SMALL]: !0,
            [u9.SPAN]: !0,
            [u9.STRONG]: !0,
            [u9.STRIKE]: !0,
            [u9.SUB]: !0,
            [u9.SUP]: !0,
            [u9.TABLE]: !0,
            [u9.TT]: !0,
            [u9.U]: !0,
            [u9.UL]: !0,
            [u9.VAR]: !0
        };
    T38.causesExit = function(A) {
        let B = A.tagName;
        return B === u9.FONT && (cq0.getTokenAttr(A, uv1.COLOR) !== null || cq0.getTokenAttr(A, uv1.SIZE) !== null || cq0.getTokenAttr(A, uv1.FACE) !== null) ? !0 : M38[B]
    };
    T38.adjustTokenMathMLAttrs = function(A) {
        for (let B = 0; B < A.attrs.length; B++)
            if (A.attrs[B].name === "definitionurl") {
                A.attrs[B].name = "definitionURL";
                break
            }
    };
    T38.adjustTokenSVGAttrs = function(A) {
        for (let B = 0; B < A.attrs.length; B++) {
            let Q = q38[A.attrs[B].name];
            if (Q) A.attrs[B].name = Q
        }
    };
    T38.adjustTokenXMLAttrs = function(A) {
        for (let B = 0; B < A.attrs.length; B++) {
            let Q = N38[A.attrs[B].name];
            if (Q) A.attrs[B].prefix = Q.prefix, A.attrs[B].name = Q.name, A.attrs[B].namespace = Q.namespace
        }
    };
    T38.adjustTokenSVGTagName = function(A) {
        let B = L38[A.tagName];
        if (B) A.tagName = B
    };

    function R38(A, B) {
        return B === BW.MATHML && (A === u9.MI || A === u9.MO || A === u9.MN || A === u9.MS || A === u9.MTEXT)
    }

    function O38(A, B, Q) {
        if (B === BW.MATHML && A === u9.ANNOTATION_XML) {
            for (let Z = 0; Z < Q.length; Z++)
                if (Q[Z].name === uv1.ENCODING) {
                    let D = Q[Z].value.toLowerCase();
                    return D === LOB.TEXT_HTML || D === LOB.APPLICATION_XML
                }
        }
        return B === BW.SVG && (A === u9.FOREIGN_OBJECT || A === u9.DESC || A === u9.TITLE)
    }
    T38.isIntegrationPoint = function(A, B, Q, Z) {
        if ((!Z || Z === BW.HTML) && O38(A, B, Q)) return !0;
        if ((!Z || Z === BW.MATHML) && R38(A, B)) return !0;
        return !1
    }
});