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

    // スクロールアニメーションを初期化
    addScrollAnimation();
});

// スクロールアニメーション
function addScrollAnimation() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    // aboutセクション
    const aboutImg = document.querySelector('.about .img');
    const aboutCards = document.querySelectorAll('.about .card');

    if (aboutImg) observer.observe(aboutImg);
    // .about .text のスライドインアニメーションを削除（カウントアップを見やすくするため）
    aboutCards.forEach(card => observer.observe(card));

    // whatセクション
    const whatText = document.querySelector('.what .text');
    const whatContents = document.querySelectorAll('.what .content');

    if (whatText) observer.observe(whatText);
    whatContents.forEach(content => observer.observe(content));

    // whyセクション
    const whyTitle = document.querySelector('.why .title');
    const whyCards = document.querySelectorAll('.why .card');

    if (whyTitle) observer.observe(whyTitle);
    whyCards.forEach(card => observer.observe(card));

    // introduceセクション
    const introduceTitle = document.querySelector('.introduce .title');
    const introduceCards = document.querySelectorAll('.introduce .card');

    if (introduceTitle) observer.observe(introduceTitle);
    introduceCards.forEach(card => observer.observe(card));

    // voicesセクション
    const voicesTitle = document.querySelector('.voices .title');
    const voicesContents = document.querySelectorAll('.voices .content');

    if (voicesTitle) observer.observe(voicesTitle);
    voicesContents.forEach(content => observer.observe(content));

    // QAセクション
    const qaTitle = document.querySelector('.QA .title');
    const qaItems = document.querySelectorAll('.QA .item');
    const qaImg = document.querySelector('.QA img');

    if (qaTitle) observer.observe(qaTitle);
    qaItems.forEach(item => observer.observe(item));
    if (qaImg) observer.observe(qaImg);

    // カウントアップアニメーションの設定
    setupCountUpAnimations();
}

// カウントアップアニメーション関数
function animateCountUp(element, targetNumber, duration = 2000, formatter = null) {
    const startTime = performance.now();
    const startValue = 0;
    
    function updateCount(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // イージング関数（easeOutCubic）でよりスムーズなアニメーション
        const easeOutCubic = 1 - Math.pow(1 - progress, 3);
        const currentValue = Math.floor(startValue + (targetNumber - startValue) * easeOutCubic);
        
        // フォーマッター関数があれば使用、なければそのまま表示
        const displayValue = formatter ? formatter(currentValue) : currentValue;
        element.textContent = displayValue;
        
        if (progress < 1) {
            requestAnimationFrame(updateCount);
        } else {
            // 最終値を設定
            const finalValue = formatter ? formatter(targetNumber) : targetNumber;
            element.textContent = finalValue;
        }
    }
    
    requestAnimationFrame(updateCount);
}

// 数字フォーマッター（3桁区切り）
function formatNumber(num) {
    return num.toLocaleString('ja-JP');
}

// カウントアップ要素の設定
function setupCountUpAnimations() {
    const countUpElements = [
        { id: 'countup-3200', target: 3200, formatter: formatNumber },
        { id: 'countup-3200-text', target: 3200, formatter: formatNumber },
        { id: 'countup-3200-card', target: 3200, formatter: formatNumber }
    ];
    
    countUpElements.forEach(config => {
        const element = document.getElementById(config.id);
        if (element) {
            // Intersection Observerでスクロール時にカウントアップ開始
            const countUpObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && !element.classList.contains('counted')) {
                        element.classList.add('counted');
                        // 少し遅延してからカウントアップ開始
                        setTimeout(() => {
                            element.classList.add('counting');
                            animateCountUp(element, config.target, 2500, config.formatter);
                            // カウントアップ完了後にクラスを削除
                            setTimeout(() => {
                                element.classList.remove('counting');
                            }, 2500);
                        }, 300);
                        countUpObserver.unobserve(element);
                    }
                });
            }, {
                threshold: 0.3,
                rootMargin: '0px 0px -100px 0px'
            });
            
            countUpObserver.observe(element);
        }
    });
}
