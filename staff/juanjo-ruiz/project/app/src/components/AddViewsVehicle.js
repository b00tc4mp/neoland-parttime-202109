import { useNavigate, useParams } from "react-router-dom"
import { useState, useContext } from 'react'
import Context from "./Context"
import { addViewsVehicle } from "../logic"

export default function () {
    const navigate = useNavigate()
    const { setFeedback } = useContext(Context)
    const { vehicleId } = useParams()
    const [imageB64, setImageB64] = useState([])

    const handleUploadB64 = event => {

        const file = event.target.files[0]
        const name = event.target.name

        const fileReader = new FileReader

        fileReader.readAsDataURL(file)

        fileReader.onload = event => {
            setImageB64(imageB64.concat({ title: name, image: event.target.result }))
        }
    }

    const handleAddViews = event => {
        event.preventDefault()

        imageB64.map(image => {
                try {
                    addViewsVehicle(sessionStorage.token, vehicleId, image.title, image.image)
                        .then(() => {
                            setFeedback({ level: 'info', message: 'vehículo creado' })
                            navigate('/vehicles')
                        })
                        .catch(error => setFeedback({ level: 'error', message: error.message }))
                } catch (error) {
                    setFeedback({ level: 'error', message: error.message })
                }
            })
    }

    return <div>
        <a onClick={() => navigate('/vehicle')}>Volver</a>
        <h2>Añade las imágenes de este vehículo</h2>
        <form>
            <h4>Parte frontal</h4>
            <input type="file" name="lead" onChange={handleUploadB64} />
            {/* { imageB64.length && <img src={imageB64[0].image} />} */}
            <h4>Parte derecha</h4>
            <input type="file" name="right" onChange={handleUploadB64} />
            {/* { imageB64.length && <img src={imageB64[1].image} />} */}
            <h4>Parte trasera</h4>
            <input type="file" name="rear" onChange={handleUploadB64} />
            {/* { imageB64.length && <img src={imageB64[2].image} />} */}
            <h4>Parte izquierda</h4>
            <input type="file" name="left" onChange={handleUploadB64} />
            {/* { imageB64.length && <img src={imageB64[3].image} />} */}
            <button onClick={handleAddViews}>Añadir imágenes</button>
        </form>
    </div>
}