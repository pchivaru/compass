import Map from "../../_components/map-item";
import { db } from "@/lib/db";

const express = require('express');
const app = express();

export default async function Home() {

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

  const balizas = await db.baliza.findMany({
    orderBy: {
        createdAt:"desc",
    }
  });

  return (
   <div className="">
       <Map
        aerialVehicles = {[...aerialVehicles]}
        terrestrialVehicles = {[...terrestrialVehicles]}
        balizas = {[...balizas]}
       />
   </div>
  );
}
