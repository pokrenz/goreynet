<template>
    <div class="my-20 p-8 pt-6 mx-auto bg-white w-full max-w-md max-sm:p-5 max-sm:m-3 rounded-md">
        <img class="h-[100px] mx-auto mb-10" src="/assets/images/reynet-logo.png" alt="">
        <div class="flex max-sm:flex-col" :class="idpelError ? 'animate__animated animate__shakeX' : null">
            <input type="text" name="id_pel" id="id_pel" v-model="idpel" @keydown.enter.prevent="formHandler"
            class="bg-slate-200 rounded-l-md w-full focus:outline-none focus:ring-1 focus:ring-fuchsia-700 pl-3 max-sm:h-[40px] max-sm:rounded-md"
            :class="idpelError ? 'ring ring-red-500' : null"
            placeholder="Masukan ID Pelanggan disini" autofocus required>
            <button type="submit" class="p-2 bg-fuchsia-600 text-white w-36 rounded-r-md max-sm:rounded-md max-sm:mt-3 max-sm:w-full hover:opacity-90" @click="formHandler">Cek</button>
        </div>
        <div class="text-center text-sm text-slate-400 mt-3">Masukan ID Pelanggan untuk melihat billing information</div>
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