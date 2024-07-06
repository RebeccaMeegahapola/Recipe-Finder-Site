import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from '../components/NavBar'
import '../styles/Home.css'
import backgroundImg from '../images/homebanner5.jpg'
import Footer from '../components/Footer';

function Home() {

    const [meal, setMeal] = useState('');
    const [recipe, setRecipe] = useState(null);
    const [error, setError] = useState('');
    const [categories, setCategories] = useState([]);
    const [areas, setAreas] = useState([]);
    const [selectedArea, setSelectedArea] = useState('');
  
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('https://www.themealdb.com/api/json/v1/1/categories.php');
                setCategories(response.data.categories);
                console.log(response.data.categories)
            } catch (error) {
                console.error("Error fetching categories", error);
            }
        };

        fetchCategories();
    }, []);


    const searchRecipe = async () => {
      try {
        const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${meal}`);
        console.log(meal)
        console.log(response.data);

        if (response.data.meals) {
            setRecipe(response.data.meals[0]);
            console.log(response.data.meals[0])
            setError('');
          } else {
            setRecipe(null);
            setError('Recipe details not found!');
        }
      } catch (error) {
        setError('Error fetching recipe details');
      }
    };

    return (
        <div>
            <NavBar />
            <div className="relative w-full h-[375px]">
                <div className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${backgroundImg})` }}>
                </div>
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <h1 className="font-bold tracking-tight text-gray-900 text-4xl">
                        <span className="block xl:inline text-white">It's Not Just Food, <br /></span>
                        <span className="block text-white bg-clip-text xl:inline">
                            It's an Experience
                        </span>
                    </h1>
                    <div className="max-w-md w-96 mt-10">
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                </svg>
                            </div>
                            <input
                                type="text"
                                value={meal}
                                onChange={(e) => setMeal(e.target.value)}
                                id="default-search"
                                className="block w-full p-4 pl-10 text-sm border border-gray-300 rounded-lg bg-gray-50 focus:border-[#008000] dark:text-white"
                                placeholder="Search Recipes"
                            />
                            <button
                                onClick={searchRecipe}
                                className="text-white absolute right-2.5 bottom-2.5 bg-[#008000] hover:bg-green-400 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2">
                            Search
                            </button>
                        </div>
                    </div>
                    
                </div>
            </div>

            {error && <p>{error}</p>}

            {recipe && (
            <div className="p-20 bg-gradient-to-r from-cyan-300 to-green-300">
                <div className="bg-white rounded-lg shadow-2xl md:flex">

                    <img src={recipe.strMealThumb} alt={recipe.strMeal} style={{ width: '450px', height: 'auto' }} className="p-3"/>

                    <div class="p-6">
                        <div className="flex justify-between items-center">
                            <h2 className="mb-2 font-bold text-xl md:text-2xl text-[#008000]">{recipe.strMeal}</h2>
                            <button className="text-[#008000] text-2xl focus:outline-none">
                                <i className="far fa-heart"></i>
                            </button>
                        </div>
                        <p className="text-[#008000] text-lg mb-2 mt-5">Ingredients:</p>
                        <ul>
                            {Object.keys(recipe)
                            .filter(key => key.startsWith('strIngredient') && recipe[key])
                            .map((key, index) => (
                            <li key={index}>
                                {recipe[key]} - {recipe[`strMeasure${key.replace('strIngredient', '')}`]}
                            </li>
                            ))}
                        </ul>
                        <p className="text-[#008000] text-lg mt-5 mb-2">Instructions:</p>
                        <p className='mb-2'>{recipe.strInstructions}</p>
                        <p className='border-t border-gray-200'></p>
                        <a href={recipe.strYoutube} className="text-[#008000] text-lg mt-4">Youtube</a>
                    </div>
                </div>
            </div>
            )}

            <div className="p-20 bg-white">
                <h2 className="text-3xl text-center mb-10 text-[#008000]">Popular Food Categories</h2>
                <p className='text-lg text-center text-black mb-28'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque faucibus ex leo, id vehicula purus lacinia ultrices. 
                    Integer id ultricies tortor, eu tincidunt est.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                    {categories.map(category => (
                        <div class="bg-white mx-auto max-w-sm shadow-lg rounded-lg overflow-hidden transition duration-300 group transform hover:-translate-y-2 hover:shadow-2xl cursor-pointer border-b-4 border-green-400" key={category.idCategory}>
                            <div class="sm:flex sm:items-center px-6 py-4">
                                <img class="block h-16 w-1/2 sm:h-24 rounded-full mx-auto mb-4 sm:mb-0 sm:mr-4 sm:ml-0" src={category.strCategoryThumb} alt={category.strCategory} />
                                <div class="text-center sm:text-left sm:flex-grow">
                                    <div class="mb-4">
                                        <p class="text-xl leading-tight">{category.strCategory}</p>
                                        <p class="text-sm leading-tight text-gray-400">{category.strCategoryDescription.substring(0, 50)}...</p>
                                    </div>
                                    <div></div>
                                </div>
                            </div>
                        </div>                       
                    ))}                   
                </div>               
            </div>

            <Footer />

        </div>

    )
}

export default Home