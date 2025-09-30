import React from 'react';
import RecipeCard from './RecipeCard';

export default function RecipeList({ meals, onOpen, favorites, onToggleFavorite }) {
  if (!meals || meals.length === 0) {
    return <div className="empty">No recipes found — try another search.</div>;
  }
  return (
    <div className="grid">
      {meals.map((m) => (
        <RecipeCard
          key={m.idMeal}
          meal={m}
          onOpen={onOpen}
          isFavorite={favorites.includes(m.idMeal)}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  );
}
