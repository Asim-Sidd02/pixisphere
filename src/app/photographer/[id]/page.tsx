"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import InquiryModal from "../../components/InquiryModal";
import { Loader, Star } from "lucide-react";
import { ArrowLeft } from "lucide-react";
import Slider from "react-slick";

interface Photographer {
  id: number;
  name: string;
  location: string;
  price: number;
  rating: number;
  styles: string[];
  tags: string[];
  bio: string;
  profilePic: string;
  portfolio: string[];
  reviews: {
    name: string;
    rating: number;
    comment: string;
    date: string;
  }[];
}

export default function PhotographerProfile() {
  const { id } = useParams();
  const [photographer, setPhotographer] = useState<Photographer | null>(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchPhotographer = async () => {
      try {
        const res = await fetch(`http://localhost:3001/photographers/${id}`);
        const data = await res.json();
        setPhotographer(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching photographer", error);
        setLoading(false);
      }
    };

    fetchPhotographer();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900">
        <Loader className="animate-spin h-8 w-8 text-indigo-600" />
      </div>
    );
  }

  if (!photographer) {
    return <p className="text-center mt-10 text-gray-400">Photographer not found.</p>;
  }

  return (
    <div className="min-h-screen p-4 sm:p-6 bg-gray-900 text-gray-200">
      <div className="max-w-5xl mx-auto">
        <div className="mb-4">
          <button
            onClick={() => window.history.back()}
            className="flex items-center bg-indigo-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-indigo-700 transition duration-200"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            <span className="font-semibold">Back to Listings</span>
          </button>
        </div>

        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <img
            src={photographer.profilePic}
            alt={photographer.name}
            className="w-32 h-32 object-cover rounded-full shadow-lg"
          />
          <div>
            <h1 className="text-3xl font-bold text-indigo-400">{photographer.name}</h1>
            <p className="text-sm text-gray-400 mt-1">{photographer.location}</p>
            <p className="mt-2 text-gray-300">{photographer.bio}</p>
            <p className="mt-2 font-medium text-indigo-300">Starting at ₹{photographer.price}</p>
          </div>
        </div>

        {/* Tags + Styles */}
        <div className="mt-6 flex flex-wrap gap-2">
          {photographer.styles.map((style) => (
            <span key={style} className="px-3 py-1 bg-indigo-700 text-white rounded-full text-sm">
              {style}
            </span>
          ))}
          {photographer.tags.map((tag) => (
            <span key={tag} className="px-3 py-1 bg-pink-600 text-white rounded-full text-sm">
              #{tag}
            </span>
          ))}
        </div>

        {/* Gallery */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-3 text-indigo-300">Portfolio</h2>
          <Slider
            dots={true}
            infinite={true}
            speed={500}
            slidesToShow={1}
            slidesToScroll={1}
            className="rounded-xl"
          >
            {photographer.portfolio.map((img, idx) => (
              <div key={idx} className="px-2">
                <div className="relative group overflow-hidden rounded-xl">
                  <img
                    src={img}
                    alt={`Portfolio ${idx + 1}`}
                    className="w-full h-[300px] sm:h-[400px] object-cover rounded-xl transition-transform group-hover:scale-105 duration-500"
                  />
                </div>
              </div>
            ))}
          </Slider>
        </div>

        {/* Reviews */}
        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-3 text-indigo-300">Reviews</h2>
          <div className="space-y-4">
            {photographer.reviews.map((review, idx) => (
              <div key={idx} className="bg-gray-700 p-4 rounded-xl shadow-lg">
                <div className="flex justify-between items-center">
                  <p className="font-medium text-gray-200">{review.name}</p>
                  <div className="flex items-center text-yellow-500">
                    <Star className="w-4 h-4 fill-yellow-400" />
                    <span className="ml-1 text-sm">{review.rating}</span>
                  </div>
                </div>
                <p className="text-sm mt-1 text-gray-300">{review.comment}</p>
                <p className="text-xs mt-1 text-gray-500">{review.date}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Inquiry Button */}
        <div className="mt-8 text-center">
          <button
            onClick={() => setShowModal(true)}
            className="px-6 py-3 bg-indigo-600 text-white rounded-xl shadow-md hover:bg-indigo-700 transition"
          >
            📩 Send Inquiry
          </button>

          <InquiryModal
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            photographerName={photographer.name}
          />
        </div>
      </div>
    </div>
  );
}
