import { IconType } from "react-icons";

export interface SidenavItem {
    icon: IconType;
    label: string;
    link: string
}

export   interface SidenavItemsProp{
    navItem: SidenavItem[];
    mode?: " semi" | "over";
}

