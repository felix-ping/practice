var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
{
    function tail(arr) {
        var _ignored = arr[0], rest = arr.slice(1);
        console.log(_ignored, 11111, rest);
        return rest;
    }
    var myTuple = [1, 2, 3, 4];
    var myArray = ["hello", "world"];
    // type [2, 3, 4]
    var r1 = tail(myTuple);
    console.log("r1", r1);
    // type [2, 3, ...string[]]
    var r2 = tail(__spreadArrays(myTuple, myArray));
    console.log("r2", r2);
}
var obj = {
    x: 10,
    y: [20, 30],
    z: {
        a: { b: 42 }
    }
};
