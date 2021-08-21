<template>
  <div>
    <el-container>
      <el-header>
        <Header></Header>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <Sidebar></Sidebar>
        </el-aside>
        <el-main>
          <el-button
            @click="dialogVisible = true"
            type="primary"
            icon="el-icon-edit"
            style="float: left; margin-bottom: 10px"
            >添加部门</el-button
          >
          <el-table :data="tableData" style="width: 100%" class="eltable"
            :header-cell-style="{ color: '#606266', fontSize: '15px'}">
            <el-table-column  align="center" label="部门id" width="100">
              <template slot-scope="scope">
                <span style="margin-left: 0px">{{ scope.row.did }}</span>
              </template>
            </el-table-column>
            <el-table-column  align="center" label="部门名称">
              <template slot-scope="scope">
                <span style="margin-left: 0px">{{ scope.row.dname }}</span>
              </template>
            </el-table-column>
            <el-table-column  align="center" label="班次">
              <template slot-scope="scope">
                <span style="margin-left: 0px">{{ scope.row.cname }}</span>
              </template>
            </el-table-column>

            <el-table-column  align="center" label="操作">
              <!--作用域插槽可接受scope对象-->
              <template slot-scope="scope">
                <!--编辑按钮-->
                <el-button
                  size="mini"
                  @click="handleEdit(scope.row.did, scope.row.cid)"
                  >编辑班次</el-button
                >
                <!--删除按钮-->
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.row.did)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
          <!-- <div class="pagination">
            <el-pagination
              background
              layout="prev, pager, next"
              :current-page="currentPage"
              :page-size="pageSize"
              :total="total"
              @current-change="page"
            >
            </el-pagination>
          </div> -->
          <!--添加部门的对话框-->
          <el-dialog
            title="添加部门"
            :visible.sync="dialogVisible"
            width="30%"
            :closeOnClickModal="false"
            @close="dialogClosed"
          >
            <!--内容主体区-->
            <el-form
              ref="addFormRef"
              :model="addForm"
              label-width="80px"
              style="padding-right: 60px"
              :rules="addFormRules"
            >
              <el-form-item label="部门名" prop="dname">
                <el-input v-model="addForm.dname"></el-input>
              </el-form-item>
              <el-form-item label="班次" prop="cid">
                <el-select
                  v-model="addForm.cid"
                  style="float: left"
                  placeholder="请选择部门对应班次"
                >
                  <el-option
                    v-for="item in scheduleData"
                    :key="item.cid"
                    :label="item.cname"
                    :value="item.cid"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-form>
            <!--底部区域-->
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="addConfirm(addForm.dname,addForm.cid)">确 定</el-button>
            </span>
          </el-dialog>
          <!--修改班次的对话框-->
          <el-dialog
            title="修改班次"
            :visible.sync="editDialogVisible"
            width="30%"
            @close="editDialogClosed"
          >
            <!--内容主体区-->
            <el-form
              ref="editFormRef"
              style="padding-right: 60px"
              :model="editForm"
              label-width="70px"
              :rules="addFormRules"
            >
              <el-form-item label="新班次" prop="cid">
                <el-select
                  v-model="editForm.cid"
                  style="float: left"
                  placeholder="请选择该部门新的班次"
                >
                  <el-option
                    v-for="item in scheduleData"
                    :key="item.cid"
                    :label="item.cname"
                    :value="item.cid"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-form>
            <!--底部区域-->
            <span slot="footer" class="dialog-footer">
              <el-button @click="editDialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="editConfirm">确 定</el-button>
            </span>
          </el-dialog>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script type="text/javascript">
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
export default {
  components: { Header, Sidebar },
  data() {
    return {
      tableData: [
        {
          did: "1",
          dname: "美的一组",
          cname: "正常班次（8:30-18:00）",
          cid: "",
        },
        {
          did: "2",
          dname: "华为业务综合事务部班次",
          cname: "正常班次（8:30-18:00）",
          cid: "",
        },
        {
          did: "3",
          dname: "运维部",
          cname: "弹性班次（8:30-9:00；18:00-18:30）",
          cid: "",
        },
      ],
      scheduleData: [{}],
      //查询页号
      currentPage: 1,
      //数据总数
      total: 5,
      //每页数量
      pageSize: 10,
      //添加用户对话框是否显示
      dialogVisible: false,
      //编辑用户对话框是否显示
      editDialogVisible: false,
      //添加用户的表单数据
      editForm: {
        did: "",
        cid: "",
      },
      //添加部门的表单数据
      addForm: {
        dname: "",
        cid: "",
      },
      //添加用户的表单验证规则
      addFormRules: {
        dname: [
          { required: true, message: "请输入部门名", tirgger: true },
          {
            min: 1,
            max: 20,
            message: "部门长度为2~20字",
            tirgger: true,
          },
        ],
        cid: [{ required: true, message: "请输入班次" }],
      },
    };
  },
  computed: {
    scheduleName(tempid) {
      this.scheduleData.find((item) => item.id === tempid);
    },
  },
  created() {
    this.page(1);
  },
  methods: {
    //分页加载
    async page(currentPage) {
      const _this = this;
      await this.$axios.get("/selectAllSchedule").then((res) => {
        _this.scheduleData = res.data.data;
      });
      await this.$axios.get("/selectDept").then((res) => {
        _this.tableData = res.data.data;
        for (let item of this.tableData) {
          item.cname = this.scheduleData.filter(
            (n) => n.cid === item.cid
          )[0].cname;
        }
      });

      // [{id:1},{id:2}].find(item=>item.id===2)
    },
    //弹出编辑框
    handleEdit(did, cid) {
      this.editDialogVisible = true;
      this.editForm.did = did;
      this.editForm.cid = cid;
    },
    //监听修改对话框关闭事件
    editDialogClosed() {
      //重置对话框
      this.$refs.editFormRef.resetFields();
    },
    //监听对话框关闭事件
    dialogClosed() {
      //重置对话框
      this.$refs.addFormRef.resetFields();
    },
    //根据id删除部门
    async handleDelete(id) {
      console.log(id);
      //弹窗询问是否删除信息
      const confirmResult = await this.$confirm(
        "此操作将永久删除该部门, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      //如果用户确认删除, 则返回字符串confirm
      //如果取消则会报错,需要catch,之后会返回字符串cancel
      if (confirmResult != "confirm") {
        return this.$message.info("已取消删除");
      } else {
        // const { data: res } = await this.$axios.delete("/user/delete/" + id);
        await this.$axios.delete("/deleteDept?did=" + id);
        // console.log("========"+data);
        this.$message.success("删除成功");
        this.page(1);
      }
    },
    //确认修改表单
    editConfirm() {
      this.$refs.editFormRef.validate((valid) => {
        //valid为true表示校验通过
        if (valid) {
          let did = this.editForm.did;
          let cid = this.editForm.cid;
          this.$axios
            .get("/updateDepSchedule?did=" + did + "&cid=" + cid)
            .then((res) => {
              this.$message.success("修改成功");
              this.page(1);
              this.editDialogVisible = false;
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          return false;
        }
      });
    },
    //确认新增表单
    addConfirm(dname,cid) {
      const _this = this;
      // console.log(this.addForm);
      console.log(dname);
      console.log(cid);
      this.$refs.addFormRef.validate((valid) => {
        if (valid) {
          this.$axios
            .get(
              "/addDept?dname=" +
                dname +
                "&cid=" +
                cid
            )
            .then((res) => {
              this.$message.success("添加成功");
              this.page(1);
            }).catch(err=>{
              console.log(err);
            });
          this.dialogVisible = false;
          //   });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style scoped>
.el-input,
.el-select {
  width: 400px;
}
body > .el-container {
  margin-bottom: 40px;
}
.el-header {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}
.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 500px;
  /* height: 800px; */
  border: none;
}
.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 20px !important;
  height: 850px;
  /*height: 500px;*/
}
</style>