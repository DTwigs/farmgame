import React from 'react'
import classes from './display-item.scss'

export default class DisplayItem extends React.Component {
  render () {
    return (
      <div className={classes['display-item_item-container']}>
        <span className={`${classes["display-item_item-icon"]} ${classes[this.props.type]}`}></span>
        <div className={classes['display-item_item-name']}>
          {this.props.name}
        </div>
        <span className={classes['display-item_item-quantity']}>
          {this.props.quantity}
        </span>
      </div>
    );
  }
}

DisplayItem.propTypes = {
  name: React.PropTypes.string.isRequired,
  quantity: React.PropTypes.oneOfType([React.PropTypes.component, React.PropTypes.number]),
  type: React.PropTypes.string.isRequired,
}
