"use client";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Works from "./components/Works";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Methodology from "./components/Methodology";
import Footer from "./components/Footer";

const DATA = {
    name: "YOUR NAME",
    title: "Frontend Developer & Designer",
    openToWork: true,
    email: "ayush@example.com",

    projects: [
        {
            name: "Portfolio Generator",
            status: "Shipped",
            location: "GitHub",
            category: "Personal",
            image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
        },
        {
            name: "Design System",
            status: "In Progress",
            location: "Remote",
            category: "Work",
            image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80",
        },
        {
            name: "Open Source CLI",
            status: "Open Source",
            location: "Global",
            category: "Experimental",
            image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80",
        },
    ],

    skills: [
        {
            name: "React / Next.js",
            category: "Frontend",
            proficiency: 90,
            years: "3 yrs",
            projects: "12+",
            tier: "S",
            image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=200&q=80",
        },
        {
            name: "TypeScript",
            category: "Language",
            proficiency: 80,
            years: "2 yrs",
            projects: "8+",
            tier: "A",
            image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=200&q=80",
        },
        {
            name: "Node.js",
            category: "Backend",
            proficiency: 70,
            years: "2 yrs",
            projects: "6+",
            tier: "A",
            image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=200&q=80",
        },
    ],

    experience: [
        {
            title: "Senior Frontend Engineer",
            company: "Acme Corp",
            location: "Remote",
            type: "Full-Time",
            period: "2023–Present",
        },
        {
            title: "UI Developer",
            company: "Studio XYZ",
            location: "New York",
            type: "Contract",
            period: "2022–2023",
        },
        {
            title: "Junior Developer",
            company: "StartupABC",
            location: "London",
            type: "Full-Time",
            period: "2021–2022",
        },
    ],
};

export default function Home() {
    return (
        <>
            <Navbar name={DATA.name} />
            <Hero
                name={DATA.name}
                title={DATA.title}
                openToWork={DATA.openToWork}
            />
            <Works projects={DATA.projects} />
            <Skills skills={DATA.skills} />
            <Experience experience={DATA.experience} />
            <Methodology />
            <Footer name={DATA.name} email={DATA.email} />
        </>
    );
}
