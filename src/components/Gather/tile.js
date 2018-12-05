import React, { PropTypes } from 'react'
import classes from './grid.scss'

const Tile = ({ onClick, name, style, className }) => (
  <div
    style={style}
    className={className + " " + classes['resource-tile']}
    onClick={onClick}>
  </div>
)

Tile.propTypes = {
  onClick: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  style: PropTypes.object.isRequired,
  className: PropTypes.string.isRequired
}

export default Tile