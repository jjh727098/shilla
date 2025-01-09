// lenis 마우스 스크롤 효과

const lenis = new Lenis()

lenis.on('scroll', ScrollTrigger.update)

gsap.ticker.add((time)=>{
  lenis.raf(time * 600)
})

gsap.ticker.lagSmoothing(0)

// 로딩화면
const paths = document.querySelectorAll(".loading-container svg path"); // 모든 path 요소 선택

// 로딩 중 Lenis 스크롤 비활성화
lenis.stop(); // Lenis 스크롤 멈춤

const timeline = gsap.timeline({
  defaults: {
    duration: 0.5,
    ease: "power2.out",
  }
});

// 각 글자 애니메이션
paths.forEach((path, index) => {
  timeline.fromTo(
    path,
    { opacity: 0, y: index % 2 === 0 ? -30 : 30 },
    { opacity: 1, y: 0 },
    index * 0.1
  );
});

// 전체 글자 유지
timeline.to(paths, { opacity: 1, duration: 3 }, "+=0");

// 글자 색상 흰색으로 변경
timeline.to(paths, { fill: "white", duration: 0.5 });

// 1초 멈춤
timeline.to({}, { duration: 1 });

// 배경색과 로딩 종료
timeline.to(paths, { opacity: 0, y: (i) => (i % 2 === 0 ? 30 : -30), duration: 0.5 });
timeline.to(".loading-container", { backgroundColor: "#3e2b2c", duration: 0.5 }, "<");
timeline.to(".loading-container", {
  opacity: 0,
  duration: 0.5,
  onComplete: () => {
    document.querySelector(".loading-container").style.display = "none";

    // Lenis 스크롤 다시 활성화
    lenis.start();
  }
});

// 헤더 스크롤 고정
let lastScroll = 0;

$(window).scroll(function () {
    curr = $(this).scrollTop();


    if (curr > lastScroll) {
        $('header').addClass('hide')
    } else {
        $('header').removeClass('hide')
    }
    lastScroll = curr;
})

// 헤더 스크롤 클래스명 추가
const headerTl = gsap.timeline({
  scrollTrigger:{
    trigger: ".sc_story",
    start: '0% 0%',
    endTrigger: '#footer',
    end: '100% 100%',
    //markers: true,
    scrub:0,
    toggleClass: {
      className: "active",
      targets: "#header"
    }
  }
})

// 메인 영상 영역
const video = document.getElementById("main_player");
const progressBar = document.querySelector(".progress");

// 영상의 현재 진행 상태를 업데이트
video.addEventListener("timeupdate", () => {
  const progress = (video.currentTime / video.duration) * 100;
  gsap.to(progressBar, { width: `${progress}%`, duration: 0.1 });
});

// 진행 바 클릭으로 영상 위치 변경
const progressArea = document.querySelector(".progress_area");
progressArea.addEventListener("click", (e) => {
  const rect = progressArea.getBoundingClientRect();
  const clickPosition = e.clientX - rect.left;
  const newTime = (clickPosition / rect.width) * video.duration;
  video.currentTime = newTime;
});

// 전체 화면 토글
const fullscreenBtn = document.querySelector(".fullscreen_btn");
fullscreenBtn.addEventListener("click", () => {
  if (!document.fullscreenElement) {
    video.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
});

// 메뉴버튼 클릭시 모달창 
$('.menu_box').click(function(){
  $('.group_aside').addClass('open');
  $('body').css('overflow','hidden');
})
$('.close_btn_box').click(function(){
  $('.group_aside').removeClass('open');
  $('body').css('overflow','auto');
})

// 마우스 이벤트
const cursor = document.querySelector(".group_cursor");
const cursor2 = document.querySelector(".play_btn");
const cursor3 = document.querySelector(".discover_btn");
const cursor4 = document.querySelector(".pause_btn");

// 커서 좌표값 할당
window.addEventListener("mousemove", e => {
    gsap.to(cursor, {left: e.clientX - 5, top: e.clientY - 5 });  
});
$("#header").on("mouseenter", function() {
  cursor2.classList.remove("load");
});
$(".loading-container").on("mouseenter", function() {
  cursor2.classList.remove("load");
});
$("#header").on("mouseleave", function() {
  cursor2.classList.add("load");
});
$(".sc_story").on("mouseenter", function() {
  cursor2.classList.remove("load");
});
$(".video_controls").on("mouseenter", function() {
  cursor2.classList.remove("load");
  cursor4.classList.remove("load");
});
$(".video_controls").on("mouseleave", function() {
  cursor4.classList.add("load");
});
$(".sc_visual").on("mouseenter", function() {
  cursor2.classList.add("load");
});
$(".sc_innovation").on("mouseenter", function() {
  cursor3.classList.add("load");
  cursor2.classList.remove("load");
});
$(".sc_innovation").on("mouseleave", function() {
  cursor3.classList.remove("load");
});
$(".progress_area").on("mouseenter", function() {
  cursor4.classList.remove("load");
});
$(".progress_area").on("mouseleave", function() {
  cursor4.classList.add("load");
});
$(".sc_story_v2").on("mouseenter", function() {
  cursor2.classList.remove("load");
});
$(".sc_sustain").on("mouseenter", function() {
  cursor2.classList.remove("load");
});
$(".sc_join").on("mouseenter", function() {
  cursor2.classList.remove("load");
});
$("#footer").on("mouseenter", function() {
  cursor2.classList.remove("load");
});


$('.group_cursor').click(function () {
  let video = $("#main_player").get(0);

  if ($('.group_video_player').hasClass('open')) {
      // 이미 열려 있을 경우 닫기
      video.pause(); // 영상 멈춤
      video.currentTime = 0; // 영상 처음으로 이동
      $('.group_video_player').removeClass('open');
      $('.play_btn').addClass('load');
      $('.pause_btn').removeClass('load');
  } else {
      // 닫혀 있을 경우 열기
      video.currentTime = 0; // 영상 처음으로 이동
      video.play(); // 영상 재생
      $('.group_video_player').addClass('open');
      $('.play_btn').removeClass('load');
      $('.pause_btn').addClass('load');
  }
});

// parallax_thumb 공통영역
const story_v2Tl = gsap.timeline({
  scrollTrigger: {
      trigger: ".sc_story_v2",
      start: "0% 0%",
      end: "100% 100%",
      scrub: true,
      //markers: true,
      ease:'Power4'
  }
})
story_v2Tl.from(".parallax_thumb_box img",{y:-200});
story_v2Tl.to(".parallax_thumb_box img",{y:200});

// visual 타임라인
gsap.registerPlugin(ScrollTrigger);

const visualTl = gsap.timeline({
    scrollTrigger: {
        trigger: ".sc_visual",
        start: "top top",
        end: "bottom 50%",
        scrub: true,
        //markers: true,
    }
})
visualTl.to(".sc_visual .group_marquee",{xPercent:-10},'a');
visualTl.to(".sc_visual .mask_area .bar",{
  '--h':100,
  stagger:{
    from:"end",
    each:0.01,
  },
},'a');

// story 타임라인
$('[data-scroll="parent"]').each(function(){
  const storyTl = gsap.timeline({
    scrollTrigger: {
        trigger: $(this),
        start: "0% 100%",
        end: "bottom 0%",
        scrub: true,
        ease:'Power4',
        // markers: true,
    }
  })
  storyTl.from($(this).find('[data-scroll="img"]'),{y:-130});
  storyTl.to($(this).find('[data-scroll="img"]'),{y:130});
})

// join 타임라인
const joinTl = gsap.timeline({
  scrollTrigger: {
      trigger: ".sc_join",
      start: "0% 20%",
      endTrigger:"#footer",
      end: "100% 100%",
      scrub: true,
      //markers: true,
      ease:'easeIn'
  }
})
joinTl.from(".join_thumb_box img",{y:-200});
joinTl.to(".join_thumb_box img",{y:200});

// sustain 타임라인
const sustainTl = gsap.timeline({
  scrollTrigger: {
      trigger: ".sc_sustain",
      start: "0% 0%",
      end: "100% 100%",
      scrub: true,
      //markers: true,
  }
})
sustainTl.from(".sc_sustain .group_marquee",{xPercent:-10});

// innovation 타임라인

const splitLines = new SplitType('.sc_innovation .text_effect_v2', {types: 'lines'});

gsap.set('.tt01 .line',{autoAlpha:1})
gsap.set('.poster_desc01 .line',{autoAlpha:1})

gsap.set('.tt02 .line',{autoAlpha:0})
gsap.set('.tt03 .line',{autoAlpha:0})
gsap.set('.tt04 .line',{autoAlpha:0})
gsap.set('.tt05 .line',{autoAlpha:0})

gsap.set('.poster_desc02 .line',{autoAlpha:0})
gsap.set('.poster_desc03 .line',{autoAlpha:0})
gsap.set('.poster_desc04 .line',{autoAlpha:0})
gsap.set('.poster_desc05 .line',{autoAlpha:0})

innotitleShow1 = gsap.to('.tt01 .line',{ paused:true, autoAlpha:0, stagger:0.1})
innotitleShow2 = gsap.to('.tt02 .line',{ paused:true, autoAlpha:1, stagger:0.1})
innotitleShow3 = gsap.to('.tt03 .line',{ paused:true, autoAlpha:1, stagger:0.1})
innotitleShow4 = gsap.to('.tt04 .line',{ paused:true, autoAlpha:1, stagger:0.1})
innotitleShow5 = gsap.to('.tt05 .line',{ paused:true, autoAlpha:1, stagger:0.1})

innodescShow1 = gsap.to('.poster_desc01 .line',{ paused:true, autoAlpha:0, stagger:0.1})
innodescShow2 = gsap.to('.poster_desc02 .line',{ paused:true, autoAlpha:1, stagger:0.1})
innodescShow3 = gsap.to('.poster_desc03 .line',{ paused:true, autoAlpha:1, stagger:0.1})
innodescShow4 = gsap.to('.poster_desc04 .line',{ paused:true, autoAlpha:1, stagger:0.1})
innodescShow5 = gsap.to('.poster_desc05 .line',{ paused:true, autoAlpha:1, stagger:0.1})

const innovationTl = gsap.timeline({
    scrollTrigger: {
        trigger: ".sc_innovation",
        start: "top top",
        end: "bottom bottom",
        toggleClass:{
          targets:"body",
          className:"fix"
        },
        scrub: true,
        //markers: true,
        
        onUpdate:function(self){

          if (self.progress > 0.75) {
            gsap.delayedCall(0.5, () => { 
              innotitleShow5.play();
              innodescShow5.play();
            });

            innotitleShow4.reverse();
            innodescShow4.reverse();
            innotitleShow3.reverse();
            innodescShow3.reverse();
            innotitleShow2.reverse();
            innodescShow2.reverse();
          } else if (self.progress > 0.55) {
            gsap.delayedCall(0.5, () => {
            innotitleShow4.play();
            innodescShow4.play();
           });

            innotitleShow5.reverse();
            innodescShow5.reverse();
            innotitleShow3.reverse();
            innodescShow3.reverse();
            innotitleShow2.reverse();
            innodescShow2.reverse();
          } else if (self.progress > 0.3) {
            gsap.delayedCall(0.5, () => {
            innotitleShow3.play();
            innodescShow3.play();
            });

            innotitleShow4.reverse();
            innodescShow4.reverse();
            innotitleShow5.reverse();
            innodescShow5.reverse();
            innotitleShow2.reverse();
            innodescShow2.reverse();
          } else if (self.progress > 0.2) {
            innotitleShow2.play();
            innodescShow2.play();
            
            innotitleShow3.reverse();
            innodescShow3.reverse();
            innotitleShow4.reverse();
            innodescShow4.reverse();
            innotitleShow5.reverse();
            innodescShow5.reverse();
          } else {
            innotitleShow2.reverse();
            innodescShow2.reverse();
            innotitleShow3.reverse();
            innodescShow3.reverse();
            innotitleShow4.reverse();
            innodescShow4.reverse();
            innotitleShow5.reverse();
            innodescShow5.reverse();
          }
        
          if (self.progress > 0.15) {
            innotitleShow1.play();
            innodescShow1.play();
          }else{
            innotitleShow1.reverse();
            innodescShow1.reverse();
          }

        }
    }
})

innovationTl.to(".thumub_01 .i", {
  'clip-path': 'inset(0% 0% 100% 0%)',
  stagger:0.1,
  duration: 1.5,
},'a')
innovationTl.to(".thumb02", {
  '--mask' : 'inset(0% 0% 0% 0%)',
  duration: 4,
},'a')
innovationTl.to(".placeholder", {
  opacity : 0,
},'a')
innovationTl.to(".current_wrap", {
  yPercent : -100,
  duration: 4,
},'a')


innovationTl.to(".thumub_02 .i", {
  'clip-path': 'inset(0% 0% 0% 0%)',
  stagger:0.1,
  duration: 1.5,
},"b")
innovationTl.to(".thumub_02 .i", {
  'clip-path': 'inset(100% 0% 0% 0%)',
  stagger:0.1,
  duration: 1.5,
},"b")
innovationTl.to(".thumb03", {
  '--mask' : 'inset(0% 0% 0% 0%)',
  duration: 4,
},"b")
innovationTl.to(".current_wrap", {
  yPercent : -200,
  duration: 4,
},'b')

innovationTl.to(".thumub_03 .i", {
  'clip-path': 'inset(0% 0% 0% 0%)',
  stagger:0.1,
  duration: 1.5,
},"c")
innovationTl.to(".thumub_03 .i", {
  'clip-path': 'inset(100% 0% 0% 0%)',
  stagger:0.1,
  duration: 1.5,
},"c")
innovationTl.to(".thumb04", {
  '--mask' : 'inset(0% 0% 0% 0%)',
  duration: 4,
},"c")
innovationTl.to(".current_wrap", {
  yPercent : -300,
  duration: 4,
},'c')

innovationTl.to(".thumub_04 .i", {
  'clip-path': 'inset(0% 0% 0% 0%)',
  stagger:0.1,
  duration: 1.5,
},"d")
innovationTl.to(".thumub_04 .i", {
  'clip-path': 'inset(100% 0% 0% 0%)',
  stagger:0.1,
  duration: 1.5,
},"d")
innovationTl.to(".thumb05", {
  '--mask' : 'inset(0% 0% 0% 0%)',
  duration: 4,
},"d")
innovationTl.to(".current_wrap", {
  yPercent : -400,
  duration: 4,
},'d')

innovationTl.to(".thumub_05 .i", {
  'clip-path': 'inset(0% 0% 0% 0%)',
  stagger:0.1,
})


/* 링크에 따라 이미지 변경 (aside + sustain)*/
$('.aside_container .menu_item a').mouseenter(function() {
  const data = $(this).data('image');

  const html = `
    <div class="aside_thumb_item active">
        <img src="${data}" alt id="aside_img01">
    </div>
  `;

  const $thumbList = $('.aside_thumb_list');
  
  // 새로운 요소 추가
  $thumbList.append(html);

  // 자식 요소가 5개를 초과하면 첫 번째 요소 제거
  if ($thumbList.children().length > 15) {
    $thumbList.children().first().remove();
  }
});

$('.sc_sustain .group_btn a').mouseenter(function() {
  const data = $(this).data('image');

  const html = `
  <div class="sustain_thumb_box active">
      <img src="${data}" alt id="sustain_img01">
  </div>
  `;

  const $thumbList = $('.sustain_thumb_area');

  // 새로운 요소 추가
  $thumbList.append(html);

  // 자식 요소가 5개를 초과하면 첫 번째 요소 제거
  if ($thumbList.children().length > 15) {
    $thumbList.children().first().remove();
  }
});

// 텍스트 효과
const text = gsap.utils.toArray(".text_effect");
        
text.forEach(target => {
let SplitClient = new SplitType(target, {type: "lines, words, chars"});
let lines = SplitClient.lines;

gsap.from(lines, {
    yPercent: 100,
    autoAlpha: 0,
    duration: 1,
    scrollTrigger: {
    trigger: target,
    start: "top bottom",
    end: "+=400",
    markers: false
    }
  });
});
