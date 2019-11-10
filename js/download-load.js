//
// $(document).ready(function() {
//
//     $("#submitButton").click(function(event) {
//
//         // Stop default form Submit.
//         event.preventDefault();
//
//         // Call Ajax Submit.
//
//         ajaxSubmitForm();
//
//     });
//
// });
//
// function ajaxSubmitForm() {
//
//     // Get form
//     var form = $('#fileUploadForm')[0];
//
//     var data = new FormData(form);
//
//
//     $("#submitButton").prop("disabled", true);
//
//     $.ajax({
//         type: "POST",
//         enctype: 'multipart/form-data',
//         url: "/rest/uploadMultiFiles",
//         data: data,
//
//         // prevent jQuery from automatically transforming the data into a query string
//         processData: false,
//         contentType: false,
//         cache: false,
//         timeout: 1000000,
//         success: function(data, textStatus, jqXHR) {
//
//             $("#result").html(data);
//             console.log("SUCCESS : ", data);
//             $("#submitButton").prop("disabled", false);
//             $('#fileUploadForm')[0].reset();
//         },
//         error: function(jqXHR, textStatus, errorThrown) {
//
//             $("#result").html(jqXHR.responseText);
//             console.log("ERROR : ", jqXHR.responseText);
//             $("#submitButton").prop("disabled", false);
//
//         }
//     });
//
// }

var file;
function prepareUpload()
{
    document.getElementById('fileSize').innerHTML = '';
    document.getElementById('bytesUploaded').innerHTML = '';
    document.getElementById('percentUploaded').innerHTML = '';
    document.getElementById('uploadProgressBar').style.width = '0%';

    // get file name
    file = document.getElementById('file').value;
    if(file.lastIndexOf('\\')>=0)
        file = file.substr(file.lastIndexOf('\\')+1);
    document.getElementById('fileName').innerHTML = file;

    // get folder path
    var curFolder = window.location.href;
    if(curFolder[curFolder.length-1]!='/')
        curFolder = curFolder.substring(0, curFolder.lastIndexOf('/')+1);

    document.getElementById('target').innerHTML = curFolder;
    document.getElementById('frm').action = curFolder;
}

var timerId;
function formSubmit()
{
    timerId = setInterval('updateProgress()', 1000);
    document.getElementById('cancelUploadBtn').disabled = false;
}

function updateProgress()
{
    var request = window.ActiveXObject ? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest();
    var uploadTarget = document.getElementById("frm").action + file;

    request.open("REPORT", uploadTarget, false);
    request.send("<upload-progress xmlns='ithit'/>");
    var resp = request.responseText;

    // Extract number of bytes uploaded and total content length of the file.
    // Usually you will use XML DOM or regular expressions for this purposes
    // but here for the sake of simplicity we will just extract using string methods.
    var size;
    var sizeIndex = resp.indexOf("total-content-length");
    if(sizeIndex != -1)
    {
        size = resp.substring(resp.indexOf(">", sizeIndex)+1, resp.indexOf("</", sizeIndex));
        document.getElementById("fileSize").innerHTML = size;
    }
    var bytes = "Finished";
    var percent = 100;
    var bytesIndex = resp.indexOf("bytes-uploaded");
    if(bytesIndex != -1)
    {
        bytes = resp.substring(resp.indexOf(">", bytesIndex)+1, resp.indexOf("</", bytesIndex));
        if(parseInt(size)!=0)
            percent = 100*parseInt(bytes)/parseInt(size);
    }

    document.getElementById("bytesUploaded").innerHTML = bytes;
    document.getElementById("percentUploaded").innerHTML = percent.toString().substr(0, 4) + " %";
    document.getElementById("uploadProgressBar").style.width = percent.toString() + "%";

    if(percent==100)
    {
        clearInterval(timerId);
        document.getElementById("cancelUploadBtn").disabled = false;
    }
}

function cancelUpload()
{
    // recreate iframe to cancel upload
    document.getElementById("uploadFrameHolder").innerHTML = "<iframe name='uploadFrame' ></iframe>";
    clearInterval(timerId);
    document.getElementById("cancelUploadBtn").disabled = true;
}