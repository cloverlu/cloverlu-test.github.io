<!--
 * @Descripttion: 
 * @Author: penglu
 * @Date: 2020-09-29 14:37:36
-->
<template lang="pug">
.form-create
	.title 动态表单
	.form
		el-form(ref="form"  label-width="80px")
			el-form-item(v-for="(item,index) in typeJson" :key="item.id" :label="item.title" :prop="item.field" :required="item.required")
				el-input(v-if="item.type === 'input'" v-model="item.value")
				el-select(v-if="item.type === 'select'" v-model="item.value")
					el-option(v-for="(item2,index2) in item.options" :label="item2.title" :value="item2.value" )

</template>

<script>
import { typeJson } from "../../utils/util";
export default {
  data() {
    return {
      typeJson: typeJson,
      form: {
        name: ""
      }
    };
  },
  computed: {
    currentKeys() {
      const keys = Object.keys(this.typeJson);
      return keys;
    }
  },
  methods: {
    hasConfig(data = [], ...key) {
      return data.some(d => key.indexOf(d) !== -1);
    }
  }
};
</script>

<style lang="scss">
.form-create {
  width: 100%;
  height: 100%;
  .title {
    height: 40px;
    line-height: 40px;
    font-weight: bold;
  }
  .form {
    width: 500px;
    margin-top: 10px;
  }
}
</style>
