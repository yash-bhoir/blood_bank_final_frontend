import TypingAnimation from "../home/typingAnimation";

export function TextRevealDemo() {
  const sentences = ["Super-fast delivery within minutes", "Multiple blood types readily available", " Drones reach even the most inaccessible areas", "Secure and reliable transport for urgent needs"];

  return (
    <TypingAnimation
      className="text-3 xl font-bold text-[#ff4d00] dark:text-white"
      texts={sentences}
    />
  );
}
