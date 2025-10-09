<template>
  <el-dialog
    append-to-body
    :close-on-click-modal="false"
    :before-close="crud.cancelCU"
    :visible="crud.status.cu > 0"
    :title="crud.status.title"
    width="50%"
  >
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="15%">
      <el-form-item label="商品编号" prop="itemNo">
        <el-input v-model="form.itemNo" />
      </el-form-item>
      <el-form-item label="商品图片" prop="itemPic">
        <el-upload
          :action="productImagesUploadApi + '?name=' + form.itemNo"
          list-type="picture-card"
          :headers="headers"
          :limit="1"
          :file-list="fileList"
          :before-upload="beforeUpload"
          :on-exceed="onExceed"
        >
          <i class="el-icon-plus" />
        </el-upload>
      </el-form-item>
      <el-form-item label="产品尺寸(cm)">
        <el-col :span="1" style="text-align: right">长:</el-col>
        <el-col :span="4">
          <el-input-number v-model="form.itemLength" :precision="2" :step="0.1" :max="10000000" />
        </el-col>
        <el-col :span="1" style="text-align: right">宽:</el-col>
        <el-col :span="4">
          <el-input-number v-model="form.itemWidth" :precision="2" :step="0.1" :max="10000000" />
        </el-col>
        <el-col :span="1" style="text-align: right">高:</el-col>
        <el-col :span="4">
          <el-input-number v-model="form.itemHeight" :precision="2" :step="0.1" :max="10000000" />
        </el-col>
      </el-form-item>
      <el-form-item label="包装箱尺寸(cm)">
        <el-col :span="1" style="text-align: right">长:</el-col>
        <el-col :span="4">
          <el-input-number v-model="form.cartonLength" :precision="2" :step="0.1" :max="10000000" />
        </el-col>
        <el-col :span="1" style="text-align: right">宽:</el-col>
        <el-col :span="4">
          <el-input-number v-model="form.cartonWidth" :precision="2" :step="0.1" :max="10000000" />
        </el-col>
        <el-col :span="1" style="text-align: right">高:</el-col>
        <el-col :span="4">
          <el-input-number v-model="form.cartonHeight" :precision="2" :step="0.1" :max="10000000" />
        </el-col>
      </el-form-item>
      <el-form-item label="净重(g)">
        <el-input-number v-model="form.weightPieces" :precision="0" :step="1" :max="10000000" />
      </el-form-item>
      <el-form-item label="起订量(PCS)">
        <el-input-number v-model="form.mininumOrderQuantity" :precision="0" :step="1" :min="1" :max="10000000" />
      </el-form-item>
      <el-form-item label="单价(人民币)">
        <el-input-number v-model="form.unitPrice" :precision="0" :step="1" :min="1" :max="10000000" />
      </el-form-item>
      <el-form-item label="工厂名称">
        <el-input v-model="form.factoryName" :maxlength="1000" />
      </el-form-item>
      <el-form-item label="商品工艺">
        <el-input v-model="form.itemCraft" :maxlength="1000" />
      </el-form-item>
      <el-form-item label="产品描述">
        <el-input v-model="form.description" :maxlength="2000" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="crud.cancelCU">
        取消
      </el-button>
      <el-button :loading="crud.status.cu === 2" type="primary" @click="crud.submitCU">
        确认
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import { form } from '@crud/crud'
import { getToken } from '@/utils/auth'
import { mapGetters } from 'vuex'

const defaultForm = {
  id: null,
  itemNo: '',
  itemPic: '',
  itemStatus: null,
  itemLength: null,
  itemWidth: null,
  itemHeight: null,
  cartonHeight: null,
  cartonLength: null,
  cartonWidth: null,
  delFlag: null,
  deliveryPort: '',
  description: '',
  factoryName: '',
  firstLabelId: null,
  innerBox: null,
  itemCraft: '',
  mininumOrderQuantity: null,
  outerCtn: null,
  unitPrice: null,
  weightPieces: null
}
export default {
  components: { },
  mixins: [form(defaultForm)],
  props: {
  },
  data() {
    return {
      headers: {
        'Authorization': getToken()
      },
      rules: {
        itemNo: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ],
        jobSort: [
          { required: true, message: '请输入序号', trigger: 'blur', type: 'number' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters([
      'productImagesUploadApi'
    ]),
    fileList() {
      return [{ name: this.form.itemPic, url: this.form.itemPic }]
    }
  },
  methods: {
    // 上传文件
    upload() {
      this.$refs.upload.submit()
    },
    beforeUpload(file) {
      let isLt2M = true
      isLt2M = file.size / 1024 / 1024 < 10
      if (!isLt2M) {
        this.loading = false
        this.$message.error('上传文件大小不能超过 10MB!')
      }
      this.form.name = file.name
      return isLt2M
    },
    onExceed(files, fileList) {
      this.$notify({
        title: '商品图片最多一张',
        type: 'error',
        duration: 2500
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
 ::v-deep .el-input-number .el-input__inner {
    text-align: left;
  }
</style>
