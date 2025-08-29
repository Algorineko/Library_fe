<template>
  <div>
    <div class="card row" style="align-items:center; justify-content:space-between;">
      <div>
        <h2>图书列表</h2>
        <small class="muted">状态筛选：</small>
        <select v-model="status" @change="load">
          <option value="active">active(默认)</option>
          <option value="archived">archived</option>
          <option value="all">all</option>
        </select>
      </div>
      <RouterLink class="btn primary" to="/books/new">+ 新书上架</RouterLink>
    </div>

    <div class="card">
      <table>
        <thead>
          <tr>
            <th>ID</th><th>ISBN</th><th>书名</th><th>作者</th>
            <th>可借/馆藏</th><th>出版</th><th>状态</th><th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="b in [...list].reverse()" :key="b.id">
            <td>{{ b.id }}</td>
            <td>{{ b.isbn }}</td>
            <td><RouterLink :to="`/books/${b.id}`">{{ b.title }}</RouterLink></td>
            <td>{{ b.author }}</td>
            <td>{{ b.copies_available }} / {{ b.copies_total }}</td>
            <td>{{ fmt(b.published_at) }}</td>
            <td>
              <span class="badge" :class="b.status==='active' ? 'green' : 'gray'">{{ b.status }}</span>
            </td>
            <td>
              <button class="btn danger" v-if="b.status==='active'" @click="doArchive(b.id)">下架</button>
              <span v-else>-</span>
            </td>
          </tr>
        </tbody>
      </table>
      <p v-if="!list.length"><small class="muted">暂无数据</small></p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { listBooks, archiveBook } from '../../api/book'

const status = ref('active')
const list = ref([])
const load = async () => {
  list.value = await listBooks(status.value)
}
onMounted(load)

function fmt(ts) {
  if (!ts) return '-'
  return new Date(ts).toLocaleString()
}

async function doArchive(id) {
  if (!confirm('确认下架该图书？')) return
  try {
    await archiveBook(id)
    await load()
    alert('已下架')
  } catch (e) {
    alert(e.message)
  }
}
</script>
