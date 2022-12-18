import { COUNTRY_CODE } from "../../app/constant";
import Image from "next/image";
import { useEffect } from "react";
export default function InputPhone({
  isReset,
  setIsReset,
  register,
  errors,
  reset,
  disabled = false,
  setValue = null,
  watch,
  setError,
  label = "Nomor Telepon",
  name="phone"
}) {
  const phone = watch(name);
  
  useEffect(() => {
    if (phone) {
      if (phone[0] === "0") {
        setValue(name, `${phone.substring(1)}`);
      }
      if (phone[0] !== "8") {
        setError(name, {
          message: "Nomor tidak valid",
        });
      }else{
        setError(name,{message:""})
      }
    } 
    
    phone !== "" && setIsReset(true);
    // (!isReset) && setIsReset(true);
  }, [phone]);
  return (
    <>
      <label className="font-[600] text-[14px] ">Nomor Telepon</label>
      <div className="relative">
        <span className="text-[11px] bg-[#F1F2F5] border-[#CED2D9] rounded-[4px]  absolute left-0 top-3 p-1  ">
          +{COUNTRY_CODE}
        </span>
        <input
          type="number"
          disabled={disabled}
          {...register}
          className={`p-2 mt-2  ml-8 text-xs w-[93%] material-input  `}
          placeholder="Masukkan Nomor Telepon"
        />
        {isReset && (
          <div
            className="absolute top-3 right-0"
            onClick={() => {
              setValue(name, '')
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

        {errors.phone?.message && (
          <a className="text-keytaCarnelian font-[600] block text-xs mt-1 ml-8">
            {errors.phone?.message}
          </a>
        )}

{errors.inv_phone?.message && (
          <a className="text-keytaCarnelian font-[600] block text-xs mt-1 ml-8">
            {errors.inv_phone?.message}
          </a>
        )}
      </div>
    </>
  );
}
