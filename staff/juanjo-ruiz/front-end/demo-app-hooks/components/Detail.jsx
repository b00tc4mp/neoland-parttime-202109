const { useState, useEffect } = React

function Detail() {
    const [vehicle, setVehicle] = useState(null)

    useEffect(() => {
        try {
            retrieveVehicle(sessionStorage.token, itemId, (error, vehicle) => {
                if (error) return alert(error.message)

                setVehicle(vehicle)
            })
        } catch (error) {
            return alert(error.message)
        }
    }, [])

    const toggleFav = vehicle => {
        try {
            toggleFavVehicle(sessionStorage.token, vehicle.id, error => {
                if (error) return alert(error.message)

                const update = {}

                for (const key in vehicle)
                    update[key] = vehicle[key]

                update.isFav = !update.isFav

                setVehicle(update)
            })
        } catch (error) {
            alert(error.message)
        }
    }

    if (vehicle)
        return <div>
            <h2>{vehicle.name}</h2>
            <Cart />
            <Fav selected={vehicle.isFav} onClick={toggleFav} />
            <img src={vehicle.image} />
            <p>{vehicle.description}</p>
            <p>{vehicle.price}</p>
            <p>{vehicle.color}</p>
            <p>{vehicle.style}</p>
            <p>{vehicle.year}</p>
            <a href={vehicle.url}>original item</a>
        </div>
    else
        return null
}
