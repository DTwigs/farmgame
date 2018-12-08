import React from 'react';
import classes from './camp.scss';
import { craftRecipe } from '../../routes/Camp/actions.js';
import DisplayItem from '../DisplayItem/display-item.js';
import CraftRecipes from './craft-recipes.js';

export class Camp extends React.Component {
  render () {
    return (
      <div>
        <div className={classes["campfire-container"]}>
          campfire
        </div>
        <div className={classes["crafting-container"]}>
          <div className={classes["crafting-tabs"]}>
            <div className={classes["crafting-tabs_tab"]}>
              Crafting
            </div>
          </div>
          <div className={classes["crafting-body"]}>
            <CraftRecipes />
          </div>
        </div>
      </div>
    );
  }
}

export default Camp;