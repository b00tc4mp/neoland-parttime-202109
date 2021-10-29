describe('TEST splice')

// ______________________________________________________________________________

var array = ['Jan', 'March', 'April', 'June']
var res = splice(array, 1, 0, 'Feb')

if (res instanceof Array
    && res.length === 0
    && array.length === 5
    && array[0] === 'Jan'
    && array[1] === 'Feb'
    && array[2] === 'March'
    && array[3] === 'April'
    && array[4] === 'June')
    success('test 1 ok')
else
    fail('test 1 failed')

// ______________________________________________________________________________

var array = ['Jan', 'Feb', 'March', 'April', 'June']
var res = splice(array, 4, 1, 'May')

if (res instanceof Array
    && res.length === 1
    && res[0] === 'June'
    && array.length === 5
    && array[0] === 'Jan'
    && array[1] === 'Feb'
    && array[2] === 'March'
    && array[3] === 'April'
    && array[4] === 'May')
    success('test 2 ok')
else
    fail('test 2 failed')

// ______________________________________________________________________________

var array = ['Jan', 'Feb', 'March', 'April', 'June', 'July', 'August']
var res = splice(array, 2, 3, 'X')

if (res instanceof Array
    && res.length === 3
    && res[0] === 'March'
    && res[1] === 'April'
    && res[2] === 'June'
    && array.length === 5
    && array[0] === 'Jan'
    && array[1] === 'Feb'
    && array[2] === 'X'
    && array[3] === 'July'
    && array[4] === 'August')
    success('test 3 ok')
else
    fail('test 3 failed')

// ______________________________________________________________________________

var array = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
var res = splice(array, 3, 5, 'X')

if (res instanceof Array
    && res.length === 5
    && res[0] === '3'
    && res[1] === '4'
    && res[2] === '5'
    && res[3] === '6'
    && res[4] === '7'
    && array.length === 6
    && array[0] === '0'
    && array[1] === '1'
    && array[2] === '2'
    && array[3] === 'X'
    && array[4] === '8'
    && array[5] === '9')
    success('test 4 ok')
else
    fail('test 4 failed')

// ______________________________________________________________________________

var array = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i']
var res = splice(array, 4, 4, 'x')

if (res instanceof Array
    && res.length === 4
    && res[0] === 'e'
    && res[1] === 'f'
    && res[2] === 'g'
    && res[3] === 'h'
    && array.length === 6
    && array[0] === 'a'
    && array[1] === 'b'
    && array[2] === 'c'
    && array[3] === 'd'
    && array[4] === 'x'
    && array[5] === 'i')
    success('test 5 ok')
else
    fail('test 5 failed')