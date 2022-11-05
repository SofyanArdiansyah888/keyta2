import { useState } from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
  Checkbox,
} from "@material-tailwind/react";
export default function KategoriModal({
  header,
  message,
  setShowModal,
  showModal,
  buttonText,
  handleButton,
}) {
  const [open, setOpen] = useState(0);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };
  const accordions = [
    'Art & Craft',
    'Elektronik',
    'Fashion',
    'Ibu & Bayi',
    'Jasa',
    'Makanan',
    'Minuman',
    'Perawatan & Kecantikan'
  ]
  return (
    <>
      {showModal && (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-[400px] my-6 mx-auto min-w-md">
              {/*content*/}
              <div className="border-0 rounded-2xl shadow-lg relative flex flex-col bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 rounded-t">
                  <h3 className="text-xl font-bold">{header}</h3>
                  <button
                    className="p-1 ml-auto border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold "
                    onClick={() => setShowModal(false)}
                  >
                    <span className="text-black h-12 w-12 text-2xl block">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative px-6 pb-12 overflow-y-scroll max-h-[350px]">
                  <>
                    {accordions.map((value,index) => <><Accordion
                      open={open === index}
                      icon={<Icon id={index} open={open} />}
                    >
                      <AccordionHeader
                        className="text-md font-semibold"
                        onClick={() => handleOpen(index)}
                      >
                        {value}
                      </AccordionHeader>
                      <AccordionBody className="flex flex-col">
                        <Checkbox color="blue" defaultChecked label="hampers" />
                        <Checkbox color="blue" defaultChecked label="hampers" />
                        <Checkbox color="blue" defaultChecked label="hampers" />
                      </AccordionBody>
                    </Accordion></> )}
                   
                  </>
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

function Icon({ id, open }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`${
        id === open ? "rotate-180" : ""
      } h-5 w-5 transition-transform`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}
