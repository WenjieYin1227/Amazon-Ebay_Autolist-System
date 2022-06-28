/* Formatting function for row details - modify as you need */
function format ( d ) {
    // `d` is the original data object for the row
    var stringhtml='';
    stringhtml += '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">'+
        '<thead><tr><th></th><th>asin</th><th>title</th><th>price</th><th>quantity</th></tr></thead>'
        
    $.each(d['detail'],function(i,val){
        stringhtml += '<tr>'+
                         '<td>'+'</td>'+
                         '<td>'+val['asin']+'</td>'+
                         '<td>'+val['title']+'</td>'+
                         '<td>'+val['price']+'</td>'+
                         '<td>'+val['quantity']+'</td>'+
                     '</tr>';
                 
    });

    stringhtml += '</table>';
    return stringhtml;
}

function StoreInformation(stores){
     console.log(stores)
     var stringhtml = '<div class="form-group"> <label for="usr">お店</label>';
     stringhtml += '<select class="store-select form-control category-select">';
     stringhtml += '<option>Please Select </option>';
     $.each(stores,function(i,val){

         stringhtml += '<option value="'+ val['user_token']+'">' + val['store_name'] + '</option>';
     });
     stringhtml += '</select>';
     stringhtml += '</div>';
     return stringhtml;
}

 var DisplayStore = (function(){
    var user_id;
    var stringhtml='';
    var index;
    var length;
    var i=0;
    var asinArray=[];
    var productcount=0;
    var progressbar_width = 0;
    var progressbar_per_width=0;
    var productlist = [];
    var table;
    
    var productImageArray = [];
    var tempProductImageArray = [];
      var handleDisplayStore = function(){
           $.ajax({
              url:"http://3.135.237.73:80/index.php/api/getStore",
              type:"GET",
              data:{
                  
              },
              success:function(res){
                  var stringhtml = StoreInformation(res['data']);
                  $("#select_store").html(stringhtml);

              },
              error:function(){

              } 
           });
      }
      var progressbar = function(){
    
        var elem = document.getElementById("myBar");
        progressbar_width = progressbar_width + progressbar_per_width;
        console.log("width",progressbar_width)
          if (progressbar_width >= 99.9) {
              elem.style.width=100 + "%";
            //    alert("successully finishing check the product");
               progressbar_width=0;
              
          
               i=0;
          } else {
            
            elem.style.width = progressbar_width + "%";
          }
        }
      function check(asinItem){
          console.log(i,length)
        if(i<length){
            
            
                                          progressbar_per_width = 100 / length;
                                          progressbar();
                                          var productasin = asinItem;
                                       
                                          productasin = $.trim(productasin);
                                          console.log("productasin=>",productasin)
                                          var productUrl = "https://www.amazon.co.jp/dp/"+ productasin +"?language=en";
                                          $.ajax
                                          (
                                              {
                                                  type: "GET",
                                                  url: productUrl,
                                                  async:false,
                                                  
                                                 
                                                  success: function(data)
                                                  {
                                                      console.log("hey");
                                                      // console.log(data);
                                                      var dom_nodes = $($.parseHTML(data));
     
                                                      //title 
                                                      var title = dom_nodes.find('#productTitle').text().replace(/(\r\n|\n|\r)/gm, "");
                                                      console.log("Title:",title);
                                                      dom_nodes.find('#altImages .a-unordered-list .a-spacing-small.item').each(function(){
                                                              var imageurl = $(this).find(".a-button-text img").attr("src");
                                                              console.log(imageurl);
                                                              imageurl = imageurl.replace("AC_US40_.jpg","SX425_.jpg");
                                                              productImageArray.push(imageurl);
                                                      });
                                                      tempProductImageArray = productImageArray;
                                                      productImageArray = [];
     
                                                      //main image
                                                      var main_imageURL = dom_nodes.find(".a-unordered-list.a-nostyle.a-horizontal.list.maintain-height  .image.item.itemNo0.maintain-height.selected img").attr("src");
                                                      console.log(main_imageURL);
     
                                                    //   //price
                                                    //   var price = dom_nodes.find(".priceToPay .a-offscreen").filter(function(index){
                                                    //       return $(this).text()==="Price:";
                                                    //   }).parent().find("td").eq(1).find('.a-price .a-offscreen').text();

                                                      var price = dom_nodes.find(".priceToPay .a-offscreen").text();
                           
                                                      if(price == ''){
                                                            price = dom_nodes.find("#price td").filter(function(){
                                                                  return $(this).text().replace(/(\r\n|\n|\r)/gm, "")==="Price:";
                                                            }).parent().find("td").eq(1).find("span").eq(0).text();
                                                      }
                                                      if(price ==''){
                                                          price = dom_nodes.find("#corePrice_desktop table tr ").eq(1).find(".a-offscreen").text();
                                                      }
                                                      price = price.slice(1);
                                                      price = price.replace(',','');
                                                      price = parseInt(price);
                                                      console.log("price",price);
     
                                                      //quantity
                                                      var quantity = dom_nodes.find("label").filter(function(){
                                                            return $(this).text() === "Quantity:";
                                                      }).eq(0).parent().find("select option").last().text();
                                                      quantity = parseInt(quantity);
                                                      console.log("quantity",quantity);
     
                                                      //category
                                                      var category = '';
                                                      dom_nodes.find("#showing-breadcrumbs_div ul li").each(function(){
                                      
                                                          categoryItem = $(this).text().replace(/(\r\n|\n|\r)/gm, "");
                                                          categoryItem = $.trim(categoryItem);
                                                          if(categoryItem == '›'){
                                                             category = category + '/';
                                                          }
                                                          else{
                                                             category = category + categoryItem;
                                                          }
                                                      });
                                                  
                                                      //together buy
                                                      var together = dom_nodes.find("h2").filter(function(){
                                                          return $(this).text()==="一緒に購入";
                                                      }).text();
                                                      // console.log("together buy",together);
     
                                                      //description
                                                      var description = dom_nodes.find("#productDescription").text().replace(/(\r\n|\n|\r)/gm, "");
                                                      if(description == ''){
                                                            var array='';
                                                            dom_nodes.find("h2").filter(function(){
                                                                  return $(this).text() === 'Product description'; 
                                                            }).parent().find("div div").each(function(){
                                                              
                                                                  var item = $.trim($(this).text().replace(/(\r\n|\n|\r)/gm, ""));
                                                                    array = array + item;
                                                           });
     
                                                           description = array;
                                                    
                                                        }
                                                      if(description == ''){
                                                        var array='';
                                                        dom_nodes.find("#feature-bullets li").each(function(){
                                                          
                                                              var item = $.trim($(this).text().replace(/(\r\n|\n|\r)/gm, ""));
                                                                array = array + item;
                                                       });
 
                                                       description = array;
                                                      }  
     
                                                      // console.log("description:",description);
     
                                                      //ranking
                                                      var ranking = dom_nodes.find("#productDetails_db_sections th").filter(function(index){
                                                              return $(this).text().replace(/(\r\n|\n|\r)/gm, "")==="Amazon 売れ筋ランキング"
                                                      }).parent().find("td").text().replace(/(\r\n|\n|\r)/gm, "");
     
                                                      if(ranking == ''){
     
                                                           dom_nodes.find("li .a-text-bold").each(function(){
     
                                                                if($(this).text().indexOf("Amazon 売れ筋ランキング")!=-1){
                                                                   
                                                                    ranking = $(this).parent().text().replace(/(\r\n|\n|\r)/gm, "");
                                                                    ranking = ranking.replace('Amazon 売れ筋ランキング:','');
                                                                }
                                                           });
                                                      }
     
     
                                                      // console.log("ranking:",ranking);
                                                   
                                                      //publish date
                                                      // console.log("publish date",dom_nodes.find("#productDetails_techSpec_section_1 th").filter(function(index){
                                                      //   return $(this).text().replace(/(\r\n|\n|\r)/gm, "")==="発売日"
                                                      // }).parent().find("td").text().replace(/(\r\n|\n|\r)/gm, ""));   
                                                      
                                                      //product size
                                                      var productsize = dom_nodes.find("#productDetails_techSpec_section_1 th").filter(function(index){
                                                        return $(this).text().replace(/(\r\n|\n|\r)/gm, "")==="製品サイズ" || $(this).text().replace(/(\r\n|\n|\r)/gm, "")==="製品サイズ"|| $(this).text().replace(/(\r\n|\n|\r)/gm, "")==="梱包サイズ";
                                                      }).parent().find("td").text().replace(/(\r\n|\n|\r)/gm, "");   
                                                      
                                                      if(productsize == ''){
                                                         console.log("this is other structure"); 
                                                        dom_nodes.find("span .a-text-bold").each(function(){
                                                           
                                                            var letter =$(this).text().replace(/(\r\n|\n|\r)/gm, "");
                                                  
                                                            if(letter.indexOf("梱包サイズ")!=-1 || letter.indexOf("製品サイズ")!=-1 ){
                                                                  productsize = $(this).parent().find("span").eq(1).text();
                                                            }
                                                        });
                                                      }
     
                                                    
                                                      // console.log("product size:",productsize);
                                                      
     
                                                      //brand
                                                      var brand = dom_nodes.find("#productDetails_techSpec_section_1 th").filter(function(index){
                                                        return $(this).text().replace(/(\r\n|\n|\r)/gm, "")==="ブランド名" || $(this).text().replace(/(\r\n|\n|\r)/gm, "")==="ブランド";
                                                      }).parent().find("td").text().replace(/(\r\n|\n|\r)/gm, "");
                                                      
                                                      let productItem = {}
                                                      
                                                      productItem['asin'] = productasin;
                                                      productItem['title'] = title;
                                                      productItem['price'] = price;
                                                      productItem['quantity'] = quantity;
                                                      productItem['category'] = category;
                                                      productItem['between_day'] = 0;
                                                      productItem['together_buy'] = together;
                                                      productItem['description'] = description;
                                                      productItem['ranking'] = ranking;
                                                      productItem['productsize'] = productsize;
                                                      productItem['brand'] = brand;
                                                      productItem['imageurl'] = tempProductImageArray;
                                                      productItem['main_imageURL'] = main_imageURL;
                                               
                                                       
                                                      productlist.push(productItem);
                                                      console.log("productItem=>",productlist);
                                                      // console.log(i,length);
                                                  }//end function
                                       
                                              }
                                          );//End ajax 
                                         i++;
                                          // console.log("productItem",productItem);
                                          // console.log(productlist)
                                          return productlist;
           
            
                                  }
      
                            }

    $("#extract_products").click(function(){
                                alert("starting extracting");
                                console.log("df")
                                var productasins = $("#productAsin").val();
                                var productarray = productasins.split("\n");
                                console.log(productarray);
                                length = productarray.length
                                let index = 0;
                                
                                const timer = setInterval(() => {
                                        console.log(productarray[index])
                                        var result = check(productarray[index]);
                                    
                                        index++;
                                        if (index == length) {
                                            index = 0;
                                            length=0;
                                            i=0;
                                            clearInterval(timer);
                                         
                                            console.log("request array=>",result);
                                            progressbar_width = 0;
                                            $.ajax({
                
                                                url:"http://3.135.237.73:80/index.php/api/check/product",
                                                type: "POST",
                                                data:{
                                                    productarray:result
                                                },
                                                success:function(res){
                                                        alert("success end");
                                                        productlist=[];
                                                        var elem = document.getElementById("myBar");
                                                        elem.style.width = progressbar_width + "%";
                                                        $.ajax({
                                                            url:"http://3.135.237.73:80/index.php/api/getItems",
                                                            type:"get",
                                                            async:false,
                                                            success:function(res){
                                                                if(table){
                                                                    console.log("hi");
                                                                    table.destroy();
                                                                    $('#example').empty();
                                                                }
                                                                table = $('#example').DataTable( {
                                                                    "data":res['data'],
                                                                    "columnDefs": [{
                                                                        "targets": -2,
                                                                        "render": function (data, type, row) {
                                                                            // var checkbox = '<input type="checkbox"id="RemoveCheckBox' + data.FlatId + '" data-noapply="true" checked="checked">';
                                                                            // return checkbox;
                                                                            var stringhtml = '<select class="form-control category-select">';
                                                                            $.each(res['category'],function(z,category){
                                                                               stringhtml += '<option value="'+category['cat_id']+'">'+category['cat_name']+'</option>';
                                                         
                                                                            });
                                                                            stringhtml += '</select>';
                                                                            return stringhtml;
                                                                        }
                                                                    },
                                                                    {
                                                                        "targets": -1,
                                                                        "render": function (data, type, row) {
                                                                          
                                                                            return 'unknown';
                                                                        }
                                                                    },
                                                                ],
                                                                    "columns": [
                                                                        {
                                                                            "className":      'dt-control',
                                                                            "orderable":      false,
                                                                            "data":           null,
                                                                            "defaultContent": ''
                                                                        },
                                                                        { "data": "category" },
                                                                        { "data": "count" },
                                                                        { "data": null},
                                                                        { "data": null}
                                                                    
                                                                        
                                                                        
                                                                        
                                                                    ],
                                                               
                                                                    "order": [[1, 'asc']]
                                                                } );
                                                                
                                                            },
                                                            error:function(){
                                                    
                                                            }
                                                        });
                                                          //get products information
    
   
    console.log("category");
    $('.category-select').on('change', function () {

        if($(this).next('select').length){
            $(this).nextAll('select').remove();
        }
            var ajax_result='';
            var category_id = $(this).val();
            var addHtml = '<select class="form-control category-select2">';
            console.log(category_id)
            $.ajax({
                   url:"http://3.135.237.73:80/index.php/api/getCategory",
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
                       url:"http://3.135.237.73:80/index.php/api/getCategory",
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
                           url:"http://3.135.237.73:80/index.php/api/getCategory",
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
                           url:"http://3.135.237.73:80/index.php/api/getCategory",
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
                             url:"http://3.135.237.73:80/index.php/api/getCategory",
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
    // Add event listener for opening and closing details
    $('#example tbody').on('click', 'td.dt-control', function () {
        var tr = $(this).closest('tr');
        var row = table.row( tr );
 
        if ( row.child.isShown() ) {
            // This row is already open - close it
            row.child.hide();
            tr.removeClass('shown');
        }
        else {
            // Open this row
            row.child( format(row.data()) ).show();
            tr.addClass('shown');
        }
    } );

                                                    },
                                                error:function(){
                                                    
                                                }
                                            });
                                        }
                                }, 6000);
                
                                // $.ajax({
                
                                //     url:"http:/3.135.237.73:80/index.php/api/import/productasin",
                                //     type:"POST",
                                //     data:{
                                //         productAsins:productasins
                                //     },
                                //     success:function(res){
                                           
                                //     },
                                //     error:function(){
                
                                //     }
                                // });
                
                           });                      

      return {
          init:function(){
              handleDisplayStore();
          }
      }
 })();

$(function(){
    DisplayStore.init();
    
    var user_id;
    var table;
    var length;
    var i=0;
    var asinArray=[];
    var productcount=0;
    var progressbar_width = 0;
    var progressbar_per_width=0;
    chrome.storage.local.get(['user_id'],function(result){
        user_id = result['user_id'];
    });
    var progressbar = function(){
    
        var elem = document.getElementById("myBar");
        progressbar_width = progressbar_width + progressbar_per_width;
        console.log("width",progressbar_width)
          if (progressbar_width >= 99.9) {
              elem.style.width=100 + "%";
            //    alert("successully finishing check the product");
               progressbar_width=0;
               elem.style.width = progressbar_width + "%";
              
          
               
          } else {
            
            elem.style.width = progressbar_width + "%";
          }
        }
    function productlist(i,item){
        console.log("productlist:",i)
        progressbar();
        $.ajax({
                url:"http://3.137.204.209:80/api/listProduct",
                type:"POST",
                async:true,          
                data: item,
                success:function(res){
                 console.log(res);
                 i = i + 1;
                 console.log("productajax:",i,product_count)
                 if(i==length){
                    alert("出力は終了しました。");
                 }

                },
                error:function(){
                    alert("エラーが発生しました。");
                }
         });
         // progressbar();
}
    $("#product_asin_register_btn").click(function(){
            var validate = $("#importAsinForm").valid();
            if(validate==true){

                var productasins = $("#productAsin").val();
                var importname = $("#importname").val();
             
                
                console.log(productasins);
                

                $.ajax({

                    url:"http://3.135.237.73:80/index.php/api/import/productasin",
                    type:"POST",
                    data:{
                        productAsins:productasins,
                        importname:importname,
                        user_id:user_id
                    },
                    success:function(res){
                        console.log("sss");
                        toastr.success("正常にasinsがアップロードされました。");
                        location.href = "../checkproduct.html";                    
                    },
                    error:function(){

                    }
                });
            }
         
    });

  
    //store-select click event
   
    $("body").on('change','.store-select',function(){
        console.log('select');
        $.ajax({
       
               url: "http://3.137.204.209:80/api/getPolicy",
               type: "POST",
             
               data: {
                   user_token:$(this).val()
               },
               success:function(res){
                       console.log(res)
                       var stringhtml = '<div class="form-group"> <label for="usr">支払い方針</label>';
                       stringhtml += '<select id="payment_select" class="form-control category-select">';
                       $.each(res['paymentlist'],function(i,payment){
                           stringhtml += '<option value="'+ payment['policyID']+'">' + payment['policyName'] + '</option>';
                       });
                       stringhtml += '</select>';
                       $('#paymentDiv').html(stringhtml);

                       var stringhtml = '<div class="form-group"> <label for="usr">返品規則</label>';
                       stringhtml += '<select id="return_select" class="form-control category-select">';
                       $.each(res['returnlist'],function(i,returnPolicy){
                           stringhtml += '<option value="'+ returnPolicy['policyID']+'">' + returnPolicy['policyName'] + '</option>';
                       });
                       stringhtml += '</select>';
                       $('#returnDiv').html(stringhtml);

                       var stringhtml = '<div class="form-group"> <label for="usr">配送ポリシー:</label>';
                       stringhtml += '<select id="shipping_select" class="form-control category-select">';
                       $.each(res['shippinglist'],function(i,shipping){
                           stringhtml += '<option value="'+ shipping['policyID']+'">' + shipping['policyName'] + '</option>';
                       });
                       stringhtml += '</select>';
                       $('#shippingDiv').html(stringhtml);

                       var stringhtml = '<div class="form-group"> <label for="usr">換率</label>';
                       stringhtml += '<input type="text" style="height:30px !important;" class="form-control" id="rating" >';
                       $('#ratingDiv').html(stringhtml);

                       var stringhtml = '<div class="form-group"> <label for="usr">利益率</label>';
                       stringhtml += '<input type="text" style="height:30px !important;" class="form-control" id="price_time" >';
                       $('#price_timeDiv').html(stringhtml);

                     



       },
       error:function(){

       }
   });//ajax end
 });

  $('#list_product_btn').click(function(){
         alert("starting listing product");
        var store_token = $(".store-select").val();
        var payment_policy_id = $("#payment_select").val();
        var payment_policy_name = $("#payment_select option:selected").text();
        var return_policy_id = $("#return_select").val();
        var return_policy_name = $("#return_select option:selected").text();
        var shipping_policy_id = $("#shipping_select").val();
        var shipping_policy_name = $("#shipping_select option:selected").text();
        var rating = $("#rating").val();
        var price_time = $("#price_time").val();
        console.log(rating,price_time);
        var category_list = [];
        var result = [];
        $('#example tbody').find('tr').each(function(index){
             var category = $(this).find('td').eq(1).text();
             var ebay_id = $(this).find('td').eq(4).text();
             var item ={category:category,ebay_id:ebay_id};
             category_list.push(item);
               
        });
        console.log(category_list)
        $.ajax({
            url:"http://3.135.237.73:80/index.php/api/saveCategory",
            type:"post",
            async:false,
            data:{
                store_token:store_token,
                payment_name:payment_policy_name,
                payment_id:payment_policy_id,
                return_name:return_policy_name,
                return_id:return_policy_id,
                shipping_name:shipping_policy_name,
                shipping_id:shipping_policy_id,
                rating:rating,
                price_time:price_time,
                category_list:category_list
            },
            success:function(res){
              
             
            },
            error:function(res){

            }
        });

        $.ajax({
            url:"http://3.137.204.209:80/api/getProduct",
            type:"POST",
            async:false,
            data:{
              
            },
            success:function(res){
                result = res;
           
            },
            error:function(){

            }
        });

               product_count = result.length;
               length = product_count;
               progressbar_per_width = 100 / product_count;
               console.log("product_count=>",product_count,"progressbar_width=>",progressbar_per_width)
              
               $.each(result, function(i,item){
                    console.log(i)
                    // progressbar();
                  
                 
                    // toastr.success("success");
                    productlist(i,item);
                    var count = product_count-1;
                   
                    if(i==count){
                         
                    
                      // toastr.success("");
                     
                      var elem = document.getElementById("myBar");
                      // elem.style.width = 0 + "%";
                      progressbar_width = 0;
                    }

               });

  });

});