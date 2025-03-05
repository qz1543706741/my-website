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

promiseAllSettled([
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(1);
    }, 1000);
  }),
  Promise.resolve(2),
  Promise.resolve(3),
  Promise.reject(4),
]).then((res) => {
  console.log(res);
});
