import{a as g,i as n,S as y}from"./assets/vendor-6e0bf343.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))t(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&t(l)}).observe(document,{childList:!0,subtree:!0});function a(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function t(r){if(r.ep)return;r.ep=!0;const o=a(r);fetch(r.href,o)}})();const h="43797982-65d97265afa84a551e725288a",p="https://pixabay.com/api/";async function b(e,s=1,a=15){const t=`${p}?key=${h}&q=${e}&image_type=photo&orientation=horizontal&safesearch=true&page=${s}&per_page=${a}`;try{return(await g.get(t)).data}catch(r){throw console.error("Error fetching images:",r),r}}function L(e){const s=document.querySelector(".js-gallery"),a=e.map(t=>`
            <div class="photo-card">
                <a href="${t.largeImageURL}">
                    <img src="${t.webformatURL}" alt="${t.tags}" loading="lazy" class="gallery-img" />
                </a>
                <div class="info">
                    <p><b>Likes:</b> ${t.likes}</p>
                    <p><b>Views:</b> ${t.views}</p>
                    <p><b>Comments:</b> ${t.comments}</p>
                    <p><b>Downloads:</b> ${t.downloads}</p>
                </div>
            </div>
        `).join("");s.insertAdjacentHTML("beforeend",a)}function m(){const e=document.querySelector(".js-gallery");e.innerHTML=""}function w(){document.querySelector(".js-load-more").classList.remove("is-hidden")}function i(){document.querySelector(".js-load-more").classList.add("is-hidden")}function E(){const e=document.createElement("p");e.textContent="We're sorry, but you've reached the end of search results.",document.querySelector(".gallery").appendChild(e)}const q=document.querySelector(".js-search-form"),v=document.querySelector(".js-load-more");let u="",c=1,d;q.addEventListener("submit",async e=>{if(e.preventDefault(),m(),u=e.currentTarget.elements.searchQuery.value.trim(),e.target.reset(),u.trim()===""){i(),e.target.reset(),n.error({title:"Error",message:"Please enter a search query"});return}c=1,m(),i();try{await f()}catch{n.error({title:"Error",message:"Failed to fetch images. Please try again."})}});v.addEventListener("click",async()=>{c+=1;try{await f(),S()}catch{n.error({title:"Error",message:"Failed to load more images. Please try again."})}});const f=async()=>{try{const e=await b(u,c);if(e.hits.length===0){i(),n.error({title:"Error",message:"No images found for the given query. Please try a different search term."});return}L(e.hits),d?d.refresh():d=new y(".gallery a"),e.totalHits>c*15?w():(i(),E())}catch(e){throw console.error(e),n.error({title:"Error",message:"Failed to fetch images. Please try again later."}),e}},S=()=>{const{height:e}=document.querySelector(".gallery").firstElementChild.getBoundingClientRect();window.scrollBy({top:e*2,behavior:"smooth"})};
//# sourceMappingURL=commonHelpers.js.map