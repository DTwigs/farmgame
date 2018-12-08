// ------------------------------------
// Constants
// ------------------------------------
export const CRAFT_RECIPE = 'recipes/CRAFT_RECIPE';
export const UNLOCK_RECIPE = 'recipes/UNLOCK_RECIPE';
export const DEDUCT_RECIPE_COST = 'recipes/DEDUCT_RECIPE_COST';

// ------------------------------------
// Actions
// ------------------------------------
export function craftRecipe (recipe) {
  return {
    type: CRAFT_RECIPE,
    payload: recipe
  };
}

export function unlockRecipe (itemName) {
  return {
    type: UNLOCK_RECIPE,
    payload: {
      itemName
    }
  };
}

export function deductRecipeCost (cost) {
  return {
    type: DEDUCT_RECIPE_COST,
    payload: {
      cost
    }
  };
}

