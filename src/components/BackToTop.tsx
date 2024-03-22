import { ArrowUp } from "@phosphor-icons/react";

function BackToTop({ showBackToTop }: { showBackToTop: boolean }) {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      className={`fixed bottom-4 right-4 p-1 rounded-full from-lightGreen to-darkGreen bg-gradient-to-b ${
        showBackToTop ? "scale-100 opacity-100" : "scale-0 opacity-0"
      } transition-all duration-500`}
      onClick={scrollToTop}
    >
      <ArrowUp size={24} weight="bold" color="#ffffff" />
    </button>
  );
}

export default BackToTop;
