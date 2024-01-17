<template>
    <div class="bg-violet-100 rounded-lg md:mx-auto p-8 w-full md:w-3/4 h-[78vh] overflow-y-auto">
        <div class="md:flex mx-10 w-100 pt-4 justify-end mb-10">
            <button @click="modal.show.value = !modal.show.value " class="px-4 py-2 rounded-lg bg-red-400 hover:bg-red-700">Cash out</button>
        </div>
        <div v-show="loading" class="text-center text-fuchsia-600">
          <p>Loading</p> <Icon name="svg-spinners:3-dots-bounce"/>
        </div>
        
        <div v-show="modal.show.value" class="absolute bg-red-300 rounded-lg z-20 w-full md:w-1/4 h-[fit-content] p-8 top-50 left-0 md:left-[37%] drop-shadow-xl">
            <div class="flex justify-between">
                <h3 class="text-lg font-bold mb-10">Tambah Pengeluaran</h3>
                <div @click="backButton()" class="text-xl cursor-pointer">X</div>
            </div>
            <div v-show="modal.error.value" class="w-full p-2 font-bold text-sm text-center bg-red-600 text-white rounded-lg mb-10">{{ modal.errorMessage }}</div>
            <div v-show="!modal.loading.value && !modal.success.value">
                <form @submit.prevent="addTransactionHandler">
                    <select v-model="formData.server.value" class="w-full rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-fuchsia-600 mb-10">
                        <option value="0">-- Server --</option>
                        <option value="GCR">GCR</option>
                        <option value="LBW">LBW</option>
                        <option value="BLE">BLE</option>
                    </select>
                    <input v-model="formData.tanggal.value" type="date" name="tanggal" id="tanggal" placeholder="Tanggal" class="w-full px-4 py-2 rounded-lg mb-10 focus:outline-none focus:ring focus:ring-fuchsia-600">
                    <input v-model="formData.harga.value" type="number" name="harga" id="harga" class="mb-10 w-full px-4 py-2 focus:outline-none focus:ring focus:ring-fuchsia-600 rounded-lg" autofocus placeholder="Harga">
                    <textarea v-model="formData.keterangan.value" cols="4" class="w-full mb-10 px-4 py-2 focus:outline-none focus:ring focus:ring-fuchsia-600 rounded-lg" placeholder="Keterangan"></textarea>
                    <button class="px-4 py-2 text-white bg-fuchsia-600 w-full hover:bg-fuchsia-700 rounded-lg">Submit</button>
                </form>
            </div>
            <div v-show="modal.loading.value" class="text-center text-white text-xl">
                <p>Loading</p> <Icon name="svg-spinners:3-dots-bounce"/>
            </div>
            <div v-show="modal.success.value" class="text-center text-white text-2xl">
                <Icon name="ooui:success" class="text-green-700 text-5xl"/>
                <button @click="backButton" class="w-full py-2 px-4 text-white bg-fuchsia-600 hover:bg-fuchsia-800 rounded-lg mt-10">Kembali</button>
            </div>
        </div>
        <div v-show="!loading" class="md:flex md:flex-wrap md:justify-evenly w-full p-8 bg-violet-500">
            <div  class="w-full text-center mb-10">
                <h1 class="text-white text-2xl font-bold">Bulan {{ date.getMonth()+1 }} Tahun {{ date.getFullYear() }}</h1>
            </div>
            <div class="md:w-1/4 w-full bg-violet-300 p-4 mb-10 h-96 overflow-y-auto">
                <h3 class="font-bold text-center">Server GCR</h3>
                <p class="text-center">{{ currencyFormat.format(currentGcr) }}</p>
                <p class="text-center mt-10">Cash In</p>
                <table class="table-auto w-full mt-4">
                    <thead>
                        <tr>
                            <td>ID</td>
                            <td>Tagihan</td>
                            <td>Status</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="data in dataGcr" :key="data">
                            <td>{{ data.client_id }}</td>
                            <td>{{ data.paket.price }}</td>
                            <td>{{ data.status }}</td>
                        </tr>
                    </tbody>
                </table>
                <p class="text-center mt-10">Cash Out</p>
                <table class="table-auto w-full mt-4">
                    <thead>
                        <tr>
                            <td>Tanggal</td>
                            <td>Harga</td>
                            <td>Keterangan</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="data in dataCashOutGcr" :key="data">
                            <td>{{ data['tanggal'] }}</td>
                            <td>{{  data['price'] }}</td>
                            <td>{{ data['keterangan'] }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="md:w-1/4 w-full bg-violet-300 p-4 mb-10 h-96 overflow-y-auto">
                <h3 class="font-bold text-center">Server LBW</h3>
                <p class="text-center">{{ currencyFormat.format(currentLbw) }}</p>
                <table class="table-auto w-full mt-10">
                    <thead>
                        <tr>
                            <td>ID</td>
                            <td>Tagihan</td>
                            <td>Status</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="data in dataLbw" :key="data">
                            <td>{{ data.client_id }}</td>
                            <td>{{ data.paket.price }}</td>
                            <td>{{ data.status }}</td>
                        </tr>
                    </tbody>
                </table>
                <p class="text-center mt-10">Cash Out</p>
                <table class="table-auto w-full mt-4">
                    <thead>
                        <tr>
                            <td>Tanggal</td>
                            <td>Harga</td>
                            <td>Keterangan</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="data in dataCashOutLbw" :key="data">
                            <td>{{ data['tanggal'] }}</td>
                            <td>{{  data['price'] }}</td>
                            <td>{{ data['keterangan'] }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="md:w-1/4 w-full bg-violet-300 p-4 mb-10 h-96 overflow-y-auto">
                <h3 class="font-bold text-center">Server BLE</h3>
                <p class="text-center">{{ currencyFormat.format(currentBle) }}</p>
                <table class="table-auto w-full mt-10">
                    <thead>
                        <tr>
                            <td>ID</td>
                            <td>Tagihan</td>
                            <td>Status</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="data in dataBle" :key="data">
                            <td>{{ data.client_id }}</td>
                            <td>{{ data.paket.price }}</td>
                            <td>{{ data.status }}</td>
                        </tr>
                    </tbody>
                </table>
                <p class="text-center mt-10">Cash Out</p>
                <table class="table-auto w-full mt-4">
                    <thead>
                        <tr>
                            <td>Tanggal</td>
                            <td>Harga</td>
                            <td>Keterangan</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="data in dataCashOutBle" :key="data">
                            <td>{{ data['tanggal'] }}</td>
                            <td>{{  data['price'] }}</td>
                            <td>{{ data['keterangan'] }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div v-show="!loading" class="md:flex md:flex-wrap md:justify-evenly w-full p-8 bg-violet-500 mt-20">
            <div  class="w-full text-center mb-10">
                <h1 class="text-white text-2xl font-bold">Total Alltime</h1>
            </div>
            <div class="md:w-1/4 w-full bg-violet-300 p-4 mb-10">
                <h3 class="font-bold text-center">Server GCR</h3>
                <p class="text-center">{{ currencyFormat.format(totalGcr)}}</p>
            </div>
            <div class="md:w-1/4 w-full bg-violet-300 p-4 mb-10">
                <h3 class="font-bold text-center">Server LBW</h3>
                <p class="text-center">{{ currencyFormat.format(totalLbw) }}</p>
            </div>
            <div class="md:w-1/4 w-full bg-violet-300 p-4 mb-10">
                <h3 class="font-bold text-center">Server BLE</h3>
                <p class="text-center">{{ currencyFormat.format(totalBle) }}</p>
            </div>
        </div>
    </div>
</template>

<script setup>
definePageMeta({
    layout: 'admin-dashboard'
})

const date = new Date()
const loading = ref(false)
const url = useRuntimeConfig().public.baseUrl
const cookies = useCookie('auth')
let currentGcr = 0
let currentLbw = 0
let currentBle = 0
let dataGcr = null;
let dataLbw = null;
let dataBle = null;
let totalGcr = 0
let totalLbw = 0
let totalBle = 0
let cashOutLbw = 0
let cashOutGcr = 0
let cashOutBle = 0
let dataCashOutLbw = null
let dataCashOutGcr = null
let dataCashOutBle = null
const modal = {
    show: ref(false),
    loading: ref(false),
    error: ref(false),
    errorMessage: '',
    success: ref(false)
}
const formData = {
    server: ref(0),
    tanggal: ref(Date.now()),
    harga: ref(),
    keterangan: ref()
}
const currencyFormat = new Intl.NumberFormat('id-ID',{
    style: 'currency',
    currency: 'IDR'
})
if(!cookies.value){
    navigateTo('/admin/login')
}


const bodyLoad = async ()=>{
    loading.value = true
    await useFetch(url+'/billing/getclosebilllbw', {
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${cookies.value}`
        }
    }).then((d)=>{
        if(d.data.value != null){
            dataLbw = d.data.value.message
            dataLbw.forEach((c)=>{
                currentLbw += parseInt(c['paket'].price)
            })
        }
    })

    await useFetch(url+'/transaction/getlbw', {
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${cookies.value}`
        }
    }).then((d)=>{
        if(d.data.value != null){
            dataCashOutLbw = d.data.value.message
            dataCashOutLbw.forEach((c)=>{
                cashOutLbw += parseInt(c['price'])
            })
        }
    })

    currentLbw -= cashOutLbw

    await useFetch(url+'/billing/getclosebillgcr', {
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${cookies.value}`
        }
    }).then((d)=>{
        dataGcr = d.data.value.message
        dataGcr.forEach((c)=>{
            currentGcr += parseInt(c['paket'].price)
        })
    })

    await useFetch(url+'/transaction/getgcr', {
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${cookies.value}`
        }
    }).then((d)=>{
        if(d.data.value != null){
            dataCashOutGcr = d.data.value.message
            dataCashOutGcr.forEach((c)=>{
                cashOutGcr += parseInt(c['price'])
            })
        }
    })

    currentGcr -= cashOutGcr

    await useFetch(url+'/billing/getclosebillble', {
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${cookies.value}`
        }
    }).then((d)=>{
        if(d.data.value != null){
            dataBle = d.data.value.message
            dataBle.forEach((c)=>{
                currentBle += parseInt(c['paket'].price)
            })
        }
    })

    await useFetch(url+'/transaction/getble', {
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${cookies.value}`
        }
    }).then((d)=>{
        if(d.data.value != null){
            dataCashOutBle = d.data.value.message
            dataCashOutBle.forEach((c)=>{
                cashOutBle += parseInt(c['price'])
            })
        }
    })

    currentBle -= cashOutBle

    await useFetch(url+'/transaction/totallbw',{
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${cookies.value}`
        }
    }).then((d)=>{
        if(d.data.value != null){
            totalLbw = d.data.value.message
        }
    })

    await useFetch(url+'/transaction/totalgcr',{
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${cookies.value}`
        }
    }).then((d)=>{
        if(d.data.value != null){
            totalGcr = d.data.value.message
        }
    })

    await useFetch(url+'/transaction/totalble',{
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${cookies.value}`
        }
    }).then((d)=>{
        if(d.data.value != null){
            totalBle = d.data.value.message
        }
    })

    loading.value = false
}

const addTransactionHandler = async ()=>{
    modal.loading.value = true
    await useFetch(url+'/transaction/add', {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${cookies.value}`
        },
        body: {
            'alamat': formData.server.value,
            'tanggal': formData.tanggal.value,
            'harga': formData.harga.value,
            'keterangan': formData.keterangan.value
        }
    }).then((d)=>{
        if(d.data.value != null){
            modal.loading.value = false
            modal.success.value = true
            modal.error.value = false
            modal.errorMessage = ''
            formData.harga.value = ''
            formData.keterangan.value = ''
            formData.server.value = 0
            formData.tanggal.value = ''
        } else {
            modal.loading.value = false
            modal.error.value = true
            modal.errorMessage = d.error.value.data.errors
        }
    })
}

const backButton = ()=>{
    modal.show.value = false
    modal.loading.value = false
    modal.success.value = false
    modal.error.value = false
    modal.errorMessage = ''
}

bodyLoad()
</script>