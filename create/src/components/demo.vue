<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>helloworld</title>
</head>
<body>

  <div id="app">
    <h1>{{message}}</h1>
  </div>
  
  <script src="../../js/vue.js"></script>
  <script>
    const app = new Vue({
      el:'#app',
      data:{
        message:'退钱！'
      }
    })
  </script>

</body>
</html>