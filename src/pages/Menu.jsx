// src/components/Menu.js or src/pages/Menu.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from '../components/NavBar';
import backgroundImage1 from '../images/homebanner1.jpg';

function Menu() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('https://www.themealdb.com/api/json/v1/1/categories.php');
                setCategories(response.data.categories);
            } catch (error) {
                console.error("Error fetching categories", error);
            }
        };

        fetchCategories();
    }, []);

    return (
        <div>
            <NavBar />

            <div className="relative w-full h-[375px]">
                <div className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${backgroundImage1})` }}>
                </div>
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <h2 className="text-4xl text-center mb-10 text-white">Popular Categories</h2>
                </div>
            </div>

            <div className="p-20 bg-white">
                <p className='text-lg text-center text-black mb-28'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque faucibus ex leo, id vehicula purus lacinia ultrices. 
                    Integer id ultricies tortor, eu tincidunt est.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                    {categories.map(category => (
                        <div key={category.idCategory} className="bg-white rounded-lg shadow-lg overflow-hidden cards">
                            <img src={category.strCategoryThumb} alt={category.strCategory} className="w-full h-48 object-cover"/>
                            <div class="rounded-lg p-4 m-4 bg-[#78ac78] flex flex-col">
                                <div>
                                    <h3 className="text-xl font-bold mb-2 text-white">{category.strCategory}</h3>
                                    <p className="text-gray-200">{category.strCategoryDescription.substring(0, 50)}...</p>
                                </div>
                                <div class="flex items-center"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Menu;
