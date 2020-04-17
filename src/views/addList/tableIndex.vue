<template lang="pug">
.table-index
	el-form(:model='memberform'  :rules='memberrules' label-width="120px" ref="memberform" )
		el-form-item(label="选择节点类型：" prop="nodeType")
			el-radio-group(v-model="memberform.nodeType" @change="pointType")
				el-radio(v-for="item in pointTypes" :key="item.value" :label="item.value") {{item.label}}
		el-form-item(label="节点名称：" prop="nodeName" )
			el-input(v-model="memberform.nodeName" size="small" )
		el-form-item(label="地址：" prop="address" v-if="memberform.nodeType === '0'")
			el-input(v-model="memberform.address" size="small" )
		el-form-item(label="FQDN：" prop="pointFQDN" v-if="memberform.nodeType === '1'")
			el-input(v-model="memberform.pointFQDN" size="small")
		.port
			el-form-item(label="端口：" prop="port")
				el-input(v-model="memberform.port" size="small" @input="portInput")
			el-form-item(prop="pointselect")
				el-select(v-model="memberform.pointselect" placeholder='SELECT..' size="small" @change="portType")
					el-option(v-for="item in portList" :key="item.value" :value="item.value" :label="item.label")
		el-form-item
			el-button(type="primary" class="sub" size="mini" @click="addMember") 添加
		.member-list
			el-form(:rules="memberTable" :model="memberTable"  ref="memberTable" )
				TrTable(
					:data="tableData"
					:columns="listLabel"
					:filterWidth="80"
					:row-style="{height:'40px'}"
					)
					template(slot="nodeName" slot-scope="scope" )
						el-form-item(:prop="'domains.'+scope.$index+'.nodeName'" :rules="memberTable.nodeName" :class="scope.row.edit ? 'addheight' :'' " v-show="scope.row.edit")
							el-input(v-model="scope.row.nodeName"   size="mini")
						span(v-show="!scope.row.edit") {{scope.row.nodeName}}
					template(slot="address" slot-scope="scope" )
						el-form-item(:prop="'domains.'+scope.$index+'.address'" :rules="memberTable.address" :class="scope.row.edit ? 'addheight' :'' "  v-show="scope.row.edit")
							el-input(v-model="scope.row.address"  size="mini")
						span(v-show="!scope.row.edit") {{scope.row.address}}
					template(slot="port" slot-scope="scope"  )
						.scope-combine(v-show="scope.row.edit")
							el-form-item(:prop="'domains.'+scope.$index+'.port'" :rules="memberTable.port" :class="scope.row.edit ? 'addheight' :'' ")
								el-input(v-model="scope.row.port" size="mini" @input="rowportInput(scope.row,scope.$index)")
							el-select(v-model="scope.row.pointselect" placeholder='SELECT..' size="mini"  @change="rowportType(scope.row,scope.$index)")
								el-option(v-for="item in portList" :key="item.value" :value="item.value" :label="item.label")
						span(v-show="!scope.row.edit") {{scope.row.port}}
					template(slot-scope="scope")
						.handle-group(v-show="!scope.row.edit")
							.operate.edit(@click="editData(scope.row)")
								i.iconfont.icon-ipv_edit
							.operate.delete(@click="rowDelete(scope.$index)")
								i.iconfont.icon-ipv_delete
						.handle-group(v-show="scope.row.edit" :class="scope.row.edit ? 'handle-allheight' :'' ")
							.operate.yes(@click="yes(scope.row,scope.$index)")
								i.el-icon-check
							.operate.no(@click="no(scope.row,scope.$index)")
								i.el-icon-close
</template>

<script>
import { portList } from "../../utils/util";
import TrTable from "../../components/trTable";
import ruleValidate from "../../utils/validate";
export default {
  components: { TrTable },
  data() {
    return {
      memberform: {
        nodeType: "0",
        nodeName: "",
        address: "",
        pointFQDN: "",
        port: "",
        pointselect: ""
      },
      pointTypes: [
        { value: "0", label: "新节点" },
        { value: "1", label: "新FDQN节点" }
      ],
      portList: portList,
      storeList: [],
      storeListAll: [],
      memberrules: {
        nodeName: [
          {
            required: true,
            trigger: "change",
            validator: ruleValidate(
              ["poolname"],
              "必须以英文字母开头，可以包括_和-，最多24个英文或数字字符",
              "节点名称不能为空"
            )
          }
        ],
        address: [
          {
            required: true,
            trigger: "change",
            validator: ruleValidate(["IPv4"], "地址不正确", "地址不能为空")
          }
        ],
        pointFQDN: [
          {
            required: true,
            trigger: "change",
            validator: ruleValidate(
              ["FQDN"],
              "包括-、_、.的最多24个英文字符",
              "FQDN地址不能为空"
            )
          }
        ],
        port: [
          {
            required: true,
            trigger: "change",
            validator: ruleValidate(
              ["port", "*"],
              "1-65536的数组字符或者 * ",
              "端口不能为空"
            )
          }
        ]
      },
      tableData: [],
      listLabel: [
        { prop: "nodeName", label: "节点名称", width: 200 },
        { prop: "address", label: "地址/FDQN", width: 140 },
        { prop: "port", label: "端口", width: 200 }
      ],
      memberTable: {
        nodeName: [
          {
            required: true,
            trigger: "change",
            validator: ruleValidate(
              ["poolname"],
              "必须以英文字母开头，可以包括_和-，最多24个英文或数字字符",
              "节点名称不能为空"
            )
          }
        ],
        address: [
          {
            required: true,
            trigger: "change",
            validator: ruleValidate(
              ["IPv4", "FQDN"],
              "地址不正确 ",
              "地址不能为空"
            )
          }
        ],
        port: [
          {
            required: true,
            trigger: "change",
            validator: ruleValidate(
              ["port", "*"],
              "1-65536的数组字符或者 * ",
              "端口不能为空"
            )
          }
        ]
      }
    };
  },
  computed: {
    // 判断添加成员的form里是否有内容
    memberDataall() {
      return (
        this.memberform.nodeName +
        this.memberform.address +
        this.memberform.port +
        this.memberform.pointFQDN +
        this.memberform.pointselect
      );
    }
  },
  mounted() {
    this.$set(this.memberTable, "domains", this.tableData);
  },
  methods: {
    // 添加成员
    addMember() {
      var address = "";
      if (this.memberform.nodeType === "0") {
        address = this.memberform.address;
      } else if (this.memberform.nodeType === "1") {
        address = this.memberform.pointFQDN;
      }
      var member = {
        nodeName: this.memberform.nodeName,
        address: address,
        port: this.memberform.port,
        pointselect: this.memberform.pointselect,
        edit: false
      };
      this.tableData.push(member);
      // 储存所有原始数据，为点击修改不确定又点击修改为准备
      this.storeListAll = JSON.parse(JSON.stringify(this.tableData));
      this.$refs["memberform"].resetFields();
    },
    pointType() {
      this.memberform.address = "";
      this.memberform.pointFQDN = "";
      this.memberform.nodeName = "";
      this.memberform.port = "";
      this.$refs["memberform"].clearValidate();
    },
    //表格里的port select
    rowportType(item, index) {
      if (item.pointselect === "") {
        this.tableData[index].port = "";
      } else if (item.pointselect !== "") {
        this.tableData[index].port = item.pointselect;
      }
    },
    // 端口select
    portType(val) {
      if (val === "") {
        this.memberform.port = "";
      } else {
        this.memberform.port = val;
      }
    },
    // 端口值改变时判断是否是端口类型已包括的端口
    portInput(val) {
      var dill = "";
      if (val === "*") {
        dill = "*";
      } else {
        dill = parseInt(val);
      }
      this.portList.filter(e => {
        if (e.value === dill) {
          this.memberform.pointselect = dill;
        }
      });
    },
    // 表格里的port input
    rowportInput(item, index) {
      var dill = "";
      if (item.port === "*") {
        dill = "*";
      } else {
        dill = parseInt(item.port);
      }
      this.portList.filter(e => {
        if (e.value === dill) {
          this.tableData[index].pointselect = dill;
        }
      });
    },
    //修改
    editData(row) {
      let _this = this;
      // 点击修改按钮之时储存当前数据，为当行取消修改做准备
      this.storeList = JSON.parse(JSON.stringify(_this.tableData));

      // 在当前行未点击确定时又去点别的行的修改按钮，上个修改过的行回到先前的值
      //一次只能修改一行
      _this.tableData.map((e, i) => {
        if (e.edit) {
          //为啥不可以直接$set或者直接整个e赋值，母鸡，都有问题，需把每个字段都拎出来写一遍
          // _this.$set(_this.tableData, i, _this.storeListAll[i]);
          // e = _this.storeListAll[i]

          e.edit = false;
          e.nodeName = _this.storeListAll[i].nodeName;
          e.address = _this.storeListAll[i].address;
          e.port = _this.storeListAll[i].port;
          e.pointselect = _this.storeListAll[i].pointselect;
        }
      });

      row.edit = true;
    },
    // 删除
    rowDelete(index) {
      this.tableData.splice(index, 1);
    },
    // 确定修改
    yes(row, index) {
      this.$refs["memberTable"].validate(isv => {
        if (isv) {
          this.tableData[index].nodeName = row.nodeName;
          this.tableData[index].address = row.address;
          this.tableData[index].port = row.port;
          this.tableData[index].pointselect = row.pointselect;
          this.tableData[index].edit = false;
          // 只有在数据确定修改的情况下，this.storeListAll才更改数据
          this.$set(this.storeListAll, index, row);
        } else {
          return false;
        }
      });
    },
    // 放弃修改
    no(row, index) {
      this.tableData[index] = this.storeList[index];
      row.edit = false;
      this.$nextTick(() => {
        this.$refs["memberTable"].clearValidate();
      });
    }
  }
};
</script>

<style lang="stylus" scoped>
.table-index
	width 100%
	height 100%
	.el-form
		.member-list
			width 670px
			min-height 130px
			padding 0px 15px
			border 1px solid #e5e5e5
			.el-table
				.el-form-item
					margin-bottom 0px
					>>>.el-form-item__content
						margin-left 0px !important
					&.addheight
						margin-bottom 12px
						>>>.el-form-item__error
							padding-top 0px
				.el-input,.el-select
					width 90%
				.handle-group
					display flex
					.operate
						width 20px
						height 20px
						border-radius 50%
						line-height 20px
						text-align center
						cursor pointer
						&.edit,&.yes
							background-color #eef2f6
							color #3f7ce9
							margin-right 6px
						&.delete,&.no
							background-color #f9f3f2
							color #e25648
						&.yes,&.no
							i
								font-weight 800
						i
							font-size 12px
					&.handle-allheight
						position absolute
						top 15px
				.scope-combine
					display flex
					.el-select
						margin-top 7px
		.el-form-item
			margin-bottom 18px
			>>>.el-form-item__label
				color #858585
			&:last-child
				margin-top 20px
		.duankou
			.el-input
				width 235px
				margin-right 10px
			.el-select
				width 235px
		.item
			width 100%
			height 20px
			line-height 20px
			border-left 4px solid #407cea
			padding-left 6px
			color #858585
			box-sizing border-box
		.el-input,.el-select
			width 480px
		.port
			display flex
			.el-form-item
				&:last-child
					margin-top 0px
					>>>.el-form-item__content
						margin-left 10px !important
			.el-input,.el-select
				width 235px
</style>
