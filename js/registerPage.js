
  $(function(){

    $("#register").click(function(){
         $state = $("#registerForm").valid();
         if($state==true){
            $.ajax({
                url:'http://3.135.237.73/index.php/api/register',
                type:'POST',
                data:{
                    name:$("#name").val(),
                    email:$("#email").val(),
                    password:$("#password").val()
   
                },
               
                success:function(res){
                    // toastr.error("the user alreadly exist");
                    if(res['check_user']=='true'){
                      toastr.error("the user alreadly exist");
                    }
                    else{
                      toastr.success(res['message']);
                    }
                },
                error:function(){
                    alert("error");
                }
            });
         }
        
      });

    $("#login_go_btn").click(function(){
        location.href = "../login.html";
    })  
  });