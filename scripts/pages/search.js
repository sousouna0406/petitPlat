let tagsIngredients = [];
let tagsUstensils = []
let tagsAppliance = []
function search(event) {

    console.log('search');
    // Vider les recherches filtrées
    let filteredRecipes = []
    //Bouclé a travers les recettes
    for (let index = 0; index < recipes.length; index++) {
        const recipe = recipes[index];
        if (isValid(recipe)) {
            filteredRecipes.push(recipe)
        }
        
    }
    console.log(filteredRecipes);
    /*A chaque recettes verifié que:
    - L'INPUT est inclus dans le nom ou la description ou les ustensiles ou les ingredients ou les appareils
    et:
    - Pour chacun des tags ingrédients la liste des ingrédients le comptient 
     et:
    - Pour chacun des tags ustensils la liste des ustensils le comptient
     et:
    - Pour chacun des tags appareils la liste des appareils le comptient
 */
// créer la fonction isIncludedInRecipe{CATEGORY} qui verifie que l'input est inclus dans la recette
function isIncludedInInput(recipe) {
    //console.log(recipe);
    const searchInput = document.getElementById('search-bar');
    const searchText = searchInput.value.trim();
    const lowerInput = searchText.toLowerCase()
    //console.log(lowerInput);

    const { name, description, ustensils, ingredients, appliance } = recipe;
    console.log(recipe);
    if (
      name.toLowerCase().includes(lowerInput) ||
      description.toLowerCase().includes(lowerInput) ||
      ustensils.some(ustensil => ustensil.toLowerCase().includes(lowerInput)) ||
      ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(lowerInput)) ||
      appliance.toLowerCase().includes(lowerInput)
    ) {
      return true;
    }
    return false;
}
function isIncludedInIngredients(recipe) {
    console.log(tagsIngredients);
    return tagsIngredients.every(tag => recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(tag.toLowerCase())));
}

function isIncludedInUstensils(recipe) {
    console.log(tagsUstensils);
    return tagsUstensils.every(tag => recipe.ustensils.some(ustensil => ustensil.toLowerCase().includes(tag.toLowerCase())));
}
function isIncludedInAppliance(recipe) {
 console.log(tagsAppliance);
 return tagsAppliance.every(tag => recipe.appliance.toLowerCase().includes(tag.toLowerCase()));

}
// Fonction isValid qui va verifier toutes les conditions (génerale)
function isValid(recipe) {
    return isIncludedInInput(recipe) && isIncludedInIngredients(recipe) && isIncludedInUstensils(recipe) && isIncludedInAppliance(recipe)
}

}