import { setupSearchBar, filteredRecipes } from '../pages/search-bar.js';
import { setupDynamicSearchTag, generateTagLists, filterRecipesByTag, getSelectedTagValues } from '../pages/tag-systeme.js';

const allrecipes = recipes;
let filteredBySearchRecipes = [];

export function searchCumul() {
  generateTagLists(allrecipes);
  setupDynamicSearchTag(allrecipes);
  setupSearchBar(allrecipes);
  document.addEventListener('filteredRecipesUpdated', cumul);
}

function cumul() {
  const searchInput = document.getElementById('search-bar');
  const searchText = searchInput ? searchInput.value.trim() : '';
  const selectedTagValues = getSelectedTagValues();
console.log(selectedTagValues);
if (selectedTagValues.length > 0 && searchText !== '') {
  filteredBySearchRecipes = filterRecipesByTag(filteredRecipes); 
  console.log(filteredBySearchRecipes);
  generateTagLists(filteredBySearchRecipes);
  setupDynamicSearchTag(filteredBySearchRecipes);
  console.log('Au moins un des tags sélectionné.');
} else if (searchText !== ''){
  filteredBySearchRecipes = filteredRecipes;
  generateTagLists(filteredBySearchRecipes);
  setupDynamicSearchTag(filteredBySearchRecipes);
  console.log('Aucun des tags sélectionné.');
}
}
