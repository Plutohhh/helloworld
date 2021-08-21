<template>

  <div>
      <h1>标签输入框</h1>
      <div class="bottom">
        <button v-for="(item,index) in mlist" :key=index>{{item}}</button>
      <input type="text" 
            placeholder="请输入标签"
             v-model="message"
             @keydown.enter="setter"
             @keydown.delete="del">
        </div>
  </div>
</template>

<script type="text/javascript">

export default {
  data() {
    return {
      message:'',
      mlist:[]
    };
  },
  methods: {
      setter: function(){           
          this.message = this.message.trim();   
          if(this.message!=''&&this.mlist.indexOf(this.message)==-1){
            this.mlist.push(this.message)
          }
          this.message=''
      },
      del: function(){
          if(this.message==''){
             this.mlist.pop(this.message)
          }
      }
  },
}
</script>

<style scoped>
.bottom{
    border: 1px solid rgba(0, 0, 0, 0.253);
    text-align: left;
    width: 1000px;
    margin: 0 auto;
}
input{
    height: 28px;
    width:140px;
    position: relative;
    margin-left: 5px;
    font-size:20px;
    border:1px solid rgba(0, 0, 0, 0.068);
    border-width: 0 0 1px 0;
    outline: none;
}
button{
    /* height: 30px; */
    position: relative;
    margin: 5px 0px 5px 6px;
    border-radius: 20px;
    background: #849bff;
    border: none;
    color:white;
    font-size: 17px;
    padding:1px 10px;    
}
</style>