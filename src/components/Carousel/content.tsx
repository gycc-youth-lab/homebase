import Image from 'next/image'
import { Button } from "@heroui/react";
import top from "@images/homepage/main_2025.png"
import mid from "@images/homepage/main_sl01_2.png"
import bottom from "@images/homepage/main_2025_2.png"

export const carouselItems = [
    // Frame 1: AZ highlights with iframe
    (<div key="item1" className="w-full h-full flex flex-col items-center justify-center gap-2">
        <h1 className="text-3xl font-bold text-black text-center">COP29, Azerbaijan Highlights</h1>
        <iframe
            src="https://www.youtube.com/embed/aTBOqJG2A10?si=UcWYX505CGmjWC0L"
            className="w-full h-[80%]"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
        />
        <Button className="" size='md'>Find Out More</Button>
    </div>),

    // Frame 2: p4g Hanoi
    (
        <div key="item2" className='pt-4 w-full h-full flex flex-col items-center justify-center'>
            <div>
                <Image className="mb-5" width={500} height={100} src={top} alt="GYCC 2025" />
                <Image className="mb-5" width={500} height={100} src={mid} alt="Slogan 2025" />
                <Image className="mb-5" width={500} height={100} src={bottom} alt="P4G 2025 " />
            </div>
            <Button className="" size='md'>Find Out More</Button>
        </div>
    ),

    // Introduction to GYCC
    (
        <div key="item3" className="w-full h-full flex flex-col items-center justify-center gap-2">
            <h1 className="text-3xl font-bold text-black text-center">Introduction to GYCC</h1>
            <iframe
                src="https://www.youtube.com/embed/DKKGjM-ehQo?si=oW2hpzvR_gnTw-KA"
                className="w-full h-[80%]"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            />
            <Button className="" size='md'>Find Out More</Button>
        </div>
    ),
]
