import { useRef, useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';
import React from 'react'
import Button from './Button'
const Manager = () => {



    const ref2 = useRef()
    const [form, setform] = useState({ website: "", username: "", password: "" })
    const [passwordArray, setpasswordArray] = useState([])
    const getPasswords = async () => {
        let req = await fetch("http://localhost:3000/")
        let p = await req.json();

        if (p) {
            setpasswordArray(p)
        }

    }


    useEffect(() => {
        getPasswords();
    }, [])


    const save_to_db = async (e) => {
        const data = e
        let res = await fetch("http://localhost:3000/", {
            method: 'POST', // Specify the HTTP method
            headers: {
                'Content-Type': 'application/json' // Set the content type to JSON
            },
            body: JSON.stringify(data) // Convert the data object to a JSON string
        });

        let d = await res.json();
        console.log(d);

    }
    const delete_from_db = async (id) => {

        let res = await fetch("http://localhost:3000/delete", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // Set the content type to JSON
            },
            body: JSON.stringify({ id })
        })

        // after deleting get new updated passowords from data base
        getPasswords();


    }


    const notify = (m) => toast(m);

    const handleToggle = (e) => {
        let t = ref2.current.querySelector("img")
        if (t.src.includes("myassets/eye.png")) {

            t.src = "myassets/hide.png"
            ref2.current.querySelector("#password").type = "text"
        }
        else {
            t.src = "myassets/eye.png"
            ref2.current.querySelector("#password").type = "password"
        }
    }
    //! saved to data base
    const savePassword = () => {
        setpasswordArray([...passwordArray, { ...form, id: uuidv4() }])
        save_to_db({ ...form, id: uuidv4() });

        setform({ website: "", username: "", password: "" })
        notify("Saved")
    }

    const handleChange = (e) => {
        //spread ... means
        setform({ ...form, [e.target.name]: e.target.value })
    }

    const saveClip = (text) => {

        navigator.clipboard.writeText(text)
        // notify("Saved to clipboard")
    }



    const handleDelete = (id) => {
        let c = confirm("DO you really want to delete this password?")
        if (c) {

            delete_from_db(id)
            notify("Deleted")
        }
    }


    const handleEdit = (id) => {

        setform(passwordArray.filter((item) => item.id === id)[0])
        setpasswordArray(passwordArray.filter((item) => item.id != id))

    }
    return (
        <div>
            <ToastContainer />
            <div className="container w-[80vw] m-auto mt-5 mb-5 h-[40vh]  bg-slate-800  rounded-xl">
                <div className='flex justify-center p-4'> <h1 className='text-xl font-medium text-white'>Your Password Manager</h1></div>
                <div className="content w-full p-2 flex flex-col ">
                    <div className="first flex justify-center p-2 px-2 ">
                        <input type="text" value={form.website} onChange={handleChange} placeholder='Enter website url' name='website' id='website' className='text-black focus:outline-none  font-medium rounded-full w-[80%] p-2' />
                    </div>
                    <div ref={ref2} className="second flex justify-center  gap p-2 relative">
                        <input type="text" value={form.username} onChange={handleChange} placeholder='Enter Username' name='username' id='username' className='text-black focus:outline-none font-medium rounded-full w-[39%] p-2 mr-2' />
                        <input type="password" onChange={handleChange} placeholder='Enter Password' value={form.password} name='password' id='password' className='text-black focus:outline-none  font-medium rounded-full w-[39%] p-2 ml-2' />
                        <img src="/myassets/eye.png" alt="" onClick={handleToggle} className='absolute right-[140px] top-3' />

                    </div>

                </div>
                <div onClick={savePassword} className='flex justify-center '>
                    <Button text="Submit" />
                </div>


            </div>

            <div className="passwords w-[90vw]   h-[100%]  mx-auto">

                <div className="data text-lg text-black font-bold ">Your Passwords</div>
                {passwordArray.length === 0 && <div className=' p-2  bg-gray-300 rounded-lg text-black'>No passwords to show</div>}

                {passwordArray.length != 0 && <table className="table-auto w-[90vw] rounded-lg overflow-hidden ">
                    <thead>
                        <tr>
                            <th className='w-1/4 bg-gray-700 text-white'>Website</th>
                            <th className='w-1/4 bg-gray-800 text-white'>Username</th>
                            <th className='w-1/4 bg-gray-900 text-white'>Password</th>
                            <th className='w-1/4 bg-gray-900 text-white'>Options</th>
                        </tr>
                    </thead>
                    <tbody className='mb-10  ' >
                        {/* //! using js map function to parse our passwords array from localstorage */}
                        {passwordArray.map((item) => {
                            return <tr className=' bg-gray-300  ' key={item.id}>
                                <div className='flex justify-between'>
                                    <td className='text-black font-medium p-2'>{item.website}</td>
                                    <svg onClick={saveClip(item.website)} xmlns="http://www.w3.org/2000/svg" className='mt-1' height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M360-240q-33 0-56.5-23.5T280-320v-480q0-33 23.5-56.5T360-880h360q33 0 56.5 23.5T800-800v480q0 33-23.5 56.5T720-240H360Zm0-80h360v-480H360v480ZM200-80q-33 0-56.5-23.5T120-160v-560h80v560h440v80H200Zm160-240v-480 480Z" /></svg>
                                </div>

                                <td className='text-black font-medium p-2  text-center'>{item.username}</td>
                                <td className='text-black font-medium  p-2 text-center '>{item.password}</td>
                                <td className='text-black font-medium  p-2 text-center  flex justify-center gap-10'>
                                    <svg xmlns="http://www.w3.org/2000/svg" onClick={() => { handleDelete(item.id); notify }} height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" /></svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" onClick={() => { handleEdit(item.id) }} height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" /></svg>

                                </td>
                            </tr>
                        })}


                    </tbody>
                </table>}
            </div>






        </div>

    )
}

export default Manager
