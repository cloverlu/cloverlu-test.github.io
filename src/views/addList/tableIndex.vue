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
</template>

<script>
import { portList } from "../../utils/util";
import ruleValidate from "../../utils/validate";
export default {
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
      memberrules: {}
    };
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
        edit: false,
        nodeName2: this.memberform.nodeName,
        address2: address,
        port2: this.memberform.port,
        pointselect2: this.memberform.pointselect
      };
      this.tableData.push(member);
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
      if (item.pointselect2 === "") {
        this.tableData[index].port2 = "";
      } else if (item.pointselect2 !== "") {
        this.tableData[index].port2 = item.pointselect2;
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
      if (item.port2 === "*") {
        dill = "*";
      } else {
        dill = parseInt(item.port2);
      }
      this.portList.filter(e => {
        if (e.value === dill) {
          this.tableData[index].pointselect2 = dill;
        }
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
