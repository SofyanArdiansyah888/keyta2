import { COUNTRY_CODE } from "../../app/constant";
import Image from "next/image";
export default function InputSelect({
  register,
  errorMessage,
  modalOpen,
  setModalOpen,
  setValue,
  value,
  label = "",
  placeholder = "",
  name,
}) {
  return (
    <>
      <label className="font-[600] text-[14px] ">{label}</label>
      <div className="relative  ">
        <input
          type="text"
          {...register}
          readOnly
          className={`p-2  text-xs w-full  material-input   `}
          placeholder={placeholder}
          onClick={() => setModalOpen(true)}
        />

        <div className="absolute top-2 right-0">
          <Image
            src="/icons/arrow_down.svg"
            height="18"
            width="18"
            alt="Logo"
          />
        </div>

        {errorMessage !== "" && (
          <a className="text-keytaCarnelian font-[600] block text-xs mt-1 ">
            {errorMessage}
          </a>
        )}
      </div>
    </>
  );
}
