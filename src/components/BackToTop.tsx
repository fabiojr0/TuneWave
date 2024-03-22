import { ArrowCircleUp } from "@phosphor-icons/react";

function BackToTop({ showBackToTop }: { showBackToTop: boolean }) {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      className={`fixed bottom-4 right-4 ${
        showBackToTop ? "scale-100 opacity-100" : "scale-0 opacity-0"
      } transition-all duration-500`}
      onClick={scrollToTop}
    >
      <ArrowCircleUp size={36} weight="fill" color="#ffffff" />
    </button>
  );
}

export default BackToTop;
