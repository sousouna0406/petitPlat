/**
 * Factory pour créer un modèle de recette à partir des données de recette fournies.
 * @param {Object} recipeData - Données de recette contenant id, image, name, servings, ingredients, time, description, appliance, ustensils.
 * @returns {Object} - Modèle de recette avec des méthodes pour générer des éléments DOM.
 */


export function recipeFactory(recipeData) {
  // Déstructuration de l'objet recipeData
  const { id, image, name, servings, ingredients, time, description, appliance, ustensils } = recipeData;

  // Chemin de l'image de la recette
  const picture = `assets/recipe/${image}`;


  // Fonction pour créer et retourner les éléments DOM de la recette.
   
  function getRecipeCardDOM() {
    // Création de l'élément principal article pour la recette
    const article = document.createElement("article");
    article.setAttribute("aria-label", `Article : Recette ${name}`);

    // Création de l'élément image pour la recette
    const img = document.createElement("img");
    img.setAttribute("src", picture);
    img.setAttribute("alt", `Photo de la recette ${name}.`);
    img.setAttribute("tabindex", "0");
    img.classList.add("img-card", "img-fluid");

    // Création et définition de l'élément de titre pour le nom de la recette
    const h2 = document.createElement("h2");
    h2.textContent = name;
    h2.setAttribute("aria-label", `Nom de la recette : ${name}`);
    h2.setAttribute("tabindex", "0");
    h2.classList.add("anto");

    // Création et définition de l'élément de titre pour le type de recette
    const h3 = document.createElement("h2");
    h3.textContent = "Recette";
    h3.setAttribute("alt", `Photo de la recette ${name}.`);
    h3.setAttribute("tabindex", "0");
    h3.classList.add("light-style");

    // Création et définition de l'élément de paragraphe pour la description de la recette
    const pDescription = document.createElement("p");
    pDescription.textContent = description;
    pDescription.setAttribute("aria-label", `Description : ${description}`);
    pDescription.setAttribute("tabindex", "0");

    // Création et définition de l'élément de titre pour la section des ingrédients de la recette
    const h3bis = document.createElement("h2");
    h3bis.textContent = "Ingrédients";
    h3bis.setAttribute("alt", `Photo de la recette ${name}.`);
    h3bis.setAttribute("tabindex", "0");
    h3bis.classList.add("light-style");

    // Création d'une div de conteneur pour les ingrédients de la recette
    const containerDiv = document.createElement("div");
    containerDiv.classList.add("nowrap");

    // Itération à travers chaque ingrédient et création d'une div pour chacun
    ingredients.forEach((ingredientData) => {
      const ingredientDiv = document.createElement("div");
      ingredientDiv.classList.add("columnF");

      // Création d'un span pour le nom de l'ingrédient
      const ingredientSpan = document.createElement("span");
      ingredientSpan.textContent = ingredientData.ingredient;
      ingredientSpan.classList.add("weight-light");
      ingredientDiv.appendChild(ingredientSpan);

      // Vérification si la quantité est définie
      if (ingredientData.quantity !== undefined) {
        // Création d'un span pour la quantité
        const quantitySpan = document.createElement("span");
        quantitySpan.textContent = `${ingredientData.quantity} ${ingredientData.unit || ""}`;
        quantitySpan.classList.add("weight-lighter");
        ingredientDiv.appendChild(quantitySpan);
      }

      // Configuration des attributs ARIA pour l'accessibilité
      ingredientDiv.setAttribute("aria-label", `${ingredientData.ingredient} - ${ingredientData.quantity} ${ingredientData.unit || ""}`);
      ingredientDiv.setAttribute("tabindex", "0");

      // Ajout de la div d'ingrédient au conteneur
      containerDiv.appendChild(ingredientDiv);
    });

    // Création et définition de l'élément de paragraphe pour le temps de préparation de la recette
    const pTime = document.createElement("p");
    pTime.textContent = `${time}min`;
    pTime.setAttribute("aria-label", `Temps de préparation : ${time} minutes`);
    pTime.setAttribute("tabindex", "0");
    pTime.classList.add("times");

    // Ajout de tous les éléments à l'article
    article.appendChild(img);
    article.appendChild(pTime);
    article.appendChild(h2);
    article.appendChild(h3);
    article.appendChild(pDescription);
    article.appendChild(h3bis);
    article.appendChild(containerDiv);

    // Retourne l'article en tant qu'élément DOM
    return article;
  }

  // Retourne un objet avec les données de recette, le chemin de l'image et la fonction pour obtenir les éléments DOM
  return {
    recipeData,
    picture,
    getRecipeCardDOM,
  };
}
