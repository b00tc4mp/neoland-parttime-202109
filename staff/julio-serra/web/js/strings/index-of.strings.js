function indexOf(string, value) { // (string = es la frase, value = el valor que queremos saber m y c)
    // TODO

    // var words = ('hola mundo')

    // if (words.indexOf([words]) !== -1) {
    //     console.log(words.indexOf('w'))
    // } else {
    //     console.log('No es la letra que buscas')
    // }

    var count = 0 // declaramos la variable para que cuente desde 0 el array
    for (var i = 0; i < string.length; i++) {
        var content = string[i] // declaramos la variable para iterar 
        if (content === value) {
            count = i
        }
    }
    return count

}