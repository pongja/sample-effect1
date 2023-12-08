<template>
  <div id="header">
    <div class="header_wrap">
      <img class="logo" src="../../public/images/logo1.png" style="cursor:pointer" @click="dashboard()" />
      <button :class="{ 'menu_btn on': openmenu }" class="menu_btn" @click="openmenu = !openmenu">
        <nav :class="{ 'mo_gnb on': openmenu }" class="mo_gnb">
          <ul>
            <li>
              <router-link to="#">
                회사소개
              </router-link>
            </li>
            <li>
              <router-link to="#">
                사업영역
              </router-link>
            </li>
            <li>
              <router-link to="#">
                소식
              </router-link>
            </li>
          </ul>
        </nav>
      </button>
    </div>
  </div>
</template>
<script setup>
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const router = useRouter()
const openmenu = ref(false)
const dashboard = () => {
  router.push({
    path: '/',
  })
}
</script>
<style lang="scss" scoped>
@import "~/assets/scss/header.scss";
@import "~/assets/reset.css";
</style>
