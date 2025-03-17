
// Define the type for developer data
interface Developer {
  name: string;
  message: string;
  image: string;
}

// Array of developer data
const developers: Developer[] = [
  {
    name: "John Doe",
    message:
      "Developing the SHA website was a rewarding experience. One of the biggest challenges was ensuring the site was fully responsive and accessible to all users, including those with disabilities. I implemented modern design principles and rigorous testing to achieve this. The chatbot integration was particularly exciting, as it required seamless communication between the front-end and back-end systems.",
    image: "https://i.pinimg.com/236x/f7/88/8d/f7888d60bcaa230f45eca8d3abec9aec.jpg", // Replace with actual image URL
  },
  {
    name: "Jane Smith",
    message:
      "As a back-end developer, my primary responsibility was to build a robust and scalable system for the SHA website and chatbot. I designed the database architecture and implemented APIs to handle user data securely. One of the challenges was ensuring real-time updates for the chatbot, which we solved using WebSocket technology. It was a great learning experience!",
    image: "https://i.pinimg.com/236x/99/d2/0f/99d20fb1929a5c5ba41d33bf6f26cf65.jpg", // Replace with actual image URL
  },
  {
    name: "Alice Johnson",
    message:
      "I worked on integrating third-party services, such as payment gateways and SMS notifications, into the SHA platform. One of the challenges was ensuring compatibility across different devices and browsers. I also contributed to the chatbot's natural language processing (NLP) capabilities, making it more user-friendly and efficient.",
    image: "https://i.pinimg.com/236x/78/86/f9/7886f9c50b3ddd5b73ee8fbbed4e9888.jpg", // Replace with actual image URL
  },
  {
    name: "Phantom Green",
    message:
      "My focus was on ensuring the security of the SHA website and chatbot. I implemented encryption protocols and conducted regular vulnerability assessments to protect user data. One of the challenges was balancing security with performance, which we achieved through careful optimization. It was a fulfilling experience to contribute to such an impactful project.",
    image: "https://i.pinimg.com/236x/ce/cb/b0/cecbb00cd1db6b0eb798cefd134c53a0.jpg", // Replace with actual image URL
  },
];

const DevelopersPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto mt-4">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-12">
          About Developers
        </h1>

        {/* Developer Cards */}
        <div className="space-y-12">
          {developers.map((developer, index) => (
            <div
              key={index}
              className={`flex flex-col ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              } items-center gap-8`}
            >
              {/* Image */}
              <div className="w-full md:w-1/3">
                <img
                  src={developer.image}
                  alt={developer.name}
                  className="rounded-lg shadow-lg w-full h-auto max-w-xs mx-auto"
                />
              </div>

              {/* Message */}
              <div className="w-full md:w-2/3">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  {developer.name}
                </h2>
                <p className="text-gray-600">{developer.message}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DevelopersPage;