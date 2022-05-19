import { SanityImageSource } from "@sanity/image-url/lib/types/types";

interface GenericResponse {
    _id: string;
}

export interface Abouts extends GenericResponse {
    title: string;
    description: string;
    imgUrl: SanityImageSource;
}

export interface Works extends GenericResponse {
    title: string;
    description: string;
    projectLink: string;
    codeLink: string;
    imgUrl: SanityImageSource;
    tags: string[];
}

export interface Skill extends GenericResponse {
    name: string;
    bgColor: string;
    icon: SanityImageSource;
}

export interface Experience extends GenericResponse {
    year: string;
    works: WorkExperience[];
}

export interface WorkExperience extends GenericResponse {
    name: string;
    company: string;
    desc: string;
}

export interface Testimonial extends GenericResponse {
    name: string;
    company: string;
    imageurl: SanityImageSource;
    feedback: string;
}

export interface Brand extends GenericResponse {
    name: string;
    imgUrl: SanityImageSource;
}