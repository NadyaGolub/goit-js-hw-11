import Notiflix from 'notiflix';

import { refs } from "./js/refs";
import { fetchImage } from "./js/fetch";
import { markupFile } from './js/markup-file';
console.log(markupFile);



let page = 1;
let totalImg = 0; 

refs.form.addEventListener('submit', onSearch);
refs.button.addEventListener('click', loadMore);

function onSearch(event) {
  event.preventDefault();
  const value = refs.form.elements.searchQuery.value;

  return fetchImage(value, page)
    .then(data => {
      page = 1;
      totalImg = 0;
      totalImg += data.hits.length;

      if (value === '') {
        return Notiflix.Notify.failure('Enter your search query, please');
      }

      if (data.hits.length === 0) {
        hideBtn();
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }
      else {
        showBtn();
        Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
      } 

      if (totalImg === data.totalHits) {
        hideBtn();
      } 
      return (refs.gallery.innerHTML = markupFile(data.hits));
    })
    .catch(err => {
      error(err);
    });
}

function loadMore() {
  const value = refs.form.elements.searchQuery.value;
  page += 1;

  return fetchImage(value, page)
    .then(data => {
      totalImg += data.hits.length; 

    

      if (totalImg === data.totalHits) {
        hideBtn();
        Notiflix.Notify.info(`You have got all avaiable images.`);
      } 

      return refs.gallery.insertAdjacentHTML('beforeend', markup(data.hits));
    })
    .catch(err => {
      error(err);
    });
}

function hideBtn() {
  refs.button.hidden = true;
}

function showBtn() {
  refs.button.hidden = false;
}

function error(err) {
  console.log(err);
  throw new Error(
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    )
  );
}