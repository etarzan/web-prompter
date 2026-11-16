<template>
  <footer class="control-bar" role="contentinfo">
    <RouterLink to="/prompter" class="play-btn" aria-label="Start the prompter">
      <span class="material-icons">play_circle_filled</span>
    </RouterLink>
  </footer>
</template>

<style scoped>
.control-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 56px;
  background: var(--navbar-gradient);
  border-top: 1px solid rgba(190, 130, 255, 0.20);
  box-shadow: var(--elevation-12);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
}

.play-btn {
  color: #fff;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-round);
  padding: 4px;
  transition: opacity 0.15s;
}

.play-btn:hover { opacity: 0.8; }

.play-btn .material-icons { font-size: 36px; }
</style>
