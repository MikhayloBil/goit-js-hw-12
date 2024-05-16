import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import { fetchImages } from './js/pixabay-api.js';
import { renderImages, clearGallery, showLoadMoreButton, hideLoadMoreButton, showEndOfResultsMessage } from './js/render-functions.js';

const form = document.querySelector('.js-search-form');
const loadMoreBtn = document.querySelector('.js-load-more');
let query = '';
let page = 1;
let simpleLightbox;

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    clearGallery()
    query = event.currentTarget.elements.searchQuery.value.trim();
    event.target.reset();
if (query.trim() === '') {
        hideLoadMoreButton()
        event.target.reset();
        iziToast.error({
            title: 'Error',
            message: 'Please enter a search query',
        });
        return;
}
    
    page = 1;
    clearGallery();
    hideLoadMoreButton();
    try {
        await fetchAndRenderImages();
    } catch (error) {
        iziToast.error({
            title: 'Error',
            message: 'Failed to fetch images. Please try again.',
        });
    }
});

loadMoreBtn.addEventListener('click', async () => {
    page += 1;
    try {
        await fetchAndRenderImages();
        scrollPage();
    } catch (error) {
        iziToast.error({
            title: 'Error',
            message: 'Failed to load more images. Please try again.',
        });
    }
});

const fetchAndRenderImages = async () => {
    try {
        const data = await fetchImages(query, page);
        if (data.hits.length === 0) {
            hideLoadMoreButton();
            iziToast.error({
                title: 'Error',
                message: 'No images found for the given query. Please try a different search term.',
            });
            return;
        }
        renderImages(data.hits);
        if (!simpleLightbox) {
            simpleLightbox = new SimpleLightbox('.gallery a');
        } else {
            simpleLightbox.refresh();
        }
        if (data.totalHits > page * 15) {
            showLoadMoreButton();
        } else {
            hideLoadMoreButton();
            showEndOfResultsMessage();
        }
    } catch (error) {
        console.error(error);
        iziToast.error({
            title: 'Error',
            message: 'Failed to fetch images. Please try again later.',
        });
        throw error;
    }
};

const scrollPage = () => {
    const { height: cardHeight } = document.querySelector('.gallery').firstElementChild.getBoundingClientRect();
    window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
    });
};