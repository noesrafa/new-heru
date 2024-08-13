import { useEffect, useState } from "react";

interface Props {
  text: string;
  duration: number;
  center?: boolean;
  className?: string;
}

const TypingText = ({ text, duration, center = false, className }: Props) => {
  const [currentPosition, setCurrentPosition] = useState(0);
  const [textToShow, setTextToShow] = useState<string[]>([]);
  const [hideCircle, setHideCircle] = useState(false);
  const [hideDotDelay, setHideDotDelay] = useState(false);
  const items = text?.split(" ");

  useEffect(() => {
    setCurrentPosition(0);
  }, [text]);

  useEffect(() => {
    if (currentPosition >= items?.length) {
      setHideCircle(true);

      setTimeout(() => {
        setHideDotDelay(true);
      }, 200);
      return;
    }

    const intervalId = setInterval(() => {
      setCurrentPosition((prevPosition) => prevPosition + 1);
    }, duration);

    return () => {
      clearInterval(intervalId);
    };
  }, [currentPosition, items, duration]);

  useEffect(() => {
    const itemToAdd = items[currentPosition];
    if (itemToAdd === undefined) return;
    setTextToShow([...textToShow, itemToAdd]);
  }, [currentPosition]);

  console.log(textToShow);

  return (
    <p
      className={`typing-text flex-wrap mt-2 ${center && "justify-center"}
      ${hideCircle ? "typing-text-hide-dot" : ""}
      ${className}`}
    >
      {textToShow?.map((word, index) => {
        const isLastWord = index === textToShow.length - 1;

        const wordToShow = isLastWord ? word.trim() : `${word} `;

        return wordToShow;
      })}
      {/* {true && (
        <span
          className={`ml-1 h-3 w-3 rounded-full inline-block bg-blue-950 duration-300 ${
            hideCircle ? `scale-0 opacity-0 ${center && "hidden"}` : ""
          }`}
        />
      )} */}
    </p>
  );
};

export default TypingText;
