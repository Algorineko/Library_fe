<template>
  <div class="app" :class="{ 'menu-open': menuOpen }">
    <header :class="['nav', { scrolled }]">
      <div class="brand">
        <span class="logo" aria-hidden="true">📚</span>
        <h1>图书管理系统</h1>
      </div>

      <button
        class="mobile-toggle"
        aria-label="打开/关闭导航菜单"
        :aria-expanded="menuOpen ? 'true' : 'false'"
        @click="menuOpen = !menuOpen"
      >
        <span class="bar" />
        <span class="bar" />
        <span class="bar" />
      </button>

      <nav class="links" :class="{ open: menuOpen }">
        <RouterLink to="/" @click="closeMenu">首页</RouterLink>
        <RouterLink to="/books" @click="closeMenu">图书列表</RouterLink>
        <RouterLink to="/books/new" @click="closeMenu">新书上架</RouterLink>
        <RouterLink to="/readers/new" @click="closeMenu">读者登记</RouterLink>
        <RouterLink to="/readers/find" @click="closeMenu">读者查询</RouterLink>
      </nav>
    </header>

    <main class="container">
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import { useRoute } from 'vue-router'

const menuOpen = ref(false)
const scrolled = ref(false)
const route = useRoute()

const handleScroll = () => { scrolled.value = window.scrollY > 6 }
const closeMenu = () => { menuOpen.value = false }

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  handleScroll()
})
onBeforeUnmount(() => window.removeEventListener('scroll', handleScroll))

// 切换路由时自动收起移动端菜单
watch(() => route.fullPath, () => { menuOpen.value = false })
</script>

<style scoped>
/* ===== 主题令牌（明亮） ===== */
.app {
  --bg:            #f6f8fb;   /* 页面背景 */
  --surface:       #ffffff;   /* 内容背景 */
  --text:          #0f172a;   /* 主文字 */
  --muted:         #64748b;   /* 次要文字 */
  --primary:       #2563eb;   /* 品牌色（蓝） */
  --primary-600:   #2563eb;
  --primary-700:   #1d4ed8;
  --border:        #e5e7eb;   /* 边框 */
  --ring:          rgba(37, 99, 235, .35);
  --shadow-sm:     0 1px 2px rgba(0,0,0,.05);
  --shadow-md:     0 6px 16px rgba(15,23,42,.08);
  color: var(--text);
  background: var(--bg);
  min-height: 100dvh;
}

/* ===== 顶部导航 ===== */
.nav {
  position: sticky; top: 0; z-index: 50;
  background: var(--surface);
  border-bottom: 1px solid var(--border);
  display: grid; grid-template-columns: 1fr auto 1fr;
  align-items: center; gap: 12px;
  padding: 12px 16px;
  transition: box-shadow .2s ease, border-color .2s ease, background-color .2s ease;
}
.nav.scrolled { box-shadow: var(--shadow-sm); }

.brand {
  display: flex; align-items: center; gap: 10px;
}
.brand .logo {
  font-size: 20px; line-height: 1;
}
.brand h1 {
  font-size: 18px; font-weight: 700; letter-spacing: .2px;
  color: var(--text);
  white-space: nowrap;
  margin: 0;
}

/* ===== 链接区 ===== */
.links {
  grid-column: 2 / 4;
  display: flex; align-items: center; justify-content: flex-end; flex-wrap: wrap;
  gap: 8px;
}
.links a {
  display: inline-block;
  padding: 8px 12px;
  border-radius: 10px;
  text-decoration: none;
  color: var(--muted);
  font-weight: 600;
  border: 1px solid transparent;
  transition: background-color .15s ease, color .15s ease, border-color .15s ease, transform .05s ease;
  will-change: transform;
}
.links a:hover {
  color: var(--primary-700);
  background: rgba(37,99,235,.08);
}
.links a:active { transform: translateY(1px); }

/* 激活态（scoped 下用 :deep） */
.links :deep(.router-link-active),
.links :deep(.router-link-exact-active) {
  color: var(--primary-700);
  background: rgba(37,99,235,.12);
  border-color: color-mix(in srgb, var(--primary) 25%, transparent);
}

/* 焦点可见性（可访问性） */
.links a:focus-visible,
.mobile-toggle:focus-visible {
  outline: 2px solid var(--ring);
  outline-offset: 2px;
  border-radius: 12px;
}

/* ===== 移动端菜单按钮 ===== */
.mobile-toggle {
  grid-column: 3 / 4;
  justify-self: end;
  display: none;
  width: 40px; height: 36px;
  border: 1px solid var(--border);
  border-radius: 10px;
  background: var(--surface);
  padding: 6px 8px;
  cursor: pointer;
}
.mobile-toggle .bar {
  display: block; height: 2px; width: 100%;
  background: var(--text);
  border-radius: 2px; margin: 5px 0;
}

/* ===== 主内容容器 ===== */
.container {
  max-width: 1200px;
  padding: 20px;
  margin: 20px auto 32px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 14px;
  box-shadow: var(--shadow-md);
}

/* ===== 响应式 ===== */
@media (max-width: 900px) {
  .container { padding: 16px; margin: 16px auto 24px; }

  .nav {
    grid-template-columns: auto auto;
  }
  .links {
    grid-column: 1 / -1;
    display: none;
    flex-direction: column;
    align-items: stretch;
    padding: 10px 0 0;
  }
  .links.open { display: flex; }
  .links a {
    padding: 10px 12px;
  }

  .mobile-toggle { display: inline-block; }
}

/* 更窄屏优化 */
@media (max-width: 480px) {
  .brand h1 { font-size: 16px; }
  .container { padding: 14px; }
}
</style>
