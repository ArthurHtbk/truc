import { useState, useEffect } from "react";
import Card from "./components/Card";
import "./App.css";

function App() {
  const [data, setData] = useState();
  const [postForm, setPostForm] = useState({ name: "", price: 0 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/cakes`
        );
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handlePostFormChange = (event) => {
    const { name, value } = event.target;
    setPostForm((rest) => ({ ...rest, [name]: value }));
  };

  const handlePostData = async (event) => {
    try {
      event.preventDefault();
      if (postForm.name && postForm.price) {
        await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/cakes`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(postForm),
        });
      } else alert("Name and price fields are required"); // eslint-disable-line no-alert
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {data && (
        <div className="App">
          {data.map((element) => {
            return <Card key={element.id} element={element} />;
          })}
        </div>
      )}
      <form method="post" onSubmit={handlePostData}>
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={postForm.name}
          onChange={handlePostFormChange}
        />
        <input
          type="number"
          placeholder="Price"
          min={0}
          name="price"
          value={postForm.price}
          onChange={handlePostFormChange}
        />
        <input
          type="text"
          placeholder="Origin"
          name="origin"
          value={postForm.origin}
          onChange={handlePostFormChange}
        />
        <input
          type="text"
          placeholder="Main Ingredient"
          name="main_ingredient"
          value={postForm.main_ingredient}
          onChange={handlePostFormChange}
        />
        <input
          type="number"
          placeholder="Gluten"
          min={0}
          max={1}
          name="has_gluten"
          value={postForm.has_gluten}
          onChange={handlePostFormChange}
        />
        <input
          type="number"
          placeholder="Dairy"
          min={0}
          max={1}
          name="has_dairy"
          value={postForm.has_dairy}
          onChange={handlePostFormChange}
        />
        <input
          type="number"
          placeholder="Peanuts"
          min={0}
          max={1}
          name="has_peanuts"
          value={postForm.has_peanuts}
          onChange={handlePostFormChange}
        />
        <textarea
          placeholder="Description"
          name="description"
          value={postForm.description}
          onChange={handlePostFormChange}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
