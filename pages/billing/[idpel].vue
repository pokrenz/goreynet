<script setup>
let idpel = useRoute().params.idpel;
let client = null
let status = false;
let apiStatus = null;
await useFetch(`https://reynet.spargram.com/api/billing/${idpel}`)
.then((data)=>{
  client = data.data.value.message;
  status = true
  apiStatus = data.data.value.message.open_bill;
})

const currencyFormat = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR'
})



</script>

<template>
    <div class="my-20 p-8 mx-auto bg-white w-3/4 md:w-1/4 rounded-md">
      <div v-if="status">
        <h3 class="my-4 font-bold text-2xl">Data</h3>
        <hr class="my-2 border-gray-700">
        <p>ID: {{ idpel }}</p>
        <p>Nama: {{ client.nama }}</p>
        <p>Alamat: {{ client.server }}</p>
        <p>Tanggal penagihan: {{ client.bc }}</p>
        <p>Paket: {{ client.paket.name }}</p>
        <p>Status: {{ client.status }}</p>
        <p>Billing : {{ currencyFormat.format(client.paket.price) }}</p>
        <p v-if="apiStatus.length > 0">
          Tagihan: <span class="text-red-500 font-bold">{{ client.open_bill[0].status }}</span></p>
        <p v-else>Tagihan: <span class="text-green-500 font-bold">Lunas</span></p>
        <br/>
        <NuxtLink to="/" class="my-10 px-4 py-2 rounded-lg bg-fuchsia-600 text-white">Kembali</NuxtLink>
      </div>
      <div v-else>
        <h3 class="text-center mb-10">Data tidak ditemukan</h3>
        <NuxtLink to="/" class="my-10 px-4 py-2 rounded-lg bg-fuchsia-600 text-white">Kembali</NuxtLink>
      </div>
    </div>
</template>

