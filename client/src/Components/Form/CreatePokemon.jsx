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

// agregar el boton desactivado
{/* <div>
{
    !errors.name && input.name.length > 0 &&
    !errors.summary && input.summary.length > 0 &&
    !errors.health_Score && input.health_Score.length > 0 &&
    !errors.image && input.image.length > 0 &&
    !errors.instructions && input.instructions.length > 0 &&
    !errors.diets && input.diets.length > 0
    ? <button className="botonAprobadoCreate" id="Boton_AddRecipe" type="submit">Guardar</button> : <button className="botonDesaprobadoCreate" id="Boton_AddRecipe" type="submit" disabled>Guardar</button>
}

</div> */}

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
    errors.name = "Name requerido";
  } else if (!regexText.test(form.name)) {
    errors.name = "Solo puede contener letras";
  } else if (existingName) {
    errors.name = "No puede contener nombres ya existentes";
  }

  // life
  if (!form.life.trim()) {
    errors.life = "Life es requerido";
  } else if (!regexNumber.test(form.life)) {
    errors.life = "Solo puede contener numeros Enteros";
  } else if (parseInt(form.life) === 0 || parseInt(form.life) > 200) {
    errors.life =
      "Solo puede contener numeros Enteros entre 1 y 200";
  }

  // attack
  if (!form.attack.trim()) {
    errors.attack = "Attack power es requerido";
  } else if (!regexNumber.test(form.attack)) {
    errors.attack = "Solo puede contener numeros Enteros";
  } else if (parseInt(form.attack) === 0 || parseInt(form.attack) > 200) {
    errors.attack =
      "Solo puede contener numeros Enteros entre 1 y 200";
  }

  // defense
  if (!form.defense.trim()) {
    errors.defense = "Defense level, es requerido";
  } else if (!regexNumber.test(form.defense)) {
    errors.defense =
      "Solo puede contener numeros Enteros";
  } else if (parseInt(form.defense) === 0 || parseInt(form.defense) > 200) {
    errors.defense =
      "Solo puede contener numeros Enteros entre 1 y 200";
  }

  // speed
  if (!form.speed.trim()) {
    errors.speed = "Speed level es requerido";
  } else if (!regexNumber.test(form.speed)) {
    errors.speed = "Solo puede contener numeros Enteros";
  } else if (parseInt(form.speed) === 0 || parseInt(form.speed) > 200) {
    errors.speed =
      "Solo puede contener numeros Enteros entre 1 y 200";
  }

  // height
  if (!form.height.trim()) {
    errors.height = "Height es requerido";
  } else if (!regexNumber.test(form.height)) {
    errors.height = "Solo puede contener numeros Enteros";
  } else if (parseInt(form.height) === 0 || parseInt(form.height) > 200) {
    errors.height =
      "Solo puede contener numeros Enteros entre 1 y 200";
  }

  // weight
  if (!form.weight.trim()) {
    errors.weight = "Weight es requerido";
  } else if (!regexNumber.test(form.weight)) {
    errors.weight = "Solo puede contener numeros Enteros";
  } else if (parseInt(form.weight) === 0 || parseInt(form.weight) > 200) {
    errors.weight =
      "Solo puede contener numeros Enteros entre 1 y 200";
  }

  // image
  if (!form.image.trim()) {
    errors.image = "URL image, es requerido";
  } else if (!regexURL.test(form.image)) {
    errors.image = "Solo puede contener una estructura URL valida";
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
    handleBlur,
    handleChange,
    handleSubmit,
    handleChangeTypes,
    handleKeyUp,
    typeOptions,
    selectedTypes,
  } = useForm(initialForm, validationsForm);

  return (
    <div className="container-CreatePokemon">
      <div className="navBar-create">
        <NavBar />
      </div>
      
      <div className="container-flex">
   
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

          {/*--Los tipos seleccionados en add Types y select Types--*/}
          <div>
            <div className="create-pokemon-selected-container">
              {form.types ? selectedTypes() : null}
            </div>
            {errors.type && (
              <p className="create-pokemon__error">{errors.type}</p>
            )}
          </div>
          {/*--------------------------------*/}

          {/*----------------Boton Submit----------------*/}
          <div >
            <input
              className="create-pokemon__button"
              type="submit"
              value="CREAR POKEMON"
            ></input>
          </div>
        </form>
      </div>
    </div>
    </div>
   
  );
}

export default CreatePokemon;
