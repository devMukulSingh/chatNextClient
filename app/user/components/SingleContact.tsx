import Image from "next/image";

const SingleContact = () => {
    const image = 'https://lh3.googleusercontent.com/a/ACg8ocKpWZffOwLfdPRCRKfFYdW36Fnda6Zo_jKH3AOYWvf3FA=s360-c-no'
  return (
    <main className="w-full flex hover:bg-slate-800 rounded-lg gap-5 px-5 py-5 cursor-pointer shadow-slate-700 shadow-md">
        <figure className="relative size-10">
            <Image 
            src={image} 
            alt="profileimage" 
            fill 
            className="rounded-full"
            />
        </figure>
        <section>
        <h1 className="text-lg">
            Mukul singh bisht
        </h1>
        <h1 className="text-sm text-neutral-400">
            hey,hello how r you
        </h1>
        </section>
        <p className="ml-auto text-sm text-neutral-400">
            12:23
        </p>
        <p>

        </p>
    </main>
  )
}

export default SingleContact