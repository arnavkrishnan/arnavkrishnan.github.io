import FallingText from '@/components/ui/shadcn-io/falling-text';

const App = () => {
  return (
    <div className="relative w-screen h-screen">
      <FallingText
        text="Hey! I'm Arnav Krishnan and I'm currently updating this website."
        highlightWords={["Arnav", "Krishnan"]}
        trigger="hover"
        backgroundColor="transparent"
        wireframes={false}
        gravity={0.5}
        fontSize="1.5rem"
        mouseConstraintStiffness={0.7}
      />
    </div>
  );
};

export default App;