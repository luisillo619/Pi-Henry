import "./CreatePokemon.css";
import React from "react";
import useForm from "../../hooks/useForm";
import NavBar from "../NavBar/NavBar";
const initialForm = {
  name: "",
  life: "",
  attack: "",
  defense: "",
  speed: "",
  height: "",
  weight: "",
  image: "",
  type: "",
  types: [],
};

const validationsForm = (form, pokemons) => {
  const errors = {};
  const regexText = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
  const regexNumber = /^\d+$/;
  const regexURL =
    /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;

  const existingType =
    form.types.filter((e) => {
      return e.toUpperCase() === form.type.trim().toUpperCase();
    }).length === 1;

  const existingName =
    pokemons.filter((e) => {
      return e.name.toUpperCase() === form.name.trim().toUpperCase();
    }).length === 1;

  // name
  if (!form.name.trim()) {
    errors.name = "El campo Pokemon name, es requerido";
  } else if (!regexText.test(form.name)) {
    errors.name = "Pokemon name, solo puede contener letras";
  } else if (existingName) {
    errors.name = "Pokemons name, no puede contener nombres ya existentes";
  }

  // life
  if (!form.life.trim()) {
    errors.life = "El campo Pokemon life, es requerido";
  } else if (!regexNumber.test(form.life)) {
    errors.life = "Pokemon life, solo puede contener numeros Enteros";
  } else if (parseInt(form.life) === 0 || parseInt(form.life) > 200) {
    errors.life =
      "Pokemon life, solo puede contener numeros Enteros entre 1 y 200";
  }

  // attack
  if (!form.attack.trim()) {
    errors.attack = "El campo Pokemon attack power, es requerido";
  } else if (!regexNumber.test(form.attack)) {
    errors.attack = "Pokemon attack power, solo puede contener numeros Enteros";
  } else if (parseInt(form.attack) === 0 || parseInt(form.attack) > 200) {
    errors.attack =
      "Pokemon attack power, solo puede contener numeros Enteros entre 1 y 200";
  }

  // defense
  if (!form.defense.trim()) {
    errors.defense = "El campo Pokemon defense level, es requerido";
  } else if (!regexNumber.test(form.defense)) {
    errors.defense =
      "Pokemon defense level, solo puede contener numeros Enteros";
  } else if (parseInt(form.defense) === 0 || parseInt(form.defense) > 200) {
    errors.defense =
      "Pokemon defense level, solo puede contener numeros Enteros entre 1 y 200";
  }

  // speed
  if (!form.speed.trim()) {
    errors.speed = "El campo Pokemon speed level, es requerido";
  } else if (!regexNumber.test(form.speed)) {
    errors.speed = "Pokemon speed level, solo puede contener numeros Enteros";
  } else if (parseInt(form.speed) === 0 || parseInt(form.speed) > 200) {
    errors.speed =
      "Pokemon speed level, solo puede contener numeros Enteros entre 1 y 200";
  }

  // height
  if (!form.height.trim()) {
    errors.height = "El campo Pokemon height, es requerido";
  } else if (!regexNumber.test(form.height)) {
    errors.height = "Pokemon height, solo puede contener numeros Enteros";
  } else if (parseInt(form.height) === 0 || parseInt(form.height) > 200) {
    errors.height =
      "Pokemon height, solo puede contener numeros Enteros entre 1 y 200";
  }

  // weight
  if (!form.weight.trim()) {
    errors.weight = "El campo Pokemon weight, es requerido";
  } else if (!regexNumber.test(form.weight)) {
    errors.weight = "Pokemon weight, solo puede contener numeros Enteros";
  } else if (parseInt(form.weight) === 0 || parseInt(form.weight) > 200) {
    errors.weight =
      "Pokemon weight, solo puede contener numeros Enteros entre 1 y 200";
  }

  // image
  if (!form.image.trim()) {
    errors.image = "El campo URL image, es requerido";
  } else if (!regexURL.test(form.image)) {
    errors.image = "URL image, solo puede contener una estructura URL valida";
  } // agregar que el url no se muy grande

  // type
  if (form.type !== "") {
    errors.type = "Enter para agregar";
  }
  if (!form.type.trim() && form.types.length === 0) {
    errors.type = "Es necesario por lo menos un tipo";
  } else if (!regexText.test(form.type) && form.type !== "") {
    errors.type = "Add types, solo puede contener letras";
  } else if (existingType) {
    errors.type = "No se pueden agregar dos tipos iguales";
  } else if (form.types.length > 3) {
    errors.type = "No se pueden agregar mas de 3 tipos";
    errors.types = "No se pueden agregar mas de 3 tipos";
  }
  return errors;
};

function CreatePokemon() {
  const {
    form,
    errors,
    loading,
    response,
    handleBlur,
    handleChange,
    handleSubmit,
    handleChangeTypes,
    handleKeyUp,
    typeOptions,
    selectedTypes,
  } = useForm(initialForm, validationsForm);

  return (
    <div className="container">
      <div className="navBar-create">
        <NavBar />
      </div>

      <div className="form-container">
        <form className="create-pokemon__form" onSubmit={handleSubmit}>
          <button
            type="submit"
            disabled
            aria-hidden="true"
            style={{ display: "none" }}
          ></button>

          {/* Name */}
          <div>
            <label className="create-pokemon__label" htmlFor="Pokemon name">
              Pokemon name:
            </label>
            <input
              className="create-pokemon__input"
              name="name"
              id="Pokemon name"
              placeholder="Pokemon name"
              onChange={handleChange}
              onBlur={handleBlur}
              value={form.name}
              autoComplete="nope"
              required
            />
            {errors.name && (
              <p className="create-pokemon__error">{errors.name}</p>
            )}
          </div>

          {/* Life */}
          <div>
            <label className="create-pokemon__label" htmlFor="Pokemon life">
              Pokemon life:
            </label>
            <input
              className="create-pokemon__input"
              type="number"
              name="life"
              id="Pokemon life"
              placeholder="Pokemon life"
              onChange={handleChange}
              onBlur={handleBlur}
              value={form.life}
              min="0"
              max="1000"
              step="1"
              required
            />
            {errors.life && (
              <p className="create-pokemon__error">{errors.life}</p>
            )}
          </div>

          {/* Attack */}
          <div>
            <label
              className="create-pokemon__label"
              htmlFor="pokemon attack power"
            >
              pokemon attack power:
            </label>
            <input
              className="create-pokemon__input"
              type="number"
              name="attack"
              id="pokemon attack power"
              placeholder="pokemon attack power"
              onChange={handleChange}
              onBlur={handleBlur}
              value={form.attack}
              min="0"
              max="1000"
              step="1"
              required
            />
            {errors.attack && (
              <p className="create-pokemon__error">{errors.attack}</p>
            )}
          </div>

          {/* Defense */}
          <div>
            <label
              className="create-pokemon__label"
              htmlFor="Pokemon defense level"
            >
              Pokemon defense level:
            </label>
            <input
              className="create-pokemon__input"
              type="number"
              name="defense"
              id="Pokemon defense level"
              placeholder="Pokemon defense level"
              onChange={handleChange}
              onBlur={handleBlur}
              value={form.defense}
              min="0"
              max="1000"
              step="1"
              required
            />
            {errors.defense && (
              <p className="create-pokemon__error">{errors.defense}</p>
            )}
          </div>

          {/* Speed */}
          <div>
            <label
              className="create-pokemon__label"
              htmlFor="Pokemon speed level"
            >
              Pokemon speed level:
            </label>
            <input
              className="create-pokemon__input"
              type="number"
              name="speed"
              id="Pokemon speed level"
              placeholder="Pokemon speed level"
              onChange={handleChange}
              onBlur={handleBlur}
              value={form.speed}
              min="0"
              max="1000"
              step="1"
              required
            />
            {errors.speed && (
              <p className="create-pokemon__error">{errors.speed}</p>
            )}
          </div>

          {/* height */}
          <div>
            <label className="create-pokemon__label" htmlFor="Pokemon height">
              Pokemon height:
            </label>
            <input
              className="create-pokemon__input"
              type="number"
              name="height"
              id="Pokemon height"
              placeholder="Pokemon height"
              onChange={handleChange}
              onBlur={handleBlur}
              value={form.height}
              min="0"
              max="1000"
              step="1"
              required
            />
            {errors.height && (
              <p className="create-pokemon__error">{errors.height}</p>
            )}
          </div>

          {/* Weight */}
          <div>
            <label className="create-pokemon__label" htmlFor="Pokemon weight">
              Pokemon weight:
            </label>
            <input
              className="create-pokemon__input"
              type="number"
              name="weight"
              id="Pokemon weight"
              placeholder="Pokemon weight"
              onChange={handleChange}
              onBlur={handleBlur}
              value={form.weight}
              min="0"
              max="1000"
              step="1"
              required
            />
            {errors.weight && (
              <p className="create-pokemon__error">{errors.weight}</p>
            )}
          </div>

          {/* Image */}
          <div>
            <label className="create-pokemon__label" htmlFor="URL image">
              URL image:
            </label>
            <input
              className="create-pokemon__input"
              type="url"
              name="image"
              id="URL image"
              placeholder="URL image"
              onChange={handleChange}
              onBlur={handleBlur}
              value={form.image}
              autoComplete="nope"
              required
            />
            {errors.image && (
              <p className="create-pokemon__error">{errors.image}</p>
            )}
          </div>

          {/* Select Types */}
          <div>
            <label className="create-pokemon__label" htmlFor="Select Type">
              Select Types
            </label>

            <select
              onChange={handleChangeTypes}
              name="types"
              id="Select Type"
              className="create-pokemon__select"
            >
              <option className="create-pokemon__option" value="select">
                Select Type:
              </option>
              {typeOptions()}
            </select>
          </div>

          {/* Add Types */}
          <div>
            <label className="create-pokemon__label" htmlFor="Add Type">
              Add Types:
            </label>
            <input
              className="create-pokemon__input"
              name="type"
              id="Add Type"
              placeholder="Add Type"
              onChange={handleChange}
              onKeyUp={handleKeyUp}
              value={form.type}
            />
          </div>

          <div className="create-pokemon__block">
            <div className="create-pokemon-selected-container">
              {form.types ? selectedTypes() : null}
            </div>
            {errors.type && (
              <p className="create-pokemon__error">{errors.type}</p>
            )}
          </div>

          <div className="create-pokemon__block">
            <input
              className="create-pokemon__button"
              type="submit"
              value="CREAR POKEMON"
            ></input>
          </div>
        </form>
      </div>

      {/* {img && <img id="img" src={form.image} alt="User-provided image" />} */}
    </div>
  );
}

export default CreatePokemon;
