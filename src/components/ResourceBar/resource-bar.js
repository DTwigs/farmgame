import React from 'react';
import ReactDOM from 'react-dom';
import classes from './resource-bar.scss';
import { connect } from 'react-redux';
import anime from 'animejs';
import AnimatedNumber from 'react-animated-number';

export class ResourceBar extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      resourceTypes: this.props.resourceTypes,
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.resourceTypes !== this.props.resourceTypes) {
      var domNode = ReactDOM.findDOMNode(this);
      domNode.classList.add(classes['resource-bar--glow'])
      setTimeout(() => {
        domNode.classList.remove(classes['resource-bar--glow'])
      }, 200)

      anime({
        targets: "." + classes['resource-bar'],
        translateY: ["-6px", 0],
        scale: [1.03, 1],
        duration: 1200,
        direction: 'alternate',
        loop: false
      });
    }
  }

  getResoureValues() {
    return _.map(this.props.resourceTypes, (resource) => {
      return (
        <li className={`${classes['resource-bar_item']}  resource-bar_item-${resource.type}`} key={resource.type} >
          <div className={classes['resource-bar_item-container']}>
              <span className={`${classes["resource-bar_item-icon"]} ${classes[resource.type]}`}></span>
              <div className={classes['resource-bar_item-name']}>
                {resource.type}
              </div>
              <span className={classes['resource-bar_item-quantity']}>
                <AnimatedNumber
                  stepPrecision={0}
                  value={resource.quantity}
                  duration={3000} />
              </span>
          </div>
        </li>
      );
    });
  }

  render () {
    let listClasses = classes['resource-bar']

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
