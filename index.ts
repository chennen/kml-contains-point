import { main } from "./main";

// Should validate these args are correct, not going to for this quick app
const [kmlFilename, testPointX, testPointY] = process.argv.slice(2);
const testPoint = {
  x: Number.parseFloat(testPointX),
  y: Number.parseFloat(testPointY),
};

main(kmlFilename, testPoint);
