function Fav({selected, onClick}){
    return <span onClick={onClick}>{selected? '❤️': '🤍'}</span>
}

