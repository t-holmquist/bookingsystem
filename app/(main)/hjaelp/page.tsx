import Header from "@/components/header";
import { bookingInstructions } from "@/data/data";



const HjaelpSide = () => {
  return (
    <div className="flex flex-col h-screen bg-white p-8 gap-8">
      <Header title="Sådan booker du" />
      <div className="space-y-1">
        {bookingInstructions.map((instruction) => (
          <div key={instruction.step} className="pb-4">
            <h3 className="font-semibold mb-2">
              {instruction.step}. {instruction.title}
            </h3>
            <p className="text-gray-700">
              {instruction.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HjaelpSide;
