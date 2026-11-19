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
      f("tiramisu.jpg", "Tiramisu"), f("birthday cake.png", "Birthday cake"), f("cookies.jpg", "Choco chip Cookies"), f("muffins.png", "BlueberryMuffins"),
    ],
  },
  {
    id: "meals", title: "Meals",
    items: [f("chicken.png", "Butter Chicken with Naan"), f("khuushuur.jpg", "Khuushuur"), f("meal.jpg", "Fried Chicken with Fries"), f("salad.jpg", "Salad"), f("shul.png", "Vegetable Soup")],
  },
];
