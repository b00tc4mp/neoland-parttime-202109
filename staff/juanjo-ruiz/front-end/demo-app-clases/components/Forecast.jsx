const { Component } = React

class Forecast extends Component {
    constructor() {
        logger.debug('Forecast -> constructor')

        super()

        this.state = { values: null }
    }

    componentDidMount() {
        logger.debug('Forecast -> component did mount')

        try {
            retrieveForecast(this.props.apiKey, this.props.city, (error, values) => {
                if (error) return alert(error.message)

                this.setState({ values })
            })
        } catch (error) {
            alert(error.message)
        }
    }

    render() {
        logger.debug('Forecast -> render')

        if (this.state.values) {
            return <div>
                <h3>Pronóstico en {this.props.city}</h3>
                <ul>
                    {this.state.values.map(value => <li key={value.datetimeStr}>{value.temp} ºC, {new Date (value.datetimeStr).toLocaleString().slice(0, 10)}</li>)}
                </ul>
            </div>
        } else
            return null
    }
}
