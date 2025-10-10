import FallingText from '@/components/ui/shadcn-io/falling-text';
const FallingTextDemo = () => {
  return (
    <div className="relative w-full h-full">
      <FallingText
        text="Hey! I'm Arnav Krishnan​. I'm currently updating this website."
        highlightWords={["Arnav", "Krishnan"]}
        trigger="hover"
        backgroundColor="transparent"
        wireframes={false}
        gravity={0.5}
        fontSize="5rem"
        mouseConstraintStiffness={0.7}
      />
    </div>
  );
};
export default FallingTextDemo;