/* Set rates + misc */
var taxRate = 0.05;
var shippingRate = 15.00;
var fadeTime = 300;


/* Assign actions */
$('.product-quantity input').change(function () {
     updateQuantity(this);
});

$('.product-removal button').click(function () {
     removeItem(this);
});


/* Recalculate cart */
function recalculateCart() {
     var subtotal = 0;

     /* Sum up row totals */
     $('.product').each(function () {
          subtotal += parseFloat($(this).children('.product-line-price').text());
     });

     /* Calculate totals */
     var tax = subtotal * taxRate;
     var shipping = (subtotal > 0 ? shippingRate : 0);
     var total = subtotal + tax + shipping;

     /* Update totals display */
     $('.totals-value').fadeOut(fadeTime, function () {
          $('#cart-subtotal').html(subtotal.toFixed(2));
          $('#cart-tax').html(tax.toFixed(2));
          $('#cart-shipping').html(shipping.toFixed(2));
          $('#cart-total').html(total.toFixed(2));
          if (total == 0) {
               $('.checkout').fadeOut(fadeTime);
          } else {
               $('.checkout').fadeIn(fadeTime);
          }
          $('.totals-value').fadeIn(fadeTime);
     });
}


/* Update quantity */
function updateQuantity(quantityInput) {
     /* Calculate line price */
     var productRow = $(quantityInput).parent().parent();
     var price = parseFloat(productRow.children('.product-price').text());
     var quantity = $(quantityInput).val();
     var linePrice = price * quantity;

     /* Update line price display and recalc cart totals */
     productRow.children('.product-line-price').each(function () {
          $(this).fadeOut(fadeTime, function () {
               $(this).text(linePrice.toFixed(2));
               recalculateCart();
               $(this).fadeIn(fadeTime);
          });
     });
}


/* Remove item from cart */
function removeItem(removeButton) {
     /* Remove row from DOM and recalc cart total */
     var productRow = $(removeButton).parent().parent();
     productRow.slideUp(fadeTime, function () {
          productRow.remove();
          recalculateCart();
     });
}



// HOME PAGE
let HomePage = {
     listBanner: [],
     listProduct: [],


     // GET API BANNER
     initializeBanner() {
          HomePage.listBanner = [];

          $.ajax({
               type: "GET",
               url: "./data/banner-json/banner.json",
               success: function (response) {
                    // Memastikan data ada atau tidak
                    if (response.status_code == 200) {
                         // Memasukkan data ke dalam listBanner
                         HomePage.listBanner = response.data;
                         HomePage.renderBannerSlider();
                         HomePage.renderBannerSquare();
                         HomePage.renderBannerPotrait();
                    }
               }
          });
     },

     initializeProduct() {
          HomePage.listProduct = [];
          $.ajax({
               type: "GET",
               url: "./data/list-product/list-product.json",
               success: function (response) {
                    // Memastikan data ada atau tidak
                    if (response.status_code == 200) {
                         // Memasukkan data ke dalam listBanner
                         HomePage.listProduct = response.data;
                         HomePage.renderProductRekomendasiHomePage();
                         HomePage.renderProductOnSaleHomePage();
                    }
               }
          });
     },


     intitialize() {
          HomePage.initializeBanner();
          HomePage.initializeProduct();

     },

     renderBannerSlider() {
          let listBanner = HomePage.listBanner.filter(item => item.type === "landscape_slide");
          let DomParent = document.getElementById("landscape_slide");
          let html = '';
          let indexLoop = 0;
          listBanner.forEach(item => {
               html += `<div class="carousel-item ${indexLoop == 0 ? "active" : ""}">`
               html += `  <a href="${item.link}">`
               html += `    <img src="${item.banner_path}" class="d-block w-100" alt="img">`
               html += `  </a>`
               html += `</div>`;

               indexLoop++;

          });
          DomParent.innerHTML = html;
     },
     renderProductRekomendasiHomePage() {
          let listProduct = HomePage.listProduct.filter(item => item.type == "koleksiHariIni");
          let DomParent = document.getElementById("koleksiHariIni");
          let html = '';
          listProduct.forEach(item => {
               html += `<div class="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-6">`;
               html += `<a href="index.html">`
               html += ` <div class="card card-portrait">`
               html += ` <div class="sale-percent-wrapper">`
               html += ` <div class="sale_percent d-flex align-items-center justify-content-center">-${item.discount_percent}%</div>`
               html += ` </div>`
               html += `<img loading="lazy" src="${item.photo_pet}" data-src="${item.photo_pet}" class="card-img-top lazy" alt="gambar-produk">`
               html += `<div class="card-body">`
               html += `  <h5 class="card-title">${item.product_name}</h5>`
               html += `  <div class="d-flex align-items-center">`
               html += ` <p class="card-price me-2">Rp ${item.sell_price}</p>`
               html += `  <p class="card-price corret-price">Rp ${item.scriblle_price}</p>`
               html += `  </div>`
               html += `</div>`
               html += `</div>`
               html += `</a>`
               html += `</div>`;

          });

          DomParent.innerHTML = html;
     },
     renderProductOnSaleHomePage() {
          let listProduct = HomePage.listProduct.filter(item => item.type == "On Sale");
          let DomParent = document.getElementById("onSale");
          let html = '';
          listProduct.forEach(item => {
               html += `<div class="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-6">`;
               html += `<a href="index.html">`
               html += ` <div class="card card-portrait">`
               html += ` <div class="sale-percent-wrapper">`
               html += ` <div class="sale_percent d-flex align-items-center justify-content-center">-${item.discount_percent}%</div>`
               html += ` </div>`
               html += `<img loading="lazy" src="${item.photo_pet}" data-src="${item.photo_pet}" class="card-img-top lazy" alt="gambar-produk">`
               html += `<div class="card-body">`
               html += `  <h5 class="card-title">${item.product_name}</h5>`
               html += `  <div class="d-flex align-items-center">`
               html += ` <p class="card-price me-2">Rp ${item.sell_price}</p>`
               html += `  <p class="card-price corret-price">Rp ${item.scriblle_price}</p>`
               html += `  </div>`
               html += `</div>`
               html += `</div>`
               html += `</a>`
               html += `</div>`;

          });

          DomParent.innerHTML = html;
     },



     renderBannerSquare() {
          let listBanner = HomePage.listBanner.filter(banner => banner.type == "square");
          let DomParent = document.getElementById("square");
          let html = '';

          listBanner.forEach(item => {
               html += `<a href="${item.link}">`;
               html += ` <img src="${item.banner_path}" class="img-fluid large-poster" alt="img">`;
               html += `</a>`;
          });

          DomParent.innerHTML = html;
     },

     renderBannerPotrait() {
          let listBanner = HomePage.listBanner.filter(banner => banner.type == "potrait");
          let DomParent = document.getElementById("potrait");
          let html = '';

          listBanner.forEach(item => {
               html += `<div class="col-lg-3 col-md-6 col-sm-6 col-6  mb-3">`;
               html += `  <a href="${item.link}">`;
               html += `     <img src="${item.banner_path}" class="img-fluid rounded " alt="img">`;
               html += `  </a>`;
               html += `</div>`;
          });

          DomParent.innerHTML = html;
     }

};


HomePage.intitialize();


