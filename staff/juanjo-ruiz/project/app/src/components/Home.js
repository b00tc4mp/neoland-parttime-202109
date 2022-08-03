import { useNavigate, Routes, Route, Link } from 'react-router-dom'
import Nav from './Nav'
import Users from './Users'
import CreateUser from './CreateUser'
import UserDetail from './UserDetail'
import UpdateUser from './UpdateUser'
import DeleteUser from './DeleteUser'
import Vehicles from './Vehicles'
import VehicleDetail from './VehicleDetail'
import CreateVehicle from './CreateVehicle'
import UpdateVehicle from './UpdateVehicle'
import DeleteVehicle from './DeleteVehicle'
import Parts from './Parts'
import PartDetail from './PartDetail'
import DeletePart from './DeletePart'
import AddViewsVehicle from './AddViewsVehicle'
import ViewDetail from './ViewDetail'
import UpdatePart from './UpdatePart'
import './Home.css'

export default function ({ onLoggedOut }) {
    const navigate = useNavigate()

    const handleLogout = () => {
        delete sessionStorage.token

        onLoggedOut()
    }

    const handleShowUser = userId => navigate(`/user/${userId}`)

    const handleShowVehicle = vehicleId => navigate(`/vehicle/${vehicleId}`)

    const handleShowPart = (vehicleId, partId) => navigate(`/vehicle/${vehicleId}/part/${partId}`)

    return <div className="home">
        <div className="home__header">
            <Link className="home__link" to="/">🚀</Link>
            <img src="https://img.icons8.com/ios-glyphs/30/000000/logout-rounded--v1.png" onClick={handleLogout} />
        </div>
        <Routes>
            <Route path="/" element={<Nav />} />
            <Route path="/users" element={<Users onDetailUser={handleShowUser} />} />
            <Route path="/user/:userId" element={<UserDetail />} />
            <Route path="/user" element={<CreateUser />} />
            <Route path="/user/:userId/update" element={<UpdateUser />} />
            <Route path="/user/:userId/delete" element={<DeleteUser />} />
            <Route path="/vehicles" element={<Vehicles onDetailVehicle={handleShowVehicle} />} />
            <Route path="/vehicle/:vehicleId" element={<VehicleDetail />} />
            <Route path="/vehicle" element={<CreateVehicle />} />
            <Route path="/vehicle/:vehicleId/views" element={<AddViewsVehicle />} />
            <Route path="/vehicle/:vehicleId/view/:viewId" element={<ViewDetail />} />
            <Route path="/vehicle/:vehicleId/update" element={<UpdateVehicle />} />
            <Route path="/vehicle/:vehicleId/delete" element={<DeleteVehicle />} />
            <Route path="/vehicle/:vehicleId/parts" element={<Parts onDetailPart={handleShowPart} />} />
            <Route path="/vehicle/:vehicleId/view/:viewId/part/:partId" element={<PartDetail />} />
            <Route path="/vehicle/:vehicleId/part/:partId" element={<PartDetail />} />
            <Route path="/vehicle/:vehicleId/view/:viewId/part/:partId/update" element={<UpdatePart />} />
            <Route path="/vehicle/:vehicleId/part/:partId/delete" element={<DeletePart />} />
        </Routes>
    </div>
}