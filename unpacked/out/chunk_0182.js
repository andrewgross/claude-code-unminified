/* chunk:182 bytes:[3967914, 3981516) size:13602 source:unpacked-cli.js */
var wnA = E((MW5, UnA) => {
    function E84(A) {
        let B = {
                className: "string",
                begin: /'(.|\\[xXuU][a-zA-Z0-9]+)'/
            },
            Q = {
                className: "string",
                variants: [{
                    begin: '"',
                    end: '"'
                }]
            },
            D = {
                className: "function",
                beginKeywords: "def",
                end: /[:={\[(\n;]/,
                excludeEnd: !0,
                contains: [{
                    className: "title",
                    relevance: 0,
                    begin: /[^0-9\n\t "'(),.`{}\[\]:;][^\n\t "'(),.`{}\[\]:;]+|[^0-9\n\t "'(),.`{}\[\]:;=]/
                }]
            };
        return {
            name: "Flix",
            keywords: {
                literal: "true false",
                keyword: "case class def else enum if impl import in lat rel index let match namespace switch type yield with"
            },
            contains: [A.C_LINE_COMMENT_MODE, A.C_BLOCK_COMMENT_MODE, B, Q, D, A.C_NUMBER_MODE]
        }
    }
    UnA.exports = E84
});
var qnA = E((RW5, $nA) => {
    function U84(A) {
        if (!A) return null;
        if (typeof A === "string") return A;
        return A.source
    }

    function SQ0(...A) {
        return A.map((Q) => U84(Q)).join("")
    }

    function w84(A) {
        let B = {
                className: "params",
                begin: "\\(",
                end: "\\)"
            },
            Q = {
                variants: [A.COMMENT("!", "$", {
                    relevance: 0
                }), A.COMMENT("^C[ ]", "$", {
                    relevance: 0
                }), A.COMMENT("^C$", "$", {
                    relevance: 0
                })]
            },
            Z = /(_[a-z_\d]+)?/,
            D = /([de][+-]?\d+)?/,
            G = {
                className: "number",
                variants: [{
                    begin: SQ0(/\b\d+/, /\.(\d*)/, D, Z)
                }, {
                    begin: SQ0(/\b\d+/, D, Z)
                }, {
                    begin: SQ0(/\.\d+/, D, Z)
                }],
                relevance: 0
            },
            F = {
                className: "function",
                beginKeywords: "subroutine function program",
                illegal: "[${=\\n]",
                contains: [A.UNDERSCORE_TITLE_MODE, B]
            },
            I = {
                className: "string",
                relevance: 0,
                variants: [A.APOS_STRING_MODE, A.QUOTE_STRING_MODE]
            };
        return {
            name: "Fortran",
            case_insensitive: !0,
            aliases: ["f90", "f95"],
            keywords: {
                literal: ".False. .True.",
                keyword: "kind do concurrent local shared while private call intrinsic where elsewhere type endtype endmodule endselect endinterface end enddo endif if forall endforall only contains default return stop then block endblock endassociate public subroutine|10 function program .and. .or. .not. .le. .eq. .ge. .gt. .lt. goto save else use module select case access blank direct exist file fmt form formatted iostat name named nextrec number opened rec recl sequential status unformatted unit continue format pause cycle exit c_null_char c_alert c_backspace c_form_feed flush wait decimal round iomsg synchronous nopass non_overridable pass protected volatile abstract extends import non_intrinsic value deferred generic final enumerator class associate bind enum c_int c_short c_long c_long_long c_signed_char c_size_t c_int8_t c_int16_t c_int32_t c_int64_t c_int_least8_t c_int_least16_t c_int_least32_t c_int_least64_t c_int_fast8_t c_int_fast16_t c_int_fast32_t c_int_fast64_t c_intmax_t C_intptr_t c_float c_double c_long_double c_float_complex c_double_complex c_long_double_complex c_bool c_char c_null_ptr c_null_funptr c_new_line c_carriage_return c_horizontal_tab c_vertical_tab iso_c_binding c_loc c_funloc c_associated  c_f_pointer c_ptr c_funptr iso_fortran_env character_storage_size error_unit file_storage_size input_unit iostat_end iostat_eor numeric_storage_size output_unit c_f_procpointer ieee_arithmetic ieee_support_underflow_control ieee_get_underflow_mode ieee_set_underflow_mode newunit contiguous recursive pad position action delim readwrite eor advance nml interface procedure namelist include sequence elemental pure impure integer real character complex logical codimension dimension allocatable|10 parameter external implicit|10 none double precision assign intent optional pointer target in out common equivalence data",
                built_in: "alog alog10 amax0 amax1 amin0 amin1 amod cabs ccos cexp clog csin csqrt dabs dacos dasin datan datan2 dcos dcosh ddim dexp dint dlog dlog10 dmax1 dmin1 dmod dnint dsign dsin dsinh dsqrt dtan dtanh float iabs idim idint idnint ifix isign max0 max1 min0 min1 sngl algama cdabs cdcos cdexp cdlog cdsin cdsqrt cqabs cqcos cqexp cqlog cqsin cqsqrt dcmplx dconjg derf derfc dfloat dgamma dimag dlgama iqint qabs qacos qasin qatan qatan2 qcmplx qconjg qcos qcosh qdim qerf qerfc qexp qgamma qimag qlgama qlog qlog10 qmax1 qmin1 qmod qnint qsign qsin qsinh qsqrt qtan qtanh abs acos aimag aint anint asin atan atan2 char cmplx conjg cos cosh exp ichar index int log log10 max min nint sign sin sinh sqrt tan tanh print write dim lge lgt lle llt mod nullify allocate deallocate adjustl adjustr all allocated any associated bit_size btest ceiling count cshift date_and_time digits dot_product eoshift epsilon exponent floor fraction huge iand ibclr ibits ibset ieor ior ishft ishftc lbound len_trim matmul maxexponent maxloc maxval merge minexponent minloc minval modulo mvbits nearest pack present product radix random_number random_seed range repeat reshape rrspacing scale scan selected_int_kind selected_real_kind set_exponent shape size spacing spread sum system_clock tiny transpose trim ubound unpack verify achar iachar transfer dble entry dprod cpu_time command_argument_count get_command get_command_argument get_environment_variable is_iostat_end ieee_arithmetic ieee_support_underflow_control ieee_get_underflow_mode ieee_set_underflow_mode is_iostat_eor move_alloc new_line selected_char_kind same_type_as extends_type_of acosh asinh atanh bessel_j0 bessel_j1 bessel_jn bessel_y0 bessel_y1 bessel_yn erf erfc erfc_scaled gamma log_gamma hypot norm2 atomic_define atomic_ref execute_command_line leadz trailz storage_size merge_bits bge bgt ble blt dshiftl dshiftr findloc iall iany iparity image_index lcobound ucobound maskl maskr num_images parity popcnt poppar shifta shiftl shiftr this_image sync change team co_broadcast co_max co_min co_sum co_reduce"
            },
            illegal: /\/\*/,
            contains: [I, F, {
                begin: /^C\s*=(?!=)/,
                relevance: 0
            }, Q, G]
        }
    }
    $nA.exports = w84
});
var LnA = E((OW5, NnA) => {
    function $84(A) {
        let B = {
            begin: "<",
            end: ">",
            contains: [A.inherit(A.TITLE_MODE, {
                begin: /'[a-zA-Z0-9_]+/
            })]
        };
        return {
            name: "F#",
            aliases: ["fs"],
            keywords: "abstract and as assert base begin class default delegate do done downcast downto elif else end exception extern false finally for fun function global if in inherit inline interface internal lazy let match member module mutable namespace new null of open or override private public rec return sig static struct then to true try type upcast use val void when while with yield",
            illegal: /\/\*/,
            contains: [{
                className: "keyword",
                begin: /\b(yield|return|let|do)!/
            }, {
                className: "string",
                begin: '@"',
                end: '"',
                contains: [{
                    begin: '""'
                }]
            }, {
                className: "string",
                begin: '"""',
                end: '"""'
            }, A.COMMENT("\\(\\*(\\s)", "\\*\\)", {
                contains: ["self"]
            }), {
                className: "class",
                beginKeywords: "type",
                end: "\\(|=|$",
                excludeEnd: !0,
                contains: [A.UNDERSCORE_TITLE_MODE, B]
            }, {
                className: "meta",
                begin: "\\[<",
                end: ">\\]",
                relevance: 10
            }, {
                className: "symbol",
                begin: "\\B('[A-Za-z])\\b",
                contains: [A.BACKSLASH_ESCAPE]
            }, A.C_LINE_COMMENT_MODE, A.inherit(A.QUOTE_STRING_MODE, {
                illegal: null
            }), A.C_NUMBER_MODE]
        }
    }
    NnA.exports = $84
});
var RnA = E((TW5, MnA) => {
    function q84(A) {
        if (!A) return null;
        if (typeof A === "string") return A;
        return A.source
    }

    function N84(A) {
        return jQ0("(", A, ")*")
    }

    function jQ0(...A) {
        return A.map((Q) => q84(Q)).join("")
    }

    function L84(A) {
        let B = {
                keyword: "abort acronym acronyms alias all and assign binary card diag display else eq file files for free ge gt if integer le loop lt maximizing minimizing model models ne negative no not option options or ord positive prod put putpage puttl repeat sameas semicont semiint smax smin solve sos1 sos2 sum system table then until using while xor yes",
                literal: "eps inf na",
                built_in: "abs arccos arcsin arctan arctan2 Beta betaReg binomial ceil centropy cos cosh cvPower div div0 eDist entropy errorf execSeed exp fact floor frac gamma gammaReg log logBeta logGamma log10 log2 mapVal max min mod ncpCM ncpF ncpVUpow ncpVUsin normal pi poly power randBinomial randLinear randTriangle round rPower sigmoid sign signPower sin sinh slexp sllog10 slrec sqexp sqlog10 sqr sqrec sqrt tan tanh trunc uniform uniformInt vcPower bool_and bool_eqv bool_imp bool_not bool_or bool_xor ifThen rel_eq rel_ge rel_gt rel_le rel_lt rel_ne gday gdow ghour gleap gmillisec gminute gmonth gsecond gyear jdate jnow jstart jtime errorLevel execError gamsRelease gamsVersion handleCollect handleDelete handleStatus handleSubmit heapFree heapLimit heapSize jobHandle jobKill jobStatus jobTerminate licenseLevel licenseStatus maxExecError sleep timeClose timeComp timeElapsed timeExec timeStart"
            },
            Q = {
                className: "params",
                begin: /\(/,
                end: /\)/,
                excludeBegin: !0,
                excludeEnd: !0
            },
            Z = {
                className: "symbol",
                variants: [{
                    begin: /=[lgenxc]=/
                }, {
                    begin: /\$/
                }]
            },
            D = {
                className: "comment",
                variants: [{
                    begin: "'",
                    end: "'"
                }, {
                    begin: '"',
                    end: '"'
                }],
                illegal: "\\n",
                contains: [A.BACKSLASH_ESCAPE]
            },
            G = {
                begin: "/",
                end: "/",
                keywords: B,
                contains: [D, A.C_LINE_COMMENT_MODE, A.C_BLOCK_COMMENT_MODE, A.QUOTE_STRING_MODE, A.APOS_STRING_MODE, A.C_NUMBER_MODE]
            },
            F = /[a-z0-9&#*=?@\\><:,()$[\]_.{}!+%^-]+/,
            I = {
                begin: /[a-z][a-z0-9_]*(\([a-z0-9_, ]*\))?[ \t]+/,
                excludeBegin: !0,
                end: "$",
                endsWithParent: !0,
                contains: [D, G, {
                    className: "comment",
                    begin: jQ0(F, N84(jQ0(/[ ]+/, F))),
                    relevance: 0
                }]
            };
        return {
            name: "GAMS",
            aliases: ["gms"],
            case_insensitive: !0,
            keywords: B,
            contains: [A.COMMENT(/^\$ontext/, /^\$offtext/), {
                className: "meta",
                begin: "^\\$[a-z0-9]+",
                end: "$",
                returnBegin: !0,
                contains: [{
                    className: "meta-keyword",
                    begin: "^\\$[a-z0-9]+"
                }]
            }, A.COMMENT("^\\*", "$"), A.C_LINE_COMMENT_MODE, A.C_BLOCK_COMMENT_MODE, A.QUOTE_STRING_MODE, A.APOS_STRING_MODE, {
                beginKeywords: "set sets parameter parameters variable variables scalar scalars equation equations",
                end: ";",
                contains: [A.COMMENT("^\\*", "$"), A.C_LINE_COMMENT_MODE, A.C_BLOCK_COMMENT_MODE, A.QUOTE_STRING_MODE, A.APOS_STRING_MODE, G, I]
            }, {
                beginKeywords: "table",
                end: ";",
                returnBegin: !0,
                contains: [{
                    beginKeywords: "table",
                    end: "$",
                    contains: [I]
                }, A.COMMENT("^\\*", "$"), A.C_LINE_COMMENT_MODE, A.C_BLOCK_COMMENT_MODE, A.QUOTE_STRING_MODE, A.APOS_STRING_MODE, A.C_NUMBER_MODE]
            }, {
                className: "function",
                begin: /^[a-z][a-z0-9_,\-+' ()$]+\.{2}/,
                returnBegin: !0,
                contains: [{
                    className: "title",
                    begin: /^[a-z0-9_]+/
                }, Q, Z]
            }, A.C_NUMBER_MODE, Z]
        }
    }
    MnA.exports = L84
});