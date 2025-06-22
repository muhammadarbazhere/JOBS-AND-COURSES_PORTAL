import React, { useEffect, useState } from "react";
import { FaClipboardUser } from "react-icons/fa6";

const AllAdmins = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch("/route/allUsers", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          // Filter users where role is "user"
          const filteredUsers = data.users.filter(user => user.role === "admin");
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
  }, []);

  const handleRoleChange = async (userId, newRole) => {
    const confirmationMessage = newRole === "admin" 
      ? "Are you sure you want to make this user an admin?"
      : "Are you sure you want to make this admin a user?";

    const isConfirmed = window.confirm(confirmationMessage);

    if (isConfirmed) {
      try {
        const response = await fetch("/route/updateUserRole", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ userId, newRole }),
        });

        if (response.ok) {
          const data = await response.json();
          // Remove user from list if role is updated to "admin"
          setUsers(users.filter(user => user._id !== userId));
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
          <FaClipboardUser className="" size={20} />
          <h1>All Admins Data</h1>
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
                      user.role === "admin" ? "border-green-500 border" : "border-green-500 border"
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
                    className="bg-yellow-500 hover:bg-yellow-700 duration-1000 text-white p-2 rounded"
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

export default AllAdmins;
