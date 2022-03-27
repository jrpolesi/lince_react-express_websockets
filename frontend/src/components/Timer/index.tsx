import { Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const MotionText = motion(Text);

export const Timer = () => {
  const [counter, setCounter] = useState(3);

  useEffect(() => {
    let timerCounter = 3;

    const timeOutId: NodeJS.Timer = setInterval(() => {
      if (timerCounter === 1) {
        return clearInterval(timeOutId);
      }

      timerCounter--;
      setCounter(timerCounter);
    }, 1000);
  }, []);

  return (
    <MotionText
      zIndex="1000"
      position="absolute"
      w="fit-content"
      left="50%"
      top="50%"
      textShadow="5px 5px 15px rgba(37, 54, 70, 0.8), -5px -5px 15px rgba(37, 54, 70, 0.8)"
      transform="translate(-50%, -50%)"
      animate={{
        fontSize: ["60px", "250px", "60px", "250px", "60px", "250px"],
      }}
      transition={{
        duration: 3,
        times: [0, 0.3333, 0.3333, 0.6666, 0.6666, 1],
      }}
    >
      {counter}
    </MotionText>
  );
};
