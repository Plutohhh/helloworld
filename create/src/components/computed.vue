<template>
  <div>
    <h1>{{fullName}}</h1>
    <button @click="change"><h1>{{fullName}}</h1></button>
    <button @click="constdemo">第1个</button>
    <button>第2个</button>
    <button>第3个</button>
    <button>第4个</button>
    <button>第5个</button>
  </div>
</template>

<script type="text/javascript">

export default {
  mounted: function(){
    this.count()
  },
  data() {
    return {
      firstName:'abc',
      lastName:'xyz',

    };
  },
  computed: {
    fullName: {
      set:function(newOne){
        let name = newOne.split(' ');
        this.firstName = name[0];
        this.lastName = name[1];
      },
      get:function(){
        return this.firstName+' '+this.lastName;
      }
    }
  },
  methods: {
    change: function(){
      this.fullName =  'qweqwe zxczxc';
    },
    count: function(){
      console.log('qwerqwer');
      const btns = document.getElementsByTagName('button')
      console.log(btns.length);
      for(let i = 0;i<btns.length;i++){
        btns[i].addEventListener('click',function() {
          console.log('这是第'+i+'个按钮');
        })
      };
    },
    constdemo: function(){
      const name='dmc'
      const age=19
      const height=188
      const person={
        name,
        age,
        height
      }
      console.log(person);
    },
  },

}
</script>

<style scoped>

</style>