import { TextMD, TextXL } from './Typography';

interface ValueCardProps {
    title: string;
    description: string;
    icon: React.ReactNode;
}

export const ValueCard = ({ title, description, icon }: ValueCardProps) => {
    return (
        <div className="flex flex-col items-center gap-5">
            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center border border-[#EAECF0] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]">
                {icon}
            </div>
            <div className="flex flex-col items-center gap-2">
                <TextXL
                    weight="semibold"
                    className="text-center text-[#101828]"
                >
                    {title}
                </TextXL>
                <TextMD className="text-center text-[#475467]">
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full mt-8">
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