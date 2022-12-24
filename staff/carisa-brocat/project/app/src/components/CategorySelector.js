import './CategorySelector.css'
import { useState } from 'react'


export default ({ onCategorySelected }) => {
    const [selected, setSelected] = useState('')

    const handleSelected = (category) => {
        if (category !== selected) {
            setSelected(category)
        }
        else {
            setSelected('')
            category = ''
        }

        onCategorySelected(category)
    }

    return <div className='Category'>
        <div className='Category Category__at-left'>
            <div className={`${selected === 'product' ? 'Category__button  Category__button--selected' : 'Category__button'}`} onClick={() => handleSelected('product')} ><img src="./images/productIcon.png"/></div>
            <div className={`${selected === 'question' ? 'Category__button Category__button--selected' : 'Category__button'}`} onClick={() => handleSelected('question')} >?</div>
        </div>
        <div className='Category Category__at-rigth'>
            <div className={`${selected === 'space' ? 'Category__button Category__button--selected' : 'Category__button'}`} onClick={() => handleSelected('space')} ><img src="./images/spaceIcon.png"/></div>
            <div className={`${selected === 'other' ? 'Category__button Category__button--selected' : 'Category__button'}`} onClick={() => handleSelected('other')} >Others</div>
        </div>
    </div>
}

