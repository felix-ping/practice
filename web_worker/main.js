let el = document.getElementById('hello')
let worker = new Worker('./worker.js')
el.addEventListener('click',(e)=>{
  let value = e.target.textContent
  worker.postMessage(value)

})


worker.onmessage=(e)=>{
  console.log(e)
  let result = e.data
  console.log(`worker.onmessage ->  e.data`,  e)
  
  el.textContent =result
}
