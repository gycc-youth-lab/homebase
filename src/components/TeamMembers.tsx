import { TextLG, TextMD } from './Typography';
import Image from 'next/image';

interface TeamMemberProps {
    name: string;
    role: string;
    imageSrc: string;
}

export const TeamMember = ({ name, role, imageSrc }: TeamMemberProps) => {
    return (
        <div className="flex flex-col items-center gap-5">
            <div className="w-[140px] h-[140px] rounded-full overflow-hidden relative">
                <Image
                    src={imageSrc}
                    alt={name}
                    fill
                    style={{ objectFit: 'cover' }}
                />
            </div>
            <div className="flex flex-col items-center gap-1">
                <TextLG
                    weight="semibold"
                    className="text-center text-[#101828] opacity-90"
                >
                    {name}
                </TextLG>
                <TextMD
                    className="text-center text-[#028DBF]"
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 w-full mt-8">
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