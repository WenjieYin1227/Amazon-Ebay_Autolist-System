
//init function
var GetBusinessPolicy = (function(){
     
     var handleGetBusinessPolicy = function(){

         $.ajax({
	         	url:"http://3.135.237.73:80/index.php/api/getStore",
	         	async:false,
	         	type:"GET",
	         	data:{

	         	},
	         	success:function(res){
	               console.log(res)
	               var stringhtml = '';
	               $.each(res['data'],function(i,val){
	               	        var index = i+1;
	               		    stringhtml += '<tr><td><button  id="'+val['id']+'" class="btn btn-danger btn-delete">delete</td>>';
	               		    stringhtml += '<td>'+index+'</td><td>'+val['store_name']+'</td><td>'+val['user_token']+'</td></tr>';
				            
				            $("#store").html(stringhtml);
	               });

	           },
	         	error:function(){

	         	}
         }) ;
         
        //  $.ajax({
	    //       	 url: "http://3.135.237.73/index.php/api/getStore",
	    //       	 type:"GET",
	    //       	 data:{

	    //       	 },
	    //       	 success:function(res){
        //             var stringhtml = '<select class="store-select form-control category-select">';
        //       		stringhtml += '<option>Please Select </option>';
        //       		$.each(res['data'],function(i,val){

        //       			stringhtml += '<option value="'+ val['user_token']+'">' + val['store_name'] + '</option>';
        //       		});
        //       		stringhtml += '</select>';
        //       		$('#storeDiv').html(stringhtml);
              		
	    //       	 },
	    //       	 error:function(){

	    //       	 }
        //   });
          // $.ajax({
              
          //     url: "http://3.137.204.209:80/api/getPolicy",
          //     type: "POST",
            
          //     data: {
          //         user_id:'2'
          //     },
          //     success:function(res){
          //     		console.log(res)
          //     		var stringhtml = '<select class="form-control category-select">';
          //     		$.each(res['paymentlist'],function(i,payment){
          //     			stringhtml += '<option value="'+ payment['policyID']+'">' + payment['policyName'] + '</option>';
          //     		});
          //     		stringhtml += '</select>';
          //     		$('#paymentDiv').html(stringhtml);

          //     		var stringhtml = '<select class="form-control category-select">';
          //     		$.each(res['returnlist'],function(i,returnPolicy){
          //     			stringhtml += '<option value="'+ returnPolicy['policyID']+'">' + returnPolicy['policyName'] + '</option>';
          //     		});
          //     		stringhtml += '</select>';
          //     		$('#returnDiv').html(stringhtml);

          //     		var stringhtml = '<select class="form-control category-select">';
          //     		$.each(res['shippinglist'],function(i,shipping){
          //     			stringhtml += '<option value="'+ shipping['policyID']+'">' + shipping['policyName'] + '</option>';
          //     		});
          //     		stringhtml += '</select>';
          //     		$('#shippingDiv').html(stringhtml);

          //     },
          //     error:function(){

          //     }
          // });//ajax end

     }

     return {
     	  init: function(){
     	  	   handleGetBusinessPolicy();
     	  }
      }
})();

//when page is loading, main function
$(function () {

      GetBusinessPolicy.init();

      $("#store_add_btn").click(function(){

      		$("#register_store_modal").modal('show');

      });

      $("#register_store_btn").click(function(){
            
            var store_name = $("#store_name").val();
            var user_token = $("#user_token").val();
            var stringhtml = '';
            var index ;
       
            $("#register_store_modal").modal('hide');

            $.ajax({

            	url: "http://3.135.237.73:80/index.php/api/registerStore",
            	type: "POST",
            	data: {
            		store_name:store_name,
            		user_token:user_token
            	},
            	success:function(res){
					toastr.success("正常に保存されました。");
	                var stringhtml = '';
	                $.each(res['data'],function(i,val){
               	        var index = i+1;
               		    stringhtml += '<tr><td><button  id="'+val['id']+'" class="btn btn-danger btn-delete">delete</td>';
               		    stringhtml += '<td>'+index+'</td><td>'+val['store_name']+'</td><td>'+val['user_token']+'</td></tr>';
			            $("#store").html(stringhtml);
                     });

	                $.ajax({
				          	 url: "http://3.135.237.73:80/index.php/api/getStore",
				          	 type:"GET",
				          	 data:{

				          	 },
				          	 success:function(res){
			                    var stringhtml = '<select class="store-select form-control category-select">';
			              		stringhtml += '<option>Please Select </option>';
			              		$.each(res['data'],function(i,val){
			              			stringhtml += '<option value="'+ val['user_token']+'">' + val['store_name'] + '</option>';
			              		});
			              		stringhtml += '</select>';
			              		$('#storeDiv').html(stringhtml);
			              		
				          	 },
				          	 error:function(){

				          	 }
			          });

	             
            	}, 
            	error:function(){
                     
            	}
            });
       });
        
        $("body").on('click','.btn-delete',function(){
                var id = $(this).attr("id");
	      		$(this).parents('tr').remove();
	      		$.ajax({
		      			url:"http://3.135.237.73:80/index.php/api/deleteStore",
		      			type:"POST",
		      			async:false,
		      			data:{
		      				id:id
		      			},
		      			success:function(res){
							toastr.success("正常に削除されました。");
		                    var stringhtml = '';
		                    $.ajax({
						          	 url: "http://3.135.237.73:80/index.php/api/getStore",
						          	 type:"GET",
						          	
						          	 data:{

						          	 },
						          	 success:function(res){
					                    var stringhtml = '<select class="store-select form-control category-select">';
			              		        stringhtml += '<option>Please Select </option>';

					              		
					              		$.each(res['data'],function(i,val){
					              			stringhtml += '<option value="'+ val['user_token']+'">' + val['store_name'] + '</option>';
					              		});
					              		stringhtml += '</select>';
					              		$('#storeDiv').html(stringhtml);
                                    
					              	
						          	 },
						          	 error:function(){

						          	 }
					          });
		                      
			                
		      			},
		      			error:function(){

		      			}
      		});
        });

        $("body").on('change','.store-select',function(){
        	   $.ajax({
              
		              url: "http://3.137.204.209:80/api/getPolicy",
		              type: "POST",
		            
		              data: {
		                  user_token:$(this).val()
		              },
		              success:function(res){
		              		console.log(res)
		              		var stringhtml = '<select id="payment_select" class="form-control category-select">';
		              		$.each(res['paymentlist'],function(i,payment){
		              			stringhtml += '<option value="'+ payment['policyID']+'">' + payment['policyName'] + '</option>';
		              		});
		              		stringhtml += '</select>';
		              		$('#paymentDiv').html(stringhtml);

		              		var stringhtml = '<select id="return_select" class="form-control category-select">';
		              		$.each(res['returnlist'],function(i,returnPolicy){
		              			stringhtml += '<option value="'+ returnPolicy['policyID']+'">' + returnPolicy['policyName'] + '</option>';
		              		});
		              		stringhtml += '</select>';
		              		$('#returnDiv').html(stringhtml);

		              		var stringhtml = '<select id="shipping_select" class="form-control category-select">';
		              		$.each(res['shippinglist'],function(i,shipping){
		              			stringhtml += '<option value="'+ shipping['policyID']+'">' + shipping['policyName'] + '</option>';
		              		});
		              		stringhtml += '</select>';
		              		$('#shippingDiv').html(stringhtml);

              },
              error:function(){

              }
          });//ajax end
        });

        $("body").on('click','#register_business_policy',function(){

        		$.ajax({
                    
        			url:"http://3.135.237.73/index.php/api/registerBusinessPolicy",
        			type:"post",
        			data:{
        				user_token:$(".store-select").val(),
        				rating:$("#ratingDiv").val(),
        				payment_id:$("#payment_select").val(),
        				payment_name:$("#payment_select option:selected").text(),
        				return_id:$("#return_select").val(),
        				return_name:$("#return_select option:selected").text(),
        				shipping_id:$("#shipping_select").val(),
        				shipping_name:$("#shipping_select option:selected").text(),
        			},
        			success:function(res){
						toastr.success("正常に保存されました。");

        			},
        			error:function(){

        			}
        		});
        });
      
  });