'use client'
import { BsX } from 'react-icons/bs';
import Portal from '@/lib/HOC/Portal';
import Button from './Button';
import { useEffect } from 'react';

interface ModalProps {
    title: string,
    onConform: () => void,
    value: string,
    setValue: (value: string) => void,
    setOpenDialog: (arg0: boolean) => void,
    loading: boolean
}

const Modal: React.FC<ModalProps> = ({
    title,
    setOpenDialog,
    setValue,
    value,
    onConform,
    loading
}) => {

    useEffect(() => {
        const handleOutsideClick = (e: MouseEvent) => {
            if ((e.target as HTMLElement).id === "dialog") {
                setOpenDialog(false);
            }
        }

        document.addEventListener('click', handleOutsideClick);

        return () => {
            document.removeEventListener('click', handleOutsideClick);
        }
    }, [])

    return (
        <Portal>
            <main id="dialog" className='bg-opacity-50 flex fixed items-center justify-center w-screen h-screen'>
                <section id="inner-modal" className='flex flex-col gap-5  w-[20rem] p-5 bg-slate-300'>
                    <div className='flex justify-between'>
                        <h1 className='text-neutral-600 text-xl  '>{title}</h1>
                        <BsX
                            onClick={() => setOpenDialog(false)}
                            className='text-3xl cursor-pointer' />
                    </div>
                    <input
                        disabled={loading}
                        className='outline-none px-2 py-2 bg-slate-200 rounded-md'
                        onChange={(e) => setValue(e.target.value)}
                        value={value}
                        type="text" />

                    <Button
                        disabled={loading}
                        className='w-fit'
                        onClick={onConform}>
                        Submit
                    </Button>
                </section>
            </main>
        </Portal>

    )
}

export default Modal