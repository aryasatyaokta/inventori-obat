<template>
    <div className='bg-white p-5 third-text border border-white fixed-start mt-4 mb-4 rounded-5 mx-5'>
        <div className='sidebar-heading text-center fs-2 d-flex'>
          <img class="w-50" src="../assets/F.png">
          <i className='p-2'></i> Farmatics
        </div>
        <div className='list-group list-group-flush my-5 text-start gap-3'>
          <router-link to="/" class="text-decoration-none">
            <a href='#' class='list-group-item list-group-item-action bg-transparent second-text py-1 border-0 d-flex gap-2'>
               <svg style="width: 1.5rem;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm320 96c0-26.9-16.5-49.9-40-59.3V88c0-13.3-10.7-24-24-24s-24 10.7-24 24V292.7c-23.5 9.5-40 32.5-40 59.3c0 35.3 28.7 64 64 64s64-28.7 64-64zM144 176a32 32 0 1 0 0-64 32 32 0 1 0 0 64zm-16 80a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm288 32a32 32 0 1 0 0-64 32 32 0 1 0 0 64zM400 144a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"/></svg>
               Dashboard
            </a>
          </router-link>
          <router-link to="/obat" class="text-decoration-none">
            <a href='#' className='list-group-item list-group-item-action bg-transparent  border-0 d-flex gap-2'>
              <svg style="width: 1.5rem;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M614.3 247c16.3-25 25.7-54.9 25.7-87C640 71.6 568.4 0 480 0c-32.1 0-61.9 9.4-87 25.7c-7.9 5.2-8.5 16.2-1.8 22.9L591.4 248.8c6.7 6.7 17.8 6.2 22.9-1.8zM567 294.3c7.9-5.2 8.5-16.2 1.8-22.9L368.6 71.2c-6.7-6.7-17.8-6.2-22.9 1.8c-16.3 25-25.7 54.9-25.7 87c0 88.4 71.6 160 160 160c32.1 0 61.9-9.4 87-25.7zM301.5 368H18.5c-9.5 0-16.9 8.2-15 17.5C18.9 457.8 83.1 512 160 512s141.1-54.2 156.5-126.5c2-9.3-5.5-17.5-15-17.5zm0-32c9.5 0 16.9-8.2 15-17.5C301.1 246.2 236.9 192 160 192S18.9 246.2 3.5 318.5c-2 9.3 5.5 17.5 15 17.5H301.5z"/></svg>  
              Obat
            </a>
          </router-link>
          <router-link to="/stokin" class="text-decoration-none">
            <a href='#' className='list-group-item list-group-item-action bg-transparent second-text border-0 d-flex gap-2'>
              <svg style="width: 1.5rem;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M384 160c-17.7 0-32-14.3-32-32s14.3-32 32-32H544c17.7 0 32 14.3 32 32V288c0 17.7-14.3 32-32 32s-32-14.3-32-32V205.3L342.6 374.6c-12.5 12.5-32.8 12.5-45.3 0L192 269.3 54.6 406.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l160-160c12.5-12.5 32.8-12.5 45.3 0L320 306.7 466.7 160H384z"/></svg>  
              Stok In
            </a>
          </router-link>
          <router-link to="/stokout" class="text-decoration-none">
            <a href='#' className='list-group-item list-group-item-action bg-transparent second-text border-0 d-flex gap-2'>
              <svg style="width: 1.5rem;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M384 352c-17.7 0-32 14.3-32 32s14.3 32 32 32H544c17.7 0 32-14.3 32-32V224c0-17.7-14.3-32-32-32s-32 14.3-32 32v82.7L342.6 137.4c-12.5-12.5-32.8-12.5-45.3 0L192 242.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0L320 205.3 466.7 352H384z"/></svg>
              Stok Out
            </a>
          </router-link>
          <router-link to="/analytics" class="text-decoration-none">
            <a href='#' className='list-group-item list-group-item-action bg-transparent second-text border-0 d-flex gap-2'>
              <svg style="width: 1.5rem;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M64 64c0-17.7-14.3-32-32-32S0 46.3 0 64V400c0 44.2 35.8 80 80 80H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H80c-8.8 0-16-7.2-16-16V64zm406.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L320 210.7l-57.4-57.4c-12.5-12.5-32.8-12.5-45.3 0l-112 112c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L240 221.3l57.4 57.4c12.5 12.5 32.8 12.5 45.3 0l128-128z"/></svg>
              Analytics
            </a>
          </router-link>
          <a @click="handleSignOut" v-if="isLoggedIn" href='#' className='list-group-item list-group-item-action bg-transparent text-danger py-5 d-flex gap-2'>
            <svg fill="red" style="width: 1.5rem;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"/></svg>
            Logout
          </a>
        </div>
      </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "vue-router";

const isLoggedIn = ref(false);
const router = useRouter();

let auth;

onMounted(() => {
   auth = getAuth();
   onAuthStateChanged(auth, (user) => {
     if (user) {
        isLoggedIn.value = true;
     } else{
        isLoggedIn.value = false;
     } 
   });
});

//Fungsi Logout
const handleSignOut = () => {
    signOut(auth).then(() => {
        router.push("/login")
    })
}

</script>

<style>
  .router-link-exact-active {
    color: blue; 
    font-weight: bold;
  }

  .router-link-exact-active:hover {
    text-decoration: underline;
    color: blue;
  }
</style>