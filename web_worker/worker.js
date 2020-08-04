onmessage= (e)=>{
  let value 
  setTimeout(()=>{
    value = +e.data+1
    postMessage(value)
  },2000)
  
}