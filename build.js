({
    appDir: './',
    baseUrl: './js',
    dir: './publish',
    modules: [
        {
            name: 'xfsearchconfig'
        }
    ],
    fileExclusionRegExp: /^(r|build)\.js$|.git$/,
    optimize:'uglify',
    optimizeCss: 'standard',
    removeCombined: true,
    paths: {
        jquery: 'jquery.min',
        swiper: 'swiper.min',
        webtouchcommon: 'webtouchcommon',
        xfsearch: 'xfsearch'
    }
})