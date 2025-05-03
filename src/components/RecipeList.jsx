import { Link } from "react-router-dom";
import { Pagination } from "./Pagination";
export const RecipeList = ({
  recipeList,
  data = null,
  onPageChange = null,
  currentPage = null,
}) => {
  return (
    <>
      <ul className="searchlist">
        {recipeList?.map((el) => {
          return (
            <li className="searchlist-element" key={el.id}>
              <div className="searchlist-element-wrapper">
                <Link to={`/search/${el.id}`}>
                  {el.title}
                  <img src={el.image} alt={el.title} />
                </Link>
              </div>
            </li>
          );
        })}
      </ul>
      {data !== null &&
      data.length !== 0 &&
      onPageChange !== null &&
      currentPage !== null ? (
        <Pagination
          currentPage={currentPage}
          totalCount={data?.totalResults}
          pageSize={data?.number}
          onPageChange={onPageChange}
        ></Pagination>
      ) : null}
    </>
  );
};
