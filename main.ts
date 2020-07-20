import * as xml from "xml2js";
import * as fs from "fs";
import {
  Point,
  pointInsideAnyPolygon,
} from "./contains-point";
import { parseNumbers } from "xml2js/lib/processors";

const readFile = (f: string) =>
  new Promise((res, rej) =>
    fs.readFile(f, (err, data) => (err ? rej(err) : res(data)))
  );

const flatten = (arr: any[][]) => arr.reduce((flat, x) => [...flat, ...x], []);

const polygonCoordsFromKml = (kml: object): Point[][] => {
  // The various regions seem to live in this path...?
  const places = kml["kml"].Document[0].Folder[0].Placemark;

  // Not sure what the schema is so I'll just guess for now - there are multiple entries in the Placemark and each one has multiple polygons.
  const coordinates: string[] = flatten(
    places.map((x) =>
      x.Polygon.map((p) => p.outerBoundaryIs[0].LinearRing[0].coordinates[0])
    )
  );

  // turn each list of coordinates into an array of Points
  const polyPoints = coordinates.map((coords) =>
    coords.split(" ").map(
      (pair: string): Point => {
        const [x, y] = pair.split(",");
        return {
          x: parseNumbers(x),
          y: parseNumbers(y),
        };
      }
    )
  );

  return polyPoints;
};

// Do the thing.

export const main = (filename: string, test: Point) =>
  readFile(filename)
    .then(xml.parseStringPromise)
    .then(polygonCoordsFromKml)
    .then(pointInsideAnyPolygon(test))
    .then((result) => {
      if (result) {
        console.log(`One of the polygons in the kml file contains the point ${JSON.stringify(test)}`);
      } else {
        console.log(`None of the polygons in the kml file contains the point ${JSON.stringify(test)}`);
      }
      return result;
    })
    .catch((err) => {
      console.error(err);
    });
