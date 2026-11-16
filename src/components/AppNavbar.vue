<template>
  <header class="navbar" role="banner">
    <div class="navbar-inner">
      <p class="banner-title">Web Prompter</p>
      <p class="banner-sub">The simple, web-based tele prompter!</p>
    </div>
  </header>
</template>

<style scoped>
.navbar {
  background: var(--navbar-gradient);
  color: var(--navbar-text);
  box-shadow: var(--elevation-12);
  padding: 10px 16px 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  /* bottom rim that blends into the body glow */
  border-bottom: 1px solid rgba(190, 130, 255, 0.20);
}

.navbar-inner {
  text-align: center;
}

.banner-title {
  font-family: var(--font-display);
  font-size: 2rem;
  margin: 0;
  letter-spacing: 0.04em;
  color: var(--banner-color);
  text-shadow: var(--banner-shadow);
}

.banner-sub {
  font-size: 0.62rem;
  margin: 2px 0 0;
  font-family: 'Lucida Sans Unicode', 'Lucida Grande', Verdana, sans-serif;
  color: rgba(255, 220, 255, 0.70);
  letter-spacing: 0.06em;
}
</style>
