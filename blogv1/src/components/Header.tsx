
import Image from 'next/image';
import Link from  'next/link';
import logoDark from '../../public/images/logoDark.png';

const Header = () => {
  return (
    // req replace bgred-300 with bg-white
    <div className='bg-red-200 w-full h-20 border-b-[10px] border-b-black font-titleFont sticky top-0  z-50 px-4'>
        <div className='bg-green-200 max-w-7xl h-full mx-auto flex justify-between items-center'>
                <Link href='/'>
                    <div>
                        <Image width={80} height={80} src={logoDark} alt='logoDark'/>
                    </div>
                </Link>
                <ul className='hidden lg:inline-flex gap-8 uppercase text-sm font-semibold'>
                    <li className="headerLi">Home</li>
                    <li className="headerLi">Posts</li>
                    <li className="headerLi">Pages</li>
                    <li className="headerLi">Features</li>
                    <li className="headerLi">Contact</li>
                </ul>
        </div>

        <div className='flex items-center gap-8 text-lg'>
            <div className='flex items-center gap-1'>
                <img className='w-8 h-8 rounded-full' src='https://scontent.fktm10-1.fna.fbcdn.net/v/t1.6435-9/120236694_4333148533422753_9036450851618163013_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=8r9wTsA5wugAX_ng-SS&_nc_ht=scontent.fktm10-1.fna&oh=00_AfAeJNswWIE851yslga44Xcb3OckUgd4zWq6SpvadCyAeg&oe=64912756' alt='logo'/>
                <p className='text-sm font-medium'>Dear Readers!</p>
            </div>
            
            <button className='uppercase text-sm border-[1px] border-primaryColor hover:border-secondaryColor px-4 py-1 font-semibold hover:text-white rounded-md hover:bg-secondaryColor transition-all duration-300 active:bg-yellow-600'>
                Sign In
            </button>

        </div>

        
        
    </div>
  )
}

export default Header
