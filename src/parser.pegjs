start
	= s:sort+ { return s.join(";"); }

sort
	= t:tag+ { return "jaqen.push '" + t.join("\\\n") + "'"; }
	/ link
	/ echo
	/ fvar
	/ t:text { return "jaqen.push '" + t + "'"; }

tag =
	"<" c:char_xml+ ">" ws* { return "<" + c.join("") + ">"; }

link
	= "ƒ.link{" c:char_path "}" ws* { return "mask = JSON.parse( fs.readFileSync( '" + c + "', 'utf-8' ) )"; }

echo
	= "ƒ.echo{" ws* [\"\']? f:fvar [\"\']? ws* "}" ws* { return "jaqen.push 'ƒ.echo{ \\\''" + f + "jaqen.push '\\\' }'"; }
	/ "ƒ.echo{" c:char_path "}" ws* { return "jaqen.push fs.readFileSync( '" + c + "' ).toString()"; }

fvar
	= "ƒ{" c:char_path "}" ws* { return ";jaqen.push mask." + c + ";" }

char_path
	= ws* [\"\']? c:[A-Za-z0-9_/.\[\]]+ [\"\']? ws* { return c.join(""); }

char_xml
	= br* c:[^<>ƒ\'\"\\\n\r\t]+ br* { return c.join(""); }
	/ br* c:[\'\"\\] br* { return "\\" + c; }
	/ br* c:fvar br* { return "'" + c + "jaqen.push '"; }

text
	= t:[^<>]+ { return t.join(""); }

ws
	= [ \n\r\t]

br
	= [\n\r\t]
