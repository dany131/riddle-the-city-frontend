"use client";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { useEffect } from "react";
export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    document.querySelector("body")!.innerHTML += `  <script>
 !function(f,b,e,v,n,t,s)
 {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
 n.callMethod.apply(n,arguments):n.queue.push(arguments)};
 if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
 n.queue=[];t=b.createElement(e);t.async=!0;
 t.src=v;s=b.getElementsByTagName(e)[0];
 s.parentNode.insertBefore(t,s)}(window, document,'script',
 'https://connect.facebook.net/en_US/fbevents.js');
 fbq('init', '253120523205365');
 fbq('track', 'PageView');
</script>
<noscript>
<img height="1" width="1" style="display:none"
      src="https://www.facebook.com/tr?id=253120523205365&ev=PageView&noscript=1"/>
</noscript>`;
  }, []);
  return (
    <>
      <div className="bg-[#160704] text-white overflow-x-hidden">
        <Navbar />
        {children}
        <Footer />
      </div>
    </>
  );
}
