import React from 'react';
import classes from './grid.scss';
import Tile from './tile.js';
import { connect } from 'react-redux';
import { populateResourceTiles, selectGridTile, unselectGridTile, swapAndMatch } from '../../routes/Gather/actions.js';
import { tilesAreNeighbors, getAllSolvedMatches } from '../../routes/Gather/modules/grid-helpers.js';

export class Grid extends React.Component {
  constructor (props) {
    super(props);
    this.props.populateResourceTiles();
    this.getGridItems = this.getGridItems.bind(this);
    this.selectTile = this.selectTile.bind(this);
    this.selectedTile = null;
    this.compareTile = null;
  }

  handleTileClick (item) {
    this.selectTile(item);

    if (!(this.selectedTile && this.compareTile)) {
      return;
    }

    if (tilesAreNeighbors(this.selectedTile, this.compareTile)) {
      // swap tiles
      this.props.swapAndMatch(this.selectedTile, this.compareTile);
    } else {
      this.selectedTile = null;
      this.compareTile = null;
    }
  }

  selectTile (item) {
    if (!this.selectedTile || this.selectedTile && this.compareTile) {
      this.props.selectGridTile(item);
      this.selectedTile = item;
      this.compareTile = null;
    } else if (!this.compareTile) {
      this.compareTile = item;
      this.props.unselectGridTile(this.selectedTile);
    }
  }

  getGridItems () {
    var i = 0;
    return _.map(this.props.grid, (tile) => {
      if (!tile) { return; }

      i += 1;
      let className = `${classes['tile']} ${classes[tile.resource.type]}`;
      className += tile.selected ? ` ${classes.selected}` : "";
      className += tile.pooled ? ` ${classes.pooled}` : "";

      let style = {
        'transform': `translate3d(${tile.x}px, ${tile.y}px, 0px)`
      };

      return (
        <Tile
          style={style}
          className={className}
          key={i}
          onClick={this.handleTileClick.bind(this, tile)}
          name={tile.resource.name}>
        </Tile>
      );
    });
  }

  render () {
    return (
      <div>
        I am the grid
        <br />
        <div className={classes['tile-container']}>
          {this.getGridItems()}
        </div>
      </div>
    );
  }
}

Grid.propTypes = {
  grid: React.PropTypes.array.isRequired,
  populateResourceTiles: React.PropTypes.func.isRequired,
  selectGridTile: React.PropTypes.func.isRequired,
  unselectGridTile: React.PropTypes.func.isRequired,
  swapAndMatch: React.PropTypes.func.isRequired
};

const mapDispatchToProps = {
  populateResourceTiles,
  selectGridTile,
  unselectGridTile,
  swapAndMatch
};

const mapStateToProps = (state) => ({
  grid: state.gather.grid
});

export default connect(mapStateToProps, mapDispatchToProps)(Grid);