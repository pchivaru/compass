"use client";

interface NavbarRoutesProps {
    numAerial: number,
    numTerrestrial: number
}

export const NavbarRoutes = ({
    numAerial,
    numTerrestrial
}: NavbarRoutesProps) => {

    return (
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
    )
}