let x 
setTimeout(()=>{x = importScripts('./console.js')},1000)


onmessage= (e)=>{
  setTimeout(()=>{
    postMessage(x)
  },2000)
  
}