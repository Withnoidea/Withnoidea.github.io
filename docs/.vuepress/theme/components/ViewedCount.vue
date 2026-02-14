<!-- ViewedCount.vue -->
<script setup>
import AboutMeText from "./AboutMeText.vue";
</script>

<template>
  <AboutMeText>
    <template #motto>
      <p class="about-me-card-title-normal">网站总访问量</p>
      <div class="count-wrapper">
        <img
          class="view-counter-sign"
          src="https://count.getloli.com/@:Withnoidea?name=%3AWithnoidea&theme=gelbooru&padding=7&offset=0&align=center&scale=1&pixelated=1&darkmode=auto"
          alt="访问人数"
        />
      </div>
    </template>
  </AboutMeText>
</template>

<style scoped>
.count-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 0.5rem;
}

.view-counter-sign {
  width: 70%; /* 放大：原先 50% 改成 70% */
  max-width: 400px; /* 限制最大宽度，避免太大溢出 */
  transition: transform 0.3s ease;
}

.view-counter-sign:hover {
  transform: scale(1.1); /* hover 时再放大 */
}
</style>
