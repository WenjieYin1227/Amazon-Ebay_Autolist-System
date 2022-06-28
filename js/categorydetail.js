
  var GetCategoryDetail = (function(){
    
    var handleGetCategoryDetail = function(){
        var importname_id;
        var stringhtml;
        
        chrome.storage.local.get(['importname_id'],function(result){
             importname_id = result['importname_id'];
        });
        chrome.storage.local.get(['user_id'],function(result){
            user_id = result['user_id'];
            console.log("hello=>",user_id);
            console.log("hello1=>",importname_id);
            $.ajax({
  
              url:"http://3.135.237.73/index.php/api/listProducts",
              type:"POST",
              data:{
                 user_id:user_id,
                 importname_id:importname_id
              },
              success:function(res){
                console.log("data=>",res['category']);
                var checkinfo = res['data'];
                var categories = res['category'];
                productcount = checkinfo.length;
                $.each(checkinfo,function(i,val){
                   index = i+1;
                   stringhtml += '<tr style="vertical-align: baseline;">';
                   stringhtml += '<td>'+ index +'</td>';
                   stringhtml += '<td>'+val['category']+'</td>';
                   stringhtml += '<td>'+val['count']+'</td>';
                   stringhtml += '<td><select class="form-control category-select">';
                   $.each(categories,function(z,category){
                      stringhtml += '<option value="'+category['cat_id']+'">'+category['cat_name']+'</option>';

                   });
                   
                   stringhtml += '</select></td><td>no known</td></tr>';
                });
                $("#productdetail").html(stringhtml);
                
                $('.category-select').on('change', function () {

                   if($(this).next('select').length){
                       $(this).nextAll('select').remove();
                   }
                       var ajax_result='';
                       var category_id = $(this).val();
                       var addHtml = '<select class="form-control category-select2">';
                       console.log(category_id)
                       $.ajax({
                              url:"http://3.135.237.73/index.php/api/getCategory",
                              type:"POST",
                              async:false,
                              data:{
                                category_id:category_id
                              },
                              success:function(res){
                                 console.log(res);
                                 ajax_result = res['data'];
                                 $.each(res['data'],function(i,val){
                                      addHtml += '<option value="'+val['cat_id']+'">'+val['cat_name']+'</option>';

                                 });
                                 addHtml += '</select>';
                              },
                              error:function(){

                              }
                       });
                       if(ajax_result.length !=0){
                          $(this).parent('td').append(addHtml);
                          $(this).parent().next('td').empty();

                       }
                       else{

                         $(this).parent().next('td').empty();
                         $(this).parent().next('td').append(category_id);
                       }
                       
                   
                   

                   //seletct2
                   $('.category-select2').on('change',function(){
                         if($(this).next('select').length){
                           $(this).nextAll('select').remove();
                         }
                         var ajax_result = '';
                         var category_id = $(this).val();
                         var addHtml = '<select class="form-control category-select3">';
                         console.log(category_id)
                         $.ajax({
                                  url:"http://3.135.237.73/index.php/api/getCategory",
                                  type:"POST",
                                  async:false,
                                  data:{
                                    category_id:category_id
                                  },
                                  success:function(res){
                                     console.log(res);
                                     ajax_result = res['data'];
                                     $.each(res['data'],function(i,val){
                                          addHtml += '<option value="'+val['cat_id']+'">'+val['cat_name']+'</option>';

                                     });
                                     addHtml += '</select>';
                                  },
                                  error:function(){

                                  }
                           });
                         if(ajax_result.length != 0){
                              $(this).parent('td').append(addHtml); 
                               $(this).parent().next('td').empty();

                         }
                       else{
                         $(this).parent().next('td').empty();
                         $(this).parent().next('td').append(category_id);
                       }
                       

                         //select 3
                         $('.category-select3').on('change',function(){
                               if($(this).next('select').length){
                                       $(this).nextAll('select').remove();
                                   }
                               var ajax_result = '';
                               var category_id = $(this).val();
                               var addHtml = '<select class="form-control category-select4">';
                               console.log(category_id)
                               $.ajax({
                                      url:"http://3.135.237.73/index.php/api/getCategory",
                                      type:"POST",
                                      async:false,
                                      data:{
                                        category_id:category_id
                                      },
                                      success:function(res){
                                         console.log(res);
                                         ajax_result = res['data'];
                                         $.each(res['data'],function(i,val){
                                              addHtml += '<option value="'+val['cat_id']+'">'+val['cat_name']+'</option>';

                                         });
                                         addHtml += '</select>';
                                      },
                                      error:function(){

                                      }
                             });
                           if(ajax_result.length != 0){
                               $(this).parent('td').append(addHtml); 
                                $(this).parent().next('td').empty();

                           }
                       else{
                         $(this).parent().next('td').empty();
                         $(this).parent().next('td').append(category_id);
                       }
                         

                            //select 4
                         $('.category-select4').on('change',function(){
                               if($(this).next('select').length){
                                       $(this).nextAll('select').remove();
                                   }
                               var ajax_result = '';
                               var category_id = $(this).val();
                               var addHtml = '<select class="form-control category-select5">';
                               console.log(category_id)
                               $.ajax({
                                      url:"http://3.135.237.73/index.php/api/getCategory",
                                      type:"POST",
                                      async:false,
                                      data:{
                                        category_id:category_id
                                      },
                                      success:function(res){
                                         console.log(res);
                                         ajax_result = res['data'];
                                         $.each(res['data'],function(i,val){
                                              addHtml += '<option value="'+val['cat_id']+'">'+val['cat_name']+'</option>';

                                         });
                                         addHtml += '</select>';
                                      },
                                      error:function(){

                                      }
                             });
                           if(ajax_result.length != 0){
                                 $(this).parent('td').append(addHtml); 
                                 $(this).parent().next('td').empty();

                           }    
                      else{
                         $(this).parent().next('td').empty();
                         $(this).parent().next('td').append(category_id);
                       }
                           
                           //select 5
                           $('.category-select5').on('change',function(){
                               if($(this).next('select').length){
                                       $(this).nextAll('select').remove();
                                   }
                                 var ajax_result = '';
                                 var category_id = $(this).val();
                                 var addHtml = '<select class="form-control category-select6">';
                                 console.log(category_id)
                                 $.ajax({
                                        url:"http://3.135.237.73/index.php/api/getCategory",
                                        type:"POST",
                                        async:false,
                                        data:{
                                          category_id:category_id
                                        },
                                        success:function(res){
                                           console.log(res);
                                           ajax_result = res['data'];
                                           $.each(res['data'],function(i,val){
                                                addHtml += '<option value="'+val['cat_id']+'">'+val['cat_name']+'</option>';

                                           });
                                           addHtml += '</select>';
                                        },
                                        error:function(){

                                        }
                               });
                             if(ajax_result.length != 0){
                                 $(this).parent('td').append(addHtml); 
                                 $(this).parent().next('td').empty();

                             }    
                            else{
                               $(this).parent().next('td').empty();
                               $(this).parent().next('td').append(category_id);
                             }
                             
                             
                           }); //select 5 end
                         
                       }); //select 4 end

                     }); //select 3 end
 
                  });//select 2 end
  

                }); //select 1 end
               
              }, //success end
              error:function(){
    
              }
            });
    
        });
         
    }
  
      return {
        init:function(){
          handleGetCategoryDetail();
        }
      }
  })()
  
  
    $(function () {

        
        var progressbar_width = 0;
        var progressbar_per_width = 0;
        var product_count;
      
         function progressbar(){
              var elem = document.getElementById("myBar");
              progressbar_width = progressbar_width + progressbar_per_width;
              elem.style.width = progressbar_width + "%";
              console.log(elem.style.width)
              // if(progressbar_width>=100){
              //      alert("success end");
              // }
               
        }

        function productlist(i,item){
                 console.log("productlist:",i)
                 $.ajax({
                         url:"http://3.137.204.209:80/api/listProduct",
                         type:"POST",
                         async:true,          
                         data: item,
                         success:function(res){
                          console.log(res);
                          progressbar();
                          console.log("productajax:",i,product_count)
                          if(i==0){
                             alert("出力は終了しました。");
                          }

                         },
                         error:function(){
                             alert("エラーが発生しました。");
                         }
                  });
                  // progressbar();
        }
              

      GetCategoryDetail.init();
      $('.btn-info').click(function(){
          var productlist = [];
          var importname_id;
          var user_id;
          chrome.storage.local.get('importname_id',function(result){
                importname_id = result['importname_id'];
                chrome.storage.local.get('user_id',function(result){
                user_id = result['user_id'];
                $('#productdetail').find('tr').each(function(i){
                       var category_name = $(this).find('td').eq(1).text();
                       var ebay_category_id = $(this).find('td').eq(4).text();
                       var product ={};
                       product = {
                          category_name:category_name,
                          ebay_category_id:ebay_category_id
                      };
                       productlist.push(product);

                });

                $.ajax({
                  url:"http://3.135.237.73/index.php/api/registerEabyCategory",
                  type:"POST",
                  data:{
                    user_id:user_id,
                    importname_id:importname_id,
                    productlist:productlist
                  },
                  success:function(res){
                     toastr.success("カテゴリ情報が保存されました。");
                  },
                  error:function(){
                     toastr.error("エラーが発生しました。");
                  }
                });
             });
          });
          
           
      });


       $('#listing_product').click(function(){

          var importname_id;
          var user_id;
          chrome.storage.local.get('importname_id',function(result){
                importname_id = result['importname_id'];
                chrome.storage.local.get('user_id',function(result){
                user_id = result['user_id'];
                var item1 = {'name':'wolf','age':'20'};
                  $("#myBar").width("30%");
                $.ajax({
                              url:"http://3.137.204.209:80/api/getProduct",
                              type:"POST",
                              async:false,
                              data:{
                                user_id:user_id,
                                importname_id:importname_id
                              },
                              success:function(res){
                                 product_count = res.length;
                                 progressbar_per_width = 100 / product_count;
                                 $.each(res, function(i,item){
                                      console.log(i)
                                      productlist(i,item);
                                      var count = product_count-1;
                                     
                                      if(i==count){
                                        // alert("successful end listing products");
                                        // toastr.success("");
                                       
                                        var elem = document.getElementById("myBar");
                                        // elem.style.width = 0 + "%";
                                        progressbar_width = 0;
                                      }

                                 });
                              },
                              error:function(){

                              }
                 });
              
              
             });
         });
          
           
      });
       
    });
  
    