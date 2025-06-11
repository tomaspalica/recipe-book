import { useEffect, useState } from "react";
import { fetchRecipes } from "../apiFetch/Api";
import { useSearchParams, useParams } from "react-router-dom";
import { RecipeList } from "./RecipeList";
import { Pagination } from "./Pagination";
export const SearchForm = () => {
  const [recipeList, setRecipeList] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [result, setResult] = useState([]);
  const query = searchParams.get("query");
  const currentPage = searchParams.get("page");
  const fetchData = async () => {
    try {
      const response = await fetchRecipes(query, (currentPage - 1) * 10);
      setResult(response.data);
      setRecipeList(response.data.results);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (query === "" || query === null) {
      setRecipeList([]);
      return;
    }
    fetchData();
  }, [searchParams, query, currentPage]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      query === e.target[0].placeholder &&
      e.target.search.value.length === 0
    ) {
      setSearchParams({ query: query, page: currentPage });
      console.log(searchParams);
    } else {
      const value = e.target.search.value;
      setSearchParams({ query: value, page: 1 });
      console.log(searchParams);
    }
  };
  const onPageChange = (page) => {
    setSearchParams({ query: query, page: page });
    window.scrollTo({ top: 0, left: 0 });
  };

  return (
    <>
      <form className="search-form" onSubmit={handleSubmit}>
        <input
          className="search-input"
          type="text"
          name="search"
          placeholder={query}
        />
        <button className="search-button">search</button>
      </form>
      <RecipeList
        recipeList={recipeList}
        onPageChange={onPageChange}
        currentPage={currentPage}
        data={result}
      ></RecipeList>
    </>
  );
};
