import { useEffect, useState } from "react";
import { cn } from "../../utility/cn";

interface TypingAnimationProps {
  texts: string[];
  duration?: number;
  className?: string;
}

export default function TypingAnimation({
  texts,
  duration = 200,
  className,
}: TypingAnimationProps) {
  const [displayedText, setDisplayedText] = useState<string>("");
  const [isTyping, setIsTyping] = useState<boolean>(true);
  const [sentenceIndex, setSentenceIndex] = useState<number>(0);
  const [reverse, setReverse] = useState<boolean>(false);

  useEffect(() => {
    const typingEffect = setInterval(() => {
      if (isTyping) {
        if (displayedText.length < texts[sentenceIndex].length) {
          setDisplayedText((prev) => prev + texts[sentenceIndex][prev.length]);
        } else {
          setIsTyping(false);
          setTimeout(() => {
            setReverse(true);
          }, duration);
        }
      } else {
        if (displayedText.length > 0) {
          setDisplayedText((prev) => prev.slice(0, -1));
        } else {
          setReverse(false);
          setSentenceIndex((prevIndex) =>
            prevIndex === texts.length - 1 ? 0 : prevIndex + 1
          );
          setIsTyping(true);
        }
      }
    }, duration);

    return () => clearInterval(typingEffect);
  }, [displayedText, isTyping, sentenceIndex, texts, duration]);

  return (
    <h1
      className={cn(
        "font-display text-4xl font-bold leading-[5rem] tracking-[-0.02em] drop-shadow-sm",
        className
      )}
      style={{ position: 'relative' }} // Ensure position relative for cursor positioning
    >
      {displayedText}
      <span style={{ color: 'red' }}>..|</span> {/* Always red cursor */}
    </h1>
  );
}
