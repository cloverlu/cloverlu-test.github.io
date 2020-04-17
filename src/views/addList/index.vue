<template lang="pug">
.js-test
	el-tabs(v-model="activeName")
		el-tab-pane(label="表格类型" name="table")
			TableIndex
		el-tab-pane(label="列表类型" name="list")
			ListIndex
</template>

<script>
import TableIndex from "@/views/addList/tableIndex.vue";
import ListIndex from "@/views/addList/listIndex.vue";
export default {
  name: "Home",
  components: { TableIndex, ListIndex },
  data() {
    return {
      activeName: "table"
    };
  }
};
</script>
<style lang="stylus" scoped>
.js-test
	width 100%
	height 100%
</style>
