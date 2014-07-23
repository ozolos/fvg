exec =      require( 'child_process' ).exec

path =      '/Users/luke/Documents/Development/git/fvg/'

#
# coffee
#

exec_coffee = 'coffee -o ' + path + 'lib/ -c ' + path + 'src/fvg.coffee'

exec exec_coffee, (error, stdout, stderr) ->
	if !error? then console.log( 'fvg.js built.' )
	else console.log( 'fvg.js has failed to build:\n\n', error )

#
# peg.js
#

make_peg = ( name ) ->
	exec 'pegjs ' + path + 'src/' + name + '.pegjs ' + path + 'lib/' + name + '.js', (error, stdout, stderr) ->
	if !error? then console.log( name + '.js built.' )
	else console.log( name + '.js has failed to build:\n\n', error )

make_peg( 'parser' )
