var obj = {id: 12}
var obj1 = {id: 123}
var obj2 = {id: 1200}
console.log(obj.id);

function testPush (objeto) {
    var array = [];
    if (objeto.id > 0 && objeto.id < 151) {
        array.push(objeto)
    } 
    console.log(array);
    return array;
}

console.log(testPush(obj));
console.log(testPush(obj1));
console.log(testPush(obj2));

