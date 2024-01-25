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
function isIncludedInIngredients(recipe ) {
   
    const tagItem = event.target;
    const tagText = tagItem.textContent;
    const category = tagItem.getAttribute('data-category');
    console.log(category);
    console.log(tagText);
   
    const lowerIngredients = tagText.toLowerCase();

    for (let index = 0; index < recipe.ingredients.length; index++) {
        const ingredient = recipe.ingredients[index].ingredient.toLowerCase();

        if (ingredient.includes(lowerIngredients)) {
           console.log(true);
            return true;
        }
    }

    console.log(false);
    return false;

}

function isIncludedInUstensils(recipe) {

    const tagItem = event.target;
    const tagText = tagItem.textContent;
    const category = tagItem.getAttribute('data-category');
    console.log(category);
    console.log(tagText);

    const lowerUstensils = tagText.toLowerCase();

  
    for (let index = 0; index < recipe.ustensils.length; index++) {
        const ustensil = recipe.ustensils[index].toLowerCase(); 
  
        if (ustensil.includes(lowerUstensils)) {
        
            return true;
        }
    }
  
    return false;
}
function isIncludedInAppliance(recipe) {

}
// Fonction isValid qui va verifier toutes les conditions (génerale)
function isValid(recipe) {
    return isIncludedInInput(recipe) && isIncludedInIngredients(recipe) //&& isIncludedInUstensils(recipe) && isIncludedInAppliance(recipe)//
}

}