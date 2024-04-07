# MeasureMap App

## Overview

The MeasureMap app is a web-based tool designed for geospatial measurement and visualization. It allows users to draw and measure various geometrical shapes on an interactive map interface.

The MeasureMap app is deployed and can be accessed at [geo-map-tool-app.vercel.app](https://geo-map-tool-app.vercel.app/).

## Features

- Draw and measure point, line, polygon, and circle geometries
- Dynamically fetch location details based on drawn points
- Interactive map interface with zoom and pan functionalities

## Technologies Used

- **Next.js**: Framework for building React applications with server-side rendering and TypeScript support
- **OpenLayers**: Used for rendering interactive maps and handling geometries
- **React**: Frontend library for building the user interface
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Axios**: HTTP client for making API requests
- **TypeScript**: Superset of JavaScript providing static typing

## Setup

1. Clone the repository: `git clone https://github.com/your-username/measure-map.git`
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`
4. Open your browser and navigate to `http://localhost:3000`

## Usage

1. Select a geometry type (Point, LineString, Polygon, Circle) from the dropdown menu.
2. Click on the map to draw the selected geometry.
3. Measurements will be displayed dynamically on the map.

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request for any improvements or bug fixes.

## Next Plans

- Add additional features such as:
  - Support for custom map layers
  - Exporting measurements as files
  - Improved styling and user interface enhancements

## License

This project is licensed under the [MIT License](LICENSE).
