import { Link } from "react-router-dom";
export const SearchList = ({ recipeList }) => {
  console.log(recipeList);
  return (
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
  );
};
