import { graphemesLength, truncateCodepoints, truncateGraphemesWithUnicode, truncateToBytesWithUnicode, utf8BytesLength } from "../truncation";
// BLNS stolen from: https://github.com/minimaxir/big-list-of-naughty-strings used under MIT License
import blns from "./blns.json";
import timeFunction  from "../timing.js";

const testinglength = 8;

const tortureTest = () => blns.forEach((string, index) => {
   console.log(`Testing string #${index}: ${string}`)
   const codepoints = truncateCodepoints(string, testinglength);
   if (codepoints.length > testinglength) {
      console.error(`Codepoints truncation: FAILED, length: ${codepoints.length}, truncated: ${codepoints}`);
   } 
   const graphemes = truncateGraphemesWithUnicode(string, testinglength);
   const graphemeStringLength = graphemesLength(graphemes)
   if (graphemeStringLength > testinglength) {
      console.error(`Graphemes truncation: FAILED, length: ${graphemeStringLength}, truncated: ${graphemes}`);
   }
   const bytes = truncateToBytesWithUnicode(string, testinglength);
   const bytesLength = utf8BytesLength(bytes);
   if (bytesLength > testinglength) {
      console.error(`Bytes trunctation: FAILED, length: ${bytesLength}, truncated: ${bytes}`);
   } else {
      console.log(`PASSED: ${bytes}, ${bytesLength}`);
   }
});

function benchmarkTruncation() {
   for (let i = 0; i < 80; i++) {
      blns.map(str => truncateToBytesWithUnicode(str, i));
   }
}


timeFunction(timeTruncation);

