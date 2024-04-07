import { Style, Text, Fill, RegularShape, Circle as CircleStyle, Stroke } from 'ol/style';
import { Point } from 'ol/geom';

// Function to define base style for features
export const baseStyle = () => {
    return new Style({
        fill: new Fill({
            color: "rgba(255, 0, 0, 0.1)",
        }),
        stroke: new Stroke({
            color: "rgba(255, 0, 0, 0.5)",
            lineDash: [10, 10],
            width: 2,
        }),
        image: new CircleStyle({
            radius: 5,
            stroke: new Stroke({
                color: "rgba(0, 0, 0, 0.7)",
            }),
            fill: new Fill({
                color: "rgba(255, 255, 255, 0.2)",
            }),
        }),
    });
};

// Function to define style for labeled features
export const labelStyle = (point: Point, label: string) => {
    const textStyle = new Text({
        font: "14px Calibri,sans-serif",
        fill: new Fill({
            color: "rgba(255, 255, 255, 1)",
        }),
        backgroundFill: new Fill({
            color: "rgba(0, 0, 0, 0.7)",
        }),
        padding: [3, 3, 3, 3],
        textBaseline: "bottom",
        offsetY: -15,
        text: label,
    });

    return new Style({
        text: textStyle,
        geometry: point,
        image: new RegularShape({
            radius: 8,
            points: 3,
            angle: Math.PI,
            displacement: [0, 10],
            fill: new Fill({
                color: "rgba(0, 0, 0, 0.7)",
            }),
        }),
    });
};

// Style for segments (not currently used in the main component)
export const segmentStyle = new Style({
  text: new Text({
    font: "14px Calibri,sans-serif",
    fill: new Fill({
      color: "rgba(255, 255, 255, 1)",
    }),
    backgroundFill: new Fill({
      color: "rgba(0, 0, 0, 0.7)",
    }),
    padding: [3, 3, 3, 3],
    textBaseline: "bottom",
    offsetY: -15,
  }),
});
