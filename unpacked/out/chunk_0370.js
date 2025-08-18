/* chunk:370 bytes:[8657782, 8673284) size:15502 source:unpacked-cli.js */
var rC0 = E((rr5, RT6) => {
    RT6.exports = {
        name: "sharp",
        description: "High performance Node.js image processing, the fastest module to resize JPEG, PNG, WebP, GIF, AVIF and TIFF images",
        version: "0.33.5",
        author: "Lovell Fuller <npm@lovell.info>",
        homepage: "https://sharp.pixelplumbing.com",
        contributors: ["Pierre Inglebert <pierre.inglebert@gmail.com>", "Jonathan Ong <jonathanrichardong@gmail.com>", "Chanon Sajjamanochai <chanon.s@gmail.com>", "Juliano Julio <julianojulio@gmail.com>", "Daniel Gasienica <daniel@gasienica.ch>", "Julian Walker <julian@fiftythree.com>", "Amit Pitaru <pitaru.amit@gmail.com>", "Brandon Aaron <hello.brandon@aaron.sh>", "Andreas Lind <andreas@one.com>", "Maurus Cuelenaere <mcuelenaere@gmail.com>", "Linus Unnebäck <linus@folkdatorn.se>", "Victor Mateevitsi <mvictoras@gmail.com>", "Alaric Holloway <alaric.holloway@gmail.com>", "Bernhard K. Weisshuhn <bkw@codingforce.com>", "Chris Riley <criley@primedia.com>", "David Carley <dacarley@gmail.com>", "John Tobin <john@limelightmobileinc.com>", "Kenton Gray <kentongray@gmail.com>", "Felix Bünemann <Felix.Buenemann@gmail.com>", "Samy Al Zahrani <samyalzahrany@gmail.com>", "Chintan Thakkar <lemnisk8@gmail.com>", "F. Orlando Galashan <frulo@gmx.de>", "Kleis Auke Wolthuizen <info@kleisauke.nl>", "Matt Hirsch <mhirsch@media.mit.edu>", "Matthias Thoemmes <thoemmes@gmail.com>", "Patrick Paskaris <patrick@paskaris.gr>", "Jérémy Lal <kapouer@melix.org>", "Rahul Nanwani <r.nanwani@gmail.com>", "Alice Monday <alice0meta@gmail.com>", "Kristo Jorgenson <kristo.jorgenson@gmail.com>", "YvesBos <yves_bos@outlook.com>", "Guy Maliar <guy@tailorbrands.com>", "Nicolas Coden <nicolas@ncoden.fr>", "Matt Parrish <matt.r.parrish@gmail.com>", "Marcel Bretschneider <marcel.bretschneider@gmail.com>", "Matthew McEachen <matthew+github@mceachen.org>", "Jarda Kotěšovec <jarda.kotesovec@gmail.com>", "Kenric D'Souza <kenric.dsouza@gmail.com>", "Oleh Aleinyk <oleg.aleynik@gmail.com>", "Marcel Bretschneider <marcel.bretschneider@gmail.com>", "Andrea Bianco <andrea.bianco@unibas.ch>", "Rik Heywood <rik@rik.org>", "Thomas Parisot <hi@oncletom.io>", "Nathan Graves <nathanrgraves+github@gmail.com>", "Tom Lokhorst <tom@lokhorst.eu>", "Espen Hovlandsdal <espen@hovlandsdal.com>", "Sylvain Dumont <sylvain.dumont35@gmail.com>", "Alun Davies <alun.owain.davies@googlemail.com>", "Aidan Hoolachan <ajhoolachan21@gmail.com>", "Axel Eirola <axel.eirola@iki.fi>", "Freezy <freezy@xbmc.org>", "Daiz <taneli.vatanen@gmail.com>", "Julian Aubourg <j@ubourg.net>", "Keith Belovay <keith@picthrive.com>", "Michael B. Klein <mbklein@gmail.com>", "Jordan Prudhomme <jordan@raboland.fr>", "Ilya Ovdin <iovdin@gmail.com>", "Andargor <andargor@yahoo.com>", "Paul Neave <paul.neave@gmail.com>", "Brendan Kennedy <brenwken@gmail.com>", "Brychan Bennett-Odlum <git@brychan.io>", "Edward Silverton <e.silverton@gmail.com>", "Roman Malieiev <aromaleev@gmail.com>", "Tomas Szabo <tomas.szabo@deftomat.com>", "Robert O'Rourke <robert@o-rourke.org>", "Guillermo Alfonso Varela Chouciño <guillevch@gmail.com>", "Christian Flintrup <chr@gigahost.dk>", "Manan Jadhav <manan@motionden.com>", "Leon Radley <leon@radley.se>", "alza54 <alza54@thiocod.in>", "Jacob Smith <jacob@frende.me>", "Michael Nutt <michael@nutt.im>", "Brad Parham <baparham@gmail.com>", "Taneli Vatanen <taneli.vatanen@gmail.com>", "Joris Dugué <zaruike10@gmail.com>", "Chris Banks <christopher.bradley.banks@gmail.com>", "Ompal Singh <ompal.hitm09@gmail.com>", "Brodan <christopher.hranj@gmail.com>", "Ankur Parihar <ankur.github@gmail.com>", "Brahim Ait elhaj <brahima@gmail.com>", "Mart Jansink <m.jansink@gmail.com>", "Lachlan Newman <lachnewman007@gmail.com>", "Dennis Beatty <dennis@dcbeatty.com>", "Ingvar Stepanyan <me@rreverser.com>", "Don Denton <don@happycollision.com>"],
        scripts: {
            install: "node install/check",
            clean: "rm -rf src/build/ .nyc_output/ coverage/ test/fixtures/output.*",
            test: "npm run test-lint && npm run test-unit && npm run test-licensing && npm run test-types",
            "test-lint": "semistandard && cpplint",
            "test-unit": "nyc --reporter=lcov --reporter=text --check-coverage --branches=100 mocha",
            "test-licensing": 'license-checker --production --summary --onlyAllow="Apache-2.0;BSD;ISC;LGPL-3.0-or-later;MIT"',
            "test-leak": "./test/leak/leak.sh",
            "test-types": "tsd",
            "package-from-local-build": "node npm/from-local-build",
            "package-from-github-release": "node npm/from-github-release",
            "docs-build": "node docs/build && node docs/search-index/build",
            "docs-serve": "cd docs && npx serve",
            "docs-publish": "cd docs && npx firebase-tools deploy --project pixelplumbing --only hosting:pixelplumbing-sharp"
        },
        type: "commonjs",
        main: "lib/index.js",
        types: "lib/index.d.ts",
        files: ["install", "lib", "src/*.{cc,h,gyp}"],
        repository: {
            type: "git",
            url: "git://github.com/lovell/sharp.git"
        },
        keywords: ["jpeg", "png", "webp", "avif", "tiff", "gif", "svg", "jp2", "dzi", "image", "resize", "thumbnail", "crop", "embed", "libvips", "vips"],
        dependencies: {
            color: "^4.2.3",
            "detect-libc": "^2.0.3",
            semver: "^7.6.3"
        },
        optionalDependencies: {
            "@img/sharp-darwin-arm64": "0.33.5",
            "@img/sharp-darwin-x64": "0.33.5",
            "@img/sharp-libvips-darwin-arm64": "1.0.4",
            "@img/sharp-libvips-darwin-x64": "1.0.4",
            "@img/sharp-libvips-linux-arm": "1.0.5",
            "@img/sharp-libvips-linux-arm64": "1.0.4",
            "@img/sharp-libvips-linux-s390x": "1.0.4",
            "@img/sharp-libvips-linux-x64": "1.0.4",
            "@img/sharp-libvips-linuxmusl-arm64": "1.0.4",
            "@img/sharp-libvips-linuxmusl-x64": "1.0.4",
            "@img/sharp-linux-arm": "0.33.5",
            "@img/sharp-linux-arm64": "0.33.5",
            "@img/sharp-linux-s390x": "0.33.5",
            "@img/sharp-linux-x64": "0.33.5",
            "@img/sharp-linuxmusl-arm64": "0.33.5",
            "@img/sharp-linuxmusl-x64": "0.33.5",
            "@img/sharp-wasm32": "0.33.5",
            "@img/sharp-win32-ia32": "0.33.5",
            "@img/sharp-win32-x64": "0.33.5"
        },
        devDependencies: {
            "@emnapi/runtime": "^1.2.0",
            "@img/sharp-libvips-dev": "1.0.4",
            "@img/sharp-libvips-dev-wasm32": "1.0.5",
            "@img/sharp-libvips-win32-ia32": "1.0.4",
            "@img/sharp-libvips-win32-x64": "1.0.4",
            "@types/node": "*",
            async: "^3.2.5",
            cc: "^3.0.1",
            emnapi: "^1.2.0",
            "exif-reader": "^2.0.1",
            "extract-zip": "^2.0.1",
            icc: "^3.0.0",
            "jsdoc-to-markdown": "^8.0.3",
            "license-checker": "^25.0.1",
            mocha: "^10.7.3",
            "node-addon-api": "^8.1.0",
            nyc: "^17.0.0",
            prebuild: "^13.0.1",
            semistandard: "^17.0.0",
            "tar-fs": "^3.0.6",
            tsd: "^0.31.1"
        },
        license: "Apache-2.0",
        engines: {
            node: "^18.17.0 || ^20.3.0 || >=21.0.0"
        },
        config: {
            libvips: ">=8.15.3"
        },
        funding: {
            url: "https://opencollective.com/libvips"
        },
        binary: {
            napi_versions: [9]
        },
        semistandard: {
            env: ["mocha"]
        },
        cc: {
            linelength: "120",
            filter: ["build/include"]
        },
        nyc: {
            include: ["lib"]
        },
        tsd: {
            directory: "test/types/"
        }
    }
});
var tC0 = E((or5, g6B) => {
    var {
        spawnSync: Lj1
    } = W1("node:child_process"), {
        createHash: OT6
    } = W1("node:crypto"), _6B = cC0(), TT6 = e71(), PT6 = ze(), j6B = Cj1(), {
        config: ST6,
        engines: k6B,
        optionalDependencies: jT6
    } = rC0(), kT6 = process.env.npm_package_config_libvips || ST6.libvips, x6B = _6B(kT6).version, yT6 = ["darwin-arm64", "darwin-x64", "linux-arm", "linux-arm64", "linux-s390x", "linux-x64", "linuxmusl-arm64", "linuxmusl-x64", "win32-ia32", "win32-x64"], Mj1 = {
        encoding: "utf8",
        shell: !0
    }, _T6 = (A) => {
        if (A instanceof Error) console.error(`sharp: Installation error: ${A.message}`);
        else console.log(`sharp: ${A}`)
    }, v6B = () => j6B.isNonGlibcLinuxSync() ? j6B.familySync() : "", xT6 = () => `${process.platform}${v6B()}-${process.arch}`, Ee = () => {
        if (b6B()) return "wasm32";
        let {
            npm_config_arch: A,
            npm_config_platform: B,
            npm_config_libc: Q
        } = process.env, Z = typeof Q === "string" ? Q : v6B();
        return `${B||process.platform}${Z}-${A||process.arch}`
    }, vT6 = () => {
        try {
            return W1(`@img/sharp-libvips-dev-${Ee()}/include`)
        } catch {
            try {
                return (() => {
                    throw new Error("Cannot require module " + "@img/sharp-libvips-dev/include");
                })()
            } catch {}
        }
        return ""
    }, bT6 = () => {
        try {
            return (() => {
                throw new Error("Cannot require module " + "@img/sharp-libvips-dev/cplusplus");
            })()
        } catch {}
        return ""
    }, fT6 = () => {
        try {
            return W1(`@img/sharp-libvips-dev-${Ee()}/lib`)
        } catch {
            try {
                return W1(`@img/sharp-libvips-${Ee()}/lib`)
            } catch {}
        }
        return ""
    }, hT6 = () => {
        if (process.release?.name === "node" && process.versions) {
            if (!PT6(process.versions.node, k6B.node)) return {
                found: process.versions.node,
                expected: k6B.node
            }
        }
    }, b6B = () => {
        let {
            CC: A
        } = process.env;
        return Boolean(A && A.endsWith("/emcc"))
    }, gT6 = () => {
        if (process.platform === "darwin" && process.arch === "x64") return (Lj1("sysctl sysctl.proc_translated", Mj1).stdout || "").trim() === "sysctl.proc_translated: 1";
        return !1
    }, y6B = (A) => OT6("sha512").update(A).digest("hex"), uT6 = () => {
        try {
            let A = y6B(`imgsharp-libvips-${Ee()}`),
                B = _6B(jT6[`@img/sharp-libvips-${Ee()}`]).version;
            return y6B(`${A}npm:${B}`).slice(0, 10)
        } catch {}
        return ""
    }, mT6 = () => Lj1(`node-gyp rebuild --directory=src ${b6B()?"--nodedir=emscripten":""}`, {
        ...Mj1,
        stdio: "inherit"
    }).status, f6B = () => {
        if (process.platform !== "win32") return (Lj1("pkg-config --modversion vips-cpp", {
            ...Mj1,
            env: {
                ...process.env,
                PKG_CONFIG_PATH: h6B()
            }
        }).stdout || "").trim();
        else return ""
    }, h6B = () => {
        if (process.platform !== "win32") return [(Lj1('which brew >/dev/null 2>&1 && brew environment --plain | grep PKG_CONFIG_LIBDIR | cut -d" " -f2', Mj1).stdout || "").trim(), process.env.PKG_CONFIG_PATH, "/usr/local/lib/pkgconfig", "/usr/lib/pkgconfig", "/usr/local/libdata/pkgconfig", "/usr/libdata/pkgconfig"].filter(Boolean).join(":");
        else return ""
    }, oC0 = (A, B, Q) => {
        if (Q) Q(`Detected ${B}, skipping search for globally-installed libvips`);
        return A
    }, dT6 = (A) => {
        if (Boolean(process.env.SHARP_IGNORE_GLOBAL_LIBVIPS) === !0) return oC0(!1, "SHARP_IGNORE_GLOBAL_LIBVIPS", A);
        if (Boolean(process.env.SHARP_FORCE_GLOBAL_LIBVIPS) === !0) return oC0(!0, "SHARP_FORCE_GLOBAL_LIBVIPS", A);
        if (gT6()) return oC0(!1, "Rosetta", A);
        let B = f6B();
        return !!B && TT6(B, x6B)
    };
    g6B.exports = {
        minimumLibvipsVersion: x6B,
        prebuiltPlatforms: yT6,
        buildPlatformArch: Ee,
        buildSharpLibvipsIncludeDir: vT6,
        buildSharpLibvipsCPlusPlusDir: bT6,
        buildSharpLibvipsLibDir: fT6,
        isUnsupportedNodeRuntime: hT6,
        runtimePlatformArch: xT6,
        log: _T6,
        yarnLocator: uT6,
        spawnRebuild: mT6,
        globalLibvipsVersion: f6B,
        pkgConfigPath: h6B,
        useGlobalLibvips: dT6
    }
});
var DZ1 = E((er5, m6B) => {
    var {
        familySync: cT6,
        versionSync: lT6
    } = Cj1(), {
        runtimePlatformArch: pT6,
        isUnsupportedNodeRuntime: u6B,
        prebuiltPlatforms: iT6,
        minimumLibvipsVersion: nT6
    } = tC0(), Pm = pT6(), aT6 = [`../src/build/Release/sharp-${Pm}.node`, "../src/build/Release/sharp-wasm32.node", `@img/sharp-${Pm}/sharp.node`, "@img/sharp-wasm32/sharp.node"], eC0, Rj1 = [];
    for (let A of aT6) try {
        eC0 = W1(A);
        break
    } catch (B) {
        Rj1.push(B)
    }
    if (eC0) m6B.exports = eC0;
    else {
        let [A, B, Q] = ["linux", "darwin", "win32"].map((G) => Pm.startsWith(G)), Z = [`Could not load the "sharp" module using the ${Pm} runtime`];
        Rj1.forEach((G) => {
            if (G.code !== "MODULE_NOT_FOUND") Z.push(`${G.code}: ${G.message}`)
        });
        let D = Rj1.map((G) => G.message).join(" ");
        if (Z.push("Possible solutions:"), u6B()) {
            let {
                found: G,
                expected: F
            } = u6B();
            Z.push("- Please upgrade Node.js:", `    Found ${G}`, `    Requires ${F}`)
        } else if (iT6.includes(Pm)) {
            let [G, F] = Pm.split("-"), I = G.endsWith("musl") ? " --libc=musl" : "";
            Z.push("- Ensure optional dependencies can be installed:", "    npm install --include=optional sharp", "- Ensure your package manager supports multi-platform installation:", "    See https://sharp.pixelplumbing.com/install#cross-platform", "- Add platform-specific dependencies:", `    npm install --os=${G.replace("musl","")}${I} --cpu=${F} sharp`)
        } else Z.push(`- Manually install libvips >= ${nT6}`, "- Add experimental WebAssembly-based dependencies:", "    npm install --cpu=wasm32 sharp", "    npm install @img/sharp-wasm32");
        if (A && /(symbol not found|CXXABI_)/i.test(D)) try {
            let {
                config: G
            } = W1(`@img/sharp-libvips-${Pm}/package`), F = `${cT6()} ${lT6()}`, I = `${G.musl?"musl":"glibc"} ${G.musl||G.glibc}`;
            Z.push("- Update your OS:", `    Found ${F}`, `    Requires ${I}`)
        } catch (G) {}
        if (A && /\/snap\/core[0-9]{2}/.test(D)) Z.push("- Remove the Node.js Snap, which does not support native modules", "    snap remove node");
        if (B && /Incompatible library version/.test(D)) Z.push("- Update Homebrew:", "    brew update && brew upgrade vips");
        if (Rj1.some((G) => G.code === "ERR_DLOPEN_DISABLED")) Z.push("- Run Node.js without using the --no-addons flag");
        if (Q && /The specified procedure could not be found/.test(D)) Z.push("- Using the canvas package on Windows?", "    See https://sharp.pixelplumbing.com/install#canvas-and-windows", "- Check for outdated versions of sharp in the dependency tree:", "    npm ls sharp");
        throw Z.push("- Consult the installation documentation:", "    See https://sharp.pixelplumbing.com/install"), new Error(Z.join(`
`))
    }
});