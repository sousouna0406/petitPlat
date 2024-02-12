// Import des modules
import {  generateTagLists} from '../pages/tag-systeme.js';
import { tagsIngredients , tagsUstensils , tagsAppliance ,search, removeTag} from "./search.js";

// eslint-disable-next-line no-undef
let allrecipes = recipes;

// Fonction principale pour la recherche cumulative
export function searchCumul() {
 // Génére les listes de tags initiales
  generateTagLists(allrecipes);

  // Elements du DOM
  const searchInput = document.getElementById('search-bar');
  const dropdownTagsIngredients = document.getElementById('ingredientsTagList');
  const dropdownTagsUstensils = document.getElementById('ustensilsTagList')
  const dropdownTagsAppliance = document.getElementById('applianceTagList')
  const clearButton = document.getElementById('clear-button');
  clearButton.style.display = 'none'; 


// Écouteur d'événements pour la barre de recherche
  searchInput.addEventListener('input', function () {
    const searchText = searchInput.value.trim();
    if (searchText.length >= 3) {
      search();
    }

    clearButton.style.display = 'block'; 
    clearButton.addEventListener('click', function removeTxt() {
      searchInput.value = '';
      search()
      clearButton.style.display = 'none'; 
    })
  });

 // Écouteur d'événements pour les tags d'ingrédients
dropdownTagsIngredients.addEventListener('click', function (event) {
   const items = event.target
   const txtItems = items.textContent
   tagsIngredients.push(txtItems)
   const category = items.getAttribute('data-category');
   
  search()
  createTag(txtItems , category)
  createTagOneDropdown(txtItems, category)
})

// Écouteur d'événements pour les tags  ustensiles
dropdownTagsUstensils.addEventListener('click', function (event) {
  const items = event.target
  const txtItems = items.textContent
  const category = items.getAttribute('data-category');
  tagsUstensils.push(txtItems)

search()
createTag(txtItems , category)
createTagOneDropdown(txtItems, category)
})

// Écouteur d'événements pour les tags appareils
dropdownTagsAppliance.addEventListener('click', function (event) {
const items = event.target
const txtItems = items.textContent
tagsAppliance.push(txtItems)
const category = items.getAttribute('data-category');
search()
createTag(txtItems , category)
createTagOneDropdown(txtItems, category)
})

}


// Fonction pour créer un tag 
function createTag(txtItems, category) {
const selectedTagsElement = document.getElementById('selectedTags');

const tagElement = document.createElement("span")
tagElement.classList.add('selected-tag');
tagElement.textContent = txtItems

const closeIcon1 = document.createElement('span');
closeIcon1.classList.add('close-icon');
closeIcon1.innerHTML = `<i class="fas fa-times"></i>`;
closeIcon1.addEventListener('click', () => {

removeTag(txtItems,category )
search()
});
tagElement.appendChild(closeIcon1)
selectedTagsElement.appendChild(tagElement)

const tagList = document.getElementById(`${category}TagList`);


const TxtToRemoveOnTagList = tagElement.textContent;

// Parcourir les enfants de la liste des tags
for (let i = 0; i < tagList.children.length; i++) {
  const tagElement = tagList.children[i];
  // Vérifier si le texte correspond
  if (tagElement.textContent === TxtToRemoveOnTagList) {
    tagList.removeChild(tagElement);
    break; 
  }
}
}



// Fonction pour créer un tag dans les dropdowns
export function createTagOneDropdown(txtItems, category) {
  const ingredientsTagContainer = document.getElementById('selected-tags-container-ingredients');
  const applianceTagContainer = document.getElementById('selected-tags-container-appliance');
  const ustensilsTagContainer = document.getElementById('selected-tags-container-ustensils');

  const tagElement = document.createElement('div');
  tagElement.textContent = txtItems;

    // Ajouter une croix pour supprimer le tag au premier élément
    const closeButton = document.createElement('span');
    closeButton.classList.add('close-icon');
    closeButton.innerHTML = `<i class="fas fa-times"></i>`;
    closeButton.addEventListener('click', () => {
      tagElement.remove()
      removeTag(txtItems,category )
      search()
    });
   tagElement.appendChild(closeButton);
  
  // condition pour déterminer quelle classe ajouter en fonction de la valeur de category
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
    tagElement.classList.add('tagDropdown')
    ustensilsTagContainer.appendChild(tagElement);
  } else {
    console.error(`Catégorie inconnue : ${category}`);
  }
}












