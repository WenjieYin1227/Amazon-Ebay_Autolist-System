var GetOrderInformation  = (function(){

    var handleGetOrder = function(){

     var stringHTML = '';
      chrome.storage.local.get(['user_id'],function(result){
        user_id = result['user_id'];
        var inex;
              $.ajax(
                {
                    type:"GET",
                    url:"http://3.135.237.73/index.php/api/displayOrder",

                    data:{
                      user_id:user_id
                    },

                    success:function(res){
                        let orderlist = res['data'];
                        $.each(orderlist,function(i,val){
                             $.ajax({

                                type: "POST",
                                url: "http://3.135.237.73/index.php/api/displaySingleOrder",
                                data:{
                                  orderNo: val['orderNo']
                                },
                                success:function(res){
                                    console.log(res['data'][0]['orderDate']);
                                    var order = res['data'][0];
                                    index = i+1;
                                    stringHTML += '<tr style="vertical-align: baseline;">';
                                    stringHTML += '<td>'+ index +'</td>';
                                    stringHTML += '<td><div><button id="'+ val['orderNo'] +'" type="button" data-status="'+order['shippingStatus']+'" data-zipcode="'+order['zipCode']+'" data-orderdate="'+order['orderDate']+'" data-orderno="'+order['orderNo']+'" data-itemcode="'+order['itemCode']+'" data-itemtitle="'+order['itemTitle']+'" data-orderprice="'+order['orderPrice']+'" data-orderqty="'+order['orderQty']+'" data-receiver="'+order['receiver']+'" data-shippingaddr="'+order['shippingAddr']+'" data-receivemobile = "'+order['receiveMobile']+'" data-receiveremail="'+order['receiverEmail']+'" class="btn btn-primary btn-sm btn-detail" data-toggle="modal" ><i class="fas fa-edit"></i>詳細＆編集</button></div>';
                                    stringHTML += '<div><button type="button" class="btn btn-warning btn-sm" style="color: white;"  ><i class="far fa-paper-plane"></i>評価依頼メール</button></div>';
                                    stringHTML += '<div><button type="button" class="btn btn-success btn-sm"  ><i class="far fa-envelope"></i>メール履歴</button></div>';
                                    stringHTML += '<div><button type="button" class="btn btn-info btn-sm"  ><i class="fas fa-exchange-alt"></i>注文再取得</button></div>';
                                    stringHTML += '<div><button type="button" class="btn btn-secondary btn-sm"  >メール上から削除</button></div>';
                                    stringHTML += '</td>';
                                    stringHTML += '<td style="width: 20%;"><div>状態：出荷完了済</div><div>注文ステータス：未指定</div><div>決済ステータス：未指定</div><div>受注結果：未指定</div><div>支払ステータス：未指定</div><div>支払方法：Visa/MasterCard</div></td>';
                                    stringHTML += '<td><div>未入金案内：未</div><div>注文承認：済</div><div>出荷通知：済</div><div>キャンセル：未</div><div>評価依頼：未</div><button type="button" class="btn btn-info btn-sm"><i class="far fa-paper-plane"></i>自由入力メール</button></td>';
                                    stringHTML += '<td style="width:30%;"><div>Title:'+ val['itemTitle'] +'</div><div>Price:'+ val['orderPrice'] +'</div><div>Qty:'+ val['orderQty'] +'</div><div><button type="button" class="btn btn-info btn-sm"><i class="far fa-paper-plane"></i>QMS注文管理</button></div><div><button type="button" class="btn btn-info btn-sm"><i class="far fa-paper-plane"></i>送料追加確認メール</button></div></td>';
                                    stringHTML += '</tr>';
                                    $("#displayOrderTable").html(stringHTML);
                                     $(".btn-detail").click(function(){
                                      // let redirect_url = $(this).attr("id");
                                      // chrome.storage.local.set({"orderID" : redirect_url},function(){});
                                      $('#myModal').modal('show');
                                      $('#status').val($(this).data('status'));
                                      $('#orderDate').val($(this).data('orderdate'));
                                      $('#paymentDate').val($(this).data('paymentdate'));
                                      $('#orderNo').val($(this).data('orderno'));
                                      $('#itemCode').val($(this).data('itemcode'));
                                      $('#itemTitle').val($(this).data('itemtitle'));
                                      $('#orderPrice').val($(this).data('orderprice'));
                                      $('#orderQty').val($(this).data('orderqty'));
                                      $('#receiver').val($(this).data('receiver'));
                                      $('#shippingAddr').val($(this).data('shippingaddr'));
                                      $('#receiverEmail').val($(this).data('receiveremail'));
                                      $('#receiverMobile').val($(this).data('receivemobile'));
                                      $('#zipCode').val($(this).data('zipcode'));
                                      // location.href = '../orderDetail.html';
                                      console.log('data',$(this).data('orderdate'));

                                    });
                                },
                                error:function(){

                                }
                            });
                            
                        
                          });
                          
                         
                          $('#example2').DataTable({
                            "paging": true,
                            "lengthChange": false,
                            "searching": false,
                            "ordering": false,
                            "info": true,
                            "autoWidth": false,
                          });
                    },
                    error:function(){

                    }

                }
              );
            
            });
        
    }

    return {
        init:function(){
          handleGetOrder();
        }
    }
})();







$(function () {
      GetOrderInformation.init();
      // $(".btn-danger").click(function(){
      //    location.href="checkdetail.html";
      // });
      $(".btn-success").click(function(){
          location.href="listingLog.html";
      });
    $("#example1").DataTable();
   
  });