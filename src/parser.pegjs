start
	= s:sort* { return '[ ' + s.join(', ') + ' ]'; }

sort
	= x:xml { return '[ "xml", "' + x + '" ]'; }
	/ j:json { return '[ "json", "' + j + '" ]'; }
	/ l:link { return '[ "link", "' + l + '" ]'; }
	/ r:ref { return '[ "ref", "' + r + '" ]'; }
	/ f:fvar { return '[ "fvar", "' + f + '" ]'; }
	/ t:text { return '[ "text", "' + t + '" ]'; }

xml =
	'<' x:char_xml+ '>' ws* { return '<' + x.join('') + '>'; }

json
	= '<ƒjson ' j:char_path ' ƒ>' ws* { return j; }

link
	= '<ƒecho ' l:char_path ' ƒ>' ws* { return l; }

ref
	= '<ƒecho ' f:fvar ' ƒ>' ws* { return f; }

fvar
	= '<ƒ ' f:[^<>ƒ\'\"\\\ ]+ ' ƒ>' { return f.join(''); }

char_path
	= [\"\'] c:[^\'\"]+ [\"\'] { return c.join(''); }

char_xml
	= c:[^<>ƒ\'\"]+ { return c.join(''); }
	/ '\'' { return '\''; }
	/ '\"' { return '\''; }
	/ f:fvar { return '"], [ "fvar", "' + f + '" ], [ "xml", "'; }

text
	= t:[^<>]+ { return t.join(''); }

ws
	= [ \n\r\t]

br
	= [\n\r\t]
