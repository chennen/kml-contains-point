import { main } from "../main";

const kmlFilename = __dirname + "/sample.kml";

console.log(kmlFilename);

test("it reads the file and doesn't find a point in any of the polygons", () =>
  main(kmlFilename, { x: 50, y: 50 }).then((x) => expect(x).toEqual(false)));

test("it reads the file and finds a point in one of the polygons", () =>
  main(kmlFilename, { x: -68.76866, y: 44.79824 }).then((x) => expect(x).toEqual(true)));