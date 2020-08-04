let el = document.getElementById('hello')
let worker = new Worker('./worker.js')
el.addEventListener('click',(e)=>{
  let value = e.target.textContent
  worker.postMessage(value)

})


worker.onmessage=(e)=>{
  let result = e.data
  el.textContent =result
  worker.terminate()
}
