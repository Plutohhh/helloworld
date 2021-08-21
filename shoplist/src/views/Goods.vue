<template>
  <div>
    <el-container>
      <el-header>
        <Header></Header>
      </el-header>
      <el-container>
        <el-main>
          <el-form
            ref="chooseFormRef"
            label-width="55px"
            :model="selectForm"
            style="margin: 0 auto; padding-right: 0px; display: inline"
            :rules="chooseFormRules"
          >
            <el-form-item
              label="国家:"
              prop="country"
              style="display: inline-block"
            >
              <el-select
                v-model="selectForm.country"
                style="width: 170px; float: left"
                placeholder="请选择国家"
                @change="updateProvince"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="省:"
              prop="province"
              style="display: inline-block"
            >
              <el-select
                v-model="selectForm.province"
                style="width: 170px; float: left"
                placeholder="请选择省"
                @change="updateCity"
              >
                <el-option
                  v-for="item in provinces"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="市:" prop="city" style="display: inline-block">
              <el-select
                v-model="selectForm.city"
                style="width: 170px; float: left"
                placeholder="请选择市"
              >
                <el-option
                  v-for="item in citys"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item style="display: inline-block">
              <el-button type="primary" @click="onSubmit" style="float: left"
                >确认</el-button
              >
            </el-form-item>
          </el-form>
          <div style="margin: 0 0 10px 0; padding-right: 0px; display: block">
            <el-button type="primary" @click="openAddForm">新增</el-button>
            <el-button type="primary" @click="editDialogVisible = true"
              >批量</el-button
            >
          </div>
          <el-table
            :data="pageTableData"
            style="width: 100%"
            @sort-change="sortTable"
            @cell-dblclick="cellClick"
            :cell-class-name="getRowColumn"
            ref="multipleTable"
          >
            <el-table-column type="selection" width="55"> </el-table-column>
            <el-table-column prop="regional" label="地区部">
              <template slot-scope="scope">
                <el-input
                  ref="input"
                  v-if="
                    scope.row.rowid == clickCellRowId &&
                    scope.column.columnid == clickCellColumnId
                  "
                  size="small"
                  style="width: 100px; margin-left: -10px"
                  v-model="scope.row.regional"
                  @blur="inputBlur"
                  placeholder="请输入"
                >
                </el-input>
                <span v-else>{{ scope.row.regional }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="name" label="商品">
              <template slot-scope="scope">
                <el-input
                  ref="input"
                  v-if="
                    scope.row.rowid == clickCellRowId &&
                    scope.column.columnid == clickCellColumnId
                  "
                  size="small"
                  style="width: 100px; margin-left: -10px"
                  v-model="scope.row.name"
                  @blur="inputBlur"
                  placeholder="请输入"
                >
                </el-input>
                <span v-else>{{ scope.row.name }}</span>
              </template></el-table-column
            >
            <el-table-column prop="yesterDayPrice" label="昨日价格">
              <template slot-scope="scope">
                <el-input
                  ref="input"
                  v-if="
                    scope.row.rowid == clickCellRowId &&
                    scope.column.columnid == clickCellColumnId
                  "
                  size="small"
                  style="width: 100px; margin-left: -10px"
                  v-model="scope.row.yesterDayPrice"
                  @blur="inputBlur"
                  placeholder="请输入"
                >
                </el-input>
                <span v-else>{{ scope.row.yesterDayPrice }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="todayPrice" label="今日价格">
              <template slot-scope="scope">
                <el-input
                  ref="input"
                  v-if="
                    scope.row.rowid == clickCellRowId &&
                    scope.column.columnid == clickCellColumnId
                  "
                  size="small"
                  style="width: 100px; margin-left: -10px"
                  v-model="scope.row.todayPrice"
                  @blur="inputBlur"
                  placeholder="请输入"
                >
                </el-input>
                <span v-else>{{ scope.row.todayPrice }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="priceRate" label="价格浮动率">
              <template slot-scope="scope">
                <el-input
                  ref="input"
                  v-if="
                    scope.row.rowid == clickCellRowId &&
                    scope.column.columnid == clickCellColumnId
                  "
                  size="small"
                  style="width: 100px; margin-left: -10px"
                  v-model="scope.row.priceRate"
                  @blur="inputBlur"
                  placeholder="请输入"
                >
                </el-input>
                <span v-else>{{ scope.row.priceRate }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="num" label="涨价数量">
              <template slot-scope="scope">
                <el-input
                  ref="input"
                  v-if="
                    scope.row.rowid == clickCellRowId &&
                    scope.column.columnid == clickCellColumnId
                  "
                  size="small"
                  style="width: 100px; margin-left: -10px"
                  v-model="scope.row.num"
                  @blur="inputBlur"
                  placeholder="请输入"
                >
                </el-input>
                <span v-else>{{ scope.row.num }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="proportion" label="涨价占比">
              <template slot-scope="scope">
                <el-input
                  ref="input"
                  v-if="
                    scope.row.rowid == clickCellRowId &&
                    scope.column.columnid == clickCellColumnId
                  "
                  size="small"
                  style="width: 100px; margin-left: -10px"
                  v-model="scope.row.proportion"
                  @blur="inputBlur"
                  placeholder="请输入"
                >
                </el-input>
                <span v-else>{{ scope.row.proportion }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="releaseTime"
              label="上架时间"
              sortable="custom"
            >
              <template slot-scope="scope">
                <el-input
                  ref="input"
                  v-if="
                    scope.row.rowid == clickCellRowId &&
                    scope.column.columnid == clickCellColumnId
                  "
                  size="small"
                  style="width: 100px; margin-left: -10px"
                  v-model="scope.row.releaseTime"
                  @blur="inputBlur"
                  placeholder="请输入"
                >
                </el-input>
                <span v-else>{{ scope.row.releaseTime }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="offTime" label="下架时间">
              <template slot-scope="scope">
                <el-input
                  ref="input"
                  v-if="
                    scope.row.rowid == clickCellRowId &&
                    scope.column.columnid == clickCellColumnId
                  "
                  size="small"
                  style="width: 100px; margin-left: -10px"
                  v-model="scope.row.offTime"
                  @blur="inputBlur"
                  placeholder="请输入"
                >
                </el-input>
                <span v-else>{{ scope.row.offTime }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="isRelease"
              label="是否上架"
              :formatter="statusRelease"
            >
            </el-table-column>
            <el-table-column label="操作" width="200"
              ><template slot-scope="scope">
                <el-button
                  @click="handleClick(scope.row)"
                  type="text"
                  size="small"
                  >查看</el-button
                >
                <el-button
                  @click="openEditOne(scope.row)"
                  type="text"
                  size="small"
                  :disabled="scope.row.isRelease == false"
                  >编辑</el-button
                >
                <el-button
                  type="text"
                  size="small"
                  @click="releaseOne(scope.row)"
                >
                  <span v-show="scope.row.isRelease == false">上架</span>
                  <span v-show="scope.row.isRelease == true">下架</span>
                </el-button>
                <el-button type="text" size="small" @click="delOne(scope.row)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
          <!--添加商品的对话框-->
          <el-dialog
            title="新增"
            :visible.sync="dialogVisible"
            width="65%"
            :closeOnClickModal="true"
            @close="dialogClosed"
          >
            <!--内容主体区-->
            <el-form
              ref="addFormRef"
              :model="addForm"
              label-width="95px"
              style="padding-right: 0px; display: inline-block"
              :rules="addFormRules"
            >
              <el-form-item label="国家" prop="country">
                <el-input v-model="addForm.country" :disabled="true"></el-input>
              </el-form-item>
              <el-form-item
                label="省:"
                prop="province"
                style="display: inline-block"
              >
                <el-select
                  v-model="addForm.province"
                  style=""
                  placeholder="请选择省"
                  @change="updateAddFormCity()"
                >
                  <el-option
                    v-for="item in provinces"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item
                label="市:"
                prop="city"
                style="display: inline-block"
              >
                <el-select
                  v-model="addForm.city"
                  style=""
                  placeholder="请选择市"
                  @change="change"
                >
                  <el-option
                    v-for="item in citys"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="商品" prop="name">
                <el-input v-model="addForm.name"></el-input>
              </el-form-item>
              <el-form-item label="今日价格" prop="todayPrice">
                <el-input v-model="addForm.todayPrice"></el-input>
              </el-form-item>
              <el-form-item label="昨日价格" prop="yesterDayPrice">
                <el-input v-model="addForm.yesterDayPrice"></el-input>
              </el-form-item>
              <el-form-item label="价格浮动率" prop="priceRate">
                <el-input v-model="addForm.priceRate"></el-input>
              </el-form-item>
              <el-form-item label="涨价数量" prop="num">
                <el-input v-model="addForm.num" @input="numchange"></el-input>
              </el-form-item>
              <el-form-item label="涨价占比" prop="proportion">
                <el-input
                  v-model="addForm.proportion"
                  :disabled="true"
                ></el-input>
              </el-form-item>
            </el-form>
            <!--底部区域-->
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="addConfirm">确 定</el-button>
            </span>
          </el-dialog>
          <!--编辑商品的对话框-->
          <el-dialog
            title="编辑"
            :visible.sync="editOneDialogVisible"
            width="65%"
            :closeOnClickModal="false"
            @close="editOneDialogClosed"
          >
            <!--内容主体区-->
            <el-form
              ref="editOneFormRef"
              :model="editOneForm"
              label-width="95px"
              style="padding-right: 0px; display: inline-block"
              :rules="addFormRules"
            >
              <el-form-item label="国家" prop="country">
                <el-input
                  v-model="editOneForm.country"
                  :disabled="true"
                ></el-input>
              </el-form-item>
              <el-form-item
                label="省:"
                prop="province"
                style="display: inline-block"
              >
                <el-select
                  v-model="editOneForm.province"
                  style=""
                  placeholder="请选择省"
                  @change="updateEditOneCity()"
                >
                  <el-option
                    v-for="item in provinces"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item
                label="市:"
                prop="city"
                style="display: inline-block"
              >
                <el-select
                  v-model="editOneForm.city"
                  style=""
                  @change="change()"
                  placeholder="请选择市"
                >
                  <el-option
                    v-for="item in citys"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="商品" prop="name">
                <el-input v-model="editOneForm.name"></el-input>
              </el-form-item>
              <el-form-item label="今日价格" prop="todayPrice">
                <el-input v-model="editOneForm.todayPrice"></el-input>
              </el-form-item>
              <el-form-item label="昨日价格" prop="yesterDayPrice">
                <el-input v-model="editOneForm.yesterDayPrice"></el-input>
              </el-form-item>
              <el-form-item label="价格浮动率" prop="priceRate">
                <el-input v-model="editOneForm.priceRate"></el-input>
              </el-form-item>
              <el-form-item label="涨价数量" prop="num">
                <el-input v-model="editOneForm.num"></el-input>
              </el-form-item>
              <el-form-item label="涨价占比" prop="proportion">
                <el-input
                  v-model="editOneForm.proportion"
                  :disabled="true"
                ></el-input>
              </el-form-item>
            </el-form>
            <!--底部区域-->
            <span slot="footer" class="dialog-footer">
              <el-button @click="editOneDialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="editOneConfirm()"
                >确 定</el-button
              >
            </span>
          </el-dialog>
          <!--批量编辑对话框-->
          <el-dialog
            title="批量编辑"
            :visible.sync="editDialogVisible"
            width="65%"
            :closeOnClickModal="false"
            @close="editDialogClosed"
          >
            <!--内容主体区-->
            <el-form
              ref="editFormRef"
              :model="editForm"
              label-width="95px"
              style="padding-right: 0px; display: inline-block"
              :rules="addFormRules"
            >
              <el-form-item label="今日价格" prop="todayPrice">
                <el-input v-model="editForm.todayPrice"></el-input>
              </el-form-item>
              <el-form-item label="昨日价格" prop="yesterDayPrice">
                <el-input v-model="editForm.yesterDayPrice"></el-input>
              </el-form-item>
              <el-form-item label="价格浮动率" prop="priceRate">
                <el-input v-model="editForm.priceRate"></el-input>
              </el-form-item>
              <el-form-item label="涨价数量" prop="num">
                <el-input v-model="editForm.num"></el-input>
              </el-form-item>
            </el-form>
            <!--底部区域-->
            <span slot="footer" class="dialog-footer">
              <el-button @click="editDialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="()=>editConfirm(editForm.todayPrice,editForm.yesterDayPrice,editForm.priceRate,editForm.num)"
                >确 定</el-button
              >
            </span>
          </el-dialog>
          <!--查看详情对话框-->
          <el-dialog
            title="详情"
            :visible.sync="infoDialogVisible"
            width="45%"
            :closeOnClickModal="true"
            style="padding-top: 0px"
            top="20px"
          >
            <el-card class="box-card" shadow="hover">
              <div slot="header" class="clearfix">
                <span>基本信息</span>
              </div>
              <div>
                <el-row :gutter="80">
                  <el-col :span="8"
                    ><span>国家： {{ goodsInfo.country }}</span></el-col
                  >
                  <el-col :span="8"
                    ><span>省： {{ goodsInfo.province }}</span></el-col
                  >
                  <el-col :span="8"
                    ><span>市： {{ goodsInfo.city }}</span></el-col
                  >
                </el-row>
                <el-row :gutter="80">
                  <el-col :span="8">
                    <span>商品： {{ goodsInfo.name }}</span></el-col
                  >
                  <el-col :span="8">
                    <span>今日价格： {{ goodsInfo.todayPrice }}</span></el-col
                  >
                  <el-col :span="8">
                    <span
                      >昨日价格： {{ goodsInfo.yesterDayPrice }}</span
                    ></el-col
                  >
                </el-row>
                <el-row :gutter="80" style="margin-bottom: 0px">
                  <el-col :span="8">
                    <span>价格浮动率： {{ goodsInfo.priceRate }}</span></el-col
                  >
                  <el-col :span="8">
                    <span>涨价数量： {{ goodsInfo.num }}</span></el-col
                  >
                  <el-col :span="8">
                    <span>涨价占比： {{ goodsInfo.proportion }}</span></el-col
                  >
                </el-row>
              </div>
            </el-card>
            <div class="record">
              <span>操作记录</span>
              <el-table
                :data="recordData"
                style="width: 100%; margin: 10px"
                border
                :header-cell-style="{ color: '#606266', background: '#eae5e5' }"
                >>
                <el-table-column type="index" width="50"> </el-table-column>
                <el-table-column prop="name" label="商品"></el-table-column>
                <el-table-column prop="record" label="操作记录">
                </el-table-column>
                <el-table-column prop="time" label="时间"> </el-table-column>
              </el-table>
            </div>
          </el-dialog>
          <div class="pagination">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="currentPage"
              :page-sizes="[5, 10, 15, 20]"
              :page-size="pageSize"
              layout="total,sizes, prev, pager, next, jumper"
              :total="total"
            >
            </el-pagination>
            <!-- <el-button @click="pageChange">---</el-button> -->
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script type="text/javascript">
import Header from "../components/Header";
export default {
  components: { Header },
  data() {
    return {
      //批量编辑窗口
      infoDialogVisible: false,
      //批量编辑窗口
      editDialogVisible: false,
      //编辑单个商品窗口
      editOneDialogVisible: false,
      //新增窗口
      dialogVisible: false,
      //新增表单数据
      addForm: {
        country: "中国",
      },
      //批量编辑表单数据
      editForm: {
        todayPrice: "",
        yesterDayPrice: "",
        priceRate: "",
        num: "",
      },
      chooseForm: {},
      //地区选择表单绑定值
      selectForm: {
        country: "",
        province: "",
        city: "",
      },
      //下拉框备选项
      options: [],
      provinces: [],
      citys: [],
      //下拉框绑定值
      value: "",
      //地区表单校验规则
      chooseFormRules: {
        country: [{ required: true, message: "请选择国家" }],
        province: [{ required: true, message: "请选择省份" }],
        city: [{ required: true, message: "请选择城市" }],
      },
      //添加表单校验规则
      addFormRules: {
        country: [{ required: true, message: "请选择国家" }],
        province: [{ required: true, message: "请选择省份" }],
        city: [{ required: true, message: "请选择城市" }],
        name: [{ required: true, message: "请填写商品名" }],
        todayPrice: [{ required: true, message: "请填写今日价格" }],
        yesterDayPrice: [{ required: true, message: "请填写昨日价格" }],
        priceRate: [{ required: true, message: "请填写价格浮动率" }],
        num: [{ required: true, message: "请填写涨价数量" }],
      },
      //分页表格数据
      pageTableData: [],
      //表格数据
      tableData: [],
      //商品详情信息
      goodsInfo: {},
      //商品操作数据
      recordData: [],
      //查询页号
      currentPage: 1,
      //数据总数
      total: 20,
      //每页数量
      pageSize: 10,
      //编辑框对象
      editOneForm: {},
      clickCellRowId: null, //用于判断点击是哪行
      clickCellColumnId: null, //用于判断点击是哪列
    };
  },
  computed: {},
  created() {
    this.getRegional();
    this.getdata();
    this.getRecordData();
    // setTimeout(this.pageChange(), 10 )
    // this.updateProvince()
  },
  methods: {
    //table初始化的时候给行和列 赋index
    getRowColumn({ row, column, rowIndex, columnIndex }) {
      row.rowid = rowIndex;
      column.columnid = columnIndex;
      // console.log(rowIndex);
      // console.log(columnIndex);
    },
    cellClick(row, column, cell, event) {
      this.clickCellRowId = row.rowid;
      this.clickCellColumnId = column.columnid;
      this.$nextTick(() => {
        this.$refs.input.focus();
      });
    },
    inputBlur() {
      this.clickCellRowId = null;
      this.clickCellColumnId = null;
    },
    sortTable(temp) {
      // console.log(temp);
      // console.log(temp.order);
      //ascending升序
      if (temp.order == "ascending") {
        this.tableData.sort((a, b) => {
          return (
            a.releaseTime.replace(/-/g, "") - b.releaseTime.replace(/-/g, "")
          );
        });
      } else if (temp.order == "descending") {
        this.tableData.sort((a, b) => {
          return (
            b.releaseTime.replace(/-/g, "") - a.releaseTime.replace(/-/g, "")
          );
        });
      }
      this.pageChange();
    },
    change() {
      this.$forceUpdate();
      console.log(this.addForm.city);
    },
    //传入城市id和全国数组
    keyUtil(cityId, regionals) {
      let regional = new Array();
      for (let country of regionals) {
        regional.push(country.label);
        for (let province of country.children) {
          regional.push(province.value);
          for (let city of province.children) {
            if (cityId == city.value) {
              regional.push(city.value);
              return regional;
            }
          }
          regional.pop();
        }
        regional.pop();
      }
      if (regional.length == 0) {
        return null;
      }
    },
    //传入城市id和全国数组
    cityUtil(cityId, regionals) {
      let regional = new Array();
      for (let country of regionals) {
        regional.push(country.label);
        for (let province of country.children) {
          regional.push(province.label);
          for (let city of province.children) {
            if (cityId == city.value) {
              regional.push(city.label);
              return regional;
            }
          }
          regional.pop();
        }
        regional.pop();
      }
      if (regional.length == 0) {
        return null;
      }
    },
    dateUtil() {
      let date = new Date();
      let mon = date.getMonth() + 1;
      let day = date.getDate();
      if (mon <= 9) {
        mon = "0" + mon;
      }
      if (day <= 9) {
        day = "0" + day;
      }
      let fullDate = date.getFullYear() + "-" + mon + "-" + day;
      return fullDate;
    },
    //查看商品详情
    handleClick(row) {
      // console.log(row);
      this.infoDialogVisible = true;
      this.goodsInfo = row;
      let regional = this.cityUtil(row.cityId, this.options);
      this.goodsInfo.country = regional[0];
      this.goodsInfo.province = regional[1];
      this.goodsInfo.city = regional[2];
    },
    async delOne(row) {
      //弹窗询问是否删除信息
      const confirmResult = await this.$confirm(
        "此操作将删除该商品, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      if (confirmResult != "confirm") {
        return this.$message.info("已取消删除");
      } else {
        for (let i in this.tableData) {
          if (row.index == this.tableData[i].index) {
            this.tableData.splice(i, 1);
          }
        }
        // this.tableData.splice(row.index, 1);
        this.$message.success("删除成功");
        this.pageChange();
      }
    },
    releaseOne(row) {
      // this.tableData.filter(n=>n.index==row.index)
      for (let i in this.tableData) {
        if (this.tableData[i].index == row.index) {
          this.tableData[i].isRelease =
            this.tableData[i].isRelease == true ? false : true;
          // console.log(i);
          break;
        }
      }
      // this.tableData[row.index].isRelease = false;
      // console.log(row.index);
      this.pageChange();
    },
    openEditOne(row) {
      this.editOneForm = { ...row };
      // this.$set(this,'editOneForm',{...row})
      this.editOneDialogVisible = true;
      let regional = this.keyUtil(row.cityId, this.options);
      this.editOneForm.country = regional[0];
      this.editOneForm.province = parseInt(regional[1]);
      this.editOneForm.city = parseInt(regional[2]);
      // console.log(this.editOneForm);
      //中国value=1
      let country = 1;
      this.provinces = this.options.filter(
        (n) => n.value == country
      )[0].children;
      this.citys = this.provinces.filter(
        (n) => n.value === this.editOneForm.province
      )[0].children;
    },
    updateEditOneCity() {
      let province = this.editOneForm.province;
      this.citys = this.provinces.filter(
        (n) => n.value === province
      )[0].children;
      this.editOneForm.city = undefined;
      // console.log('updateCity update')
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.pageChange();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.pageChange();
    },
    //换页面方法
    pageChange() {
      //需要展示currentPage=1,pageSize=5,total=23
      this.total = this.tableData.length;
      let start = this.pageSize * (this.currentPage - 1);
      let end = this.currentPage * this.pageSize;
      //为分页表格数据赋值
      this.pageTableData = this.tableData.slice(start, end);
      // console.log(this.pageTableData);
    },
    //初始化商品信息
    getdata() {
      this.$axios
        .get("/static/json/data.json")
        .then((res) => {
          this.tableData = res.data;
          this.$store.state.tableData = res.data;
          for (let i in this.tableData) {
            let index = "index";
            this.tableData[i][index] = i;
          }
          this.tableData.sort((a, b) => {
            return (
              b.releaseTime.replace(/-/g, "") - a.releaseTime.replace(/-/g, "")
            );
          });
          this.pageChange();
        })
        .catch(function (err) {
          console.log(err);
        });
    },
    //载入操作记录数据
    getRecordData() {
      this.$axios
        .get("/static/json/recordData.json")
        .then((res) => {
          this.recordData = res.data;
          this.$store.state.recordData = res.data;
          // console.log(this.recordData);
        })
        .catch(function (err) {
          console.log(err);
        });
    },
    //打开新增商品窗口
    openAddForm() {
      this.dialogVisible = true;
      //加载省市下拉框数据
      this.provinces = this.$store.state.regional.filter(
        (n) => n.value == 1
      )[0].children;
      // console.log(this.provinces);
    },
    numchange() {
      this.addForm.proportion = (this.addForm.num / 12).toFixed(2) * 100;
    },
    //新增表单
    addConfirm() {
      this.$refs.addFormRef.validate((valid) => {
        //valid为true表示校验通过
        if (valid) {
          this.dialogVisible = false;
          let item = {};
          let cityId = this.addForm.city;
          item.regional = this.citys.filter(function (n) {
            // console.log(n.value + n.label + n.value == cityId);
            return n.value == cityId;
          })[0].label;
          item.name = this.addForm.name;
          item.todayPrice = this.addForm.todayPrice;
          item.yesterDayPrice = this.addForm.yesterDayPrice;
          item.priceRate = this.addForm.priceRate;
          item.num = this.addForm.num;
          item.priveNum = 12;
          item.proportion = this.addForm.proportion;
          item.cityId = this.addForm.city;
          item.isRelease = false;
          item.invalid = 0;
          item.releaseTime = this.dateUtil();
          item.offTime = this.dateUtil();

          // console.log(item);
          this.tableData.push(item);
          this.tableData.sort((a, b) => {
            return (
              b.releaseTime.replace(/-/g, "") - a.releaseTime.replace(/-/g, "")
            );
          });
          this.pageChange();
        } else {
          return false;
        }
      });
    },
    //编辑商品
    editOneConfirm() {
      // console.log(this.editForm);
      // console.log(temp);
      this.$refs.editOneFormRef.validate((valid) => {
        //valid为true表示校验通过
        if (valid) {
          for (let i in this.tableData) {
            if (this.tableData[i].index === this.editOneForm.index) {
              // let addKeys = ['name',t]
              this.tableData.splice(i, 1, {
                ...this.tableData[i],
                ...this.editOneForm,
                //...{name:1}
                //{...{name:1},value:2}  {name:1,value:2}
              });
              console.log(this.editOneForm);
              console.log(this.editOneForm.name);
              break;
            }
          }
          this.pageChange();
          this.editOneDialogVisible = false;
        } else {
          return false;
        }
      });
    },

    //新增表单
    editConfirm(todayPrice,yesterDayPrice,priceRate,num) {
      // console.log(this.editForm);

      //获取所有被选中的index
      let lists = this.$refs.multipleTable.selection;
      // let editData = this.editForm
      // console.log(this.editForm);
      this.$refs.editFormRef.validate((valid) => {
        //valid为true表示校验通过
        if (valid) {
          //展开语法深拷贝editForm对象

          //通过splice方法进行修改tableData
          for (let item of lists) {
            // console.log(item.index);

            for (let i in this.tableData) {
              if (this.tableData[i].index === item.index) {

                // console.log(this.tableData[i].name);
                // console.log(editData);

                this.tableData.splice(i, 1, {
                  ...this.tableData[i],
                  todayPrice:todayPrice,
                  yesterDayPrice:yesterDayPrice,
                  priceRate:priceRate,
                  num:num,
                });
                // console.log(this.tableData[i]);
                break;

              }
            }
          }
          //将this。editForm赋值给每个对应index的对象
          this.pageChange();
          this.editDialogVisible = false;
        } else {
          return false;
        }
      });
    },
    //关闭新增表单窗口
    dialogClosed() {
      //重置对话框
      this.$refs.addFormRef.resetFields();
    },
    //关闭批量编辑表单窗口
    editDialogClosed() {
      //重置对话框
      this.$refs.editFormRef.resetFields();
    },
    //关闭批量编辑表单窗口
    editOneDialogClosed() {
      //重置对话框
      this.$refs.editOneFormRef.resetFields();
    },
    //上架状态
    statusRelease(row) {
      // console.log(row.isRelease);
      if (row.isRelease) {
        return "是";
      } else {
        return "否";
      }
    },
    onSubmit() {
      // console.log(this.selectForm.city);
      // console.log(this.tableData.filter(n=>n.cityId==this.selectForm.city));
      this.$refs.chooseFormRef.validate((valid) => {
        //valid为true表示校验通过
        if (valid) {
          this.tableData = this.$store.state.tableData.filter(
            (n) => n.cityId == this.selectForm.city
          );
          this.pageChange();
        } else {
          return false;
        }
      });
    },
    //初始化地区信息
    getRegional() {
      this.$axios
        .get("/static/json/regional.json")
        .then((res) => {
          this.options = res.data;
          this.$store.state.regional = res.data;
        })
        .catch(function (err) {
          console.log(err);
        });
    },
    updateProvince() {
      let country = this.selectForm.country;
      this.provinces = this.options.filter(
        (n) => n.value == country
      )[0].children;
      this.selectForm.province = undefined;
      // console.log('updateCity update')
    },
    updateCity() {
      let province = this.selectForm.province;
      this.citys = this.provinces.filter(
        (n) => n.value === province
      )[0].children;
      this.selectForm.city = undefined;
      // console.log('updateCity update')
    },
    updateAddFormCity() {
      let province = this.addForm.province;
      this.citys = this.provinces.filter(
        (n) => n.value === province
      )[0].children;
      this.addForm.city = "";
      this.$forceUpdate();
    },
  },
};
</script>
<style scoped>
.pagination {
  text-align: center !important;
  margin-top: 10px;
}
.record span {
  margin-left: 20px;
  color: black;
}
.record {
  margin-top: 30px;
}
.box-card .el-row {
  text-align: center !important;
  margin-bottom: 36px;
}
.dialog-footer .el-button {
}
.dialog-footer {
  text-align: center !important;
}
.el-dialog__footer {
  text-align: center !important;
}
.el-dialog__header {
  /* border-bottom: 1px solid #ebebeb;
   */
}
.el-input,
.el-select {
  width: 300px;
}
.el-form-item {
  display: inline-block;
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
  text-align: left;
  line-height: 20px !important;
  height: 850px;
  /*height: 500px;*/
}
</style>