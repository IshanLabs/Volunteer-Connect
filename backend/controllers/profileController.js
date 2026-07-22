const profileModel = require("../models/profileModel");

const getMyProfile = async (req, res) => {
  try {
    const userId = req.user.userId;
    const profileData = await profileModel.getProfileByUserId(userId);
    if (!profileData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    return res.status(200).json({ success: true, data: profileData });
  } catch (error) {
    console.error("❌ Error fetching profile:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const updateVolunteerProfile = async (req, res) => {
  try {
    const userId = req.user.userId;
    const updated = await profileModel.updateVolunteerProfile(userId, req.body);
    return res.status(200).json({ success: true, message: "Profile updated successfully", data: updated });
  } catch (error) {
    console.error("❌ Error updating volunteer profile:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const updateNGOProfile = async (req, res) => {
  try {
    const userId = req.user.userId;
    const updated = await profileModel.updateNGOProfile(userId, req.body);
    return res.status(200).json({ success: true, message: "NGO Profile updated successfully", data: updated });
  } catch (error) {
    console.error("❌ Error updating NGO profile:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = {
  getMyProfile,
  updateVolunteerProfile,
  updateNGOProfile,
};
