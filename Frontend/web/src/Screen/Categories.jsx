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

  // HANDLE INPUT
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files && files[0]) {
      setForm({ ...form, image: files[0] });
      setPreview(URL.createObjectURL(files[0]));
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  // GET DATA
  const getCategories = async () => {
    try {
      const res = await api.get("/AllCategories");
      // Safety check: ensure we are setting an array
      const data = res.data.categories || res.data;
      setCategoryList(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  // SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", form.name);
    data.append("desc", form.desc);

    if (form.image) {
      data.append("image", form.image);
    }

    try {
      if (updateId) {
        await api.put(`/categories/update/${updateId}`, data);
      } else {
        await api.post("/categories/create", data);
      }

      // Re-fetch data from server to sync UI
      await getCategories();
      handleCancel();
    } catch (error) {
      console.error("Submission error:", error);
      alert("Failed to save category.");
    }
  };

  // EDIT
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

  // DELETE
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

  // CANCEL / RESET
  const handleCancel = () => {
    setShowForm(false);
    setUpdateId(null);
    setPreview(null);
    setForm({ name: "", desc: "", image: null });
  };

  return (
    <div className="w-full bg-black p-6 h-screen overflow-y-auto text-white">
      {/* HEADER */}
      <h1 className="text-3xl font-bold bg-[#272727] text-white flex items-center mb-6 px-4 py-4 rounded-xl">
        <FaList className="mr-2" />
        Categories Management
      </h1>

      {/* ADD BUTTON */}
      <button
        onClick={() => setShowForm(true)}
        className="fixed bottom-10 right-10 bg-yellow-500 hover:bg-yellow-600 px-6 py-3 rounded-full text-black font-bold shadow-2xl z-40"
      >
        + Add Category
      </button>

      {/* FORM OVERLAY */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
          <form
            onSubmit={handleSubmit}
            className="space-y-4 w-96 bg-gray-900 rounded-2xl p-6 shadow-2xl border border-gray-700"
          >
            <h2 className="text-xl font-bold mb-4">{updateId ? 'Edit' : 'Create'} Category</h2>
            
            {preview && (
              <img
                src={preview}
                alt="preview"
                className="w-24 h-24 border-2 border-yellow-500 rounded-full mx-auto object-cover"
              />
            )}

            <input
              type="text"
              name="name"
              placeholder="Category Name"
              value={form.name}
              onChange={handleChange}
              className="w-full h-12 px-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-yellow-500 outline-none"
              required
            />

            <input
              type="text"
              name="desc"
              placeholder="Description"
              value={form.desc}
              onChange={handleChange}
              className="w-full h-12 px-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-yellow-500 outline-none"
              required
            />

            <input
              type="file"
              name="image"
              onChange={handleChange}
              className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-yellow-500 file:text-black hover:file:bg-yellow-600"
            />

            <div className="flex gap-3 pt-4">
              <button type="submit" className="flex-1 bg-yellow-500 px-4 py-2 rounded-lg text-black font-bold">
                {updateId ? "Update" : "Create"}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="flex-1 bg-gray-700 px-4 py-2 rounded-lg text-white font-bold"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* TABLE */}
      <div className="bg-[#1a1a1a] rounded-xl overflow-hidden border border-gray-800">
        <table className="w-full text-left">
          <thead className="bg-[#272727] text-gray-400 uppercase text-sm">
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
                <tr key={item._id} className="hover:bg-gray-800/50 transition-colors">
                  <td className="p-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 rounded-lg object-cover border border-gray-700"
                    />
                  </td>
                  <td className="p-4 font-medium">{item.name}</td>
                  <td className="p-4 text-gray-400 text-sm">{item.desc}</td>
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
                  No categories found. Click "Add Category" to start.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Categories;