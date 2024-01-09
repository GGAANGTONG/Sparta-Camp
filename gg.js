import { options, fetchConfiguration, fetchMovieData } from "./appApi.js";

// configuration API 호출 및 영화 정보 표시
fetchConfiguration().then((config) => {
  fetchMovieData("https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1").then((response) => {
    let data = response.results;
    let temp_html = "";
    data.forEach((card) => {
      let poster_path = card.poster_path;
      let title = card.title;
      let overview = card.overview;
      let vote_average = card.vote_average;
      let id = card.id;

      let poster_url = `${config.images.base_url}${config.images.poster_sizes[4]}${poster_path}`;
      // 위에 세 요소는 붙어 있어야 함

      temp_html += `   
        <div class="col">
          <div class="card" data-movie-id="${id}">
            <img src="${poster_url}" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title" style="font-weight: bold; font-size: 195%">${title}</h5>
              <p class="card-text" style="font-size: 140%">${overview}</p>
              <p class="card-text" style="font-weight: bold; font-size: 160%; color: yellow;">Rating: ${vote_average}</p>
            </div>
          </div>
        </div>`;
    });
    document.getElementById("cards").innerHTML = temp_html; // cards가 있는 요소에 innerHTML 설정
  });
});

function movieChanging() {
  // configuration API 호출 및 영화 정보 표시
  fetchConfiguration().then((config) => {
    fetchMovieData("https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1").then((response) => {
      let data = response.results;
      let temp_html = "";
      data.forEach((card) => {
        let poster_path = card.poster_path;
        let title = card.title;
        let overview = card.overview;
        let vote_average = card.vote_average;
        let id = card.id;

        let poster_url = `${config.images.base_url}${config.images.poster_sizes[4]}${poster_path}`;
        // 위에 세 요소는 붙어 있어야 함

        temp_html += `   
          <div class="col">
            <div class="card" data-movie-id="${id}">
              <img src="${poster_url}" class="card-img-top" alt="...">
              <div class="card-body">
                <h5 class="card-title" style="font-weight: bold; font-size: 195%">${title}</h5>
                <p class="card-text" style="font-size: 140%">${overview}</p>
                <p class="card-text" style="font-weight: bold; font-size: 160%; color: yellow;">Rating: ${vote_average}</p>
              </div>
            </div>
          </div>`;
      });
      document.getElementById("cards").innerHTML = temp_html; // cards가 있는 요소에 innerHTML 설정
    });
  });
}

// 나머지 이벤트 핸들러 등록 코드는 그대로 유지

// ...
