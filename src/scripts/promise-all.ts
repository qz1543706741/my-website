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

const promiseAllSettled = (promises: Array<Promise<unknown>>) => {
  return new Promise((resolve) => {
    const results: Array<unknown> = [];
    let count = 0;
    promises.forEach((promise, index) => {
      promise
        .then((res) => {
          results[index] = {
            status: 'fulfilled',
            value: res,
          };
          count++;
          if (count === promises.length) {
            resolve(results);
          }
        })
        .catch((err) => {
          results[index] = {
            status: 'rejected',
            reason: err,
          };
          count++;
          if (count === promises.length) {
            resolve(results);
          }
        });
    });
  });
};

const promise1 = new Promise((resolve) => {
  setTimeout(() => {
    resolve(1);
  }, 1000);
});

promiseAll([
  promise1,
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

promiseAllSettled([
  promise1,
  Promise.resolve(2),
  Promise.resolve(3),
  Promise.reject(4),
]).then((res) => {
  console.log(res);
});
