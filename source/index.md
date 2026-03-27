---
title: Galaxy's Blog
date: 2026-02-26
type: homepage
---

<style>
  /* CSS 变量 - 日间/夜间模式 */
  :root {
    --hero-title-color: #2c3e50;
    --hero-subtitle-color: #7f8c8d;
    --hero-subquote-color: #2c3e50;
    --bio-bg: #fafafa;
    --bio-text-color: #555;
    --nav-link-color: #2c3e50;
    --nav-link-hover: #667eea;
    --footer-color: #7f8c8d;
    --social-color: #667eea;
    --social-hover: #2c3e50;
    --avatar-border: #f0f0f0;
  }

  /* 夜间模式颜色 */
  @media (prefers-color-scheme: dark) {
    :root {
      --hero-title-color: #e8e8e8;
      --hero-subtitle-color: #a0a0a0;
      --hero-subquote-color: #d0d0d0;
      --bio-bg: #1a1a1a;
      --bio-text-color: #b0b0b0;
      --nav-link-color: #d0d0d0;
      --nav-link-hover: #8b9dff;
      --footer-color: #a0a0a0;
      --social-color: #8b9dff;
      --social-hover: #e8e8e8;
      --avatar-border: #2a2a2a;
    }
  }

  /* 渐入动画 */
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* 滚动渐入动画 */
  .reveal {
    opacity: 0;
    transform: translateY(50px);
    transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .reveal.active {
    opacity: 1;
    transform: translateY(0);
  }

  .hero-section {
    text-align: center;
    padding: 80px 20px 60px;
    max-width: 800px;
    margin: 0 auto;
    animation: fadeInUp 0.8s ease-out;
  }

  .hero-avatar {
    width: 140px;
    height: 140px;
    border-radius: 50%;
    margin: 0 auto 30px;
    border: 4px solid var(--avatar-border);
    overflow: hidden;
    animation: fadeInUp 0.8s ease-out 0.2s backwards;
  }

  .hero-avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  .hero-avatar:hover img {
    transform: scale(1.05);
  }

  .hero-title {
    font-size: 2.8em;
    font-weight: 300;
    margin-bottom: 25px;
    color: var(--hero-title-color);
    letter-spacing: 2px;
    animation: fadeInUp 0.8s ease-out 0.4s backwards;
  }

  .hero-subtitle {
    font-size: 1.6em;
    color: var(--hero-subtitle-color);
    margin-bottom: 30px;
    font-weight: 300;
    letter-spacing: 2px;
    line-height: 1.8;
    animation: fadeInUp 0.8s ease-out 0.6s backwards;
    min-height: 3.6em;
  }

  .hero-subquote {
    color: var(--hero-subquote-color);
    font-weight: 600;
    font-size: 1.2em;
  }

  .bio-section {
    background: var(--bio-bg);
    padding: 50px 20px;
    margin: 40px 0;
    border-radius: 16px;
  }

  .bio-content {
    max-width: 650px;
    margin: 0 auto;
    line-height: 2.2;
    font-size: 1.05em;
    color: var(--bio-text-color);
    text-align: center;
  }

  .bio-content p {
    margin-bottom: 18px;
  }

  .nav-section {
    padding: 50px 20px;
    max-width: 700px;
    margin: 0 auto;
  }

  .nav-list {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 40px;
    margin-top: 30px;
  }

  .nav-item {
    text-align: center;
  }

  .nav-item a {
    color: var(--nav-link-color);
    text-decoration: none;
    font-size: 1.1em;
    transition: color 0.3s, transform 0.3s;
  }

  .nav-item a:hover {
    color: var(--nav-link-hover);
    transform: translateY(-2px);
  }

  .footer-note {
    text-align: center;
    padding: 50px 20px;
    color: var(--footer-color);
    font-size: 0.95em;
    line-height: 2;
    max-width: 600px;
    margin: 0 auto;
  }

  .social-links {
    margin-top: 25px;
  }

  .social-links a {
    display: inline-block;
    margin: 0 15px;
    color: var(--social-color);
    text-decoration: none;
    font-size: 0.95em;
    transition: color 0.3s, transform 0.3s;
  }

  .social-links a:hover {
    color: var(--social-hover);
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    .hero-title {
      font-size: 2em;
    }

    .hero-subtitle {
      font-size: 1.1em;
    }

    .nav-list {
      gap: 25px;
    }
  }
</style>

<div class="hero-section">
  <div class="hero-avatar">
    <img src="/images/avatar.jpg" alt="Galaxy Avatar">
  </div>
  <h1 class="hero-title">欢迎来到 Galaxy 的博客</h1>
  <p class="hero-subtitle" id="typewriter"></p>
</div>

<div class="bio-section reveal">
  <div class="bio-content">
    <p>这里是我的个人自留地</p>
    <p>专注记录，持续思考，慢慢沉淀</p>
    <p>分享学习、工作与生活里的真实感受</p>
    <p>不喧哗，自有声</p>
    <p></p>
    <p>文字是出口，也是陪伴</p>
    <p>记录生活，也记录自己</p>
    <p></p>
    <p>很高兴与你在此相遇</p>
  </div>
</div>

<div class="nav-section reveal">
  <div class="nav-list">
    <div class="nav-item">
      <a href="/archives/">文章</a>
    </div>
    <div class="nav-item">
      <a href="/categories/">分类</a>
    </div>
    <div class="nav-item">
      <a href="/tags/">标签</a>
    </div>
    <div class="nav-item">
      <a href="/about/">关于</a>
    </div>
  </div>
</div>

<div class="footer-note reveal">
  <p>感谢访问，希望我的分享能给您带来启发</p>
  <div class="social-links">
    <a href="https://github.com/Learnergalaxy" target="_blank">GitHub</a>
    <a href="mailto:galaxy001@sjtu.edu.cn">Email</a>
  </div>
</div>

<script>
  // 打字机效果
  (function() {
    const text = '<span class="hero-subquote">"</span>人生不是一场物质的盛宴<br>而是一次灵魂的修炼<span class="hero-subquote">"</span>';
    const typewriter = document.getElementById('typewriter');
    let i = 0;

    function type() {
      if (i < text.length) {
        // 处理 HTML 标签
        if (text.charAt(i) === '<') {
          const closeIndex = text.indexOf('>', i);
          typewriter.innerHTML += text.substring(i, closeIndex + 1);
          i = closeIndex + 1;
        } else {
          typewriter.innerHTML += text.charAt(i);
          i++;
        }
        setTimeout(type, 100);
      }
    }

    // 延迟开始打字机效果
    setTimeout(type, 1000);
  })();

  // 滚动渐入效果
  (function() {
    function reveal() {
      var reveals = document.querySelectorAll('.reveal');

      for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 150;

        if (elementTop < windowHeight - elementVisible) {
          reveals[i].classList.add('active');
        }
      }
    }

    window.addEventListener('scroll', reveal);
    // 页面加载时也检查一次
    reveal();
  })();
</script>
