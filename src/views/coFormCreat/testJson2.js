/*jshint esversion: 6 */
const testJson = {
  baseInfo: [
    {
      id: "4",
      type: "title-small",
      field: "",
      title: "甲方基本信息",
      value: "甲方基本信息"
    },
    {
      type: "checkbox-flattern",
      field: "jxMode2",
      title: "",
      options: [
        {
          label: "本合同项下借款采用以下第$种方式结息",
          summary: true, // 此标记作为总结，根据用户自动填充input，且有summary=true的对象没有value
          children: [
            {
              field: "jxx2",
              type: "input"
            }
          ]
        },
        {
          label:
            "按季度结息，每季度末月的20日为结息日，21日为付息日。若该季末月21日为法定休息日（如周六、日）或法定节假日（如春节），该季付息日可顺延至法定休息日或法定节假日后第一个工作日。",
          value: "4.4.1",
          summary: false
        },
        {
          label:
            "按月结息，每月的20日为结息日，21日为付息日。若该月21日为法定休息日（如周六、日）或法定节假日（如春节），该月付息日可顺延至法定休息日或法定节假日后第一个工作日。",
          value: "4.4.2",
          summary: false
        },
        {
          label: "其他方式：$",
          value: "4.4.3",
          summary: false,
          children: [
            {
              field: "mctkxjtj2",
              type: "input"
            }
          ]
        }
      ]
    },
    {
      type: "radio-flattern",
      field: "jxMode",
      title: "",
      options: [
        {
          label: "本合同项下借款采用以下第$种方式结息",
          summary: true,
          children: [
            {
              field: "jxx",
              type: "input"
            }
          ]
        },
        {
          label:
            "固定利率，即以$($)的$个月的$作为定价基准，在此基础上$ $%，贷款期限内该利率保持不变。",
          value: "4.4.44",
          summary: false,
          children: [
            {
              field: "z6",
              type: "input",
              summary: true
            },
            {
              field: "z1",
              type: "radioInput",
              options: [
                // {
                //   label: "$(",
                //   type: "title",
                //   children: [
                //     {
                //       field: "z11",
                //       type: "input"
                //     }
                //   ]
                // },
                {
                  label: "$年$月$日",
                  value: "c",
                  options: [
                    {
                      field: "jklv2B",
                      type: "input",
                      value: "aa"
                    },
                    {
                      field: "jklv2C",
                      type: "input",
                      value: "aa"
                    },
                    {
                      field: "jklv2D",
                      type: "input",
                      value: "aa"
                    }
                  ]
                },
                {
                  label: "每次贷款发放的起息日前一工作日",
                  value: "a"
                },
                {
                  label: "首次贷款发放的起息日前一工作日",
                  value: "b"
                }
              ]
            },
            {
              field: "z5",
              type: "input"
            },
            {
              field: "z2",
              type: "select",
              options: [
                {
                  label: "LPR",
                  key: "z21"
                },
                {
                  label: "其他",
                  key: "z22"
                }
              ]
            },
            {
              field: "z3",
              type: "select",
              options: [
                {
                  label: "加",
                  key: "z23"
                },
                {
                  label: "减",
                  key: "z23"
                }
              ]
            },
            {
              field: "z4",
              type: "input"
            }
          ]
        },
        {
          label:
            "按季度结息，每季度末月的20日为结息日，21日为付息日。若该季末月21日为法定休息日（如周六、日）或法定节假日（如春节），该季付息日可顺延至法定休息日或法定节假日后第一个工作日。",
          value: "4.4.1",
          summary: false
        },
        {
          label:
            "按月结息，每月的20日为结息日，21日为付息日。若该月21日为法定休息日（如周六、日）或法定节假日（如春节），该月付息日可顺延至法定休息日或法定节假日后第一个工作日。",
          value: "4.4.2",
          summary: false
        },
        {
          label:
            "按月结息，每月的20日为结息日，21日为付息日。若该月21日为法定休息日（如周六、日）或法定节假日（如春节），该月付息日可顺延至法定休息日或法定节假日后第一个工作日。",
          value: "4.4.4",
          summary: false
        },
        {
          label: "其他方式：$",
          value: "4.4.3",
          summary: false,
          children: [
            {
              field: "mctkxjtj",
              type: "input"
            }
          ]
        }
      ]
    },
    {
      id: "1",
      type: "input",
      field: "a1",
      title: "甲方（借款人）",
      value: "111"
    },
    {
      id: "11",
      type: "input",
      field: "a2",
      title: "住所（地址）",
      value: ""
    },
    {
      id: "12",
      type: "input-long",
      field: "aqqq3",
      title: "双方约定的首次还款的其他条件",
      value: ""
    },
    {
      id: "12",
      type: "input",
      field: "a3",
      title: "电话",
      value: ""
    },
    {
      id: "62",
      type: "input-loan",
      field: "a62",
      title: "借款金额",
      value: "",
      capitalized: "aa62"
    },
    {
      id: "63",
      type: "input-flatten",
      field: "a63",
      title: "借款利率（年）",
      value: [],
      label: "中国邮政储蓄银行$行$饿",
      options: [
        {
          field: "a63333",
          type: "input",
          value: ""
        },
        {
          field: "a633333",
          type: "input",
          value: ""
        }
      ]
    },
    {
      id: "13",
      type: "input",
      field: "a4",
      title: "传真",
      value: ""
    },
    {
      id: "14",
      type: "input",
      field: "a5",
      title: "法定代表人/负责人",
      value: ""
    },
    {
      id: "111",
      type: "title-small",
      field: "",
      title: "第一条 透支账户",
      value: "第一条 透支账户"
    },
    {
      id: "112",
      type: "input",
      field: "a6",
      title: "透支账户账号",
      value: "",
      options: []
    },
    {
      id: "1132",
      type: "select",
      field: "a1131",
      title: "账户类型",
      value: "",
      options: [
        {
          value: "a",
          label: "基本存款类型"
        },
        {
          value: "b",
          label: "一般存款类型"
        },
        {
          value: "c",
          label: "专用账户"
        }
      ]
    },
    {
      id: "1131",
      type: "datePickerRange",
      field: "a1131",
      title: "时间",
      value: ""
    },
    {
      id: "113",
      type: "input",
      field: "a7",
      title: "住所（地址）",
      value: ""
    },
    {
      id: "114",
      type: "input",
      field: "a8",
      title: "电话",
      value: ""
    },
    {
      id: "115",
      type: "input",
      field: "a9",
      title: "传真",
      value: ""
    },
    {
      id: "116",
      type: "input",
      field: "a16",
      title: "法定代表人/负责人",
      value: ""
    },
    {
      id: "21",
      type: "title-small",
      field: "",
      title: "贷款信息",
      value: "贷款信息"
    },
    {
      id: "211",
      type: "input",
      field: "a21",
      title: "贷款金额",
      value: ""
    },
    {
      id: "22",
      type: "input",
      field: "a22",
      title: "贷款期限",
      value: ""
    },
    {
      id: "23",
      type: "input",
      field: "a23",
      title: "贷款用于项目名称",
      value: ""
    },
    {
      id: "31",
      type: "title-small",
      field: "",
      title: "贷款账户信息",
      value: "贷款账户信息"
    },
    {
      id: "34",
      type: "input",
      field: "a31",
      title: "开户行（贷款账户）",
      value: ""
    },
    {
      id: "32",
      type: "input",
      field: "a32",
      title: "开户名称（贷款账户）",
      value: ""
    },
    {
      id: "33",
      type: "input",
      field: "a33",
      title: "账户（贷款账户）",
      value: ""
    },
    {
      id: "41",
      type: "title-small",
      field: "",
      title: "资金监管专户",
      value: "资金监管专户"
    },
    {
      id: "42",
      type: "input",
      field: "a41",
      title: "开户行（资金监管专户）",
      value: ""
    },
    {
      id: "43",
      type: "input",
      field: "a42",
      title: "开户名称（资金监管专户）",
      value: ""
    },
    {
      id: "44",
      type: "input",
      field: "a43",
      title: "账户（资金监管专户）",
      value: ""
    },
    {
      id: "51",
      type: "title-small",
      field: "",
      title: "资金支付方式",
      value: "资金支付方式"
    },
    {
      id: "52",
      type: "radio",
      field: "a52",
      title: "",
      value: "b",
      required: true,
      options: [
        {
          label: "全部采取乙方受托支付...",
          value: "a"
        },
        {
          label: "单笔支付金额超过本项目总投资...",
          value: "b"
        }
      ]
    },
    {
      id: "61",
      type: "title-small",
      field: "",
      title: "本息偿还形式",
      value: "本息偿还形式"
    },
    {
      id: "62",
      type: "famtter",
      field: "",
      title: "",
      options: [
        {
          label:
            "项目销售率达到$%后，甲方应当以销售收入的$%偿还贷款本金；项目销售率达到$%后，甲方应当以销售收入的$%偿还贷款本金；",
          key: ["a621", "a612", "a623", "a624"],
          value: []
        },
        {
          label:
            "项目销售率达到$%后，甲方应当以销售收入的$%偿还贷款本金；项目销售率达到$%后，甲方应当归还$%的乙方贷款本金；；",
          key: ["a6211", "a6222", "a6232", "a6242"],
          value: []
        },
        {
          label: "项目销售率达到$甲方应结清乙方全部贷款本息；",
          key: ["a62222"],
          value: []
        }
      ]
    },
    {
      id: "71",
      type: "title-small",
      field: "",
      title: "结算及按揭贷款业务",
      value: "结算及按揭贷款业务"
    },
    {
      id: "72",
      type: "famtter",
      field: "",
      title: "",
      options: [
        {
          label: "甲方在乙方的存款余额、结算业务量应不低于甲方全部业务量的$%；",
          key: ["a721"],
          value: []
        },
        {
          label:
            "甲方应就贷款项目安排、介绍客户在乙方或其下属分支机构办理个人按揭贷款业务，按揭业务量应不低于总按揭量的$%;",
          key: ["a722"],
          value: []
        }
      ]
    },
    {
      id: "7121",
      type: "title-small",
      field: "",
      title: "请选择提款计划",
      value: "请选择提款计划"
    },
    {
      id: "71211",
      type: "radio-flattern",
      field: "a71211",
      title: "",
      required: true,
      value: "b",
      options: [
        {
          label:
            "借款人应于$一次性提供本合同项下全部借款，具体的提款日期以《借款凭证》载明的日期为准",
          value: "a",
          children: [
            {
              field: "a712111",
              type: "datePicker"
            }
          ]
        },
        {
          label:
            "借款人应在提款期内进行提款，具体的提款日起以《借款凭证》载明的日期为准。本合同项下提款期为$年（或$个月），自借款合同生效之日开始，至$止；提款期之外，贷款人有权拒绝发放贷款",
          value: "b",
          children: [
            {
              field: "a712112",
              type: "input"
            },
            {
              field: "a712113",
              type: "input"
            },
            {
              field: "a712114",
              type: "datePicker"
            }
          ]
        },
        {
          label: "按计划时间分次提款，具体提款计划见附件《提款计划表》",
          value: "c",
          children: []
        }
      ]
    },
    {
      id: "7122",
      type: "title-small",
      field: "",
      title: "请选择提款计划(多选)",
      value: "请选择提款计划(多选)"
    },
    {
      id: "71221",
      type: "checkbox-flattern",
      field: "a71221",
      title: "",
      required: true,
      value: ["a", "b"],
      options: [
        {
          label:
            "借款人应于$一次性提供本合同项下全部借款，具体的提款日期以《借款凭证》载明的日期为准",
          value: "a",
          children: [
            {
              field: "a712211",
              type: "datePicker"
            }
          ]
        },
        {
          label:
            "借款人应在提款期内进行提款，具体的提款日起以《借款凭证》载明的日期为准。本合同项下提款期为$年（或$个月），自借款合同生效之日开始，至$止；提款期之外，贷款人有权拒绝发放贷款",
          value: "b",
          children: [
            {
              field: "a712212",
              type: "input"
            },
            {
              field: "a712213",
              type: "input"
            },
            {
              field: "a712214",
              type: "datePicker"
            }
          ]
        },
        {
          label: "按计划时间分次提款，具体提款计划见附件《提款计划表》",
          value: "c",
          children: []
        }
      ]
    },

    {
      id: "vvv",
      type: "famtter2",
      field: "",
      title: "",
      options: [
        {
          label:
            "浮动利率，即以$$个月的$作为定价基准，在此基础上$$%，自起息日起至本合同项下本息全部清偿之日止,在定价基准调整之日根据对应的定价基准值进行调整。",
          children: [
            {
              field: "vvv3",
              type: "radioInput",
              value: "a",
              options: [
                {
                  label: "$年$月$日",
                  value: "c",
                  options: [
                    {
                      field: "jklv2B",
                      type: "input",
                      value: "aa"
                    },
                    {
                      field: "jklv2C",
                      type: "input",
                      value: "aa"
                    },
                    {
                      field: "jklv2D",
                      type: "input",
                      value: "aa"
                    }
                  ]
                },
                {
                  label: "每次贷款发放的起息日前一工作日",
                  value: "a"
                },
                {
                  label: "首次贷款发放的起息日前一工作日",
                  value: "b"
                }
              ]
            },
            {
              field: "jklv2E",
              type: "input"
            },
            {
              field: "jklv2F",
              type: "select",
              options: [
                {
                  label: "LPR",
                  value: "1"
                },
                {
                  label: "其他",
                  value: "2"
                }
              ]
            },
            {
              field: "jklv2G",
              type: "select",
              value: "a",
              options: [
                {
                  label: "加",
                  value: "1"
                },
                {
                  label: "减",
                  value: "2"
                }
              ]
            },
            {
              field: "jklv2H",
              type: "input"
            }
          ]
        }
      ]
    },
    {
      id: "aaa",
      type: "famtter2",
      field: "",
      title: "",
      options: [
        {
          label: "这是个废话标题，啥要填的都没有",
          children: []
        },
        {
          label:
            "为$（$）的LPR（$）BP，贷款期限内（$），贷款期限内利率调整的，调整后利率以系统为准。",
          children: [
            {
              field: "aaa1",
              type: "datePicker",
              value: ""
            },
            {
              field: "aaa4",
              type: "radio",
              value: "a",
              options: [
                {
                  label: "1年期",
                  value: "a"
                },
                {
                  label: "5年期以上",
                  value: "b"
                }
              ]
            },
            {
              field: "aaa2",
              type: "radio",
              value: "a",
              options: [
                {
                  label: "加",
                  value: "a"
                },
                {
                  label: "减",
                  value: "b"
                }
              ]
            },
            {
              field: "aaa3",
              type: "radioInput",
              value: "a",
              options: [
                {
                  label: "利率不变",
                  value: "a"
                },
                {
                  label: "下年初调整",
                  value: "b"
                },
                {
                  label: "每$个月调整",
                  value: "c",
                  options: [
                    {
                      field: "aaa31",
                      type: "input",
                      value: "aa"
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "81",
      type: "title-small",
      field: "",
      title: "甲方的承诺和保证",
      value: "甲方的承诺和保证"
    },
    {
      id: "82",
      type: "famtter",
      field: "",
      title: "",
      options: [
        {
          label: "提供项目的销售情况周期$天；",
          key: ["a821"],
          value: []
        }
      ]
    },
    {
      id: "91",
      type: "title-small",
      field: "",
      title: "协议的生效",
      value: "协议的生效"
    },
    {
      id: "92",
      type: "famtter",
      field: "",
      title: "",
      options: [
        {
          label: "本协议一式$份，甲方和乙方各执$份；",
          key: ["a921", "a922"],
          value: []
        }
      ]
    },
    {
      id: "101",
      type: "title-small",
      field: "",
      title: "其他",
      value: "其他"
    },
    {
      id: "102",
      type: "input",
      field: "a102",
      title: "其他附件名称",
      value: ""
    }
  ],
  annex: [
    {
      id: "111",
      type: "input",
      field: "a111",
      title: "编号",
      value: ""
    },
    {
      id: "112",
      type: "input",
      field: "a112",
      title: "申请人",
      value: ""
    },
    {
      id: "113",
      type: "datePicker",
      field: "a113",
      title: "时间",
      value: "2020-06-29"
    },
    {
      id: "114",
      type: "checkbox",
      field: "a114",
      title: "支用事由",
      value: ["a", "b"],
      required: true,
      options: [
        {
          label: "备用金支用",
          value: "a"
        },
        {
          label: "建设资金支用",
          value: "b"
        }
      ]
    },
    {
      id: "115",
      type: "title-small",
      field: "",
      title: "用途计划",
      value: "用途计划"
    },
    {
      id: "a116",
      type: "table-info",
      field: "",
      title: "",
      value: "",
      options: [
        { prop: "nodeName", label: "用途", type: "input", value: "1" },
        { prop: "address", label: "收款人", type: "input", value: "2" },
        {
          prop: "port",
          label: "用款金额",
          type: "datePicker",
          value: "2020-09-11"
        },
        {
          prop: "aaawfrw",
          label: "相关依据",
          type: "select",
          value: "a",
          options: [
            {
              label: "选项1",
              value: "a"
            },
            {
              label: "选项2",
              value: "b"
            },
            {
              label: "选项3",
              value: "c"
            }
          ]
        }
      ]
    },
    {
      id: "a117",
      type: "rows-info",
      field: "",
      title: "约定的其他事项(如有)",
      value: "",
      options: [
        {
          prop: "another",
          type: "input",
          value: "1"
        }
      ]
    }
  ]
};

const testJson2 = {
  baseInfo: [
    {
      type: "title-small",
      title: "合同基本信息"
    },
    {
      type: "input",
      field: "htbh",
      title: "合同编号",
      rules: [
        {
          required: "true",
          message: "合同编号不能为空"
        }
      ]
    },
    {
      type: "input-loan",
      field: "jkje",
      title: "借款金额",
      dxField: "jkjedx",
      capitalized: "",
      rules: [
        {
          required: "true",
          message: "借款金额不能为空"
        },
        {
          pattern: "/^((\\d(\\.\\d{0,2})?)|(\\d*\\.\\d{0,2}))$/",
          message: "请填写数字,最多2位小数"
        }
      ]
    },
    {
      type: "famtter",
      options: [
        {
          label: "借款期限"
        },
        {
          label:
            "本合同项下借款期限为$年（或$个月），自首笔借款资金到达借款人指定账户起开始计算，至本合同约定的本金和末期利息全部清偿之日止，即从$年$月$日起至$年$月$日止。若分次提款，每次提款的到期日不超过借款期限截止日。实际提款日均以《借款凭证》载明的日期为准，《借款凭证》是本合同不可分割的组成部分",
          key: [
            "loanLifeYears",
            "loanLifeMonths",
            "loanLifeStartYear",
            "loanLifeStartMonth",
            "loanLifeStartDate",
            "loanLifeEndYear",
            "loanLifeEndMonth",
            "loanLifeEndDate"
          ]
        }
      ]
    },
    {
      type: "input",
      field: "jkyt",
      title: "借款用途",
      rules: [
        {
          required: "true",
          message: "借款用途不能为空"
        }
      ]
    },
    {
      type: "title-small",
      title: "借款人信息"
    },
    {
      type: "input",
      field: "jkrName",
      title: "借款人（全称）",
      rules: [
        {
          required: "true",
          message: "借款人名称不能为空"
        }
      ]
    },
    {
      type: "input",
      field: "jkrAddr",
      title: "借款人住所（地址）",
      rules: [
        {
          required: "true",
          message: "借款人住所不能为空"
        }
      ]
    },
    {
      type: "input",
      field: "jkrPhone",
      title: "借款人电话",
      rules: [
        {
          required: "true",
          message: "借款人电话不能为空"
        },
        {
          pattern: "/^1[3456789]d{9}$/",
          message: "借款人电话不合规"
        }
      ]
    },
    {
      type: "input",
      field: "jkrFax",
      title: "借款人传真",
      rules: [
        {
          required: "true",
          message: "借款人传真不能为空"
        },
        {
          pattern: "/^(?:\\d{3,4}-)?\\d{7,8}(?:-\\d{1,6})?$/",
          message: "借款人传真号码不合规"
        }
      ]
    },
    {
      type: "input",
      field: "jkrBoss",
      title: "借款人法定代表人/负责人",
      rules: [
        {
          required: "true",
          message: "借款负责人不能为空"
        }
      ]
    },
    {
      type: "title-small",
      title: "贷款人信息"
    },
    {
      type: "input",
      field: "dkrName",
      title: "贷款人（全称）",
      rules: [
        {
          required: "true",
          message: "贷款人名称不能为空"
        }
      ]
    },
    {
      type: "input",
      field: "dkrAddr",
      title: "贷款人住所（地址）",
      rules: [
        {
          required: "true",
          message: "贷款人住所不能为空"
        }
      ]
    },
    {
      type: "input",
      field: "dkrPhone",
      title: "贷款人电话",
      rules: [
        {
          required: "true",
          message: "贷款人电话不能为空"
        },
        {
          pattern: "/^1[3456789]d{9}$/",
          message: "贷款人电话不合规"
        }
      ]
    },
    {
      type: "input",
      field: "dkrFax",
      title: "贷款人传真",
      rules: [
        {
          required: "true",
          message: "贷款人传真不能为空"
        },
        {
          pattern: "/^(?:\\d{3,4}-)?\\d{7,8}(?:-\\d{1,6})?$/",
          message: "贷款人传真号码不合规"
        }
      ]
    },
    {
      type: "input",
      field: "dkrBoss",
      title: "贷款法定代表人/负责人",
      rules: [
        {
          required: "true",
          message: "贷款负责人不能为空"
        }
      ]
    },
    {
      type: "title-small",
      title: "利率利息"
    },
    {
      type: "radio-flattern",
      field: "1",
      options: [
        {
          label:
            "本合同项下的借款利率为含增值税的年利率，并采用以下第$种方式确定",
          summary: "true",
          children: [
            {
              field: "jklvMode",
              type: "input"
            }
          ]
        },
        {
          label:
            "4.1.1 固定利率，即以$的$个月的$作为定价基准，在此基础上$ $%，贷款期限内该利率保持不变。",
          value: "4.1.1",
          children: [
            // {
            //   field: "bb",
            //   type: "input",
            //   summary: true
            // },
            {
              field: "jklv1A",
              type: "radioInput",
              options: [
                {
                  label: "$年$月$日",
                  options: [
                    {
                      field: "jklv1B",
                      type: "input"
                    },
                    {
                      field: "jklv1C",
                      type: "input"
                    },
                    {
                      field: "jklv1D",
                      type: "input"
                    }
                  ],
                  value: "$年$月$日"
                },
                {
                  label: "每次贷款发放的起息日前一工作日",
                  value: "每次贷款发放的起息日前一工作日"
                },
                {
                  label: "首次贷款发放的起息日前一工作日",
                  value: "首次贷款发放的起息日前一工作日"
                }
              ]
            },
            {
              field: "jklv1E",
              type: "input"
            },
            {
              field: "jklv1F",
              type: "select",
              options: [
                {
                  label: "LPR",
                  value: "LPR"
                },
                {
                  label: "其他",
                  value: "其他"
                }
              ]
            },
            {
              field: "jklv1G",
              type: "select",
              value: "a",
              options: [
                {
                  label: "加",
                  value: "加"
                },
                {
                  label: "减",
                  value: "减"
                }
              ]
            },
            {
              field: "jklv1H",
              type: "input"
            }
          ]
        },
        {
          label:
            "4.1.2 浮动利率，即以$($)$个月的$作为定价基准，在此基础上$$%，自起息日起至本合同项下本息全部清偿之日止,在定价基准调整之日根据对应的定价基准值进行调整。",
          value: "4.1.2",
          children: [
            // {
            //   field: "bb2",
            //   type: "input",
            //   summary: true
            // },
            {
              field: "jklv2A",
              type: "radioInput",
              options: [
                {
                  label: "$年$月$日",
                  options: [
                    {
                      field: "jklv2B",
                      type: "input"
                    },
                    {
                      field: "jklv2C",
                      type: "input"
                    },
                    {
                      field: "jklv2D",
                      type: "input"
                    }
                  ],
                  value: "$年$月$日"
                },
                {
                  label: "每次贷款发放的起息日前一工作日",
                  value: "每次贷款发放的起息日前一工作日"
                },
                {
                  label: "首次贷款发放的起息日前一工作日",
                  value: "首次贷款发放的起息日前一工作日"
                }
              ]
            },
            {
              field: "jklv2E",
              type: "input"
            },
            {
              field: "jklv2F",
              type: "select",
              options: [
                {
                  label: "LPR",
                  value: "LPR"
                },
                {
                  label: "其他",
                  value: "其他"
                }
              ]
            },
            {
              field: "jklv2G",
              type: "select",
              value: "a",
              options: [
                {
                  label: "加",
                  value: "加"
                },
                {
                  label: "减",
                  value: "减"
                }
              ]
            },
            {
              field: "jklv2H",
              type: "input"
            }
          ]
        },
        {
          label:
            "4.1.3 浮动利率，即以$($)的$个月的$作为定价基准，在此基础上$$%，自起息日起至本合同项下本息全部清偿之日止,每$个月根据利率调整日对应的定价基准值（LPR取利率调整日前一个工作日利率值）进行调整。利率调整日为以下第$种",
          value: "4.1.3",
          children: [
            // {
            //   field: "bb3",
            //   type: "input",
            //   summary: true
            // },
            {
              field: "jklv3A",
              type: "radioInput",
              options: [
                {
                  label: "$年$月$日",
                  options: [
                    {
                      field: "jklv3B",
                      type: "input"
                    },
                    {
                      field: "jklv3C",
                      type: "input"
                    },
                    {
                      field: "jklv3D",
                      type: "input"
                    }
                  ],
                  value: "$年$月$日"
                },
                {
                  label: "每次贷款发放的起息日前一工作日",
                  value: "每次贷款发放的起息日前一工作日"
                },
                {
                  label: "首次贷款发放的起息日前一工作日",
                  value: "首次贷款发放的起息日前一工作日"
                }
              ]
            },
            {
              field: "jklv3E",
              type: "input"
            },
            {
              field: "jklv3F",
              type: "select",
              options: [
                {
                  label: "LPR",
                  value: "LPR"
                },
                {
                  label: "其他",
                  value: "其他"
                }
              ]
            },
            {
              field: "jklv3G",
              type: "select",
              value: "a",
              options: [
                {
                  label: "加",
                  value: "加"
                },
                {
                  label: "减",
                  value: "减"
                }
              ]
            },
            {
              field: "bb4",
              type: "input"
            },
            {
              field: "jklv3I",
              type: "select",
              options: [
                {
                  label: "1",
                  value: "1"
                },
                {
                  label: "3",
                  value: "3"
                },
                {
                  label: "6",
                  value: "6"
                },
                {
                  label: "12",
                  value: "12"
                }
              ]
            },
            {
              field: "aaaa1",
              type: "input",
              summary: true
            },
            {
              field: "aaaa1",
              type: "radioInput",
              options: [
                {
                  label:
                    "利率调整日为每次贷款发放的起息日在调整当月的对应日，当月没有起息日的对应日的，则当月最后一日为利率调整日",
                  value: "一"
                },
                {
                  label: "利率调整日为调整当月的$日。",
                  options: [
                    {
                      field: "aaaa2",
                      type: "input"
                    }
                  ],
                  value: "二"
                }
              ]
            }
          ]
        },
        {
          label: "4.1.4 其他：$",
          value: "4.1.4",
          children: [
            {
              field: "jklv4A",
              type: "input"
            }
          ]
        }
      ]
    },
    {
      id: "7",
      type: "input-flatten",
      title: "逾期借款罚息利率",
      label: "借款利率×$%",
      options: [
        {
          field: "yjfx",
          type: "input"
        }
      ]
    },
    {
      id: "7",
      type: "input-flatten",
      title: "挪用借款罚息利率",
      label: "借款利率×$%",
      options: [
        {
          field: "nyfx",
          type: "input"
        }
      ]
    },
    {
      type: "radio-flattern",
      field: "3",
      options: [
        {
          label: "本合同项下借款采用以下第$种方式结息",
          summary: "true",
          children: [
            {
              field: "jxMode",
              type: "input"
            }
          ]
        },
        {
          label:
            "按季度结息，每季度末月的20日为结息日，21日为付息日。若该季末月21日为法定休息日（如周六、日）或法定节假日（如春节），该季付息日可顺延至法定休息日或法定节假日后第一个工作日。",
          value: "4.4.1"
        },
        {
          label:
            "按月结息，每月的20日为结息日，21日为付息日。若该月21日为法定休息日（如周六、日）或法定节假日（如春节），该月付息日可顺延至法定休息日或法定节假日后第一个工作日。",
          value: "4.4.2"
        },
        {
          label: "其他方式：$",
          value: "4.4.3",
          children: [
            {
              field: "mctkxjtj",
              type: "input-long"
            }
          ]
        }
      ]
    },
    {
      type: "title-small",
      title: "提款"
    },
    {
      type: "input",
      field: "sctkxjtj",
      title: "双方约定首次提款的其他先决条件"
    },
    {
      type: "input",
      field: "mctkxjtj",
      title: "双方约定每次提款的其他先决条件"
    },
    {
      type: "radio-flattern",
      field: "4",
      options: [
        {
          label: "借款人应按下列第$项约定的计划提款",
          summary: "true",
          children: [
            {
              field: "tzjhyd",
              type: "input"
            }
          ]
        },
        {
          label:
            "借款人应于$年$月$日一次性提取本合同项下全部借款，具体的提款日期以《借款凭证》载明的日期为准",
          value: "（1）",
          children: [
            {
              field: "tkStartYear",
              type: "input"
            },
            {
              field: "tkStartMonth",
              type: "input"
            },
            {
              field: "tkStartDate",
              type: "input"
            }
          ]
        },
        {
          label:
            "借款人应在提款期内进行提款，具体的提款日期以《借款凭证》载明的日期为准。本合同项下提款期为$年（或$个月），自借款合同生效之日开始，至$年$月$日止；提款期之外，贷款人有权拒绝发放贷款",
          value: "（2）",
          children: [
            {
              field: "tkYears",
              type: "input"
            },
            {
              field: "tkMonths",
              type: "input"
            },
            {
              field: "tkEndYear",
              type: "input"
            },
            {
              field: "tkEndMonth",
              type: "input"
            },
            {
              field: "tkEndDate",
              type: "input"
            }
          ]
        },
        {
          label: "按计划时间分次提款，具体提款计划见附件3《提款计划表》",
          value: "（3）"
        }
      ]
    },
    {
      type: "famtter",
      field: "",
      title: "",
      options: [
        {
          label:
            "未经贷款人书面同意，借款人不得取消本合同项下尚未提取的借款，否则贷款人有权就被取消的借款向借款人收取_$_%的违约金，作为对贷款人资金安排成本及收益损失的补偿",
          key: ["wtkwyj"]
        },
        {
          label:
            "借款人应在提款日的前_$_个工作日，向贷款人提交根据贷款人要求准确填写的《支用申请书》和《借款凭证》",
          key: ["tktqgx"]
        }
      ]
    },
    {
      type: "title-small",
      title: "支付"
    },
    {
      type: "radio-flattern",
      field: "5",
      options: [
        {
          label: "本合同项下贷款资金的支付采用如下第$种方式",
          summary: "true",
          children: [
            {
              field: "zfMode",
              type: "input"
            }
          ]
        },
        {
          label:
            "全部采取贷款人受托支付：贷款人受托支付，指贷款人根据借款人的提款申请和支付委托，将借款资金从借款人账户划转给符合合同约定用途的借款人交易对手",
          value: "7.1.1"
        },
        {
          label:
            "全部采取借款人自主支付：借款人自主支付，指贷款人根据借款人的提款申请将借款资金发放至借款人账户后，由借款人自行划转给符合合同约定用途的借款人交易对手",
          value: "7.1.2"
        },
        {
          label:
            "单笔支付金额大于$万元人民币的，应当采用贷款人受托支付方式；其他情况，应根据贷款人要求及指令，选择适用贷款人受托支付或借款人自主支付方式",
          value: "7.1.3",
          children: [
            {
              field: "dbzfzdje",
              type: "input"
            }
          ]
        }
      ]
    },
    {
      type: "title-small",
      title: "还款"
    },
    {
      type: "radio-flattern",
      field: "6",
      options: [
        {
          label: "借款人应按以下第$种方式按时、足额偿还本合同项下借款本金",
          summary: "true",
          children: [
            {
              field: "hkMode",
              type: "input"
            }
          ]
        },
        {
          label: "一次还本，借款人应于$年$月$日一次性偿还全部借款本金",
          value: "（1）",
          children: [
            {
              field: "hkYear",
              type: "input"
            },
            {
              field: "hkMonth",
              type: "input"
            },
            {
              field: "hkDate",
              type: "input"
            }
          ]
        },
        {
          label:
            "按计划时间分次归还本合同项下借款本金，具体还款计划见附加4《还款计划表》",
          value: "（2）"
        }
      ]
    },
    {
      field: "hkybDate",
      type: "famtter2",
      title: "",
      options: [
        {
          label: "如借款人提前偿还借款，应当优先偿还最$（先/后）到期的借款",
          children: [
            {
              field: "tqhkzhyq",
              type: "select",
              options: [
                {
                  value: "先",
                  label: "先"
                },
                {
                  value: "后",
                  label: "后"
                }
              ]
            }
          ]
        }
      ]
    },
    {
      field: "",
      type: "famtter",
      title: "",
      options: [
        {
          label:
            "除借款人一次性偿清全部剩余借款本金外，借款人任何一次提前还款的金额不得少于$万元人民币，且应为100万元人民币的整数倍",
          key: ["tqhkje"]
        },
        {
          label:
            "如借款人按照本条上述约定在征得贷款人同意后提前还款的，贷款人不向借款人收取违约金；如借款人未按照本条上述约定征得贷款人同意而提前还款的，贷款人有权向借款人按提前偿还借款金额的$%计收违约金，作为对贷款人资金安排成本和预期收益损失的补偿",
          key: ["tqhkwyjrate"]
        }
      ]
    },
    {
      type: "title-small",
      title: "账户"
    },
    {
      type: "input",
      field: "jkrAccountName",
      title: "户名"
    },
    {
      type: "input",
      field: "jkrOpenBankName",
      title: "开户行"
    },
    {
      type: "input",
      field: "jkrskAccount",
      title: "账号"
    },
    {
      type: "input",
      field: "zfxthh",
      title: "支付系统行号"
    },
    {
      type: "title-small",
      title: "担保"
    },
    {
      type: "checkbox-flattern",
      field: "10",
      options: [
        {
          label: "担保方式为以下第$项（可多选）",
          summary: "true",
          children: [
            {
              field: "dbMode",
              type: "input"
            }
          ]
        },
        {
          label: "信用方式",
          value: "10.1"
        },
        {
          label:
            "由保证人$根据编号为$的《$》（连带责任保证合同/借款保函）向贷款人提供连带责任保证担保",
          value: "10.2",
          children: [
            {
              field: "dbrName",
              type: "input"
            },
            {
              field: "dbfjNum",
              type: "input"
            },
            {
              field: "dbfjName",
              type: "input"
            }
          ]
        },
        {
          label:
            "由抵押人$根据编号为$的《$抵押合同》向贷款人提供抵押担保，抵押物为$",
          value: "10.3",
          children: [
            {
              field: "dyrName",
              type: "input"
            },
            {
              field: "dyfjNum",
              type: "input"
            },
            {
              field: "dyfjName",
              type: "input"
            },
            {
              field: "dywName",
              type: "input"
            }
          ]
        },
        {
          label:
            "由出质人$根据编号为$的《$质押合同》向贷款人提供质押担保，质押物为$",
          value: "10.4",
          children: [
            {
              field: "czrName",
              type: "input"
            },
            {
              field: "czrfjNum",
              type: "input"
            },
            {
              field: "czrfjName",
              type: "input"
            },
            {
              field: "czrzyw",
              type: "input"
            }
          ]
        },
        {
          label: "其他担保措施：$",
          value: "10.5",
          children: [
            {
              field: "otherdbcs",
              type: "input-long"
            }
          ]
        }
      ]
    },
    {
      type: "title-small",
      title: "争议解决"
    },
    {
      type: "radio-flattern",
      field: "7",
      options: [
        {
          label: "应按以下第$种方式解决",
          summary: "true",
          children: [
            {
              field: "zyjjMode",
              type: "input"
            }
          ]
        },
        {
          label: "向贷款人住所地有管辖权的人民法院起诉",
          value: "24.1.1"
        },
        {
          label:
            "提交$仲裁委员会，按照申请仲裁时该会现行有效的仲裁规则进行仲裁。仲裁裁决为终局裁决，对双方均有约束力",
          value: "24.1.2",
          children: [
            {
              field: "zcwName",
              type: "input"
            }
          ]
        }
      ]
    },
    {
      type: "input-long",
      field: "qtydContent",
      title: "其他约定"
    },
    {
      type: "title-small",
      title: "附则"
    },
    {
      type: "radio-flattern",
      field: "8",
      options: [
        {
          label: "本合同适用以下第$项约定",
          summary: "true",
          children: [
            {
              field: "fzMode",
              type: "input"
            }
          ]
        },
        {
          label:
            "本合同系编号为$的《贷款授信协议》（以下简称授信协议）项下的具体业务合同，本合同签署者及本合同项下法律关系均受该授信协议的约束",
          value: "26.1.1",
          children: [
            {
              field: "dksxxy",
              type: "input"
            }
          ]
        },
        {
          label: "本合同系借款人与贷款人签署的独立信贷文件",
          value: "26.1.2"
        }
      ]
    },
    {
      type: "famtter",
      options: [
        {
          label: "合同效力"
        },
        {
          label:
            "本合同一式$份，贷款人、借款人双方各执$份，抵押登记机关执$份，公证机关执$份，每份均具同等法律效力",
          key: ["htTotalCnt", "dkrjkrCnt", "dydjjgCnt", "gzjgCnt"]
        }
      ]
    },
    {
      type: "input-long",
      field: "qtfjxx",
      title: "其他附件"
    }
  ],
  annex: [
    {
      type: "title-small",
      title: "附件1：中国邮政储蓄银行公司信贷支用申请书（受托支付）"
    },
    {
      type: "input-flatten",
      field: "",
      title: "编号",
      label: "邮储贷（$）$号",
      options: [
        {
          field: "ycdbh1",
          type: "input"
        },
        {
          field: "ycdbh2",
          type: "input"
        }
      ]
    },
    {
      type: "input",
      field: "fj1sqr",
      title: "申请人"
    },
    {
      type: "input",
      field: "fj1jbdw",
      title: "经办单位"
    },
    {
      type: "input",
      field: "fj1xmmc",
      title: "项目名称"
    },
    {
      type: "input",
      field: "fj1htbh",
      title: "合同编号"
    },
    {
      field: "",
      type: "famtter",
      title: "",
      options: [
        {
          label: "申请人账户信息"
        },
        {
          label: "中国邮政储蓄银行$行",
          key: ["fhmc"]
        },
        {
          label:
            "根据我公司作为借款人与贵行作为贷款人于$年$月$日签订的编号为$的“中国邮政储蓄银行$借款合同”约定，本笔贷款采用贷款人受托方式支付。我公司不可撤销地向贵行申请于$年$月$日提款（币种）$元（大写：$），并授权贵行通过本公司放款账户（户名：$账号：$开户行：$），按如下要求办理对外支付：$",
          key: [
            "sqrsyl1",
            "sqrsyl2",
            "sqrsyl3",
            "sqrsyl4",
            "sqrsyl5",
            "sqrsyl6",
            "sqrsyl7",
            "sqrsyl8",
            "sqrsyl9",
            "sqrsyl10",
            "sqrsyl11",
            "sqrsyl12",
            "sqrsyl13",
            "sqrsyl14"
          ]
        },
        {
          label: "本合同系借款人与贷款人签署的独立信贷文件"
        }
      ]
    },
    {
      type: "input",
      field: "xdzysqsSKR",
      title: "受托支付对象1-收款人"
    },
    {
      type: "input",
      field: "xdzysqsSKAccount",
      title: "受托支付对象1-收款人账号"
    },
    {
      type: "input",
      field: "xdzysqsSKBank",
      title: "受托支付对象1-收款人开户银行"
    },
    {
      type: "input",
      field: "xdzysqsSKMoney",
      title: "受托支付对象1-支付金额"
    },
    {
      type: "input",
      field: "xdzysqsSKR2",
      title: "受托支付对象2-收款人"
    },
    {
      type: "input",
      field: "xdzysqsSKAccount2",
      title: "受托支付对象2-收款人账号"
    },
    {
      type: "input",
      field: "xdzysqsSKBank2",
      title: "受托支付对象2-收款人开户银行"
    },
    {
      type: "input",
      field: "xdzysqsSKMoney2",
      title: "受托支付对象2-支付金额"
    },
    {
      type: "input",
      field: "xdzysqsSKR3",
      title: "受托支付对象3-收款人"
    },
    {
      type: "input",
      field: "xdzysqsSKAccount3",
      title: "受托支付对象3-收款人账号"
    },
    {
      type: "input",
      field: "xdzysqsSKBank3",
      title: "受托支付对象3-收款人开户银行"
    },
    {
      type: "input",
      field: "xdzysqsSKMoney3",
      title: "受托支付对象3-支付金额"
    },
    {
      type: "input",
      field: "xdzysqsSKR4",
      title: "受托支付对象4-收款人"
    },
    {
      type: "input",
      field: "xdzysqsSKAccount4",
      title: "受托支付对象4-收款人账号"
    },
    {
      type: "input",
      field: "xdzysqsSKBank4",
      title: "受托支付对象4-收款人开户银行"
    },
    {
      type: "input",
      field: "xdzysqsSKMoney4",
      title: "受托支付对象4-支付金额"
    },
    {
      type: "input",
      field: "xdzysqsSKR5",
      title: "其他-收款人"
    },
    {
      type: "input",
      field: "xdzysqsSKAccount5",
      title: "其他-收款人账号"
    },
    {
      type: "input",
      field: "xdzysqsSKBank5",
      title: "其他-收款人开户银行"
    },
    {
      type: "input",
      field: "xdzysqsSKMoney5",
      title: "其他-支付金额"
    },
    {
      field: "xdzysqsTotalPay",
      type: "input-loan",
      title: "总计支付金额",
      capitalized: "xdzysqsTotalPayDX"
    },
    {
      type: "input",
      field: "xdzysqsKXYT",
      title: "用款项具体用途"
    },
    {
      type: "rows-info",
      id: "rows-info1",
      title: "有关的资金支用凭证和法律文件如下",
      options: [
        {
          prop: "fj1pzflwj",
          label: "有关的资金支用凭证和法律文件如下",
          type: "input"
        }
      ]
    },
    {
      type: "title-small",
      title: "附件2：中国邮政储蓄银行公司信贷支用申请书（自主支付）"
    },
    {
      type: "input-flatten",
      field: "",
      title: "编号",
      label: "邮储贷（$）$号",
      options: [
        {
          field: "zzzfycdbh1",
          type: "input"
        },
        {
          field: "zzzfycdbh2",
          type: "input"
        }
      ]
    },
    {
      type: "input",
      field: "zzzffj1sqr",
      title: "申请人"
    },
    {
      type: "input",
      field: "zzzffj1jbdw",
      title: "经办单位"
    },
    {
      type: "input",
      field: "zzzyywpz",
      title: "业务品种"
    },
    {
      type: "input",
      field: "zzzyfj1htbh",
      title: "合同编号"
    },
    {
      type: "input",
      field: "zzzyxmmc",
      title: "项目名称"
    },
    {
      field: "",
      type: "famtter",
      title: "",
      options: [
        {
          label: "申请人账户信息"
        },
        {
          label: "致：中国邮政储蓄银行$行（贷款人）",
          key: ["zzzyfhmc"]
        },
        {
          label: "致：中国邮政储蓄银行$行（贷款人）",
          key: ["zzzyfhmc"]
        },
        {
          label: "自：$（借款人）",
          key: ["zzzyjkr"]
        },
        {
          label:
            "根据我公司作为借款人与贵行作为贷款人于$年$月$日签订的编号为$的“中国邮政储蓄银行$借款合同”约定，本笔贷款采用贷款人受托方式支付。我公司不可撤销地向贵行申请于$年$月$日提款（币种）$元（大写：$），并授权贵行通过本公司放款账户（户名：$账号：$开户行：$），按如下要求办理对外支付：$",
          key: [
            "sqrsyl1",
            "sqrsyl2",
            "sqrsyl3",
            "sqrsyl4",
            "sqrsyl5",
            "sqrsyl6",
            "sqrsyl7",
            "sqrsyl8",
            "sqrsyl9",
            "sqrsyl10",
            "sqrsyl11",
            "sqrsyl12",
            "sqrsyl13",
            "sqrsyl14"
          ]
        },
        {
          label: "本合同系借款人与贷款人签署的独立信贷文件"
        }
      ]
    },
    {
      field: "",
      type: "famtter",
      title: "",
      options: [
        {
          label: "申请内容"
        },
        {
          label:
            "本支用申请援引我公司作为借款人与贵行作为贷款人于$年$月$日签订的编号为$的“中国邮政储蓄银行$借款合同”(以下称“借款合同”)",
          key: ["zzzyYear", "zzzyMonth", "zzzyDate", "zzzyHtbh", "zzzyhtmc"]
        },
        {
          label: "提款日为[$]年[$]月[$]日",
          key: ["zzzytkrYear", "zzzytkrMonth", "zzzytkrDate"]
        },
        {
          label: "金额为（币种）[$]元整",
          key: ["zzzytkrMoney"]
        },
        {
          label: "我公司在此确认，借款合同第$条所列提款先决条件均已获满足",
          key: ["zzzytkxjtj"]
        },
        {
          label:
            "$作为我公司法定代表人，在此确认我司在借款合同中的陈述和保证依然有效",
          key: ["zzzytkboss"]
        },
        {
          label: "请贵行将该笔贷款资金划入借款合同第$条所述放款账户",
          key: ["zzzytkaccount"]
        }
      ]
    }
  ]
};

export { testJson, testJson2 };
