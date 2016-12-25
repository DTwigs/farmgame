import React from 'react';
import ReactDOM from 'react-dom';
import classes from './resource-bar.scss';
import { connect } from 'react-redux';

export class ResourceBar extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      glow: false
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.resourceTypes !== this.props.resourceTypes) {
      ReactDOM.findDOMNode(this).classList.add(classes['resource-bar--glow'])
      setTimeout(() => {
        ReactDOM.findDOMNode(this).classList.remove(classes['resource-bar--glow'])
      }, 200)
    }
  }

  getResoureValues() {
    return _.map(this.props.resourceTypes, (resource) => {
      return (
        <li className={classes['resource-bar_item']} key={resource.type}>
          <span className={classes['resource-bar_item-name']}>
            {resource.type}:
          </span>
          <b>{resource.quantity}</b>
        </li>
      );
    });
  }

  render () {
    let listClasses = classes['resource-bar']
    if (this.state.glow) {
      listClasses += ` ${classes['resource-bar--glow']}`
    }

    return (
      <ul className={listClasses}>
        {this.getResoureValues()}
      </ul>
    );
  }
}

ResourceBar.propTypes = {
  resourceTypes: React.PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  resourceTypes: state.gather.resourceTypes,
});

export default connect(mapStateToProps)(ResourceBar);
