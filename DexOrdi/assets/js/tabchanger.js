document.addEventListener('DOMContentLoaded', () => {
    const tabLinks = document.querySelectorAll('.minMainAnchor');
    if (tabLinks) {
        tabLinks.forEach(link => {
            link.addEventListener('click', function (event) {
                event.preventDefault();

                // HIDE ALL TABS
                const tabs = document.querySelectorAll('.tabContent');
                tabs.forEach(tab => tab.classList.add('hidden'));

                // DEACTIVATE ALL TAB LINKS
                tabLinks.forEach(link => link.classList.remove('active'));

                // GET THE TARGETED TAB ID FROM THE DATA-TAB ATTRIBUTE
                const targetTab = this.getAttribute('data-tab');

                // SHOW THE SELECTED TAB
                const selectedTab = document.getElementById(targetTab);
                selectedTab.classList.remove('hidden');

                // ACTIVATE THE SELECTED TAB LINK
                this.classList.add('active');

                // FIND AND ACTIVATE THE CORRESPONDING LINK IN app__menu
                const appMenuLinks = document.querySelectorAll('.app__menu .minMainAnchor');
                appMenuLinks.forEach(appLink => {
                    if (appLink.getAttribute('data-tab') === targetTab) {
                        appLink.classList.add('active');
                    }
                });
            });
        });
    }
});
