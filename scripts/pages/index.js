// Import des modules 
import { recipeFactory } from '../factories/recipe.js';
import { searchCumul } from '../pages/filtered.js';

// Variable globale pour stocker toutes les recettes
let allRecipes = [];

// Fonction asynchrone pour obtenir les recettes 
export async function getRecipes() {
  // eslint-disable-next-line no-undef
  allRecipes = recipes;
  return allRecipes;
}

// Fonction asynchrone pour afficher les recettes dans l'interface utilisateur
export async function displayRecipe(allRecipes) {

  const recipeSections = document.querySelector(".recipes");
  const totalRecipeCountElement = document.getElementById("total-recipe-count");

  // Met à jour le nombre total de recettes dans l'interface utilisateur
  totalRecipeCountElement.textContent = `${allRecipes.length} recettes`;
  recipeSections.innerHTML = "";

  // Parcourt toutes les recettes pour les afficher dans l'interface utilisateur
  allRecipes.forEach(recipeSection => {
    const recipeModel = recipeFactory(recipeSection);
    const userCardRecipe = recipeModel.getRecipeCardDOM();
    recipeSections.appendChild(userCardRecipe);
  });
}

// Fonction asynchrone pour initialiser l'application
async function init() {
  try {
    allRecipes = await getRecipes();
    // Initialise la recherche cumulée
    searchCumul();
    // Affiche les recettes dans l'interface utilisateur
    displayRecipe(allRecipes);
  } catch (error) {
    // Gère les erreurs en les affichant dans la console
    console.error(error);
  }
}

// Appelle la fonction d'initialisation au chargement de la page
init();
