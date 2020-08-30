'use strict'

const searchForm = document.querySelector('.search-form');
const listTitle = document.querySelector('.list-title');
const movieList = document.querySelector('.movie-list');
const modal = document.querySelector('.modal');
const modalContent = document.querySelector('.modal-content');
const urlPoster = 'https://image.tmdb.org/t/p/w500';


function apiSearch(event){
    event.preventDefault();
    const searchText = document.querySelector('.search-text').value;
    if(searchText.trim().length === 0){
        movieList.innerHTML = '<h4 class="search-alert">Поле поиска не должно быть пустым, повторите запрос</h4>';
        listTitle.textContent = '';
        return
    }
    const server = `https://api.themoviedb.org/3/search/multi?api_key=ef5194f00db31119dd3965f073a3d85a&language=ru&query=${searchText}`;
    movieList.innerHTML = '<div class="spinner"></div>';
    fetch(server)
        .then(result => {
            if (result.status !== 200){
                return Promise.reject(new Error(result.status));
            }
            return result.json();
        })
        .then(objRequest => {
            let getMovie = '';
            if(objRequest.results.length === 0){
                getMovie = '<h4 class="search-alert">По вашему запросу ничего не найдено</h4>';
                listTitle.textContent = '';
            }
            objRequest.results.forEach( item => {
                let nameItem = item.name || item.title;
                const poster = item.poster_path? urlPoster + item.poster_path : './img/NoPoster.jpg';
                let dataInfo = '';
                if(item.media_type !== 'person') {
                    dataInfo = `data-id="${item.id}" data-type="${item.media_type}"`; 
                } 
                getMovie += `
                <div class="cardlist">
                    <img src="${poster}" class="img-poster" alt="${nameItem}" ${dataInfo} draggable="false">
                    <h4>${nameItem}</h4>
                </div>
                `;
            });
            movieList.innerHTML = getMovie;
            listTitle.innerHTML = '<h4 class="list-title__info">Результаты поиска:</h4>';
            addEventMedia();
            document.querySelector('.search-text').value = '';
        })
        .catch((reason) => {
            movieList.innerHTML = '<h4 class="search-alert">Произошла ошибка, повторите запрос позже</h4>';
            console.log('error: ' + reason);
        });
}

function showMain () {
    listTitle.innerHTML = '<div class="list-main"><h1>Добро пожаловать</h1><h3>Миллионы фильмов и сериалов. Исследуйте сейчас.</h3></div>';
    let getMovie = '';
        getMovie += `
        <div class="main-content">
            <video poster="./img/video-cover.jpg"  loop="loop" controls="controls" tabindex="0">
            <source src="./video/cinematography.mp4" type='video/webm; codecs="vp8, vorbis"' autoplay="0" />
            <source src="./video/cinematography.mp4" type='video/ogg; codecs="theora, vorbis"' autoplay="0"/>
            </video>
        </div>
        `;
    movieList.innerHTML = getMovie;
    closeBurger();
};

function showTrendDay () {
    movieList.innerHTML = '<div class="spinner"></div>';
    fetch('https://api.themoviedb.org/3/trending/all/day?api_key=ef5194f00db31119dd3965f073a3d85a&language=ru')
        .then((result) => {
            if (result.status !== 200){
                return Promise.reject(new Error(result.status));
            }
            return result.json();
        })
        .then(objRequest => {
            listTitle.innerHTML = '<h4 class="list-title__info">Тренды дня</h4>';
            let getMovie = '';
            objRequest.results.forEach( item => {
                let nameItem = item.name || item.title;
                let mediaType = item.title ? 'movie' : 'tv';
                const poster = item.poster_path? urlPoster + item.poster_path : './img/NoPoster.jpg';
                let dataInfo = `data-id="${item.id}" data-type="${mediaType}"`;
                getMovie += `
                <div class="cardlist">
                    <img src="${poster}" class="img-poster" draggable="false" alt="${nameItem}" ${dataInfo}>
                    <h4>${nameItem}</h4>
                </div>
                `;
            });
            movieList.innerHTML = getMovie;
            addEventMedia();
            closeBurger();
        })
        .catch(reason => {
            movieList.innerHTML = '<h4 class="search-alert">Произошла ошибка, повторите запрос позже</h4>';
            console.log('error: ' + reason);
        });
};

function showTrendWeek() {
    movieList.innerHTML = '<div class="spinner"></div>';
    fetch('https://api.themoviedb.org/3/trending/all/week?api_key=ef5194f00db31119dd3965f073a3d85a&language=ru')
        .then((result) => {
            if (result.status !== 200){
                return Promise.reject(new Error(result.status));
            }
            return result.json();
        })
        .then(objRequest => {
            listTitle.innerHTML = '<h4 class="list-title__info">Тренды недели</h4>';
            let getMovie = '';
            objRequest.results.forEach( item => {
                let nameItem = item.name || item.title;
                let mediaType = item.title ? 'movie' : 'tv';
                const poster = item.poster_path? urlPoster + item.poster_path : './img/NoPoster.jpg';
                let dataInfo = `data-id="${item.id}" data-type="${mediaType}"`;
                getMovie += `
                <div class="cardlist">
                    <img src="${poster}" class="img-poster" draggable="false" alt="${nameItem}" ${dataInfo}>
                    <h4>${nameItem}</h4>
                </div>
                `;
            });
            movieList.innerHTML = getMovie;
            addEventMedia();
            closeBurger();
        })
        .catch(reason => {
            movieList.innerHTML = '<h4 class="search-alert">Произошла ошибка, повторите запрос позже</h4>';
            console.log('error: ' + reason);
        });
};

function showAnnouncements() {
    movieList.innerHTML = '<div class="spinner"></div>';
    fetch('https://api.themoviedb.org/3/movie/upcoming?api_key=ef5194f00db31119dd3965f073a3d85a&language=ru')
        .then((result) => {
            if (result.status !== 200){
                return Promise.reject(new Error(result.status));
            }
            return result.json();
        })
        .then(objRequest => {
            listTitle.innerHTML = '<h4 class="list-title__info">Скоро в кинотеатрах</h4>';
            let getMovie = '';
            objRequest.results.forEach( item => {
                let nameItem = item.name || item.title;
                let mediaType = item.title ? 'movie' : 'tv';
                const poster = item.poster_path? urlPoster + item.poster_path : './img/NoPoster.jpg';
                let dataInfo = `data-id="${item.id}" data-type="${mediaType}"`;
                getMovie += `
                <div class="cardlist">
                    <img src="${poster}" class="img-poster" draggable="false" alt="${nameItem}" ${dataInfo}>
                    <h4>${nameItem}</h4>
                </div>
                `;
            });
            movieList.innerHTML = getMovie;
            addEventMedia();
            closeBurger();
        })
        .catch(reason => {
            movieList.innerHTML = '<h4 class="search-alert">Произошла ошибка, повторите запрос позже</h4>';
            console.log('error: ' + reason);
        });
};

function showContacts() {
    listTitle.innerHTML = '<h4 class="list-title__info">Контакты</h4>';
    let getMovie = '';
        getMovie += `
        <ul class="contacts">
            <li class="contact-link">
            <img class="contact-icon" src="./img/contacts/github.png" alt="contact-icon" draggable="false">
            <a class="contact-page" href="https://github.com/Gevorg22" target="_blank">Github</a>
            </li>
            <li class="contact-link">
            <img class="contact-icon" src="./img/contacts/linkedin.png" alt="contact-icon" draggable="false">
            <a class="contact-page" href="https://www.linkedin.com/in/gevorgkara" target="_blank">LinkedIn</a>
            </li>
            <li class="contact-link">
            <img class="contact-icon" src="./img/contacts/instagram.png" alt="contact-icon" draggable="false">
            <a class="contact-page" href="https://instagram.com/gevorg.kara" target="_blank">Instagram</a>
            </li>
            <li class="contact-link">
            <img class="contact-icon" src="./img/contacts/vk.png" alt="contact-icon" draggable="false">
            <a class="contact-page" href="https://vk.com/saviola" target="_blank">Vkontakte</a>
            </li>    
            <li class="contact-link">
            <img class="contact-icon" src="./img/contacts/facebook.png" alt="contact-icon" draggable="false">
            <a class="contact-page" href="https://www.facebook.com/jiani.yo" target="_blank">Facebook</a>
            </li>
            <li class="contact-link">
            <img class="contact-icon" src="./img/contacts/gmail.png" alt="contact-icon" draggable="false">
            <a class="contact-page" href="mailto:gevorg227@gmail.com">Написать письмо</a>
            </li>
        </ul>
        `;
    movieList.innerHTML = getMovie;
    closeBurger();
};

function addEventMedia() {
    const cardList = movieList.querySelectorAll('img[data-id]');
    cardList.forEach( item => {
        item.style.cursor = 'pointer';
        item.addEventListener('click', showCard);
    });
};

function showCard() {
    let url = '';
    if (this.dataset.type === 'movie') {
        url = `https://api.themoviedb.org/3/movie/${this.dataset.id}?api_key=ef5194f00db31119dd3965f073a3d85a&language=ru`;
    } else if (this.dataset.type === 'tv') {
        url = `https://api.themoviedb.org/3/tv/${this.dataset.id}?api_key=ef5194f00db31119dd3965f073a3d85a&language=ru`;
    } else {
        movieList.innerHTML = '<h4 class="search-alert">Произошла ошибка, повторите запрос позже</h4>';
    }
    fetch(url)
        .then((result) => {
            if (result.status !== 200){
                return Promise.reject(new Error(result.status));
            }
            return result.json();
        })
        .then(objRequest => {
            const poster = objRequest.poster_path? urlPoster + objRequest.poster_path : './img/NoPoster.jpg';
            const overview = objRequest.overview? objRequest.overview : 'К сожалению, описание отсутствует';
            const genres = objRequest.genres.map(item => item.name);
            modalContent.innerHTML = `
            <div class="card">
                <div>
                    <img class="card-img" src="${poster}" alt="${objRequest.name || objRequest.title}" draggable="false">
                    ${(objRequest.homepage) ? `<p class="card-page"> <a href="${objRequest.homepage}" target="_blank">Официальная страница</a></p>` : ''}
                    ${(objRequest.imdb_id) ? `<p class="card-page"> <a href="https://imdb.com/title/${objRequest.imdb_id}" target="_blank">Страница на IMDB.com</a></p>` : ''}
                </div>
                <div class="card-info">
                    <h2 class="card-title">${objRequest.name || objRequest.title}</h2>
                    <p class="card-vote"><b><u>Рейтинг на IMDb:</u></b>   ${objRequest.vote_average}</p>
                    <p class="card-release"><b><u>Премьера:</u></b>   ${objRequest.first_air_date || objRequest.release_date}</p>
                    <p class="card-runtime"><b><u>Продолжительность:</u></b>   ${objRequest.runtime || '75-120'} минут</p>
                    <p class="card-genres"><b><u>Жанр:</u></b>   ${genres}</p>
                    <p class="card-description"><b><u>Описание:</u></b>   ${overview}</p>
                </div>
            </div>
            <div class="modal-close">
                <span></span>
                <span></span>
            </div>
            `;
        })
        .catch(reason => {
            movieList.innerHTML = '<h4 class="search-alert">Произошла ошибка, повторите запрос позже</h4>';
            console.log('error: ' + reason);
        });
};

function closeBurger() {
    document.querySelector('.header-burger').classList.remove('active');
    document.querySelector('.header-menu').classList.remove('active');
    document.querySelector('body').classList.remove('lock');
};


searchForm.addEventListener('submit', apiSearch);

document.querySelector('.search-icon').addEventListener('click', apiSearch);

document.addEventListener('DOMContentLoaded', showMain);

document.querySelector('.nav-main').addEventListener('click', showMain);

document.querySelector('.nav-day').addEventListener('click', showTrendDay);

document.querySelector('.nav-week').addEventListener('click', showTrendWeek);

document.querySelector('.nav-announcements').addEventListener('click', showAnnouncements);

document.querySelector('.nav-contacts').addEventListener('click', showContacts);


movieList.addEventListener('click', event => {
    const target = event.target;
    const cardItem = target.closest('img[data-id]');
    if(cardItem) {
        document.body.style.width = '100%';
        document.body.style.height = '100%';
        document.body.style.overflow = 'hidden';
        document.body.style.position = 'fixed';
        modal.style.display = 'flex';
    }
});

modal.addEventListener('click', event => {
    const target = event.target;
    if(target.classList.contains('modal') || target.closest('.modal-close')) {
        document.body.style.overflow = '';
        modal.style.display = 'none';
        modalContent.innerHTML = '';
    }
});

document.querySelector('.header-burger').addEventListener('click', () => {
    document.querySelector('.header-burger').classList.toggle('active');
    document.querySelector('.header-menu').classList.toggle('active');
    document.querySelector('body').classList.toggle('lock');
});
