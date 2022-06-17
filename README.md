> # THIS PROJECT IS UNMAINTAINED
>
> I do not develop this project any more. The closest alternative would be
> [i18next](https://www.i18next.com/).

---

<div>
<img src="https://media.githubusercontent.com/media/vavilon-js/assets/master/vavilon.js/logo.png" width="150" alt="vavilon.js logo" align="left">
<h1>vavilon.js</h1>
<p>A quick, lightweight and easy-to-use i18n engine for static websites</p>
<a href="https://www.npmjs.com/package/vavilon"><img alt="npm" src="https://badgen.net/npm/v/vavilon?label="></a>&nbsp;<a href="https://bundlephobia.com/result?p=vavilon"><img alt="npm bundle size" src="https://badgen.net/bundlephobia/minzip/vavilon?color=222&label="></a>
</div>

## How to Install

To use `vavilon.js` on your website you need to add it as a script to your
page's `<head>`. Here are some ways to get this done:

### via CDN (recommended)

You can get `vavilon.js` via jsDelivr. This is the fastest and the most reliable
way:

```html
<script src="https://cdn.jsdelivr.net/npm/vavilon@1/dist/vavilon.min.js"></script>
```

### via NPM

If build your static website with help of other NPM packages, you can install
`vavilon.js` using npm:

```sh
npm install vavilon
```

Then you can include the script in your webpage like so:

```html
<script src="./path/to/node_modules/vavilon/dist/vavilon.min.js"></script>
```

### Manual download

You can find the latest version of `vavilon.js` in the [Releases][releases]
section on GitHub. Download the minified version and include it in your page:

```html
<script src="./path/to/vavilon.min.js"></script>
```

## How to use

1. Create an HTML page or open an already existing one. Set the `lang` attribute
   in the `<html>` tag:

   ```html
   <html lang="en">
     <head>
       <title>Hello World!</title>
     </head>
     <body>
       <h1>How are you?</h1>
     </body>
   </html>
   ```

   If you rely on multiple versions of the same language (like US vs UK English),
   you can user the country-specific language codes (i.e. `en-US`, `en-UK`)

2. Assign a unique ID to every element on the HTML page the contents of which
   you want to have translated. Put the IDs in the `data-vavilon` attribute and
   add the `vavilon` class to these elements:

   ```html
   <html lang="en">
     <head>
       <title class="vavilon" data-vavilon="hello-world">Hello World!</title>
     </head>
     <body>
       <h1 class="vavilon" data-vavilon="how-are-you">How are you?</h1>
     </body>
   </html>
   ```

3. Create JSON dictionary files for every language you want to support. Each
   file should be an object, with keys being the unique IDs and values being the
   translated strings. Here's how it would look for Russian:

   ```json
   {
     "hello-world": "Привет мир!",
     "how-are-you": "Как дела?"
   }
   ```

4. Add each dictionary file to the page. Use a `script` element in the `<head>`
   with a `data-vavilon-dict` attribute holding the dictionary's language code:

   ```html
   <script
     type="application/json"
     src="path/to/ru.json"
     data-vavilon-dict="ru"
   ></script>
   ```

5. [Add](#how-to-install) the latest version of `vavilon.js` to the page. Now
   your page will automatically change its language based on the end user's
   browser locale.

6. If you want your user to be able to switch languages manually, you can set it
   up by using the exported `setLang` function:

   ```html
   <button onclick="setLang('en')">English version</button>
   ```

## Browser support

`vavilon.js` works on [99%][browserslist] of browsers used today:

| ![Chrome][chrome] | ![Safari][safari] | ![Firefox][firefox] | ![MS Edge][edge] | ![Internet Explorer][ie] | ![Opera][opera] |
| :---------------: | :---------------: | :-----------------: | :--------------: | :----------------------: | :-------------: |
|      **15+**      |      **5+**       |       **45+**       |     **12+**      |          **9+**          |    **12.1+**    |

[chrome]: https://github.com/alrra/browser-logos/raw/master/src/chrome/chrome_48x48.png
[edge]: https://github.com/alrra/browser-logos/raw/master/src/edge/edge_48x48.png
[firefox]: https://github.com/alrra/browser-logos/raw/master/src/firefox/firefox_48x48.png
[ie]: https://github.com/alrra/browser-logos/raw/master/src/archive/internet-explorer_9-11/internet-explorer_9-11_48x48.png
[opera]: https://github.com/alrra/browser-logos/raw/master/src/opera/opera_48x48.png
[safari]: https://github.com/alrra/browser-logos/raw/master/src/safari/safari_48x48.png
[browserslist]: https://browserslist.dev/?q=Y292ZXIgMTAwJSwgbm90IGNocm9tZSA8IDE1LCBub3QgYW5kX2NociA8IDE1LCBub3Qgc2FmYXJpIDwgNSwgbm90IGlvc19zYWYgPCA1LCBub3QgZmlyZWZveCA8IDQ1LCBub3QgYW5kX2ZmIDwgNDUsIG5vdCBlZGdlIDwgMTIsIG5vdCBpZSA8IDksIG5vdCBpZV9tb2IgPCA5LCBub3Qgb3BlcmEgPCAxMi4xLCBub3Qgb3BfbW9iIDwgMTIuMSwgbm90IG9wX21pbmkgPCAxMi4xLCBub3QgYW5kcm9pZCA8IDQuNA%3D%3D

## Caveats

Despite being a stable release, `vavilon.js` is not completely finished. Here
are some things that are not yet supported or don't work as expected:

### Styling and inline tags

Right now `vavilon.js` replaces the _text_ of the elements, not their HTML code.
Consider this snippet:

```html
<p class="vavilon" data-vavilon="hello"><b>Hello</b> world!</p>
```

The page will not have the word "Hello" in bold upon changing the language,
because `vavilon.js` will have replaced the contents of the whole `<p>` with
plain text.

The support for styling your strings will come in future releases. If this is
crucial for you right now, you can use a workaround like this:

```html
<p>
  <b class="vavilon" data-vavilon="hello-1">Hello</b>
  <span class="vavilon" data-vavilon="hello-2">world</span>!
</p>
```

This way you can define separate IDs for the words "Hello" and "world" in your
dictionary file and have different styles applied to them on the page.

### Framework compatibility

While it is possible to create static websites using frameworks like Vue.js,
React and Svelte, the support not been tested at all. If you use these
frameworks to generate your website, I highly recommend you use something else,
like the i18n engines created specifically for these frameworks.

Regarding jQuery, it has not been tested yet either, but I guess it should work
just fine. If you want to play around with `vavilon.js` and jQuery, I encourage
you do so.

---

If you encounter any bugs, don't hesitate [creating an issue][issues]

[releases]: https://github.com/vavilon-js/vavilon.js/releases
[issues]: https://github.com/vavilon-js/vavilon.js/issues
