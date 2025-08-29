<template>
  <section class="home-center">
    <div class="hero-card">
      <p class="kicker">欢迎</p>
      <h2>图书管理系统</h2>
      <p class="subtitle">轻量化实现基本功能</p>

      <ul class="features">
        <li>
          <span class="icon" aria-hidden="true">📘</span>
          <div class="text">
            <strong>新书上架 / 旧书淘汰（软删除）</strong>
            <span>维护馆藏生命周期，支持列表与详情查看</span>
          </div>
        </li>
        <li>
          <span class="icon" aria-hidden="true">🧑‍💼</span>
          <div class="text">
            <strong>读者登记与信息查询</strong>
            <span>一键查看借阅列表与罚款汇总</span>
          </div>
        </li>
        <li>
          <span class="icon" aria-hidden="true">🔖</span>
          <div class="text">
            <strong>借书流程</strong>
            <span>支持指定读者 / 图书 / 借阅天数</span>
          </div>
        </li>
        <li>
          <span class="icon" aria-hidden="true">↩️</span>
          <div class="text">
            <strong>还书流程</strong>
            <span>结算超期罚款并自动归还库存</span>
          </div>
        </li>
      </ul>

      <div class="cta-row">
        <RouterLink class="btn primary" to="/books">开始管理图书</RouterLink>
        <RouterLink class="btn ghost" to="/readers/find">查找读者</RouterLink>
      </div>
    </div>
  </section>
</template>

<script setup>
</script>

<style scoped>
/* ===== 居中容器（与 App 顶栏高度配合） ===== */
.home-center {
  min-height: calc(100dvh - var(--nav-h, 64px));
  display: grid;
  place-items: center;
  padding: 20px;
  background:
    radial-gradient(1200px 400px at 50% -200px, rgba(37,99,235,.08), transparent 60%),
    var(--bg, #f6f8fb);
}

/* ===== 卡片（主视觉） ===== */
.hero-card {
  width: min(92vw, 920px);
  background: var(--surface, #fff);
  border: 1px solid var(--border, #e5e7eb);
  border-radius: 16px;
  box-shadow: var(--shadow-md, 0 6px 16px rgba(15,23,42,.08));
  padding: 28px;
  position: relative;
  overflow: hidden;
}

/* 角落柔光装饰 */
.hero-card::before,
.hero-card::after {
  content: "";
  position: absolute;
  pointer-events: none;
  filter: blur(24px);
}
.hero-card::before {
  top: -60px; right: -60px;
  width: 240px; height: 240px;
  background: radial-gradient(closest-side, rgba(37,99,235,.18), transparent 70%);
}
.hero-card::after {
  bottom: -80px; left: -80px;
  width: 260px; height: 260px;
  background: radial-gradient(closest-side, rgba(99,102,241,.12), transparent 70%);
}

/* 标题区 */
.kicker {
  display: inline-block;
  font-weight: 700;
  font-size: 12px;
  letter-spacing: .12em;
  text-transform: uppercase;
  color: var(--primary, #2563eb);
  background: rgba(37,99,235,.10);
  border: 1px solid rgba(37,99,235,.18);
  padding: 4px 8px;
  border-radius: 999px;
  margin-bottom: 8px;
}
h2 {
  margin: 0 0 4px 0;
  font-size: clamp(22px, 3vw, 28px);
  color: var(--text, #0f172a);
}
.subtitle {
  margin: 0 0 14px 0;
  color: var(--muted, #64748b);
}

/* 功能列表 */
.features {
  list-style: none;
  padding: 0;
  margin: 16px 0 0 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}
.features li {
  display: grid;
  grid-template-columns: 32px 1fr;
  align-items: start;
  gap: 10px;
  padding: 12px;
  border: 1px solid var(--border, #e5e7eb);
  border-radius: 12px;
  background: var(--bg, #f6f8fb);
  transition: transform .08s ease, background-color .15s ease, border-color .15s ease;
}
.features li:hover {
  transform: translateY(-1px);
  background: #fff;
  border-color: color-mix(in srgb, var(--primary, #2563eb) 18%, var(--border, #e5e7eb));
}
.icon {
  font-size: 20px; line-height: 1; margin-top: 2px;
}
.text strong {
  display: block;
  color: var(--text, #0f172a);
  margin-bottom: 2px;
}
.text span {
  display: block;
  font-size: 13px;
  color: var(--muted, #64748b);
}

/* 按钮区 */
.cta-row {
  margin-top: 18px;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 40px;
  padding: 0 14px;
  border-radius: 12px;
  font-weight: 700;
  text-decoration: none;
  border: 1px solid transparent;
  transition: background-color .15s ease, color .15s ease, border-color .15s ease, transform .05s ease;
}
.btn:focus-visible {
  outline: 2px solid var(--ring, rgba(37,99,235,.35));
  outline-offset: 2px;
}
.btn:active { transform: translateY(1px); }

.btn.primary {
  background: var(--primary, #2563eb);
  color: #fff;
  border-color: var(--primary-600, #2563eb);
}
.btn.primary:hover { background: var(--primary-700, #1d4ed8); }

.btn.ghost {
  background: transparent;
  color: var(--primary-700, #1d4ed8);
  border-color: color-mix(in srgb, var(--primary, #2563eb) 24%, transparent);
}
.btn.ghost:hover {
  background: rgba(37,99,235,.10);
}

/* 响应式 */
@media (max-width: 900px) {
  .hero-card { padding: 22px; }
  .features { grid-template-columns: 1fr; }
}
@media (max-width: 480px) {
  .hero-card { padding: 18px; }
}
</style>
