<template>
  <div class="card">
    <h2>欢迎使用 图书管理系统</h2>
    <p>现有功能：</p>
    <ul>
      <li>新书上架 / 旧书淘汰（软删除） / 图书列表 与详情</li>
      <li>读者登记、读者信息查询、借阅列表、罚款汇总</li>
      <li>借书流程（指定读者/图书/天数）</li>
      <li>还书流程（结算超期罚款并归还库存）</li>
    </ul>
    <p class="mt"><RouterLink class="btn primary" to="/books">开始管理图书</RouterLink></p>
  </div>
</template>

<script setup>
</script>

<style scoped>
.mt { margin-top: 12px; }
</style>
