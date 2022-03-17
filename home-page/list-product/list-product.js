function checkFilter(inputID) {
     let listCheckbox = document.getElementsByClassName("form-check-input");
     for (let i = 0; i < listCheckbox.length; i++) {
          listCheckbox[i].checked = false;
     }

     document.getElementById(inputID).checked = true;
}

function resetFilter() {
     let listFormControll = document.querySelectorAll(".class-input");
     console.log(listFormControll)
     for (let i = 0; i < listFormControll.length; i++) {

          if (listFormControll[i].getAttribute("type") == "checkbox") {
               listFormControll[i].checked = false;
          } else {
               listFormControll[i].value = "";
          }
     }
}



// section show  filter agen
let sectionAgen = document.querySelector(".section-agen");
let sectionAgenRow = document.querySelector(".section-agen .row");
let btnFilterAgen = document.querySelectorAll(".btn-filter-agen");
function FuncFilterAgen() {
     const uiFilterProduk = document.querySelector(".filter-produk")
     for (let i = 0; i < btnFilterAgen.length; i++) {
          const element = btnFilterAgen[i];
          element.addEventListener("click", () => {
               uiFilterProduk.classList.toggle("d-block");
               sectionAgen.classList.toggle("flex-agen");
               sectionAgenRow.classList.toggle("flex-row");
               ChngeWidthProduk();
          });


     }


}

// menjalankan Fungsi event click pada button filter dan button close filter secara bersamaan
document.addEventListener("DOMContentLoaded", function () {
     FuncFilterAgen();
});

// SECTOIN CHANGE WIDTH COL ALL PRODUK
function ChngeWidthProduk() {
     const colAllProduk = document.querySelectorAll(".section-agen .card_produk .col-lg-3");
     colAllProduk.forEach(elemet => {
          elemet.classList.toggle("c-col-3");
     });
}

