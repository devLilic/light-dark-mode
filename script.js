const nav = document.getElementById('nav');
const toggleMode = document.getElementById('toggleSiteMode');
const textBox = document.getElementById('text-box');
const toggleText = document.querySelector('.toggle-text');
const images = document.querySelectorAll('.illustrations');

let mode = null;

function getModeFromStorage(){
    toggleMode.checked = localStorage.getItem('dark-theme') !== 'false';
    mode = toggleMode.checked ? 'dark' : 'light';
    changeSiteView()
}

// Change pictures to light/dark mode
function changePicturesToMode() {
    for (let element of images) {
        let from = "_" + (mode === 'dark' ? "light" : "dark") + ".svg";
        element.src = element.src.replace(from, `_${mode}.svg`);
    }
}

// Get element data for current site mode
function getElement(element){
    const values = {
        nav: {
            light: "rgba(255, 255, 255, 0.5)",
            dark: "rgba(0, 0, 0, 0.5)"
        },
        textBox: {
            light: "rgba(0, 0, 0, 0.5)",
            dark: "rgba(255, 255, 255, 0.5)"
        },
        toggleText: {
            light: "Light",
            dark: "Dark"
        },
        toggleIcon: {
            light: "sun",
            dark: "moon",
        }
    }
    return values[element][mode];
}

// Change elements to corresponding style or content for current site mode
function changeSiteView(){
    document.documentElement.setAttribute('data-theme', mode)
    nav.style.backgroundColor = getElement('nav');
    textBox.style.backgroundColor = getElement('textBox');
    toggleText.innerText = getElement('toggleText') + " Mode";
    toggleText.nextElementSibling.classList = "fas fa-"+getElement('toggleIcon');
    changePicturesToMode();
}

function changeMode(event) {
    mode = event.target.checked ? 'dark' : 'light';
    localStorage.setItem('dark-theme', mode === "dark");
    changeSiteView();
}

// Event listeners
window.addEventListener('load', getModeFromStorage);
toggleMode.addEventListener('change', changeMode);
