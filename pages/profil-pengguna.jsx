import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import Layout from "../components/Layout/Layout";
import InputPhone from "../components/Shared/InputPhone";
import {
  useProfileQuery,
  useUpdateProfileMutation,
} from "../services/profile.service";
import { setUser } from "../services/user.slice";

const schema = yup.object({
  phone: yup
    .number()
    .positive("Nomor Telepon tidak valid")
    .required("Nomor Telepon harus diisi")
    .typeError("Nomor Telepon tidak valid"),
  name: yup.string().required("Nama Pengguna harus diisi"),
});
export default function ProfilPengguna() {
  const [isOpen, setIsOpen] = useState(false);
  const [isReset, setIsReset] = useState(false);

  const [updateProfile, updateData] = useUpdateProfileMutation();
  const [updateSuccess, setUpdateSuccess] = useState(false);
  let { user } = useSelector((state) => state?.userSlice);

  useEffect(() => {
    setValue("name", user?.name);
    setValue("phone", user?.phone);
    return () => {};
  }, [user]);

  useEffect(() => {
    setUpdateSuccess(updateData.isSuccess);
    return () => {};
  }, [updateData.isSuccess]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    values,
    watch,
    setError,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const userName = watch("name");
  useEffect(() => {
    userName === "" && setIsReset(false);
    !isReset && setIsReset(true);
    return () => {};
  }, [userName]);

  const handleForm = ({ name }) => {
    if (/\d/.test(name)) {
      setError("name", {
        message: "Nama Pengguna hanya boleh dalam alfabet",
      });
    }

    if (name.trim() === "") {
      setError("name", {
        message: "Nama Pelanggan harus diisi",
      });
    }
    console.log(errors.name)
    // if (typeof errors.name != "undefined") 
    updateProfile({ name });
  };

  return (
    <>
      <form onSubmit={handleSubmit(handleForm)}>
        <div className="max-w-md mx-auto mt-12 px-10">
          {/* NAMA PENGGUNA  */}
          <div>
            <label className="font-[600] text-[14px] w-full ">
              Nama Pengguna
            </label>
            <div className="relative w-full ">
              <input
                type="text"
                {...register("name")}
                className={`p-2  text-xs w-full material-input  `}
                placeholder="Masukkan Nama Pengguna"
              />
              {errors.name?.message && (
                <a className="text-keytaCarnelian font-[600] block text-xs mt-1">
                  {errors.name?.message}
                </a>
              )}
              {isReset && (
                <div
                  className="absolute top-2 right-0"
                  onClick={() => {
                    reset({ name: "" });
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
            </div>
          </div>

          {/* NOMOR TELEPON  */}
          <div className="mt-4">
            <InputPhone
              isReset={false}
              setIsReset={setIsReset}
              register={register("phone")}
              errors={[]}
              reset={reset}
              disabled={true}
              watch={watch}
              setError={setError}
            />
          </div>

          {updateSuccess && (
            <div
              className="keyta-button rounded-xl w-12 text-xs opacity-80 mt-6 mx-auto"
              onClick={() => setUpdateSuccess(false)}
            >
              Berhasil disimpan
            </div>
          )}

          <button
            className="keyta-button mt-14 rounded-xl w-full"
            onClick={() => setIsOpen(true)}
          >
            Simpan
          </button>
        </div>
      </form>
    </>
  );
}

ProfilPengguna.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
