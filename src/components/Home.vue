<template>
  <div id="wrap">
    <ToHeader />
    <div ref="contentRef" class="content">
      <div ref="section1Ref" class="section1">
        <video src="/public/video/effect.mov" muted autoplay loop></video>
        <button type="button" class="ms_down_icon">
          <a @click="down_icon()"><img src="../../public/images/down-circle-outline.svg" alt="down_icoon" /></a>
        </button>
      </div>
      <div ref="section2Ref" class="section2">
        <div class="section2-box">
          <div class="section2-textbox">
            <h4>
              <span>L</span><span>o</span><span>r</span><span>e</span><span>m</span>
              <span>i</span><span>p</span><span>s</span><span>u</span><span>m</span><span>.</span><span>.</span><span>.</span>
            </h4>
          </div>
          <div class="wrapper">
            <div ref="circle1Ref" class="circle1">
              Lorem
            </div>
            <div ref="circle2Ref" class="circle2">
              Ipsum
            </div>
            <div ref="circle3Ref" class="circle3">
              Simply
            </div>
            <div ref="circle4Ref" class="circle4">
              Dummy
            </div>
          </div>
        </div>
      </div>
      <div ref="section3Ref" class="section3">
        <div class="backimg" :style="{ backgroundImage: `url(${backgroundImage})`, opacity: opacity }">
          <div v-for="(item, index) in hoverItems" :key="index" class="hoverDiv" @mouseenter="changeBackground(index)">
            <div class="hover-textbox">
              <div class="tbox">
                <div class="blur_box"></div>
                <div class="ms_text_wrap" style="display: inline-block;">
                  <h4 class="main_title">
                    {{ item.title }}
                  </h4>
                  <p class="sub_title">
                    {{ item.subtitle }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import ToHeader from './ToHeader.vue'
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'

const section1Ref = ref(null)
const section2Ref = ref(null)
const section3Ref = ref(null)
const circle1Ref = ref(null)
const circle2Ref = ref(null)
const circle3Ref = ref(null)
const circle4Ref = ref(null)

const hoverItems = [
  { title: 'Lorem Ipsum', subtitle: 'Lorem Ipsum' },
  { title: 'Lorem Ipsum', subtitle: 'Lorem Ipsum' },
  { title: 'Lorem Ipsum', subtitle: 'Lorem Ipsum' },
]

const backgroundImage = ref('/images/building.png')
const opacity = ref(1)

const handleWheel = (e) => {
  e.preventDefault()
  if (e.deltaY > 0) {
    scrollNextSection()
  } else if (e.deltaY < 0) {
    scrollPrevSection()
  }
}

const scrollNextSection = () => {
  if (section2Ref.value.getBoundingClientRect().top < window.innerHeight / 2) {
    section3Ref.value.scrollIntoView({ behavior: 'smooth' })
  } else if (section1Ref.value.getBoundingClientRect().top < window.innerHeight / 2) {
    section2Ref.value.scrollIntoView({ behavior: 'smooth' })
  }
}

const scrollPrevSection = () => {
  if (section2Ref.value.getBoundingClientRect().top > -window.innerHeight / 2) {
    section1Ref.value.scrollIntoView({ behavior: 'smooth' })
  } else if (section3Ref.value.getBoundingClientRect().top > -window.innerHeight / 2) {
    section2Ref.value.scrollIntoView({ behavior: 'smooth' })
  }
}

const fadeInUpObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fadeInUp')
    }
  })
}, { threshold: 0.5 })

onMounted(() => {
  section1Ref.value = document.querySelector('.section1')
  section2Ref.value = document.querySelector('.section2')
  section3Ref.value = document.querySelector('.section3')
  circle1Ref.value = document.querySelector('.circle1')
  circle2Ref.value = document.querySelector('.circle2')
  circle3Ref.value = document.querySelector('.circle3')
  circle4Ref.value = document.querySelector('.circle4')
  fadeInUpObserver.observe(circle1Ref.value)
  fadeInUpObserver.observe(circle2Ref.value)
  fadeInUpObserver.observe(circle3Ref.value)
  fadeInUpObserver.observe(circle4Ref.value)
  window.addEventListener('wheel', handleWheel, { passive: false })
})

onBeforeUnmount(() => {
  window.removeEventListener('wheel', handleWheel)
  fadeInUpObserver.disconnect()
})



const changeBackground = (index) => {
  opacity.value = 0
  switch (index) {
    case 0:
      backgroundImage.value = '/images/building.png'
      break
    case 1:
      backgroundImage.value = '/images/main_img2.jpg'
      break
    case 2:
      backgroundImage.value = '/images/game.jpg'
      break
    default:
      backgroundImage.value = '/images/building.png'
  }
  nextTick(() => {
    opacity.value = 1
  })
}
</script>
<style lang="scss" scoped>
@import "~/assets/scss/main.scss";
@import "~/assets/scss/header.scss";
@import "~/assets/reset.css";
</style>
