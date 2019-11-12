window.book_uploadFile = {
    API_BASE_URL: "http://localhost:8085",
},
   $(document).ready(function() {
       $('#btn_id').click(function (e) {

           e.preventDefault(); // avoid to execute the actual submit of the form.


           var title = $("#title").val();
           var author = $("#author").val();
           var yearOfRelease = $("#yearOfRelease").val();
           var language = $("#language").val();
           var type = $("#type").val();
           var description = $("#description").val();
           var pages = $("#pages").val();
           var rank = $("#rank").val();
           var likes = $("#likes").val();
           var price = $("#price").val();
           var imagePath = $("#imagePath").val();
           var reee = $("#form_id").serialize();
           var form = {"author": author,"description": description,"imagePath": imagePath,"language": language,"type": type,"pages": pages,"price": price,"title": title,"yearOfRelease": yearOfRelease,"rank": rank,"likes": likes};
           var formProcessed = JSON.stringify(form);
           console.log(JSON.stringify(form));
           $.ajax({
               type: "post",
               url: book_uploadFile.API_BASE_URL + "/books",
               contentType: 'application/json',
               data: formProcessed,
               success: function (result) {
                   alert(data); // show response from the php script.
                   console.log(result);
               },
               error: function (xhr, resp, text) {
                   console.log(xhr,resp,text);
                   console.log(reee);
               },
           });


       });

   });
