document.addEventListener("DOMContentLoaded", function() {

    function check_webp_feature(feature, callback) {
        var kTestImages = {
            lossy: "UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",
            lossless: "UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==",
            alpha: "UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAARBxAR/Q9ERP8DAABWUDggGAAAABQBAJ0BKgEAAQAAAP4AAA3AAP7mtQAAAA==",
            animation: "UklGRlIAAABXRUJQVlA4WAoAAAASAAAAAAAAAAAAQU5JTQYAAAD/////AABBTk1GJgAAAAAAAAAAAAAAAAAAAGQAAABWUDhMDQAAAC8AAAAQBxAREYiI/gcA"
        };
        var img = new Image();
        img.onload = function () {
            var result = (img.width > 0) && (img.height > 0); 
            callback(feature, result);
        };
        img.onerror = function () {
            callback(feature, false);
        };
        img.src = "data:image/webp;base64," + kTestImages[feature];
    }
    check_webp_feature('lossy', function (feature, isSupported) {
        if (isSupported) {
            document.querySelector('body').classList.add('webp')  // webp is supported, 
            // you can cache the result here if you want
        }
    });

    const wrapMenu = document.querySelector('.wrap-menu');
    if (wrapMenu) {
        const menuBtn = document.querySelector(".menu-btn");
        const menuLinks = document.querySelectorAll(".menu__link");

        menuBtn.addEventListener("click", function() {
            const wrapHeader = this.closest('.wrap-header');
            wrapHeader.classList.toggle('is-open');
            this.classList.toggle('is-open');
            wrapMenu.classList.toggle('is-open');
            document.body.classList.toggle('is-overlay-menu');
        });

        menuLinks.forEach(function(link) {
            link.addEventListener("click", function() {
                const wrapHeader = this.closest('.wrap-header');
                wrapHeader.classList.remove('is-open');
                menuBtn.classList.remove('is-open');
                wrapMenu.classList.remove('is-open');
                document.body.classList.remove('is-overlay-menu');
            });
        });
    }

    const menuLinks = document.querySelectorAll('.menu__link');
    if (menuLinks.length > 0) {
        menuLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();

                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - 60;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    const charsTable = document.querySelector('.chars-table');
    if (charsTable) {
        const rows = charsTable.getElementsByTagName('tr');
        
        if (rows.length > 6) {
            for (let i = 6; i < rows.length; i++) {
                rows[i].classList.add('is-hidden');
            }

            const moreButton = document.createElement('button');
            moreButton.className = 'table-more';
            moreButton.innerHTML = '<span>Ещё</span><i class="icon-arrow2"></i>';
            charsTable.insertAdjacentElement('afterend', moreButton);

            moreButton.addEventListener('click', function() {
                if (moreButton.classList.toggle('is-open')) {
                    for (let i = 6; i < rows.length; i++) {
                        rows[i].classList.remove('is-hidden');
                    }
                    moreButton.innerHTML = '<span>Меньше</span><i class="icon-arrow2"></i>';
                    charsTable.classList.add('is-open');
                } else {
                    for (let i = 6; i < rows.length; i++) {
                        rows[i].classList.add('is-hidden');
                    }
                    moreButton.innerHTML = '<span>Ещё</span><i class="icon-arrow2"></i>';
                    charsTable.classList.remove('is-open');
                }
            });
        }
    }

    const wrapHeader = document.querySelector('.wrap-header');
    function handleScroll() {
        const scrollY = window.scrollY; 
        const offsetTop = wrapHeader.getBoundingClientRect().top + scrollY; 
        if (offsetTop > 20) {
            wrapHeader.classList.add('is-scroll');
        } else {
            wrapHeader.classList.remove('is-scroll');
        }
    }
    window.addEventListener('scroll', handleScroll);
    handleScroll();

});