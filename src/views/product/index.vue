<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <eHeader :dict="dict" :permission="permission" />
      <crudOperation :permission="permission" />
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
      <el-table-column prop="itemNo" :label="this.$t('product.table.itermNo')" />
      <el-table-column prop="itemPic" :label="this.$t('product.table.picture')" align="center">
        <template slot-scope="scope">
          <img :src="scope.row.itemPic ? scope.row.itemPic : ''" style="height: 50px">
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
      <el-table-column prop="unitPrice" label="单价(人民币)" />
      <el-table-column prop="factoryName" label="工厂名称" />
      <el-table-column prop="itemCraft" label="商品工艺" />
      <el-table-column prop="description" label="产品描述" />
      <el-table-column prop="itemStatus" label="产品状态">
        <template slot-scope="scope">
          {{ scope.row.itemStatus===1?"上线":"下线" }}
        </template>
      </el-table-column>
      <el-table-column prop="delFlag" label="是否删除">
        <template slot-scope="scope">
          {{ scope.row.delFlag===0?"是":"否" }}
        </template>
      </el-table-column>
      <el-table-column prop="lastModifyTime" label="最近修改时间" />
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
  </div>
</template>

<script>
import crudJob from '@/api/product'
import eHeader from './module/header'
import eForm from './module/form'
import CRUD, { presenter } from '@crud/crud'
import crudOperation from '@crud/CRUD.operation'
import pagination from '@crud/Pagination'
import udOperation from '@crud/UD.operation'
export default {
  name: 'Product',
  components: { eHeader, eForm, crudOperation, pagination, udOperation },
  cruds() {
    return CRUD({
      title: '产品',
      idField: 'itemId',
      url: 'api/biz/item',
      sort: ['itemNo,desc'],
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
      }
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
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
::v-deep .el-input-number .el-input__inner {
  text-align: left;
}
</style>
