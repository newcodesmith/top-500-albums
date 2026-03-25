let albumCovers = {};

let images = document.querySelectorAll('.listitem_image');


images.forEach(imageElement => {
    let a = imageElement.querySelector('a');
    let id = a.href.split('/master/')[1] || a.href.split('/release/')[1];
    if (id === undefined) {
        console.log(a.href);

    }
    let albumImage = a.querySelector('img');
    albumCovers[id] = albumImage.src;
});

console.log(JSON.stringify(albumCovers));