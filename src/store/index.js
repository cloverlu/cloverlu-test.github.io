import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

//状态
const state = {
  name: "张三"
};

// 更改store状态，同步操作
const mutations = {
  changeNameToLisi(state) {
    state.name = "李四";
  },
  changeNameWithParams(state, playLoad) {
    state.name = playLoad.name;
  }
};

//异步
const actions = {
  asyncChangeToLisi(context) {
    let _name = context.state.name;
    // 异步更改
    setTimeout(() => {
      context.commit("changeNameToLisi");
    }, 1000);
  },
  asyncChangeNameWithParams(context, playload) {
    //异步更改
    setTimeout(() => {
      context.commit("changeNameWithParams", playload);
    }, 1000);
  }
};

// getter，我们可以理解为是对store中state的一些派生状态，也可以理解为一种计算属性
// getter的使用对我来讲就是将对store中某个属性相同的处理操作抽出出来，做了一个公共的处理
const getters = {
  formatterName: state => {
    let profix = "";
    if (state.name === "张三") {
      profix = "最棒";
    }
    return state.name + profix;
  },
  customeFormatterName: state => val => {
    let profix = "";
    if (state.name === "张三") {
      profix = val;
    }
    return state.name + profix;
  }
};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules: {} //大型项目特别多状态的时候，可以将store分为4个文件：state,getter,mutation,action
});
