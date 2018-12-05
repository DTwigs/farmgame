import { outsideMapData, mapTileTypes } from './outside-map-data.js';

export const GRID_RADIUS = 6;

export const MAP_TRIGGERS = {
  stop: 0,
  gathering: 1,
  fishing: 2,
  camping: 3,
}

export const getViewPortGrid = function(map, position) {
  //get map subset
  let minRow = position[1] - GRID_RADIUS,
    maxRow = position[1] + GRID_RADIUS,
    minCol = position[0] - GRID_RADIUS,
    maxCol = position[0] + GRID_RADIUS,
    truncatedMap = [];

  for (var y = minRow; y <= maxRow; y++) {
    var row = []
    for (var x = minCol; x <= maxCol; x++) {
      row[(x + GRID_RADIUS - position[0])] = map[y] ? map[y][x] ? map[y][x] : "0" : "0";
    }
    truncatedMap[(y + GRID_RADIUS - position[1])] = row;
  }

  return truncatedMap;
}

export const collisionCheck = function(position) {
  let nextTile = outsideMapData[position[1]][position[0]],
    nextTileType = mapTileTypes[nextTile];


  switch (nextTileType) {
    case "mountain":
      return MAP_TRIGGERS.stop;
    case "water":
      return MAP_TRIGGERS.fishing;
    case "forest":
      return MAP_TRIGGERS.gathering;
    case "base":
      return MAP_TRIGGERS.camping;
    default:
      return true;
  };

}
