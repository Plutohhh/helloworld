  <div id="app">
    <cpn>

    </cpn>
  </div>
<template id="cpn">
  <div>

  </div>
</template>


<script type="text/javascript">
// export default 
{
  const cpn ={
    template:'#cpn'
  },
  const app =new Vue({
    el:'#cpn',
  data() {
    return {
      movies: ["云图", "风声", "无间道"],
    };
  },
  computed: {},
  methods: {},

  }),
};
</script>

<style scoped>
</style>