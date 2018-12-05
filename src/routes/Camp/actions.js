// ------------------------------------
// Constants
// ------------------------------------
export const CRAFT_ITEM = 'recipes/CRAFT_RECIPE';
export const UNLOCK_RECIPE = 'recipes/UNLOCK_RECIPE';

// ------------------------------------
// Actions
// ------------------------------------
export function craftRecipe (itemName) {
  return {
    type: CRAFT_RECIPE,
    payload: {
      itemName
    }
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

