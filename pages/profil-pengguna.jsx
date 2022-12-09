import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import { useRouter } from "next/router";
import { useContext } from "react";
import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { clearTokenCookie } from "../app/cookies";
import { noWhiteSpace, onlyAlphabet } from "../app/utlis";
import Layout from "../components/Layout/Layout";
import ConfirmModal from "../components/Shared/ConfirmModal";
import InputPhone from "../components/Shared/InputPhone";
import { setAuthenticate } from "../services/auth.slice";
import {
  profileApi,
  useProfileQuery,
  useUpdateProfileMutation,
} from "../services/profile.service";
import { setUser } from "../services/user.slice";
import { InputChangeContext } from "./_app";
import { setCookie, getCookie, deleteCookie, hasCookie } from "cookies-next";

onlyAlphabet(yup);
noWhiteSpace(yup);

const schema = yup.object({
  phone: yup
    .number()
    .positive("Nomor Telepon tidak valid")
    .required("Nomor Telepon harus diisi")
    .typeError("Nomor Telepon tidak valid"),
  name: yup
    .string()
    .noWhiteSpace("Nama Pengguna Harus Diisi")
    .onlyAlphabet("Nama Pengguna Hanya Boleh Dalam Alfabet")
    .required("Nama Pengguna harus diisi"),
});
export default function ProfilPengguna() {
  const [isReset, setIsReset] = useState(false);
  const [isLogout, setIsLogout] = useState(false);
  let { inputChange, setInputChange } = useContext(InputChangeContext);

  const [updateProfile, updateData] = useUpdateProfileMutation();
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [isChanged, setIsChanged] = useState(false);
  let { user } = useSelector((state) => state?.userSlice);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if(router.query?.inputChange === 'true'){
      setIsLogout(true)
    }else{
      setValue("name", user?.name);
    }
    
  },[router.query])


  useEffect(() => {
    setValue("name", user?.name);
    setValue("phone", user?.phone);

    return () => {};
  }, [user]);

  useEffect(() => {
    setUpdateSuccess(updateData.isSuccess);
    setValue("user", user?.name);
    setCookie("input-pengguna", false);
    if (updateData.data) {
      let temp = {
        name: updateData?.data?.data?.name,
      };
      
      dispatch(setUser({ ...user, ...temp }));
    }

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
    if (userName !== user?.name) {
      setInputChange(true);
      setCookie("input-pengguna", true);
    } else {
      setInputChange(false);
      setCookie("input-pengguna", false);
    }
    return () => {};
  }, [userName]);

  const handleForm = async ({ name }) => {
    await updateProfile({ name: name.trim() });
    setInputChange(false);
  };

  const handleLogout = () => {
    // clearTokenCookie();
    // dispatch(setUser({}));
    // dispatch(setAuthenticate({}));
    // dispatch(profileApi.util.resetApiState());
    // setTimeout(() => router.replace("/"), 300);
    router.push(getCookie('visited-link'))
    setCookie("input-pengguna", false);
  };

  return (
    <>
      <form onSubmit={handleSubmit(handleForm)}>
        <div className="max-w-md mx-auto mt-12 px-10 relative">
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
              className="keyta-button rounded-xl w-12 text-xs opacity-80 mt-3 mx-auto cursor-pointer absolute bottom-12 left-0 right-0 m-auto"
              onClick={() => setUpdateSuccess(false)}
            >
              Berhasil disimpan
            </div>
          )}

          <button
            className="keyta-button mt-14 rounded-xl w-full relative"
            disabled={updateData.isLoading}
          >
            Simpan
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={`${
                updateData.isLoading ? "absolute left-4 top-[10px]" : "hidden"
              }`}
            >
              <path
                opacity="0.5"
                d="M10 0C8.02219 0 6.08879 0.58649 4.4443 1.6853C2.79981 2.78412 1.51809 4.3459 0.761209 6.17317C0.00433284 8.00043 -0.193701 10.0111 0.192152 11.9509C0.578004 13.8907 1.53041 15.6725 2.92894 17.0711C4.32746 18.4696 6.10929 19.422 8.0491 19.8079C9.98891 20.1937 11.9996 19.9957 13.8268 19.2388C15.6541 18.4819 17.2159 17.2002 18.3147 15.5557C19.4135 13.9112 20 11.9778 20 10C20 8.68678 19.7413 7.38642 19.2388 6.17317C18.7363 4.95991 17.9997 3.85752 17.0711 2.92893C16.1425 2.00035 15.0401 1.26375 13.8268 0.761205C12.6136 0.258658 11.3132 0 10 0ZM10 18C8.41775 18 6.87104 17.5308 5.55544 16.6518C4.23985 15.7727 3.21447 14.5233 2.60897 13.0615C2.00347 11.5997 1.84504 9.99113 2.15372 8.43928C2.4624 6.88743 3.22433 5.46197 4.34315 4.34315C5.46197 3.22433 6.88743 2.4624 8.43928 2.15372C9.99113 1.84504 11.5997 2.00346 13.0615 2.60896C14.5233 3.21447 15.7727 4.23984 16.6518 5.55544C17.5308 6.87103 18 8.41775 18 10C18 12.1217 17.1572 14.1566 15.6569 15.6569C14.1566 17.1571 12.1217 18 10 18Z"
                fill="black"
              />
            </svg>
          </button>
        </div>
      </form>
      <ConfirmModal
        header={"Konfirmasi Keluar?"}
        message={
          "Anda memiliki perubahan yang belum disimpan. Apakah Anda ingin membatalkan perubahan?"
        }
        setShowModal={setIsLogout}
        showModal={isLogout}
        buttonText={""}
        handleConfirm={handleLogout}
      />
    </>
  );
}

ProfilPengguna.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
