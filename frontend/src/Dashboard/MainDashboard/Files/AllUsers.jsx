import React, { useEffect, useState } from "react";
import { FaClipboardUser } from "react-icons/fa6";
import { useSelector } from "react-redux";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const token = useSelector((state) => state.auth.token); // ✅ Get token from Redux

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/route/allUsers`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // ✅ Send token in header
          },
        });

        if (response.ok) {
          const data = await response.json();
          const filteredUsers = data.users.filter(user => user.role === "user"); // ✅ Show users only
          setUsers(filteredUsers);
        } else {
          throw new Error("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  const handleRoleChange = async (userId, newRole) => {
    const confirmMessage =
      newRole === "admin"
        ? "Are you sure you want to make this user an admin?"
        : "Are you sure you want to make this admin a user?";

    const isConfirmed = window.confirm(confirmMessage);

    if (isConfirmed) {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/route/updateUserRole`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, // ✅ Include token
            },
            body: JSON.stringify({ userId, newRole }),
          }
        );

        if (response.ok) {
          const updatedUsers = users.filter((user) => user._id !== userId);
          setUsers(updatedUsers);
        } else {
          throw new Error("Failed to update user role");
        }
      } catch (error) {
        console.error("Error updating user role:", error);
        setError(error.message);
      }
    }
  };

  return (
    <div className="ml-24 sm:ml-56 h-dvh">
      <div className="bg-blue-100 mt-8 p-4 font-[Chivo]">
        <div className="font-bold text-lg flex gap-1 items-center">
          <FaClipboardUser size={20} />
          <h1>All Users Data</h1>
        </div>

        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}

        <table className="w-full mt-4">
          <thead>
            <tr className="bg-gray-200 text-center font-bold">
              <th className="p-2">NAME</th>
              <th className="p-2">EMAIL</th>
              <th className="p-2">ROLE</th>
              <th className="p-2">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="bg-white text-center">
                <td className="p-2">{`${user.firstName} ${user.lastName}`}</td>
                <td className="p-2">{user.email}</td>
                <td className="p-2">
                  <button
                    className={`w-24 p-2 rounded cursor-default ${
                      user.role === "admin"
                        ? "border-green-500 border"
                        : "border-blue-500 border"
                    } text-black`}
                  >
                    {user.role}
                  </button>
                </td>
                <td className="p-2">
                  <button
                    onClick={() =>
                      handleRoleChange(
                        user._id,
                        user.role === "admin" ? "user" : "admin"
                      )
                    }
                    className="bg-yellow-500 hover:bg-yellow-700 duration-700 text-white p-2 rounded"
                  >
                    Make {user.role === "admin" ? "user" : "admin"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
