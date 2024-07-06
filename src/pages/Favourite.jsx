import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';

function Favourite() {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        setFavorites(savedFavorites);
        console.log(savedFavorites)
    }, []);

    const removeFavorite = (idMeal) => {
        const updatedFavorites = favorites.filter(recipe => recipe.idMeal !== idMeal);
        setFavorites(updatedFavorites);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    };

    return (
        <div>
            <NavBar />
            <div className="container mx-auto p-5">
                <h2 className="text-3xl font-bold mb-5">Favorite Recipes</h2>
                {favorites.length === 0 && <p className="text-center">No favorite recipes added.</p>}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                    {favorites.map(recipe => (
                        <div key={recipe.idMeal} className="bg-white rounded-lg shadow-lg overflow-hidden">
                            <img src={recipe.strMealThumb} alt={recipe.strMeal} className="w-full h-48 object-cover" />
                            <div className="flex justify-between items-center p-4">
                                <h3 className="text-xl font-bold mb-2 text-[#008000]">{recipe.strMeal}</h3>
                                <button 
                                    className="text-[#008000] text-2xl focus:outline-none"
                                    onClick={() => removeFavorite(recipe.idMeal)}
                                >
                                    <i className="fas fa-heart"></i>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Favourite
