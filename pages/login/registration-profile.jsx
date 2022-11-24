/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useSelector } from "react-redux";
import * as yup from "yup";
import { setTokenCookie } from "../../app/cookies";
import { disableBack, noWhiteSpace, onlyAlphabet } from "../../app/utlis";
import MaskotScreen from "../../components/Shared/MaskotScreen";
import {
  useCheckReferalMutation,
  useCreateShopMutation,
} from "../../services/shop.service";
import styles from "../../styles/Login.module.css";

onlyAlphabet(yup);
noWhiteSpace(yup);
const schema = yup
  .object({
    user: yup
      .string()
      .required("Nama Pengguna Harus Diisi")
      .noWhiteSpace("Nama Pengguna Harus Diisi")
      .onlyAlphabet("Nama Pengguna Hanya Boleh Dalam Alfabet"),
    shop: yup
      .string()
      .min(4, "Nama Toko minimal 4 karakter")
      .noWhiteSpace("Nama Toko harus diisi")
      .required("Nama Toko Harus Diisi"),
    referrer: yup.string().nullable(true),
  })
  .required();

export default function RegistrationProfile() {
  const [userReset, setUserReset] = useState(false);
  const [shopReset, setShopReset] = useState(false);
  const [refererReset, setRefererReset] = useState(false);
  const [isReferer, setIsReferer] = useState(false);
  const router = useRouter();

  const [createShop, { data, isSuccess, isLoading }] = useCreateShopMutation();
  const [checkReferal,{isLoading:referalLoading}] = useCheckReferalMutation();

  let authenticate = useSelector((state) => state.authSlice?.authenticate);

  useEffect(() => {
    disableBack();
  }, []);

  useEffect(() => {
    if (isSuccess && data) {
      setTokenCookie(authenticate.token);
      router.push("registration-success");
    }
    return () => {};
  }, [isSuccess]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
    setError,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const user = useWatch({ control, name: "user" });
  useEffect(() => {
    user === "" && setUserReset(false);
    !userReset && setUserReset(true);
    return () => {};
  }, [user]);

  const shop = useWatch({
    control,
    name: "shop",
  });
  useEffect(() => {
    shop === "" && setShopReset(false);
    !shopReset && setShopReset(true);
    return () => {};
  }, [shop]);


  const handleCreate = async ({ user, referrer, shop }) => {
    if (isReferer) {
      if(referrer.trim() === ""){
        setError("referrer", {
          message: "Kode Referal Harus Diisi",
        });
        return
      }

      let result = await checkReferal({ referrer });
      if (result?.data?.meta?.status === 404)
        setError("referrer", {
          message: "Kode Tidak Valid",
        });
      return;
    }

    let temp = {
      name: shop,
      referrer,
      user_attributes: {
        id: authenticate?.user?.id,
        name: user,
      },
      token: authenticate?.token,
    };

    Object.keys(temp).forEach((key) => {
      if (temp[key] === undefined) {
        delete temp[key];
      }
    });

    createShop(temp);
  };
  return (
    <>
      <MaskotScreen />
      <div className={styles.right_content}>
        <div className={styles.right_content_inner}>
          <Image src="/images/keyta.svg" height="30" width="117" alt="Logo" />
          <h1>Masukkan Data Profil</h1>
          <form onSubmit={handleSubmit(handleCreate)}>
            {/* INPUT USER */}
            <div className="mt-12">
              <label className="font-[600] text-[13px] ">Nama Pengguna</label>
              <div className="relative w-max">
                <div className="absolute top-3">
                  <Image
                    src="/icons/Icon_user.svg"
                    height="22"
                    width="22"
                    alt="Logo"
                  />
                </div>

                <input
                  type="text"
                  {...register("user")}
                  className="py-4 pl-8  text-xs w-[260px] lg:w-[300px] material-input"
                  placeholder="Masukkan Nama Pengguna"
                  // onChange={(event) => {
                  //     event.target.value === "" && setUserReset(false);
                  //     !userReset && setUserReset(true);
                  // }}
                />
                {errors.user?.message && (
                  <a className="text-keytaCarnelian font-[500] block text-xs mt-1 ">
                    {errors.user?.message}
                  </a>
                )}
                {userReset && (
                  <div
                    className="absolute top-4 right-1"
                    onClick={() => {
                      reset({ user: "" });
                      setUserReset(false);
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

            {/* INPUT TOKO */}
            <div className="mt-2">
              <label className="font-[600] text-[13px] ">Nama Toko</label>
              <div className="relative w-max">
                <div className="absolute top-3">
                  <Image
                    src="/icons/Icon_store.svg"
                    height="22"
                    width="22"
                    alt="Logo"
                  />
                </div>
                <input
                  type="text"
                  {...register("shop")}
                  className="py-4 pl-8  text-xs w-[260px] lg:w-[300px] material-input"
                  placeholder="Masukkan Nama Toko"
                  // onChange={(event) => {
                  //   event.target.value === "" && setShopReset(false);
                  //   !shopReset && setShopReset(true);
                  // }}
                />
                {errors.shop?.message && (
                  <a className="text-keytaCarnelian font-[500] block text-xs mt-1 ">
                    {errors.shop?.message}
                  </a>
                )}

                {shopReset && (
                  <div
                    className="absolute top-4 right-1"
                    onClick={() => {
                      reset({ shop: "" });
                      setShopReset(false);
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

            <div className="w-max  mt-8">
              <div className="float-right">
                <Image src="/images/maskot_group.svg" height="60" width="131" />
              </div>
              <div className="clear-both rounded-md p-4 bg-[#F1F2F5]">
                <div>
                  <h4 className="font-[600]">Punya Kode Komunitas?</h4>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      className="w-4 h-4 accent-keytaPrimary "
                      onChange={(event) => {
                        event.target.checked
                          ? setIsReferer(true)
                          : setIsReferer(false);
                      }}
                    />
                    <label
                      htmlFor="link-checkbox"
                      className="ml-2 my-1 text-[11px] font-medium text-gray-900 dark:text-gray-300"
                    >
                      Masukkan kode yang terdaftar pada komunitas Anda
                    </label>
                  </div>
                </div>
                {isReferer && (
                  <div className="mt-2">
                    <div className="relative w-max">
                      <input
                        type="text"
                        {...register("referrer")}
                        className="py-4  text-xs w-[260px] lg:w-[300px] material-input"
                        placeholder="FOKUSKEYTA"
                        onChange={(event) => {
                          event.target.value === "" && setRefererReset(false);
                          !refererReset && setRefererReset(true);
                        }}
                      />
                      {errors.referrer?.message && (
                        <a className="text-keytaCarnelian font-[500] block text-xs mt-1 ">
                          {errors.referrer?.message}
                        </a>
                      )}
                      {refererReset && (
                        <div
                          className="absolute top-4 right-1"
                          onClick={() => {
                            reset({ referrer: "" });
                            setRefererReset(false);
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
                )}
              </div>
            </div>

            <button
              className="keyta-button mt-12  relative"
              disabled={isLoading || referalLoading}
            >
              Simpan
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={`${
                  isLoading || referalLoading ? "absolute left-4 top-[10px]" : "hidden"
                }`}
              >
                <path
                  opacity="0.5"
                  d="M10 0C8.02219 0 6.08879 0.58649 4.4443 1.6853C2.79981 2.78412 1.51809 4.3459 0.761209 6.17317C0.00433284 8.00043 -0.193701 10.0111 0.192152 11.9509C0.578004 13.8907 1.53041 15.6725 2.92894 17.0711C4.32746 18.4696 6.10929 19.422 8.0491 19.8079C9.98891 20.1937 11.9996 19.9957 13.8268 19.2388C15.6541 18.4819 17.2159 17.2002 18.3147 15.5557C19.4135 13.9112 20 11.9778 20 10C20 8.68678 19.7413 7.38642 19.2388 6.17317C18.7363 4.95991 17.9997 3.85752 17.0711 2.92893C16.1425 2.00035 15.0401 1.26375 13.8268 0.761205C12.6136 0.258658 11.3132 0 10 0ZM10 18C8.41775 18 6.87104 17.5308 5.55544 16.6518C4.23985 15.7727 3.21447 14.5233 2.60897 13.0615C2.00347 11.5997 1.84504 9.99113 2.15372 8.43928C2.4624 6.88743 3.22433 5.46197 4.34315 4.34315C5.46197 3.22433 6.88743 2.4624 8.43928 2.15372C9.99113 1.84504 11.5997 2.00346 13.0615 2.60896C14.5233 3.21447 15.7727 4.23984 16.6518 5.55544C17.5308 6.87103 18 8.41775 18 10C18 12.1217 17.1572 14.1566 15.6569 15.6569C14.1566 17.1571 12.1217 18 10 18Z"
                  fill="black"
                />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
