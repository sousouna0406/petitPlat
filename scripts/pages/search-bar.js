import { displayRecipe } from '../pages/index.js';
import { generateTagLists, setupDynamicSearchTag} from '../pages/tag-systeme.js';
 
export function removeAccents(str) {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

export function filterRecipesByType(filterType, letter) {
    const lowercaseLetter = removeAccents(letter.toLowerCase());
  
    const filteredRecipes = [];
    
    for (let i = 0; i < recipes.length; i++) {
      const recipe = recipes[i];
      let filterValue = '';
  
      switch (filterType) {
        case 'letter':
          filterValue = removeAccents(recipe.name.toLowerCase());
          break;
        case 'appliance':
          filterValue = removeAccents(recipe.appliance.toLowerCase());
          break;
        case 'ingredient':
          for (let j = 0; j < recipe.ingredients.length; j++) {
            const ingredientObj = recipe.ingredients[j];
            if (typeof ingredientObj.ingredient === 'string') {
              ingredientObj.ingredient = removeAccents(ingredientObj.ingredient.toLowerCase());
            }
          }
  
          filterValue = [];
          for (let j = 0; j < recipe.ingredients.length; j++) {
            filterValue.push(recipe.ingredients[j].ingredient);
          }
          break;
        case 'ustensil':
          const validUstensils = [];
          for (let j = 0; j < recipe.ustensils.length; j++) {
            if (recipe.ustensils[j] !== undefined) {
              validUstensils.push(removeAccents(recipe.ustensils[j].toLowerCase()));
            }
          }
          filterValue = validUstensils;
          break;
        default:
          return false;
      }
  
      if (filterValue.includes(lowercaseLetter)) {
        filteredRecipes.push(recipe);
      }
    }
  
    return filteredRecipes;
  }
  
export const eventFilteredRecipesUpdated = new Event('filteredRecipesUpdated');

export let filteredRecipes = []; // Variable pour stocker les recettes filtrées

export function setupSearchBar() {
    const searchInput = document.getElementById('search-bar');
    const clearButton = document.getElementById('clear-button');
    
   // Style du bouton de suppression
   clearButton.style.display = 'none'; // Masque initialement le bouton
    function updateFilteredRecipes(searchText) {
      const lowercaseSearchText = removeAccents(searchText.toLowerCase());
  
      if (searchText.length >= 3) {
        const filteredRecipesByName = filterRecipesByType('letter', lowercaseSearchText);
        console.log(filteredRecipesByName);
        const filteredRecipesByIngredient = filterRecipesByType('ingredient', lowercaseSearchText);
        console.log(filteredRecipesByIngredient);
        const filteredRecipesByUstensil = filterRecipesByType('ustensil', lowercaseSearchText);
        console.log(filteredRecipesByUstensil);
        const filteredRecipesAppliance = filterRecipesByType('appliance', lowercaseSearchText);
        console.log(filteredRecipesAppliance);
  
        const allFilteredRecipes = [...filteredRecipesByName, ...filteredRecipesByIngredient, ...filteredRecipesByUstensil, ...filteredRecipesAppliance];
        console.log(allFilteredRecipes);
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
       // Affichage/masque le bouton de suppression en fonction du contenu de l'entrée
       if (searchText.length > 0) {
        clearButton.style.display = 'block';
      } else {
        clearButton.style.display = 'none';
      }
 
      updateFilteredRecipes(searchText);
    });

      // Ajoute un gestionnaire d'événements pour effacer le champ de saisie lorsque le bouton de suppression est cliqué
      clearButton.addEventListener('click', function () {
        searchInput.value = '';
        clearButton.style.display = 'none';
        updateFilteredRecipes('');
        generateTagLists(recipes);
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
  /*
  
  oop over recipes
(    pour chaque recipe, regarder si inputExpression est || dans recipe.name || dans recipe. description soit dans recipe....
)    &&
    recipe.ingrediuents includes all ingredientsTagArray elemnts
    &&
    recipe.applicance includes all applianceTagArray elemnts
    &&
    recipe.ustensils includes all ustensilsTagArray elemnts
  
  events qui déclenchent la recherche
  
  on vide les résultats (results) à chaque recherche [] => results = [];
  
  pour chaque recherche */