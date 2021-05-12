const searchEl = document.querySelector('.search');
const searchInputEl = searchEl.querySelector('input');

searchEl.addEventListener('click', function(){
  // html 요소에 focus 강제 적용
  searchInputEl.focus();
});

searchInputEl.addEventListener('focus', function(){
  searchEl.classList.add('focused');
  // html요소에 속성과 속성값 추가
  searchInputEl.setAttribute('placeholder', '통합검색');
});
//focus의 반대 개념은 blur
searchInputEl.addEventListener('blur', function(){
  searchEl.classList.remove('focused');
  searchInputEl.setAttribute('placeholder', '');
});

const badgeEl = document.querySelector('header .badges');
const toTopEl = document.querySelector('#to-top');
//window 객체 : 브라우저 화면 자체
//addEventListener 두번째 인수로 그냥 함수를 쓰게 되면,
//scroll될 때마다 함수가 매우 많이 실행되게 되므로 과부하걸릴수도
//따라서 스크롤을 할 때 함수가 어느정도 제한되게 실행될 수 있도록
//제어해주는 것이 lodash library의 throttle 기능
//함수가 0.3초씩 제한돼서 실행되도록 제어
//_.throttle(함수, 시간)
//애니메이션 처리해주는 라이브러리 gsap
window.addEventListener('scroll', _.throttle(function(){
  //window의 scrollY - 얼마나 스크롤됐는지 수량화된 정도 파악 가능
  if(window.scrollY > 500) {
    //배지 숨기기
    //badgeEl.style.display = 'none';
    gsap.to(badgeEl, .6, {
      opacity: 0, //애니메이션에 의해 자연스럽게 사라지도록 하려고
      display: 'none' //아예 요소를 없애기
    });
    //버튼 보이기
    gsap.to(toTopEl, .2, {
      x: 0
    });

  }else {
    //배지 보이기
    //badgeEl.style.display = 'block';
    gsap.to(badgeEl, .6, {
      opacity: 1,
      display: 'block'
    });
    //버튼 숨기기
    gsap.to(toTopEl, .2, {
      x: 100
    });
  }
},300));

toTopEl.addEventListener('click', function(){
  gsap.to(window, .7, {
    scrollTo: 0
  })
});


const fadeEls = document.querySelectorAll('.visual .fade-in');
fadeEls.forEach(function(fadeEl,index){
  gsap.to(fadeEl,1,{
    delay: (index+1)*.7, //각 fadeEl이 순차적으로 애니메이션 적용되도록
    //0.7 1.4 2.1 2.8초의 딜레이가 각각 걸린다.
    opacity: 1
  });
});


// SWIPER
//new Swiper(선택자, 옵션)
new Swiper('.notice-line .swiper-container',{
  direction: 'vertical',
  autoplay: true, //자동재생
  loop: true //반복재생
});

new Swiper('.promotion .swiper-container',{
  slidesPerView: 3, //한번에 보여줄 슬라이드 개수
  spaceBetween: 10, //슬라이드 사이 여백 (단위 픽셀)
  centeredSlides: true, //1번 슬라이드가 가운데 보이기
  loop: true,
  autoplay: {
    delay: 5000 //5초
  },
  pagination: {
    el: '.promotion .swiper-pagination', //페이지 번호 요소 선택자
    clickable: true //사용자가 페이지 번호 요소를 제어 가능한지
  },
  navigation: {
    prevEl: '.promotion .swiper-prev',
    nextEl: '.promotion .swiper-next'
  }
});

new Swiper('.awards .swiper-container', {
  autoplay: true,
  loop: true,
  spaceBetween: 30,
  slidesPerView: 5,
  navigation: {
    prevEl: '.awards .swiper-prev',
    nextEl: '.awards .swiper-next'
  }
});


const promotionEl = document.querySelector('.promotion');
const promotionToggleBtn = document.querySelector('.toggle-promotion');
let isHidePromotion = false; //보여지고 있다
promotionToggleBtn.addEventListener('click', function(){
  isHidePromotion = !isHidePromotion; //반대의 상태를 저장
  if(isHidePromotion) {
    //숨김처리
    promotionEl.classList.add('hide');
  }else {
    //보여짐 처리
    promotionEl.classList.remove('hide');
  }
});

// 범위 랜덤 함수(소수점 2자리까지)
function random(min, max) {
  // `.toFixed()`를 통해 반환된 문자 데이터를,
  // `parseFloat()`을 통해 소수점을 가지는 숫자 데이터로 변환
  return parseFloat((Math.random() * (max - min) + min).toFixed(2))
}

function floatingObject(selector, delay, size) {
  gsap.to(selector, random(1.5, 2.5), {
    y: size, //y축으로 밑으로 size만큼 1번 움직임
    repeat: -1, //몇 번 반복할거냐. -1은 무한대
    yoyo: true, //역재생 가능
    ease: Power1.easeInOut, //구글에 gsap easing 검색해서 사이트 접속 후, 옵션 부분만
    delay: random(0, delay) //처음에 1초동안 기다렸다가 애니메이션 실행
  });
}
floatingObject('.floating1', 1, 15);
floatingObject('.floating2', 0.5, 15);
floatingObject('.floating3', 1.5, 20);


const spyEls = document.querySelectorAll('section.scroll-spy');
spyEls.forEach(function(spyEl){
  //메소드 체이닝
  new ScrollMagic
    .Scene({
      triggerElement: spyEl, //감시할 요소를 지정
      triggerHook: .8 //감시하고 있는 요소가 뷰포트의 어떤 지점에서 걸리는가
      //triggerHook 부분에서 감시할 요소가 걸리면 setClassToggle 메소드 실행됨
    })
    .setClassToggle(spyEl, 'show') //show라는 클래스를 넣었다 뺐다 할거다
    .addTo(new ScrollMagic.Controller());
});

const thisYear = document.querySelector('.this-year');
thisYear.textContent = new Date().getFullYear();