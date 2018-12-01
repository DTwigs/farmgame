export const GRID_RADIUS = 6;

export const getViewPortGrid = function(map, position) {
  //get map subset
  var minRow = position[1] - GRID_RADIUS,
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
};
