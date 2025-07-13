import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function Welcome() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedin);
  const token = useSelector((state) => state.auth.token); // ✅ Get token from Redux

  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();

  const sendRequest = async () => {
    setLoading(true); // Set loading to true when sending request
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/route/user`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // ✅ Send token here
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
      } else {
        throw new Error("User not found");
      }
    } catch (err) {
      console.log("Error fetching user:", err);
    } finally {
      setLoading(false); // Set loading to false when request completes
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      sendRequest();
    }
  }, [isLoggedIn]);

  const [name, setName] = useState("");
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (user) {
      setName(`Welcome ${user.firstName} ${user.lastName}`);
    }
  }, [user]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsVisible((prevVisible) => !prevVisible);
    }, 2000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="font-[Chivo] px-10 py-28 h-dvh bg-blue-100">
      <div className="text-blue-400 flex items-center justify-center">
        <h1
          id="welcome"
          className={`sm:text-5xl text-3xl text-center welcome-animation ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
          style={{ transition: "opacity 1s ease-in-out" }}
        >
          {loading ? "Loading..." : name}
        </h1>
      </div>
    </div>
  );
}

export default Welcome;
