import FallingText from '@/components/ui/shadcn-io/falling-text';
const FallingTextDemo = () => {
  return (
    <div className="relative w-full h-full">
      <FallingText
        text="Hello EJ Kaleba! Stop looking for me."
        highlightWords={["EJ", "Kaleba"]}
        trigger="hover"
        backgroundColor="transparent"
        wireframes={false}
        gravity={0.5}
        fontSize="clamp(3rem, 2vw, 5rem)"
        mouseConstraintStiffness={0.7}
      />
    </div>
  );
};
export default FallingTextDemo;
