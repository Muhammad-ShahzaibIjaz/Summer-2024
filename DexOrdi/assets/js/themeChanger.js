const htmlTag = document.documentElement;

const lightTheme = {
    '--color-base': '#ffffff',
    '--color-base1': '#ffffff',
    '--color-base2': '#ffffff',
    '--color-text': '#000',
    '--color-backgroundDim': 'rgba(255, 255, 255, 0.5)',
    '--color-boxShadow': '0px 4px 20px rgba(0, 0, 0, 0.11)',
    '--color-border': '#f0f0f0',
    '--theme': 'light'
};

const darkTheme = {
    '--color-base': '#000000',
    '--color-base1': '#1f1e1e',
    '--color-base2': '#373737',
    '--color-text': '#ffffff',
    '--color-backgroundDim': 'rgba(0, 0, 0, 0.5)',
    '--color-boxShadow': '0px 4px 20px rgba(0, 0, 0, 0.11)',
    '--color-border': '#373737',
    '--theme': 'dark'
};

// Apply light theme styles by default
applyTheme(lightTheme);

function toggleTheme() {
    const currentTheme = htmlTag.style.getPropertyValue('--theme').trim();

    if (currentTheme === 'light') {
        applyTheme(darkTheme);
        addDarkThemeToElements();
    } else {
        applyTheme(lightTheme);
        removeDarkThemeFromElements();
    }
}

function applyTheme(theme) {
    for (const [property, value] of Object.entries(theme)) {
        htmlTag.style.setProperty(property, value);
    }
}


function addDarkThemeToElements() {
    const headerElement = document.querySelector('.header');
    const mainContainerElement = document.querySelector('.main__container');
    const logoImages = document.querySelectorAll('.logoImage');
    const switchImages = document.querySelectorAll('.switch-themeImage');
    if (headerElement) {
        headerElement.classList.add('dark-theme');
    }

    if (mainContainerElement) {
        mainContainerElement.classList.add('dark-theme');
    }
    logoImages.forEach((image) => {
        image.setAttribute('src', 'assets/images/dexordi-dark.4043e409.png');
    });
    switchImages.forEach((switchImage) => {
        switchImage.setAttribute('src', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAArCAYAAAADgWq5AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAATISURBVHgBzVk9SBxBFH57Hmih5ILNCf5cQK1VELRQLyAYtEiChaUXbAVTCgpJQMEuOdBSSCpRlJhGsMr5AwqCmlohKwpanqighZr3jTvH3N7fzK5n/GDduZnZ8Zu372/fWOQTbW1t0UAg0HV/f9/EP3GFnEvAsqx9Hktyc5+vtdLS0gQjSR5hkQeAJBN5y82YSk77n1rW97u7ux/b29sJMoQRYYfoJ25G6XFgs/S/MPHvug9oEY5Go6GbmxsQ/UhFgCNxELcLzi00gaUa4QV/czNCxQWk/aGQmpTkG2xtbW0qKSnZ4maYio8QCyZWU1NzfnJysp1rUk7CIBsMBiFZY6PyiTe1tbV0fHy8lm0wK2GogSPZpyYrEa2rq7OZ9B/3QIYOP6HOFkKSdbrZbYiBLBPhDSLkAw0NDdTc3Ew+EeKA9NPdmaYSLN0YS/cz+UBVVRXNzc1RX18fnZ6e0sHBAflAuLq62mIjTMiONAk7QcEXVMmCvF8wpxHEAfk7RRjSJQNVaGlp8USooqKCOjs7TR4JXV9fpwJWijDvZFBzAert7aXp6WlaWloSbRXr6+tCFS4uLmhlZSVtDLq9uLhIU1NTNDQ0RLqAlNMIwzOQQX5QXl6eao+Pj6epweXlJfX391NPT48grj6DTULCgOHbCSGPQSPodETJAJAcjAoSk2QkoCr19fWCGAxub29PSBu/JVlsZHZ2lkzAUn7Ht4Tww+3t7XAf70wWAMmBgQEh0fn5eUF0bGwsQ3KSHDYJ9WlsbBTzVelrwt7a2nolCe/RQ/LtCTAi6GU+gLSpVN3g5P+lNDrPZCHRkZGRgvNgZH6DydXVVSTgGJwWoIMgqL52kNA1oK6uroy1pF7rgPObJkg4ojMZr311dVW4MlzQX9mvi46ODnGHLsu1cJdr6SCgO1F6BAnpf1UPoQsYqAqTTQc5wUBWVHAirByvMBwOC88gDQiuy00gF87OzsQdz2IdAGvF43HSheWkk3/JI6DDMzMzWnMnJiYyop8JWLCvA06+6blOgMCwu7tbcB787sbGBvnB7e1tUuqwTT4wOTmZNxBgbHh4WEQ8P9jZ2dmXhNfIEDBCaekgMjg4KHRTJY7+hYUFisVioj9XwqSJBP6IXIJ1Y1nNiAoBxicTGVzQY7xuGc3QB++hkscGpXEiYYKxIbMzwC/8ERIuKytD3UtbjyEhNZE5PDxMGwc5txuEN1F1HcmTCSBU3MUnkm3b11wPQLhq03kY0mHvIoiOjo6mSVJ6je7u7oxPJEi0srJSuDS8iaOjI9JEgp2D8H1BZQffdNUCJJDzZoMapt0hGxuFazMFc/sh26lIB/emDjwj2GqxMKiOsC5/5KIfyqieCyh47VIN/AQJCQQL9XdGIYVzY3zwfaVnAKcU+1ntyyhVoRDHtYBXrM+ec+RHAlThvbsza7YG1aCHEv//gu1WBYmc9WGniI0a21NLWpDNVdzOmQ/j4IS/obDLZXoiOAc4r/NV4vMWtBFQWKfnUd9iRKm4iLOAPmxubp7lm6R9KFPEMqzWUYGE8bGXU+H0XZKlh/pvnA38m8m5nadzOsApHYE8PoUjmo8lef6y1zM6wDNhFY66NDGRCH8jov0C/SzBc+cU1KaHBMYmn/gH1YEeXm01EyYAAAAASUVORK5CYII=');
    })
}

function removeDarkThemeFromElements() {
    const headerElement = document.querySelector('.header');
    const mainContainerElement = document.querySelector('.main__container');
    const logoImages = document.querySelectorAll('.logoImage');
    const switchImages = document.querySelectorAll('.switch-themeImage');
    if (headerElement) {
        headerElement.classList.remove('dark-theme');
    }

    if (mainContainerElement) {
        mainContainerElement.classList.remove('dark-theme');
    }
    logoImages.forEach((image) => {
        image.setAttribute('src', 'assets/images/dexordi-light.a3106ba4.png');
    });
    switchImages.forEach((switchImage) => {
        switchImage.setAttribute('src','data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAArCAYAAAADgWq5AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAQCSURBVHgBzVm/S+RAFH7JLmqh3JYK/oiFxXW7grAWagSLQwvvELS8FUuLu9JuPdD6FPwDXLA5Qc5rtLxVhFsQdK+2uIiiVrKiwlqo974wCdkf2UzWTfSDbCaTmc2XL2/evHmj0AuRTCZ1VVVHnp+f43yJIyYOE4qi5PlegYt5Pvaam5uzjALVCYXqAEgykUkuppzkpB+qKOtPT0+ZXC6XJZ/wRVgQTXNRp8bAYPW/MfF12Q5ShHVdjz08PIDoVwoAQnEQNzzbejVgVTX+w99c1ChYQO1ZLzOJ1Lo5MDAQj0Qif7jYTsEjxsKkurq6bs7Pz3NujVwJg2w0GoWyvgfVC/Ghu7ubzs7O9qrdrEoYZiCUDZusBb2np8dg0n/Lb1TYcIg264UC23SifCCqVRrCG2j0+ojxhPSzvLLEJFjdFKu7SG8H7Z2dnQoPwqxVUaKwmBSk0d/fT5lMhoIEc/qCecC6tglDXfJhCnNzc7S2tkZXV1cUMGLFYtGesGzC/CafJf/AJIsDODo6oqABla2ySRiegSTjg/HxcZsscHFxQSEghjgGBUthXaZXR0dHCVng7u6OwgCr/BFnVVxMynQaHh42STtRfh0gTI6WwppMj+np6Yq6trY2CgkavIVFOO7Vuq+vr6qaqA8L9/f3mioGnCcSiUTVephJa2srhQGOb+JQWJNp7PbpQXZiYoLCgkoNADxHWCpzfKFKrWBvb29d74FsubsLCiqvpaQIe/nbmZmZMEgbqog3PUnv7+97NSmZsoPA4+NjwbJhw6sxFJaJG0B4a2srkAnl8PAwb8bDvPB7z6ekV4fLy0spjwCPAhNB+Gnh+vq6pA3899jYGDU1NclGfFmOizNRlHgpsu2MiNxwfHxsquwkUgvw3U7/jRcGLPVxPTU1RZL4hR/TJFpaWpD3khp8y8vL9oP9AkSdprKwsCDdF6LibBIWyTmppQPI4kG13JwMlpaW6OTkRLZ51lqM2hMHv8GKbG88KJVK1aU0XnR+fp52dnak+zA3W0x7EcoGXeAFXy/bsmcgBMBrbG5ummV8Zq+oDUQ3NjYonU7T6ekp+YDB6s5aFyV5CZH0+0c+EyggOzQ0ZMfLzmkaXwMDdXd3ty4zYnV7nbmJikTK4OAgFnzf6Q1ApGIXnXUVqSok4vyYRoCAKXwqr6warbGbg8p5ej0g9Tpa7YZrfljYM3JsYSttknVLbrvGw/DNvIGCt9ymkCA2cEZrZeJrJrQNwyiyTf9AfouhU7BYZYFmDw4OagYW0psyAaZhpbYKLPje9hIZzkakZJH/XeUBvuJn366ufTpApI5AfoTkyRe4/Xa9e3RA3YSdEOYSZyIarxFRfod6VvBG7IIa5AhgXoL/0PGXxw53thgAAAAASUVORK5CYII=');
    });
}


const menu = document.querySelector('.mobile__menu-container');
const menuBtn = document.querySelector('.menu-btn');
const oldSvg = document.getElementById('oldSvg');
const newSvg = document.getElementById('newSvg');

if (menuBtn) {
    menuBtn.addEventListener('click', () => {
        menu.classList.toggle('d-none');

        if (menu.classList.contains('d-none')) {
            oldSvg.classList.remove('d-none');
            newSvg.classList.add('d-none');
        } else {
            oldSvg.classList.add('d-none');
            newSvg.classList.remove('d-none');
        }
    });
}

const dataListWrapper = document.querySelectorAll('.datalist__wrapper');

document.addEventListener('click', (e) => {
    dataListWrapper.forEach((dataListWrap) => {
        let container = dataListWrap.querySelector('.datalist__container');
        let borderedButton = dataListWrap.querySelector('.bordered');
        let filledButton = dataListWrap.querySelector('.filled');

        if (borderedButton && e.target === borderedButton) {
            e.preventDefault();
            container.classList.toggle('active');
        } else if (filledButton && e.target === filledButton) {
            e.preventDefault();
            container.classList.toggle('active');
        } else if (container && container.classList.contains('active') && !container.contains(e.target)) {
            container.classList.remove('active');
        }
    });
});
