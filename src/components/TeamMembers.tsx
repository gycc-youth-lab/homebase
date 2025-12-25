import { TextLG, TextMD } from './Typography';
import Image from 'next/image';

interface TeamMemberProps {
    name: string;
    role: string;
    imageSrc: string;
}

export const TeamMember = ({ name, role, imageSrc }: TeamMemberProps) => {
    return (
        <div className="flex flex-col items-center gap-3 sm:gap-4 md:gap-5">
            <div className="w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] md:w-[140px] md:h-[140px] rounded-full overflow-hidden relative">
                <Image
                    src={imageSrc}
                    alt={name}
                    fill
                    style={{ objectFit: 'cover' }}
                />
            </div>
            <div className="flex flex-col items-center gap-0.5 sm:gap-1">
                <TextLG
                    weight="semibold"
                    className="text-center text-[#101828] opacity-90 text-sm sm:text-base md:text-lg"
                >
                    {name}
                </TextLG>
                <TextMD
                    className="text-center text-[#028DBF] text-xs sm:text-sm md:text-base"
                >
                    {role}
                </TextMD>
            </div>
        </div>
    );
};

interface TeamMembersGridProps {
    members: TeamMemberProps[];
}

export const TeamMembersGrid = ({ members }: TeamMembersGridProps) => {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 w-full mt-4 md:mt-8">
            {members.map((member, index) => (
                <TeamMember
                    key={index}
                    name={member.name}
                    role={member.role}
                    imageSrc={member.imageSrc}
                />
            ))}
        </div>
    );
};