exec =      require( 'child_process' ).exec

path =      '/Users/luke/Documents/Development/git/fvg/'

# Build grammar.pegjs

exec_coffee = 'coffee --compile --output ' + path + 'lib/fvg.js ' + path + 'src/fvg.coffee'

# console.log( exec_coffee )

exec exec_coffee, (error, stdout, stderr) ->
    if !error? then console.log( 'fvg.js built.' )
    else console.log( 'fvg.js has failed to build:\n\n', error )

# Build fvg.coffee

exec_pegjs = 'pegjs ' + path + 'src/grammar.pegjs ' + path + 'lib/parse.js'

# console.log( exec_pegjs )

exec exec_pegjs, (error, stdout, stderr) ->
    if !error? then console.log( 'parse.js built.' )
    else console.log( 'parse.js has failed to build:\n\n', error )
