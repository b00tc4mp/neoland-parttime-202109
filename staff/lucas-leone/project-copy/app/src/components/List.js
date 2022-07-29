import './List.css'
import Section from "./Section"

export default function ({ list: { name, description, sections, price } }) {

    return <div className='List' >
        <div className='List__info'>
            <h1 className='List__title'>{name}</h1>
            <p className='List__description'>{description}</p>
        </div>
        {sections ? sections.map(section => <div>
            <Section section={section} listPrice={price} />
        </div>) : <p>no sections</p>}
        {price && <p className='List__price'>${price}</p>}

    </div>


}