import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { Link } from 'react-router-dom';


export default RecipeList


function RecipeList(prop: any) {
    const [recipeList, setRecipeList] = useState([]);
    const userState = useSelector((state: RootState) => state.user); // Access the user state from the global state
  
    // creates global state variable for use as a path param 
    let userPathParam = userState.username

    useEffect(() => {
        async function fetchRecipes() {
            const response = await prop.getUserRecipes(userPathParam);
            setRecipeList(response.data); // Assuming the response is an array of recipes
        }
        fetchRecipes();
    }, [prop.getUserRecipes, userPathParam]);

    return (
        <div className="userRecipeList">
            {recipeList && recipeList.length > 0 ? (
                recipeList.map((recipe: any) => (
                    <div key={recipe.id}>
                        <Link to={`/recipes/user-recipes/:${recipe.id}`}>{recipe.title}</Link>
                        <h4>{recipe.instructions}</h4>
                    </div>
                ))
            ) : (
                <p>No recipes have been saved for ${userPathParam}</p>
            )}
        </div>
    );
}