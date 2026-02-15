<script setup></script>

<template>
  <div class="about-me-name">
    <p>你好，很高兴认识你！👋</p>
    <p class="about-me-card-text-big">I'm Withnoidea .</p>
    <p>A man trying to be better.</p>
  </div>
</template>

<style scoped>
.about-me-name {
  border-radius: 12px;
  justify-content: center;
  padding: 2rem;
  color: #fff;
  background-image: linear-gradient(
    120deg,
    var(--vp-c-brand-3),
    var(--vp-c-brand-soft)
  );
  background-size: 200% 200%;

  > p {
    color: var(--vp-c-text-1);
  }
}
</style>
