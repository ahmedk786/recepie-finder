const BASE = 'https://www.themealdb.com/api/json/v1/1';

export async function searchByName(name) {
  const res = await fetch(`${BASE}/search.php?s=${encodeURIComponent(name)}`);
  return res.json(); // { meals: [...] } or { meals: null }
}

export async function filterByIngredient(ingredient) {
  // Note: filter returns only id, name, thumb
  const res = await fetch(`${BASE}/filter.php?i=${encodeURIComponent(ingredient)}`);
  return res.json();
}

export async function lookupById(id) {
  const res = await fetch(`${BASE}/lookup.php?i=${id}`);
  return res.json();
}

export async function getRandomMeal() {
  const res = await fetch(`${BASE}/random.php`);
  return res.json();
}
