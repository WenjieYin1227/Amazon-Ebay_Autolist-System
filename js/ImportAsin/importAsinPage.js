$(function(){

    var user_id;
    chrome.storage.local.get(['user_id'],function(result){
        user_id = result['user_id'];
    });
    $("#product_asin_register_btn").click(function(){
            var validate = $("#importAsinForm").valid();
            if(validate==true){

                var productasins = $("#productAsin").val();
                var importname = $("#importname").val();
             
                
                console.log(productasins);
                

                $.ajax({

                    url:"http://3.135.237.73/index.php/api/import/productasin",
                    type:"POST",
                    data:{
                        productAsins:productasins,
                        importname:importname,
                        user_id:user_id
                    },
                    success:function(res){
                        console.log(res['id']);
                        toastr.success("upload asins successfully");                    
                    },
                    error:function(){

                    }
                });
            }
         
    });
});