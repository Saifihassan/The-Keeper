import searchIcon from "../assets/search.svg";
import hamburger from "../assets/hamburger.svg";
import { useState } from "react";

export default function Header({ onSearchChange }) {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <header className="bg-amber-300 sticky top-0 flex justify-center items-center px-4 py-2 text-white ">
      <button className="absolute left-4 text-white header-element transition">
        <img src={hamburger} alt="menu" width="24" height="24" />
      </button>
      {isVisible ? (
        <input
          type="text"
          placeholder="Search your secrets"
          onChange={(e) => {
            onSearchChange(e.target.value)
          }}
          className="w-52  px-2 py-1 text-black text-center rounded-2xl bg-white"
          autoFocus
        />
      ) : (
        <h1 className="text-3xl header-element">The Keeper</h1>
      )}
      <button
        onClick={() => {
          if (isVisible) {
            onSearchChange('')
          }
          setIsVisible(!isVisible);
        }}
        className="absolute right-4 text-white header-element transition"
      >
        {isVisible ? (
          <p className="text-2xl">x</p>
        ) : (
          <img src={searchIcon} alt="search" width="24" height="24" />
        )}
      </button>
    </header>
  );
}
