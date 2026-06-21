
import express from "express";
import {
  createContact,
  getAllContacts,
  deleteContactMessage
} from "../controllers/contact.controller.js";

const router = express.Router();

router.post("/create", createContact);
router.get("/allcontact", getAllContacts);
router.delete("/:id", deleteContactMessage);

export default router;