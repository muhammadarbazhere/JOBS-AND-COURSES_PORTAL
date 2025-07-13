import React, { useEffect, useState } from "react";
import { FaClipboardUser } from "react-icons/fa6";
import { useSelector } from "react-redux";

const UserData = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (!token) {
      console.warn("No token - skipping user data API call");
      return;
    }
    fetchData();
  }, [token]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/route/allUsers`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) throw new Error(`Failed to fetch user data`);
      const data = await response.json();
      setUsers(data.users);
    } catch (error) {
      console.error("Error fetching user data:", error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    const user = users.find((u) => u._id === userId);
    const confirmationMessage = `Are you sure you want to change ${user.firstName} ${user.lastName}'s role to ${newRole}?`;
    const isConfirmed = window.confirm(confirmationMessage);

    if (!isConfirmed) return;

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

      if (!response.ok) throw new Error("Failed to update user role");
      const updatedUser = await response.json();
      setUsers((prev) =>
        prev.map((u) => (u._id === userId ? updatedUser.user : u))
      );
    } catch (error) {
      console.error("Error updating user role:", error.message);
      setError(error.message);
    }
  };

  return (
    <div className="ml-4 sm:ml-56 px-4 py-6 min-h-screen bg-gray-900 text-gray-200 font-[Chivo]">
      <div className="bg-gray-800 rounded-xl shadow-lg p-6">
        {/* Header */}
        <div className="flex items-center gap-2 mb-4">
          <FaClipboardUser size={20} className="text-yellow-400" />
          <h1 className="text-lg sm:text-2xl font-bold tracking-wide">
            All Users
          </h1>
        </div>

        {/* Loading / Error */}
        {loading && <p className="text-blue-400">Loading users...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm sm:text-base border-collapse rounded-lg">
            <thead>
              <tr className="bg-gray-700 text-gray-100">
                <th className="p-3 text-left">NAME</th>
                <th className="p-3 text-left">EMAIL</th>
                <th className="p-3 text-left">ROLE</th>
                <th className="p-3 text-left">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  key={user._id}
                  className="hover:bg-gray-700 transition duration-300 ease-in-out"
                >
                  <td className="p-3 whitespace-nowrap">
                    {`${user.firstName} ${user.lastName}`}
                  </td>
                  <td className="p-3 whitespace-nowrap">{user.email}</td>
                  <td className="p-3">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                        user.role === "admin"
                          ? "bg-green-600 text-green-100"
                          : "bg-blue-600 text-blue-100"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() =>
                        handleRoleChange(
                          user._id,
                          user.role === "admin" ? "user" : "admin"
                        )
                      }
                      className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-medium px-3 py-1 rounded-lg transition duration-300 ease-in-out"
                    >
                      Make {user.role === "admin" ? "User" : "Admin"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserData;
