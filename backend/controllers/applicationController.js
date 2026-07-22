const applicationModel = require("../models/applicationModel");

const applyForEvent = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { eventId, coverNote } = req.body;

    if (!eventId) {
      return res.status(400).json({ success: false, message: "Event ID is required" });
    }

    const application = await applicationModel.applyForEvent(userId, eventId, coverNote);
    return res.status(201).json({ success: true, message: "Application submitted successfully!", data: application });
  } catch (error) {
    if (error.message === "ALREADY_APPLIED") {
      return res.status(409).json({ success: false, message: "You have already applied for this event." });
    }
    console.error("❌ Error submitting application:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const getVolunteerApplications = async (req, res) => {
  try {
    const userId = req.user.userId;
    const applications = await applicationModel.getVolunteerApplications(userId);
    return res.status(200).json({ success: true, count: applications.length, data: applications });
  } catch (error) {
    console.error("❌ Error fetching applications:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const getEventApplications = async (req, res) => {
  try {
    const { eventId } = req.params;
    const applications = await applicationModel.getEventApplications(eventId);
    return res.status(200).json({ success: true, count: applications.length, data: applications });
  } catch (error) {
    console.error("❌ Error fetching event applications:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const updateApplicationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const userId = req.user.userId;

    if (!["SUBMITTED", "SHORTLISTED", "APPROVED", "REJECTED", "WITHDRAWN"].includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid status" });
    }

    const updated = await applicationModel.updateApplicationStatus(id, status, userId);
    return res.status(200).json({ success: true, message: `Application ${status.toLowerCase()} successfully`, data: updated });
  } catch (error) {
    console.error("❌ Error updating application status:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = {
  applyForEvent,
  getVolunteerApplications,
  getEventApplications,
  updateApplicationStatus,
};
