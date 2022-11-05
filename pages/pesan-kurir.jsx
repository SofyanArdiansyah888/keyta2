/* eslint-disable @next/next/no-img-element */
import ComingSoonLayout from "../components/layout/ComingSoonLayout";

export default function PesanKurir() {
  return (
    <>

    </>
  );
}

PesanKurir.getLayout = function getLayout(page) {
  return (
    <ComingSoonLayout>
      {page}
    </ComingSoonLayout>
  )
}
