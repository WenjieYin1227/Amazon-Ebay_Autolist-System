var GetOrderNumber = (function(){

    var handleGetOrderNumber = function(){
    
        chrome.storage.local.get(['orderID'],function(result){
            var orderID = result['orderID'];
            $.ajax({

                type:'POST',
                url: base_url+ '/displaySingleOrder ',
                data:{
                    order_id: orderID
                },
                success: function(res){
                    console.log(res['data']);
                },
                error:function(){

                }
            });
        });
    }

    return {
        init:function(){
            handleGetOrderNumber();
        }
    }
})();

$(function(){
      GetOrderNumber.init();
});