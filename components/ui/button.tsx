import { cn } from "@/utils/cn";
import { useRouter } from "expo-router";
import { ReactNode, memo } from "react";
import {
  ActivityIndicator,
  GestureResponderEvent,
  Pressable,
  PressableProps,
  Text,
  View
} from "react-native";

export type ButtonProps = PressableProps & {
    children?: ReactNode;
    size?: "sm" | "md" | "lg";
    radius?: "sm" | "md" | "lg" | "full";
    boxShadow?: "sm" | "md" | "lg";
    variant?: "solid" | "bordered" | "light" | "flat";
    shadowColor?: `#${string}` | `rgb(${number}, ${number}, ${number})` | `rgba(${number}, ${number}, ${number}, ${number})`;
    color?: "primary" | "secondary" | "danger" | "warning" | "success" | "default";
    disabled?: boolean;
    loading?: boolean;
    startIcon?: ReactNode;
    endIcon?: ReactNode;
    rippleColor?: string;
    className?: string;
    textClassName?: string;
    href?: string;
};

// ---------------- Box Shadow ----------------
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

// ---------------- Base Colors ----------------
const baseColors: Record<
    NonNullable<ButtonProps["color"]>,
    { bg: string; border: string; text: string, flatBg?: string }
> = {
    primary: { bg: "bg-[#006FEE]", border: "border-[#006FEE]", text: "text-white", flatBg: "bg-[#99c7fb]" },
    secondary: { bg: "bg-[#9353d3]", border: "border-[#9353d3]", text: "text-white", flatBg: "bg-[#c9a9e9]" },
    danger: { bg: "bg-[#f31260]", border: "border-[#f31260]", text: "text-white", flatBg: "bg-[#faa0bf]" },
    warning: { bg: "bg-[#f5a524]", border: "border-[#f5a524]", text: "text-white", flatBg: "bg-[#fbdba7]" },
    success: { bg: "bg-[#17c964]", border: "border-[#17c964]", text: "text-white", flatBg: "bg-[#a2e9c1]" },
    default: { bg: "bg-white", border: "border-gray-300", text: "text-gray-800", flatBg: "bg-white/[0.4]" },
};

export const baseTextColors: Record<
    NonNullable<ButtonProps["color"]>,
    string
> = {
    primary: "#006FEE",
    secondary: "#9353d3",
    danger: "#f31260",
    warning: "#f5a524",
    success: "#17c964",
    default: "#1f2937",
};

// ---------------- Variants ----------------
const getVariantStyle = (
    variant: NonNullable<ButtonProps["variant"]>,
    color: NonNullable<ButtonProps["color"]>
) => {
    const { bg, border, flatBg } = baseColors[color];

    switch (variant) {
        case "solid":
            return `${bg} ${border}`;
        case "bordered":
            return `bg-transparent ${border} border-2`;
        case "light":
            return `bg-transparent border-transparent`;
        case "flat":
            const bgFlat = color === "default" ? "bg-gray-200" : flatBg; // 20% opacity            
            return `${bgFlat} border-transparent`;
        default:
            return `${bg} ${border}`;
    }
};

const getTextColor = (
    variant: NonNullable<ButtonProps["variant"]>,
    color: NonNullable<ButtonProps["color"]>
) => {
    const { text } = baseColors[color];
    const textColor = baseTextColors[color];

    switch (variant) {
        case "bordered":
        case "light":
            return color === "default" ? "text-gray-800" : `text-[${textColor}]`;
        default:
            return text;
    }
};

// ---------------- Sizes & Radius ----------------
const sizeStyles: Record<NonNullable<ButtonProps["size"]>, string> = {
    sm: "h-10 px-3",
    md: "h-12 px-4",
    lg: "h-14 px-6",
};

const radiusStyles: Record<NonNullable<ButtonProps["radius"]>, string> = {
    sm: "rounded-md",
    md: "rounded-xl",
    lg: "rounded-2xl",
    full: "rounded-full",
};

// ---------------- Component ----------------
export const Button = memo((props: ButtonProps) => {
    const {
        children,
        startIcon,
        endIcon,
        loading,
        disabled,
        color = "default",
        size = "md",
        radius = "md",
        variant = "solid",
        boxShadow,
        shadowColor,
        rippleColor,
        style,
        className,
        textClassName,
        href,
        onPress,
        ...rest
    } = props;

    const router = useRouter();

    const boxShadowStyle = getBoxShadow(boxShadow, shadowColor);
    const variantStyle = getVariantStyle(variant, color);
    const textColor = getTextColor(variant, color);

    const handlePress = (event: GestureResponderEvent) => {
        if (href) {
            router.push(href as any);
        } else if (onPress) {
            onPress(event);
        }
    }

    return (
        <Pressable
            disabled={disabled || loading}
            style={[
                boxShadowStyle,
                style,
            ]}
            className={cn(
                "flex-row items-center justify-center border overflow-hidden active:opacity-80 active:scale-95",
                variantStyle,
                sizeStyles[size],
                radiusStyles[radius],
                className
            )}
            onPress={handlePress}
            {...rest}
        >
            {loading ? (
                <ActivityIndicator color={color === "default" ? "#000" : "#fff"} />
            ) : (
                <View className="flex-row items-center justify-center space-x-2">
                    {startIcon ? <View>{startIcon}</View> : null}
                    {typeof children === "string" ? (
                        <Text
                            className={cn(
                                "font-poppins text-base",
                                textColor,
                                textClassName
                            )}
                        >
                            {children}
                        </Text>
                    ) : (
                        children
                    )}
                    {endIcon ? <View></View> : null}
                </View>
            )}
        </Pressable>
    );
});

Button.displayName = "Button";
