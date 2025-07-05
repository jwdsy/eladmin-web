<template>
  <div
    v-if="crud.props.searchToggle"
  >
    <el-input v-model="query.itemNo" clearable size="small" placeholder="请输入商品编号,多编号请用“,”连接" style="width: 300px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
    <el-select v-model="query.itemStatus" clearable size="small" placeholder="状态" class="filter-item" style="width: 90px" @change="crud.toQuery">
      <el-option v-for="item in dict.dict.item_status" :key="item.value" :label="item.label" :value="item.value" />
    </el-select>
    <rrOperation />
  </div>
</template>

<script>
import { header } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
export default {
  components: { rrOperation },
  mixins: [header()],
  props: {
    dict: {
      type: Object,
      required: true
    },
    permission: {
      type: Object,
      required: true
    }
  }
}
</script>
