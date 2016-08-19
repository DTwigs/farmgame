import React, { PropTypes } from 'react'

const Tile = ({ onClick, name, style, className }) => (
  <div
    style={style}
    className={className}
    onClick={onClick}>
    {name}
  </div>
)

Tile.propTypes = {
  onClick: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  style: PropTypes.object.isRequired,
  className: PropTypes.string.isRequired
}

export default Tile