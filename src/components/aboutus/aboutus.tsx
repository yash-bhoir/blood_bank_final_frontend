import { CardHoverEffectDemo } from "./CardHoverEffectDemo";
import ContactUs from "./ContactUs";

const AboutUs = () => {
  return (
    <div className="bg-black min-h-screen flex flex-col items-center justify-center p-8 ">
      <div className="flex flex-col p-8 rounded-lg text-white max-w-4xl bg-gradient-to-b from-blue-500 to-blue-300 first-line:rounded-lg shadow-lg">
        {/* About Us Heading and Description */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-4">About Us</h1>
          <p className="text-lg leading-relaxed">
            We are a passionate team dedicated to delivering innovative solutions and making a difference in our community. Our mission is to provide quality services that exceed our customers' expectations.
          </p>
        </div>

        {/* Card Hover Effect Demo */}
        <div className="mb-8">
          <CardHoverEffectDemo />
        </div>

        {/* Contact Us Section */}
        <div className="mt-8">
          <ContactUs />
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
