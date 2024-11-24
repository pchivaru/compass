import { MobileSidebar } from "./mobile-sidebar";
import { NavbarRoutes  } from "@/components/navbar-routes"
import { db } from "@/lib/db";

export const Navbar = async () => {

    const aerialVehicles = await db.aerialVehicle.findMany({
        orderBy: {
            createdAt:"desc",
        }
      });
    
    const terrestrialVehicles = await db.terrestrialVehicle.findMany({
    orderBy: {
        createdAt:"desc",
    }
    });


    return (
        <div className="p-4 border-b h-full flex items-center bg-white shadow-md">
            {/*<MobileSidebar />*/}
            <NavbarRoutes 
                numAerial={aerialVehicles.length}
                numTerrestrial={terrestrialVehicles.length}
            />
        </div>
    )
}