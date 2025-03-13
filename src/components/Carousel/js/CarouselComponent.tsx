'use client'

import React from 'react'
import EmblaCarousel from './EmblaCarousel'
import { EmblaOptionsType } from 'embla-carousel'
import '../css/base.css'
import '../css/sandbox.css'
import '../css/embla.css'
import { Slide1, Slide2, Slide3 } from './CarouselContent'

const OPTIONS: EmblaOptionsType = { loop: true }
const SLIDES = [Slide1, Slide2, Slide3]

const CarouselComponent: React.FC = () => (
    <div className="w-full theme-light">
        <EmblaCarousel slides={SLIDES} options={OPTIONS} />
    </div>
)

export default CarouselComponent
