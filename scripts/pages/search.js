// Import des modules nécessaires
import { displayRecipe } from '../pages/index.js';
import { generateTagLists, inputDropdowns, normalizeTag } from '../pages/tag-systeme.js';

// Tableaux globaux pour stocker les tags de chaque catégorie
export let tagsIngredients = [];
export let tagsUstensils = [];
export let tagsAppliance = [];

// Fonction pour supprimer un tag sélectionné
export function removeTag(txtItems, category) {
  // Fonction pour supprimer les tags de la liste déroulante
  const removeTagsByCategory = (category) => {
    const selector = `.${category} .tagDropdown`;
    const dropdownTags = document.querySelectorAll(selector);

    dropdownTags.forEach(tagElement => {
      if (tagElement.textContent.includes(txtItems)) {
        tagElement.remove();
      }
    });
  };

  // Supprime les tags de chaque catégorie
  removeTagsByCategory('ingredients');
  removeTagsByCategory('ustensils');
  removeTagsByCategory('appliance');

  // Récupère l'élément contenant les tags sélectionnés
  const selectedTagsElement = document.getElementById('selectedTags');
  // Récupère tous les tags sélectionnés
  const tagElements = selectedTagsElement.querySelectorAll('.selected-tag');

  // Parcours des tags sélectionnés pour les supprimer
  tagElements.forEach(tagElement => {
    if (tagElement.textContent.includes(txtItems)) {
      tagElement.remove();

      // Met à jour le tableau de tags en fonction de la catégorie
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

// Fonction de recherche principale
export function search() {
// naim
  // Tableau pour stocker les recettes filtrées
  let filteredRecipes = [];

  // Boucle à travers toutes les recettes
  for (let index = 0; index < recipes.length; index++) {
    const recipe = recipes[index];
    if (isValid(recipe)) {
      filteredRecipes.push(recipe);
    }
  }

  // Met à jour les dropdowns et les listes de tags
  inputDropdowns(filteredRecipes);
  generateTagLists(filteredRecipes);

  // Affiche les recettes filtrées
  displayRecipe(filteredRecipes);
}

// Fonction pour vérifier si un input est inclus dans une recette
function isIncludedInInput(recipe) {
  // Récupère la valeur de la barre de recherche et la normalise
  const searchInput = document.getElementById('search-bar');
  const searchText = searchInput.value.trim();
  const lowerInput = searchText.toLowerCase();

  // Déstructuration des propriétés de la recette
  const { name, description, ustensils, ingredients, appliance } = recipe;

  // Vérifie si l'input est inclus dans n'importe quelle propriété de la recette
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

// Fonctions pour vérifier si les tags de la catégorie ingredients sont inclus dans la recette
function isIncludedInIngredients(recipe) {
  return tagsIngredients.every(tag => recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(tag.toLowerCase())));
}
// Fonctions pour vérifier si les tags de la catégorie ustensils sont inclus dans la recette
function isIncludedInUstensils(recipe) {
  return tagsUstensils.every(tag => recipe.ustensils.some(ustensil => ustensil.toLowerCase().includes(tag.toLowerCase())));
}
// Fonctions pour vérifier si les tags de la catégorie appliance sont inclus dans la recette
function isIncludedInAppliance(recipe) {
  return tagsAppliance.every(tag => recipe.appliance.toLowerCase().includes(tag.toLowerCase()));
}

// Fonction globale pour vérifier si une recette est valide en fonction de tous les critères
function isValid(recipe) {
  return isIncludedInInput(recipe) && isIncludedInIngredients(recipe) && isIncludedInUstensils(recipe) && isIncludedInAppliance(recipe);
}
