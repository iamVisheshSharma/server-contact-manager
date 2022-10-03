const express = require('express');
const { v4: uuidv4 } = require("uuid");
const Contact = require("./Contact");
const router = express.Router()
const createError = require('http-errors');
const { default: mongoose } = require('mongoose');

// For get all existing contacts
router.get("/", async (req, res, next) => {
  try {
    const allContacts = await Contact.find({}, { __v: 0, createdAt: 0, updatedAt: 0 });
    return res.send({ success: true, allContacts });
  } catch (error) {
    next(error);
  }
});

// Find a contact by id
router.get("/:uuid", async (req, res, next) => {
  try {
		const uuid = req.params.uuid;
    const contact = await Contact.findOne({ uuid: uuid });
    if(!contact) {
      throw createError(404, "Contact does not exist.")
    }
    return res.status(201).json({
      success: true,
      contact,
    });
  } catch (error) {
    if(error instanceof mongoose.CastError){
      next(createError(404, "Id is not valid"));
      return;
    }
    next(error);
  }
});

// adding a new contacts is completed
router.post("/add", async (req, res, next) => {
  try {
		const { name, address, gstin, email, contact_number, alt_contact_number } = req.body;
    const newContact = new Contact({
      uuid: uuidv4(),
      name: name,
      address: address,
      gstin: gstin,
      email: email,
      contact_number: contact_number,
      alt_contact_number: alt_contact_number,
    });
    const response = await newContact.save();
    return res.status(200).json({ sucess: true, response });
  } catch (error) {
    if(error.name === 'ValidationError') {
      next(createError(422, error.message));
      return;
    }
    next(error);
  }
});

// Update a existing contact
router.patch("/edit/:uuid", async (req, res, next) => {
  try {
    const uuid = req.params.uuid;
    const updates = req.body;
    const options = { new: true };
    const result = await Contact.findOneAndUpdate(
      { uuid: uuid },
      updates,
      options
    );
    if(!result) {
      throw createError(404, "Contact does not exist.")
    }
    return res.status(201).json({
      success: true,
      result,
    });
  } catch (error) {
    next(error);
  }
});

// Delete a contact is completed
router.delete("/delete/:uuid", async (req, res, next) => {
  try {
		const uuid = req.params.uuid;
    const contact = await Contact.findOneAndDelete({ uuid: uuid });
    if(!contact) {
      throw createError(404, "Contact does not exist.")
    }
    return res.status(201).json({
      success: true,
      contact,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;