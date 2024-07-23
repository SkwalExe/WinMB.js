---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "🪟 WinMB.js"
  text: "Retro Dialogs for Modern Websites"
  tagline: Non-serious library allowing you to effortlessly bring windows dialogue boxes to your webpages!
  actions:
    - theme: brand
      text: Get Started
      link: /getting-started
    - theme: alt
      text: View on GitHub
      link: https://github.com/SkwalExe/WinMB.js
    - theme: alt
      text: Try the demo!
      link: https://skwal.net/winmb

features:
  - title: Customizable
    details: You can choose between different message box flavours, and customize numerous parameters.
    icon: 🎨
  - title: Annoy Linux users
    details: Imagine happily using Linux to avoid Windows, enjoying the freedom of open-source, only for the website you visit to bombard you with Windows message boxes... 😤
    icon: 🐧
  - title: Troll Windows users
    details: Windows users will think the message boxes come from a program on their desktop and will frantically click around trying to close them, only to realize they're just cleverly disguised web popups 😡
    icon: 🪟

---

<script setup>
setTimeout(() => {
    const wmbEngine = new WinMB('https://cdn.jsdelivr.net/gh/SkwalExe/WinMB.js@0.1.4/src/assets/')
    setTimeout(() => {
        wmbEngine.show("Updates are available", "Please reboot your computer to install Windows updates.", "error")
    }, 2500)
}, 1000)
</script>
