import Image from "next/image";
import Link from "next/link";
import logoDark from "../public/images/logoDark.png";
import { useSession, signIn, signOut } from "next-auth/react";

const Header = () => {
  // session created under pages _app.tsx
  const { data: session } = useSession();
  console.log(session);
  return (
    <div className="w-full h-20 border-b-[1px] border-b-black font-titleFont sticky top-0 bg-white z-50 px-4">
      <div className="max-w-7xl h-full mx-auto flex justify-between items-center">
        <Link href="/">
          <div>
            <Image width={80} height={80} src={logoDark} alt="logoDark" />
          </div>
        </Link>
        <div>
          <ul className="hidden lg:inline-flex gap-8 uppercase text-sm font-semibold">
            <Link href="/">
              <li className="headerLi">Home</li>
            </Link>
            <li className="headerLi" id="#post">
              <a href="#post"> Posts</a>
            </li>
            <li className="headerLi" id="#pages">
              Pages
            </li>
            {/* <li className="headerLi" id="#features">
              Features
            </li> */}
            <li className="headerLi">
              <a href="#footer">Contact</a>
            </li>
          </ul>
        </div>
        <div className="flex items-center gap-8 text-lg">
          <div className="flex items-center gap-1">
            <img
              className="w-8 h-8 rounded-full"
              alt="logo"
              src={
                session
                  ? session?.user!.image!
                  : // : "https://cdn-icons-png.flaticon.com/512/234/234635.png"
                    "https://scontent.fktm10-1.fna.fbcdn.net/v/t1.6435-9/120236694_4333148533422753_9036450851618163013_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=UPVeHy3NAy4AX_TMzHJ&_nc_ht=scontent.fktm10-1.fna&oh=00_AfD7oZx-y46sBzBS7XjV_NtYo0Eiephsi4e4Bg17wXcTLA&oe=6496DDD6"
              }
            />
            <p className="text-sm font-medium">
              {session ? session?.user!.name : "Hello Everyone!"}
            </p>
          </div>

          {session ? (
            <button
              onClick={() => signOut()}
              className="uppercase text-sm border-[1px] border-primaryColor hover:border-secondaryColor px-4 py-1 font-semibold hover:text-white rounded-md hover:bg-secondaryColor transition-all duration-300 active:bg-yellow-600"
            >
              Sign Out
            </button>
          ) : (
            <button
              onClick={() => signIn()}
              className="uppercase text-sm border-[1px] border-primaryColor hover:border-secondaryColor px-4 py-1 font-semibold hover:text-white rounded-md hover:bg-secondaryColor transition-all duration-300 active:bg-yellow-600"
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
