"use client";

import Image from "next/image";

interface NavbarRoutesProps {
    numAerial: number,
    numTerrestrial: number
}

export const NavbarRoutes = ({
    numAerial,
    numTerrestrial
}: NavbarRoutesProps) => {

    {/*</div><div className="flex gap-x-2 ml-auto items-center">
                <div className="flex items-center">
                    <Image 
                                alt="Logo"
                                width={50}
                                height={50}
                       
                                src={"/logo_compass.png"}
                    />

                </div>
                <p className="text-slate-950 text-xl font- mr-3">
                    C O M P A S S
                </p>
                
                
            </div>*/}

    return (
       
        <>
        <div className="space-x-5 flex">  
            <div className="space-x-1 flex">
                <b>
                    Aerial units:
                </b>
                <p>
                    {numAerial}
                </p>
            </div>
            <div className="space-x-1 flex">
                <b>
                    Terrestrial units:
                </b>
                <p>
                    {numTerrestrial}
                </p>
            </div>
        </div>

        <div className="flex gap-x-2 ml-auto items-center">
            <div className="flex items-center">
                <Image 
                            alt="Logo"
                            width={50}
                            height={50}
                
                            src={"/logo_compass.png"}
                />

            </div>
        <p className="text-slate-950 text-xl font- mr-3">
            C O M P A S S
        </p>
        </div>

        </>
        
    )
}