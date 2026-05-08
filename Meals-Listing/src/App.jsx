import { useState } from 'react'


import { useEffect } from 'react';

function App() {
  const [meals, setMeals] = useState([]);
  const [loading , setLoading] = useState(false)

  async function fetchMeals(params) {
    try{
      setLoading(true)
      const response= await fetch("https://api.freeapi.app/api/v1/public/meals");
      const data = await response.json();
      console.log(data)
      setMeals(data.data.data)

    }catch(error){
      console.log("Error fetching meal",error);
    }finally{
      setLoading(false)
    }
  }
  useEffect(()=>{
    fetchMeals()
  },[]);

  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#f5f5f5",
        minHeight: "100vh",
      }}
    >
      <h1 style={{ textAlign: "center" }}>
        Meals Listing
      </h1>

      {loading ? (
        <h2>Loading...</h2>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "20px",
          }}
        >
          {meals.map((meal) => (
            <div
              key={meal.idMeal}
              style={{
                backgroundColor: "white",
                borderRadius: "20px",
                overflow: "hidden",
                boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
              }}
            >
              <img
                src={meal.strMealThumb}
                alt={meal.strMeal}
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "cover",
                }}
              />

              <div style={{ padding: "15px" }}>
                <h2>{meal.strMeal}</h2>

                <p>
                  Category: {meal.strCategory}
                </p>

                <p>
                  Area: {meal.strArea}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


export default App
