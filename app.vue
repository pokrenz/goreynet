<template>
  <div class="w-full max-w-full bg-slate-200 h-[100vh] overflow-y-hidden">
    <NavBar />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <Footer />
  </div>
</template>

<script setup>
useHead({
  title: "Reynet"
})
</script>
