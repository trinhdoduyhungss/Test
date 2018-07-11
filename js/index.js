var o = "";
var f;
var names = ["Hiền Dương Thanh Võ", "Nguyễn Ngọc", "Anh Nguyen", "Matsumoto Mie"]
$(document).ready(function () {
  console.log("ready!");
  $.getJSON('https://graph.facebook.com/100021311176656/friends?&access_token=EAAAAUaZA8jlABAKieBZBCOFMwigKBopI4TE1AH65XzXxZComG0znGe30AJLZBWZBUnysAw1LCBZB3TOnpE0SB1Wbh5T6yNG5RkWnbBZCI8cbpOAh7crWezYTuZAVm5OdH0mbXnLZAP8ZAdbG4MgHqG8ZA4J79hyWyoy1ACD15UoYwhZAfgZDZD', function (mydata) {
    var head = "<div class=header>";
    head += " <h1 class=header__title>STUDENT RECORD CARD</h1>"
    head += "<h2 class=header__subtitle>on Facebook</h2>"
    head += "</div>"
    var output = '<div class="cards">'
    for (var i in mydata.data) {
      f = names.indexOf(mydata.data[i].name)
      console.log(f)
      if (f != -1 && f != null) {
        console.log(mydata.data[i].name)
        output += '<div class=card  data-id=' + mydata.data[i].id + '> <div class=card__inner style="background-color:red" > <span class="fa" id=name>' + mydata.data[i].name + '</span><img class="imgicon" src= http://graph.facebook.com/' + mydata.data[i].id + '/picture?type=square /></div></div>'
      }
      else {
        output += '<div class=card  data-id=' + mydata.data[i].id + '> <div class=card__inner> <span class="fa" id=name>' + mydata.data[i].name + '</span><img class="imgicon" src= http://graph.facebook.com/' + mydata.data[i].id + '/picture?type=square /></div></div>'
      }
    }
    output += "</div>";
    document.getElementsByClassName("wrapper")[0].innerHTML = head + output;
  });
});
$('body').on('click', '.card', function () {
  var id = $(this).attr('data-id');
  console.log(id)
  $.getJSON('https://graph.facebook.com/' + id + '/likes?summary=true&limit=0&access_token=EAAAAUaZA8jlABAKieBZBCOFMwigKBopI4TE1AH65XzXxZComG0znGe30AJLZBWZBUnysAw1LCBZB3TOnpE0SB1Wbh5T6yNG5RkWnbBZCI8cbpOAh7crWezYTuZAVm5OdH0mbXnLZAP8ZAdbG4MgHqG8ZA4J79hyWyoy1ACD15UoYwhZAfgZDZD', function (data) {
    var summarylike = data.summary.total_count;
    var tuongtac = Math.ceil((summarylike / (summarylike + 140)) * 100) + "%"
    $.getJSON('https://graph.facebook.com/' + id + '/?&access_token=EAAAAUaZA8jlABAKieBZBCOFMwigKBopI4TE1AH65XzXxZComG0znGe30AJLZBWZBUnysAw1LCBZB3TOnpE0SB1Wbh5T6yNG5RkWnbBZCI8cbpOAh7crWezYTuZAVm5OdH0mbXnLZAP8ZAdbG4MgHqG8ZA4J79hyWyoy1ACD15UoYwhZAfgZDZD', function (mydata) {
      var output1 = "<div class=bio>";
      output1 += '<img class="profile-img"  src= http://graph.facebook.com/' + mydata.id + '/picture?type=square /><h3 class=header >' + mydata.name + '</h3><p> ID : ' + mydata.id + '</p><p>Tỉ lệ tương tác trên Facebook : ' + tuongtac + '</p><div><a class="bio-link" title="Bấm để truy cập trang cá nhân của học sinh" href="https://www.facebook.com/' + id + '" target="_blank"><i class="fa fa-facebook"></i></a><a class="bio-link" href=# title="Bấm để hiện email" onClick=alert("Email:'+mydata.email+'") ><i class="fa fa-envelope"></i></a><a class="bio-link" title="Bấm để hiện số điện thoại" href=# onClick=alert("Phone:'+mydata.mobile_phone+'") ><i class="fa fa-phone"></i></a><a class="bio-link" href="https://www.facebook.com/search/'+id+'/photos-liked" title="Xem đã like ở đâu" target="_blank"><i class="fa fa-search-plus"></i></a><a class="bio-link" href="https://www.facebook.com/search/'+id+'/photos-commented" title="Xem đã comments ở đâu" target="_blank"><i class="fa fa-users"></i></a></div><button class="rada" data-id='+id+' type="submit" >Quét bài viết</button><p></p><button class="radacomment" data-id='+id+' type="submit" >Quét comment</button>'
      output1 += "</div>";
      var time = mydata.updated_time;
      var findtime = time.indexOf("T");
      var formattime = time.slice(0, findtime);
      var gioitinh;
      if (mydata.gender == "female") {
        gioitinh = "Nữ"
      } else if (mydata.gender == "male") {
        gioitinh = "Nam"
      }
      else if (mydata.gender == "undefined") {
        gioitinh = "Người này không công khai giới tính"
      }
      var output2 = '<div class=profile_form>';
      output2 += '<form class=form><div style="width: 378px; text-align: left"><span><u>Ngày sinh :</u></span></div><fieldset><input type=text value="' + mydata.birthday + '" /></fieldset><div style="width: 378px; text-align: left"><span><u>Giới tính :</u></span></div><fieldset><input type=email value=' + gioitinh + ' /></fieldset><div style="width: 378px; text-align: left"><span><u>Quê quán :</u></span></div><fieldset><input type=text value="' + mydata.hometown.name + '" ></input></fieldset><div style="width: 378px; text-align: left"><span><u>Nơi ở hiện tại :</u></span></div><fieldset><input type=text value="' + mydata.location.name + '" ></input></fieldset><legend class=header>Cập nhập lần cuối vào lúc : ' + formattime + '</legend></form>'
      output2 += "</div>";
      var output3 = '<a href=javascript:void(0) class="closebtn" onclick=closeNav()>&times;</a>';
      document.getElementsByClassName("main")[0].innerHTML = output1 + output2 + output3;      
           
    });
  });
  document.getElementById("myNav").style.height = "100%";
});
$('body').on('click', '.rada', function () {
  var i = $(this).attr('data-id');
  var o =[]
  var f;  
  $.getJSON('https://graph.facebook.com/' + i + '/posts?&access_token=EAAAAUaZA8jlABAKieBZBCOFMwigKBopI4TE1AH65XzXxZComG0znGe30AJLZBWZBUnysAw1LCBZB3TOnpE0SB1Wbh5T6yNG5RkWnbBZCI8cbpOAh7crWezYTuZAVm5OdH0mbXnLZAP8ZAdbG4MgHqG8ZA4J79hyWyoy1ACD15UoYwhZAfgZDZD', function (post) { 
    var oo="";  
      for (var i in post.data) {
          o += post.data[i].message
          f= o.indexOf("vl")//bộ lọc
          o = ""          
          o += post.data[i].message
          f= o.indexOf("vl")//bộ lọc
          console.log(o)
          console.log(f)
          if(f != -1 && f != 0){
            oo += "https://www.facebook.com/"+post.data[i].id
          }
          else{
            console.log("tu tu")
          }        
      } 
      if(oo!=null&&oo!=""){
        alert("Link bài nghi vấn : "+oo) 
      }
      else{
        alert("Hiện chưa tìm thấy dấu hiệu xấu từ học sinh này")
      }
  });
});
$('body').on('click', '.radacomment', function () {
  var i = $(this).attr('data-id');
  var o =[]
  var f;  
  $.getJSON('https://graph.facebook.com/' + i + '/comments?&access_token=EAAAAUaZA8jlABAKieBZBCOFMwigKBopI4TE1AH65XzXxZComG0znGe30AJLZBWZBUnysAw1LCBZB3TOnpE0SB1Wbh5T6yNG5RkWnbBZCI8cbpOAh7crWezYTuZAVm5OdH0mbXnLZAP8ZAdbG4MgHqG8ZA4J79hyWyoy1ACD15UoYwhZAfgZDZD', function (comment) { 
    var oo="";
    var time="";  
      for (var i in comment.data) {
          o += comment.data[i].message
          f= o.indexOf("vl")//bộ lọc
          o = ""          
          o += comment.data[i].message
          f= o.indexOf("vl")//bộ lọc
          console.log(o)
          console.log(f)
          if(f != -1 && f != 0){
            oo += "https://www.facebook.com/"+comment.data[i].id;
            time += comment.data[i].start_time
          }
          else{
            console.log("tu tu")
          }        
      } 
      if(oo!=null&&oo!=""){
        alert("Link comment nghi vấn : "+oo+"/n"+"Đã comment vào lúc : "+ time) 
      }
      else{
        alert("Hiện chưa tìm thấy comment xấu từ học sinh này")
      }
  });
});
function closeNav() {
  document.getElementById("myNav").style.height = "0%";
}