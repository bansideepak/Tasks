import React from "react";
import speakerImage from "../assets/speaker.jpg";
import logoImage from "../assets/logo.png";
import signature from "../assets/signature.png";

const EventRegistrationForm = () => {
  return (
    <div className="min-h-full bg-gradient-to-b from-orange-100 to-pink-200 p-8  flex flex-col items-center">
      <div className="flex items-center pb-5 pt-10">
        {/* Logo and Text Section */}
        <div className="flex float-start items-center ">
          <img
            src={logoImage}
            alt="Creative Event Logo"
            className=" w-14 h-14 pr-1 "
          />
          <span className=" font-bold  text-sm flex items-center mr-11 mb-1 pr-11">
            Creative <br />
            Event
          </span>
        </div>

        {/* Heading Section */}
        <h1 className="  text-4xl font-extrabold">Event Registration Form</h1>
      </div>

      {/* Main Form Container */}
      <div className="bg-white border-[1px] border-black rounded-lg p-8 pb-12 w-full max-w-3xl shadow">
        <div className="border-b  border-gray-400 pb-4 mb-6">
          <div className="flex justify-between">
            <div>
              <h2 className="font-bold text-lg mb-5">About This Event</h2>
              <table className=" text-s mb-2">
                <tbody>
                  <tr>
                    <td className="pr-4">Event Name</td>
                    <td>: Social Media Creative</td>
                  </tr>
                  <tr>
                    <td>Date</td>
                    <td>: August 29, 2030</td>
                  </tr>
                  <tr>
                    <td>Time</td>
                    <td>: 1:00 PM - 3:00 PM</td>
                  </tr>
                  <tr>
                    <td>Speaker</td>
                    <td>: Michelle Erica (Social Media Specialist)</td>
                  </tr>
                  <tr>
                    <td>Organizer</td>
                    <td>: Creative Event</td>
                  </tr>
                  <tr>
                    <td>More Information </td>
                    <td>
                      :{" "}
                      <a
                        href="http://www.creativeevent.com"
                        className="text-blue-500"
                      >
                        www.creativeevent.com
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="pr-4  text-center">
              <img
                src={speakerImage}
                alt="Speaker"
                className=" w-28 h-28 rounded-full border "
              />
              <p className="pt-2 text-sm">Speaker</p>
              <p className="font-semibold text-sm">Michelle Erica</p>
            </div>
          </div>
        </div>

        {/* Participant Information Section */}
        <div className="border-b  border-gray-400 pb-8 mb-6">
          <h2 className="font-bold text-lg mb-4">Participant Information</h2>
          <div className="grid grid-cols-2 gap-6 mb-4">
            <div>
              <label className="block text-sm mb-1">Full Name</label>
              <input
                type="text"
                className="w-full h-15 bg-[#fdf4ed] border border-gray-300 rounded-3xl p-2 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Date of Birth</label>
              <input
                type="text"
                className="w-full h-15 bg-[#fdf4ed] border border-gray-300 rounded-3xl p-2 focus:outline-none"
              />
            </div>
          </div>
          <div className="mt-8 mb-8">
            <div className="flex gap-10 items-center">
              <label className="block text-sm mb-1">Gender</label>

              <label className="flex items-center gap-3">
                <input
                  type="radio"
                  name="gender"
                  className="w-6 h-6 appearance-none bg-[#fdf4ed] border border-pink-200 rounded-3xl checked:border-4 checked:bg-pink-100 transition"
                />
                <span className="text-sm">Male</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="gender"
                  className="w-6 h-6 appearance-none bg-[#fdf4ed] border border-pink-200 rounded-3xl checked:border-4 checked:bg-pink-100 transition"
                />
                <span className="text-sm">Female</span>
              </label>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6 mb-4">
            <div>
              <label className="block text-sm mb-1">Phone Number</label>
              <input
                type="tel"
                className="w-full h-15 bg-[#fdf4ed] border border-gray-300 rounded-3xl p-2 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Email</label>
              <input
                type="email"
                className="w-full h-15 bg-[#fdf4ed] border border-gray-300 rounded-3xl p-2 focus:outline-none"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm mt-8 mb-5">
              Where did you hear about this virtual event?
            </label>
            <div className="flex flex-wrap gap-10">
              {["Facebook", "Youtube", "Instagram", "Twitter", "Other"].map(
                (option) => (
                  <label key={option} className="flex items-center gap-5">
                    <input
                      type="radio"
                      name="source"
                      className="w-7 h-7 appearance-none bg-[#fdf4ed] border border-pink-200 rounded-3xl checked:border-4 checked:bg-pink-100 transition"
                    />
                    <span className="text-sm">{option}</span>
                  </label>
                )
              )}
            </div>
          </div>
        </div>

        {/* Payment Information Section */}
        <div className="border-b border-gray-400 pb-4 mb-6">
          <h2 className="font-bold text-lg mb-4">Payment Information</h2>
          <div className="flex gap-5 mb-4">
            <div>
              <label className=" flex text-sm mb-1">Number of Tickets</label>
              <input
                type="number"
                className="w-[260px] h-15 bg-[#fdf4ed] border border-pink-200 rounded-3xl p-2 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm mb-3">Payment Method</label>
              <div className="flex flex-wrap gap-4">
                {["Credit Card", "Debit Card", "Cash", "Check"].map(
                  (method) => (
                    <label key={method} className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="payment"
                        className="w-7 h-7 appearance-none bg-[#fdf4ed] border border-pink-200 rounded-full checked:border-4 checked:bg-pink-100 transition"
                      />
                      <span className="text-sm">{method}</span>
                    </label>
                  )
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-start pb-5 relative">
          {/* Disclaimer Text */}
          <div className="w-3/5">
            <p className="text-sm leading-relaxed">
              I understand that participation in this event may involve some
              degree of risk. I release WebinarPlus LLC from any liability for
              injury, loss, or damage to personal property.
            </p>
          </div>

          {/* Signature Section */}
          <div className=" absolute right-0 top-0 text-right">
            <div className="text-sm mb-2 pb-1">Date: August 29, 2030</div>
            <img src={signature} alt="signature" className="pl-12 w-22 h-11" />
            <hr className=" border-gray-500  pb-1" />
            <p className="italic text-base ">James John</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventRegistrationForm;
