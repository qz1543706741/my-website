const promiseAll = (promises: Array<Promise<unknown>>) => {
  return new Promise((resolve, reject) => {
    const results: Array<unknown> = [];
    let count = 0;
    promises.forEach((promise, index) => {
      promise
        .then((res) => {
          results[index] = res;
          count++;
          if (count === promises.length) {
            resolve(results);
          }
        })
        .catch(reject);
    });
  });
};

promiseAll([
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(1);
    }, 1000);
  }),
  Promise.resolve(2),
  Promise.resolve(3),
  Promise.reject(4),
])
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.error('err', err);
  });
