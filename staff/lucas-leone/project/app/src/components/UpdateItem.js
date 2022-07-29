import './Update.css'
import './x.css'
import { updateItem, retrieveAllergens, retrieveCategories, retrieveIngredients, retrieveItem, filterIngredients } from "../logic"
import { useState, useEffect, useContext } from "react"
import { useParams, useNavigate } from "react-router-dom"
import Context from './Context'


export default () => {
    //GENERAL CONTROLS
    const { setFeedback } = useContext(Context)
    const [item, setItem] = useState()
    const [controls, setControls] = useState(true)
    const navigate = useNavigate()
    const params = useParams()
    const { listId, sectionId, itemId } = params

    //ITEM INFORMATION
    const [itemCategories, setItemCategories] = useState()
    const [itemAllergens, setItemAllergens] = useState()
    const [itemIngredients, setItemIngredients] = useState()
    const [imageB64, setImageB64] = useState()

    //ALLERGENS INGREDIENTS ANDCATEGORIES
    const [allergens, setAllergens] = useState()
    const [ingredients, setIngredients] = useState()
    const [categories, setCategories] = useState()
    const [ingredientsFiltered, setIngredientsFiltered] = useState()

    useEffect(() => {
        detailItem()
        allCategories()
        allIngredients()
        allAllergens()
    }, [])

    const detailItem = () => {
        try {
            retrieveItem(sessionStorage.token, itemId)
                .then(item => {
                    setItem(item)
                    setImageB64(item.image)
                    setItemAllergens(item.allergens)
                    setItemCategories(item.categories)
                    setItemIngredients(item.ingredients)
                })
                .catch((error) => setFeedback({ level: 'info', message: error.message }))
        } catch (error) {
            setFeedback({ level: 'info', message: error.message })

        }
    }
    //OBTAIN ALL INGREDIENTS, ALLERGENS AND INGREDIENTS
    const allCategories = () => {
        try {
            retrieveCategories(sessionStorage.token)
                .then(setCategories)
                .catch((error) => setFeedback({ level: 'info', message: error.message }))
        } catch (error) {
            setFeedback({ level: 'info', message: error.message })
        }
    }

    const allIngredients = () => {
        try {
            retrieveIngredients(sessionStorage.token)
                .then(ingredients => setIngredients(ingredients))
                .catch((error) => setFeedback({ level: 'info', message: error.message }))
        } catch (error) {
            setFeedback({ level: 'info', message: error.message })
        }
    }

    const allAllergens = () => {
        try {
            retrieveAllergens(sessionStorage.token)
                .then(allergens => setAllergens(allergens))
                .catch((error) => setFeedback({ level: 'info', message: error.message }))
        } catch (error) {
            setFeedback({ level: 'info', message: error.message })
        }
    }
    //WHEN DETECT CHANGES THIS MODIFY THE STATE WITH THE NEW DATA
    const handleOnChangeCategory = (category) => {
        const categoryIndex = item.categories.findIndex(_category => _category.name === category.name)

        if (categoryIndex < 0) {
            item.categories.push(category)

        } else { item.categories.splice(categoryIndex, 1) }
        setItemCategories(item.categories)
    }

    const handleOnChangeAllergen = (allergen) => {
        const allergenIndex = item.allergens.findIndex(_allergen => _allergen.name === allergen.name)

        if (allergenIndex < 0) {
            item.allergens.push(allergen)
        } else {
            item.allergens.splice(allergenIndex, 1)
        }
        setItemAllergens(item.allergens)
    }

    const handleOnChangeIngredient = (ingredient) => {

        const ingredientIndex = item.ingredients.findIndex(_ingredient => _ingredient.name === ingredient.name)

        if (ingredientIndex < 0) {
            item.ingredients.push(ingredient)
        } else {
            item.ingredients.splice(ingredientIndex, 1)
        }
        setItemIngredients(item.ingredients)
    }

    const handleUploadB64 = event => {

        const file = event.target.files[0]

        const fileReader = new FileReader

        fileReader.readAsDataURL(file)

        fileReader.onload = event => {
            setImageB64(event.target.result)
        }
    }

    const handleSave = event => {
        event.preventDefault()

        const { target: { name: { value: name }, price: { value: price } } } = event

        const itemIdCategories = []
        itemCategories.map(item => itemIdCategories.push(item.id))

        const itemIdIngredients = []
        itemIngredients.map(item => itemIdIngredients.push(item.id))

        const itemIdAllergens = []
        itemAllergens.map(item => itemIdAllergens.push(item.id))

        const numberPrice = parseFloat(price)
        try {
            updateItem(sessionStorage.token, listId, sectionId, itemId, name, itemIdCategories, itemIdIngredients, itemIdAllergens, numberPrice, imageB64)
                .then(() => {
                    navigate(`/`)
                })
                .catch(error => setFeedback({ level: 'info', message: error.message }))

        } catch (error) {
            setFeedback({ level: 'info', message: error.message })
        }
    }
//THE FILTER FOR INGREDIENTS WITH LOGIC
    const queryIngredients = (query) => {
        setIngredientsFiltered(filterIngredients(query, ingredients))
    }

    const handleControl = () => {
        setControls(!controls)

    }
    const handleGoBack = () => {
        navigate(`/list/${listId}/section/${sectionId}`)
    }

    return <div className='updateItem' >
        {allergens && categories && ingredients && item ? <>
            {controls ? <>
                <button className='x' onClick={handleGoBack}>x</button>
                <h1 className='updateSection_title'>Update Item</h1>
                <form className='updateSection__form' onSubmit={handleSave}>
                    <input className='updateSection__input' type="text" name="name" defaultValue={item.name} placeholder='Name' ></input>
                    <h4 className='updateSection_subTitle updateItem__subTitle' >Image</h4>
                    <input type="file" name="image" onChange={handleUploadB64} />
                    {imageB64 && <img className='updateItem__image' src={imageB64} />}
                    <input className='updateSection__input ' type="number" name="price" defaultValue={item.price} placeholder='Price' ></input>
                    <div>
                        <h4 className='updateSection_subTitle updateItem__subTitle' >Categories</h4>
                        {categories && categories.map(category => <><input className='Update__checkbox' type="checkbox" name="categories" defaultValue={category.id} onChange={() => handleOnChangeCategory(category)} defaultChecked={item.categories.some(_category => _category.name === category.name)} />{category.name}</>)}
                    </div>
                    <div>
                        <h4 className='updateSection_subTitle updateItem__subTitle'>Allergens</h4>
                        {allergens && allergens.map(allergen => <><input type="checkbox" name="allergens" defaultValue={allergen.id} onChange={() => handleOnChangeAllergen(allergen)} defaultChecked={item.allergens.some(_allergen => _allergen.name === allergen.name)} />{allergen.name}</>)}
                    </div>
                    <h4 className='updateSection_subTitle'>Ingredients</h4>
                    <ul>{item.ingredients.map(ingredient =>
                        <li className='Update__ingredients'>{ingredient.name}</li>)}
                    </ul>
                    <button className='updateSection__subButton Create__subtitle-margin' onClick={handleControl}>Edit ingredients</button>


                    <button className='updateItem__submit' type="submit">Save</button>
                </form>

            </> : <div className='UpdateIngredients'>
                <button className='x' onClick={handleControl}>x</button>
                <div className='Update_ingredientsContenedor'>
                    <h4 className='updateSection_subTitle'>Ingredients</h4>
                    <ul>{item.ingredients.map(ingredient =>
                        <li className='Create__ingredients'><><input type="checkbox" name="ingredients" defaultValue={ingredient.id} onChange={() => handleOnChangeIngredient(ingredient)} defaultChecked={item.ingredients.some(_ingredient => _ingredient.name === ingredient.name)} />{ingredient.name}</></li>)}
                    </ul>

                    <h4 className='updateSection_subTitle'>Buscador de ingredients</h4>

                    <input className='updateSection__input' type="text" name="query" placeholder='Text' onChange={(event) => { queryIngredients(event.target.value) }}></input>
                    {ingredientsFiltered ? <ul>{ingredientsFiltered.map(ingredientFiltered =>
                        <li><><input type="checkbox" name="ingredients" defaultValue={ingredientFiltered.id} onChange={() => handleOnChangeIngredient(ingredientFiltered)} defaultChecked={item.ingredients.some(_ingredient => _ingredient.name === ingredientFiltered.name)} />{ingredientFiltered.name}</></li>)}
                    </ul>

                        : <></>}
                    <button className='updateItem__submit updateItem__done' onClick={handleControl}>Done</button>
                </div>
            </div>}

        </> : <></>}
    </div>
}