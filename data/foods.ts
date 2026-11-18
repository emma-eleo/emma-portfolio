export interface Food { id: string; label: string; src: string }
export interface FoodCategory { id: "desserts" | "meals"; title: string; items: Food[] }

const f = (file: string, label: string): Food => ({
  id: file.replace(/\.\w+$/, ""),
  label,
  src: `/assets/food/${encodeURIComponent(file)}`,
});

/** Labels come from the filenames — edit freely. Desserts first, then Meals. */
export const FOOD_CATEGORIES: FoodCategory[] = [
  {
    id: "desserts", title: "Desserts",
    items: [
      f("applepie.jpg", "Apple crumble pie"), f("tresleches.png", "Tres Leches"), f("carrotcake.jpg", "Carrot cake"),
      f("tiramisu.jpg", "Tiramisu"), f("birthday cake.png", "Birthday cake"), f("cookies.jpg", "Cookies"), f("muffins.png", "Muffins"),
    ],
  },
  {
    id: "meals", title: "Meals",
    items: [f("chicken.png", "Chicken"), f("khuushuur.jpg", "Khuushuur"), f("meal.jpg", "Meal"), f("salad.jpg", "Salad"), f("shul.png", "Shul")],
  },
];
