<template>
    <div>
        <el-menu
                :default-active="activePath"
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose"
                style="height: 700px"
                router>
            <el-menu-item index="/timetableEdit"
                          @click="saveState('/timetableEdit')">
                <i class="el-icon-s-data"></i>
                <span slot="title">考勤排班查询</span>
            </el-menu-item>
            <el-menu-item index="/depEdit"
                          @click="saveState('/depEdit')">
                <i class="el-icon-s-cooperation"></i>
                <span slot="title">考勤部门设置</span>
            </el-menu-item>
            <el-menu-item index="/scheEdit"
                          @click="saveState('/scheEdit')">
                <i class="el-icon-s-order"></i>
                <span slot="title">考勤班次设置</span>
            </el-menu-item>
            <el-menu-item index="/StaffEdit"
                          @click="saveState('/StaffEdit')">
                <i class="el-icon-user-solid"></i>
                <span slot="title">员工信息设置</span>
            </el-menu-item>    

        </el-menu>

    </div>
</template>

<script>
    export default {
        name: "Sidebar.vue",
        data(){
            return{
                boss:false,
                activePath:'',
            }
        },
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            },
            saveState(activePath){
                window.sessionStorage.setItem('activePath',activePath)
                this.activePath = activePath;
            },
            jumpto(){

            }
        },
        //进入页面时启动created()
        created() {
            //如果用户名不为空, 则给用户名和头像赋对应的值
            // if(this.$store.getters.getUser.role=='组长'){
            //     this.boss=true;
            // }
            this.activePath=window.sessionStorage.getItem('activePath')
        }
    }
</script>

<style scoped>
     i,span{
        float: left;
         text-align: center;
    }
    i{
        margin-top: 19px;
    }
</style>