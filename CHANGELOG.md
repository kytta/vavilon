# CHANGELOG

## 1.1.0

**New & Improved:**
- vavilon.js now includes its type definitions
- bundle size even smaller (876 bytes minzipped)

**Fixed:**
- spacing issue happening in some mobile browsers

## 1.0.0

**Critical changes:**
- manual language switching is now done with `setLang` method

**New & Improved:**
- bundle size is even smaller

**Code-related changes:**
- library is rewritten in TypeScript
- the complexity of some methods was reduced
- most methods moved into an isolated Vavilon object

All of the above ensures that th code works safely and is easily changed.

## 0.3.0

**New & Improved:**
- fully asynchronous and correctly executed requests
- bundle size down to 2 KiB (less than 1000 bytes gzipped)

## 0.2.1

**New & Improved:**
- bundle size decreased to 9 KiB (3.4 KiB gzipped)

## 0.2.0

**New & Improved:**
- manual language switching
- `async` requests to dictionary files
- typed documentation
- faster locale detection and switching engine

**Regressions:**
- prod bundle is now 10 KiB (3.7 KiB gzipped)

## 0.1.0

First public version of `vavilon.js`

* automatic language switching based on browser language
