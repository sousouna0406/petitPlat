function search(event) {

    console.log('search');
    console.log(event);
    // Vider les recherches filtrées
    let filteredRecipes = []
    //Bouclé a travers les recettes
    for (let index = 0; index < recipes.length; index++) {
        const recipe = recipes[index];
        if (isValid(recipe)) {
            filteredRecipes.push(recipe)
        }
        
    }
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
    
}
function isIncludedInIngredients(recipe) {
    for (let index = 0; index < recipe.ingredients.length; index++) {
        const ingredient = recipe.ingredients[index];
        
    }
    
}
// Fonction isValid qui va verifier toutes les conditions (génerale)
function isValid(recipe) {
    return isIncludedInInput(recipe) && isIncludedInIngredients(recipe) && isIncludedInUstensils(recipe) && isIncludedInAppliance(recipe)
}
}