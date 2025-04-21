<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <eHeader :dict="dict" :permission="permission" />
      <crudOperation :permission="permission" />
    </div>
    <!--表格渲染-->
    <el-table ref="table" v-loading="crud.loading" :data="crud.data" style="width: 100%;" @selection-change="crud.selectionChangeHandler">
      <el-table-column type="selection" width="55" />
      <el-table-column prop="id" label="提交ID" />
      <el-table-column prop="username" label="用户名" />
      <el-table-column prop="nickName" label="昵称" />
      <el-table-column prop="phone" label="手机号" />
      <el-table-column prop="email" label="邮箱" />
      <el-table-column prop="submitStatus" label="状态" align="center">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.submitStatus"
            active-color="#409EFF"
            inactive-color="#F56C6C"
            @change="changeEnabled(scope.row, scope.row.enabled)"
          />
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建日期" />
      <!--   编辑与删除   -->
      <el-table-column
        v-if="checkPer(['admin','intention:edit','intention:del', 'intention:download'])"
        label="操作"
        width="200px"
        align="center"
        fixed="right"
      >
        <template slot-scope="scope">
          <el-button v-permission="['admin','intention:download']" size="mini" type="warning" icon="el-icon-download" @click="downloadMethod(scope.row)" />
        </template>
      </el-table-column>
    </el-table>
    <!--分页组件-->
    <pagination />
    <!--表单渲染-->
    <eForm :job-status="dict.job_status" />
  </div>
</template>

<script>
import crudJob from '@/api/intention'
import eHeader from './module/header'
import eForm from './module/form'
import CRUD, { presenter, crud } from '@crud/crud'
import crudOperation from '@crud/CRUD.operation'
import pagination from '@crud/Pagination'
import { download } from '@/api/data'
import { downloadFile } from '@/utils'
export default {
  name: 'Job',
  components: { eHeader, eForm, crudOperation, pagination },
  cruds() {
    return CRUD({
      title: '岗位',
      url: '/api/biz/customer/submit/record',
      sort: ['createTime,asc', 'id,desc'],
      crudMethod: { ...crudJob }
    })
  },
  mixins: [presenter(), crud()],
  // 数据字典
  dicts: ['job_status'],
  data() {
    return {
      permission: {
        add: ['admin', 'intention:add'],
        edit: ['admin', 'intention:edit'],
        download: ['admin', 'intention:download'],
        del: ['admin', 'intention:del']
      }
    }
  },
  methods: {
    delMethod(id) {
      console.log(id)
    },
    downloadMethod(row) {
      download('/api/biz/customer/submit/record/download', { id: row.id }).then(result => {
        downloadFile(result, row.nickName + '_' + row.createTime, 'xlsx')
      })
    },
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
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
::v-deep .el-input-number .el-input__inner {
  text-align: left;
}
</style>
