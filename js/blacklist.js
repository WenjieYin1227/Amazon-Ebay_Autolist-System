
  $(function () {
    $("#example1").DataTable();
    $('#example2').DataTable({
      "paging": true,
      "lengthChange": false,
      "searching": false,
      "ordering": true,
      "info": true,
      "autoWidth": false,
    });
    
    // $("#blackasinForm").submit(function(e){
    //   e.preventDefault();
    //   var formData = new FormData(this);
    //   $.ajax({
    //     url:"http://3.135.237.73/index.php/api/import/blackasin",
    //     type:"POST",
    //     data:formData,
    //     success:function(data){
    //       console.log("success");
    //     },
    //     error:function(){
    //       console.log("error");
    //     },
    //     cache:false,
    //     contentType:false,
    //     processData:false
    //   });
    // });

    var user_id;
    chrome.storage.local.get(['user_id'],function(result){
        user_id = result['user_id'];
    });
    $("#upload_blacklist_btn").click(function(){
         blackasin = $("#blackAsin").val();
         console.log(user_id,blackasin);
          $.ajax({
              url:"http://3.135.237.73/index.php/api/blackasin",
              type:"POST",
              data:{
                blackasin:blackasin,
                userID:user_id
              },
              success:function(res){
                  toastr.success("success upload black asin");
              },
              error:function(){
                  toastr.error("upload error");
              }
          });
    });

    $("#upload_ngword_btn").click(function(){

      $.ajax({
          url:"http://3.135.237.73/index.php/api/import/ngword",
          type:"POST",
          data:{
            ngword:$("#ngWords").val(),
            userID:user_id
          },
          success:function(res){
              toastr.success("success upload ngword");
          },
          error:function(){
              toastr.error("upload error");
          }
      });
});

  });