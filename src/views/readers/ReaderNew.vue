<template>
  <div class="card">
    <h2>读者登记</h2>
    <div class="row">
      <div style="flex:1; min-width:280px;">
        <label>读者号</label><br/>
        <input v-model="form.reader_no" placeholder="必填，如 20250001"/>
      </div>
      <div style="flex:1; min-width:280px;">
        <label>姓名</label><br/>
        <input v-model="form.name" placeholder="必填"/>
      </div>
    </div>
    <div class="row" style="margin-top:12px;">
      <div style="flex:1; min-width:280px;">
        <label>Email</label><br/>
        <input v-model="form.email" placeholder="可选"/>
      </div>
      <div style="flex:1; min-width:280px;">
        <label>手机</label><br/>
        <input v-model="form.phone" placeholder="可选"/>
      </div>
    </div>
    <div style="margin-top:16px;">
      <button class="btn" @click="reset">重置</button>
      <button class="btn primary" @click="submit">提交登记</button>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { createReader } from '../../api/reader'
import { useRouter } from 'vue-router'

const router = useRouter()
const form = reactive({
  reader_no: '', name: '', email: '', phone: ''
})

function reset() {
  form.reader_no = ''
  form.name = ''
  form.email = ''
  form.phone = ''
}

async function submit() {
  try {
    const payload = {
      reader_no: form.reader_no,
      name: form.name,
      email: form.email || '',
      phone: form.phone || ''
    }
    const r = await createReader(payload)
    alert(`登记成功，读者ID：${r.id}`)
    router.push(`/readers/${r.id}`)
  } catch (e) {
    alert(e.message)
  }
}
</script>
