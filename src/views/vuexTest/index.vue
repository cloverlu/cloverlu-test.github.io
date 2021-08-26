<template lang="pug">
	div
		div {{this.name}}
		div
			el-button(type='primary' size="small" @click="changeOne") 点我啊1（mutation不带参数）
			el-button(type='primary' size="small" @click="changeThree") 点我啊3（action不带参数）
		div
			el-input(size="small" v-model="nameValue")
			el-button(type='primary' size="small" @click="changeTwo") 点我啊2（mutation带参数）
			el-button(type='primary' size="small" @click="changeFour") 点我啊4（action带参数）
		div {{this.formatterName}}
		div {{this.customeFormatterName('nishizhu')}}

</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
export default {
  name: "vuexTest",
  data() {
    return {
      nameValue: ""
    };
  },
  mounted() {
    console.log(this.$store);
  },
  computed: {
    // 如果不用mapState，页面应该使用{{this.$store.state.name}}
    //state是状态，用于computed中
    //getter是统一处理state，也写在computed中
    ...mapState(["name"]),
    // 如果不用.mapGetters，页面应该使用{{this.$store.getters.formatterName}}
    // 如果不用.mapGetters，页面应该使用{{this.$store.getters.customeFormatterName('nishizhu')}}
    ...mapGetters(["formatterName", "customeFormatterName"])
  },
  methods: {
    ...mapMutations(["changeNameToLisi", "changeNameWithParams"]),
    ...mapActions(["asyncChangeToLisi", "asyncChangeNameWithParams"]),
    changeOne() {
      // 如果不用mapMutations,这里应该写为this.$store.commit("changeNameToLisi");
      this.changeNameToLisi();
    },
    changeTwo() {
      // 如果不用mapMutations,这里应该写为this.$store.commit("changeNameWithParams", { name: this.nameValue });
      // this.$store.commit("changeNameWithParams", { name: this.nameValue });
      this.changeNameWithParams({ name: this.nameValue });
    },
    changeThree() {
      //如果不用mapActions，这里应写为 this.$store.dispatch("asyncChangeToLisi");
      this.asyncChangeToLisi();
    },
    changeFour() {
      //如果不用mapActions，这里应写为 this.$store.dispatch("asyncChangeNameWithParams", {name: this.nameValue});
      this.asyncChangeNameWithParams({ name: this.nameValue });
    }
  }
};
</script>
