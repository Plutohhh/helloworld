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
            >新增员工</el-button
          >
          <el-table
            :data="tableData"
            style="width: 100%"
            class="eltable"
            :header-cell-style="{ color: '#606266', fontSize: '15px' }"
          >
            <el-table-column align="center" label="员工id" width="100">
              <template slot-scope="scope">
                <span style="margin-left: 0px">{{ scope.row.uid }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="员工姓名">
              <template slot-scope="scope">
                <span style="margin-left: 0px">{{ scope.row.uname }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="工号">
              <template slot-scope="scope">
                <span style="margin-left: 0px">{{ scope.row.enumber }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="性别">
              <template slot-scope="scope">
                <span style="margin-left: 0px">{{ scope.row.sex }}</span>
              </template>
            </el-table-column>

            <el-table-column align="center" label="部门">
              <template slot-scope="scope">
                <span style="margin-left: 0px">{{ scope.row.dname }}</span>
              </template>
            </el-table-column>

            <el-table-column align="center" label="操作">
              <!--作用域插槽可接受scope对象-->
              <template slot-scope="scope">
                <!--修改按钮-->
                <el-button
                  size="mini"
                  @click="
                    handleEdit(
                      scope.row.uid,
                      scope.row.uname,
                      scope.row.enumber,
                      scope.row.sex,
                      scope.row.did
                    )
                  "
                  >修改员工</el-button
                >
                <!--删除按钮-->
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.row.uid)"
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

          <!--新增员工的对话框-->
          <el-dialog
            title="新增员工"
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
              <el-form-item label="姓名" prop="uname">
                <el-input v-model="addForm.uname"></el-input>
              </el-form-item>
              <el-form-item label="工号" prop="enumber">
                <el-input v-model="addForm.enumber"></el-input>
              </el-form-item>
              <el-form-item label="性别" prop="sex">
                <el-select
                  v-model="addForm.sex"
                  style="float: left"
                  placeholder="请选择性别"
                >
                  <el-option label="男" value="男"> </el-option>
                  <el-option label="女" value="女"> </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="部门名" prop="did">
                <el-select
                  v-model="addForm.did"
                  style="float: left"
                  placeholder="请选择部门"
                >
                  <el-option
                    v-for="item in depData"
                    :key="item.did"
                    :label="item.dname"
                    :value="item.did"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-form>
            <!--底部区域-->
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="addConfirm()">确 定</el-button>
            </span>
          </el-dialog>
          <!--修改员工的对话框-->
          <el-dialog
            title="修改员工"
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
              <el-form-item label="姓名" prop="uname">
                <el-input v-model="editForm.uname"></el-input>
              </el-form-item>
              <el-form-item label="工号" prop="enumber">
                <el-input v-model="editForm.enumber"></el-input>
              </el-form-item>
              <el-form-item label="性别" prop="sex">
                <el-select
                  v-model="editForm.sex"
                  style="float: left"
                  placeholder="请选择性别"
                >
                  <el-option label="男" value="男"> </el-option>
                  <el-option label="女" value="女"> </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="部门名" prop="did">
                <el-select
                  v-model="editForm.did"
                  style="float: left"
                  placeholder="请选择部门"
                >
                  <el-option
                    v-for="item in depData"
                    :key="item.did"
                    :label="item.dname"
                    :value="item.did"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <!-- <el-form-item label="新班次" prop="cid">
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
              </el-form-item> -->
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
      depData: [],
      tableData: [],
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
      //编辑用户的表单数据
      editForm: {
        uid: "",
        uname: "",
        did: 1,
        sex: "",
        enumber: "",
      },
      //添加部门的表单数据
      addForm: { did: 1 },
      //添加用户的表单验证规则
      addFormRules: {
        // dname: [
        //   { required: true, message: "请输入部门名", tirgger: true },
        //   {
        //     min: 1,
        //     max: 20,
        //     message: "部门长度为2~20字",
        //     tirgger: true,
        //   },
        // ],
        enumber: [{ required: true, message: "请输入工号" }],
        uname: [{ required: true, message: "请输入姓名" }],
        sex: [{ required: true, message: "请选择性别" }],
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
      await this.$axios.get("/selectAllEmployee").then((res) => {
        _this.tableData = res.data.data;
        console.log(this.tableData);
      });
      await this.$axios.get("/selectDept").then((res) => {
        _this.depData = res.data.data;
        console.log(this.depData);
      });

      // [{id:1},{id:2}].find(item=>item.id===2)
    },
    //弹出编辑框
    handleEdit(uid, uname, enumber, sex, did) {
      this.editDialogVisible = true;
      this.editForm.uid = uid;
      this.editForm.uname = uname;
      this.editForm.enumber = enumber;
      this.editForm.sex = sex;
      this.editForm.did = did;
      console.log("--------" + this.editForm.did);
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

    //根据id删除员工
    async handleDelete(id) {
      console.log(id);
      //弹窗询问是否删除信息
      const confirmResult = await this.$confirm(
        "此操作将永久删除该员工, 是否继续?",
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
        await this.$axios.delete("/deleteEmployee?uid=" + id);
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
          let uid = this.editForm.uid;
          let uname = this.editForm.uname;
          let enumber = this.editForm.enumber;
          let sex = this.editForm.sex;
          let did = this.editForm.did;
          this.$axios
            .get(
              "/updateEmployee?uid=" +
                uid +
                "&uname=" +
                uname +
                "&enumber=" +
                enumber +
                "&sex=" +
                sex +
                "&did=" +
                did
            )
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
    addConfirm() {
      const _this = this;
      console.log(this.addForm);
      //   console.log(cid);

      this.$refs.addFormRef.validate((valid) => {
        if (valid) {
          this.$axios
            .get(
              "/addEmployee?uname=" +
                this.addForm.uname +
                "&sex=" +
                this.addForm.sex +
                "&did=" +
                this.addForm.did +
                "&enumber=" +
                this.addForm.enumber
            )
            .then((res) => {
              this.$message.success("添加成功");
              this.page(1);
            })
            .catch((err) => {
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
  /*height: 500px;*/
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