import React, {useEffect, useState} from 'react'


import {Container} from '../components'
import { useSelector } from "react-redux";
import Header from '../components/Header/Header';


function Home() {
    const userData = useSelector((state) => state.auth.userData)
    const [date,setdate]=useState()
    const dates= new Date();
    const dt =String(dates.getFullYear())+"-0"+String(dates.getMonth()+1)+"-"+String(dates.getDate())
    
    console.log((date),dt,date===dt)

        return userData?(
            <>
           
            <div className="w-full py-8 mt-4 text-center">

                <Container>
                   
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-white-500">
                                welcome {userData.fullname}
                            </h1>
                            
                        </div>
                    </div>
                </Container>
            </div>
            </>
        ):(<>
           
            <div className="w-full py-8 mt-4 text-center">
            <Container>
    <div className="flex flex-wrap justify-center items-center p-4">
        <div className="p-2 w-full text-center">
            <h1 className="text-2xl font-bold hover:text-white-500 mb-4">
                Welcome To
            </h1>
            <div className="bg-white p-4 rounded-lg shadow-lg max-w-sm mx-auto">
                <img 
                    src="./unihelp-high-resolution-logo.jpeg" 
                    alt="UniHelp Logo"
                    className="w-full h-full rounded-lg"
                />
            </div>
        </div>
    </div>
</Container>

            </div>
            </>)
    }
export default Home