{exec}              = require 'child_process'

fs                  = require 'fs-extra'
CSON                = require 'cson'
async               = require 'async'
svgpng              = require 'svg2png'

{parse}             = require './parser'
{parse : validate}  = require './validator'

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


# src (FVG file or direct code)
# dest (SVG file)

@g_json = null
@g_code = null
@g_parsed = null

exports.compile = compile = (src, dest) ->

    # console.log "\n\ninput: \n\n #{src}\n\n"

    no_one = [
        'fs = require \'fs-extra\''
        'u = require \'underscore\''
        'jaqen = []'
    ]

    eof = [ 'console.log [ {code : jaqen} , {json : mask} ]']

    async.waterfall [

        (callback) ->
            if src.slice(-4) == '.fvg' or src.slice(-4) == '.svg'
                fs.readFile src, 'utf-8', (err, code) ->
                    raven 'reading', err
                    no_one.push parse( code ), eof
                    callback null, no_one.join ';'
            else
                # console.log g_json
                # console.log 'GAAAAH', @g_json?, @g_json
                # (if g_json? then "mask = CSON.stringifySync #{ g_json }" else ''),
                test = CSON.stringifySync @g_json
                # console.log test
                fixme = test.replace( /\n/g, " " ).replace( /\"/g, "\'" )
                # console.log fixme
                # console.log test.replace /\n/g, " " .replace /["]/g, "\\\'"
                no_one.push (if g_json? then "mask = " + fixme else ''), parse( src ), eof
                # console.log no_one.join ';'
                callback null, no_one.join ';'

        , (code, callback) ->
            fs.writeFileSync 'log.txt', code
            console.log '\nCODE LOG:\n\n' + code + '\n\n\n'
            exec 'coffee -e \"' + code + '\"', (error, stdout, stderr) ->
                raven 'executing', error, stderr
                @g_parsed = CSON.parseSync( stdout )
                # console.log @g_parsed
                @g_code = @g_parsed[0].code
                @g_json = @g_parsed[1].json
                callback null, @g_code.join('')

    ], (err, result) ->
        if validate result
            fs.writeFile dest, result, (err) ->
                raven 'writing', err
                console.log 'done'
        else
            compile( result, dest )
            # console.log "done: \n\n #{result}"

###
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
                fs.writeFile 'no_one.coffee', 'fs = require \'fs-extra\' )\nfvg = require \'fvg\' )\njaqen = []\n', (err) ->
                    raven iden[0], err
                    callback null

            , (callback) ->
                fs.readFile face, 'utf-8', (err, code) ->
                    raven iden[1], err



                    # console.log( validator( compiler ( code ) ) )
                    if validator( compiler ( code ) )
                        console.log( 'true... WHAT!?!?!' )
                    else
                        console.log( 'false...HMMMM?' )
                    callback null, compiler( code )

            , (input, callback) ->
                fs.appendFile 'no_one.coffee', input, (err) ->
                    raven iden[2], err
                    callback null

            , (callback) ->
                fs.appendFile 'no_one.coffee', 'fs.writeFileSync \"' + mask + '\", jaqen.join( \"\" )', (err) ->
                    raven iden[3], err
                    callback null

        ], (err, result) ->
            exec 'coffee no_one.coffee', (error, stdout, stderr) ->
                # fs.unlinkSync 'no_one.coffee'
                if callback?
                    callback null
                    raven iden[4], error
                else
                    raven iden[4], error, true


    # 'face' is the input [fvg]
    # 'mask' is the output [png]
    # 'fake' is the svg on the way to output [png]
    # 'opt' is an array [ratio, optimize]

    don_png: (face, mask, opt = [1, true]) ->

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

        @don_svg( face, fake, iden, (err, result) ->

            pngquant =  __dirname + '/../bin/pngquant'

            svgpng fake, mask, opt[0], (err) ->
                # console.log( 'svgpng:', fake, mask, iden, opt, err )
                fs.unlinkSync fake
                if opt[1] or !opt[1]?
                    execFile pngquant, [ "--nofs", "--ext=.png", "--force", mask ], -> raven iden[5], err, true
                else
                    raven iden[6], err, true
            )



wtf = (src, dest) -> compile( src, dest )

###

raven = (i, error, success=false) ->
    if !error and success then console.log( i + ': "Valar dohaeris."\n' )
    if error? then console.log( i + ': "Valar morghulis."\n\n', error )
