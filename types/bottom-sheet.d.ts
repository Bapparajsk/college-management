import { BottomSheetProps } from "@gorhom/bottom-sheet";
import { ReactNode } from "react";

export type BottomSheetConfig = {
    view: ReactNode;
    props?: Partial<BottomSheetProps>;
};

export type BottomSheetMethods = {
    expand: () => void;
    collapse: () => void;
    close: () => void;
    setView: (view: ReactNode) => void;
    setProps: (props: Partial<BottomSheetProps>) => void;
};

export type BottomSheetContextType = {
    show: (config: BottomSheetConfig) => void;
    hide: () => void;
    methods: BottomSheetMethods;
};