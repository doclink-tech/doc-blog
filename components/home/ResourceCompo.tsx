import Image from "next/image";

const ResourceExplorer = () => {
  return (
    <div className="relative h-full flex items-center justify-center overflow-hidden">
      {/* Light rays effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-purple-100 opacity-50"></div>

      {/* Content container */}
      <div className="relative z-10 text-center p-6 md:p-8 lg:p-12">
        {/* Avatar group */}
        <div className="flex justify-center mb-6">
          {["avatar1.png", "avatar2.png", "avatar3.png", "avatar4.png"].map(
            (src, index) => (
              <div
                key={src}
                className={`w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden border-2 border-white ${
                  index !== 0 ? "-ml-4" : ""
                }`}
              >
                <Image
                  src={`/images/${src}`}
                  alt={`Avatar ${index + 1}`}
                  width={48}
                  height={48}
                  className="w-full h-full object-cover"
                />
              </div>
            )
          )}
        </div>

        {/* Text content */}
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
          Explore 1000+ resources
        </h2>
        <p className="text-sm md:text-base lg:text-lg mb-6 max-w-md mx-auto">
          Over 1,000 articles on emerging tech trends and breakthroughs.
        </p>

        {/* Button */}
        <button className="bg-blue-600 text-white px-6 py-2 rounded-full text-sm md:text-base hover:bg-blue-700 transition-colors duration-300">
          Explore Resources
        </button>
      </div>
    </div>
  );
};

export default ResourceExplorer;