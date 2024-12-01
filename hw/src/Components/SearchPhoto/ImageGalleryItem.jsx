import React from 'react';

const ImageGalleryItem = ({ image, openModal }) => (
  <li className="gallery-item" onClick={() => openModal(image.largeImageURL)}>
    <img src={image.webformatURL} alt={image.tags} />
  </li>
);

export default ImageGalleryItem;
