let albumCover = null;
let albumCoverList = document.querySelector('.albumCoverList');
let modalContentCover = document.querySelector('.modal_content_cover');
let modalAlbumCover = document.querySelector('.modalAlbumCover');
let artistTitle = document.getElementById('artistTitle');
let rankNo = document.getElementById('rankNo');
let trackListing = document.querySelector('#trackListing');
let releaseUrl = document.querySelector('#releaseUrl')
let navLogo = document.querySelector('.navLogo');
let topOfPage = document.querySelector('#header_logo');
let pageBody = document.querySelector('#main');
let navBar = document.querySelectorAll('#numberNav a');

let coverBucketOne = document.querySelector("#coverBucketOne");
let coverBucketTwo = document.querySelector("#coverBucketTwo");
let coverBucketThree = document.querySelector("#coverBucketThree");
let coverBucketFour = document.querySelector("#coverBucketFour");
let coverBucketFive = document.querySelector("#coverBucketFive");
let coverBucketSix = document.querySelector("#coverBucketSix");
let coverBucketSeven = document.querySelector("#coverBucketSeven");
let coverBucketEight = document.querySelector("#coverBucketEight");
let coverBucketNine = document.querySelector("#coverBucketNine");
let coverBucketTen = document.querySelector("#coverBucketTen");

console.log(navBar);


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
        if (index <= 50) {
            image.src = images[album.id];
            newCover.appendChild(image);
            newCover.classList.add('albumCover');
            newCover.setAttribute('id', ++index);
            image.setAttribute('id', [album.id]);
            image.classList.add('thumbnail', 'rankNo' + index);
            coverBucketOne.appendChild(newCover);
        } else if (index >= 51 && index <= 100) {
            image.src = images[album.id];
            newCover.appendChild(image);
            newCover.classList.add('albumCover');
            newCover.setAttribute('id', ++index);
            image.setAttribute('id', [album.id]);
            image.classList.add('thumbnail', 'rankNo' + index);
            coverBucketTwo.appendChild(newCover);
        } else if (index >= 101 && index <= 150) {
            image.src = images[album.id];
            newCover.appendChild(image);
            newCover.classList.add('albumCover');
            newCover.setAttribute('id', ++index);
            image.setAttribute('id', [album.id]);
            image.classList.add('thumbnail', 'rankNo' + index);
            coverBucketThree.appendChild(newCover);
        } else if (index >= 151 && index <= 200) {
            image.src = images[album.id];
            newCover.appendChild(image);
            newCover.classList.add('albumCover');
            newCover.setAttribute('id', ++index);
            image.setAttribute('id', [album.id]);
            image.classList.add('thumbnail', 'rankNo' + index);
            coverBucketFour.appendChild(newCover);
        } else if (index >= 201 && index <= 250) {
            image.src = images[album.id];
            newCover.appendChild(image);
            newCover.classList.add('albumCover');
            newCover.setAttribute('id', ++index);
            image.setAttribute('id', [album.id]);
            image.classList.add('thumbnail', 'rankNo' + index);
            coverBucketFive.appendChild(newCover);
        } else if (index >= 251 && index <= 300) {
            image.src = images[album.id];
            newCover.appendChild(image);
            newCover.classList.add('albumCover');
            newCover.setAttribute('id', ++index);
            image.setAttribute('id', [album.id]);
            image.classList.add('thumbnail', 'rankNo' + index);
            coverBucketSix.appendChild(newCover);
        } else if (index >= 301 && index <= 350) {
            image.src = images[album.id];
            newCover.appendChild(image);
            newCover.classList.add('albumCover');
            newCover.setAttribute('id', ++index);
            image.setAttribute('id', [album.id]);
            image.classList.add('thumbnail', 'rankNo' + index);
            coverBucketSeven.appendChild(newCover);
        } else if (index >= 351 && index <= 400) {
            image.src = images[album.id];
            newCover.appendChild(image);
            newCover.classList.add('albumCover');
            newCover.setAttribute('id', ++index);
            image.setAttribute('id', [album.id]);
            image.classList.add('thumbnail', 'rankNo' + index);
            coverBucketEight.appendChild(newCover);
        } else if (index >= 401 && index <= 450) {
            image.src = images[album.id];
            newCover.appendChild(image);
            newCover.classList.add('albumCover');
            newCover.setAttribute('id', ++index);
            image.setAttribute('id', [album.id]);
            image.classList.add('thumbnail', 'rankNo' + index);
            coverBucketNine.appendChild(newCover);
        } else if (index >= 451 && index <= 500) {
            image.src = images[album.id];
            newCover.appendChild(image);
            newCover.classList.add('albumCover');
            newCover.setAttribute('id', ++index);
            image.setAttribute('id', [album.id]);
            image.classList.add('thumbnail', 'rankNo' + index);
            coverBucketTen.appendChild(newCover);
        }

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
                                const tracks = json.tracklist;
                                const mainReleaseUrl = json.uri;
                                console.log(mainReleaseUrl);

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

$(document).ready(function () {
    $(document).on("scroll", onScroll);
    
    //smoothscroll
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
            'scrollTop': $target.offset().top+2
        }, 500, 'swing', function () {
            window.location.hash = target;
            $(document).on("scroll", onScroll);
        });
    });
});

function onScroll(event){
    var scrollPos = $(document).scrollTop();
    $('#numberNav a').each(function () {
        var currLink = $(this);
        var  refElement = $(currLink.attr("id"));
        console.log(refElement)
        if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
            $('#numberNav a').removeClass("active");
            currLink.addClass("active");
        }
        else{
            currLink.removeClass("active");
        }
    });
}


// function onScroll(event) { 
//     let scrollPos = $(document).scrollTop();
//     albumCover.each(function () {
//         let refElement = $(this);
//         let albumId = refElement.attr('id');        
//         if (refElement.position().top == scrollPos && albumId <= 49) {
//             $('#numberNav a').removeClass("active");
//             $('#one').addClass("active");
//         } else if (refElement.position().top <= scrollPos && albumId >= 50 && albumId <= 99) {
//             $('#numberNav a').removeClass("active"); console.log('here');
//             $('#two').addClass("active");
//         } else if (refElement.position().top <= scrollPos && albumId >= 100 && albumId <= 149) {
//             $('#numberNav a').removeClass("active");
//             $('#three').addClass("active");
//         } else if (refElement.position().top <= scrollPos && albumId >= 150 && albumId <= 199) {
//             $('#numberNav a').removeClass("active");
//             $('#four').addClass("active");
//         } else if (refElement.position().top <= scrollPos && albumId >= 200 && albumId <= 249) {
//             $('#numberNav a').removeClass("active");
//             $('#five').addClass("active");
//         } else if (refElement.position().top <= scrollPos && albumId >= 250 && albumId <= 299) {
//             $('#numberNav a').removeClass("active");
//             $('#six').addClass("active");
//         } else if (refElement.position().top <= scrollPos && albumId >= 300 && albumId <= 349) {
//             $('#numberNav a').removeClass("active");
//             $('#seven').addClass("active");
//         } else if (refElement.position().top <= scrollPos && albumId >= 350 && albumId <= 399) {
//             $('#numberNav a').removeClass("active");
//             $('#eight').addClass("active");
//         } else if (refElement.position().top <= scrollPos && albumId >= 400 && albumId <= 449) {
//             $('#numberNav a').removeClass("active");
//             $('#nine').addClass("active");
//         } else if (refElement.position().top <= scrollPos && albumId >= 450 && albumId <= 500) {
//             $('#numberNav a').removeClass("active");
//             $('#ten').addClass("active");
//         }
//     });
// }