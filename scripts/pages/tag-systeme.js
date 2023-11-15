import { displayRecipe } from '../pages/index.js';



console.log(recipes);
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
        tagItem.textContent = keyword;
        tagList.appendChild(tagItem);
    });
}
function createSelectedTag(tagText) {
  let category = ['ingredients', 'appliance', 'ustensils']
  console.log(category);
  console.log('Fonction createSelectedTag appelée avec tagText:', tagText);

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
    closeIcon1.textContent = 'x';
    closeIcon1.addEventListener('click', (event) => {
      const tagText = event.currentTarget.parentElement.textContent.replace('x', '').trim();
      console.log('Clic sur l\'icône de suppression');
      console.log('tagText avant la suppression :', tagText);
      console.log(tagText);
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

    console.log('Tag ajouté avec succès:', tagText);
  }
} 

function createSelectedTagOneDropdown(tagText, category) {

 console.log(tagText);

  const tagContainer = document.getElementById(`selected-tags-container-${category}`);
  console.log(tagContainer);
  console.log();
  const tagElement = document.createElement('div');
  tagElement.classList.add(`tag-${category}`); 
  tagElement.textContent = tagText;
  tagContainer.appendChild(tagElement);

  console.log(`Tag créé dans la catégorie ${category}: ${tagText}`);
}

const dropdowns = document.querySelectorAll('.dropdown');
console.log(dropdowns);

dropdowns.forEach(dropdown => {
  dropdown.addEventListener('click', (event) => {
  
    console.log(event);
    const tagElement = dropdown.querySelector('.tag');
    console.log(`Dropdown clic: ${event.target.innerHTML}`);
    
    console.log(`Tag actuel dans ce dropdown: ${tagElement.textContent}`);
    console.log(tagElement);
    const tagText = event.target.innerHTML;
    console.log(`Texte du tag sélectionné: ${tagText}`);
    console.log(tagElement.textContent);
    if (event.target.innerHTML === tagElement.textContent) {
      console.log("HERE");
      const selectedTag = event.target.textContent;
      console.log(`Tag sélectionné: ${selectedTag}`);
      const category = dropdown.getAttribute('data-category');
      console.log(`Catégorie du dropdown: ${category}`);
      createSelectedTagOneDropdown(selectedTag, category);
    }
  });
});



export function removeTagFromSelectedList(tagText) {
  console.log('TagText à supprimer:', tagText); // Vérifiez la valeur de tagText


  const selectedTagsElement = document.getElementById('selectedTags');
  const tagElements = selectedTagsElement.querySelectorAll('.selected-tag');

  // Supprime le tag de la liste affichée
  tagElements.forEach(tagElement => {
    if (tagElement.textContent.includes(tagText)) {
      tagElement.remove();
      console.log('Tag supprimé de la liste affichée.');
    }
  });

  // Supprime également le tag du dropdown
  const dropdownTags = document.querySelectorAll('.selected-tag.dropdown-tag');
dropdownTags.forEach(tagElement => {
  console.log(tagElement);
  if (tagElement.textContent.includes(tagText)) {
    tagElement.remove();
    console.log('Tag supprimé du dropdown.');
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

    console.log('Tags restants:', selectedTagValues);
    console.log('Recherche principale:', document.getElementById('search-bar').value.trim());
    console.log('Recettes filtrées mises à jour:', updatedFilter);
    displayRecipe(updatedFilter);
    generateTagLists(updatedFilter);
  } else {
    // Si aucun tag n'est sélectionne et qu'il n'y a pas de texte dans le champ de recherche, affichez toutes les recettes
    console.log('Aucun tag sélectionné et pas de texte dans la recherche. Afficher toutes les recettes.');
    displayRecipe(allRecipes);
    generateTagLists(allRecipes);
  }
}


function handleTagSelection(tagText) {
  const tagListItems = document.querySelectorAll('.tag-list li.tag');
  tagListItems.forEach(tagItem => {
    if (tagItem.textContent.toLowerCase() === tagText) {
      const isSelected = tagItem.classList.contains('selected');
      
      if (!isSelected) {
   
        console.log('Tag sélectionné:', tagText);
        tagItem.classList.add('selected');
        createSelectedTag(tagText);
       const categories = ['ingredients', 'appliance', 'ustensils'];

        // Appeler la fonction pour chaque catégorie
        categories.forEach(category => {
          console.log(category);
          createSelectedTagOneDropdown(tagText, category);
        });
      } 
      // Après avoir sélectionné ou désélectionné un tag, réexécutez filterRecipesByTag
      filterRecipesByTag(allRecipes);
    }
  });
}

  
export function setupDynamicSearchTag(allRecipes) {
  const tagInputs = document.querySelectorAll('.tag-input');

  tagInputs.forEach(input => {
    const clearButton = input.nextElementSibling; // Sélectionnez le bouton de suppression qui suit immédiatement l'entrée

    clearButton.style.display = 'none'; // Masquer initialement le bouton de suppression

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

      // Afficher/masquer le bouton de suppression en fonction du contenu de l'entrée
      if (input.value.length > 0) {
        clearButton.style.display = 'block';
      } else {
        clearButton.style.display = 'none';
      }
    });

    // Ajoutez un gestionnaire d'événements pour effacer le champ de saisie lorsque le bouton de suppression est cliqué
    clearButton.addEventListener('click', () => {
      input.value = '';
      clearButton.style.display = 'none';
    });
  });

  // Gestion des clics sur les tags
  const tagLists = document.querySelectorAll('.tag-list'); // Sélectionnez toutes les listes de tags

  tagLists.forEach(tagList => {
    tagList.addEventListener('click', event => {
      if (event.target.classList.contains('tag')) {
        const tagItem = event.target;
        const tagText = tagItem.textContent;
        console.log('Tag sélectionné:', tagText);
        handleTagSelection(tagText);
      }
    });
  });
}


export function getSelectedTagValues() {
    const selectedTags = document.querySelectorAll('.selected-tag');
    
    console.log(Array.from(selectedTags).map(tag => normalizeTag(tag.textContent.replace('x', '').trim())));
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

    console.log('Recettes filtrées par tag - Résultat:', filteredRecipes);

    displayRecipe(filteredRecipes);

    // Vérifiez si des tags sont sélectionnés ou si du texte de recherche est présent
    if (selectedTagValues.length > 0 || searchText.length > 0) {
        // Générez une nouvelle liste de tags en fonction des recettes filtrées
        generateTagLists(filteredRecipes);
    }
}

export function generateTagLists(recipes) {
  console.log('Début de la génération des listes de tags.');

  if (!Array.isArray(recipes) || recipes.length === 0) {

    return;
  }

  const categories = ['ingredients', 'appliance', 'ustensils'];
 
  const tagsByCategory = {};

  categories.forEach(category => {
    tagsByCategory[category] = new Set()
    console.log( tagsByCategory[category]);
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
    console.log( tagsByCategory[category]);
  });

  // Utilisez les tags triés pour générer les listes de tags
  const tagLists = [
    document.getElementById('ingredientsTagList'),
    document.getElementById('applianceTagList'),
    document.getElementById('ustensilsTagList')
  ];

  tagLists.forEach((tagList, index) => {
    if (tagList) {
      console.log(tagList);
      const relevantTags = tagsByCategory[categories[index]];
      generateTagList(tagList, relevantTags, categories[index]);
      console.log(`Liste de tags générée pour la catégorie ${categories[index]}:`, relevantTags);
    }
  });

  console.log('Fin de la génération des listes de tags.');
}

