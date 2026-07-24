// ======================
// DATA
// ======================

const movies = [
{
    id:1,
    title:"Inception",
    year:2010,
    genre:["Action","Sci-Fi"],
    director:"Christopher Nolan",
    actors:"Leonardo DiCaprio",
    description:"Dom Cobb là bậc thầy đánh cắp bí mật thông qua giấc mơ.",
    poster:"images/img1.jpg"
},
{
    id:2,
    title:"Last Night in Soho",
    year:2021,
    genre:["Drama","Mystery"],
    director:"Edgar Wright",
    actors:"Thomasin McKenzie",
    description:"Một cô gái trẻ bất ngờ quay về London thập niên 1960 qua những giấc mơ kỳ lạ.",
    poster:"images/img2.jpg"
},
{
    id:3,
    title:"Ant-Man",
    year:2015,
    genre:["Action","Adventure"],
    director:"Peyton Reed",
    actors:"Paul Rudd",
    description:"Scott Lang trở thành Ant-Man với khả năng thu nhỏ kích thước nhưng tăng sức mạnh.",
    poster:"images/img3.jpg"
},
{
    id:4,
    title:"Skyfall",
    year:2012,
    genre:["Action","Adventure"],
    director:"Sam Mendes",
    actors:"Daniel Craig",
    description:"James Bond đối đầu kẻ thù nguy hiểm Silva để bảo vệ MI6.",
    poster:"images/img4.jpg"
},
{
    id:5,
    title:"Oblivion",
    year:2013,
    genre:["Action","Sci-Fi"],
    director:"Joseph Kosinski",
    actors:"Tom Cruise",
    description:"Một kỹ thuật viên bảo trì trên Trái Đất khám phá bí mật làm thay đổi toàn bộ nhiệm vụ của mình.",
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
