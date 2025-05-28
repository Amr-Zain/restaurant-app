interface General {
    title: string,
    id: string;
    name: string;
    desc: string;
    content: string;
    image: string;
}



interface Features {
    name: string;
    desc: string;
    image: string;
    id: number
}

interface Page {
    title: string;
    content: string;
}
interface Service {
    icon: string;
    color: string;
    title: string;
    desc: string;
    service_slug: string;
    id: number
}

interface TopIntro extends Page { }
interface MiddleIntro extends Page {
    button_name: string;
    video: string;
}

interface HomeType {
    features: Features[];
    top_intro: TopIntro;
    middle_intro: MiddleIntro;
    services: Service[];
    technology: Features[]
    partners: Features[]
    visions: General[]
}

interface Section {
    type: string
    id: number;
    title: string;
    desc: string;
    background: string;
    image: string;
    features: {
        id: number;
        title: string;
        desc: string;
        icon: string
    }[];
}

interface ServiceType {
    title: string;
    desc: string;
    image: string;
    video: string;
    background: string;
    icon: string;
    sub_title: string;
    sub_desc: string;
    name: string;
    type: string;
    sections: Section[]
}
