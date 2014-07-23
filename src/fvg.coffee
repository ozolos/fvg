{exec}					= require 'child_process'
{execFile}  			= require 'child_process'

fs 						= require 'fs-extra'
path						= require 'path'
async 					= require 'async'
svgpng					= require 'svg2png'

{parse}  				= require './parser'

#
# global
#

global.json			= null
global.code			= null
global.parsed		= null

#
# exports
#

# compile ( path or code )

exports.compile = compile = (src, callback) ->

	no_one = []

	async.waterfall [

		(next) ->
			if fs.existsSync( src )
				fs.readFile src, 'utf-8', (err, code) ->
					raven( '@compile.readFile.', err )
					next( null, code )
			else
				next( null, src )

		, (code, next) ->

			try
				no_one = JSON.parse( parse( code ) )
			catch error
				raven( '@compile.JSONparse', error )

			workingdir = path.dirname( src ) + '/'

			jsonTest = no_one.some (x) -> x[0] == "json"
			fvarTest = no_one.some (x) -> x[0] == "fvar"
			refTest = no_one.some (x) -> x[0] == "ref"
			linkTest = no_one.some (x) -> x[0] == "link"

			if fvarTest && !jsonTest
				console.log "@compile.JSONparse: No linked JSON for variables"

			# console.log jsonTest, fvarTest, refTest, linkTest

			if jsonTest
				j = no_one.filter (x) -> x[0] == "json"
				global.json = fs.readJsonSync( workingdir + j[0][1] )

			n = 0
			l = no_one.length

			while n < no_one.length
				i = no_one[n]

				if i[0] == "fvar"
					x = eval( "global.json.#{i[1]}" )
					i[0] = "xml"
					i[1] = x
				if i[0] == "ref"
					x = eval( "global.json.#{i[1]}" )
					i[0] = "link"
					i[1] = x
				if i[0] == "link"
					x = JSON.parse( parse( fs.readFileSync( workingdir + i[1], 'utf-8' ) ) )
					no_one.splice.apply(no_one, [n, 1].concat( x ) )

				n++
				next( null, no_one ) if n == no_one.length

		, (array, next) ->

			temp = []

			async.each( array, (i, callback) ->
				temp.push( i[1] )
				callback()
			, (err) ->
				next( null, temp.join('') )
			)

	], (err, compiled) ->
		raven( '@compile', err )
		global.parsed = compiled
		callback( null, compiled )

		# if validate result
		# 	if callback? then callback null, result else result
		# else
		# 	compile result, callback


# svg ( path or code, save as )

exports.don_svg = don_svg = (src, dest) ->

	compile src, (err, result) ->
		fs.writeFile dest, result, (err) ->
			raven '@don_svg[writeFile]', err, true


# png ( path or code, save as, options = [ ratio, optimize ] )

exports.don_png = don_png = (src, dest, opt = [1, true]) ->

	dest_svg = dest.slice(0, -4) + '.svg'
	pngquant =  __dirname + '/../bin/pngquant'

	compile src, (err, result) ->
		fs.writeFile dest_svg, result, (err) ->
			raven '@don_png[writeFile]', err
			svgpng dest_svg, dest, opt[0], (err) ->
				fs.stat dest_svg, (err, stats) ->
					if stats? then fs.unlinkSync dest_svg
				if opt[1] or !opt[1]?
					execFile pngquant, [
						'--nofs'
						'--ext=.png'
						'--force'
						dest
					], (error, stdout, stderr) ->
						raven '@don_png[optimize]', error, true
				else
					raven '@don_png[!optimize]', err, true


#
# local
#

raven = (identity, error, success = false) ->
	if !error and success then console.log( identity + ': The Red God is pleased.' )
	if error? then console.log( identity + ': Valar morghulis.', error )
