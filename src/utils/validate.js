/**
 * 正则库
 */
const pattern = {
  poolname: /^[a-zA-Z][a-zA-Z0-9_-]{0,23}$/,
  des: /^[a-zA-Z0-9_-]{1,24}$/,
  FQDN: /^[-_\.a-zA-Z]{1,24}$/,
  port: /^([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-4]\d{4}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/,
  IPv4: /^((\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\.){3}(\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])$/,
  httpurl: /^(?=^.{3,255}$)(http(s)?:\/\/)?(www\.)?[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+(:\d+)*(\/\w+\.\w+)*([\?&]\w+=\w*)*$/,
  fileName: /^[^~\\：:：:;；*？?“"<>\|＆\u4e00-\u9fa5]{1,50}$/,
  IPv6: /^(([\da-fA-F]{1,4}):){8}$/,
  mask: /^((128|192)|2(24|4[08]|5[245]))(\.(0|(128|192)|2((24)|(4[08])|(5[245])))){3}$/,
  mask10: /^([0-9]|1[0-9]|2[0-5])$/
};

// 判断是否是正则
const isRep = val => {
  var isreg;
  try {
    isreg = eval(val) instanceof RegExp;
  } catch (e) {
    isreg = false;
  }
  return isreg;
};

/**
 * 内置规则
 * @param {array} reg - {pattern}中预定义正则名称 or 自定义正则 (这边数组为了特殊验证里有多个正则验证)
 * @param {String} msg1 - 正则校验不通过提示
 * @param {String} msg2 - 值为空时提示（可不填）
 */
const ruleValidate = (reg, msg1, msg2) => {
  return (rule, value, callback) => {
    if (!value) {
      if (!msg2) {
        callback();
      }
      callback(new Error(msg2));
    }

    var validates = [];
    var validate = "";
    reg.map(e => {
      if (Object.prototype.hasOwnProperty.call(pattern, e)) {
        if (e === "IPv6") {
          validate = pattern[e].test(value + ":");
        } else {
          validate = pattern[e].test(value);
        }
        validates.push(validate);
      } else {
        if (!isRep(e)) {
          if (value === e) {
            validate = true;
          } else {
            validate = false;
          }
          validates.push(validate);
        } else {
          validate = e.test(value);
          validates.push(validate);
        }
      }
    });

    if (validates.every(e => e === false)) {
      callback(new Error(msg1));
    } else {
      callback();
    }
    // reg = pattern[reg] ? pattern[reg] : reg  //可以传定义好的参数名，也可以直接传正则表达式
    // if (!reg.test(value)) {
    // 	callback(new Error(msg1))
    // } else {
    // 	callback()
    // }
  };
};

export default ruleValidate;
