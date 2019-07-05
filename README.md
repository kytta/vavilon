# vavilon.js

[![Travis CI build status](https://img.shields.io/travis/com/vavilon-js/vavilon.js.svg)](https://travis-ci.com/vavilon-js/vavilon.js)

*__version 0.1.0__*

A quick (done in 1 ms), lightweight (3.7 KB gzipped, will be improved) and 
easy-to-use i18n engine for static websites.

*Note: this project is in development stage. Use it with caution!*

## Readiness

* [x] Automatic language switch
* [x] Multiple dictionaries loading
* [x] Storing users preference in cookies
* [x] Manual language switch
* [ ] Optimized async requests
* [ ] Styling support
* [x] GitHub deploy
* [ ] NPM deploy
* [ ] Testing
* [x] CI
* [ ] Ensured compatibility with React, Vue, Angular, Svelte, jQuery
* [ ] `gettext`-like JSON support (where the keys are the strings in original language)

## How to use

1. Create your HTML page. Choose a language to be the default and use it in the
   page. Don't forget about the `lang` attribute:
   
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
   
   Hint: the country-specific codes (like `en-us`) are supported as well!

2. [Download][releases] and connect the latest version of `vavilon.js` library 
   like so:

   ```html
   <script type="text/javascript" src="path/to/vavilon.min.js"></script>
   ```
   
3. Tag the strings in your HTML page with any IDs that you want using the
   `data-vavilon` attribute and `vavilon` class:
   
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
   
4. Create a JSON file for your languages. Keys are string IDs and values are the
   strings themselves. Here's an example for Russian (`ru.json`):
   
   ```json
   {
     "hello-world": "Привет мир!",
     "how-are-you": "Как дела?"
   }
   ```
   
5. Connect the dictionaries inside `<head>`. Tag them with `data-vavilon-dict`
   and specify the dictionaries language:

   ```html
   <script type="application/json" src="path/to/ru.json" data-vavilon-dict="ru"></script>
   ```
   
6. You can setup the language switching using the `changeLocale` function:

   ```html
   <button onclick="changeLocale('en')">English version</button>
   ```
   
You're done! The page will now be automatically translated for users who have
a Russian localization enabled in their browser. You can connect as many 
dictionaries as you want.

[releases]: https://github.com/vavilon-js/vavilon.js/releases
