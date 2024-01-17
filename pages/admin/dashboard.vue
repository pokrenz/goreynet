<template>
    <div class="bg-violet-100 rounded-lg md:mx-auto py-8 w-full md:w-3/4 h-[78vh] overflow-y-auto">
        <div class="md:flex mx-10 w-100 pt-4 justify-between">
          <div class="h-24">
            <button @click="addClientHandler" class="bg-emerald-400 my-10 px-4 py-2 rounded-md shadow-xl text-white hover:bg-emerald-700">Tambah</button>
          </div>
        </div>
        <div class="w-full md:w-100 md:flex md:justify-end md:px-10">
          <div class="flex mx-5 mb-5">
            <select v-model="caribc" class="px-4 py-2 bg-white w-full md:w-48 rounded-l-lg" name="cycle" id="cycle">
                <option value="0">-- Pilih Cycle --</option>
                <option value="1">Tgl 1</option>
                <option value="5">Tgl 5</option>
                <option value="10">Tgl 10</option>
                <option value="15">Tgl 15</option>
                <option value="20">Tgl 20</option>
                <option value="25">Tgl 25</option>
                <option value="30">Tgl 30</option>
            </select>
            <button class="py-1 px-6 bg-sky-600 text-white rounded-r-lg" @click="cariBcHandler">Cari</button>
          </div>
          <div class="flex mx-5 mb-5 justify-end">
            <input v-model="inputFindClient" type="text" name="searchid" id="searchid" class="px-4 py-2 bg-white md:ml-4 rounded-l-lg w-full focus:outline-none focus:ring focus:ring-fuchsia-400" placeholder="Cari id">
            <button @click="cariClientByidhandler" class="px-4 py-2 bg-fuchsia-600 hover:bg-fuchsia-700 text-white rounded-r-lg">Cari</button>
          </div>
        </div>
        <div v-show="loading" class="text-center text-fuchsia-600">
          <p>Loading</p> <Icon name="svg-spinners:3-dots-bounce"/>
        </div>
        
        <div v-show="addModal" class="absolute bg-violet-300 rounded-lg z-20 w-full md:w-1/4 h-[fit-content] p-8 top-50 md:left-[37%]">
          <div class="flex justify-between">
            <h3 class="text-lg font-bold mb-10">Tambah Data Client</h3>
            <div @click="addModal = false" class="text-xl cursor-pointer">X</div>
          </div>
          <div v-show="modalError" class="w-full p-2 font-bold text-sm text-center bg-red-600 text-white rounded-lg mb-10">{{ errorMessage }}</div>
          <div v-show="!modalLoading && !modalSuccess">
            <form @submit.prevent="submitClientHandler">
              <input v-model="addForm.nama.value" type="text" name="nama" id="nama" placeholder="Nama" class="mb-10 py-2 px-4 rounded-lg w-full focus:outline-none focus:ring focus:ring-fuchsia-600" autofocus>
              <input v-model="addForm.alamat.value" type="text" name="alamat" id="alamat" placeholder="Alamat" class="mb-10 py-2 px-4 rounded-lg w-full focus:outline-none focus:ring focus:ring-fuchsia-600">
              <select v-model="addForm.bc.value" name="bc" id="bc" class="mb-10 w-full rounded-lg py-2 px-4 focus:outline-none focus:ring focus:ring-fuchsia-600">
                <option value="0">--Pilih BC--</option>
                <option value="1">Tgl 1</option>
                <option value="5">Tgl 5</option>
                <option value="10">Tgl 10</option>
                <option value="15">Tgl 15</option>
                <option value="20">Tgl 20</option>
                <option value="25">Tgl 25</option>
                <option value="30">Tgl 30</option>
              </select>
              <select v-model="addForm.paket_id.value" v-show="dataPaket" name="paket" id="paket" class="mb-10 w-full rounded-lg py-2 px-4 focus:outline-none focus:ring focus:ring-fuchsia-600">
                <option value="0">-- Pilih Paket --</option>
                <option v-for="paket in dataPaket" :key="paket" :value="paket.id">{{ paket.name }} - {{ paket.price }}</option>
              </select>
              <button class="py-2 px-4 bg-fuchsia-600 hover:bg-fuchsia-800 text-white w-full rounded-lg">Submit</button>
            </form>
          </div>
          <div v-show="modalLoading" class="text-center text-white text-xl">
            <p>Loading</p> <Icon name="svg-spinners:3-dots-bounce"/>
          </div>
          <div v-show="modalSuccess" class="text-center text-white text-2xl">
            <Icon name="ooui:success" class="text-green-700 text-5xl"/>
            <button @click="backButton" class="w-full py-2 px-4 text-white bg-fuchsia-600 hover:bg-fuchsia-800 rounded-lg mt-10">Kembali</button>
          </div>
        </div>
        <div v-show="modal.edit.value" class="absolute bg-violet-300 rounded-lg z-20 w-full md:w-1/4 h-[fit-content] p-8 top-50 md:left-[37%]">
          <div class="flex justify-between">
            <h3 class="text-lg font-bold mb-10">Edit Data Client</h3>
            <div @click="modal.edit.value = false" class="text-xl cursor-pointer">X</div>
          </div>
          <div v-show="modalError" class="w-full p-2 font-bold text-sm text-center bg-red-600 text-white rounded-lg mb-10">{{ errorMessage }}</div>
          <div v-show="!modalLoading && !modalSuccess">
            <input v-model="editForm.client_id.value" type="text" name="alamat" id="alamat" class="mb-10 py-2 px-4 rounded-lg w-full disabled" disabled>
            <input v-model="editForm.nama.value" type="text" name="nama" id="nama" placeholder="Nama" class="mb-10 py-2 px-4 rounded-lg w-full focus:outline-none focus:ring focus:ring-fuchsia-600" autofocus>
            <input v-model="editForm.alamat.value" type="text" name="alamat" id="alamat" placeholder="Alamat" class="mb-10 py-2 px-4 rounded-lg w-full focus:outline-none focus:ring focus:ring-fuchsia-600">
            <select v-model="editForm.bc.value" name="bc" id="bc" class="mb-10 w-full rounded-lg py-2 px-4 focus:outline-none focus:ring focus:ring-fuchsia-600">
              <option value="0">--Pilih BC--</option>
              <option value="1">Tgl 1</option>
              <option value="5">Tgl 5</option>
              <option value="10">Tgl 10</option>
              <option value="15">Tgl 15</option>
              <option value="20">Tgl 20</option>
              <option value="25">Tgl 25</option>
              <option value="30">Tgl 30</option>
            </select>
            <select v-model="editForm.paket_id.value" v-show="dataPaket" name="paket" id="paket" class="mb-10 w-full rounded-lg py-2 px-4 focus:outline-none focus:ring focus:ring-fuchsia-600">
              <option value="0">-- Pilih Paket --</option>
              <option v-for="paket in dataPaket" :key="paket" :value="paket.id">{{ paket.name }} - {{ paket.price }}</option>
            </select>
            <select v-model="editForm.status.value" name="status" id="status" class="mb-10 w-full rounded-lg py-2 px-4 focus:outline-none focus:ring focus:ring-fuchsia-600">
              <option value="0">--Pilih Status --</option>
              <option value="aktif">Aktif</option>
              <option value="inaktif">Tidak Aktif</option>
            </select>
            <button @click="submitEditHandler" class="py-2 px-4 bg-fuchsia-600 hover:bg-fuchsia-800 text-white w-full rounded-lg">Submit</button>
          </div>
          <div v-show="modalLoading" class="text-center text-white text-xl">
            <p>Loading</p> <Icon name="svg-spinners:3-dots-bounce"/>
          </div>
          <div v-show="modalSuccess" class="text-center text-white text-2xl">
            <Icon name="ooui:success" class="text-green-700 text-5xl"/>
            <button @click="backButton" class="w-full py-2 px-4 text-white bg-fuchsia-600 hover:bg-fuchsia-800 rounded-lg mt-10">Kembali</button>
          </div>
        </div>
        <div v-show="modal.global.value" class="absolute bg-violet-300 rounded-lg z-20 w-full md:w-1/4 h-[fit-content] p-8 top-50 md:left-[37%]">
          <div class="flex justify-end">
            <div @click="backButton" class="text-xl cursor-pointer">X</div>
          </div>
          <div v-show="modalError" class="w-full p-2 font-bold text-sm text-center bg-red-600 text-white rounded-lg mb-10">{{ errorMessage }}</div>
          <div v-show="modalLoading" class="text-center text-white text-xl">
            <p>Loading</p> <Icon name="svg-spinners:3-dots-bounce"/>
          </div>
          <div v-show="modalSuccess" class="text-center text-white text-2xl">
            <Icon name="ooui:success" class="text-green-700 text-5xl"/>
            <button @click="backButton" class="w-full py-2 px-4 text-white bg-fuchsia-600 hover:bg-fuchsia-800 rounded-lg mt-10">Kembali</button>
          </div>
        </div>
        <div v-show="databc" class="md:flex md:flex-wrap md:mx-5 w-100 md:justify-evenly my-10" >
          <ClientCard v-for="data in databc" :key="data" :data="data" @editClientHandler="editClientHandler" @changeStatusHandler="changeStatusHandler"/>
        </div>
      </div>
</template>

<script setup>
definePageMeta({
  layout: 'admin-dashboard'
})
const config = useRuntimeConfig();
const cookies = useCookie('auth');
let caribc = ref(0)
let databc = ref();
let loading = ref(false)
let addModal = ref(false)
let modal = {
  edit: ref(false),
  global: ref(false)
}
let addForm = {
  paket_id: ref(0),
  nama: ref(),
  alamat: ref(),
  bc: ref(0)
}
let editForm = {
  client_id: ref(),
  paket_id: ref(0),
  nama: ref(),
  alamat: ref(),
  bc: ref(0),
  status: ref(0)
}
let inputFindClient = ref()
let modalError = ref(false)
let errorMessage = ref();
let modalLoading = ref(false)
let modalSuccess = ref(false)
let dataPaket = ref()
let url = config.public.baseUrl
if(!cookies.value){
    navigateTo('/admin/login')
} 
else {
    console.log("Welcome !")
}

const cariBcHandler = async ()=>{
  loading.value = true
  
  await useFetch(url+'/client/getbc/'+caribc.value, {
    'headers': {
      'Accept': 'application/json',
      'Authorization': `Bearer ${cookies.value}`
    },
  }).then((d)=>{
    databc = d.data.value.message
    console.log(d.data.value.status)
  })
  loading.value = false
}

const cariClientByidhandler = async ()=>{
  loading.value = true
  await useFetch(url+`/client/get/${inputFindClient.value}`,{
    headers: {
      "Accept": "application/json",
      "Authorization": `Bearer ${cookies.value}`
    }
  }).then((d)=>{
    if(d.data.value != null && d.data.value.message[0] != null){
      databc = d.data.value.message
      console.log(d.data.value.message)
      loading.value = false
    } else {
      modal.global.value = true
      modalError.value = true
      loading.value = false
      errorMessage = d.error.value ? d.error.value.data.errors : 'Tidak diizinkan melihat ID server lain'
    }
  })
  
}

const addClientHandler = async ()=>{
  addModal.value = !addModal.value;
  modalSuccess.value = false
  modalLoading.value = true
  if(!dataPaket.value){
    await getPaketData()
  }
  modalLoading.value = false
}

const submitClientHandler = async ()=>{
  modalLoading.value = true
  modalError.value = false
  await useFetch(url+'/client/add',{
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${cookies.value}`
    },
    body: {
      paket_id: addForm.paket_id.value,
      nama: addForm.nama.value,
      alamat: addForm.alamat.value,
      bc: addForm.bc.value
    }
  }).then((d)=>{
    if(d.data.value != null){
      modalSuccess.value = true
      modalLoading.value = false
      addForm.paket_id.value = 0
      addForm.nama.value = null
      addForm.alamat.value = null
      addForm.bc.value = 0
    } else {
      modalSuccess.value = false
      modalError.value = true
      modalLoading.value = false
      errorMessage = d.error.value.data.errors
    }
  })
}

const backButton = ()=>{
  modalSuccess.value = false
  modalLoading.value = false
  addModal.value = false
  modal.edit.value = false
  modal.global.value = false
  modalError.value = false
  errorMessage = null
}

const editClientHandler = async (id)=>{
  editForm.client_id.value = id["client_id"]
  editForm.nama.value = id['nama']
  editForm.alamat.value = id['server']
  editForm.bc.value = id['bc']
  editForm.paket_id.value = id['paket'].id
  editForm.status.value = id['status']
  modal.edit.value = !modal.edit.value
  modalLoading.value = true
  if(!dataPaket.value){
    await getPaketData()
  }
  modalLoading.value = false
}

const submitEditHandler = async ()=>{
  modalLoading.value = true
  await useFetch(url+'/client/edit',{
    method: "PUT",
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${cookies.value}`
    },
    body: {
      client_id: editForm.client_id.value,
      paket_id: editForm.paket_id.value,
      nama: editForm.nama.value,
      alamat: editForm.alamat.value,
      bc: editForm.bc.value,
      status: editForm.status.value
    }
  }).then((d)=>{
    if(d.data.value != null){
      modalSuccess.value = true
      modalLoading.value = false
      addForm.paket_id.value = 0
      addForm.nama.value = null
      addForm.alamat.value = null
      addForm.bc.value = 0
    } else {
      modalSuccess.value = false
      modalError.value = true
      modalLoading.value = false
      errorMessage = d.error.value.data.message
    }
  })
}

const changeStatusHandler = async (id)=>{
  modal.global.value = true
  modalLoading.value = true
  await useFetch(url+'/billing/changestatus',{
    method: "PUT",
    headers: {
      "Accept": 'application/json',
      "Authorization": `Bearer ${cookies.value}`
    },
    body: {
      "billing_id": id
    }
  }).then((d)=>{
    if(d.data.value != null){
      modalLoading.value = false
      modalSuccess.value = true
    } else {
      modalLoading.value = false
      modalError = true
      errorMessage = d.error.value.data.message
    }
  })
}

const getPaketData = async ()=>{
  await useFetch(url+'/paket',{
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${cookies.value}`
    }
  }).then((d)=>{
    dataPaket = d.data.value.message
  })
}
</script>

<!-- <style scoped>
.hide-scroll::--webkit-scrollbar {
  display: none;
}

.hide-scroll {
  scrollbar-width: none;
  -ms-overflow-style:none;
}
</style> -->