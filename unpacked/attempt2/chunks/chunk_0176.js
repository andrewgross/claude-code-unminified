/* chunk:176 bytes:[3859085, 3873359) size:14274 source:unpacked-cli.js */
var JiA = E((nY5, WiA) => {
    function z64(A) {
        return {
            name: "CMake",
            aliases: ["cmake.in"],
            case_insensitive: !0,
            keywords: {
                keyword: "break cmake_host_system_information cmake_minimum_required cmake_parse_arguments cmake_policy configure_file continue elseif else endforeach endfunction endif endmacro endwhile execute_process file find_file find_library find_package find_path find_program foreach function get_cmake_property get_directory_property get_filename_component get_property if include include_guard list macro mark_as_advanced math message option return separate_arguments set_directory_properties set_property set site_name string unset variable_watch while add_compile_definitions add_compile_options add_custom_command add_custom_target add_definitions add_dependencies add_executable add_library add_link_options add_subdirectory add_test aux_source_directory build_command create_test_sourcelist define_property enable_language enable_testing export fltk_wrap_ui get_source_file_property get_target_property get_test_property include_directories include_external_msproject include_regular_expression install link_directories link_libraries load_cache project qt_wrap_cpp qt_wrap_ui remove_definitions set_source_files_properties set_target_properties set_tests_properties source_group target_compile_definitions target_compile_features target_compile_options target_include_directories target_link_directories target_link_libraries target_link_options target_sources try_compile try_run ctest_build ctest_configure ctest_coverage ctest_empty_binary_directory ctest_memcheck ctest_read_custom_files ctest_run_script ctest_sleep ctest_start ctest_submit ctest_test ctest_update ctest_upload build_name exec_program export_library_dependencies install_files install_programs install_targets load_command make_directory output_required_files remove subdir_depends subdirs use_mangled_mesa utility_source variable_requires write_file qt5_use_modules qt5_use_package qt5_wrap_cpp on off true false and or not command policy target test exists is_newer_than is_directory is_symlink is_absolute matches less greater equal less_equal greater_equal strless strgreater strequal strless_equal strgreater_equal version_less version_greater version_equal version_less_equal version_greater_equal in_list defined"
            },
            contains: [{
                className: "variable",
                begin: /\$\{/,
                end: /\}/
            }, A.HASH_COMMENT_MODE, A.QUOTE_STRING_MODE, A.NUMBER_MODE]
        }
    }
    WiA.exports = z64
});
var ViA = E((aY5, XiA) => {
    var E64 = ["as", "in", "of", "if", "for", "while", "finally", "var", "new", "function", "do", "return", "void", "else", "break", "catch", "instanceof", "with", "throw", "case", "default", "try", "switch", "continue", "typeof", "delete", "let", "yield", "const", "class", "debugger", "async", "await", "static", "import", "from", "export", "extends"],
        U64 = ["true", "false", "null", "undefined", "NaN", "Infinity"],
        w64 = ["Intl", "DataView", "Number", "Math", "Date", "String", "RegExp", "Object", "Function", "Boolean", "Error", "Symbol", "Set", "Map", "WeakSet", "WeakMap", "Proxy", "Reflect", "JSON", "Promise", "Float64Array", "Int16Array", "Int32Array", "Int8Array", "Uint16Array", "Uint32Array", "Float32Array", "Array", "Uint8Array", "Uint8ClampedArray", "ArrayBuffer", "BigInt64Array", "BigUint64Array", "BigInt"],
        $64 = ["EvalError", "InternalError", "RangeError", "ReferenceError", "SyntaxError", "TypeError", "URIError"],
        q64 = ["setInterval", "setTimeout", "clearInterval", "clearTimeout", "require", "exports", "eval", "isFinite", "isNaN", "parseFloat", "parseInt", "decodeURI", "decodeURIComponent", "encodeURI", "encodeURIComponent", "escape", "unescape"],
        N64 = ["arguments", "this", "super", "console", "window", "document", "localStorage", "module", "global"],
        L64 = [].concat(q64, N64, w64, $64);

    function M64(A) {
        let B = ["npm", "print"],
            Q = ["yes", "no", "on", "off"],
            Z = ["then", "unless", "until", "loop", "by", "when", "and", "or", "is", "isnt", "not"],
            D = ["var", "const", "let", "function", "static"],
            G = (C) => (K) => !C.includes(K),
            F = {
                keyword: E64.concat(Z).filter(G(D)),
                literal: U64.concat(Q),
                built_in: L64.concat(B)
            },
            I = "[A-Za-z$_][0-9A-Za-z$_]*",
            Y = {
                className: "subst",
                begin: /#\{/,
                end: /\}/,
                keywords: F
            },
            W = [A.BINARY_NUMBER_MODE, A.inherit(A.C_NUMBER_MODE, {
                starts: {
                    end: "(\\s*/)?",
                    relevance: 0
                }
            }), {
                className: "string",
                variants: [{
                    begin: /'''/,
                    end: /'''/,
                    contains: [A.BACKSLASH_ESCAPE]
                }, {
                    begin: /'/,
                    end: /'/,
                    contains: [A.BACKSLASH_ESCAPE]
                }, {
                    begin: /"""/,
                    end: /"""/,
                    contains: [A.BACKSLASH_ESCAPE, Y]
                }, {
                    begin: /"/,
                    end: /"/,
                    contains: [A.BACKSLASH_ESCAPE, Y]
                }]
            }, {
                className: "regexp",
                variants: [{
                    begin: "///",
                    end: "///",
                    contains: [Y, A.HASH_COMMENT_MODE]
                }, {
                    begin: "//[gim]{0,3}(?=\\W)",
                    relevance: 0
                }, {
                    begin: /\/(?![ *]).*?(?![\\]).\/[gim]{0,3}(?=\W)/
                }]
            }, {
                begin: "@[A-Za-z$_][0-9A-Za-z$_]*"
            }, {
                subLanguage: "javascript",
                excludeBegin: !0,
                excludeEnd: !0,
                variants: [{
                    begin: "```",
                    end: "```"
                }, {
                    begin: "`",
                    end: "`"
                }]
            }];
        Y.contains = W;
        let J = A.inherit(A.TITLE_MODE, {
                begin: "[A-Za-z$_][0-9A-Za-z$_]*"
            }),
            X = "(\\(.*\\)\\s*)?\\B[-=]>",
            V = {
                className: "params",
                begin: "\\([^\\(]",
                returnBegin: !0,
                contains: [{
                    begin: /\(/,
                    end: /\)/,
                    keywords: F,
                    contains: ["self"].concat(W)
                }]
            };
        return {
            name: "CoffeeScript",
            aliases: ["coffee", "cson", "iced"],
            keywords: F,
            illegal: /\/\*/,
            contains: W.concat([A.COMMENT("###", "###"), A.HASH_COMMENT_MODE, {
                className: "function",
                begin: "^\\s*[A-Za-z$_][0-9A-Za-z$_]*\\s*=\\s*" + X,
                end: "[-=]>",
                returnBegin: !0,
                contains: [J, V]
            }, {
                begin: /[:\(,=]\s*/,
                relevance: 0,
                contains: [{
                    className: "function",
                    begin: X,
                    end: "[-=]>",
                    returnBegin: !0,
                    contains: [V]
                }]
            }, {
                className: "class",
                beginKeywords: "class",
                end: "$",
                illegal: /[:="\[\]]/,
                contains: [{
                    beginKeywords: "extends",
                    endsWithParent: !0,
                    illegal: /[:="\[\]]/,
                    contains: [J]
                }, J]
            }, {
                begin: "[A-Za-z$_][0-9A-Za-z$_]*:",
                end: ":",
                returnBegin: !0,
                returnEnd: !0,
                relevance: 0
            }])
        }
    }
    XiA.exports = M64
});
var KiA = E((sY5, CiA) => {
    function R64(A) {
        return {
            name: "Coq",
            keywords: {
                keyword: "_|0 as at cofix else end exists exists2 fix for forall fun if IF in let match mod Prop return Set then Type using where with Abort About Add Admit Admitted All Arguments Assumptions Axiom Back BackTo Backtrack Bind Blacklist Canonical Cd Check Class Classes Close Coercion Coercions CoFixpoint CoInductive Collection Combined Compute Conjecture Conjectures Constant constr Constraint Constructors Context Corollary CreateHintDb Cut Declare Defined Definition Delimit Dependencies Dependent Derive Drop eauto End Equality Eval Example Existential Existentials Existing Export exporting Extern Extract Extraction Fact Field Fields File Fixpoint Focus for From Function Functional Generalizable Global Goal Grab Grammar Graph Guarded Heap Hint HintDb Hints Hypotheses Hypothesis ident Identity If Immediate Implicit Import Include Inductive Infix Info Initial Inline Inspect Instance Instances Intro Intros Inversion Inversion_clear Language Left Lemma Let Libraries Library Load LoadPath Local Locate Ltac ML Mode Module Modules Monomorphic Morphism Next NoInline Notation Obligation Obligations Opaque Open Optimize Options Parameter Parameters Parametric Path Paths pattern Polymorphic Preterm Print Printing Program Projections Proof Proposition Pwd Qed Quit Rec Record Recursive Redirect Relation Remark Remove Require Reserved Reset Resolve Restart Rewrite Right Ring Rings Save Scheme Scope Scopes Script Search SearchAbout SearchHead SearchPattern SearchRewrite Section Separate Set Setoid Show Solve Sorted Step Strategies Strategy Structure SubClass Table Tables Tactic Term Test Theorem Time Timeout Transparent Type Typeclasses Types Undelimit Undo Unfocus Unfocused Unfold Universe Universes Unset Unshelve using Variable Variables Variant Verbose Visibility where with",
                built_in: "abstract absurd admit after apply as assert assumption at auto autorewrite autounfold before bottom btauto by case case_eq cbn cbv change classical_left classical_right clear clearbody cofix compare compute congruence constr_eq constructor contradict contradiction cut cutrewrite cycle decide decompose dependent destruct destruction dintuition discriminate discrR do double dtauto eapply eassumption eauto ecase econstructor edestruct ediscriminate eelim eexact eexists einduction einjection eleft elim elimtype enough equality erewrite eright esimplify_eq esplit evar exact exactly_once exfalso exists f_equal fail field field_simplify field_simplify_eq first firstorder fix fold fourier functional generalize generalizing gfail give_up has_evar hnf idtac in induction injection instantiate intro intro_pattern intros intuition inversion inversion_clear is_evar is_var lapply lazy left lia lra move native_compute nia nsatz omega once pattern pose progress proof psatz quote record red refine reflexivity remember rename repeat replace revert revgoals rewrite rewrite_strat right ring ring_simplify rtauto set setoid_reflexivity setoid_replace setoid_rewrite setoid_symmetry setoid_transitivity shelve shelve_unifiable simpl simple simplify_eq solve specialize split split_Rabs split_Rmult stepl stepr subst sum swap symmetry tactic tauto time timeout top transitivity trivial try tryif unfold unify until using vm_compute with"
            },
            contains: [A.QUOTE_STRING_MODE, A.COMMENT("\\(\\*", "\\*\\)"), A.C_NUMBER_MODE, {
                className: "type",
                excludeBegin: !0,
                begin: "\\|\\s*",
                end: "\\w+"
            }, {
                begin: /[-=]>/
            }]
        }
    }
    CiA.exports = R64
});
var ziA = E((rY5, HiA) => {
    function O64(A) {
        return {
            name: "Caché Object Script",
            case_insensitive: !0,
            aliases: ["cls"],
            keywords: "property parameter class classmethod clientmethod extends as break catch close continue do d|0 else elseif for goto halt hang h|0 if job j|0 kill k|0 lock l|0 merge new open quit q|0 read r|0 return set s|0 tcommit throw trollback try tstart use view while write w|0 xecute x|0 zkill znspace zn ztrap zwrite zw zzdump zzwrite print zbreak zinsert zload zprint zremove zsave zzprint mv mvcall mvcrt mvdim mvprint zquit zsync ascii",
            contains: [{
                className: "number",
                begin: "\\b(\\d+(\\.\\d*)?|\\.\\d+)",
                relevance: 0
            }, {
                className: "string",
                variants: [{
                    begin: '"',
                    end: '"',
                    contains: [{
                        begin: '""',
                        relevance: 0
                    }]
                }]
            }, A.C_LINE_COMMENT_MODE, A.C_BLOCK_COMMENT_MODE, {
                className: "comment",
                begin: /;/,
                end: "$",
                relevance: 0
            }, {
                className: "built_in",
                begin: /(?:\$\$?|\.\.)\^?[a-zA-Z]+/
            }, {
                className: "built_in",
                begin: /\$\$\$[a-zA-Z]+/
            }, {
                className: "built_in",
                begin: /%[a-z]+(?:\.[a-z]+)*/
            }, {
                className: "symbol",
                begin: /\^%?[a-zA-Z][\w]*/
            }, {
                className: "keyword",
                begin: /##class|##super|#define|#dim/
            }, {
                begin: /&sql\(/,
                end: /\)/,
                excludeBegin: !0,
                excludeEnd: !0,
                subLanguage: "sql"
            }, {
                begin: /&(js|jscript|javascript)</,
                end: />/,
                excludeBegin: !0,
                excludeEnd: !0,
                subLanguage: "javascript"
            }, {
                begin: /&html<\s*</,
                end: />\s*>/,
                subLanguage: "xml"
            }]
        }
    }
    HiA.exports = O64
});