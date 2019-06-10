import React from 'react';
import GalleryItem from './GalleryItem.js';
import NoImages from './NoImages';

// Gallery maps over selected or searched image query and renders individuallay to GalleryItem component
const Gallery = (props) => {
  const results = props.data;
  console.log(results);
  let images;
  if (results.length > 0) {
    images = results.map(image => <GalleryItem url={`https://farm${image.farm}.staticflickr.com/${image.server}/${image.id}_${image.secret}.jpg`} title={image.title} key={image.id}/>
  );
  } else {
    images = <NoImages />
  }

// Renders the collection of images to the DOM
return (
  <div className="photo-container">
    <h2>{(props.loading) ? "Loading..." : "Results"}</h2>
    <ul>
      { images }
    </ul>
  </div>
  );
}

export default Gallery;
