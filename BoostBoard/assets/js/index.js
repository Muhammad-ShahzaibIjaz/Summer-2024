let navBtn = document.querySelector('#nav-button');
if(navBtn){
    navBtn.addEventListener('click',()=>{
        let hideElements = document.querySelectorAll('.small-width-hide');
        let sideNavItems = document.querySelectorAll('.side-nav-item');
        let smallLogo = document.querySelector('.logo');
        let aside = document.querySelector('.aside');
        let sideContainer = document.querySelector('.side-Container');
        if(window.innerWidth > 991){
            if(aside.classList.contains('w-280')){
                navBtn.style.transform = 'rotate(180deg) translate(-65%,-30%)';
                aside.classList.add('w-80');
                aside.classList.remove('px-2');
                aside.classList.add('px-1');
                aside.classList.remove('w-280');
                sideNavItems.forEach(item =>{
                    item.classList.remove('side-nav-Fullpadding');
                });
                smallLogo.classList.remove('d-none');
                sideContainer.classList.add('pl-80');
                sideContainer.classList.remove('pl-280');
                
            }
            else{
                navBtn.style.transform = 'rotate(360deg) translate(75%,30%)';
                aside.classList.add('w-280');
                aside.classList.add('px-2');
                aside.classList.remove('px-1');
                aside.classList.remove('w-80');
                sideNavItems.forEach(item =>{
                    item.classList.add('side-nav-Fullpadding');
                });
                smallLogo.classList.add('d-none');
                sideContainer.classList.add('pl-280');
                sideContainer.classList.remove('pl-80');
            }
            hideElements.forEach(element=>{
                element.classList.toggle('d-none');
            });
        }
        else{
            if(aside.classList.contains('w-280')){
                navBtn.style.transform = 'rotate(360deg) translate(60%,-30%)';
                aside.classList.add('w-80');
                aside.classList.remove('px-2');
                aside.classList.add('px-1');
                aside.classList.remove('w-280');
                smallLogo.classList.remove('logoActive');
            }
            else{
                navBtn.style.transform = 'rotate(180deg) translate(-75%,-30%)';
                aside.classList.add('w-280');
                aside.classList.add('px-2');
                aside.classList.remove('px-1');
                aside.classList.remove('w-80');
                smallLogo.classList.add('logoActive');
            }
            hideElements.forEach(element=>{
                element.classList.toggle('hide-md');
            });
        }
    });
}

