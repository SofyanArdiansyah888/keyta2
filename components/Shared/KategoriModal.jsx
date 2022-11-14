import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
  Checkbox,
} from "@material-tailwind/react";
import { useShopCategoryQuery } from "../../services/shop.service";
export default function KategoriModal({
  setShowModal,
  showModal,
  setProfilValue,
  getValues,
}) {
  const [open, setOpen] = useState(0);
  const [accordions, setAccordions] = useState([]);
  const { data, isLoading, isSuccess } = useShopCategoryQuery();
  const [selectedSubCategory, setSelectedSubcategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();

  useEffect(() => {
    if (data && isSuccess) {
      setAccordions(data?.category);
    }
    return () => {};
  }, [isSuccess]);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
    setSelectedSubcategory([])
    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
      checkbox.checked = false;
    });
  };

  const handleCheckbox = (event, category) => {
    if (event.target.checked) {
      setSelectedCategory(category.category)
      setSelectedSubcategory((subcat) => [...subcat, {
        category: category.category,
        subcategory: event.target.value
      }]);
      // setProfilValue("subcategory", result.toString());
    }
    // console.log(result);
  };

  const handleLanjut = () => {
    setProfilValue('category',selectedCategory)
    let temp = selectedSubCategory.filter((item) => item.category === selectedCategory )
    temp = temp.map(item => item.subcategory)
    if(temp.length === 0) {
      setProfilValue('category','')
      setProfilValue('subcategory','')
    }else{
      setProfilValue('subcategory',temp.toString())
    }
    setShowModal(false);
  };

  return (
    <>
      {showModal && (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-[400px] my-6 mx-auto min-w-md">
              {/*content*/}
              <div className="border-0 rounded-2xl shadow-lg relative flex flex-col bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 rounded-t">
                  <h3 className="text-xl font-bold">Pilih Kategori</h3>
                  <button
                    className="p-1 ml-auto border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold "
                    onClick={() => setShowModal(false)}
                  >
                    <span className="text-black h-12 w-12 text-2xl block">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative px-6 pb-12 overflow-y-scroll max-h-[350px]">
                  <>
                    {accordions.map((category, index) => (
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
                            {category.subcategories.map((subcategory) => (
                              <>
                                <div class="flex items-center mb-6 ml-4 font-roboto">
                                  <input
                                    id="default-checkbox"
                                    type="checkbox"
                                    value={subcategory.subcategory}
                                    onChange={(e) =>
                                      handleCheckbox(e, category)
                                    }
                                    class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-100 accent-keytaPrimary "
                                  />
                                  <label
                                    for="default-checkbox"
                                    class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                  >
                                    {subcategory.subcategory}
                                  </label>
                                </div>
                              </>
                              // <Checkbox
                              //   key={subcategory.id}
                              //   color="blue"
                              //   value={subcategory.subcategory}
                              //   label={subcategory.subcategory}
                              // />
                            ))}
                          </AccordionBody>
                        </Accordion>
                      </>
                    ))}
                  </>
                </div>
                {/*footer*/}
                <div className="flex flex-row gap-6 items-center  p-5">
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
