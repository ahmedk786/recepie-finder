import React from "react";

export default function SearchBar({ query, setQuery, type, setType, onSearch, onClear }) {
  return (
    <form
      className="searchbar"
      onSubmit={(e) => {
        e.preventDefault();
        onSearch();
      }}
    >
      {/* Input + Search button */}
      <div style={{ display: "flex", gap: 8, width: "100%" }}>
        <input
          aria-label="Search recipes"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={
            type === "name"
              ? "Search by recipe name (e.g., Biryani)"
              : "Search by ingredient (e.g., chicken)"
          }
          style={{
            flex: 1,
            padding: "12px 14px",
            borderRadius: 10,
            border: "1px solid #e5e5e5",
            fontSize: 16,
          }}
        />
        <button
          type="submit"
          style={{
            padding: "10px 14px",
            borderRadius: 10,
            background: "#ff6b6b",
            color: "#fff",
            border: "none",
            cursor: "pointer",
          }}
        >
          Search
        </button>
      </div>

      {/* Radio + Clear button */}
      <div
        style={{
          marginTop: 12,
          display: "flex",
          gap: 12,
          alignItems: "center",
        }}
      >
        <label style={{ fontSize: 14 }}>
          <input
            type="radio"
            checked={type === "name"}
            onChange={() => setType("name")}
          />{" "}
          Name
        </label>
        <label style={{ fontSize: 14 }}>
          <input
            type="radio"
            checked={type === "ingredient"}
            onChange={() => setType("ingredient")}
          />{" "}
          Ingredient
        </label>

        {/* Clear button styled like Search */}
        <button
          type="button"
          onClick={onClear}
          style={{
            marginLeft: "auto",
            padding: "8px 14px",
            borderRadius: 8,
            background: "#6c757d",
            color: "#fff",
            border: "none",
            fontSize: 14,
            cursor: "pointer",
          }}
        >
          Clear
        </button>
      </div>
    </form>
  );
}
