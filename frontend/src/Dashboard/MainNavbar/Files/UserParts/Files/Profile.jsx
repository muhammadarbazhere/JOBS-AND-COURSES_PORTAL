import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // ✅ Added framer-motion

const Profile = () => {
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    image: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/route/user`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) throw new Error("Failed to fetch user");
        const data = await res.json();
        setUser(data.user);
        setFormData({
          firstName: data.user.firstName,
          lastName: data.user.lastName,
          image: data.user.image,
        });
      } catch (err) {
        console.error(err);
      }
    };

    fetchUser();
  }, [token]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedData = new FormData();
    updatedData.append("firstName", formData.firstName);
    updatedData.append("lastName", formData.lastName);
    if (formData.image instanceof File) {
      updatedData.append("image", formData.image);
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/route/update-profile`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: updatedData,
      });
      if (!res.ok) throw new Error("Failed to update profile");

      const updatedRes = await res.json();

      setUser(updatedRes.user);
      setFormData({
        firstName: updatedRes.user.firstName,
        lastName: updatedRes.user.lastName,
        image: updatedRes.user.image,
      });

      alert("Profile updated successfully!");
      setEditMode(false);
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Failed to update profile.");
    }
  };

  if (!user)
    return (
      <motion.div
        className="p-4 text-center text-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        Loading...
      </motion.div>
    );

  const isChanged =
    formData.firstName !== user.firstName ||
    formData.lastName !== user.lastName ||
    formData.image !== user.image;

  return (
    <motion.div
      className="flex justify-center items-center min-h-screen bg-blue-100"
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <motion.div
        className="w-full max-w-lg p-8 rounded-3xl shadow-2xl bg-white"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.7 }}
      >
        <motion.h1
          className="text-3xl font-bold text-center font-[Chivo] text-transparent bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          My Profile
        </motion.h1>

        {!editMode ? (
          <motion.div
            className="text-center space-y-6"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.2 },
              },
            }}
          >
            <motion.div
              className="flex justify-center"
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
            >
              <img
                src={`${import.meta.env.VITE_API_BASE_URL}/route/${user.image}`}
                alt="Profile"
                className="w-32 h-32 rounded-full border-4 border-blue-300 shadow-lg hover:scale-105 transition-transform duration-300"
              />
            </motion.div>
            <motion.p
              className="text-xl text-gray-700"
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
            >
              <span className="font-semibold">Name:</span> {user.firstName} {user.lastName}
            </motion.p>
            <motion.button
              onClick={() => setEditMode(true)}
              className="mt-4 w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-2 rounded-lg shadow hover:bg-blue-700 transition-all duration-300"
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
            >
              Edit Profile
            </motion.button>
          </motion.div>
        ) : (
          <motion.form
            onSubmit={handleSubmit}
            className="space-y-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            <div>
              <label className="block mb-1 font-semibold text-gray-700">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter First Name"
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter Last Name"
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold text-gray-700">
                Profile Image
              </label>
              <input
                type="file"
                name="image"
                onChange={handleImageChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div className="flex gap-3">
              <button
                type="submit"
                disabled={!isChanged}
                className={`flex-1 py-2 rounded-lg shadow transition-all duration-300 ${
                  isChanged
                    ? "bg-green-600 text-white hover:bg-green-700"
                    : "bg-gray-400 text-gray-100 cursor-not-allowed"
                }`}
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => setEditMode(false)}
                className="flex-1 bg-gray-500 text-white py-2 rounded-lg shadow hover:bg-gray-600 transition-all duration-300"
              >
                Cancel
              </button>
            </div>
          </motion.form>
        )}
      </motion.div>
    </motion.div>
  );
};

export default Profile;
