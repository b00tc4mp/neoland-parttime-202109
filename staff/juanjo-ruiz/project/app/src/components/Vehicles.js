import { retrieveActiveVehicles, findVehicles } from '../logic'
import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import VehicleItem from './VehicleItem'
import Context from './Context'
import './Vehicles.css'

export default function ({ onDetailVehicle }) {
    const navigate = useNavigate()
    const { setFeedback } = useContext(Context)
    const [vehicles, setVehicles] = useState()
    const [results, setResults] = useState()
    const [controls, setControls] = useState()

    useEffect(() => {
        try {
            retrieveActiveVehicles(sessionStorage.token)
                .then(vehicles => setVehicles(vehicles))
                .catch(error => setFeedback({ level: 'error', message: error.message }))
        } catch (error) {
            setFeedback({ level: 'error', message: error.message })
        }
    }, [])

    const search = event => {
        event.preventDefault()

        const { target: { q: { value: query } } } = event

        try {
            findVehicles(sessionStorage.token, query)
                .then(results => {
                    setResults(results)
                    setControls(true)
                })
                .catch(error => setFeedback({ level: 'error', message: error.message }))
        } catch (error) {
            setFeedback({ level: 'error', message: error.message })
        }
    }

    const handleButton = () => {
        results.length ? 
            setControls(false)
            : navigate('/')
    }

    const handleDetailVehicle = id => onDetailVehicle(id)
    
    return <div>
        <a onClick={() => handleButton}>volver</a>
        <h2 className="vehicles__title">VEHÍCULOS</h2>
        <form onSubmit={search}>
            <label className="vehicles__label">Buscador de matrículas</label>
            <input className="vehicles__input" type="search" name="q" required />
            <button className="vehicles__button__search">🔎</button>
        </form>

        <div>
            {controls ?
                results ?
                    <ul>
                        {results.map(result => <li key={result.id} onClick={() => handleDetailVehicle(result.id)} >
                            <VehicleItem content={result} />
                        </li>)}
                    </ul>
                    :
                    <p>no hay vehículos con esta matrícula</p>
                :
                vehicles ?
                    <ul>
                        {vehicles.map(vehicle => <li key={vehicle.id} onClick={() => handleDetailVehicle(vehicle.id)} >
                            <VehicleItem content={vehicle} />
                        </li>)}
                    </ul>
                    : <p>no hay vehículos activos</p>
            }
        </div>
        <button className="vehicles__button" onClick={() => navigate('/vehicle')}>añadir vehículo</button> {/* añadir icono */}
    </div>
}