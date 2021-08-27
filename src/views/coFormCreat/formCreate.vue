<!--
 * @Descripttion: 
 * @Author: penglu
 * @Date: 2020-10-16 14:37:36
-->
<template lang="pug">
.form-create(@click="formCreat")
	.form
		template(v-for="(item,index) in typeJson" )
			div(v-if="item.type === 'title-small'" class="small-title")
				span(class="dian")
				span {{item.title}} 
			el-form-item(:label="item.title" :prop="item.field" v-if="item.type !== filterType(item.type) " :rules="item.rules" :class="elFormItemClass(item.type)" :tag="item.type")
				el-input(v-if="item.type === 'input'" v-model="params[item.field]" :validate-event="false" :disabled='disabel' size="small" )
				el-input(v-if="item.type === 'input-long'" v-model="params[item.field]" :validate-event="false" :disabled='disabel' size="small" )
				template(v-if="item.type === 'input-loan'")
					el-input(v-model="params[item.field]"  :validate-event="false" size="small"  :disabled='disabel' @input="transBig(params[item.field],item)")
					.bigValue {{params[item.capitalized]}}
				el-select(v-if="item.type === 'select'" v-model="params[item.field]" :validate-event="false" :disabled='disabel' size="small")
					el-option(v-for="(item2,index2) in item.options" :key="index2" :label="item2.label" :value="item2.value" )
				el-radio-group(v-if="item.type === 'radio'" v-model="params[item.field]" :validate-event="false" :disabled='disabel')
					el-radio(v-for="(item2,index2) in item.options" :key="index2" :label="item2.value") {{item2.label}}
				template(v-if="item.type === 'radio-flattern'" )
					.tem
						template(v-if="item.options[0].summary === true" v-for="item2 in item.options[0].children2")
							span(v-if="item2.type==='text'") {{item2.text}}
							el-input(v-model="params[item2.text]"  :validate-event="false"  	v-if="item2.type==='input'" :disabled='true' size="mini" )
					el-radio-group( v-model="params[item.field]" :validate-event="false" :disabled='disabel' class="radio-flattern" @change="radioFlattern(params[item.field],item.options)")
						el-radio(v-for="(item3,index3) in item.options" :key="index3" :label="item3.value" v-if="item3.summary === false") 
							template(v-for="(item2,index2) in item3.children2" )
								span(v-if="item2.type==='title'" class="title") {{item2.text}}
								span(v-else-if="item2.type==='text'") {{item2.text}}
								el-form-item(
									:prop="item2.text" 
									:rules="item2.rules"
									:class="item2.type"
									v-else
								)
									el-input(v-model="params[item2.text]" :validate-event="false"  	:disabled='disabel' v-if="item2.type==='input' && (item2.summary === false || item2.summary === 'false')" size="mini")
									el-date-picker(v-if="item2.type === 'datePicker'" 
												v-model="params[item2.text]"
												type="date"
												placeholder="选择日期"
												size="mini"
												:validate-event="false"
												:disabled='disabel'
												)
									el-select(v-if="item2.type === 'select'" v-model="params[item2.text]" :validate-event="false" :disabled='disabel' size="mini")
										el-option(v-for="(item3,index3) in item2.options" :key="index3" :label="item3.label" :value="item3.value" )
									el-input(v-model="params[item2.text]" :validate-event="false"   	v-if="item2.type==='input' && (item2.summary === true || item2.summary === 'true') " :disabled="true" size="mini")
									el-popover(v-if="item2.type === 'radioInput'" :ref="`popover-${item2.text}`"  placement="right" width="800" trigger="click"  )
										el-radio-group(v-model="params[item2.text]" :validate-event="false" :disabled='disabel' @change="flatternRadio2(params[item2.text],item2.options,item2.text)" class="radioSmall")
											el-radio(v-for="(item4,index4) in item2.options" :key="index4" :label="item4.value" )
												template(v-if="!item4.options") {{item4.label}}
												template(v-if="item4.options" v-for="item5 in item4.children") 
													span(v-if="item5.type==='text'") {{item5.text}}
													el-form-item(v-else :prop="item5.text"  :rules="item5.rules")
														el-input(v-model="params[item5.text]" :validate-event="false"  :disabled='disabel'	v-if="item5.type==='input'" size="mini")
										//- el-button(slot="reference") click 激活
										div(style="text-align: right; margin: 0")
											el-button(size="mini" type="text" @click="no(item2.text)") 取消
											el-button(type="primary" size="mini" @click="yes(params[item2.text],item2.options,item2.text)") 确定
										
										el-input(v-model="params[item2.text + '.showText']" :disabled="true" :validate-event="false" size="mini" slot="reference" @click.native="propClick(item2)")

				template(v-if="item.type === 'checkbox-flattern'" )
					.tem
						template(v-if="item.options[0].summary === true" v-for="item2 in item.options[0].children2")
							span(v-if="item2.type==='text'") {{item2.text}}
							el-input(v-model="params[item2.text]"  :validate-event="false"  	v-if="item2.type==='input' && (item2.summary === false || item2.summary === 'false')" :disabled='true' size="mini" )
					el-checkbox-group( v-model="params[item.field]" :validate-event="false" :disabled='disabel' class="radio-flattern" @change="radioFlattern(params[item.field],item.options)")
						el-checkbox(v-for="(item3,index3) in item.options" :key="index3" :label="item3.value" v-if="item3.summary === false") 
							template(v-for="(item2,index2) in item3.children2" )
								span(v-if="item2.type==='title'" class="title") {{item2.text}}
								span(v-else-if="item2.type==='text'") {{item2.text}}
								el-form-item(
									:prop="item2.text" 
									:rules="item2.rules"
									:class="item2.type"
									v-else
								)
									el-input(v-model="params[item2.text]" :validate-event="false"  :disabled='disabel'	v-if="item2.type==='input'" size="mini")
									el-date-picker(v-if="item2.type === 'datePicker'" 
												v-model="params[item2.text]"
												type="date"
												placeholder="选择日期"
												size="mini"
												:validate-event="false"
												:disabled='disabel'
												)
									el-select(v-if="item2.type === 'select'" v-model="params[item2.text]" :validate-event="false" :disabled='disabel' size="mini")
										el-option(v-for="(item3,index3) in item2.options" :key="index3" :label="item3.label" :value="item3.value" )
									el-input(v-model="params[item2.text]" :validate-event="false"  	v-if="item2.type==='input' && (item2.summary === true || item2.summary === 'true') " :disabled="true" size="mini")
									el-popover(v-if="item2.type === 'radioInput'" :ref="`popover-${item2.text}`"  placement="right" width="800" trigger="click"  )
										el-radio-group(v-model="params[item2.text]" :validate-event="false" :disabled='disabel' @change="flatternRadio2(params[item2.text],item2.options,item2.text)" class="radioSmall")
											el-radio(v-for="(item4,index4) in item2.options" :key="index4" :label="item4.value" )
												template(v-if="!item4.options") {{item4.label}}
												template(v-if="item4.options" v-for="item5 in item4.children") 
													span(v-if="item5.type==='text'") {{item5.text}}
													el-form-item(v-else :prop="item5.text"  :rules="item5.rules")
														el-input(v-model="params[item5.text]" :validate-event="false"  :disabled='disabel'	v-if="item5.type==='input'" size="mini")
										//- el-button(slot="reference") click 激活
										div(style="text-align: right; margin: 0")
											el-button(size="mini" type="text" @click="no(item2.text)") 取消
											el-button(type="primary" size="mini" @click="yes(params[item2.text],item2.options,item2.text)") 确定
										
										el-input(v-model="params[item2.text + '.showText']" :disabled="true" :validate-event="false" size="mini" slot="reference" @click.native="propClick(item2)")
				el-checkbox-group(v-if="item.type === 'checkbox' " v-model="params[item.field]" :validate-event="false" :disabled='disabel')
					el-checkbox(v-for="(item2,index2) in item.options" :key="index2" :label="item2.value") {{item2.label}}
				el-date-picker(v-if="item.type === 'datePicker'" 
											v-model="params[item.field]"
											type="date"
											placeholder="选择日期"
											size="small"
											:validate-event="false"
											:disabled='disabel'
											)
				el-date-picker(v-if="item.type === 'datePickerRange'"
											v-model="params[item.field]"
											type="daterange"
											range-separator="至"
											start-placeholder="开始日期"
											end-placeholder="结束日期"
											size="small"
											:validate-event="false"
											:disabled='disabel'
											)
				.input-flatten(v-if="item.type === 'input-flatten'")
					template( v-for="item2 in item.children")
						span(v-if="item2.type === 'text'") {{item2.text}} 
						el-form-item(v-else-if="item2.type === 'input'" :prop="item2.text"  :rules="item2.rules" )
							el-input( v-model="params[item2.text]" :disabled='disabel' size="small" class="input-flatten-input")
				

			.famtter(v-if="item.type === 'famtter'") 
				ul
					li(v-for="(item3,index3) in item.children" :key="index3")
						template(v-for="(item2,index2) in item3" )
							span(v-if="item2.type==='title'" class="small-title") {{item2.text}}
							span(v-else-if="item2.type==='text'") {{item2.text}}
							el-form-item(
								:prop="item2.text" 
								v-else-if="item2.type==='input'"
								:rules="item2.rules"
								class="famtte-item"
							)
								el-input(v-model="params[item2.text]" :validate-event="false"  :disabled='disabel' size="mini")
			.famtter(v-if="item.type === 'famtter2'") 
				ul
					li(v-for="(item3,index3) in item.children" :key="index3")
						template(v-for="(item2,index2) in item3" )
							span(v-if="item2.type==='title'" class="small-title") {{item2.text}}
							span(v-else-if="item2.type==='text'") {{item2.text}}
							el-form-item(
								:prop="item2.text" 
								:rules="item2.rules"
								:class="item2.type"
								v-else
							)
								el-input(v-model="params[item2.text]" :validate-event="false"  :disabled='disabel'	v-if="item2.type==='input'" size="mini")
								el-date-picker(v-if="item2.type === 'datePicker'" 
											v-model="params[item2.text]"
											type="date"
											placeholder="选择日期"
											size="mini"
											:validate-event="false"
											:disabled='disabel'
											)
								el-select(v-if="item2.type === 'select'" v-model="params[item2.text]" :validate-event="false" :disabled='disabel' size="mini")
									el-option(v-for="(item3,index3) in item2.options" :key="index3" :label="item3.label" :value="item2.value" )
								el-radio-group(v-if="item2.type === 'radio'" v-model="params[item2.text]" :validate-event="false" :disabled='disabel')
									el-radio(v-for="(item4,index4) in item2.options" :key="index4" :label="item4.value") {{item4.label}}
								el-radio-group(v-if="item2.type === 'radioInput'" v-model="params[item2.text]" :validate-event="false" :disabled='disabel')
									el-radio(v-for="(item4,index4) in item2.options" :key="index4" :label="item4.value")
										template(v-if="!item4.options") {{item4.label}}
										template(v-if="item4.options" v-for="item5 in item4.children") 
											span(v-if="item5.type==='text'") {{item5.text}}
											el-form-item(v-else-if="item5.type !=='text'" :prop="item5.text"  :rules="item5.rules")
												el-input(v-model="params[item5.text]" :validate-event="false"  :disabled='disabel'	v-if="item5.type==='input'" size="mini")


			.table-index(v-if="item.type === 'table-info'")
				TrTable(
					:data="item.children"
					:columns="item.options"
					:filterWidth="80"
					:row-style="{height:'40px'}"
					)
					template(v-for="item2 in item.options" :slot="item2.prop" slot-scope="scope" )
						el-form-item(:prop="item.id + '.' + scope.$index + '.' +item2.prop"  :rules="item2.rules" class="addheight" )
							el-input(v-model="scope.row[item2.prop]" :disabled='disabel'   size="mini" v-if="item2.type==='input'" :validate-event="false")
							el-select(v-if="item2.type === 'select'" v-model="scope.row[item2.prop]" :validate-event="false" :disabled='disabel' size="small")
								el-option(v-for="(item3,index3) in item2.options" :key="index3" :label="item3.label" :value="item3.value" )
							el-date-picker(v-if="item2.type === 'datePicker'" 
											v-model="scope.row[item2.prop]"
											type="date"
											placeholder="选择日期"
											size="small"
											:validate-event="false"
											:disabled='disabel'
											)
					template(slot-scope="scope")
						.handle-group
							.operate.edit(@click="add(scope.row,item.children,item.options)" v-show="scope.$index === item.children.length - 1")
								i.el-icon-plus
							.operate.delete(@click="rowDelete(scope.$index,item.children)" v-show="item.children.length >1")
								i.el-icon-close
			.rows-index(v-if="item.type === 'rows-info'")
				.title {{item.title}}
				.rows-index-main 
					ul
						li(v-for="(item2,index2) in item.children" :key="index2")
							span {{index2}}
							template
								el-form-item(:prop="item.id + 'rowsInfoarray.' + index2 + '.'+ item2.prop"  :rules="item.options[0].rules" )
									el-input(v-model="item2[item2.prop]"  :disabled='disabel' size="mini" )
								.handle-group
									.operate.edit(@click="addRow(index2,item)" v-show="index2 === item.children.length - 1")
										i.el-icon-plus
									.operate.delete(@click="rowDeleteRow(index2,item)" v-show="item.children.length >1")
										i.el-icon-close

	

</template>

<script>
// import { typeJson } from "../../utils/dateMock";
import { changeNumMoneyToChinese } from "../../utils/util2";
export default {
  props: ["typeJson", "params", "tag"],
  data() {
    return {
      disabel: false
    };
  },
  mounted() {
    if (this.tag === 3 || this.tag === "3") {
      this.disabel = true;
    } else {
      this.disabel = false;
    }
  },
  computed: {
    // currentKeys() {
    //   const keys = Object.keys(this.typeJson);
    //   return keys;
    // }
  },
  methods: {
    filterType(type) {
      const arr = [
        "title-small",
        "famtter",
        "famtter2",
        "table-info",
        "rows-info"
      ];
      if (arr.indexOf(type) > -1) {
        return type;
      }
    },
    propClick(item) {
      event.stopPropagation();
      sessionStorage.setItem("currentField", item.text);
    },
    // 点击处prop以外的区域prop不消失
    formCreat() {
      const field = sessionStorage.getItem("currentField");
      if (this.$refs[`popover-${field}`][0].showPopper === true) {
        setTimeout(() => {
          this.$set(this.$refs[`popover-${field}`][0], "showPopper", true);
        });
      }
    },
    // prop 取消
    no(field) {
      this.$refs[`popover-${field}`][0].doClose();
    },
    // prop 确定值
    yes(val, item, field) {
      console.log(val);
      if (val !== undefined) {
        const fields = [];
        const aa = [];
        if (val.indexOf("$") !== -1) {
          const valArr = val.split("$");
          for (var i = 0; i < item.length; i++) {
            if (item[i].value === val) {
              for (var o = 0; o < item[i].options.length; o++) {
                const option = item[i].options[o];
                const field = option.field;
                if (this.params[field] === "") {
                  this.$message({
                    type: "error",
                    message: "所选选项有内容需要填写"
                  });
                  return false;
                } else {
                  fields.push(this.params[field]);
                }
              }
            }
          }

          this.balance(valArr, fields);
          const realVal = valArr.join("").replace(/\s+/g, "");
          this.params[field + ".showText"] = realVal;
        } else {
          for (var j = 0; j < item.length; j++) {
            if (item[j].value === val) {
              if (item[j].options && item[j].options.length > 0) {
                for (var y = 0; y < item[j].options.length; y++) {
                  const option = item[j].options[y];
                  const field = option.field;
                  if (this.params[field] === "") {
                    this.$message({
                      type: "error",
                      message: "所选选项有内容需要填写"
                    });
                    return false;
                  }
                }
              }
            }
          }
          this.params[field + ".showText"] = val;
        }
      } else {
        this.$message({
          type: "error",
          message: "请选择选项"
        });
        // this.params[field + ".showText"] = val;
      }
      this.$forceUpdate();
      this.$refs[`popover-${field}`][0].doClose();
    },
    // prop 关闭时需要的操作
    hide(val, item, index, field) {
      console.log("hide");
      console.log(this.$refs[`popover-${field}`][0]);
      // this.flatternRadio2(val, item, index, field);
    },
    // 比较字符串和form-item的位置
    balance(label, key) {
      if (label[0] !== "") {
        key.forEach((ii, indexi) => {
          return label.splice(1 * (indexi + 1) + indexi, 0, ii);
        });
      } else {
        key.forEach((ii, indexi) => {
          return label.splice(indexi + 1 + indexi, 0, ii);
        });
      }
    },
    elFormItemClass(type) {
      if (type === "radio-flattern" || type === "checkbox-flattern") {
        return "flattern-form";
      } else if (type === "input-long") {
        return "input-long";
      } else {
        return "normal-form";
      }
    },
    // radio-flattern自动填充选择的值
    radioFlattern(val, item) {
      if (item[0].summary && item[0].summary === true) {
        item[0].children2.forEach(item => {
          if (item.type === "input") {
            this.$set(this.params, item.text, val.toString());
          }
        });
      }
    },
    flatternRadio2(val, item, field) {
      this.$set(this.params, field, val);
      // const fields = [];
      // const aa = [];
      // if (val.indexOf("$") !== -1) {
      //   const valArr = val.split("$");
      //   item.forEach((uu, i) => {
      //     if (uu.value === val) {
      //       uu.options.forEach(oo => {
      //         const field = oo.field;
      //         fields.push(this.params[field]);
      //       });
      //     }
      //   });

      //   this.balance(valArr, fields);
      //   const realVal = valArr.join("").replace(/\s+/g, "");
      //   this.params[field + ".showText"] = realVal;
      // } else {
      //   this.params[field + ".showText"] = val;
      // }
      // this.$forceUpdate();
    },
    hasConfig(data = [], ...key) {
      return data.some(d => key.indexOf(d) !== -1);
    },
    transBig(val, item) {
      const numregPos = /^\d+(\.\d+)?$/;
      const regep = /^(?!0+(?:\.0+)?$)(?:[1-9]\d*|0)(?:\.\d{1,2})?$/;
      if (val !== "" && numregPos.test(val) && val !== 0) {
        const numval = parseInt(val);
        if (regep.test(numval) && numval < 100000000000) {
          this.$set(
            this.params,
            item.capitalized,
            changeNumMoneyToChinese(numval)
          );
          // item.capitalized = changeNumMoneyToChinese(numval);
          item.value = numval;
        }
      } else {
        this.$set(this.params, item.capitalized, "");
      }
    },
    // testClick() {
    //   console.log(this.params);
    //   this.$refs.form.validate(valid => {
    //     console.log(valid);
    //     if (valid) {
    //       // 向后台发送请求
    //     } else {
    //       //就像用户提示发生错误的消息
    //     }
    //   });
    // },
    add(row, aim, options) {
      const arr = [];
      let newObj = {};
      options.forEach((item, index) => {
        var i = {};
        i = {
          [item.prop]: ""
        };
        newObj = { ...newObj, ...i };
      });

      arr.push(newObj);
      aim.push(arr[0]);
    },
    // 删除
    rowDelete(index, aim) {
      aim.splice(index, 1);
    },
    addRow(index, item) {
      const a = {
        prop: item.options[0].prop,
        type: "input",
        [item.options[0].prop]: ""
      };

      item.children.push(a);
      this.$forceUpdate();
    },
    rowDeleteRow(index, item) {
      item.children.splice(index, 1);
    }
  }
};
</script>

<style lang="stylus" scoped>
.form-create
	width 100%
	height 100%
	.form
		width 100%
		.rows-index
			.title
				color #333
				margin-top 8px
		.rows-index-main
			ul
				li
					display flex
					span
						margin-right 20px
						line-height 42px
						color #707070
					.el-form-item
						width 400px
						>>>.el-form-item__content
							width 400px

					.handle-group
						display flex
						margin-top 10px
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
		.small-title
			width 100%
			height 30px
			line-height 30px
			color #5881F0
			border-bottom 1px dashed #B8C0D1
			display flex
			margin-bottom 10px
			span
				&.dian
					width 5px
					height 5px
					display block
					border-radius 50%
					background-color #5881F0
					margin-top 12px
					margin-right 5px
		.input-flatten
			.el-form-item
				>>>.el-form-item__error
					width 150px
		.el-form-item
			&.input-long
				width calc(100% - 30px)
				>>>.el-form-item__content
					width calc(100% - 150px)
					.el-input
						width 100%
			&.normal-form
				width calc(50% - 10px)
				>>>.el-form-item__content
					width calc(100% - 150px)
					.el-input,.el-select
						width 95%
						&.input-flatten-input
							width 140px
							margin-left 3px
							margin-right 3px
			&.flattern-form
				width 99%
				>>>.el-form-item__content
					width 100%
					.tem
						font-size 15px
						color #606266
						.el-input
							width 140px
							margin 0 3px
					.radio-flattern
						width 100%
						margin-top 5px
						label
							// width 100%
							white-space pre-wrap
							line-height: normal;
							margin-bottom 5px
							.el-checkbox__label
								display inline
							.el-form-item
								&.datePicker
									width: 200px;
									margin-top: -12px;
									margin-left: 5px;
									margin-right: 5px;
									margin-bottom 10px
									.el-input
										width 100%
								&.input
									width: 100px;
									margin-top: -12px;
									margin-left: 5px;
									margin-right: 5px;
									margin-bottom 10px
									.el-input
										width 100%
								&.select
									width 100px
									margin-top: -12px;
									margin-left: 5px;
									margin-right: 5px;
									margin-bottom 10px
									.el-select
										width 100%
								&.radioInput
									.el-form-item__content
										margin-top -12px
										margin-left 5px
										.el-input
											width 200px
									.el-form-item
										margin-top: -12px;
										margin-bottom 10px
										.el-input
											width 100px

.bigValue
	width: 95%;
	height: 15px;
	text-align: right;
	color #707070
	line-height 15px
	font-size 13px
.radioSmall
	label
		width 100%
		white-space pre-wrap
		line-height: normal;
		margin-bottom 5px
	>>>.el-radio
		margin-right 5px
		.el-radio__label
			font-size 13px
			color #678
			// display flex
			// span
			// 	float left
			.el-form-item
				width 120px
				display inline-block
				margin-top -15px

				.el-input
					width 120px
</style>
<style lang="stylus" scoped>
.famtter
	width 100%
	height 100%
	padding 10px 0
	box-sizing border-box
	ul
		li
			padding 4px
			min-height 28px
			box-sizing border-box
			.el-form-item
				margin-bottom 5px
				margin-right 2px
				margin-left 2px
				margin-top -5px
				&.select
					width 150px
				>>>.el-form-item__content
					line-height 28px
				&.is-error
					margin-bottom 15px
				&.famtte-item
					width 85px
					>>>.el-form-item__content
						width 80px
						.el-input
							width 80px
						.el-form-item__error
							width 150px
				&.datePicker
					width 150px
				>>>.el-form-item__content
						width 150px
						.el-input
							width 150px
						.el-form-item__error
							width 150px
				&.radio
					padding: 0 5px;
					box-sizing border-box
				>>>.el-form-item__content
						padding: 0 5px;
						box-sizing border-box
						width: auto;
						.el-radio-group
							display flex
							margin-top 8px
						.el-form-item__error
							width 150px
				&.radioInput
					padding: 0 5px;
					box-sizing border-box
				>>>.el-form-item__content
						padding: 0 5px;
						box-sizing border-box
						width: auto;
						.el-radio-group
							display flex
							margin-top 8px
							.el-radio
								margin-right 15px
							.el-form-item
								margin-right: -5px;
								margin-left: -5px;
								.el-input
									width 80px
						.el-form-item__error
							width 150px
			span
				color #333
				margin-bottom 3px
				&.small-title
					font-weight 500
				.el-input
					margin-left 3px
					margin-right 3px
</style>

<style lang="stylus" scoped>
.table-index
	width 99%
	height 100%
	.el-table
		.el-form-item
			margin-top 10px
			margin-bottom 0px
			>>>.el-form-item__content
				margin-left 0px !important

			&.addheight
				margin-bottom 12px
				width 100%
				>>>.el-form-item__content
					width 100%
					.el-form-item__error
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
		color #333
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
.rows-index
	.el-input,.el-select
		width 400px
</style>
