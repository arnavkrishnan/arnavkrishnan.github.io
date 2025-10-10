import { BubbleBackground } from '@/components/ui/shadcn-io/bubble-background';
import FallingTextDemo from '@/demos/FallingTextDemo.tsx';

export default function BubbleBackgroundDemo() {
  return (
    <BubbleBackground interactive={true}>
      <div className="relative w-screen h-screen">
        <FallingTextDemo/>
      </div>
    </BubbleBackground>
  );
}