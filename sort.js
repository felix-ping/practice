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





const quickSort = (arr) => {
	if (arr.length < 2) { return arr }
	const basic = arr[0], left = [], right = []
	for (let i = 1; i < arr.length; i++) {
		const value = arr[i]
		value < basic ? left.push(value) : right.push(value)
	}
	console.log(left, basic, right)
	return quickSort(left).concat(basic, quickSort(right))
}
let arr = [7, 8, 9, 4, 2, 5, 4, 1, 6, 8, 22, 45, 98, 1, 0, 6, 7, 8, 9]
console.log(quickSort(arr))





const countSort = (arr) => {
	const count = [], newArr = []
	for (let i = 0; i < arr.length; i++) {
		let key = arr[i]
		count[key] >= 1 ? count[key]++ : count[key] = 1
	}
	for (let j = 0; j < count.length; j++) {
		if (count[j]) {
			while (count[j] > 0) {
				newArr.push(j)
				count[j]--
			}
		}
	}
	return newArr
}
let arr = [7, 8, 9, 4, 2, 5, 4, 1, , 6, 8, 22, 45, 98, 1, 0, 6, 7, 8, 9]
console.log(countSort(arr))
















function quickSort(arr){
	if(arr.length < 2) return arr
	let index = Math.floor(Math.random()*arr.length)
	let middle = arr[index]
	let left = [], right = []
	for(let i = 0; i < arr.length; i++){
		if(i === index){continue} // 删了这句会爆桟，仔细体会
		arr[i] < middle?left.push(arr[i]):right.push(arr[i])
	}
	return quickSort(left).concat(middle,quickSort(right))
}

let arr = [5,6,8,3,5,7,1,6,9,3,76,2,56,3,547,436,7,34,6,1,1,1]
quickSort(arr)



function insertSort(arr){


}













