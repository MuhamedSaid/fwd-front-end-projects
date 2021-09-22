// *** Adding new Sections ***

const mainTag = document.querySelector('main');

        // Function that adds the number of SECTIONS we want.
function addSections(num) {
    const fragment = document.createDocumentFragment();
    if (num > 0) {
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

            fragment.appendChild(newSection);
        }
        
        mainTag.appendChild(fragment);
    }
}

addSections(3);     // adding 2 more sections

// *** Building the navigation menu ***

const sections = document.querySelectorAll('section');    // The current number of sections after the new ones have been added.
const navbarUl = document.getElementById('navbar__list');

function createNav() {
    const fragment = document.createDocumentFragment();
    let sectionCounter = 1;

    for (const section of sections) {
        const newListItem = document.createElement('li');
        const addAnchorLink = document.createElement('a');

        addAnchorLink.classList.add('menu__link');
        addAnchorLink.textContent = `Section ${sectionCounter}`;
        sectionCounter++;
        newListItem.appendChild(addAnchorLink);

        fragment.appendChild(newListItem);
    }

    navbarUl.appendChild(fragment);
}

createNav();

// *** distinguish the section in view ***

let options = {
    threshold: 0.5
};

const observer = new IntersectionObserver(
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

sections.forEach(section => {
    observer.observe(section)
});

// *** Scroll to sections ***

const allNavLi = document.querySelectorAll('nav ul li');

allNavLi.forEach((li, index) => {
    li.addEventListener('click', () => {
        sections[index].scrollIntoView({behavior: 'smooth', block: 'start'});
    });
})
