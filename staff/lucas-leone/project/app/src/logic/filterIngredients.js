export default function filterIngredients(query, ingredients) {
    let ingredientsFilter = ingredients
    ingredientsFilter = ingredients.filter(ingredient => ingredient.name.toLowerCase().includes(query.toLowerCase()))
           
    return ingredientsFilter
        }