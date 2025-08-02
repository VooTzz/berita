const newsContainer = document.getElementById('newsContainer');
const searchInput = document.getElementById('searchInput');
let allNews = [];

// Ambil data dari JSON
fetch('berita.json')
  .then(res => res.json())
  .then(data => {
    allNews = data;
    renderNews(data);
  });

searchInput.addEventListener('input', () => {
  const keyword = searchInput.value.toLowerCase();
  const filteredNews = allNews.filter(news =>
    news.title.toLowerCase().includes(keyword) ||
    news.content.toLowerCase().includes(keyword)
  );
  renderNews(filteredNews);
});

function renderNews(newsList) {
  newsContainer.innerHTML = '';

  if (newsList.length === 0) {
    newsContainer.innerHTML = '<p>Tidak ada berita ditemukan.</p>';
    return;
  }

  newsList.forEach(news => {
    const card = document.createElement('div');
    card.className = 'news-card';
    card.innerHTML = `
      <img src="${news.image}" alt="Gambar Berita">
      <div class="news-content">
        <h2>${news.title}</h2>
        <p>${news.content}</p>
      </div>
    `;
    newsContainer.appendChild(card);
  });
}
