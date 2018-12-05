import React from 'react'
import Header from '../../components/Header'
import ResourceBar from '../../components/ResourceBar/resource-bar.js';
import classes from './CoreLayout.scss'
import '../../styles/core.scss'

export const CoreLayout = ({ children }) => (
  <div className='container'>
    <Header />

    <div className={classes.mainContainer}>
      <ResourceBar></ResourceBar>
      <div className={classes["center-screen-container"]}>
        {children}
      </div>
    </div>
  </div>
)

CoreLayout.propTypes = {
  children: React.PropTypes.element.isRequired
}

export default CoreLayout
