<div align="center">
    <h1>
        <img src="docs/logo.png" width="300" alt="vavilon.js">
    </h1>
    <p>
        A quick, lightweight and easy-to-use i18n engine for static websites
    </p>
    <p>
        <a href="https://github.com/vavilon-js/vavilon.js/releases">
            <img alt="GitHub release" src="https://img.shields.io/github/release/vavilon-js/vavilon.js.svg">
        </a>
    </p>
    <p>
        <a href="https://travis-ci.com/vavilon-js/vavilon.js">
            <img alt="Travis CI build status" src="https://img.shields.io/travis/com/vavilon-js/vavilon.js.svg">
        </a>
        <a href="https://codeclimate.com/github/vavilon-js/vavilon.js">
            <img alt="Code Climate maintainability" src="https://img.shields.io/codeclimate/maintainability/vavilon-js/vavilon.js.svg">
        </a>
    </p>
</div>

## How to Install

### Manual download

You can find latest version of `vavilon.js` in [Releases][releases]
section on GitHub. Download either the minified or the uncompressed version and
include it in your `<head>`:

```html
<script src="./path/to/vavilon.min.js" type="script.js"></script>
```

## How to use

1. Create your HTML page on open the one you've already created. Set the `lang`
   attribute in your `<html>` tag:

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

   If you rely on multiple versions of the same language (like US and UK English),
   you can user the country-specific lang codes (i.e. `en-us`, `en-uk`)

2. Give unique IDs to every string on your HTML page that you want to have
   translated. Put the IDs inside the `data-vavilon` attribute and add the
   `vavilon` class to these elements:

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

3. Create JSON dictionary files for the languages you want to support. Each file
   should be an object, with the keys being the unique string IDs and values
   being the translated strings. Here's an example for Russian language:

   ```json
   {
     "hello-world": "Привет мир!",
     "how-are-you": "Как дела?"
   }
   ```

4. Connect the dictionaries inside `<head>` element. Add the `data-vavilon-dict`
   attribute to specify the dictionaries language:

   ```html
   <script type="application/json" src="path/to/ru.json" data-vavilon-dict="ru"></script>
   ```

5. [Download and connect](#how-to-install) the latest version of `vavilon.js`.
   Upon doing so, your page now will automatically change its language based
   on the end user's browser locale.

6. If you want your user to be able to switch languages, you can set it up by
   using the `changeLocale` function:

   ```html
   <button onclick="changeLocale('en')">English version</button>
   ```

## Caveats

As you may have guessed from the major version number being 0, the library is
not completely finished. Here are some things that are not supported or don't
work as expected:

### Styling and inline tags

Right now `vavilon.js` replaces the _text_ of the elements, not their HTML code,
which means that the code like

```html
<p class="vavilon" data-vavilon="hello">Hello <b>world</b>!</p>
```

will not have the word "world" written in bold.

The support for styling your strings will come in future releases. If this is
crucial for you, you can use a workaround like this:

```html
<p>
    <span class="vavilon" data-vavilon="hello-1">Hello</span>
    <b class="vaviln" data-vavilon="hello-2">world</b>!
</p>
```

This way you can define separate IDs for the words "Hello" and "world" inside
your dictionary file.

### Framework compatibility

While it is possible to create static websites using frameworks like Vue.js,
React and Svelte, the support for those has not been tested at all. If you use
these frameworks I would highly recommend you use something other than `vavilon.js`,
like the i18n plugins created specifically for these frameworks.

With regard to jQuery, it has not been tested yet either, but I guess it should
work just fine. If you want to play around with `vavilon.js` and jQuery, I
encourage you do so.

----

If you encounter any bugs, don't hesitate [filing an issue][issues]

[releases]: https://github.com/vavilon-js/vavilon.js/releases
[issues]: https://github.com/vavilon-js/vavilon.js/issues
