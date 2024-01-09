export function fetchConfiguration() {
  return fetch("https://api.themoviedb.org/3/configuration", options)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
}

export function fetchMovieData(url) {
  return fetch(url, options)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .catch((error) => {
      console.error(error);
      throw error; // 다시 에러를 throw하여 app.js에서 catch 블록으로 이동
    });
}
