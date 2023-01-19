/* eslint-disable @next/next/no-img-element */
import { useEffect } from "react";
import { useContext } from "react";
import ComingSoonLayout from "../components/Layout/ComingSoonLayout";
import { InputChangeContext } from "./_app";


export default function Dashboard() {
  let { inputChange, setInputChange } = useContext(InputChangeContext);
  useEffect(() => {
    setInputChange(false);
    setCookie("inputpengguna", false);
  },[])
  return (
    <>
         
    </>
  );
}

Dashboard.getLayout = function getLayout(page) {
  return (
    <ComingSoonLayout>
      {page}
    </ComingSoonLayout>
  )
}
