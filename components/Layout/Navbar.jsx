import { useRouter } from "next/router";
export default function Navbar() {
  const { pathname } = useRouter();
  const getMenuName = () => {
    const result = pathname.split('/');
    if(result.length > 0){
      return result[result.length - 1].replace('-',' ')
    }
    return "Dashboard";
  };
  return (
    <>
      <nav class="pl-8 flex flex-row items-center justify-evenly bg-white  w-full h-16  m-0  shadow-lg ">
        <div class=" container flex flex-wrap justify-between items-center mx-auto">
          <span class="text-xl font-semibold capitalize ">{getMenuName()}</span>
          <div class="flex items-center md:order-2">
            <button
              type="button"
              data-dropdown-toggle="language-dropdown-menu"
              class="inline-flex justify-center items-center p-2 text-sm text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              English (US)
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}
