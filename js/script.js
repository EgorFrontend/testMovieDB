"use strict";
document.addEventListener("DOMContentLoaded", () => {
  const adv = document.querySelectorAll(".promo__adv img"),
    promoGenre = document.querySelector(".promo__genre"),
    promoBg = document.querySelector(".promo__bg"),
    movieList = document.querySelector(".promo__interactive-list"),
    addFilm = document.querySelector("form.add"),
    addInput = addFilm.querySelector(".adding__input"),
    checkbox = addFilm.querySelector('[type="checkbox"]');

  const deleteAdv = (arr) => {
    arr.forEach((item) => {
      item.remove();
    });
  };

  const makeChanges = () => {
    promoGenre.textContent = "Драма";
    promoBg.style.backgroundImage = "url('../img/bg.jpg')";
  };

  const sortArr = (arr) => {
    arr.sort();
  };

  const movieDB = {
    movies: [
      "Логан",
      "Лига справедливости",
      "Ла-ла лэнд",
      "Одержимость",
      "Скотт Пилигрим против...",
    ],
  };

  function createMovieList(films, parent) {
    parent.innerHTML = "";

    sortArr(films);

    films.forEach((film, i) => {
      parent.innerHTML += `
        <li class="promo__interactive-item">${i + 1}. ${film}
          <div class="delete"></div>
        </li>
      `; // знак += в данном случае означает "= movieList.innerHTML +"
    });
    /* Удаление элементов при нажатии на корзинку  */
    document.querySelectorAll(".delete").forEach((btn, i) => {
      btn.addEventListener("click", () => {
        btn.parentElement.remove(); // Удалили родителя элемента "btn"
        movieDB.movies.splice(i, 1); //Удалили 1 элемент под индексом "i" из массива с фильмами

        createMovieList(films, parent); // этот самовызванный метод заново собирает список из массива, так что даже не обязательно удалять элемент из списка. Таким образом, не сбивается нумерация (родителя btn)
      });
    });
  }
  addFilm.addEventListener("submit", (event) => {
    event.preventDefault(); //отменил стандартное поведение браузера

    let newFilm = addInput.value; //поместил данные инпута в переменную

    if (newFilm) {
      if (newFilm.length > 20) {
        newFilm = `${newFilm.substring(0, 20)}...`;
      }
      if (checkbox.checked) {
        console.log("Добавляем любимый фильм");
      }
      movieDB.movies.push(newFilm); //добавил в массив новый элемент
      sortArr(movieDB.movies);
      createMovieList(movieDB.movies, movieList); //вывел новый массив на страницу
    }

    event.target.reset(); //сбросил форму
  });

  createMovieList(movieDB.movies, movieList);
  makeChanges();
  deleteAdv(adv);
});
