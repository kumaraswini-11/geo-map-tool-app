export const formatLength = (length: number) => {
  return length > 1000 ? `${(length / 1000).toFixed(2)} km` : `${length.toFixed(2)} m`;
};

export const formatArea = (area: number) => {
  return area > 10000 ? `${(area / 1000000).toFixed(2)} km²` : `${area.toFixed(2)} m²`;
};

export const formatAreaCircle = (radius: number) => {
  const area = Math.PI * Math.pow(radius, 2);
  return area > 1 ? `${area.toFixed(2)} km²` : `${(area * 1000000).toFixed(2)} m²`;
};

export const formatPerimeter = (radius: number) => {
  const perimeter = 2 * Math.PI * radius;
  return perimeter > 1 ? `${perimeter.toFixed(2)} km` : `${(perimeter * 1000).toFixed(2)} m`;
};
