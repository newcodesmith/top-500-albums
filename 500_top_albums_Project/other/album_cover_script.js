let albumCovers = {};

let images = document.querySelectorAll('.listitem_image');
let rankNumber = document.querySelectorAll('.listitem_number')[0];


images.forEach(imageElement => {
    let a = imageElement.querySelector('a');
    let id = a.href.split('/master/')[1] || a.href.split('/release/')[1];
    if (id === undefined) {
        console.log(a.href);

    }
    let albumImage = a.querySelector('img');
    rank_number = rankNumber;
    album_ID = albumCovers[id];
    album_cover_src = albumImage.src;
});



console.log(JSON.stringify(albumCovers));