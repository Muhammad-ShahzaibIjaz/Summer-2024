
const innerWidth = window.innerWidth;
if(innerWidth > 600){
    document.addEventListener("DOMContentLoaded", function() {
        var header = document.getElementById("main-header");
        const mainContainer = document.querySelector('.main-Container');
        var scrollPosition = 100;
    
        window.onscroll = function() {
            if (document.body.scrollTop > scrollPosition || document.documentElement.scrollTop > scrollPosition) {
                header.classList.add("fixed-header");
                mainContainer.classList.add("margin-80");
            } else {
                header.classList.remove("fixed-header");
                mainContainer.classList.remove("margin-80");
            }
        };
    });
}
const navBtn = document.querySelector('#navBtn');
if(navBtn){
    navBtn.addEventListener('click', ()=>{
        const navMinDiv = document.querySelector('.nav-min-div');
        navMinDiv.classList.toggle('nav-min-div-full');
    });
}



const customerSection = document.querySelector('.customer-section');
if(customerSection){
    const newCustomerBtn = customerSection.querySelector('.newCustomer');
    const oldCustomerBtn = customerSection.querySelector('.oldCustomer');
    const newCustomerSection = customerSection.querySelector('.newCustomer-Section');
    const oldCustomerSection = customerSection.querySelector('.oldCustomer-Section');
    newCustomerBtn.addEventListener('click', (event)=> {
        event.preventDefault();
        oldCustomerSection.classList.remove('active');
        newCustomerSection.classList.add('active');
        oldCustomerBtn.classList.remove('active');
        newCustomerBtn.classList.add('active');
    });
    oldCustomerBtn.addEventListener('click', (event)=> {
        event.preventDefault();
        newCustomerSection.classList.remove('active');
        oldCustomerSection.classList.add('active');
        newCustomerBtn.classList.remove('active');
        oldCustomerBtn.classList.add('active');
    });
}