/*global variables*/

const mainTag = document.querySelector('main');
const scrollToTopBtn = document.querySelector('#scroll-to-top');
const navTag = document.querySelector('nav');
const header = document.querySelector('header');
const navbarUl = document.getElementById('navbar__list');

let sections;
let allNavLi;


/* global functions */

function addSections(num) {
    // Creating an intersection observer 
    const options = {
    threshold: 0.5
    };      
    const sectionsObserver = new IntersectionObserver(
    (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('your-active-class');
                } else {
                    entry.target.classList.remove('your-active-class');
                }
            })
        },
        options
    );

    if (num > 0) {
        const fragment = document.createDocumentFragment();
        let currentSectionNum = 3;       //  number of current page sections.
        for (let i = 1; i <= num; i++) {
            
            const newSection = document.createElement('section');

            newSection.innerHTML = `<div class="landing__container">
                <h2>Section ${currentSectionNum+i}</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi fermentum metus faucibus lectus
                    pharetra dapibus. Suspendisse potenti. Aenean aliquam elementum mi, ac euismod augue. Donec eget
                    lacinia ex. Phasellus imperdiet porta orci eget mollis. Sed convallis sollicitudin mauris ac
                    tincidunt. Donec bibendum, nulla eget bibendum consectetur, sem nisi aliquam leo, ut pulvinar quam
                    nunc eu augue. Pellentesque maximus imperdiet elit a pharetra. Duis lectus mi, aliquam in mi quis,
                    aliquam porttitor lacus. Morbi a tincidunt felis. Sed leo nunc, pharetra et elementum non, faucibus
                    vitae elit. Integer nec libero venenatis libero ultricies molestie semper in tellus. Sed congue et
                    odio sed euismod.</p>

                <p>Aliquam a convallis justo. Vivamus venenatis, erat eget pulvinar gravida, ipsum lacus aliquet velit,
                    vel luctus diam ipsum a diam. Cras eu tincidunt arcu, vitae rhoncus purus. Vestibulum fermentum
                    consectetur porttitor. Suspendisse imperdiet porttitor tortor, eget elementum tortor mollis non.</p>
            </div>`;

            newSection.setAttribute('id', `section${currentSectionNum+i}`);
            newSection.setAttribute('data-nav', `Section ${currentSectionNum+i}`);

            fragment.appendChild(newSection);
        }
        
        mainTag.appendChild(fragment);
    }
    sections = document.querySelectorAll('section');

    // applying observer on each section *** distinguish the section in view ***
    sections.forEach(section => {
        sectionsObserver.observe(section)
    });
};

function createNav() {

    // create navbar based on the number of sections in the page.

    const fragment = document.createDocumentFragment();
    let sectionCounter = 1;

    sections.forEach(() => {
        const newListItem = document.createElement('li');
        const addAnchorLink = document.createElement('a');

        addAnchorLink.classList.add('menu__link');
        addAnchorLink.textContent = `Section ${sectionCounter}`;
        sectionCounter++;

        newListItem.appendChild(addAnchorLink);

        fragment.appendChild(newListItem);
    })

    navbarUl.appendChild(fragment);
    allNavLi = document.querySelectorAll('nav ul li');

    // scroll into view when user clicks on a section on the navbar.
    allNavLi.forEach((li, index) => {
        li.addEventListener('click', () => {
            sections[index].scrollIntoView({behavior: 'smooth', block: 'start'});
            });
    });

};

addSections(3);     // adding 3 more sections
createNav();       // creating the navigation

// *************************************************************************

/* Hide fixed navigation bar while not scrolling */
document.addEventListener('scroll', () => {
    if (document.documentElement.scrollTop === 0) {
        return
    }
    header.style.display = 'block';
    let s0 = document.documentElement.scrollTop;
    setTimeout(() => {
        let s1 = document.documentElement.scrollTop;
        if(s1 === s0) {
            header.style.display = 'none';
        };
    }, 3000);
    
});

// **************************************************************************************

/* Scroll to top button */

document.addEventListener('scroll', () => {
    if (document.documentElement.scrollTop < 400) {
        scrollToTopBtn.style.display = 'none';
    } else {
        scrollToTopBtn.style.display = 'block';
    }
});

scrollToTopBtn.addEventListener('click', (e) => {
    mainTag.scrollIntoView({behavior: 'smooth', block: 'start'});
});

// ***************************************************************************************
