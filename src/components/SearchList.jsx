export const SearchList = ({ recipeList }) => {
  console.log();
  return (
    <ul>
      {recipeList?.map((el) => {
        return (
          <li key={el.id}>
            <img src={el.image} alt={el.title} />
            {el.title}
          </li>
        );
      })}
    </ul>
  );
};
