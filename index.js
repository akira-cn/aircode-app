const fs = require('fs');
const esbuild = require('esbuild');
const {db, files} = require('aircode');
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

  use(...aspects) {
    aspects.flat().forEach(aspect => this.interceptor.use(aspect));
    return this;
  }

  display(template, args = {}) {
    const content = fs.readFileSync(template, 'utf-8');
    return (new Function(...['app', ...Object.keys(args)], `return \`${content}\``)(this, ...Object.values(args)));
  }

  file(name) {
    const content = fs.readFileSync(name, 'utf-8');
    return content;
  }

  buildSync(name, opts = {}) {
    const result = esbuild.buildSync({
      entryPoints: [name],
      bundle: true,
      write: false,
      ...opts,
    });
    return result.outputFiles[0].text;
  }

  async build(name, opts = {}) {
    const _files = db.table('_files');
    let fileInfo = await _files.where({name}).findOne();
    if(!fileInfo) {
      const bundleSource = this.buildSync(name, opts);
      fileInfo = await files.upload(bundleSource, name, opts);
    }
    return fileInfo.url;
  }

  async getFileUrl(name, opts) {
    return await this.url(null, name, opts);
  }

  async url(content, name, opts = {}) {
    const _files = db.table('_files');
    let fileInfo = await _files.where({name}).findOne();

    if(!fileInfo) {
      if(!content) content = this.file(name);
      const {transpile, ...options} = opts;
      if(transpile) {
        content = await transpile(content, name, options);
      }
      fileInfo = await files.upload(content, name, options);
    }
    return fileInfo.url;
  }
}

module.exports = App;