import Image from "next/future/image";
import Layout from "../components/Layout/Layout";

export default function VideoTutorial() {
  return (
    <>
      {/* CONTENT */}
      <div className="w-full text-center">
        {/* GRID */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-8 font-roboto">
          {[1, 2, 3, 4].map(() => (
            <>
              <div>
                {[1, 2, 3, 4, 5].map(() => (
                  <>
                    <div className="h-auto text-left shadow-lg flex flex-col gap-3  mt-4 border-[1px] bg-white border-gray-200 rounded-xl px-4 py-6">
                      <div className="relative w-auto h-[100px] lg:h-[150px]">
                        <Image
                          src="/images/video_tutorial.svg"
                          className="text-center object-contain"
                          alt="Gambar video tutorial"
                          fill="true"
                          priority
                        ></Image>
                      </div>
                      <h2>Cara Menggunakan Invoice</h2>
                      <p className="text-xs  ">
                        Keyters sudah tau belum cara membuat template invoice
                        dengan Keyta?{" "}
                      </p>
                    </div>
                  </>
                ))}
              </div>
            </>
          ))}
        </div>
      </div>
    </>
  );
}

VideoTutorial.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
