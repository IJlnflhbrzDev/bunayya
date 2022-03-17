let arrDataLocalStorageSaveGlobal = [];

function mySave() {
     let iconCartDekstop = document.querySelector(".badge-notification-dekstop");
     let iconCartMobile = document.querySelector(".badge-notification-mobile");
     let valueStok = parseInt(document.getElementById("valueStok").innerHTML);
     if (arrDataLocalStorageSaveGlobal.length > 0) {
          let cartExists = localStorage.getItem("dataFilter");
          arrDataLocalStorageSaveGlobal[0].buy_stok = valueStok;


          if (cartExists) {
               let dataCart = JSON.parse(cartExists);
               let findData = dataCart.filter(item => {
                    return item.product_id == arrDataLocalStorageSaveGlobal[0].product_id;
               });
               if (findData.length > 0) {

                    findData[0].buy_stok + valueStok;
                    console.log(findData[0].buy_stok)
                    console.log(findData)

               } else {
                    dataCart.push(arrDataLocalStorageSaveGlobal[0]);
                    localStorage.setItem("dataFilter", JSON.stringify(dataCart));
                    alert("Sukses menambahkan abc ke keranjang!");
                    let test = JSON.parse(localStorage.getItem("dataFilter"));
                    iconCartDekstop.setAttribute("data-count", test.length)
                    iconCartDekstop.textContent = test.length;
                    iconCartMobile.setAttribute("data-count", test.length)
                    iconCartMobile.textContent = test.length;
                    console.log(arrDataLocalStorageSaveGlobal);
                    console.log(test);
               }
          } else {
               let cartData = JSON.stringify([arrDataLocalStorageSaveGlobal[0]]);
               localStorage.setItem("dataFilter", cartData);
               alert("Sukses menambahkan ke keranjang!");
               let test = JSON.parse(localStorage.getItem("dataFilter"));
               iconCartDekstop.setAttribute("data-count", test.length)
               iconCartDekstop.textContent = test.length;
               iconCartMobile.setAttribute("data-count", test.length)
               iconCartMobile.textContent = test.length;
          }
     }
}

// clear data in localstorage ketika user menutup halaman web
window.onbeforeunload = clossingWeb;
function clossingWeb() {
     window.localStorage.clear();
     return null;
}

// PRODUK-DETAIL
let listVariant = [];
let typeVariant = [];
let variant1 = [];
let variant2 = [];
let variant3 = [];
let choiceArrayVariant = [];

let existsVariant = document.querySelector("#inputHiddenExistsVariant").value;
if (existsVariant == "1") {
     getDataVariant();
     drawSelectvariant();
}

function getDataVariant() {
     $.ajax({
          url: `./variant.json`,
          type: "GET",
          success: function (response) {
               if (response.found) {
                    listVariant = response.data.list_variant;
                    typeVariant = response.data.type_variant;
                    variant1 = response.data.variant1;
                    variant2 = response.data.variant2;
                    variant3 = response.data.variant3;
                    drawSelectvariant();
               }
          }
     })
}

function drawSelectvariant() {
     let html = "";
     let index = 0;

     typeVariant.forEach(item => {
          html += `<select class="form-select" onchange="choiceVariant(${index})" id="selectVariant${index}" name="variant${index}">`;
          html += `<option value="">${item}</option>`;
          let useDatavariant = "";
          if (index == 0) {
               useDatavariant = variant1;
          } else if (index == 1) {
               useDatavariant = variant2;
          } else {
               useDatavariant = variant3;
          }
          useDatavariant.forEach(variants => {
               html += `<option value="${variants}">${variants}</option>`;
          });
          html += `</select>`;
          index++;
     });
     document.querySelector("#templateListVariant").innerHTML = html;
}

function choiceVariant(index) {
     let selectValue = document.querySelector(`#selectVariant${index}`).value;
     choiceArrayVariant[index] = selectValue;

     selectionVarian();
}

function selectionVarian() {
     let results = listVariant.filter(item => {
          let value1 = "";
          let value2 = "";
          let value3 = "";

          let index = 1;
          choiceArrayVariant.forEach(variant => {
               if (index == 1) {
                    value1 = variant;
               }
               if (index == 2) {
                    value2 = variant;
               }
               if (index == 3) {
                    value3 = variant;
               }
               index++;

          });

          // Debugging
          return item.variant1_value == value1 && item.variant2_value == value2 && item.variant3_value == value3;
     });

     arrDataLocalStorageSaveGlobal = results;

     results.forEach(function (dataFilter) {
          const btnAddToCart = document.getElementById("btnAddToCart");
          btnAddToCart.addEventListener("click", function () {
               mySave();
               let valueStok = document.getElementById("valueStok");
               valueStok.innerHTML = 1;
          });
          // let localStorageDataFilter = JSON.parse(JSON.stringify(dataFilter));

          // draw price
          let draw_price = document.querySelector(".price-produk-detil");
          let htmlDrawPrice = ``;
          htmlDrawPrice += `<p class="price-detail-corret"> ${dataFilter.harga_corret}</p>`;
          htmlDrawPrice += `<p class="price-detail"> ${dataFilter.harga}</p>`;
          draw_price.innerHTML = htmlDrawPrice;

          // draw imgLarge
          let imageLarge = document.querySelector(".image-large");
          let drawImageLarge = '';
          drawImageLarge += `<img src="${dataFilter.gambar}" alt="produk-detail" class="thumbnail" id="change-img">`

          imageLarge.innerHTML = drawImageLarge;


          // draw stok
          let draw_stok = document.querySelector(".draw_stok");
          let htmlDrawStok = '';
          if (dataFilter.stok < 1) {
               htmlDrawStok += `<th scope="row">Stok</th>`;
               htmlDrawStok += `<td style="color: red ;">${dataFilter.stok}</td>`;
          } else {
               htmlDrawStok += `<th scope="row">Stok</th>`;
               htmlDrawStok += `<td>${dataFilter.stok}</td>`;

               let inputHiddens = document.querySelector(".inputHiddens");
               let drawInputHiddens = ``;
               drawInputHiddens += `<input type="hidden" value="${dataFilter.harga}" id="inputHargaHidden">`
               drawInputHiddens += `<input type="hidden" value="${dataFilter.stok}" id="inputStokHidden">`

               inputHiddens.innerHTML = drawInputHiddens;
          }

          draw_stok.innerHTML = htmlDrawStok

          // let btnPlusStok = document.getElementById("btnPlusStok");
          // let btnMinusStok = document.getElementById("btnMinusStok");
          // if (btnPlusStok) {
          //      document.getElementById("btnPlusStok").addEventListener("click", function (e) {
          //           calculatePrice("plus")
          //      });
          // }
          // if (btnMinusStok) {
          //      document.getElementById("btnMinusStok").addEventListener("click", function (e) {
          //           calculatePrice("minus")
          //      });
          // }
     });
}


//Number Format
const numberFormat = (value) => {
     if (value.toString()[0] == "-") {
          var negative = "-";
     } else {
          negative = "";
     }
     var raw = value.toString().replace(/(?!\.)\D/g, "").split(".");
     var whole = raw[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
     var decimal = false;
     if (raw.length > 1) {
          decimal = raw[1];
     }
     if (decimal !== false && (decimal !== "0" || decimal !== "00")) {
          return negative + whole + "." + decimal;
     } else {
          return negative + whole;
     }
}

// SECTION DOM PRICE & STOK START



const calculatePrice = (action) => {
     console.log(action);
     // let price = parseInt(document.getElementById("inputHargaHidden").value);
     // let tagPrice = document.getElementById("valueTotalPrice");
     let availableStok = parseInt(document.getElementById("inputStokHidden").value);
     let tagStok = document.getElementById("valueStok");
     let nowStok = parseInt(tagStok.innerText);

     if (action == "minus") {
          nowStok--;

          if (nowStok < 1) {
               alert("Stok tidak boleh dibawah satu!");
               tagStok.innerText = 1;
               nowStok = 1;
          } else {
               tagStok.innerText = nowStok;
          }
     } else {
          nowStok++;

          if (nowStok > availableStok) {
               alert("Stok melebihi jumlah yang tersedia");
               nowStok = availableStok;
          } else {
               tagStok.innerText = nowStok;
          }
     }

     // let totalPrice = price * nowStok;
     // tagPrice.innerText = `Rp. ${numberFormat(totalPrice)}`;
}


// EVENT CLICK CHANGE SRC IMAGE LARGE
const container_produk_image = document.querySelector(".produk-image");
const imgLarge = document.querySelector(".thumbnail");

function bindListeners() {
     container_produk_image.addEventListener("mouseover", function (e) {
          // membuat kondisi ketika event click container img ini meng klik sebuah salah satu gambar small
          if (e.target.className == "thumb-small") {
               imgLarge.src = e.target.src;
               imgLarge.classList.add("fade");

               setTimeout(() => {
                    imgLarge.classList.remove("fade")
               }, 500);
          }
     });
}
if (container_produk_image) {
     bindListeners();
} else {
}