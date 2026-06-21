import React, { useState, useEffect } from "react";
import api from "../services/api.js";
import { FaList } from "react-icons/fa";

const Categories = () => {
  const [categoryList, setCategoryList] = useState([]);
  const [preview, setPreview] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [updateId, setUpdateId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    desc: "",
    image: null,
  });

  /* =====================
     INPUT HANDLER
  ===================== */
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files && files[0]) {
      setForm({ ...form, image: files[0] });
      setPreview(URL.createObjectURL(files[0]));
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  /* =====================
     FETCH DATA
  ===================== */
  const getCategories = async () => {
    try {
      const res = await api.get("/AllCategories");
      const data = res.data.categories || res.data;
      setCategoryList(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  /* =====================
     SUBMIT (FIXED)
  ===================== */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", form.name);
    data.append("desc", form.desc);

    if (form.image) data.append("image", form.image);

    try {
      if (updateId) {
        await api.put(`/categories/update/${updateId}`, data);
      } else {
        await api.post("/categories/create", data);
      }

      await getCategories();
      handleCancel();
    } catch (error) {
      console.error("Submission error:", error);
      alert("Failed to save category.");
    }
  };

  /* =====================
     EDIT ACTION
  ===================== */
  const handleEdit = (item) => {
    setForm({
      name: item.name,
      desc: item.desc,
      image: null,
    });

    setPreview(item.image);
    setUpdateId(item._id);
    setShowForm(true);
  };

  /* =====================
     DELETE ACTION
  ===================== */
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this?")) {
      try {
        await api.delete(`/categories/delete/${id}`);
        await getCategories();
      } catch (error) {
        console.error("Delete error:", error);
      }
    }
  };

  /* =====================
     CANCEL / RESET
  ===================== */
  const handleCancel = () => {
    setShowForm(false);
    setUpdateId(null);
    setPreview(null);
    setForm({ name: "", desc: "", image: null });
  };

  return (
    <div className="w-full bg-black h-screen p-3 sm:p-6 text-white overflow-y-auto">
      {/* HEADER */}
      <h1 className="text-xl sm:text-3xl font-bold bg-[#272727] flex items-center mb-4 sm:mb-6 px-3 sm:px-4 py-3 sm:py-4 rounded-xl">
        <FaList className="mr-2" />
        Categories Management
      </h1>

      {/* ADD BUTTON */}
      <button
        onClick={() => setShowForm(true)}
        className="fixed bottom-5 right-5 sm:bottom-10 sm:right-10 bg-yellow-500 hover:bg-yellow-600 px-4 sm:px-6 py-2 sm:py-3 rounded-full text-black font-bold shadow-2xl z-40"
      >
        + Add Category
      </button>

      {/* FORM MODAL (FIXED) */}
      {showForm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-3">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-sm bg-black/55 rounded-2xl p-4 sm:p-6 space-y-3 border border-gray-800 shadow-2xl"
          >
            <h2 className="text-lg sm:text-xl font-bold">
              {updateId ? "Edit" : "Create"} Category
            </h2>

            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full mx-auto object-cover border-2 border-yellow-500"
              />
            )}

            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Category Name"
              className="w-full p-2 sm:p-3 bg-gray-50 text-black rounded border border-gray-700 focus:border-yellow-500 outline-none"
              required
            />

            <input
              name="desc"
              value={form.desc}
              onChange={handleChange}
              placeholder="Description"
              className="w-full p-2 sm:p-3 bg-gray-50 text-black rounded border border-gray-700 focus:border-yellow-500 outline-none"
              required
            />

            <input
              type="file"
              onChange={handleChange}
              className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-yellow-500 file:text-black hover:file:bg-yellow-600 cursor-pointer"
            />

            <div className="flex gap-2 pt-2">
              <button
                type="submit"
                className="flex-1 bg-yellow-500 py-2 rounded text-black font-bold hover:bg-yellow-600 transition-colors"
              >
                {updateId ? "Update" : "Create"}
              </button>

              <button
                type="button"
                onClick={handleCancel}
                className="flex-1 bg-gray-700 py-2 rounded text-white font-bold hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* 💻 DESKTOP VIEW */}
      <div className="hidden sm:block overflow-x-auto">
        <div className="bg-[#1a1a1a] rounded-xl overflow-hidden border border-gray-800">
          <table className="w-full text-left">
            <thead className="bg-[#272727] text-gray-400 uppercase text-xs tracking-wider">
              <tr>
                <th className="p-4">Image</th>
                <th className="p-4">Name</th>
                <th className="p-4">Description</th>
                <th className="p-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {categoryList.length > 0 ? (
                categoryList.map((item) => (
                  <tr key={item._id} className="hover:bg-gray-800/30 transition-colors">
                    <td className="p-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 rounded-lg object-cover border border-gray-700"
                      />
                    </td>
                    <td className="p-4 font-medium">{item.name}</td>
                    <td className="p-4 text-gray-400 text-sm max-w-xs truncate">{item.desc}</td>
                    <td className="p-4 text-center">
                      <button
                        onClick={() => handleEdit(item)}
                        className="text-blue-400 hover:text-blue-300 font-semibold mr-4"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="text-red-500 hover:text-red-400 font-semibold"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="p-10 text-center text-gray-500">
                    No categories found. Click "+ Add Category" to start.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 📱 MOBILE VIEW */}
      <div className="sm:hidden space-y-4 mt-4">
        {categoryList.length > 0 ? (
          categoryList.map((item) => (
            <div
              key={item._id}
              className="bg-[#1a1a1a] border border-gray-800 rounded-2xl overflow-hidden shadow-lg"
            >
              {item.image && (
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-44 object-cover border-b border-gray-800"
                />
              )}

              <div className="p-4 space-y-2">
                <h2 className="text-lg font-bold">{item.name}</h2>
                <p className="text-gray-400 text-sm line-clamp-3">{item.desc}</p>

                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="flex-1 bg-blue-600 hover:bg-blue-500 text-white py-2 rounded-lg font-semibold text-sm transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="flex-1 bg-red-600 hover:bg-red-500 text-white py-2 rounded-lg font-semibold text-sm transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="p-10 text-center text-gray-500 bg-[#1a1a1a] rounded-2xl border border-gray-800">
            No categories found. Tap "+ Add Category" to start.
          </div>
        )}
      </div>
    </div>
  );
};

export default Categories;