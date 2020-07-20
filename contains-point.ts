// just put every function in one file. in a real project i might split these out
export interface Point {
  x: number;
  y: number;
}

const theOrigin: Point = {
  x: 0,
  y: 0,
};

interface LineSegment {
  start: Point;
  end: Point;
}

// Construct a vector from p1 to p2
const pointDifference = (p1: Point) => (p2: Point): Point => ({
  x: p2.x - p1.x,
  y: p2.y - p1.y,
});

const crossUp = (test: Point = theOrigin) => (l: LineSegment) =>
  l.start.y <= test.y && l.end.y > test.y;
const crossDown = (test: Point = theOrigin) => (l: LineSegment) =>
  l.start.y > test.y && l.end.y <= test.y;
const crossHorizontal = (test: Point = theOrigin) => (l: LineSegment) =>
  crossUp(test)(l) || crossDown(test)(l);

// By setting z coordinate to 0, you can think of vectors in 2-space like 3d vectors and take their cross product.
// The cross product of two vectors originating from the origin is positive if their difference is oriented so that the origin is on the segment's left side,
// and negative if the origin is on the right side.
const isLeft = (p1: Point, p2: Point, test: Point = theOrigin): number =>
  (p1.x - p2.x) * (p2.y - test.y) - (test.x - p1.x) * (p2.y - p1.y);

// The algorithm calculates the so-called "winding number" of the polygon around the test point. It goes like this:
// * Move the polygon coordinates so that the test point is the origin
// * Examine each edge segment. If it does not cross the x-axis on the positive x side, the winding number is unchanged.
// * increment or decrement the winding number based on the oriented side of the segments that cross the x-axis that the origin is on
const windingNumberFor = (polygon: Point[], shiftCoord: Point) => {
  const shiftedPolygon = polygon.map(pointDifference(shiftCoord));
  const vertexCount = shiftedPolygon.length;
  const segments: LineSegment[] = shiftedPolygon.map((p, i, arr) => ({
    start: arr[i],
    end: arr[(i + 1) % vertexCount],
  }));

  const crosses = segments.filter(crossHorizontal());

  // figure a change to a winding number from a segment that crosses the axis
  const windingContribution = (l: LineSegment) => {
    if (crossUp()(l)) {
      return isLeft(l.start, l.end) > 0 ? 1 : 0; // Segments going upward with the origin on the left add one to winding number
    }
    if (crossDown()(l)) {
      return isLeft(l.start, l.end) < 0 ? -1 : 0; // Segments going downward with the origin on the right subtract one from winding number
    }
  };
  const windingNumber = crosses.reduce(
    (windingSum, l) => windingSum + windingContribution(l),
    0
  );

  // console.log(`the winding number for polygon ${JSON.stringify(polygon)} around point ${JSON.stringify(shiftCoord)} is ${windingNumber}`);
  // console.log(`Shifted coords: ${JSON.stringify(segments)}`);
  return windingNumber;
};

export const pointInsidePolygon = (testPoint: Point) => (polygon: Point[]) =>
  windingNumberFor(polygon, testPoint) !== 0;

export const pointInsideAnyPolygon = (testPoint: Point) => (polygons: Point[][]) =>
  polygons.reduce(
    (inside, p) => inside || pointInsidePolygon(testPoint)(p),
    false
  );
