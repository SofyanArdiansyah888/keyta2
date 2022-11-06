/* eslint-disable @next/next/no-img-element */
import Image from "next/image";

export default function MaskotScreen() {
  return (
    <>
      <div className="lg:w-1/2 hidden lg:block  fixed h-[100vh]  text-center  bg-orangeLighter pt-[110px]">
        <h1 className="font-poppins  text-keytaPrimary text-4xl font-[900]">
          #JualanOnlineLebihPraktis
        </h1>
        <div className="left-[30%] absolute bottom-0">
          <img
            className="mb-[-5px] static"
            height={300}
            width={300}
            src="../images/maskot.svg"
            alt="Maskot"
          />
        </div>
      </div>
    </>
  );
}
