import { useEffect, useState } from "react";
import { getApiCategories, getCategoryStorageLength, subCategory, subCatSelected } from "../../store/categories";
import { getLanguage } from "../../store/language";
import Card from "../UI/Card/Card";
import CardHolder from "../UI/Card/CardHolder";
import Language from "../UI/Language/Language";
import BottomDrop from '../UI/BottomDrop/BottomDrop';
import { useHistory } from "react-router";
import { getDeviceInfo } from "../../store/deviceinfo";
import { useLocation } from 'react-router-dom'

interface Category {
  key: number;
  id: number;
  tomtom_id: number;
  nl_nl: string;
  en_gb: string;
  image_url: string;
}

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [language, setLanguage] = useState("");
  const [tempL, setTempL] = useState(0);
  const history = useHistory();
  const location = useLocation();

  const fetchCatHandler = async () => {
    try {
      let apiCall;
      if(subCategory){
        const listCategories = await getApiCategories();
        apiCall = "https://api.keeskemper.nl/key/search/subcategories/"+listCategories;
      } else {
         apiCall = "https://api.keeskemper.nl/key/search/categories/";
      }
      const response = await fetch(apiCall); // API call -> wait for response

      if (!response.ok) {
        throw new Error("Something went wrong here");
      }

      const data = await response.json(); // return JSON Data -> wait for data

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
      const tempLanguage = await getLanguage();
      setLanguage(tempLanguage);
      setCategories(transformedCategories);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  };

  const clickHandler = async () => {
    const { length } = await getCategoryStorageLength();
    setTempL(length);
    fetchCatHandler();
  };

  const prevBtnClickHandler = () => {
    fetchCatHandler();
  }

  const nextBtnClickHandler = async () => {
    if(subCatSelected){
      const deviceid = await getDeviceInfo();
      const categories = await getApiCategories();
      const apiCall = "https://api.keeskemper.nl/key/create/user/"+deviceid+"/categories/"+categories;
      const response = await fetch(apiCall); // API call -> wait for response

      if (!response.ok) {
        throw new Error("Something went wrong here");
      }

      history.push("/TTMap");
    } else {
      fetchCatHandler();
    }
  }

  const bottomDropClickHandler = () => {
    fetchCatHandler();
  }

  let content = <p>Found no categories.</p>;
  if (categories.length > 0) {
    content = (
      <CardHolder>
        {categories.map((data: Category) => (
          <Card key={data.id} tomtom_id={data.tomtom_id} onClick={clickHandler}>
            <div className="frame">
              <img src={data.image_url} alt="this is the shizzle" />
            </div>
            <h1>{data[language]}</h1>
          </Card>
        ))}
      </CardHolder>
    );
  }
  if (error) {
    content = <p>{error}</p>;
  }
  if (isLoading) {
    content = <p>Loading...</p>;
  }

  useEffect(() => {
    fetchCatHandler();
  }, []);

  return (
    <div className="categories">
      <section className="categories-header">
        <img src="images/logo_tomtom.png" alt="logo employer" />
        <Language onClick={bottomDropClickHandler}/>
        {tempL > 0 && location.pathname != "/TTMap" && <BottomDrop selected={tempL} onNextClick={nextBtnClickHandler} onPrevClick={prevBtnClickHandler}/>}
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
