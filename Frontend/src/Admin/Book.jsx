// import React, { useEffect, useState } from "react";
// import api from "../services/api.js";

// export default function Students() {
//   const [preview, setPreview] = useState(null);
//   const [students, setStudents] = useState([]);
//   const [update, setUpdate] = useState(null);
//   const [showForm, setShowForm] = useState(false);

//   const [form, setForm] = useState({
//     name: "",
//     fatherName: "",
//     cnic: "",
//     phone: "",
//     address: "",
//     image: null,
//     books: [], // optional if multiple books
//   });

//   // Fetch all students
//   const StudentData = async () => {
//     try {
//       const res = await api.get("/AllStudents");
//       setStudents(res.data.students);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     StudentData();
//   }, []);

//   // Handle input change
//   const handleChange = (e) => {
//     const { name, value, files } = e.target;

//     if (files) {
//       setForm({ ...form, image: files[0] });
//       setPreview(URL.createObjectURL(files[0]));
//     } else {
//       setForm({ ...form, [name]: value });
//     }
//   };

//   // Submit form
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const data = new FormData();
//     data.append("name", form.name);
//     data.append("fatherName", form.fatherName);
//     data.append("cnic", form.cnic);
//     data.append("phone", form.phone);
//     data.append("address", form.address);
//     data.append("books", JSON.stringify(form.books)); // for multiple books

//     if (form.image) {
//       data.append("image", form.image);
//     }

//     try {
//       if (update) {
//         await api.put(`/student/update/${update}`, data);
//       } else {
//         await api.post(`/student/create`, data);
//       }
//       StudentData();
//       handleCancel();
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // Edit student
//   const handleEdit = (studentData) => {
//     setForm({
//       name: studentData.name,
//       fatherName: studentData.fatherName,
//       cnic: studentData.cnic,
//       phone: studentData.phone,
//       address: studentData.address || "",
//       image: null,
//       books: studentData.books || [],
//     });
//     setPreview(studentData.image);
//     setUpdate(studentData._id);
//     setShowForm(true);
//   };

//   // Delete student
//   const handleDelete = async (id) => {
//     try {
//       await api.delete(`/student/delete/${id}`);
//       StudentData();
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // Cancel form
//   const handleCancel = () => {
//     setShowForm(false);
//     setUpdate(null);
//     setPreview(null);
//     setForm({
//       name: "",
//       fatherName: "",
//       cnic: "",
//       phone: "",
//       address: "",
//       image: null,
//       books: [],
//     });
//   };

//   return (
//     <div className="w-full h-full bg-gray-950 p-6">
//       {/* Add student button */}
//       <button
//         onClick={() => setShowForm(true)}
//         className="fixed bottom-10 right-10 bg-blue-600 px-6 py-2 rounded text-white"
//       >
//         Add Student
//       </button>

//       {/* Form */}
//       {showForm && (
//         <form
//           onSubmit={handleSubmit}
//           className="space-y-3 w-96 bg-gray-700 rounded-2xl p-5 fixed z-50"
//         >
//           {preview && (
//             <img
//               src={preview}
//               alt="preview"
//               className="w-20 h-20 rounded-full object-cover mx-auto"
//             />
//           )}

//           <input
//             type="text"
//             name="name"
//             placeholder="Student name"
//             value={form.name}
//             onChange={handleChange}
//             className="w-full h-12 pl-3 rounded-lg bg-gray-300"
//             required
//           />

//           <input
//             type="text"
//             name="fatherName"
//             placeholder="Father name"
//             value={form.fatherName}
//             onChange={handleChange}
//             className="w-full h-12 pl-3 rounded-lg bg-gray-300"
//             required
//           />

//           <input
//             type="text"
//             name="cnic"
//             placeholder="CNIC"
//             value={form.cnic}
//             onChange={handleChange}
//             className="w-full h-12 pl-3 rounded-lg bg-gray-300"
//             required
//           />

//           <input
//             type="text"
//             name="phone"
//             placeholder="Phone Number"
//             value={form.phone}
//             onChange={handleChange}
//             className="w-full h-12 pl-3 rounded-lg bg-gray-300"
//             required
//           />

//           <input
//             type="text"
//             name="address"
//             placeholder="Address"
//             value={form.address}
//             onChange={handleChange}
//             className="w-full h-12 pl-3 rounded-lg bg-gray-300"
//           />

//           <input
//             type="file"
//             name="image"
//             onChange={handleChange}
//             className="w-full h-12 pt-2 rounded-lg bg-gray-300"
//           />

//           <div className="flex gap-2">
//             <button
//               type="submit"
//               className="flex-1 bg-blue-500 text-white py-2 rounded-lg"
//             >
//               {update ? "Update" : "Create"}
//             </button>

//             <button
//               type="button"
//               onClick={handleCancel}
//               className="flex-1 bg-red-600 rounded-lg text-white"
//             >
//               Cancel
//             </button>
//           </div>
//         </form>
//       )}

//       {/* Students Table */}
//       <div className="mt-10">
//         <table className="w-full text-white bg-gray-900 rounded-xl overflow-hidden">
//           <thead className="bg-gray-800">
//             <tr>
//               <th className="p-3 text-left">Image</th>
//               <th className="p-3 text-left">Name</th>
//               <th className="p-3 text-left">Book(s)</th>
//               <th className="p-3 text-left">CNIC</th>
//               <th className="p-3 text-left">Phone</th>
//               <th className="p-3 text-left">Address</th>
//               <th className="p-3 text-center">Actions</th>
//             </tr>
//           </thead>

//           <tbody>
//             {students?.map((eachdata) => (
//               <tr
//                 key={eachdata._id}
//                 className="border-b border-gray-700 hover:bg-gray-800 transition"
//               >
//                 <td className="p-3">
//                   <img
//                     src={eachdata.image}
//                     alt={eachdata.name}
//                     className="w-14 h-14 object-cover rounded-lg"
//                   />
//                 </td>
//                 <td className="p-3">{eachdata.name}</td>
//                 <td className="p-3">
//                   {eachdata.books?.length
//                     ? eachdata.books.map((b, i) => (
//                         <span key={i} className="block">
//                           {b}
//                         </span>
//                       ))
//                     : "N/A"}
//                 </td>
//                 <td className="p-3">{eachdata.cnic}</td>
//                 <td className="p-3">{eachdata.phone}</td>
//                 <td className="p-3">{eachdata.address || "N/A"}</td>
//                 <td className="p-3 text-center">
//                   <button
//                     onClick={() => handleEdit(eachdata)}
//                     className="px-3 py-1 bg-blue-600 rounded-md mr-2"
//                   >
//                     Edit
//                   </button>
//                   <button
//                     onClick={() => handleDelete(eachdata._id)}
//                     className="px-3 py-1 bg-red-600 rounded-md"
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }



import React, { useState } from "react";
import api from "../services/api.js";

export default function Products() {
  const [form, setForm] = useState({
    title: "",
    price: "",
    description: "",
    images: [],
  });

  const [preview, setPreview] = useState([]);

  // handle input
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      const fileArray = Array.from(files).slice(0, 6); // max 6 images

      setForm({ ...form, images: fileArray });

      const previews = fileArray.map((file) =>
        URL.createObjectURL(file)
      );

      setPreview(previews);
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  // submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();

    data.append("title", form.title);
    data.append("price", form.price);
    data.append("description", form.description);

    form.images.forEach((img) => {
      data.append("images", img);
    });

    try {
      await api.post("/product/create", data);
      alert("Product Created");

      setForm({
        title: "",
        price: "",
        description: "",
        images: [],
      });

      setPreview([]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-950 text-white p-6">

      <form
        onSubmit={handleSubmit}
        className="w-96 bg-gray-800 p-5 rounded-xl"
      >
        <h1 className="text-xl mb-3">Create Product</h1>

        {/* Title */}
        <input
          type="text"
          name="title"
          placeholder="Product Title"
          value={form.title}
          onChange={handleChange}
          className="w-full p-2 mb-2 rounded bg-gray-300 text-black"
        />

        {/* Price */}
        <input
          type="text"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          className="w-full p-2 mb-2 rounded bg-gray-300 text-black"
        />

        {/* Description */}
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="w-full p-2 mb-2 rounded bg-gray-300 text-black"
        />

        {/* Images */}
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleChange}
          className="w-full p-2 mb-3 bg-gray-300 rounded"
        />

        {/* Preview */}
        <div className="flex gap-2 flex-wrap mb-3">
          {preview.map((img, i) => (
            <img
              key={i}
              src={img}
              className="w-16 h-16 object-cover rounded"
            />
          ))}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 py-2 rounded"
        >
          Create Product
        </button>
      </form>
    </div>
  );
}