<template>
    <div class="p-4 mb-10 rounded-lg bg-gray-300 w-full h-[fit-content] md:w-1/4 md:mx-5">
        <h3 class="my-4 font-bold text-2xl">Data</h3>
        <hr class="my-2 border-gray-700">
        <p>ID: {{ data.data["client_id"] }}</p>
        <p>Nama: {{ data.data["nama"] }}</p>
        <p>Alamat: {{ data.data.server }}</p>
        <p>Tanggal penagihan: {{ data.data["bc"] }}</p>
        <p>Paket: {{ data.data["paket"].name }}</p>
        <p>Billing : {{ currencyFormat.format(data.data["paket"].price) }}</p>
        <p>Status: {{ data.data["status"] }}</p>
        <p>Tagihan: 
            <span v-if="data.data['open_bill'].length > 0" class="text-red-600">{{ data.data["open_bill"][0].status }}</span>
            <span v-else class="text-green-600">Lunas</span>
        </p>
        <button @click="emit('changeStatusHandler', data.data['open_bill'][0].id)" v-show="data.data['open_bill'].length > 0" class="my-5 mx-2 px-4 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700">Tandai Lunas</button>
        <button @click="emit('editClientHandler', data.data)" class="my-5 mx-2 px-4 py-2 rounded-lg bg-yellow-600 text-white hover:bg-yellow-700">Ubah</button>
    </div>
</template>

<script setup>
let data = defineProps({
    data: Object
})
const currencyFormat = new Intl.NumberFormat('id-ID',{
    style: 'currency',
    currency: 'IDR'
})

const emit = defineEmits(['editClientHandler','changeStatusHandler']);
</script>