const adminModel = require("../models/adminModel");

const getPlatformStats = async (req, res) => {
  try {
    const stats = await adminModel.getPlatformStats();
    return res.status(200).json({ success: true, data: stats });
  } catch (error) {
    console.error("❌ Error fetching admin stats:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const getPendingNGOs = async (req, res) => {
  try {
    const ngos = await adminModel.getPendingNGOs();
    return res.status(200).json({ success: true, count: ngos.length, data: ngos });
  } catch (error) {
    console.error("❌ Error fetching pending NGOs:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const verifyNGO = async (req, res) => {
  try {
    const { id } = req.params; // ngo_profile_id
    const { status } = req.body; // VERIFIED, REJECTED, SUSPENDED
    const adminUserId = req.user.userId;

    if (!["VERIFIED", "REJECTED", "SUSPENDED", "PENDING"].includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid status" });
    }

    const updated = await adminModel.verifyNGO(id, status, adminUserId);
    return res.status(200).json({ success: true, message: `NGO ${status.toLowerCase()} successfully`, data: updated });
  } catch (error) {
    console.error("❌ Error verifying NGO:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = {
  getPlatformStats,
  getPendingNGOs,
  verifyNGO,
};
