// @see https://docs.aircode.io/guide/functions/
const fs = require('fs');
const Interceptor = require('./interceptor.js');

class App {
  constructor() {
    this.interceptor = new Interceptor();
  }

  run() {
    return async (params, context) => {
      context.params = params;
      this.context = context;
      await this.interceptor.run(context);
      return context.body;
    };
  }

  use(aspect) {
    return this.interceptor.use(aspect);
  }

  display(template, args = {}) {
    const content = fs.readFileSync(template, 'utf-8');
    return (new Function(...['app', ...Object.keys(args)], `return \`${content}\``)(this, ...Object.values(args)));
  }

  file(name) {
    const content = fs.readFileSync(name, 'utf-8');
    return content;
  }
}

module.exports = App;