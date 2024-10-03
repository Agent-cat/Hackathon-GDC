import React, { useState, useEffect } from "react";
import axios from "axios";

const Donate = () => {
  const [ngos, setNgos] = useState([]);
  const [selectedNgo, setSelectedNgo] = useState(null);
  const [donationAmount, setDonationAmount] = useState(0);

  useEffect(() => {
    const fetchNgos = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/ngo");
        setNgos(response.data);
      } catch (error) {
        console.error("Error fetching NGOs:", error);
      }
    };
    fetchNgos();
  }, []);

  const handleNgoClick = (ngo) => {
    setSelectedNgo(ngo);
  };

  const handleDonation = async () => {
    try {
      await axios.get(`http://localhost:8000/api/ngo`);
      alert("Donation successful!");
      setSelectedNgo(null);
      setDonationAmount(0);
    } catch (error) {
      console.error("Error making donation:", error);
      alert("Donation failed. Please try again.");
    }
  };

  return (
    <div className="container mt-52  mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-center mb-8 text-gray-800">
        Available Ngo's
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ngos.map((ngo) => (
          <div
            key={ngo._id}
            className="bg-gray-300 rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition duration-300"
            onClick={() => handleNgoClick(ngo)}
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              {ngo.NGOName}
            </h2>
          </div>
        ))}
      </div>

      {selectedNgo && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              {selectedNgo.NGOName}
            </h2>
            <p className="mb-2">
              <strong>Address:</strong> {selectedNgo.NGOAddress}
            </p>
            <p className="mb-2">
              <strong>Location:</strong> {selectedNgo.NGOLocation}
            </p>
            <p className="mb-2">
              <strong>Owner:</strong> {selectedNgo.NGOOwner}
            </p>
            <p className="mb-2">
              <strong>Total Donations:</strong> ${selectedNgo.TotalDonations}
            </p>
            <p className="mb-4">
              <strong>Total Volunteers:</strong> {selectedNgo.TotalVolunteers}
            </p>

            <input
              type="range"
              min="0"
              max="1000"
              value={donationAmount}
              onChange={(e) => setDonationAmount(e.target.value)}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer mb-4"
            />
            <p className="text-center mb-4">
              Donation Amount: rupees:{donationAmount}
            </p>

            <div className="flex justify-between">
              <button
                onClick={handleDonation}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Donate
              </button>
              <button
                onClick={() => setSelectedNgo(null)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Donate;
