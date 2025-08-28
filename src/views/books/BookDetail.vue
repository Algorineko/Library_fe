<template>
  <div class="card" v-if="book">
    <h2>图书详情 #{{ book.id }}</h2>
    <p><b>ISBN:</b>{{ book.isbn }}</p>
    <p><b>书名：</b>{{ book.title }}</p>
    <p><b>作者：</b>{{ book.author }}</p>
    <p><b>馆藏/可借：</b>{{ book.copies_total }} / {{ book.copies_available }}</p>
    <p><b>出版日期：</b>{{ fmt(book.published_at) }}</p>
    <p><b>状态：</b><span class="badge" :class="book.status==='active'?'green':'gray'">{{ book.status }}</span></p>

    <div class="row" style="margin-top:12px;">
      <RouterLink class="btn" to="/books">返回列表</RouterLink>
      <button class="btn danger" v-if="book.status==='active'" @click="doArchive">下架</button>
    </div>
  </div>
  <div class="card" v-else>
    <p><small class="muted">加载中…</small></p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getBook, archiveBook } from '../../api/book'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const book = ref(null)

onMounted(async () => {
  try {
    book.value = await getBook(route.params.id)
  } catch (e) {
    alert(e.message)
    router.push('/books')
  }
})

function fmt(ts) {
  if (!ts) return '-'
  return new Date(ts).toLocaleString()
}

async function doArchive() {
  if (!confirm('确认下架该图书？')) return
  try {
    await archiveBook(book.value.id)
    alert('已下架')
    book.value.status = 'archived'
  } catch (e) {
    alert(e.message)
  }
}
</script>
