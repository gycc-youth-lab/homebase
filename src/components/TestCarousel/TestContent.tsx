import { Button, Card, CardHeader, CardBody, CardFooter } from "@heroui/react";
import Image from "next/image";

import img1 from '@images/homepage/main_2025.png'
import img2 from '@images/homepage/main_sl01_2.png'
import img3 from '@images/homepage/main_2025_2.png'

const Slide1 = () => (
    <Card shadow="none" className="w-full bg-white rounded-lg p-6 text-center">
        <CardHeader className="pb-0 pt-2 px-4 items-start">
            <h2 className="text-3xl font-bold">COP29, Azerbaijan Highlights</h2>
        </CardHeader>
        <CardBody>
            <div className="max-w-[95%] grow">
                <iframe src="https://www.youtube.com/embed/nexYsCih648" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"></iframe>
            </div>
        </CardBody>
        <CardFooter>
            <Button>Find Out More</Button>
        </CardFooter>
    </Card >
)

const Slide2 = () => (
    <Card shadow="none" className="w-full bg-white rounded-lg p-6 text-center">
        <CardBody>
            <Image width={500} height={100} src={img1} alt="GYCC 2025" />
            <Image width={500} height={100} src={img2} alt="Slogan 2025" />
            <Image width={500} height={100} src={img3} alt="P4G 2025 " />
        </CardBody>
    </Card>
)

const Slide3 = () => (
    <Card shadow="none" className="w-full bg-white rounded-lg p-6 text-center">
        <CardHeader>Introduction to GYCC</CardHeader>
        <CardBody>
            <div className="max-w-[95%] grow">
                <iframe src="https://www.youtube.com/embed/DKKGjM-ehQo?si=agq4bhccLE6iXxyO" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"></iframe>
            </div>
        </CardBody>
        <CardFooter className="justify-between">
            <Button>Find Out More</Button>
        </CardFooter>
    </Card>
)

export { Slide1, Slide2, Slide3 }