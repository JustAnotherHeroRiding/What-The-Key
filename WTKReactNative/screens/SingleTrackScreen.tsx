import { useRoute } from "@react-navigation/native";
import { SingleTrackScreenNavigationProp } from "../utils/nav-types";
import { Text } from "react-native-elements";

function SingleTrackScreen({
    navigation,
}: {
    navigation: SingleTrackScreenNavigationProp;
}) {
    const route = useRoute()
    const { trackId } = route.params as { trackId: string }

    return (
        <Text>{trackId}</Text>
    )
}