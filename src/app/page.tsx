import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-8 row-start-2 items-center">
        <div className="flex flex-col items-center gap-4 text-center">
          <h1 className="text-4xl font-bold">Testgenz Clone</h1>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <Button size="lg">Button Default</Button>
          <Button variant="secondary" size="lg">
            Button Secondary
          </Button>
          <Button variant="outline" size="lg">
            Button Outline
          </Button>
          <Button variant="destructive" size="lg">
            Button Destructive
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <Button variant="ghost">Button Ghost</Button>
          <Button variant="link">Button Link</Button>
          <Button size="sm">Button Small</Button>
          <Button size="icon">→</Button>
        </div>
      </main>
    </div>
  );
}
