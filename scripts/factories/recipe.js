export function recipeFactory(recipeData) {
    const { id, image, name, servings, ingredients, time, description, appliance, ustensils } = recipeData;
  
    const picture = `assets/recipe/${image}`;
    // Fonction qui crée et retourne les éléments DOM de la recette
    function getRecipeCardDOM() {
      const article = document.createElement("article");
      article.setAttribute("aria-label", `Article : Recette ${name}`);
  
      const img = document.createElement("img");
      img.setAttribute("src", picture);
      img.setAttribute("alt", `Photo de la recette ${name}.`);
      img.setAttribute("tabindex", "0");
      img.classList.add("img-card", "img-fluid");
  
      const h2 = document.createElement("h2");
      h2.textContent = name;
      h2.setAttribute("aria-label", `Nom de la recette : ${name}`);
      h2.setAttribute("tabindex", "0");
      h2.classList.add("anto")
      
      const h3 = document.createElement("h2");
      h3.textContent = "Recette"
      h3.setAttribute("alt", `Photo de la recette ${name}.`);
      h3.setAttribute("tabindex", "0");
      h3.classList.add("light-style")

      const pDescription = document.createElement("p");
      pDescription.textContent = description;
      pDescription.setAttribute("aria-label", `Description : ${description}`);
      pDescription.setAttribute("tabindex", "0");

      const h3bis = document.createElement("h2");
      h3bis.textContent = "Ingredients"
      h3bis.setAttribute("alt", `Photo de la recette ${name}.`);
      h3bis.setAttribute("tabindex", "0");
      h3bis.classList.add("light-style")

      const containerDiv = document.createElement("div");
      containerDiv.classList.add("nowrap")
      ingredients.forEach((ingredientData) => {
        const ingredientDiv = document.createElement("div"); // Créer une div pour chaque ingrédient
      ingredientDiv.classList.add("columnF")
        // Créer le span pour l'ingrédient
        const ingredientSpan = document.createElement("span");
        ingredientSpan.textContent = ingredientData.ingredient;
        ingredientDiv.appendChild(ingredientSpan); // Ajouter le span de l'ingrédient à la div
        ingredientSpan.classList.add("weight-light")
        // Vérifier si la quantité est définie
        if (ingredientData.quantity !== undefined) {
          // Créer le span pour la quantité
          const quantitySpan = document.createElement("span");
          quantitySpan.textContent = `${ingredientData.quantity} ${ingredientData.unit || ""}`;
          quantitySpan.classList.add("weight-lighter")
          ingredientDiv.appendChild(quantitySpan); // Ajouter le span de la quantité à la div
        }
      
        ingredientDiv.setAttribute("aria-label", `${ingredientData.ingredient} - ${ingredientData.quantity} ${ingredientData.unit || ""}`);
        ingredientDiv.setAttribute("tabindex", "0");
        containerDiv.appendChild(ingredientDiv); // Ajouter la div de l'ingrédient au conteneur
      });
  
      const pTime = document.createElement("p");
      pTime.textContent = `${time}min`;
      pTime.setAttribute("aria-label", `Temps de préparation : ${time} minutes`);
      pTime.setAttribute("tabindex", "0");
      pTime.classList.add("times")
  

     
      article.appendChild(img);
     
      article.appendChild(pTime);
      article.appendChild(h2);
   
      article.appendChild(h3)
      article.appendChild(pDescription);
  
      article.appendChild(h3bis)
      article.appendChild(containerDiv);
      
      
      
  
      return article;
    }
  
    return {
     recipeData,
     picture,
      getRecipeCardDOM,
    };
  }
  