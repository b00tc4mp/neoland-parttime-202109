console.log('TEST splice')

console.log('Caso 1')
var array = ['Jan', 'March', 'April', 'June'];
var res = splice(array, 1, 0, 'Feb')

if (res instanceof Array
    && res.length === 0
    && array.length === 5
    &&  array[0] === 'Jan'
    &&  array[1] === 'Feb'
    &&  array[2] === 'March'
    &&  array[3] === 'April'
    &&  array[4] === 'June')

console.log('Perfect')


else
    console.log('Dolor terrible')


console.log('Caso 2')

var array = ['Jan','Feb', 'March', 'April', 'June'];
var res = splice(array, 4, 1, 'May')

if (res instanceof Array
    && res.length === 1
    && array.length === 5
    &&  array[0] === 'Jan'
    &&  array[1] === 'Feb'
    &&  array[2] === 'March'
    &&  array[3] === 'April'
    &&  array[4] === 'May')

console.log('Perfect')

else
    console.log('Dolor terrible')


