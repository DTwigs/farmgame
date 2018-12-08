import React from 'react';
import classes from './camp.scss';
import uiClasses from '../Outside/outside.scss';
import { connect } from 'react-redux';
import { craftRecipe } from '../../routes/Camp/actions.js';
import DisplayItem from '../DisplayItem/display-item.js';

export class CraftRecipes extends React.Component {
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

  buildRecipeCostList (cost) {
    let costsDisplay = [];

    for (let key in cost) {
      costsDisplay.push(
        <li className={classes["craft-item_recipe-cost-list_item"]} key={key}>
          <DisplayItem name="" quantity={cost[key]} type={key} />
        </li>
      );
    }

    return costsDisplay;
  }

  craftSelectedRecipe (recipe) {
    this.props.craftRecipe(recipe);
  }

  buildCraftButton (isCraftable, recipe) {
    if (!isCraftable) { return null; }
    return (
      <button className={uiClasses['ui-action-button']} onClick={this.craftSelectedRecipe.bind(this, recipe)}>
        Craft
      </button>
    );
  }

  buildRecipeList () {
    let craftableRecipes = this.getCraftableRecipes();

    return _.map(craftableRecipes, (r) => {
      let isCraftable = this.isCraftable(r),
        craftableClass = isCraftable ? classes["craftable"] : "";

      return (
        <div key={r.name} className={`${classes["craft-item"]} ${classes[r.name]} ${craftableClass}`}>
          <span className={classes["craft-item_cornerer"]} />
          <div className={classes["craft-item_recipe-cost"]} >
            <div className={classes["craft-item_recipt-cost_title"]}>
              {r.display}
            </div>
            <div className={classes["craft-item_recipt-cost_ingredients"]}>
              Ingredients:
            </div>
            <ul className={classes['craft-item_recipe-cost-list']}>
              {this.buildRecipeCostList(r.cost)}
            </ul>
            { this.buildCraftButton(isCraftable, r) }
          </div>
        </div>
      );
    });
  }

  render () {
    return (
      <div>
        { this.buildRecipeList() }
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

export default connect(mapStateToProps, mapDispatchToProps)(CraftRecipes);