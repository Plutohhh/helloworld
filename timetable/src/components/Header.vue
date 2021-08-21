<template>
    <div>
        <h1>考勤管理系统</h1>
        <!-- <div style="float: left;margin: 10px">欢迎“{{user.role}}” {{user.username}}</div> -->
        <!-- <el-button @click="logout"
                   type="info" plain
                   class="exit-button"
                   style="float: right;margin: 10px"
                   icon="el-icon-switch-button">
            退出登录
        </el-button> -->
    </div>
</template>

<script>
    export default {
        name: "Header.vue",
        data(){
            return{
                user:{
                    username:'未登录用户',
                    role:'未知身份的',
                }
            }
        },
        methods:{
            logout(){
                const _this = this;

                //logout页面需要登录后才能访问,所以给headers中添加数据
                //调用后端logout方法清楚数据
                _this.$axios.get("/logout",{
                    headers:{
                        "Authorization": localStorage.getItem("token")
                    }
                }).then(res=>{
                    _this.$store.commit("REMOVE_INFO");
                    _this.$router.push("/login")
                })
            }
        },
        //进入页面时启动created()
        created() {
            //如果用户名不为空, 则给用户名和头像赋对应的值
            // if(this.$store.getters.getUser.username){
            //     this.user.username = this.$store.getters.getUser.username;
            //     this.user.role = this.$store.getters.getUser.role;
            //     this.hasLogin=true;
            // }
        }
    }
</script>

<style scoped>
    h1{
        margin: 0;
        float: left;
    }
    .exit-button{
        /*background: #656e7c;*/
        /*color: white;*/
        font-size: 17px;
        font-weight: normal;
    }
</style>