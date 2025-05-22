import { useState } from "react";
import { Star } from "lucide-react";

interface StarRatingProps {
    totalStars?: number;
    onChange?: (rating: number) => void;
}

const StarRating: React.FC<StarRatingProps> = ({ totalStars = 5, onChange }) => {
    const [hovered, setHovered] = useState<number>(0);
    const [selected, setSelected] = useState<number>(0);

    const handleMouseEnter = (index: number) => {
        setHovered(index);
    };

    const handleMouseLeave = () => {
        setHovered(0);
    };

    const handleClick = (index: number) => {
        setSelected(index);
        if (onChange) {
            onChange(index);
        }
    };

    return (
        <div className="flex gap-1">
            {Array.from({ length: totalStars }, (_, i) => {
                const starIndex = i + 1;
                const isFilled = hovered >= starIndex || selected >= starIndex;

                return (
                    <Star
                        key={starIndex}
                        className={`w-8 h-8 cursor-pointer transition-colors ${isFilled ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                            }`}
                        onMouseEnter={() => handleMouseEnter(starIndex)}
                        onMouseLeave={handleMouseLeave}
                        onClick={() => handleClick(starIndex)}
                    />
                );
            })}
        </div>
    );
};

export default StarRating;
