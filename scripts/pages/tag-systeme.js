
// Fonction pour normaliser une chaîne de caractères (enlever les accents)
export function normalizeTag(tagValue) {
  if (typeof tagValue === 'string') {
    // Remplacement des caractères accentués par leurs équivalents non accentués
    return tagValue
      .toLowerCase()
      .normalize("NFD") // Normalisation Unicode pour les caractères accentués
      .replace(/[\u0300-\u036f]/g, ""); // Supprime les caractères diacritiques (accents)
  } else {
    return ''; // Retourne une chaîne vide ou un autre traitement approprié pour les valeurs non définies
  }
}

// Fonction pour générer une liste de tags dans un élément de liste (ul)
export function generateTagList(tagList, keywords, category) {
  tagList.innerHTML = '';
  keywords.forEach(keyword => {
    const tagItem = document.createElement('li');
    tagItem.classList.add('tag');
    tagItem.setAttribute('data-category', category);
    tagItem.textContent = keyword;
    tagList.appendChild(tagItem);
  });
}

// Fonction pour générer les listes de tags pour chaque catégorie
export function generateTagLists(recipes) {
  if (!Array.isArray(recipes) || recipes.length === 0) {
    return;
  }

  const categories = ['ingredients', 'appliance', 'ustensils'];

  // Structure de données pour stocker les tags par catégorie
  const tagsByCategory = {};

  // Initialiser les ensembles de tags pour chaque catégorie
  categories.forEach(category => {
    tagsByCategory[category] = new Set();
  });

  // Parcourir les recettes pour extraire les tags
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

      // Ajouter les tags de la catégorie actuelle à l'ensemble
      categoryKeywords.forEach(keywordValue => {
        tagsByCategory[category].add(keywordValue);
      });
    });
  });

  // Trier les tags par catégorie
  categories.forEach(category => {
    tagsByCategory[category] = Array.from(tagsByCategory[category]).sort();
  });

  // Utiliser les tags triés pour générer les listes de tags
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

// Fonction pour gérer les saisies dans les champs de tags
export function inputDropdowns() {
  const tagInputs = document.querySelectorAll('.tag-input');

  tagInputs.forEach(input => {
    const clearButton = input.nextElementSibling;
    clearButton.style.display = 'none';

    input.addEventListener('input', () => {
      // Récupérer la catégorie de la liste de tags associée à l'input
      const category = input.getAttribute('data-category');
      const tagList = document.querySelector(`#${category}TagList`);
      const initialItems = Array.from(tagList.querySelectorAll('.tag'));
      const allTags = Array.from(tagList.querySelectorAll('.tag'));

      // Normaliser la recherche pour la correspondance des tags
      const searchQuery = normalizeTag(input.value.trim().toLowerCase());

      // Filtrer les tags visibles en fonction de la recherche
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

      // Ajouter un gestionnaire d'événements pour effacer le champ de saisie lorsque le bouton de suppression est cliqué
      clearButton.addEventListener('click', () => {
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


inputDropdowns();
