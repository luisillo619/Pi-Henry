import { useState } from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { generateUUID } from "../helpers/uuidGeneratorFunction";
import { postPokemon } from "../redux/actions";
import { useDispatch } from "react-redux";
import { adaptObject } from "../helpers/adaptObjectFunction";
import { optionsType } from "../helpers/options";
import { colorTypes } from "../helpers/colorTypesFunction";

function useForm(initialForm, validateForm) {
  const dispatch = useDispatch();
  const pokemons = useSelector((state) => state.pokemons);
  const [options, setOptions] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);

  useEffect(() => {
    setErrors(validateForm(form, pokemons));
  }, [form]);

  useEffect(() => {
    setOptions(optionsType);
  }, []);

  // FUNCIONES AUXILIARES QUE RETORNAN HTML
  const typeOptions = () => {
    return options.map((e) => {
      return (
        <option className="create-pokemon__option" key={e.id} value={e.name}>
          {e.name}
        </option>
      );
    });
  };

  const selectedTypes = () => {
    return form.types.map((e) => {
      let color = colorTypes(e);
      const id = generateUUID();
      return (
        <input
        className="create-pokemon-selected"
          onClick={isTypeSelectedByClick}
          style={{background: color}}
          id={id}
          key={id}
          type="button"
          value={e}
        />
      );
    });
  };

  // MANEJADORES DE EVENTOS
  const isTypeSelectedByClick = (e) => {
    let { value, id } = e.target;

    // remove form.types
    const removeType = form.types.filter((e) => e !== value);
    setForm({
      ...form,
      types: removeType,
    });

    //add options
    setOptions([...options, { id, name: value }]);
  };

  const assistantEventHandler = (e) => {
    let { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleChange = (e) => assistantEventHandler(e);
  const handleBlur = (e) => assistantEventHandler(e);

  const handleChangeTypes = (e) => {
    let { value } = e.target;
    const typeError = Object.keys(errors).find((e) => {
      return e === "types";
    });
    if (value !== "select" && !typeError) {
      const removeType = options.filter((e) => {
        return e.name !== value;
      });
      // add form.types
      setForm({
        ...form,
        types: [...form.types, value],
      });
      // remove options
      setOptions(removeType);
    }
  };

  const handleKeyUp = (e) => {
    let { value } = e.target;
    if (e.code === "Enter") {
      if (errors.type === "Enter para agregar") {
        const removeOptions = options.filter((e) => {
          return e.name !== value.toLowerCase();
        });
        // add form.types
        setForm({
          ...form,
          types: [...form.types, form.type.toLowerCase()],
          type: "",
        });
        // remove options
        setOptions(removeOptions);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.keys(errors).length === 0) {
      alert("enviando formulario");
      setLoading(true);
      const copyForm = { ...form };
      const transformProperties = adaptObject(copyForm);
      dispatch(postPokemon(transformProperties, initialForm, setForm));
    } else return;
  };

  return {
    form,
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    handleChangeTypes,
    handleKeyUp,
    typeOptions,
    selectedTypes,
  };
}

export default useForm;
