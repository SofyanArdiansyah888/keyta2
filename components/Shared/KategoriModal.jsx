import { createContext, useContext, useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import * as yup from "yup";
import { useShopCategoryQuery } from "../../services/shop.service";
import InputSearch from "./InputSearch";
let myindex = 0;
const KategoriContext = createContext();
export default function KategoriModal({
  setShowModal,
  showModal,
  setProfilValue,
  getValues: getProfilValue,
}) {
  const [accordions, setAccordions] = useState([]);
  const { data, isLoading, isSuccess, isFetching } = useShopCategoryQuery();
  const [isSearch, setIsSearch] = useState(false);
  const [search, setSearch] = useState("");
  const [profileCategory, setProfileCategory] = useState([])

  const {
    control,
    register,
    handleSubmit,
    getValues,
    errors,
    reset,
    setValue,
    watch,
    trigger,
  } = useForm();
  let mywatch = watch("category");

  const { fields, append, remove, prepend, replace, handleChange } =
    useFieldArray({
      control,
      name: "category",
    });

  useEffect(() => {
    if (data && isSuccess) {
      let tempProfil = getProfilValue('category')
      if(tempProfil){
         setProfileCategory(JSON.parse(tempProfil))
      }else{
        setProfileCategory([])
      }
      
      let temp = data?.category?.map((cat) => {
        let subcat = cat?.subcategories?.map((subcat) => {
          let tempSubcat = {
            ...subcat,
            selected: false,
          };
          return tempSubcat;
        });
        
        subcat.push({
          name: "checkbox",
          selected: false,
          subcategory: "",
          category: cat.category,
        });

        return {
          ...cat,
          subcategories: [...subcat],
        };
      });
      

      setAccordions(temp);
    }
    return () => {};
  }, [isFetching,getProfilValue('category'), mywatch]);

  const filterData = () => {
    const temp = [...fields];
    let result = fields?.filter((item) => {
      let temp = item?.subcategories?.some((subcategory) => {
        return subcategory.name.toLowerCase().includes(search.toLowerCase());
      });
      return temp;
    });

    result = result.map((item) => {
      let tempSub = item?.subcategories.filter((subcategory) => {
        return subcategory.name
          .toLowerCase()
          .includes(search.toLocaleLowerCase());
      });
      return {
        ...item,
        subcategories: tempSub,
      };
    });

    return result;
  };

  const onSubmit = (data) => {
    let isError = false;
    let result = data.category.filter((item) => {
      let temp = item?.subcategories?.some((subcategory) => {
        return subcategory.selected;
      });
      return temp;
    });
    let subcategories = [];
    result = result.map((item) => {
      let tempSub = item?.subcategories.filter((subcategory) => {
        return subcategory.selected;
      });
      tempSub = tempSub.map((temp) => {
        if (temp.name == "") isError = true;
        return temp.name;
      });
      subcategories.push(tempSub.join(", "));
      return {
        category: item.name,
        subcategory: tempSub,
      };
    });

    if(!isError){
      setProfilValue(
        "category",
        JSON.stringify(result) 
      );
      setProfilValue("subcategory", subcategories.join(", "));
      setShowModal(false);
    }
  };

  return (
    <>
      {showModal && (
        <>
          <div className="justify-center  items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-[400px] my-6 mx-auto min-w-md ">
              {/*content*/}
              <div className="border-0 rounded-2xl shadow-lg relative flex flex-col bg-white outline-none focus:outline-none ">
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
                <form onSubmit={handleSubmit(onSubmit)}>
                  {/*body*/}
                  <div className="relative px-6 pb-4 overflow-y-scroll max-h-[350px] min-h-[350px]">
                    <>
                      <KategoriContext.Provider
                        value={{
                          accordions,
                          setAccordions,
                          mywatch,
                          handleChange,
                        }}
                      >
                        <AccordionCustom
                          filterData={filterData}
                          profileCategory={profileCategory}
                          search={search}
                          {...{
                            control,
                            register,
                            getValues,
                            setValue,
                            errors,
                            reset,
                            fields,
                            append,
                          }}
                        />
                      </KategoriContext.Provider>
                    </>
                  </div>
                  {/*footer*/}
                  <div className="flex flex-row gap-6 items-center mx-5  py-2">
                    <button
                      className="flex-1 keyta-button  rounded-lg"
                      type="submit"
                    >
                      Pilih
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      )}
    </>
  );
}

function AccordionCustom({
  filterData,
  search,
  control,
  register,
  setValue,
  getValues,
  reset,
  fields,
  append,
  profileCategory
}) {
  const [open, setOpen] = useState(0);
  const { accordions } = useContext(KategoriContext);
  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };
  
  useEffect(() => {
    reset();

    accordions.map(({ subcategories, category }) => {
      const tempSubcategories = subcategories.map(sub => sub.subcategory)
      const subcat = subcategories.map((sub) => {
        let selected = false;
        let name = sub.subcategory
        profileCategory.map((profCat) => {
          
          if(profCat.category === category ){
            if(profCat.subcategory.includes(sub.subcategory)){ 
              selected = true
            }
            profCat.subcategory.map((profSubcat) => {
              if(!tempSubcategories.includes(profSubcat) && sub.subcategory === ""){
                selected = true
                name = profSubcat
              }
            })
            
          }
        })
        
      
        return { name, selected, id: sub.id };
      });
      append({
        name: category,
        subcategories: subcat,
      });
    });
    return () => {};
  }, []);

  return (
    <>
      {filterData()?.map((category, index) => (
        <>
          <input
            className="border-2 border-gray-600"
            key={index}
            {...register(`category.${index}.name`)}
            type="hidden"
          />
          {filterData()?.length > 1 && (
            <h2 onClick={() => handleOpen(index)}>
              <button
                type="button"
                className="flex items-center justify-between w-full px-2 py-3 font-medium text-left  rounded-t-xl"
              >
                <span className="text-md font-semibold">{category?.name}</span>
                {search === '' && <Icon id={index} open={open}  />}
              </button>
            </h2>
          )}
          <div
            className={`${
              open === index || search !== "" ? "relative" : "hidden"
            } py-3 `}
          >
            <div className="flex flex-col ">
              {category?.subcategories?.map((subcategory, subcatIndex) => {
                myindex++;
                if (subcategory.id)
                  return (
                    <div
                      className="flex items-center mb-6 ml-4 font-roboto"
                      key={`${index}${subcatIndex}`}
                    >
                      <input
                        {...register(
                          `category.${index}.subcategories.${subcatIndex}.selected`
                        )}
                        type="checkbox"
                        // checked={subcategory.selected}
                        className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-100 accent-keytaPrimary "
                      />
                      <label
                        htmlFor={subcategory.name}
                        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        <Compo
                          key={`${index}${subcatIndex}`}
                          value={subcategory?.name}
                          higlight={search}
                        />
                      </label>
                    </div>
                  );
                else
                  return (
                    <div
                      key={`xxxx${myindex}${subcatIndex}`}
                      className="flex ml-4 font-roboto"
                    >
                      <KategoriLain
                        name={`category.${index}.subcategories.${subcatIndex}.selected`}
                        name2={`category.${index}.subcategories.${subcatIndex}.name`}
                        catName={category.name}
                        {...{
                          register,
                        }}
                      />
                    </div>
                  );
              })}
            </div>
          </div>
        </>
      ))}

      {filterData()?.length === 0 && (
        <div className="box font-semibold text-[#42454D] border-md h-[300px] text-center pt-[40%] ">
          Kategori Tidak Ditemukan
        </div>
      )}
    </>
  );
}

function KategoriLain({ name, name2, catName, register }) {
  const { mywatch, handleChange } = useContext(KategoriContext);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    mywatch.map((category) => {
      if (category.name == catName) {
        category.subcategories.map((subcat) => {
          if (subcat.name === "" && subcat.selected)
            setErrorMessage("Harus diisi");
          else setErrorMessage("");
        });
      }
    });
    return () => {};
  }, [mywatch]);

  return (
    <>
      <input
        type="checkbox"
        {...register(name)}
        className="mt-2 w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-100 accent-keytaPrimary "
      />
      <div className="w-full">
        <input
          type="text"
          {...register(name2)}
          onChange={(e) => {
            if (e.target.value !== "") {
              setErrorMessage("");
            } else {
              setErrorMessage("Harus diisi");
            }
          }}
          className={`p-2 ml-2  text-xs w-full  material-input  `}
          placeholder="Kategori Lain"
        />

        {errorMessage !== "" && (
          <a className="text-keytaCarnelian font-[600] block text-xs mt-1 ml-2 ">
            {errorMessage}
          </a>
        )}
      </div>
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

const Compo = ({ higlight, value }) => {
  return <p>{getHighlightedText(value, higlight)}</p>;
};

function getHighlightedText(text, higlight) {
  // Split text on higlight term, include term itself into parts, ignore case
  var parts = text.split(new RegExp(`(${higlight})`, "gi"));
  return parts.map((part, index) => (
    <>
      {part.toLowerCase() === higlight.toLowerCase() ? (
        <b style={{ color: "#F5B22D" }}>{part}</b>
      ) : (
        part
      )}
    </>
  ));
}
