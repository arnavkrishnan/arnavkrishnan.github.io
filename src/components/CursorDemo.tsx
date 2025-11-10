import { Cursor, CursorProvider } from '@/components/ui/shadcn-io/animated-cursor';
import BubbleBackgroundDemo from '@/components/BubbleBackgroundDemo';

export const CursorDemo = () => {
  return (
    <div className="relative w-screen h-screen">
      <div className="relative w-screen h-screen">
        <BubbleBackgroundDemo />
      </div>
      <CursorProvider>
        <Cursor>
          <svg
            className="size-6 text-blue-500"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 40 40"
          >
            <path
              fill="currentColor"
              d="M1.8 4.4 7 36.2c.3 1.8 2.6 2.3 3.6.8l3.9-5.7c1.7-2.5 4.5-4.1 7.5-4.3l6.9-.5c1.8-.1 2.5-2.4 1.1-3.5L5 2.5c-1.4-1.1-3.5 0-3.3 1.9Z"
            />
          </svg>
        </Cursor>
      </CursorProvider>
    </div>
  );
};

export default CursorDemo;