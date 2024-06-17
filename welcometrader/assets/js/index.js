document.addEventListener('DOMContentLoaded', () => {
    const isMediumScreen = () => window.innerWidth < 1199 && window.innerWidth > 767;
    const isLargeScreen = () => window.innerWidth > 767;

    // Function to remove active class from all tab strips
    function removeTabStripActive() {
        document.querySelectorAll('.stripTab').forEach(tab => tab.classList.remove('active'));
    }

    // Event listener for hover items
    function handleHoverItems() {
        if (isMediumScreen()) {
            document.querySelectorAll('.hover-ul > li').forEach(item => {
                const link = item.querySelector('a');
                const menu = item.querySelector('.bottom-menu');

                link.addEventListener('click', () => {
                    item.classList.toggle('active');
                    menu.classList.toggle('active');
                });
            });
        }
    }

    // Event listener for data-item buttons
    function handleDataItemClick() {
        let previouslyClickedTab = null;
        let currentlyVisibleDiv = null;

        document.querySelectorAll('[data-item]').forEach(button => {
            button.addEventListener('click', (e) => {
                if (isLargeScreen()) {
                    e.preventDefault();
                    const target = button.getAttribute('data-item');
                    const targetDiv = document.getElementById(target);

                    document.querySelectorAll('.spec-content-box').forEach(div => div.classList.add('d-none'));
                    removeTabStripActive();
                    targetDiv.classList.remove('d-none');
                    button.querySelector('.stripTab').classList.add('active');
                } else {
                    const target = button.getAttribute('data-item');
                    const targetDiv = document.getElementById(target);

                    if (previouslyClickedTab && previouslyClickedTab === button) {
                        if (currentlyVisibleDiv) {
                            currentlyVisibleDiv.style.height = 0;
                            currentlyVisibleDiv.classList.add('d-none');
                            currentlyVisibleDiv.classList.remove('show');
                            previouslyClickedTab = null;
                        }
                    } else {
                        if (currentlyVisibleDiv === targetDiv) {
                            targetDiv.style.height = 0;
                            targetDiv.classList.add('d-none');
                            targetDiv.classList.remove('show');
                            currentlyVisibleDiv = null;
                        } else {
                            document.querySelectorAll('.spec-content-box').forEach(div => {
                                div.style.height = 0;
                                div.classList.remove('show');
                                div.classList.add('d-none');
                            });
                            targetDiv.classList.remove('d-none');
                            targetDiv.style.height = targetDiv.scrollHeight + "px";
                            targetDiv.classList.add('show');
                            currentlyVisibleDiv = targetDiv;
                        }
                        previouslyClickedTab = button;
                    }
                }
            });
        });
    }

    // Event listener for window resize
    function handleResize() {
        window.addEventListener('resize', () => {
            if (isLargeScreen()) {
                if (previouslyClickedTab) {
                    removeTabStripActive();
                    const target = previouslyClickedTab.getAttribute('data-item');
                    const targetDiv = document.getElementById(target);
                    targetDiv.classList.remove('d-none');
                } else {
                    const firstDiv = document.querySelector('#description');
                    firstDiv.classList.remove('d-none');
                }
            }
        });
    }

    // Event listener for data-tab buttons
    function handleDataTabClick() {
        let currentlyVisibleDiv = null;

        document.querySelectorAll('[data-tab]').forEach(button => {
            button.addEventListener('click', () => {
                const targetId = button.getAttribute('data-tab');
                const targetDiv = document.getElementById(targetId);

                if (currentlyVisibleDiv && currentlyVisibleDiv === targetDiv) {
                    targetDiv.classList.add('d-none');
                    currentlyVisibleDiv = null;
                } else {
                    document.querySelectorAll('.content-box').forEach(div => div.classList.add('d-none'));
                    targetDiv.classList.remove('d-none');
                    currentlyVisibleDiv = targetDiv;
                }
            });
        });
    }

    // Event listener for hover items in large screens
    function handleLargeScreenHoverItems() {
        const hoverItems = document.querySelectorAll('.subSmall-main');
        hoverItems.forEach(item => {
            item.addEventListener('click', () => {
                const menu = item.querySelector('.bottom-menu');
                const isActive = menu.classList.contains('active');
                document.querySelectorAll('.bottom-menu.active').forEach(activeMenu => activeMenu.classList.remove('active'));
                if (!isActive) {
                    menu.classList.add('active');
                }
            });
        });
    }

    // Initialize event listeners
    handleDataTabClick();
    handleHoverItems();
    handleDataItemClick();
    handleResize();
    handleLargeScreenHoverItems();
});
