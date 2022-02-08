const { useState, useEffect } = React

function ShoppingCart({ onClickedHome }) {
    const [vehicles, setVehicles] = useState(null)

    useEffect(() => {
        try {
            retrieveVehiclesFormCart(sessionStorage.token, (error, vehicles) => {
                if (error) return alert(error.message)

                setVehicles(vehicles)
            })
        } catch (error) {
            alert(error.message)
        }
    }, [])

    const toggleFav = vehicle => {
        try {
            toogleFavVehicle(sessionStorage.token, vehicle.id, error => {
                if (error) return alert(error.message)

                const update = { ...vehicle, isFav: !vehicle.isFav }

                const vehicles = vehicles.map(_vehicle => {
                    if (_vehicle.id === vehicle.id)
                        return update

                    return _vehicle
                })

                setVehicles(vehicles)
            })
        } catch (error) {
            alert(error.message)
        }
    }

    const addToCart = vehicle => {
        try {
            addVehicleToCart(sessionStorage.token, vehicle.id, error => {
                if (error) alert(error.message)

                const update = { ...vehicle, qty: vehicle.qty + 1 }

                const vehicles = vehicles.map(_vehicle => {
                    if (_vehicle.id === vehicle.id)
                        return update

                    return _vehicle
                })

                setVehicles(vehicles)
            })
        } catch (error) {
            alert(error.message)
        }
    }

    const removeFromCart = vehicle => {
        try {
            removeVehicleFormCart(sessionStorage.token, vehicle.id, error => {
                if (error) alert(error.message)

                const update = { ...vehicle, qty: vehicle.qty - 1 }

                let vehicles

                if (update.qty > 0)
                    vehicles = vehicles.map(_vehicle => {
                        if (_vehicle.id === vehicle.id)
                            return update

                        return _vehicle
                    })
                else
                    vehicles = vehicles.filter(_vehicle => _vehicle.id !== vehicle.id)

                setVehicles(vehicles)
            })
        } catch (error) {
            alert(error.message)
        }
    }

    const goToHome = event => {
        event.preventDefault()

        onClickedHome()
    }

    if (vehicles) {
        if (vehicles.length)
            return <div>
                <p><a href="" onClick={goToHome}>Inicio</a></p>
                <h1>Cesta</h1>
                <ul>
                    {vehicles.map(vehicle => <li key={vehicle.id}>
                        <h2>{vehicle.name}</h2>
                        <Fav selected={vehicle.isFav} onClick={() => toggleFav(vehicle)} />

                        <button onClick={() => addToCart(vehicle)}>Add to cart</button>

                        <button onClick={() => removeFromCart(vehicle)}>Remove cart</button>

                        <img src={vehicle.image} onClick={() => clickItem(vehicle.id)} />
                        <span>{vehicle.qty} x {vehicle.price} $ </span>
                        <hr></hr>
                        <span>Subtotal {vehicle.qty * vehicle.price} $</span>
                    </li>)}
                </ul>
                <hr></hr>
                <span>TOTAL {vehicles.reduce((accum, vehicle) => accum + vehicle.price * vehicle.qty, 0)} $</span>
            </div>
        else
            return <p>No items :(</p>
    } else
        return null

}