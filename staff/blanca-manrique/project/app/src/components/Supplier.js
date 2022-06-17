import { useEffect, useState } from 'react'
import { Routes, Route, useNavigate, useParams, Link } from 'react-router-dom'
import { retrieveSupplier } from '../logic'
import ListProducts from './ListProducts'
import CreateProduct from './CreateProduct'
import Product from './Product'
import UpdateProduct from './UpdateProduct'
import SupplierDropdown from './SupplierDropdown'
import { IoChevronBackOutline, IoCaretDown } from "react-icons/io5"
import { MdModeEditOutline } from "react-icons/md"
import './Supplier.css'


function Supplier() {
    const { supplierId } = useParams()
    const [supplier, setSupplier] = useState()
    const [dropdown, setDropdown] = useState(false) //🔽 por defecto desactivado
    const navigate = useNavigate()

    useEffect(() => {
        try {
            retrieveSupplier(sessionStorage.token, supplierId)
                .then(supplier => setSupplier(supplier))
                .catch(error => alert(error.message))
        } catch (error) {
            alert(error.message)
        }
    }, [])

    const showDropdown = () => setDropdown(!dropdown)
    const handleGoBack= () => navigate('/suppliers')

    return <div>
        {supplier ? <div>
            <div className='Supplier__header'>
                <IoChevronBackOutline className='Supplier__header-icon' onClick={handleGoBack}/>
                <span className='Supplier__header-name'>{supplier.name}</span>
                <Link to='#'>
                    <IoCaretDown className='Supplier__header-icon' onClick={showDropdown} />
                </Link>
                <MdModeEditOutline className='Supplier__header-icon' onClick={() => navigate(`/suppliers/${supplierId}/update`)} />
            </div>
            
            {dropdown && <SupplierDropdown supplier={supplier}/>} 

        </div> : <p>no supplier: update supplier to introduce the missing information</p>
        }

        <Routes>
            <Route path='/' element={<ListProducts />} />
            <Route path='/products/:productId/*' element={<Product />} />
            <Route path='/products/:productId/update' element={<UpdateProduct onUpdated={() => navigate(`/suppliers/${supplierId}/`)} />} />
            <Route path='/products/new-product' element={<CreateProduct onCreated={() => navigate(`/suppliers/${supplierId}/`)} />} />
        </Routes>
    </div>

}
export default Supplier