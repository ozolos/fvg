module.exports = (function() {
  /*
   * Generated by PEG.js 0.8.0.
   *
   * http://pegjs.majda.cz/
   */

  function peg$subclass(child, parent) {
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
  }

  function SyntaxError(message, expected, found, offset, line, column) {
    this.message  = message;
    this.expected = expected;
    this.found    = found;
    this.offset   = offset;
    this.line     = line;
    this.column   = column;

    this.name     = "SyntaxError";
  }

  peg$subclass(SyntaxError, Error);

  function parse(input) {
    var options = arguments.length > 1 ? arguments[1] : {},

        peg$FAILED = {},

        peg$startRuleFunctions = { start: peg$parsestart },
        peg$startRuleFunction  = peg$parsestart,

        peg$c0 = [],
        peg$c1 = function(s) { return '[ ' + s.join(', ') + ' ]'; },
        peg$c2 = function(x) { return '[ "xml", "' + x + '" ]'; },
        peg$c3 = function(j) { return '[ "json", "' + j + '" ]'; },
        peg$c4 = function(l) { return '[ "link", "' + l + '" ]'; },
        peg$c5 = function(r) { return '[ "ref", "' + r + '" ]'; },
        peg$c6 = function(f) { return '[ "fvar", "' + f + '" ]'; },
        peg$c7 = function(t) { return '[ "text", "' + t + '" ]'; },
        peg$c8 = peg$FAILED,
        peg$c9 = "<",
        peg$c10 = { type: "literal", value: "<", description: "\"<\"" },
        peg$c11 = ">",
        peg$c12 = { type: "literal", value: ">", description: "\">\"" },
        peg$c13 = function(x) { return '<' + x.join('') + '>'; },
        peg$c14 = "<\u0192json ",
        peg$c15 = { type: "literal", value: "<\u0192json ", description: "\"<\\u0192json \"" },
        peg$c16 = " \u0192>",
        peg$c17 = { type: "literal", value: " \u0192>", description: "\" \\u0192>\"" },
        peg$c18 = function(j) { return j; },
        peg$c19 = "<\u0192echo ",
        peg$c20 = { type: "literal", value: "<\u0192echo ", description: "\"<\\u0192echo \"" },
        peg$c21 = function(l) { return l; },
        peg$c22 = function(f) { return f; },
        peg$c23 = "<\u0192 ",
        peg$c24 = { type: "literal", value: "<\u0192 ", description: "\"<\\u0192 \"" },
        peg$c25 = /^[^<>\u0192'"\\ ]/,
        peg$c26 = { type: "class", value: "[^<>\\u0192'\"\\\\ ]", description: "[^<>\\u0192'\"\\\\ ]" },
        peg$c27 = function(f) { return f.join(''); },
        peg$c28 = /^["']/,
        peg$c29 = { type: "class", value: "[\"']", description: "[\"']" },
        peg$c30 = /^[^'"]/,
        peg$c31 = { type: "class", value: "[^'\"]", description: "[^'\"]" },
        peg$c32 = function(c) { return c.join(''); },
        peg$c33 = /^[^<>\u0192'"]/,
        peg$c34 = { type: "class", value: "[^<>\\u0192'\"]", description: "[^<>\\u0192'\"]" },
        peg$c35 = "'",
        peg$c36 = { type: "literal", value: "'", description: "\"'\"" },
        peg$c37 = function() { return '\''; },
        peg$c38 = "\"",
        peg$c39 = { type: "literal", value: "\"", description: "\"\\\"\"" },
        peg$c40 = function(f) { return '"], [ "fvar", "' + f + '" ], [ "xml", "'; },
        peg$c41 = /^[^<>]/,
        peg$c42 = { type: "class", value: "[^<>]", description: "[^<>]" },
        peg$c43 = function(t) { return t.join(''); },
        peg$c44 = /^[ \n\r\t]/,
        peg$c45 = { type: "class", value: "[ \\n\\r\\t]", description: "[ \\n\\r\\t]" },
        peg$c46 = /^[\n\r\t]/,
        peg$c47 = { type: "class", value: "[\\n\\r\\t]", description: "[\\n\\r\\t]" },

        peg$currPos          = 0,
        peg$reportedPos      = 0,
        peg$cachedPos        = 0,
        peg$cachedPosDetails = { line: 1, column: 1, seenCR: false },
        peg$maxFailPos       = 0,
        peg$maxFailExpected  = [],
        peg$silentFails      = 0,

        peg$result;

    if ("startRule" in options) {
      if (!(options.startRule in peg$startRuleFunctions)) {
        throw new Error("Can't start parsing from rule \"" + options.startRule + "\".");
      }

      peg$startRuleFunction = peg$startRuleFunctions[options.startRule];
    }

    function text() {
      return input.substring(peg$reportedPos, peg$currPos);
    }

    function offset() {
      return peg$reportedPos;
    }

    function line() {
      return peg$computePosDetails(peg$reportedPos).line;
    }

    function column() {
      return peg$computePosDetails(peg$reportedPos).column;
    }

    function expected(description) {
      throw peg$buildException(
        null,
        [{ type: "other", description: description }],
        peg$reportedPos
      );
    }

    function error(message) {
      throw peg$buildException(message, null, peg$reportedPos);
    }

    function peg$computePosDetails(pos) {
      function advance(details, startPos, endPos) {
        var p, ch;

        for (p = startPos; p < endPos; p++) {
          ch = input.charAt(p);
          if (ch === "\n") {
            if (!details.seenCR) { details.line++; }
            details.column = 1;
            details.seenCR = false;
          } else if (ch === "\r" || ch === "\u2028" || ch === "\u2029") {
            details.line++;
            details.column = 1;
            details.seenCR = true;
          } else {
            details.column++;
            details.seenCR = false;
          }
        }
      }

      if (peg$cachedPos !== pos) {
        if (peg$cachedPos > pos) {
          peg$cachedPos = 0;
          peg$cachedPosDetails = { line: 1, column: 1, seenCR: false };
        }
        advance(peg$cachedPosDetails, peg$cachedPos, pos);
        peg$cachedPos = pos;
      }

      return peg$cachedPosDetails;
    }

    function peg$fail(expected) {
      if (peg$currPos < peg$maxFailPos) { return; }

      if (peg$currPos > peg$maxFailPos) {
        peg$maxFailPos = peg$currPos;
        peg$maxFailExpected = [];
      }

      peg$maxFailExpected.push(expected);
    }

    function peg$buildException(message, expected, pos) {
      function cleanupExpected(expected) {
        var i = 1;

        expected.sort(function(a, b) {
          if (a.description < b.description) {
            return -1;
          } else if (a.description > b.description) {
            return 1;
          } else {
            return 0;
          }
        });

        while (i < expected.length) {
          if (expected[i - 1] === expected[i]) {
            expected.splice(i, 1);
          } else {
            i++;
          }
        }
      }

      function buildMessage(expected, found) {
        function stringEscape(s) {
          function hex(ch) { return ch.charCodeAt(0).toString(16).toUpperCase(); }

          return s
            .replace(/\\/g,   '\\\\')
            .replace(/"/g,    '\\"')
            .replace(/\x08/g, '\\b')
            .replace(/\t/g,   '\\t')
            .replace(/\n/g,   '\\n')
            .replace(/\f/g,   '\\f')
            .replace(/\r/g,   '\\r')
            .replace(/[\x00-\x07\x0B\x0E\x0F]/g, function(ch) { return '\\x0' + hex(ch); })
            .replace(/[\x10-\x1F\x80-\xFF]/g,    function(ch) { return '\\x'  + hex(ch); })
            .replace(/[\u0180-\u0FFF]/g,         function(ch) { return '\\u0' + hex(ch); })
            .replace(/[\u1080-\uFFFF]/g,         function(ch) { return '\\u'  + hex(ch); });
        }

        var expectedDescs = new Array(expected.length),
            expectedDesc, foundDesc, i;

        for (i = 0; i < expected.length; i++) {
          expectedDescs[i] = expected[i].description;
        }

        expectedDesc = expected.length > 1
          ? expectedDescs.slice(0, -1).join(", ")
              + " or "
              + expectedDescs[expected.length - 1]
          : expectedDescs[0];

        foundDesc = found ? "\"" + stringEscape(found) + "\"" : "end of input";

        return "Expected " + expectedDesc + " but " + foundDesc + " found.";
      }

      var posDetails = peg$computePosDetails(pos),
          found      = pos < input.length ? input.charAt(pos) : null;

      if (expected !== null) {
        cleanupExpected(expected);
      }

      return new SyntaxError(
        message !== null ? message : buildMessage(expected, found),
        expected,
        found,
        pos,
        posDetails.line,
        posDetails.column
      );
    }

    function peg$parsestart() {
      var s0, s1, s2;

      s0 = peg$currPos;
      s1 = [];
      s2 = peg$parsesort();
      while (s2 !== peg$FAILED) {
        s1.push(s2);
        s2 = peg$parsesort();
      }
      if (s1 !== peg$FAILED) {
        peg$reportedPos = s0;
        s1 = peg$c1(s1);
      }
      s0 = s1;

      return s0;
    }

    function peg$parsesort() {
      var s0, s1;

      s0 = peg$currPos;
      s1 = peg$parsexml();
      if (s1 !== peg$FAILED) {
        peg$reportedPos = s0;
        s1 = peg$c2(s1);
      }
      s0 = s1;
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        s1 = peg$parsejson();
        if (s1 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c3(s1);
        }
        s0 = s1;
        if (s0 === peg$FAILED) {
          s0 = peg$currPos;
          s1 = peg$parselink();
          if (s1 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c4(s1);
          }
          s0 = s1;
          if (s0 === peg$FAILED) {
            s0 = peg$currPos;
            s1 = peg$parseref();
            if (s1 !== peg$FAILED) {
              peg$reportedPos = s0;
              s1 = peg$c5(s1);
            }
            s0 = s1;
            if (s0 === peg$FAILED) {
              s0 = peg$currPos;
              s1 = peg$parsefvar();
              if (s1 !== peg$FAILED) {
                peg$reportedPos = s0;
                s1 = peg$c6(s1);
              }
              s0 = s1;
              if (s0 === peg$FAILED) {
                s0 = peg$currPos;
                s1 = peg$parsetext();
                if (s1 !== peg$FAILED) {
                  peg$reportedPos = s0;
                  s1 = peg$c7(s1);
                }
                s0 = s1;
              }
            }
          }
        }
      }

      return s0;
    }

    function peg$parsexml() {
      var s0, s1, s2, s3, s4, s5;

      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 60) {
        s1 = peg$c9;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c10); }
      }
      if (s1 !== peg$FAILED) {
        s2 = [];
        s3 = peg$parsechar_xml();
        if (s3 !== peg$FAILED) {
          while (s3 !== peg$FAILED) {
            s2.push(s3);
            s3 = peg$parsechar_xml();
          }
        } else {
          s2 = peg$c8;
        }
        if (s2 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 62) {
            s3 = peg$c11;
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c12); }
          }
          if (s3 !== peg$FAILED) {
            s4 = [];
            s5 = peg$parsews();
            while (s5 !== peg$FAILED) {
              s4.push(s5);
              s5 = peg$parsews();
            }
            if (s4 !== peg$FAILED) {
              peg$reportedPos = s0;
              s1 = peg$c13(s2);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$c8;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c8;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c8;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c8;
      }

      return s0;
    }

    function peg$parsejson() {
      var s0, s1, s2, s3, s4, s5;

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 7) === peg$c14) {
        s1 = peg$c14;
        peg$currPos += 7;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c15); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parsechar_path();
        if (s2 !== peg$FAILED) {
          if (input.substr(peg$currPos, 3) === peg$c16) {
            s3 = peg$c16;
            peg$currPos += 3;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c17); }
          }
          if (s3 !== peg$FAILED) {
            s4 = [];
            s5 = peg$parsews();
            while (s5 !== peg$FAILED) {
              s4.push(s5);
              s5 = peg$parsews();
            }
            if (s4 !== peg$FAILED) {
              peg$reportedPos = s0;
              s1 = peg$c18(s2);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$c8;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c8;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c8;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c8;
      }

      return s0;
    }

    function peg$parselink() {
      var s0, s1, s2, s3, s4, s5;

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 7) === peg$c19) {
        s1 = peg$c19;
        peg$currPos += 7;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c20); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parsechar_path();
        if (s2 !== peg$FAILED) {
          if (input.substr(peg$currPos, 3) === peg$c16) {
            s3 = peg$c16;
            peg$currPos += 3;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c17); }
          }
          if (s3 !== peg$FAILED) {
            s4 = [];
            s5 = peg$parsews();
            while (s5 !== peg$FAILED) {
              s4.push(s5);
              s5 = peg$parsews();
            }
            if (s4 !== peg$FAILED) {
              peg$reportedPos = s0;
              s1 = peg$c21(s2);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$c8;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c8;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c8;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c8;
      }

      return s0;
    }

    function peg$parseref() {
      var s0, s1, s2, s3, s4, s5;

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 7) === peg$c19) {
        s1 = peg$c19;
        peg$currPos += 7;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c20); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parsefvar();
        if (s2 !== peg$FAILED) {
          if (input.substr(peg$currPos, 3) === peg$c16) {
            s3 = peg$c16;
            peg$currPos += 3;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c17); }
          }
          if (s3 !== peg$FAILED) {
            s4 = [];
            s5 = peg$parsews();
            while (s5 !== peg$FAILED) {
              s4.push(s5);
              s5 = peg$parsews();
            }
            if (s4 !== peg$FAILED) {
              peg$reportedPos = s0;
              s1 = peg$c22(s2);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$c8;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c8;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c8;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c8;
      }

      return s0;
    }

    function peg$parsefvar() {
      var s0, s1, s2, s3;

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 3) === peg$c23) {
        s1 = peg$c23;
        peg$currPos += 3;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c24); }
      }
      if (s1 !== peg$FAILED) {
        s2 = [];
        if (peg$c25.test(input.charAt(peg$currPos))) {
          s3 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c26); }
        }
        if (s3 !== peg$FAILED) {
          while (s3 !== peg$FAILED) {
            s2.push(s3);
            if (peg$c25.test(input.charAt(peg$currPos))) {
              s3 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c26); }
            }
          }
        } else {
          s2 = peg$c8;
        }
        if (s2 !== peg$FAILED) {
          if (input.substr(peg$currPos, 3) === peg$c16) {
            s3 = peg$c16;
            peg$currPos += 3;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c17); }
          }
          if (s3 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c27(s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c8;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c8;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c8;
      }

      return s0;
    }

    function peg$parsechar_path() {
      var s0, s1, s2, s3;

      s0 = peg$currPos;
      if (peg$c28.test(input.charAt(peg$currPos))) {
        s1 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c29); }
      }
      if (s1 !== peg$FAILED) {
        s2 = [];
        if (peg$c30.test(input.charAt(peg$currPos))) {
          s3 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c31); }
        }
        if (s3 !== peg$FAILED) {
          while (s3 !== peg$FAILED) {
            s2.push(s3);
            if (peg$c30.test(input.charAt(peg$currPos))) {
              s3 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c31); }
            }
          }
        } else {
          s2 = peg$c8;
        }
        if (s2 !== peg$FAILED) {
          if (peg$c28.test(input.charAt(peg$currPos))) {
            s3 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c29); }
          }
          if (s3 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c32(s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c8;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c8;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c8;
      }

      return s0;
    }

    function peg$parsechar_xml() {
      var s0, s1, s2;

      s0 = peg$currPos;
      s1 = [];
      if (peg$c33.test(input.charAt(peg$currPos))) {
        s2 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c34); }
      }
      if (s2 !== peg$FAILED) {
        while (s2 !== peg$FAILED) {
          s1.push(s2);
          if (peg$c33.test(input.charAt(peg$currPos))) {
            s2 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c34); }
          }
        }
      } else {
        s1 = peg$c8;
      }
      if (s1 !== peg$FAILED) {
        peg$reportedPos = s0;
        s1 = peg$c32(s1);
      }
      s0 = s1;
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 39) {
          s1 = peg$c35;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c36); }
        }
        if (s1 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c37();
        }
        s0 = s1;
        if (s0 === peg$FAILED) {
          s0 = peg$currPos;
          if (input.charCodeAt(peg$currPos) === 34) {
            s1 = peg$c38;
            peg$currPos++;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c39); }
          }
          if (s1 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c37();
          }
          s0 = s1;
          if (s0 === peg$FAILED) {
            s0 = peg$currPos;
            s1 = peg$parsefvar();
            if (s1 !== peg$FAILED) {
              peg$reportedPos = s0;
              s1 = peg$c40(s1);
            }
            s0 = s1;
          }
        }
      }

      return s0;
    }

    function peg$parsetext() {
      var s0, s1, s2;

      s0 = peg$currPos;
      s1 = [];
      if (peg$c41.test(input.charAt(peg$currPos))) {
        s2 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c42); }
      }
      if (s2 !== peg$FAILED) {
        while (s2 !== peg$FAILED) {
          s1.push(s2);
          if (peg$c41.test(input.charAt(peg$currPos))) {
            s2 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c42); }
          }
        }
      } else {
        s1 = peg$c8;
      }
      if (s1 !== peg$FAILED) {
        peg$reportedPos = s0;
        s1 = peg$c43(s1);
      }
      s0 = s1;

      return s0;
    }

    function peg$parsews() {
      var s0;

      if (peg$c44.test(input.charAt(peg$currPos))) {
        s0 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c45); }
      }

      return s0;
    }

    function peg$parsebr() {
      var s0;

      if (peg$c46.test(input.charAt(peg$currPos))) {
        s0 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c47); }
      }

      return s0;
    }

    peg$result = peg$startRuleFunction();

    if (peg$result !== peg$FAILED && peg$currPos === input.length) {
      return peg$result;
    } else {
      if (peg$result !== peg$FAILED && peg$currPos < input.length) {
        peg$fail({ type: "end", description: "end of input" });
      }

      throw peg$buildException(null, peg$maxFailExpected, peg$maxFailPos);
    }
  }

  return {
    SyntaxError: SyntaxError,
    parse:       parse
  };
})();
