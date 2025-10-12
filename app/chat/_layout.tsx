import { Stack } from 'expo-router'
import React from 'react'

export default function ChatLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name='user'
                key={"user"}
                options={{
                    title: "User",
                    animation: "slide_from_right"
                }}
            />
        </Stack>
    )
}