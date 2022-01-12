import { useEffect, useState } from "react";
import {
  getApiCategories,
  getCategoryStorageLength,
  subCategory,
  subCatSelected,
} from "../../store/categories";
import { getLanguage } from "../../store/language";
import Card from "../UI/Card/Card";
import CardHolder from "../UI/Card/CardHolder";
import Language from "../UI/Language/Language";
import BottomDrop from "../UI/BottomDrop/BottomDrop";
import { useHistory } from "react-router";
import { getDeviceInfo } from "../../store/deviceinfo";
import { useLocation } from "react-router-dom";

// setting the interface of a Category
interface Category {
  key: number;
  id: number;
  tomtom_id: number;
  nl_nl: string;
  en_gb: string;
  image_url: string;
}

// this is the function for the category page
const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [language, setLanguage] = useState("");
  const [tempL, setTempL] = useState(0);
  const history = useHistory();
  const location = useLocation();

  // try to get all the categories from the database
  const fetchCatHandler = async () => {
    try {
      let apiCall;
      // check to see if we're going for categories or subcategories
      if (subCategory) {
        const listCategories = await getApiCategories();
        apiCall =
          "https://api.keeskemper.nl/key/search/subcategories/" +
          listCategories;
      } else {
        apiCall = "https://api.keeskemper.nl/key/search/categories/";
      }
      const response = await fetch(apiCall); // API call -> wait for response

      // is it a good request?
      if (!response.ok) {
        throw new Error("No data to show.");
      }

      // return JSON Data -> wait for data
      const data = await response.json();

      // set the data to match the category interface
      const transformedCategories = data.categories.map(
        (catData: Category) => ({
          key: catData.id,
          id: catData.id,
          tomtom_id: catData.tomtom_id,
          nl_nl: catData.nl_nl,
          en_gb: catData.en_gb,
          image_url: catData.image_url,
        })
      );

      // get the default language
      const tempLanguage = await getLanguage();
      setLanguage(tempLanguage);
      setCategories(transformedCategories);
    } catch (error) {
      setError("Error getting category data: " + error.message);
    }
    setIsLoading(false);
  };

  // set the number of clicked (sub)categories
  const clickHandler = async () => {
    const { length } = await getCategoryStorageLength();
    setTempL(length);
    fetchCatHandler();
  };

  // when the previous button is clicked
  const prevBtnClickHandler = () => {
    fetchCatHandler();
  };

  // when the next button is clicked
  const nextBtnClickHandler = async () => {
    // check to see if we are already in the subcategory section
    if (subCatSelected) {
      try {
        const deviceid = await getDeviceInfo();
        const categories = await getApiCategories();

        // create a new user using the API backend
        const apiCall =
          "https://api.keeskemper.nl/key/create/user/" +
          deviceid +
          "/categories/" +
          categories;
        const response = await fetch(apiCall); // API call -> wait for response

        // is it a good request?
        if (!response.ok) {
          throw new Error("Something went wrong in the API");
        }

        // new user created! -> Go to the map
        history.push("/TTMap");
      } catch (error) {
        setError("Error creating new user: " + error.message);
      }
    } else {
      fetchCatHandler();
    }
  };

  // changed the language, update the categorylist
  const bottomDropClickHandler = () => {
    fetchCatHandler();
  };

  // set the default content to show
  let content = <p>No categories to show.</p>;

  // and change the content to show when we do find categories
  if (categories.length > 0) {
    content = (
      <CardHolder>
        {categories.map((data: Category) => (
          <Card
            key={data.id}
            tomtom_id={data.tomtom_id}
            tomtom_name={data["nl_nl"]}
            onClick={clickHandler}
          >
            <div className="frame">
              <img src={data.image_url} alt="this is the shizzle" />
            </div>
            <h1>{data[language]}</h1>
          </Card>
        ))}
      </CardHolder>
    );
  }

  // set the content to the error if we experience one
  if (error) {
    content = <p>{error}</p>;
  }

  // set the content to loading while we collect the category data
  if (isLoading) {
    content = <p>Loading...</p>;
  }

  // when we first enter the page, try to get the category data
  useEffect(() => {
    fetchCatHandler();
  }, []);

  // this is the whole categories page
  return (
    <div className="categories">
      <section className="categories-header">
        <img src="images/logo_tomtom.png" alt="logo employer" />
        <Language onClick={bottomDropClickHandler} />
        {tempL > 0 && location.pathname != "/TTMap" && (
          <BottomDrop
            selected={tempL}
            onNextClick={nextBtnClickHandler}
            onPrevClick={prevBtnClickHandler}
          />
        )}
        <div>
          <div>
            <i className="fas fa-search"></i>
          </div>
          <button onClick={fetchCatHandler}>Fetch Categories</button>
        </div>
      </section>
      <section>{content}</section>
    </div>
  );
};

export default Categories;
