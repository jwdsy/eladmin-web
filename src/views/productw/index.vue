<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <eHeader :dict="dict" :permission="permission" />
      <div class="crud-opts">
        <span class="crud-opts-left">
          <!-- 新增按钮 -->
          <el-button
            v-if="crud.optShow.add"
            v-permission="permission.add"
            class="filter-item"
            size="mini"
            type="primary"
            icon="el-icon-plus"
            @click="crud.toAdd"
          >
            新增
          </el-button>
          <!-- 自定义导出按钮 -->
          <el-button
            v-if="crud.optShow.download"
            :loading="exportLoading"
            :disabled="!crud.data.length"
            class="filter-item"
            size="mini"
            type="warning"
            icon="el-icon-download"
            @click="exportSelectedItems"
          >
            {{ exportLoading ? '导出中...' : '导出' }}
          </el-button>
        </span>
        <el-button-group class="crud-opts-right">
          <el-button
            size="mini"
            plain
            type="info"
            icon="el-icon-search"
            @click="toggleSearch()"
          />
          <el-button
            size="mini"
            icon="el-icon-refresh"
            @click="crud.refresh()"
          />
        </el-button-group>
      </div>
    </div>
    <!--表格渲染-->
    <el-table
      ref="table"
      v-loading="crud.loading"
      :data="crud.data"
      style="width: 100%;"
      @select="crud.selectChange"
      @select-all="crud.selectAllChange"
      @selection-change="crud.selectionChangeHandler"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column prop="itemNo" :label="this.$t('product.table.itermNo')" width="120">
        <template slot-scope="scope">
          <span
            style="cursor: pointer; color: #409EFF;"
            :title="'点击复制: ' + scope.row.itemNo"
            @click="copyItemNo(scope.row.itemNo)"
          >
            {{ scope.row.itemNo }}
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="itemPic" :label="this.$t('product.table.picture')" align="center" width="100">
        <template slot-scope="scope">
          <img
            :src="scope.row.itemPic ? scope.row.itemPic : ''"
            style="height: 50px; cursor: pointer;"
            @click="previewImage(scope.row.itemPic)"
          >
        </template>
      </el-table-column>
      <el-table-column label="产品尺寸(cm)">
        <template slot-scope="scope">
          L:{{ scope.row.itemLength }} * W:{{ scope.row.itemWidth }} * H:{{ scope.row.itemHeight }}
        </template>
      </el-table-column>
      <el-table-column label="包装箱尺寸(cm)">
        <template slot-scope="scope">
          L:{{ scope.row.cartonLength }} * W:{{ scope.row.cartonWidth }} * H:{{ scope.row.cartonHeight }}
        </template>
      </el-table-column>
      <el-table-column prop="weightPieces" label="净重(g)" />
      <el-table-column prop="mininumOrderQuantity" label="起订量(PCS)" />
      <!-- <el-table-column prop="unitPrice" label="单价(人民币)" /> -->
      <!-- <el-table-column prop="factoryName" label="工厂名称" /> -->
      <!-- <el-table-column prop="itemCraft" label="商品工艺" /> -->
      <!-- <el-table-column prop="description" label="产品描述" /> -->
      <el-table-column prop="itemStatus" label="产品状态">
        <template slot-scope="scope">
          {{ scope.row.itemStatus===1?"上线":"下线" }}
        </template>
      </el-table-column>
      <!-- <el-table-column prop="delFlag" label="是否删除">
        <template slot-scope="scope">
          {{ scope.row.delFlag===0?"是":"否" }}
        </template>
      </el-table-column> -->
      <!-- <el-table-column prop="lastModifyTime" label="最近修改时间" /> -->
      <!--   编辑与删除   -->
      <el-table-column
        v-if="checkPer(['admin','product:edit','product:del'])"
        label="操作"
        width="130px"
        align="center"
        fixed="right"
      >
        <template slot-scope="scope">
          <udOperation
            :data="scope.row"
            :permission="permission"
          />
        </template>
      </el-table-column>
    </el-table>
    <!--分页组件-->
    <pagination />
    <!--表单渲染-->
    <eForm :job-status="dict.job_status" />

    <!-- 图片预览弹窗 -->
    <el-dialog
      title="图片预览"
      :visible.sync="imagePreviewVisible"
      width="60%"
      center
      :before-close="handleImagePreviewClose"
    >
      <div style="text-align: center;">
        <img
          v-if="previewImageUrl"
          :src="previewImageUrl"
          style="max-width: 100%; max-height: 500px; object-fit: contain;"
        >
      </div>
    </el-dialog>

    <!-- 导出进度弹窗 -->
    <el-dialog
      title="导出进度"
      :visible.sync="exportProgressVisible"
      width="400px"
      center
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
    >
      <p style="font-weight:bold;">共导出 {{ exportItemNos.length }} 条</p>
      <p style="word-break:break-all; color:#888; font-size:13px; margin-bottom:10px;">itemNo：{{ exportItemNos.join(', ') }}</p>
      <div style="text-align: center;">
        <el-progress
          :percentage="Number(exportProgress.toFixed(2))"
          :status="exportProgressStatus"
          :stroke-width="10"
        />
        <p style="margin-top: 15px; color: #666;">
          {{ exportProgressText }}
        </p>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import crudJob, { list } from '@/api/productw'
import eHeader from './module/header'
import eForm from './module/form'
import CRUD, { presenter } from '@crud/crud'
import pagination from '@crud/Pagination'
import udOperation from '@crud/UD.operation'
export default {
  name: 'ProductW',
  components: { eHeader, eForm, pagination, udOperation },
  cruds() {
    return CRUD({
      title: '产品',
      idField: 'itemId',
      url: 'api/product/v1/getItemDetailList',
      initData: list,
      params: { pageNo: 1, pageSize: 10 },
      crudMethod: { ...crudJob }
    })
  },
  mixins: [presenter()],
  // 数据字典
  dicts: ['item_status'],
  data() {
    return {
      permission: {
        add: ['admin', 'product:add'],
        edit: ['admin', 'product:edit'],
        del: ['admin', 'product:del']
      },
      imagePreviewVisible: false,
      previewImageUrl: '',
      exportLoading: false,
      exportProgressVisible: false,
      exportProgress: 0,
      exportProgressStatus: '',
      exportProgressText: '',
      exportItemNos: []
    }
  },
  // 按钮显示控制
  created() {
    this.crud.optShow = {
      add: true,
      edit: false, // 隐藏批量修改按钮
      del: false, // 隐藏批量删除按钮
      download: true
    }
    // 重写导出方法，完全替换默认的导出逻辑
    this.crud.doExport = () => {
      this.exportSelectedItems()
    }
  },
  methods: {
    // 改变状态
    changeEnabled(data, val) {
      this.$confirm('此操作将 "' + this.dict.label.job_status[val] + '" ' + data.name + '岗位, 是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // eslint-disable-next-line no-undef
        crudJob.edit(data).then(() => {
          // eslint-disable-next-line no-undef
          this.crud.notify(this.dict.label.job_status[val] + '成功', 'success')
        }).catch(err => {
          data.enabled = !data.enabled
          console.log(err.data.message)
        })
      }).catch(() => {
        data.enabled = !data.enabled
      })
    },
    // 预览图片
    previewImage(imageUrl) {
      if (imageUrl) {
        this.previewImageUrl = imageUrl
        this.imagePreviewVisible = true
      }
    },
    // 关闭图片预览
    handleImagePreviewClose() {
      this.imagePreviewVisible = false
      this.previewImageUrl = ''
    },
    // 复制商品编号
    copyItemNo(itemNo) {
      if (navigator.clipboard) {
        // 使用现代浏览器的 Clipboard API
        navigator.clipboard.writeText(itemNo).then(() => {
          this.$message({
            message: '商品编号已复制到剪贴板',
            type: 'success',
            duration: 1500
          })
        }).catch(() => {
          this.fallbackCopyTextToClipboard(itemNo)
        })
      } else {
        // 降级方案
        this.fallbackCopyTextToClipboard(itemNo)
      }
    },
    // 降级复制方案
    fallbackCopyTextToClipboard(text) {
      const textArea = document.createElement('textarea')
      textArea.value = text
      textArea.style.top = '0'
      textArea.style.left = '0'
      textArea.style.position = 'fixed'
      textArea.style.opacity = '0'
      document.body.appendChild(textArea)
      textArea.focus()
      textArea.select()

      try {
        const successful = document.execCommand('copy')
        if (successful) {
          this.$message({
            message: '商品编号已复制到剪贴板',
            type: 'success',
            duration: 1500
          })
        } else {
          this.$message({
            message: '复制失败，请手动复制',
            type: 'warning',
            duration: 1500
          })
        }
      } catch (err) {
        this.$message({
          message: '复制失败，请手动复制',
          type: 'warning',
          duration: 1500
        })
      }
      document.body.removeChild(textArea)
    },
    // 导出选中项目
    exportSelectedItems() {
      const selectedItems = this.crud.selections
      if (selectedItems.length === 0) {
        this.$message({
          message: '请先选择要导出的项目',
          type: 'warning',
          duration: 2000
        })
        return
      }

      // 设置导出状态
      this.exportLoading = true

      // 提取选中的itemId列表
      const itemIdList = selectedItems.map(item => item.itemId)
      // 提取选中的itemNo列表
      this.exportItemNos = selectedItems.map(item => item.itemNo)

      // 初始化进度
      this.exportProgress = 0
      this.exportProgressStatus = ''
      this.exportProgressText = `准备导出 ${selectedItems.length} 条记录...`
      this.exportProgressVisible = true

      // 模拟进度更新
      const progressInterval = setInterval(() => {
        if (this.exportProgress < 90) {
          this.exportProgress += Math.random() * 10
          this.exportProgressText = `正在导出数据... ${this.exportProgress.toFixed(1)}%`
        }
      }, 500)

      // 构建导出请求参数
      const exportData = {
        itemIdList: itemIdList
      }

      // 调用导出接口
      crudJob.exportItemDetailList(exportData).then(response => {
        // 清除进度定时器
        clearInterval(progressInterval)

        // 完成进度
        this.exportProgress = 100
        this.exportProgressStatus = 'success'
        this.exportProgressText = '导出完成，正在下载文件...'

        // 延迟一下让用户看到完成状态
        setTimeout(() => {
          // 创建下载链接
          const blob = new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
          const url = window.URL.createObjectURL(blob)
          const link = document.createElement('a')
          link.href = url
          link.download = `产品列表_${new Date().getTime()}.xlsx`
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
          window.URL.revokeObjectURL(url)

          // 关闭进度弹窗
          this.exportProgressVisible = false

          // 重置导出状态
          this.exportLoading = false
        }, 1000)

        this.$message({
          message: `成功导出 ${selectedItems.length} 条记录`,
          type: 'success',
          duration: 2000
        })
      }).catch(error => {
        console.error('导出失败:', error)

        // 清除进度定时器
        clearInterval(progressInterval)

        // 显示失败状态
        this.exportProgressStatus = 'exception'
        this.exportProgressText = '导出失败，请重试'

        // 延迟关闭进度弹窗
        setTimeout(() => {
          this.exportProgressVisible = false
          this.exportLoading = false
        }, 2000)

        this.$message({
          message: '导出失败，请重试',
          type: 'error',
          duration: 2000
        })
      })
    },
    // 切换搜索显示
    toggleSearch() {
      this.crud.props.searchToggle = !this.crud.props.searchToggle
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
::v-deep .el-input-number .el-input__inner {
  text-align: left;
}
</style>
