import Image from 'next/image'

export const carouselItems = [
    // Example with image
    <div key="item1" className="relative w-full h-full">
        <Image src="/placeholder.svg?height=400&width=800" alt="Slide 1" fill className="object-cover" />
        <div className="absolute inset-0 flex items-end p-6 bg-gradient-to-t from-black/70 to-transparent">
            <h3 className="text-white text-2xl font-bold">Slide 1</h3>
        </div>
    </div>,

    // Example with iframe
    <div key="item2" className="w-full h-full">
        <iframe
            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
        />
    </div>,

    // Example with multiple images
    <div key="item3" className="grid grid-cols-2 gap-2 w-full h-full p-4">
        <div className="relative aspect-square">
            <Image src="/placeholder.svg?height=300&width=300" alt="Gallery 1" fill className="object-cover rounded-lg" />
        </div>
        <div className="relative aspect-square">
            <Image src="/placeholder.svg?height=300&width=300" alt="Gallery 2" fill className="object-cover rounded-lg" />
        </div>
        <div className="relative aspect-square">
            <Image src="/placeholder.svg?height=300&width=300" alt="Gallery 3" fill className="object-cover rounded-lg" />
        </div>
        <div className="relative aspect-square">
            <Image src="/placeholder.svg?height=300&width=300" alt="Gallery 4" fill className="object-cover rounded-lg" />
        </div>
    </div>,
]
