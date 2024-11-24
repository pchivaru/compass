import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(
    req:Request
) {
    try {
        console.log("Response")

        const body = await req.json();

        const category = body["category"];
        const subcategory = body["subcategory"];
        const latitude = body["latitude"];
        const longitude = body["longitude"];

        if (category==="aerial"){
            const vehicle = await db.aerialVehicle.create({
                data: {
                    type: subcategory,
                    latitude: latitude,
                    longitude: longitude,
                },
        })} else if (category == "terrestrial"){
            const vehicle = await db.terrestrialVehicle.create({
                data: {
                    type: subcategory,
                    latitude: latitude,
                    longitude: longitude,
                },
        })};

        return NextResponse.json({'message':'Data recieved!'});

    } catch (error) {
        console.log("[COURSES]", error);
        return new NextResponse("Internal Error", {status: 500});
    }
}