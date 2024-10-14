# Autodesk Forma

A web application for visualizing GeoJSON data on a map and performing geometric operations. You can view the app deployed on Netlify here: [Autodesk Forma](https://autodesk-forma.netlify.app/).

## Usage

- The first solution is selected by default, displaying polygons from the GeoJSON data on the map.
- Click on a polygon to select it; selected polygons will be highlighted in orange.
- Once two or more polygons are selected, you can perform union or intersection operations.
- You can view the area of selected polygons in the statistics section.
- Hover over polygons to identify them by their index.

## Specifications

- This project is built with React, Vite, and TypeScript.
- The Leaflet library is used to display GeoJSON data on the map.
- The Turf.js library is used for performing union and intersection operations on polygons.
- Styled components are used for styling the interface.

## Code Structure

- The app's functionality is divided into separate components for modularity and clarity.
- GeoJSON data is read in the `App` component and passed down to child components for rendering and interaction.
- Utility functions, such as those for polygon operations, are stored in a `utility` file for reusability.
- The statistics section dynamically updates based on user interactions and operations performed on polygons.

## Challenges

- This was my first time working with GeoJSON data, which required learning new concepts.
- Handling cases where geometric operations return multiple polygons was challenging.
- Optimizing map re-renders to improve app performance was an important focus during development.
