
// Data for the sections
const sections = [
  {
    id: 1,
    title: "Benefits",
    image: "https://sha.go.ke/images/benefits.png",
    text: "The benefits under the Social Health Authority include Preventive, Promotive, Curative, Rehabilitative and Palliative health services. These are provided at level 4, 5, and 6 health facilities under the fund.",
    imagePosition: "right",
  },
  {
    id: 2,
    title: "Who Qualifies to Register?",
    image: "https://sha.go.ke/images/covered.png",
    text: "Every person resident in Kenya is required to apply for registration to the Authority as a member of the Social Health Authority within ninety days upon the coming into force of these Regulations. The application must be accompanied by a copy of the national identification document or any other approved document, and for children without identification, documentation provided by the state department responsible for social protection.",
    imagePosition: "left",
  },
  {
    id: 3,
    title: "What is Covered?",
    image: "https://sha.go.ke/images/benefits.png",
    text: "The Social Health Authority covers integrated preventive, promotive, curative, rehabilitative, and palliative health services at level 4, 5, and 6 health facilities. This includes emergency services, critical care services beyond the benefits in the essential healthcare benefits package, treatment and management of chronic illnesses beyond the benefits in the essential healthcare benefits package of the Social Health Authority.",
    imagePosition: "right",
  },
];

// Data for the "How to Register" section
const registrationSteps = [
  {
    id: 1,
    title: "Web Self Registration",
    steps: [
      "On your web browser, open the SHA website.",
      "From the SHA website, click on register and start the registration process.",
      "Take a few minutes to go through the policies, instructions for self-onboarding, and the terms and conditions before continuing to the next step.",
    ],
  },
  {
    id: 2,
    title: "USSD Self Registration",
    steps: [
      "Dial the USSD code provided by SHA.",
      "Follow the prompts to enter your details.",
      "Complete the registration process.",
    ],
  },
  {
    id: 3,
    title: "Assisted Enrolment",
    steps: [
      "Visit the nearest SHA office.",
      "Provide the required documents for verification.",
      "Complete the registration with the assistance of SHA staff.",
    ],
  },
];

// Data for the "Help & Support" section
const helpSupport = [
  {
    id: 1,
    icon: "📧",
    title: "Email",
    description: "Talk to us.",
    contact: "info@sha.go.ke",
  },
  {
    id: 2,
    icon: "🏢",
    title: "Visit us",
    description: "Physical Assistance",
    contact: "SHA Building, Community Area, Ragati Road",
  },
  {
    id: 3,
    icon: "📞",
    title: "Call us",
    description: "24/7",
    contact: "Telephone Number: 0800720601",
  },
];

const Home = () => {
  return (
    <div className="bg-gray-50 py-12">
      {/* Sections */}
      {sections.map((section) => (
        <div
          key={section.id}
          className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 ${
            section.id !== 1 ? "mt-8" : ""
          }`}
        >
          <div
            className={`flex flex-col ${
              section.imagePosition === "right" ? "md:flex-row" : "md:flex-row-reverse"
            } items-center gap-8`}
          >
            {/* Image */}
            <div className="w-full md:w-1/2">
              <img
                src={section.image}
                alt={section.title}
                className="rounded-lg shadow-lg"
              />
            </div>
            {/* Text */}
            <div className="w-full md:w-1/2">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {section.title}
              </h2>
              <p className="text-gray-600">{section.text}</p>
            </div>
          </div>
        </div>
      ))}

      {/* How to Register Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">How to Register</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {registrationSteps.map((step) => (
              <div key={step.id} className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  {step.title}
                </h3>
                <ul className="list-disc list-inside text-gray-600">
                  {step.steps.map((s, index) => (
                    <li key={index} className="mb-2">
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Help & Support Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Help & Support</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {helpSupport.map((item) => (
              <div key={item.id} className="bg-gray-50 p-6 rounded-lg">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 mb-2">{item.description}</p>
                <p className="text-gray-800 font-medium">{item.contact}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;