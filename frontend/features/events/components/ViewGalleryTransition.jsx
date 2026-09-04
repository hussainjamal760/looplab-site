'use client';

export default function ViewGalleryTransition() {
  const handleScrollToGallery = () => {
    const galleryEl = document.getElementById('gallery-section');
    if (galleryEl) {
      galleryEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="view-gallery-banner-section">
      <button
        className="view-gallery-btn"
        onClick={handleScrollToGallery}
        type="button"
      >
        <span>EXPLORE ARCHIVES • VIEW GALLERY</span>
        <span>↓</span>
      </button>
    </section>
  );
}
