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

  bower:
    copy:
      mainOverrides: {}
                                  # Occasionally bower packages do not clearly indicate what file
                                  # is the main library file. In those cases, mimosa cannot find
                                  # the main files to copy them to the vendor directory. json2 is
                                  # a good example. mainOverrides allows for setting which files
                                  # should be copied for a package. The key for this object is
                                  # the name of the package. The value is an array of path
                                  # strings representing the package's main files. The paths
                                  # should be relative to the root of the package. For example:
                                  # {"json2":["json2.js","json_parse.js"]}. The paths can also
                                  # be to directories. That will include all the directory's
                                  # files. mainOverrides packages can also be provided an object
                                  # in addition to string paths. The object maps input paths to
                                  # output paths and allow for specific placement of files and
                                  # folders. Ex {"json2":[{"json2.js":"json-utils/json2.js"}]. In
                                  # this case the "json2.js" file will be placed in
                                  # "json-utils/json2.js" in the vendor.javascripts folder.

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
  require:
    commonConfig: 'commonConfig'

  liveReload:
    enabled:true
    additionalDirs: ['./src', './src/routes', './src/views']
