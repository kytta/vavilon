# vavilon.js

*__version 0.1.0__*

A quick (done in 15 ms), lightweight (1.34 KB gzipped) and easy-to-use i18n engine for static websites.

*Note: this project is in development stage. Use it with caution!*

## Readiness

* [x] Automatic language switch
* [x] Multiple dictionaries loading
* [x] Storing users preference in cookies
* [ ] Fully asynchronous requests
* [ ] Manual language switch
* [ ] Styling support
* [ ] NPM deploy
* [ ] Testing

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
   strings themselves. Here's an example for Russian:
   
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
   
You're done! The page will now be automatically translated for users who have
a Russian localization enabled in their browser. You can connect as many 
dictionaries as you want.

[releases]: https://github.com/vavilon-js/vavilon.js/releases
