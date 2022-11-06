import { COUNTRY_CODE } from "../../app/constant";
import Image from "next/image";
export default function InputPhone({
  isReset,
  setIsReset,
  register,
  errors,
  reset,
  label = "Nomor Telepon",
}) {
  return (
    <>
      <label className="font-[600] text-[14px] ">Nomor Telepon</label>
      <div className="relative">
        <span className="text-[11px] bg-[#F1F2F5] border-[#CED2D9] rounded-[4px]  absolute left-0 top-3 p-1  ">
          +{COUNTRY_CODE}
        </span>
        <input
          type="number"
          {...register}
          onChange={(event) => {
            event.target.value === "" && setIsReset(false);
            !isReset && setIsReset(true);
          }}
          className={`p-2 mt-2  ml-8 text-xs w-[93%] material-input  `}
          placeholder="Masukkan Nomor Telepon"
        />
        {isReset && (
          <div
            className="absolute top-3 right-0"
            onClick={() => {
              reset({ phone: "" });
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
        )}

        {errors.phone?.message && (
          <a className="text-keytaCarnelian font-[600] block text-xs mt-1 ml-6">
            {errors.phone?.message}
          </a>
        )}
      </div>
    </>
  );
}