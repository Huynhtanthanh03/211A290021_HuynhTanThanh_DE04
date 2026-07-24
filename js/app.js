const movies = [
    {
        id: 1,
        title: "The Dark Knight",
        year: 2008,
        genres: ["Hành động", "Tội phạm", "Kịch tính"],
        director: "Christopher Nolan",
        actors: "Christian Bale, Heath Ledger, Aaron Eckhart",
        poster: "images/img1.jpg",
        description: "Khi mối đe dọa được gọi là Joker gây ra sự hỗn loạn tàn khốc cho người dân Gotham, Batman phải chấp nhận một trong những thử nghiệm tâm lý và thể chất lớn nhất để chống lại bất công."
    },
    {
        id: 2,
        title: "Inception",
        year: 2010,
        genres: ["Hành động", "Khoa học viễn tưởng", "Phiêu lưu"],
        director: "Christopher Nolan",
        actors: "Leonardo DiCaprio, Joseph Gordon-Levitt, Elliot Page",
        poster: "images/img2.jpg",
        description: "Một kẻ trộm có khả năng đi vào giấc mơ của người khác để đánh cắp bí mật của họ được giao một nhiệm vụ ngược lại: gieo ý tưởng vào tâm trí của một CEO."
    },
    {
        id: 3,
        title: "Spirited Away",
        year: 2001,
        genres: ["Hoạt hình", "Phiêu lưu", "Phantasy"],
        director: "Hayao Miyazaki",
        actors: "Rumi Hiiragi, Miyu Irino, Mari Natsuki",
        poster: "images/img3.jpg",
        description: "Trong lúc di chuyển đến nhà mới, một cô bé 10 tuổi tình cờ lạc vào thế giới của các linh hồn thần thoại được cai trị bởi một phù thủy."
    },
    {
        id: 4,
        title: "Parasite",
        year: 2019,
        genres: ["Kịch tính", "Giật gân"],
        director: "Bong Joon Ho",
        actors: "Song Kang-ho, Lee Sun-kyun, Cho Yeo-jeong",
        poster: "images/img4.jpg",
        description: "Mối quan hệ cộng sinh hình thành giữa một gia đình nghèo và một gia đình giàu có khi các thành viên nhà nghèo lần lượt thâm nhập vào dinh thự bằng cách đóng giả làm người giúp việc có trình độ cao."
    },
    {
        id: 5,
        title: "Interstellar",
        year: 2014,
        genres: ["Khoa học viễn tưởng", "Kịch tính", "Phiêu lưu"],
        director: "Christopher Nolan",
        actors: "Matthew McConaughey, Anne Hathaway, Jessica Chastain",
        poster: "images/img5.jpg",
        description: "Một nhóm các nhà thám hiểm du hành qua một hố đen ngoài vũ trụ nhằm tìm kiếm sự sống còn cho nhân loại khi Trái Đất đang đứng trước bờ vực diệt vong."
    }
];

const themeCheckbox = document.getElementById("theme-checkbox");
const searchInput = document.getElementById("search-input");
const genresContainer = document.getElementById("genres-container");
const moviesGrid = document.getElementById("movies-grid");
const movieModal = document.getElementById("movie-modal");
const modalBody = document.getElementById("modal-body");
const closeModal = document.querySelector(".close-modal");

let selectedGenres = [];
let searchQuery = "";

function initTheme() {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
        themeCheckbox.checked = true;
    }
}

themeCheckbox.addEventListener("change", () => {
    if (themeCheckbox.checked) {
        document.body.classList.add("dark-mode");
        localStorage.setItem("theme", "dark");
    } else {
        document.body.classList.remove("dark-mode");
        localStorage.setItem("theme", "light");
    }
});

function generateGenreFilters() {
    const genresSet = new Set();
    movies.forEach(movie => {
        movie.genres.forEach(genre => genresSet.add(genre));
    });

    genresContainer.innerHTML = "";
    genresSet.forEach(genre => {
        const label = document.createElement("label");
        label.className = "checkbox-label";
        
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.value = genre;
        
        checkbox.addEventListener("change", (e) => {
            if (e.target.checked) {
                selectedGenres.push(genre);
            } else {
                selectedGenres = selectedGenres.filter(g => g !== genre);
            }
            filterMovies();
        });

        label.appendChild(checkbox);
        label.appendChild(document.createTextNode(genre));
        genresContainer.appendChild(label);
    });
}

function renderMovies(moviesList) {
    moviesGrid.innerHTML = "";
    if (moviesList.length === 0) {
        moviesGrid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted);">Không tìm thấy phim phù hợp.</p>`;
        return;
    }

    moviesList.forEach(movie => {
        const card = document.createElement("div");
        card.className = "movie-card";
        card.innerHTML = `
            <img src="${movie.poster}" alt="${movie.title}" class="movie-poster" loading="lazy">
            <div class="movie-info">
                <h4 class="movie-title">${movie.title}</h4>
                <span class="movie-year">${movie.year}</span>
            </div>
        `;
        card.addEventListener("click", () => openModal(movie));
        moviesGrid.appendChild(card);
    });
}

function filterMovies() {
    const filtered = movies.filter(movie => {
        const matchesSearch = movie.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesGenre = selectedGenres.length === 0 || selectedGenres.every(genre => movie.genres.includes(genre));
        return matchesSearch && matchesGenre;
    });
    renderMovies(filtered);
}

function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}

searchInput.addEventListener("input", debounce((e) => {
    searchQuery = e.target.value.trim();
    filterMovies();
}, 300));

function openModal(movie) {
    modalBody.innerHTML = `
        <img src="${movie.poster}" alt="${movie.title}" class="modal-poster">
        <div class="modal-details">
            <h2 class="modal-title">${movie.title}</h2>
            <div class="modal-meta">${movie.year} • ${movie.genres.join(", ")}</div>
            <p class="modal-desc">${movie.description}</p>
            <div class="modal-field" style="margin-top: 1rem;"><strong>Đạo diễn:</strong> ${movie.director}</div>
            <div class="modal-field"><strong>Diễn viên:</strong> ${movie.actors}</div>
        </div>
    `;
    movieModal.style.display = "flex";
    document.body.style.overflow = "hidden";
}

function closeModalWindow() {
    movieModal.style.display = "none";
    document.body.style.overflow = "auto";
}

closeModal.addEventListener("click", closeModalWindow);
window.addEventListener("click", (e) => {
    if (e.target === movieModal) closeModalWindow();
});

document.addEventListener("DOMContentLoaded", () => {
    initTheme();
    generateGenreFilters();
    renderMovies(movies);
});
