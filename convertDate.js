
var monthNameThaiFull = new Array("มกราคม","กุมภาพันธ์","มีนาคม","เมษายน","พฤษภาคม","มิถุนายน","กรกฎาคม","สิงหาคม","กันยายน","ตุลาคม","พฤษจิกายน","ธันวาคม");
var monthNameThaiShot = new Array('ม.ค.','ก.พ.','มี.ค.','เม.ย.','พ.ค.','มิ.ย.','ก.ค.','ส.ค.','ก.ย.','ต.ค.','พ.ย.','ธ.ค.');
var dayNameThaiFull   = new Array('อาทิตย์', 'จันทร์', 'อังคาร', 'พุธ', 'พฤหัสบดี', 'ศุกร์', 'เสาร์');
var dayNamesThaiShot  = new Array('อา.','จ.','อ.','พ.','พฤ.','ศ.','ส.');
var monthNameEngFull  = new Array("January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December");
var monthNameEngShot  = new Array("Jan", "Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec");


function monthNameToNum(fullDate,formate) {
  var day;
  var month;
  var year;
  if(fullDate != null && fullDate.length > 0){
      var res = fullDate.split(" ");
       day = res[0];
       month = monthNameThaiShot.indexOf(res[1]);
       month = month ? month + 1 : 'error month';
       year = Number(res[2])-543;

      return day +"/"+ month + "/" + year
  }
    return 'error';
}

console.log(monthNameToNum("20 มี.ค. 2537"));
