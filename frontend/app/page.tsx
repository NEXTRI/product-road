"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

const Home: React.FC = () => {
  const [count, setCount] = useState<number>(0);

  return (
    <main className='flex min-h-screen flex-col items-center gap-3 p-24'>
      <h3>Example of using a shadcn/ui component: button</h3>
      <Button onClick={() => setCount((prevCount) => prevCount + 1)}>
        Click Me
      </Button>
      <p>You clicked {count} times</p>
    </main>
  );
};

export default Home;
