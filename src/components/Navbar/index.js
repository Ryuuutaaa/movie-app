import Link from "next/link";
const { useState } = require("react");

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/#popular", label: "Popular" },
    { href: "#", label: "Category" },
  ];
  return (
    <header className="sm:px-8 px-4 py-2 z-10 w-full fixed bg-black ">
      <nav className="flex justify-between items-center max-container ">
        <div className="flex justify-between items-center mt-3">
          <Link href="/" className="text-3xl font-bold mr-16 text-red-600">
            リュタ
          </Link>
          <ul className="flex justify-center items-center gap-16 max-lg:hidden">
            {navLinks.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="font-montserrat leading-normal text-lg text-slate-gray"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-3 flex gap-2 text-lg leading-normal font-medium font-montserrat max-lg:hidden wide:mr-24"></div>
        <div
          className="hidden max-lg:block cursor-pointer"
          onClick={() => {
            setIsMenuOpen(!isMenuOpen);
          }}
        ></div>
      </nav>
    </header>
  );
};

export default Navbar;
