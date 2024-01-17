<template>
    <div class="bg-violet-100 rounded-lg md:mx-auto py-8 w-full md:w-3/4 h-[78vh] overflow-y-auto">
        <div class="flex justify-center">
            <button @click="autoCronJobHandler" class="px-4 py-2 bg-emerald-500 hover:bg-emerald-700 text-white mx-10 rounded-lg">Auto Cronjob</button>
            <button @click="modal.manualCronJob.value = !modal.manualCronJob.value" class="px-4 py-2 bg-emerald-500 hover:bg-emerald-700 text-white mx-10 rounded-lg">Manual Cronjob</button>
            <button @click="modal.manualBilling.value = !modal.manualBilling.value" class="px-4 py-2 bg-emerald-500 hover:bg-emerald-700 text-white mx-10 rounded-lg">Manual Billing</button>
        </div>
        <div v-show="modal.manualCronJob.value" class="absolute top-[30%] p-8 bg-violet-300 rounded-lg w-full md:w-1/4 md:left-[37%]">
            <div class="flex justify-between">
                <h3 class="text-xl text-fuchsia-800 font-bold">Manual CronJob</h3>
                <div @click="backButton" class="text-fuchsia-800 cursor-pointer">
                    X
                </div>
            </div>
            <div v-show="modal.loading.value" class="text-center text-white font-bold">
                <p>Loading</p> <Icon name="svg-spinners:3-dots-bounce"/>
            </div>
            <div v-show="modal.success.value" class="text-center text-white text-2xl">
                <Icon name="ooui:success" class="text-green-700 text-5xl"/>
                <button @click="backButton" class="w-full py-2 px-4 text-white bg-fuchsia-600 hover:bg-fuchsia-800 rounded-lg mt-10">Kembali</button>
            </div>
            <div v-show="modal.error.value" class="w-full p-2 font-bold text-sm text-center bg-red-600 text-white rounded-lg mb-10">{{ modal.errorMessage }}</div>
            <div v-show="!modal.loading.value && !modal.success.value" class="mt-10">
                <input v-model="formData.manualCron.value" type="number" name="bc" id="bc" class="mb-10 w-full px-4 py-2 focus:outline-none focus:ring focus:ring-fuchsia-600" placeholder="bc">
                <button @click="manualCronHandler" class="px-4 py-2 w-full text-white rounded-lg bg-fuchsia-600">Submit</button>
            </div>
        </div>
        <div v-show="modal.manualBilling.value" class="absolute top-[30%] p-8 bg-violet-300 rounded-lg w-full md:w-1/4 md:left-[37%]">
            <div class="flex justify-between">
                <h3 class="text-xl text-fuchsia-800 font-bold">Manual Billing</h3>
                <div @click="backButton" class="text-fuchsia-800 cursor-pointer">
                    X
                </div>
            </div>
            <div v-show="modal.loading.value" class="text-center text-white font-bold">
                <p>Loading</p> <Icon name="svg-spinners:3-dots-bounce"/>
            </div>
            <div v-show="modal.success.value" class="text-center text-white text-2xl">
                <Icon name="ooui:success" class="text-green-700 text-5xl"/>
                <button @click="backButton" class="w-full py-2 px-4 text-white bg-fuchsia-600 hover:bg-fuchsia-800 rounded-lg mt-10">Kembali</button>
            </div>
            <div v-show="modal.error.value" class="w-full p-2 font-bold text-sm text-center bg-red-600 text-white rounded-lg mb-10">{{ modal.errorMessage }}</div>
            <div v-show="!modal.loading.value && !modal.success.value" class="mt-10">
                <input v-model="formData.manualBilling.value" type="number" name="bc" id="bc" class="mb-10 w-full px-4 py-2 focus:outline-none focus:ring focus:ring-fuchsia-600" placeholder="Client ID">
                <button @click="manualBillingHandler" class="px-4 py-2 w-full text-white rounded-lg bg-fuchsia-600">Submit</button>
            </div>
        </div>
        <div v-show="modal.cronJob.value" class="absolute top-[30%] p-8 bg-violet-300 rounded-lg w-full md:w-1/4 md:left-[37%]">
            <div class="flex justify-between">
                <h3 class="text-xl text-fuchsia-800 font-bold">AutoCronJob</h3>
                <div @click="backButton" class="text-fuchsia-800 cursor-pointer">
                    X
                </div>
            </div>
            <div v-show="modal.loading.value" class="text-center text-white font-bold">
                <p>Loading</p> <Icon name="svg-spinners:3-dots-bounce"/>
            </div>
            <div v-show="modal.error.value" class="w-full p-2 font-bold text-sm text-center bg-red-600 text-white rounded-lg mb-10">{{ modal.errorMessage }}</div>
            <div v-show="modal.success.value" class="text-center text-white text-2xl">
                <Icon name="ooui:success" class="text-green-700 text-5xl"/>
                <button @click="backButton" class="w-full py-2 px-4 text-white bg-fuchsia-600 hover:bg-fuchsia-800 rounded-lg mt-10">Kembali</button>
            </div>
        </div>
    </div>
</template>

<script setup>
definePageMeta({
    layout: 'admin-dashboard'
})

const url = useRuntimeConfig().public.baseUrl
const cookies = useCookie('auth')
const modal = {
    manualCronJob: ref(false),
    cronJob: ref(false),
    manualBilling: ref(false),
    loading: ref(false),
    success: ref(false),
    error: ref(false),
    errorMessage: ''
}

const backButton = ()=>{
    modal.cronJob.value = false
    modal.manualBilling.value = false
    modal.manualCronJob.value = false
    modal.loading.value = false
    modal.success.value = false
    modal.error.value = false
    modal.errorMessage = ''
}

const formData = {
    manualCron: ref(),
    manualBilling: ref()
}
const manualCronHandler = async ()=>{
    modal.loading.value = true
    modal.error.value = false
    modal.errorMessage = ''
    modal.success.value = false
    await useFetch(url+'/billing/manualcronjob',{
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${cookies.value}`
        },
        body: {
            bc: formData.manualCron.value
        }
    }).then((d)=>{
        if(d.data.value != null){
            modal.loading.value = false
            modal.success.value = true
        } else {
            modal.loading.value = false
            modal.success.value = false
            modal.error.value = true
            modal.errorMessage = d.error.value.data.errors
        }
    })
}


const manualBillingHandler = async ()=>{
    modal.loading.value = true
    modal.error.value = false
    modal.errorMessage = ''
    modal.success.value = false
    await useFetch(url+'/billing/addmanual',{
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${cookies.value}`
        },
        body: {
            client_id: formData.manualBilling.value
        }
    }).then((d)=>{
        if(d.data.value != null){
            modal.loading.value = false
            modal.success.value = true
        } else {
            modal.loading.value = false
            modal.success.value = false
            modal.error.value = true
            modal.errorMessage = d.error.value.data.errors
        }
    })
        
}

const autoCronJobHandler = async ()=>{
    modal.cronJob.value = true
    modal.loading.value = true
    modal.error.value = false
    modal.errorMessage = ''
    modal.success.value = false
    await useFetch(url+'/billing/cronjob',{
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${cookies.value}`
        }
    }).then((d)=>{
        if(d.data.value != null){
            modal.loading.value = false
            modal.success.value = true
        } else {
            modal.loading.value = false
            modal.success.value = false
            modal.error.value = true
            modal.errorMessage = d.error.value.data.errors
        }
    })
}
</script>