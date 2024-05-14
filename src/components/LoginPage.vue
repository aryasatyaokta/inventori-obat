<template>
    <section className="h-200 gradient-form">
    <div classNameName="container py-5 h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-xl-10 my-4">
        <div className="card rounded-3 text-black">
          <div className="row g-1">
            <div className="col-lg-6">
              <div className="card-body p-md-5 mx-md-4">

                <div className="text-center">
                  <h4 className="mt-1 mb-5 pb-1">Sign in</h4>
                </div>

                <form>
                  <p>Please login to your account</p>

                  <div className="form-outline mb-4">
                    <input 
                    type="email" 
                    id="form2Example11" 
                    className="form-control"
                    placeholder="Email" 
                    v-model="email"/>
                  </div>

                  <div className="form-outline mb-4">
                    <input 
                    type="password" 
                    id="form2Example22" 
                    className="form-control"  
                    placeholder="Password" 
                    v-model="password"/>
                  </div>

                  <p style="color: red" v-if="errMsg">{{ errMsg }}</p>

                  <div className="text-center pt-1 mb-5 pb-1 d-grid">
                    <button @click="signIn" className="btn btn-primary" type="button">Sign In</button>
                  </div>

                  <div className="d-flex align-items-center justify-content-center pb-4">
                    <p className="mb-0 me-2">Don't have an account?</p>
                    <router-link to="/register">
                        <button type="button" className="btn btn-outline-primary">Sign Up</button>
                    </router-link>
                  </div>

                </form>

              </div>
            </div>
            <div className="col-lg-6 align-items-center bg-primary d-flex justify-content-center">
              <div className="text-white px-5 py-5 p-md-7 mx-md-5 text-center">
                <img class="w-50" src="../assets/F2.png">
                <h4 class="my-4">FARMATICS</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
     </div>
    </div>
    </section>
</template>

<script setup>
import { ref } from 'vue';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const errMsg = ref ()
const router = useRouter();

// Membuat Fungsi Login menggunakan sessionStorage
const signIn = () => {
  signInWithEmailAndPassword(getAuth(), email.value, password.value)
    .then((userCredential) => {
      const user = userCredential.user;
      sessionStorage.setItem('userEmail', user.email);
      router.push('/');
    })
    .catch((error) => {
      console.log(error.code);
      switch (error.code) {
        case "auth/invalid-email":
            errMsg.value = "Invalid email";
            break;
        case "auth/user-not-found":
            errMsg.value = "No account with that email was found";
            break;
        case "auth/wrong-password":
            errMsg.value = "Incorrect password";
            break;
        default:
            errMsg.value = "Email or password was incorrect";
            break;
      }
    });
};

</script>
