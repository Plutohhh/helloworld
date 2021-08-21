<template>
  <div class="hello">
    <h1>购物车</h1>
      <table class="vtable">
        <tr class="title">
          <td>名称</td>
          <td>价格</td>
          <td>加减</td>
          <td>数量</td>
          <td>小计</td>
        </tr>

        <tr v-for="v in shopping " :key="v.id">
          <td>{{v.name}}</td>
          <td>{{v.price}}</td>
          <td style="width:200px">
            <button @click="v.num+=1">+</button>
            <button :disabled="v.num==0" 
                    @click="v.num-=1">-</button>
          </td>
          <td>{{v.num}}</td>
          <td>{{v.num*v.price}}</td>
        </tr>
      </table>
      <h2 style="">总价：{{total}}</h2>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      shopping:[{
          id:1,
          name:'小狗',
          price:5,
          num:0
        },{
          id:2,
          name:'小羊',
          price:7,
          num:0
        },{
          id:3,
          name:'小猪',
          price:8,
          num:0
        },{
          id:4,
          name:'小牛',
          price:9,
          num:0
        },{
          id:5,
          name:'小马',
          price:3,
          num:0
        }]      
    }
  },
    computed: {
      total() {
        let total = 0;
        for (let index = 0; index < this.shopping.length; index++) {
          total += this.shopping[index].price * this.shopping[index].num;
        }
        return total;
      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.vtable{
  width: 800px;
  border: 1px solid rgba(0, 0, 0, 0.315);
  margin: 0 auto;
  border-collapse: collapse;
  border-spacing: 0;
}
.vtable td{
  border: 1px solid rgba(0, 0, 0, 0.295);
  height: 30px;
}
.title{
  height: 50px;
  font-weight: bold;
}
button{
  width:50px;
  height: 30px;
}
</style>
