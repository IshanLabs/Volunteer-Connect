const nodemailer = require("nodemailer");
require("dotenv").config();

let transporterInstance = null;

// Create Transporter
const getTransporter = () => {
    if (transporterInstance) return transporterInstance;

    const emailUser = process.env.EMAIL_USER ? process.env.EMAIL_USER.trim() : null;
    const emailPass = process.env.EMAIL_PASS ? process.env.EMAIL_PASS.replace(/\s+/g, "") : null;

    if (emailUser && emailPass) {
        console.log(`📧 Initializing Gmail SMTP for user: ${emailUser}`);
        transporterInstance = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true, // SSL
            auth: {
                user: emailUser,
                pass: emailPass,
            },
        });
    } else {
        console.log(`📧 Initializing Brevo SMTP Relay...`);
        transporterInstance = nodemailer.createTransport({
            host: process.env.SMTP_HOST || "smtp-relay.brevo.com",
            port: parseInt(process.env.SMTP_PORT) || 587,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });
    }

    // Verify connection configuration on startup
    transporterInstance.verify((error, success) => {
        if (error) {
            console.error("❌ SMTP Verification Failed!");
            console.error("   Error Name:", error.name);
            console.error("   Error Code:", error.code);
            console.error("   Error Message:", error.message);
            if (error.response) console.error("   Server Response:", error.response);
        } else {
            console.log("✅ SMTP Server Connection Verified Successfully! Ready to send emails.");
        }
    });

    return transporterInstance;
};

/**
 * Send Email with verbose debugging
 * @param {Object} options
 * @param {string} options.to - Recipient Email
 * @param {string} [options.name] - Recipient Name
 * @param {string} options.subject - Email Subject
 * @param {string} options.htmlContent - HTML Email Body
 * @returns {Promise<Object>}
 */
const sendEmail = async ({ to, name, subject, htmlContent }) => {
    console.log(`\n================ EMAIL SENDING REQUEST ================`);
    console.log(`To: ${to}`);
    console.log(`Name: ${name || 'N/A'}`);
    console.log(`Subject: ${subject}`);
    console.log(`Sender: ${process.env.EMAIL_USER || process.env.SENDER_EMAIL}`);

    try {
        const transporter = getTransporter();
        const senderEmail = process.env.EMAIL_USER || process.env.SENDER_EMAIL || "tejastholar2006@gmail.com";
        const senderName = process.env.SENDER_NAME || "Volunteer Connect";

        const mailOptions = {
            from: `"${senderName}" <${senderEmail}>`,
            to: name ? `"${name}" <${to}>` : to,
            subject: subject,
            html: htmlContent,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log(`✅ EMAIL SENT SUCCESSFULLY!`);
        console.log(`   Message ID:`, info.messageId);
        console.log(`   Accepted Recipients:`, info.accepted);
        console.log(`   Rejected Recipients:`, info.rejected);
        console.log(`   Response from Server:`, info.response);
        console.log(`=======================================================\n`);

        return { success: true, messageId: info.messageId, response: info.response };
    } catch (error) {
        console.error(`❌ EMAIL SEND FAILED!`);
        console.error(`   Recipient:`, to);
        console.error(`   Error Code:`, error.code);
        console.error(`   Error Message:`, error.message);
        if (error.response) console.error(`   SMTP Response:`, error.response);
        if (error.command) console.error(`   Failed Command:`, error.command);
        console.log(`=======================================================\n`);

        return { success: false, error: error.message, details: error };
    }
};

/**
 * Send OTP Verification Email
 */
const sendOTPEmail = async (to, otp, name) => {
    const subject = "Your Volunteer Connect OTP Verification Code";
    const htmlContent = `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 550px; margin: 0 auto; padding: 24px; border: 1px solid #e5e7eb; border-radius: 12px; background-color: #ffffff;">
            <div style="text-align: center; margin-bottom: 24px;">
                <h2 style="color: #059669; margin: 0; font-size: 24px;">Volunteer Connect</h2>
                <p style="color: #6b7280; font-size: 14px; margin-top: 4px;">Connecting Passion with Purpose</p>
            </div>
            <div style="border-top: 1px solid #f3f4f6; padding-top: 20px;">
                <h3 style="color: #111827; margin-bottom: 12px;">Hello ${name || 'User'},</h3>
                <p style="color: #374151; font-size: 15px; line-height: 1.5;">Your One-Time Verification Code (OTP) is:</p>
                <div style="text-align: center; margin: 28px 0;">
                    <span style="display: inline-block; font-size: 32px; font-weight: 700; letter-spacing: 8px; color: #059669; background-color: #ecfdf5; padding: 14px 28px; border-radius: 8px; border: 1px dashed #10b981;">
                        ${otp}
                    </span>
                </div>
                <p style="color: #6b7280; font-size: 13px;">This code is valid for <strong>10 minutes</strong>. Please do not share this OTP with anyone.</p>
            </div>
            <div style="border-top: 1px solid #f3f4f6; margin-top: 24px; padding-top: 16px; text-align: center;">
                <p style="color: #9ca3af; font-size: 12px; margin: 0;">If you did not request this OTP, you can safely ignore this email.</p>
            </div>
        </div>
    `;
    return await sendEmail({ to, name, subject, htmlContent });
};

/**
 * Send Welcome Email on Signup
 */
const sendWelcomeEmail = async (to, name, role) => {
    const subject = "Welcome to Volunteer Connect! 🎉";
    const htmlContent = `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 550px; margin: 0 auto; padding: 24px; border: 1px solid #e5e7eb; border-radius: 12px; background-color: #ffffff;">
            <div style="text-align: center; margin-bottom: 24px;">
                <h2 style="color: #059669; margin: 0; font-size: 26px;">Welcome to Volunteer Connect! 🎉</h2>
            </div>
            <div style="color: #374151; font-size: 15px; line-height: 1.6;">
                <p>Hi <strong>${name}</strong>,</p>
                <p>Thank you for signing up as a <strong>${role}</strong>. Your account has been created successfully!</p>
                <p>You can now discover opportunities, connect with organizations, and make a meaningful difference in your community.</p>
            </div>
            <div style="text-align: center; margin: 28px 0;">
                <a href="http://localhost:5173" style="background-color: #059669; color: #ffffff; text-decoration: none; padding: 12px 28px; border-radius: 8px; font-weight: 600; display: inline-block;">
                    Go to Dashboard
                </a>
            </div>
            <div style="border-top: 1px solid #f3f4f6; margin-top: 24px; padding-top: 16px; text-align: center;">
                <p style="color: #9ca3af; font-size: 12px; margin: 0;">© Volunteer Connect. All rights reserved.</p>
            </div>
        </div>
    `;
    return await sendEmail({ to, name, subject, htmlContent });
};

module.exports = {
    sendEmail,
    sendOTPEmail,
    sendWelcomeEmail
};
