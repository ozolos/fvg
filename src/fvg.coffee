exec =      require( 'child_process' ).exec
execFile =  require( 'child_process' ).execFile

fs =        require( 'fs-extra' )
async =     require( 'async' )
svgpng =    require( 'svg2png')

compiler =  require( './compiler' ).parse
parser =    require( './parser' ).parse
validator = require( './validator' ).parse

###
-----------------------

compiler is the ENTIRE process

    1. parse fvg
        if ƒ.echo{}
            1.1. parse fvg
                if ƒ.echo{}, &c
    2. build svg

catch endless links (only go 12 deep for now?)

------------------------
###

pngquant =  __dirname + '/../bin/pngquant'

module.exports =

    compile_and_run: (code, file) ->

        # rename this?

        ###

        validate code

            if valid ->
                compile code
                run file

            if not valid ->
                compile_and_run( compile( code ) )

        ###

    # 'face' is the input [fvg]
    # 'mask' is the output [svg]

    don_svg: (face, mask, iden, callback) ->

        if !iden? then iden = [
            'A vector image [callback.0]'
            'A vector image [callback.1]'
            'A vector image [callback.2]'
            'A vector image [callback.3]'
            '\n    A vector image'
        ]

        async.waterfall [

            (callback) ->
                fs.writeFile 'no_one.coffee', 'fs = require( \'fs-extra\' )\nfvg = require( \'fvg\' )\njaqen = []\n', (err) ->
                    raven iden[0], err, false
                    callback null

            , (callback) ->
                fs.readFile face, 'utf-8', (err, code) ->
                    raven iden[1], err, false



                    # console.log( validator( compiler ( code ) ) )
                    ###if validator( compiler ( code ) )
                        console.log( 'true... WHAT!?!?!' )
                    else
                        console.log( 'false...HMMMM?' )###
                    callback null, compiler( code )

            , (input, callback) ->
                fs.appendFile 'no_one.coffee', input, (err) ->
                    raven iden[2], err, false
                    callback null

            , (callback) ->
                fs.appendFile 'no_one.coffee', 'fs.writeFileSync \"' + mask + '\", jaqen.join( \"\" )', (err) ->
                    raven iden[3], err, false
                    callback null

        ], (err, result) ->
            exec 'coffee no_one.coffee', (error, stdout, stderr) ->
                # fs.unlinkSync 'no_one.coffee'
                if callback?
                    callback null
                    raven iden[4], error, false
                else
                    raven iden[4], error, true


    # 'face' is the input [fvg]
    # 'mask' is the output [png]
    # 'fake' is the svg on the way to output [png]
    # 'opt' is an array [ratio, optimize]

    don_png: (face, mask, opt=[1, true]) ->

        fake = '.' + mask.slice(0, -4) + '.svg'

        iden = [
            'A raster image [callback.0]'
            'A raster image [callback.1]'
            'A raster image [callback.2]'
            'A raster image [callback.3]'
            'A raster image [callback.4]'
            '\n    A raster image [optimized]'
            '\n    A raster image [unoptimized]'
        ]

        this.don_svg( face, fake, iden, (err, result) ->
            svgpng fake, mask, opt[0], (err) ->
                # console.log( 'svgpng:', fake, mask, iden, opt, err )
                fs.unlinkSync fake
                if opt[1] or !opt[1]?
                    execFile pngquant, [ "--nofs", "--ext=.png", "--force", mask ], -> raven iden[5], err, true
                else
                    raven iden[6], err, true
            )

    compile: (code) ->
        compiler( code )

    parse: (code) ->
        parser( code )

    validate: (code) ->
        validator( code )

raven = (i, error, success=false) ->
    if !error and success then console.log( i + ': "Valar dohaeris."\n' )
    if error? then console.log( i + ': "Valar morghulis."\n\n', error )
