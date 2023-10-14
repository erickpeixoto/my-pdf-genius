"use client"

import {Button} from '@nextui-org/react';
import confetti from 'canvas-confetti';

const CustomButton = () => {
  const handleConfetti = () => {
    confetti();
  };

  return (
    <Button
      disableRipple
      className="relative overflow-visible rounded-full hover:-translate-y-1 px-12 shadow-xl bg-background/30 after:content-[''] after:absolute after:rounded-full after:inset-0 after:bg-background/20 after:z-[-1] after:transition after:!duration-500 hover:after:scale-150 hover:after:opacity-0 bg-gradient-to-r from-pink-500 to-purple-500 hover:to-purple-600 text-white"
      size="lg"
      onPress={handleConfetti}
      type='button'
    >
     Experience AI Now 
    </Button>
  );
};

export default CustomButton;