import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";
import Link from "next/link";
import { CheckCircle, File } from "lucide-react";
import { InfoCard } from "./_components/info-card";
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

  return (
   <div className="">
       <Map
        aerialVehicles = {[...aerialVehicles]}
        terrestrialVehicles = {[...terrestrialVehicles]}
       />
   </div>
  );
}
