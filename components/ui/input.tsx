import { forwardRef } from "react";
import { TextInput, TextInputProps, View } from "react-native";

type InputProps = TextInputProps & {
    startContent?: React.ReactNode;
    endContent?: React.ReactNode;
};

const Input = forwardRef<TextInput, InputProps>(
    ({ startContent, endContent, className, ...props }, ref) => {
        return (
            <View
                className={`h-14 flex-row items-center px-4 bg-gray-300/90 rounded-full border border-default ${className ?? ""}`}
            >
                {startContent}
                <TextInput
                    ref={ref}
                    className="flex-1 ml-2 text-[16px] font-inter-medium"
                    placeholderTextColor="#555"
                    {...props}
                />
                {endContent}
            </View>
        );
    }
);

Input.displayName = "Input";
export default Input;
