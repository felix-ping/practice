    // html 部分同上
    // js 部分
    let debounce = function (fn, wait) {
      let timeout = null;
      return function () {
        if (timeout !== null) clearTimeout(timeout);//如果多次触发将上次记录延迟清除掉
        timeout = setTimeout(() => {
          fn.apply(this, arguments);
          // 或者直接 fn()
          timeout = null;
        }, wait);
      };
      }
       // 处理函数
    function handle() {
      console.log(arguments)
      console.log(Math.random());
    }
    // 测试用例
    document.getElementsByClassName('scroll-box')[0].addEventListener("scroll", debounce(handle, 3000));




    // html 部分
/*     <style>
    *{padding:0;margin:0;}
    .scroll-box{
        width : 100%;
        height : 500px;
        background:blue;
        overflow : auto;
    }    
    .scroll-item{
        height:1000px;
        width:100%;
    }
    </style>
    <body>
    <div class="scroll-box">
        <div class="scroll-item"></div>
    </div>
    </body> */
    
    // js 部分
    let throttle = function (func, delay) {
    let timer = null;
    return function(){
      if (!timer) {
        timer = setTimeout(() => {
          func.apply(this, arguments);
          // 或者直接 func()
          timer = null;
        }, delay);
      }
    };
    };
      
      // 处理函数
      function handle() {
      console.log(arguments)
      console.log(Math.random());
      }
    // 测试用例
    document.getElementsByClassName('scroll-box')[0].addEventListener("scroll", throttle(handle,3000));
  