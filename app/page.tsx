import FAQPage from "@/components/FAQ";
import Footer from "@/components/Footer";
import { ScrollBody } from "@/components/ScrollBody";
import { StarknetProvider } from "@/components/StarknetProvider";
import Testimonials from "@/components/Testimonial";
import { HeroBody } from "@/components/hero";
import { NavbarDemo } from "@/components/navbar";
export default function Home() {
  return (
    <div className="scroll-smooth">
      <StarknetProvider>
        <NavbarDemo />
      <HeroBody />
      <ScrollBody />
      {/* <Lamp /> */}
      <div>
      <Testimonials />
      <FAQPage />
      <Footer />
      
      </div>
      </StarknetProvider>
    </div>
  );
}
// import Link from 'next/link'

// export default function Home() {
//   return (
//     <main className="min-h-screen bg-gray-100 flex items-center justify-center">
//       <div className="text-center">
//         <h1 className="text-4xl font-bold mb-8">FL Platform</h1>
//         <div className="space-x-4">
//           <Link href="/org" className="bg-blue-500 text-white px-4 py-2 rounded">
//             I am an Organization
//           </Link>
//           <Link href="/user" className="bg-green-500 text-white px-4 py-2 rounded">
//             I am a User
//           </Link>
//         </div>
//       </div>
//     </main>
//   )
// }