<template>
    <div class="w-full bg-slate-200 h-screen">
    <!--form-->
    <div class="relative h-screen w-100 bg-no-repeat bg-cover bg-bottom bg-[url('/assets/images/network_bg.jpg')]">
      <div class="z-10 absolute flex justify-center items-center h-full w-full">
        <div class="my-20 py-2 px-3 mx-auto bg-white w-3/4 md:w-1/4 rounded-md">
          <h3 class="my-4 font-bold text-2xl">Login</h3>
          <div v-show="error" class="w-full p-2 font-bold text-sm text-center bg-red-600 text-white">{{ errorMessage }}</div>
          <fieldset :disabled="disabled">
            <input type="text" @keyup="reset" v-model="username" class="bg-gray-200 my-2 px-4 py-2 focus:outline-none focus:ring focus:ring-fuchsia-600 w-full" autofocus placeholder="Username" name="username" id="username">
            <input type="password" @keyup="reset" v-model="password" class="bg-gray-200 my-2 px-4 py-2 focus:outline-none focus:ring focus:ring-fuchsia-600 w-full" placeholder="Password" name="password" id="password">
            <button v-show="!loading"  @click="loginHandler" class="my-5 px-4 py-2 rounded-lg w-1/4 bg-fuchsia-600 text-white float-right hover:bg-fuchsia-800">Masuk</button>
            <button  v-show="loading" class="my-5 px-4 py-2 rounded-lg w-1/4 bg-fuchsia-600 text-white float-right hover:bg-fuchsia-800">
              <Icon name="svg-spinners:3-dots-bounce"/>
            </button>
          </fieldset>
        </div>
      </div>
    <div class="z-1 absolute w-full h-full bg-black opacity-50"></div>
    </div>
    <!--form-->
  </div>
</template>

<script setup>
const config = useRuntimeConfig()

let username = ref();
let password = ref();
let error = ref(false)
let errorMessage = ref()
let loading = ref(false)
let disabled = ref(false)
const cookies = useCookie('auth',{})

if(cookies.value){
  navigateTo('/admin/dashboard');
}

const loginHandler = async ()=>{
  loading.value = !loading.value
  disabled.value = !disabled.value
  await useFetch(config.public.baseUrl+'/login', {
    method: 'POST',
    headers: {'Accept': 'application/json'},
    body: {
      username,password
    }
  })
  .then((d)=>{
    
    if(d.data.value != null){
      if(cookies.value){
        cookies.value = null
        console.log(d.data)
        cookies.value = d.data.value.message.token
        navigateTo('/admin/dashboard')
      } else {
        console.log(d.data)
        cookies.value = `${d.data.value.message.token}`
        navigateTo('/admin/dashboard')
      }
      
    } else{
      error.value = !error.value
      loading.value = !loading.value
      disabled.value = !disabled.value
      errorMessage = d.error.value.data.errors
    }
  });
}

const reset = ()=>{
  error.value = false
  loading.value = false
}

</script>