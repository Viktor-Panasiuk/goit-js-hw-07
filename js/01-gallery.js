import { galleryItems } from './gallery-items.js';

// Change code below this line
// let lightBox;
const gallerryRef = document.querySelector('.gallery');

gallerryRef.innerHTML = setMarkupGallery(galleryItems);
gallerryRef.addEventListener('click', onClickGallary);


function onClickGallary(event) {
    event.preventDefault();
    const targetEl = event.target;

    if (targetEl.nodeName !== 'IMG') {
        return;
    }

    const lightBox = basicLightbox.create(`
        <img src="${targetEl.dataset.source}">`,
        {
            onShow: (instance) => {document.addEventListener('keydown', addListenerToLightBox(instance))},
            onClose: (instance) => { document.removeEventListener('keydown', addListenerToLightBox(instance))},
        });
    
    lightBox.show();
}


function setMarkupGallery(galleryObjects) {
    return galleryObjects.map(markupItem).join('');
}

function markupItem({ preview, original, description }) {
    const markup = `
        <div class="gallery__item">
            <a class="gallery__link" href="${original}" target="_blank">
                <img
                    class="gallery__image"
                    src="${preview}"
                    data-source="${original}"
                    alt="${description}"
                />
            </a>
        </div>`;
    
    return markup;
}

function addListenerToLightBox(instance) {
    function onLightBoxPressEsc(event) {
    if (event.code === 'Escape') {
        instance.close();
    }
}
    return onLightBoxPressEsc;
}
