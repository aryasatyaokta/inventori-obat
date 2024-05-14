import "bootstrap/dist/css/bootstrap.css"
import "bootstrap/dist/js/bootstrap.js"
import { createApp } from 'vue'
import App from './App.vue'

import LoginPage from "./components/LoginPage.vue"
import RegisterPage from "./components/RegisterPage.vue"
import DashboardPage from "./components/DashboardPage.vue"
import ObatPage from "./components/ObatPage.vue"
import StokinPage from "./components/StokinPage.vue"
import StokoutPage from "./components/StokoutPage.vue"

import { createRouter, createWebHistory } from "vue-router"

import { initializeApp } from "firebase/app";
import {getAuth, onAuthStateChanged} from 'firebase/auth'
import { getFirestore } from "firebase/firestore"
import AnalyticsPage from "./components/AnalyticsPage.vue"

//Firebase Config
const firebaseConfig = {
    apiKey: "AIzaSyAFL5LTHeblXwTFdvqPMfA1c-aVBXMFwRM",
    authDomain: "vue-invent.firebaseapp.com",
    projectId: "vue-invent",
    storageBucket: "vue-invent.appspot.com",
    messagingSenderId: "568250850294",
    appId: "1:568250850294:web:422b2295a10a8e6c1105d7"
};


const firebase = initializeApp(firebaseConfig);
const auth = getAuth(firebase);
const db = getFirestore(firebase)
  
//Routing Page
  const router = createRouter({
    history: createWebHistory(),
    routes: [
      { path: "/", component: DashboardPage }, 
      { path: "/login", component: LoginPage },
      { path: "/register", component: RegisterPage },
      { path: "/obat", component: ObatPage }, 
      { path: "/stokin", component: StokinPage }, 
      { path: "/stokout", component: StokoutPage }, 
      { path: "/analytics", component: AnalyticsPage }, 
    ],
  });

  router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    const currentUser = auth.currentUser;
  
    if (requiresAuth && !currentUser) {
      next('/login');
    } else {
      next();
    }
  });
  
  // Firebase Authentication State Change Listener
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      router.push('/login');
    }
  });

export {auth}
export {db}

createApp(App).use(router).mount('#app')