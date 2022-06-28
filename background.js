
chrome.browserAction.onClicked.addListener(function(a){

		// chrome.windows.getCurrent(function(a){parentWindowId=a.id});
	    // window.open(chrome.extension.getURL("login.html?tabid="+encodeURIComponent(a.id)+"&url="+encodeURIComponent(a.url)),
		// "Table Scraper","toolbar=0,scrollbars=0,location=0,statusbar=0,menubar=0,resizable=1,width=1200,height=800");
      
        // chrome.storage.local.get(["user_name"],function(res){
        //      if(res['user_name']==undefined){
                 
        //             chrome.tabs.create({
        //                 url: 'login.html'
        //             });
        //      }
        //      else{
        //         chrome.tabs.create({
        //             url: 'importAsin.html'
        //      });
        //      }
            
        // });

            chrome.tabs.create({
                    url: 'importAsin.html'
             });
             chrome.storage.local.set({ 'index': 0 }, function(){});

	});
  

 function check(asinItem){
      
  
            
            
                                      
                                          var productasin = asinItem;
                                          var productlist = [];
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
                                                      var productImageArray = [];
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
                                      
                                          // console.log("productItem",productItem);
                                          // console.log(productlist)
                                          return productlist;
           
            
                                  }
      
                     



setInterval(function() { 

  
    var i = 1;
        var check_product;
      
        chrome.storage.local.get( ['index'], function(res){
            console.log(res['index']);
            if(res['index'] == 0)
            {
                $.ajax({
                    url:"http://3.135.237.73:80/index.php/api/getCheckAsin",
                    type:'GET',
                    data:{
                    },
                    success:function(res){
                        var product_count = res['data'].length;
                        chrome.storage.local.set({ "count": product_count }, function(){});    
                        chrome.storage.local.set({ "products":res['data'] }, function(){});
                        chrome.storage.local.set({ "index":i}, function(){});
                        check_product = res['data'][0];
                        var index = 1;
                        console.log(index);
                        chrome.storage.local.set({"index":index},function(){});  
                    },
                    error:function(){
         
                    }
                 });
            }
            
            else{
               chrome.storage.local.get(['products'],function(res){
                     
                   var product_list = res['products'];
                   
                   chrome.storage.local.get(['index'],function(res){
                        var index = res['index'];
                        chrome.storage.local.get(['count'],function(res){
                            var count = res['count'];
                            // console.log(index,count);
                            // console.log(product_list[index]['asin'])
                            check_product = product_list[index];
                            if(index ==count){
                                console.log("same")
                                index = 0;
                                chrome.storage.local.set({'index': index},function(){});
                            }
                            else{
                                console.log("hello",index)
                                check_product = product_list[index];
                                // console.log(check_product)
                                index = index +1;
                                chrome.storage.local.set({'index':index},function(){});
                            
                                var store_token = check_product['store_token'];
                                var item_id = check_product['ItemID'];
                                console.log("itemid=>",item_id)
                                var result = check(check_product['asin']);

                                console.log("quantity=>",result[0]['quantity']);
                                if(!$.isNumeric(result[0]['quantity'])){
                                    console.log("Null")
                                     $.ajax({
                                          url:"http://3.137.204.209:80/api/removeProduct",
                                          type:"POST",
                                          data:{
                                              store_token:store_token,
                                              item_id:item_id
                                          },
                                          success:function(res){
                          
                                          },
                                          error:function(){
                          
                                          }
                                     });
                                }
    
                                 
                            }
                        });
                    
                   });
               });
            } 
       
    
    
    
        
       });
        

 },300000);
