// Utility function to format length in meters or kilometers
export const formatLength = (length: number) => {
  return length > 1000 ? `${(length / 1000).toFixed(2)} km` : `${length.toFixed(2)} m`;
};

// Utility function to format area in square meters or square kilometers
export const formatArea = (area: number) => {
  return area > 10000 ? `${(area / 1000000).toFixed(2)} km²` : `${area.toFixed(2)} m²`;
};

// Utility function to format area of circle in square meters or square kilometers
export const formatAreaCircle = (radius: number) => {
  const area = Math.PI * Math.pow(radius, 2);
  return area > 1 ? `${area.toFixed(2)} km²` : `${(area * 1000000).toFixed(2)} m²`;
};

// Utility function to format perimeter of circle in meters or kilometers
export const formatPerimeter = (radius: number) => {
  const perimeter = 2 * Math.PI * radius;
  return perimeter > 1 ? `${perimeter.toFixed(2)} km` : `${(perimeter * 1000).toFixed(2)} m`;
};
