<template>
  <div>
      <ul>
          <li v-for="(i,index) in film" 
                :key="index" 
                :class="{yellowone:index===currentIndex}"
                @click="turnY(index)">{{i}}</li>
      </ul>
      <h2 :class="{redone:isRed}" style="color:#c4dfb8">red?</h2>
      <div class="background" :class="{blueone:isBlue,greenone:isGreen}">
          <h2 :class="{redone:isRed}" style="color:#c4dfb8;position:absolute;top:30%;left:48%;margin:0;">red?</h2>
          </div>
      <button @click="change" style="height:50px;margin-top:30px">change</button>
  </div>
</template>

<script type="text/javascript">

export default {
  data() {
    return {
        currentIndex:0,
        isYellow:false,
        isRed:true,
        isGreen:true,
        isBlue:false,
        film:['让子弹飞','邪不压正','鬼子来了','太阳照常升起'],
    };
  },
  methods: {
      change: function(){
          this.isRed = !this.isRed;
          this.isGreen = !this.isGreen;
          this.isBlue = !this.isBlue;
      },
      turnY: function(index){
          console.log(index);
          this.currentIndex = index;
      }
  }
}
</script>

<style scoped>
    .redone{
        color: #8cb6c0 !important
    }
    .yellowone{
        color: rgb(165, 165, 23);
        background-color: #fff8ce
    }
    .blueone{
        background-color: #8cb6c0;
    }
    .greenone{
        background-color: #c4dfb8;
    }
    .background{
        height: 200px;
        width: 200px;
        /* text-align: center; */
        margin: 0 auto;
    }
</style>