import { displayRecipe } from '../pages/index.js';

 let allRecipes = recipes
export let tagText = ''


export function normalizeTag(tagValue) {
    if (typeof tagValue === 'string') {
      // Remplacement les caractères accentués par leurs équivalents non accentués
      return tagValue
        .toLowerCase()
        .normalize("NFD") // Normalisation Unicode pour les caractères accentués
        .replace(/[\u0300-\u036f]/g, ""); // Supprime les caractères diacritiques (accents)
    } else {
      return ''; // Retourne une chaîne vide ou un autre traitement approprié pour les valeurs non définies
    }
  }

export function generateTagList(tagList, keywords) {

    tagList.innerHTML = ''; 
    keywords.forEach(keyword => {
        const tagItem = document.createElement('li');
        tagItem.classList.add('tag');
        tagItem.setAttribute('data-category', tagList.getAttribute('data-category'))
        tagItem.textContent = keyword;
        tagList.appendChild(tagItem);
    });
}
function createSelectedTag(tagText) {

  const selectedTagsElement = document.getElementById('selectedTags');
  const tagElements = selectedTagsElement.querySelectorAll('.selected-tag');

  // Vérifie si le tag est déjà sélectionné
  let isAlreadySelected = false;
  tagElements.forEach(tagElement => {
    if (tagElement.textContent.includes(tagText)) {
      isAlreadySelected = true;
    }
  });

  if (!isAlreadySelected) {
    // Crée le premier élément de tag
    const tagElement1 = document.createElement('span');
    tagElement1.classList.add('selected-tag');
    tagElement1.textContent = tagText;


    // Ajouter une croix pour supprimer le tag au premier élément
    const closeIcon1 = document.createElement('span');
    closeIcon1.classList.add('close-icon');
    closeIcon1.innerHTML = `<i class="fas fa-times"></i>`;
    closeIcon1.addEventListener('click', (event) => {
      const tagText = event.currentTarget.parentElement.textContent.replace('x', '').trim();
      removeTagFromSelectedList(tagText);
    });

 
    // Ajoutez également un gestionnaire d'événements pour supprimer le tag lorsque vous cliquez dessus dans la div
    tagElement1.addEventListener('click', (event) => {
      const tagText = event.currentTarget.textContent;
      removeTagFromSelectedList(tagText);
    });

    tagElement1.appendChild(closeIcon1);
  
    // Ajout le premier tag à selectedTagsElement
    selectedTagsElement.appendChild(tagElement1);


  }
} 

function createSelectedTagOneDropdown(tagText, category) {
  const ingredientsTagContainer = document.getElementById('selected-tags-container-ingredients');
  const applianceTagContainer = document.getElementById('selected-tags-container-appliance');
  const ustensilsTagContainer = document.getElementById('selected-tags-container-ustensils');

  const tagElement = document.createElement('div');
  tagElement.textContent = tagText;

    // Ajouter une croix pour supprimer le tag au premier élément
    const closeButton = document.createElement('span');
    closeButton.classList.add('close-icon');
    closeButton.innerHTML = `<i class="fas fa-times"></i>`;
    closeButton.addEventListener('click', (event) => {
      const tagText = event.currentTarget.parentElement.textContent.replace('x', '').trim();
      removeTagFromSelectedList(tagText);
    });
 // Ajouter le bouton de fermeture à côté du tag
 tagElement.appendChild(closeButton);
  
  // une condition pour déterminer quelle classe ajouter en fonction de la valeur de category
  if (category === 'ingredients') {
    tagElement.classList.add('ingredients');
    tagElement.classList.add('tagDropdown');
    ingredientsTagContainer.appendChild(tagElement);
  } else if (category === 'appliance') {
    tagElement.classList.add('appliance');
    tagElement.classList.add('tagDropdown');
    applianceTagContainer.appendChild(tagElement);
  } else if (category === 'ustensils') {
    tagElement.classList.add('ustensils');
    tagElement.classList.add('tagDropdown');
    ustensilsTagContainer.appendChild(tagElement);
  } else {
    // Gérer le cas où la catégorie n'est pas reconnue
    console.error(`Catégorie inconnue : ${category}`);
  }
}

export function removeTagFromSelectedList(tagText) {

  const selectedTagsElement = document.getElementById('selectedTags');
  const tagElements = selectedTagsElement.querySelectorAll('.selected-tag ');

  // Supprime le tag de la liste affichée
  tagElements.forEach(tagElement => {
    if (tagElement.textContent.includes(tagText)) {
      tagElement.remove();

    }
  });



  // Supprime également le tag du dropdown
const dropdownTagsIngredients = document.querySelectorAll('.ingredients .tagDropdown');

dropdownTagsIngredients.forEach(tagElement => {
  if (tagElement.textContent.includes(tagText)) {
    tagElement.remove();
  }
});
const dropdownTagsUstensils = document.querySelectorAll('.ustensils .tagDropdown');

dropdownTagsUstensils.forEach(tagElement => {
  if (tagElement.textContent.includes(tagText)) {
    tagElement.remove();
  }
});
const dropdownTagsAppliance = document.querySelectorAll('.appliance .tagDropdown');

dropdownTagsAppliance.forEach(tagElement => {
  if (tagElement.textContent.includes(tagText)) {
    tagElement.remove();
  }
});
  
  // Récupère les tags restants
  const selectedTags = document.querySelectorAll('.selected-tag');
  const selectedTagValues = Array.from(selectedTags).map(tag => normalizeTag(tag.textContent.replace('x', '')));

  // Si des tags restent sélectionnes ou s'il y a du texte dans le champ de recherche, filtre des recettes en conséquence
  if (selectedTagValues.length > 0 || document.getElementById('search-bar').value.trim() !== '') {
    const updatedFilter = allRecipes.filter(recipe => {
      const recipeTags = [
        ...(recipe.ingredients || []).map(ingredient => normalizeTag(ingredient.ingredient)),
        normalizeTag(recipe.appliance),
        ...(recipe.ustensils || []).map(ustensil => normalizeTag(ustensil))
      ];
      const recipeName = normalizeTag(recipe.name.toLowerCase());

      // Vérifie si le champ de recherche contient du texte
      const searchTextMatch = document.getElementById('search-bar').value.trim() === '' || recipeName.includes(document.getElementById('search-bar').value.trim());

      // Vérifie si les tags restants correspondent aux recettes
      return (selectedTagValues.every(tag => recipeTags.includes(tag)) && searchTextMatch);
    });

    displayRecipe(updatedFilter);
    generateTagLists(updatedFilter);
  } else {
    // Si aucun tag n'est sélectionne et qu'il n'y a pas de texte dans le champ de recherche, affichez toutes les recettes
    displayRecipe(allRecipes);
    generateTagLists(allRecipes);
  }
}

export function getSelectedTagValues() {
  const selectedTags = document.querySelectorAll('.selected-tag');
  return Array.from(selectedTags).map(tag => normalizeTag(tag.textContent.replace('x', '')));
}

export function filterRecipesByTag(allRecipes) {
  const selectedTagValues = getSelectedTagValues();
  const searchInput = document.getElementById('search-bar');
  const searchText = searchInput ? searchInput.value.trim().toLowerCase() : '';

  const filteredRecipes = allRecipes.filter(recipe => {
      const recipeTags = [
          ...recipe.ingredients.map(ingredient => normalizeTag(ingredient.ingredient)),
          normalizeTag(recipe.appliance),
          ...recipe.ustensils.map(ustensil => normalizeTag(ustensil))
      ];
      const recipeName = normalizeTag(recipe.name.toLowerCase());
      // Ajout de la recherche principale comme critère de filtrage
      const searchTextMatch = searchText === '' || recipeName.includes(searchText);

      return selectedTagValues.every(tag => recipeTags.includes(tag)) && searchTextMatch;
  });
  displayRecipe(filteredRecipes);
  // Vérifiez si des tags sont sélectionnés ou si du texte de recherche est présent
  if (selectedTagValues.length > 0 || searchText.length > 0) {
      // Générez une nouvelle liste de tags en fonction des recettes filtrées
      generateTagLists(filteredRecipes);
  }
}

export function generateTagLists(recipes) {

if (!Array.isArray(recipes) || recipes.length === 0) {

  return;
}

const categories = ['ingredients', 'appliance', 'ustensils'];

const tagsByCategory = {};

categories.forEach(category => {
  tagsByCategory[category] = new Set()
});

recipes.forEach(recipe => {
  categories.forEach(category => {

    const categoryKeywords = Array.isArray(recipe[category])
      ? recipe[category].map(subKeyword => {
          if (typeof subKeyword === 'string') {
            return subKeyword.toLowerCase();
          } else if (typeof subKeyword === 'object' && 'ingredient' in subKeyword) {
            return subKeyword.ingredient.toLowerCase();
          }
          return '';
        })
      : typeof recipe[category] === 'string'
      ? [recipe[category].toLowerCase()]
      : [];

    categoryKeywords.forEach(keywordValue => {
      tagsByCategory[category].add(keywordValue);
    });
  });
});

// Triez les tags par catégorie
categories.forEach(category => {

  tagsByCategory[category] = Array.from(tagsByCategory[category]).sort();
});

// Utilisez les tags triés pour générer les listes de tags
const tagLists = [
  document.getElementById('ingredientsTagList'),
  document.getElementById('applianceTagList'),
  document.getElementById('ustensilsTagList')
];

tagLists.forEach((tagList, index) => {
  if (tagList) {
    const relevantTags = tagsByCategory[categories[index]];
    generateTagList(tagList, relevantTags, categories[index]);
  }
});

}

function handleTagSelection(tagText, category) {
  const tagListItems = document.querySelectorAll('.tag-list li.tag');
  let isTagAdded = false; // Variable pour suivre si le tag a déjà été ajouté

  tagListItems.forEach(tagItem => {
    if (tagItem.textContent.toLowerCase() === tagText) {
      const isSelected = tagItem.classList.contains('selected');
      if (!isSelected) {
        if (!isTagAdded) { // Vérifiez si le tag n'a pas encore été ajouté
          tagItem.classList.add('selected');
          createSelectedTag(tagText);
          createSelectedTagOneDropdown(tagText, category);
          isTagAdded = true; // Marquez que le tag a été ajouté
        }
      }
      // Après avoir sélectionné ou désélectionné un tag, réexécutez filterRecipesByTag
      filterRecipesByTag(allRecipes);
    }
  });
}



function inputDropdowns() {
  const tagInputs = document.querySelectorAll('.tag-input');

  tagInputs.forEach(input => {
    const clearButton = input.nextElementSibling; // Sélectionnez le bouton de suppression qui suit immédiatement l'entrée
    clearButton.style.display = 'none'; // Masquer initialement le bouton de suppression
    input.addEventListener('input', () => {
   
      const category = input.getAttribute('data-category');
      const tagList = document.querySelector(`#${category}TagList`);
      const initialItems = Array.from(tagList.querySelectorAll('.tag'));
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
      // Afficher/masquer le bouton de suppression en fonction du contenu de l'entrée
      if (input.value.length > 0) {
        clearButton.style.display = 'block';
      } else {
        clearButton.style.display = 'none';
      }
          // Ajoutez un gestionnaire d'événements pour effacer le champ de saisie lorsque le bouton de suppression est cliqué
  clearButton.addEventListener('click', () => {
    input.value = '';
    clearButton.style.display = 'none';
    // Réinitialisez la liste d'items à sa valeur initiale
    tagList.innerHTML = '';
    initialItems.forEach(tag => {
      tagList.appendChild(tag);
      tag.style.display = 'block';
    });
  });
    });
  });
}
/**
 * Fonction qui recupere toute la liste d'items boucle desus et recupere au click le tag sélectionné
 * @param {*} params 
 */

let eventsAttached = false; // Variable de drapeau pour suivre si les événements ont été attachés

function itemsSelected() {
  if (!eventsAttached) { // Vérifiez si les événements n'ont pas encore été attachés
    const tagLists = document.querySelectorAll('.tag-list'); // Sélectionnez toutes les listes de tags
    tagLists.forEach(tagList => {
      tagList.addEventListener('click', event => {
        if (event.target.classList.contains('tag')) {
          const tagItem = event.target;
          const tagText = tagItem.textContent;
          const category = tagItem.getAttribute('data-category');
          handleTagSelection(tagText, category); 
        }
      });
    });

    eventsAttached = true; // Marquez que les événements ont été attachés pour éviter la répétition
  }
}

  /**
   * Fonction qui gére d'une manière dynamique l'affichage des recettes en fonction d'un tag, le traitement des liste de dropdowns en fonction d'un items cliquer.
   * @param {*} allRecipes 
   */
export function setupDynamicSearchTag() {
  inputDropdowns()
  itemsSelected()
}