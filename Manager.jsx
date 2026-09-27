import React from 'react'
import { useRef, useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
    const ref = useRef()
    const passwordRef = useRef()
    const [form, setForm] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setPasswordArray] = useState([])
    useEffect(() => {
        let passwords = localStorage.getItem("passwords")
        if (passwords) {
            setPasswordArray(JSON.parse(passwords))
        }
    }, [])

    const copyText = (text) => {
        toast('Copied to Clipboard', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
        navigator.clipboard.writeText(text)
    }


    const showPassword = () => {
        passwordRef.current.type = "text"
        if (ref.current.src.includes("/icons/eye2.svg")) {
            ref.current.src = "/icons/eye1.svg"
            passwordRef.current.type = "password"
        } else {
            ref.current.src = "/icons/eye2.svg"
            passwordRef.current.type = "text"
        }

    }
    const savePassword = () => {
        if(form.site.length >3 && form.username.length >3 && form.password.length >3){
        setPasswordArray([...passwordArray, {...form, id:uuidv4()}])
        localStorage.setItem("passwords", JSON.stringify([...passwordArray, {...form, id:uuidv4()}]))
        console.log([...passwordArray, form])
        setForm({ site: "", username: "", password: "" })
        toast('Password saved', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    }else{
         toast('Password not saved')
    }
    }
    const deletePassword = (id) => {
       console.log("Deleting with id",id)
       let c = confirm("Do you really want to delete this password?")
       if (c){
       setPasswordArray(passwordArray.filter(item=>item.id!==id))
       localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item=>item.id!==id)))
       toast('Password deleted', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
       }
    }
     const editPassword = (id) => {
       console.log("Editing with id",id)
       setForm(passwordArray.filter(i=>i.id===id)[0])
       setPasswordArray(passwordArray.filter(item=>item.id!==id))
    }
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }


    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"

            />
            <div className="fixed inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>

            <div className='bg-slate-60 p-2 md:px md:mycontainer min-h-[88vh] '>
                <div className='logo font-extrabold text-4xl text-white text-center'>
                    <span className='text-green-700'>&lt;</span>
                    Pass
                    <span className='text-amber-400'>Nova</span>
                    <span className='text-green-700'>/&gt;</span>

                </div>
                <ul></ul>
                <p className='text-white text-lg text-center font-sans'>Your Own Password Manager</p>
                <div className='text-black flex flex-col p-4 gap-8 items-center'>
                    <input value={form.site} onChange={handleChange} className='rounded-full border-2 border-green-500 w-full px-8 py-2' type="text" name='site' placeholder='Enter website URL' />
                    <div className='flex flex-col md:flex-row justify-between w-full gap-8'>
                        <input value={form.username} onChange={handleChange} className='rounded-full border border-green-500 w-full px-8 py-1' type="text" name='username' placeholder='Enter Username' />
                        <div className='relative'>
                            <input ref={passwordRef} value={form.password} onChange={handleChange} className='rounded-full  border border-green-500 w-full px-8 py-2' type="password" name='password' placeholder='Enter Password' />
                            <span className='absolute right-[15px] top-[7px] cursor-pointer' onClick={showPassword}>
                                <img ref={ref} className='p-1' width={30} src="/icons/eye1.svg" alt="" />
                            </span>
                        </div>
                    </div>
                    <button onClick={savePassword} className='text-white flex justify-center items-center gap-2 bg-amber-600 hover:bg-amber-400 font-bold rounded-full px-4 py-2 w-fit border-2 border-gray-200'>

                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="white" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 2.00012C17.5228 2.00012 22 6.47727 22 12.0001C22 17.523 17.5228 22.0001 12 22.0001C6.47715 22.0001 2 17.523 2 12.0001M8.909 2.48699C7.9 2.8146 6.96135 3.29828 6.12153 3.90953M3.90943 6.12162C3.29806 6.9616 2.81432 7.90044 2.4867 8.90964"></path>
                            <path d="M12 8.00012V16.0001M16 12.0001L8 12.0001"></path>
                        </svg>
                        Add</button>
                </div>
                <div className="passwords text-white">
                    <h2 className='font-bold text-2xl py-4'>Your Credentials</h2>
                    {passwordArray.length === 0 && <div> No Credentials to show </div>}
                    {passwordArray.length != 0 && <table className="table-auto w-full rounded-md overflow-hidden mb-10">
                        <thead className='text-white bg-green-800 '>
                            <tr>
                                <th className='py-2'>Sites</th>
                                <th className='py-2'>Username</th>
                                <th className='py-2'>Password</th>
                                <th className='py-2'>Action</th>
                            </tr>
                        </thead>
                        <tbody className='bg-green-300 text-black'>
                            {passwordArray.map((item, index) => {
                                return <tr key={index}>
                                    <td className=' py-2 border border-green-200 text-center w-32'>
                                        <div className="flex items-center justify-center gap-2">
                                            <a href={item.site} target="_blank">{item.site}</a>
                                            <svg className='cursor-pointer' onClick={() => { copyText(item.site) }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="24" color="#000000" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M7.5 14.5C7.5 11.2002 7.5 9.55025 8.52513 8.52513C9.55025 7.5 11.2002 7.5 14.5 7.5C17.7998 7.5 19.4497 7.5 20.4749 8.52513C21.5 9.55025 21.5 11.2002 21.5 14.5C21.5 17.7998 21.5 19.4497 20.4749 20.4749C19.4497 21.5 17.7998 21.5 14.5 21.5C11.2002 21.5 9.55025 21.5 8.52513 20.4749C7.5 19.4497 7.5 17.7998 7.5 14.5Z"></path>
                                                <path d="M7.5 16.5C6.10355 16.5 5.40533 16.5 4.84402 16.3036C3.83866 15.9518 3.0482 15.1613 2.69641 14.156C2.5 13.5947 2.5 12.8964 2.5 11.5V9.5C2.5 6.20017 2.5 4.55025 3.52513 3.52513C4.55025 2.5 6.20017 2.5 9.5 2.5H11.5C12.8964 2.5 13.5947 2.5 14.156 2.69641C15.1613 3.0482 15.9518 3.83866 16.3036 4.84402C16.5 5.40533 16.5 6.10355 16.5 7.5"></path>
                                            </svg>
                                        </div>
                                    </td>
                                    <td className='py-2 border border-green-200 text-center w-32'>
                                        <div className="flex items-center justify-center gap-2">
                                            {item.username}
                                            <svg className='cursor-pointer' onClick={() => { copyText(item.username) }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="24" color="#000000" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M7.5 14.5C7.5 11.2002 7.5 9.55025 8.52513 8.52513C9.55025 7.5 11.2002 7.5 14.5 7.5C17.7998 7.5 19.4497 7.5 20.4749 8.52513C21.5 9.55025 21.5 11.2002 21.5 14.5C21.5 17.7998 21.5 19.4497 20.4749 20.4749C19.4497 21.5 17.7998 21.5 14.5 21.5C11.2002 21.5 9.55025 21.5 8.52513 20.4749C7.5 19.4497 7.5 17.7998 7.5 14.5Z"></path>
                                                <path d="M7.5 16.5C6.10355 16.5 5.40533 16.5 4.84402 16.3036C3.83866 15.9518 3.0482 15.1613 2.69641 14.156C2.5 13.5947 2.5 12.8964 2.5 11.5V9.5C2.5 6.20017 2.5 4.55025 3.52513 3.52513C4.55025 2.5 6.20017 2.5 9.5 2.5H11.5C12.8964 2.5 13.5947 2.5 14.156 2.69641C15.1613 3.0482 15.9518 3.83866 16.3036 4.84402C16.5 5.40533 16.5 6.10355 16.5 7.5"></path>
                                            </svg>
                                        </div>
                                    </td>
                                    <td className='py-2 border border-green-200 text-center w-32'>
                                        <div className="flex items-center justify-center gap-2">
                                            {item.password}
                                            <svg className='cursor-pointer' onClick={() => { copyText(item.password) }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="24" color="#000000" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M7.5 14.5C7.5 11.2002 7.5 9.55025 8.52513 8.52513C9.55025 7.5 11.2002 7.5 14.5 7.5C17.7998 7.5 19.4497 7.5 20.4749 8.52513C21.5 9.55025 21.5 11.2002 21.5 14.5C21.5 17.7998 21.5 19.4497 20.4749 20.4749C19.4497 21.5 17.7998 21.5 14.5 21.5C11.2002 21.5 9.55025 21.5 8.52513 20.4749C7.5 19.4497 7.5 17.7998 7.5 14.5Z"></path>
                                                <path d="M7.5 16.5C6.10355 16.5 5.40533 16.5 4.84402 16.3036C3.83866 15.9518 3.0482 15.1613 2.69641 14.156C2.5 13.5947 2.5 12.8964 2.5 11.5V9.5C2.5 6.20017 2.5 4.55025 3.52513 3.52513C4.55025 2.5 6.20017 2.5 9.5 2.5H11.5C12.8964 2.5 13.5947 2.5 14.156 2.69641C15.1613 3.0482 15.9518 3.83866 16.3036 4.84402C16.5 5.40533 16.5 6.10355 16.5 7.5"></path>
                                            </svg>
                                        </div>
                                    </td>
                                    <td className='py-2 border border-green-200 text-center w-32'>
                                        <div className='flex justify-center items-center gap-2'>
                                        <span className='cursor-pointer' onClick={()=>{editPassword(item.id)}}>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round">
                                            <path d="M16.4249 4.60509L17.4149 3.6151C18.2351 2.79497 19.5648 2.79497 20.3849 3.6151C21.205 4.43524 21.205 5.76493 20.3849 6.58507L19.3949 7.57506M16.4249 4.60509L9.76558 11.2644C9.25807 11.772 8.89804 12.4078 8.72397 13.1041L8 16L10.8959 15.276C11.5922 15.102 12.228 14.7419 12.7356 14.2344L19.3949 7.57506M16.4249 4.60509L19.3949 7.57506"></path>
                                            <path d="M18.9999 13.5C18.9999 16.7875 18.9999 18.4312 18.092 19.5376C17.9258 19.7401 17.7401 19.9258 17.5375 20.092C16.4312 21 14.7874 21 11.4999 21H11C7.22876 21 5.34316 21 4.17159 19.8284C3.00003 18.6569 3 16.7712 3 13V12.5C3 9.21252 3 7.56879 3.90794 6.46244C4.07417 6.2599 4.2599 6.07417 4.46244 5.90794C5.56879 5 7.21252 5 10.5 5" strokeLinecap="round"></path>
                                        </svg>
                                        </span>
                                        <span className='cursor-pointer' onClick={()=>{deletePassword(item.id)}}>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                                            <path d="M19.5 5.5L18.8803 15.5251C18.7219 18.0864 18.6428 19.3671 18.0008 20.2879C17.6833 20.7431 17.2747 21.1273 16.8007 21.416C15.8421 22 14.559 22 11.9927 22C9.42312 22 8.1383 22 7.17905 21.4149C6.7048 21.1257 6.296 20.7408 5.97868 20.2848C5.33688 19.3626 5.25945 18.0801 5.10461 15.5152L4.5 5.5"></path>
                                            <path d="M3 5.5H21M16.0557 5.5L15.3731 4.09173C14.9196 3.15626 14.6928 2.68852 14.3017 2.39681C14.215 2.3321 14.1231 2.27454 14.027 2.2247C13.5939 2 13.0741 2 12.0345 2C10.9688 2 10.436 2 9.99568 2.23412C9.8981 2.28601 9.80498 2.3459 9.71729 2.41317C9.32164 2.7167 9.10063 3.20155 8.65861 4.17126L8.05292 5.5"></path>
                                            <path d="M9.5 16.5L9.5 10.5"></path>
                                            <path d="M14.5 16.5L14.5 10.5"></path>
                                        </svg>
                                        </span>
                                        </div>
                                    </td>
                                </tr>
                            })}
                        </tbody>
                    </table>}
                </div>

            </div>
        </>
    )
}

export default Manager
