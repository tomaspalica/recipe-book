import { IngredientForm } from "../components/IngredientForm";

export const IngridientSearch = () => {
  return (
    <main>
      <div className="search-wrapper">
        <h2>Ingridient Search</h2>
        <p>you can search for a meal by what you have in your fridge</p>
        <IngredientForm />
      </div>
    </main>
  );
};
