interface Resolve<T> {
  (result: T): void;
}

interface Reject {
  (error: unknown): void;
}

interface Executor<T> {
  (resolve: Resolve<T>, reject: Reject): void;
}

enum Status {
  PENDING = 'pending',
  FULLFILED = 'fullfiled',
  REJECTED = 'rejected',
}

class MyPromise<T> {
  private status: Status = Status.PENDING;
  private result!: T;
  private reason: unknown;
  private onFulfilledCallbacks: Array<(value: T) => void> = [];
  private onRejectedCallbacks: Array<(reason: unknown) => void> = [];

  constructor(private executor: Executor<T>) {
    const resolve: Resolve<T> = (result) => {
      if (this.status !== Status.PENDING) return;
      this.status = Status.FULLFILED;
      this.result = result;
      this.onFulfilledCallbacks.forEach((fn) => fn(result));
    };
    const reject: Reject = (error) => {
      if (this.status !== Status.PENDING) return;
      this.status = Status.REJECTED;
      this.reason = error;
      this.onRejectedCallbacks.forEach((fn) => fn(error));
    };
    try {
      this.executor(resolve, reject);
    } catch (error: unknown) {
      reject(error);
    }
  }
  then<V>(
    onFulfilled?: (value: T) => V,
    onRejected?: (reason: unknown) => V,
  ): MyPromise<V> {
    return new MyPromise<V>((resolve, reject) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const processResult = (fn?: (arg: any) => V, value?: any) => {
        queueMicrotask(() => {
          try {
            if (typeof fn === 'function') {
              const result = fn(value);
              if (result instanceof MyPromise) {
                result.then(resolve, reject);
              } else {
                resolve(result as V);
              }
            } else {
              resolve(value as V);
            }
          } catch (error) {
            reject(error);
          }
        });
      };

      if (this.status === Status.FULLFILED) {
        processResult(onFulfilled, this.result);
      } else if (this.status === Status.REJECTED) {
        processResult(onRejected, this.reason);
      } else {
        this.onFulfilledCallbacks.push((value) =>
          processResult(onFulfilled, value),
        );
        this.onRejectedCallbacks.push((reason) =>
          processResult(onRejected, reason),
        );
      }
    });
  }

  catch<V>(onRejected?: (reason: unknown) => V): MyPromise<V> {
    return this.then(undefined, onRejected);
  }
}

const promise = new MyPromise<string>((resolve, reject) => {
  reject('1111');
});

promise
  .catch((reason) => {
    console.log(reason);
    return '32211';
  })
  .then((res) => {
    console.log(res);
  });
