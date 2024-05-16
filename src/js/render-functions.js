function renderImages(images) {
    const gallery = document.querySelector('.js-gallery');
    const markup = images.map(image => {
        return `
            <div class="photo-card">
                <a href="${image.largeImageURL}">
                    <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" class="gallery-img" />
                </a>
                <div class="info">
                    <p><b>Likes:</b> ${image.likes}</p>
                    <p><b>Views:</b> ${image.views}</p>
                    <p><b>Comments:</b> ${image.comments}</p>
                    <p><b>Downloads:</b> ${image.downloads}</p>
                </div>
            </div>
        `;
    }).join('');
    gallery.insertAdjacentHTML('beforeend', markup);
}

function clearGallery() {
    const gallery = document.querySelector('.js-gallery');
    gallery.innerHTML = '';
}

function showLoadMoreButton() {
    const loadMoreBtn = document.querySelector('.js-load-more');
    loadMoreBtn.classList.remove('is-hidden');
}

function hideLoadMoreButton() {
    const loadMoreBtn = document.querySelector('.js-load-more');
    loadMoreBtn.classList.add('is-hidden');
}

function showEndOfResultsMessage() {
    const message = document.createElement('p');
    message.textContent = "We're sorry, but you've reached the end of search results.";
    document.querySelector('.gallery').appendChild(message);
}

export { renderImages, clearGallery, showLoadMoreButton, hideLoadMoreButton, showEndOfResultsMessage };