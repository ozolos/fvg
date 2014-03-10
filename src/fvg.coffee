exec =      require( 'child_process' ).exec
execFile =  require( 'child_process' ).execFile

fs =        require( 'fs-extra' )
async =     require( 'async' )
svgpng =    require( 'svg2png')

parse =     require( './parse' ).parse

pngquant =  __dirname + '/../bin/pngquant'

module.exports =

    # 'face' is the input [fvg]
    # 'mask' is the output [svg]

    don_svg: (face, mask) ->

        async.waterfall [

            (callback) ->
                fs.writeFile '.no_one.js', 'var fs = require( \'fs-extra\' );\njaqen = [];\n', (err) ->
                    iden = 'A vector image [callback.0]'
                    raven iden, err, false
                    callback null

            , (callback) ->
                fs.readFile face, 'utf-8', (err, code) ->
                    iden = 'A vector image [callback.1]'
                    raven iden, err, false
                    callback null, parse( code )

            , (input, callback) ->
                fs.appendFile '.no_one.js', input, (err) ->
                    iden = 'A vector image [callback.2]'
                    raven iden, err, false
                    callback null

            , (callback) ->
                fs.appendFile '.no_one.js', 'fs.writeFileSync( \"' + mask + '\", jaqen.join( \"\" ) );', (err) ->
                    iden = 'A vector image [callback.3]'
                    raven iden, err, false
                    callback null

        ], (err, result) ->
            exec 'node .no_one.js', (error, stdout, stderr) ->
                fs.unlinkSync '.no_one.js'
                iden = '\n    A vector image'
                raven iden, error, true

    # 'face' is the input [fvg]
    # 'mask' is the output [png]
    # 'fake' is the svg on the way to output [png]
    # 'opt' is an array [ratio, optimize]

    don_png: (face, mask, opt=[1, true]) ->

        fake = '.' + mask.slice(0, -4) + '.svg'

        async.waterfall [

            (callback) ->
                fs.writeFile '.no_one.js', 'var fs = require( \'fs-extra\' );\njaqen = [];\n', (err) ->
                    iden = 'A raster image [callback.0]'
                    raven iden, err, false
                    callback null

            , (callback) ->
                fs.readFile face, 'utf-8', (err, code) ->
                    iden = 'A raster image [callback.1]'
                    raven iden, err, false
                    callback null, parse( code )

            , (input, callback) ->
                fs.appendFile '.no_one.js', input, (err) ->
                    iden = 'A raster image [callback.2]'
                    raven iden, err, false
                    callback null

            , (callback) ->
                fs.appendFile '.no_one.js', 'fs.writeFileSync( \"' + fake + '\", jaqen.join( \"\" ) );', (err) ->
                    iden = 'A raster image [callback.3]'
                    raven iden, err, false
                    callback null

            , (callback) ->
                exec 'node .no_one.js', (error, stdout, stderr) ->
                    iden = 'A raster image [callback.4]'
                    raven iden, error, false
                    fs.unlinkSync '.no_one.js'
                    callback null

        ], (err, result) ->
            svgpng fake, mask, opt[0], (err) ->
                fs.unlinkSync fake
                if opt[1] or !opt[1]? then execFile pngquant, [
                    "--nofs", "--ext=.png", "--force", mask
                ], ->
                    iden = '\n    A raster image [optimized]'
                    raven iden, err, true
                else
                    iden = '\n    A raster image [unoptimized]'
                    raven iden, err, true

raven = (iden, error, success=false) ->
    if !error and success then console.log( iden + ': "Valar dohaeris."\n' )
    if error? then console.log( iden + ': "Valar morghulis."\n\n', error )
