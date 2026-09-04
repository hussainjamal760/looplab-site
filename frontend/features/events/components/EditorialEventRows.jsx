'use client';

const editorialEventsData = [
  {
    id: 1,
    title: 'loopverse 2.0',
    description: 'Fake need calls theme',
    link: '#',
    accentColor: '#9E00FE'
  },
  {
    id: 2,
    title: 'skillup week 01',
    description: 'Hands-on frontend & AI labs',
    link: '#',
    accentColor: '#f5693c'
  },
  {
    id: 3,
    title: 'hackathon 3.0',
    description: '48H build sprint & demo night',
    link: '#',
    accentColor: '#29725f'
  }
];

export default function EditorialEventRows() {
  return (
    <section className="editorial-rows-section">
      <div className="editorial-rows-container">
        {editorialEventsData.map((evt) => (
          <a
            key={evt.id}
            href={evt.link}
            className="editorial-row-item"
            style={{ '--accent-color': evt.accentColor }}
          >
            <div className="editorial-row-left">
              <span className="editorial-title">{evt.title}</span>
              <div className="editorial-underline" />
            </div>

            <div className="editorial-row-center">
              <span className="editorial-desc">{evt.description}</span>
            </div>

            <div className="editorial-row-right">
              <span className="editorial-action">view event →</span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
