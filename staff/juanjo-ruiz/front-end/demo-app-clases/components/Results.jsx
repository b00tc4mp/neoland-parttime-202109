const { Component } = React

class Results extends Component {
    constructor() {
        logger.debug('Results -> constructor')

        super()

        this.state = { vehicles: null }
    }

    componentDidMount() {
        logger.debug('Results -> component did mount')

        try {
            searchVehicles(sessionStorage.token, this.props.query, (error, vehicles) => {
                if (error) return alert(error.message)

                this.setState({ vehicles })
            })
        } catch (error) {
            alert(error.message)
        }
    }

    componentWillReceiveProps(props) {
        logger.debug('Results -> component will receive props')

        try {
            searchVehicles(sessionStorage.token, props.query, (error, vehicles) => {
                if (error) return alert(error.message)

                this.setState({ vehicles })
            })
        } catch (error) {
            alert(error.message)
        }
    }

    toogleFav = vehicle => {
        try {
            toggleFavVehicle(sessionStorage.token, vehicle.id, error => {
                if (error) return alert(error.message)

                const update = {}

                for (const key in vehicle)
                    update[key] = vehicle[key]

                update.isFav = !update.isFav

                const vehicles = this.state.vehicles.map(_vehicle => {
                    if (_vehicle.id === vehicle.id)
                        return update

                    return _vehicle
                })

                this.setState({ vehicles: vehicles })
            })
        } catch (error) {
            alert(error.message)
        }
    }

    showDetail = id => this.props.onItemClick(id)

    render() {
        logger.debug('Results -> render')

        if (this.state.vehicles) {
            if (this.state.vehicles.length)
                return <ul>
                    {this.state.vehicles.map(vehicle => <li key={vehicle.id}>
                        <h2>{vehicle.name}</h2>
                        <Fav selected={vehicle.isFav} onClick={() => this.toogleFav(vehicle)} />
                        <img src={vehicle.thumbnail} onClick={() => this.showDetail(vehicle.id)} />
                        <span>{vehicle.price} €</span>
                    </li>)}
                </ul>
            else
                return <p className="feedback-error">No hay resultados con estos criterios</p>
        } else
            return null
    }
}

