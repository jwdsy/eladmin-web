<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <div v-if="crud.props.searchToggle">
        <!-- 搜索 -->
        <el-input v-model="query.labelName" clearable size="small" placeholder="标签名称" style="width: 200px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <el-select v-model="query.labelLevel" clearable size="small" placeholder="标签等级" class="filter-item" style="width: 120px" @change="crud.toQuery">
          <el-option v-for="item in labelLevel" :key="item.key" :label="item.display_name" :value="item.key" />
        </el-select>
        <el-select v-model="query.labelStatus" clearable size="small" placeholder="标签状态" class="filter-item" style="width: 120px" @change="crud.toQuery">
          <el-option v-for="item in labelStatus" :key="item.key" :label="item.display_name" :value="item.key" />
        </el-select>
        <rrOperation />
      </div>
      <crudOperation :permission="permission" :opt-show="optShow" />
    </div>
    <!--表单组件-->
    <el-dialog append-to-body :close-on-click-modal="false" :before-close="crud.cancelCU" :visible.sync="crud.status.cu > 0" :title="crud.status.title" width="800px">
      <el-form ref="form" :model="form" :rules="rules" size="small" label-width="100px">
        <el-form-item label="标签名称" prop="labelName">
          <el-input v-model="form.labelName" style="width: 670px" placeholder="展示给用户的名称" />
        </el-form-item>
        <el-form-item label="标签等级" prop="labelLevel">
          <el-select v-model="form.labelLevelName" clearable size="small" placeholder="标签等级" class="filter-item" style="width: 120px" @change="crud.toQuery">
            <el-option v-for="item in labelLevel4Edit" :key="item.key" :label="item.display_name" :value="item.key" />
          </el-select>
        </el-form-item>
        <el-form-item label="一级标签" prop="firstLabelName">
          <el-select v-model="form.firstLabelName" clearable size="small" placeholder="标签等级" class="filter-item" style="width: 120px">
            <el-option v-for="item in firstLabelList" :key="item.key" :label="item.display_name" :value="item.key" />
          </el-select>
          <!--          <el-input v-model="form.firstLabelName" placeholder="二级标签需要选择一级标签" />-->
        </el-form-item>
        <el-form-item label="标签描述" prop="description">
          <el-input v-model="form.description" style="width: 670px" placeholder="标签描述" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="text" @click="crud.cancelCU">取消</el-button>
        <el-button :loading="crud.status.cu === 2" type="primary" @click="crud.submitCU">确认</el-button>
      </div>
    </el-dialog>
    <!--表格渲染-->
    <el-table ref="table" v-loading="crud.loading" :data="crud.data" highlight-current-row style="width: 100%" @selection-change="crud.selectionChangeHandler" @current-change="handleCurrentChange">
      <el-table-column type="selection" width="55" />
      <el-table-column label="标签ID" prop="labelId" />
      <el-table-column label="标签名称" prop="labelName" />
      <el-table-column label="标签等级" prop="labelLevelName" />
      <el-table-column label="一级标签" prop="firstLabelName" />
      <el-table-column label="标签描述" prop="description" />
      <el-table-column label="状态" align="center" prop="labelStatus">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.labelStatus"
            active-color="#409EFF"
            inactive-color="#F56C6C"
            :active-value="1"
            :inactive-value="2"
            @change="changeEnabled(scope.row, scope.row.labelStatus )"
          />
        </template>
      </el-table-column>
      <el-table-column v-if="checkPer(['admin','tag:edit','tag:del','tag:status'])" label="操作" width="150px" align="center">
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
  </div>
</template>

<script>

import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import CRUD, { presenter, header, form, crud } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import crudOperation from '@crud/CRUD.operation'
import udOperation from '@crud/UD.operation'
import pagination from '@crud/Pagination.vue'
import crudLabel, { list } from '@/api/label'

const defaultForm = { labelId: null, labelName: null, labelLevelName: null, firstLabelName: null }
export default {
  name: 'Tag',
  components: { pagination, crudOperation, rrOperation, udOperation },
  cruds() {
    return CRUD({
      title: '标签',
      url: 'item/label/v1/getItemLabelList',
      idField: 'labelId',
      initData: list,
      params: { pageNo: 1, pageSize: 10 },
      crudMethod: { ...crudLabel }
    })
  },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  // 设置数据字典
  dicts: ['label_status'],
  data() {
    return {
      permission: {
        add: ['admin', 'tag:add'],
        edit: ['admin', 'tag:edit'],
        del: ['admin', 'tag:del'],
        status: ['admin', 'tag:status']
      },
      labelLevel: [
        { key: '', display_name: '全部' },
        { key: '1', display_name: '一级' },
        { key: '2', display_name: '二级' }
      ],
      labelLevel4Edit: [
        { key: '1', display_name: '一级' },
        { key: '2', display_name: '二级' }
      ],
      firstLabelList: [
      ],
      labelStatus: [
        { key: '', display_name: '全部' },
        { key: '1', display_name: '上线' },
        { key: '2', display_name: '下线' }
      ]
    }
  },
  // 按钮显示控制
  created() {
    this.crud.optShow = {
      add: true,
      edit: true,
      del: true,
      download: false
    }
    this.getFirstLabelList()
  },
  methods: {
    handleCurrentChange(row) {
      this.currentRow = JSON.parse(JSON.stringify(row))
    },
    // 修改标签状态
    changeEnabled(data, val) {
      this.$confirm('此操作将 "' + this.dict.label.label_status[val] + '" ' + data.labelName + '标签, 是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        crudLabel.changeStatus(data).then(res => {
          this.crud.notify(this.dict.label.label_status[val] + '成功', CRUD.NOTIFICATION_TYPE.SUCCESS)
        }).catch(err => {
          data.enabled = !data.enabled
          console.log(err.response.data.message)
        })
      }).catch(() => {
        data.enabled = !data.enabled
      })
    },
    // 修改标签状态
    getFirstLabelList() {
      crudLabel.getFirstLabelList.then(data => {
      }).catch(() => {

      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
 ::v-deep .vue-treeselect__control,::v-deep .vue-treeselect__placeholder,::v-deep .vue-treeselect__single-value {
    height: 30px;
    line-height: 30px;
  }
</style>
<style rel="stylesheet/scss" lang="scss" scoped>
 ::v-deep .el-input-number .el-input__inner {
    text-align: left;
  }
</style>
