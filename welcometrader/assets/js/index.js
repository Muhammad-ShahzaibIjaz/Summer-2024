document.addEventListener('DOMContentLoaded', ()=>{
    if (window.innerWidth < 1199 && window.innerWidth > 767) {
        const hoverItems = document.querySelectorAll('.hover-ul > li');
        hoverItems.forEach(item =>{
            const link = item.querySelector('a');
            const menu = item.querySelector('.bottom-menu');

            link.addEventListener('click', ()=>{
                item.classList.toggle('active');
                menu.classList.toggle('active');
            });
        });
    }

    
    function removeTabStripActive(){
        let tabs = document.querySelectorAll('.stripTab');
        tabs.forEach(tab => {
            tab.classList.remove('active');
        });
    }


    function toggleButtonSigns(button){
        const spans = button.querySelectorAll('.sign');
        spans.forEach(span => {
            const sign = span.querySelector('i');
            if(sign.classList.contains('fa-plus')){
                sign.classList.remove('fa-plus');
                sign.classList.add('fa-minus');
            }
            else{
                sign.classList.remove('fa-minus');
                sign.classList.add('fa-plus');
            }
        });
    }

    function showActiveTab() {
        const activeTabId = localStorage.getItem('activeTab');
        if (activeTabId) {
            const activeTab = document.querySelector(`[data-item="${activeTabId}"]`);
            if (activeTab) {
                const targetDiv = document.getElementById(activeTabId);
                document.querySelectorAll('.spec-content-box').forEach(div => {
                    div.classList.add('d-none');
                });
                removeTabStripActive();
                targetDiv.classList.remove('d-none');
                activeTab.querySelector('.stripTab').classList.add('active');
            }
        }
    }

    let previouslyClickedTab = null;

    document.querySelectorAll('[data-item]').forEach(button => {
        let currentlyVisibleDiv = null;
        button.addEventListener('click', (e) => {
            if(window.innerWidth > 767){
                e.preventDefault();
                const target = button.getAttribute('data-item');
                const targetDiv = document.getElementById(target);
                document.querySelectorAll('.spec-content-box').forEach(div => {
                    div.classList.add('d-none');
                });
                removeTabStripActive();
                targetDiv.classList.remove('d-none');
                button.querySelector('.stripTab').classList.add('active');
            }
            else{
                
                const target = button.getAttribute('data-item');
                const targetDiv = document.getElementById(target);

                toggleButtonSigns(button);

                if(currentlyVisibleDiv && currentlyVisibleDiv === targetDiv){
                    targetDiv.classList.add('d-none');
                    targetDiv.style.height = 0;
                    setTimeout(() => {
                        targetDiv.classList.remove('show');
                        targetDiv.classList.add('d-none');
                    }, 500);
                    currentlyVisibleDiv = null;
                }
                else{
                    document.querySelectorAll('.spec-content-box').forEach(div => {
                        div.style.height = 0;
                        div.classList.remove('show');
                        setTimeout(() => {
                            div.classList.add('d-none');
                        }, 500);
                    });
                    targetDiv.classList.remove('d-none');
                    targetDiv.style.height = targetDiv.scrollHeight + "px";
                    setTimeout(() => {
                        targetDiv.classList.add('show');
                    }, 10);
                    currentlyVisibleDiv = targetDiv;
                    console.log(currentlyVisibleDiv);
                }
                previouslyClickedTab = button;
            }
        });
            
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 767) {
            if(previouslyClickedTab){
                removeTabStripActive();
                const target = previouslyClickedTab.getAttribute('data-item');
                const targetDiv = document.getElementById(target);
                targetDiv.classList.remove('d-none');
            }
            else{
                const firstDiv = document.querySelector('#description');
                firstDiv.classList.remove('d-none');
            }
        }
    });
    
    
    if(window.innerWidth > 767) {
        let currentlyVisibleDiv = null;
    
        document.querySelectorAll('[data-tab]').forEach(button => {
            button.addEventListener('click', () => {
                const targetId = button.getAttribute('data-tab');
                const targetDiv = document.getElementById(targetId);
        
                if (currentlyVisibleDiv && currentlyVisibleDiv === targetDiv) {
                    targetDiv.classList.add('d-none');
                    currentlyVisibleDiv = null;
                } else {
                    document.querySelectorAll('.content-box').forEach(div => {
                    div.classList.add('d-none');
                    });
        
                    targetDiv.classList.remove('d-none');
                    currentlyVisibleDiv = targetDiv;
                }
            });
        });

        const hoverItems = document.querySelectorAll('.subSmall-main');
        function removeActiveClassFromAllMenus() {
            hoverItems.forEach(item => {
                const menu = item.querySelector('.bottom-menu');
                menu.classList.remove('active');
            });
        }
    
        hoverItems.forEach(item => {
            item.addEventListener('click', () => {
                const menu = item.querySelector('.bottom-menu');
                
                const isActive = menu.classList.contains('active');
    
                removeActiveClassFromAllMenus();
    
                if (!isActive) {
                    menu.classList.add('active');
                }
            });
        });
    }
});