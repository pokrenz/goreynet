<template>
    <div class="bg-violet-100 rounded-lg md:mx-auto py-8 w-full md:w-3/4 h-[78vh] overflow-y-auto">
        <div class="md:flex mx-10 w-100 pt-4 justify-between md:p-12">
            <div class="flex justify-evenly">
                <button @click="modal.addModal.value = true" class="bg-emerald-400 my-10 mr-4 px-4 py-2 rounded-md shadow-xl text-white hover:bg-emerald-700">Tambah</button>
                <button @click="getPaketHandler" class="bg-yellow-400 my-10 mr-4 px-4 py-2 rounded-md shadow-xl text-white hover:bg-yellow-700">List</button>
            </div>
        </div>
        <div v-show="loading" class="text-center text-fuchsia-600">
          <p>Loading</p> <Icon name="svg-spinners:3-dots-bounce"/>
        </div>
        <div v-show="modal.addModal.value" class="absolute mx-auto p-8 bg-fuchsia-400 rounded-lg w-full md:w-1/4 md:left-[37%]">
            <div class="flex text-white justify-between mb-10">
                <h3 class="text-xl font-bold">Tambah Paket</h3>
                <div @click="backButton" class="cursor-pointer">X</div>
            </div>
            <div v-show="modal.loading.value" class="text-center text-white font-bold">
                <p>Loading</p> <Icon name="svg-spinners:3-dots-bounce"/>
            </div>
            <div v-show="modal.success.value" class="text-center text-white text-2xl">
                <Icon name="ooui:success" class="text-green-700 text-5xl"/>
                <button @click="backButton" class="w-full py-2 px-4 text-white bg-fuchsia-600 hover:bg-fuchsia-800 rounded-lg mt-10">Kembali</button>
            </div>
            <div v-show="modal.error.value" class="w-full p-2 font-bold text-sm text-center bg-red-600 text-white rounded-lg mb-10">{{ modal.errorMessage }}</div>
            <div v-show="!modal.loading.value && !modal.success.value">
                <form @submit.prevent="addPaketHandler">
                    <input v-model="addForm.name.value" type="text" name="name" id="name" class="mb-10 py-2 px-4 rounded-lg w-full focus:outline-none focus:ring focus:ring-fuchsia-600" placeholder="Nama Paket">
                    <input v-model="addForm.price.value" type="number" name="price" id="price" class="mb-10 py-2 px-4 rounded-lg w-full focus:outline-none focus:ring focus:ring-fuchsia-600" placeholder="Harga">
                    <input v-model="addForm.speed.value" type="number" name="speed" id="speed" class="mb-10 py-2 px-4 rounded-lg w-full focus:outline-none focus:ring focus:ring-fuchsia-600" placeholder="Speed">
                    <button type="submit" class="w-full px-4 py-2 text-white bg-violet-600 hover:bg-violet-700">Submit</button>
                </form>
            </div>
        </div>
        <div v-show="modal.editModal.value" class="absolute mx-auto p-8 bg-fuchsia-400 rounded-lg w-full md:w-1/4 md:left-[37%]">
            <div class="flex text-white justify-between mb-10">
                <h3 class="text-xl font-bold">Edit Paket</h3>
                <div @click="backButton" class="cursor-pointer">X</div>
            </div>
            <div v-show="modal.loading.value" class="text-center text-white font-bold">
                <p>Loading</p> <Icon name="svg-spinners:3-dots-bounce"/>
            </div>
            <div v-show="modal.success.value" class="text-center text-white text-2xl">
                <Icon name="ooui:success" class="text-green-700 text-5xl"/>
                <button @click="backButton" class="w-full py-2 px-4 text-white bg-fuchsia-600 hover:bg-fuchsia-800 rounded-lg mt-10">Kembali</button>
            </div>
            <div v-show="modal.error.value" class="w-full p-2 font-bold text-sm text-center bg-red-600 text-white rounded-lg mb-10">{{ modal.errorMessage }}</div>
            <div v-show="!modal.loading.value && !modal.success.value">
                <form @submit.prevent="changePaketHandler">
                    <input v-model="editForm.id.value" type="text" name="id" id="id" class="mb-10 py-2 px-4 rounded-lg w-full disabled" disabled>
                    <input v-model="editForm.name.value" type="text" name="name" id="name" class="mb-10 py-2 px-4 rounded-lg w-full focus:outline-none focus:ring focus:ring-fuchsia-600" placeholder="Nama Paket">
                    <input v-model="editForm.price.value" type="number" name="price" id="price" class="mb-10 py-2 px-4 rounded-lg w-full focus:outline-none focus:ring focus:ring-fuchsia-600" placeholder="Harga">
                    <input v-model="editForm.speed.value" type="number" name="speed" id="speed" class="mb-10 py-2 px-4 rounded-lg w-full focus:outline-none focus:ring focus:ring-fuchsia-600" placeholder="Speed">
                    <button type="submit" class="w-full px-4 py-2 text-white bg-violet-600 hover:bg-violet-700">Submit</button>
                </form>
            </div>
        </div>
        <div v-show="dataPaket" class="md:flex md:flex-wrap md:mx-5 w-100 md:justify-evenly my-10" >
          <PaketCard v-for="data in dataPaket" :key="data" :data="data" @showEditModal="showEditModal" />
        </div>
    </div>
</template>

<script setup>
definePageMeta({
  layout: 'admin-dashboard'
})
const cookies = useCookie('auth');
if(!cookies.value){
    navigateTo('/admin/login')
}
let dataPaket = ref()
let loading = ref(false)
let url = useRuntimeConfig().public.baseUrl
let modal = {
    addModal: ref(false),
    editModal: ref(false),
    loading: ref(false),
    success: ref(false),
    error: ref(false),
    errorMessage: ''
}
let addForm = {
    name: ref(),
    price: ref(),
    speed: ref()
}
let editForm = {
    id: ref(),
    name: ref(),
    price: ref(),
    speed: ref()
}
const getPaketHandler = async ()=>{
    loading.value = true
    await useFetch(url+'/paket',{
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${cookies.value}`
        }
    }).then((d)=>{
        dataPaket = d.data.value.message
    })
    loading.value = false
}

const addPaketHandler = async ()=>{
    modal.loading.value = true
    await useFetch(url+'/paket/add',{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${cookies.value}`
        },
        body:{
            name: addForm.name.value,
            price: addForm.price.value,
            speed: addForm.speed.value
        }
    }).then((d)=>{
        if(d.data.value != null){
            modal.loading.value = false
            modal.success.value = true
        } else {
            modal.loading.value = false
            modal.error.value = true
            modal.errorMessage = d.error.value.data.message
        }
    })
}

const showEditModal = (data)=>{
    editForm.id.value = data["id"];
    editForm.name.value =data["name"];
    editForm.price.value = data["price"];
    editForm.speed.value = data["speed"]
    modal.editModal.value = true
}

const changePaketHandler = ()=>{
    
}

const backButton = ()=>{
    modal.addModal.value = false
    modal.editModal.value = false
    modal.loading.value = false
    modal.success.value = false
    modal.error.value = false
    modal.errorMessage = ''
}

</script>