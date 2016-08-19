export const GRID_SIZE = 5; // Grid height and width

export const RESOURCE_TYPES = [{
  name: 'Wood',
  type: 'WOOD',
  quantity: 1
},{
  name: 'Berries',
  type: 'BERRIES',
  quantity: 1
}, {
  name: 'Water',
  type: 'WATER',
  quantity: 1
}, {
  name: 'Stone',
  type: 'STONE',
  quantity: 1
}];
export const TILE_SIZE = 64;

export const buildResourceArray = () => {
  let grid = [];
  let index = 0;
  _.times(GRID_SIZE, (c) => {
    _.times(GRID_SIZE, (r) => {
      let resourceIndex = Math.floor(Math.random() * RESOURCE_TYPES.length); //randomly generater resource
      let tile = _.merge({
        selected: false
      }, RESOURCE_TYPES[resourceIndex]);
      tile = updateTilePosition(tile, c, r);
      grid[index] = tile;
      index++;
    });
  });
  return grid;
}

export const updateTilePosition = (tile, c, r) => {
  tile.column = c;
  tile.row = r;
  tile.x = c * TILE_SIZE;
  tile.y = r * TILE_SIZE;
  return tile;
}

export const tilesAreNeighbors = (tile1, tile2) => {
  if (tile1 === tile2) {
    return false;
  }

  const rowNeighborValues = [tile1.row - 1, tile1.row, tile1.row + 1];
  const columnNeighborValues = [tile1.column - 1, tile1.column, tile1.column + 1];

  if (tile1.column === tile2.column && _.includes(rowNeighborValues, tile2.row)) {
    return true;
  } else if (tile1.row === tile2.row && _.includes(columnNeighborValues, tile2.column)) {
    return true;
  }
  return false;
}

export const findTileIndex = (tiles, c, r) => {
  return _.findIndex(tiles, (tile) => {
    return tile.column === c && tile.row === r;
  });
}

export const getAllSolvedMatches = (tiles) => {
  let solvedTiles = [];
  _.times(GRID_SIZE, (i) => {
    let column = _.filter(tiles, (tile) => tile.column === i);
    column = _.sortBy(column, (tile) => tile.row);
    // console.log(`index =  ${i} - column:`, _.map(column, (t) => t.type));
    solvedTiles = solvedTiles.concat(findGroupedTiles(column));
    // console.log('solved: ', _.map(solvedTiles, (t) => t.type));
  });

  _.times(GRID_SIZE, (i) => {
    let row = _.filter(tiles, (tile) => tile.row === i)
    row = _.sortBy(row, (tile) => tile.column);
    solvedTiles = solvedTiles.concat(findGroupedTiles(row));
  });

  return _.uniq(solvedTiles);
}

export const findGroupedTiles = (tiles) => {
  let previousTileType = null,
    consecutiveCounter = 0,
    temporaryMatches = [],
    realMatches = [];

  _.forEach(tiles, (tile) => {
    if (!previousTileType || tile.type === previousTileType) {
      temporaryMatches = temporaryMatches.concat(tile);
      consecutiveCounter += 1;
    } else {
      temporaryMatches = [tile];
      consecutiveCounter = 1;
    }

    if (consecutiveCounter >= 3) {
      realMatches = temporaryMatches;
    }
    previousTileType = tile.type;
  });

  return realMatches;
}



