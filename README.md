# Faceless Vector Graphics

![logo.png](examples/logo/logo.png)

**Faceless Vector Graphics is a little image format that compiles into SVG using node.js** It came about because I needed a method to dynamically generate SVGs from a template through a node-webkit app. While SVGs can use style sheets to change appearance or be created from scratch using [svg.js](http://svgjs.com/) or [snap.svg](http://snapsvg.io/) — I could find nothing that allowed me to start with a template, pass it variables through a .json, and embed (**!**link) SVGs within SVGs.

Inspired by and written in Coffeescript, themed after the Guild of Faceless Men, FVG aims to make SVGs easily programmable without complex scripts. Version 0.1 includes just two/three methods and is built with two functions. (Are they methods and functions? Maybe someone can help me understand what I made.)

## How to use

### 1. Installation

```
$ npm install fvg
```

### 2. Setting it up

#### Rename
Grab your .svg file and change the extension to `.fvg` (**NOTE** if you're on a Mac, double check to make sure it's not `.fvg.svg`)

#### Getting variables(properties) from JSON 
Open your .fvg file and after the `<svg ... >` tag:
*input.fvg*
```javascript
ƒ.link{ "path/to/file.json" }
```
(**NOTE** the `ƒ` is a florin sign, `Opt+F` on a Mac)

*file.json*
```javascript
{
	"some_text": "Valar Morgulis",
	"a_color": "#819090"
}
```

Referencing that JSON object:
*input.fvg*
```xml
<rect fill="ƒ{a_color}" width="300" height="200"/>`
```
or
```xml
<text x="150" y="110" text-anchor="middle" fill="#fefee2" font-size="24">ƒ{some_text}</text>
```

#### Embedding SVG XML
I needed to directly embed external SVG elements (not link the .svg using `<image xlink:href="file.svg"/>`) so I created an echo method which grabs the text of the linked file:

*input.fvg*
```xml
<defs>
	ƒ.echo{ "path/to/file.xml" }
</defs>
```

*file.xml*
```xml
<rect id="a_kindly_rect" width="240" height="100"/>
```

### 3. Compiling it

#### Inside your node.js file 
```javascript
var fvg = require( 'fvg' );
```

#### don_svg( input, output )
Generates a .svg file
```javascript
fvg.don_svg( 'input.fvg', 'output.svg' );
```

#### don_png( input, output, [ratio, optimize])
Generates a .png file, if unspecified the third argument defaults to [1, true]
```javascript
fvg.don_png( 'input.fvg', 'output.png' );
```

### 4. Output

#### output.svg
```xml
<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="300px" height="200px" viewBox="0 0 300 200">
	<defs>
		<rect id="a_kindly_rect" width="240" height="100"/>
	</defs>
	<rect fill="#819090" width="300" height="200"/>
	<use x="30" y="50" fill="#465b62" xlink:href="#a_kindly_rect"/>
	<text x="150" y="110" text-anchor="middle" fill="#fefee2" font-size="24">Valar Morghulis</text>
</svg>
```

#### output.png
![output.png](examples/readme/output.png)

## How it works

TODO: write this.

## Notes

This has only been tested on Mac OS X 10.9.2. I'm not experienced enough to maintain this for all platforms or figure out why it doesn't work on your computer. It's just an experiment I did to solve a very specific challenge.
