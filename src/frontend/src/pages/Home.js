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
                   
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-white-500">
                                login bro
                            </h1>
                            
                        </div>
                    </div>
                </Container>
            </div>
            </>)
    }
export default Home