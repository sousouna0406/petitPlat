import { displayRecipe } from '../pages/index.js';
import { generateTagLists, setupDynamicSearchTag, filterRecipesByTag } from '../pages/tag-systeme.js';
 
export function removeAccents(str) {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  export function filterRecipesByType(filterType, letter) {
    const lowercaseLetter = removeAccents(letter.toLowerCase());
  
    const filteredRecipes = recipes.filter(recipe => {
      let filterValue = '';
  
      switch (filterType) {
        case 'letter':
          filterValue = removeAccents(recipe.name.toLowerCase());
          break;
        case 'appliance':
          filterValue = removeAccents(recipe.appliance.toLowerCase());
          break;
        case 'ingredient':
          recipe.ingredients.forEach(ingredientObj => {
            if (typeof ingredientObj.ingredient === 'string') {
              ingredientObj.ingredient = removeAccents(ingredientObj.ingredient.toLowerCase());
            }
          });
          filterValue = recipe.ingredients.map(ingredientObj => ingredientObj.ingredient);
          break;
        case 'ustensil':
          const validUstensils = recipe.ustensils.filter(ustensil => ustensil !== undefined);
          filterValue = validUstensils.map(ustensil => removeAccents(ustensil.toLowerCase()));
          break;
        default:
          return false;
      }
  
      return filterValue.includes(lowercaseLetter);
    });
  
    return filteredRecipes;
  }
  
  export const eventFilteredRecipesUpdated = new Event('filteredRecipesUpdated');

  export let filteredRecipes = []; // Variable pour stocker les recettes filtrées

  export function setupSearchBar() {
    const searchInput = document.getElementById('search-bar');

    
  
    function updateFilteredRecipes(searchText) {
      const lowercaseSearchText = removeAccents(searchText.toLowerCase());
  
      if (searchText.length >= 3) {
        const filteredRecipesByName = filterRecipesByType('letter', lowercaseSearchText);
        const filteredRecipesByIngredient = filterRecipesByType('ingredient', lowercaseSearchText);
        const filteredRecipesByUstensil = filterRecipesByType('ustensil', lowercaseSearchText);
        const filteredRecipesAppliance = filterRecipesByType('appliance', lowercaseSearchText);
  
        const allFilteredRecipes = [...filteredRecipesByName, ...filteredRecipesByIngredient, ...filteredRecipesByUstensil, ...filteredRecipesAppliance];
        const uniqueFilteredRecipes = [...new Set(allFilteredRecipes)];
  
        filteredRecipes = uniqueFilteredRecipes;
      } else {
        // Si le texte de recherche a moins de 3 caractères, afficher toutes les recettes
        filteredRecipes = recipes;
      }
  
      displayRecipe(filteredRecipes);
      document.dispatchEvent(eventFilteredRecipesUpdated);
    }
  
    searchInput.addEventListener('input', function () {
      const searchText = searchInput.value.trim();
      console.log(searchText);
 
      updateFilteredRecipes(searchText);
    });
  
    searchInput.addEventListener('keydown', function (event) {
      if ((event.key === 'Backspace' || event.key === 'Delete') && searchInput.value.trim() === '') {
        // Réinitialiser la recherche principale et actualiser la liste de tags
        generateTagLists(recipes);
        setupDynamicSearchTag(recipes);
      }
    });
  
    document.addEventListener('filteredRecipesUpdated', () => {
      console.log('Résultat combiné:', filteredRecipes);
    });
  }
  