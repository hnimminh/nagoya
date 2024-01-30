
$(function(){

  telLink();
  waypointsInit();
  slicksliderInit();
  charactersChangeInit();
  navbutton();
  accordionInit();
  scrollUpDown();
  readmoreInit();
  moveToInit();
  cbpHorizontalMenu.init();

  pageScrollInit();

});

jQuery.event.add(window,"load",function(){

  setTimeout(function(){
  }, 250);

});


// telリンク無効化
var telLink = function() {
  var ua = navigator.userAgent;
  if(ua.indexOf("iPhone") < 0 && ua.indexOf("Android") < 0){
    $("a.tel-link").contents().unwrap().parent().wrapInner('<span class="tel-link"></span>');
  }
};

// Waypoints
var waypointsInit = function() {
  $('#main').waypoint({
    handler: function(direction) {
      $('#header, #pagetop').toggleClass('fixed');
    },
    offset: -150
  });
  $('#wrapper').waypoint({
    handler: function(direction) {
      $('#nav').toggleClass('fixed');
    },
    offset: -105
  });
};

// slick（画像のみ）
var slicksliderInit = function() {
  var $slider = $('#slick-slider');
  $slider.on('init', function(){
  });
  $slider.slick({
    // fade: false,
    fade: true,
    dots: true,
    infinite: true,
    speed: 450,
    centerMode: true,
    centerPadding: 0,
    // slidesToShow: 3,
    slidesToShow: 1,
    autoplay: true,
    autoplaySpeed: 6000,
    adaptiveHeight: false,
    accessibility: false,
    pauseOnHover: false,
    swipeToSlide: true,
    // touchThreshold: 10,
    // variableWidth: true,
    variableWidth: false,
    appendDots: '#slider-dots',
    appendArrows: '#slider-arrow',
    prevArrow: '<span class="slider-prev"></span>',
    nextArrow: '<span class="slider-next"></span>',
    responsive: [
      {
        // breakpoint: 1280,
        // settings: {
        //   fade: true,
        //   variableWidth: false,
        //   centerPadding: 0,
        //   slidesToShow: 1
        // }
      }
    ]
  });
};

// 全角英数を半角英数に自動変換
var charactersChangeInit = function() {
  $("#forms .js-characters-change").blur(function(){
    charactersChange($(this));
  });
  charactersChange = function(ele){
    var val = ele.val();
    var han = val.replace(/[Ａ-Ｚａ-ｚ０-９！＂＃＄％＆＇（）＊＋，－．／：；＜＝＞？＠［＼］＾＿｀｛｜｝]/g,function(s){return String.fromCharCode(s.charCodeAt(0)-0xFEE0)});
    if(val.match(/[Ａ-Ｚａ-ｚ０-９！＂＃＄％＆＇（）＊＋，－．／：；＜＝＞？＠［＼］＾＿｀｛｜｝]/g)){
      $(ele).val(han);
    }
  }
};

// ナビゲーション開閉
var navbutton = function() {
  // Toggle button
  $('#nav-button').on('click', function() {
    $('html').toggleClass('nav-open');
  });
  // Close button
  $('#nav-screen, #nav-close-button, #nav a.js-scroll').on('click', function() {
    $('html').removeClass('nav-open');
  });
};

// アコーディオン
// https://www.w3schools.com/howto/howto_js_accordion.asp
var accordionInit = function() {
  var acc = document.getElementsByClassName("accordion-button");
  var i;
  for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function() {
      this.classList.toggle("active");
      var panel = this.nextElementSibling;
      if (panel.style.maxHeight){
        panel.style.maxHeight = null;
      } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
      panel.classList.toggle("active");
    });
  }
};

// 上スクロールで表示、下スクロールで非表示
var scrollUpDown = function() {
  var $elements = $('#wrapper');
  var startPos = 0, winScrollTop = 0, offsetPos = 200;
  $(window).on('scroll',function(){
    var winScrollTop = $(this).scrollTop();
      if (winScrollTop >= startPos) {
        if ($(window).scrollTop() >= offsetPos) {
          $elements.addClass('hide');
        }
      } else {
        $elements.removeClass('hide');
      }
      startPos = winScrollTop;
  });
};

// 取扱業務用
var readmoreInit = function() {
  $('.business-content-more').on('click', function(){
    $(this).parents('.business-inner').toggleClass('content-open');
  });
}

// moveTo
var moveToInit = function() {
  const easeFunctions = {
    easeInQuad: function (t, b, c, d) {
      t /= d;
      return c * t * t + b;
    },
    easeOutQuad: function (t, b, c, d) {
      t /= d;
      return -c * t* (t - 2) + b;
    }
  }
  const moveTo = new MoveTo({
    ease: 'easeInQuad'
  }, easeFunctions);
  const triggers = document.getElementsByClassName('js-scroll');
  for (var i = 0; i < triggers.length; i++) {
    moveTo.registerTrigger(triggers[i]);
  }
};


var pageScrollInit = function() {
  var urlHash = location.hash;
  var animeSpeed = 500;
  if(urlHash) {
      $('body,html').stop().scrollTop(0);
      setTimeout(function(){
          var target = $(urlHash);
          var position = target.offset().top;
          $('body,html').stop().animate({scrollTop:position}, animeSpeed);
      }, 100);
  }
  $('a[href^="#"]').on({
      'click': function(){
          var href= $(this).attr("href");
          var target = $(href);
          var position = target.offset().top;
          $('body,html').stop().animate({scrollTop:position}, animeSpeed);
          $('.nav-close-button').trigger('click'); 
      }
  });
}