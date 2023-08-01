import { recipeFactory } from '../factories/recipe.js';
import { setupSearchBar } from '../pages/search-bar.js';

async function getRecipes() {
    const allRecipes = recipes;
    console.log(allRecipes);
    return allRecipes;
}


 export async function displayRecipe(allRecipes) {
    console.log("Affichage des recettes :");
    console.log(allRecipes);
    const recipeSections = document.querySelector(".recipes");
    recipeSections.innerHTML = ""; //  vider la section avant d'afficher les nouvelles recettes.
  
    allRecipes.forEach((recipeSection) => {
      console.log("Affichage d'une recette :");
      console.log(recipeSection);
      console.log(recipeSection.image);
  
      const recipeModel = recipeFactory(recipeSection);
      console.log("Objet DOM représentant la recette :");
      console.log(recipeModel);
  
      const userCardRecipe = recipeModel.getRecipeCardDOM();
      console.log("Élément DOM de la recette :");
      console.log(userCardRecipe);
  
      recipeSections.appendChild(userCardRecipe);
    });
  }
  

async function init() {
    try {
        const allRecipes = await getRecipes();
        setupSearchBar();
        displayRecipe(allRecipes);
    } catch (error) {
        console.error(error);
    }
}

init();
