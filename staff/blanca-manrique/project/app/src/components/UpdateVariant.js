import { useEffect, useState, useContext } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import { retrieveVariant, updateVariant } from '../logic'
import { IoChevronBackOutline, IoSave } from "react-icons/io5"
import './UpdateVariant.css'
import Context from './Context'

function UpdateVariant({ onUpdated }) {
    const { supplierId, productId, variantId } = useParams()
    const { setFeedback } = useContext(Context)
    const [variant, setVariant] = useState()
    const navigate = useNavigate()

    useEffect(() => {
        try {
            retrieveVariant(sessionStorage.token, supplierId, productId, variantId)
                .then(variant => setVariant(variant))
                .catch(error => setFeedback({ level: 'error', message: error.message }))
        } catch (error) {
            setFeedback({ level: 'error', message: error.message })
        }
    }, [])

    const handleUpdateVariant = event => {
        event.preventDefault()
        const { target: {
            size: { value: size },
            color: { value: color },
            stockOnHand: { value: stockOnHand },
            criticalStock: { value: criticalStock }
        } } = event

        try {
            updateVariant(sessionStorage.token, supplierId, productId, variantId, size, color, parseInt(stockOnHand), parseInt(criticalStock))
                .then(() => {
                    onUpdated()
                })
                .catch(error => setFeedback({ level: 'error', message: error.message }))
        } catch (error) {
            setFeedback({ level: 'error', message: error.message })
        }
    }

    const goBack = () => {
        navigate(`/suppliers/${supplierId}/products/${productId}/variants/${variantId}`)
    }

    return <div className='UpdateVariant'>
        <div className='UpdateVariant-header'>
            <IoChevronBackOutline className='UpdateVariant__iconBack' onClick={goBack} />
            <h1 className='UpdateVariant__title'>Update variant</h1>
        </div>
        {variant ?

            <form className='UpdateVariant__form' onSubmit={handleUpdateVariant}>

                <label className='UpdateVariant__label'>Variant size</label>
                <input className='UpdateVariant__input' type='text' name='size' placeholder='size' defaultValue={variant.size} />

                <label className='UpdateVariant__label'>Variant color</label>
                <input className='UpdateVariant__input' type='text' name='color' placeholder='color' defaultValue={variant.color} />

                <label className='UpdateVariant__label'>Stock on hand</label>
                <input className='UpdateVariant__input' type='text' name='stockOnHand' placeholder='stock' defaultValue={variant.stockOnHand} />

                <label className='UpdateVariant__label'>Critical stock</label>
                <input className='UpdateVariant__input' type='text' name='criticalStock' placeholder='critical stock' defaultValue={variant.criticalStock} />

                <button type='submit' className='UpdateVariant__btn btn-hover'>Save <IoSave className='UpdateVariant__btn-icon btn-hover' /></button>
            </form>
            : <p>There is not variant to update</p>
        }
    </div>
}

export default UpdateVariant