import React, { useState } from 'react';

function App() {
  const API_KEY = '43120738-5c40ac738bb9cceb9c8b4f8fd';
  const [images, setImages] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState('');

  const fetchImages = async (isLoadMore = false) => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(
        `https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(searchTerm)}&image_type=photo&per_page=12&page=${page}`
      );
      if (!response.ok) {
        throw new Error('Не вдалося завантажити зображення.');
      }
      const data = await response.json();
      setImages(isLoadMore ? [...images, ...data.hits] : data.hits);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    fetchImages();
  };

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
    fetchImages(true);
  };

  const openModal = (image) => {
    setModalImage(image);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalImage('');
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Pixabay Image Search</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Введіть пошуковий запит..."
          style={{ padding: '10px', width: '300px' }}
        />
        <button type="submit" style={{ padding: '10px', marginLeft: '10px' }}>
          Шукати
        </button>
      </form>
      {loading && <p>Завантаження...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', marginTop: '20px' }}>
        {images.map((image) => (
          <div key={image.id} style={{ margin: '10px' }}>
            <img
              src={image.previewURL}
              alt={image.tags}
              style={{ width: '150px', height: '100px', objectFit: 'cover', borderRadius: '8px', cursor: 'pointer' }}
              onClick={() => openModal(image.largeImageURL)}
            />
          </div>
        ))}
      </div>
      {images.length > 0 && (
        <button onClick={loadMore} style={{ padding: '10px 20px', marginTop: '20px' }}>
          Завантажити більше
        </button>
      )}
      {showModal && (
        <div
          onClick={closeModal}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
          }}
        >
          <img src={modalImage} alt="Large preview" style={{ maxHeight: '90%', maxWidth: '90%' }} />
        </div>
      )}
    </div>
  );
}

export default App;
