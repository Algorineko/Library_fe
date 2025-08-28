<template>
  <div class="app">
    <header class="nav">
      <h1>图书管理系统</h1>
      <nav>
        <RouterLink to="/">首页</RouterLink>
        <RouterLink to="/books">图书列表</RouterLink>
        <RouterLink to="/books/new">新书上架</RouterLink>
        <RouterLink to="/readers/new">读者登记</RouterLink>
        <RouterLink to="/readers/find">读者查询</RouterLink>
      </nav>
    </header>
    <main class="container">
      <RouterView />
    </main>
  </div>
</template>

<script setup>
</script>

<style scoped>
.nav {
  display: flex; align-items: center; justify-content: space-between;
  padding: 12px 16px; background:#1f2937; color:#fff;
}
.nav a {
  color:#fff; margin-left: 12px; text-decoration: none;
}
.container { padding: 16px; }
</style>
