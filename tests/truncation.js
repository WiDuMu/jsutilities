import { graphemesLength, truncateCodepoints, truncateGraphemesWithUnicode, truncateToBytesWithUnicode, utf8BytesLength } from "../truncation";
// BLNS stolen from: https://github.com/minimaxir/big-list-of-naughty-strings used under MIT License
import blns from "./blns.json";

const testinglength = 3;

blns.forEach((string, index) => {
   console.log(`Testing string #${index}`)
   const codepoints = truncateCodepoints(string, testinglength);
   if (codepoints.length > testinglength) {
      console.error(`Codepoints truncation: FAILED, length: ${codepoints.length}, string: ${string}, truncated: ${codepoints}`);
   } 
   const graphemes = truncateGraphemesWithUnicode(string, testinglength);
   const graphemeStringLength = graphemesLength(graphemes)
   if (graphemeStringLength > testinglength) {
      console.error(`Graphemes truncation: FAILED, length: ${graphemeStringLength}, string: ${string}, truncated: ${graphemes}`);
   } 
   const bytes = truncateToBytesWithUnicode(string, testinglength);
   const bytesLength = utf8BytesLength(bytes);
   if (bytesLength > testinglength) {
      const bytesCodepoints = [...bytes].map(character => `\\u${character.charCodeAt(0)}`).join('');
      console.error(`Bytes trunctation: FAILED, length: ${bytesLength}, string: ${string}, truncated: ${bytesCodepoints}, ${bytes}`);
   } else {
      console.log(`PASSED: ${bytes}, ${bytesLength}`);
   }
});

