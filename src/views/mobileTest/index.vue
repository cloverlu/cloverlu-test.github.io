<!--
 * @Descripttion: 手机端test(vant组件库)
 * @Author: penglu
 * @Date: 2021-07-13 14:47:02
-->

<template lang="pug">
.mobile-test 
	.currency-cont
		van-tabs()
			van-tab(v-for="index in 12" :title="'标签 ' + index" :key="index") 内容q {{ index }}
			

	
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.mobile-test {
  width: 100%;
  height: 100%;
  position: relative;
  .currency-cont {
    width: 100%;
    height: calc(100% - 24px);
    padding-top: 5px;
    .van-tabs {
      width: 100%;
      height: 100%;
      padding-left: 12px;
      box-sizing: border-box;
      ::v-deep {
        .van-tabs__wrap {
          width: 100%;
          height: 30px;
          border-bottom: 1px solid #e4e7ed;
          padding-right: 16px;
          box-sizing: border-box;
          touch-action: manipulation;
          .van-tabs__nav {
            padding-left: 0;
            padding-right: 6px;
            width: 100%;
            &.van-tabs__nav--line {
              padding-bottom: 15px;
            }
            .van-tab {
              padding: 0 10px;
              font-size: 12px;
              line-height: 20px;
              flex: 0 0 auto;
              &.van-tab--active {
                color: #3b74ef;
                border-bottom: 2px solid #3b74ef;
              }
            }
            .van-tabs__line {
              display: none;
              background-color: #3b74ef;
              bottom: 15px;
              width: 40px;
              height: 3px;
              border-radius: 3px;
            }
          }
        }
        .van-tabs__content {
          padding-right: 16px;
          height: calc(100% - 30px);
          overflow-y: auto;
        }
      }
    }
  }
}
</style>
