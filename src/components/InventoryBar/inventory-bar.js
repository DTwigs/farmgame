import React from 'react';
import ReactDOM from 'react-dom';
import classes from './inventory-bar.scss';
import { connect } from 'react-redux';
import anime from 'animejs';
import AnimatedNumber from 'react-animated-number';

export class InventoryBar extends React.Component {
  render () {
    return (
      <div className={classes["inventory-bar"]}>
        <ul className={classes["inventory-bar_item-list"]}>
          <li className={classes["inventory-bar_item"]}></li>
          <li className={classes["inventory-bar_item"]}></li>
          <li className={classes["inventory-bar_item"]}></li>
          <li className={classes["inventory-bar_item"]}></li>
          <li className={classes["inventory-bar_item"]}></li>
          <li className={classes["inventory-bar_item"]}></li>
        </ul>
      </div>
    );
  }
}

InventoryBar.propTypes = {
  resourceTypes: React.PropTypes.array,
};

const mapStateToProps = (state) => ({
  resourceTypes: state.gather.resourceTypes,
});

export default InventoryBar;
