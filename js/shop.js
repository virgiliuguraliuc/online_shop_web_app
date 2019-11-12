window.shop = {
    API_BASE_URL: "http://localhost:8085",


    getProducts: function () {
        $.ajax({
            url: shop.API_BASE_URL + "/books",
            method: "GET"

        }).done(function (response) {
            console.log(response);
            shop.displayProducts(response.content);
        })
    },

    displayProducts: function (books) {
        var allProductsHtml = "";
        books.forEach(book => allProductsHtml += shop.getProductHtml(book));
        $(".single-product-area .row").html(allProductsHtml);
        return `<div class="row">
                <div class="col-md-12">
                    <div class="product-pagination text-center">
                        <nav>
                          <ul class="pagination">
                            <li>
                              <a href="#" aria-label="Previous">
                                <span aria-hidden="true">&laquo;</span>
                              </a>
                            </li>
                            <li><a href="#">1</a></li>
                            <li><a href="#">2</a></li>
                            <li><a href="#">3</a></li>
                            <li><a href="#">4</a></li>
                            <li><a href="#">5</a></li>
                            <li>
                              <a href="#" aria-label="Next">
                                <span aria-hidden="true">&raquo;</span>
                              </a>
                            </li>
                          </ul>
                        </nav>                        
                    </div>
                </div>
            </div>`


    },

    getProductHtml: function (book) {
        return `<div class="col-md-3 col-sm-6">
                    <div class="single-shop-product">
                        <div class="product-upper">
                            <img src="img/${book.imagePath}" alt="">
                        </div>
                             <div class="info-book">
                                 <h4><a </a></h4>
                                 <h4><a href="">Title:</a><span>  ${book.title} </span></h4>
                                 <h4><a href="">Written by:</a><span> ${book.author}</span> </h4>
                                 <h4><a href="">Type:</a><span> ${book.type}</span> </h4>
                                 <h4><a href="">Year of release:</a><span> ${book.yearOfRelease}</span> </h4>
                                 <h4><a href="">rank:</a><span> ${book.rank}   </span> </h4>
                             </div>
                        <div class="product-option-shop">
                            <a class="add_to_cart_button" data-quantity="1"  id="${book.id}"   href="cart.html" >Buy a digital copy <ins>$${book.price}  <ins></a>
                        </div>   
                        <div class="product-option-shop">
                            <a class="add_to_cart_button"  href="book_reviews.html" >  Read the review  </a>
                                                        
                        </div>
                                            
                    </div>
                </div>

`
    },

    addPagination: function () {
        return `<div class="row">
                <div class="col-md-12">
                    <div class="product-pagination text-center">
                        <nav>
                          <ul class="pagination">
                            <li>
                              <a href="#" aria-label="Previous">
                                <span aria-hidden="true">&laquo;</span>
                              </a>
                            </li>
                            <li><a href="#">1</a></li>
                            <li><a href="#">2</a></li>
                            <li><a href="#">3</a></li>
                            <li><a href="#">4</a></li>
                            <li><a href="#">5</a></li>
                            <li>
                              <a href="#" aria-label="Next">
                                <span aria-hidden="true">&raquo;</span>
                              </a>
                            </li>
                          </ul>
                        </nav>                        
                    </div>
                </div>
            </div>`
    },

    addProductToCart: function () {
        //customerId to be read from memory somehow in the future
        var userId = 63;
        var bookId = $(this).attr('id');
        var requestBody = {
            userId: userId,
            bookId: bookId
        };

        $.ajax({
            url: shop.API_BASE_URL + "/carts",
            method: "PUT",
            contentType: "application/json",
            data: JSON.stringify(requestBody)
        }).done(function () {
            window.location.replace("/cart.html")
        }) //asa fac navigatie spre alta pagina
    },

    bindEvents: function () {
        var bookId = $(this).attr('id');
        $(`.single-product-area .row`).delegate(`.add_to_cart_button`, `click`, function (event) {
            // event.preventDefault();


            shop.addProductToCart(bookId);
        });
    }
};

shop.getProducts();
shop.bindEvents();
shop.addPagination();