{
  function tail<T extends any[]>(arr: readonly [any, ...T]) {
    const [_ignored, ...rest] = arr;
    console.log(_ignored,11111,rest)
    return rest;
  }

  const myTuple = [1, 2, 3, 4] as const;
  const myArray = ["hello", "world"];

  // type [2, 3, 4]
  const r1 = tail(myTuple);
  console.log(`r1`, r1)


  // type [2, 3, ...string[]]
  const r2 = tail([...myTuple, ...myArray] as const);
  console.log(`r2`, r2)
}


let obj = {
  x: 10,
  y: [20, 30],
  z: {
    a:
      {  b: 42 }
  } 
} as const;
