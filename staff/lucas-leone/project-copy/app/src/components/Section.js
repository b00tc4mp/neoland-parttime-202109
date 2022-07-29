import './Section.css'
import { useEffect } from "react"
import { retrieveItemsFromSection } from "../logic"
import { useState } from "react"
import { useContext } from 'react'
import Context from './Context'

export default function ({ section: { name, items }, listPrice }) {

    const { setFeedback } = useContext(Context)
    const [itemsStorage, setItemsStorage] = useState([])
    const [itemIngredient, setItemIngredient] = useState()

    //TO DO RETRIEVE TOFOS LOS ITEMS MOSTRARLOS Y AGREGAR EL ID AL ARRAY DE LA SECTION
    useEffect(() => {
        retrieveItems()
    }, [])

    const retrieveItems = () => {
        try {
            retrieveItemsFromSection(sessionStorage.token, items)
                .then(items => {
                    setItemsStorage(items)
                    const ingredientStorage = []
                    items.map(item =>
                        item.ingredients.map(ingredient =>
                            ingredientStorage.push(ingredient.name)
                        ))
                    setItemIngredient(ingredientStorage)
                }
                )
                .catch((error) => setFeedback({ level: 'info', message: error.message }))
        } catch (error) {
            setFeedback({ level: 'info', message: error.message })
        }
    }
// TO CREATE A LIST WITH ',' AND 'AND' LIKE 1,2,3 AND 4 FROM ARRAY
    const formatter = new Intl.ListFormat('en', { style: 'long', type: 'conjunction' })

    return <div >
        <h2 className='Section__title'>{name}</h2>

        <ul>
            {itemsStorage ? itemsStorage.map(item =>
                <li >
                    <div className='Section__item' >
                        <div className='Section__itemTiltle'>
                            <h3 className='Section_itemName'>{item.name}</h3>
                            <p>
                                {formatter.format(itemIngredient)}
                            </p>
                        </div>
                        <div className='Section__info'>
                            <div className='Section__categories'>
                                <h4>Categories</h4>
                                <ul className='Section__subItems'>
                                    {item.categories.map(category =>
                                        <li>{category.name}</li>
                                    )}
                                </ul>
                            </div>
                            <div className='Section__allergens'>
                                <h4>Allergens</h4>
                                <ul className='Section__subItems'>
                                    {item.allergens.map(allergen =>
                                        <li>{allergen.name}</li>
                                    )}
                                </ul>
                            </div>
                        </div>
                        <div className='Section__itemImagePrice'>
                            {item.image && <img className='Section_itemImage' src={item.image} alt='image' />}
                            {!listPrice && <p className='Section__itemPrice'>${item.price}</p>}
                        </div>
                    </div>
                </li>
            ) : <p>no items</p>}
        </ul>

    </div>


}