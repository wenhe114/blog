const getRandomColor = function () {
    return '#'+Math.floor(Math.random()*16777215).toString(16);
}

// 排序
function compare(property){
    return function(a,b){
        var value1 = a[property];
        var value2 = b[property];
        return value1 - value2;
    }
}

const arrSort=(arr,property)=>{
    return arr.sort(compare(property))
}
export {
    getRandomColor,
    arrSort
}