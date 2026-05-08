import { useEffect, useState } from "react";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  async function fetchUser() {
    try {
      setLoading(true);

      const response = await fetch(
        "https://api.freeapi.app/api/v1/public/randomusers"
      );

      const data = await response.json();

      console.log(data);

      // Store user data
      setUser(data.data.data[0]);
    } catch (error) {
      console.log("Error fetching user", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f4f4f4",
      }}
    >
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        user && (
          <div
            style={{
              width: "350px",
              backgroundColor: "white",
              borderRadius: "20px",
              padding: "20px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
              textAlign: "center",
            }}
          >
            <img
              src={user.picture.large}
              alt="profile"
              style={{
                width: "120px",
                height: "120px",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />

            <h2>
              {user.name.first} {user.name.last}
            </h2>

            <p>Email: {user.email}</p>

            <p>Phone: {user.phone}</p>

            <p>
              Location: {user.location.city},{" "}
              {user.location.country}
            </p>

            <button
              onClick={fetchUser}
              style={{
                marginTop: "15px",
                padding: "10px 20px",
                border: "none",
                borderRadius: "10px",
                backgroundColor: "black",
                color: "white",
                cursor: "pointer",
              }}
            >
              Load New User
            </button>
          </div>
        )
      )}
    </div>
  );
}

export default App;