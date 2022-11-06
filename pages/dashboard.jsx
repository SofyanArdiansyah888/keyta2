/* eslint-disable @next/next/no-img-element */
import ComingSoonLayout from "../components/Layout/ComingSoonLayout";


export default function Dashboard() {
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
