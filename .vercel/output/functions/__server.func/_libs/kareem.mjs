var kareem;
var hasRequiredKareem;
function requireKareem() {
  if (hasRequiredKareem) return kareem;
  hasRequiredKareem = 1;
  function Kareem() {
    this._pres = /* @__PURE__ */ new Map();
    this._posts = /* @__PURE__ */ new Map();
  }
  Kareem.skipWrappedFunction = function skipWrappedFunction() {
    if (!(this instanceof Kareem.skipWrappedFunction)) {
      return new Kareem.skipWrappedFunction(...arguments);
    }
    this.args = [...arguments];
  };
  Kareem.overwriteResult = function overwriteResult() {
    if (!(this instanceof Kareem.overwriteResult)) {
      return new Kareem.overwriteResult(...arguments);
    }
    this.args = [...arguments];
  };
  Kareem.overwriteArguments = function overwriteArguments() {
    if (!(this instanceof Kareem.overwriteArguments)) {
      return new Kareem.overwriteArguments(...arguments);
    }
    this.args = [...arguments];
  };
  Kareem.prototype.execPre = async function execPre(name, context, args, options) {
    let pres = this._pres.get(name) || [];
    if (options?.filter) {
      pres = pres.filter(options.filter);
    }
    const numPres = pres.length;
    let $args = args;
    let skipWrappedFunction = null;
    if (!numPres) {
      return $args;
    }
    for (const pre of pres) {
      const args2 = [];
      const _args = [null].concat($args);
      for (let i = 1; i < _args.length; ++i) {
        if (i === _args.length - 1 && typeof _args[i] === "function") {
          continue;
        }
        args2.push(_args[i]);
      }
      try {
        const maybePromiseLike = pre.fn.apply(context, args2);
        if (isPromiseLike(maybePromiseLike)) {
          const result = await maybePromiseLike;
          if (result instanceof Kareem.overwriteArguments) {
            $args = result.args;
          }
        } else if (maybePromiseLike instanceof Kareem.overwriteArguments) {
          $args = maybePromiseLike.args;
        }
      } catch (error) {
        if (error instanceof Kareem.skipWrappedFunction) {
          skipWrappedFunction = error;
          continue;
        }
        if (error instanceof Kareem.overwriteArguments) {
          $args = error.args;
          continue;
        }
        throw error;
      }
    }
    if (skipWrappedFunction) {
      throw skipWrappedFunction;
    }
    return $args;
  };
  Kareem.prototype.execPreSync = function(name, context, args, options) {
    let pres = this._pres.get(name) || [];
    if (options?.filter) {
      pres = pres.filter(options.filter);
    }
    const numPres = pres.length;
    let $args = args || [];
    for (let i = 0; i < numPres; ++i) {
      const result = pres[i].fn.apply(context, $args);
      if (result instanceof Kareem.overwriteArguments) {
        $args = result.args;
      }
    }
    return $args;
  };
  Kareem.prototype.execPost = async function execPost(name, context, args, options) {
    let posts = this._posts.get(name) || [];
    if (options?.filter) {
      posts = posts.filter(options.filter);
    }
    const numPosts = posts.length;
    let firstError = null;
    if (options && options.error) {
      firstError = options.error;
    }
    if (!numPosts) {
      if (firstError != null) {
        throw firstError;
      }
      return args;
    }
    for (const currentPost of posts) {
      const post = currentPost.fn;
      let numArgs = 0;
      const newArgs = [];
      const argLength = args.length;
      for (let i = 0; i < argLength; ++i) {
        if (!args[i] || !args[i]._kareemIgnore) {
          numArgs += 1;
          newArgs.push(args[i]);
        }
      }
      if (options?.numCallbackParams != null) {
        numArgs = options.numCallbackParams;
        for (let i = newArgs.length; i < numArgs; ++i) {
          newArgs.push(null);
        }
      }
      let resolve;
      let reject;
      const cbPromise = new Promise((_resolve, _reject) => {
        resolve = _resolve;
        reject = _reject;
      });
      newArgs.push(function nextCallback(err) {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
      if (firstError) {
        if (isErrorHandlingMiddleware(currentPost, numArgs)) {
          try {
            const res = post.apply(context, [firstError].concat(newArgs));
            if (isPromiseLike(res)) {
              await res;
            } else if (post.length === numArgs + 2) {
              await cbPromise;
            }
          } catch (error) {
            if (error instanceof Kareem.overwriteResult) {
              args = error.args;
              continue;
            }
            firstError = error;
          }
        } else {
          continue;
        }
      } else {
        if (isErrorHandlingMiddleware(currentPost, numArgs)) {
          continue;
        } else {
          let res = null;
          try {
            res = post.apply(context, newArgs);
            if (isPromiseLike(res)) {
              res = await res;
            } else if (post.length === numArgs + 1) {
              res = await cbPromise;
            }
          } catch (error) {
            if (error instanceof Kareem.overwriteResult) {
              args = error.args;
              continue;
            }
            firstError = error;
            continue;
          }
          if (res instanceof Kareem.overwriteResult) {
            args = res.args;
            continue;
          }
        }
      }
    }
    if (firstError != null) {
      throw firstError;
    }
    return args;
  };
  Kareem.prototype.execPostSync = function(name, context, args, options) {
    let posts = this._posts.get(name) || [];
    if (options?.filter) {
      posts = posts.filter(options.filter);
    }
    const numPosts = posts.length;
    for (let i = 0; i < numPosts; ++i) {
      const res = posts[i].fn.apply(context, args || []);
      if (res instanceof Kareem.overwriteResult) {
        args = res.args;
      }
    }
    return args;
  };
  Kareem.prototype.createWrapperSync = function(name, fn, context, options) {
    const _this = this;
    const getOptions = options?.getOptions;
    return function syncWrapper() {
      const _context = context || this;
      const args = Array.from(arguments);
      const execOptions = typeof getOptions === "function" ? getOptions(args) : {};
      const preOptions = execOptions.pre ?? execOptions;
      const postOptions = execOptions.post ?? execOptions;
      const modifiedArgs = _this.execPreSync(name, _context, args, preOptions);
      const toReturn = fn.apply(_context, modifiedArgs);
      const result = _this.execPostSync(name, _context, [toReturn], postOptions);
      return result[0];
    };
  };
  Kareem.prototype.wrap = async function wrap(name, fn, context, args, options) {
    let ret;
    let skipWrappedFunction = false;
    let modifiedArgs = args;
    try {
      modifiedArgs = await this.execPre(name, context, args);
    } catch (error) {
      if (error instanceof Kareem.skipWrappedFunction) {
        ret = error.args;
        skipWrappedFunction = true;
      } else {
        await this.execPost(name, context, args, { ...options, error });
      }
    }
    if (!skipWrappedFunction) {
      ret = await fn.apply(context, modifiedArgs);
    }
    ret = await this.execPost(name, context, [ret], options);
    return ret[0];
  };
  Kareem.prototype.filter = function(fn) {
    const clone = this.clone();
    const pres = Array.from(clone._pres.keys());
    for (const name of pres) {
      const hooks = this._pres.get(name).map((h) => Object.assign({}, h, { name })).filter(fn);
      if (hooks.length === 0) {
        clone._pres.delete(name);
        continue;
      }
      clone._pres.set(name, hooks);
    }
    const posts = Array.from(clone._posts.keys());
    for (const name of posts) {
      const hooks = this._posts.get(name).map((h) => Object.assign({}, h, { name })).filter(fn);
      if (hooks.length === 0) {
        clone._posts.delete(name);
        continue;
      }
      clone._posts.set(name, hooks);
    }
    return clone;
  };
  Kareem.prototype.hasHooks = function(name) {
    return this._pres.has(name) || this._posts.has(name);
  };
  Kareem.prototype.createWrapper = function(name, fn, context, options) {
    const _this = this;
    if (!this.hasHooks(name)) {
      return fn;
    }
    return function kareemWrappedFunction() {
      const _context = context || this;
      return _this.wrap(name, fn, _context, Array.from(arguments), options);
    };
  };
  Kareem.prototype.pre = function(name, options, fn, error, unshift) {
    if (typeof options === "function") {
      fn = options;
      options = {};
    } else if (options == null) {
      options = {};
    }
    const pres = this._pres.get(name) || [];
    this._pres.set(name, pres);
    if (typeof fn !== "function") {
      throw new Error('pre() requires a function, got "' + typeof fn + '"');
    }
    if (unshift) {
      pres.unshift(Object.assign({}, options, { fn }));
    } else {
      pres.push(Object.assign({}, options, { fn }));
    }
    return this;
  };
  Kareem.prototype.post = function(name, options, fn, unshift) {
    const posts = this._posts.get(name) || [];
    if (typeof options === "function") {
      unshift = !!fn;
      fn = options;
      options = {};
    }
    if (typeof fn !== "function") {
      throw new Error('post() requires a function, got "' + typeof fn + '"');
    }
    if (unshift) {
      posts.unshift(Object.assign({}, options, { fn }));
    } else {
      posts.push(Object.assign({}, options, { fn }));
    }
    this._posts.set(name, posts);
    return this;
  };
  Kareem.prototype.postError = function postError(name, options, fn, unshift) {
    if (typeof options === "function") {
      unshift = !!fn;
      fn = options;
      options = {};
    }
    return this.post(name, { ...options, errorHandler: true }, fn, unshift);
  };
  Kareem.prototype.clone = function() {
    const n = new Kareem();
    for (const key of this._pres.keys()) {
      const clone = this._pres.get(key).slice();
      n._pres.set(key, clone);
    }
    for (const key of this._posts.keys()) {
      n._posts.set(key, this._posts.get(key).slice());
    }
    return n;
  };
  Kareem.prototype.merge = function(other, clone) {
    clone = arguments.length === 1 ? true : clone;
    const ret = clone ? this.clone() : this;
    for (const key of other._pres.keys()) {
      const sourcePres = ret._pres.get(key) || [];
      const deduplicated = other._pres.get(key).filter((p) => sourcePres.map((_p) => _p.fn).indexOf(p.fn) === -1);
      const combined = sourcePres.concat(deduplicated);
      ret._pres.set(key, combined);
    }
    for (const key of other._posts.keys()) {
      const sourcePosts = ret._posts.get(key) || [];
      const deduplicated = other._posts.get(key).filter((p) => sourcePosts.indexOf(p) === -1);
      ret._posts.set(key, sourcePosts.concat(deduplicated));
    }
    return ret;
  };
  function isPromiseLike(v) {
    return typeof v === "object" && v !== null && typeof v.then === "function";
  }
  function isErrorHandlingMiddleware(post, numArgs) {
    if (post.errorHandler) {
      return true;
    }
    return post.fn.length === numArgs + 2;
  }
  kareem = Kareem;
  return kareem;
}
export {
  requireKareem as r
};
