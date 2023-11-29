// JavaScript Document

// grabbing html dom elements
let imagesContainer = document.getElementById('imagesContainer');
let imageArray = imagesContainer.children;
let jumboImage = document.getElementById('jumboImage');
let imageCaption = document.getElementById('imageCaption');
let hoverCaption = document.getElementById('hoverCaption');

// check if image in jumbo to array to create initial border 
for (const img of imageArray) {
    if (jumboImage.getAttribute('src') == img.getAttribute('src')) {
        img.style.border = '4px solid white';
        img.style.opacity = '60%';
        imageCaption.textContent = img.getAttribute('data-caption');
    }
}
// hover event handler function - populates initial caption with data attribute 
function hoverImageEventHandler (event) {
    for (const img of imageArray) {
        let image = event.target;
        if (image == img) {
            hoverCaption.textContent = img.getAttribute('data-caption');
            
        };
    };
};

// click event handler function - sets jumbo image, adds border to event image, and uses data attrubute to populate paragraph element
function clickImageEventHandler(event) {
    let image = event.target;
    let imageSrc = image.getAttribute('src');
    let imageAlt = image.getAttribute('alt');
    for (const img of imageArray ) {
        if (image == img) {
            img.style.border = '4px solid white';
            img.style.opacity = '60%';
            jumboImage.setAttribute('src', imageSrc);
            jumboImage.setAttribute('alt', imageAlt);
            imageCaption.textContent = img.getAttribute('data-caption');
            hoverCaption.textContent = '';
        } else {
            img.style.border = 'none';
            img.style.opacity = '100%';
        }
    }
};


// adding click event listener to each image element
for ( const img of imageArray) {
    img.addEventListener("click", clickImageEventHandler);
};
// adding click event listener to each image element
for ( const img of imageArray) {
    img.addEventListener("mouseover", hoverImageEventHandler);
};
