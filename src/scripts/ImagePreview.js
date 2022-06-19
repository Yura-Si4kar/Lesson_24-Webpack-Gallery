export default class ImagePreview {
    static VISIBLE_CLASS = 'visible';
    constructor() {
        this._initElements();
    }

    _initElements() {
        const el = document.createElement('div');
        el.className = 'image-preview';

        const backdrop = document.createElement('div');
        backdrop.className = 'image-preview-backdrop';

        backdrop.addEventListener('click', () => this.hide());

        const img = document.createElement('img');
        img.className = 'image-preview-image';

        el.append(backdrop);
        el.append(img);

        document.body.append(el);

        const style = document.createElement('style');

        document.head.append(style);

        this._el = el;
        this._img = img;
    }

    show(url) {
        this._img.src = url;
        this._el.classList.add(ImagePreview.VISIBLE_CLASS);
    }

    hide() {
        // console.log(this);
        this._el.classList.remove(ImagePreview.VISIBLE_CLASS);
    }
}