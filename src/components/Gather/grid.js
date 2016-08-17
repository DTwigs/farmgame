import React from 'react';
import classes from './grid.scss';
import { connect } from 'react-redux';
import { populateGrid, selectGridTile, unselectGridTile, swapGridTiles } from '../../routes/Gather/actions.js';
import { tilesAreNeighbors } from '../../routes/Gather/modules/grid-helpers.js';

export class Grid extends React.Component {
  constructor (props) {
    super(props);
    this.props.populateGrid();
    this.getGridItems = this.getGridItems.bind(this);
    this.selectedTile = null;
    this.compareTile = null;
  }

  handleItemClick (item) {
    if (!this.selectedTile || this.selectedTile && this.compareTile) {
      this.selectedTile = item;
      this.compareTile = null;
      this.props.selectGridTile(item);
    } else if (!this.compareTile) {
      this.compareTile = item;
      this.props.unselectGridTile(this.selectedTile);
    }

    console.log('selected: ', this.selectedTile);
    console.log('compare: ', this.compareTile);

    if (!(this.selectedTile && this.compareTile)) {
      return;
    }

    if (tilesAreNeighbors(this.selectedTile, this.compareTile)) {
      // swap tiles
      this.props.swapGridTiles(this.selectedTile, this.compareTile);
    } else {
      this.selectedTile = null;
      this.compareTile = null;
    }
  }



  getGridItems () {
    var i = 0;
    return _.map(this.props.grid, (row) => {
      return _.map(row, (item) => {
        i += 1;
        let className = `${classes['tile']} ${classes[item.type]}`;
        let style = {
          'transform': `translate3d(${item.x}px, ${item.y}px, 0px)`
        };
        let click = this.handleItemClick.bind(this, item);

        if (item.selected) {
          className += ` ${classes.selected}`;
        }

        return (
          <div
            style={style}
            className={className}
            key={i}
            onClick={click}>
            {item.name}
          </div>
        );
      });
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
  populateGrid: React.PropTypes.func.isRequired,
  selectGridTile: React.PropTypes.func.isRequired,
  unselectGridTile: React.PropTypes.func.isRequired,
  swapGridTiles: React.PropTypes.func.isRequired
};

const mapDispatchToProps = {
  populateGrid,
  selectGridTile,
  unselectGridTile,
  swapGridTiles
};

const mapStateToProps = (state) => ({
  grid: state.gather.grid
});

export default connect(mapStateToProps, mapDispatchToProps)(Grid);