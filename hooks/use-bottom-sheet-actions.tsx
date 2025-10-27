import { useBottomSheet } from "@/context/bottom-sheet-context";
import { ReactNode, useCallback } from "react";

export const useBottomSheetActions = () => {
  const { show, hide, methods } = useBottomSheet();
  const showContent = useCallback((content: ReactNode, snapPoints?: string[]) => {
    show({
      view: content,
      props: {
        snapPoints: snapPoints || ['50%'],
      }
    });
  }, [show]);

  return {
    show,
    hide,
    showContent,
    ...methods
  };
};