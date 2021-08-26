<!--
 * @Descripttion: 
 * @Author: penglu
 * @Date: 2020-10-13 16:00:43
-->
<template lang="pug">
	.co-dowload-main 
		.coDow-search()
			//- el-form(:inline="true" :model="searchForm")
			//- 	el-form-item(label="合同类型")
			//- 		el-select(v-model="searchForm.coType" size="small" @change="getcolist(searchForm.coType)")
			//- 			el-option(v-for="item in coTypes" :key="item.value" :label="item.label" :value="item.value")
			//- 	el-form-item(label="合同模板")
			//- 		el-select(v-model="searchForm.coName" size="small")
			//- 			el-option(v-for="item in coNames" :key="item.value" :label="item.label" :value="item.value")
			
			
			//- 	//- el-form-item(label="合同编号")
			//- 	//- 	el-input(v-model="searchForm.coName" size="small")
			//- 	el-form-item(class="floatRight")
			//- 		el-button(type="primary" icon="el-icon-search" size="small" @click="search") 查询
			//- 		el-button(type="default" size="small") 重置

		.coDow-main(class="nosearch" v-loading="isShowLoading" )
			.main-auto(v-show="!isShow")
				tr-scrollbar(:wrap-resize="true" height="100%")
					el-form(:model="params" :inline="true" ref="form"  label-width="150px")
						.main-auto-title 
							span(class="lantiao") 
							span 基本信息
						.main-auto-main
							.main-co(class="firstco")
								formCreate(:typeJson="baseInfo" :params="params" :tag="$route.params.tag")

						.main-auto-title 
							span(class="lantiao") 
							span 附件信息 
						.main-auto-main
							.main-co
								formCreate(:typeJson="annex" :params="params" :tag="$route.params.tag")
					.opertion
						el-button(type="primary"  size="small" ) 提交
						el-button(size="small") 重置
						el-button(type="warning"  size="small" @click="testClick") 保存
					
			
</template>

<script>
import { testJson2 } from "./testJson2";
import formCreate from "./formCreate";

export default {
  components: { formCreate },
  data() {
    return {
      searchForm: {
        // customName: "",
        coName: "",
        coType: ""
      },
      params: {},
      testJson: testJson2,
      // testOption: testOption,
      // rules: rules,
      rules: [],
      // testValue: testValue,
      testValue: [],
      coTypes: [],
      coNames: [],
      info: {},
      isShowLoading: false,
      isShow: false,
      htmbId: ""
    };
  },
  mounted() {
    // sessionStorage.removeItem("coId");
    // if (this.$route.params.tag === 1 || this.$route.params.tag === "1") {
    //   this.getvotypes();
    //   this.testValue = [];
    // } else {
    //   this.getEditInfo();
    // }
  },
  watch: {},
  computed: {
    baseInfo() {
      //   if (this.info.baseInfo) {
      //     return this.combine(this.info.baseInfo);
      //   } else {
      //     return [];
      //   }
      return this.combine(this.testJson.baseInfo);
    },
    annex() {
      // if (this.info.annex) {
      //   return this.combine(this.info.annex);
      // } else {
      //   return [];
      // }
      return [];
    }
  },
  methods: {
    combine(params) {
      const obj = {};
      const array = {};
      const array2 = {};
      const array3 = {};
      let newObj = {};
      params.map((item, index0) => {
        array[index0] = [];
        const type = item.type;
        //famtter
        if (item.type === "famtter") {
          item.options.forEach((e, index) => {
            obj["labelArray" + index] = [];
            obj["keyArray" + index] = [];
            if (e.key && e.key.length > 0) {
              e.key.forEach(u => {
                this.matchValue(u, type);
                // this.$set(this.params, u, "");

                obj["keyArray" + index].push({
                  text: u,
                  type: "input",
                  rules: this.regep(u)
                });
              });
            } else {
              obj["keyArray" + index] = [];
            }

            if (e.label.indexOf("$") !== -1) {
              const splitArray = e.label.split("$");
              splitArray.forEach(i => {
                obj["labelArray" + index].push({
                  text: i,
                  type: "text"
                });
              });
            } else {
              obj["labelArray" + index].push({
                text: e.label,
                type: "title"
              });
            }

            this.balance(obj["labelArray" + index], obj["keyArray" + index]);

            array[index0].push(obj["labelArray" + index]);

            item.children = array[index0];
          });
        }
        // table-info
        else if (item.type === "table-info") {
          array2[index0] = [];
          newObj[index0] = {};
          item.options.forEach((e, index2) => {
            e.rules = this.regep(e.prop);

            const i = {
              [e.prop]: e.value
            };

            newObj[index0] = { ...newObj[index0], ...i };
          });

          array2[index0].push(newObj[index0]);

          if (Object.prototype.hasOwnProperty.call(this.testValue, item.id)) {
            item.children = this.testValue[item.id];
          } else {
            item.children = array2[index0];
          }

          this.$set(this.params, item.id, item.children);
        }
        //rows-info
        else if (item.type === "rows-info") {
          item.options.forEach((e, index2) => {
            e.rules = this.regep(e.prop);
          });

          var children = [];
          if (Object.prototype.hasOwnProperty.call(this.testValue, item.id)) {
            children = this.testValue[item.id];
          } else {
            children = [];
          }

          if (children.length > 0) {
            var rowNew = [];
            children.forEach(child => {
              const a = {
                prop: item.options[0].prop,
                type: "input",
                [item.options[0].prop]: child[item.options[0].prop]
              };
              rowNew.push(a);
            });
            item.children = rowNew;
          } else {
            item.children = [
              {
                prop: item.options[0].prop,
                type: "input",
                [item.options[0].prop]: ""
              }
            ];
          }

          this.$set(this.params, item.id + "rowsInfoarray", item.children);
        }
        // radio-flattern
        else if (
          item.type === "radio-flattern" ||
          item.type === "checkbox-flattern"
        ) {
          if (item.options[0].value && item.options[0].value !== "") {
            this.matchValue(item.field, type, item.options[0].value);
          } else {
            this.matchValue(item.field, type, item.options[1].value);
          }

          item.options.forEach((e, index) => {
            if (e.summary && (e.summary === "true" || e.summary === true)) {
              e.summary = true;
            } else {
              e.summary = false;
            }

            obj["labelArray" + index] = [];
            obj["keyArray" + index] = [];
            if (e.label.indexOf("$") !== -1) {
              const splitArray = e.label.split("$");
              splitArray.forEach(i => {
                obj["labelArray" + index].push({
                  text: i,
                  type: "text"
                });
              });
            } else {
              obj["labelArray" + index].push({
                text: e.label,
                type: "title"
              });
            }

            if (e.children && e.children.length > 0) {
              e.children.forEach((u, indexu) => {
                if (e.summary && e.summary === true) {
                  if (type == "radio-flattern") {
                    this.matchValue(
                      u.field,
                      u.type,
                      item.options[1].value,
                      "falg"
                    );
                  } else {
                    this.matchValue(u.field, u.type);
                  }
                } else {
                  this.matchValue(u.field, u.type);
                }
                // this.$set(this.params, u.field, u.value);

                // 判断该有没有验证
                var rule1 = [];
                if (Object.prototype.hasOwnProperty.call(this.rules, u.field)) {
                  rule1 = this.rules[u.field];
                } else {
                  rule1 = [];
                }
                var keychildren = [];

                if (u.options && u.options.length > 0) {
                  u.options.forEach((p, indexp) => {
                    array3[indexp] = [];
                    if (p.options && p.options.length > 0) {
                      obj["labelArrayp" + indexp] = [];
                      obj["keyArrayp" + indexp] = [];
                      const options2 = p.label.split("$");
                      options2.forEach(l => {
                        obj["labelArrayp" + indexp].push({
                          text: l,
                          type: "text"
                        });
                      });
                      if (p.options && p.options.length > 0) {
                        p.options.forEach(u => {
                          this.matchValue(u.field, u.type);
                          // this.$set(this.params, u.field, u.value);

                          obj["keyArrayp" + indexp].push({
                            text: u.field,
                            type: u.type,
                            rules: this.regep(u.field)
                          });
                        });
                      }

                      this.balance(
                        obj["labelArrayp" + indexp],
                        obj["keyArrayp" + indexp]
                      );

                      array3[indexp].push(obj["labelArrayp" + indexp]);
                      p.children = array3[indexp][0];
                    }
                  });

                  keychildren = u.options;
                } else {
                  keychildren = [];
                }
                obj["keyArray" + index].push({
                  text: u.field,
                  type: u.type,
                  rules: rule1,
                  options: keychildren,
                  summary: u.summary ? true : false
                });
              });
            } else {
              obj["keyArray" + index] = [];
            }

            this.balance(obj["labelArray" + index], obj["keyArray" + index]);

            e.children2 = obj["labelArray" + index];
          });
        }
        //famtter2
        else if (item.type === "famtter2") {
          item.options.forEach((e, index) => {
            obj["labelArray" + index] = [];
            obj["keyArray" + index] = [];
            if (e.label.indexOf("$") !== -1) {
              const splitArray = e.label.split("$");
              splitArray.forEach(i => {
                obj["labelArray" + index].push({
                  text: i,
                  type: "text"
                });
              });
            } else {
              obj["labelArray" + index].push({
                text: e.label,
                type: "title"
              });
            }

            if (e.children && e.children.length > 0) {
              e.children.forEach((u, indexu) => {
                if (
                  u.type === "radio" ||
                  u.type === "checkbox" ||
                  u.type === "radioInput"
                ) {
                  this.matchValue(u.field, u.type, u.options[0].value);
                } else {
                  this.matchValue(u.field, u.type);
                }

                // this.$set(this.params, u.field, u.value);

                // 判断该有没有验证
                var rule1 = [];
                if (Object.prototype.hasOwnProperty.call(this.rules, u.field)) {
                  rule1 = this.rules[u.field];
                } else {
                  rule1 = [];
                }
                var keychildren = [];

                if (u.options && u.options.length > 0) {
                  u.options.forEach((p, indexp) => {
                    array3[indexp] = [];
                    if (p.options && p.options.length > 0) {
                      obj["labelArrayp" + indexp] = [];
                      obj["keyArrayp" + indexp] = [];
                      const options2 = p.label.split("$");
                      options2.forEach(l => {
                        obj["labelArrayp" + indexp].push({
                          text: l,
                          type: "text"
                        });
                      });
                      if (p.options && p.options.length > 0) {
                        p.options.forEach(u => {
                          if (
                            u.type === "radio" ||
                            u.type === "checkbox" ||
                            u.type === "radioInput"
                          ) {
                            this.matchValue(
                              u.field,
                              u.type,
                              u.options[0].value
                            );
                          } else {
                            this.matchValue(u.field, u.type);
                          }
                          // this.matchValue(u.field, type);
                          // this.$set(this.params, u.field, u.value);

                          obj["keyArrayp" + indexp].push({
                            text: u.field,
                            type: u.type,
                            rules: this.regep(u.field)
                          });
                        });
                      }

                      this.balance(
                        obj["labelArrayp" + indexp],
                        obj["keyArrayp" + indexp]
                      );

                      array3[indexp].push(obj["labelArrayp" + indexp]);
                      p.children = array3[indexp][0];
                    }
                  });

                  keychildren = u.options;
                } else {
                  keychildren = [];
                }
                obj["keyArray" + index].push({
                  text: u.field,
                  type: u.type,
                  rules: rule1,
                  options: keychildren
                });
              });
            } else {
              obj["keyArray" + index] = [];
            }

            this.balance(obj["labelArray" + index], obj["keyArray" + index]);

            array[index0].push(obj["labelArray" + index]);

            item.children = array[index0];
          });
        }
        //input-flatten
        else if (item.type === "input-flatten") {
          const flattenLabel = [];
          if (item.label.indexOf("$") !== -1) {
            const splitArray = item.label.split("$");
            splitArray.forEach(i => {
              flattenLabel.push({
                text: i,
                type: "text"
              });
            });
          } else {
            flattenLabel.push({
              text: item.label,
              type: "title"
            });
          }

          const arr = [];

          item.options.forEach((y, indexy) => {
            this.matchValue(y.field, y.type);
            arr.push({
              text: y.field,
              type: "input",
              rules: this.regep(y.field)
            });
          });
          this.balance(flattenLabel, arr);

          array[index0].push(flattenLabel);
          item.children = array[index0][0];
        } else if (item.type !== "title-small") {
          item.rules = this.regep(item.field);
          if (item.type === "radio" || item.type === "checkbox") {
            this.matchValue(item.field, type, item.options[0].value);
          } else if (item.type === "input-loan") {
            this.matchValue(item.field, type);
            // 大写
            this.matchValue(item.capitalized, type);
          } else {
            this.matchValue(item.field, type);
          }
        }
      });
      console.log(params);
      return params;
    },
    // 比较字符串和form-item的位置
    balance(label, key) {
      if (label[0].text !== "") {
        key.forEach((ii, indexi) => {
          return label.splice(1 * (indexi + 1) + indexi, 0, ii);
        });
      } else {
        key.forEach((ii, indexi) => {
          return label.splice(indexi + 1 + indexi, 0, ii);
        });
      }
    },

    //判断有没有验证
    regep(field) {
      var rule = [];
      if (Object.prototype.hasOwnProperty.call(this.rules, field)) {
        this.rules[field].forEach(item => {
          if (item.pattern) {
            item.pattern = item.pattern.replace(/^\"|\"$/g, "");
          }
        });
        rule = this.rules[field];
      } else {
        rule = [];
      }
      return rule;
    },
    // 匹配值
    matchValue(field, type, defaultValue, flag) {
      if (Object.prototype.hasOwnProperty.call(this.testValue, field)) {
        this.$set(this.params, field, this.testValue[field]);
      } else {
        if (type === "checkbox" || type === "checkbox-flattern") {
          this.$set(this.params, field, []);
        } else if (
          type === "radio" ||
          type === "radio-flattern" ||
          type === "radioInput"
        ) {
          this.$set(this.params, field, defaultValue);
        } else {
          if (flag) {
            this.$set(this.params, field, defaultValue);
          } else {
            this.$set(this.params, field, "");
          }
        }
      }
    },
    //promiss
    promiseFun(url, params) {
      return new Promise((resolve, reject) => {
        url(this, params).then(
          res => {
            if (
              res.data.returnCode === "200000" ||
              res.data.returnCode === 200000
            ) {
              console.log(res.data);
              return resolve(res.data);
            }
          },
          err => {
            reject(err.json());
          }
        );
      });
    },

    testClick() {
      console.log(this.params);
      this.$refs.form.validate(valid => {
        console.log(valid);
        if (valid) {
          // 向后台发送请求
        } else {
          //就像用户提示发生错误的消息
        }
      });
    }
    // // 保存
    // save() {
    //   for (var key in this.params) {
    //     const arr = key.indexOf("rowsInfoarray");
    //     if (key === "") {
    //       delete this.params[key];
    //     } else if (arr !== -1) {
    //       var aa = [];
    //       this.params[key].forEach(item => {
    //         aa.push(item[item.prop]);
    //       });
    //       this.params[this.params[key][0].prop] = aa;
    //       delete this.params[key];
    //     }
    //   }
    //   console.log(this.params);
    //   const htId = sessionStorage.getItem("coId");
    //   var htinfo = {};
    //   if (this.$route.params.tag === 1 || this.$route.params.tag === "1") {
    //     const htId = sessionStorage.getItem("coId");
    //     if (htId) {
    //       htinfo = {
    //         htid: htId,
    //         coType: this.searchForm.coType,
    //         contractInfo: this.params,
    //         htmbId: this.searchForm.coName
    //       };
    //     } else {
    //       htinfo = {
    //         coType: this.searchForm.coType,
    //         contractInfo: this.params,
    //         htmbId: this.searchForm.coName
    //       };
    //     }
    //   } else {
    //     htinfo = {
    //       htid: this.$route.params.coId,
    //       coType: this.searchForm.coType,
    //       contractInfo: this.params,
    //       htmbId: this.htmbId
    //     };
    //   }
    //   coSave(this, htinfo).then(res => {
    //     this.isShowLoading = true;
    //     console.log(res);
    //     if (
    //       res.data.returnCode === "200000" ||
    //       res.data.returnCode === 200000
    //     ) {
    //       this.isShowLoading = false;
    //       sessionStorage.setItem("coId", res.data.data);
    //       this.$message({
    //         type: "info",
    //         message: "保存成功！"
    //       });
    //     } else {
    //       this.isShowLoading = false;
    //     }
    //   });
    // },
    // // 提交
    // submit() {
    //   for (var key in this.params) {
    //     const arr = key.indexOf("rowsInfoarray");
    //     if (key === "") {
    //       delete this.params[key];
    //     } else if (arr !== -1) {
    //       var aa = [];
    //       this.params[key].forEach(item => {
    //         aa.push(item[item.prop]);
    //       });
    //       this.params[this.params[key][0].prop] = aa;
    //       delete this.params[key];
    //     }
    //   }
    //   var htinfo = {};
    //   if (this.$route.params.tag === 1 || this.$route.params.tag === "1") {
    //     const htId = sessionStorage.getItem("coId");
    //     if (htId) {
    //       htinfo = {
    //         htid: htId,
    //         coType: this.searchForm.coType,
    //         contractInfo: this.params,
    //         htmbId: this.searchForm.coName
    //       };
    //     } else {
    //       htinfo = {
    //         coType: this.searchForm.coType,
    //         contractInfo: this.params,
    //         htmbId: this.searchForm.coName
    //       };
    //     }
    //   } else {
    //     htinfo = {
    //       htid: this.$route.params.coId,
    //       coType: this.searchForm.coType,
    //       contractInfo: this.params,
    //       htmbId: this.htmbId
    //     };
    //   }

    //   this.isShowLoading = true;
    //   this.$refs.form.validate(valid => {
    //     if (valid) {
    //       new Promise((resolve, reject) => {
    //         coSave(this, htinfo).then(
    //           res => {
    //             if (
    //               res.data.returnCode === "200000" ||
    //               res.data.returnCode === 200000
    //             ) {
    //               const params = {
    //                 bizId: res.data.data,
    //                 opType: "1"
    //               };
    //               new Promise((resolve, reject) => {
    //                 coSubmit(this, params).then(
    //                   res => {
    //                     if (
    //                       res.data.returnCode === "200000" ||
    //                       res.data.returnCode === 200000
    //                     ) {
    //                       this.isShowLoading = false;
    //                       this.$message({
    //                         type: "info",
    //                         message: "提交成功！"
    //                       });
    //                       this.$router.push({
    //                         name: "Needed"
    //                       });
    //                     } else {
    //                       this.isShowLoading = false;
    //                       this.$message({
    //                         type: "error",
    //                         message: res.data.returnMsg
    //                       });
    //                     }
    //                   },
    //                   err => {
    //                     reject(err.json());
    //                   }
    //                 );
    //               });
    //             }
    //           },
    //           err => {
    //             reject(err.json());
    //           }
    //         );
    //       });
    //     } else {
    //       //就像用户提示发生错误的消息
    //       this.isShowLoading = false;
    //     }
    //   });
    // },
    // // 获取合同列表
    // getcolist(val) {
    //   getCoLists(this, val).then(res => {
    //     if (
    //       res.data.returnCode === "200000" ||
    //       res.data.returnCode === 200000
    //     ) {
    //       this.coNames = res.data.data;
    //     }
    //   });
    // },
    // // 获取合同类型
    // getvotypes() {
    //   getCoTypes(this).then(res => {
    //     if (
    //       res.data.returnCode === "200000" ||
    //       res.data.returnCode === 200000
    //     ) {
    //       const testData = JSON.parse(JSON.stringify(res.data.data));
    //       const arr = [];
    //       var i = 0;
    //       for (var item in testData) {
    //         const obj = {
    //           value: item,
    //           label: testData[item]
    //         };
    //         arr[i] = obj;
    //         i++;
    //       }
    //       this.coTypes = arr;
    //       // this.searchForm.coType = arr[0].value;
    //       // this.getcolist(arr[0].key);
    //     }
    //   });
    // },
    // // 获取对应的合同模板json
    // getCoJson() {
    //   this.isShowLoading = true;
    //   let params = {
    //     htmbId: this.searchForm.coName
    //   };
    //   getCoJsonDetail(this, params).then(res => {
    //     if (
    //       res.data.returnCode === "200000" ||
    //       res.data.returnCode === 200000
    //     ) {
    //       this.isShowLoading = false;
    //       this.isShow = true;
    //       this.info = res.data.data.content;

    //       // this.rules = res.data.data.content.rules;
    //     }
    //   });
    // },
    // search() {
    //   this.getCoJson();
    // },
    // // 编辑状态时的页面展示详情
    // getEditInfo() {
    //   this.isShowLoading = true;
    //   const paras = {
    //     htid: this.$route.params.coId
    //   };
    //   editInfo(this, paras).then(res => {
    //     if (
    //       res.data.returnCode === "200000" ||
    //       res.data.returnCode === 200000
    //     ) {
    //       this.isShowLoading = false;
    //       this.isShow = true;
    //       this.info = res.data.data.content;
    //       this.testValue = res.data.data.htInfo.contractInfo;
    //       this.htmbId = res.data.data.htInfo.htmbId;
    //       // this.rules = res.data.data.content.rules;
    //     } else {
    //       this.isShowLoading = false;
    //       this.isShow = true;
    //     }
    //   });
    // }
  }
};
</script>

<style lang="stylus" scoped>
.co-dowload-main
	width 100%
	height 100%
	padding 10px
	box-sizing border-box
	.coDow-search
		width 100%
		height 50px
		border-bottom 1px solid #f5f5f5
		.el-select,
		.el-input
			width 180px

		.floatRight
			float right
	.coDow-main
		width 100%
		padding 10px 0
		box-sizing border-box
		&.needsearch
			height calc(100% - 50px)
		&.nosearch
			height 100%

		.main-auto
			width 100%
			height 100%
			.tr-scrollbar
				width 100%
				.opertion
					width 100%
					text-align right
					height 60px
					border-top 1px dashed #9F9F9F
					padding-top 10px
					box-sizing border-box

				.main-auto-title
					width 100%
					height 30px
					line-height 30px
					display flex
					border-bottom 1px solid #E7E7E7
					span
						font-size 15px
						font-weight 500
						&.lantiao
							width 4px
							height 20px
							background-color #4E78DE
							display block
							margin-top: 5px
							margin-right 5px
				.main-auto-main
					padding 10px 0
					box-sizing border-box
					.main-co
						padding 5px
						box-sizing border-box
						&.firstco
							background-color #f7fafa
						// &:nth-child(even)
						// 	background-color #fff
</style>
