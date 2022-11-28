import {
  Accordion, AccordionBody, AccordionHeader
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import * as yup from "yup";
import { useShopCategoryQuery } from "../../services/shop.service";
import InputSearch from "./InputSearch";

let myindex = 0;
const schema = yup
  .object({
    subcategories: yup.string().nullable(true),
  })
  .required();
export default function KategoriModal({
  setShowModal,
  showModal,
  setProfilValue,
  getValues,
}) {
  const [open, setOpen] = useState(0);
  const [accordions, setAccordions] = useState([]);
  const { data, isLoading, isSuccess, isFetching } = useShopCategoryQuery();
  const [isSearch, setIsSearch] = useState(false);
  const [search, setSearch] = useState("");
  const [isReset, setIsReset] = useState("");
  const [selectedSubcategories, setSelectedSubcategories] = useState([])
  
  useEffect(() => {
    let subcategories =  getValues('subcategory')
    if(subcategories){
      setSelectedSubcategories(subcategories.split(','))
    }
  },[getValues('subcategory')])

  useEffect(() => {
    if (data && isSuccess) {
      setAccordions(data?.category);
    }
    return () => {};
  }, [isFetching]);

  const filterData = () => {
    return accordions?.filter((item) => {
      let temp = item.subcategories.some((subcategory) => {
        return subcategory.subcategory
          .toLowerCase()
          .includes(search.toLowerCase());
      });
      return temp;
    });
  };

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  const handleCheckbox = (event, category) => {
    if(category.category !== getValues('category')){
      setSelectedSubcategories([])
    }
    
    setProfilValue('category',category.category)
    let value = event.target.value.trim();
    if(event.target.checked){
      setSelectedSubcategories(subcat => {
        let temp = [...new Set(subcat).add(value)]
        return temp
      })
    }else{
      let temp = selectedSubcategories.filter((item) => item.trim() !== value )
      setSelectedSubcategories(temp)
    }
    
  };

  const handleLanjut = () => {
    setProfilValue('subcategory',selectedSubcategories.toString())
    setShowModal(false);
  };

  return (
    <>
      {showModal && (
        <>
          <div className="justify-center  items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-[400px] my-6 mx-auto min-w-md ">
              {/*content*/}
              <div className="border-0 rounded-2xl shadow-lg relative flex flex-col bg-white outline-none focus:outline-none min-h-[400px]">
                {/*header*/}
                {isSearch && (
                  <div className=" py-5 px-5 rounded-t">
                    <InputSearch
                      setSearch={setSearch}
                      setIsSearch={setIsSearch}
                      placeholder="Cari Kategori..."
                    />
                  </div>
                )}
                {!isSearch && (
                  <div className="flex items-start justify-between py-5 pl-5 rounded-t">
                    <h3 className="text-xl font-bold">Pilih Kategori</h3>
                    <button
                      className=" ml-auto border-0 text-black float-right text-3xl leading-none font-semibold "
                      onClick={() => setIsSearch(true)}
                    >
                      <span className="text-black h-12 w-12 text-2xl block">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M10.2 15.6C7.22282 15.6 4.80002 13.1772 4.80002 10.2C4.80002 7.22282 7.22282 4.80002 10.2 4.80002C13.1772 4.80002 15.6 7.22282 15.6 10.2C15.6 13.1772 13.1772 15.6 10.2 15.6ZM21.2484 19.5516L16.4904 14.7936C17.4348 13.5024 18 11.9184 18 10.2C18 5.89922 14.5008 2.40002 10.2 2.40002C5.89922 2.40002 2.40002 5.89922 2.40002 10.2C2.40002 14.5008 5.89922 18 10.2 18C11.9184 18 13.5024 17.4348 14.7936 16.4904L19.5516 21.2484C19.7856 21.4824 20.0928 21.6 20.4 21.6C20.7072 21.6 21.0144 21.4824 21.2484 21.2484C21.7176 20.7792 21.7176 20.0208 21.2484 19.5516Z"
                            fill="#232C44"
                          />
                        </svg>
                      </span>
                    </button>
                  </div>
                )}
                {/*body*/}
                <div className="relative px-6 pb-12 overflow-y-scroll max-h-[350px]">
                  <>
                    {filterData()?.map((category, index) => (
                      <>
                        <Accordion
                          open={open === index}
                          icon={<Icon id={index} open={open} />}
                        >
                          <AccordionHeader
                            className="text-md font-semibold"
                            onClick={() => handleOpen(index)}
                          >
                            {category.category}
                          </AccordionHeader>
                          <AccordionBody className="flex flex-col">
                            {category.subcategories.map(
                              (subcategory, subcatIndex) => {
                                myindex++;

                                return (
                                  <div
                                    class="flex items-center mb-6 ml-4 font-roboto"
                                    key={`${myindex}${subcatIndex}`}
                                  >
                                    <input
                                      id={subcategory.subcategory}
                                      type="checkbox"
                                      value={subcategory.subcategory}
                                      onChange={(e) =>
                                        handleCheckbox(e, category)
                                      }
                                      checked={selectedSubcategories.some((temp) => temp.trim() === subcategory.subcategory.trim() )}
                                      class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-100 accent-keytaPrimary "
                                    />
                                    <label
                                      htmlFor={subcategory.subcategory}
                                      class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                    >
                                      {subcategory.subcategory}
                                    </label>
                                  </div>
                                );
                              }
                            )}
                          </AccordionBody>
                        </Accordion>
                      </>
                    ))}
                  </>
                </div>
                {/*footer*/}
                <div className="flex flex-row gap-6 items-center mx-5  py-2">
                  <button
                    className="flex-1 keyta-button  rounded-lg"
                    type="button"
                    onClick={handleLanjut}
                  >
                    Lanjut
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      )}
    </>
  );
}

function Icon({ id, open }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`${
        id === open ? "rotate-180" : ""
      } h-5 w-5 transition-transform`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}
