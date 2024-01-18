<template>
  <div v-show="route.name !== 'index'" class="sticky top-0 z-30">
    <navbar class="w-full flex bg-fuchsia-700 p-4 text-white justify-between items-center">
      <NuxtLink to="/" class="font-bold text-xl">Reynet Billing Information</NuxtLink>
      <div>
        <button v-show="cookies" @click="logoutHandler" class="ml-10 py-2 px-4 text-white bg-red-700 rounded-lg">Logout</button>
      </div>
    </navbar>
    <div v-show="cookies" class="w-full flex justify-end text-white bg-fuchsia-300 p-4 top-0">
        <NuxtLink to="/admin/dashboard" class="mx-2 p-2" :class="route.name == 'admin-dashboard' ? 'bg-fuchsia-600' : ''">Member</NuxtLink>
        <NuxtLink to="/admin/paket" class="mx-2 p-2" :class="route.name == 'admin-paket' ? 'bg-fuchsia-600' : ''">Paket</NuxtLink>
        <NuxtLink to="/admin/billing" class="mx-2 p-2" :class="route.name == 'admin-billing' ? 'bg-fuchsia-600' : ''">Billing</NuxtLink>
        <NuxtLink to="/admin/akuntansi" :class="route.name == 'admin-akuntansi' ? 'bg-fuchsia-600' : ''" class="mx-2 p-2">Akuntansi</NuxtLink>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const cookies = useCookie('auth');
const url = useRuntimeConfig().public.baseUrl
const logoutHandler = ()=>{

  useFetch(url+'/logout',{
    method: "POST",
    headers: {
      'Accept' : 'application/json',
      'Authorization': `Bearer ${cookies.value}`
    }
  }).then((d)=>{
    cookies.value = null
    navigateTo('/admin/login');
  }) 
}

console.log("Route : "+route.name)
</script>