import { TextMD, TextXL } from './Typography';

interface ValueCardProps {
    title: string;
    description: string;
    icon: React.ReactNode;
}

export const ValueCard = ({ title, description, icon }: ValueCardProps) => {
    return (
        <div className="flex flex-col items-center gap-3 md:gap-5 p-4 md:p-0">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-lg flex items-center justify-center border border-[#EAECF0] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]">
                {icon}
            </div>
            <div className="flex flex-col items-center gap-1.5 md:gap-2">
                <TextXL
                    weight="semibold"
                    className="text-center text-[#101828]"
                >
                    {title}
                </TextXL>
                <TextMD className="text-center text-[#475467] text-sm md:text-base">
                    {description}
                </TextMD>
            </div>
        </div>
    );
};

interface ValuesGridProps {
    values: ValueCardProps[];
}

export const ValuesGrid = ({ values }: ValuesGridProps) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 w-full mt-4 md:mt-8">
            {values.map((value, index) => (
                <ValueCard
                    key={index}
                    title={value.title}
                    description={value.description}
                    icon={value.icon}
                />
            ))}
        </div>
    );
};