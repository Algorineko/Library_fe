<template>
  <div class="card">
    <h2>新书上架</h2>
    <div class="row">
      <div style="flex:1; min-width:280px;">
        <label>ISBN</label><br/>
        <input v-model="form.isbn" placeholder="必填"/>
      </div>
      <div style="flex:1; min-width:280px;">
        <label>书名</label><br/>
        <input v-model="form.title" placeholder="必填"/>
      </div>
      <div style="flex:1; min-width:280px;">
        <label>作者</label><br/>
        <input v-model="form.author" placeholder="必填"/>
      </div>
    </div>

    <div class="row" style="margin-top:12px;">
      <div style="flex:1; min-width:280px;">
        <label>馆藏总数</label><br/>
        <input type="number" v-model.number="form.copies_total" min="1" />
      </div>
      <div style="flex:1; min-width:280px;">
        <label>出版日期</label><br/>
        <input type="date" v-model="pubDate" />
      </div>
    </div>

    <div style="margin-top:16px;">
      <button class="btn" @click="reset">重置</button>
      <button class="btn primary" @click="submit">提交</button>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { createBook } from '../../api/book'
import { useRouter } from 'vue-router'

const router = useRouter()

const form = reactive({
  isbn: '', title: '', author: '',
  copies_total: 1,
  published_at: null,
})
const pubDate = ref('')

function reset() {
  form.isbn = ''
  form.title = ''
  form.author = ''
  form.copies_total = 1
  pubDate.value = ''
}

async function submit() {
  try {
    const payload = { ...form }
    // 后端是 time.Time，发送 RFC3339 字符串最稳妥
    payload.published_at = pubDate.value ? new Date(pubDate.value).toISOString() : null
    const res = await createBook(payload)
    alert(`上架成功:ID ${res.id}`)
    router.push('/books')
  } catch (e) {
    alert(e.message)
  }
}
</script>
