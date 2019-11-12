window.Cart = {
    API_BASE_URL: "http://localhost:8085",

    getProducts: function () {
        $.ajax({
            url: Cart.API_BASE_URL + "/carts/" + 63,
            method: "GET"

        }).done(function (response) {
            console.log(response);
            Cart.displayProducts(response.books);
        })
    },


    displayProducts: function (books) {
        var allProductsHtml = "";
        books.forEach(book => allProductsHtml += Cart.getProductHtml(book));
        $(".shop_table.cart tbody").html(allProductsHtml);
    },

    getProductHtml: function (book) {
        return `<tr class="cart_item">
                                            <td class="product-remove">
                                                <a title="Remove this item" class="remove" href="#">×</a>
                                            </td>

                                            <td class="product-thumbnail">
                                                <a href="book_reviews.html"><img width="145" height="145" alt="poster_1_up" class="shop_thumbnail" src="img/${book.imagePath}"></a>
                                            </td>

                                            <td class="product-name">
                                                <a href="book_reviews.html">${book.title}</a>
                                            </td>

                                            <td class="product-price">
                                                <span class="amount">${book.price}</span> 
                                            </td>


                                            <td class="product-subtotal">
                                                <span class="amount">${book.price}</span> 
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="actions" colspan="6">
                                        
                                                <button type="button" onclick="location.href='yourdownloads.html'" > Buy and go to download </button>
                                                </a>
                                            </td>
                                        </tr>`
    },


};
Cart.getProducts();
Cart.displayProducts();
Cart.addFinal();