import React from "react";

type ConditionalRendererProps = {
    condition: boolean;
    IfComponent: React.ReactNode;
    ElseComponent?: React.ReactNode; // optional
};

export default function If({
    condition,
    IfComponent,
    ElseComponent,
}: ConditionalRendererProps) {
    if (condition) {
        return <>{IfComponent}</>;
    } else {
        return <>{ElseComponent ?? null}</>; // fallback to nothing if not provided
    }
}
