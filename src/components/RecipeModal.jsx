import React from 'react';
import { getIngredients } from '../utils';

export default function RecipeModal({ meal, onClose }) {
  if (!meal) return null;
  const ingredients = getIngredients(meal);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>✕</button>
        <div className="modal-top">
          <img src={meal.strMealThumb} alt={meal.strMeal} className="modal-image" />
          <div>
            <h2>{meal.strMeal}</h2>
            <p style={{ marginTop: 6, opacity: 0.9 }}>
              <strong>Category:</strong> {meal.strCategory || '—'} &nbsp; • &nbsp; <strong>Area:</strong> {meal.strArea || '—'}
            </p>
            {meal.strYoutube && (
              <p style={{ marginTop: 6 }}>
                <a href={meal.strYoutube} target="_blank" rel="noreferrer">YouTube tutorial</a>
              </p>
            )}
          </div>
        </div>

        <div className="modal-body">
          <section>
            <h3>Ingredients</h3>
            <ul>
              {ingredients.map((it, idx) => (
                <li key={idx}>{it.measure} {it.ingredient}</li>
              ))}
            </ul>
          </section>

          <section>
            <h3>Instructions</h3>
            <p style={{ whiteSpace: 'pre-wrap' }}>{meal.strInstructions}</p>
          </section>
        </div>
      </div>
    </div>
  );
}
