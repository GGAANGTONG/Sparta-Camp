import { options, fetchConfiguration, fetchMovieData } from "./appApi.js";

//configuration API
fetchConfiguration().then((config) => {
  //영화 정보 API
  fetchMovieData("https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1").then((response) => {
    let data = response.results;
    let temp_html = "";
    data.forEach((card) => {
      let poster_path = card.poster_path;
      let title = card.title;
      let overview = card.overview;
      let vote_average = card.vote_average;
      let id = card.id;

      let poster_url = `${config.images.base_url}${config.images.poster_sizes[4]}${poster_path}
                    `;
      //위에 세 요소는 붙어 있어야 함

      //+=안하면 카드가 하나만 나옴
      //이를 통해 temp_html에 .cards의 정보를 루프 돌리며 쌓음
      temp_html += `   
                    <div class="col">
                    <div class="card" type = "Button" data-movie-id = "${id}" style = >
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
    document.getElementById("cards").innerHTML = temp_html;
  });
});

function movieChanging() {
  //configuration API
  fetchConfiguration().then((config) => {
    //영화 정보 API
    fetchMovieData("https://api.themoviedb.org/3/movie/popular?language=en-US&page=1").then((response) => {
      let data = response.results;
      let temp_html = "";
      data.forEach((card) => {
        let poster_path = card.poster_path;
        let title = card.title;
        let overview = card.overview;
        let vote_average = card.vote_average;
        let id = card.id;

        let poster_url = `${config.images.base_url}${config.images.poster_sizes[4]}${poster_path}
                    `;
        //위에 세 요소는 붙어 있어야 함

        //+=안하면 카드가 하나만 나옴
        //이를 통해 temp_html에 .cards의 정보를 루프 돌리며 쌓음
        temp_html += `   
                    <div class="col">
                    <div class="card" type = "Button" data-movie-id = "${id}" style = >
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
      document.getElementById("cards").innerHTML = temp_html;
    });
  });
}

document.getElementById("wordFilter").addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    let forFiltering = document.getElementById("wordFilter").value.toLowerCase();

    let cards = document.querySelectorAll(".card");

    let filteredCards = Array.from(cards).filter((card) =>
      card.querySelector(".card-title").innerText.toLowerCase().includes(forFiltering)
    );

    cards.forEach((card) => {
      card.style.display = filteredCards.includes(card) ? "block" : "none";
    });
  }
});

document.getElementById("movieFinder1").addEventListener("click", function () {
  //txt 입력 란에 id 값을 줘서 입력 란에 작성된 텍스트 값을 가져옴 (jquery랑 value 값 호출하는 방식이 다름 주의)
  let forFiltering = document.getElementById("wordFilter").value.toLowerCase(); // toLowerCase가 있어서 대소문자 구분 없이 작동
  //card 클래스에 속한 모든 영화 정보 가져오기
  let cards = document.querySelectorAll(".card");

  let filteredCards = Array.from(cards).filter((card) =>
    card.querySelector(".card-title").innerText.toLowerCase().includes(forFiltering)
  );
  cards.forEach((card) => {
    card.style.display = filteredCards.includes(card) ? "block" : "none";
  });
});
document.getElementById("movieFinder1").addEventListener("click", function () {});
document.addEventListener("DOMContentLoaded", function () {
  // 페이지가 로드되면 실행될 코드
  let searchInput = document.getElementById("wordFilter");
  searchInput.focus();
});

document.getElementById("movieFinder1").addEventListener("click", function () {
  if (document.getElementById("wordFilter").value === null) {
    location.reload();
  }
});

document.getElementById("wordFilter").addEventListener("keydown", function (event) {
  if (event.key === "Enter" && document.getElementById("wordFilter").value === null) {
    location.reload();
  }
});

document.getElementById("movieChanger").addEventListener("click", movieChanging);
document.getElementById("goToFirstPage").addEventListener("click", () => {
  location.reload();
});

document.getElementById("cards").addEventListener("click", function () {
  const card = event.target.closest(".card"); //수십개의 카드 클래스 요소 중 가장 가까운 놈으로 간다 = 자기 자신한테 간다
  if (card) {
    const id = card.getAttribute("data-movie-id"); //getAttribute는 속성을 가져와주는 API, 근데 아까는 "data-movie-id"의 속성이 설정돼 있지 않았음.
    showDetails(id);
  }
});

function showDetails(id) {
  alert(`ID는 ${id}입니다.`);
}

// const cards = document.getElementsByClassName("card");
// for (const card of cards) {
//   card.addEventListener("click", function () {
//     const id = this.getAttribute("data-movie-id");
//     showDetails(id);
//   });
// }
// // function showDetails(id) {
//   alert(`ID는 ${id}입니다.`);
// }
