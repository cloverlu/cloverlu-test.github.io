<template lang="pug">
.agent-main(v-loading="loading")
	el-form(:model="form"  :rules="rules" ref="form" label-width='140px')
		el-form-item(label="类型：" prop="type")
			el-radio-group(v-model="form.type" @change="radioChange")
				el-radio(label="host") 主机
				el-radio(label="network") 网络
		.item
			el-form-item(label="客户端允许列表：" prop="SNMPclient")
				el-input(v-model="form.SNMPclient" size="small" placeholder='请输入地址' @keyup.native.enter="addhost('SNMPclient')")
					template(slot="prepend") 地址
			el-button(type="primary" class="sub" size="mini" @click="addhost('SNMPclient')" v-if="form.type === 'host'") 添加
		.item(v-if="form.type === 'network'")
			el-form-item(prop="SNMPcode")
				el-input(v-model="form.SNMPcode" size="small" placeholder='请输入地址' @keyup.native.enter="addhost('SNMPcode')")
					template(slot="prepend") 掩码
			el-button(type="primary" class="sub" size="mini" @click="addhost('SNMPcode')") 添加
		.item-list(v-if="clientList.length > 0 && form.type === 'host'" )
			Customize(
				:dataList="clientList" 
				:rander="randernum"
				@rowDelete="rowDelete" 
				@yes="yes"
				@storeList="storeList"
			)
		.item-list(v-show="clientcodeList.length > 0 && form.type === 'network'" )
			Customize(
				:dataList="clientcodeList" 
				:rander="randernum"
				@rowDelete="rowDelete" 
				@yes="yes"
				@storeList="storeList"
			)

</template>

<script>
import Customize from "../../components/customize";
import ruleValidate from "../../utils/validate";
var clientRule = [
  {
    required: true,
    trigger: "change",
    validator: ruleValidate(["IPv4"], "地址格式不正确", "地址不能为空")
  }
];
var codeRule = [
  {
    required: true,
    trigger: "change",
    validator: ruleValidate(
      ["mask", "mask10"],
      "地址格式不正确",
      "掩码不能为空"
    )
  }
];
export default {
  components: { Customize },
  data() {
    return {
      loading: false,
      form: {
        type: "host",
        SNMPclient: "",
        SNMPcode: ""
      },
      clientList: [],
      clientcodeList: [],
      rules: {
        SNMPclient: clientRule,
        SNMPcode: codeRule
      },
      clientData: [],
      codeData: [],
      storelist: [],
      randernum: {}
    };
  },
  mounted() {},
  methods: {
    // 添加
    addhost(type) {
      var normalData = [];
      var label = "";
      var labelFormer = "";
      var labelAfter = "";
      var combine = false;
      if (type === "SNMPclient") {
        if (this.form.type === "network") {
          return false;
        }
        normalData = this.clientList;
        label = this.form.SNMPclient;
        combine = false;
      } else if (type === "SNMPcode") {
        normalData = this.clientcodeList;
        labelFormer = this.form.SNMPclient;
        labelAfter = this.form.SNMPcode;
        label = this.form.SNMPclient + "/" + this.form.SNMPcode;
        combine = true;
      }

      if (normalData.some(e => e.label === label)) {
        this.$message.error("该地址已存在");
        return false;
      }

      if (normalData.length > 0) {
        normalData.map((e, index) => {
          if (e.edit === true) {
            e.label = this.storelist[index].label;
            // 向customize传递这个随机数的原因是在li里还有错误提示的时候，又去点击添加，回到修改之前的label并触发组件消除验证
            this.randernum = {
              index: index,
              randernum: Math.random(),
              combine: combine
            };
            e.edit = !e.edit;
          }
        });
      }
      if (label) {
        var item = {
          type: type,
          label: label,
          labelFormer: labelFormer,
          labelAfter: labelAfter,
          edit: false,
          combine: combine,
          rules: clientRule,
          labelFormerRules: clientRule,
          labelAfterRules: codeRule
        };
        normalData.push(item);
        if (type === "SNMPclient") {
          this.form.SNMPclient = "";
        } else if (type === "SNMPcode") {
          this.form.SNMPclient = "";
          this.form.SNMPcode = "";
        }
        this.$nextTick(() => {
          this.$refs["form"].clearValidate();
        });
      }
    },
    storeList(data) {
      this.storelist = data;
    },
    // 删除
    rowDelete(data) {
      var normalData = [];
      if (data.item.type === "SNMPclient") {
        normalData = this.clientList;
      } else if (data.item.type === "SNMPcode") {
        normalData = this.clientcodeList;
      }
      normalData.splice(data.index, 1);
    },
    // ok
    yes(data) {
      var normalData = [];
      if (data.item.type === "SNMPclient") {
        normalData = this.clientList;
        normalData[data.index].label = data.item.label;
      } else if (data.item.type === "SNMPcode") {
        normalData = this.clientcodeList;
        normalData[data.index].labelFormer = data.item.labelFormer;
        normalData[data.index].labelAfter = data.item.labelAfter;
        normalData[data.index].label =
          data.item.labelFormer + "/" + data.item.labelAfter;
      }
      normalData[data.index].edit = false;
    },
    radioChange() {
      this.form.SNMPclient = "";
      this.form.SNMPcode = "";
      this.$nextTick(() => {
        this.$refs["form"].clearValidate();
      });
    }
  }
};
</script>

<style lang="stylus" scoped>
.agent-main
	width 100%
	height 100%
	.el-form
		.el-input,.el-select
			width 340px
		.el-form-item
			margin-bottom 15px
			>>>.el-form-item__label
				color #858585
			>>>.el-form-item__error
				top 30px
				left 70px
		.item
			display flex
			.el-input
				margin-right 15px
			.el-button--mini, .el-button--mini.is-round
				padding 0px 15px
				height 30px
				margin-top 0px
		.item-list
			width 410px
			padding 10px
			border 1px solid #cbd5e1
			box-sizing border-box
			margin-left 140px
</style>
