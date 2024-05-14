 <template>
    <div class="d-flex">
      <SidebarComp></SidebarComp>
      <div id='page-content-wrapper'>

      <nav className='navbar navbar-expand-lg navbar-light bg-tranparent py-4 px-4'>
        <div className='d-flex align-items-center'>
          <h2 className='fs-2 m-0 third-text'>Dashboard</h2>
        </div>


        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                  data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                  aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
              </button>

              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                  <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                      <li className="nav-item">
                        <p class="d-flex gap-2 float-right cursor-pointer">
                          {{ username }}
                          <svg style="width: 1rem;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/></svg>
                        </p>
                      </li>
                  </ul>
              </div>
          </nav>

          <div className="container-fluid px-4">

              <div className="row my-5">
                  <div className="col">
                    <div className='d-flex'>
                      <div>
                          <h3 className='py-5 text-primary text-start'>Selamat Datang di Inventaris Farmatics</h3>
                          <div className='d-flex'>
                          <div className="col-md-3 text-center " style="width: 75%;">
                            <div className="p-3 bg-white shadow-sm d-flex rounded">      
                              <div>
                                  <h3 className="fs-2">{{ obatList.length }}</h3>
                                  <p className="fs-5">Jenis Obat</p>
                              </div>
                              <i className="fs-1 primary-text border-none rounded-xl secondary-bg p-3" ><svg style="width: 50%;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M614.3 247c16.3-25 25.7-54.9 25.7-87C640 71.6 568.4 0 480 0c-32.1 0-61.9 9.4-87 25.7c-7.9 5.2-8.5 16.2-1.8 22.9L591.4 248.8c6.7 6.7 17.8 6.2 22.9-1.8zM567 294.3c7.9-5.2 8.5-16.2 1.8-22.9L368.6 71.2c-6.7-6.7-17.8-6.2-22.9 1.8c-16.3 25-25.7 54.9-25.7 87c0 88.4 71.6 160 160 160c32.1 0 61.9-9.4 87-25.7zM301.5 368H18.5c-9.5 0-16.9 8.2-15 17.5C18.9 457.8 83.1 512 160 512s141.1-54.2 156.5-126.5c2-9.3-5.5-17.5-15-17.5zm0-32c9.5 0 16.9-8.2 15-17.5C301.1 246.2 236.9 192 160 192S18.9 246.2 3.5 318.5c-2 9.3 5.5 17.5 15 17.5H301.5z"/></svg>  </i>
                            </div>
                          </div>

                
                          </div>
                      </div>
                      <img style="width: 50%;" src="../assets/dashboard.png" alt="" />
                    </div>
                    <table class="table table-hover my-3">
                      <thead>
                        <tr>
                          <th class="text-light bg-primary" scope="col">Kode Obat</th>
                          <th class="text-light bg-primary" scope="col">Nama Obat</th>
                          <th class="text-light bg-primary" scope="col">Sediaan</th>
                          <th class="text-light bg-primary" scope="col">Stok</th>
                          <th class="text-light bg-primary" scope="col">Status Stok</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="obat in obatList" :key="obat.id">
                            <td>{{ obat.kodeObat }}</td>
                            <td>{{ obat.namaObat }}</td>
                            <td>{{ obat.Sediaan }}</td>
                            <td>{{ obat.Stok }}</td>
                            <td>
                              <img v-if="obat.Stok <= 3" src="../assets/warning.png" alt="Stok Hampir Habis"
                                title="Stok Hampir Habis">
                              <img v-else src="../assets/check.png" alt="Stok Aman" title="Stok Aman">
                            </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
              </div>

          </div>

      </div>
    </div>
</template>

<script setup>
import SidebarComp from './SidebarComp.vue';
import { ref, onMounted } from 'vue'
import { onSnapshot, collection } from 'firebase/firestore'
import {db} from '../FirebaseConfig'

const obatList = ref([]);
const obatCollection = collection(db, 'obat');
const userEmail = ref(sessionStorage.getItem('userEmail'));


// get nama dari email tanpa @
const username = ref('');
if (userEmail.value) {
  const atIndex = userEmail.value.indexOf('@');
  username.value = atIndex !== -1 ? userEmail.value.slice(0, atIndex) : userEmail.value;
}

// Get data Obat
onMounted(() => {
    onSnapshot(obatCollection, (snapshot) => {
        obatList.value = snapshot.docs.map(doc => ({
            id: doc.id,
            kodeObat: doc.data().kodeObat,
            namaObat: doc.data().namaObat,
            Sediaan: doc.data().Sediaan,
            Stok: doc.data().Stok
        }));
    });
});

</script>


