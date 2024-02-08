
import {  generateTagLists} from '../pages/tag-systeme.js';
import { tagsIngredients , tagsUstensils , tagsAppliance ,search, removeTag} from "./search.js";

let allrecipes = recipes;


export function searchCumul() {
  generateTagLists(allrecipes);

  const searchInput = document.getElementById('search-bar');
  const dropdownTagsIngredients = document.getElementById('ingredientsTagList');
  const dropdownTagsUstensils = document.getElementById('ustensilsTagList')
  const dropdownTagsAppliance = document.getElementById('applianceTagList')
  const clearButton = document.getElementById('clear-button');
  clearButton.style.display = 'none'; 
  console.log('Initialisation de la recherche cumulée.');
  
  searchInput.addEventListener('input', function (event) {

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

dropdownTagsIngredients.addEventListener('click', function (event) {
   const items = event.target
   const txtItems = items.textContent
   tagsIngredients.push(txtItems)
   const category = items.getAttribute('data-category');
   
  search()
  createTag(txtItems , category)
  createTagOneDropdown(txtItems, category)
})

dropdownTagsUstensils.addEventListener('click', function (event) {
  const items = event.target
  const txtItems = items.textContent
  const category = items.getAttribute('data-category');
  tagsUstensils.push(txtItems)

search()
createTag(txtItems , category)
createTagOneDropdown(txtItems, category)
})

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

function createTag(txtItems, category) {
const selectedTagsElement = document.getElementById('selectedTags');
console.log("item cliqué");
const tagElement = document.createElement("span")
tagElement.classList.add('selected-tag');
tagElement.textContent = txtItems

const closeIcon1 = document.createElement('span');
closeIcon1.classList.add('close-icon');
closeIcon1.innerHTML = `<i class="fas fa-times"></i>`;
closeIcon1.addEventListener('click', () => {
console.log('here');
removeTag(txtItems,category )
search()
});
tagElement.appendChild(closeIcon1)
selectedTagsElement.appendChild(tagElement)

const tagList = document.getElementById(`${category}TagList`);
console.log(tagList);

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
    closeButton.addEventListener('click', (event) => {
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












