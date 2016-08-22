export const GRID_SIZE = 5; // Grid height and width

export const TILE_SIZE = 64;

export const updateTilePosition = (tile, c, r) => {
  tile.column = c;
  tile.row = r;
  tile.x = c * TILE_SIZE;
  tile.y = r * TILE_SIZE;
  tile.id = `${r}-${c}`;
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

export const getAllSolvedMatches = (tiles) => {
  let solvedTiles = [];

  // All matches in each column
  _.times(GRID_SIZE, (i) => {
    let column = _.filter(tiles, (tile) => tile.column === i);
    column = _.sortBy(column, (tile) => tile.row);
    // console.log(`index =  ${i} - column:`, _.map(column, (t) => t.type));
    solvedTiles = solvedTiles.concat(findGroupedTiles(column));
    // console.log('solved: ', _.map(solvedTiles, (t) => t.type));
  });

  // All matches in each row
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
    if (!previousTileType || tile.resource.type === previousTileType) {
      temporaryMatches = temporaryMatches.concat(tile);
      consecutiveCounter += 1;
    } else {
      temporaryMatches = [tile];
      consecutiveCounter = 1;
    }

    if (consecutiveCounter >= 3) {
      realMatches = temporaryMatches;
    }
    previousTileType = tile.resource.type;
  });

  return realMatches;
}



