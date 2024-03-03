import { Link } from "react-router-dom";
export const SearchList = ({ recipeList }) => {
  console.log(recipeList);
  return (
    <ul>
      {recipeList?.map((el) => {
        return (
          <li key={el.id}>
            <Link to={`/search/${el.id}`}>
              <img src={el.image} alt={el.title} />
              {el.title}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
