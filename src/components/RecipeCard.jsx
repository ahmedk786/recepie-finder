import React from 'react';

export default function RecipeCard({ meal, onOpen, isFavorite, onToggleFavorite }) {
  return (
    <div className="card">
      <img src={meal.strMealThumb} alt={meal.strMeal} className="card-image" onClick={() => onOpen(meal.idMeal)} />
      <div className="card-body">
        <h3 className="card-title">{meal.strMeal}</h3>
        <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
          <button className="btn" onClick={() => onOpen(meal.idMeal)}>
            View
          </button>
          <button
            className="btn outline"
            onClick={() => onToggleFavorite(meal.idMeal)}
            aria-pressed={isFavorite}
            title={isFavorite ? 'Remove favorite' : 'Add to favorites'}
          >
            {isFavorite ? '★ Favorited' : '☆ Favorite'}
          </button>
        </div>
      </div>
    </div>
  );
}
