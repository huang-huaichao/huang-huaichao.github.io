(function() {
    // 只在移动端执行
    function initMobileSidebar() {
        if (window.innerWidth <= 768) {
            var sidebar = document.querySelector('.sidebar');
            var sidebarToggle = document.querySelector('.sidebar-toggle');

            // 创建遮罩层
            var overlay = document.createElement('div');
            overlay.className = 'sidebar-overlay';
            document.body.appendChild(overlay);

            // 侧边栏切换函数
            function toggleSidebar() {
                sidebar.classList.toggle('sidebar-active');
                overlay.classList.toggle('active');
                document.body.classList.toggle('sidebar-open');
            }

            // 侧边栏按钮点击
            if (sidebarToggle) {
                sidebarToggle.addEventListener('click', function(e) {
                    e.stopPropagation();
                    toggleSidebar();
                });
            }

            // 遮罩层点击关闭侧边栏
            overlay.addEventListener('click', toggleSidebar);

            // 监听窗口大小变化
            window.addEventListener('resize', function() {
                if (window.innerWidth > 768) {
                    sidebar.classList.remove('sidebar-active');
                    overlay.classList.remove('active');
                    document.body.classList.remove('sidebar-open');
                }
            });
        }
    }

    // 页面加载完成后初始化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initMobileSidebar);
    } else {
        initMobileSidebar();
    }
})();
