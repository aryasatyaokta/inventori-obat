<template>
    <div class="d-flex">
        <SidebarComp></SidebarComp>
        <div id='page-content-wrapper'>

            <!-- Navbar -->
            <nav class='navbar navbar-expand-lg navbar-light bg-transparent py-4 px-4'>
                <div class='d-flex align-items-center'>
                    <h2 class='fs-2 m-0 third-text'>Obat</h2>
                </div>
                <!-- Navbar toggle button -->
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

            <!-- Main content -->
            <div class="container-fluid px-4">
                <div class="row my-5">
                    <div class="col">
                        <div class='d-flex justify-content-between'>
                            <div>
                                <!-- Button to open modal -->
                                <button class='btn btn-primary my-3' type="button" @click="OpenCloseFun()">
                                    <svg class="mx-1" fill="white" style="width: 1rem"
                                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                        <path
                                            d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM232 344V280H168c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H280v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z" />
                                    </svg>Tambah Data
                                </button>
                            </div>
                            <div>
                                <input v-model="searchTerm" @input="searchObat" type="text" class="form-control my-3" placeholder="Search Obat..." />
                            </div>
                        </div>
                        <!-- Table -->
                        <table class="table table-borderless bg-blue text-center border border-buttom-0">
                            <thead>
                                <tr class='secondary-bg text-white'>
                                    <th class="text-light bg-primary" scope="col">Kode Obat</th>
                                    <th class="text-light bg-primary" scope="col">Nama Obat</th>
                                    <th class="text-light bg-primary" scope="col">Sediaan</th>
                                    <th class="text-light bg-primary" scope="col">Stok</th>
                                    <th class="text-light bg-primary" scope="col">Status Stok</th>
                                    <th class="text-light bg-primary" scope="col">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="obat in searchObat()" :key="obat.id" class='bg-white'>
                                    <td>{{ obat.kodeObat }}</td>
                                    <td>{{ obat.namaObat }}</td>
                                    <td>{{ obat.Sediaan }}</td>
                                    <td>{{ obat.Stok }}</td>
                                    <td>
                                        <img v-if="obat.Stok <= 3" src="../assets/warning.png" alt="Stok Hampir Habis"
                                            title="Stok Hampir Habis">
                                        <img v-else src="../assets/check.png" alt="Stok Aman" title="Stok Aman">
                                    </td>
                                    <td>
                                        <button class="btn btn-warning" @click="openUpdateModal(obat)">
                                            <svg fill="white" class="d-flex" style="width: 1rem;"
                                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                                <path
                                                    d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" />
                                            </svg>
                                        </button>
                                        <button class="btn btn-danger mx-1" @click="deleteData(obat)">
                                            <svg fill="white" class="d-flex" style="width: 1rem;"
                                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                                <path
                                                    d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
                                            </svg>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal Tambah Data -->
    <div v-if="OpenClose" class="modal fade show" tabindex="-1" aria-labelledby="exampleModalLabel"
        aria-modal="true" role="dialog" style="display: block;">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Tambah Data Obat</h5>
                    <button type="button" class="btn-close" @click="OpenCloseFun()" data-bs-dismiss="modal"
                        aria-label="Close"></button>
                </div>
                <div class="modal-body text-start">
                    <form @submit.prevent="submitObat">
                        <label for="">Kode Obat</label>
                        <div class="mb-3">
                            <input v-model="kodeObat" type="text" class="form-control" placeholder="Enter Kode Obat">
                        </div>
                        <label for="">Nama Obat</label>
                        <div class="mb-3">
                            <input v-model="namaObat" type="text" class="form-control"
                                placeholder="Enter Nama Obat">
                        </div>
                        <label for="">Sediaan</label>
                        <div class="mb-3">
                            <input v-model="sediaan" type="text" class="form-control"
                                placeholder="Enter Sediaan">
                        </div>
                        <label for="">Stok</label>
                        <div class="mb-3">
                            <input v-model.number="stok" type="number" class="form-control"
                                placeholder="Enter Stok">
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" @click="OpenCloseFun()" :class="'btn btn-'+variant"
                        data-bs-dismiss="modal">Close</button>
                    <button type="submit" @click="submitObat" class="btn btn-primary">Save changes</button>
                </div>
            </div>
        </div>
    </div>
    <!-- -------- -->

    <!-- Modal Update Data -->
    <div v-if="updateModalOpen" class="modal fade show" tabindex="-1" aria-labelledby="exampleModalLabel" aria-modal="true" role="dialog" style="display: block;">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Update Data Obat</h5>
                        <button type="button" class="btn-close" @click="closeUpdateModal()" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body text-start">
                        <form @submit.prevent="updateObat">
                            <label for="">Kode Obat</label>
                            <div class="mb-3">
                                <input v-model="selectedObat.kodeObat" type="text" class="form-control" id="updateKodeObat" placeholder="Enter Kode Obat">
                            </div>
                            <label for="">Nama Obat</label>
                            <div class="mb-3">
                                <input v-model="selectedObat.namaObat" type="text" class="form-control" id="updateNamaObat" placeholder="Enter Nama Obat">
                            </div>
                            <label for="">Sediaan</label>
                            <div class="mb-3">
                                <input v-model="selectedObat.Sediaan" type="text" class="form-control" id="updateSediaan" placeholder="Enter Sediaan">
                            </div>
                            <label for="">Stok</label>
                            <div class="mb-3">
                                <input v-model.number="selectedObat.Stok" type="number" class="form-control" id="updateStok" placeholder="Enter Stok">
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" @click="closeUpdateModal()" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="submit" @click="updateObat" class="btn btn-primary">Save changes</button>
                    </div>
                </div>
            </div>
    </div>
    <!-- -------- -->
</template>

<script setup>
import SidebarComp from "./SidebarComp.vue"
import { ref, onMounted } from 'vue'
import { onSnapshot, collection, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore'
import {db} from '../FirebaseConfig'

const kodeObat = ref('');
const namaObat = ref('');
const sediaan = ref('');
const stok = ref('');

// Close Modal Tambah
const OpenClose = ref(false);

const selectedObat = ref('');
const updateModalOpen = ref(false);

const searchTerm = ref('');


const obatList = ref([]);
const obatCollection = collection(db, 'obat');

//Get data obat
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

//Fungsi Create data Obat
const submitObat = async () => {
    try {
        await addDoc(obatCollection, {
            kodeObat: kodeObat.value,
            namaObat: namaObat.value,
            Sediaan: sediaan.value,
            Stok: stok.value
        });

        OpenClose.value = !OpenClose.value;

        kodeObat.value = '';
        namaObat.value = '';
        sediaan.value = '';
        stok.value = '';
    } catch (error) {
        console.error("Error adding document: ", error);
    }
}

// Open Modal Create
const OpenCloseFun = () => {
    OpenClose.value = !OpenClose.value;
}

//Open Modal Update
const openUpdateModal = (obat) => {
    selectedObat.value = obat;
    updateModalOpen.value = true;
};

//Close Modal Update
const closeUpdateModal = () => {
    selectedObat.value = null;
    updateModalOpen.value = false;
};

//Fungsi Update Obat
const updateObat = async () => {
    try {
        if (!selectedObat.value) {
            console.error("Selected obat is null or undefined.");
            return;
        }

        const obatRef = doc(db, 'obat', selectedObat.value.id);
        await updateDoc(obatRef, {
            kodeObat: selectedObat.value.kodeObat,
            namaObat: selectedObat.value.namaObat,
            Sediaan: selectedObat.value.Sediaan,
            Stok: selectedObat.value.Stok
        });
        closeUpdateModal();
    } catch (error) {
        console.error("Error updating document: ", error);
    }
};

//Fungsi Delete Obat
const deleteData = (obat) => {
    if (confirm("Apakah kamu yakin ingin menghapus data ini?")) {
        try {
            const obatRef = doc(db, 'obat', obat.id);
            deleteDoc(obatRef);
        } catch (error) {
            console.error("Error deleting document: ", error);
        }
    }
};

//Fungsi Search Obat
const searchObat = () => {
    return obatList.value.filter(obat => {
        return obat.kodeObat.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
               obat.namaObat.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
               obat.Sediaan.toLowerCase().includes(searchTerm.value.toLowerCase());
    });
};


</script>
