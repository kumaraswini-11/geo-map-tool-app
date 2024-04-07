"use client";
import React, { useEffect, useState, useRef } from "react";
import { Map, View } from "ol";
import { fromLonLat } from "ol/proj";
import {
  Circle as CircleStyle,
  Fill,
  Stroke,
  Style,
  Text,
  RegularShape,
} from "ol/style";
import {
  defaults as defaultControls,
  FullScreen,
  Attribution,
} from "ol/control";
import {
  defaults as defaultInteractions,
  DragRotateAndZoom,
  Draw,
  Modify,
} from "ol/interaction";
import { Geometry, LineString, Point, Polygon, Circle } from "ol/geom";
import { OSM, Vector as VectorSource } from "ol/source";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import { getWidth, getHeight, getCenter } from "ol/extent.js";
import {baseStyle, labelStyle} from "../utils/style.util"
import {formatLength,formatArea,formatPerimeter,formatAreaCircle} from "../utils/format.util"
import { fetchLocationDetails } from "@/utils/geolocation.util";

const MeasureMap: React.FC = () => {
  const mapRef = useRef<Map | null>(null);
  const sourceRef = useRef<VectorSource>(new VectorSource());
  const drawInteractionRef = useRef<Draw | null>(null);
  const modifyInteractionRef = useRef<Modify | null>(null);

  const indiaCoordinates = fromLonLat([78.9629, 20.5937]);

  useEffect(() => {
    const rasterLayer = new TileLayer({
      source: new OSM(),
    });

    const vectorLayer = new VectorLayer({
      source: sourceRef.current,
      style: styleFunction,
    });

    const map = new Map({
      controls: defaultControls({ attribution: false }).extend([
        new FullScreen(),
        new Attribution({
          collapsible: true,
        }),
      ]),
      interactions: defaultInteractions().extend([new DragRotateAndZoom()]),
      layers: [rasterLayer, vectorLayer],
      target: "map",
      view: new View({
        center: indiaCoordinates ?? [-11000000, 4600000],
        zoom: 2,
        constrainResolution: true,
        rotation: Math.PI / 8,
      }),
    });

    mapRef.current = map;

    const modifyInteraction = new Modify({ source: sourceRef.current });
    map.addInteraction(modifyInteraction);
    modifyInteractionRef.current = modifyInteraction;

    return () => {
      map.removeInteraction(modifyInteraction);
      if (drawInteractionRef.current) {
        map.removeInteraction(drawInteractionRef.current);
      }
      map.setTarget(undefined);
    };
  }, []);

  const addDrawInteraction = (drawType: string) => {
    const map = mapRef.current;
    const modifyInteraction = modifyInteractionRef.current;

    if (!map) return;

    if (drawInteractionRef.current) {
      map.removeInteraction(drawInteractionRef.current);
    }

    let newDrawInteraction: Draw | null = null;
    if (drawType !== "None") {
      newDrawInteraction = new Draw({
        source: sourceRef.current,
        type: drawType as any,
        style: styleFunction,
      });

      newDrawInteraction.on("drawstart", () => {
        sourceRef.current.clear();
        if (modifyInteraction) {
          modifyInteraction.setActive(false);
        }
      });

      newDrawInteraction.on("drawend", () => {
        if (modifyInteraction) {
          modifyInteraction.setActive(true);
        }
      });

      map.addInteraction(newDrawInteraction);
    }

    drawInteractionRef.current = newDrawInteraction;
    if (modifyInteraction) {
      modifyInteraction.setActive(drawType === "None");
    }
  };
 
  // const fetchLocationAndAddLabel = async (point: Point, label: string) => {
  //   const coordinates = point.getCoordinates();
  //   try {
  //     const { location } = await fetchLocationDetails(coordinates[1], coordinates[0]);
  //     return `${label}\nLocation :: ${location}`;
  //   } catch (error) {
  //     console.error("Error fetching location details:", error);
  //     return `${label}\nLocation :: Unknown`;
  //   }
  // };

  const styleFunction =  (feature: any) => {
    const styles: Style[] = [];
    const geometry: Geometry = feature.getGeometry();
    const type: string = geometry.getType();
    let label: string | undefined, point: Point | undefined, line: LineString | undefined;

    if (type === "Polygon") {
        point = new Point((geometry as Polygon).getInteriorPoint().getCoordinates());
        label = `Area :: ${formatArea((geometry as Polygon).getArea())}`;
        line = new LineString((geometry as Polygon).getCoordinates()[0]);
    } else if (type === "LineString") {
        point = new Point((geometry as LineString).getLastCoordinate());
        label = `Distance :: ${formatLength((geometry as LineString).getLength())}`;
        line = geometry as LineString;
    } else if (type === "Point") {
        point = geometry as Point;
        const coordinates = point.getCoordinates();
        label = `Coordinates :: [${coordinates.join(", ")}]`;
        // Call the asynchronous function and handle the returned label
        // fetchLocationAndAddLabel(point, label).then((x) => label = x)
    } else if (type === "Circle") {
      const circle = geometry as Circle;
      const radiusKm = circle.getRadius() / 1000; // Convert radius to kilometers
      point = new Point(circle.getCenter());
      label = `Radius :: ${radiusKm.toFixed(2)} km\nArea :: ${formatAreaCircle(radiusKm)}\nPerimeter :: ${formatPerimeter(radiusKm)}`;
  
    }

    if (label && point) {
        styles.push(labelStyle(point, label));
    }

    styles.push(baseStyle());

    return styles;
};

  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedType(value);
    addDrawInteraction(value);
  };

  const [selectedType, setSelectedType] = useState<string>("None");

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div id="map" className="w-full h-[700px] px-2 py-1.5 shadow-lg bg-gradient-to-b from-blue-100 to-blue-500 relative"></div>
      <form className="absolute bottom-12 left-8 z-10 bg-white bg-opacity-90 p-2 rounded-md flex items-center">
        <label htmlFor="type" className="text-sm font-semibold text-gray-700 mr-2">
          Geometry Type:
        </label>
        <select
          id="type"
          className="text-sm p-2 rounded-md cursor-pointer border border-gray-300 bg-gray-100 focus:outline-none"
          onChange={handleTypeChange}
          value={selectedType}
        >
          {["None", "Point", "LineString", "Polygon", "Circle"].map((type) => (
            <option key={type} value={type} className="text-sm">
              {type}
            </option>
          ))}
        </select>
      </form>
    </div>
  );
};

export default MeasureMap;
