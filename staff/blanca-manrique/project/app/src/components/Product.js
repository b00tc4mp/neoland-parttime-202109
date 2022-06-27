import { useEffect, useState, useContext } from 'react'
import { Routes, Route, useNavigate, useParams } from 'react-router-dom'
import { retrieveProduct } from '../logic'
import ListVariants from './ListVariants'
import CreateVariant from './CreateVariant'
import Variant from './Variant'
import UpdateVariant from './UpdateVariant'
import ProductDropdown from './ProductDropdown'
import Context from './Context'
import { IoCaretDown } from "react-icons/io5"
import { MdModeEditOutline } from "react-icons/md"
import './Product.css'

function Product() {
    const { supplierId, productId } = useParams()
    const { setFeedback } = useContext(Context)
    const [product, setProduct] = useState()
    const [dropdown, setDropdown] = useState(false) //🔽 por defecto desactivado
    const navigate = useNavigate()

    useEffect(() => {
        try {
            retrieveProduct(sessionStorage.token, supplierId, productId)
                .then(product => setProduct(product))
                .catch(error => setFeedback({ level: 'error', message: error.message }))
        } catch (error) {
            setFeedback({ level: 'error', message: error.message })
        }
    }, [])

    const showDropdown = () => setDropdown(!dropdown)

    return <div>
        {product ?
            <div>
                <div className='Product'>
                    <p className='Product__name'>{product.name}</p>
                    <div className='Product__actions'>
                        <IoCaretDown className='Product__icon' onClick={showDropdown} />
                        <button className='Product__returnButton' onClick={() => navigate(`/suppliers/${supplierId}`)}>Return to list products</button>
                        <MdModeEditOutline className='Product__icon' onClick={() => navigate(`/suppliers/${supplierId}/products/${productId}/update`)} />
                    </div>
                </div>

                {dropdown && <ProductDropdown product={product} />}
                
                <Routes >
                    <Route path='/' element={<ListVariants />} />
                    <Route path='/variants/:variantId/' element={<Variant />} />
                    <Route path='/variants/:variantId/update' element={<UpdateVariant onUpdated={() => navigate(`/suppliers/${supplierId}/products/${productId}/`)} />} />
                    <Route path='/variants/new-variant' element={<CreateVariant onCreated={() => navigate(`/suppliers/${supplierId}/products/${productId}/`)} />} />
                </Routes>


            </div>
            :
            <div>
                <h3>Product not found</h3>
                <button onClick={() => navigate(`/suppliers/${supplierId}`)}>Return to products</button>
            </div>
        }


    </div>

}
export default Product

