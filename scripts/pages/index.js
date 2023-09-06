import { recipeFactory } from '../factories/recipe.js';
import { searchCumul } from '../pages/filtered.js';
import { generateTagLists , setupDynamicSearchTag } from '../pages/tag-systeme.js';


let allRecipes = []; 


export async function getRecipes() {
  allRecipes = recipes; 
  console.log(allRecipes);
  return allRecipes;
}


export async function displayRecipe(allRecipes) {
  const recipeSections = document.querySelector(".recipes");
  const totalRecipeCountElement = document.getElementById("total-recipe-count");

    // Mettre à jour le nombre total de recettes
    totalRecipeCountElement.textContent = `${allRecipes.length} recettes`;
    
  recipeSections.innerHTML = ""; // Vider la section avant d'afficher les nouvelles recettes.

    allRecipes.forEach(recipeSection => {
      const recipeModel = recipeFactory(recipeSection);
      const userCardRecipe = recipeModel.getRecipeCardDOM();
      recipeSections.appendChild(userCardRecipe);
    });
}
  


async function init() {
  try {
      allRecipes = await getRecipes(); 
      // Appeler la fonction qui ajoute les eventListeners à l'input
      // Appeler la fonction qui ajoute les eventListeners au tags
      searchCumul();
    
     displayRecipe(allRecipes);
  } catch (error) {
      console.error(error);
  }
}

init();
