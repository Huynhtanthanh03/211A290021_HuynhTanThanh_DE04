// ======================
// DATA
// ======================

const movies = [
{
    id:1,
    title:"The Dark Knight",
    year:2008,
    genre:["Action","Crime"],
    director:"Christopher Nolan",
    actors:"Christian Bale",
    description:"Batman đối đầu Joker để bảo vệ thành phố Gotham.",
    poster:"images/img1.jpg"
},
{
    id:2,
    title:"Avatar",
    year:2009,
    genre:["Adventure","Sci-Fi"],
    director:"James Cameron",
    actors:"Sam Worthington",
    description:"Jake Sully tham gia chương trình Avatar trên Pandora.",
    poster:"images/img2.jpg"
},
{
    id:3,
    title:"Inception",
    year:2010,
    genre:["Action","Sci-Fi"],
    director:"Christopher Nolan",
    actors:"Leonardo DiCaprio",
    description:"Một nhóm chuyên đánh cắp bí mật trong giấc mơ.",
    poster:"images/img3.jpg"
},
{
    id:4,
    title:"Interstellar",
    year:2014,
    genre:["Drama","Sci-Fi"],
    director:"Christopher Nolan",
    actors:"Matthew McConaughey",
    description:"Cuộc hành trình tìm hành tinh mới cho loài người.",
    poster:"images/img4.jpg"
},
{
    id:5,
    title:"Spider-Man: No Way Home",
    year:2021,
    genre:["Action","Adventure"],
    director:"Jon Watts",
    actors:"Tom Holland",
    description:"Spider-Man mở đa vũ trụ và đối đầu các phản diện.",
    poster:"images/img5.jpg"
}
];

// ======================

const movieContainer=document.getElementById("movieContainer");
const genreList=document.getElementById("genreList");
const searchInput=document.getElementById("searchInput");

const modal=document.getElementById("movieModal");

const modalPoster=document.getElementById("modalPoster");
const modalTitle=document.getElementById("modalTitle");
const modalYear=document.getElementById("modalYear");
const modalGenre=document.getElementById("modalGenre");
const modalDirector=document.getElementById("modalDirector");
const modalActors=document.getElementById("modalActors");
const modalDescription=document.getElementById("modalDescription");

const closeModal=document.getElementById("closeModal");

const themeToggle=document.getElementById("themeToggle");

// ======================
// RENDER MOVIES
// ======================

function renderMovies(list){

movieContainer.innerHTML="";

list.forEach(movie=>{

movieContainer.innerHTML+=`

<div class="movie-card" onclick="showMovie(${movie.id})">

<img src="${movie.poster}" alt="${movie.title}">

<div class="movie-info">

<h3>${movie.title}</h3>

<p>📅 ${movie.year}</p>

</div>

</div>

`;

});

}

// ======================
// GENRES
// ======================

const genres=[...new Set(movies.flatMap(movie=>movie.genre))];

genres.forEach(item=>{

genreList.innerHTML+=`

<label>

<input type="checkbox" value="${item}">

${item}

</label>

`;

});

// ======================
// FILTER
// ======================

function filterMovies(){

const keyword=searchInput.value.toLowerCase();

const checked=[

...document.querySelectorAll("#genreList input:checked")

].map(item=>item.value);

const result=movies.filter(movie=>{

const searchMatch=movie.title.toLowerCase().includes(keyword);

const genreMatch=

checked.length===0 ||

checked.some(g=>movie.genre.includes(g));

return searchMatch && genreMatch;

});

renderMovies(result);

}

genreList.addEventListener("change",filterMovies);

// ======================
// DEBOUNCE
// ======================

function debounce(fn,delay){

let timer;

return function(){

clearTimeout(timer);

timer=setTimeout(fn,delay);

}

}

searchInput.addEventListener(

"keyup",

debounce(filterMovies,400)

);

// ======================
// MODAL
// ======================

function showMovie(id){

const movie=movies.find(m=>m.id===id);

modalPoster.src=movie.poster;
modalTitle.textContent=movie.title;
modalYear.textContent=movie.year;
modalGenre.textContent=movie.genre.join(", ");
modalDirector.textContent=movie.director;
modalActors.textContent=movie.actors;
modalDescription.textContent=movie.description;

modal.style.display="flex";

}

closeModal.onclick=()=>{

modal.style.display="none";

}

window.onclick=(e)=>{

if(e.target===modal){

modal.style.display="none";

}

}

// ======================
// DARK MODE
// ======================

if(localStorage.getItem("theme")==="dark"){

document.body.classList.add("dark-mode");

}

themeToggle.onclick=()=>{

document.body.classList.toggle("dark-mode");

if(document.body.classList.contains("dark-mode")){

localStorage.setItem("theme","dark");

}else{

localStorage.setItem("theme","light");

}

}

// ======================

renderMovies(movies);
