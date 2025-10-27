import { BottomSheetConfig, BottomSheetContextType, BottomSheetMethods } from "@/types/bottom-sheet";
import BottomSheet, { BottomSheetProps, BottomSheetView } from "@gorhom/bottom-sheet";
import { createContext, ReactNode, useCallback, useContext, useMemo, useRef, useState } from "react";

const BottomSheetContext = createContext<BottomSheetContextType | null>(null);

const defaultProps: Partial<BottomSheetProps> = {
    snapPoints: ['50%'],
    enablePanDownToClose: true,
    android_keyboardInputMode: 'adjustResize',
    keyboardBlurBehavior: 'restore',
};

export const BottomSheetProvider = ({ children }: { children: ReactNode }) => {
    const bottomSheetRef = useRef<BottomSheet>(null);
    const [sheetView, setSheetView] = useState<ReactNode>(null);
    const [sheetProps, setSheetProps] = useState<Partial<BottomSheetProps>>(defaultProps);

    // Memoized methods to prevent unnecessary re-renders
    const expand = useCallback(() => {
        bottomSheetRef.current?.expand();
    }, []);

    const collapse = useCallback(() => {
        bottomSheetRef.current?.collapse();
    }, []);

    const close = useCallback(() => {
        bottomSheetRef.current?.close();
    }, []);

    const show = useCallback((config: BottomSheetConfig) => {
        setSheetView(config.view);
        setSheetProps(prev => ({ ...prev, ...config.props }));
        setTimeout(() => expand(), 100); // Small delay for smooth animation
    }, [expand]);

    const hide = useCallback(() => {
        close();
    }, [close]);

    const updateView = useCallback((view: ReactNode) => {
        setSheetView(view);
    }, []);

    const updateProps = useCallback((props: Partial<BottomSheetProps>) => {
        setSheetProps(prev => ({ ...prev, ...props }));
    }, []);

    const methods: BottomSheetMethods = useMemo(() => ({
        expand,
        collapse,
        close,
        setView: updateView,
        setProps: updateProps,
    }), [expand, collapse, close, updateView, updateProps]);

    const contextValue: BottomSheetContextType = useMemo(() => ({
        show,
        hide,
        methods,
    }), [show, hide, methods]);

    return (
        <BottomSheetContext.Provider value={contextValue}>
            {children}
            <BottomSheet
                ref={bottomSheetRef}
                {...sheetProps}
            >
                <BottomSheetView style={{ flex: 1 }}>
                    {sheetView}
                </BottomSheetView>
            </BottomSheet>
        </BottomSheetContext.Provider>
    );
};

export const useBottomSheet = () => {
    const context = useContext(BottomSheetContext);
    if (!context) {
        throw new Error('useBottomSheet must be used within a BottomSheetProvider');
    }
    return context;
};