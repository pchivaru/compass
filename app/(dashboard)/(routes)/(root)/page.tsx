import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";
import Link from "next/link";
import { CheckCircle, File } from "lucide-react";
import { InfoCard } from "./_components/info-card";
import Map from "../../_components/map-item";

export default async function Home() {

  return (
   <div className="">
       <Map/>
   </div>
  );
}
