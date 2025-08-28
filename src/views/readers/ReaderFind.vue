<template>
  <div class="card">
    <h2>读者查询</h2>
    <p><small class="muted">根据读者ID跳转（后端暂未提供“按读者号/姓名搜索”接口）。</small></p>
    <div class="row">
      <input v-model="id" type="number" placeholder="输入读者ID" style="width:200px;">
      <button class="btn primary" @click="go">查看</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const id = ref('')
const router = useRouter()
function go() {
  if (!id.value) return alert('请输入读者ID')
  router.push(`/readers/${id.value}`)
}
</script>
