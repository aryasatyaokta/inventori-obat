<template>
  <div class="d-flex">
    <SidebarComp></SidebarComp>
    <div id="page-content-wrapper">
      <nav class="navbar navbar-expand-lg navbar-light bg-transparent py-4 px-4">
        <div class="d-flex align-items-center">
          <h2 class="fs-2 m-0 third-text">Analytics</h2>
        </div>
      </nav>
      <div class="container-fluid px-4">
        <div class="row my-5">
          <button  @click="printCharts" class="btn btn-primary w-50">Print Analytics</button>
          <div class="col">
            <canvas id="stokInChart" ref="stokInChart" width="600" height="400"></canvas>
          </div>
        </div>
        <div class="row my-5">
          <div class="col">
            <canvas id="stokOutChart" ref="stokOutChart" width="600" height="400"></canvas>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import SidebarComp from "./SidebarComp.vue";
import { onMounted, ref } from "vue";
import Chart from "chart.js/auto";
import { db } from "../FirebaseConfig";
import { collection, onSnapshot } from "firebase/firestore";

const collectionRefStokIn = collection(db, "stokIn");
const stokInData = ref([]);

onMounted(() => {
  onSnapshot(collectionRefStokIn, (snapshot) => {
    stokInData.value = snapshot.docs.map((doc) => ({
      id: doc.id,
      namaObat: doc.data().namaObat,
      Stok: doc.data().Stok,
      tanggalMasuk: doc.data().tanggalMasuk,
    }));
    createStokInChart();
  });
});

const collectionRefStokOut = collection(db, "stokOut");
const stokOutData = ref([]);

onMounted(() => {
  onSnapshot(collectionRefStokOut, (snapshot) => {
    stokOutData.value = snapshot.docs.map((doc) => ({
      id: doc.id,
      namaObat: doc.data().namaObat,
      Stok: doc.data().Stok,
      tanggalMasuk: doc.data().tanggalMasuk,
    }));
    createStokOutChart();
  });
});

const createStokInChart = () => {
  const stokInChartCanvas = document.getElementById("stokInChart");
  if (stokInChartCanvas) {
    new Chart(stokInChartCanvas, {
      type: "line",
      data: {
        labels: stokInData.value.map((item) => item.tanggalMasuk),
        datasets: [
          {
            label: "Stok In",
            data: stokInData.value.map((item) => item.Stok),
            backgroundColor: "rgba(24, 105, 255, 0.2)",
            borderColor: "#1869FF",
            borderWidth: 2,
            pointRadius: 4,
            pointBackgroundColor: "#1869FF",
            pointBorderColor: "transparent",
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
};

const createStokOutChart = () => {
  const stokOutChartCanvas = document.getElementById("stokOutChart");
  if (stokOutChartCanvas) {
    new Chart(stokOutChartCanvas, {
      type: "line",
      data: {
        labels: stokOutData.value.map((item) => item.tanggalMasuk),
        datasets: [
          {
            label: "Stok Out",
            data: stokOutData.value.map((item) => item.Stok),
            backgroundColor: "#7D0A0A",
            borderColor: "#FE0000",
            borderWidth: 2,
            pointRadius: 4,
            pointBackgroundColor: "#FE0000",
            pointBorderColor: "transparent",
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
};

const printCharts = () => {
  window.print();
};
</script>
