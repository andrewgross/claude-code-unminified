/* chunk:562 bytes:[13092869, 13112119) size:19250 source:unpacked-cli.js */
var P68 = class A {
        static {
            i0(this, "Tree")
        } [0] = 0;
        textCallback;
        language;
        constructor(B, Q, Z, D) {
            i11(B), this[0] = Q, this.language = Z, this.textCallback = D
        }
        copy() {
            let B = s1._ts_tree_copy(this[0]);
            return new A(Nv, B, this.language, this.textCallback)
        }
        delete() {
            s1._ts_tree_delete(this[0]), this[0] = 0
        }
        get rootNode() {
            return s1._ts_tree_root_node_wasm(this[0]), jZ(this)
        }
        rootNodeWithOffset(B, Q) {
            let Z = hB + ZC;
            return s1.setValue(Z, B, "i32"), oE(Z + C9, Q), s1._ts_tree_root_node_with_offset_wasm(this[0]), jZ(this)
        }
        edit(B) {
            xMB(B), s1._ts_tree_edit_wasm(this[0])
        }
        walk() {
            return this.rootNode.walk()
        }
        getChangedRanges(B) {
            if (!(B instanceof A)) throw new TypeError("Argument must be a Tree");
            s1._ts_tree_get_changed_ranges_wasm(this[0], B[0]);
            let Q = s1.getValue(hB, "i32"),
                Z = s1.getValue(hB + C9, "i32"),
                D = new Array(Q);
            if (Q > 0) {
                let G = Z;
                for (let F = 0; F < Q; F++) D[F] = Rv1(G), G += CG1;
                s1._free(Z)
            }
            return D
        }
        getIncludedRanges() {
            s1._ts_tree_included_ranges_wasm(this[0]);
            let B = s1.getValue(hB, "i32"),
                Q = s1.getValue(hB + C9, "i32"),
                Z = new Array(B);
            if (B > 0) {
                let D = Q;
                for (let G = 0; G < B; G++) Z[G] = Rv1(D), D += CG1;
                s1._free(Q)
            }
            return Z
        }
    },
    S68 = class A {
        static {
            i0(this, "TreeCursor")
        } [0] = 0;
        [1] = 0;
        [2] = 0;
        [3] = 0;
        tree;
        constructor(B, Q) {
            i11(B), this.tree = Q, rK(this)
        }
        copy() {
            let B = new A(Nv, this.tree);
            return s1._ts_tree_cursor_copy_wasm(this.tree[0]), rK(B), B
        }
        delete() {
            m3(this), s1._ts_tree_cursor_delete_wasm(this.tree[0]), this[0] = this[1] = this[2] = 0
        }
        get currentNode() {
            return m3(this), s1._ts_tree_cursor_current_node_wasm(this.tree[0]), jZ(this.tree)
        }
        get currentFieldId() {
            return m3(this), s1._ts_tree_cursor_current_field_id_wasm(this.tree[0])
        }
        get currentFieldName() {
            return this.tree.language.fields[this.currentFieldId]
        }
        get currentDepth() {
            return m3(this), s1._ts_tree_cursor_current_depth_wasm(this.tree[0])
        }
        get currentDescendantIndex() {
            return m3(this), s1._ts_tree_cursor_current_descendant_index_wasm(this.tree[0])
        }
        get nodeType() {
            return this.tree.language.types[this.nodeTypeId] || "ERROR"
        }
        get nodeTypeId() {
            return m3(this), s1._ts_tree_cursor_current_node_type_id_wasm(this.tree[0])
        }
        get nodeStateId() {
            return m3(this), s1._ts_tree_cursor_current_node_state_id_wasm(this.tree[0])
        }
        get nodeId() {
            return m3(this), s1._ts_tree_cursor_current_node_id_wasm(this.tree[0])
        }
        get nodeIsNamed() {
            return m3(this), s1._ts_tree_cursor_current_node_is_named_wasm(this.tree[0]) === 1
        }
        get nodeIsMissing() {
            return m3(this), s1._ts_tree_cursor_current_node_is_missing_wasm(this.tree[0]) === 1
        }
        get nodeText() {
            m3(this);
            let B = s1._ts_tree_cursor_start_index_wasm(this.tree[0]),
                Q = s1._ts_tree_cursor_end_index_wasm(this.tree[0]);
            s1._ts_tree_cursor_start_position_wasm(this.tree[0]);
            let Z = em(hB);
            return Wq0(this.tree, B, Q, Z)
        }
        get startPosition() {
            return m3(this), s1._ts_tree_cursor_start_position_wasm(this.tree[0]), em(hB)
        }
        get endPosition() {
            return m3(this), s1._ts_tree_cursor_end_position_wasm(this.tree[0]), em(hB)
        }
        get startIndex() {
            return m3(this), s1._ts_tree_cursor_start_index_wasm(this.tree[0])
        }
        get endIndex() {
            return m3(this), s1._ts_tree_cursor_end_index_wasm(this.tree[0])
        }
        gotoFirstChild() {
            m3(this);
            let B = s1._ts_tree_cursor_goto_first_child_wasm(this.tree[0]);
            return rK(this), B === 1
        }
        gotoLastChild() {
            m3(this);
            let B = s1._ts_tree_cursor_goto_last_child_wasm(this.tree[0]);
            return rK(this), B === 1
        }
        gotoParent() {
            m3(this);
            let B = s1._ts_tree_cursor_goto_parent_wasm(this.tree[0]);
            return rK(this), B === 1
        }
        gotoNextSibling() {
            m3(this);
            let B = s1._ts_tree_cursor_goto_next_sibling_wasm(this.tree[0]);
            return rK(this), B === 1
        }
        gotoPreviousSibling() {
            m3(this);
            let B = s1._ts_tree_cursor_goto_previous_sibling_wasm(this.tree[0]);
            return rK(this), B === 1
        }
        gotoDescendant(B) {
            m3(this), s1._ts_tree_cursor_goto_descendant_wasm(this.tree[0], B), rK(this)
        }
        gotoFirstChildForIndex(B) {
            m3(this), s1.setValue(hB + Gq0, B, "i32");
            let Q = s1._ts_tree_cursor_goto_first_child_for_index_wasm(this.tree[0]);
            return rK(this), Q === 1
        }
        gotoFirstChildForPosition(B) {
            m3(this), oE(hB + Gq0, B);
            let Q = s1._ts_tree_cursor_goto_first_child_for_position_wasm(this.tree[0]);
            return rK(this), Q === 1
        }
        reset(B) {
            B4(B), m3(this, hB + ZC), s1._ts_tree_cursor_reset_wasm(this.tree[0]), rK(this)
        }
        resetTo(B) {
            m3(this, hB), m3(B, hB + Gq0), s1._ts_tree_cursor_reset_to_wasm(this.tree[0], B.tree[0]), rK(this)
        }
    },
    j68 = class {
        static {
            i0(this, "Node")
        } [0] = 0;
        _children;
        _namedChildren;
        constructor(A, {
            id: B,
            tree: Q,
            startIndex: Z,
            startPosition: D,
            other: G
        }) {
            i11(A), this[0] = G, this.id = B, this.tree = Q, this.startIndex = Z, this.startPosition = D
        }
        id;
        startIndex;
        startPosition;
        tree;
        get typeId() {
            return B4(this), s1._ts_node_symbol_wasm(this.tree[0])
        }
        get grammarId() {
            return B4(this), s1._ts_node_grammar_symbol_wasm(this.tree[0])
        }
        get type() {
            return this.tree.language.types[this.typeId] || "ERROR"
        }
        get grammarType() {
            return this.tree.language.types[this.grammarId] || "ERROR"
        }
        get isNamed() {
            return B4(this), s1._ts_node_is_named_wasm(this.tree[0]) === 1
        }
        get isExtra() {
            return B4(this), s1._ts_node_is_extra_wasm(this.tree[0]) === 1
        }
        get isError() {
            return B4(this), s1._ts_node_is_error_wasm(this.tree[0]) === 1
        }
        get isMissing() {
            return B4(this), s1._ts_node_is_missing_wasm(this.tree[0]) === 1
        }
        get hasChanges() {
            return B4(this), s1._ts_node_has_changes_wasm(this.tree[0]) === 1
        }
        get hasError() {
            return B4(this), s1._ts_node_has_error_wasm(this.tree[0]) === 1
        }
        get endIndex() {
            return B4(this), s1._ts_node_end_index_wasm(this.tree[0])
        }
        get endPosition() {
            return B4(this), s1._ts_node_end_point_wasm(this.tree[0]), em(hB)
        }
        get text() {
            return Wq0(this.tree, this.startIndex, this.endIndex, this.startPosition)
        }
        get parseState() {
            return B4(this), s1._ts_node_parse_state_wasm(this.tree[0])
        }
        get nextParseState() {
            return B4(this), s1._ts_node_next_parse_state_wasm(this.tree[0])
        }
        equals(A) {
            return this.tree === A.tree && this.id === A.id
        }
        child(A) {
            return B4(this), s1._ts_node_child_wasm(this.tree[0], A), jZ(this.tree)
        }
        namedChild(A) {
            return B4(this), s1._ts_node_named_child_wasm(this.tree[0], A), jZ(this.tree)
        }
        childForFieldId(A) {
            return B4(this), s1._ts_node_child_by_field_id_wasm(this.tree[0], A), jZ(this.tree)
        }
        childForFieldName(A) {
            let B = this.tree.language.fields.indexOf(A);
            if (B !== -1) return this.childForFieldId(B);
            return null
        }
        fieldNameForChild(A) {
            B4(this);
            let B = s1._ts_node_field_name_for_child_wasm(this.tree[0], A);
            if (!B) return null;
            return s1.AsciiToString(B)
        }
        fieldNameForNamedChild(A) {
            B4(this);
            let B = s1._ts_node_field_name_for_named_child_wasm(this.tree[0], A);
            if (!B) return null;
            return s1.AsciiToString(B)
        }
        childrenForFieldName(A) {
            let B = this.tree.language.fields.indexOf(A);
            if (B !== -1 && B !== 0) return this.childrenForFieldId(B);
            return []
        }
        childrenForFieldId(A) {
            B4(this), s1._ts_node_children_by_field_id_wasm(this.tree[0], A);
            let B = s1.getValue(hB, "i32"),
                Q = s1.getValue(hB + C9, "i32"),
                Z = new Array(B);
            if (B > 0) {
                let D = Q;
                for (let G = 0; G < B; G++) Z[G] = jZ(this.tree, D), D += ZC;
                s1._free(Q)
            }
            return Z
        }
        firstChildForIndex(A) {
            B4(this);
            let B = hB + ZC;
            return s1.setValue(B, A, "i32"), s1._ts_node_first_child_for_byte_wasm(this.tree[0]), jZ(this.tree)
        }
        firstNamedChildForIndex(A) {
            B4(this);
            let B = hB + ZC;
            return s1.setValue(B, A, "i32"), s1._ts_node_first_named_child_for_byte_wasm(this.tree[0]), jZ(this.tree)
        }
        get childCount() {
            return B4(this), s1._ts_node_child_count_wasm(this.tree[0])
        }
        get namedChildCount() {
            return B4(this), s1._ts_node_named_child_count_wasm(this.tree[0])
        }
        get firstChild() {
            return this.child(0)
        }
        get firstNamedChild() {
            return this.namedChild(0)
        }
        get lastChild() {
            return this.child(this.childCount - 1)
        }
        get lastNamedChild() {
            return this.namedChild(this.namedChildCount - 1)
        }
        get children() {
            if (!this._children) {
                B4(this), s1._ts_node_children_wasm(this.tree[0]);
                let A = s1.getValue(hB, "i32"),
                    B = s1.getValue(hB + C9, "i32");
                if (this._children = new Array(A), A > 0) {
                    let Q = B;
                    for (let Z = 0; Z < A; Z++) this._children[Z] = jZ(this.tree, Q), Q += ZC;
                    s1._free(B)
                }
            }
            return this._children
        }
        get namedChildren() {
            if (!this._namedChildren) {
                B4(this), s1._ts_node_named_children_wasm(this.tree[0]);
                let A = s1.getValue(hB, "i32"),
                    B = s1.getValue(hB + C9, "i32");
                if (this._namedChildren = new Array(A), A > 0) {
                    let Q = B;
                    for (let Z = 0; Z < A; Z++) this._namedChildren[Z] = jZ(this.tree, Q), Q += ZC;
                    s1._free(B)
                }
            }
            return this._namedChildren
        }
        descendantsOfType(A, B = qv, Q = qv) {
            if (!Array.isArray(A)) A = [A];
            let Z = [],
                D = this.tree.language.types;
            for (let W of A)
                if (W == "ERROR") Z.push(65535);
            for (let W = 0, J = D.length; W < J; W++)
                if (A.includes(D[W])) Z.push(W);
            let G = s1._malloc(C9 * Z.length);
            for (let W = 0, J = Z.length; W < J; W++) s1.setValue(G + W * C9, Z[W], "i32");
            B4(this), s1._ts_node_descendants_of_type_wasm(this.tree[0], G, Z.length, B.row, B.column, Q.row, Q.column);
            let F = s1.getValue(hB, "i32"),
                I = s1.getValue(hB + C9, "i32"),
                Y = new Array(F);
            if (F > 0) {
                let W = I;
                for (let J = 0; J < F; J++) Y[J] = jZ(this.tree, W), W += ZC
            }
            return s1._free(I), s1._free(G), Y
        }
        get nextSibling() {
            return B4(this), s1._ts_node_next_sibling_wasm(this.tree[0]), jZ(this.tree)
        }
        get previousSibling() {
            return B4(this), s1._ts_node_prev_sibling_wasm(this.tree[0]), jZ(this.tree)
        }
        get nextNamedSibling() {
            return B4(this), s1._ts_node_next_named_sibling_wasm(this.tree[0]), jZ(this.tree)
        }
        get previousNamedSibling() {
            return B4(this), s1._ts_node_prev_named_sibling_wasm(this.tree[0]), jZ(this.tree)
        }
        get descendantCount() {
            return B4(this), s1._ts_node_descendant_count_wasm(this.tree[0])
        }
        get parent() {
            return B4(this), s1._ts_node_parent_wasm(this.tree[0]), jZ(this.tree)
        }
        childWithDescendant(A) {
            return B4(this), B4(A, 1), s1._ts_node_child_with_descendant_wasm(this.tree[0]), jZ(this.tree)
        }
        descendantForIndex(A, B = A) {
            if (typeof A !== "number" || typeof B !== "number") throw new Error("Arguments must be numbers");
            B4(this);
            let Q = hB + ZC;
            return s1.setValue(Q, A, "i32"), s1.setValue(Q + C9, B, "i32"), s1._ts_node_descendant_for_index_wasm(this.tree[0]), jZ(this.tree)
        }
        namedDescendantForIndex(A, B = A) {
            if (typeof A !== "number" || typeof B !== "number") throw new Error("Arguments must be numbers");
            B4(this);
            let Q = hB + ZC;
            return s1.setValue(Q, A, "i32"), s1.setValue(Q + C9, B, "i32"), s1._ts_node_named_descendant_for_index_wasm(this.tree[0]), jZ(this.tree)
        }
        descendantForPosition(A, B = A) {
            if (!VG1(A) || !VG1(B)) throw new Error("Arguments must be {row, column} objects");
            B4(this);
            let Q = hB + ZC;
            return oE(Q, A), oE(Q + nM, B), s1._ts_node_descendant_for_position_wasm(this.tree[0]), jZ(this.tree)
        }
        namedDescendantForPosition(A, B = A) {
            if (!VG1(A) || !VG1(B)) throw new Error("Arguments must be {row, column} objects");
            B4(this);
            let Q = hB + ZC;
            return oE(Q, A), oE(Q + nM, B), s1._ts_node_named_descendant_for_position_wasm(this.tree[0]), jZ(this.tree)
        }
        walk() {
            return B4(this), s1._ts_tree_cursor_new_wasm(this.tree[0]), new S68(Nv, this.tree)
        }
        edit(A) {
            if (this.startIndex >= A.oldEndIndex) {
                this.startIndex = A.newEndIndex + (this.startIndex - A.oldEndIndex);
                let B, Q;
                if (this.startPosition.row > A.oldEndPosition.row) B = this.startPosition.row - A.oldEndPosition.row, Q = this.startPosition.column;
                else if (B = 0, Q = this.startPosition.column, this.startPosition.column >= A.oldEndPosition.column) Q = this.startPosition.column - A.oldEndPosition.column;
                if (B > 0) this.startPosition.row += B, this.startPosition.column = Q;
                else this.startPosition.column += Q
            } else if (this.startIndex > A.startIndex) this.startIndex = A.newEndIndex, this.startPosition.row = A.newEndPosition.row, this.startPosition.column = A.newEndPosition.column
        }
        toString() {
            B4(this);
            let A = s1._ts_node_to_string_wasm(this.tree[0]),
                B = s1.AsciiToString(A);
            return s1._free(A), B
        }
    };

function Yq0(A, B, Q, Z, D) {
    for (let G = 0, F = D.length; G < F; G++) {
        let I = s1.getValue(Q, "i32");
        Q += C9;
        let Y = jZ(B, Q);
        Q += ZC, D[G] = {
            patternIndex: Z,
            name: A.captureNames[I],
            node: Y
        }
    }
    return Q
}
i0(Yq0, "unmarshalCaptures");

function B4(A, B = 0) {
    let Q = hB + B * ZC;
    s1.setValue(Q, A.id, "i32"), Q += C9, s1.setValue(Q, A.startIndex, "i32"), Q += C9, s1.setValue(Q, A.startPosition.row, "i32"), Q += C9, s1.setValue(Q, A.startPosition.column, "i32"), Q += C9, s1.setValue(Q, A[0], "i32")
}
i0(B4, "marshalNode");

function jZ(A, B = hB) {
    let Q = s1.getValue(B, "i32");
    if (B += C9, Q === 0) return null;
    let Z = s1.getValue(B, "i32");
    B += C9;
    let D = s1.getValue(B, "i32");
    B += C9;
    let G = s1.getValue(B, "i32");
    B += C9;
    let F = s1.getValue(B, "i32");
    return new j68(Nv, {
        id: Q,
        tree: A,
        startIndex: Z,
        startPosition: {
            row: D,
            column: G
        },
        other: F
    })
}
i0(jZ, "unmarshalNode");

function m3(A, B = hB) {
    s1.setValue(B + 0 * C9, A[0], "i32"), s1.setValue(B + 1 * C9, A[1], "i32"), s1.setValue(B + 2 * C9, A[2], "i32"), s1.setValue(B + 3 * C9, A[3], "i32")
}
i0(m3, "marshalTreeCursor");

function rK(A) {
    A[0] = s1.getValue(hB + 0 * C9, "i32"), A[1] = s1.getValue(hB + 1 * C9, "i32"), A[2] = s1.getValue(hB + 2 * C9, "i32"), A[3] = s1.getValue(hB + 3 * C9, "i32")
}
i0(rK, "unmarshalTreeCursor");

function oE(A, B) {
    s1.setValue(A, B.row, "i32"), s1.setValue(A + C9, B.column, "i32")
}
i0(oE, "marshalPoint");

function em(A) {
    return {
        row: s1.getValue(A, "i32") >>> 0,
        column: s1.getValue(A + C9, "i32") >>> 0
    }
}
i0(em, "unmarshalPoint");

function _MB(A, B) {
    oE(A, B.startPosition), A += nM, oE(A, B.endPosition), A += nM, s1.setValue(A, B.startIndex, "i32"), A += C9, s1.setValue(A, B.endIndex, "i32"), A += C9
}
i0(_MB, "marshalRange");

function Rv1(A) {
    let B = {};
    return B.startPosition = em(A), A += nM, B.endPosition = em(A), A += nM, B.startIndex = s1.getValue(A, "i32") >>> 0, A += C9, B.endIndex = s1.getValue(A, "i32") >>> 0, B
}
i0(Rv1, "unmarshalRange");

function xMB(A, B = hB) {
    oE(B, A.startPosition), B += nM, oE(B, A.oldEndPosition), B += nM, oE(B, A.newEndPosition), B += nM, s1.setValue(B, A.startIndex, "i32"), B += C9, s1.setValue(B, A.oldEndIndex, "i32"), B += C9, s1.setValue(B, A.newEndIndex, "i32"), B += C9
}
i0(xMB, "marshalEdit");

function vMB(A) {
    let B = {};
    return B.major_version = s1.getValue(A, "i32"), A += C9, B.minor_version = s1.getValue(A, "i32"), A += C9, B.field_count = s1.getValue(A, "i32"), B
}
i0(vMB, "unmarshalLanguageMetadata");