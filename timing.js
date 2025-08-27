/**
 * Times how long a function takes to run.
 * @param {Function} func 
 */
export default function timeFunction(func) {
   performance.mark("start");
   func();
   performance.mark("end");
   const durationP = performance.measure(
      "start",
      {},
      "end",
   );
   console.log(`Function took ${durationP.duration}ms`, func);
}