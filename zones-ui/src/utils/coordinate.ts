import { Point } from '../types/zone';

export function roundCoordinates(coordinates: Point[]): Point[] {
  return coordinates.map(([x, y]) => [
    parseFloat(x.toFixed(2)),
    parseFloat(y.toFixed(2)),
  ]);
}

export function getCentroid(points: Point[]): Point {
  const centroid = points.reduce(
    (acc, [x, y]) => {
      acc[0] += x;
      acc[1] += y;
      return acc;
    },
    [0, 0],
  );

  return [centroid[0] / points.length, centroid[1] / points.length] as Point;
}

export function sortPoints(points: Point[]): Point[] {
  const centroid = getCentroid(points);
  return points.sort((a, b) => {
    const angleA = Math.atan2(a[1] - centroid[1], a[0] - centroid[0]);
    const angleB = Math.atan2(b[1] - centroid[1], b[0] - centroid[0]);
    return angleA - angleB;
  });
}

export function getSvgCoordinates(e: React.MouseEvent<SVGSVGElement>): {
  x: number;
  y: number;
} {
  const svg = (e.target as Element).closest('svg') as SVGSVGElement;
  const point = svg.createSVGPoint();
  point.x = e.clientX;
  point.y = e.clientY;
  const ctm = svg.getScreenCTM()!.inverse();
  const transformedPoint = point.matrixTransform(ctm);
  return { x: transformedPoint.x, y: transformedPoint.y };
}
