import { setupSearchBar, filteredRecipes } from '../pages/search-bar.js';
import { setupDynamicSearchTag, generateTagLists, filterRecipesByTag, getSelectedTagValues, generateTagList } from '../pages/tag-systeme.js';

let allrecipes = recipes;
let filteredBySearchRecipes = [];

export function searchCumul() {
  generateTagLists(allrecipes);

  const searchInput = document.getElementById('search-bar');
  const dropdownTagsIngredients = document.getElementById('ingredientsTagList');
  const dropdownTagsUstensils = document.getElementById('ustensilsTagList')
  const dropdownTagsAppliance = document.getElementById('applianceTagList')
  
  console.log('Initialisation de la recherche cumulée.');
searchInput.addEventListener('input', function (event) {
  search(event)
})
dropdownTagsIngredients.addEventListener('click', function (event) {
    const tagItem = event.target;
    const tagText = tagItem.textContent;
    console.log(tagText);
    const category = tagItem.getAttribute('data-category');
    console.log(category);
  search(event)
})
dropdownTagsUstensils.addEventListener('click', function (event) {
  const tagItem = event.target;
  const tagText = tagItem.textContent;
  console.log(tagText);
  const category = tagItem.getAttribute('data-category');
  console.log(category);
search(event)
})

dropdownTagsAppliance.addEventListener('click', function (event) {
  const tagItem = event.target;
  const tagText = tagItem.textContent;
  console.log(tagText);
search(event)
})

}

export function cumul() {
  const searchInput = document.getElementById('search-bar');
  const searchText = searchInput ? searchInput.value.trim() : '';
  const selectedTagValues = getSelectedTagValues();


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
