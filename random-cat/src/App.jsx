import { useState ,useEffect} from 'react'
import './App.css'

function App() {
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false)

async function fetchCat() {
  try{
  setLoading(true);
  const response = await fetch("https://api.freeapi.app/api/v1/public/cats/cat/random");
  const data= await response.json();
  console.log(data)
  setImage(data.data.image)

  } catch (error){
    console.log("Error fetching cat image",error);

  }finally{
    setLoading(false)
  }
}
useEffect(()=>{
  fetchCat();
},[])


  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "20px",
        backgroundColor: "#f5f5f5",
      }}
    >
      <h1>Random Cat Viewer</h1>

      {loading ? (
        <h2>Loading...</h2>
      ) : (
        <img
          src={image}
          alt="Random Cat"
          style={{
            width: "350px",
            height: "350px",
            objectFit: "cover",
            borderRadius: "20px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
          }}
        />
      )}

      <button
        onClick={fetchCat}
        style={{
          padding: "12px 20px",
          fontSize: "16px",
          border: "none",
          borderRadius: "10px",
          cursor: "pointer",
          backgroundColor: "black",
          color: "white",
        }}
      >
        Load New Cat
      </button>
    </div>
  );
}

export default App
