
  var GetAsin = (function(){
    
  var handleGetAsin = function(){
      
     $.ajax({
          url:"http://3.135.237.73:80/index.php/api/getLog",
          type:"post",
          data:{
              
          },
          success:function(res){
            let stringArray = ['抽出', '出品', '出品エラー', '削除'];
            res['data'] = res['data'].map(r => {
                  r['flag'] = stringArray[r['flag']];
                 return r;
            });
               $("#example2").DataTable({
                  "data": res['data'],
                  "columns": [
                    {"data":"asin"},
                    {"data":"title"},
                    {"data":"updated_at"},
                    {"data":"flag"}
                  ]
               });
          },
          error:function(){

          }
     });
       
  }

    return {
      init:function(){
        handleGetAsin()
      }
    }
})()


  $(function () {
    GetAsin.init();


  });

  