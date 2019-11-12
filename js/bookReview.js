window.book_reviews = {
    API_BASE_URL: "http://localhost:8085",

    clickedBook: function () {
        $("#mySearch").click(function () {
            console.log($("#searchInput").val());
            var search = $("#searchInput").val();
            return search;
            // console.log($('#input').attr('Book_des'));
        });
    },
};
book_reviews.clickedBook();
