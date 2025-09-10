import React, { useEffect } from "react";
import { motion } from "framer-motion";
import {
  Check,
  Home,
  QrCode,
  CreditCard,
} from "lucide-react";
import { QRCodeCanvas } from "qrcode.react";
import { useLocation, Link } from "react-router-dom";
import confetti from "canvas-confetti";

// ✅ Minimal Particles Background fallback
const ParticlesBackground: React.FC = () => (
  <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-900 via-purple-900 to-black" />
);

// ✅ Minimal Payment Upload placeholder
const PaymentUpload: React.FC = () => {
  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      console.log("File selected:", file.name);
      // TODO: Upload to Supabase storage
    }
  };

  return (
    <div className="glass-card mt-6 p-4">
      <p className="text-gray-200 mb-2">Upload your payment screenshot:</p>
      <input
        type="file"
        accept="image/*"
        onChange={handleUpload}
        className="input-field"
      />
      <button className="btn-primary mt-3">Submit</button>
    </div>
  );
};

const RegistrationSuccess: React.FC = () => {
  const location = useLocation();
  const { teamName } = (location.state as { teamName?: string }) || {};

  // 🎉 Fire confetti once on mount
  useEffect(() => {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
    });
  }, []);

  return (
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden">
      {/* Background */}
      <ParticlesBackground />

      {/* Card */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="glass-card max-w-lg w-full text-center"
      >
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 flex items-center justify-center rounded-full bg-green-500/20 border-2 border-green-400">
            <Check className="w-10 h-10 text-green-400" />
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-2xl sm:text-3xl font-bold mb-2 text-green-400">
          Registration Successful 🎉
        </h1>
        <p className="text-gray-300 mb-6">
          {teamName ? (
            <>
              Team <span className="font-semibold text-white">{teamName}</span>{" "}
              has been registered for{" "}
              <span className="font-semibold text-white">Skill Sprint</span>.
            </>
          ) : (
            <>
              Your team has been registered for{" "}
              <span className="font-semibold text-white">Skill Sprint</span>.
            </>
          )}
          <br />
          Please complete payment to confirm your participation.
        </p>

        {/* QR Code */}
        <div className="flex flex-col items-center space-y-3 mb-6">
          <QRCodeCanvas value="upi://pay?pa=your-upi-id@upi&pn=SkillSprint&am=500" size={180} />
          <p className="text-gray-400 text-sm">
            Scan to pay your registration fee
          </p>
        </div>

        {/* Payment Upload */}
        <PaymentUpload />

        {/* Action Buttons */}
        <div className="mt-8 grid grid-cols-2 gap-4">
          <Link
            to="/"
            className="btn-secondary flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            Home
          </Link>
          <Link
            to="/upload-payment"
            className="btn-primary flex items-center justify-center gap-2"
          >
            <CreditCard className="w-4 h-4" />
            Upload Later
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default RegistrationSuccess;
