function mergeSort(arr) {
    if (arr.length < 2) { return arr }
    let middle = Math.floor(arr.length / 2)
    let left = arr.slice(0, middle)
    let right = arr.slice(middle)
    return merge(mergeSort(left), mergeSort(right))
}
function merge(left, right) {
    let result = []
    while (left.length > 0 && right.length > 0) {
        left[0] >= right[0] ? result.push(right.shift()) : result.push(left.shift())
    }
    if (left.length) {
        result.push(...left)
    }
    if (right.length) {
        result.push(...right)
    }
    return result
}


let arr = [7, 8, 9, 4, 2, 5, 4, 1, 6, 8, 22, 45, 98, 1, 0, 6, 7, 8, 9]
console.log(mergeSort(arr))