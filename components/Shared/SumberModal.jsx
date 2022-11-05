import { useState } from "react";
import { Radio } from "@material-tailwind/react";
import Image from "next/image";
export default function SumberModal({
  header,
  message,
  setShowModal,
  showModal,
  buttonText,
  handleButton,
}) {
  return (
    <>
      {showModal && (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-[350px] my-6 mx-auto max-w-sm">
              {/*content*/}
              <div className="border-0 rounded-2xl shadow-lg relative flex flex-col bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 rounded-t">
                  <h3 className="text-xl font-bold">{header}</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className=" px-6 pb-12 ">
                  <div className="flex flex-col text-slate-500 text-sm leading-relaxed">
                    <Radio id="html" name="type" label="Google Playstore" />
                    <Radio id="html" name="type" label="Media Sosial" />
                    <Radio id="html" name="type" label="Refferral" />
                    <Radio id="html" name="type" label=" Iklan / Website" />
                    <div className="flex flex-row">
                      <Radio
                        id="html"
                        name="type"
                        label=""
                        containerProps={() => (
                          <>
                            <button>test</button>
                          </>
                        )}
                      />
                      <div className="relative w-full  ">
                        <input
                          type="text"
                          //   {...register("alamat_toko")}
                          //   onChange={(event) => {
                          //     event.target.value === "" && setIsReset(false);
                          //     !isReset && setIsReset(true);
                          //   }}
                          className={`p-2 pl-0  text-xs   material-input w-full  `}
                          placeholder="Sumber Lain"
                        />
                        {/* ${
                  errors.alamat_toko?.message
                    ? "material-input-error"
                    : "material-input"
                } */}
                        <div
                          className="absolute top-2 right-0"
                          onClick={() => {
                            reset({ alamat_toko: "" });
                            setIsReset(false);
                          }}
                        >
                          <Image
                            src="/images/icon_close.svg"
                            height="18"
                            width="18"
                            alt="Logo"
                          />
                        </div>

                        {/* {errors.alamat_toko?.message && (
                      <a className="text-keytaCarnelian font-[600] block text-xs mt-1 ml-6">
                        {errors.alamat_toko?.message}
                      </a>
                    )} */}
                      </div>
                    </div>
                  </div>
                </div>
                {/*footer*/}
                <div className="flex flex-row gap-6 items-center  p-5">
                  <button
                    className="flex-1 keyta-button  rounded-lg"
                    type="button"
                    onClick={() => handleButton()}
                  >
                    {buttonText}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      )}
    </>
  );
}
