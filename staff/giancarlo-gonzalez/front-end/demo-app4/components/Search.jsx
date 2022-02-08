function Search(props) {
    return <form onSubmit={event => {
        event.preventDefault()

        const query = event.target.query.value

        props.onQueryChange(query)
    }}>
        <input type="text" name="query" placeholder="criteria" defaultValue={props.query} />
        <button>Search</button>
    </form>
}