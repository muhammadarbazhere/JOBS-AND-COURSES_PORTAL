import React, { useEffect, useState } from "react";
import { FaClipboardUser } from "react-icons/fa6";
import { useSelector } from "react-redux";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/route/allUsers`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          const filteredUsers = data.users.filter(user => user.role === "user");
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
              Authorization: `Bearer ${token}`,
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
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="bg-gray-800 mt-8 p-4 font-[Chivo] rounded-lg shadow">
        <div className="font-bold text-lg flex gap-1 items-center mb-4">
          <FaClipboardUser size={20} />
          <h1>All Users Data</h1>
        </div>

        {loading && <p className="text-gray-300">Loading...</p>}
        {error && <p className="text-red-400">{error}</p>}

        {/* Responsive Table for Large Screens */}
        <div className="hidden sm:block">
          <table className="w-full mt-4 text-white">
            <thead>
              <tr className="bg-gray-700 text-center font-bold">
                <th className="p-2">NAME</th>
                <th className="p-2">EMAIL</th>
                <th className="p-2">ROLE</th>
                <th className="p-2">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="bg-gray-800 border-b border-gray-700 text-center">
                  <td className="p-2">{`${user.firstName} ${user.lastName}`}</td>
                  <td className="p-2">{user.email}</td>
                  <td className="p-2">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-sm ${
                        user.role === "admin"
                          ? "bg-green-800 text-green-200 border border-green-600"
                          : "bg-blue-800 text-blue-200 border border-blue-600"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="p-2">
                    <button
                      onClick={() =>
                        handleRoleChange(
                          user._id,
                          user.role === "admin" ? "user" : "admin"
                        )
                      }
                      className="bg-yellow-600 hover:bg-yellow-700 duration-300 text-white px-3 py-1 rounded"
                    >
                      Make {user.role === "admin" ? "user" : "admin"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile-Friendly Cards for Small Screens */}
        <div className="sm:hidden space-y-4">
          {users.map((user) => (
            <div
              key={user._id}
              className="bg-gray-800 rounded-lg shadow p-4 flex flex-col gap-2"
            >
              <div className="flex justify-between items-center">
                <h2 className="font-bold text-base">{`${user.firstName} ${user.lastName}`}</h2>
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    user.role === "admin"
                      ? "bg-green-800 text-green-200 border border-green-600"
                      : "bg-blue-800 text-blue-200 border border-blue-600"
                  }`}
                >
                  {user.role}
                </span>
              </div>
              <p className="text-sm text-gray-400">📧 {user.email}</p>
              <button
                onClick={() =>
                  handleRoleChange(
                    user._id,
                    user.role === "admin" ? "user" : "admin"
                  )
                }
                className="bg-yellow-600 hover:bg-yellow-700 duration-300 text-white px-3 py-1 rounded text-sm"
              >
                Make {user.role === "admin" ? "user" : "admin"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllUsers;
