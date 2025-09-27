<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <eHeader :dict="dict" :permission="permission" />
      <div style="margin-bottom: 10px; display: flex; align-items: center;">
        <el-input
          v-model="searchItemNos"
          clearable
          size="small"
          placeholder="请输入产品编号，英文逗号分隔"
          style="width: 300px; margin-right: 8px;"
          class="filter-item"
          @keyup.enter.native="searchByItemNos"
        />
        <el-select
          v-model="searchItemStatus"
          clearable
          size="small"
          placeholder="产品状态"
          class="filter-item"
          style="width: 120px; margin-right: 8px;"
          @change="searchByItemNos"
        >
          <el-option
            v-for="item in itemStatusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-select
          v-model="searchYear"
          clearable
          size="small"
          placeholder="年份"
          class="filter-item"
          style="width: 100px; margin-right: 8px;"
          @change="searchByItemNos"
        >
          <el-option
            v-for="year in yearOptions"
            :key="year"
            :label="year"
            :value="year"
          />
        </el-select>
        <el-select
          v-model="searchSeason"
          clearable
          size="small"
          placeholder="季节"
          class="filter-item"
          style="width: 100px; margin-right: 8px;"
          @change="searchByItemNos"
        >
          <el-option
            v-for="item in seasonOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-button
          class="filter-item"
          size="small"
          type="success"
          icon="el-icon-search"
          @click="searchByItemNos"
        >
          搜索
        </el-button>
        <el-button
          class="filter-item"
          size="small"
          type="primary"
          icon="el-icon-refresh"
          style="margin-left: 8px;"
          @click="crud.refresh()"
        >
          刷新
        </el-button>
      </div>
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
      <el-table-column prop="itemNo" label="产品编号" width="120">
        <template slot-scope="scope">
          <span
            style="cursor: pointer; color: #409EFF; word-break: break-all; white-space: normal; line-height: 1.4;"
            :title="'点击复制: ' + scope.row.itemNo"
            @click="copyItemNo(scope.row.itemNo)"
          >
            {{ scope.row.itemNo }}
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="itemPic" label="产品图片" align="center" width="100">
        <template slot-scope="scope">
          <img
            :src="scope.row.itemPic ? scope.row.itemPic : ''"
            style="height: 50px; cursor: pointer;"
            @click="previewImage(scope.row.itemPic)"
          >
        </template>
      </el-table-column>
      <el-table-column prop="description" label="标签描述" width="200">
        <template slot-scope="scope">
          <div style="word-break: break-all; white-space: normal; line-height: 1.4;" :title="scope.row.description">
            {{ scope.row.description }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="firstLabelName" label="一级标签" width="120">
        <template slot-scope="scope">
          <div style="word-break: break-all; white-space: normal; line-height: 1.4;" :title="scope.row.firstLabelName">
            {{ scope.row.firstLabelName || '-' }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="secondLabelName" label="二级标签" width="120">
        <template slot-scope="scope">
          <div style="word-break: break-all; white-space: normal; line-height: 1.4;" :title="scope.row.secondLabelName">
            {{ scope.row.secondLabelName || '-' }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="产品尺寸(cm)" width="120">
        <template slot-scope="scope">
          <div style="white-space: pre-line; line-height: 1.4;">
            L:{{ scope.row.itemLength }}
            W:{{ scope.row.itemWidth }}
            H:{{ scope.row.itemHeight }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="包装箱尺寸(cm)" width="120">
        <template slot-scope="scope">
          <div style="white-space: pre-line; line-height: 1.4;">
            L:{{ scope.row.cartonLength }}
            W:{{ scope.row.cartonWidth }}
            H:{{ scope.row.cartonHeight }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="weightPieces" label="净重(g)" width="80">
        <template slot-scope="scope">
          <div style="word-break: break-all; white-space: normal; line-height: 1.4;">
            {{ scope.row.weightPieces || '-' }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="mininumOrderQuantity" label="起订量(PCS)" width="100">
        <template slot-scope="scope">
          <div style="word-break: break-all; white-space: normal; line-height: 1.4;">
            {{ scope.row.mininumOrderQuantity || '-' }}
          </div>
        </template>
      </el-table-column>
      <!-- <el-table-column prop="unitPrice" label="单价(人民币)" /> -->
      <!-- <el-table-column prop="factoryName" label="工厂名称" /> -->
      <!-- <el-table-column prop="itemCraft" label="商品工艺" /> -->
      <!-- <el-table-column prop="description" label="产品描述" /> -->
      <el-table-column prop="itemRemark" label="产品备注" width="200">
        <template slot-scope="scope">
          <div style="word-break: break-all; white-space: normal; line-height: 1.4;" :title="scope.row.itemRemark">
            {{ scope.row.itemRemark || '-' }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="产品状态" align="center" prop="itemStatus" width="120">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.itemStatus"
            active-color="#409EFF"
            inactive-color="#F56C6C"
            :active-value="1"
            :inactive-value="2"
            @change="changeItemStatus(scope.row, scope.row.itemStatus)"
          />
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
          <div class="operation-buttons">
            <udOperation
              :data="scope.row"
              :permission="permission"
            />
            <el-button
              v-if="checkPer(['admin','product:add'])"
              size="mini"
              type="primary"
              icon="el-icon-copy-document"
              title="复制"
              @click="copyProduct(scope.row)"
            />
          </div>
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
      <p style="color:#666; font-size:13px; margin-bottom:10px;">导出时间：{{ formatElapsedTime(exportElapsedTime) }}</p>
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
import crudJob, { list, updateItemStatus } from '@/api/productw'
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
      exportItemNos: [],
      exportStartTime: null,
      exportElapsedTime: 0,
      searchItemNos: '',
      searchItemStatus: null,
      searchYear: null,
      searchSeason: null,
      itemStatusOptions: [
        { label: '上线', value: 1 },
        { label: '下线', value: 2 }
      ],
      seasonOptions: [
        { label: '春', value: 1 },
        { label: '秋', value: 3 }
      ]
    }
  },
  computed: {
    // 生成年份选项，从当前年倒序到2024年
    yearOptions() {
      const currentYear = new Date().getFullYear()
      const years = []
      for (let year = currentYear; year >= 2024; year--) {
        years.push(year)
      }
      return years
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
    // 复制产品编号
    copyItemNo(itemNo) {
      if (navigator.clipboard) {
        // 使用现代浏览器的 Clipboard API
        navigator.clipboard.writeText(itemNo).then(() => {
          this.$message({
            message: '产品编号已复制到剪贴板',
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
            message: '产品编号已复制到剪贴板',
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
      const exportData = {}
      let exportCount = 0
      // 没有选中条目，且输入框不为空
      if (selectedItems.length === 0 && this.searchItemNos.trim()) {
        // 按英文逗号分割，去除空格和空项
        const itemNoList = this.searchItemNos.split(',').map(s => s.trim()).filter(Boolean)
        exportData.itemNoList = itemNoList
        exportCount = itemNoList.length
        // 产品状态
        if (this.searchItemStatus !== '' && this.searchItemStatus !== null && this.searchItemStatus !== undefined) {
          exportData.itemStatus = this.searchItemStatus
        }
        // 年份筛选
        if (this.searchYear !== '' && this.searchYear !== null && this.searchYear !== undefined) {
          exportData.year = this.searchYear
        }
        // 季节筛选
        if (this.searchSeason !== '' && this.searchSeason !== null && this.searchSeason !== undefined) {
          exportData.season = this.searchSeason
        }
        // 用于进度弹窗展示
        this.exportItemNos = itemNoList
      } else if (selectedItems.length > 0) {
        // 有选中条目，按原逻辑导出
        const itemIdList = selectedItems.map(item => item.itemId)
        exportData.itemIdList = itemIdList
        this.exportItemNos = selectedItems.map(item => item.itemNo)
        exportCount = selectedItems.length
      } else {
        this.$message({
          message: '请先选择要导出的项目，或在输入框中输入产品编号',
          type: 'warning',
          duration: 2000
        })
        return
      }

      // 设置导出状态
      this.exportLoading = true

      // 初始化进度和时间
      this.exportProgress = 0
      this.exportProgressStatus = ''
      this.exportProgressText = `准备导出 ${exportCount} 条记录...`
      this.exportProgressVisible = true
      this.exportStartTime = Date.now()
      this.exportElapsedTime = 0

      // 模拟进度更新和时间更新
      const progressInterval = setInterval(() => {
        if (this.exportProgress < 90) {
          this.exportProgress += Math.random() * 10
          this.exportProgressText = `正在导出数据... ${this.exportProgress.toFixed(1)}%`
        }
        // 更新经过的时间
        this.exportElapsedTime = Math.floor((Date.now() - this.exportStartTime) / 1000)
      }, 500)

      // 调用导出接口
      crudJob.exportItemDetailList(exportData).then(response => {
        // 清除进度定时器
        clearInterval(progressInterval)

        // 完成进度
        this.exportProgress = 100
        this.exportProgressStatus = 'success'
        this.exportProgressText = '导出完成，正在下载文件...'
        // 最终更新时间
        this.exportElapsedTime = Math.floor((Date.now() - this.exportStartTime) / 1000)

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
          message: `成功导出 ${exportCount} 条记录`,
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
        // 最终更新时间
        this.exportElapsedTime = Math.floor((Date.now() - this.exportStartTime) / 1000)

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
    },
    // 格式化经过的时间为 分钟:秒钟 格式
    formatElapsedTime(seconds) {
      const minutes = Math.floor(seconds / 60)
      const remainingSeconds = seconds % 60
      return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
    },
    // 按itemNo搜索
    searchByItemNos() {
      if (!this.searchItemNos) {
        this.crud.query.itemNoList = undefined
      } else {
        // 按英文逗号分割，去除空格和空项
        const arr = this.searchItemNos.split(',').map(s => s.trim()).filter(Boolean)
        this.crud.query.itemNoList = arr.length > 0 ? arr : undefined
      }
      // 处理产品状态
      if (this.searchItemStatus === '' || this.searchItemStatus === null || this.searchItemStatus === undefined) {
        delete this.crud.query.itemStatus
      } else {
        this.crud.query.itemStatus = this.searchItemStatus
      }
      // 处理年份筛选
      if (this.searchYear === '' || this.searchYear === null || this.searchYear === undefined) {
        delete this.crud.query.year
      } else {
        this.crud.query.year = this.searchYear
      }
      // 处理季节筛选
      if (this.searchSeason === '' || this.searchSeason === null || this.searchSeason === undefined) {
        delete this.crud.query.season
      } else {
        this.crud.query.season = this.searchSeason
      }
      this.crud.toQuery()
    },
    // 修改产品状态
    changeItemStatus(row, status) {
      const statusText = status === 1 ? '上线' : '下线'
      this.$confirm(`确定要将产品 "${row.itemNo}" 设置为${statusText}状态吗？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const data = {
          itemId: row.itemId,
          itemStatus: status
        }
        updateItemStatus(data).then(() => {
          this.$message({
            message: `产品状态已更新为${statusText}`,
            type: 'success',
            duration: 2000
          })
          // 刷新列表
          this.crud.refresh()
        }).catch(error => {
          console.error('更新状态失败:', error)
          // 恢复开关状态
          row.itemStatus = status === 1 ? 2 : 1
          this.$message({
            message: '更新状态失败，请重试',
            type: 'error',
            duration: 2000
          })
        })
      }).catch(() => {
        // 用户取消操作，恢复开关状态
        row.itemStatus = status === 1 ? 2 : 1
      })
    },
    // 复制产品
    copyProduct(row) {
      // 首先调用 toAdd 方法，这会正确设置状态和触发钩子函数
      this.crud.toAdd()

      // 然后使用 $nextTick 确保表单已经初始化后再设置数据
      this.$nextTick(() => {
        // 复制当前行数据，但排除所有系统字段，确保创建全新产品
        const copyData = { ...row }

        // 移除所有系统字段和ID字段，确保创建全新产品
        delete copyData.itemId
        delete copyData.createTime
        delete copyData.lastModifyTime
        delete copyData.createUserId
        delete copyData.modifyUserId
        delete copyData.delFlag
        delete copyData.firstLabelName // 删除显示字段，保留ID字段
        delete copyData.secondLabelName // 删除显示字段，保留ID字段

        // 保留产品编号，让用户可以看到并修改
        // copyData.itemNo = '' // 不清空，让用户看到原产品编号

        // 确保没有任何ID字段会被传递到后端
        Object.keys(copyData).forEach(key => {
          if (copyData[key] === null || copyData[key] === undefined) {
            delete copyData[key]
          }
        })

        // 使用 crud.resetForm 正确设置表单数据
        this.crud.resetForm(copyData)

        // 提示用户
        this.$message({
          message: '已复制产品信息，请确认产品编号后保存',
          type: 'info',
          duration: 3000
        })
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

<style scoped>
/* 保证搜索按钮颜色与tag/index.vue一致 */
.el-button.filter-item.el-button--primary {
  background-color: #409EFF;
  border-color: #409EFF;
  color: #fff;
}

/* 操作列按钮样式优化 */

/* 确保udOperation组件内的按钮在同一行 */
::v-deep .udOperation > div {
  display: inline-flex !important;
  gap: 2px !important;
}

/* 操作列按钮容器样式 */
.operation-buttons {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2px;
  white-space: nowrap;
}
</style>
