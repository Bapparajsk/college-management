import React, { useState } from "react";
import { Text, TextInput, View } from "react-native";

type TextareaProps = {
    placeholder?: string;
    maxLength?: number;
    value?: string;
    onChangeText?: (text: string) => void;
};

const Textarea: React.FC<TextareaProps> = ({
    placeholder = "Write something...",
    maxLength = 200,
    value: initialValue = "",
    onChangeText,
}) => {
    const [value, setValue] = useState(initialValue);

    const handleChange = (text: string) => {
        setValue(text);
        if (onChangeText) onChangeText(text);
    };

    return (
        <View className="w-full my-2 h-auto">
            <TextInput
                multiline
                textAlignVertical="top"
                maxLength={maxLength}
                placeholder={placeholder}
                value={value}
                onChangeText={handleChange}
                ref={e => e?.focus()}
                className="w-full h-56 text-base font-inter-medium text-black"
            />
            <Text className="text-xs text-gray-500 text-right font-inter mt-1">
                {value.length} / {maxLength}
            </Text>
        </View>
    );
};

export default Textarea;
