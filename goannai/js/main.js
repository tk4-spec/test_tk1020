//ハンバーガーメニュー//
$('.hamburger').on('click',function(){
    $(this).toggleClass('is-active');
    $('#nav-list').toggleClass('is-active');
});

//スクロール時下からフェードイン//
$(window).on('scroll', function(){
     $('.fadein').each(function(){
         var elemPos = $(this).offset().top,
             scroll = $(window).scrollTop(),
             windowHeight = $(window).height();

         if (scroll > elemPos - windowHeight + 150){
             $(this).addClass('scroll');
         }
      });
});


/*ページTOPへ戻るボタン */
const pageTopButton = document.querySelector('#page-top');

if (pageTopButton) {
    pageTopButton.addEventListener('click', (e) => {
        e.preventDefault();
        // スムーズスクロール
        $('html, body').animate({scrollTop:0}, 500);
    });

    window.addEventListener('scroll', () => {
        if(window.scrollY > 100){
            pageTopButton.classList.add('is-active');
        } else {
            pageTopButton.classList.remove('is-active');
        }
    });
}

// Page switching logic
$(function() {
    const mainContent = $('body > main').first();
    const pageContents = $('.page-content');

    function showPage(targetId) {
        if (!targetId || targetId === '#' || targetId === '#home') {
            mainContent.show();
            pageContents.hide();
        } else {
            mainContent.hide();
            pageContents.hide();
            $(targetId).css('display', 'block');
        }
        window.scrollTo(0, 0);
    }

    // Handle initial load
    showPage(window.location.hash);

    // Handle navigation clicks
    $('a[href^="#"]').on('click', function(e) {
        const href = $(this).attr('href');

        if (href === '#category' || href === '#contact') {
            if (!mainContent.is(':visible')) {
                window.location.hash = '#home';
                // The hashchange event will trigger showPage
            }
            
            setTimeout(() => {
                $('html, body').animate({
                    scrollTop: $(href).offset().top
                }, 500);
            }, 50);
            e.preventDefault();
            return;
        }

        if(href !== '#') {
             e.preventDefault();
             window.location.hash = href;
        } else {
            e.preventDefault();
            window.location.hash = '#home';
        }
    });

    // Handle hash changes for back/forward
    $(window).on('hashchange', function() {
        showPage(window.location.hash);
    });
});
