import { RiArrowDropDownLine } from "react-icons/ri"

const SingleMessage = () => {
  return (
    <main className="bg-slate-700 flex px-2 h-10 rounded-md w-1/2 gap-3">
        <h1 className="self-center">Hello how r u?</h1>
        <section className=" ml-auto">
            <h1 className="text-[12px] break-all line-clamp-3 text-neutral-400 ml-auto mt-auto">
                12:12
            </h1>
            <RiArrowDropDownLine className="text-xl ml-auto cursor-pointer"/>
        </section>
    </main>
  )
}

export default SingleMessage