import React, { useState, useEffect, useCallback } from "react";

import { useSelector } from "react-redux";

import CardHolder from "../UI/Card/CardHolder";
import Card from "../UI/Card/Card";
import Language from "../UI/Language/Language";
import BottomDrop from "../UI/BottomDrop/BottomDrop";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const language = useSelector((state) => state.language.language);
  const categoriesStore = useSelector((state) => state.category.ids);
  const showSub = useSelector((state) => state.category.showSub);

  const fetchCategoryHandler = useCallback(async () => {
    setIsLoading(true);
    try {
      const apiCall = !showSub
        ? "https://api.keeskemper.nl/key/search/categories/"
        : "https://api.keeskemper.nl/key/search/subcategories/" +
          categoriesStore;
      const response = await fetch(apiCall); // API call -> wait for response

      if (!response.ok) {
        throw new Error("Something went wrong here");
      }

      const data = await response.json(); // return JSON Data -> wait for data

      const transformedCategories = data.categories.map((catData) => {
        // data returned -> set data in object
        return {
          key: catData.ID,
          ID: catData.ID,
          tomtomID: catData.tomtomID,
          nlNL: catData.nlNL,
          enGB: catData.enGB,
          image_url: catData.image_url,
        };
      });

      setCategories(transformedCategories);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, [showSub]);

  useEffect(() => {
    fetchCategoryHandler();
  }, [fetchCategoryHandler]);

  const searchHandler = () => {
    alert('search');
  };

  let content = <p>Found no categories.</p>;
  if (categories.length > 0) {
    content = (
      <CardHolder>
        {categories.map((data) => {
          return (
            <Card key={data.ID} tomtom_id={data.tomtomID}>
              <div className="frame">
                <img src={data.image_url} alt="this is the shizzle" />
              </div>
              <h1>{data[language]}</h1>
            </Card>
          );
        })}
      </CardHolder>
    );
  }
  if (error) {
    content = <p>{error}</p>;
  }
  if (isLoading) {
    content = <p>Loading...</p>;
  }

  return (
    <div className="categories">
      {categoriesStore.length > 0 && <BottomDrop />}
      <section className="categories-header">
        <img src="images/logo_tomtom.png" alt="logo employer" />
        <div>
          <div onClick={searchHandler}><i class="fas fa-search"></i></div>
          {categories.length === 0 && (
            <button onClick={fetchCategoryHandler}>Fetch Categories</button>
          )}
          {categories.length > 0 && <Language />}
        </div>
      </section>
      <section>{content}</section>
    </div>
  );
};

export default Categories;
