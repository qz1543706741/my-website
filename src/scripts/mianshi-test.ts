// (() => {
//   let id: number = 0;
//   const startTime = 0;
//   let times = 60;
//   const logTime = () => {
//     if (times === 0) cancelAnimationFrame(id);
//     times--;
//     const el = document.getElementById('root');
//     temp = Math.floor(Date.now() - startTime) / 1000;

//     if (temp > 0) {
//       el && (el.innerHTML = times);
//       id = requestAnimationFrame(logTime);
//     }
//   };
//   logTime();
// })();
