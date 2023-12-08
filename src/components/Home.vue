<template>
  <div id="wrap">
    <ToHeader />
    <div class="content">
      <div class="mainSlider section">
        <carousel id="desk_slide" :wrap-around="true" :breakpoints="breakpoints" :autoplay="10000" :touch-drag="false"
          :mouse-drag="false" :settings="carouselSettings">
          <slide v-for="slide in slides" :key="slide.id">
            <div class="carousel__item">
              <template v-if="slide.type === 'image'">
                <div>
                  <img :src="`/images/${slide.src}`" class="msImg" />
                </div>
              </template>
              <template v-else-if="slide.type === 'video'">
                <video :src="`/video/${slide.src}`" muted autoplay loop></video>
              </template>
            </div>
          </slide>
        </carousel>
        <carousel id="mb_slide" :wrap-around="true" :breakpoints="breakpoints" :autoplay="10000" :touch-drag="false"
          :mouse-drag="false">
          <slide v-for="mbslide in mbslides" :key="mbslide">
            <div class="carousel__item">
              <template v-if="mbslide.type === 'image'">
                <img :src="`/images/${mbslide.src}`" class="msImg" />
              </template>
              <template v-else-if="mbslide.type === 'video'">
                <video :src="`public/video/${mbslide.src}`" muted autoplay loop></video>
              </template>
            </div>
          </slide>
        </carousel>

        <button type="button" class="ms_down_icon">
          <a @click="down_icon()"><img src="../../public/images/down-circle-outline.svg" alt="down_icoon" /></a>
        </button>
      </div>
      <div class="section">
        section2
      </div>
      <div class="section">
        section3
      </div>
    </div>
  </div>
</template>
<script setup>
import ToHeader from './ToHeader.vue'
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide } from 'vue3-carousel'
import { ref, onMounted, onBeforeUnmount } from 'vue'

const content = ref(null) // 보일 영역
const section = ref(null)
let page = ref(0) // 영역 포지션 초기값
const lastPage = ref(0) // 마지막 페이지
const scrollSpeed = 1 // 조절 가능한 스크롤 속도


const slides = [
  { id: 1, src: 'effect.mov', type: 'video' },
  { id: 2, src: 'main_img3.jpg', type: 'image' },
]

const mbslides = [
  { id: 1, src: 'effect.mov', type: 'video' },
  { id: 2, src: 'mb_main_img3.jpg', type: 'image' },
]



const carouselSettings = ref({
  transition: 'fade', // 여기에서 트랜지션 효과 설정
  // 나머지 설정들...
})



const handleWheel = (e) => {
  e.preventDefault()
  if (e.deltaY > 0) {
    page.value += scrollSpeed
  } else if (e.deltaY < 0) {
    page.value -= scrollSpeed
  }
  if (page.value < 0) {
    page.value = 0
  } else if (page.value > lastPage.value) {
    page.value = lastPage.value
  }
  content.value.style.top = page.value * -100 + 'vh'
}

onMounted(() => {
  content.value = document.querySelector('.content')
  section.value = document.querySelectorAll('.section')
  lastPage.value = section.value.length - 1

  window.addEventListener('wheel', handleWheel, { passive: false })
})

onBeforeUnmount(() => {
  window.removeEventListener('wheel', handleWheel)
})
</script>
<style lang="scss" scoped>
@import "~/assets/scss/main.scss";
@import "~/assets/scss/header.scss";
@import "~/assets/reset.css";

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
