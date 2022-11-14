import { COUNTRY_CODE } from "../../app/constant";
import Image from "next/image";
export default function InputText({
  isReset,
  setIsReset,
  register,
  errorMessage,
  reset,
  disabled = false,
  setValue = null,
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
          onChange={(event) => {
            event.target.value === "" && setIsReset(false);
            !isReset && setIsReset(true);
          }}
          className={`p-2  text-xs w-full  material-input  `}
          placeholder={placeholder}
        />
        {isReset && (
          <div
            className="absolute top-2 right-0"
            onClick={() => {
              reset({
                [`${name}`]: "",
              });
              setIsReset(false);
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

        {errorMessage !== "" && (
          <a className="text-keytaCarnelian font-[600] block text-xs mt-1 ">
            {errorMessage}
          </a>
        )}
      </div>
    </>
  );
}
