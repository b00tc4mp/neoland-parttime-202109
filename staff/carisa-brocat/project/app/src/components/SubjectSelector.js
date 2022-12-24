import './SubjectSelector.css'
import { useState } from 'react'


export default ({ onSubjectSelected }) => {
    const [selected, setSelected] = useState('')

    const handleSelected = (subject) => {
        setSelected(subject)

        onSubjectSelected(subject)
    }

    return <div className="Subject">
        <div className={`${selected === '' ? 'Subject__button Subject__button--selected' : 'Subject__button'}`} onClick={() => handleSelected('')} >All</div>
        <div className={`${selected === 'moisture' ? 'Subject__button Subject__button--selected' : 'Subject__button'}`} onClick={() => handleSelected('moisture')} >Most</div>
        <div className={`${selected === 'definition' ? 'Subject__button Subject__button--selected' : 'Subject__button'}`} onClick={() => handleSelected('definition')} >Def</div>
        <div className={`${selected === 'restore' ? 'Subject__button Subject__button--selected' : 'Subject__button'}`} onClick={() => handleSelected('restore')} >Rest</div>
        <div className={`${selected === 'growth' ? 'Subject__button Subject__button--selected' : 'Subject__button'}`} onClick={() => handleSelected('growth')} >Grow</div>
        <div className={`${selected === 'strength' ? 'Subject__button Subject__button--selected' : 'Subject__button'}`} onClick={() => handleSelected('strength')} >Stre</div>
    </div>
}
