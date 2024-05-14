<template>
    <div className='d-flex' id='wrapper'>
        <SidebarComp></SidebarComp>
        <div id='page-content-wrapper'>

        <!-- Navbar -->
        <nav class='navbar navbar-expand-lg navbar-light bg-transparent py-4 px-4'>
            <div class='d-flex align-items-center'>
                <h2 class='fs-2 m-0 third-text'>Stok Out</h2>
            </div>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <!-- Navbar items -->
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <p class="d-flex gap-2 float-right cursor-pointer">
                            <svg style="width: 1rem;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                <path
                                    d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
                            </svg>
                            Aryakk
                        </p>
                    </li>
                </ul>
            </div>
        </nav>
        <div>
            <input v-model="searchTerm" type="text" class="form-control my-3 w-50" placeholder="Search Obat..." />
        </div>
        <div class="row">
            <div class="col-md-4 my-4" v-for="obat in searchObat()" :key="obat.id" @click="OpenCloseFun(obat.id)">
                <div class="w-75 h-100" style="cursor: pointer; border-radius: 8px; background-color: lightgray">
                    <p style="font-size: 20px;">{{ obat.namaObat }}</p>
                    <div class="d-flex gap-4 justify-content-center my-3">
                        <div>
                            <p>Sediaan</p>
                            {{ obat.Sediaan }}
                        </div>
                        <div>
                            <p>Stok</p>
                            {{ obat.Stok }}
                        </div>
                        <div>
                            <p>Status</p>
                            <img v-if="obat.Stok <= 3" src="../assets/warning.png" alt="Stok Hampir Habis"
                                title="Stok Hampir Habis">
                            <img v-else src="../assets/check.png" alt="Stok Aman" title="Stok Aman">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <table class="table table-borderless bg-blue text-center border border-buttom-0">
            <thead>
                <tr class='secondary-bg text-white'>
                    <th class="text-light bg-primary" scope="col">Nama Obat</th>
                    <th class="text-light bg-primary" scope="col">Stok Keluar</th>
                    <th class="text-light bg-primary" scope="col">Tanggal Keluar</th>
                    <th class="text-light bg-primary" scope="col">Aksi</th>
                </tr>
            </thead>
            <tbody>
                <tr class='bg-white' v-for="item in stokOutData" :key="item.id">
                    <td>{{ item.namaObat }}</td>
                    <td>{{ item.Stok }}</td>
                    <td>{{ item.tanggalMasuk }}</td>
                    <td>
                        <button class="btn btn-danger mx-1" @click="deleteData(item.id)">
                            <svg fill="white" class="d-flex" style="width: 1rem;"
                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
                            </svg>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
        </div>
    </div>

    <!-- Modal Stok Masuk -->

    <div v-if="OpenClose" class="modal fade show" tabindex="-1" aria-labelledby="exampleModalLabel"
        aria-modal="true" role="dialog" style="display: block;">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Kurangi Stok Obat</h5>
                    <button type="button" class="btn-close" @click="OpenCloseFun()" data-bs-dismiss="modal"
                        aria-label="Close"></button>
                </div>
                <div class="modal-body text-start">
                    <form @submit.prevent="kurangStok">
                        <label for="">Kurangi Stok</label>
                        <div class="mb-3">
                            <input v-model="Stok" type="text" class="form-control" placeholder="Enter Stok Keluar">
                        </div>
                        <label for="">Tanggal Keluar</label>
                        <div class="mb-3">
                            <input v-model="tanggalMasuk" type="date" class="form-control">
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" @click="OpenCloseFun()" :class="'btn btn-'+variant"
                        data-bs-dismiss="modal">Close</button>
                    <button type="submit" @click="kurangStok" class="btn btn-primary">Save changes</button>
                </div>
            </div>
        </div>
    </div>

    <!-- -------- -->

</template>

<script setup>
import SidebarComp from "./SidebarComp.vue"
import { ref, onMounted } from 'vue'
import { onSnapshot, collection, doc, updateDoc, addDoc, deleteDoc } from 'firebase/firestore'
import {db} from '../FirebaseConfig'

const OpenClose = ref(false);
const Stok = ref('');
const obatList = ref([]);
const obatCollection = collection(db, 'obat');
let selectedObatId = null;
const searchTerm = ref('');
const tanggalMasuk = ref('');

const collectionRefStokOut = collection(db, 'stokOut');
const stokOutData = ref([]);

//Get Data Obat dan Stok
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

    onSnapshot(collectionRefStokOut, (snapshot) => {
        stokOutData.value = snapshot.docs.map(doc => ({
            id: doc.id,
            namaObat: doc.data().namaObat,
            Stok: doc.data().Stok,
            tanggalMasuk: doc.data().tanggalMasuk
        }));
    });
});

//Open Close Modal Tambah Stok
const OpenCloseFun = (obatId) => {
    OpenClose.value = !OpenClose.value;
    selectedObatId = obatId;
}

//Fungsi Kurangi Stok
const kurangStok = async () => {
    if (!Stok.value || !tanggalMasuk.value) {
        alert('Please enter the stock and date.');
        return;
    }
    const newStock = parseInt(Stok.value);
    const selectedObat = obatList.value.find(obat => obat.id === selectedObatId);
    if (!selectedObat) {
        alert('Invalid selected medicine.');
        return;
    }

    const obatDocRef = doc(db, 'obat', selectedObatId);
    await updateDoc(obatDocRef, {
        Stok: selectedObat.Stok - newStock
    });

    await addDoc(collectionRefStokOut, {
        namaObat: selectedObat.namaObat,
        Stok: newStock,
        tanggalMasuk: tanggalMasuk.value
    });

    OpenCloseFun();
    Stok.value = '';
    tanggalMasuk.value = '';
}

//Fungsi Search Obat
const searchObat = () => {
    return obatList.value.filter(obat => {
        return obat.kodeObat.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
               obat.namaObat.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
               obat.Sediaan.toLowerCase().includes(searchTerm.value.toLowerCase());
    });
};

//Delete Data Stok Out
const deleteData = async (itemId) => {
    if (confirm("Apakah kamu yakin ingin menghapus data ini?")) {
        try {
            await deleteDoc(doc(db, 'stokOut', itemId));
            alert('Data deleted successfully.');
        } catch (error) {
            console.error('Error deleting data:', error);
            alert('An error occurred while deleting data.');
        }
    }
};


</script>