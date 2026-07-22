const eventModel = require("../models/eventModel");

const getAllEvents = async (req, res) => {
  try {
    const { search, city, category } = req.query;
    const events = await eventModel.getAllEvents({ search, city, category });
    return res.status(200).json({ success: true, count: events.length, data: events });
  } catch (error) {
    console.error("❌ Error fetching events:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const getEventById = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await eventModel.getEventById(id);
    if (!event) {
      return res.status(404).json({ success: false, message: "Event not found" });
    }
    return res.status(200).json({ success: true, data: event });
  } catch (error) {
    console.error("❌ Error fetching event details:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const createEvent = async (req, res) => {
  try {
    const userId = req.user.userId;
    const eventData = req.body;

    if (!eventData.eventName || !eventData.description) {
      return res.status(400).json({ success: false, message: "Event name and description are required" });
    }

    const newEvent = await eventModel.createEvent(userId, eventData);
    return res.status(201).json({ success: true, message: "Event created successfully!", data: newEvent });
  } catch (error) {
    console.error("❌ Error creating event:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const getNGOEvents = async (req, res) => {
  try {
    const userId = req.user.userId;
    const events = await eventModel.getNGOEvents(userId);
    return res.status(200).json({ success: true, count: events.length, data: events });
  } catch (error) {
    console.error("❌ Error fetching NGO events:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    await eventModel.deleteEvent(id);
    return res.status(200).json({ success: true, message: "Event deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting event:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = {
  getAllEvents,
  getEventById,
  createEvent,
  getNGOEvents,
  deleteEvent,
};
