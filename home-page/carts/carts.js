


$.ajax({
     type: "GET",
     url: "./datacarts.json",
     success: function (response) {
          let parentCheckoutProduk = document.querySelector(".items-product-cart");
          let html = '';

          response.data.forEach((dataCart, id) => {
               html += `<div class="item">`;
               html += `<div class="item-main">`
               html += `<div class="produk-main">`
               html += `<img src="${dataCart.cart_img}" alt="">`
               html += `</div>`
               html += `<div class="produk-content">`
               html += `<a href="cart.html">`
               html += `<h2 class="title mb-0">${dataCart.cart_name}</h2>`
               html += `</a>`
               html += `<div class="text-muted d-flex align-items-center qty"> Qty :`
               html += `<div class="input-jumlah mx-3 m-2">`
               html += `<button  class="btn btn-primary btn-sm mx-2 bgr-btn-mobile" onclick="calculatePrice('minus')" type="button" id="btnMinusStok${dataCart.cart_id}">-</button>`
               html += `<span id="valueStok">${dataCart.cart_jumlah_barang}</span>`
               html += `<button class="btn btn-primary btn-sm mx-2 bgr-btn-mobile" onclick="calculatePrice('plus')" type="button" id="btnPlusStok${dataCart.cart_id}">+ </button>`
               html += `<input type="hidden" value="${dataCart.stok}" id="inputStokHidden">`
               html += `</div>`
               html += `</div>`
               html += `</small>`
               html += `<h3 class="price mt-0 mb-0">${dataCart.cart_harga}</h3>`
               html += `<div class="clearfix"></div>`
               html += `</div>`
               html += `</div>`
               html += `<a  href="carts.html">`
               html += `<svg  id="hapusItemCart${dataCart.cart_id}"  xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash remove-cart text-danger" viewBox="0 0 16 16"> <path     d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />           <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" /> </svg>`
               html += `</a>`
               html += `</div>`
               html += `<hr />`;
          });

          parentCheckoutProduk.innerHTML += html;

     },

     error: function (reject) {
          alert("EROR GET API CART" + reject)

     }
});
const calculatePrice = (action, id) => {
     console.log(id)
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