import Link from "next/link";
import Search from "../Search";
const { useState, useEffect } = require("react");

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/#popular", label: "Popular" },
    { href: "#", label: "Category" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleScrollLock = () => {
      const body = document.body;
      if (isMenuOpen) {
        body.style.overflow = "hidden";
      } else {
        body.style.overflow = "auto";
      }
    };

    handleScrollLock(); // Panggil sekali saat komponen pertama kali dirender

    // Tambahkan event listener untuk handleScrollLock ketika nilai isMenuOpen berubah
    window.addEventListener("resize", handleScrollLock);

    return () => {
      // Hapus event listener saat komponen di-unmount
      window.removeEventListener("resize", handleScrollLock);
    };
  }, [isMenuOpen]);

  return (
    <header
      className={`sm:px-8 px-4 z-10 w-full top-0 fixed transition-all duration-700  ${
        isScrolled ? "bg-black" : "bg-transparent"
      }`}
    >
      <nav className="flex justify-between items-center max-container p-4">
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
        <Search />
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
