window.shop = {
  API_BASE_URL: "http://localhost:8085",

  getProducts:function () {
      $.ajax({
          url: shop.API_BASE_URL + "/products",
          method: "GET"

      }).done (function (response) {
          console.log(response);
          shop.displayProducts(response.content);
      })
  },


    displayProducts:function (products) {
      var allProductsHtml = "";
      products.forEach(product => allProductsHtml += shop.getProductHtml(product));
        $(".single-product-area .row").html(allProductsHtml);
    },

    getProductHtml:function (product) {
      return `<div class="col-md-3 col-sm-6">
                    <div class="single-shop-product">
                        <div class="product-upper">
                            <img src="img/product-2.jpg" alt="">
                        </div>
                        <h2><a href="">${product.name}</a></h2>
                        <div class="product-carousel-price">
                            <ins>$${product.price}</ins> 
                        </div>  
                        
                        <div class="product-option-shop">
                            <a class="add_to_cart_button" data-quantity="1" data-product_sku="" data-product_id="${product.id}" rel="nofollow" href="/canvas/shop/?add-to-cart=70">Add to cart</a>
                        </div>                       
                    </div>
                </div>`
    }


};

shop.getProducts();