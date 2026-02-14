<!-- GithubHeatmap.vue -->
<script setup>
import AboutMeText from "./AboutMeText.vue";

const username = "Withnoidea";
</script>

<template>
  <AboutMeText>
    <template #motto>
      <p class="about-me-card-title-normal">GitHub 贡献热力图</p>
      <div class="heatmap-container">
        <img
          class="github-heatmap"
          :src="`https://ghchart.rshah.org/3a5ccc/${username}`"
          :alt="`${username} 的 GitHub 贡献热力图`"
        />
      </div>
    </template>
  </AboutMeText>
</template>

<style scoped>
.heatmap-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 0.5rem;
  overflow: hidden; /* 避免放大出现滚动条 */
}

.github-heatmap {
  width: 98%;
  max-width: 800px;
  max-height: 400px; /* 控制高度 */
  border-radius: 8px;
  transition: transform 0.3s ease;
  transform-origin: center;
  object-fit: contain;
}

.github-heatmap:hover {
  transform: scale(1.01);
}
</style>
