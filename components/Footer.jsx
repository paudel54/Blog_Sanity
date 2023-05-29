import Image from "next/image";
import logoLight from "../public/images/logoLight.png";
import Link from "next/link";
import {
  BsFacebook,
  BsTwitter,
  BsYoutube,
  BsLinkedin,
  BsGithub,
} from "react-icons/bs";
import { AiOutlineCopyrightCircle } from "react-icons/ai";

const Footer = () => {
  return (
    <div id="footer" className="w-full py-10 bg-bgColor text-white/80 px-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-4 justify-center items-center md:justify-between">
        <div className="flex flex-col md:flex-row items-center gap-3">
          <Image src={logoLight} width={80} height={80} alt="logo" />
          <p className="flex items-center text-sm font-titleFont gap-1">
            <AiOutlineCopyrightCircle className="mt-[1px]" />
            thakurPaudel || all rights reserved @2023
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="text-center">
            Email: thakurgnha@gmail.com
            <div className="text-center">Contact: 9851201715</div>
          </div>
          <div className="flex flex-col gap-3 md:gap-6 items-center justify-center md:flex-row">
            <div>
              <Link
                target="_blank"
                href="https://www.facebook.com/thakur.paudel.94"
              >
                <BsFacebook className="w-6 h-6 text-white/50 hover:text-white duration-300 cursor-pointer" />
              </Link>
            </div>
            <BsYoutube className="w-6 h-6 text-white/50 hover:text-white duration-300 cursor-pointer" />
          </div>
          {/* <BsGithub className="w-6 h-6 text-white/50 hover:text-white duration-300 cursor-pointer" />
          <BsLinkedin className="w-6 h-6 text-white/50 hover:text-white duration-300 cursor-pointer" />
          <BsTwitter className="w-6 h-6 text-white/50 hover:text-white duration-300 cursor-pointer" /> */}
        </div>
      </div>
    </div>
  );
};

export default Footer;
