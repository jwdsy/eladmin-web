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
      <el-form-item label="产品编号" prop="itemNo">
        <el-input v-model="form.itemNo" :readonly="crud.status.edit > 0 && form.itemId" />
      </el-form-item>
      <el-form-item label="产品图片" prop="itemPic">
        <el-input
          v-model="form.itemPic"
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4 }"
          placeholder="请输入图片压缩后的URL"
          style="width: 100%; max-width: 600px;"
          clearable
        />
        <div v-if="form.itemPic" style="margin-top: 10px;">
          <img :src="form.itemPic" alt="图片预览" style="max-width: 200px; max-height: 100px; border: 1px solid #eee;">
        </div>
      </el-form-item>
      <el-form-item label="标签描述">
        <el-input v-model="form.description" :maxlength="180" placeholder="请输入标签描述" show-word-limit />
      </el-form-item>
      <el-form-item label="一级标签">
        <el-select v-model="form.firstLabelId" placeholder="请选择一级标签" style="width: 220px;" @change="onFirstLabelChange">
          <el-option
            v-for="item in firstLabelList"
            :key="item.labelId"
            :label="item.labelName"
            :value="item.labelId"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="二级标签">
        <el-select v-model="form.secondLabelId" placeholder="请选择二级标签" style="width: 220px;" :disabled="!form.firstLabelId">
          <el-option
            v-for="item in secondLabelList"
            :key="item.labelId"
            :label="item.labelName"
            :value="item.labelId"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="年">
        <el-input v-model.number="form.year" type="number" style="width: 220px;" placeholder="请输入年份" />
      </el-form-item>
      <el-form-item label="季节">
        <el-select v-model="form.season" placeholder="请选择季节" style="width: 220px;">
          <el-option label="春" :value="1" />
          <el-option label="夏" :value="2" />
          <el-option label="秋" :value="3" />
          <el-option label="冬" :value="4" />
        </el-select>
      </el-form-item>
      <el-form-item label="出货港">
        <el-input v-model="form.deliveryPort" :maxlength="180" placeholder="请输入出货港" show-word-limit />
      </el-form-item>
      <el-form-item label="产品尺寸(cm)">
        <el-row>
          <el-col :span="2" style="text-align:right;line-height:32px;padding-right:12px;min-width:40px;">
            <div>长:</div>
            <div style="margin-top:8px;">宽:</div>
            <div style="margin-top:8px;">高:</div>
          </el-col>
          <el-col :span="6">
            <el-input v-model.number="form.itemLength" type="number" style="width: 220px; margin-bottom:8px;" placeholder="请输入数字，保留两位小数" />
            <el-input v-model.number="form.itemWidth" type="number" style="width: 220px; margin-bottom:8px;" placeholder="请输入数字，保留两位小数" />
            <el-input v-model.number="form.itemHeight" type="number" style="width: 220px;" placeholder="请输入数字，保留两位小数" />
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="包装箱尺寸(cm)">
        <el-row>
          <el-col :span="2" style="text-align:right;line-height:32px;padding-right:12px;min-width:40px;">
            <div>长:</div>
            <div style="margin-top:8px;">宽:</div>
            <div style="margin-top:8px;">高:</div>
          </el-col>
          <el-col :span="6">
            <el-input v-model.number="form.cartonLength" type="number" style="width: 220px; margin-bottom:8px;" placeholder="请输入数字，保留两位小数" />
            <el-input v-model.number="form.cartonWidth" type="number" style="width: 220px; margin-bottom:8px;" placeholder="请输入数字，保留两位小数" />
            <el-input v-model.number="form.cartonHeight" type="number" style="width: 220px;" placeholder="请输入数字，保留两位小数" />
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="内盒(个)">
        <el-input v-model.number="form.innerBox" type="number" style="width: 220px;" />
      </el-form-item>
      <el-form-item label="外箱(个)">
        <el-input v-model.number="form.outerCtn" type="number" style="width: 220px;" />
      </el-form-item>
      <el-form-item label="净重(g)">
        <el-input v-model.number="form.weightPieces" type="number" style="width: 220px;" />
      </el-form-item>
      <el-form-item label="起订量(PCS)">
        <el-input v-model.number="form.mininumOrderQuantity" type="number" style="width: 220px;" />
      </el-form-item>
      <el-form-item label="单价(人民币)">
        <el-input v-model.number="form.unitPrice" type="number" style="width: 220px;" />
      </el-form-item>
      <el-form-item label="工厂名称">
        <el-input v-model="form.factoryName" :maxlength="50" placeholder="请输入工厂名称" show-word-limit />
      </el-form-item>
      <el-form-item label="产品工艺">
        <el-input v-model="form.itemCraft" :maxlength="50" placeholder="请输入产品工艺" show-word-limit />
      </el-form-item>
      <el-form-item label="产品备注">
        <el-input v-model="form.itemRemark" :maxlength="180" placeholder="请输入产品备注" show-word-limit />
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
import { getLabelList } from '@/api/productw'

const defaultForm = {
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
  secondLabelId: null,
  innerBox: null,
  itemCraft: '',
  mininumOrderQuantity: null,
  outerCtn: null,
  unitPrice: null,
  weightPieces: null,
  year: null,
  season: null,
  itemRemark: ''
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
      },
      firstLabelList: [],
      secondLabelList: []
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
  watch: {
    'form.itemPic'(val) {
      this.$nextTick(() => {
        const input = this.$refs.itemPicInput && this.$refs.itemPicInput.$el.querySelector('input')
        if (input) {
          input.scrollLeft = input.scrollWidth
        }
      })
    },
    // 监听表单变化，在编辑时加载二级标签
    'form.firstLabelId'(newVal, oldVal) {
      if (newVal && newVal !== oldVal) {
        this.getSecondLabelList(newVal)
      }
    }
  },
  // 组件挂载时加载一级标签
  mounted() {
    this.getFirstLabelList()
  },
  methods: {
    // 上传文件
    upload() {
      debugger
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
    },
    // 获取一级标签列表
    getFirstLabelList() {
      getLabelList({ labelLevel: 1 }).then(res => {
        this.firstLabelList = res.labelList || []
      }).catch(err => {
        console.error('获取一级标签失败:', err)
        this.firstLabelList = []
      })
    },
    // 获取二级标签列表
    getSecondLabelList(firstLabelId) {
      if (!firstLabelId) {
        this.secondLabelList = []
        return
      }
      getLabelList({ labelLevel: 2, firstLabelId: firstLabelId }).then(res => {
        this.secondLabelList = res.labelList || []
      }).catch(err => {
        console.error('获取二级标签失败:', err)
        this.secondLabelList = []
      })
    },
    // 一级标签变化处理
    onFirstLabelChange(value) {
      // 清空二级标签选择
      this.form.secondLabelId = null
      // 获取对应的二级标签
      this.getSecondLabelList(value)
    }
  },
  // 在编辑时确保itemId字段存在
  beforeCrudToEdit(form) {
    // 编辑时确保itemId字段存在
    if (form.itemId) {
      this.$set(this.form, 'itemId', form.itemId)
    }
  },
  // 在新增时确保没有itemId字段（包括复制场景）
  beforeCrudToAdd(form) {
    // 新增时确保没有itemId字段，创建全新产品
    if (this.form.itemId) {
      this.$delete(this.form, 'itemId')
    }
  },
  // 在提交前确保新增模式下没有itemId字段
  beforeCrudSubmitCU() {
    // 如果是新增模式，确保删除itemId字段
    if (this.crud.status.add > 0 && this.form.itemId) {
      this.$delete(this.form, 'itemId')
      console.log('删除itemId字段，确保创建新产品')
    }
    return true
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
::v-deep .el-input-number .el-input__inner {
  text-align: left;
}
::v-deep .el-input__inner {
  overflow-x: auto !important;
  white-space: nowrap !important;
}
</style>
