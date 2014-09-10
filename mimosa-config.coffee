exports.config =
  "modules": [
    "copy"
    "server"
    "jshint"
    "csslint"
    "require"
    "minify-js"
    "minify-css"
    "live-reload"
    "bower"
    "less"
    "jade"
  ]
  watch:
    sourceDir: 'assets'
    compiledDir: 'public'
    javascriptDir: 'js'

  vendor:
    javascripts: "js/lib"
    stylesheets: "css/lib"

  template:
    nameTransform: 'filePath'
    outputFileName: "js/templates"

  server:
    defaultServer:
      enabled: true
      onePager: true
    views:
      path: 'src/views'
    port: 3000

  liveReload:
    enabled:true
    additionalDirs: ['./src', './src/routes', './src/views']
