import {
  __asyncGenerator,
  __await
} from "./chunk-IVSKKVYG.js";

// node_modules/rxjs-for-await/dist/esm/util/deferred.js
var Deferred = class {
  constructor() {
    this.resolve = null;
    this.reject = null;
    this.promise = new Promise((a, b) => {
      this.resolve = a;
      this.reject = b;
    });
  }
};

// node_modules/rxjs-for-await/dist/esm/index.js
var RESOLVED = Promise.resolve();
function eachValueFrom(source) {
  return __asyncGenerator(this, null, function* () {
    const deferreds = [];
    const values = [];
    let hasError = false;
    let error = null;
    let completed = false;
    const subs = source.subscribe({
      next: (value) => {
        if (deferreds.length > 0) {
          deferreds.shift().resolve({ value, done: false });
        } else {
          values.push(value);
        }
      },
      error: (err) => {
        hasError = true;
        error = err;
        while (deferreds.length > 0) {
          deferreds.shift().reject(err);
        }
      },
      complete: () => {
        completed = true;
        while (deferreds.length > 0) {
          deferreds.shift().resolve({ value: void 0, done: true });
        }
      }
    });
    try {
      while (true) {
        if (values.length > 0) {
          yield values.shift();
        } else if (completed) {
          return;
        } else if (hasError) {
          throw error;
        } else {
          const d = new Deferred();
          deferreds.push(d);
          const result = yield new __await(d.promise);
          if (result.done) {
            return;
          } else {
            yield result.value;
          }
        }
      }
    } catch (err) {
      throw err;
    } finally {
      subs.unsubscribe();
    }
  });
}
function bufferedValuesFrom(source) {
  return __asyncGenerator(this, null, function* () {
    let deferred = null;
    const buffer = [];
    let hasError = false;
    let error = null;
    let completed = false;
    const subs = source.subscribe({
      next: (value) => {
        if (deferred) {
          deferred.resolve(RESOLVED.then(() => {
            const bufferCopy = buffer.slice();
            buffer.length = 0;
            return { value: bufferCopy, done: false };
          }));
          deferred = null;
        }
        buffer.push(value);
      },
      error: (err) => {
        hasError = true;
        error = err;
        if (deferred) {
          deferred.reject(err);
          deferred = null;
        }
      },
      complete: () => {
        completed = true;
        if (deferred) {
          deferred.resolve({ value: void 0, done: true });
          deferred = null;
        }
      }
    });
    try {
      while (true) {
        if (buffer.length > 0) {
          const bufferCopy = buffer.slice();
          buffer.length = 0;
          yield bufferCopy;
        } else if (completed) {
          return;
        } else if (hasError) {
          throw error;
        } else {
          deferred = new Deferred();
          const result = yield new __await(deferred.promise);
          if (result.done) {
            return;
          } else {
            yield result.value;
          }
        }
      }
    } catch (err) {
      throw err;
    } finally {
      subs.unsubscribe();
    }
  });
}
function latestValueFrom(source) {
  return __asyncGenerator(this, null, function* () {
    let deferred = void 0;
    let latestValue;
    let hasLatestValue = false;
    let hasError = false;
    let error = null;
    let completed = false;
    const subs = source.subscribe({
      next: (value) => {
        hasLatestValue = true;
        latestValue = value;
        if (deferred) {
          deferred.resolve(RESOLVED.then(() => {
            hasLatestValue = false;
            return { value: latestValue, done: false };
          }));
        }
      },
      error: (err) => {
        hasError = true;
        error = err;
        if (deferred) {
          deferred.reject(err);
        }
      },
      complete: () => {
        completed = true;
        if (deferred) {
          hasLatestValue = false;
          deferred.resolve({ value: void 0, done: true });
        }
      }
    });
    try {
      while (true) {
        if (hasLatestValue) {
          yield new __await(RESOLVED);
          const value = latestValue;
          hasLatestValue = false;
          yield value;
        } else if (completed) {
          return;
        } else if (hasError) {
          throw error;
        } else {
          deferred = new Deferred();
          const result = yield new __await(deferred.promise);
          if (result.done) {
            return;
          } else {
            yield result.value;
          }
        }
      }
    } catch (err) {
      throw err;
    } finally {
      subs.unsubscribe();
    }
  });
}
function nextValueFrom(source) {
  return __asyncGenerator(this, null, function* () {
    let deferred = void 0;
    let hasError = false;
    let error = null;
    let completed = false;
    const subs = source.subscribe({
      next: (value) => {
        if (deferred) {
          deferred.resolve({ value, done: false });
        }
      },
      error: (err) => {
        hasError = true;
        error = err;
        if (deferred) {
          deferred.reject(err);
        }
      },
      complete: () => {
        completed = true;
        if (deferred) {
          deferred.resolve({ value: void 0, done: true });
        }
      }
    });
    try {
      while (true) {
        if (completed) {
          return;
        } else if (hasError) {
          throw error;
        } else {
          deferred = new Deferred();
          const result = yield new __await(deferred.promise);
          if (result.done) {
            return;
          } else {
            yield result.value;
          }
        }
      }
    } catch (err) {
      throw err;
    } finally {
      subs.unsubscribe();
    }
  });
}
export {
  bufferedValuesFrom,
  eachValueFrom,
  latestValueFrom,
  nextValueFrom
};
//# sourceMappingURL=rxjs-for-await.js.map
