import React from "react";

const PhotographerCard = ({ photographer, onViewProfile }) => {
  return (
    <div className="bg-gray-800 shadow-md rounded-2xl p-4 hover:shadow-lg transition-transform transform hover:scale-105">
      <img
        src={photographer.profilePic}
        alt={photographer.name}
        className="w-full h-48 object-cover rounded-xl mb-3"
      />
      <h2 className="text-xl font-semibold text-white">{photographer.name}</h2>
      <p className="text-gray-400">{photographer.location}</p>
      <p className="mt-2 text-sm text-gray-300">Starting ₹{photographer.price}</p>
      <p className="text-yellow-400 font-medium">⭐ {photographer.rating}</p>
      <div className="mt-2 flex flex-wrap gap-1">
        {photographer.tags.map((tag, idx) => (
          <span
            key={idx}
            className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>
      <button
        onClick={() => onViewProfile(photographer.id)}
        className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-xl hover:bg-indigo-700 transition duration-200"
      >
        View Profile
      </button>
    </div>
  );
};

export default PhotographerCard;
