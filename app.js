   //API에 필요한 options 상수 정의
   const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjZTkxOWU0YzFkZGYzOTdjMjIzMjNkNzJiNjRkYjZjZCIsInN1YiI6IjY1OThkMGMwMWQxYmY0MDE0ZDIyZDFkNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.13Uig7dMzOVBHUoAiuiUr2YR-TK3c5pjMPcK98AOs1Y'
    }
};

//configuration API
fetch('https://api.themoviedb.org/3/configuration', options)
    .then(response => response.json())
    .then(config => {
        //영화 정보 API
        fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
            .then(response => response.json())
            .then(response => {
                let data = response.results;
                let temp_html = '';
                data.forEach(card => {
                    let poster_path = card.poster_path;
                    let title = card.title;
                    let overview = card.overview;
                    let vote_average = card.vote_average;
                    let id = card.id;

                    let poster_url =
                        `${config.images.base_url}${config.images.poster_sizes[3]}${poster_path}
                        `;
                    //위에 세 요소는 붙어 있어야 함

                    //+=안하면 카드가 하나만 나옴
                    //이를 통해 temp_html에 .cards의 정보를 루프 돌리며 쌓음
                    temp_html += `   
                        <div class="col">
                        <div class="card h-100" type = "Button" onclick = "showDetails(${id})" style = >
                        <img src= ${poster_url} class="card-img-top" alt="...">
                        <div class= "card-body" >
                            <h5 class="card-title" style = "font-weight: bold; font-size: 195%">${title}</h5>
                            <p class="card-text" style = "font-size: 140%">${overview}</p>
                            <p class="card-text" style = "font-weight: bold; font-size: 160%; color: yellow;"">Rating: ${vote_average}</p>
                            </div>
                            </div>
                            </div>
                        `;
                });
                document.getElementById('cards').innerHTML = temp_html;
                //쌓인 temp_html 정보를 inner.HTML을 활용하여 웹 브라우저 상에 표현함
            });
    })
    .catch(err => console.error(err))


function showDetails(id) {
    alert(`ID는 ${id}입니다.`)
};

document.getElementById('wordFilter').addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        let forFiltering = document.getElementById('wordFilter').value.toLowerCase();

        let cards = document.querySelectorAll('.card');


        let filteredCards = Array.from(cards).filter(card => card.querySelector('.card-title').innerText.toLowerCase().includes(forFiltering));


        cards.forEach(card => {
            card.style.display = filteredCards.includes(card) ? 'block' : 'none';
        });
    }
});



document.getElementById('movieFinder1').addEventListener("click", function () {
    //txt 입력 란에 id 값을 줘서 입력 란에 작성된 텍스트 값을 가져옴 (jquery랑 value 값 호출하는 방식이 다름 주의) 
    let forFiltering = document.getElementById('wordFilter').value.toLowerCase(); // toLowerCase가 있어서 대소문자 구분 없이 작동
    //card 클래스에 속한 모든 영화 정보 가져오기
    let cards = document.querySelectorAll('.card');

    let filteredCards = Array.from(cards).filter(card => card.querySelector('.card-title').innerText.toLowerCase().includes(forFiltering));
    cards.forEach(card => {
        card.style.display = filteredCards.includes(card) ? 'block' : 'none';
    });
});
document.getElementById('movieFinder1').addEventListener("click", function () {

});
document.addEventListener('DOMContentLoaded', function () {
    // 페이지가 로드되면 실행될 코드
    let searchInput = document.getElementById('wordFilter');
    searchInput.focus();
});

document.getElementById('movieFinder1').addEventListener("click", function () {
    if (document.getElementById('wordFilter').value === null) {
        location.reload()
    }
});

document.getElementById('wordFilter').addEventListener("keydown", function (event) {
    if (event.key === "Enter" && document.getElementById('wordFilter').value === null) {
        location.reload();
    }
});

function movieChanging() {
    fetch('https://api.themoviedb.org/3/configuration', options)
        .then(response => response.json())
        .then(config => {
            fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options)
                .then(response => response.json())
                .then(response => {
                    let data = response.results;
                    let temp_html = '';
                    data.forEach(card => {
                        let poster_path = card.poster_path;
                        let title = card.title;
                        let overview = card.overview;
                        let vote_average = card.vote_average;
                        let id = card.id;

                        let poster_url =
                            `${config.images.base_url}${config.images.poster_sizes[3]}${poster_path}
                        `;
                        //위에 세 요소는 붙어 있어야 함(마치 www.naver.com/image(baseurl) image_size==2(poster_sizes)&name==spongebob(poster_path))

                        //+=안하면 카드가 하나만 나옴
                        //이를 통해 temp_html에 .cards의 정보를 루프 돌리며 쌓음
                        temp_html += `   
                        <div class="col">
                        <div class="card" type = "Button" onclick = "showDetails(${id})">
                        <img src= ${poster_url} class="card-img-top" alt="...">
                        <div class= "card-body" >
                            <h5 class="card-title" style = "font-weight: bold; font-size: 195%">${title}</h5>
                            <p class="card-text" style = "font-size: 140%">${overview}</p>
                            <p class="card-text" style = "font-weight: bold; font-size: 160%; color: yellow;"">Rating: ${vote_average}</p>
                            </div>
                            </div>
                            </div>
                        `;
                    });
                    document.getElementById('cards').innerHTML = temp_html;
                    //쌓인 temp_html 정보를 inner.HTML을 활용하여 웹 브라우저 상에 표현함
                });

        })
        .catch(err => console.error(err));
};
document.getElementById('movieChanger').addEventListener("click", movieChanging);
document.getElementById('goToFirstPage').addEventListener("click", () => {
    location.reload();
})