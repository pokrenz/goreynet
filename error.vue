<template>
    <div class="w-full bg-slate-200 h-screen">
    <NavBar />
    <NuxtLayout>
      <div class="p-8 bg-white w-3/4 md:w-1/4">
        <h1 class="font-bold text-3xl">Oops.. {{ error.statusCode }}</h1>
        <p>Sepertinya kamu tersesat..</p>
        <p>{{ error.message }}</p>
        <button @click="goBack" class="mt-7 px-4 py-2 bg-violet-400 w-full font-bold text-white">Kembali ke halaman depan</button>
      </div>
    </NuxtLayout>
    <Footer />
  </div>
</template>

<script setup>
const error = useError();
const goBack = ()=>{
   clearError({
    redirect: '/'
   });
}

</script>