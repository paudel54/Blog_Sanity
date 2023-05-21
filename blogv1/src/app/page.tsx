import Image from 'next/image'
import Header from '@/components/Header'
import Banner from '@/components/Banner'
import BannerBottom from '@/components/BannerBottom'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main>
    
    <Header/>
    {/* banner */}
    <Banner/>
    {/* banner ends */}
    <div>
    <BannerBottom/>
    </div>
    {/* Post */}
    <div>Posts will go here</div>
    {/* Footer */}
    <Footer/>
    </main>
  )
}


