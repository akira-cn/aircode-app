# AirCode App

A simple webapp framework for [AirCode](https://aircode.io/).

## Usage

0. Install aircode-app as dependencies.

1. Entry js file:

```js
// @see https://docs.aircode.io/guide/functions/
const App = require('aircode-app');

const app = new App();

app.use(async (ctx, next) => {
  await next();
  console.log('foobar');
});

app.use(async (ctx, next) => {
  const {params} = ctx;
  ctx.set('content-type', 'text/html');
  ctx.body = app.display('./hello.html', {params});
});

module.exports = app.run();
```

2. HTML Templates & JS & CSS:

```html
<!-- hello.html -->
<!DOCTYPE html>
<html lang="en">
${app.display('./head.tpl')}
<body>
  <h1>${JSON.stringify(params)}</h1>
</body>
${app.display('./footer.tpl')}
</html>
```

```html
<!-- head.tpl -->
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
${app.file('./style.css')}
  </style>
</head>
```

```html
<!-- footer.tpl -->
<script>
${app.file('./script.js')}
</script>
```

```css
/* style.css */
body {
  background-color: #000;
  color: #fff;
}
```

```js
// script.js
console.log('hello world');
```

**You may use this [template](https://aircode.cool/gkek5d5ctr) for startup.**

---

That's all.

Enjoy it!