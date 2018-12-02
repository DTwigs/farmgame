import React from 'react';
import { outsideMapData, mapTileTypes } from '../../routes/Outside/modules/outside-map-data.js';
import {
    getViewPortGrid,
    collisionCheck,
    MAP_TRIGGERS
  } from '../../routes/Outside/modules/outside-helpers.js';
import { Link } from 'react-router'
import classes from './outside.scss';
import { connect } from 'react-redux';
import { updatePosition } from '../../routes/Outside/actions.js';
var Outside;

Outside = React.createClass({
  componentDidMount () {
    if (_.isEmpty(this.props.mapPosition)) {
      this.props.updatePosition(this.findBasePosition());
    }
  },

  findBasePosition() {
    var position = [0, 0];
    outsideMapData.forEach((row, y) => {
      var x = row.indexOf("b");
      if (x >= 0) {
        position = [x, y];
      }
    });

    return position;
  },

  buildMapAroundPosition () {
    let position = this.props.mapPosition,
      truncatedMap = [];

    if (!position) { return; }

    truncatedMap = getViewPortGrid(outsideMapData, position);

    //build the map
    return truncatedMap.map((row, ri) => {
      let rowItems = row.map((dataTile, ci) => {
        return (<span key={`maptile-${ri}-${ci}`} className={`${classes["map-tile"]} ${classes[mapTileTypes[dataTile]]}`}></span>);
      });

      return (
        <div key={`row-${ri}`} className={classes["outside-row"]}>
          { rowItems }
        </div>
      );
    });
  },

  handleKeyPress (e) {
    let oldPosition = this.props.mapPosition,
      newPosition = oldPosition;

    switch (e.keyCode) {
      case 37: // left
        newPosition = [oldPosition[0] - 1, oldPosition[1]];
        break;
      case 38: // up
        newPosition = [oldPosition[0], oldPosition[1] - 1];
        break;
      case 39: // right
        newPosition = [oldPosition[0] + 1, oldPosition[1]];
        break;
      case 40: // down
        newPosition = [oldPosition[0], oldPosition[1] + 1];
        break;
    }

    this.props.updatePosition(newPosition);
  },


  getUIButtons () {
    let buttons = [],
      canFish = this.props.ui.canFish,
      canGather = this.props.ui.canGather;

    if (canGather) {
      buttons.push(<Link className={classes['ui-action-button']} to="/gather">Gather</Link>);
    }

    if (canFish) {
      buttons.push(<button className={classes['ui-action-button']}>Fish</button>);
    }

    return (
      <div className={classes["outside-ui-buttons"]}>
        { buttons }
      </div>
    );
  },

  render () {
    return (
      <div className={classes["outside-container"]}>
        <div onKeyDown={this.handleKeyPress} tabIndex="0">
          { this.buildMapAroundPosition() }
          <div className={classes["the-dude"]}></div>
          { this.getUIButtons() }
        </div>
      </div>
    );
  }
});

const mapDispatchToProps = {
  updatePosition
};

const mapStateToProps = (state) => ({
  mapPosition: state.outside.mapPosition,
  ui: state.outside.ui,
});

export default connect(mapStateToProps, mapDispatchToProps)(Outside);