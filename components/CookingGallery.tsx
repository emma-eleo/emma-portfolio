import Image from "next/image";
import { FOOD_CATEGORIES } from "@/data/foods";

export default function CookingGallery() {
  return (
    <div className="food-wrap">
      {FOOD_CATEGORIES.map((cat) => (
        <section key={cat.id} aria-labelledby={`food-${cat.id}`} className="food-section">
          <h2 id={`food-${cat.id}`} className="food-heading">{cat.title}</h2>
          <ul className="food-grid">
            {cat.items.map((item) => (
              <li key={item.id} className="food-item">
                <div className="food-photo">
                  <Image src={item.src} alt={item.label} fill sizes="(max-width: 900px) 45vw, 22vw" style={{ objectFit: "cover" }} draggable={false} />
                </div>
                <span className="food-caption">{item.label}</span>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
