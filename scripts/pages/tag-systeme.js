import { displayRecipe } from '../pages/index.js';
import { filteredRecipes, setupSearchBar } from '../pages/search-bar.js';
console.log(recipes);
 let allRecipes = recipes
export let tagText = ''


export function normalizeTag(tagValue) {
    if (typeof tagValue === 'string') {
      return tagValue.toLowerCase();
    } else {
      return ''; // Retourner une chaîne vide ou un autre traitement approprié pour les valeurs non définies
    }
  }

export function generateTagList(tagList, keywords, category) {
    tagList.innerHTML = ''; 
    keywords.forEach(keyword => {
        const tagItem = document.createElement('li');
        tagItem.classList.add('tag');
        tagItem.textContent = keyword;
        tagList.appendChild(tagItem);
    });
}
  
export function createSelectedTag(tagText, filteredRecipes) {
    const selectedTagsElement = document.getElementById('selectedTags');
    const tagElement = document.createElement('span');
    tagElement.classList.add('selected-tag');
    tagElement.textContent = tagText;
    
    // Ajouter une croix pour supprimer le tag
    const closeIcon = document.createElement('span');
    closeIcon.classList.add('close-icon');
    closeIcon.textContent = 'x';
    closeIcon.addEventListener('click', () => {
        console.log(filteredRecipes);
    
        console.log(filteredRecipes);
        removeTagFromSelectedList(tagText,filteredRecipes);
    });
    
    tagElement.appendChild(closeIcon);
    selectedTagsElement.appendChild(tagElement);
            
}
    
export function removeTagFromSelectedList(tagText) {
    const selectedTagsElement = document.getElementById('selectedTags');
    const tagElements = selectedTagsElement.querySelectorAll('.selected-tag');
    
    // Supprimer le tag de la liste affichée
    tagElements.forEach(tagElement => {
        if (tagElement.textContent.includes(tagText)) {
            tagElement.remove();
        }
    });

    // Désélectionner le tag dans la liste des tags
    const tagListItems = document.querySelectorAll('.tag-list li.tag');
    tagListItems.forEach(tagItem => {
        if (tagItem.textContent.toLowerCase() === tagText) {
            tagItem.classList.remove('selected');
        }
    });

    // Récupérer les tags restants
    const selectedTags = document.querySelectorAll('.selected-tag');
    const selectedTagValues = Array.from(selectedTags).map(tag => normalizeTag(tag.textContent.replace('x', '')));

    // Récupérer la valeur de la recherche principale
    const searchInput = document.getElementById('search-bar');
    const searchText = searchInput ? searchInput.value.trim() : '';

    const updatedFilter = allRecipes.filter(recipe => {
        const recipeTags = [
            ...(recipe.ingredients || []).map(ingredient => normalizeTag(ingredient.ingredient)),
            normalizeTag(recipe.appliance),
            ...(recipe.ustensils || []).map(ustensil => normalizeTag(ustensil))
        ];
        const recipeName = normalizeTag(recipe.name.toLowerCase()); // Convertir et retirer les accents du nom de recette

        // Vérifier si la recherche principale est vide ou si le nom de la recette correspond à la recherche
        return (selectedTagValues.every(tag => recipeTags.includes(tag)) && (!searchText || recipeName.includes(searchText)));
    });


    if (updatedFilter.length > 0) {
        console.log('Recettes filtrées mises à jour:', updatedFilter);
        displayRecipe(updatedFilter);
    } else {
        console.log('Aucune recette ne correspond aux filtres.');
        // Afficher toutes les recettes si aucun filtre n'est appliqué
        displayRecipe(allRecipes);
    }
}


export function setupDynamicSearchTag(allRecipes) {
    const tagInputs = document.querySelectorAll('.tag-input');

    tagInputs.forEach(input => {
        input.addEventListener('input', () => {
            const category = input.getAttribute('data-category');
            const tagList = document.querySelector(`#${category}TagList`);
            const allTags = Array.from(tagList.querySelectorAll('.tag'));
        
            const searchQuery = normalizeTag(input.value.trim().toLowerCase()); 

            allTags.forEach(tag => {
                const tagText = normalizeTag(tag.textContent.toLowerCase()); 
                if (tagText.includes(searchQuery)) {
                    tag.style.display = 'block'; 
                } else {
                    tag.style.display = 'none'; 
                }
            });
      
            // Vérifier si une recherche par champ principal est en cours
           
        });
    });
    // Gestion des clics sur les tags
    const tagListItems = document.querySelectorAll('.tag-list li.tag');
    tagListItems.forEach(tagItem => {
    tagItem.addEventListener('click', event => {
        const tagText = tagItem.textContent;
        console.log('Tag sélectionné:', tagText);

        const isSelected = tagItem.classList.contains('selected');

        if (isSelected) {
        // Si le tag est déjà sélectionné, le désélectionner
        console.log("désélectionner");
        tagItem.classList.remove('selected');
        removeTagFromSelectedList(tagText); 
        } else {
        // le sélectionner
        console.log("sélectionner");
        tagItem.classList.add('selected');
        createSelectedTag(tagText,filteredRecipes); 
        }
        console.log(allRecipes);
        filterRecipesByTag(allRecipes);
    });
    });
} 
export function getSelectedTagValues() {
    const selectedTags = document.querySelectorAll('.selected-tag');
    
    console.log(Array.from(selectedTags).map(tag => normalizeTag(tag.textContent.replace('x', ''))));
    return Array.from(selectedTags).map(tag => normalizeTag(tag.textContent.replace('x', '')));
  }

export function filterRecipesByTag(allRecipes) {
    console.log(allRecipes);
    const selectedTagValues = getSelectedTagValues()
console.log(selectedTagValues);
 // Vérifier s'il y a au moins un tag sélectionné
 if (selectedTagValues.length === 0) {
    console.log("Aucun tag sélectionné.");
    return; // Sortir de la fonction si aucun tag n'est sélectionné
}
    const filteredRecipes = allRecipes.filter(recipe => {
    const recipeTags = [
        ...recipe.ingredients.map(ingredient => normalizeTag(ingredient.ingredient)),
        normalizeTag(recipe.appliance),
        ...recipe.ustensils.map(ustensil => normalizeTag(ustensil))
    ];

    console.log(recipeTags);
    // Vérifier si tous les tags sélectionnés correspondent exactement à un tag dans la recette
    console.log(selectedTagValues.every(tag => recipeTags.includes(tag)));
    return selectedTagValues.every(tag => recipeTags.includes(tag));
    
    });
    console.log(filteredRecipes);
        displayRecipe(filteredRecipes);
     
}
    
export function generateTagLists(recipes) {
    const tagLists = document.querySelectorAll('.tag-list');

    // Récupérer toutes les catégories dynamiquement à partir d'une recette
    const categories = Object.keys(recipes[0]).filter(category => {
        return category === 'ingredients' || category === 'appliance' || category === 'ustensils';
    });

    categories.forEach(category => {
        const keywords = [];

        recipes.forEach(recipe => {
        const categoryKeywords = recipe[category];
        
        if (Array.isArray(categoryKeywords)) {
            categoryKeywords.forEach(subKeyword => {
            const keywordValue = typeof subKeyword === 'string'
            ? subKeyword.toLowerCase() // Convertir en minuscules
            : subKeyword.ingredient.toLowerCase();
            if (!keywords.includes(keywordValue)) {
                keywords.push(keywordValue);
            }
            });
        } else if (typeof categoryKeywords === 'string') {
            const keywordValue = categoryKeywords.toLowerCase(); 
            if (!keywords.includes(keywordValue)) {
            keywords.push(keywordValue);
            }
        }
        });
        
        for (const tagList of tagLists) {
        if (tagList.id === `${category}TagList`) {
            generateTagList(tagList, keywords, category);
            break; 
        }
        }
    });
}
  
  