window.onload = (): void => {
    const sidebarStatus: string | null = localStorage.getItem('sideBarOpen');
    sidebarStatus === 'true' ? openSidebar() : closeSidebar();
};

// Main sidebar element
const sidebarMain = <HTMLHeadElement>document.querySelector('.sidebar-main');

// Sidebar top menu box, open/close sidebar button, logos, appname, svgs and tooltip
const sideBarMenuBox = <HTMLDivElement>document.querySelector('.sidebar-topmenu');
const menuLogos = sideBarMenuBox.querySelectorAll('img');
const menuAppName = <HTMLParagraphElement>sideBarMenuBox.querySelector('p');
const openCloseBarBtn = <HTMLButtonElement>document.querySelector('.open-close-sidebar-btn');
const openCloseBtnSvgs = openCloseBarBtn.querySelectorAll('svg');

const navBoxHeadText = <HTMLHeadingElement>document.querySelector('.nav-box-head');
// Navigation options box
const navOptionButtons: unknown = document.querySelectorAll('.nav-option-button');
const navOptionLabels: unknown = document.querySelectorAll('.nav-option-label');

function openSidebar(): void {
    sidebarMain.style.width = '250px';
    sideBarMenuBox.style.height = '50px';
    sideBarMenuBox.style.justifyContent = 'space-between';
    sideBarMenuBox.style.padding = '0 10px';
    menuLogos[1].style.display = 'none';
    openCloseBtnSvgs[0].style.display = 'none';
    openCloseBtnSvgs[1].style.display = 'block';
    menuLogos[0].style.display = 'block';
    menuAppName.style.display = 'block';
    navBoxHeadText.style.display = 'block';
    (<[]>navOptionButtons).forEach((element: HTMLButtonElement): void => {
        element.style.width = '210px';
        element.style.padding = '0 10px';
        element.style.justifyContent = 'flex-start';
        element.style.columnGap = '5px';
        element.style.borderRadius = '10px';
    });
    (<[]>navOptionLabels).forEach((element: HTMLButtonElement): void => {
        element.style.display = 'block';
    });
    localStorage.setItem('sideBarOpen', 'true');
}

function closeSidebar(): void {
    sidebarMain.style.width = '45px';
    menuLogos[0].style.display = 'none';
    menuAppName.style.display = 'none';
    sideBarMenuBox.style.height = '35px';
    sideBarMenuBox.style.padding = '0';
    sideBarMenuBox.style.justifyContent = 'center';
    openCloseBtnSvgs[1].style.display = 'none';
    menuLogos[1].style.display = 'block';
    navBoxHeadText.style.display = 'none';
    (<[]>navOptionButtons).forEach((element: HTMLButtonElement): void => {
        element.style.width = '35px';
        element.style.padding = '0';
        element.style.justifyContent = 'center';
        element.style.columnGap = '0';
        element.style.borderRadius = '50%';
        
    });
    (<[]>navOptionLabels).forEach((element: HTMLButtonElement): void => {
        element.style.display = 'none';
    });
    localStorage.setItem('sideBarOpen', 'false');
}

// When open/close button clicked
openCloseBarBtn.addEventListener('click', (): void => {
    if (sidebarMain.style.width === '45px') 
        openSidebar();
    else 
        closeSidebar();
});

// Open and close sidebar button hover effects and tooltip
const openCloseBtnTip = <HTMLSpanElement>openCloseBarBtn.querySelector('span');

openCloseBarBtn.addEventListener('mouseover', (): void => {
    if (sidebarMain.style.width === '45px') {
        menuLogos[1].style.display = 'none';
        openCloseBtnSvgs[0].style.display = 'block';
        openCloseBtnTip.innerText = 'Open sidebar';
        openCloseBtnTip.style.left = '55px';
    } else {
        openCloseBtnTip.innerText = 'Close sidebar';
        openCloseBtnTip.style.left = '260px';
    }
    openCloseBtnTip.style.display = 'block';
});

openCloseBarBtn.addEventListener('mouseleave', (): void => {
    if (sidebarMain.style.width === '45px') {
        menuLogos[1].style.display = 'block';
        openCloseBtnSvgs[0].style.display = 'none';
    }
    openCloseBtnTip.style.display = 'none';
});

// Navigation buttons tooltips
(navOptionButtons as []).forEach((element: HTMLButtonElement): void => {
    const tip = <HTMLSpanElement>element.querySelector('.tooltip');
    element.addEventListener('mouseover', (): void => {
        if (sidebarMain.style.width === '45px') {
            tip.style.left = '55px';
            tip.style.display = 'block';
        }
    });
});

(navOptionButtons as []).forEach((element: HTMLButtonElement): void => {
    const tip = <HTMLSpanElement>element.querySelector('.tooltip');
    element.addEventListener('mouseleave', (): void => {
        if (sidebarMain.style.width === '45px') {
            tip.style.display = 'none';
        }
    });
});