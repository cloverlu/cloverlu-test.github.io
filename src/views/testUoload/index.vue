<!--
 * @Descripttion: 测试安卓和ios
 * @Author: penglu
 * @Date: 2021-08-26 21:04:49
-->

<template lang="pug">
.test-unload 测试关闭的动作
	
</template>

<script>
export default {
  mounted() {
    // 注册onbeforeunload
    let title = "";
    if (this.IsPC()) {
      title = "pc";
    } else {
      if (this.isIos()) {
        title = "ios";
      } else {
        title = "Android";
      }
    }
    if (window.onbeforeunload) {
      window.onbeforeunload = () =>
        this.leaveRadar(`${title}:window.onbeforeunload`);
      return false;
    } else if (window.addEventListener) {
      window.addEventListener("beforeunload", () =>
        this.leaveRadar(`${title}:beforeunload`)
      );
      return false;
    } else if (window.attachEvent) {
      window.attachEvent("beforeunload", () =>
        this.leaveRadar(`${title}:window.attachEvent:beforeunload`)
      );
      return false;
    }

    // 注册onpagehide
    if (window.onpagehide) {
      window.onpagehide = () => this.leaveRadar(`${title}:window.onpagehide`);
      return false;
    } else if (window.addEventListener) {
      window.addEventListener("pagehide", () =>
        this.leaveRadar(`${title}:pagehide`)
      );
    } else if (window.attachEvent) {
      window.attachEvent("pagehide", () =>
        this.leaveRadar(`${title}:window.attachEvent:pagehide`)
      );
    }

    document.addEventListener("visibilitychange", () =>
      this.leaveRadar(`${title}:visibilitychange`)
    );
  },
  methods: {
    // 判断当前设备
    IsPC() {
      var userAgentInfo = navigator.userAgent;
      var Agents = [
        "Android",
        "iPhone",
        "SymbianOS",
        "Windows Phone",
        "iPad",
        "iPod"
      ];
      var flag = true;
      for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
          flag = false;
          break;
        }
      }
      return flag;
    },
    isIos() {
      // 判断是IOS还是Android
      var userAgent = navigator.userAgent;
      var isAndroid =
        userAgent.indexOf("Android") > -1 || userAgent.indexOf("Adr") > -1; // android终端
      var isiOS = !!userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); // ios终端
      if (isAndroid) {
        return false;
      } else if (isiOS) {
        return true;
      }
    },
    // 雷达离开
    leaveRadar(msg) {
      const url = `https://api.day.app/6FV2VEzGMi6yrL4EzFoah7/${msg}`;
      // const params = ``
      navigator.sendBeacon(url);
    }
  }
};
</script>

<style lang="scss" scoped></style>
