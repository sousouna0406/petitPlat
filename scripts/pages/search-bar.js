import { displayRecipe } from '../pages/index.js';

function removeAccents(str) {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  function filterRecipesByLetter(letter) {
    console.log(letter);
  
    const lowercaseLetter = removeAccents(letter.toLowerCase()); // Convertir et retirer les accents de la lettre saisie
    console.log(lowercaseLetter);
  
    const filteredRecipes = recipes.filter(recipe => {
      console.log(recipe);
      const recipeName = removeAccents(recipe.name.toLowerCase()); // Convertir et retirer les accents du nom de recette
      console.log(recipeName);
      return recipeName.includes(lowercaseLetter);
    });
  
    console.log(filteredRecipes);
    return filteredRecipes;
  }

export async function setupSearchBar() {
    const searchInput = document.getElementById('search-bar');
    let searchText = '';
  
    searchInput.addEventListener('input', async function() {
      searchText = searchInput.value.trim();
      console.log(searchText);
      if (searchText.length >= 1) {
        const filteredRecipes = filterRecipesByLetter(searchText);
        displayRecipe(filteredRecipes);
      } else {
        // Si le texte de recherche a moins de 3 caractères, afficher toutes les recettes
        const allRecipes = await getRecipes('');
        displayRecipe(allRecipes);
      }
    });
  }
  
  