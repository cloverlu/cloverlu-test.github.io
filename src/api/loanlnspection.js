// 贷后检查列表
const getNoticeCheckList = ({ $axios }, data) =>
  $axios.get(`/alm/postLoan/business/noticeCheckList`, data);

//业务信息查询
const queryDetail = ({ $axios }, data) =>
  $axios.get(`/alm/postLoan/business/queryForDtail`, data);

// 编辑业务信息
// 保存属性
const SaveEditModelBusiness = ({ $axios }, data) =>
  $axios.post(`/alm/postLoan/business/editModelBusiness`, data);
// $axios({
//   url: `/alm/postLoan/business/editModelBusiness`,
//   method: "post",
//   data: data,
//   transformRequest: [
//     function(data) {
//       // 对 data 进行任意转换处理
//       return Qs.stringify(data);
//     }
//   ]
//   // headers: {
//   //   deviceCode: "A95ZEF1-47B5-AC90BF3"
//   // }
// });

// 申请明细
const queryForDtail = ({ $axios }, data) =>
  $axios.post(`/alm/postLoan/business/queryForDtail`, data);

// 上传图片
const imageUpload = ({ $axios }, data) =>
  // $axios.post(`/alm/postLoan/business/uploadModelFile`, data);
  // $axios({
  //   url: `/alm/postLoan/business/uploadModelFile`,
  //   method: "post",
  //   data: data,
  //   headers: {
  //     "Content-Type": "multipart/form-data"
  //   }
  // });
  $axios({
    url: `/alm/postLoan/business/uploadModelFile`,
    method: "post",
    data: data,
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });

//提交审批
const submitApprove = ({ $axios }, data) =>
  $axios.post(`/alm/approve/save`, data);

//业务信息查询
const infoDetail = ({ $axios }, data) =>
  $axios.get(`/alm/postLoan/business/queryForBizDtail`, data);

export {
  getNoticeCheckList,
  SaveEditModelBusiness,
  queryForDtail,
  queryDetail,
  imageUpload,
  submitApprove,
  infoDetail
};
