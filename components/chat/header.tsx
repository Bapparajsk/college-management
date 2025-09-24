import Header from "@/components/ui/header";
import { getReadableRoot } from "@/utils/format";
import { useLocalSearchParams } from "expo-router";
import BackButton from '../ui/back';

export default function ChatHeader() {

    const { prevPath } = useLocalSearchParams<{ prevPath?: string }>();

    return (
        <Header
            current={"chat"}
            icon={<BackButton classNames={{ title: "text-black text-xl font-poppins-semibold" }}
            title={getReadableRoot(prevPath)} />}
        />
    )
}