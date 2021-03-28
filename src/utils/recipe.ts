import recipeData from "data/recipe.json";

export interface RecipeInfo {
  id: number;
  job: number;
  it: number;
  m: number[];
  rlv: number;
}

const recipes: Map<string, RecipeInfo> = new Map();

Object.keys(recipeData).forEach((k) => {
  const point = (recipeData as any)[k];
  recipes.set(k, point);
});

class Recipe {
  static getAll() {
    return recipes;
  }

  static getCrafts(id: string, num=1) {
    const recipe = recipes.get(id);
    if (recipe) {
      const recipeList:Array<Array<number>> = [];
      for (let index = 0; index < recipe.m.length; index += 2) {
        recipeList.push([recipe.m[index], recipe.m[index + 1] * num]);
      }
      return recipeList;
    }
  }
}

export default Recipe;
