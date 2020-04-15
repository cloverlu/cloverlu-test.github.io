<template lang="pug">
	.customize
		ul
			el-form(:model="form"  ref="form")
				li(v-for="(item,index) in form.cusData" :key="index" :class="item.edit ? 'is-active' :'' ")
					.iplist(:class="item.edit ? 'edit-true' :'' " v-if="!item.combine")
						span(v-if="!item.edit") {{item.label}} 
						el-form-item(:prop="'cusData.'+index+'.label'" :ref="index+'.label'"  :rules="item.rules")
							el-input(class="bigin" v-model="item.label" size="mini" v-if="item.edit" @keyup.native.enter="yes(item,index)") 
					.iplist(:class="item.edit ? 'edit-true flexip' :'' " v-if="item.combine")
						span(v-if="!item.edit") {{item.label}}
						el-form-item(:prop="'cusData.'+index+'.labelFormer'" :ref="index+'.labelFormer'" :rules="item.labelFormerRules")
							el-input(class="smallin" v-model="item.labelFormer" size="mini" v-if="item.edit")
						span(v-if="item.edit") /
						el-form-item(:prop="'cusData.'+index+'.labelAfter'" :ref="index+'.labelAfter'" :rules="item.labelAfterRules")
							el-input(class="smallin" v-model="item.labelAfter" size="mini" v-if="item.edit" @keyup.native.enter="yes(item,index)")
					.ip-operate
						.handle-group(v-show="!item.edit")
							.operate.edit(@click="editData(item)")
									i.iconfont.icon-ipv_edit
							.operate.delete(@click="rowDelete(item,index)")
									i.iconfont.icon-ipv_delete
							.operate.edit(@click="up(form.cusData,item.type,index)" v-show="index !== 0 && item.updown")
									i.iconfont.icon-ipv_shangyi
							.operate.edit(@click="down(form.cusData,item.type,index)" v-show="index !== (form.cusData.length - 1) && item.updown")
									i.iconfont.icon-ipv_xiayi
						.handle-group(class="yesno" v-show="item.edit")
							.operate.yes(@click="yes(item,index)")
								i.el-icon-check
							.operate.no(@click="no(item,index)")
								i.el-icon-close
	

</template>

<script>
// combine:点击修改按钮后有多个输入框（agent页面）； updown:有向上向下移动的功能（DNS配置）
// rules由上级组件传来

// const mockdata = [
//   {
//     type: 1,
//     label: "2",
//     edit: false
//   }
// ];
export default {
  props: ["dataList", "rander"],
  data() {
    return {
      cusData: [],
      storeList: [],
      form: {
        cusData: []
      }
    };
  },
  mounted() {
    this.form.cusData = this.dataList;
  },
  watch: {
    dataList: {
      immediate: true,
      handler(val) {
        this.form.cusData = val;
      }
    },
    rander: {
      immediate: true,
      handler(val) {
        if (val && val.index) {
          if (val.combine) {
            let labelFormer = val.index + ".labelFormer";
            let labelAfter = val.index + ".labelAfter";
            this.$refs[labelFormer][0].clearValidate();
            this.$refs[labelAfter][0].clearValidate();
          } else {
            let label = val.index + ".label";
            this.$refs[label][0].clearValidate();
          }
        }
      }
    }
  },
  methods: {
    // 编辑
    editData(item) {
      // 储存修改之前的值，为取消修改做准备
      this.storeList = JSON.parse(JSON.stringify(this.form.cusData));
      this.$emit("storeList", this.storeList);

      if (this.form.cusData.length > 0) {
        this.form.cusData.map(e => {
          if (e.edit === true) {
            e.edit = !e.edit;
          }
        });
      }
      item.edit = true;
    },
    // 删除
    rowDelete(item, index) {
      let data = {
        item: item,
        index: index
      };
      this.$emit("rowDelete", data);
    },
    // ok
    yes(item, index) {
      let data = {
        item: item,
        index: index
      };
      this.$emit("yes", data);
    },
    // 不修改了
    no(item, index) {
      // 清空当前input值
      if (item.combine) {
        let labelFormer = index + ".labelFormer";
        let labelAfter = index + ".labelAfter";
        this.$refs[labelFormer][0].clearValidate();
        this.$refs[labelAfter][0].clearValidate();
      } else {
        let formlabel = index + ".label";
        this.$refs[formlabel][0].clearValidate();
      }

      this.form.cusData = this.storeList;
      this.form.cusData[index].edit = false;
    },
    // 上移
    up(cusData, type, index) {
      let data = {
        dataList: cusData,
        type: type,
        index: index
      };
      this.$emit("up", data);
    },
    // 下移
    down(cusData, type, index) {
      let data = {
        dataList: cusData,
        type: type,
        index: index
      };
      this.$emit("down", data);
    }
  }
};
</script>

<style lang="stylus" scoped>
.customize
	width 100%
	max-height 400px
	ul
		list-style none
		margin 0
		padding 0
		li
			display flex
			color #707070
			&:hover,&:focus,&.is-active
				color #407cea
				.ip-operate
					display block
					margin-top 5px
				.flexip
					display flex
					span
						margin-top 10px
			.iplist
				height 30px
				line-height 30px
				width 400px
				font-size 13px
				&.edit-true
					height 48px
				.el-input
					&.bigin
						width 330px !important
					&.smallin
						width 150px !important

				span
					margin-left 10px
					margin-right 10px
				.el-form-item
					>>>.el-form-item__error
						top 32px
			.ip-operate
				display none
				.handle-group
					display flex
					&.yesno
						margin-top 5px
					.operate
						width: 20px;
						height: 20px;
						border-radius: 50%;
						line-height: 20px;
						text-align: center;
						cursor pointer
						&.edit,&.yes
							background-color: #eef2f6
							color #3f7ce9
							margin-right 6px
						&.delete,&.no
							background-color: #f9f3f2
							color #e25648
						&.yes,&.no
							i
								font-weight 800
						i
							font-size 12px
</style>
