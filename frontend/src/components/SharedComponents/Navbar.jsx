import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const [activeDropdown, setActiveDropdown] = useState(null);

  const navItems = [
    {
      label: "Invest",
      dropdown: [
        {
          title: "Investing Options",
          items: [
            "Automated investing",
            "Portfolio options",
            "Historical performance",
            "Crypto investing",
            "Socially responsible (SRI)",
          ],
        },
      ],
    },
    { label: "Cash", dropdown: [] },
    {
      label: "Retire",
      dropdown: [
        {
          title: "Retirement Planning",
          items: [
            "Retirement goals",
            "Rollover support",
            "401(k) investing",
            "IRA options",
          ],
        },
      ],
    },
    { label: "Premium", dropdown: [] },
    {
      label: "Resources",
      dropdown: [
        {
          title: "Learning Center",
          items: [
            "Investment guides",
            "Financial planning",
            "Market insights",
            "Tax strategies",
          ],
        },
      ],
    },
    {
      label: "Rewards",
      dropdown: [
        {
          title: "Referral Program",
          items: ["Invite friends", "Earn rewards", "Bonus details"],
        },
      ],
    },
  ];

  const toggleDropdown = (label) => {
    setActiveDropdown(activeDropdown === label ? null : label);
  };

  return (
    <nav className="bg-[#0F2644] text-white py-4 px-8 flex justify-between items-center">
      <div className="flex items-center">
        {/* Logo placeholder */}
        <div className="text-2xl font-bold mr-8">Betterment</div>

        {/* Navigation Items */}
        <div className="flex space-x-6">
          {navItems.map((item, index) => (
            <div key={index} className="relative">
              <button
                onClick={() => toggleDropdown(item.label)}
                className="flex items-center hover:text-blue-300 transition-colors"
              >
                {item.label}
                {item.dropdown.length > 0 && (
                  <ChevronDown
                    size={16}
                    className={`ml-1 transition-transform ${
                      activeDropdown === item.label ? "rotate-180" : ""
                    }`}
                  />
                )}
              </button>

              {item.dropdown.length > 0 && activeDropdown === item.label && (
                <div
                  className="absolute top-full left-0 mt-2 bg-white text-black shadow-lg rounded-lg min-w-[250px] z-50"
                  onClick={(e) => e.stopPropagation()}
                >
                  {item.dropdown.map((section, sectionIndex) => (
                    <div key={sectionIndex} className="p-4">
                      <h3 className="font-bold mb-2 text-gray-600">
                        {section.title}
                      </h3>
                      {section.items.map((dropdownItem, itemIndex) => (
                        <a
                          key={itemIndex}
                          href="#"
                          className="block py-2 px-2 hover:bg-gray-100 rounded"
                          onClick={(e) => {
                            e.stopPropagation();
                            // You can add navigation logic here
                          }}
                        >
                          {dropdownItem}
                        </a>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Auth Actions */}
      <div className="flex items-center space-x-4">
        <button
          className="hover:text-blue-300"
          onClick={() => navigate("/login")} // Use navigate inside event handler
        >
          Log in
        </button>
        <button
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md transition-colors"
          onClick={() => navigate("/signup")} // Use navigate here as well
        >
          Get started
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
