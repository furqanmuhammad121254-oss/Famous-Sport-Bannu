

// import Contact from "../models/Contact.js";

// export const createContact = async (req, res) => {
//   try {
//     const { name, email, message } = req.body;

//     const contact = await Contact.create({
//       name,
//       email,
//       message,
//     });

//     res.status(201).json({
//       success: true,
//       message: "Message sent successfully",
//       contact,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// export const getAllContacts = async (req, res) => {
//   try {
//     const contacts = await Contact.find().sort({ createdAt: -1 });

//     res.status(200).json({
//       success: true,
//       contacts,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };


import Contact from "../models/Contact.js";

export const createContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const contact = await Contact.create({ name, email, message });

    res.status(201).json({
      success: true,
      message: "Message sent successfully!",
      contact,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, contacts });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteContactMessage = async (req, res) => {
  try {
    const { id } = req.params;

    // Find and delete the document in one database call
    const deletedContact = await Contact.findByIdAndDelete(id);

    if (!deletedContact) {
      return res.status(404).json({
        success: false,
        message: "Contact message not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Message permanently dismissed successfully.",
    });
  } catch (error) {
    console.error("Error in deleteContactMessage controller:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error while deleting message.",
    });
  }
};