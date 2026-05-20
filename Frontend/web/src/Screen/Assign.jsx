// import React, { useState, useEffect } from "react";
// import api from "../services/api.js";
// import { FaHandPointLeft } from "react-icons/fa";

// const Assign = () => {
//   const [assignList, setAssignList] = useState([]);
//   const [preview, setPreview] = useState(null);
//   const [showForm, setShowForm] = useState(false);
//   const [updateId, setUpdateId] = useState(null);

//   const [form, setForm] = useState({
//     name: "",
//     desc: "",
//     price: "",
//     image: null,
//   });

//   // HANDLE INPUT
//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     if (files && files[0]) {
//       setForm({ ...form, image: files[0] });
//       setPreview(URL.createObjectURL(files[0]));
//     } else {
//       setForm({ ...form, [name]: value });
//     }
//   };

//   // FETCH DATA
//   const bookData = async () => {
//     try {
//       const res = await api.get("/AllAssign");
//       setAssignList(res.data.assignList || []);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   useEffect(() => {
//     bookData();
//   }, []);

//   // SUBMIT (CREATE OR UPDATE)
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const data = new FormData();
//     data.append("name", form.name);
//     data.append("desc", form.desc);
//     data.append("price", form.price);

//     if (form.image) {
//       data.append("image", form.image);
//     }

//     try {
//       if (updateId) {
//         await api.put(`/Assign/update/${updateId}`, data);
//       } else {
//         await api.post("/Assign/create", data);
//       }
//       bookData();
//       handleCancel();
//     } catch (error) {
//       console.error("Submit error:", error);
//     }
//   };

//   const handleEdit = (item) => {
//     setForm({
//       name: item.name,
//       desc: item.desc,
//       price: item.price,
//       image: null,
//     });
//     setPreview(item.image);
//     setUpdateId(item._id);
//     setShowForm(true);
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure?")) {
//       try {
//         await api.delete(`/Assign/delete/${id}`);
//         bookData();
//       } catch (error) {
//         console.error("Delete error:", error);
//       }
//     }
//   };

//   const handleCancel = () => {
//     setShowForm(false);
//     setUpdateId(null);
//     setPreview(null);
//     setForm({ name: "", desc: "", price: "", image: null });
//   };

//   return (
//     <div className="w-full bg-black h-140 p-6 overflow-y-auto text-white">
    
//       <h1 className="text-3xl font-bold bg-[#272727] flex items-center mb-6 px-4 py-4 rounded-xl border border-gray-800">
//         <FaHandPointLeft className="mr-2 text-blue-500" />
//         Management Panel
//       </h1>

//       {/* ADD BUTTON */}
//       <button
//         onClick={() => setShowForm(true)}
//         className="fixed bottom-8 right-8 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-full font-bold shadow-lg z-40 transition-all"
//       >
//         + Add New Entry
//       </button>

//       {/* FORM OVERLAY */}
//       {showForm && (
//         <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 p-4">
//           <form
//             onSubmit={handleSubmit}
//             className="space-y-4 w-full max-w-md bg-gray-900 rounded-2xl p-6 border border-gray-700 shadow-2xl"
//           >
//             <h2 className="text-xl font-bold">{updateId ? "Edit" : "Add"} Item</h2>
            
//             {preview && (
//               <img src={preview} alt="preview" className="w-24 h-24 rounded-full mx-auto object-cover border-2 border-blue-500" />
//             )}

//             <input
//               type="text"
//               name="name"
//               placeholder="Name"
//               value={form.name}
//               onChange={handleChange}
//               className="w-full h-12 px-4 rounded-lg bg-gray-800 border border-gray-700 outline-none focus:border-blue-500"
//               required
//             />

//             <textarea
//               name="desc"
//               placeholder="Description"
//               value={form.desc}
//               onChange={handleChange}
//               className="w-full p-4 rounded-lg bg-gray-800 border border-gray-700 outline-none focus:border-blue-500"
//               required
//             />

//             <input
//               type="number"
//               name="price"
//               placeholder="Price"
//               value={form.price}
//               onChange={handleChange}
//               className="w-full h-12 px-4 rounded-lg bg-gray-800 border border-gray-700 outline-none focus:border-blue-500"
//               required
//             />

//             <input type="file" onChange={handleChange} className="w-full text-sm text-gray-400" />

//             <div className="flex gap-3 pt-2">
//               <button type="submit" className="flex-1 bg-blue-600 py-2 rounded-lg font-bold">
//                 {updateId ? "Update" : "Submit"}
//               </button>
//               <button type="button" onClick={handleCancel} className="flex-1 bg-gray-700 py-2 rounded-lg">
//                 Cancel
//               </button>
//             </div>
//           </form>
//         </div>
//       )}

//       {/* TABLE */}
//       <div className="overflow-x-auto rounded-xl border border-gray-800">
//         <table className="w-full text-left bg-[#1a1a1a]">
//           <thead className="bg-[#272727] text-gray-400 uppercase text-xs">
//             <tr>
//               <th className="p-4">Preview</th>
//               <th className="p-4">Name</th>
//               <th className="p-4">Description</th>
//               <th className="p-4">Price</th>
//               <th className="p-4 text-center">Actions</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-800">
//             {assignList.length > 0 ? (
//               assignList.map((item) => (
//                 <tr key={item._id} className="hover:bg-gray-800/40 transition-colors">
//                   <td className="p-4">
//                     <img src={item.image?.[0]} className="w-12 h-12 rounded-lg object-cover bg-gray-700" alt="" />
//                   </td>
//                   <td className="p-4 font-medium">{item.name}</td>
//                   <td className="p-4 text-gray-400 text-sm max-w-xs truncate">{item.desc}</td>
//                   <td className="p-4 text-blue-400 font-bold">{item.price}</td>
//                   <td className="p-4 text-center">
//                     <button onClick={() => handleEdit(item)} className="text-blue-400 mr-4 hover:underline">Edit</button>
//                     <button onClick={() => handleDelete(item._id)} className="text-red-500 hover:underline">Delete</button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="5" className="p-10 text-center text-gray-600">No data found.</td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Assign;



import React, { useState, useEffect } from "react";
import api from "../services/api.js";
import { FaHandPointLeft } from "react-icons/fa";

const Assign = () => {
  const [assignList, setAssignList] = useState([]);
  const [preview, setPreview] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [updateId, setUpdateId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    desc: "",
    price: "",
    image: null,
  });

  /* =====================
     HANDLE INPUT
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
  const bookData = async () => {
    const res = await api.get("/AllAssign");
    setAssignList(res.data.assignList || []);
  };

  useEffect(() => {
    bookData();
  }, []);

  /* =====================
     SUBMIT
  ===================== */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", form.name);
    data.append("desc", form.desc);
    data.append("price", form.price);

    if (form.image) data.append("image", form.image);

    if (updateId) {
      await api.put(`/Assign/update/${updateId}`, data);
    } else {
      await api.post("/Assign/create", data);
    }

    bookData();
    handleCancel();
  };

  /* =====================
     EDIT
  ===================== */
  const handleEdit = (item) => {
    setForm({
      name: item.name,
      desc: item.desc,
      price: item.price,
      image: null,
    });

    setPreview(item.image?.[0]);
    setUpdateId(item._id);
    setShowForm(true);
  };

  /* =====================
     DELETE
  ===================== */
  const handleDelete = async (id) => {
    await api.delete(`/Assign/delete/${id}`);
    bookData();
  };

  /* =====================
     CANCEL
  ===================== */
  const handleCancel = () => {
    setShowForm(false);
    setUpdateId(null);
    setPreview(null);
    setForm({ name: "", desc: "", price: "", image: null });
  };

  return (
    <div className="w-full bg-black max-h-screen p-3 sm:p-6 text-white overflow-auto">

      {/* HEADER */}
      <h1 className="text-xl sm:text-3xl font-bold bg-[#272727] flex items-center mb-4 sm:mb-6 px-3 sm:px-4 py-3 sm:py-4 rounded-xl border border-gray-800 ">
        <FaHandPointLeft className="mr-2 text-blue-500" />
        Management Panel
      </h1>

      {/* ADD BUTTON */}
      <button
        onClick={() => setShowForm(true)}
        className="fixed bottom-5 right-5 sm:bottom-8 sm:right-8 bg-blue-600 hover:bg-blue-700 px-4 sm:px-6 py-2 sm:py-3 rounded-full font-bold shadow-lg z-40"
      >
        + Add New
      </button>

      {/* FORM */}
      {showForm && (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50 p-3 sm:p-4">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-sm sm:max-w-md bg-gray-900 p-4 sm:p-6 rounded-2xl space-y-3 sm:space-y-4"
          >
            <h2 className="text-lg sm:text-xl font-bold">
              {updateId ? "Edit" : "Add"} Item
            </h2>

            {preview && (
              <img
                src={preview}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full mx-auto object-cover"
              />
            )}

            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Name"
              className="w-full p-2 sm:p-3 bg-gray-800 rounded"
              required
            />

            <textarea
              name="desc"
              value={form.desc}
              onChange={handleChange}
              placeholder="Description"
              className="w-full p-2 sm:p-3 bg-gray-800 rounded"
              required
            />

            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              placeholder="Price"
              className="w-full p-2 sm:p-3 bg-gray-800 rounded"
              required
            />

            <input type="file" onChange={handleChange} />

            <div className="flex gap-2">
              <button className="flex-1 bg-blue-600 py-2 rounded">
                {updateId ? "Update" : "Submit"}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="flex-1 bg-gray-700 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ===================== */}
      {/* 💻 DESKTOP TABLE */}
      {/* ===================== */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full min-w-[600px] bg-[#1a1a1a]">
          <thead className="bg-[#272727] text-gray-400 text-sm">
            <tr>
              <th className="p-4">Image</th>
              <th className="p-4">Name</th>
              <th className="p-4">Desc</th>
              <th className="p-4">Price</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {assignList.map((item) => (
              <tr key={item._id} className="border-t border-gray-800">
                <td className="p-4">
                  <img
                    src={item.image?.[0]}
                    className="w-12 h-12 rounded object-cover"
                  />
                </td>
                <td className="p-4">{item.name}</td>
                <td className="p-4 text-gray-400 truncate max-w-xs">
                  {item.desc}
                </td>
                <td className="p-4 text-blue-400">{item.price}</td>
                <td className="p-4">
                  <button
                    onClick={() => handleEdit(item)}
                    className="text-blue-400 mr-3"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="text-red-500"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ===================== */}
      {/* 📱 MOBILE INSTAGRAM CARDS */}
      {/* ===================== */}
      <div className="sm:hidden space-y-4 mt-4 ">
        {assignList.map((item) => (
          <div
            key={item._id}
            className="bg-[#1a1a1a] rounded-2xl overflow-hidden border border-gray-800"
          >
            <img
              src={item.image?.[0]}
              className="w-full h-48 object-cover"
            />

            <div className="p-4 space-y-2">
              <h2 className="text-lg font-bold">{item.name}</h2>

              <p className="text-gray-400 text-sm line-clamp-2">
                {item.desc}
              </p>

              <p className="text-blue-400 font-bold text-lg">
                ${item.price}
              </p>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => handleEdit(item)}
                  className="flex-1 bg-blue-600 py-2 rounded"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(item._id)}
                  className="flex-1 bg-red-600 py-2 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Assign;