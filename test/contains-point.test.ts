import { Point, pointInsidePolygon } from "../contains-point";

test("contains point in convex polygon", () => {
  const polygon: Point[] = [
    { x: 1, y: 1 },
    { x: 1, y: -1 },
    { x: -1, y: -1 },
    { x: -1, y: 1 },
  ];

  const testPoint: Point = { x: 0.75, y: -0.5 };

  const result = pointInsidePolygon(testPoint)(polygon);

  console.log(result);
  expect(result).toEqual(true);
});
test("does not contain point in convex polygon", () => {
  const polygon: Point[] = [
    { x: 1, y: 1 },
    { x: 1, y: -1 },
    { x: -1, y: -1 },
    { x: -1, y: 1 },
  ];

  const testPoint: Point = { x: 2.75, y: -0.5 };

  const result = pointInsidePolygon(testPoint)(polygon);
  console.log(result);

  expect(result).toEqual(false);
});

test("contains point in really weird shaped polygon", () => {
  const polygon: Point[] = [
    { x: -6, y: 6 },
    { x: 5, y: 6 },
    { x: 5, y: 3 },
    { x: 1, y: 1 },
    { x: 3, y: -4 },
    { x: -1, y: 1 },
    { x: -4, y: -3 },
    { x: -7, y: -2 },
    { x: -4, y: 3 },
  ];

  const testPoint: Point = { x: -3, y: 5 };

  const result = pointInsidePolygon(testPoint)(polygon);

  console.log(result);
  expect(result).toEqual(true);
});
test("does not contain point in really weird shaped polygon", () => {
  const polygon: Point[] = [
    { x: -6, y: 6 },
    { x: 5, y: 6 },
    { x: 5, y: 3 },
    { x: 1, y: 1 },
    { x: 3, y: -4 },
    { x: -1, y: 1 },
    { x: -4, y: -3 },
    { x: -7, y: -2 },
    { x: -4, y: 3 },
  ];

  const testPoint: Point = { x: -10, y: 0 };

  const result = pointInsidePolygon(testPoint)(polygon);
  console.log(result);

  expect(result).toEqual(false);
});
