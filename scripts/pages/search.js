import { displayRecipe } from '../pages/index.js';
import { generateTagLists, inputDropdowns, normalizeTag } from '../pages/tag-systeme.js';

export let tagsIngredients = [];
export let tagsUstensils = []
export let tagsAppliance = []


export function removeTag(txtItems, category) {
  const removeTagsByCategory = (category) => {
    const selector = `.${category} .tagDropdown`;
    const dropdownTags = document.querySelectorAll(selector);

    dropdownTags.forEach(tagElement => {
      if (tagElement.textContent.includes(txtItems)) {
        tagElement.remove();
      }
    });
  };

  // Supprime les tags en fonction de la catégorie
  removeTagsByCategory('ingredients');
  removeTagsByCategory('ustensils');
  removeTagsByCategory('appliance');

  const selectedTagsElement = document.getElementById('selectedTags');
  const tagElements = selectedTagsElement.querySelectorAll('.selected-tag');

  // Supprime le tag de la liste affichée et du tableau correspondant
  tagElements.forEach(tagElement => {
    if (tagElement.textContent.includes(txtItems)) {
      tagElement.remove();

      // Mettre à jour le tableau de tags en fonction de la catégorie
      switch (category) {
        case 'ingredients':
          tagsIngredients = tagsIngredients.filter(tag => tag !== txtItems);
          break;
        case 'ustensils':
          tagsUstensils = tagsUstensils.filter(tag => tag !== txtItems);
          break;
        case 'appliance':
          tagsAppliance = tagsAppliance.filter(tag => tag !== txtItems);
          break;
        default:
          console.error("Catégorie de tag non reconnue.");
      }
    }
  });
}






export function search() {

  // Vider les recherches filtrées
  let filteredRecipes = [];
  //Bouclé a travers les recettes
  for (let index = 0; index < recipes.length; index++) {
      const recipe = recipes[index];
      if (isValid(recipe)) {
          filteredRecipes.push(recipe);
      }
      
  }
  inputDropdowns(filteredRecipes);
  generateTagLists(filteredRecipes);
  displayRecipe(filteredRecipes);
  console.log(filteredRecipes);

// créer la fonction isIncludedInRecipe{CATEGORY} qui verifie que l'input est inclus dans la recette
function isIncludedInInput(recipe) {

  const searchInput = document.getElementById('search-bar');
  const searchText = searchInput.value.trim();
  const lowerInput = searchText.toLowerCase();


  const { name, description, ustensils, ingredients, appliance } = recipe;
  if (
    name.toLowerCase().includes(lowerInput) ||
    description.toLowerCase().includes(lowerInput) ||
    ustensils.some(ustensil => normalizeTag(ustensil).includes(lowerInput)) ||
    ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(lowerInput)) ||
    appliance.toLowerCase().includes(lowerInput)
  ) {
    return true;
  }
  return false;
}
function isIncludedInIngredients(recipe) {
  return tagsIngredients.every(tag => recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(tag.toLowerCase())));
}

function isIncludedInUstensils(recipe) {
  return tagsUstensils.every(tag => recipe.ustensils.some(ustensil => ustensil.toLowerCase().includes(tag.toLowerCase())));
}
function isIncludedInAppliance(recipe) {
return tagsAppliance.every(tag => recipe.appliance.toLowerCase().includes(tag.toLowerCase()));

}
// Fonction isValid qui va verifier toutes les conditions (génerale)
function isValid(recipe) {
  return isIncludedInInput(recipe) && isIncludedInIngredients(recipe) && isIncludedInUstensils(recipe) && isIncludedInAppliance(recipe);
}

}