

$(function(){

       $("#register_go_btn").click(function(){
            location.href = "../register.html";
       });  

       $("#login_btn").click(function(){        
            $state = $("#loginForm").valid();
            if($state==true){
                $.ajax({
                    url:'http://3.135.237.73/index.php/api/login',
                    type:'POST',
                    data:{
                        email:$("#email").val(),
                        password:$("#password").val()
       
                    },
                   
                    success:function(res){
                        // toastr.error("the user alreadly exist");
                        if(res['check_user'] == 'false'){
                            toastr.error("login error");
                            
                        }
                        else{
                            chrome.storage.local.set({ "user_name": res['user_name'] }, function(){});
                            chrome.storage.local.set({ "user_id": res['user_id'] }, function(){});
                            location.href = "../importAsin.html";
                            toastr.success("成功!");
                        }
                    },
                    error:function(){
                        toastr.error("エラー!");
                    }
                });
             }

       })
});