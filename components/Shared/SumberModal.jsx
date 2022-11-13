import { useState } from "react";
import { Radio } from "@material-tailwind/react";
import Image from "next/image";
export default function SumberModal({
  setShowModal,
  showModal,
  setProfilValue,
}) {
  const [value, setValue] = useState();
  const [otherValue, setOtherValue] = useState();
  const handleButton = () => {
    setShowModal(false);
    if (value === "Other") setProfilValue('sumber',otherValue);
    else setProfilValue('sumber',value);
  };

  const handleChange = (event) => {
    setValue(event.currentTarget.value);
    if (event.currentTarget.value !== "Other") {
      setOtherValue("");
    }
  };
  const handleInputChange = (event) => {
    if (value === "Other") {
      setOtherValue(event?.target?.value);
    }
  };
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
                  <h3 className="text-xl font-bold">Anda Belum Isi Data</h3>
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
                  <div className="flex flex-col text-slate-500 text-md leading-relaxed px-5 pt-8 ">
                    <div class="flex items-center mb-4">
                      <input
                        id="sumber-1"
                        type="radio"
                        name="sumber"
                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                        value="Google Playstore"
                        onChange={handleChange}
                        checked={value === "Google Playstore"}
                      />
                      <label
                        for="sumber-1"
                        class="ml-2 text-sm font-medium text-gray-700 "
                      >
                        Google Playstore
                      </label>
                    </div>

                    <div class="flex items-center mb-4">
                      <input
                        id="sumber-2"
                        type="radio"
                        name="sumber"
                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 "
                        value="Media Sosial"
                        onChange={handleChange}
                        checked={value === "Media Sosial"}
                      />
                      <label
                        for="sumber-2"
                        class="ml-2 text-sm font-medium text-gray-700 "
                      >
                        Media Sosial
                      </label>
                    </div>

                    <div class="flex items-center mb-4">
                      <input
                        id="sumber-3"
                        type="radio"
                        name="sumber"
                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 "
                        value="Referal"
                        onChange={handleChange}
                        checked={value === "Referal"}
                      />
                      <label
                        for="sumber-3"
                        class="ml-2 text-sm font-medium text-gray-700 "
                      >
                        Referal
                      </label>
                    </div>

                    <div class="flex items-center mb-4">
                      <input
                        id="sumber-4"
                        type="radio"
                        name="sumber"
                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 "
                        value="Iklan / Website"
                        onChange={handleChange}
                        checked={value === "Iklan / Website"}
                      />
                      <label
                        for="sumber-4"
                        class="ml-2 text-sm font-medium text-gray-700 "
                      >
                        Iklan / Website
                      </label>
                    </div>

                    <div class="flex items-center mb-4">
                      <input
                        id="sumber-5"
                        type="radio"
                        name="sumber"
                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 "
                        value="Other"
                        onChange={handleChange}
                        checked={value === "Other"}
                      />
                      <div className="relative w-full ml-3  ">
                        <input
                          type="text"
                          className={`p-2 pl-0  text-xs   material-input w-full  `}
                          placeholder="Sumber Lain"
                          onChange={handleInputChange}
                          value={otherValue}
                        />

                        {otherValue !== "" && (
                          <div
                            className="absolute top-2 right-0"
                            onClick={() => {
                              setOtherValue("");
                              // reset({ sumber_lain: "" });
                              // setIsReset(false);
                            }}
                          >
                            <Image
                              src="/icons/icon_close.svg"
                              height="18"
                              width="18"
                              alt="Logo"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                {/*footer*/}
                <div className="flex flex-row gap-6 items-center  p-5">
                  <button
                    className="flex-1 keyta-button  rounded-lg"
                    type="button"
                    onClick={handleButton}
                  >
                    Confirm
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
