
var monthNameThaiFull = new Array("มกราคม","กุมภาพันธ์","มีนาคม","เมษายน","พฤษภาคม","มิถุนายน","กรกฎาคม","สิงหาคม","กันยายน","ตุลาคม","พฤษจิกายน","ธันวาคม");
var monthNameThaiShot = new Array('ม.ค.','ก.พ.','มี.ค.','เม.ย.','พ.ค.','มิ.ย.','ก.ค.','ส.ค.','ก.ย.','ต.ค.','พ.ย.','ธ.ค.');
var dayNameThaiFull   = new Array('อาทิตย์', 'จันทร์', 'อังคาร', 'พุธ', 'พฤหัสบดี', 'ศุกร์', 'เสาร์');
var dayNamesThaiShot  = new Array('อา.','จ.','อ.','พ.','พฤ.','ศ.','ส.');
var monthNameEngFull  = new Array("January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December");
var monthNameEngShot  = new Array("Jan", "Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec");


module.exports = {
  convertMonthNameToNumTH : function(fullDate,formate,callback) {
    var date;
    var day;
    var month;
    var year;
    var time;
    if(fullDate != null && fullDate.length != 0){
       var res = fullDate.split(" ");
       day = res[0];

       switch(formate) {
            case 'shotmonth':
                month = monthNameThaiShot.indexOf(res[1]) + 1;
                break;
            case 'fullmonth':
                month = monthNameThaiFull.indexOf(res[1]) + 1;
                break;
        }

       year = Number(res[2])-543;
       time = res[3];
       date = year+"-"+month+"-"+day+" "+time;

       return callback(date);
    }
  }
};
