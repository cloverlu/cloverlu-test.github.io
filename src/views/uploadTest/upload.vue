<!--
 * @Descripttion: 
 * @Author: penglu
 * @Date: 2020-07-21 13:37:06
-->

<template lang="pug">
	.aa 
		el-upload(
		:on-preview.stop.prevent="handlePictureCardPreview" 
		:file-list="fileList[item.vModel]" 
		:data="bizId"
		:on-remove="handleRemove" 
		:on-success="handleSuccess" 
		:before-upload="handleBefore"
		:multiple="false"
		action="http://20.147.168.82:9001/postLoan/business/uploadModelFile" 
		list-type="picture-card"  
		)
			i(class="el-icon-plus")
		//- div(slot="file" slot-scope="{file}")
		//-  img(:src="file.url"  class="el-upload-list__item-thumbnail"  alt="")
		//-  span(class="el-upload-list__item-actions")
		//-   span(  class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)")
		//-    i(class="el-icon-zoom-in")
		//-   span( v-if="!disabled" class="el-upload-list__item-delete" @click="handleDownload(file)")
		//-    i(class="el-icon-download")
		//-   span( v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file)")
		//-    i(class="el-icon-delete")
		el-dialog(:visible.sync="dialogVisible" )
			img(:src="dialogImageUrl" width="100%"  alt="")
</template>

<script>
import EXIF from "exif-js";
export default {
  props: ["item", "itemVmodel", "read"],
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      fileList: [],
      params: [],
      imageHas: false,
      bizId: {
        bizId: "ssss"
      }
    };
  },
  mounted() {
    const arr = this.itemVmodel[this.item.vModel];
    if (arr && arr[0] && arr[0].url !== "") {
      if (arr.length > 0) {
        this.imageHas = true;
      } else {
        if (!this.read) {
          this.imageHas = true;
        } else {
          this.imageHas = false;
        }
      }
      if (!this.read) {
        this.uploadVisible = true;
      } else {
        this.uploadVisible = false;
      }
      this.$set(
        this.fileList,
        this.item.vModel,
        this.itemVmodel[this.item.vModel]
      );
    } else {
      this.$set(this.fileList, this.item.vModel, []);
      if (!this.read) {
        this.uploadVisible = true;
        this.imageHas = true;
      } else {
        this.uploadVisible = false;
        this.imageHas = false;
      }
    }
  },
  watch: {
    itemVmodel(val, oldval) {
      const arr = val[this.item.vModel];
      if (arr && arr[0] && arr[0].url !== "") {
        if (arr.length > 0) {
          this.imageHas = true;
        } else {
          if (!this.read) {
            this.imageHas = true;
          } else {
            this.imageHas = false;
          }
        }
        if (!this.read) {
          this.uploadVisible = true;
        } else {
          this.uploadVisible = false;
        }
        this.$set(this.fileList, this.item.vModel, val[this.item.vModel]);
      } else {
        this.$set(this.fileList, this.item.vModel, []);
        if (!this.read) {
          this.uploadVisible = true;
          this.imageHas = true;
        } else {
          this.uploadVisible = false;
          this.imageHas = false;
        }
      }
    }
  },
  methods: {
    handleRemove(file, fileList) {
      const fileL = this.fileList[this.item.vModel];
      fileL.map((item, index) => {
        if (item.url === file.url) {
          fileL.splice(index, 1);
        }
      });
    },
    handlePictureCardPreview(file) {
      console.log(file);
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },

    handleBefore(file) {
      return new Promise((resolve, reject) => {
        this.imgPreview(file);
        resolve();
      });
    },

    handleSuccess(response, file, fileList) {
      if (response.returnCode === "200000") {
        const index = fileList.length - 1;
        const item = {
          url: "",
          dimension: "",
          longitude: ""
        };
        this.fileList[this.item.vModel][index] = item;
        this.fileList[this.item.vModel][index].url = response.picUrl;
        console.log(this.fileList);
        this.getLo(file.raw, index);

        return this.fileList[this.item.vModel];
      }
    },
    // 获取图片坐标(文件法)
    getLo(file, index) {
      const newFileList = this.fileList[this.item.vModel];
      let Longitude;
      let Latitude;
      var getdate = function(e) {
        EXIF.getData(e, function() {
          let SubjectLocation = EXIF.getAllTags(e);
          // console.log("imgdata", SubjectLocation);

          if (SubjectLocation.GPSLongitude) {
            const LongitudeArry = SubjectLocation.GPSLongitude;
            const longLongitude =
              LongitudeArry[0].numerator / LongitudeArry[0].denominator +
              LongitudeArry[1].numerator / LongitudeArry[1].denominator / 60 +
              LongitudeArry[2].numerator / LongitudeArry[2].denominator / 3600;
            Longitude = longLongitude.toFixed(6);
            // Longitude = longLongitude;
          }

          if (SubjectLocation.GPSLatitude) {
            const LatitudeArry = SubjectLocation.GPSLatitude;
            const longLatitude =
              LatitudeArry[0].numerator / LatitudeArry[0].denominator +
              LatitudeArry[1].numerator / LatitudeArry[1].denominator / 60 +
              LatitudeArry[2].numerator / LatitudeArry[2].denominator / 3600;
            Latitude = longLatitude.toFixed(6);
          }
          newFileList[index].dimension = Latitude || "";
          newFileList[index].longitude = Longitude || "";
        });
      };
      getdate(file);
    },
    imgPreview(file) {
      let self = this;
      // 看支持不支持FileReader
      if (!file || !window.FileReader) return;
      let reader = new FileReader();
      // 将图片2将转成 base64 格式
      reader.readAsDataURL(file);
      // 读取成功后的回调
      reader.onloadend = function() {
        //此处的this是reader
        let result = this.result;
        let img = new Image();
        // console.log(result,'2222222222222')
        img.src = result;
        //判断图片是否大于500K,是就直接上传，反之压缩图片
        if (this.result.length <= 500 * 1024) {
          file.cusContent = result;
          self.isloadImg = false;
        } else {
          img.onload = function() {
            let data = self.compress(img);
            file.cusContent = data;
            // console.log(file.size);
            self.isloadImg = false;
          };
        }
      };
    },
    // 压缩图片
    compress(img) {
      let canvas = document.createElement("canvas");
      let ctx = canvas.getContext("2d");
      //瓦片canvas
      let tCanvas = document.createElement("canvas");
      let tctx = tCanvas.getContext("2d");
      let width = img.width;
      let height = img.height;
      //如果图片大于四百万像素，计算压缩比并将大小压至400万以下
      let ratio;
      if ((ratio = (width * height) / 4000000) > 1) {
        ratio = Math.sqrt(ratio);
        width /= ratio;
        height /= ratio;
      } else {
        ratio = 1;
      }
      canvas.width = width;
      canvas.height = height;
      //铺底色
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      //如果图片像素大于100万则使用瓦片绘制
      let count;
      if ((count = (width * height) / 1000000) > 1) {
        // console.log("超过100W像素"); ~~ 是利于符号转换成数字类型
        count = ~~(Math.sqrt(count) + 1); //计算要分成多少块瓦片
        //      计算每块瓦片的宽和高
        let nw = ~~(width / count);
        let nh = ~~(height / count);
        tCanvas.width = nw;
        tCanvas.height = nh;
        for (let i = 0; i < count; i++) {
          for (let j = 0; j < count; j++) {
            tctx.drawImage(
              img,
              i * nw * ratio,
              j * nh * ratio,
              nw * ratio,
              nh * ratio,
              0,
              0,
              nw,
              nh
            );
            ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh);
          }
        }
      } else {
        ctx.drawImage(img, 0, 0, width, height);
      }
      //进行最小压缩
      let ndata = canvas.toDataURL("image/jpeg", 0.3);
      tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0;

      return ndata;
    },
    aa() {
      console.log(this.fileList);
    }
  }
};
</script>
