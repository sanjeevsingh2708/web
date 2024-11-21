import { v2 as cloudinary } from "cloudinary";
import crypto, { sign } from "crypto";
import { CLIENT_RENEG_LIMIT } from "tls";
require('dotenv').config();

export const cloudinaryConfig = () => {
  if (!process.env.CLOUDINARY_CLOUD_NAME || 
      !process.env.CLOUDINARY_API_KEY || 
      !process.env.CLOUDINARY_API_SECRET) {
    throw new Error("Cloudinary environment variables are not set properly.");
  }

  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  console.log("Cloudinary configured successfully.");
};

export const generateSignature = (paramsToSign) => {
  // Ensure cloudinary is properly configured
  const apiSecret = cloudinary.config().api_secret;

  if (!apiSecret) {
    throw new Error("Cloudinary API secret is missing in the configuration");
  }

  // Sort and format parameters to sign
  const sortedParams = Object.keys(paramsToSign)
    .sort()
    .map((key) => `${key}=${paramsToSign[key]}`)
    .join("&");

  // Generate the signature using HMAC-SHA256
  const signature = crypto
    .createHmac("sha256", apiSecret)
    .update(sortedParams)
    .digest("hex");

  console.log("Generated Signature:", signature);
  return signature;
};

export const uploadToCloudinary = async (filePath) => {
  try {
    cloudinaryConfig();
    const timestamp = Math.round((new Date()).getTime()/1000)
    const paramsToSign = {
        timestamp,
    }

    const signature = generateSignature(paramsToSign)
    const result = await cloudinary.uploader.upload(filePath, ...paramsToSign, signature, process.env.CLOUDINARY_API_KEY);
    return result;
  } catch (error) {
    console.error(error);
  }
};
