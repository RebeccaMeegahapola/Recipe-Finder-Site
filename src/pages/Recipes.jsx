import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from '../components/NavBar';
import backgroundImage from '../images/home-banner2.jpg'


function Recipes() {

    const [mainIngredient, setMainIngredient] = useState('');
    const [recipes, setRecipes] = useState([]);
    const [selectedMeal, setSelectedMeal] = useState(null);
    const [error, setError] = useState('');
    const [favorites, setFavorites] = useState([]);


    const DisplayRecipeDetails = async (idMeal) => {
        try {
            const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`);
            if (response.data.meals) {
                setSelectedMeal(response.data.meals[0]);
                setError('');
            } else {
                setSelectedMeal(null);
                setError('Recipe details not found!');
            }
        } catch (error) {
            console.error("Error fetching recipe details", error);
            setError('Error fetching recipe details');
        }
    };

    const searchFoodByIngredient = async () => {
        try {
            const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${mainIngredient}`);
            if (response.data.meals) {
                setRecipes(response.data.meals);
                console.log(response.data.meals)
                setError('');
            } else {
                setRecipes([]);
                setError('Food Not Found!');
            }
        } catch (error) {
            console.error("Error fetching recipes", error);
            setError('Error fetching recipes');
        }
    };

    useEffect(() => {
        const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        setFavorites(savedFavorites);
    }, []);
    
    const isFavorite = (idMeal) => favorites.some(recipe => recipe.idMeal === idMeal);

    const handleFavoriteClick = (recipe) => {
        let updatedFavorites;
    
        if (isFavorite(recipe.idMeal)) {
            // Remove the recipe from favorites
            updatedFavorites = favorites.filter(fav => fav.idMeal !== recipe.idMeal);
        } else {
            // Add the recipe to favorites
            updatedFavorites = [...favorites, recipe];
        }   
        // Update the state with the new favorites list
        setFavorites(updatedFavorites);   
        // Persist the updated favorites list in local storage
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));

        console.log(updatedFavorites)
    };
    


    return (
        <div>
            <NavBar />

            <div className="relative w-full h-[375px]">
                <div className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${backgroundImage})` }}>
                </div>
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <h2 className="text-4xl text-center mb-10 text-white">Search Recipes by Ingredient</h2>
                    <div className="max-w-md w-96 mt-10">
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                </svg>
                            </div>
                            <input
                                type="text"
                                value={mainIngredient}
                                onChange={(e) => setMainIngredient(e.target.value)}
                                placeholder="Enter main ingredient"
                                id="default-search"
                                className="block w-full p-4 pl-10 text-sm border border-gray-300 rounded-lg bg-gray-50 focus:border-[#008000] dark:text-white"
                            />
                            <button
                                onClick={searchFoodByIngredient}
                                className="text-white absolute right-2.5 bottom-2.5 bg-[#008000] hover:bg-green-400 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2">
                            Search
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto p-5">
                
                {error && <p className="text-center text-red-500">{error}</p>}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                    {recipes.map(recipe => (
                        <div key={recipe.idMeal} className="bg-white rounded-lg shadow-lg overflow-hidden" onClick={() => DisplayRecipeDetails(recipe.idMeal)}>
                            <img src={recipe.strMealThumb} alt={recipe.strMeal} className="w-full h-48 object-cover" />

                            <div className="flex justify-between items-center p-4">
                                <h3 className="text-xl font-bold mb-2 text-[#008000]">{recipe.strMeal}</h3>
                                <button className="text-[#008000] text-2xl focus:outline-none" onClick={() => handleFavoriteClick(recipe)}>
                                    <i className={isFavorite(recipe.idMeal) ? "fas fa-heart" : "far fa-heart"}></i>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {selectedMeal && (
                    <div className="p-20 bg-green-200 mt-10">
                        <div className="bg-white rounded-lg shadow-2xl md:flex">

                            <img src={selectedMeal.strMealThumb} alt={selectedMeal.strMeal} style={{ width: '450px', height: 'auto' }} className="p-3" />
                            
                            <div className="p-6">
                                <h2 className="mb-2 font-bold text:xl md:text-2xl text-[#008000]">{selectedMeal.strMeal}</h2>
                                <p className="text-[#008000] text-lg mb-2 mt-5">Ingredients:</p>
                                <ul>
                                    {Object.keys(selectedMeal)
                                        .filter(key => key.startsWith('strIngredient') && selectedMeal[key])
                                        .map((key, index) => (
                                            <li key={index}>
                                                {selectedMeal[key]} - {selectedMeal[`strMeasure${key.replace('strIngredient', '')}`]}
                                            </li>
                                        ))}
                                </ul>
                                <p className="text-[#008000] text-lg mt-5 mb-2">Instructions:</p>
                                <p className="mb-2">{selectedMeal.strInstructions}</p>
                                <p className='border-t border-gray-200'></p>
                                <a href={selectedMeal.strYoutube} className="text-[#008000] text-lg mt-4">Youtube</a>
                            </div>
                        </div>
                    </div>
                )}
        </div>
    );
}

export default Recipes;
