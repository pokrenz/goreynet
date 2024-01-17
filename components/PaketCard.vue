<template>
    <div class="p-4 mb-10 rounded-lg bg-gray-300 w-full h-[fit-content] md:w-1/4 md:mx-5">
        <h3 class="my-4 font-bold text-2xl">{{ data.data["name"] }}</h3>
        <hr class="my-2 border-gray-700">
        <p>ID: {{ data.data["id"] }}</p>
        <p>Harga: {{ currencyFormat.format(data.data["price"]) }}</p>
        <p>Speed: {{ data.data["speed"] }}</p>
        <button @click="emit('showEditModal', data.data)" class="my-5 mx-2 px-4 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700">Ubah</button>
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

const emit = defineEmits(['showEditModal']);
</script>