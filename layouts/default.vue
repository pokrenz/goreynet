<template>
    <div class="relative h-screen w-100 bg-no-repeat bg-cover bg-bottom bg-[url('/assets/images/network_bg.jpg')]">
        <div class="z-10 absolute flex justify-center items-center h-full w-full">
            <slot />
        </div>
        <div class="z-1 absolute w-full h-full bg-black opacity-50"></div>
    </div>
</template>