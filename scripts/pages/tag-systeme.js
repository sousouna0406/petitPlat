
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


export function inputDropdowns() {
  const tagInputs = document.querySelectorAll('.tag-input');

  tagInputs.forEach(input => {
    const clearButton = input.nextElementSibling; 
    clearButton.style.display = 'none'; 
    input.addEventListener('input', (event) => {

   
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
          // Ajoute un gestionnaire d'événements pour effacer le champ de saisie lorsque le bouton de suppression est cliqué
  clearButton.addEventListener('click', (event) => {
    input.value = '';
    clearButton.style.display = 'none';
    tagList.innerHTML = '';
    initialItems.forEach(tag => {
      tagList.appendChild(tag);
      tag.style.display = 'block';
    });
  });
    });
  });
}


inputDropdowns()