import { Button } from '@/components/ui/button';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import React, { useCallback, useRef } from 'react';
import { Text, View } from 'react-native';

export default function Index() {
  const bottomSheetRef = useRef<BottomSheet>(null);
  // const { expand } = useBottomSheet();

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  return (
    <View style={{ flex: 1, padding: 24 }}>
      <Button onPress={() => bottomSheetRef.current?.expand()}>
        Open Bottom Sheet
      </Button>
      <BottomSheet
        ref={bottomSheetRef}
        onChange={handleSheetChanges}
        snapPoints={[1, '50%']}
        style={{

        }}
      >
        <BottomSheetView style={{ alignItems: 'center' }}>
          <Text>Awesome 🎉</Text>
          <Text>Awesome 🎉</Text>
          <Text>Awesome 🎉</Text>
          <Text>Awesome 🎉</Text>
          <Text>Awesome 🎉</Text>
          <Text>Awesome 🎉</Text>
          <Text>Awesome 🎉</Text>

        </BottomSheetView>
      </BottomSheet>
    </View>
  )
}