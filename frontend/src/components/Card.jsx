import { useState, useRef } from "react";
import PropTypes from "prop-types";

function Card({ element }) {
  const [putForm, setPutForm] = useState({ ...element });

  const formRef = useRef("");

  const handlePutFormChange = (event) => {
    const { name, value } = event.target;
    setPutForm((rest) => ({ ...rest, [name]: value }));
  };

  const handlePutData = async (event) => {
    try {
      event.preventDefault();
      if (putForm.name && putForm.price) {
        await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/cakes/${formRef.current.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(putForm),
          }
        );
      } else alert("Name and price fields are required"); // eslint-disable-line no-alert
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteData = async (event) => {
    try {
      event.preventDefault();
      await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/cakes/${formRef.current.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div ref={formRef} id={element.id}>
      <h1>{element.name}</h1>
      <p>{element.price} €</p>
      <form method="put" onSubmit={handlePutData}>
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={putForm.name}
          onChange={handlePutFormChange}
        />
        <input
          type="number"
          placeholder="Price"
          min={0}
          name="price"
          value={putForm.price}
          onChange={handlePutFormChange}
        />
        <input
          type="text"
          placeholder="Origin"
          name="origin"
          value={putForm.origin}
          onChange={handlePutFormChange}
        />
        <input
          type="text"
          placeholder="Main Ingredient"
          name="main_ingredient"
          value={putForm.main_ingredient}
          onChange={handlePutFormChange}
        />
        <input
          type="number"
          placeholder="Gluten"
          min={0}
          max={1}
          name="has_gluten"
          value={putForm.has_gluten}
          onChange={handlePutFormChange}
        />
        <input
          type="number"
          placeholder="Dairy"
          min={0}
          max={1}
          name="has_dairy"
          value={putForm.has_dairy}
          onChange={handlePutFormChange}
        />
        <input
          type="number"
          placeholder="Peanuts"
          min={0}
          max={1}
          name="has_peanuts"
          value={putForm.has_peanuts}
          onChange={handlePutFormChange}
        />
        <textarea
          placeholder="Description"
          name="description"
          value={putForm.description}
          onChange={handlePutFormChange}
        />
        <button type="submit">Submit</button>
      </form>
      <button type="button" onClick={handleDeleteData}>
        Delete
      </button>
    </div>
  );
}

Card.propTypes = {
  element: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    origin: PropTypes.string,
    main_ingredient: PropTypes.string,
    has_gluten: PropTypes.number,
    has_dairy: PropTypes.number,
    has_peanuts: PropTypes.number,
    description: PropTypes.string,
  }).isRequired,
};

export default Card;
