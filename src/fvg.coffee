{exec}              = require 'child_process'
{execFile}          = require 'child_process'

fs                  = require 'fs-extra'
CSON                = require 'cson'
async               = require 'async'
svgpng              = require 'svg2png'

{parse}             = require './parser'
{parse : validate}  = require './validator'

#
# global
#

@g_json = null
@g_code = null
@g_parsed = null

#
# exports
#

# compile ( path or code )

exports.compile = compile = (src, callback) ->

    no_one = [
        'fs = require \'fs-extra\''
        'u = require \'underscore\''
        'jaqen = []'
    ]
    eof = [ 'console.log [ {code : jaqen} , {json : mask} ]' ]

    async.waterfall [

        (callback) ->
            if src.slice(-4) == '.fvg' or src.slice(-4) == '.svg'
                fs.readFile src, 'utf-8', (err, code) ->
                    raven '@compile[readFile]', err
                    no_one.push parse( code ), eof
                    callback null, no_one.join ';'
            else
                json_0 = CSON.stringifySync @g_json
                json_1 = json_0.replace( /\n/g, " " ).replace( /\"/g, "\'" )
                no_one.push (if g_json? then "mask = " + json_1 else ''), parse( src ), eof
                callback null, no_one.join ';'

        , (code, callback) ->
            exec 'coffee -e \"' + code + '\"', (error, stdout, stderr) ->
                raven '@compile[exec]', error
                @g_parsed = CSON.parseSync( stdout )
                @g_code = @g_parsed[0].code
                @g_json = @g_parsed[1].json
                callback null, @g_code.join('')

    ], (err, result) ->
        raven '@compile', err
        if validate result
            if callback? then callback null, result else result
        else
            compile result, callback


# svg ( path or code, save as )

exports.don_svg = don_svg = (src, dest) ->

    compile src, (err, result) ->
        fs.writeFile dest, result, (err) ->
            raven '@don_svg[writeFile]', err, true


# png ( path or code, save as, options = [ ratio, optimize ] )

exports.don_png = don_png = (src, dest, opt = [1, true]) ->

    dest_svg = '.' + dest.slice(0, -4) + '.svg'
    pngquant =  __dirname + '/../bin/pngquant'

    compile src, (err, result) ->
        fs.writeFile dest_svg, result, (err) ->
            raven '@don_png[writeFile]', err
            svgpng dest_svg, dest, opt[0], (err) ->
                fs.unlinkSync dest_svg
                if opt[1] or !opt[1]?
                    execFile pngquant, [
                        "--nofs"
                        "--ext=.png"
                        "--force"
                        dest
                    ], (error, stdout, stderr) ->
                        raven '@don_png[optimize]', error, true
                else
                    raven '@don_png[!optimize]', err, true


#
# local
#

raven = (identity, error, success = false) ->
    if !error and success then console.log( identity + ': "The Red God is pleased."\n' )
    if error? then console.log( identity + ': "Valar morghulis."\n\n', error )
