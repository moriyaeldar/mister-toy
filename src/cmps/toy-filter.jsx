import React from "react";

export function ToyFilter({ onChangeFilter }) {
  const handleChange = (ev) => {
    const field = ev.target.field;
    const value = ev.target.value;
    onChangeFilter({ toyName: value });
  };

  return (
    <div>
      <select
        className="browser-default"
        name="filter"
        id="filter"
        onChange={(ev) => {
          onChangeFilter({inStock:ev.target.value});
        }}
      >
        <option value="all">All</option>
        <option value="out of stock">Out of stock</option>
        <option value="in stock">In stock</option>
      </select>
      <select
        className="browser-default"
        name="labels"
        id="labels"
        onChange={(ev) => {
          onChangeFilter({labels:ev.target.value});
        }}
      >
        <option value="All">All labels</option>
        <option value="On wheels">On wheels</option>
        <option value="Baby">Baby</option>
        <option value="Doll">Doll</option>
        <option value="Battery Powered">Battery Powered</option>
        <option value="Kids">Kids</option>
        <option value="Outdoor">Outdoor</option>
      </select>
      <input
        onChange={handleChange}
        type="search"
        name="name"
        id="name"
        placeholder="search"
      />

     
    </div>
  );
}
