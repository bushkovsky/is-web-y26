(function () {
    function timeToLoadJs() {
        let startTime = performance.now();

        window.addEventListener('load', function () {
            let endTime = performance.now();
            let loadTime = ((endTime - startTime) / 1000).toFixed(3);

            let footer = document.querySelector('footer');
            if (footer) {
                let info = document.createElement('div');
                info.innerHTML = `
                    <p>
                        <span class="text-blue"><b><i>Page load time in JavaScript</i></b></span><br />
                        Page load time is <span class="text-red"><b>${loadTime}</b></span> Seconds
                    </p>`;
                footer.appendChild(info);
            }

            checkActiveMenu();
        });
    };

    function checkActiveMenu() {
        const currentPath = document.location.pathname.replace(/^\/|\/$/g, '');
        const menuItems = document.querySelectorAll('header nav li');
    
        menuItems.forEach(item => {
            const link = item.querySelector('a').getAttribute('href');
            console.log(link, currentPath)
            if (link === currentPath) {
                item.classList.add('js-active');
            }
        });
    };

    
    timeToLoadJs();
    checkActiveMenu();

})();
