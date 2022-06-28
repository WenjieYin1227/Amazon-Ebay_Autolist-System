$(function () {

      $(".btn-danger").click(function(){
         location.href="checkdetail.html";
      });
      $(".btn-success").click(function(){
          location.href="listingLog.html";
      });
      $('#datepicker1').datepicker({
            uiLibrary: 'bootstrap4'
        });
       $('#datepicker2').datepicker({
            uiLibrary: 'bootstrap4'
        });
    $("#example1").DataTable();
    $('#example2').DataTable({
      "paging": true,
      "lengthChange": false,
      "searching": false,
      "ordering": false,
      "info": true,
      "autoWidth": false,
    });
  });