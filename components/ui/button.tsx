import { cn } from "@/utils/cn";
import React, { ReactNode, memo } from "react";
import {
    ActivityIndicator,
    Platform,
    Pressable,
    PressableProps,
    Text,
    View,
} from "react-native";

export type ButtonProps = PressableProps & {
    children?: ReactNode;
    size?: "sm" | "md" | "lg";
    radius?: "sm" | "md" | "lg" | "full";
    boxShadow?: "sm" | "md" | "lg";
    shadowColor?: `#${string}` | `rgb(${number}, ${number}, ${number})` | `rgba(${number}, ${number}, ${number}, ${number})`;
    variant?: "primary" | "secondary" | "danger" | "warning" | "success" | "default";
    disabled?: boolean;
    loading?: boolean;
    startIcon?: ReactNode;
    endIcon?: ReactNode;
    rippleColor?: string;
    className?: string;
    textClassName?: string;
};

const getBoxShadow = (
    boxShadow: ButtonProps["boxShadow"],
    shadowColor: ButtonProps["shadowColor"]
) => {
    if (!boxShadow) return {};
    const shadows: any = {
        shadowColor: shadowColor ?? "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    };

    switch (boxShadow) {
        case "md":
            Object.assign(shadows, {
                shadowOffset: { width: 0, height: 5 },
                shadowOpacity: 0.36,
                shadowRadius: 6.68,
                elevation: 11,
            });
            break;
        case "lg":
            Object.assign(shadows, {
                shadowOffset: { width: 0, height: 8 },
                shadowOpacity: 0.44,
                shadowRadius: 10.32,
                elevation: 16,
            });
            break;
    }
    return shadows;
};

const variantStyles: Record<
    NonNullable<ButtonProps["variant"]>,
    string
> = {
    primary: "bg-[#006FEE] border-blue-600",
    secondary: "bg-[#9353d3] border-gray-300",
    danger: "bg-[#f31260] border-red-600",
    warning: "bg-[#f5a524] border-yellow-500",
    success: "bg-[#17c964] border-green-600",
    default: "bg-white border-default",
};

const textVariantStyles: Record<NonNullable<ButtonProps["variant"]>, string> = {
    primary: "text-white",
    secondary: "text-gray-800",
    danger: "text-white",
    warning: "text-white",
    success: "text-white",
    default: "text-gray-800",
};

const sizeStyles: Record<NonNullable<ButtonProps["size"]>, string> = {
    sm: "h-0 px-3",
    md: "h-12 px-4",
    lg: "h-14 px-6",
};

const radiusStyles: Record<NonNullable<ButtonProps["radius"]>, string> = {
    sm: "rounded-md",
    md: "rounded-xl",
    lg: "rounded-2xl",
    full: "rounded-full",
};

export const Button = memo((props: ButtonProps) => {
    const {
        children,
        startIcon,
        endIcon,
        loading,
        disabled,
        variant = "default",
        size = "md",
        radius = "md",
        boxShadow,
        shadowColor,
        rippleColor,
        style,
        className,
        textClassName,
        ...rest
    } = props;

    const boxShadowStyle = getBoxShadow(boxShadow, shadowColor);

    return (
        <Pressable
            android_ripple={{
                color: rippleColor || "rgba(255,255,255,0.3)",
                borderless: false,
                radius: 200,
            }}
            disabled={disabled || loading}
            style={({ pressed }) => [
                {
                    opacity: Platform.OS === "ios" ? (pressed ? 0.8 : 1) : disabled ? 0.6 : 1,
                },
                boxShadowStyle,
                style,
            ]}
            className={cn(
                "flex-row items-center justify-center border overflow-hidden",
                variantStyles[variant],
                sizeStyles[size],
                radiusStyles[radius],
                className
            )}
            {...rest}
        >
            {loading ? (
                <ActivityIndicator color={variant === "default" ? "#000" : "#fff"} />
            ) : (
                <View className="flex-row items-center justify-center space-x-2">
                    {startIcon ? <View>{startIcon}</View> : null}
                    {typeof children === "string" ? (
                        <Text className={cn("font-poppins text-base", textVariantStyles[variant], textClassName)}>
                            {children}
                        </Text>
                    ) : (
                        children
                    )}
                    {endIcon ? <View>{endIcon}</View> : null}
                </View>
            )}
        </Pressable>
    );
});

Button.displayName = "Button";
