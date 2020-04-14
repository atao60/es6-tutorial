// still commonjs as babel doesn't know yet which presets/plugins will be used/
module.exports = api => {
    api.cache(true); // Same as api.cache.forever(), ie permacache the computed config and never call the function again

    const targets = {
        // Don't set up targets.browsers: specify a file .browserslistrc instead: will be 
        // reused by Autoprefixer and other tools
        //
        // The example below only includes the polyfills and code transforms needed for the 
        // last two versions of each browser, and versions of Safari greater than or equal to 7
        // "browsers": ["last 2 versions", "safari >= 7"], 
        "node": "8.0.0" // See also engines.node in package.json
    };

    const presets = [
        [
            "@babel/env",
            {
                // 'usage': includes polyfills given `.browserslistrc` and your source code (Babel analyses it - might not always 
                //  perfectly work depending on your app and its dependencies) instead of including everything from core-js
                "useBuiltIns": "usage",
                "corejs": {
                    version: 3,
                    proposals: true // will enable polyfilling of every proposal supported by core-js
                },
                // Now Babel defaults 'modules' to 'auto', not any more to 'commonjs' (which won't tree-shake.)
                // So no more need to setup 'modules' to 'false':
                // modules: false, 
                targets
            }
        ]
    ];

    const plugins = [
        '@babel/proposal-class-properties',
        // proposal-object-rest-spread no more required, supported out of the box in @babel/preset-env, see:
        //     Docs: @babel/proposal-object-rest-spread no longer needs to be specified explicitly #521
        //     kaykayehnn opened this issue on 12 Apr 2019 · 1 comment · Fixed by #539
        //     https://github.com/mdx-js/mdx/issues/521
        // [
        //     "@babel/proposal-object-rest-spread", { "loose": true, "useBuiltIns": true }
        // ],
        '@babel/plugin-syntax-dynamic-import',  // required for lazy loading
        '@babel/plugin-transform-runtime'
    ];

    return {
        presets,
        plugins
    };
};
