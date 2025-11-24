import Header from "@/components/header";
import { bookingInstructions } from "@/data/data";



const HjaelpSide = () => {
  return (
    <div className="flex flex-col h-screen bg-ek-bg p-8">
      <Header title="Sådan booker du" />
      <div className="mt-10 space-y-1">
        {bookingInstructions.map((instruction) => (
          <div key={instruction.step} className="pb-4">
            <h3 className="font-semibold mb-2">
              {instruction.step}. {instruction.title}
            </h3>
            <div className="text-gray-700">
              {instruction.description}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HjaelpSide;
