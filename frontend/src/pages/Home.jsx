import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Car, MapPin, Clock } from "lucide-react";
import ConnectGoLogo from "../components/ConnectGoLogo";

const Home = () => {
  const features = [
    {
      icon: <Car className="w-6 h-6" />,
      text: "Book a ride instantly",
      description: "Quick booking process",
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      text: "Reliable pickups",
      description: "Always on time",
    },
    {
      icon: <Clock className="w-6 h-6" />,
      text: "24/7 service",
      description: "Available anytime",
    },
  ];

  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 bg-cover bg-center bg-[url('https://images.unsplash.com/photo-1494783367193-149034c05e8f?q=80&w=2070&auto=format&fit=crop')]">
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/70" />
      </div>

      {/* Content */}
      <div className="relative h-screen flex flex-col">
        <header className="p-4 md:p-6">
          <ConnectGoLogo />
        </header>

        <main className="flex-1 flex flex-col justify-end md:justify-center md:items-center">
          <div className="w-full md:max-w-md lg:max-w-lg mx-auto p-6 space-y-8">
            <div className="hidden md:grid grid-cols-3 gap-4 mb-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-white/95 backdrop-blur-sm p-4 rounded-lg text-center space-y-2 transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                  <div className="flex justify-center text-blue-600">
                    {feature.icon}
                  </div>
                  <p className="font-semibold text-gray-800">{feature.text}</p>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>

            <div className="bg-white/95 backdrop-blur-sm rounded-lg p-6 md:p-8 shadow-lg">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
                Get Started with
                <span className="text-blue-600"> ConnectGo</span>
              </h2>

              <p className="text-gray-600 mb-6 hidden md:block">
                Your reliable ride service, available 24/7. Experience seamless
                travel with just a tap!
              </p>

              <Link
                className="flex items-center justify-center w-full bg-black text-white py-3 px-6 rounded-lg transition-all duration-300 hover:bg-blue-600 hover:shadow-lg transform hover:-translate-y-1 active:translate-y-0"
                to="/login"
              >
                <span className="mr-2 font-medium">Continue</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;
