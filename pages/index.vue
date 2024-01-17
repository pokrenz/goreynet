<template>
    <div class="my-20 p-8 mx-auto bg-white w-3/4 md:w-1/4 rounded-md">
        <p class="my-2">Masukan ID Pelanggan disini</p>
        <div class="flex" :class="idpelError ? 'animate__animated animate__shakeX' : null">
            <input type="text" name="id_pel" id="id_pel" v-model="idpel"
            class="bg-slate-200 rounded-l-md w-full focus:outline-none focus:ring focus:ring-fuchsia-700"
            :class="idpelError ? 'ring ring-red-500' : null"
            placeholder="ID Pelanggan" autofocus required>
            <button type="submit" class="p-2 bg-fuchsia-600 text-white w-36 rounded-r-md" @click="formHandler">Cek</button>
        </div>
    </div>
</template>

<script setup>
let idpel = ref("");
let idpelError = defineModel(false);
const formHandler = ()=>{
    if(!idpel.value){
        return idpelError.value = true;
    }
    navigateTo(`/billing/${idpel.value}`);
}

</script>