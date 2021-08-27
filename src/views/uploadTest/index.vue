<!--
 * @Descripttion: 
 * @Author: penglu
 * @Date: 2020-07-21 13:05:10
-->
<template lang="pug">
	.upload
		.item(v-for="(item,i) in titleList" :key="item.id")
			.title {{item.text}}
			.upload-wrapper
				uploadTest(:item="item" :itemVmodel="params" :read="false" :ref="`definte16${i}`")
		.aa(@click="submit") 点我啦，展示imageList =>  {{loanBusiness}}
		

</template>

<script>
import uploadTest from "../uploadTest/upload";
export default {
  components: { uploadTest },
  data() {
    const definte17 = _ => {
      const definite17Array = [];
      const valueArray = [
        "财务报表",
        "纳税材料",
        "水电费材料",
        "银行流水",
        "主要上下游客户合同单据",
        "其他财务经营材料",
        "企业办公场所（含企业大门）",
        "企业生产车间（含重要生产或经营工序）",
        "企业重要生产或经营设备、存货",
        "检查人员现场检查的影像",
        "抵押物影像",
        "其他"
      ];
      for (let i = 0; i < valueArray.length; i++) {
        const a = "m3_" + i;
        const b = `pic_${i + 1}s`;
        definite17Array.push({
          id: i,
          text: valueArray[i],
          vModel: b,
          vId: a
        });
      }
      return definite17Array;
    };
    return {
      titleList: definte17(),
      params: {},
      loanBusiness: {}
    };
  },
  mounted() {
    // 没有数据回显
    this.params = this.mVmodel(11);
    // 有回显
    // data为接口传来的一坨值，在详情接口成功返回的数据里写下面这个
    // this.params = this.matchImage(data);
  },
  methods: {
    // 图像模块匹配
    mVmodel(num) {
      const definite16 = {};
      for (let i = 0; i < num; i++) {
        const a = `pic_${i + 1}s`;
        definite16[a] = [
          {
            url: "",
            longitude: "",
            dimension: ""
          }
          // {
          //   url: `http://20.147.168.82:9001/images/2020/07/21/ssss/E4C240BD26732F93A36062976373C55B.JPG`,
          //   longitude: "",
          //   dimension: ""
          // },
          // {
          //   url: `http://20.147.168.82:9001/images/2020/07/21/ssss/6A7ED52FC199BEFD76A1102D6226DCE9.JPG`,
          //   longitude: "",
          //   dimension: ""
          // }
        ];
      }
      return definite16;
    },
    submit() {
      var arrs = {};
      for (let i = 0; i < this.titleList.length; i++) {
        const a = `pic_${i + 1}s`;
        arrs[a] = this.$refs[`definte16${i}`][0].fileList[a];
      }
      this.loanBusiness = Object.assign({}, this.type, arrs);
    },
    //图片对象匹配
    matchImage(data) {
      // data为详情传来的所有值
      var forBizDetail = data;
      var obj2 = {};
      //  this.mVmodel(num)的num参数为各个类型所需字段的个数
      obj2 = this.mVmodel(11);
      Object.keys(obj2).forEach(key => {
        if (forBizDetail) {
          obj2[key] = forBizDetail[key];
        }
      });
      return obj2;
    }
  }
};
</script>

<style lang="stylus" scoped></style>
