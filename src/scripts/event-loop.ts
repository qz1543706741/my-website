const p = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(1);
    }, 1000);
  });

console.log('script start');

(async () => {
  console.log('async function start');
  for (let i = 1; i < 3; i++) {
    await p();
    console.log('async function resume', i);
  }
  await p();
  console.log('async function end');
})();

console.log('script end');
