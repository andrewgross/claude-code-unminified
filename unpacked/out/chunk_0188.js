/* chunk:188 bytes:[4095866, 4105374) size:9508 source:unpacked-cli.js */
var WaA = E((pW5, YaA) => {
    function e84(A) {
        return {
            name: "Inform 7",
            aliases: ["i7"],
            case_insensitive: !0,
            keywords: {
                keyword: "thing room person man woman animal container supporter backdrop door scenery open closed locked inside gender is are say understand kind of rule"
            },
            contains: [{
                className: "string",
                begin: '"',
                end: '"',
                relevance: 0,
                contains: [{
                    className: "subst",
                    begin: "\\[",
                    end: "\\]"
                }]
            }, {
                className: "section",
                begin: /^(Volume|Book|Part|Chapter|Section|Table)\b/,
                end: "$"
            }, {
                begin: /^(Check|Carry out|Report|Instead of|To|Rule|When|Before|After)\b/,
                end: ":",
                contains: [{
                    begin: "\\(This",
                    end: "\\)"
                }]
            }, {
                className: "comment",
                begin: "\\[",
                end: "\\]",
                contains: ["self"]
            }]
        }
    }
    YaA.exports = e84
});
var CaA = E((iW5, VaA) => {
    function JaA(A) {
        if (!A) return null;
        if (typeof A === "string") return A;
        return A.source
    }

    function A54(A) {
        return XaA("(?=", A, ")")
    }

    function XaA(...A) {
        return A.map((Q) => JaA(Q)).join("")
    }

    function B54(...A) {
        return "(" + A.map((Q) => JaA(Q)).join("|") + ")"
    }

    function Q54(A) {
        let B = {
                className: "number",
                relevance: 0,
                variants: [{
                    begin: /([+-]+)?[\d]+_[\d_]+/
                }, {
                    begin: A.NUMBER_RE
                }]
            },
            Q = A.COMMENT();
        Q.variants = [{
            begin: /;/,
            end: /$/
        }, {
            begin: /#/,
            end: /$/
        }];
        let Z = {
                className: "variable",
                variants: [{
                    begin: /\$[\w\d"][\w\d_]*/
                }, {
                    begin: /\$\{(.*?)\}/
                }]
            },
            D = {
                className: "literal",
                begin: /\bon|off|true|false|yes|no\b/
            },
            G = {
                className: "string",
                contains: [A.BACKSLASH_ESCAPE],
                variants: [{
                    begin: "'''",
                    end: "'''",
                    relevance: 10
                }, {
                    begin: '"""',
                    end: '"""',
                    relevance: 10
                }, {
                    begin: '"',
                    end: '"'
                }, {
                    begin: "'",
                    end: "'"
                }]
            },
            F = {
                begin: /\[/,
                end: /\]/,
                contains: [Q, D, Z, G, B, "self"],
                relevance: 0
            },
            J = B54(/[A-Za-z0-9_-]+/, /"(\\"|[^"])*"/, /'[^']*'/),
            X = XaA(J, "(\\s*\\.\\s*", J, ")*", A54(/\s*=\s*[^#\s]/));
        return {
            name: "TOML, also INI",
            aliases: ["toml"],
            case_insensitive: !0,
            illegal: /\S/,
            contains: [Q, {
                className: "section",
                begin: /\[+/,
                end: /\]+/
            }, {
                begin: X,
                className: "attr",
                starts: {
                    end: /$/,
                    contains: [Q, F, D, Z, G, B]
                }
            }]
        }
    }
    VaA.exports = Q54
});
var HaA = E((nW5, KaA) => {
    function Z54(A) {
        if (!A) return null;
        if (typeof A === "string") return A;
        return A.source
    }

    function yQ0(...A) {
        return A.map((Q) => Z54(Q)).join("")
    }

    function D54(A) {
        let B = {
                className: "params",
                begin: "\\(",
                end: "\\)"
            },
            Q = /(_[a-z_\d]+)?/,
            Z = /([de][+-]?\d+)?/,
            D = {
                className: "number",
                variants: [{
                    begin: yQ0(/\b\d+/, /\.(\d*)/, Z, Q)
                }, {
                    begin: yQ0(/\b\d+/, Z, Q)
                }, {
                    begin: yQ0(/\.\d+/, Z, Q)
                }],
                relevance: 0
            };
        return {
            name: "IRPF90",
            case_insensitive: !0,
            keywords: {
                literal: ".False. .True.",
                keyword: "kind do while private call intrinsic where elsewhere type endtype endmodule endselect endinterface end enddo endif if forall endforall only contains default return stop then public subroutine|10 function program .and. .or. .not. .le. .eq. .ge. .gt. .lt. goto save else use module select case access blank direct exist file fmt form formatted iostat name named nextrec number opened rec recl sequential status unformatted unit continue format pause cycle exit c_null_char c_alert c_backspace c_form_feed flush wait decimal round iomsg synchronous nopass non_overridable pass protected volatile abstract extends import non_intrinsic value deferred generic final enumerator class associate bind enum c_int c_short c_long c_long_long c_signed_char c_size_t c_int8_t c_int16_t c_int32_t c_int64_t c_int_least8_t c_int_least16_t c_int_least32_t c_int_least64_t c_int_fast8_t c_int_fast16_t c_int_fast32_t c_int_fast64_t c_intmax_t C_intptr_t c_float c_double c_long_double c_float_complex c_double_complex c_long_double_complex c_bool c_char c_null_ptr c_null_funptr c_new_line c_carriage_return c_horizontal_tab c_vertical_tab iso_c_binding c_loc c_funloc c_associated  c_f_pointer c_ptr c_funptr iso_fortran_env character_storage_size error_unit file_storage_size input_unit iostat_end iostat_eor numeric_storage_size output_unit c_f_procpointer ieee_arithmetic ieee_support_underflow_control ieee_get_underflow_mode ieee_set_underflow_mode newunit contiguous recursive pad position action delim readwrite eor advance nml interface procedure namelist include sequence elemental pure integer real character complex logical dimension allocatable|10 parameter external implicit|10 none double precision assign intent optional pointer target in out common equivalence data begin_provider &begin_provider end_provider begin_shell end_shell begin_template end_template subst assert touch soft_touch provide no_dep free irp_if irp_else irp_endif irp_write irp_read",
                built_in: "alog alog10 amax0 amax1 amin0 amin1 amod cabs ccos cexp clog csin csqrt dabs dacos dasin datan datan2 dcos dcosh ddim dexp dint dlog dlog10 dmax1 dmin1 dmod dnint dsign dsin dsinh dsqrt dtan dtanh float iabs idim idint idnint ifix isign max0 max1 min0 min1 sngl algama cdabs cdcos cdexp cdlog cdsin cdsqrt cqabs cqcos cqexp cqlog cqsin cqsqrt dcmplx dconjg derf derfc dfloat dgamma dimag dlgama iqint qabs qacos qasin qatan qatan2 qcmplx qconjg qcos qcosh qdim qerf qerfc qexp qgamma qimag qlgama qlog qlog10 qmax1 qmin1 qmod qnint qsign qsin qsinh qsqrt qtan qtanh abs acos aimag aint anint asin atan atan2 char cmplx conjg cos cosh exp ichar index int log log10 max min nint sign sin sinh sqrt tan tanh print write dim lge lgt lle llt mod nullify allocate deallocate adjustl adjustr all allocated any associated bit_size btest ceiling count cshift date_and_time digits dot_product eoshift epsilon exponent floor fraction huge iand ibclr ibits ibset ieor ior ishft ishftc lbound len_trim matmul maxexponent maxloc maxval merge minexponent minloc minval modulo mvbits nearest pack present product radix random_number random_seed range repeat reshape rrspacing scale scan selected_int_kind selected_real_kind set_exponent shape size spacing spread sum system_clock tiny transpose trim ubound unpack verify achar iachar transfer dble entry dprod cpu_time command_argument_count get_command get_command_argument get_environment_variable is_iostat_end ieee_arithmetic ieee_support_underflow_control ieee_get_underflow_mode ieee_set_underflow_mode is_iostat_eor move_alloc new_line selected_char_kind same_type_as extends_type_of acosh asinh atanh bessel_j0 bessel_j1 bessel_jn bessel_y0 bessel_y1 bessel_yn erf erfc erfc_scaled gamma log_gamma hypot norm2 atomic_define atomic_ref execute_command_line leadz trailz storage_size merge_bits bge bgt ble blt dshiftl dshiftr findloc iall iany iparity image_index lcobound ucobound maskl maskr num_images parity popcnt poppar shifta shiftl shiftr this_image IRP_ALIGN irp_here"
            },
            illegal: /\/\*/,
            contains: [A.inherit(A.APOS_STRING_MODE, {
                className: "string",
                relevance: 0
            }), A.inherit(A.QUOTE_STRING_MODE, {
                className: "string",
                relevance: 0
            }), {
                className: "function",
                beginKeywords: "subroutine function program",
                illegal: "[${=\\n]",
                contains: [A.UNDERSCORE_TITLE_MODE, B]
            }, A.COMMENT("!", "$", {
                relevance: 0
            }), A.COMMENT("begin_doc", "end_doc", {
                relevance: 10
            }), D]
        }
    }
    KaA.exports = D54
});