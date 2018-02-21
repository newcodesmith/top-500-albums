let albumCoverBackground = document.querySelector('.albumCoverBackground');
let albumCoverList = document.querySelector('.albumCoverList');
let modalContentCover = document.querySelector('.modal_content_cover');
let modalAlbumCover = document.querySelector('.modalAlbumCover');
let artistTitle = document.getElementById('artistTitle');
let albumYear = document.querySelector('#albumYear');
let rankNo = document.getElementById('rankNo');
let trackListing = document.querySelector('#trackListing');
let releaseUrl = document.querySelector('#releaseUrl')
let navLogo = document.querySelector('.navLogo');
let topOfPage = document.querySelector('#header_logo');
let pageBody = document.querySelector('#main');

Promise.all([
    fetch('https://api.discogs.com/lists/188784')
    .then(response => response.json()),
    fetch('js/nme_covers.json')
    .then(response => response.json()),

]).then(results => {
    const albums = results[0];
    const images = results[1];

    albums.items.forEach((album, index) => {
        let newCover = document.createElement('li');
        let image = document.createElement('img');
        image.src = images[album.id];
        newCover.appendChild(image);
        newCover.classList.add('albumCover');
        newCover.setAttribute('id', ++index);
        image.setAttribute('id', [album.id]);
        image.classList.add('thumbnail', 'rankNo' + index);

        albumCoverList.appendChild(newCover);

        image.addEventListener('click', function (event) {
            var selectAlbum = this.id;
            if (selectAlbum == album.id) {
                modalAlbumCover.src = images[album.id]
                artistTitle.textContent = album.display_title;
                rankNo.textContent = 'Ranked No. ' + index + ' out of 500';

                function getTrackList() {
                    const url = album.resource_url;
                    fetch(url)
                        .then((response) => {
                            return response.json();
                        }).then((json) => {
                            const year = json.year
                            const tracks = json.tracklist;
                            const mainReleaseUrl = json.uri;
                            albumYear.textContent = 'Album Year: ' + year;
                            releaseUrl.href = mainReleaseUrl;

                            tracks.forEach((track, index) => {
                                let newTrack = document.createElement('li');
                                newTrack.classList.add('albumTrack');
                                newTrack.textContent = ++index + '.' + ' ' + track.title;
                                trackListing.appendChild(newTrack);
                            })
                        });
                }
                getTrackList();
            }
        });
    });
    albumCover = $('.albumCoverList li');
});

// The Modal
//------------------------------------------------
// Get the modal
var modal = document.getElementById('myModal');

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
    trackListing.innerHTML = '';
    pageBody.scroll = "";
    pageBody.style = "";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
        trackListing.innerHTML = '';
        pageBody.scroll = "";
        pageBody.style = "";
    }
}

albumCoverBackground.addEventListener('click', function (event) {
    if (event.target.classList.contains('thumbnail')) {
        modal.style.display = "block";
        pageBody.scroll = "no";
        pageBody.style = "overflow: hidden";
    }
});

// The Modal
//------------------------------------------------

let targetOffset = $(".albumCoverBackground").offset().top;

let $w = $(window).scroll(function () {
    if ($w.scrollTop() > targetOffset) {
        $('.navLogo').css({
            "display": "inline"
        });
        $('.landingPageLink').css({
            "display": "none"
        });

    } else {
        $('.navLogo').css({
            "display": "none"
        });
        $('.landingPageLink').css({
            "display": "inline"
        });

    }
});

$(document).ready(function () {
    $(document).on("scroll", onScroll);

    //smoothscroll on click of Top Nav Button
    $('a[href^="#"]').on('click', function (e) {
        e.preventDefault();
        $(document).off("scroll");

        $('a').each(function () {
            $(this).removeClass('active');
        })
        $(this).addClass('active');

        var target = this.hash,
            menu = target;
        $target = $(target);
        $('html, body').stop().animate({
            'scrollTop': $target.offset().top + 2
        }, 500, 'swing', function () {
            window.location.hash = target;
            $(document).on("scroll", onScroll);
        });
    });
});

function onScroll(event) {
    let scrollPos = $(document).scrollTop();
}