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
          <el-row>
            <el-form
              ref="editFormRef"
              label-width="55px"
              :model="editForm"
              style="margin: 0 auto; padding-right: 0px"
              :rules="addFormRules"
            >
              <el-col :span="4">
                <el-form-item label="部门:" prop="did">
                  <el-select
                    v-model="depData.did"
                    style="width: 170px; float: left"
                    placeholder="请选择部门"
                    @change="selectKaoQinByDid(depData.did)"
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
              </el-col>
              <el-col :span="4">
                <el-form-item label="姓名:" prop="dname">
                  <el-select
                    v-model="employee.uid"
                    style="width: 170px; float: left"
                    placeholder="请选择员工"
                    @change="selectKaoQinByUid(employee.uid)"
                  >
                    <el-option
                      v-for="item in employee"
                      :key="item.uid"
                      :label="item.uname"
                      :value="item.uid"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="工号:" prop="dname">
                  <el-select
                    v-model="employee.uid"
                    style="width: 170px; float: left"
                    placeholder="请选择工号"
                    @change="selectKaoQinByUid(employee.uid)"
                  >
                    <el-option
                      v-for="item in employee"
                      :key="item.uid"
                      :label="item.enumber"
                      :value="item.uid"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label-width="75px" label="执行班次:" prop="dname">
                  <el-select
                    v-model="schedule.cid"
                    style="width: 170px; float: left"
                    placeholder="请选择班次"
                    @change="selectKaoQinByCid(schedule.cid)"
                  >
                    <el-option
                      v-for="item in schedule"
                      :key="item.cid"
                      :label="item.cname"
                      :value="item.cid"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-button
                  type="primary"
                  style="margin: 0px"
                  @click="exportExcelSelect"
                  >导出Excel</el-button
                >
              </el-col>
            </el-form>
            <!--修改考勤信息的对话框-->
            <el-dialog
              title="修改考勤信息"
              :visible.sync="editDialogVisible"
              width="30%"
              @close="editDialogClosed"
            >
              <!--内容主体区-->
              <el-form
                ref="editFormRef"
                style="padding-right: 60px"
                :model="editDialog"
                label-width="80px"
                :rules="addFormRules"
              >
                <el-form-item label="考勤状态" prop="status">
                  <el-select
                    v-model="editDialog.status"
                    style="float: left"
                    placeholder="请选择考勤状态"
                  >
                    <!-- <el-option label="没有打卡" value="0"> </el-option>
                    <el-option label="下班缺卡" value="1"> </el-option>
                    <el-option label="上班缺卡" value="2"> </el-option>
                    <el-option label="正常出勤" value="3"> </el-option> -->
                    <el-option v-for="item in statusData" 
                    :label="item.name" :value="item.id" :key="item.id"> 
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
          </el-row>
          <el-table
            :data="tableData"
            style="width: 100%"
            class="eltable"
            @selection-change="handleSelectionChange"
            :header-cell-style="{ color: '#606266', fontSize: '15px' }"
          >
            <el-table-column
              align="center"
              type="selection"
              width="45"
              style="padding: 0px"
            >
            </el-table-column>
            <el-table-column align="center" label="日期" width="140">
              <template slot-scope="scope">
                <span style="margin-left: 0px">{{ scope.row.date }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="姓名">
              <template slot-scope="scope">
                <span style="margin-left: 0px">{{ scope.row.uname }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="工号">
              <template slot-scope="scope">
                <span style="margin-left: 0px">{{ scope.row.enumber }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="部门">
              <template slot-scope="scope">
                <span style="margin-left: 0px">{{ scope.row.dname }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="班次">
              <template slot-scope="scope">
                <span style="margin-left: 0px">{{ scope.row.cname }}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="考勤状态"
              :formatter="statusFormate"
            >
              <!-- <template slot-scope="scope"> -->
              <!-- <span style="margin-left: 0px">{{ scope.row.status }}</span> -->
              <!-- </template> -->
            </el-table-column>
            <el-table-column align="center" label="上班打卡时间">
              <template slot-scope="scope">
                <span style="margin-left: 0px">{{ scope.row.starttime }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="下班打卡时间">
              <template slot-scope="scope">
                <span style="margin-left: 0px">{{ scope.row.endtime }}</span>
              </template>
            </el-table-column>

            <el-table-column align="center" label="操作">
              <!--作用域插槽可接受scope对象-->
              <template slot-scope="scope">
                <!--编辑按钮-->
                <el-button
                  size="mini"
                  @click="
                    handleEdit(scope.row.uid, scope.row.date, scope.row.status)
                  "
                  >编辑</el-button
                >
                <!--删除按钮-->
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.row.uid, scope.row.date)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
          <el-dialog
            title="考勤列表预览"
            width="70%"
            :visible.sync="selectWindow"
          >
            <el-table :data="selectData" id="selectTable" height="380px">
              <el-table-column prop="date" label="日期"> </el-table-column>
              <el-table-column prop="dname" label="部门"> </el-table-column>
              <el-table-column prop="uname" label="姓名"> </el-table-column>
              <el-table-column prop="enumber" label="工号"> </el-table-column>
              <el-table-column prop="cname" label="班次"> </el-table-column>
              <el-table-column
                prop="status"
                label="考勤状态"
                :formatter="statusFormate"
              >
              </el-table-column>
              <el-table-column prop="starttime" label="上班打卡时间">
              </el-table-column>
              <el-table-column prop="endtime" label="下班打卡时间">
              </el-table-column>
            </el-table>
            <div slot="footer" class="dialog-footer">
              <el-button type="primary" @click="exportExcel"
                >确定保存</el-button
              >
            </div>
          </el-dialog>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script type="text/javascript">
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import htmlToExcel from "../utils/htmlToExcel";

export default {
  components: { Header, Sidebar },
  data() {
    return {
      statusData: [
        { name: "没有打卡", id: 0 },
        { name: "下班缺卡", id: 1 },
        { name: "上班缺卡", id: 2 },
        { name: "正常出勤", id: 3 },
      ],
      selectData: [],
      selectWindow: false,
      tableData: [],
      editForm: {
        did: "",
        cid: "",
      },
      depData: [
        {
          did: "",
          dname: "",
          cid: "",
        },
      ],
      employee: [{}],
      schedule: [{}],
      //查询考勤表单验证规则
      addFormRules: {
        coursename: [
          { required: true, message: "请输入事件名称", tirgger: true },
        ],
        semeter: [{ required: true, message: "请选择导入学期", tirgger: true }],
        weekid: [{ required: true, message: "请选择导入周次", tirgger: true }],
        status: [{ required: true, message: "请选择考勤状态"}],
      },
      editDialogVisible: false,
      editDialog: { status: "" },
    };
  },
  created() {
    this.getDepartment();
    this.selectAllEmployee();
    this.selectAllSchedule();
    this.selectKaoQinByDid(1);
  },
  computed: {},
  methods: {
    exportExcel() {
      htmlToExcel.getExcel("#selectTable", "导出考勤列表");
    },
    exportExcelSelect() {
      if (this.selectData.length < 1) {
        this.$message.error("请选择要导出的内容！");
        return false;
      }
      this.selectWindow = true;
    },
    handleSelectionChange(val) {
      this.selectData = val;
    },
    statusFormate(row) {
      if (row.status == 0) {
        return "没有打卡";
      } else if (row.status == 1) {
        return "下班缺卡";
      } else if (row.status == 2) {
        return "上班缺卡";
      } else {
        return "正常出勤";
      }
    },
    getDepartment() {
      this.$axios.get("/selectDept").then((res) => {
        this.depData = res.data.data;
      });
    },
    selectAllEmployee() {
      this.$axios.get("/selectAllEmployee").then((res) => {
        this.employee = res.data.data;
      });
    },
    selectAllSchedule() {
      this.$axios.get("/selectAllSchedule").then((res) => {
        this.schedule = res.data.data;
        // console.log(this.schedule);
      });
    },
    // findConfirm() {},
    selectKaoQinByDid(did) {
      // console.log(did);
      this.$axios
        .get("/selectKaoQinByDid?did=" + did)
        .then((res) => {
          this.editForm.did = res.data.data[0].did;
          this.editForm.cid = res.data.data[0].cid;
          this.editForm.dname = res.data.data[0].dname;
          this.editForm.cname = res.data.data[0].cname;
          this.tableData = res.data.data;
          // console.log(did + "---------" + res);
          // console.log(res);
        })
        .catch((err) => {
          this.tableData = [];
        });
    },
    selectKaoQinByCid(cid) {
      // console.log(this.schedule);
      // console.log(cid);
      this.$axios
        .get("/selectKaoQinByCid?cid=" + cid)
        .then((res) => {
          this.editForm.did = "";
          this.editForm.cid = res.data.data[0].cid;
          this.editForm.dname = "";
          this.editForm.cname = res.data.data[0].cname;
          this.tableData = res.data.data;
          // console.log(did + "---------" + res);
          // console.log(res);
        })
        .catch((err) => {
          this.tableData = [];
        });
    },
    selectKaoQinByUid(uid) {
      this.$axios
        .get("/selectKaoQinByUid?uid=" + uid)
        .then((res) => {
          this.depData.did = res.data.data[0].did;
          this.schedule.cid = res.data.data[0].cid;
          this.depData.dname = res.data.data[0].dname;
          this.schedule.cname = res.data.data[0].cname;
          this.tableData = res.data.data;
          // console.log(did + "---------" + res);
          // console.log("*************" + this.editForm.cid);
        })
        .catch((err) => {
          this.tableData = [];
        });
    },
    //弹出编辑框
    handleEdit(uid, date, status) {
      this.editDialogVisible = true;
      this.editDialog.uid = uid;
      this.editDialog.date = date;
      this.editDialog.status = status;
    },
    editDialogClosed() {
      //重置对话框
      this.$refs.editFormRef.resetFields();
    },
    editConfirm() {
      // console.log("//////" + this.editDialog.uid);
      // console.log("//////" + this.editDialog.date);
      // console.log("//////" + this.editDialog.status);
      this.$refs.editFormRef.validate((valid) => {
        //valid为true表示校验通过
        if (valid) {
          let uid = this.editDialog.uid;
          let date = this.editDialog.date;
          let status = this.editDialog.status;
          this.$axios
            .get(
              "/updateKaoQin?uid=" + uid + "&date=" + date + "&status=" + status
            )
            .then((res) => {
              this.$message.success("修改成功");
              this.selectKaoQinByDid(1);
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
    //根据id删除考勤信息
    async handleDelete(uid, date) {
      //弹窗询问是否删除信息
      const confirmResult = await this.$confirm(
        "此操作将永久删除该考勤信息, 是否继续?",
        "提示",
        {
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      //如果用户确认删除, 则返回字符串confirm
      //如果取消则会报错,需要catch,之后会返回字符串cancel
      if (confirmResult != "confirm") {
        return this.$message.info("已取消删除");
      } else {
        await this.$axios
          .delete("/deleteKaoQin?uid=" + uid + "&date=" + date)
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
        this.$message.success("删除成功");
        this.selectKaoQinByDid(1);
      }
    },
  },
};
</script>

<style scoped>
.el-table th > .cell {
  padding-left: 12px !important;
  padding-right: 12px !important;
}
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
  height: 850px;
  border: none;
}
.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 20px !important;
  height: 850px;
}
</style>