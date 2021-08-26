<template lang="pug">
	div {{value}}
		el-cascader(:props="props" v-model="value")
</template>

<script>
let id = 0;
export default {
  data() {
    const _that = this;
    return {
      value: [1, 3, 4],
      props: {
        lazy: true,
        multiple: true,
        async lazyLoad(node, resolve) {
          const { level } = node;
          // 规避不能正常回显的bug
          if (!_that.value.length) {
            console.time("getInfo");
            // 模拟获取回显
            _that.value = await _that.getInfo();
            console.timeEnd("getInfo");
          }
          setTimeout(() => {
            const nodes = Array.from({ length: level + 1 }).map(item => ({
              value: ++id,
              label: `选项${id}`,
              leaf: level >= 2
            }));
            // 通过调用resolve将子节点数据返回，通知组件数据加载完成
            resolve(nodes);
          }, 300);
        }
      }
    };
  },
  methods: {
    getInfo() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([1, 2, 4]);
        }, 2000);
      });
    }
  }
};
</script>

<style lang="stylus" scoped></style>
