import { main } from "./main";

// Should validate these args are correct, not going to for this quick app
const [_, kmlFilename, testPointX, testPointY] = process.argv;

const testPoint = {
  x: parseInt(testPointX, 10),
  y: parseInt(testPointY, 10),
};

main(kmlFilename, testPoint);
