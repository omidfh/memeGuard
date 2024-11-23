import React from "react";
import logo from "@/assets/secondlogo.png";

const BlobLoader = ({ size = 200 }) => {
  return (
    <div className="relative flex items-center justify-center">
      {/* Original logo */}

      {/* Blob effect behind logo */}
      <div
        className="absolute animate-morphBlob"
        style={{
          width: size,
          height: size,
          backgroundColor: "#006cff",
        }}
      />
      <img
        src={logo}
        alt="Logo"
        className="absolute w-3/4 h-3/4 object-contain z-10"
      />

      <style>{`
        .animate-morphBlob {
          animation: morphBlob 1s infinite linear;
        }

        @keyframes morphBlob {
          12.5% {
            border-radius: 37% 63% 70% 30% / 30% 62% 38% 70%;
          }
          25% {
            border-radius: 50% 50% 70% 30% / 52% 62% 38% 48%;
          }
          37.5% {
            border-radius: 33% 67% 18% 82% / 52% 75% 25% 48%;
          }
          50% {
            border-radius: 73% 27% 18% 82% / 52% 32% 68% 48%;
          }
          62.5% {
            border-radius: 73% 27% 74% 26% / 64% 32% 68% 36%;
          }
          75% {
            border-radius: 84% 16% 15% 85% / 55% 79% 21% 45%;
          }
          87.5% {
            border-radius: 12% 88% 69% 31% / 10% 66% 34% 90%;
          }
        }
      `}</style>
    </div>
  );
};

export default BlobLoader;
