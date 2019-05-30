// 로직 --> video hover 시 event listener 로  비디오 시작하게하고
// 그 함수에서 마우스 떼는 순간 다시 시작하는 이벤트리스너를 지움과
// 동시에 비디오를 멈춘다음 처음으로 돌린다
// 모든 아이디에 대해서 작업을 진행해야 합니다
const homeVideo = document.querySelectorAll(".video_thumnail");

const handleMouseLeave = event => {
  event.currentTarget.pause();
  event.currentTarget.currentTime = 0;
};

const handleMouseOver = event => {
  event.currentTarget.play();
  event.currentTarget.muted = true;
  event.target.addEventListener("mouseleave", handleMouseLeave);
};

const init = () => {
  homeVideo.forEach(video =>
    video.addEventListener("mouseover", handleMouseOver)
  );
};

if (homeVideo) {
  init();
}
