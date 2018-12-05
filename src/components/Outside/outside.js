import React from 'react';
import anime from 'animejs';
import { outsideMapData, mapTileTypes } from '../../routes/Outside/modules/outside-map-data.js';
import {
    getViewPortGrid,
    collisionCheck,
    MAP_TRIGGERS
  } from '../../routes/Outside/modules/outside-helpers.js';
import { Link } from 'react-router'
import { throttled } from '../../helpers/app-helpers.js';
import classes from './outside.scss';
import { connect } from 'react-redux';
import { updatePosition } from '../../routes/Outside/actions.js';

export class Outside extends React.Component {
  constructor (props) {
    super(props);
    this.handleKeyPressThrottled = throttled(200, this.handleKeyPress.bind(this));
  }

  componentDidMount () {
    if (_.isEmpty(this.props.mapPosition)) {
      this.props.updatePosition(this.findBasePosition());
    }
  }

  findBasePosition() {
    var position = [0, 0];
    outsideMapData.forEach((row, y) => {
      var x = row.indexOf("b");
      if (x >= 0) {
        position = [x, y];
      }
    });

    return position;
  }

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
  }

  handleKeyPress (e) {
    let oldPosition = this.props.mapPosition,
      newPosition = oldPosition,
      direction = "down";

    console.log('update pos');
    switch (e.keyCode) {
      case 37: // left
        newPosition = [oldPosition[0] - 1, oldPosition[1]];
        direction = "left";
        break;
      case 38: // up
        newPosition = [oldPosition[0], oldPosition[1] - 1];
        direction = "up";
        break;
      case 39: // right
        newPosition = [oldPosition[0] + 1, oldPosition[1]];
        direction = "right";
        break;
      case 40: // down
        direction = "down;"
        newPosition = [oldPosition[0], oldPosition[1] + 1];
        break;
    }


    if (newPosition !== oldPosition) {
      this.props.updatePosition(newPosition, direction);
      anime({
        targets: "." + classes["the-dude"],
        translateY: ["-6px", 0],
        scale: [1.02, 1],
        duration: 1600,
        direction: 'alternate',
        loop: false
      });
    }
  }


  getUIButtons () {
    let buttons = [],
      canFish = this.props.ui.canFish,
      canGather = this.props.ui.canGather,
      canCamp = this.props.ui.canCamp;

    if (canGather) {
      buttons.push(<Link key="gather-button" className={classes['ui-action-button']} to="/gather">Gather</Link>);
    }

    if (canFish) {
      buttons.push(<button key="fish-button" className={classes['ui-action-button']}>Fish</button>);
    }

    if (canCamp) {
      buttons.push(<Link key="camp-button" className={classes['ui-action-button']} to="/camp">Camp</Link>);
    }

    return (
      <div className={classes["outside-ui-buttons"]}>
        { buttons }
      </div>
    );
  }

  render () {
    let playerDirection = this.props.playerDirection;
    console.log('rerender');
    console.log(this.handleKeyPressThrottled);
    return (
      <div className={classes["outside-container"]}>
        <div onKeyDown={this.handleKeyPressThrottled} tabIndex="0">
          { this.buildMapAroundPosition() }
          <div className={[classes["the-dude"], classes[`the-dude-${playerDirection}`]].join(' ')}>
          </div>
          { this.getUIButtons() }
        </div>
      </div>
    );
  }
};

const mapDispatchToProps = {
  updatePosition
};

const mapStateToProps = (state) => ({
  mapPosition: state.outside.mapPosition.coordinates,
  playerDirection: state.outside.mapPosition.direction,
  ui: state.outside.ui,
});

export default connect(mapStateToProps, mapDispatchToProps)(Outside);