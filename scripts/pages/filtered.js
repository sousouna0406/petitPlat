import { setupSearchBar, filteredRecipes } from '../pages/search-bar.js';
import { setupDynamicSearchTag, generateTagLists, filterRecipesByTag, getSelectedTagValues, generateTagList } from '../pages/tag-systeme.js';

let allrecipes = recipes;
let filteredBySearchRecipes = [];

export function searchCumul() {
  console.log('Initialisation de la recherche cumulée.');
  generateTagLists(allrecipes);
  setupDynamicSearchTag(allrecipes);
  setupSearchBar(allrecipes);
  document.addEventListener('filteredRecipesUpdated', cumul);
}

export function cumul() {
  const searchInput = document.getElementById('search-bar');
  const searchText = searchInput ? searchInput.value.trim() : '';
  const selectedTagValues = getSelectedTagValues();
  console.log('Tags sélectionnés :', selectedTagValues);
  console.log('Texte de recherche :', searchText);
  console.log(allrecipes);


  if (selectedTagValues.length > 0 && searchText !== '') {
    console.log('Tags et texte de recherche présents.');
    searchIfSomeTagAndSearchNotEmpty();
  } else if (searchText !== '') {
    console.log('Seul le texte de recherche est présent.');
    searchIfSearchNotEmpty();
  } else if (selectedTagValues.length > 0) {
    console.log('Seuls des tags sont présents.');
   generateTagLists(filteredRecipes);
    filterRecipesByTag(allrecipes, selectedTagValues);
  }
}

function searchIfSomeTagAndSearchNotEmpty() {
  const selectedTagValues = getSelectedTagValues(); // Obtenez les tags sélectionnés
  filteredBySearchRecipes = filterRecipesByTag(allrecipes, selectedTagValues); // Filtrez les recettes par tag
  console.log('Recettes filtrées :', filteredBySearchRecipes);

  if (filteredBySearchRecipes !== undefined && filteredBySearchRecipes.length === 0) {
    console.log('Aucune recette filtrée trouvée. Utilisation de toutes les recettes.');
    console.log(allrecipes);
  } else {
    console.log('Recettes filtrées trouvées. Utilisation des recettes filtrées.');
    generateTagLists(filteredBySearchRecipes, allrecipes);
    setupDynamicSearchTag(filteredBySearchRecipes);
  }

  console.log('Au moins un des tags est sélectionné.');
}

function searchIfSearchNotEmpty() {
  filteredBySearchRecipes = filteredRecipes;
  generateTagLists(filteredBySearchRecipes, allrecipes);
  setupDynamicSearchTag(filteredBySearchRecipes);
  console.log('Aucun tag n\'est sélectionné.');
}
