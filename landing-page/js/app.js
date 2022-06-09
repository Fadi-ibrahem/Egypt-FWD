document.addEventListener('DOMContentLoaded', () => {
/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/
const allSections = document.querySelectorAll('section');
const mainUl = document.getElementById('navbar__list');
const myIcon = document.getElementById('icon');
/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

    //The callback function for the observer objcet
    function intersectionFunction(entries) {

        allSections.forEach((section) => {

            //removing the active class from unvisible sections
            if(section.classList.contains('your-active-class')) {
                section.classList.remove('your-active-class')
            }
        });
        
        //adding the active class for the visible section and the equivalent Link
        if(entries[0].isIntersecting) {
            entries[0].target.classList.add('your-active-class');

            //Loop Over the Links
            document.querySelectorAll('#navbar__list li').forEach((link) =>{

                //remove active class from all the links
                link.classList.remove('active');

                //add active class for equivalent link
                if(link.innerHTML == entries[0].target.getAttribute('data-nav')) {
                    link.classList.add('active');
                };
            });
        };
    };

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
function buildNavFunction(section) {

    // Getting the Sections data-nav Attribute value
    const secNumber = section.getAttribute('data-nav');

    //Getting the Sections ID Attribute
    const secId = section.getAttribute('id');
    
    //Generate the li element
    const myLi = document.createElement('li');

    //put the section number into the li element
    myLi.textContent = secNumber;

    //put the section ID as a cutom attribute in the li element
    myLi.setAttribute('data-link', secId);

    //Appending the li to the main UL
    mainUl.appendChild(myLi);
};


// Add class 'active' to section when near top of viewport
var setSectionActive = function(section) {

    //Creating the Options object to pass it as a second argument to the Observer Object
    const options = { threshold: [0.4, 0.7] }

    //Creating the Observer Object
    const observer = new IntersectionObserver(intersectionFunction, options)

    //Passing the specified section to the observer Method
    observer.observe(section);
};


// Scroll to anchor ID using scrollTO event
var scrollToSection = function(link) {

    //add event listener if the link clicked
    link.addEventListener('click', () => {

        //Get the equivalent section
        const sec = document.getElementById(link.getAttribute('data-link'));

        //Scroll to the equivalent Section
        sec.scrollIntoView({behavior:"smooth", block:"start"})

    });
};


// Toggle The Icon 
window.addEventListener('scroll', () => {

    if (window.pageYOffset >= 400) {
        myIcon.style.display = 'block';
    } else {
        myIcon.style.display = 'none';
    }
});

//Go To Top when the Icon Clicked
myIcon.addEventListener('click', () => {
    window.scrollTo(0, 0);
});

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
allSections.forEach(buildNavFunction);

// Scroll to section on link click
const links = document.querySelectorAll('#navbar__list li');
links.forEach(scrollToSection);

// Set sections as active
allSections.forEach(setSectionActive);
});