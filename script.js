document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("recipe-form");
    const recipeList = document.getElementById("recipe-list");
    const filter = document.getElementById("filter");

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("recipe-name").value;
        const ingredients = document.getElementById("ingredients").value;
        const category = document.getElementById("category").value;
        const steps = document.getElementById("steps").value;

        const recipe = { name, ingredients, category, steps };
        saveRecipe(recipe);
        displayRecipes();
        form.reset();
    });

    filter.addEventListener("change", displayRecipes);

    function saveRecipe(recipe) {
        let recipes = JSON.parse(localStorage.getItem("recipes")) || [];
        recipes.push(recipe);
        localStorage.setItem("recipes", JSON.stringify(recipes));
    }

    function displayRecipes() {
        recipeList.innerHTML = "";
        const recipes = JSON.parse(localStorage.getItem("recipes")) || [];
        const selectedCategory = filter.value;

        recipes
            .filter(recipe => selectedCategory === "All" || recipe.category === selectedCategory)
            .forEach(recipe => {
                const div = document.createElement("div");
                div.classList.add("recipe-card");
                div.innerHTML = `
                    <h3><b><i><u>${recipe.name}</u></i></b></h3>
                    <p><strong>Category:</strong> ${recipe.category}</p>
                    <p><strong>Ingredients:</strong> ${recipe.ingredients}</p>
                    <p><strong>Steps:</strong> ${recipe.steps}</p>
                `;
                recipeList.appendChild(div);
            });
    }

    displayRecipes();
});