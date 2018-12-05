import React from 'react';
import classes from './camp.scss';
import { connect } from 'react-redux';
import { craftRecipe } from '../../routes/Camp/actions.js';

export class Camp extends React.Component {
  constructor (props) {
    super(props);
    // this.isCraftable = this.isCraftable.bind(this);
  }

  getCraftableRecipes () {
    let recipes = this.props.recipes,
      craftableRecipes = _.filter(recipes, o => o.canCraft);

    return craftableRecipes;
  }

  isCraftable (recipe) {
    let resources = this.props.resources;

    for (let key in recipe.cost) {
      let amountNeeded = recipe.cost[key],
        amountOwned = _.find(resources, {type: key}).quantity;

      if (amountNeeded > amountOwned) {
        return false;
      }
    }

    return true;
  }

  buildRecipeList () {
    let craftableRecipes = this.getCraftableRecipes();

    return _.map(craftableRecipes, (r) => {
      let isCraftable = this.isCraftable(r),
        craftableClass = isCraftable ? classes["craftable"] : "";

      return (
        <div key={r.name} className={`${classes["craft-item"]} ${classes[r.name]} ${craftableClass}`}>
          <span className={classes["craft-item_cornerer"]} />
        </div>
      );
    });
  }

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
            { this.buildRecipeList() }
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  craftRecipe
};

const mapStateToProps = (state) => ({
  recipes: state.camp.recipes,
  resources: state.gather.resourceTypes,
});

export default connect(mapStateToProps, mapDispatchToProps)(Camp);