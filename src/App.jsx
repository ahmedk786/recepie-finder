import React, { useState, useEffect } from "react";
import {
  searchByName,
  filterByIngredient,
  lookupById,
  getRandomMeal,
} from "./api";
import SearchBar from "./components/SearchBar";
import RecipeList from "./components/RecipeList";
import RecipeModal from "./components/RecipeModal";

export default function App() {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("name"); // 'name' or 'ingredient'
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("rf_favorites") || "[]");
    } catch {
      return [];
    }
  });
  const [error, setError] = useState("");

  // Load multiple random meals initially
  const loadRandomMeals = async (count = 10) => {
    setLoading(true);
    try {
      const results = [];
      for (let i = 0; i < count; i++) {
        const json = await getRandomMeal();
        if (json && json.meals) {
          results.push(json.meals[0]);
        }
      }
      setMeals(results);
    } catch {
      setError("Failed to load random meals.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRandomMeals(); // load on first mount
  }, []);

  useEffect(() => {
    localStorage.setItem("rf_favorites", JSON.stringify(favorites));
  }, [favorites]);

  const handleSearch = async () => {
    setError("");
    if (!query) {
      loadRandomMeals(); // show random meals again when query is empty
      return;
    }
    setLoading(true);
    try {
      if (type === "name") {
        const res = await searchByName(query);
        setMeals(res.meals || []);
      } else {
        const res = await filterByIngredient(query);
        setMeals(res.meals || []);
      }
    } catch {
      setError("Search failed. Check your connection.");
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setQuery("");
    setError("");
    loadRandomMeals(); // reload random meals when cleared
  };

  const openRecipe = async (id) => {
    setLoading(true);
    try {
      const res = await lookupById(id);
      if (res.meals && res.meals[0]) {
        setSelectedMeal(res.meals[0]);
      } else {
        setError("Recipe details not found.");
      }
    } catch {
      setError("Failed to load recipe.");
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = (id) => {
    setFavorites((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      return [...prev, id];
    });
  };

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <h1>Ahmed&apos;s Recipe Finder</h1>
        <p className="tagline">
          Find recipes by name or ingredient — mobile first.
        </p>
      </header>

      {/* Search Section */}
      <main className="container">
        <SearchBar
          query={query}
          setQuery={setQuery}
          type={type}
          setType={setType}
          onSearch={handleSearch}
          onClear={handleClear}
        />

        {error && <div className="error">{error}</div>}
        {loading ? (
          <div className="loading">Loading…</div>
        ) : (
          <RecipeList
            meals={meals}
            onOpen={openRecipe}
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
          />
        )}
      </main>

      {/* Footer (now empty, name removed) */}
      <footer className="footer"></footer>

      {/* Modal */}
      {selectedMeal && (
        <RecipeModal
          meal={selectedMeal}
          onClose={() => setSelectedMeal(null)}
        />
      )}
    </div>
  );
}
