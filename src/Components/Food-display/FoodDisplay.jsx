import React, { useState, useEffect } from 'react';
import FoodItem from '../FoodItem/FoodItem';
import './FoodDisplay.css';
import { foodAPI } from '../../services/api';
import { food_list } from '../../assets/assets';

const FoodDisplay = ({ category }) => {
  const [foodList, setFoodList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchFoodItems();
  }, [category]);

  const fetchFoodItems = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Try to fetch food items from backend first
      try {
        const response = await foodAPI.getFoodItems();
        
        // Filter by category if specified
        const filteredFoods = category 
          ? response.filter(food => food.category === category)
          : response;
        
        setFoodList(filteredFoods);
        console.log('✅ Data loaded from backend API:', filteredFoods.length, 'items');
      } catch (apiError) {
        console.log('⚠️ Backend API not available, using local data');
        
        // Fallback to local data if API fails
        const filteredFoods = category === "All" || !category
          ? food_list
          : food_list.filter(food => food.category === category);
        
        setFoodList(filteredFoods);
        console.log('📦 Using local data:', filteredFoods.length, 'items');
      }
    } catch (err) {
      console.error('Error loading food items:', err);
      setError('Failed to load food items. Please try again later.');
    } finally {
      setLoading(false);
    }
  };



  if (loading) {
    return (
      <div className="food-display">
        <h2>Loading food items...</h2>
        {/* You can add a loading spinner here */}
      </div>
    );
  }

  if (error) {
    return (
      <div className="food-display">
        <h2>Error</h2>
        <p>{error}</p>
        <button onClick={fetchFoodItems}>Try Again</button>
      </div>
    );
  }

  return (
    <div className="food-display">
      <h2>Top dishes near you</h2>
      <div className="food-display-list">
        {foodList.map((item, index) => (
          <FoodItem 
            key={item._id || item.id || index} 
            id={item._id || item.id}
            name={item.name}
            description={item.description}
            price={item.price}
            image={item.image}
          />
        ))}
      </div>
    </div>
  );
};

export default FoodDisplay;