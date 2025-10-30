// フローティングCTAボタンの表示制御
document.addEventListener('DOMContentLoaded', function() {
    const floatingCta = document.getElementById('floating-cta');
    const fvSection = document.querySelector('.fv');
    const ctaSection = document.querySelector('.CTA');
    
    // スクロールイベントの監視
    window.addEventListener('scroll', function() {
        const fvBottom = fvSection.offsetTop + fvSection.offsetHeight;
        const ctaTop = ctaSection.offsetTop;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const windowHeight = window.innerHeight;
        
        // CTAセクションが画面に入ったかどうかを判定
        const ctaInView = scrollTop + windowHeight >= ctaTop;
        
        // FVセクションを通り過ぎて、かつCTAセクションが見える前までボタンを表示
        if (scrollTop > fvBottom && !ctaInView) {
            floatingCta.classList.add('show');
        } else {
            floatingCta.classList.remove('show');
        }
    });
});
