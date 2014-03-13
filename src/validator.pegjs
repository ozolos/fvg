start
    = s:sort+ { return s.every( function(element, index, array){ return (element); } ) }

sort
    = f:f { return false; }
    / t:tag+ { return true; }
    / t:text { return true; }
    / a:anything { return false; }
    / ws

f
    = [ƒ]

tag =
    ws* "<" c:char_xml+ ">" ws* { return "<" + c.join("") + ">"; }

char_xml
    = ws* c:[^<>ƒ\'\"\n\r\t]+ ws* { return c.join(""); }
    / ws* c:[\'\"] ws* { return "\\" + c; }

text
    = t:[\u0009\u000a\u000d\u0020-\uD7FF\uE000-\uFFFD]

anything
    = t:[^<>]

ws
    = [ \n\r\t]
