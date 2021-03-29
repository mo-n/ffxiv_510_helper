import recipeData from "data/recipe.json";

export interface RecipeInfo {
  id: number;
  job: number;
  it: number;
  m: number[];
  rlv: number;
  bp: number[];
}

export interface Material {
  parent: Set<number>;
  amount: number;
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

  static mergeMaterial(m1: Map<number, Material>, m2: Map<number, Material>) {
    const _m1 = new Map(m1), _m2 = new Map(m2);
    _m1.forEach((val1, key) => {
      if (_m2.has(key)) {
        const val2 = _m2.get(key)!
        _m1.set(key, {
          parent: new Set([...val1.parent, ...val2.parent]),
          amount: val1.amount + val2?.amount
        });
        _m2.delete(key)
      }
    });

    return new Map([..._m1, ..._m2])
  }

  /**
   *
   * @param id recipe id
   * @param num item number
   * @returns
   */
  static getMaterial(id: string, num = 1): Map<number, Material> {
    const recipe = recipes.get(id);
    if (!recipe) throw new Error(`not find recipe, id:${id}`);
    const itemId = recipe.it!;
    const recipeList: Map<number, Material> = new Map();
    for (let index = 0; index < recipe.m.length; index += 2) {
      recipeList.set(recipe.m[index], {
        parent: new Set([itemId]),
        amount: recipe.m[index + 1] * Math.ceil(num/recipe.bp[1]),
      });
    }
    return recipeList;
  }
}

export default Recipe;
