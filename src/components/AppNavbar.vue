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
  background: var(--navbar-bg);
  color: var(--navbar-text);
  box-shadow: var(--elevation-12);
  padding: 8px 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
}

.navbar-inner {
  text-align: center;
}

.banner-title {
  font-family: var(--font-display);
  font-size: 1.8rem;
  margin: 0;
  letter-spacing: 0.03em;
}

.banner-sub {
  font-size: 0.62rem;
  margin: 0;
  font-family: 'Lucida Sans Unicode', 'Lucida Grande', Verdana, sans-serif;
  opacity: 0.9;
}
</style>
