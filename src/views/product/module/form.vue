<template>
  <el-dialog
    append-to-body
    :close-on-click-modal="false"
    :before-close="crud.cancelCU"
    :visible="crud.status.cu > 0"
    :title="crud.status.title"
    width="500px"
  >
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
      <el-form-item label="商品编号" prop="itemNo">
        <el-input v-model="form.itemNo" style="width: 370px;" />
      </el-form-item>
      <el-form-item label="商品图片" prop="itemPic">
        <div class="el-upload">
          <img :src="form.itemPic" title="点击上传商品图片" style="height: 150px;" @click="toggleShow">
          <myUpload v-model="show" :headers="headers" :url="imagesUploadApi" />
        </div>
      </el-form-item>
      <el-form-item v-if="form.pid !== 0" label="状态" prop="enabled">
        <el-radio v-for="item in jobStatus" :key="item.id" v-model="form.enabled" :label="item.value === 'true'">
          {{ item.label }}
        </el-radio>
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
import myUpload from 'vue-image-crop-upload'
import { getToken } from '@/utils/auth'
import { mapGetters } from 'vuex'

const defaultForm = {
  id: null,
  itemNo: '',
  itemPic: '',
  enabled: true
}
export default {
  components: { myUpload },
  mixins: [form(defaultForm)],
  props: {
    jobStatus: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      show: false,
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
      'imagesUploadApi'
    ])
  },
  methods: {
    toggleShow() {
      this.show = !this.show
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
 ::v-deep .el-input-number .el-input__inner {
    text-align: left;
  }
</style>
