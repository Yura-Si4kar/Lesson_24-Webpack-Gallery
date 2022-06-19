import RequestHandler from './scripts/RequestHandler';
import ImagePreview from './scripts/ImagePreview';
import './css/style.css';
import './css/ImagePreview.css';

const GALLERY_URL = 'https://jsonplaceholder.typicode.com/albums';
const PHOTOS_URL = 'https://jsonplaceholder.typicode.com/photos';

const ALBUM_CLASS = 'album-item';
const PHOTOS_CLASS = 'photo';

const galleryTemmplate = document.querySelector('.gallery_template').innerHTML;
const albumTemplate = document.querySelector('.album_template').innerHTML;
const gallleryEL = document.querySelector('.gallery_list');
const photoEl = document.querySelector('.photo_block');

const galleryApi = new RequestHandler(GALLERY_URL);
const albumApi = new RequestHandler(PHOTOS_URL);
const preview = new ImagePreview();

document.addEventListener('click', onClickAction);

init();

let galleryList = [];
let photoList = [];

function init() {
    fetchGalleryList();
}

function fetchGalleryList() {
    return galleryApi.getList().then((data) => {
        galleryList = data;
        fetchPhotosList(galleryList[0].id);
        renderList();
    })
}

function onClickAction(e) {
    let id = getGalleryId(e.target);
    if (e.target.classList.contains(ALBUM_CLASS)) {
        fetchPhotosList(id);
    }

    if (e.target.classList.contains(PHOTOS_CLASS)) {
        const url = getPhotoUrl(e.target);

        preview.show(url);
    }
}

function getGalleryId(el) {
    return el.dataset.id;
}

function generateGalleryEl(list) {
    return galleryTemmplate.replace('{{id}}', list.id)
        .replace('{{title}}', list.title);
}

function renderList() {
    gallleryEL.innerHTML = galleryList.map(generateGalleryEl).join('\n');
}

function fetchPhotosList(albumId) {
    return albumApi.getList({ albumId }).then((data) => {
        photoList = data;
        renderPhotoList();
    });
}

function generatePhotoEl(photos) {
    return albumTemplate.replace('{{id}}', photos.id)
        .replace('{{source}}', photos.thumbnailUrl)
        .replace('{{title}}', photos.title)
        .replace('{{url}}', photos.url);
}

function renderPhotoList() {
    photoEl.innerHTML = photoList.map(generatePhotoEl).join('\n');
}

function getPhotoUrl(el) {
    return el.dataset.url;
}
