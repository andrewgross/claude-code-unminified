/* chunk:530 bytes:[12485424, 12491506) size:6082 source:unpacked-cli.js */
function aG0(A, {
    include: B,
    exclude: Q
} = {}) {
    let Z = (D) => {
        let G = (F) => typeof F === "string" ? D === F : F.test(D);
        if (B) return B.some(G);
        if (Q) return !Q.some(G);
        return !0
    };
    for (let [D, G] of Jn4(A.constructor.prototype)) {
        if (G === "constructor" || !Z(G)) continue;
        let F = Reflect.getOwnPropertyDescriptor(D, G);
        if (F && typeof F.value === "function") A[G] = A[G].bind(A)
    }
    return A
}
import {
    PassThrough as NN2
} from "node:stream";
var LN2 = ["assert", "count", "countReset", "debug", "dir", "dirxml", "error", "group", "groupCollapsed", "groupEnd", "info", "log", "table", "time", "timeEnd", "timeLog", "trace", "warn"],
    sG0 = {},
    Xn4 = (A) => {
        let B = new NN2,
            Q = new NN2;
        B.write = (D) => {
            A("stdout", D)
        }, Q.write = (D) => {
            A("stderr", D)
        };
        let Z = new console.Console(B, Q);
        for (let D of LN2) sG0[D] = console[D], console[D] = Z[D];
        return () => {
            for (let D of LN2) console[D] = sG0[D];
            sG0 = {}
        }
    },
    MN2 = Xn4;
var sM2 = G1(_N2(), 1);
var IF0 = 16;
var p2 = {},
    gR1 = p2.ALIGN_AUTO = 0,
    m51 = p2.ALIGN_FLEX_START = 1,
    d51 = p2.ALIGN_CENTER = 2,
    c51 = p2.ALIGN_FLEX_END = 3,
    uR1 = p2.ALIGN_STRETCH = 4,
    xN2 = p2.ALIGN_BASELINE = 5,
    vN2 = p2.ALIGN_SPACE_BETWEEN = 6,
    bN2 = p2.ALIGN_SPACE_AROUND = 7,
    fN2 = p2.DIMENSION_WIDTH = 0,
    hN2 = p2.DIMENSION_HEIGHT = 1,
    gN2 = p2.DIRECTION_INHERIT = 0,
    uN2 = p2.DIRECTION_LTR = 1,
    mN2 = p2.DIRECTION_RTL = 2,
    fo = p2.DISPLAY_FLEX = 0,
    f_ = p2.DISPLAY_NONE = 1,
    lL = p2.EDGE_LEFT = 0,
    h_ = p2.EDGE_TOP = 1,
    pL = p2.EDGE_RIGHT = 2,
    g_ = p2.EDGE_BOTTOM = 3,
    mR1 = p2.EDGE_START = 4,
    dR1 = p2.EDGE_END = 5,
    l51 = p2.EDGE_HORIZONTAL = 6,
    p51 = p2.EDGE_VERTICAL = 7,
    i51 = p2.EDGE_ALL = 8,
    dN2 = p2.EXPERIMENTAL_FEATURE_WEB_FLEX_BASIS = 0,
    cN2 = p2.EXPERIMENTAL_FEATURE_ABSOLUTE_PERCENTAGE_AGAINST_PADDING_EDGE = 1,
    lN2 = p2.EXPERIMENTAL_FEATURE_FIX_ABSOLUTE_TRAILING_COLUMN_MARGIN = 2,
    cR1 = p2.FLEX_DIRECTION_COLUMN = 0,
    lR1 = p2.FLEX_DIRECTION_COLUMN_REVERSE = 1,
    pR1 = p2.FLEX_DIRECTION_ROW = 2,
    iR1 = p2.FLEX_DIRECTION_ROW_REVERSE = 3,
    nR1 = p2.GUTTER_COLUMN = 0,
    aR1 = p2.GUTTER_ROW = 1,
    sR1 = p2.GUTTER_ALL = 2,
    rR1 = p2.JUSTIFY_FLEX_START = 0,
    oR1 = p2.JUSTIFY_CENTER = 1,
    tR1 = p2.JUSTIFY_FLEX_END = 2,
    eR1 = p2.JUSTIFY_SPACE_BETWEEN = 3,
    AO1 = p2.JUSTIFY_SPACE_AROUND = 4,
    BO1 = p2.JUSTIFY_SPACE_EVENLY = 5,
    pN2 = p2.LOG_LEVEL_ERROR = 0,
    iN2 = p2.LOG_LEVEL_WARN = 1,
    nN2 = p2.LOG_LEVEL_INFO = 2,
    aN2 = p2.LOG_LEVEL_DEBUG = 3,
    sN2 = p2.LOG_LEVEL_VERBOSE = 4,
    rN2 = p2.LOG_LEVEL_FATAL = 5,
    oN2 = p2.MEASURE_MODE_UNDEFINED = 0,
    tN2 = p2.MEASURE_MODE_EXACTLY = 1,
    eN2 = p2.MEASURE_MODE_AT_MOST = 2,
    AL2 = p2.NODE_TYPE_DEFAULT = 0,
    BL2 = p2.NODE_TYPE_TEXT = 1,
    QL2 = p2.OVERFLOW_VISIBLE = 0,
    ZL2 = p2.OVERFLOW_HIDDEN = 1,
    DL2 = p2.OVERFLOW_SCROLL = 2,
    GL2 = p2.POSITION_TYPE_STATIC = 0,
    QO1 = p2.POSITION_TYPE_RELATIVE = 1,
    ZO1 = p2.POSITION_TYPE_ABSOLUTE = 2,
    FL2 = p2.PRINT_OPTIONS_LAYOUT = 1,
    IL2 = p2.PRINT_OPTIONS_STYLE = 2,
    YL2 = p2.PRINT_OPTIONS_CHILDREN = 4,
    WL2 = p2.UNIT_UNDEFINED = 0,
    JL2 = p2.UNIT_POINT = 1,
    XL2 = p2.UNIT_PERCENT = 2,
    VL2 = p2.UNIT_AUTO = 3,
    DO1 = p2.WRAP_NO_WRAP = 0,
    GO1 = p2.WRAP_WRAP = 1,
    FO1 = p2.WRAP_WRAP_REVERSE = 2;
var CL2 = (A) => {
    function B(D, G, F) {
        let I = D[G];
        D[G] = function(...Y) {
            return F.call(this, I, ...Y)
        }
    }
    for (let D of ["setPosition", "setMargin", "setFlexBasis", "setWidth", "setHeight", "setMinWidth", "setMinHeight", "setMaxWidth", "setMaxHeight", "setPadding"]) {
        let G = {
            [p2.UNIT_POINT]: A.Node.prototype[D],
            [p2.UNIT_PERCENT]: A.Node.prototype[`${D}Percent`],
            [p2.UNIT_AUTO]: A.Node.prototype[`${D}Auto`]
        };
        B(A.Node.prototype, D, function(F, ...I) {
            let Y, W, J = I.pop();
            if (J === "auto") Y = p2.UNIT_AUTO, W = void 0;
            else if (typeof J == "object") Y = J.unit, W = J.valueOf();
            else if (Y = typeof J == "string" && J.endsWith("%") ? p2.UNIT_PERCENT : p2.UNIT_POINT, W = parseFloat(J), !Number.isNaN(J) && Number.isNaN(W)) throw Error(`Invalid value ${J} for ${D}`);
            if (!G[Y]) throw Error(`Failed to execute "${D}": Unsupported unit '${J}'`);
            return W !== void 0 ? G[Y].call(this, ...I, W) : G[Y].call(this, ...I)
        })
    }

    function Q(D) {
        return A.MeasureCallback.implement({
            measure: (...G) => {
                let {
                    width: F,
                    height: I
                } = D(...G);
                return {
                    width: F ?? NaN,
                    height: I ?? NaN
                }
            }
        })
    }

    function Z(D) {
        return A.DirtiedCallback.implement({
            dirtied: D
        })
    }
    return B(A.Node.prototype, "setMeasureFunc", function(D, G) {
        return G ? D.call(this, Q(G)) : this.unsetMeasureFunc()
    }), B(A.Node.prototype, "setDirtiedFunc", function(D, G) {
        D.call(this, Z(G))
    }), B(A.Config.prototype, "free", function() {
        A.Config.destroy(this)
    }), B(A.Node, "create", (D, G) => G ? A.Node.createWithConfig(G) : A.Node.createDefault()), B(A.Node.prototype, "free", function() {
        A.Node.destroy(this)
    }), B(A.Node.prototype, "freeRecursive", function() {
        for (let D = 0, G = this.getChildCount(); D < G; ++D) this.getChild(0).freeRecursive();
        this.free()
    }), B(A.Node.prototype, "calculateLayout", function(D, G = NaN, F = NaN, I = p2.DIRECTION_LTR) {
        return D.call(this, G, F, I)
    }), {
        Config: A.Config,
        Node: A.Node,
        ...p2
    }
};