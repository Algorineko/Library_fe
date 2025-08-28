<template>
  <div v-if="reader" class="row">
    <div class="card" style="flex:1; min-width:320px;">
      <h2>读者信息 #{{ reader.id }}</h2>
      <p><b>读者号：</b>{{ reader.reader_no }}</p>
      <p><b>姓名：</b>{{ reader.name }}</p>
      <p><b>Email：</b>{{ reader.email || '-' }}</p>
      <p><b>手机：</b>{{ reader.phone || '-' }}</p>
      <p><b>状态：</b><span class="badge" :class="reader.status==='active'?'green':'gray'">{{ reader.status }}</span></p>

      <div class="card" style="margin-top:16px;">
        <h3>借书（本读者）</h3>
        <div class="row">
          <div style="flex:1; min-width:200px;">
            <label>图书ID</label><br/>
            <input type="number" v-model.number="borrow.book_id" placeholder="必填">
          </div>
          <div style="flex:1; min-width:200px;">
            <label>借书天数</label><br/>
            <input type="number" v-model.number="borrow.days" min="1">
          </div>
        </div>
        <div style="margin-top:12px;">
          <button class="btn primary" @click="doBorrow">借书</button>
        </div>
        <p v-if="borrowTip" style="margin-top:8px;"><small class="muted">{{ borrowTip }}</small></p>
      </div>

      <div class="card" style="margin-top:16px;">
        <h3>罚款汇总</h3>
        <p><b>累计罚款：</b>{{ (fines.total_fine_cents || 0) / 100 }} 元</p>
        <button class="btn" @click="loadFines">刷新罚款</button>
      </div>
    </div>

    <div class="card" style="flex:2; min-width:480px;">
      <div class="row" style="align-items:center; justify-content:space-between;">
        <h2>借阅记录</h2>
        <div>
          <small class="muted">状态：</small>
          <select v-model="loanStatus" @change="loadLoans">
            <option value="open">open（默认）</option>
            <option value="all">all</option>
          </select>
          <button class="btn" style="margin-left:8px;" @click="loadLoans">刷新</button>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th><th>图书</th><th>借出</th><th>应还</th><th>归还</th><th>罚款(分)</th><th>状态</th><th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="l in loans" :key="l.id">
            <td>{{ l.id }}</td>
            <td>
              <div>
                <RouterLink :to="`/books/${l.book?.id}`">{{ l.book?.title || ('#'+l.book_id) }}</RouterLink>
                <div><small class="muted">ISBN {{ l.book?.isbn || '-' }}</small></div>
              </div>
            </td>
            <td>{{ fmt(l.borrowed_at) }}</td>
            <td>{{ fmt(l.due_at) }}</td>
            <td>{{ fmt(l.returned_at) }}</td>
            <td>{{ l.fine_cents }}</td>
            <td><span class="badge" :class="l.status==='open'?'green':'gray'">{{ l.status }}</span></td>
            <td>
              <button class="btn primary" v-if="l.status==='open'" @click="doReturn(l.id)">归还</button>
              <span v-else>-</span>
            </td>
          </tr>
        </tbody>
      </table>
      <p v-if="!loans.length"><small class="muted">暂无借阅记录</small></p>
    </div>
  </div>

  <div v-else class="card">
    <p><small class="muted">加载中…</small></p>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getReader, listReaderLoans, getReaderFines } from '../../api/reader'
import { borrowBook, returnBook } from '../../api/loan'

const route = useRoute()
const router = useRouter()
const reader = ref(null)
const loans = ref([])
const fines = reactive({ total_fine_cents: 0 })
const loanStatus = ref('open')

const borrow = reactive({
  book_id: null,
  reader_id: null,
  days: 30,
})
const borrowTip = ref('')

function fmt(ts) {
  if (!ts) return '-'
  return new Date(ts).toLocaleString()
}

async function loadReader() {
  try {
    const r = await getReader(route.params.id)
    reader.value = r
    borrow.reader_id = r.id
  } catch (e) {
    alert(e.message)
    router.push('/readers/find')
  }
}

async function loadLoans() {
  loans.value = await listReaderLoans(route.params.id, loanStatus.value)
}

async function loadFines() {
  const f = await getReaderFines(route.params.id)
  fines.total_fine_cents = f.total_fine_cents || 0
}

async function doBorrow() {
  if (!borrow.book_id) return alert('请填写图书ID')
  try {
    const res = await borrowBook({
      book_id: Number(borrow.book_id),
      reader_id: Number(borrow.reader_id),
      days: borrow.days || 30,
    })
    borrowTip.value = `借书成功：借阅ID ${res.id}`
    await loadLoans()
  } catch (e) {
    alert(e.message)
  }
}

async function doReturn(loanId) {
  if (!confirm(`确认归还 借阅#${loanId} ？`)) return
  try {
    const res = await returnBook(loanId)
    alert(`已归还，罚款 ${res.fine_cents} 分`)
    await Promise.all([loadLoans(), loadFines()])
  } catch (e) {
    alert(e.message)
  }
}

onMounted(async () => {
  await loadReader()
  await Promise.all([loadLoans(), loadFines()])
})

watch(() => route.params.id, async () => {
  await loadReader()
  await Promise.all([loadLoans(), loadFines()])
})
</script>
