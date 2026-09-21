import Image from 'next/image';
import { automotiveWork, commercialWork, residentialWork } from '@/lib/automotive-work';

type AutomotiveWorkGalleryProps = {
  category?: 'automotive' | 'residential' | 'commercial' | 'featured' | 'all';
  limit?: number;
};

export function AutomotiveWorkGallery({ category = 'automotive', limit }: AutomotiveWorkGalleryProps) {
  const collections = { automotive: automotiveWork, residential: residentialWork, commercial: commercialWork };
  const collection = category === 'featured'
    ? [automotiveWork[0], residentialWork[0], commercialWork[0]]
    : category === 'all'
      ? [...automotiveWork, ...residentialWork, ...commercialWork]
      : collections[category];
  const items = typeof limit === 'number' ? collection.slice(0, limit) : collection;

  return (
    <div className="work-grid">
      {items.map((item) => (
        <figure className="work-card" key={item.id}>
          <div className="work-photo">
            <Image src={item.image} alt={item.alt} fill sizes="(max-width: 680px) calc(100vw - 36px), (max-width: 1020px) 50vw, 33vw" style={{ objectPosition: automotiveWork.includes(item) ? 'center bottom' : 'center center' }} />
            <span className="work-watermark" aria-hidden="true">
              <Image src="/mi-lock-pros-logo.png" alt="" width={118} height={80} />
            </span>
          </div>
          <figcaption>
            <small>{item.make} · Recent work</small>
            <h3>{item.title}</h3>
            <p>{item.caption}</p>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
