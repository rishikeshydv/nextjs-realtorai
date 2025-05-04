interface PropertyCardProps {
    image: string;
    price: string;
    sqft: string;
    baths: number;
    beds: number;
    address: string;
    rating: number;
  }
  import { ChartNoAxesCombined } from "lucide-react";
import { Button } from "../ui/button";
  
  
  const PropertyCard: React.FC<PropertyCardProps> = ({ image, price, sqft, baths, beds, address, rating }) => {
    return (
      <div className="relative w-80 bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="relative">
          <img src={image} alt="Property" className="w-full h-48 object-cover" />
          <div className="absolute top-2 right-2 bg-gray-100/60 rounded-full px-2 shadow">
            <span className="text-[#437A45] text-xs font-semibold">★ {rating}</span>
          </div>
          <button className="absolute top-2 left-2 bg-white rounded-full p-1 shadow">
            
          </button>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold">{price}</h3>
          <p className="text-gray-500">{sqft} • {baths} baths • {beds} beds</p>
          <p className="text-gray-400">{address}</p>
          <Button className="mt-2 w-full py-2 bg-gray-100 rounded-xl text-blue-500 font-medium hover:bg-blue-100" >
            View Analytics 
           <ChartNoAxesCombined size={24} />
            
          </Button>
        </div>
      </div>
    );
  };

  export default PropertyCard;