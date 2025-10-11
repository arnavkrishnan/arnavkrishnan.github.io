import { BubbleBackground } from '@/components/ui/shadcn-io/bubble-background';
import FallingTextDemo from '@/components/FallingTextDemo.tsx';

export default function BubbleBackgroundDemo() {
  return (
    <BubbleBackground interactive={true}>
      <div className="relative w-[90vw] h-[90vh] m-[5vh_5vw]">
        <FallingTextDemo/>
      </div>
    </BubbleBackground>
  );
}